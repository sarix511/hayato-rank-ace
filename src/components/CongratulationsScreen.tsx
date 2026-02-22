import grandmasterCs from "@/assets/grandmaster-cs.jpg";
import grandmasterBr from "@/assets/grandmaster-br.jpg";
import heroicBr from "@/assets/heroic-br.jpg";
import heroicCs from "@/assets/heroic-cs.jpg";
import diamondBr from "@/assets/diamond-br.jpg";
import diamondCs from "@/assets/diamond-cs.jpg";
import CooldownTimer from "@/components/CooldownTimer";

const RANK_LABELS: Record<string, string> = {
  diamond: "DIAMOND 💎",
  heroic: "HEROIC 🦅",
  grandmaster: "GRANDMASTER 👑",
};

const RANK_IMAGES: Record<string, Record<string, string>> = {
  grandmaster: { cs: grandmasterCs, br: grandmasterBr },
  heroic: { cs: heroicCs, br: heroicBr },
  diamond: { cs: diamondCs, br: diamondBr },
};

const MODE_LABELS: Record<string, string> = {
  br: "Battle Royale",
  cs: "Clash Squad",
};

const CongratulationsScreen = ({ uid, region, targetRank, gameMode }: { uid: string; region: string; targetRank: string; gameMode: string }) => {
  const rankImage = RANK_IMAGES[targetRank]?.[gameMode];

  return (
    <div className="text-center animate-[fadeInUp_0.8s_ease-out] max-w-lg mx-auto">
      {/* Rank image */}
      {rankImage ? (
        <div className="mb-6 rounded-xl overflow-hidden border-2 border-primary gold-border-glow">
          <img src={rankImage} alt={`${targetRank} ${gameMode}`} className="w-full h-auto object-cover" />
        </div>
      ) : (
        <div className="text-8xl mb-6">🎉</div>
      )}

      {/* Title */}
      <h1 className="text-4xl md:text-5xl font-display font-black gold-text-gradient mb-4">
        CONGRATULATIONS!
      </h1>

      {/* Subtitle */}
      <p className="text-xl font-body text-foreground mb-8">
        Your {MODE_LABELS[gameMode] || "Rank"} Has Been Boosted Successfully!
      </p>

      {/* Info card */}
      <div className="bg-card border border-border rounded-lg p-6 gold-border-glow mb-8">
        <div className="space-y-3 text-left font-mono text-sm">
          <div className="flex justify-between">
            <span className="text-muted-foreground">Mode:</span>
            <span className="text-foreground">{MODE_LABELS[gameMode] || gameMode}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-muted-foreground">Region:</span>
            <span className="text-foreground">{region}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-muted-foreground">UID:</span>
            <span className="text-foreground">{uid}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-muted-foreground">New Rank:</span>
            <span className="text-primary font-bold">{RANK_LABELS[targetRank] || "GRANDMASTER 👑"}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-muted-foreground">VIP Status:</span>
            <span className="text-primary font-bold">GOLDEN VIP ✨</span>
          </div>
        </div>
      </div>

      {/* Warning */}
      <div className="bg-secondary border border-border rounded-lg p-4 animate-[pulseGlow_2s_infinite]">
        <p className="text-destructive font-display font-bold text-lg mb-1">
          ⚠️ DON'T OPEN GAME
        </p>
        <p className="text-muted-foreground text-sm font-body">
          Because your Rank Bot has started! Wait 10-15 minutes before opening Free Fire.
        </p>
      </div>

      {/* Cooldown Timer */}
      <CooldownTimer />
    </div>
  );
};

export default CongratulationsScreen;
