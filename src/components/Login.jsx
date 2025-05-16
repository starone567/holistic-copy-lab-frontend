import { useState } from "react";

export default function Login({ setUser }) {
  const [form, setForm] = useState({ username: "", password: "" });
  const [error, setError] = useState("");

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");
    const res = await fetch("http://localhost:3001/api/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form)
    });
    const data = await res.json();
    if (data.success) {
      setUser({ ...data, password: form.password });
      localStorage.setItem("user", JSON.stringify({ ...data, password: form.password }));
    } else {
      setError(data.error || "Greška");
    }
  }

  return (
    <section className="min-h-screen flex items-center justify-center bg-blue-50">
      <form className="bg-white shadow-lg p-8 rounded-2xl w-full max-w-xs flex flex-col gap-4" onSubmit={handleSubmit}>
        <h2 className="font-bold text-2xl text-blue-900 text-center">Login</h2>
        <input type="text" name="username" placeholder="Korisničko ime" required className="p-3 border rounded-xl" value={form.username} onChange={handleChange} />
        <input type="password" name="password" placeholder="Lozinka" required className="p-3 border rounded-xl" value={form.password} onChange={handleChange} />
        {error && <div className="text-red-600">{error}</div>}
        <button type="submit" className="bg-blue-700 text-white rounded-xl py-2 font-semibold hover:bg-blue-800">Prijavi se</button>
      </form>
    </section>
  );
}
