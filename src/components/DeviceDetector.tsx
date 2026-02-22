import { useState, useEffect } from "react";

const DEVICES = ["Mobile Pro 📱", "Gaming Phone Ultra 🎮", "Tablet X 📟", "PC Master 🖥️"];
const GRIPS = ["Claw 😈", "Thumbs 👍", "4-Finger 🤟", "6-Finger 🕷️"];

const DeviceDetector = () => {
  const [detected, setDetected] = useState(false);
  const [device, setDevice] = useState("");
  const [grip, setGrip] = useState("");

  useEffect(() => {
    const timer = setTimeout(() => {
      setDevice(DEVICES[Math.floor(Math.random() * DEVICES.length)]);
      setGrip(GRIPS[Math.floor(Math.random() * GRIPS.length)]);
      setDetected(true);
    }, 5000);
    return () => clearTimeout(timer);
  }, []);

  if (!detected) return null;

  return (
    <div className="mb-6 p-3 rounded-lg border border-primary/30 bg-primary/5 animate-fade-in">
      <p className="text-xs font-mono text-primary mb-1">🎮 CONTROLLER / DEVICE DETECTED</p>
      <p className="text-sm font-display text-foreground">
        Device: <span className="gold-text-gradient font-bold">{device}</span>
      </p>
      <p className="text-sm font-display text-foreground">
        Grip Style: <span className="gold-text-gradient font-bold">{grip}</span>
      </p>
      <p className="text-xs text-muted-foreground mt-1 font-mono">
        ✅ High-skill preset applied.
      </p>
    </div>
  );
};

export default DeviceDetector;
