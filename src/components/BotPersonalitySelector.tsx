import { playClick } from "@/lib/sounds";

const PERSONALITIES = [
  { value: "aggressive", label: "🤖 Aggressive Push", desc: "Max speed, no mercy" },
  { value: "smart", label: "🧠 Smart & Safe", desc: "Steady climb, no bans" },
  { value: "fast", label: "⚡ Fast Climb", desc: "Quick results, balanced" },
];

interface Props {
  value: string;
  onChange: (v: string) => void;
  labelText?: string;
}

const BotPersonalitySelector = ({ value, onChange, labelText = "BOT PERSONALITY" }: Props) => (
  <div className="mb-6">
    <label className="block text-sm font-display font-semibold text-foreground mb-2 tracking-wide">
      {labelText}
    </label>
    <div className="grid grid-cols-3 gap-3">
      {PERSONALITIES.map((p) => (
        <button
          key={p.value}
          type="button"
          onClick={() => { playClick(); onChange(p.value); }}
          className={`relative px-3 py-4 rounded-lg border font-display font-bold text-sm transition-all overflow-hidden group ${
            value === p.value
              ? "border-primary bg-primary/15 gold-glow scale-105"
              : "border-border bg-secondary hover:border-primary/50 hover:scale-102"
          }`}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-primary/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
          {value === p.value && <div className="absolute inset-0 shimmer-overlay" />}
          <span className={`relative z-10 block ${value === p.value ? "gold-text-gradient" : "text-foreground"}`}>
            {p.label}
          </span>
          <span className="relative z-10 block text-[10px] text-muted-foreground mt-1">{p.desc}</span>
        </button>
      ))}
    </div>
  </div>
);

export default BotPersonalitySelector;
