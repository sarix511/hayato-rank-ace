// Web Audio API sound effects - no external files needed
const audioCtx = () => new (window.AudioContext || (window as any).webkitAudioContext)();

export const playBeep = (frequency = 800, duration = 0.08, volume = 0.15) => {
  try {
    const ctx = audioCtx();
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.frequency.value = frequency;
    osc.type = "square";
    gain.gain.value = volume;
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + duration);
    osc.start();
    osc.stop(ctx.currentTime + duration);
  } catch {}
};

export const playClick = () => playBeep(600, 0.05, 0.1);

export const playSuccess = () => {
  try {
    const ctx = audioCtx();
    const now = ctx.currentTime;
    [523, 659, 784, 1047].forEach((freq, i) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.frequency.value = freq;
      osc.type = "sine";
      gain.gain.value = 0.12;
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.15 * (i + 1) + 0.15);
      osc.start(now + 0.15 * i);
      osc.stop(now + 0.15 * (i + 1) + 0.15);
    });
  } catch {}
};

export const playTerminalLine = () => playBeep(400 + Math.random() * 400, 0.04, 0.06);

export const playError = () => {
  playBeep(200, 0.2, 0.15);
};
