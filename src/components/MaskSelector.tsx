import { useState } from "react";
import { playClick } from "@/lib/sounds";

const MASKS = [
  { value: "demon", emoji: "😈", label: "Demon Mask" },
  { value: "king", emoji: "👑", label: "King Mask" },
  { value: "bot", emoji: "🤖", label: "Bot Mask" },
];

const MaskSelector = () => {
  const [selected, setSelected] = useState("");

  return (
    <div className="mb-6">
      <label className="block text-sm font-display font-semibold text-foreground mb-2 tracking-wide">
        🎭 Identity Mask
      </label>
      <div className="grid grid-cols-3 gap-3">
        {MASKS.map((mask) => (
          <button
            key={mask.value}
            type="button"
            onClick={() => { playClick(); setSelected(mask.value); }}
            className={`relative px-3 py-4 rounded-lg border font-display font-bold text-sm transition-all overflow-hidden group ${
              selected === mask.value
                ? "border-primary bg-primary/15 gold-glow scale-105"
                : "border-border bg-secondary hover:border-primary/50 hover:scale-102"
            }`}
          >
            {selected === mask.value && <div className="absolute inset-0 shimmer-overlay" />}
            <span className="relative z-10 block text-2xl mb-1">{mask.emoji}</span>
            <span className={`relative z-10 block text-xs ${selected === mask.value ? "gold-text-gradient" : "text-foreground"}`}>
              {mask.label}
            </span>
          </button>
        ))}
      </div>
      {selected && (
        <p className="text-xs text-primary font-mono mt-2 animate-fade-in">
          🕶️ Identity concealed. You are now invisible to reports.
        </p>
      )}
    </div>
  );
};

export default MaskSelector;
