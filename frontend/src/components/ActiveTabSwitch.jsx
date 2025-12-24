import "./../styles/ActiveTabSwitch.css";
import { useActiveTab } from "../context/ActiveTabContext";

function ActiveTabSwitch() {
    const { activeTab, setActiveTab } = useActiveTab();
    
    return (
        <div className="tab-switch-container">
            <button
                className={`tab-button ${
                    activeTab === "chats" ? "active" : ""
                }`}
                onClick={() => setActiveTab("chats")}
            >
                Chats
            </button>

            <button
                className={`tab-button ${
                    activeTab === "contacts" ? "active" : ""
                }`}
                onClick={() => setActiveTab("contacts")}
            >
                Contacts
            </button>
        </div>
    );
}

export default ActiveTabSwitch;
