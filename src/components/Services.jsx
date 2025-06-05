const services = [
  {
    title: "Copywriting za web i prodaju",
    description: "Kreiramo uvjerljive, SEO optimizirane tekstove koji privlače i konvertiraju vaše klijente.",
    icon: "📝"
  },
  {
    title: "Integracija AI Chatbota",
    description: "Moderne AI FAQ integracije – chatbot koji zna odgovarati na pitanja i pretvarati posjetitelje u kupce.",
    icon: "🤖"
  },
  {
    title: "Strategija & Brand komunikacija",
    description: "Savjetujemo i stvaramo sadržaj koji stvara povjerenje u vaš brand.",
    icon: "💡"
  },
];

export default function Services() {
  return (
    <section id="services" className="py-16 bg-gradient-to-b from-blue-50 via-white to-blue-100">
      <div className="max-w-5xl mx-auto px-6">
        <h2 className="text-3xl font-bold mb-10 text-blue-900 text-center">Naše usluge</h2>
        <div className="grid md:grid-cols-3 gap-8">
          {services.map((s, i) => (
            <div key={i} className="bg-white rounded-2xl shadow-md p-8 flex flex-col items-center hover:scale-105 transition-all">
              <div className="text-5xl mb-4">{s.icon}</div>
              <h3 className="text-xl font-semibold mb-2">{s.title}</h3>
              <p className="text-gray-700">{s.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
