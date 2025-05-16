export default function Hero() {
  return (
    <section className="flex flex-col items-center justify-center min-h-[60vh] text-center px-4 py-16 bg-white">
      <img src="/assets/logo-holistic.svg" alt="Holistic Copy Lab Logo" className="w-24 mb-6" />
      <h1 className="text-4xl sm:text-6xl font-extrabold mb-4 tracking-tight text-blue-900">
        Holistic Copy Lab
      </h1>
      <p className="text-xl sm:text-2xl max-w-2xl mb-6 text-gray-700">
        Vaš <b>premium copywriting</b> i <b>AI chatbot</b> partner za health & wellness tržište.<br/>
        Tekstovi koji prodaju. Chatbot koji uvijek odgovara.
      </p>
      <a href="#contact" className="inline-block px-8 py-3 bg-blue-700 text-white rounded-2xl shadow-lg hover:bg-blue-800 transition-all font-semibold text-lg">
        Zatraži ponudu
      </a>
    </section>
  );
}
