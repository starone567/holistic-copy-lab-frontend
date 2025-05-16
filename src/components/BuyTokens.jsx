export default function BuyTokens({ user, updateUser }) {
  async function buyTokens(amount) {
    const res = await fetch("http://localhost:3001/api/buy-tokens", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        userId: user.userId,
        tokenPackage: { amount, price: 2.99 }
      })
    });
    const data = await res.json();
    if (data.url) window.location.href = data.url;
  }

  return (
    <div className="my-6 text-center">
      <button
        className="bg-green-600 text-white rounded-xl px-6 py-2 shadow-lg hover:bg-green-700"
        onClick={() => buyTokens(5)}
      >
        Kupi 5 tokena (Stripe TEST)
      </button>
    </div>
  );
}
