import { useState } from "react";
import { Link } from "react-router-dom";

export default function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-20 bg-white/80 backdrop-blur shadow">
      <nav className="max-w-7xl mx-auto px-6 flex items-center justify-between py-4">
        <Link to="/" className="flex items-center gap-3">
          <img
            src="/assets/logo-holistic.png"
            alt="Logo"
            className="w-20 h-16 hover:scale-105 transition-transform duration-300"
          />
          <span className="font-extrabold text-blue-900 text-xl tracking-tight">
            Holistic Copy Lab
          </span>
        </Link>

        <button
          className="md:hidden block text-3xl"
          onClick={() => setOpen(!open)}
        >
          ☰
        </button>

        <ul
          className={`md:flex gap-8 font-semibold text-blue-900 ${
            open ? "block" : "hidden"
          } md:block`}
        >
          <li><Link to="/#services">Usluge</Link></li>
          <li><Link to="/#about">O nama</Link></li>
          <li><Link to="/#contact">Kontakt</Link></li>
          <li><Link to="/demo">FAQ Chatbot</Link></li>
        </ul>
      </nav>
    </header>
  );
}
