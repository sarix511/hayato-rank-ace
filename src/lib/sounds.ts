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

export const playVictoryFanfare = () => {
  try {
    const ctx = audioCtx();
    const now = ctx.currentTime;
    // Epic victory melody
    const notes = [
      { freq: 523, time: 0, dur: 0.3 },
      { freq: 659, time: 0.3, dur: 0.3 },
      { freq: 784, time: 0.6, dur: 0.3 },
      { freq: 1047, time: 0.9, dur: 0.6 },
      { freq: 880, time: 1.5, dur: 0.3 },
      { freq: 1047, time: 1.8, dur: 0.3 },
      { freq: 1175, time: 2.1, dur: 0.3 },
      { freq: 1319, time: 2.4, dur: 0.8 },
      { freq: 1047, time: 3.2, dur: 0.3 },
      { freq: 1319, time: 3.5, dur: 0.3 },
      { freq: 1568, time: 3.8, dur: 1.0 },
      { freq: 2093, time: 4.8, dur: 1.5 },
    ];
    notes.forEach(({ freq, time, dur }) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.frequency.value = freq;
      osc.type = "sine";
      gain.gain.setValueAtTime(0.18, now + time);
      gain.gain.exponentialRampToValueAtTime(0.001, now + time + dur);
      osc.start(now + time);
      osc.stop(now + time + dur);
    });
    // Add bass harmonics
    [261, 330, 392, 523].forEach((freq, i) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.frequency.value = freq;
      osc.type = "triangle";
      gain.gain.setValueAtTime(0.1, now + i * 1.2);
      gain.gain.exponentialRampToValueAtTime(0.001, now + i * 1.2 + 1.0);
      osc.start(now + i * 1.2);
      osc.stop(now + i * 1.2 + 1.0);
    });
  } catch {}
};
