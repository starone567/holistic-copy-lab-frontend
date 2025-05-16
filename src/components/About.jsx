export default function About() {
  return (
    <section id="about" className="py-16 bg-white">
      <div className="max-w-4xl mx-auto px-6 flex flex-col md:flex-row gap-10 items-center">
        <img src="/assets/team-placeholder.jpg" alt="Tim" className="w-64 h-64 object-cover rounded-2xl shadow-md mb-6 md:mb-0" />
        <div>
          <h2 className="text-3xl font-bold mb-4 text-blue-900">O nama</h2>
          <p className="text-gray-700 text-lg mb-4">
            Mi smo <b>Holistic Copy Lab</b> – stručnjaci za copywriting, content strategiju i AI chatbot integraciju za health & wellness nišu. Naš tim okuplja iskusne copywritere, AI entuzijaste i marketinške profesionalce s jednom misijom: <i>osnažiti vaš brand kroz pametan sadržaj i inovativnu automatizaciju!</i>
          </p>
          <p className="text-gray-700">
            Vjerujemo u <b>holistički pristup</b> – povezujemo autentične tekstove, jasnu komunikaciju i vrhunsku tehnologiju. Surađujemo s web dizajnerima, terapeutima i wellness stručnjacima diljem Europe. 
          </p>
        </div>
      </div>
    </section>
  );
}
