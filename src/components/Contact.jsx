import { useState } from "react";

export default function Contact() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [success, setSuccess] = useState(false);

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }
  async function handleSubmit(e) {
    e.preventDefault();
    const res = await fetch("http://localhost:3001/api/contact", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form)
    });
    if (res.ok) setSuccess(true);
  }

  return (
    <section id="contact" className="py-16 bg-blue-50">
      <div className="max-w-2xl mx-auto px-6">
        <h2 className="text-3xl font-bold mb-4 text-blue-900">Kontaktirajte nas</h2>
        {success ? (
          <div className="p-6 bg-green-50 text-green-800 rounded-2xl">Hvala na poruci! Javit ćemo vam se uskoro.</div>
        ) : (
        <form className="space-y-4" onSubmit={handleSubmit}>
          <input type="text" name="name" placeholder="Ime" className="w-full p-3 rounded-xl border" required value={form.name} onChange={handleChange} />
          <input type="email" name="email" placeholder="Email" className="w-full p-3 rounded-xl border" required value={form.email} onChange={handleChange} />
          <textarea name="message" placeholder="Poruka" className="w-full p-3 rounded-xl border min-h-[120px]" required value={form.message} onChange={handleChange} />
          <button type="submit" className="bg-blue-700 text-white px-8 py-3 rounded-2xl shadow-lg hover:bg-blue-800 transition-all font-semibold text-lg">
            Pošalji
          </button>
        </form>
        )}
      </div>
    </section>
  );
}
