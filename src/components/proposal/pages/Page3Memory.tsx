import { motion } from "motion/react";
import memoryPhoto from "@/assets/memory-photo.jpg";
import { NextButton } from "../NextButton";
import { page3 } from "@/lib/proposal-data";

export function Page3Memory({ onNext }: { onNext: () => void }) {
  return (
    <div className="flex flex-1 flex-col items-center justify-center text-center">
      <motion.h2
        initial={{ opacity: 0, y: -14 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: "easeInOut" }}
        className="mb-6 font-[var(--font-script)] text-4xl text-[var(--ruby)]"
      >
        {page3.title}
      </motion.h2>

      <motion.div
        initial={{ opacity: 0, scale: 0.85 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.3, duration: 0.8, ease: "easeInOut" }}
        className="relative"
      >
        <div
          className="rounded-[1.75rem] p-2"
          style={{ background: "linear-gradient(135deg, var(--gold), var(--rose))" }}
        >
          <img
            src={memoryPhoto}
            alt="A favourite memory"
            width={1024}
            height={1024}
            loading="lazy"
            className="h-60 w-60 rounded-[1.4rem] object-cover"
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
