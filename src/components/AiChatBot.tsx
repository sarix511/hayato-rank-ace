import { useState, useRef, useEffect } from "react";

const BOT_RESPONSES: Record<string, string> = {
  hello: "Hey! 👋 Welcome to HAYATO RANK UP Bot! I'm here to help you understand how our rank boosting works.",
  hi: "Hi there! 🔥 Need help with the rank push? Just ask me anything!",
  how: "Here's how it works:\n1️⃣ Choose your Game Mode (BR or CS)\n2️⃣ Select your Region\n3️⃣ Pick your Target Rank\n4️⃣ Choose Push Duration\n5️⃣ Enter your UID\n6️⃣ Click START RANK UP\n\nOur bot will handle the rest! 🚀",
  rank: "We support 3 ranks:\n💎 Diamond - Entry level boost\n🦅 Heroic - Mid-tier boost\n👑 Grandmaster - Ultimate rank!",
  uid: "Your UID is your unique Free Fire player ID. You can find it in your game profile. Just tap your avatar in-game!",
  safe: "Yes! Our system is 100% safe. We use encrypted connections and bypass anti-cheat detection. Your account is protected! 🔒",
  token: "The .token file is optional. It's your Free Fire game token that speeds up the boosting process. You can get it from your game files.",
  time: "⚡ 1 Hour Push - Quick boost for fast results\n🔥 48 Hours Push - Maximum power for guaranteed rank up!",
  mode: "🎯 Battle Royale (BR) - Classic BR rank push\n⚔️ Clash Squad (CS) - CS ranked boost\n\nBoth modes are fully supported!",
  free: "Yes, the rank push service is completely FREE for Golden VIP members! ✨",
  vip: "All users get Golden VIP status automatically! This gives you priority boosting and faster rank ups. ✨",
};

const getResponse = (input: string): string => {
  const lower = input.toLowerCase();
  for (const [key, response] of Object.entries(BOT_RESPONSES)) {
    if (lower.includes(key)) return response;
  }
  return "I'm HAYATO AI Assistant! 🤖 I can help you with:\n• How the rank push works\n• Game modes (BR/CS)\n• Rank tiers\n• UID info\n• Token files\n• Safety & VIP status\n\nJust ask me anything!";
};

const AiChatBot = () => {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<{ role: "bot" | "user"; text: string }[]>([
    { role: "bot", text: "Hey! 🤖 I'm HAYATO AI. Ask me anything about how the rank boost works!" },
  ]);
  const [input, setInput] = useState("");
  const [typing, setTyping] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, typing]);

  const send = () => {
    if (!input.trim()) return;
    const userMsg = input.trim();
    setInput("");
    setMessages((prev) => [...prev, { role: "user", text: userMsg }]);
    setTyping(true);

    setTimeout(() => {
      setTyping(false);
      setMessages((prev) => [...prev, { role: "bot", text: getResponse(userMsg) }]);
    }, 800 + Math.random() * 1200);
  };

  return (
    <div className="fixed bottom-4 left-4 z-50">
      {open && (
        <div className="mb-2 w-80 bg-card border border-border rounded-xl overflow-hidden gold-border-glow animate-[fadeInUp_0.2s_ease-out]">
          {/* Header */}
          <div className="px-4 py-3 bg-secondary border-b border-border flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center text-primary text-sm">🤖</div>
            <div>
              <p className="text-sm font-display font-bold text-foreground">HAYATO AI</p>
              <p className="text-xs text-primary">● Online</p>
            </div>
            <button onClick={() => setOpen(false)} className="ml-auto text-muted-foreground hover:text-foreground text-lg">✕</button>
          </div>

          {/* Messages */}
          <div ref={scrollRef} className="h-64 overflow-y-auto p-3 space-y-3">
            {messages.map((msg, i) => (
              <div key={i} className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}>
                <div
                  className={`max-w-[80%] px-3 py-2 rounded-lg text-sm whitespace-pre-line ${
                    msg.role === "user"
                      ? "bg-primary/20 text-foreground rounded-br-none"
                      : "bg-secondary text-foreground rounded-bl-none"
                  }`}
                >
                  {msg.text}
                </div>
              </div>
            ))}
            {typing && (
              <div className="flex justify-start">
                <div className="bg-secondary px-3 py-2 rounded-lg rounded-bl-none text-sm text-muted-foreground">
                  <span className="animate-pulse">typing...</span>
                </div>
              </div>
            )}
          </div>

          {/* Input */}
          <div className="p-2 border-t border-border flex gap-2">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && send()}
              placeholder="Ask me anything..."
              className="flex-1 px-3 py-2 rounded-lg bg-secondary border border-border text-foreground text-sm focus:outline-none focus:ring-1 focus:ring-ring"
            />
            <button
              onClick={send}
              className="px-3 py-2 rounded-lg bg-primary text-primary-foreground font-bold text-sm hover:opacity-90 transition-all"
            >
              Send
            </button>
          </div>
        </div>
      )}
      <button
        onClick={() => setOpen(!open)}
        className="w-12 h-12 rounded-full bg-card border border-border flex items-center justify-center text-xl hover:gold-glow transition-all animate-[pulseGlow_3s_infinite]"
        title="AI Assistant"
      >
        🤖
      </button>
    </div>
  );
};

export default AiChatBot;
