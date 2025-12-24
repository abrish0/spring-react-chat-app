import { useContext } from "react";
import BorderAnimatedContainer from "../components/BorderAnimatedContainer";
import Header from "../components/Header";
import NoConversationPlaceholder from "../components/NoConversationPlaceholder";
import ActiveTabSwitch from "../components/ActiveTabSwitch";
import "./../styles/home.css";
import { ActiveTabContext } from "./../context/ActiveTabContext";
import ChatsList from "../components/ChatList";

function ChatPage() {
        const { activeTab } = useContext(ActiveTabContext);
    
    return (
        <div className="chat-page">
            <BorderAnimatedContainer>
                <div className="chat-layout-container">
                    {/* LEFT SIDE */}
                    <div className="chat-sidebar">
                        <Header />
                        <div className="chat-sidebar-content">
                            {/*chat-vs-contact toggle*/}
                            <ActiveTabSwitch />
                            <div className="chat-sidebar-list">
                                {/* Will contain ChatList or ContactList components */}
                                {activeTab === "chats" ? (
                                    <ChatsList />
                                ) : (
                                    <div></div>
                                )}
                            </div>
                        </div>
                    </div>

                    {/* RIGHT SIDE */}
                    <div className="chat-main">
                        <NoConversationPlaceholder />
                    </div>
                </div>
            </BorderAnimatedContainer>
        </div>
    );
}

export default ChatPage;
