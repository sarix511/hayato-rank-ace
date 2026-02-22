import { useState } from "react";
import { playClick } from "@/lib/sounds";
import { Switch } from "@/components/ui/switch";

const ShadowMode = () => {
  const [enabled, setEnabled] = useState(false);

  const toggle = (checked: boolean) => {
    playClick();
    setEnabled(checked);
    if (checked) {
      document.documentElement.classList.add("shadow-mode");
    } else {
      document.documentElement.classList.remove("shadow-mode");
    }
  };

  return (
    <div className="mb-6 flex items-center justify-between p-3 rounded-lg border border-border bg-secondary">
      <div>
        <p className="text-sm font-display font-semibold text-foreground">🕶️ Shadow Mode</p>
        <p className="text-xs text-muted-foreground">Ultra dark UI with neon borders only</p>
      </div>
      <Switch checked={enabled} onCheckedChange={toggle} />
    </div>
  );
};

export default ShadowMode;
