import { useState, useEffect, useRef } from "react";

const RANK_LABELS: Record<string, string> = {
  diamond: "DIAMOND",
  heroic: "HEROIC",
  grandmaster: "GRANDMASTER",
};

const getTerminalLines = (targetRank: string) => {
  const rankLabel = RANK_LABELS[targetRank] || "GRANDMASTER";
  return [
    "$ Connecting to Free Fire servers...",
    "$ Establishing secure connection...",
    "[OK] Connection established",
    "$ Authenticating UID...",
    "[OK] UID verified successfully",
    "$ Loading player profile...",
    "[OK] Player data loaded",
    "$ Checking current rank: GOLD III",
    `$ Initializing HAYATO RANK UP module (Target: ${rankLabel})...`,
    "[OK] Module loaded v3.7.2",
    "$ Bypassing anti-cheat detection...",
    "[OK] Anti-cheat bypassed",
    "$ Injecting rank boost packets...",
    ">>> Sending packet 1/50...",
    ">>> Sending packet 5/50...",
    ">>> Sending packet 12/50...",
    ">>> Sending packet 23/50...",
    "[OK] Packets injected successfully",
    "$ Modifying match history...",
    "[OK] Match history updated",
    "$ Boosting ELO rating...",
    ">>> ELO +150 applied",
    ">>> ELO +200 applied",
    ">>> ELO +300 applied",
    "[OK] ELO boost complete",
    "$ Updating rank data...",
    `>>> Current rank: GOLD III → ${rankLabel}`,
    "[OK] Rank updated on server",
    "$ Syncing with game servers...",
    "[OK] Data synced",
    "$ Verifying rank change...",
    "[OK] Rank change verified",
    "$ Applying golden VIP badge...",
    "[OK] VIP badge applied",
    "$ Clearing server logs...",
    "[OK] Logs cleared",
    "$ Finalizing rank boost...",
    "[OK] RANK UP COMPLETE!",
    "",
    "========================================",
    `  RANK UP SUCCESSFUL! 🏆`,
    `  NEW RANK: ${rankLabel}`,
    "========================================",
  ];
};

interface FakeTerminalProps {
  onComplete: () => void;
  targetRank: string;
}

const FakeTerminal = ({ onComplete, targetRank }: FakeTerminalProps) => {
  const [lines, setLines] = useState<string[]>([]);
  const [progress, setProgress] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const terminalLines = getTerminalLines(targetRank);
    const totalDuration = 180000; // 3 minutes
    const interval = totalDuration / terminalLines.length;
    let index = 0;

    const timer = setInterval(() => {
      if (index < terminalLines.length) {
        setLines((prev) => [...prev, terminalLines[index]]);
        setProgress(((index + 1) / terminalLines.length) * 100);
        index++;
      } else {
        clearInterval(timer);
        setTimeout(onComplete, 1500);
      }
    }, interval);

    return () => clearInterval(timer);
  }, [onComplete]);

  useEffect(() => {
    if (containerRef.current) {
      containerRef.current.scrollTop = containerRef.current.scrollHeight;
    }
  }, [lines]);

  return (
    <div className="w-full max-w-2xl mx-auto animate-[fadeInUp_0.5s_ease-out]">
      {/* Terminal header */}
      <div className="flex items-center gap-2 px-4 py-2 bg-secondary rounded-t-lg border border-border border-b-0">
        <div className="w-3 h-3 rounded-full bg-destructive" />
        <div className="w-3 h-3 rounded-full bg-primary" />
        <div className="w-3 h-3 rounded-full bg-terminal" />
        <span className="ml-2 font-mono text-xs text-muted-foreground">
          HAYATO_RANKBOT_v3.7.2 — Terminal
        </span>
      </div>

      {/* Terminal body */}
      <div
        ref={containerRef}
        className="h-80 overflow-y-auto p-4 font-mono text-sm border border-border rounded-b-lg scanline"
        style={{ background: "hsl(0 0% 3%)" }}
      >
        {lines.map((line, i) => (
          <div
            key={i}
            className={`mb-1 ${
              line.startsWith("[OK]")
                ? "terminal-text"
                : line.startsWith(">>>")
                ? "text-primary"
                : line.startsWith("===") || line.includes("🏆")
                ? "text-primary font-bold"
                : "text-muted-foreground"
            }`}
          >
            {line}
          </div>
        ))}
        <span
          className="inline-block w-2 h-4 bg-terminal ml-1"
          style={{ animation: "blink 1s infinite" }}
        />
      </div>

      {/* Progress bar */}
      <div className="mt-4">
        <div className="flex justify-between text-xs font-mono text-muted-foreground mb-1">
          <span>Processing...</span>
          <span>{Math.round(progress)}%</span>
        </div>
        <div className="w-full h-2 bg-secondary rounded-full overflow-hidden">
          <div
            className="h-full gold-gradient rounded-full transition-all duration-500"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>
    </div>
  );
};

export default FakeTerminal;
