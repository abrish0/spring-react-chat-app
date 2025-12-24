import { createContext, useContext, useState } from "react";

const ActiveTabContext = createContext(null);

export function ActiveTabProvider({ children }) {
    const [activeTab, setActiveTab] = useState("chats"); // default

    return (
        <ActiveTabContext.Provider value={{ activeTab, setActiveTab }}>
            {children}
        </ActiveTabContext.Provider>
    );
}

// custom hook
export function useActiveTab() {
    const context = useContext(ActiveTabContext);
    if (!context) {
        throw new Error("useActiveTab must be used inside ActiveTabProvider");
    }
    return context;
}
