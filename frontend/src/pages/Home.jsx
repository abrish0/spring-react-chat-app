import BorderAnimatedContainer from "../components/BorderAnimatedContainer";
import Header from "../components/Header";
import NoConversationPlaceholder from "../components/NoConversationPlaceholder";
import "./../styles/home.css";

function ChatPage() {
    return (
        <div className="chat-page">
            <BorderAnimatedContainer>
                <div className="chat-layout-container">
                    {/* LEFT SIDE */}
                    <div className="chat-sidebar">
                        <Header />
                        <div className="chat-sidebar-content">
                            {/*chat-vs-contact toggle*/}
                            <div className="chat-sidebar-list">
                                {/* Will contain ChatList or ContactList components */}
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
