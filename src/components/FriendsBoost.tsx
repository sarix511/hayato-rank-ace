import { useState } from "react";
import { playClick } from "@/lib/sounds";

const FriendsBoost = () => {
  const [teamUid, setTeamUid] = useState("");
  const [added, setAdded] = useState<string[]>([]);
  const [synergy, setSynergy] = useState(0);

  const addFriend = () => {
    if (teamUid.length >= 6) {
      playClick();
      setAdded((prev) => [...prev, teamUid]);
      setSynergy((p) => Math.min(100, p + Math.floor(Math.random() * 20 + 10)));
      setTeamUid("");
    }
  };

  return (
    <div className="mb-6">
      <h3 className="text-sm font-display font-semibold text-foreground mb-2 tracking-wide">
        🧑‍🤝‍🧑 FRIENDS BOOST
      </h3>
      <div className="bg-card border border-border rounded-lg p-4">
        <div className="flex gap-2 mb-3">
          <input
            type="text"
            value={teamUid}
            onChange={(e) => setTeamUid(e.target.value.replace(/\D/g, ""))}
            placeholder="Add teammate UID..."
            className="flex-1 px-3 py-2 rounded-lg bg-secondary border border-border text-foreground font-mono text-sm focus:outline-none focus:ring-1 focus:ring-ring"
            maxLength={15}
          />
          <button
            onClick={addFriend}
            disabled={teamUid.length < 6}
            className="px-4 py-2 rounded-lg bg-primary text-primary-foreground font-display font-bold text-sm hover:opacity-90 transition-all disabled:opacity-40"
          >
            Add
          </button>
        </div>
        {added.length > 0 && (
          <>
            <div className="space-y-1 mb-3">
              {added.map((uid, i) => (
                <div key={i} className="text-xs font-mono text-muted-foreground">
                  ✅ UID {uid} — Squad Rank Sync Enabled
                </div>
              ))}
            </div>
            <div className="text-sm font-display text-primary">
              ⚡ Squad synergy increased by {synergy}%
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default FriendsBoost;
