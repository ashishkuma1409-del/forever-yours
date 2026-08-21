import { motion } from "motion/react";
import { OrnateHeart } from "../HeartIcon";
import { NextButton } from "../NextButton";
import { page0 } from "@/lib/proposal-data";

/** The very first hello — a shy little greeting before the story begins. */
export function Page0Intro({ onNext }: { onNext: () => void }) {
  return (
    <div className="flex flex-1 flex-col items-center justify-center gap-8 text-center">
      <motion.div
        initial={{ opacity: 0, scale: 0.7 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.9, ease: "easeInOut" }}
      >
        <OrnateHeart size={130} sparkles={6} />
      </motion.div>

      <motion.p
        initial={{ opacity: 0, y: 18 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4, duration: 0.9, ease: "easeInOut" }}
        className="max-w-sm font-[var(--font-script)] text-2xl leading-relaxed text-[var(--ruby)] drop-shadow-sm"
      >
        {page0.line1}
      </motion.p>

      <motion.p
        initial={{ opacity: 0, y: 18 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.1, duration: 0.9, ease: "easeInOut" }}
        className="font-[var(--font-display)] text-lg italic text-[var(--maroon)]/75"
      >
        {page0.line2}
      </motion.p>

      <NextButton label={page0.button} onClick={onNext} delay={1.7} withHeart />
    </div>
  );
}
