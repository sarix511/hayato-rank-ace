import { useState, useCallback } from "react";
import FakeTerminal from "@/components/FakeTerminal";
import CongratulationsScreen from "@/components/CongratulationsScreen";
import LiveStatsPanel from "@/components/LiveStatsPanel";
import FakeReviews from "@/components/FakeReviews";
import RecentActivityFeed from "@/components/RecentActivityFeed";
import FriendsBoost from "@/components/FriendsBoost";
import BotPersonalitySelector from "@/components/BotPersonalitySelector";
import LanguageSwitcher, { type Lang, TRANSLATIONS } from "@/components/LanguageSwitcher";
import ServerLoadMeter from "@/components/ServerLoadMeter";
import blueTick from "@/assets/blue-tick.png";
import { playClick } from "@/lib/sounds";

const REGIONS = [
  "India", "Brazil", "Indonesia", "Thailand", "Vietnam",
  "Middle East", "Europe", "North America", "Bangladesh", "Pakistan",
  "Singapore", "Taiwan",
];

const GAME_MODES = [
  { value: "br", label: "🎯 Battle Royale", desc: "BR Rank Push" },
  { value: "cs", label: "⚔️ Clash Squad", desc: "CS Rank Push" },
];

const TARGET_RANKS = [
  { value: "diamond", label: "💎 Diamond", color: "text-blue-400" },
  { value: "heroic", label: "🦅 Heroic", color: "text-purple-400" },
  { value: "grandmaster", label: "👑 Grandmaster", color: "text-primary" },
];

const PUSH_OPTIONS = [
  { value: "1hour", label: "⚡ 1 Hour Push", duration: 60000, desc: "Quick Boost" },
  { value: "48hours", label: "🔥 48 Hours Push", duration: 1800000, desc: "Max Power" },
];

type Step = "form" | "terminal" | "done";

