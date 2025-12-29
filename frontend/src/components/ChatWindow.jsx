import { useEffect, useState, useRef, useContext } from "react";
import { getMessages, sendMessage } from "../api/messages";
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
    const messagesEndRef = useRef(null);
    const messagesContainerRef = useRef(null);

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

        const chatId = selectedChat.id || selectedChat._id;
        const content = messageInput.trim();

        // Optimistically add message
        const tempMessage = {
            id: Date.now(),
            content,
            sender: user.username,
            createdAt: new Date().toISOString(),
        };
        setMessages((prev) => [...prev, tempMessage]);
        setMessageInput("");

        try {
            const newMessage = await sendMessage(chatId, content);
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
                        <p className="chat-header-status">Online</p>
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
                        return (
                            <div
                                key={message.id || message._id}
                                className={`message ${isOwnMessage ? "message-own" : "message-other"}`}
                            >
                                <div className="message-content">
                                    <p className="message-text">{message.content}</p>
                                    <span className="message-time">
                                        {new Date(message.createdAt).toLocaleTimeString([], {
                                            hour: "2-digit",
                                            minute: "2-digit",
                                        })}
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
                    onChange={(e) => setMessageInput(e.target.value)}
                />
                <button type="submit" className="chat-send-button" disabled={!messageInput.trim()}>
                    <Send className="chat-send-icon" />
                </button>
            </form>
        </div>
    );
}

export default ChatWindow;

