import { useState, useEffect } from "react";

const LiveStatsPanel = () => {
  const [boosted, setBoosted] = useState(12843);
  const [users, setUsers] = useState(431);
  const [rate, setRate] = useState(95.8);

  useEffect(() => {
    const timer = setInterval(() => {
      setBoosted((p) => p + Math.floor(Math.random() * 5 + 1));
      setUsers((p) => p + Math.floor(Math.random() * 3 - 1));
      setRate((p) => {
        const next = p + (Math.random() * 0.4 - 0.15);
        return Math.min(99.9, Math.max(93.0, parseFloat(next.toFixed(1))));
      });
    }, 3000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="grid grid-cols-3 gap-3 mb-6">
      {[
        { label: "🔼 Rank Boosted Today", value: boosted.toLocaleString() },
        { label: "👥 Active Users", value: users.toLocaleString() },
        { label: "⚡ Success Rate", value: `${rate}%` },
      ].map((s) => (
        <div
          key={s.label}
          className="bg-card border border-border rounded-lg p-3 text-center gold-border-glow"
        >
          <p className="text-lg md:text-xl font-display font-black text-primary transition-all">
            {s.value}
          </p>
          <p className="text-[10px] md:text-xs text-muted-foreground font-body mt-1">{s.label}</p>
        </div>
      ))}
    </div>
  );
};

export default LiveStatsPanel;
