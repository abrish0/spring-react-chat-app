import { useContext } from "react";
import BorderAnimatedContainer from "../components/BorderAnimatedContainer";
import Header from "../components/Header";
import NoConversationPlaceholder from "../components/NoConversationPlaceholder";
import ActiveTabSwitch from "../components/ActiveTabSwitch";
import "./../styles/home.css";
import { ActiveTabContext } from "./../context/ActiveTabContext";
import ChatsList from "../components/ChatList";
import ContactList from "../components/ContactList";

function ChatPage() {
    const { activeTab } = useContext(ActiveTabContext);

    return (
        <div className="chat-page">
            <BorderAnimatedContainer>
                <div className="chat-layout-container">
                    {/* LEFT SIDE */}
                    <div className="chat-sidebar">
                        <Header />
                        {/*chat-vs-contact toggle*/}
                        <ActiveTabSwitch />
                        <div className="chat-sidebar-content">
                            <div className="chat-sidebar-list">
                                {activeTab === "chats" ? (
                                    <ChatsList />
                                ) : (
                                    <ContactList />
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
