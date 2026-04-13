import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import "./LoginPage.css";

function LoginPage({ darkMode, toggleTheme }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await axios.post("http://localhost:5000/api/users/login", {
        email,
        password,
      });

      // ✅ Save token
      localStorage.setItem("token", res.data.token);

      // ✅ Navigate to dashboard
      navigate("/dashboard");
    } catch (error) {
      console.error("Login failed:", error.response?.data || error.message);
      alert(error.response?.data?.message || "Login failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={`login-container ${darkMode ? "dark" : ""}`}>
      <div className="login-card">
        <img src="/nityo-logo.png" alt="Nityo Logo" className="login-logo" />
        <h1 className="app-title">Nityo</h1>
        <p className="tagline">The Rhythm of Done. Discipline in Motion.</p>

        <button onClick={toggleTheme} className="theme-toggle">
          {darkMode ? "Switch to Light Mode" : "Switch to Dark Mode"}
        </button>

        <form onSubmit={handleLogin}>
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
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <button type="submit" disabled={loading}>
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>

        <p className="register-text">
          Don’t have an account?{" "}
          <Link to="/register" className="link">
            Register here
          </Link>
        </p>
      </div>
    </div>
  );
}

export default LoginPage;