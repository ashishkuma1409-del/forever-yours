import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import g1 from "@/assets/gallery-1.jpg";
import g2 from "@/assets/gallery-2.jpg";
import g3 from "@/assets/gallery-3.jpg";
import g4 from "@/assets/gallery-4.jpg";
import g5 from "@/assets/gallery-5.jpg";
import g6 from "@/assets/gallery-6.jpg";
import { NextButton } from "../NextButton";
import { page4 } from "@/lib/proposal-data";

const IMAGES = [g1, g2, g3, g4, g5, g6];

export function Page4Gallery({ onNext }: { onNext: () => void }) {
  const [[index, dir], setState] = useState<[number, number]>([0, 0]);
  const n = IMAGES.length;

  const paginate = (d: number) => setState([ (index + d + n) % n, d ]);

  return (
    <div className="flex flex-1 flex-col items-center justify-center text-center">
      <motion.h2
        initial={{ opacity: 0, y: -14 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: "easeInOut" }}
        className="mb-5 font-[var(--font-script)] text-4xl text-[var(--ruby)]"
      >
        {page4.title}
      </motion.h2>

      <div className="relative h-72 w-64 max-w-full overflow-hidden rounded-[1.5rem] shadow-[0_18px_40px_-12px_oklch(0.56_0.22_354_/_0.5)]"
        style={{ background: "linear-gradient(135deg, var(--gold), var(--rose))" }}
      >
        <div className="absolute inset-0 rounded-[1.5rem] p-1.5">
          <div className="relative h-full w-full overflow-hidden rounded-[1.3rem]">
            <AnimatePresence custom={dir} mode="wait" initial={false}>
              <motion.img
                key={index}
                src={IMAGES[index]}
                alt={page4.slides[index]?.caption ?? `Photo ${index + 1}`}
                width={1024}
                height={1024}
                loading="lazy"
                draggable={false}
                className="absolute inset-0 h-full w-full touch-none object-cover"
                initial={{ opacity: 0, x: dir > 0 ? 90 : -90 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: dir > 0 ? -90 : 90 }}
                transition={{ duration: 0.35, ease: "easeInOut" }}
                drag="x"
                dragConstraints={{ left: 0, right: 0 }}
                dragElastic={0.6}
                onDragEnd={(_, info) => {
                  if (info.offset.x < -60) paginate(1);
                  else if (info.offset.x > 60) paginate(-1);
                }}
              />
            </AnimatePresence>
            <div className="pointer-events-none absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/55 to-transparent p-3">
              <p className="font-[var(--font-body)] text-sm font-medium text-white/95">
                {page4.slides[index]?.caption ?? ""}
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-5 flex items-center gap-2">
        {IMAGES.map((_, i) => (
          <button
            key={i}
            type="button"
            aria-label={`Photo ${i + 1}`}
            onClick={() => setState([i, i > index ? 1 : -1])}
            className="h-2 rounded-full transition-all"
            style={{
              width: i === index ? 22 : 8,
              background: i === index ? "var(--ruby)" : "oklch(0.85 0.06 354 / 0.5)",
            }}
          />
        ))}
      </div>

      <div className="mt-6 flex gap-3">
        <button
          type="button"
          onClick={() => paginate(-1)}
          className="rounded-full bg-white/60 px-4 py-2 text-[var(--ruby)] shadow-sm backdrop-blur-sm"
          aria-label="Previous photo"
        >
          ←
        </button>
        <button
          type="button"
          onClick={() => paginate(1)}
          className="rounded-full bg-white/60 px-4 py-2 text-[var(--ruby)] shadow-sm backdrop-blur-sm"
          aria-label="Next photo"
        >
          →
        </button>
      </div>

      <div className="mt-7">
        <NextButton label="Next" onClick={onNext} delay={0.6} withHeart />
      </div>
    </div>
  );
}
