import { useState } from "react";
import { supabase } from "../supabaseClient";
import { Link, useNavigate } from "react-router-dom";

export default function Login({ setUser }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(null);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);
    setLoading(true);

    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    setLoading(false);

    if (error) {
      setError(error.message);
    } else if (data.user) {
      setUser(data.user);
      localStorage.setItem("user", JSON.stringify(data.user));
      setSuccess("Uspješno ste prijavljeni!");
      setTimeout(() => navigate("/chat"), 1000); // Automatski redirect na chat
    } else {
      setError("Nepoznata greška. Pokušaj ponovo.");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-50 to-white">
      <form
        onSubmit={handleLogin}
        className="bg-white p-8 rounded-2xl shadow-xl w-full max-w-md"
      >
        <h2 className="text-2xl font-bold text-center mb-6 text-blue-900">
          Prijava
        </h2>
        <input
          type="email"
          placeholder="Email"
          className="w-full mb-4 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
          value={email}
          onChange={e => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Lozinka"
          className="w-full mb-4 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
          value={password}
          onChange={e => setPassword(e.target.value)}
          required
        />
        <button
          type="submit"
          disabled={loading}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 rounded-lg transition-colors duration-200"
        >
          {loading ? "Prijava..." : "Prijavi se"}
        </button>
        <div className="flex justify-between mt-4 text-sm">
          <Link to="/register" className="text-blue-600 hover:underline">
            Nemaš račun? Registriraj se
          </Link>
          <a
            href="mailto:support@holisticcopylab.com"
            className="text-gray-500 hover:underline"
          >
            Zaboravljena lozinka?
          </a>
        </div>
        {error && (
          <div className="text-red-600 mt-4 text-center">{error}</div>
        )}
        {success && (
          <div className="text-green-600 mt-4 text-center">{success}</div>
        )}
      </form>
    </div>
  );
}
