import Wave from "react-wavify";
import { useEffect, useState } from "react";

function useThemeColors() {
  const [colors, setColors] = useState({
    waveBg: "", // Dynamisch aus CSS-Variablen
    cutBg: "",   // Dynamisch aus CSS-Variablen
    text: ""     // Dynamisch aus CSS-Variablen
  });

  useEffect(() => {
    const rootStyles = () => getComputedStyle(document.documentElement);
    
    const updateColors = () => {
      const html = document.documentElement;
      const isDark = html.classList.contains('dark');
      const styles = rootStyles();
      const newWaveBg = isDark
        ? styles.getPropertyValue('--color-heading').trim()
        : styles.getPropertyValue('--color-secondary').trim();
      const newCutBg = styles.getPropertyValue('--color-background').trim();
      const newText = isDark ? '#fff' : styles.getPropertyValue('--color-text').trim();
      setColors({ waveBg: newWaveBg, cutBg: newCutBg, text: newText });
    };

    updateColors();

    // Beobachte Änderungen an der class des <html>-Elements
    const observer = new MutationObserver(updateColors);
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ['class'] });

    return () => observer.disconnect();
  }, []);

  return colors;
}

export default function WaveTransition({
  className = "",
  title = ""
}) {
  const sectionHeight = 320;
  const waveHeight = 120;
  const { waveBg, cutBg, text } = useThemeColors();

  if (!waveBg || !cutBg || !text) {
    return null; // Render nichts, bis Farben geladen sind
  }

  return (
    <section
      className={`relative w-full overflow-hidden flex items-center justify-center ${className}`}
      style={{
        marginTop: "-1px",
        marginBottom: "-1px",
        background: waveBg,
        height: sectionHeight,
        minHeight: sectionHeight,
      }}
    >
      {/* Obere animierte Welle */}
      <div
        className="absolute top-0 left-0 w-full"
        style={{ height: waveHeight, transform: "translateY(-1px)" }}
      >
        <Wave
          fill={cutBg}
          paused={false}
          options={{
            height: 35,
            amplitude: 30,
            speed: 0.15,
            points: 4,
          }}
          style={{ display: "block" }}
          className="rotate-180"
        />
      </div>
      {/* Titel exakt zentriert */}
      <div className="relative z-10 w-full text-center">
        {title && (
          <h2 className="text-3xl md:text-5xl font-bold drop-shadow-lg" style={{ color: text }}>
            {title}
          </h2>
        )}
      </div>
      {/* Untere animierte Welle */}
      <div
        className="absolute bottom-0 left-0 w-full"
        style={{ height: waveHeight, transform: "translateY(1px)" }}
      >
        <Wave
          fill={cutBg}
          paused={false}
          options={{
            height: 35,
            amplitude: 30,
            speed: 0.15,
            points: 4,
          }}
          style={{ display: "block" }}
        />
      </div>
    </section>
  );
} 