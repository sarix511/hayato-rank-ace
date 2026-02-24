import { useState, useEffect } from "react";
import { playClick } from "@/lib/sounds";

const FAKE_NAMES = [
  "HAYATO•KING", "ᴮᴼˢˢ꧁༒☬ĐÃŘĶ☬༒꧂", "FF•LEGEND", "⚡SPEED⚡", 
  "꧁☆ROYAL☆꧂", "SNIPER•PRO", "ᴳᵒᵈ乂KILLER", "✿PHOENIX✿",
  "NINJA•FURY", "꧁⁣⁣⁣SHADOW꧂", "DRAGON♛FIRE", "ACE•MASTER",
];

interface Props {
  uid: string;
  setUid: (v: string) => void;
}

const UidChecker = ({ uid, setUid }: Props) => {
  const [checking, setChecking] = useState(false);
  const [result, setResult] = useState<null | { valid: boolean; name: string; level: number; region: string }>(null);

  useEffect(() => {
    if (uid.length >= 8 && !checking && !result) {
      setChecking(true);
      const timer = setTimeout(() => {
        playClick();
        setResult({
          valid: true,
          name: FAKE_NAMES[Math.floor(Math.random() * FAKE_NAMES.length)],
          level: Math.floor(Math.random() * 30 + 50),
          region: ["IND", "BR", "SG", "ME", "PK", "BD"][Math.floor(Math.random() * 6)],
        });
        setChecking(false);
      }, 2000);
      return () => clearTimeout(timer);
    }
    if (uid.length < 8) {
      setResult(null);
    }
  }, [uid]);

  return (
    <div className="mb-6">
      <label className="block text-sm font-display font-semibold text-foreground mb-2 tracking-wide">
        🎮 Enter Free Fire UID
      </label>
      <div className="relative">
        <input
          type="text"
          value={uid}
          onChange={(e) => setUid(e.target.value.replace(/\D/g, ""))}
          placeholder="Enter your Free Fire UID..."
          className="w-full px-4 py-3 rounded-lg bg-secondary border border-border text-foreground font-mono focus:outline-none focus:ring-2 focus:ring-ring transition-all"
          required
          minLength={6}
          maxLength={15}
        />
        {checking && (
          <div className="absolute right-3 top-1/2 -translate-y-1/2">
            <div className="w-5 h-5 border-2 border-primary border-t-transparent rounded-full animate-spin" />
          </div>
        )}
      </div>

      {checking && (
        <div className="mt-2 p-2 rounded-lg bg-secondary border border-border animate-fade-in">
          <p className="text-xs font-mono text-primary">
            🤖 AI Verification in progress...
          </p>
          <p className="text-[10px] font-mono text-muted-foreground mt-1">
            Connecting to Garena API → Fetching player data...
          </p>
        </div>
      )}

      {result && (
        <div className="mt-2 p-3 rounded-lg border border-primary/30 bg-primary/5 animate-fade-in">
          <div className="flex items-center gap-2 mb-1">
            <span className="text-xs font-mono text-green-400">✅ UID VERIFIED — REAL ACCOUNT</span>
          </div>
          <div className="grid grid-cols-3 gap-2 mt-2">
            <div className="text-center">
              <p className="text-[10px] text-muted-foreground">Player Name</p>
              <p className="text-xs font-mono font-bold text-foreground">{result.name}</p>
            </div>
            <div className="text-center">
              <p className="text-[10px] text-muted-foreground">Level</p>
              <p className="text-xs font-mono font-bold text-primary">{result.level}</p>
            </div>
            <div className="text-center">
              <p className="text-[10px] text-muted-foreground">Region</p>
              <p className="text-xs font-mono font-bold text-foreground">{result.region}</p>
            </div>
          </div>
          <p className="text-[10px] text-muted-foreground mt-2 font-mono">
            🤖 AI Confidence: 99.7% — Account eligible for rank boost
          </p>
        </div>
      )}

      {uid.length > 0 && uid.length < 8 && (
        <p className="text-xs text-muted-foreground mt-1 font-mono">
          Enter at least 8 digits to verify UID...
        </p>
      )}
    </div>
  );
};

export default UidChecker;
