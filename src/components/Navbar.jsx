import { useState } from "react";
export default function Navbar() {
  const [open, setOpen] = useState(false);
  return (
    <header className="sticky top-0 z-20 bg-white/80 backdrop-blur shadow">
      <nav className="max-w-7xl mx-auto px-6 flex items-center justify-between py-4">
        <div className="flex items-center gap-2">
          <img src="/assets/logo-holistic.svg" className="w-10 h-10" alt="Logo" />
          <span className="font-extrabold text-blue-900 text-xl tracking-tight">Holistic Copy Lab</span>
        </div>
        <button className="md:hidden block text-3xl" onClick={() => setOpen(!open)}>☰</button>
        <ul className={`md:flex gap-8 font-semibold text-blue-900 ${open ? "block" : "hidden"} md:block`}>
          <li><a href="#services">Usluge</a></li>
          <li><a href="#about">O nama</a></li>
          <li><a href="#contact">Kontakt</a></li>
          <li><a href="#chatbot">FAQ Chatbot</a></li>
        </ul>
      </nav>
    </header>
  );
}