const Index = () => {
  const [step, setStep] = useState<Step>("form");
  const [region, setRegion] = useState("");
  const [uid, setUid] = useState("");
  const [targetRank, setTargetRank] = useState("");
  const [pushOption, setPushOption] = useState("");
  const [gameMode, setGameMode] = useState("");
  const [tokenFile, setTokenFile] = useState<File | null>(null);
  const [botPersonality, setBotPersonality] = useState("");
  const [lang, setLang] = useState<Lang>("en");

  const t = TRANSLATIONS[lang];
  const isFormValid = region !== "" && uid.length >= 6 && targetRank !== "" && pushOption !== "" && gameMode !== "";

  const handleStart = (e: React.FormEvent) => {
    e.preventDefault();
    if (isFormValid) {
      playClick();
      setStep("terminal");
    }
  };

  const handleTerminalComplete = useCallback(() => {
    setStep("done");
  }, []);

  const handleTokenFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setTokenFile(file);
      playClick();
    }
  };

  const selectWithSound = (setter: (v: string) => void, value: string) => {
    playClick();
    setter(value);
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4 py-16 pt-20 relative overflow-hidden">
      <ServerLoadMeter />
      <LanguageSwitcher lang={lang} setLang={setLang} />

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

      {/* Header */}
      <div className="text-center mb-6 relative z-10">
        <div className="inline-block px-4 py-1 rounded-full bg-secondary border border-border text-xs font-mono text-primary mb-4 tracking-widest">
          GOLDEN VIP ✨
        </div>
        <h1 className="text-4xl md:text-6xl font-display font-black gold-text-gradient mb-2 tracking-wider flex items-center justify-center gap-3">
          HAYATO RANK UP
          <img src={blueTick} alt="Verified" className="w-10 h-10 md:w-14 md:h-14 inline-block drop-shadow-[0_0_8px_hsl(210,100%,60%)]" />
        </h1>
        <p className="text-muted-foreground font-body text-lg">
          Free Fire Rank Boost Bot
        </p>
      </div>

      {/* Live Stats */}
      <div className="relative z-10 w-full max-w-2xl">
        <LiveStatsPanel />
      </div>

      {/* Content area */}
      <div className="relative z-10 w-full max-w-2xl">
        {step === "form" && (
          <form
            onSubmit={handleStart}
            className="bg-card border border-border rounded-xl p-8 gold-border-glow animate-[fadeInUp_0.5s_ease-out]"
          >
            {/* Game Mode */}
            <div className="mb-6">
              <label className="block text-sm font-display font-semibold text-foreground mb-2 tracking-wide">
                {t.gameMode}
              </label>
              <div className="grid grid-cols-2 gap-3">
                {GAME_MODES.map((mode) => (
                  <button
                    key={mode.value}
                    type="button"
                    onClick={() => selectWithSound(setGameMode, mode.value)}
                    className={`relative px-4 py-4 rounded-lg border font-display font-bold text-sm transition-all overflow-hidden group ${
                      gameMode === mode.value
                        ? "border-primary bg-primary/15 gold-glow scale-105"
                        : "border-border bg-secondary hover:border-primary/50 hover:scale-102"
                    }`}
                  >
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-primary/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
                    {gameMode === mode.value && <div className="absolute inset-0 shimmer-overlay" />}
                    <span className={`relative z-10 block text-lg ${gameMode === mode.value ? "gold-text-gradient" : "text-foreground"}`}>
                      {mode.label}
                    </span>
                    <span className="relative z-10 block text-xs text-muted-foreground mt-1">{mode.desc}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Region select */}
            <div className="mb-6">
              <label className="block text-sm font-display font-semibold text-foreground mb-2 tracking-wide">
                {t.selectRegion}
              </label>
              <select
                value={region}
                onChange={(e) => { setRegion(e.target.value); playClick(); }}
                className="w-full px-4 py-3 rounded-lg bg-secondary border border-border text-foreground font-body focus:outline-none focus:ring-2 focus:ring-ring transition-all"
                required
              >
                <option value="">{t.chooseRegion}</option>
                {REGIONS.map((r) => (
                  <option key={r} value={r}>{r}</option>
                ))}
              </select>
            </div>

            {/* Target Rank */}
            <div className="mb-6">
              <label className="block text-sm font-display font-semibold text-foreground mb-2 tracking-wide">
                {t.targetRank}
              </label>
              <div className="grid grid-cols-3 gap-3">
                {TARGET_RANKS.map((rank) => (
                  <button
                    key={rank.value}
                    type="button"
                    onClick={() => selectWithSound(setTargetRank, rank.value)}
                    className={`relative px-3 py-4 rounded-lg border font-display font-bold text-sm transition-all overflow-hidden group ${
                      targetRank === rank.value
                        ? "border-primary bg-primary/15 gold-glow scale-105"
                        : "border-border bg-secondary hover:border-primary/50 hover:scale-102"
                    }`}
                  >
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-primary/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
                    {targetRank === rank.value && <div className="absolute inset-0 shimmer-overlay" />}
                    <span className={`relative z-10 ${targetRank === rank.value ? "gold-text-gradient" : rank.color}`}>
                      {rank.label}
                    </span>
                  </button>
                ))}
              </div>
            </div>

            {/* Push Duration */}
            <div className="mb-6">
              <label className="block text-sm font-display font-semibold text-foreground mb-2 tracking-wide">
                {t.pushDuration}
              </label>
              <div className="grid grid-cols-2 gap-3">
                {PUSH_OPTIONS.map((opt) => (
                  <button
                    key={opt.value}
                    type="button"
                    onClick={() => selectWithSound(setPushOption, opt.value)}
                    className={`relative px-4 py-4 rounded-lg border font-display font-bold text-sm transition-all overflow-hidden group ${
                      pushOption === opt.value
                        ? "border-primary bg-primary/15 gold-glow scale-105"
                        : "border-border bg-secondary hover:border-primary/50 hover:scale-102"
                    }`}
                  >
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-primary/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
                    {pushOption === opt.value && <div className="absolute inset-0 shimmer-overlay" />}
                    <span className={`relative z-10 block ${pushOption === opt.value ? "gold-text-gradient" : "text-foreground"}`}>
                      {opt.label}
                    </span>
                    <span className="relative z-10 block text-xs text-muted-foreground mt-1">{opt.desc}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Bot Personality */}
            <BotPersonalitySelector
              value={botPersonality}
              onChange={setBotPersonality}
              labelText={t.botPersonality}
            />

            {/* UID input */}
            <div className="mb-6">
              <label className="block text-sm font-display font-semibold text-foreground mb-2 tracking-wide">
                {t.enterUid}
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
                {t.uidHint}
              </p>
            </div>

            {/* Token File Upload */}
            <div className="mb-6">
              <label className="block text-sm font-display font-semibold text-foreground mb-2 tracking-wide">
                {t.tokenFile} <span className="text-muted-foreground text-xs font-body">{t.optional}</span>
              </label>
              <div className={`relative rounded-lg border-2 border-dashed transition-all p-4 text-center cursor-pointer hover:border-primary/50 ${
                tokenFile ? "border-primary bg-primary/10" : "border-border bg-secondary"
              }`}>
                <input
                  type="file"
                  accept=".token"
                  onChange={handleTokenFile}
                  className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                />
                {tokenFile ? (
                  <div>
                    <span className="text-primary font-mono text-sm">📁 {tokenFile.name}</span>
                    <p className="text-xs text-muted-foreground mt-1">Token file loaded</p>
                  </div>
                ) : (
                  <div>
                    <span className="text-muted-foreground font-body text-sm">{t.dropToken}</span>
                    <p className="text-xs text-muted-foreground mt-1">{t.tokenHint}</p>
                  </div>
                )}
              </div>
            </div>

            {/* Friends Boost */}
            <FriendsBoost />

            {/* Submit button */}
            <button
              type="submit"
              disabled={!isFormValid}
              className={`w-full py-4 rounded-lg font-display font-bold text-lg tracking-widest transition-all ${
                isFormValid
                  ? "gold-gradient text-primary-foreground hover:opacity-90 gold-glow cursor-pointer animate-[pulseGlow_2s_infinite]"
                  : "bg-muted text-muted-foreground cursor-not-allowed opacity-50"
              }`}
            >
              {isFormValid ? t.startRankUp : t.fillAllFields}
            </button>
          </form>
        )}

        {step === "terminal" && (
          <FakeTerminal
            onComplete={handleTerminalComplete}
            targetRank={targetRank}
            gameMode={gameMode}
            duration={PUSH_OPTIONS.find(o => o.value === pushOption)?.duration || 180000}
          />
        )}

        {step === "done" && (
          <CongratulationsScreen uid={uid} region={region} targetRank={targetRank} gameMode={gameMode} />
        )}
      </div>

      {/* Below-form sections (only on form step) */}
      {step === "form" && (
        <div className="relative z-10 w-full max-w-2xl mt-8">
          <FakeReviews />
          <RecentActivityFeed />
        </div>
      )}

      {/* Footer */}
      <p className="mt-10 text-xs text-muted-foreground font-mono relative z-10 tracking-wider">
        HAYATO RANK UP BOT v3.7.2 — GOLDEN VIP EDITION
      </p>
    </div>
  );
};

export default Index;
