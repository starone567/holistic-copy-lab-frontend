// src/pages/Login.jsx
import React, { useState } from "react";
import { supabase } from "../supabaseClient";
import { useNavigate } from "react-router-dom";

export default function Login({ setUser }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    if (error) {
      setMessage("Neispravni podaci ili korisnik ne postoji.");
    } else {
      setUser(data.user);
      navigate("/");
    }
    setLoading(false);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-[50vh] bg-gradient-to-b from-blue-50 to-white">
      <form onSubmit={handleLogin} className="bg-white shadow-lg rounded-xl p-8 w-full max-w-md space-y-6 mt-12">
        <h2 className="text-2xl font-bold text-center text-blue-900 mb-4">Prijava</h2>
        {message && <div className="text-center text-sm text-red-500">{message}</div>}
        <div>
          <label className="block text-gray-700 font-semibold mb-1" htmlFor="email">Email</label>
          <input
            id="email"
            type="email"
            className="w-full border rounded-lg px-3 py-2"
            value={email}
            onChange={e => setEmail(e.target.value)}
            required autoFocus
          />
        </div>
        <div>
          <label className="block text-gray-700 font-semibold mb-1" htmlFor="password">Lozinka</label>
          <input
            id="password"
            type="password"
            className="w-full border rounded-lg px-3 py-2"
            value={password}
            onChange={e => setPassword(e.target.value)}
            required
          />
        </div>
        <button
          type="submit"
          className="w-full bg-blue-700 hover:bg-blue-800 text-white font-semibold rounded-lg py-2 transition"
          disabled={loading}
        >
          {loading ? "Prijavljujem..." : "Prijava"}
        </button>
      </form>
    </div>
  );
}
