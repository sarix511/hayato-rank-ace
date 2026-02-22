import { useState, useEffect } from "react";

const ConfidenceInjection = () => {
  const [show, setShow] = useState(false);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const timer = setTimeout(() => setShow(true), 3000);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (!show || progress >= 100) return;
    const interval = setInterval(() => {
      setProgress((p) => Math.min(p + Math.random() * 8 + 2, 100));
    }, 120);
    return () => clearInterval(interval);
  }, [show, progress]);

  if (!show) return null;

  return (
    <div className="fixed top-20 left-1/2 -translate-x-1/2 z-50 bg-card border border-primary/50 rounded-lg p-4 w-72 shadow-lg shadow-primary/20 animate-scale-in">
      <p className="text-xs font-mono text-primary mb-2">🧪 Injecting confidence.exe...</p>
      <div className="w-full h-2 bg-secondary rounded-full overflow-hidden">
        <div
          className="h-full gold-gradient rounded-full transition-all duration-150"
          style={{ width: `${progress}%` }}
        />
      </div>
      <p className="text-xs font-mono text-muted-foreground mt-1 text-right">
        {Math.round(progress)}% SELF-BELIEF
      </p>
      {progress >= 100 && (
        <p className="text-xs text-primary font-bold mt-1 animate-fade-in">
          💯 MAX CONFIDENCE ACHIEVED
        </p>
      )}
      {progress >= 100 && (
        <button
          onClick={() => setShow(false)}
          className="mt-2 text-xs text-muted-foreground hover:text-foreground transition-colors w-full text-center"
        >
          ✕ Close
        </button>
      )}
    </div>
  );
};

export default ConfidenceInjection;
