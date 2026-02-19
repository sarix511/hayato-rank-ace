const RANK_LABELS: Record<string, string> = {
  diamond: "DIAMOND 💎",
  heroic: "HEROIC 🦅",
  grandmaster: "GRANDMASTER 👑",
};

const CongratulationsScreen = ({ uid, region, targetRank }: { uid: string; region: string; targetRank: string }) => {
  return (
    <div className="text-center animate-[fadeInUp_0.8s_ease-out] max-w-lg mx-auto">
      {/* Big emoji */}
      <div className="text-8xl mb-6">🎉</div>

      {/* Title */}
      <h1 className="text-4xl md:text-5xl font-display font-black gold-text-gradient mb-4">
        CONGRATULATIONS!
      </h1>

      {/* Subtitle */}
      <p className="text-xl font-body text-foreground mb-8">
        Your Rank Has Been Boosted Successfully!
      </p>

      {/* Info card */}
      <div className="bg-card border border-border rounded-lg p-6 gold-border-glow mb-8">
        <div className="space-y-3 text-left font-mono text-sm">
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
      <div
        className="bg-secondary border border-border rounded-lg p-4 animate-[pulseGlow_2s_infinite]"
      >
        <p className="text-destructive font-display font-bold text-lg mb-1">
          ⚠️ DON'T OPEN GAME
        </p>
        <p className="text-muted-foreground text-sm font-body">
          Because your Rank Bot has started! Wait 10-15 minutes before opening Free Fire.
        </p>
      </div>
    </div>
  );
};

export default CongratulationsScreen;
