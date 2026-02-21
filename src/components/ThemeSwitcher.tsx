import { useState, useEffect } from "react";

const THEMES = [
  { id: "gold-dark", label: "🌑 Gold Dark", icon: "👑" },
  { id: "gold-light", label: "☀️ Gold Light", icon: "✨" },
  { id: "cyber-blue", label: "🔵 Cyber Blue", icon: "💎" },
  { id: "neon-purple", label: "🟣 Neon Purple", icon: "🔮" },
  { id: "blood-red", label: "🔴 Blood Red", icon: "🩸" },
  { id: "emerald", label: "🟢 Emerald", icon: "💚" },
];

const ThemeSwitcher = () => {
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState("gold-dark");

  useEffect(() => {
    const saved = localStorage.getItem("hayato-theme");
    if (saved) {
      setActive(saved);
      document.documentElement.setAttribute("data-theme", saved);
    }
  }, []);

  const applyTheme = (id: string) => {
    setActive(id);
    document.documentElement.setAttribute("data-theme", id);
    localStorage.setItem("hayato-theme", id);
  };

  return (
    <div className="fixed bottom-4 left-4 z-50">
      {open && (
        <div className="mb-2 bg-card border border-border rounded-lg p-3 gold-border-glow animate-[fadeInUp_0.2s_ease-out]">
          <p className="text-xs font-mono text-muted-foreground mb-2">COLOR THEME</p>
          <div className="space-y-1">
            {THEMES.map((t) => (
              <button
                key={t.id}
                onClick={() => applyTheme(t.id)}
                className={`block w-full text-left px-3 py-2 rounded text-sm transition-all ${
                  active === t.id
                    ? "bg-primary/20 text-primary border border-primary/40"
                    : "text-foreground hover:bg-secondary border border-transparent"
                }`}
              >
                {t.icon} {t.label}
              </button>
            ))}
          </div>
        </div>
      )}
      <button
        onClick={() => setOpen(!open)}
        className="w-10 h-10 rounded-full bg-card border border-border flex items-center justify-center text-primary hover:gold-glow transition-all"
        title="Change Theme"
      >
        🎨
      </button>
    </div>
  );
};

export default ThemeSwitcher;
