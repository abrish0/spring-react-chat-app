import { useEffect, useState, useRef, useContext } from "react";
import { getMessages, sendMessage } from "../api/messages";
import { getUserByUsername } from "../api/users";
import { getTypingStatus, setTyping } from "../api/chats";
import { AuthContext } from "../context/AuthContext";
import { useChat } from "../context/ChatContext";
import { Send } from "lucide-react";
import "../styles/ChatWindow.css";
import toast from "react-hot-toast";

function ChatWindow() {
    const { selectedChat, otherUser } = useChat();
    const { user } = useContext(AuthContext);
    const [messages, setMessages] = useState([]);
    const [messageInput, setMessageInput] = useState("");
    const [loading, setLoading] = useState(false);
    const [otherUserLastSeen, setOtherUserLastSeen] = useState(null);
    const [otherUserTyping, setOtherUserTyping] = useState(false);
    const messagesEndRef = useRef(null);
    const messagesContainerRef = useRef(null);
    const typingTimeoutRef = useRef(null);

    // Scroll to bottom when messages change
    const scrollToBottom = () => {
        if (messagesContainerRef.current) {
            messagesContainerRef.current.scrollTop = messagesContainerRef.current.scrollHeight;
        }
    };

    // Fetch messages when chat is selected
    useEffect(() => {
        if (selectedChat) {
            const fetchMessages = async () => {
                try {
                    setLoading(true);
                    const data = await getMessages(selectedChat.id || selectedChat._id);
                    setMessages(Array.isArray(data) ? data : []);
                } catch (err) {
                    console.error("Failed to fetch messages", err);
                    toast.error("Failed to load messages");
                } finally {
                    setLoading(false);
                }
            };

            fetchMessages();
        } else {
            setMessages([]);
        }
    }, [selectedChat]);

    // Poll other user's lastSeen status periodically when a chat is open
    useEffect(() => {
        if (!otherUser || !selectedChat) return;

        let cancelled = false;

        const fetchStatus = async () => {
            try {
                const data = await getUserByUsername(otherUser);
                if (!cancelled) {
                    setOtherUserLastSeen(data.lastSeen || null);
                }
            } catch (err) {
                console.error("Failed to fetch user status", err);
            }
        };

        // initial fetch
        fetchStatus();
        const intervalId = setInterval(fetchStatus, 15000); // every 15s

        return () => {
            cancelled = true;
            clearInterval(intervalId);
        };
    }, [otherUser, selectedChat]);

    // Poll typing status for the other user
    useEffect(() => {
        if (!selectedChat) return;

        let cancelled = false;

        const pollTyping = async () => {
            try {
                const status = await getTypingStatus(selectedChat.id || selectedChat._id);
                if (!cancelled) {
                    setOtherUserTyping(Boolean(status.otherUserTyping));
                }
            } catch (err) {
                console.error("Failed to get typing status", err);
            }
        };

        const intervalId = setInterval(pollTyping, 1000); // every second

        return () => {
            cancelled = true;
            clearInterval(intervalId);
        };
    }, [selectedChat]);

    // Scroll to bottom when messages change or after loading
    useEffect(() => {
        if (!loading && messages.length > 0) {
            // Use setTimeout to ensure DOM is updated
            setTimeout(() => {
                scrollToBottom();
            }, 100);
        }
    }, [messages, loading]);

    const handleSendMessage = async (e) => {
        e.preventDefault();
        if (!messageInput.trim() || !selectedChat) return;

        const content = messageInput.trim();

        // Optimistically add message
        const tempMessage = {
            id: Date.now(),
            content,
            sender: user.username,
            // Match backend field name `timestamp` (MessageResponse.timestamp)
            timestamp: new Date().toISOString(),
            seenAt: null,
        };
        setMessages((prev) => [...prev, tempMessage]);
        setMessageInput("");

        // Stop typing state when message is sent
        const chatIdForSend = selectedChat.id || selectedChat._id;
        try {
            await setTyping(chatIdForSend, false);
        } catch (err) {
            console.error("Failed to clear typing state", err);
        }

        try {
            const newMessage = await sendMessage(chatIdForSend, content);
            // Replace temp message with real one
            setMessages((prev) =>
                prev.map((msg) =>
                    msg.id === tempMessage.id ? newMessage : msg
                )
            );
        } catch (err) {
            console.error("Failed to send message", err);
            toast.error("Failed to send message");
            // Remove failed message
            setMessages((prev) => prev.filter((msg) => msg.id !== tempMessage.id));
            setMessageInput(content);
        }
    };

    if (!selectedChat) {
        return null;
    }

    // Determine last message from the current user that has been seen
    const lastSeenOwnMessageId = (() => {
        if (!user) return null;
        const ownSeenMessages = messages.filter(
            (m) => m.sender === user.username && m.seenAt
        );
        if (!ownSeenMessages.length) return null;
        return ownSeenMessages[ownSeenMessages.length - 1].id;
    })();

    const getStatusText = () => {
        if (otherUserTyping) return "Typing...";
        if (!otherUserLastSeen) return "";
        const lastSeenDate = new Date(otherUserLastSeen);
        const diffMs = Date.now() - lastSeenDate.getTime();
        const isOnline = diffMs < 60_000; // 1 minute
        if (isOnline) return "Online";
        return `Last seen at ${lastSeenDate.toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
        })}`;
    };

    return (
        <div className="chat-window">
            {/* Chat Header */}
            <div className="chat-header">
                <div className="chat-header-content">
                    <div className="chat-header-avatar">
                        <img
                            src="/avatar.png"
                            alt={otherUser}
                            className="chat-header-avatar-img"
                        />
                    </div>
                    <div className="chat-header-info">
                        <h3 className="chat-header-name">{otherUser}</h3>
                        <p className="chat-header-status">{getStatusText()}</p>
                    </div>
                </div>
            </div>

            {/* Messages Container */}
            <div className="chat-messages" ref={messagesContainerRef}>
                {loading ? (
                    <div className="chat-loading">Loading messages...</div>
                ) : messages.length === 0 ? (
                    <div className="chat-empty">
                        <p>No messages yet. Start the conversation!</p>
                    </div>
                ) : (
                    messages.map((message) => {
                        const isOwnMessage = message.sender === user.username;
                        const isSeenByOther = isOwnMessage && message.id === lastSeenOwnMessageId;
                        return (
                            <div
                                key={message.id || message._id}
                                className={`message ${isOwnMessage ? "message-own" : "message-other"}`}
                            >
                                <div className="message-content">
                                    <p className="message-text">{message.content}</p>
                                    <span className="message-time">
                                        {message.timestamp
                                            ? `${new Date(message.timestamp).toLocaleTimeString([], {
                                                hour: "2-digit",
                                                minute: "2-digit",
                                            })}${isSeenByOther ? " • Seen" : ""}`
                                            : isSeenByOther
                                                ? "Seen"
                                                : ""}
                                    </span>
                                </div>
                            </div>
                        );
                    })
                )}
                <div ref={messagesEndRef} />
            </div>

            {/* Message Input */}
            <form className="chat-input-form" onSubmit={handleSendMessage}>
                <input
                    type="text"
                    className="chat-input"
                    placeholder="Type a message..."
                    value={messageInput}
                    onChange={async (e) => {
                        const value = e.target.value;
                        setMessageInput(value);

                        if (!selectedChat) return;
                        const chatId = selectedChat.id || selectedChat._id;

                        // Notify backend that the user is typing, debounced
                        if (typingTimeoutRef.current) {
                            clearTimeout(typingTimeoutRef.current);
                        }

                        if (value.trim()) {
                            try {
                                await setTyping(chatId, true);
                            } catch (err) {
                                console.error("Failed to set typing state", err);
                            }

                            typingTimeoutRef.current = setTimeout(async () => {
                                try {
                                    await setTyping(chatId, false);
                                } catch (err) {
                                    console.error("Failed to clear typing state", err);
                                }
                            }, 2000);
                        } else {
                            try {
                                await setTyping(chatId, false);
                            } catch (err) {
                                console.error("Failed to clear typing state", err);
                            }
                        }
                    }}
                />
                <button type="submit" className="chat-send-button" disabled={!messageInput.trim()}>
                    <Send className="chat-send-icon" />
                </button>
            </form>
        </div>
    );
}

export default ChatWindow;

