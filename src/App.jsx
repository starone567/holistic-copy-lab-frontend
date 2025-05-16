import React, { useState, useEffect } from "react";
import Hero from "./components/Hero";
import Services from "./components/Services";
import About from "./components/About";
import Contact from "./components/Contact";
import Chatbot from "./components/Chatbot";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Login from "./components/Login";
import ChangePassword from "./components/ChangePassword";
import BuyTokens from "./components/BuyTokens";

function App() {
  // Učitava user-a iz localStorage, uključuje password za auto-refresh
  const [user, setUser] = useState(() => {
    const stored = localStorage.getItem("user");
    return stored ? JSON.parse(stored) : null;
  });

  // Osvježava broj free_quota/token_balance nakon svakog chata/kupnje
  async function updateUser() {
    if (!user) return;
    const res = await fetch("http://localhost:3001/api/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username: user.username, password: user.password })
    });
    const data = await res.json();
    if (data.success) {
      setUser({ ...user, ...data, password: user.password });
      localStorage.setItem("user", JSON.stringify({ ...user, ...data, password: user.password }));
    }
  }

  // Odjava
  function logout() {
    setUser(null);
    localStorage.removeItem("user");
  }

  useEffect(() => {
    if (!user) localStorage.removeItem("user");
  }, [user]);

  // Ako user nije logiran, prikazuje login formu
  if (!user) return <Login setUser={setUser} />;

  // Kad je user logiran, prikazuje cijelu stranicu s korisničkim info
  return (
    <div className="bg-gradient-to-b from-white via-gray-50 to-blue-50 min-h-screen font-sans">
      <Navbar />
      <div className="max-w-6xl mx-auto px-2">
        <div className="flex justify-between items-center mt-2">
          <div>
            <b>Korisnik:</b> {user.username} | <b>Free:</b> {user.free_quota} | <b>Tokeni:</b> {user.token_balance}
          </div>
          <div>
            <button className="text-blue-800 underline" onClick={logout}>Odjava</button>
          </div>
        </div>
        {/* Dugme za Stripe TEST kupnju tokena */}
        <BuyTokens user={user} updateUser={updateUser} />
        {/* Promjena lozinke */}
        <ChangePassword user={user} onLogout={logout} />
      </div>
      {/* Ostatak web stranice */}
      <Hero />
      <Services />
      <About />
      <Contact />
      {/* Chatbot s prikazom stanja i automatskim refreshom */}
      <Chatbot user={user} updateUser={updateUser} />
      <Footer />
    </div>
  );
}

export default App;
