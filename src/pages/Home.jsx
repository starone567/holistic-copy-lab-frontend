import React from "react";
import { Link } from "react-router-dom";

export default function Home() {
  return (
    <main className="text-gray-800">
      {/* HERO */}
      <section className="text-center py-20 bg-gradient-to-b from-white to-blue-50">
        <h1 className="text-4xl md:text-5xl font-bold text-blue-800 mb-4">
          Dobrodošli u Holistic Copy Lab
        </h1>
        <p className="text-gray-600 mb-6">
          AI alat za kreiranje wellness sadržaja. Isprobaj besplatno odmah!
        </p>
        <Link
          to="/demo"
          className="bg-blue-600 text-white px-6 py-3 rounded hover:bg-blue-700 transition"
        >
          Isprobaj besplatno
        </Link>
      </section>

      {/* USLUGE */}
      <section id="services" className="py-20">
        <div className="max-w-4xl mx-auto text-center px-4">
          <h2 className="text-3xl font-bold text-blue-800 mb-4">Naše usluge</h2>
          <p className="text-gray-600">
            Nudimo AI-generiranje sadržaja, chatbotove za wellness sajtove,
            copywriting za društvene mreže i više.
          </p>
        </div>
      </section>

      {/* O NAMA */}
      <section id="about" className="py-20 bg-gray-50">
        <div className="max-w-4xl mx-auto text-center px-4">
          <h2 className="text-3xl font-bold text-blue-800 mb-4">O nama</h2>
          <p className="text-gray-600">
            Holistic Copy Lab je tim stručnjaka za AI, sadržaj i wellness
            tržište. Kombiniramo kreativnost i tehnologiju kako bismo pomogli
            tvom biznisu da zablista.
          </p>
        </div>
      </section>

      {/* TESTIMONIALI */}
      <section id="testimonials" className="py-20">
        <div className="max-w-4xl mx-auto text-center px-4">
          <h2 className="text-3xl font-bold text-blue-800 mb-4">
            Što korisnici kažu
          </h2>
          <blockquote className="italic text-gray-600 mb-6">
            „Nevjerovatan alat! Moji tekstovi za Instagram nikada nisu bili
            bolji.“ <br />– <strong>Ana, wellness trenerica</strong>
          </blockquote>
          <blockquote className="italic text-gray-600">
            „Brže pišem blogove, imam više vremena za klijente. Preporuka!“
            <br />– <strong>Marko, holistički terapeut</strong>
          </blockquote>
        </div>
      </section>

      {/* FEATURE BLOK sa ikonama */}
      <section className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold mb-6 text-blue-800">
            Spremni za novi nivo?
          </h2>
          <p className="mb-10 text-gray-600">
            Evo zašto klijenti biraju Holistic Copy Lab za svoj wellness biznis
            👇
          </p>

          <div className="grid gap-8 md:grid-cols-3">
            {/* Ikonica 1 */}
            <div className="flex flex-col items-center">
              <div className="text-blue-500 text-5xl mb-4">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  className="w-12 h-12"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M9 9l10.5-6m0 0L12 12m7.5-9L12 21 3 9l7.5-6z"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2">Kreativni sadržaj</h3>
              <p className="text-gray-600">
                AI vam pomaže stvoriti sadržaj koji ističe vaš brend i dopire
                do pravih klijenata.
              </p>
            </div>

            {/* Ikonica 2 */}
            <div className="flex flex-col items-center">
              <div className="text-blue-500 text-5xl mb-4">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  className="w-12 h-12"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M12 6v6l4 2m6 2.5a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2">Chatbot podrška</h3>
              <p className="text-gray-600">
                Naš AI chatbot odgovara na FAQ pitanja i podržava korisnike
                24/7.
              </p>
            </div>

            {/* Ikonica 3 */}
            <div className="flex flex-col items-center">
              <div className="text-blue-500 text-5xl mb-4">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  className="w-12 h-12"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M18.364 5.636l-1.414 1.414a9 9 0 11-1.414-1.414l1.414-1.414a11 11 0 101.414 1.414z"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2">Društvene mreže</h3>
              <p className="text-gray-600">
                Optimiziraj objave i dosegni više pratilaca uz automatski
                generisane postove.
              </p>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
