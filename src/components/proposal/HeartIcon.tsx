import { motion } from "motion/react";

/** A heart outline path on a 100x100 viewBox, used for the Page 1 draw animation. */
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
      <radialGradient id={`${id}-fill`} cx="50%" cy="42%" r="60%">
        <stop offset="0%" stopColor="oklch(0.75 0.2 355)" />
        <stop offset="100%" stopColor="oklch(0.56 0.22 354)" />
      </radialGradient>
    </defs>
  );
}

/** Filled, gently pulsing heart. */
export function FilledHeart({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 100 100" className={className} aria-hidden="true">
      <HeartGradientDefs />
      <path d={HEART_PATH} fill="url(#heartGrad-fill)" />
    </svg>
  );
}

/** Heart that draws itself stroke-by-stroke, then settles. */
export function DrawingHeart({
  onDrawComplete,
  size = 180,
}: {
  onDrawComplete: () => void;
  size?: number;
}) {
  return (
    <svg viewBox="0 0 100 100" width={size} height={size} className="heartbeat" aria-hidden="true">
      <HeartGradientDefs />
      <motion.path
        d={HEART_PATH}
        fill="none"
        stroke="url(#heartGrad)"
        strokeWidth={3.2}
        strokeLinecap="round"
        strokeLinejoin="round"
        initial={{ pathLength: 0, opacity: 0 }}
        animate={{ pathLength: 1, opacity: 1 }}
        transition={{ pathLength: { duration: 2.6, ease: "easeInOut" }, opacity: { duration: 0.3 } }}
        onAnimationComplete={onDrawComplete}
      />
    </svg>
  );
}
