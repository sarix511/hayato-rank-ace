const REVIEWS = [
  { text: "Bhai OP bot hai 🔥", user: "Ali", country: "PK", stars: 5 },
  { text: "Heroic in 5 minutes 😱", user: "Ravi", country: "IN", stars: 5 },
  { text: "100% working legit", user: "Rizwan", country: "BD", stars: 5 },
  { text: "Best rank pusher ever 💪", user: "Thanh", country: "VN", stars: 4 },
  { text: "Grandmaster in one click 👑", user: "Ahmed", country: "ME", stars: 5 },
  { text: "I can't believe it works!!", user: "Carlos", country: "BR", stars: 5 },
];

const FakeReviews = () => (
  <div className="mb-6">
    <h3 className="text-sm font-display font-semibold text-foreground mb-3 tracking-wide">
      💬 USER REVIEWS
    </h3>
    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
      {REVIEWS.map((r, i) => (
        <div
          key={i}
          className="bg-card border border-border rounded-lg p-3 hover:gold-border-glow transition-all"
        >
          <div className="flex items-center gap-1 mb-1">
            {Array.from({ length: r.stars }).map((_, j) => (
              <span key={j} className="text-primary text-xs">★</span>
            ))}
          </div>
          <p className="text-sm text-foreground font-body italic">"{r.text}"</p>
          <p className="text-xs text-muted-foreground mt-1 font-mono">
            — {r.user} ({r.country})
          </p>
        </div>
      ))}
    </div>
  </div>
);

export default FakeReviews;
