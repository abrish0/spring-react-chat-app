import { MessageCircleIcon } from "lucide-react";
import "./../styles/NoConversationPlaceholder.css";

const NoConversationPlaceholder = () => {
    return (
        <div className="no-conversation-placeholder">
            <div className="placeholder-icon-wrapper">
                <MessageCircleIcon className="placeholder-icon" />
            </div>
            <h3 className="placeholder-title">Select a conversation</h3>
            <p className="placeholder-subtitle">
                Choose a contact from the sidebar to start chatting or continue
                a previous conversation.
            </p>
        </div>
    );
};

export default NoConversationPlaceholder;
