import { useState, useCallback } from "react";
import FakeTerminal from "@/components/FakeTerminal";
import CongratulationsScreen from "@/components/CongratulationsScreen";

const REGIONS = [
  "India", "Brazil", "Indonesia", "Thailand", "Vietnam",
  "Middle East", "Europe", "North America", "Bangladesh", "Pakistan",
  "Singapore", "Taiwan",
];

type Step = "form" | "terminal" | "done";

const Index = () => {
  const [step, setStep] = useState<Step>("form");
  const [region, setRegion] = useState("");
  const [uid, setUid] = useState("");

  const handleStart = (e: React.FormEvent) => {
    e.preventDefault();
    if (region && uid.length >= 6) {
      setStep("terminal");
    }
  };

  const handleTerminalComplete = useCallback(() => {
    setStep("done");
  }, []);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4 py-12 relative overflow-hidden">
      {/* Background particles */}
      <div className="absolute inset-0 pointer-events-none">
        <div
          className="absolute top-1/4 left-1/4 w-64 h-64 rounded-full opacity-10"
          style={{ background: "radial-gradient(circle, hsl(45 100% 50%), transparent)" }}
        />
        <div
          className="absolute bottom-1/4 right-1/4 w-96 h-96 rounded-full opacity-5"
          style={{ background: "radial-gradient(circle, hsl(45 100% 50%), transparent)" }}
        />
      </div>

      {/* Header - always visible */}
      <div className="text-center mb-10 relative z-10">
        <div className="inline-block px-4 py-1 rounded-full bg-secondary border border-border text-xs font-mono text-primary mb-4 tracking-widest">
          GOLDEN VIP ✨
        </div>
        <h1 className="text-4xl md:text-6xl font-display font-black gold-text-gradient mb-2 tracking-wider">
          HAYATO RANK UP
        </h1>
        <p className="text-muted-foreground font-body text-lg">
          Free Fire Rank Boost Bot
        </p>
      </div>

      {/* Content area */}
      <div className="relative z-10 w-full max-w-2xl">
        {step === "form" && (
          <form
            onSubmit={handleStart}
            className="bg-card border border-border rounded-xl p-8 gold-border-glow animate-[fadeInUp_0.5s_ease-out]"
          >
            {/* Region select */}
            <div className="mb-6">
              <label className="block text-sm font-display font-semibold text-foreground mb-2 tracking-wide">
                SELECT REGION
              </label>
              <select
                value={region}
                onChange={(e) => setRegion(e.target.value)}
                className="w-full px-4 py-3 rounded-lg bg-secondary border border-border text-foreground font-body focus:outline-none focus:ring-2 focus:ring-ring transition-all"
                required
              >
                <option value="">Choose your server region...</option>
                {REGIONS.map((r) => (
                  <option key={r} value={r}>
                    {r}
                  </option>
                ))}
              </select>
            </div>

            {/* UID input */}
            <div className="mb-8">
              <label className="block text-sm font-display font-semibold text-foreground mb-2 tracking-wide">
                ENTER YOUR UID
              </label>
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
              <p className="text-xs text-muted-foreground mt-1 font-body">
                Your UID can be found in your Free Fire profile
              </p>
            </div>

            {/* Submit button */}
            <button
              type="submit"
              className="w-full py-4 rounded-lg font-display font-bold text-lg tracking-widest gold-gradient text-primary-foreground hover:opacity-90 transition-opacity gold-glow"
            >
              🚀 START RANK UP
            </button>
          </form>
        )}

        {step === "terminal" && (
          <FakeTerminal onComplete={handleTerminalComplete} />
        )}

        {step === "done" && (
          <CongratulationsScreen uid={uid} region={region} />
        )}
      </div>

      {/* Footer */}
      <p className="mt-10 text-xs text-muted-foreground font-mono relative z-10 tracking-wider">
        HAYATO RANK UP BOT v3.7.2 — GOLDEN VIP EDITION
      </p>
    </div>
  );
};

export default Index;
