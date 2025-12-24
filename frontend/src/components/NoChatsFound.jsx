import { MessageCircleIcon } from "lucide-react";
import "./../styles/NoChatsFound.css";
import {ActiveTabContext} from "./../context/ActiveTabContext"
import { useContext } from "react";

function NoChatsFound() {

    const {setActiveTab} = useContext(ActiveTabContext)

    return (
        <div className="no-chats-container">
            <div className="no-chats-icon-wrapper">
                <MessageCircleIcon className="no-chats-icon" />
            </div>
            <div className="no-chats-text">
                <h4 className="no-chats-title">No conversations yet</h4>
                <p className="no-chats-message">
                    Start a new chat by selecting a contact from the contacts
                    tab
                </p>
            </div>
            <button
                onClick={() => setActiveTab("contacts")}
                className="no-chats-button"
            >
                Find contacts
            </button>
        </div>
    );
}

export default NoChatsFound;
