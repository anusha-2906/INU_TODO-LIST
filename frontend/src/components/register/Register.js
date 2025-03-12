import { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import "./Register.css";

function Register() {
    const [formData, setFormData] = useState({ name: "", email: "", password: "" });
    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const register = async () => {
        try {
            await axios.post("http://localhost:5000/api/users/register", formData);
            alert("Registration Successful!");
            navigate("/login");
        } catch (error) {
            alert(error.response?.data?.msg || "Registration Failed");
        }
    };

    return (
        <div className="auth-container">
            <div className="auth-card">
                <h2 className="auth-title">User Registration</h2>
                <input
                    type="text"
                    name="name"
                    placeholder="Name"
                    value={formData.name}
                    onChange={handleChange}
                    className="auth-input"
                />
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
                <button onClick={register} className="auth-button">Register</button>
                <p className="auth-switch">
                    Already have an account? <Link to="/login" className="auth-link">Login</Link>
                </p>
            </div>
        </div>
    );
}

export default Register;
