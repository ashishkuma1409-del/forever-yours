import { motion } from "motion/react";
import memoryPhoto from "@/assets/hands-memory.jpg.asset.json";
import { NextButton } from "../NextButton";
import { FilledHeart } from "../HeartIcon";
import { page3 } from "@/lib/proposal-data";

export function Page3Memory({ onNext }: { onNext: () => void }) {
  return (
    <div className="flex flex-1 flex-col items-center justify-center py-10 text-center">
      <motion.h2
        initial={{ opacity: 0, y: -14 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: "easeInOut" }}
        className="mb-6 flex items-center gap-3 font-[var(--font-script)] text-4xl text-[var(--ruby)]"
      >
        <FilledHeart className="h-6 w-6" />
        {page3.title}
      </motion.h2>

      <motion.div
        initial={{ opacity: 0, scale: 0.85 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.3, duration: 0.8, ease: "easeInOut" }}
        className="relative"
      >
        <div
          className="rounded-[1.75rem] p-2 shadow-[0_18px_40px_-18px_oklch(0.56_0.22_354_/_0.6)]"
          style={{ background: "linear-gradient(135deg, var(--gold), var(--rose))" }}
        >
          <img
            src={memoryPhoto.url}
            alt="Our hands together — the moment it all began"
            loading="lazy"
            className="h-72 w-56 rounded-[1.4rem] object-cover"
          />
        </div>
      </motion.div>

      <motion.p
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.9, duration: 0.8, ease: "easeInOut" }}
        className="mt-7 max-w-sm font-[var(--font-body)] text-[0.95rem] leading-relaxed text-[var(--maroon)]/80"
      >
        {page3.note}
      </motion.p>

      <div className="mt-8">
        <NextButton label="Next" onClick={onNext} delay={1.7} withHeart />
      </div>
    </div>
  );
}
