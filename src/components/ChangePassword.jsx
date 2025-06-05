import { useState } from "react";

export default function ChangePassword({ user, onLogout }) {
  const [form, setForm] = useState({ oldPassword: "", newPassword: "" });
  const [msg, setMsg] = useState("");

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setMsg("");
    const res = await fetch("http://localhost:3001/api/change-password", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        username: user.username,
        oldPassword: form.oldPassword,
        newPassword: form.newPassword
      })
    });
    const data = await res.json();
    if (data.success) {
      setMsg("Lozinka je uspješno promijenjena. Prijavite se ponovo.");
      setTimeout(() => onLogout(), 1500);
    } else {
      setMsg(data.error || "Greška!");
    }
  }

  return (
    <div className="max-w-md mx-auto mt-8 p-6 bg-white shadow rounded-xl">
      <h2 className="font-bold text-lg mb-4">Promjena lozinke ({user.username})</h2>
      <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
        <input type="password" name="oldPassword" placeholder="Stara lozinka" className="p-3 border rounded-xl" value={form.oldPassword} onChange={handleChange} required />
        <input type="password" name="newPassword" placeholder="Nova lozinka" className="p-3 border rounded-xl" value={form.newPassword} onChange={handleChange} required />
        <button className="bg-blue-700 text-white rounded-xl py-2 font-semibold hover:bg-blue-800">Promijeni lozinku</button>
      </form>
      {msg && <div className="mt-3 text-blue-900">{msg}</div>}
    </div>
  );
}
