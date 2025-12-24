import { useEffect, useState, useContext } from "react";
import { getChats } from "../api/chats";
import NoChatsFound from "./NoChatsFound";
import { AuthContext } from "../context/AuthContext";
import "./../styles/ChatsList.css";

function ChatsList() {
    const [chats, setChats] = useState([]);

    const { user } = useContext(AuthContext);

    useEffect(() => {
        const fetchChats = async () => {
            try {
                const data = await getChats();
                setChats(data);
            } catch (err) {
                console.error("Failed to fetch chats", err);
            } 
        };

        fetchChats();
    }, []);

    if (!chats.length) return <NoChatsFound />;

    return (
        <>
            {chats.map((chat) => {
                // determine the other user
                const otherUser =
                    chat.user1 === user.username ? chat.user2 : chat.user1;

                return (
                    <div key={chat.id} className="chat-item">
                        <div className="chat-item-content">
                            <div className="avatar-image-wrapper">
                                <img
                                    src="/avatar.png"
                                    alt={otherUser}
                                    className="avatar-image"
                                />
                            </div>

                            <h4 className="chat-name">{otherUser}</h4>
                        </div>
                    </div>
                );
            })}
        </>
    );
}

export default ChatsList;
