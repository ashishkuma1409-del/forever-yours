import { useEffect, useState } from "react";
import { motion } from "motion/react";
import { NextButton } from "../NextButton";
import { page2 } from "@/lib/proposal-data";

type Stage = "bow" | "flight" | "impact" | "done";

/** A small blooming petal. */
function Petal({ angle, delay }: { angle: number; delay: number }) {
  const rad = (angle * Math.PI) / 180;
  const dist = 90;
  return (
    <motion.span
      className="absolute text-xl"
      style={{ left: "50%", top: "50%" }}
      initial={{ opacity: 0, scale: 0, x: 0, y: 0, rotate: angle }}
      animate={{ opacity: [0, 1, 0], scale: [0, 1, 0.6], x: Math.cos(rad) * dist, y: Math.sin(rad) * dist - 40 }}
      transition={{ delay, duration: 1.6, ease: "easeOut" }}
    >
      🌸
    </motion.span>
  );
}

export function Page2Cupid({ onNext }: { onNext: () => void }) {
  const [stage, setStage] = useState<Stage>("bow");

  useEffect(() => {
    const t1 = setTimeout(() => setStage("flight"), 900);
    const t2 = setTimeout(() => setStage("impact"), 1700);
    const t3 = setTimeout(() => setStage("done"), 2700);
    return () => [t1, t2, t3].forEach(clearTimeout);
  }, []);

  return (
    <div className="relative flex flex-1 flex-col items-center justify-center text-center">
      <div className="relative h-[300px] w-full max-w-sm">
        {/* center heart */}
        <motion.div
          className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-6xl"
          animate={
            stage === "impact"
              ? { scale: [1, 1.4, 1], rotate: [0, -8, 8, 0] }
              : { scale: 1 }
          }
          transition={{ duration: 0.5 }}
        >
          <span className={stage === "impact" || stage === "done" ? "drop-shadow-[0_0_25px_oklch(0.62_0.18_352_/_0.9)]" : ""}>
            {stage === "done" ? "💞" : "🤍"}
          </span>
        </motion.div>

        {/* flower burst on impact */}
        {(stage === "impact" || stage === "done") &&
          Array.from({ length: 10 }, (_, i) => <Petal key={i} angle={(360 / 10) * i} delay={i * 0.04} />)}

        {/* bow in bottom-left */}
        <motion.div
          className="absolute bottom-2 left-2 text-4xl"
          initial={{ opacity: 0, x: -30, rotate: -20 }}
          animate={{ opacity: 1, x: 0, rotate: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          🏹
        </motion.div>

        {/* arrow flying from bottom-left to center */}
        {stage === "flight" && (
          <motion.div
            className="absolute text-2xl"
            style={{ left: "12%", bottom: "14%" }}
            initial={{ opacity: 1, x: 0, y: 0, rotate: -35 }}
            animate={{ x: 150, y: -150, rotate: -35 }}
            transition={{ duration: 0.7, ease: "easeIn" }}
          >
            ➹
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
