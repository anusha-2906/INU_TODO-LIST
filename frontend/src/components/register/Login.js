import { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import "./Register.css";

function Login() {
    const [formData, setFormData] = useState({ email: "", password: "" });
    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const login = async () => {
        try {
            const response = await axios.post("http://localhost:5000/api/users/login", formData);
            localStorage.setItem("token", response.data);
            alert("Login Successful!");
            navigate("/dashboard");
        } catch (error) {
            alert(error.response?.data?.msg || "Login Failed");
        }
    };

    return (
        <div className="auth-container">
            <div className="auth-card">
                <h2 className="auth-title">User Login</h2>
                <input
                    type="email"
                    name="email"
                    placeholder="Email"
                    value={formData.email}
                    onChange={handleChange}
                    className="auth-input"
                />
                <input
                    type="password"
                    name="password"
                    placeholder="Password"
                    value={formData.password}
                    onChange={handleChange}
                    className="auth-input"
                />
                <button onClick={login} className="auth-button">Login</button>
                <p className="auth-switch">
                    Don't have an account? <Link to="/register" className="auth-link">Register</Link>
                </p>
            </div>
        </div>
    );
}

export default Login;
