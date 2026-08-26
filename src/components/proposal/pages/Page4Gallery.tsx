import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import happy from "@/assets/gal-happy.jpg.asset.json";
import bday1 from "@/assets/gal-bday-1.jpg.asset.json";
import bday2 from "@/assets/gal-bday-2.jpg.asset.json";
import tour1 from "@/assets/gal-tour-1.jpg.asset.json";
import tour2 from "@/assets/gal-tour-2.jpg.asset.json";
import pooja from "@/assets/gal-pooja.jpg.asset.json";
import memory from "@/assets/gal-memory.jpg.asset.json";
import { NextButton } from "../NextButton";
import { galleryChapters, page4, type GalleryKey } from "@/lib/proposal-data";

const SRC: Record<GalleryKey, string> = {
  happy: happy.url,
  bday1: bday1.url,
  bday2: bday2.url,
  tour1: tour1.url,
  tour2: tour2.url,
  pooja: pooja.url,
  memory: memory.url,
};

/** Face-down photo card that flips 180° in 3D to reveal the original photo. */
function FlipPhoto({ src, alt }: { src: string; alt: string }) {
  const [revealed, setRevealed] = useState(false);

  return (
    <div className="overflow-hidden rounded-[1.2rem] bg-black/5" style={{ perspective: 1200 }}>
      <button
        type="button"
        onClick={() => setRevealed((r) => !r)}
        aria-label={revealed ? "Photo dikh rahi hai" : "Click to reveal"}
        className="relative block h-72 w-full cursor-pointer sm:h-80"
        style={{ transformStyle: "preserve-3d" }}
      >
        <motion.div
          className="absolute inset-0"
          animate={{ rotateY: revealed ? 180 : 0 }}
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
          style={{ transformStyle: "preserve-3d" }}
        >
          {/* back side (shown first) */}
          <div
            className="absolute inset-0 flex flex-col items-center justify-center gap-2 rounded-[1.2rem] border border-[var(--gold)]/60 text-center"
            style={{
              backfaceVisibility: "hidden",
              WebkitBackfaceVisibility: "hidden",
              background:
                "radial-gradient(circle at 30% 20%, oklch(0.98 0.02 40) 0%, oklch(0.94 0.045 350) 60%, oklch(0.9 0.06 352) 100%)",
              boxShadow: "inset 0 0 0 6px oklch(1 0 0 / 0.55), inset 0 0 22px oklch(0.62 0.18 352 / 0.2)",
            }}
          >
            <span className="absolute left-3 top-3 text-sm text-[var(--rose)]/70">✦</span>
            <span className="absolute right-4 top-5 text-xs text-[var(--gold)]">✿</span>
            <span className="absolute bottom-4 left-5 text-xs text-[var(--gold)]">✧</span>
            <span className="absolute bottom-3 right-3 text-sm text-[var(--rose)]/70">❀</span>

            <FilledHeart className="h-8 w-8 animate-[heartbeat_1.6s_ease-in-out_infinite] text-[var(--ruby)]" />
            <span className="font-[var(--font-vibes)] text-3xl text-[var(--ruby)]">
              click to reveal
            </span>
            <span className="font-[var(--font-body)] text-[0.65rem] uppercase tracking-[0.3em] text-[var(--maroon)]/45">
              ek yaad chhupi hai
            </span>
          </div>

          {/* front side (the real photo, untouched) */}
          <div
            className="absolute inset-0 overflow-hidden rounded-[1.2rem]"
            style={{
              backfaceVisibility: "hidden",
              WebkitBackfaceVisibility: "hidden",
              transform: "rotateY(180deg)",
            }}
          >
            <img
              src={src}
              alt={alt}
              loading="lazy"
              draggable={false}
              className="h-full w-full object-cover"
            />
          </div>
        </motion.div>
      </button>
    </div>
  );
}


export function Page4Gallery({ onNext }: { onNext: () => void }) {
  const [chapter, setChapter] = useState(0);
  const total = galleryChapters.length;
  const current = galleryChapters[chapter]!;
  const isLast = chapter === total - 1;

  return (
    <div className="flex flex-1 flex-col items-center justify-center py-6 text-center">
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="font-[var(--font-body)] text-xs uppercase tracking-[0.35em] text-[var(--ruby)]/60"
      >
        {page4.title}
      </motion.p>

      <AnimatePresence mode="wait">
        <motion.div
          key={chapter}
          initial={{ opacity: 0, y: 26 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.45, ease: "easeInOut" }}
          className="flex w-full flex-col items-center"
        >
          <h2 className="mt-2 font-[var(--font-vibes)] text-4xl text-[var(--ruby)] sm:text-5xl">
            {current.title}
          </h2>
          <p className="mt-1 font-[var(--font-hand)] text-base text-[var(--maroon)]/70 sm:text-lg">
            {current.subtitle}
          </p>

          <div
            className={`mt-6 grid w-full justify-center gap-5 ${
              current.photos.length > 1 ? "sm:grid-cols-2" : "sm:grid-cols-1"
            }`}
          >
            {current.photos.map((p, i) => (
              <motion.figure
                key={p.key}
                initial={{ opacity: 0, scale: 0.94, rotate: i % 2 ? 1.6 : -1.6 }}
                animate={{ opacity: 1, scale: 1, rotate: i % 2 ? 1.2 : -1.2 }}
                transition={{ delay: 0.15 + i * 0.15, duration: 0.6, ease: "easeOut" }}
                whileHover={{ rotate: 0, scale: 1.02 }}
                className="mx-auto w-full max-w-sm rounded-[1.4rem] p-1.5 shadow-[0_18px_44px_-14px_oklch(0.56_0.22_354_/_0.55)]"
                style={{ background: "linear-gradient(135deg, var(--gold), var(--rose))" }}
              >
                <FlipPhoto src={SRC[p.key]} alt={p.caption} />
                <figcaption className="mt-1.5 rounded-[1rem] bg-white/85 px-3.5 py-3 text-left font-[var(--font-hand)] text-base leading-relaxed text-[var(--maroon)] shadow-inner sm:text-lg">
                  {p.caption}
                </figcaption>
              </motion.figure>
            ))}

          </div>
        </motion.div>
      </AnimatePresence>

      {/* chapter dots */}
      <div className="mt-6 flex items-center gap-2">
        {galleryChapters.map((c, i) => (
          <button
            key={c.title}
            type="button"
            aria-label={c.title}
            onClick={() => setChapter(i)}
            className="h-2 rounded-full transition-all"
            style={{
              width: i === chapter ? 24 : 8,
              background: i === chapter ? "var(--ruby)" : "oklch(0.85 0.06 354 / 0.5)",
            }}
          />
        ))}
      </div>

      <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
        {chapter > 0 && (
          <button
            type="button"
            onClick={() => setChapter((c) => c - 1)}
            className="rounded-full border border-[var(--border)] bg-white/70 px-5 py-2.5 font-[var(--font-body)] text-sm font-medium text-[var(--ruby)] shadow-sm backdrop-blur-sm transition hover:bg-white"
          >
            ← Peechhe
          </button>
        )}
        {isLast ? (
          <NextButton label="Next" onClick={onNext} delay={0.3} withHeart />
        ) : (
          <NextButton
            label="Agli yaad"
            onClick={() => setChapter((c) => c + 1)}
            delay={0.3}
            withHeart
          />
        )}
      </div>
    </div>
  );
}
