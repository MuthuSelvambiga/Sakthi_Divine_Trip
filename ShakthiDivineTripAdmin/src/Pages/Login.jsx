import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { API_BASE_URL } from "../config";

function Login() {
    const navigate = useNavigate();

    const [userName, setUserName] = useState("");
    const [password, setPassword] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch(`${API_BASE_URL}/Auth/login`,

                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({
                        userName: userName,
                        password: password
                    })
                }
            );

            const data = await response.json();

            if (!response.ok) {
                alert(data.message || "Login failed.");
                return;
            }

            localStorage.setItem("token", data.token);

            navigate("/dashboard");

        } catch (error) {
            console.error("Login error:", error);
            alert("Unable to connect to the server.");
        }
    };

    return (
        <div className="login-page">

            <div className="login-card">

                {/* Logo */}
                <div className="login-logo">
                    <div className="login-logo-image">
                        <img
                            src="/SDT_LOGO.jpeg"
                            alt="Sakthi Divine Trip"
                        />
                    </div>

                    <h1>Sakthi Divine Trip</h1>
                    <p>Admin Portal</p>
                </div>

                {/* Login heading */}
                <div className="login-heading">
                    <h2>Welcome Back</h2>
                    <p>Sign in to manage your trips and bookings.</p>
                </div>

                <form onSubmit={handleSubmit}>

                    <div className="login-form-group">
                        <label>Username</label>

                        <input
                            type="text"
                            value={userName}
                            onChange={(e) =>
                                setUserName(e.target.value)
                            }
                            placeholder="Enter your username"
                            required
                        />
                    </div>

                    <div className="login-form-group">
                        <label>Password</label>

                        <input
                            type="password"
                            value={password}
                            onChange={(e) =>
                                setPassword(e.target.value)
                            }
                            placeholder="Enter your password"
                            required
                        />
                    </div>

                    <button
                        type="submit"
                        className="login-button"
                    >
                        Sign In
                    </button>

                </form>

                <div className="login-footer">
                    <span>© Sakthi Divine Trip</span>
                </div>

            </div>

        </div>
    );
}

export default Login;