import { useState } from "react";

export default function Chatbot({ user, updateUser }) {
  const [userMsg, setUserMsg] = useState("");
  const [chat, setChat] = useState([]);
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  async function sendMsg(e) {
    e.preventDefault();
    if (!userMsg.trim()) return;
    setLoading(true);
    setErrorMsg("");
    setChat(prev => [...prev, { from: "user", text: userMsg }]);
    try {
      const res = await fetch("http://localhost:3001/api/chatbot", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId: user.userId, message: userMsg })
      });
      const data = await res.json();
      if (res.status === 402) {
        setErrorMsg("Iskoristili ste sve besplatne i kupljene odgovore. Kupite još tokena za nastavak korištenja!");
        setChat(prev => [...prev, { from: "bot", text: "Molimo kupite još tokena (Stripe test dugme je gore)." }]);
      } else if (data.reply) {
        setChat(prev => [...prev, { from: "bot", text: data.reply }]);
        if (typeof updateUser === "function") updateUser(); // Osvježi quota/token nakon svakog odgovora
      } else if (data.error) {
        setChat(prev => [...prev, { from: "bot", text: data.error }]);
      }
    } catch (e) {
      setErrorMsg("Došlo je do greške s poslužiteljem.");
      setChat(prev => [...prev, { from: "bot", text: "Došlo je do greške s poslužiteljem." }]);
    }
    setUserMsg("");
    setLoading(false);
  }

  // Prikaz broja preostalih odgovora
  const quota = user?.free_quota ?? 0;
  const tokens = user?.token_balance ?? 0;

  return (
    <section className="py-16 bg-white" id="chatbot">
      <div className="max-w-xl mx-auto px-6 rounded-2xl shadow-lg bg-gradient-to-b from-white to-blue-50">
        <h2 className="text-2xl font-bold mb-2 text-blue-900">FAQ & AI Chatbot</h2>
        <div className="mb-2 text-blue-900 font-semibold">
          Preostali odgovori: <span className="text-green-700">{quota}</span> (besplatno) + <span className="text-blue-800">{tokens}</span> (tokeni)
        </div>
        {errorMsg && (
          <div className="bg-red-100 text-red-800 px-4 py-2 rounded-xl mb-4">{errorMsg}</div>
        )}
        <form onSubmit={sendMsg} className="flex gap-2">
          <input
            type="text"
            className="flex-1 p-3 rounded-xl border"
            placeholder="Postavite pitanje..."
            value={userMsg}
            onChange={e => setUserMsg(e.target.value)}
            disabled={loading}
          />
          <button className="bg-blue-700 text-white px-6 py-3 rounded-xl" disabled={loading}>Pošalji</button>
        </form>
        <div className="mt-6 space-y-4 max-h-80 overflow-y-auto">
          {chat.map((msg, i) => (
            <div key={i} className={msg.from === "user" ? "text-right" : "text-left"}>
              <span className={msg.from === "user" ? "bg-blue-100 text-blue-900" : "bg-gray-100 text-gray-800"} style={{ padding: 8, borderRadius: 12, display: "inline-block" }}>
                {msg.text}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
