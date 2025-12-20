import BorderAnimatedContainer from "../components/BorderAnimatedContainer";
import { useState } from "react";
import { MessageCircleIcon, MailIcon, LockIcon } from "lucide-react";
import { Link } from "react-router-dom";
import "./../styles/login.css";


function LoginPage() {
    const [formData, setFormData] = useState({
            fullName: "",
            email: "",
            password: "",
        });
    
        const handleSubmit = (e) => {
            e.preventDefault();
            // UI ONLY – no functionality yet
            console.log(formData);
        };

    return (
        <div className="login-container">
            <div className="login-wrapper">
                <BorderAnimatedContainer>
                    <div className="login-content">
                        {/* FORM COLUMN - LEFT SIDE */}
                        <div className="login-form-container">
                            <div className="login-form-wrapper">
                                {/* HEADING */}
                                <div className="login-header">
                                    <MessageCircleIcon className="login-icon" />
                                    <h2 className="login-title">
                                        Welcome Back
                                    </h2>
                                    <p className="login-subtitle">
                                        Login to access your account
                                    </p>
                                </div>

                                {/* FORM (STATIC) */}
                                <form
                                    className="login-form"
                                    onSubmit={handleSubmit}
                                >
                                    {/* EMAIL */}
                                    <div className="form-group">
                                        <label className="auth-input-label">
                                            Email
                                        </label>
                                        <div className="input-container">
                                            <MailIcon className="auth-input-icon" />
                                            <input
                                                type="email"
                                                className="input"
                                                placeholder="johndoe@gmail.com"
                                                onChange={(e) =>
                                                    setFormData({
                                                        ...formData,
                                                        email: e.target.value,
                                                    })
                                                }
                                            />
                                        </div>
                                    </div>

                                    {/* PASSWORD */}
                                    <div className="form-group">
                                        <label className="auth-input-label">
                                            Password
                                        </label>
                                        <div className="input-container">
                                            <LockIcon className="auth-input-icon" />
                                            <input
                                                type="password"
                                                className="input"
                                                placeholder="Enter your password"
                                                onChange={(e) =>
                                                    setFormData({
                                                        ...formData,
                                                        password:
                                                            e.target.value,
                                                    })
                                                }
                                            />
                                        </div>
                                    </div>

                                    {/* BUTTON (STATIC) */}
                                    <button className="auth-btn" type="submit">
                                        Sign In
                                    </button>
                                </form>

                                <div className="login-footer">
                                    <Link to="/signup" className="auth-link">
                                        Don't have an account? Sign Up
                                    </Link>
                                </div>
                            </div>
                        </div>

                        {/* RIGHT SIDE ILLUSTRATION */}
                        <div className="login-illustration-container">
                            <div className="login-illustration-content">
                                <img
                                    src="/login.png"
                                    alt="People using mobile devices"
                                    className="illustration-image"
                                />

                                <div className="illustration-content">
                                    <h3 className="illustration-title">
                                        Just In Time Conversations
                                    </h3>

                                    <div className="illustration-badges">
                                        <span className="auth-badge">
                                            Instant Chat
                                        </span>
                                        <span className="auth-badge">
                                            Secure
                                        </span>
                                        <span className="auth-badge">
                                            Real-time
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </BorderAnimatedContainer>
            </div>
        </div>
    );
}

export default LoginPage;
