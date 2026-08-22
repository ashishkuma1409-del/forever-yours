import { useEffect, useState } from "react";
import { motion } from "motion/react";
import { NextButton } from "../NextButton";
import { OrnateHeart, FilledHeart } from "../HeartIcon";
import { page2 } from "@/lib/proposal-data";

type Stage = "bow" | "flight" | "impact" | "done";

/** A small blooming petal. */
function Petal({ angle, delay }: { angle: number; delay: number }) {
  const rad = (angle * Math.PI) / 180;
  const dist = 110;
  return (
    <motion.span
      className="absolute text-2xl"
      style={{ left: "50%", top: "50%" }}
      initial={{ opacity: 0, scale: 0, x: 0, y: 0, rotate: angle }}
      animate={{ opacity: [0, 1, 0], scale: [0, 1.1, 0.6], x: Math.cos(rad) * dist, y: Math.sin(rad) * dist - 30 }}
      transition={{ delay, duration: 1.7, ease: "easeOut" }}
    >
      🌸
    </motion.span>
  );
}

export function Page2Cupid({ onNext }: { onNext: () => void }) {
  const [stage, setStage] = useState<Stage>("bow");

  useEffect(() => {
    const t1 = setTimeout(() => setStage("flight"), 900);
    const t2 = setTimeout(() => setStage("impact"), 1750);
    const t3 = setTimeout(() => setStage("done"), 2750);
    return () => [t1, t2, t3].forEach(clearTimeout);
  }, []);

  return (
    <div className="relative flex flex-1 flex-col items-center justify-center text-center">
      <div className="relative h-[340px] w-full max-w-sm">
        {/* the heart, dead centre — bigger and jewel-like */}
        <motion.div
          className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
          animate={
            stage === "impact"
              ? { scale: [1, 1.35, 1], rotate: [0, -7, 7, 0] }
              : { scale: 1 }
          }
          transition={{ duration: 0.55 }}
        >
          {stage === "done" ? (
            <OrnateHeart size={190} />
          ) : (
            <FilledHeart className="h-40 w-40 heartbeat drop-shadow-[0_0_22px_oklch(0.62_0.18_352_/_0.6)]" />
          )}
        </motion.div>

        {/* impact flash at the exact centre */}
        {stage === "impact" && (
          <motion.div
            className="absolute left-1/2 top-1/2 h-24 w-24 -translate-x-1/2 -translate-y-1/2 rounded-full"
            style={{ background: "radial-gradient(circle, oklch(1 0 0 / 0.9), transparent 70%)" }}
            initial={{ scale: 0.2, opacity: 1 }}
            animate={{ scale: 2.4, opacity: 0 }}
            transition={{ duration: 0.7, ease: "easeOut" }}
          />
        )}

        {/* flower burst on impact */}
        {(stage === "impact" || stage === "done") &&
          Array.from({ length: 12 }, (_, i) => <Petal key={i} angle={(360 / 12) * i} delay={i * 0.04} />)}

        {/* the bow — big, hand-drawn, bottom-left */}
        <motion.div
          className="absolute bottom-1 left-1"
          initial={{ opacity: 0, x: -30, rotate: -18 }}
          animate={{ opacity: 1, x: 0, rotate: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          <svg width={120} height={120} viewBox="0 0 100 100" aria-hidden="true">
            <path
              d="M22 8 C64 26 64 74 22 92"
              fill="none"
              stroke="var(--gold)"
              strokeWidth={7}
              strokeLinecap="round"
            />
            <motion.path
              d={stage === "bow" ? "M22 8 L34 50 L22 92" : "M22 8 L22 92"}
              fill="none"
              stroke="oklch(0.45 0.05 350)"
              strokeWidth={2.4}
              strokeLinecap="round"
            />
          </svg>
        </motion.div>

        {/* arrow flying from the bow straight into the heart's exact centre */}
        {stage === "flight" && (
          <motion.div
            className="absolute left-1/2 top-1/2"
            initial={{ x: -150, y: 150, opacity: 1 }}
            animate={{ x: -6, y: 4, opacity: 1 }}
            transition={{ duration: 0.85, ease: "easeIn" }}
            style={{ filter: "drop-shadow(0 0 10px oklch(0.85 0.085 75 / 0.9))" }}
          >
            <svg width={130} height={130} viewBox="0 0 100 100" className="-translate-x-1/2 -translate-y-1/2 rotate-[-45deg]" aria-hidden="true">
              {/* shaft */}
              <line x1="14" y1="86" x2="80" y2="20" stroke="oklch(0.45 0.05 350)" strokeWidth={4} strokeLinecap="round" />
              {/* heart tip */}
              <path
                d="M84 8 C86 14 92 14 92 20 C92 26 84 30 84 30 C84 30 76 26 76 20 C76 14 82 14 84 8 Z"
                fill="var(--ruby)"
              />
              {/* feathers */}
              <path d="M14 86 L8 72 L22 78 Z" fill="var(--gold)" />
              <path d="M14 86 L28 92 L22 78 Z" fill="var(--rose)" />
            </svg>
          </motion.div>
        )}

      </div>

      {stage === "done" && (
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: "easeInOut" }}
          className="flex flex-col items-center gap-7"
        >
          <p className="font-[var(--font-display)] text-3xl italic text-[var(--ruby)] drop-shadow-sm">
            {page2.message}
          </p>
          <NextButton label={page2.button} onClick={onNext} delay={0.8} withHeart />
        </motion.div>
      )}
    </div>
  );
}
