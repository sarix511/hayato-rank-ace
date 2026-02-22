import { useState, useEffect } from "react";

const ServerLoadMeter = () => {
  const [load, setLoad] = useState(87);
  const [message, setMessage] = useState("");

  useEffect(() => {
    const timer = setInterval(() => {
      const newLoad = Math.floor(Math.random() * 30 + 70);
      setLoad(newLoad);
      setMessage(
        newLoad >= 90
          ? "⚠️ High traffic detected, please wait…"
          : ""
      );
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="fixed top-0 left-0 right-0 z-50 bg-card/90 backdrop-blur border-b border-border px-4 py-1.5 flex items-center justify-between text-xs font-mono">
      <div className="flex items-center gap-2">
        <span className="text-primary">🟢 Server Status: ONLINE</span>
        <span className="text-muted-foreground">|</span>
        <span className={load >= 90 ? "text-destructive" : "text-primary"}>
          🔴 Load: {load}%
        </span>
      </div>
      {message && (
        <span className="text-destructive animate-pulse hidden sm:inline">{message}</span>
      )}
      <div className="flex items-center gap-3 text-muted-foreground hidden md:flex">
        <span>UID 78**** → Heroic</span>
        <span>UID 44**** → Heroic</span>
        <span>UID 91**** → Diamond</span>
      </div>
    </div>
  );
};

export default ServerLoadMeter;
