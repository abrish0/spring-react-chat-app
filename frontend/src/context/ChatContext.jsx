import { createContext, useContext, useState } from "react";

export const ChatContext = createContext(null);

export function ChatProvider({ children }) {
    const [selectedChat, setSelectedChat] = useState(null);
    const [otherUser, setOtherUser] = useState(null);

    return (
        <ChatContext.Provider value={{ selectedChat, setSelectedChat, otherUser, setOtherUser }}>
            {children}
        </ChatContext.Provider>
    );
}

// custom hook
export function useChat() {
    const context = useContext(ChatContext);
    if (!context) {
        throw new Error("useChat must be used inside ChatProvider");
    }
    return context;
}

