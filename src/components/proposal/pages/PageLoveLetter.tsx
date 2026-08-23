import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { NextButton } from "../NextButton";
import { loveLetter } from "@/lib/proposal-data";

/** A big sealed love-letter envelope that opens into the full application letter. */
export function PageLoveLetter({ onNext }: { onNext: () => void }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="flex flex-1 flex-col items-center justify-center py-8">
      <AnimatePresence mode="wait">
        {!open ? (
          <motion.button
            key="cover"
            type="button"
            onClick={() => setOpen(true)}
            initial={{ opacity: 0, y: 30, scale: 0.94 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, scale: 1.06 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            whileHover={{ scale: 1.03, rotate: -0.6 }}
            whileTap={{ scale: 0.97 }}
            className="relative w-full max-w-lg"
            aria-label={loveLetter.coverLabel}
          >
            {/* envelope body */}
            <div
              className="relative aspect-[4/2.7] w-full overflow-hidden rounded-[1.6rem] shadow-[0_26px_60px_-18px_oklch(0.56_0.22_354_/_0.6)]"
              style={{
                background:
                  "linear-gradient(160deg, oklch(0.97 0.03 30) 0%, oklch(0.93 0.05 350) 55%, oklch(0.88 0.07 354) 100%)",
              }}
            >
              {/* flap */}
              <div
                className="absolute inset-x-0 top-0 h-1/2"
                style={{
                  background: "linear-gradient(135deg, var(--rose), var(--ruby))",
                  clipPath: "polygon(0 0, 100% 0, 50% 100%)",
                  opacity: 0.92,
                }}
              />
              {/* side folds */}
              <div
                className="absolute inset-0"
                style={{
                  background:
                    "linear-gradient(115deg, oklch(0.85 0.085 75 / 0.35) 0 42%, transparent 42%), linear-gradient(245deg, oklch(0.85 0.085 75 / 0.35) 0 42%, transparent 42%)",
                }}
              />
              {/* wax seal */}
              <motion.div
                className="absolute left-1/2 top-1/2 flex h-20 w-20 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full text-3xl shadow-[0_10px_22px_-6px_oklch(0.4_0.18_354_/_0.7)]"
                style={{ background: "radial-gradient(circle at 35% 30%, oklch(0.7 0.2 355), var(--ruby))" }}
                animate={{ scale: [1, 1.07, 1] }}
                transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
              >
                <svg viewBox="0 0 100 100" className="h-10 w-10" aria-hidden="true">
                  <path
                    d="M50 88 C50 88 10 60 10 36 C10 22 21 12 34 12 C41 12 47 16 50 22 C53 16 59 12 66 12 C79 12 90 22 90 36 C90 60 50 88 50 88 Z"
                    fill="oklch(0.98 0.012 40 / 0.92)"
                  />
                </svg>
              </motion.div>

              <p className="absolute inset-x-0 bottom-5 px-6 font-[var(--font-vibes)] text-3xl text-[var(--maroon)] sm:text-4xl">
                {loveLetter.coverLabel}
              </p>
            </div>
            <p className="mt-4 font-[var(--font-body)] text-sm text-[var(--maroon)]/60">
              (click kariyee madamm jii)
            </p>
          </motion.button>
        ) : (
          <motion.article
            key="letter"
            initial={{ opacity: 0, y: 40, rotateX: -8 }}
            animate={{ opacity: 1, y: 0, rotateX: 0 }}
            transition={{ duration: 0.75, ease: "easeOut" }}
            className="w-full max-w-2xl rounded-[1.5rem] border border-[oklch(0.85_0.085_75_/_0.6)] p-6 text-left shadow-[0_26px_60px_-20px_oklch(0.56_0.22_354_/_0.5)] sm:p-9"
            style={{
              background:
                "linear-gradient(180deg, oklch(0.995 0.012 60) 0%, oklch(0.98 0.02 40) 100%)",
            }}
          >
            <p className="font-[var(--font-serif-lux)] text-base font-semibold text-[var(--ruby)] sm:text-lg">
              {loveLetter.to}
            </p>
            <p className="mt-1 font-[var(--font-serif-lux)] text-sm text-[var(--maroon)]/80 sm:text-base">
              {loveLetter.subject}
            </p>

            <div className="my-5 h-px w-full bg-gradient-to-r from-transparent via-[var(--gold)] to-transparent" />

            <p className="font-[var(--font-hand)] text-xl text-[var(--ruby)] sm:text-2xl">
              {loveLetter.greeting}
            </p>

            <div className="mt-3 space-y-3">
              {loveLetter.body.map((line, i) => (
                <motion.p
                  key={i}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.25 + i * 0.18, duration: 0.5 }}
                  className="font-[var(--font-hand)] text-lg leading-relaxed text-[var(--maroon)]/90 sm:text-xl"
                >
                  {line}
                </motion.p>
              ))}
            </div>

            <dl className="mt-6 space-y-2">
              {loveLetter.fields.map((f) => (
                <div key={f.label} className="flex flex-wrap gap-x-2">
                  <dt className="font-[var(--font-body)] text-sm font-semibold text-[var(--ruby)]">
                    {f.label}:
                  </dt>
                  <dd className="font-[var(--font-hand)] text-lg text-[var(--maroon)]/90">
                    {f.value}
                  </dd>
                </div>
              ))}
            </dl>

            <p className="mt-6 font-[var(--font-body)] text-sm font-semibold text-[var(--ruby)]">
              {loveLetter.finalRequestLabel}
            </p>
            <p className="mt-1 font-[var(--font-serif-lux)] text-lg italic text-[var(--maroon)] sm:text-xl">
              {loveLetter.finalRequest}
            </p>

            <p className="mt-6 font-[var(--font-body)] text-sm font-semibold text-[var(--ruby)]">
              {loveLetter.signatureLabel}
            </p>
            <p className="font-[var(--font-vibes)] text-4xl text-[var(--ruby)]">
              {loveLetter.signature}
            </p>

            <div className="mt-8 flex justify-center">
              <NextButton label={loveLetter.next} onClick={onNext} delay={1.4} withHeart />
            </div>
          </motion.article>
        )}
      </AnimatePresence>
    </div>
  );
}
