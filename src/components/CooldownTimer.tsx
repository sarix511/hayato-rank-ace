import { useState, useEffect } from "react";

const CooldownTimer = () => {
  const [seconds, setSeconds] = useState(24 * 60 * 60); // 24 hours

  useEffect(() => {
    const timer = setInterval(() => {
      setSeconds((p) => (p > 0 ? p - 1 : 0));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const h = Math.floor(seconds / 3600);
  const m = Math.floor((seconds % 3600) / 60);
  const s = seconds % 60;
  const fmt = (n: number) => n.toString().padStart(2, "0");

  return (
    <div className="mt-6 bg-card border border-border rounded-lg p-4 text-center gold-border-glow">
      <p className="text-sm font-display font-semibold text-foreground mb-2">
        ⏳ COOLDOWN TIMER
      </p>
      <p className="text-3xl font-mono text-primary font-bold tracking-widest">
        {fmt(h)}:{fmt(m)}:{fmt(s)}
      </p>
      <p className="text-xs text-muted-foreground mt-2 font-body">
        Please wait before next use
      </p>
    </div>
  );
};

export default CooldownTimer;
