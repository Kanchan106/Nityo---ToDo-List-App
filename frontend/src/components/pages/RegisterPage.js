import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import "./RegisterPage.css";

function RegisterPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await axios.post("http://localhost:5000/api/users/register", {
        name,
        email,
        password,
      });

      // ✅ Save token
      localStorage.setItem("token", res.data.token);

      // ✅ Navigate to dashboard
      navigate("/dashboard");
    } catch (error) {
      console.error("Registration failed:", error.response?.data || error.message);
      alert(error.response?.data?.message || "Registration failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="register-container">
      <div className="register-card">
        <img src="/nityo-logo.png" alt="Nityo Logo" className="register-logo" />
        <h1 className="app-title">Nityo</h1>
        <p className="tagline">The Rhythm of Done. Discipline in Motion.</p>

        <form onSubmit={handleRegister}>
          <label>Full Name</label>
          <input
            type="text"
            placeholder="Enter your full name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />

          <label>Email Address</label>
          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <label>Password</label>
          <input
            type="password"
            placeholder="Create a password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <button type="submit" disabled={loading}>
            {loading ? "Registering..." : "Register"}
          </button>
        </form>

        <p className="login-text">
          Already have an account?{" "}
          <Link to="/" className="link">
            Login here
          </Link>
        </p>
      </div>
    </div>
  );
}

export default RegisterPage;