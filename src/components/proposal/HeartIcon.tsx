import { motion } from "motion/react";

/** A heart outline path on a 100x100 viewBox, used for the draw animation. */
export const HEART_PATH =
  "M50 88 C50 88 10 60 10 36 C10 22 21 12 34 12 C41 12 47 16 50 22 C53 16 59 12 66 12 C79 12 90 22 90 36 C90 60 50 88 50 88 Z";

export function HeartGradientDefs({ id = "heartGrad" }: { id?: string }) {
  return (
    <defs>
      <linearGradient id={id} x1="0" y1="0" x2="1" y2="1">
        <stop offset="0%" stopColor="oklch(0.62 0.18 352)" />
        <stop offset="55%" stopColor="oklch(0.56 0.22 354)" />
        <stop offset="100%" stopColor="oklch(0.85 0.085 75)" />
      </linearGradient>
      <radialGradient id={`${id}-fill`} cx="38%" cy="30%" r="78%">
        <stop offset="0%" stopColor="oklch(0.86 0.12 355)" />
        <stop offset="45%" stopColor="oklch(0.66 0.2 353)" />
        <stop offset="100%" stopColor="oklch(0.46 0.19 356)" />
      </radialGradient>
      <linearGradient id={`${id}-shine`} x1="0" y1="0" x2="0.6" y2="1">
        <stop offset="0%" stopColor="oklch(1 0 0 / 0.85)" />
        <stop offset="100%" stopColor="oklch(1 0 0 / 0)" />
      </linearGradient>
      <linearGradient id={`${id}-rim`} x1="0" y1="1" x2="1" y2="0">
        <stop offset="0%" stopColor="oklch(0.85 0.085 75)" />
        <stop offset="50%" stopColor="oklch(0.98 0.03 60)" />
        <stop offset="100%" stopColor="oklch(0.85 0.085 75)" />
      </linearGradient>
    </defs>
  );
}

/**
 * Filled, jewel-like heart: gold rim, deep rose body, glass highlight and
 * a soft inner glow. Gently pulses via the `heartbeat` utility on the parent.
 */
export function FilledHeart({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 100 100" className={className} aria-hidden="true">
      <HeartGradientDefs />
      {/* gold rim */}
      <path d={HEART_PATH} fill="none" stroke="url(#heartGrad-rim)" strokeWidth={4.5} strokeLinejoin="round" />
      {/* jewel body */}
      <path d={HEART_PATH} fill="url(#heartGrad-fill)" />
      {/* glass shine */}
      <path
        d="M34 20 C24 20 17 27 17 36 C17 45 24 55 33 63 C26 50 24 38 28 30 C30 25 33 22 38 21 Z"
        fill="url(#heartGrad-shine)"
      />
      <ellipse cx="63" cy="28" rx="7" ry="4.5" fill="oklch(1 0 0 / 0.45)" transform="rotate(-25 63 28)" />
    </svg>
  );
}

/** Filled heart wrapped in orbiting sparkles + a breathing halo. */
export function OrnateHeart({
  size = 190,
  sparkles = 8,
}: {
  size?: number;
  sparkles?: number;
}) {
  return (
    <div className="relative" style={{ width: size, height: size }}>
      {/* breathing halo */}
      <motion.div
        className="absolute inset-0 rounded-full"
        style={{
          background:
            "radial-gradient(circle, oklch(0.62 0.18 352 / 0.45) 0%, transparent 68%)",
        }}
        animate={{ scale: [1, 1.18, 1], opacity: [0.55, 0.9, 0.55] }}
        transition={{ duration: 2.6, repeat: Infinity, ease: "easeInOut" }}
      />
      {/* orbiting sparkle ring */}
      <motion.div
        className="absolute inset-0"
        animate={{ rotate: 360 }}
        transition={{ duration: 22, repeat: Infinity, ease: "linear" }}
      >
        {Array.from({ length: sparkles }, (_, i) => {
          const a = ((Math.PI * 2) / sparkles) * i;
          const r = size / 2 - 6;
          return (
            <motion.span
              key={i}
              className="absolute h-1.5 w-1.5 rounded-full"
              style={{
                left: size / 2 + Math.cos(a) * r - 3,
                top: size / 2 + Math.sin(a) * r - 3,
                background: i % 2 ? "var(--gold)" : "var(--rose)",
                boxShadow: "0 0 10px currentColor",
                color: i % 2 ? "var(--gold)" : "var(--rose)",
              }}
              animate={{ opacity: [0.3, 1, 0.3], scale: [0.7, 1.4, 0.7] }}
              transition={{ duration: 2, repeat: Infinity, delay: i * 0.22, ease: "easeInOut" }}
            />
          );
        })}
      </motion.div>
      <div className="heartbeat absolute inset-[14%]">
        <FilledHeart className="h-full w-full drop-shadow-[0_0_28px_oklch(0.62_0.18_352_/_0.75)]" />
      </div>
    </div>
  );
}

/** Heart that draws itself stroke-by-stroke with a gold tracer, then settles. */
export function DrawingHeart({
  onDrawComplete,
  size = 190,
}: {
  onDrawComplete: () => void;
  size?: number;
}) {
  return (
    <div className="relative" style={{ width: size, height: size }}>
      <svg viewBox="0 0 100 100" width={size} height={size} className="heartbeat" aria-hidden="true">
        <HeartGradientDefs />
        {/* faint guide */}
        <path d={HEART_PATH} fill="none" stroke="oklch(0.62 0.18 352 / 0.18)" strokeWidth={1.2} />
        {/* main ruby-gold stroke */}
        <motion.path
          d={HEART_PATH}
          fill="none"
          stroke="url(#heartGrad)"
          strokeWidth={3.6}
          strokeLinecap="round"
          strokeLinejoin="round"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: 1 }}
          transition={{ pathLength: { duration: 2.6, ease: "easeInOut" }, opacity: { duration: 0.3 } }}
          onAnimationComplete={onDrawComplete}
          style={{ filter: "drop-shadow(0 0 8px oklch(0.62 0.18 352 / 0.8))" }}
        />
        {/* glowing tracer following the stroke */}
        <motion.path
          d={HEART_PATH}
          fill="none"
          stroke="oklch(0.98 0.04 60)"
          strokeWidth={5}
          strokeLinecap="round"
          strokeDasharray="0.04 1"
          pathLength={1}
          initial={{ pathLength: 0.001, strokeDashoffset: 0 }}
          animate={{ strokeDashoffset: [0, -1] }}
          transition={{ duration: 2.6, ease: "easeInOut" }}
          style={{ filter: "drop-shadow(0 0 10px oklch(0.98 0.04 60))" }}
        />
      </svg>
    </div>
  );
}
