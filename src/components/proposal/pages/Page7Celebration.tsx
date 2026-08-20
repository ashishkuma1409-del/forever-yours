import { useEffect, useState } from "react";
import { motion } from "motion/react";
import { fireBigCelebration, startCelebrationLoop } from "../confetti";
import { page7 } from "@/lib/proposal-data";

function RisingHeart({ delay }: { delay: number }) {
  return (
    <motion.span
      className="pointer-events-none absolute bottom-0 text-2xl"
      style={{ left: `${10 + Math.random() * 80}%` }}
      initial={{ opacity: 0, y: 0, scale: 0.5 }}
      animate={{ opacity: [0, 1, 1, 0], y: -420, scale: 1 }}
      transition={{ delay, duration: 6, repeat: Infinity, ease: "easeOut" }}
    >
      💗
    </motion.span>
  );
}

export function Page7Celebration() {
  const [showMessage, setShowMessage] = useState(false);

  useEffect(() => {
    fireBigCelebration();
    const loop = startCelebrationLoop();
    const t = setTimeout(() => setShowMessage(true), 900);
    return () => {
      clearInterval(loop);
      clearTimeout(t);
    };
  }, []);

  return (
    <div className="relative flex flex-1 flex-col items-center justify-center overflow-hidden text-center">
      {/* golden glow rays */}
      <div
        className="pointer-events-none absolute inset-0 -z-10"
        style={{
          background:
            "radial-gradient(ellipse at 50% 40%, oklch(0.85 0.12 75 / 0.5) 0%, transparent 55%), radial-gradient(ellipse at 50% 100%, oklch(0.62 0.18 352 / 0.45) 0%, transparent 60%)",
        }}
      />

      {Array.from({ length: 14 }, (_, i) => (
        <RisingHeart key={i} delay={i * 0.5} />
      ))}

      {showMessage && (
        <motion.div
          initial={{ opacity: 0, y: 20, scale: 0.92 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 1.1, ease: "easeInOut" }}
          className="flex flex-col items-center gap-5 px-6"
        >
          <p className="font-[var(--font-vibes)] text-4xl leading-tight shimmer-text drop-shadow-[0_2px_12px_oklch(0.56_0.22_354_/_0.3)] sm:text-5xl">
            {page7.finalMessage}
          </p>
          <p className="font-[var(--font-display)] text-lg italic text-[var(--ruby)]">
            {page7.closing}
          </p>
        </motion.div>
      )}
    </div>
  );
}
