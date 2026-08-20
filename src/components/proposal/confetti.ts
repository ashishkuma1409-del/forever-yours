import confetti from "canvas-confetti";

const c = confetti as unknown as {
  (opts: confetti.Options): Promise<null> | null;
  shapeFromText?: (opts: { text: string; scalar?: number }) => confetti.Shape;
};

const heartShape = (() => {
  try {
    return c.shapeFromText ? c.shapeFromText({ text: "💗", scalar: 2.2 }) : undefined;
  } catch {
    return undefined;
  }
})();

const rose = ["#E63950", "#D63A6A", "#F5C6A5", "#FFE4EC", "#FF8FA3"];

/** Small warm burst used on Page 6 intro. */
export function fireHeartBurst() {
  const shapes = heartShape ? [heartShape] : undefined;
  c({
    particleCount: 50,
    spread: 75,
    startVelocity: 38,
    scalar: 1.5,
    gravity: 0.9,
    ticks: 220,
    origin: { x: 0.5, y: 0.62 },
    colors: rose,
    shapes,
  });
}

/** Sustained, looping celebration for Page 7. Returns the interval id. */
export function startCelebrationLoop(): ReturnType<typeof setInterval> {
  const shapes = heartShape ? [heartShape] : undefined;
  const base = {
    scalar: 1.6,
    gravity: 0.85,
    ticks: 260,
    colors: rose,
    shapes,
  };
  return setInterval(() => {
    c({ ...base, particleCount: 28, spread: 60, startVelocity: 32, origin: { x: 0.2, y: 0.9 }, angle: 60 });
    c({ ...base, particleCount: 28, spread: 60, startVelocity: 32, origin: { x: 0.8, y: 0.9 }, angle: 120 });
  }, 700);
}

/** Big opening salvo for Page 7. */
export function fireBigCelebration() {
  const shapes = heartShape ? [heartShape] : undefined;
  const base = { scalar: 1.8, gravity: 0.9, ticks: 300, colors: rose, shapes };
  c({ ...base, particleCount: 90, spread: 120, startVelocity: 45, origin: { x: 0.5, y: 0.5 } });
  setTimeout(() => c({ ...base, particleCount: 60, spread: 100, startVelocity: 40, origin: { x: 0.3, y: 0.6 } }), 250);
  setTimeout(() => c({ ...base, particleCount: 60, spread: 100, startVelocity: 40, origin: { x: 0.7, y: 0.6 } }), 450);
}
