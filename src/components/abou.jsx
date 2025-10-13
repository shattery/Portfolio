import React, { useState, useMemo } from "react";
// About-Section: Persönliche Vorstellung, Skills-Auswahl und Schnellzugriff auf Zertifikate

// Normalisierte Datenstruktur für Zertifikate
// Hinweis: Diese Datenquelle ist eine lokale Kopie. Die vollständige Liste und Darstellung
// befindet sich auf der Seite "/zertifikate". Hier verwenden wir sie nur, um die Skills
// zu generieren und ein Inline-Panel für eine geöffnete Kategorie zu zeigen.
const CERTIFICATES = [
  {
    category: "HTML",
    items: [
      { name: "Learn HTML Course", url: "/Zertifikate/Learn HTML Course.pdf" },
      { name: "Learn HTML Fundamentals Course", url: "/Zertifikate/Learn HTML Fundamentals Course.pdf" },
      { name: "Learn HTML Forms Course", url: "/Zertifikate/Learn HTML Forms Course.pdf" },
      { name: "Learn HTML Semantic HTML Course", url: "/Zertifikate/Learn HTML Semantic HTML Course.pdf" },
      { name: "Learn HTML Tables Course", url: "/Zertifikate/Learn HTML Tables Course.pdf" },
    ],
  },
  {
    category: "CSS",
    items: [
      { name: "Learn CSS Course", url: "/Zertifikate/Learn CSS Course.pdf" },
      { name: "Learn CSS Box Model and Layout Course", url: "/Zertifikate/Learn CSS Box Model and Layout Course.pdf" },
      { name: "Learn CSS Browser Compatibility Course", url: "/Zertifikate/Learn CSS Browser Compatibility Course.pdf" },
      { name: "Learn CSS Colors Course", url: "/Zertifikate/Learn CSS Colors Course.pdf" },
      { name: "Learn CSS Introduction Course", url: "/Zertifikate/Learn CSS Introduction Course.pdf" },
      { name: "Learn CSS Transitions and Animations Course", url: "/Zertifikate/Learn CSS Transitions and Animations Course.pdf" },
      { name: "Learn CSS Typography and Fonts Course", url: "/Zertifikate/Learn CSS Typography and Fonts Course.pdf" },
    ],
  },
  {
    category: "JavaScript",
    items: [{ name: "Learn JavaScript Course", url: "/Zertifikate/Learn JavaScript Course.pdf" }],
  },
  { category: "Navigation Design", items: [{ name: "Learn Navigation Design Course", url: "/Zertifikate/Learn Navigation Design Course.pdf" }] },
  { category: "Color Design", items: [{ name: "Learn Color Design Course", url: "/Zertifikate/Learn Color Design Course.pdf" }] },
  { category: "Generative AI", items: [{ name: "Intro to Generative AI Course", url: "/Zertifikate/Intro to Generative AI Course.pdf" }] },
  { category: "Web Deployment", items: [{ name: "How to Deploy a Website Course", url: "/Zertifikate/How to Deploy a Website Course.pdf" }] },
];

// Ermittelt grob den Dateityp über die URL-Endung, um Hinweise (pdf/image/link) anzeigen zu können
function inferTypeFromUrl(url) {
  try {
    const lower = (url || "").toLowerCase();
    if (lower.endsWith(".png") || lower.endsWith(".jpg") || lower.endsWith(".jpeg") || lower.endsWith(".webp")) return "image";
    if (lower.endsWith(".pdf")) return "pdf";
    return "link";
  } catch (e) {
    console.error("Fehler beim inferTypeFromUrl:", e);
    return "link";
  }
}

// Hauptkomponente für den About-Bereich
export default function About() {
  const [openCategory, setOpenCategory] = useState(null);

  // Abgeleitete, sortierte Daten mit Typerkennung
  // - ergänzt jedes Item um ein "type"-Feld
  // - sortiert Items alphabetisch (de-Locale)
  // - sortiert Kategorien alphabetisch (de-Locale)
  const categories = useMemo(() => {
    return CERTIFICATES.map((cat) => ({
      category: cat.category,
      items: [...(cat.items || [])]
        .map((it) => ({ ...it, type: it.type || inferTypeFromUrl(it.url) }))
        .sort((a, b) => a.name.localeCompare(b.name, "de")),
    })).sort((a, b) => a.category.localeCompare(b.category, "de"));
  }, []);

  // Die aktuell geöffnete Kategorie finden
  const currentCategory = useMemo(() => {
    return categories.find((cat) => cat.category === openCategory);
  }, [openCategory, categories]);

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
            Hi, ich bin Hannes, ein kreativer und leidenschaftlicher Frontend-Entwickler aus Deutschland. Ich liebe es, moderne, performante und ästhetische Webanwendungen zu bauen, die nicht nur gut aussehen, sondern sich auch richtig gut anfühlen. Mein Fokus liegt auf React, Astro, Tailwind CSS und allem, was das Web schöner macht!
          </p>
          <div className="mb-6">
            <h3 className="text-2xl font-semibold text-headingColor mb-2">Skills</h3>
            <div className="flex flex-wrap gap-3">
              {categories.map(({ category }) => (
                <button
                  key={category}
                  className={`px-3 py-1 rounded-full text-sm font-medium transition cursor-default ${
                    openCategory === category
                      ? "bg-secondary text-black"
                      : "bg-secondary/20 text-headingColor hover:bg-secondary/40"
                  }`}
                  onClick={() => setOpenCategory((c) => (c === category ? null : category))}
                  aria-expanded={openCategory === category}
                  aria-controls={`panel-${category}`}
                >
                  {category}
                </button>
              ))}
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
          {/* Optionales Inline-Panel: zeigt die Items der aktuell geöffneten Kategorie */}
          {currentCategory && (
            <div
              id={`panel-${currentCategory.category}`}
              className="bg-secondary/10 border-l-4 border-secondary p-4 rounded shadow-sm"
            >
              <h4 className="text-xl font-semibold text-headingColor mb-3">
                {currentCategory.category} Zertifikate
              </h4>
              <ul className="space-y-2">
                {currentCategory.items.map((zert, i) => (
                  <li key={i} className="flex items-center justify-between gap-3">
                    <div className="min-w-0">
                      <span className="block text-headingColor truncate">{zert.name}</span>
                      <span className="text-xs text-textColor/70 uppercase">{zert.type}</span>
                    </div>
                    {zert.url && (
                      <a
                        href={zert.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="shrink-0 inline-flex items-center gap-2 text-secondary hover:text-primary underline"
                      >
                        Öffnen
                      </a>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}