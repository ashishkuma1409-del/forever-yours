import { useEffect, useRef, useState } from "react";
import { motion } from "motion/react";
import proposeBg from "@/assets/propose-bg.jpg.asset.json";
import { fireHeartBurst } from "../confetti";
import { page6 } from "@/lib/proposal-data";

export function Page6Question({ onYes }: { onYes: () => void }) {
  const [pos, setPos] = useState<{ top: number; left: number }>({ top: 62, left: 62 });
  const [dodges, setDodges] = useState(0);
  const [caption, setCaption] = useState<string | null>(null);
  const noRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const t = setTimeout(fireHeartBurst, 350);
    return () => clearTimeout(t);
  }, []);

  const dodge = () => {
    // keep within safe viewport bounds, away from the centered Yes button
    const top = 35 + Math.random() * 50;
    const left = 8 + Math.random() * 70;
    setPos({ top, left });
    const next = dodges + 1;
    setDodges(next);
    if (next >= 2) {
      setCaption(page6.dodgeCaptions[(next - 2) % page6.dodgeCaptions.length] ?? null);
    }
  };

  return (
    <div className="relative flex flex-1 flex-col items-center justify-center overflow-hidden text-center">
      {/* our proposal photo, heavily blurred (~95%) */}
      <img
        src={proposeBg.url}
        alt=""
        aria-hidden="true"
        className="absolute inset-0 -z-10 h-full w-full scale-125 object-cover"
        style={{ filter: "blur(34px) saturate(1.05)" }}
      />
      <div className="absolute inset-0 -z-10 bg-gradient-to-b from-[oklch(0.98_0.02_40_/_0.55)] via-[oklch(0.95_0.04_350_/_0.5)] to-[oklch(0.93_0.05_354_/_0.65)]" />

      <motion.p
        initial={{ opacity: 0, y: 18 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5, duration: 0.9, ease: "easeInOut" }}
        className="max-w-lg font-[var(--font-elegant)] text-[1.75rem] font-semibold italic leading-snug text-[var(--ruby)] drop-shadow-sm sm:text-4xl"
      >
        {page6.question}
      </motion.p>

      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 1.3, duration: 0.6, ease: "easeInOut" }}
        className="mt-10"
      >
        <motion.button
          type="button"
          onClick={onYes}
          whileHover={{ scale: 1.08 }}
          whileTap={{ scale: 0.94 }}
          className="glow-pulse inline-flex items-center gap-2 rounded-full px-12 py-4 font-[var(--font-body)] text-xl font-bold text-[var(--ivory)]"
          style={{ background: "linear-gradient(120deg, var(--ruby), var(--gold))" }}
        >
          {page6.yes}
        </motion.button>
      </motion.div>

      {/* the dodging "No" button — never actually clickable */}
      <motion.button
        ref={noRef}
        type="button"
        onPointerEnter={dodge}
        onPointerDown={(e) => {
          e.preventDefault();
          dodge();
        }}
        onClick={(e) => {
          e.preventDefault();
          dodge();
        }}
        animate={{ top: `${pos.top}%`, left: `${pos.left}%` }}
        transition={{ type: "spring", stiffness: 320, damping: 22 }}
        className="absolute rounded-full border border-[var(--border)] bg-white/70 px-5 py-2 font-[var(--font-body)] text-sm text-[var(--maroon)]/70 shadow-sm backdrop-blur-sm"
        style={{ top: `${pos.top}%`, left: `${pos.left}%` }}
      >
        {page6.no}
      </motion.button>

      {caption && (
        <motion.p
          key={caption}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-6 font-[var(--font-script)] text-xl text-[var(--ruby)]"
        >
          {caption}
        </motion.p>
      )}
    </div>
  );
}
