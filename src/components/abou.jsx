import React from "react";

export default function About() {

  return (
    <section className="py-20 px-6 md:px-12 lg:px-20 bg-background">
      <div className="max-w-5xl mx-auto flex flex-col md:flex-row items-center gap-12">
        {/* Grafik (SVG-Blob) als visueller Akzent, Profilbild darübergelegt */}
        <div className="flex-shrink-0 relative">
          <svg
            viewBox="0 0 200 200"
            xmlns="http://www.w3.org/2000/svg"
            className="w-48 h-48 md:w-64 md:h-64"
          >
            <defs>
              <linearGradient id="blobGradient" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0%" stopColor="#818CF8"></stop>
                <stop offset="100%" stopColor="#A5B4FC"></stop>
              </linearGradient>
            </defs>
            <path
              fill="url(#blobGradient)"
              d="M44.8,-67.2C56.7,-59.2,63.7,-44.2,68.2,-29.6C72.7,-15,74.7,-0.7,71.2,12.2C67.7,25.1,58.7,36.6,47.2,45.7C35.7,54.8,21.8,61.5,7.1,62.7C-7.6,63.9,-22.9,59.6,-36.2,52.1C-49.5,44.6,-60.8,33.9,-66.2,20.7C-71.6,7.5,-71.1,-8.2,-65.2,-21.2C-59.3,-34.2,-48,-44.5,-35.2,-52.2C-22.4,-59.9,-11.2,-64.9,3.1,-69.1C17.4,-73.3,34.8,-76.7,44.8,-67.2Z"
              transform="translate(100 100)"></path>
          </svg>
          <img
            src="./bilder/profil bild.jpg"
            alt="Profilbild"
            className="absolute top-1/2 left-1/2 w-32 h-32 md:w-44 md:h-44 rounded-full object-cover border-4 border-background shadow-lg"
            style={{ transform: "translate(-50%, -50%)" }}
          />
        </div>

        {/* Text & Skills */}
        <div className="flex-1">
          <h2 className="text-4xl font-bold text-headingColor mb-4">Über mich</h2>
          <p className="text-lg text-textColor mb-6">
            Ich gestalte nutzerzentrierte Interfaces und löse Frontend-Probleme strukturiert: von
            sauberer Informationsarchitektur über barrierearme Komponenten bis hin zu klaren
            Code-Strukturen. Besonders wichtig sind mir konsistente Designs und eine gute
            Developer Experience. Mit React, Astro und Tailwind CSS arbeite ich iterativ –
            prototypen, testen, verbessern – und lerne dabei kontinuierlich dazu, auch in
            Bereichen wie Performance-Optimierung.
          </p>
          <div className="mb-6">
            <h3 className="text-2xl font-semibold text-headingColor mb-2">Skills</h3>
            <div className="flex flex-wrap gap-3">
              <span className="px-3 py-1 rounded-full text-sm font-medium bg-secondary/20 text-headingColor">
                HTML
              </span>
              <span className="px-3 py-1 rounded-full text-sm font-medium bg-secondary/20 text-headingColor">
                CSS
              </span>
              <span className="px-3 py-1 rounded-full text-sm font-medium bg-secondary/20 text-headingColor">
                JavaScript
              </span>
              <span className="px-3 py-1 rounded-full text-sm font-medium bg-secondary/20 text-headingColor">
                React
              </span>
              <span className="px-3 py-1 rounded-full text-sm font-medium bg-secondary/20 text-headingColor">
                Astro
              </span>
              <span className="px-3 py-1 rounded-full text-sm font-medium bg-secondary/20 text-headingColor">
                Tailwind CSS
              </span>
            </div>
          </div>
          {/* Primärer CTA zur Zertifikate-Seite (als Link, funktioniert ohne Client-JS) */}
          <div className="mb-6">
            <a
              href="/zertifikate"
              className="inline-block px-5 py-2 bg-primary hover:bg-primary/80 text-white font-semibold rounded-xl shadow transition"
            >
              Zertifikate anzeigen
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
