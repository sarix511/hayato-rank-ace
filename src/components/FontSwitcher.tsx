import { useState } from "react";

const FONTS = [
  { label: "Orbitron", display: "'Orbitron', sans-serif", body: "'Rajdhani', sans-serif" },
  { label: "Russo One", display: "'Russo One', sans-serif", body: "'Exo 2', sans-serif" },
  { label: "Press Start", display: "'Press Start 2P', monospace", body: "'Share Tech Mono', monospace" },
  { label: "Poppins", display: "'Poppins', sans-serif", body: "'Poppins', sans-serif" },
];

// Inject extra Google Fonts on mount
const link = document.createElement("link");
link.rel = "stylesheet";
link.href = "https://fonts.googleapis.com/css2?family=Press+Start+2P&family=Poppins:wght@400;500;600;700;800;900&family=Russo+One&family=Exo+2:wght@400;500;600;700;800;900&display=swap";
document.head.appendChild(link);

const FontSwitcher = () => {
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState(0);

  const applyFont = (index: number) => {
    setActive(index);
    const f = FONTS[index];
    document.documentElement.style.setProperty("--font-display", f.display);
    document.documentElement.style.setProperty("--font-body", f.body);
    // Apply directly to elements
    document.querySelectorAll<HTMLElement>(".font-display").forEach(el => el.style.fontFamily = f.display);
    document.querySelectorAll<HTMLElement>(".font-body").forEach(el => el.style.fontFamily = f.body);
    document.body.style.fontFamily = f.body;
  };

  return (
    <div className="fixed bottom-4 right-4 z-50">
      {open && (
        <div className="mb-2 bg-card border border-border rounded-lg p-3 gold-border-glow animate-[fadeInUp_0.2s_ease-out]">
          <p className="text-xs font-mono text-muted-foreground mb-2">CHANGE FONT</p>
          <div className="space-y-1">
            {FONTS.map((f, i) => (
              <button
                key={f.label}
                onClick={() => applyFont(i)}
                className={`block w-full text-left px-3 py-2 rounded text-sm transition-all ${
                  active === i
                    ? "bg-primary/20 text-primary border border-primary/40"
                    : "text-foreground hover:bg-secondary border border-transparent"
                }`}
                style={{ fontFamily: f.display }}
              >
                {f.label}
              </button>
            ))}
          </div>
        </div>
      )}
      <button
        onClick={() => setOpen(!open)}
        className="w-10 h-10 rounded-full bg-card border border-border flex items-center justify-center text-primary hover:gold-glow transition-all"
        title="Change Font"
      >
        <span className="text-base">Aa</span>
      </button>
    </div>
  );
};

export default FontSwitcher;
