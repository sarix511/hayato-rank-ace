import { useState, useEffect, useRef } from "react";
import { playTerminalLine, playSuccess, playVictoryFanfare } from "@/lib/sounds";

const RANK_LABELS: Record<string, string> = {
  diamond: "DIAMOND",
  heroic: "HEROIC",
  grandmaster: "GRANDMASTER",
};

const MODE_LABELS: Record<string, string> = {
  br: "BATTLE ROYALE",
  cs: "CLASH SQUAD",
};

const getTerminalLines = (targetRank: string, gameMode: string) => {
  const rankLabel = RANK_LABELS[targetRank] || "GRANDMASTER";
  const modeLabel = MODE_LABELS[gameMode] || "BR";
  return [
    `$ Connecting to Free Fire ${modeLabel} servers...`,
    "$ Establishing secure connection...",
    "[OK] Connection established",
    "$ Authenticating UID...",
    "[OK] UID verified successfully",
    `$ Loading ${modeLabel} player profile...`,
    "[OK] Player data loaded",
    `$ Checking current ${modeLabel} rank: GOLD III`,
    `$ Initializing HAYATO RANK UP module (${modeLabel} → ${rankLabel})...`,
    "[OK] Module loaded v3.7.2",
    "$ Bypassing anti-cheat detection...",
    "[OK] Anti-cheat bypassed",
    `$ Injecting ${modeLabel} rank boost packets...`,
    ">>> Sending packet 1/50...",
    ">>> Sending packet 5/50...",
    ">>> Sending packet 12/50...",
    ">>> Sending packet 23/50...",
    "[OK] Packets injected successfully",
    `$ Modifying ${modeLabel} match history...`,
    "[OK] Match history updated",
    "$ Boosting ELO rating...",
    ">>> ELO +150 applied",
    ">>> ELO +200 applied",
    ">>> ELO +300 applied",
    "[OK] ELO boost complete",
    `$ Updating ${modeLabel} rank data...`,
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
    `$ Finalizing ${modeLabel} rank boost...`,
    `[OK] ${modeLabel} RANK UP COMPLETE!`,
    "",
    "========================================",
    `  ${modeLabel} RANK UP SUCCESSFUL! 🏆`,
    `  NEW RANK: ${rankLabel}`,
    "========================================",
  ];
};

interface FakeTerminalProps {
  onComplete: () => void;
  targetRank: string;
  gameMode: string;
  duration: number;
}

const FakeTerminal = ({ onComplete, targetRank, gameMode, duration }: FakeTerminalProps) => {
  const [lines, setLines] = useState<string[]>([]);
  const [progress, setProgress] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const audioPlayedRef = useRef(false);

  useEffect(() => {
    const terminalLines = getTerminalLines(targetRank, gameMode);
    const interval = duration / terminalLines.length;
    let index = 0;

    // Calculate which line index corresponds to ~19 seconds before end
    const totalDurationMs = duration;
    const msBeforeEnd = 19000;
    const triggerAtMs = Math.max(0, totalDurationMs - msBeforeEnd);
    const triggerAtIndex = Math.floor(triggerAtMs / interval);

    const timer = setInterval(() => {
      if (index < terminalLines.length) {
        setLines((prev) => [...prev, terminalLines[index]]);
        setProgress(((index + 1) / terminalLines.length) * 100);
        playTerminalLine();

        // Play victory fanfare ~19 seconds before terminal ends
        if (index >= triggerAtIndex && !audioPlayedRef.current) {
          audioPlayedRef.current = true;
          playVictoryFanfare();
        }

        index++;
      } else {
        clearInterval(timer);
        playSuccess();
        setTimeout(onComplete, 1500);
      }
    }, interval);

    return () => {
      clearInterval(timer);
    };
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
        <div className="w-3 h-3 rounded-full bg-destructive animate-pulse" />
        <div className="w-3 h-3 rounded-full bg-primary animate-pulse" style={{ animationDelay: '0.2s' }} />
        <div className="w-3 h-3 rounded-full bg-terminal animate-pulse" style={{ animationDelay: '0.4s' }} />
        <span className="ml-2 font-mono text-xs text-muted-foreground">
          HAYATO_RANKBOT_v3.7.2 — {MODE_LABELS[gameMode] || "Terminal"}
        </span>
        <span className="ml-auto text-xs text-destructive font-mono animate-pulse">● LIVE</span>
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
            className={`mb-1 animate-[fadeInUp_0.3s_ease-out] ${
              line.startsWith("[OK]")
                ? "terminal-text"
                : line.startsWith(">>>")
                ? "text-primary"
                : line.startsWith("===") || line.includes("🏆")
                ? "text-primary font-bold text-lg"
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
