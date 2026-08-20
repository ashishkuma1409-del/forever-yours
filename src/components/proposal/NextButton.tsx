import { motion } from "motion/react";

/** The pill-shaped, glowing "Next" button. Fades in after `delay` seconds. */
export function NextButton({
  label,
  onClick,
  delay = 1,
  withHeart = false,
}: {
  label: string;
  onClick: () => void;
  delay?: number;
  withHeart?: boolean;
}) {
  return (
    <motion.div
      className="relative inline-flex"
      initial={{ opacity: 0, y: 18 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay, duration: 0.6, ease: [0.4, 0, 0.2, 1] }}
    >
      {/* soft pulsing glow ring to draw the eye */}
      <motion.span
        className="absolute inset-0 rounded-full"
        style={{
          boxShadow: "0 0 0 0 oklch(0.56 0.22 354 / 0.55)",
        }}
        animate={{ boxShadow: [
          "0 0 0 0 oklch(0.56 0.22 354 / 0.5)",
          "0 0 0 14px oklch(0.56 0.22 354 / 0)",
        ] }}
        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.button
        type="button"
        onClick={onClick}
        whileHover={{ scale: 1.06 }}
        whileTap={{ scale: 0.96 }}
        className="relative inline-flex items-center justify-center gap-2 rounded-full px-9 py-3.5 font-[var(--font-body)] text-base font-semibold tracking-wide text-[var(--ivory)] shadow-[0_10px_30px_-8px_oklch(0.56_0.22_354_/_0.6)]"
        style={{
          background: "linear-gradient(120deg, var(--ruby), var(--gold))",
        }}
      >
        {withHeart && (
          <svg viewBox="0 0 100 100" className="h-4 w-4" aria-hidden="true">
            <path d="M50 88 C50 88 10 60 10 36 C10 22 21 12 34 12 C41 12 47 16 50 22 C53 16 59 12 66 12 C79 12 90 22 90 36 C90 60 50 88 50 88 Z" fill="currentColor" />
          </svg>
        )}
        {label}
        <span className="text-lg">→</span>
      </motion.button>
    </motion.div>
  );
}
