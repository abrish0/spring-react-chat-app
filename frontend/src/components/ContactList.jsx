import { useEffect, useState } from "react";
import { getAllUsers } from "../api/users";
import "./../styles/ContactList.css";
function ContactList() {
    const [allContacts, setAllContacts] = useState([]);

    useEffect(() => {
        const fetchContacts = async () => {
            try {
                const data = await getAllUsers();
                setAllContacts(data);
            } catch (err) {
                console.error("Failed to fetch chats", err);
            }
        };

        fetchContacts();
    }, []);

    return (
        <>
            {allContacts.map((contact) => (
                <div
                    key={contact._id}
                    className="contact-item"
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
