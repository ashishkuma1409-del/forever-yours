import { useMemo } from "react";

type Petal = {
  left: number;
  size: number;
  duration: number;
  delay: number;
  opacity: number;
  char: string;
  color: string;
};

const COLORS = ["oklch(0.62 0.18 352)", "oklch(0.85 0.085 75)", "oklch(0.56 0.22 354)", "oklch(0.93 0.045 350)"];
const CHARS = ["♥", "❀", "♥", "✿"];

/** Slowly drifting hearts & petals — the ambient thread tying all 7 pages together. */
export function FloatingPetals({ count = 18 }: { count?: number }) {
  const petals = useMemo<Petal[]>(
    () =>
      Array.from({ length: count }, () => ({
        left: Math.random() * 100,
        size: 10 + Math.random() * 22,
        duration: 14 + Math.random() * 16,
        delay: -Math.random() * 30,
        opacity: 0.16 + Math.random() * 0.34,
        char: CHARS[Math.floor(Math.random() * CHARS.length)] ?? "♥",
        color: COLORS[Math.floor(Math.random() * COLORS.length)] ?? "oklch(0.62 0.18 352)",
      })),
    [count],
  );

  return (
    <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
      {petals.map((p, i) => (
        <span
          key={i}
          className="float-up absolute bottom-[-10vh] select-none will-change-transform"
          style={{
            left: `${p.left}%`,
            fontSize: `${p.size}px`,
            color: p.color,
            animationDuration: `${p.duration}s`,
            animationDelay: `${p.delay}s`,
            // @ts-expect-error custom property for keyframe opacity
            "--petal-opacity": p.opacity,
            textShadow: "0 0 12px currentColor",
            filter: "blur(0.5px)",
          }}
        >
          {p.char}
        </span>
      ))}
    </div>
  );
}
