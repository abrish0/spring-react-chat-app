import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
import { Toaster } from "react-hot-toast";
import { AuthProvider } from "./context/AuthContext";
import { ActiveTabProvider } from "./context/ActiveTabContext";
import { ChatProvider } from "./context/ChatContext";

ReactDOM.createRoot(document.getElementById("root")).render(
    <React.StrictMode>
        <AuthProvider>
            <ActiveTabProvider>
                <ChatProvider>
                    <App />
                    <Toaster position="top-center" />
                </ChatProvider>
            </ActiveTabProvider>
        </AuthProvider>
    </React.StrictMode>
);
