import { useEffect, useState } from "react";
import { motion } from "motion/react";
import { fireBigCelebration, startCelebrationLoop } from "../confetti";
import { NextButton } from "../NextButton";
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

type Step = "celebrate" | "wish" | "thanks";

export function Page7Celebration() {
  const [showMessage, setShowMessage] = useState(false);
  const [step, setStep] = useState<Step>("celebrate");

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
    <div className="relative flex flex-1 flex-col items-center justify-center gap-8 overflow-hidden py-10 text-center">
      {Array.from({ length: 10 }, (_, i) => (
        <RisingHeart key={i} delay={i * 0.6} />
      ))}

      {step === "celebrate" && showMessage && (
        <motion.div
          initial={{ opacity: 0, y: 20, scale: 0.92 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 1.1, ease: "easeInOut" }}
          className="flex flex-col items-center gap-4 px-6"
        >
          <p className="font-[var(--font-vibes)] text-4xl leading-tight shimmer-text drop-shadow-[0_2px_12px_oklch(0.56_0.22_354_/_0.3)] sm:text-6xl">
            {page7.finalMessage}
          </p>
          <p className="font-[var(--font-serif-lux)] text-lg italic text-[var(--ruby)]">
            {page7.closing}
          </p>
          <NextButton
            label={page7.celebrationNext}
            onClick={() => setStep("wish")}
            delay={1.4}
            withHeart
          />
        </motion.div>
      )}

      {/* the wish letter for Bappa — its own page */}
      {step === "wish" && (
        <motion.article
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease: "easeOut" }}
          className="relative z-10 w-full max-w-2xl rounded-[1.5rem] border border-[oklch(0.85_0.085_75_/_0.7)] p-6 text-left shadow-[0_24px_58px_-20px_oklch(0.56_0.22_354_/_0.45)] sm:p-9"
          style={{
            background:
              "linear-gradient(180deg, oklch(0.995 0.014 70) 0%, oklch(0.98 0.025 40) 100%)",
          }}
        >
          <h2 className="text-center font-[var(--font-vibes)] text-3xl text-[var(--ruby)] sm:text-4xl">
            {page7.wishTitle}
          </h2>
          <div className="my-4 h-px w-full bg-gradient-to-r from-transparent via-[var(--gold)] to-transparent" />
          <div className="space-y-3">
            {page7.wish.map((line, i) => (
              <motion.p
                key={i}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 + i * 0.25, duration: 0.6 }}
                className={
                  i === page7.wish.length - 1
                    ? "pt-1 text-center font-[var(--font-vibes)] text-3xl text-[var(--ruby)]"
                    : "font-[var(--font-hand)] text-lg leading-relaxed text-[var(--maroon)]/90 sm:text-xl"
                }
              >
                {line}
              </motion.p>
            ))}
          </div>
        </motion.article>
      )}
    </div>
  );
}
