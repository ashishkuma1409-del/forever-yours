import { useRef } from "react";
import { motion } from "motion/react";
import { NextButton } from "../NextButton";
import { page5 } from "@/lib/proposal-data";

export function Page5Reasons({ onNext }: { onNext: () => void }) {
  const ref = useRef<HTMLDivElement>(null);
  const reasons = page5.reasons;
  const lastDelay = reasons.length * 0.13 + 0.7;

  return (
    <div ref={ref} className="flex flex-1 flex-col items-center justify-start py-2">
      <motion.h2
        initial={{ opacity: 0, y: -14 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: "easeInOut" }}
        className="mb-6 text-center font-[var(--font-vibes)] text-4xl leading-tight text-[var(--ruby)] sm:text-5xl"
      >
        {page5.title}
      </motion.h2>

      <div className="grid w-full max-w-3xl gap-3 sm:grid-cols-2">
        {reasons.map((reason, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 22 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ delay: i * 0.13, duration: 0.6, ease: "easeInOut" }}
            className="flex items-start gap-3 rounded-2xl bg-white/70 p-4 text-left shadow-[0_8px_22px_-12px_oklch(0.56_0.22_354_/_0.4)] backdrop-blur-sm"
          >
            <span className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-sm font-bold text-[var(--ivory)]"
              style={{ background: "linear-gradient(135deg, var(--ruby), var(--gold))" }}
            >
              {i + 1}
            </span>
            <p className="font-[var(--font-hand)] text-base leading-relaxed text-[var(--maroon)]/90 sm:text-lg">
              {reason}
            </p>
          </motion.div>
        ))}
      </div>

      <div className="mt-8">
        <NextButton label="Next" onClick={onNext} delay={lastDelay} withHeart />
      </div>
    </div>
  );
}
