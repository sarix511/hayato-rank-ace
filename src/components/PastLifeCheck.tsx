import { useState } from "react";
import { playClick } from "@/lib/sounds";

const PAST_LIVES = [
  { title: "Legendary Warrior", emoji: "⚔️", desc: "You dominated ancient battlefields. Gaming is in your soul." },
  { title: "Shadow Assassin", emoji: "🗡️", desc: "Silent but deadly. Your reflexes are from another era." },
  { title: "Dragon Slayer", emoji: "🐉", desc: "You've defeated mythical beasts. Free Fire is child's play." },
  { title: "Spartan General", emoji: "🛡️", desc: "300 enemies? You took on 3000. Born to lead squads." },
  { title: "Samurai Master", emoji: "⛩️", desc: "Discipline of a thousand lifetimes flows through your veins." },
];

const PastLifeCheck = () => {
  const [result, setResult] = useState<typeof PAST_LIVES[0] | null>(null);
  const [scanning, setScanning] = useState(false);

  const scan = () => {
    playClick();
    setScanning(true);
    setTimeout(() => {
      setResult(PAST_LIVES[Math.floor(Math.random() * PAST_LIVES.length)]);
      setScanning(false);
    }, 2000);
  };

  return (
    <div className="mb-6">
      <label className="block text-sm font-display font-semibold text-foreground mb-2 tracking-wide">
        🧠 Past Life Gamer Check
      </label>
      {!result ? (
        <button
          type="button"
          onClick={scan}
          disabled={scanning}
          className="w-full py-3 rounded-lg border border-border bg-secondary font-mono text-sm text-foreground hover:border-primary/50 transition-all"
        >
          {scanning ? "💀 Scanning soul data..." : "🔍 Scan Past Life"}
        </button>
      ) : (
        <div className="p-3 rounded-lg border border-primary/30 bg-primary/5 animate-fade-in">
          <p className="font-display font-bold text-foreground">
            {result.emoji} Previous life: <span className="gold-text-gradient">{result.title}</span> detected.
          </p>
          <p className="text-xs text-muted-foreground mt-1 font-body">{result.desc}</p>
        </div>
      )}
    </div>
  );
};

export default PastLifeCheck;
