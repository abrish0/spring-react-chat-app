import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import "../styles/Header.css";
import { LogOutIcon } from "lucide-react";

function Header() {
    const { user, logout } = useContext(AuthContext);

    const getInitial = () => {
        if (!user?.username) return "?";
        return user.username.charAt(0).toUpperCase();
    };

    return (
        <header className="app-header">
            <div className="header-content">
                {/* PROFILE */}
                <div className="profile-container">
                    <div className="avatar-circle">
                        <span className="avatar-initials">{getInitial()}</span>
                    </div>

                    <div className="profile-info">
                        <p className="profile-name">{user?.username}</p>
                        <p className="profile-email">{user?.email}</p>
                    </div>
                </div>

                {/* LOGOUT */}
                <button className="logout-button" onClick={logout}>
                    <LogOutIcon className="logout-icon" />
                </button>
            </div>
        </header>
    );
}

export default Header;
