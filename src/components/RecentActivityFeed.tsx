import { useState, useEffect } from "react";

const ACTIVITIES = [
  "UID 73****92 → Diamond ✔",
  "UID 89****11 → Heroic ✔",
  "UID 45****67 → Platinum ✔",
  "UID 12****34 → Grandmaster ✔",
  "UID 56****78 → Heroic ✔",
  "UID 91****03 → Diamond ✔",
  "UID 33****55 → Heroic ✔",
  "UID 78****21 → Grandmaster ✔",
  "UID 64****99 → Diamond ✔",
  "UID 27****88 → Heroic ✔",
];

const RecentActivityFeed = () => {
  const [items, setItems] = useState(ACTIVITIES.slice(0, 4));

  useEffect(() => {
    let idx = 4;
    const timer = setInterval(() => {
      const next = ACTIVITIES[idx % ACTIVITIES.length];
      setItems((prev) => [next, ...prev.slice(0, 3)]);
      idx++;
    }, 4000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="mb-6">
      <h3 className="text-sm font-display font-semibold text-foreground mb-2 tracking-wide">
        🧾 RECENT ACTIVITY
      </h3>
      <div className="bg-card border border-border rounded-lg p-3 space-y-1 overflow-hidden">
        {items.map((item, i) => (
          <div
            key={`${item}-${i}`}
            className="text-xs font-mono text-muted-foreground animate-fade-in"
          >
            <span className="text-primary">●</span> {item}
          </div>
        ))}
      </div>
    </div>
  );
};

export default RecentActivityFeed;
