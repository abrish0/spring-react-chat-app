import { useState } from "react";
import BorderAnimatedContainer from "../components/BorderAnimatedContainer";
import { MessageCircleIcon, LockIcon, MailIcon, UserIcon } from "lucide-react";
import { Link } from "react-router-dom";
import "./../styles/signup.css";

function SignUpPage() {
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
        <div className="signup-container">
            <div className="signup-wrapper">
                <BorderAnimatedContainer>
                    <div className="signup-card">
                        <div className="signup-content">
                            {/* LEFT SIDE – FORM */}
                            <div className="signup-form-container">
                                <div className="signup-form-wrapper">
                                    {/* HEADER */}
                                    <div className="signup-header">
                                        <MessageCircleIcon className="signup-icon" />
                                        <h2 className="signup-title">
                                            Create Account
                                        </h2>
                                        <p className="signup-subtitle">
                                            Sign up for a new account
                                        </p>
                                    </div>

                                    {/* FORM */}
                                    <form
                                        onSubmit={handleSubmit}
                                        className="signup-form"
                                    >
                                        {/* FULL NAME */}
                                        <div className="form-group">
                                            <label className="auth-input-label">
                                                Full Name
                                            </label>
                                            <div className="input-container">
                                                <UserIcon className="auth-input-icon" />
                                                <input
                                                    type="text"
                                                    className="input"
                                                    placeholder="John Doe"
                                                    value={formData.fullName}
                                                    onChange={(e) =>
                                                        setFormData({
                                                            ...formData,
                                                            fullName:
                                                                e.target.value,
                                                        })
                                                    }
                                                />
                                            </div>
                                        </div>

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
                                                    value={formData.email}
                                                    onChange={(e) =>
                                                        setFormData({
                                                            ...formData,
                                                            email: e.target
                                                                .value,
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
                                                    value={formData.password}
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

                                        {/* BUTTON */}
                                        <button
                                            className="auth-btn"
                                            type="submit"
                                        >
                                            Create Account
                                        </button>
                                    </form>

                                    {/* FOOTER */}
                                    <div className="signup-footer">
                                        <Link to="/" className="auth-link">
                                            Already have an account? Login
                                        </Link>
                                    </div>
                                </div>
                            </div>

                            {/* RIGHT SIDE – ILLUSTRATION */}
                            <div className="signup-illustration-container">
                                <div className="signup-illustration-content">
                                    <img
                                        src="/signup.png"
                                        alt="Signup Illustration"
                                        className="illustration-image"
                                    />

                                    <h3 className="illustration-title">
                                        Connect Instantly with JitChat
                                    </h3>

                                    <div className="illustration-badges">
                                        <span className="auth-badge">
                                            Lightning Fast
                                        </span>
                                        <span className="auth-badge">
                                            End-to-End Encrypted
                                        </span>
                                        <span className="auth-badge">
                                            Always Free
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

export default SignUpPage;
