import { useState } from "react";
import { motion } from "motion/react";
import landingBg from "@/assets/landing-bg.jpg";
import { DrawingHeart, FilledHeart } from "../HeartIcon";
import { NextButton } from "../NextButton";
import { page1 } from "@/lib/proposal-data";

type Stage = "idle" | "drawing" | "done";

export function Page1Heart({
  onBegin,
  onNext,
}: {
  onBegin: () => void;
  onNext: () => void;
}) {
  const [stage, setStage] = useState<Stage>("idle");

  const begin = () => {
    onBegin();
    setStage("drawing");
  };

  return (
    <div className="relative flex flex-1 flex-col items-center justify-center text-center">
      {/* blurred background photo + gradient overlay */}
      <img
        src={landingBg}
        alt=""
        width={1024}
        height={1024}
        className="absolute inset-0 -z-10 h-full w-full scale-125 object-cover blur-2xl"
      />
      <div className="absolute inset-0 -z-10 bg-gradient-to-b from-[oklch(0.2_0.06_350_/_0.55)] via-[oklch(0.45_0.12_354_/_0.35)] to-[oklch(0.93_0.045_350_/_0.5)]" />

      {stage === "idle" && (
        <motion.button
          type="button"
          onClick={begin}
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, ease: "easeInOut" }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.96 }}
          className="flex flex-col items-center gap-6"
        >
          <span className="text-5xl heartbeat">💗</span>
          <span className="rounded-full px-8 py-3.5 font-[var(--font-body)] text-base font-semibold tracking-wide text-[var(--ivory)] shadow-lg"
            style={{ background: "linear-gradient(120deg, var(--ruby), var(--gold))" }}
          >
            {page1.beginLabel}
          </span>
        </motion.button>
      )}

      {stage !== "idle" && (
        <div className="flex flex-col items-center gap-7 px-2">
          {stage === "drawing" ? (
            <DrawingHeart onDrawComplete={() => setStage("done")} size={190} />
          ) : (
            <motion.div
              initial={{ opacity: 0, scale: 0.6 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, ease: "easeInOut" }}
              className="heartbeat"
            >
              <FilledHeart className="h-44 w-44 drop-shadow-[0_0_30px_oklch(0.62_0.18_352_/_0.7)]" />
            </motion.div>
          )}

          {stage === "done" && (
            <>
              <motion.p
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2, duration: 0.8, ease: "easeInOut" }}
                className="max-w-xs font-[var(--font-script)] text-2xl leading-snug text-[var(--ivory)] drop-shadow-md"
              >
                {page1.line1}
              </motion.p>
              <motion.p
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1, duration: 0.8, ease: "easeInOut" }}
                className="font-[var(--font-display)] text-lg italic text-[var(--gold)] drop-shadow-md"
              >
                {page1.line2}
              </motion.p>
              <div className="mt-2">
                <NextButton label="Next" onClick={onNext} delay={1.6} withHeart />
              </div>
            </>
          )}
        </div>
      )}
    </div>
  );
}
