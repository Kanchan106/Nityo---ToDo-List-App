import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LoginPage from "./components/pages/LoginPage";
import RegisterPage from "./components/pages/RegisterPage";
import Dashboard from "./components/pages/Dashboard";
import "./index.css";

function App() {
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    const savedTheme = localStorage.getItem("darkMode");
    if (savedTheme === "true") {
      setDarkMode(true);
      document.body.classList.add("dark");
    }
  }, []);

  const toggleTheme = () => {
    const newMode = !darkMode;
    setDarkMode(newMode);
    localStorage.setItem("darkMode", newMode);
    if (newMode) {
      document.body.classList.add("dark");
    } else {
      document.body.classList.remove("dark");
    }
  };

  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={<LoginPage darkMode={darkMode} toggleTheme={toggleTheme} />}
        />
        <Route
          path="/register"
          element={<RegisterPage darkMode={darkMode} toggleTheme={toggleTheme} />}
        />
        <Route path="/dashboard"
        element={<Dashboard darkMode={darkMode} toggleTheme={toggleTheme} />}
        />
        </Routes>
    </Router>
  );
}

export default App;