import { createContext, useState, useEffect } from "react";
import { getToken, setToken, removeToken } from "../utils/auth";
import { getMe } from "../api/users";

export const AuthContext = createContext();

export function AuthProvider({ children }) {
    const [token, setAuthToken] = useState(getToken());
    const [user, setUser] = useState(null);

    // Fetch user info if token exists
    useEffect(() => {
        async function fetchUser(){
            if (token) {
                try {
                    const userData = await getMe();
                    setUser(userData);
                } catch (err) {
                    console.error("Failed to fetch user:", err);
                    logout();
                }
            } else {
                setUser(null);
            }
        };

        fetchUser();
    }, [token]);

    const login = (jwt) => {
        setToken(jwt);
        setAuthToken(jwt);
    };

    const logout = () => {
        removeToken();
        setAuthToken(null);
        setUser(null);
    };

    return (
        <AuthContext.Provider value={{ token, user, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
}
