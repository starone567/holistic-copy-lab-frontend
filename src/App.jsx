import React, { useState, useEffect } from "react";
import Hero from "./components/Hero";
import Services from "./components/Services";
import About from "./components/About";
import Contact from "./components/Contact";
import Chatbot from "./components/Chatbot";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
// import Login from "./components/Login";  // <-- privremeno ne treba
import ChangePassword from "./components/ChangePassword";
import BuyTokens from "./components/BuyTokens";

function App() {
  // Local user state, ali za demo ignoriramo login
  const [user, setUser] = useState(() => {
    const stored = localStorage.getItem("user");
    return stored ? JSON.parse(stored) : null;
  });

  // Dodajemo demo korisnika kad nije logiran nitko
  const demoUser = {
    username: "demo",
    free_quota: 5,
    token_balance: 0,
  };

  // Osvježava broj free_quota/token_balance nakon svakog chata/kupnje
  async function updateUser() {}

  // Odjava
  function logout() {
    setUser(null);
    localStorage.removeItem("user");
  }

  useEffect(() => {
    if (!user) localStorage.removeItem("user");
  }, [user]);

  // UMJESTO: if (!user) return <Login setUser={setUser} />;
  // Samo prikazuj sve, koristi demoUser kad nema logiranog usera
  const currentUser = user || demoUser;

  return (
    <div className="bg-gradient-to-b from-white via-gray-50 to-blue-50 min-h-screen font-sans">
      <Navbar />
      <div className="max-w-6xl mx-auto px-2">
        <div className="flex justify-between items-center mt-2">
          <div>
            <b>Korisnik:</b> {currentUser.username} | <b>Free:</b> {currentUser.free_quota} | <b>Tokeni:</b> {currentUser.token_balance}
          </div>
          <div>
            {/* Možeš sakriti Odjavu u demo-u, ili ostavi */}
            <button className="text-blue-800 underline" onClick={logout}>Odjava</button>
          </div>
        </div>
        {/* Dugme za Stripe TEST kupnju tokena */}
        <BuyTokens user={currentUser} updateUser={updateUser} />
        {/* Promjena lozinke */}
        <ChangePassword user={currentUser} onLogout={logout} />
      </div>
      {/* Ostatak web stranice */}
      <Hero />
      <Services />
      <About />
      <Contact />
      {/* Chatbot s prikazom stanja i automatskim refreshom */}
      <Chatbot user={currentUser} updateUser={updateUser} />
      <Footer />
    </div>
  );
}

export default App;
