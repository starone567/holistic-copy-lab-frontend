// File: src/App.jsx
import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import DemoChat from "./pages/DemoChat";
import FullChat from "./pages/FullChat";
import Login from "./pages/Login";
import Register from "./pages/Register";

function App() {
  const demoUser = () => {
    const alreadyUsed = localStorage.getItem("hasUsedDemo");
    if (alreadyUsed) {
      return { username: "demo", free_quota: 0, token_balance: 0 };
    } else {
      localStorage.setItem("hasUsedDemo", "true");
      return { username: "demo", free_quota: 5, token_balance: 0 };
    }
  };

  const [user, setUser] = useState(() => {
    const stored = localStorage.getItem("user");
    return stored ? JSON.parse(stored) : demoUser();
  });

  function updateUser() {
    const stored = localStorage.getItem("user");
    if (stored) {
      setUser(JSON.parse(stored));
    }
  }

  function logout() {
    setUser(null);
    localStorage.removeItem("user");
  }

  useEffect(() => {
    if (!user) localStorage.removeItem("user");
  }, [user]);

  return (
    <Router>
      <Navbar user={user} logout={logout} />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/demo" element={<DemoChat user={user} updateUser={updateUser} />} />
        <Route path="/chat" element={<FullChat user={user} updateUser={updateUser} />} />
        <Route path="/login" element={<Login setUser={setUser} />} />
        <Route path="/register" element={<Register setUser={setUser} />} />
      </Routes>
    </Router>
  );
}

export default App;