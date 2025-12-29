import { useEffect, useState, useContext } from "react";
import { getAllUsers } from "../api/users";
import { createChat, getChats } from "../api/chats";
import { useChat } from "../context/ChatContext";
import { useActiveTab } from "../context/ActiveTabContext";
import "./../styles/ContactList.css";
import toast from "react-hot-toast";

function ContactList() {
    const [allContacts, setAllContacts] = useState([]);
    const { setSelectedChat, setOtherUser } = useChat();
    const { setActiveTab } = useActiveTab();

    useEffect(() => {
        const fetchContacts = async () => {
            try {
                const data = await getAllUsers();
                setAllContacts(data);
            } catch (err) {
                console.error("Failed to fetch contacts", err);
            }
        };

        fetchContacts();
    }, []);

    const handleContactClick = async (contact) => {
        try {
            // Try to create or get existing chat - use username for withUser parameter
            let chat = await createChat(contact.username);

            // Handle different response formats
            if (chat.message && typeof chat.message === 'string') {
                // If chat already exists, fetch all chats to get the full chat object
                const chats = await getChats();
                const existingChat = chats.find(
                    (c) =>
                        (c.user1 === contact.username) ||
                        (c.user2 === contact.username)
                );
                if (existingChat) {
                    chat = existingChat;
                } else {
                    toast.error("Chat not found");
                    return;
                }
            }

            // Set the chat
            setSelectedChat(chat);
            setOtherUser(contact.username);
            setActiveTab("chats");
            toast.success("Chat started!");
        } catch (err) {
            console.error("Failed to create chat", err);
            const errorMessage = err.response?.data?.message || err.message || "Failed to start chat";
            toast.error(errorMessage);
        }
    };

    return (
        <>
            {allContacts.map((contact) => (
                <div
                    key={contact.id || contact._id || contact.username}
                    className="contact-item"
                    onClick={() => handleContactClick(contact)}
                >
                    <div className="contact-content">
                        <div className="avatar-image-container">
                            <img
                                src={"/avatar.png"}
                                alt={contact.username}
                                className="contact-avatar-image"
                            />
                        </div>
                        <h4 className="contact-name">{contact.username}</h4>
                    </div>
                </div>
            ))}
        </>
    );
}

export default ContactList;
