import React, { useState } from "react";

const Chatbot = ({ user, updateUser }) => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");

  const isQuotaExceeded = user?.free_quota <= 0;

  // Smanji free_quota
  const reduceQuota = () => {
    if (!user) return;

    if (user.free_quota > 0) {
      const updatedUser = {
        ...user,
        free_quota: user.free_quota - 1,
      };
      localStorage.setItem("user", JSON.stringify(updatedUser));
      updateUser(); // poziva refresh iz App.jsx
    }
  };

  // Eksport poruka u .txt
  const exportChat = () => {
    if (messages.length === 0) return;

    const lines = messages.map((msg) => {
      const label = msg.sender === "user" ? "Ti" : "AI";
      return `${label}: ${msg.text}`;
    });

    const content = lines.join("\n\n");
    const blob = new Blob([content], { type: "text/plain;charset=utf-8" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = "chat_export.txt";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Slanje poruke
  const sendMessage = async (e) => {
    e.preventDefault();
    if (!input.trim()) return;

    const userMessage = { sender: "user", text: input };
    setMessages((prev) => [...prev, userMessage]);

    try {
      const res = await fetch("http://localhost:3001/api/agent", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ message: input }),
      });

      const data = await res.json();
      const botMessage = { sender: "bot", text: data.reply };

      setMessages((prev) => [...prev, botMessage]);
      reduceQuota(); // smanji kvotu nakon odgovora
    } catch (err) {
      setMessages((prev) => [
        ...prev,
        { sender: "bot", text: "⚠️ Greška u komunikaciji sa serverom." },
      ]);
    }

    setInput("");
  };

  return (
    <div className="max-w-xl mx-auto mt-10 p-4 border rounded shadow bg-white">
      <h2 className="text-xl font-bold mb-2 text-center text-blue-800">
        🤖 Chatbot / FAQ
      </h2>

      {/* Info + dugmad */}
      <div className="mb-2 text-sm text-gray-700 flex justify-between items-center">
        <div>
          <strong>Korisnik:</strong> {user?.username || "n/a"} |{" "}
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
            <strong>{msg.sender === "user" ? "Ti" : "AI"}:</strong> {msg.text}
          </div>
        ))}
        {messages.length === 0 && (
          <p className="text-center text-gray-400">🕊️ Nema poruka.</p>
        )}
      </div>

      {/* Forma za unos */}
      <form onSubmit={sendMessage} className="flex gap-2">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
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
