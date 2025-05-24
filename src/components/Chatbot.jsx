import React, { useState } from "react";
import { getFaqAnswer, saveUnansweredQuestion } from "../supabaseClient";

const Chatbot = ({ user, updateUser }) => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [lang, setLang] = useState("hr");

  // Prikaži quota info
  const isQuotaExceeded = user?.free_quota !== undefined && user.free_quota <= 0;

  // Smanji free_quota za usera
  const reduceQuota = () => {
    if (!user) return;
    if (user.free_quota > 0) {
      const updatedUser = { ...user, free_quota: user.free_quota - 1 };
      localStorage.setItem("user", JSON.stringify(updatedUser));
      updateUser();
    }
  };

  // Eksportiraj chat kao .txt
  const exportChat = () => {
    if (!messages.length) return;
    const lines = messages.map(
      (msg) => `${msg.sender === "user" ? "Ti" : "AI"}: ${msg.text}`
    );
    const content = lines.join("\n\n");
    const blob = new Blob([content], { type: "text/plain;charset=utf-8" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = "chat_export.txt";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Slanje poruke: koristi FAQ bazu + upisuje neodgovorena pitanja!
  const sendMessage = async (e) => {
    e.preventDefault();
    if (!input.trim()) return;

    const userMessage = { sender: "user", text: input };
    setMessages((prev) => [...prev, userMessage]);

    try {
      const res = await getFaqAnswer(input, lang);

      // Upis u "user_questions" ako nema odgovora iz FAQ
      if (!res.answer || res.answer.startsWith("Nažalost")) {
        await saveUnansweredQuestion(input, lang, user?.id || null);
      }

      const botMessage = { sender: "bot", text: res.answer };
      setMessages((prev) => [...prev, botMessage]);
      reduceQuota();
    } catch (err) {
      setMessages((prev) => [
        ...prev,
        { sender: "bot", text: "⚠️ Greška u komunikaciji sa bazom." },
      ]);
    }
    setInput("");
  };

  return (
    <div className="max-w-xl mx-auto mt-10 p-4 border rounded shadow bg-white">
      <h2 className="text-xl font-bold mb-2 text-center text-blue-800">
        🤖 Chatbot / FAQ
      </h2>

      {/* Jezik odabir */}
      <div className="mb-3 text-sm flex gap-4 items-center">
        <label>Jezik:&nbsp;</label>
        <select
          value={lang}
          onChange={e => setLang(e.target.value)}
          className="border rounded px-2 py-1"
        >
          <option value="hr">Hrvatski</option>
          <option value="de">Deutsch</option>
          <option value="en">English</option>
        </select>
      </div>

      {/* Info o korisniku + quota + tokeni + gumbi */}
      <div className="mb-2 text-sm text-gray-700 flex justify-between items-center">
        <div>
          <strong>Korisnik:</strong> {user?.username || user?.email || "n/a"} |{" "}
          <strong>Free quota:</strong> {user?.free_quota ?? "n/a"} |{" "}
          <strong>Tokeni:</strong> {user?.token_balance ?? "n/a"}
        </div>
        <div className="flex gap-3 items-center">
          <button
            onClick={exportChat}
            className="text-green-600 underline text-sm"
            title="Spremi razgovor kao .txt"
          >
            💾 Spremi
          </button>
          <button
            onClick={() => setMessages([])}
            className="text-red-500 underline text-sm"
            title="Očisti sve poruke"
          >
            🗑️ Očisti
          </button>
        </div>
      </div>

      {/* Chat prozor */}
      <div className="h-64 overflow-y-auto mb-4 space-y-2 border p-2 rounded bg-gray-50">
        {messages.map((msg, idx) => (
          <div
            key={idx}
            className={`p-2 rounded ${
              msg.sender === "user"
                ? "bg-blue-100 text-right"
                : "bg-green-100 text-left"
            }`}
          >
            <strong>{msg.sender === "user" ? (user?.username || "Ti") : "AI"}:</strong> {msg.text}
          </div>
        ))}
        {!messages.length && (
          <p className="text-center text-gray-400">🕊️ Nema poruka.</p>
        )}
      </div>

      {/* Forma za unos */}
      <form onSubmit={sendMessage} className="flex gap-2">
        <input
          type="text"
          value={input}
          onChange={e => setInput(e.target.value)}
          placeholder={
            isQuotaExceeded
              ? "Iskoristili ste sve besplatne poruke."
              : "Unesi poruku..."
          }
          disabled={isQuotaExceeded}
          className={`flex-1 border p-2 rounded ${
            isQuotaExceeded ? "bg-gray-100 text-gray-400 cursor-not-allowed" : ""
          }`}
        />
        <button
          type="submit"
          disabled={isQuotaExceeded}
          className={`${
            isQuotaExceeded
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-blue-500 hover:bg-blue-600"
          } text-white px-4 py-2 rounded`}
        >
          Pošalji
        </button>
      </form>
    </div>
  );
};

export default Chatbot;
