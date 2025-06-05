import { useState } from "react";
import { Link } from "react-router-dom";

export default function Navbar({ user, logout }) {
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

        {/* Login/Logout blok */}
        <div className="flex gap-3 items-center ml-6">
          {!user ? (
            <>
              <Link
                to="/login"
                className="text-blue-900 border px-3 py-1 rounded hover:bg-blue-50 transition"
              >
                Prijava
              </Link>
              <Link
                to="/register"
                className="text-white bg-blue-900 px-3 py-1 rounded hover:bg-blue-800 transition"
              >
                Registracija
              </Link>
            </>
          ) : (
            <>
              <span className="font-semibold text-blue-900">
                {user.username || "Korisnik"}
              </span>
              <button
                onClick={logout}
                className="text-white bg-red-600 px-3 py-1 rounded hover:bg-red-700 transition"
              >
                Odjava
              </button>
            </>
          )}
        </div>
      </nav>
    </header>
  );
}
