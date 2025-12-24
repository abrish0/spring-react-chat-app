import { useState } from "react";
import BorderAnimatedContainer from "../components/BorderAnimatedContainer";
import { MessageCircleIcon, LockIcon, MailIcon, UserIcon } from "lucide-react";
import { Link,useNavigate } from "react-router-dom";
import "./../styles/signup.css";
import {signup as signupApi} from './../api/auth'
import toast from "react-hot-toast";


function SignUpPage() {
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        username: "",
        email: "",
        password: "",
    });

    async function handleSubmit(e) {
        e.preventDefault();

        try {
            const response = await signupApi(formData);

            if (response.success) {
                toast.success(response.message);
                navigate("/login");
            } else {
                toast.error(response.message);
            }
        } catch (err) {
            toast.error("Signup failed");
        }
    }

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
                                        {/* USERNAME */}
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
                                                            username:
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
                                        <Link to="/login" className="auth-link">
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
