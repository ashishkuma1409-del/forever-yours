import { motion } from "motion/react";
import { Volume2, VolumeX } from "lucide-react";

/** Persistent, subtle mute / unmmute control — bottom-right on every page. */
export function MusicControl({
  muted,
  onToggle,
}: {
  muted: boolean;
  onToggle: () => void;
}) {
  return (
    <motion.button
      type="button"
      onClick={onToggle}
      aria-label={muted ? "Unmute music" : "Mute music"}
      initial={{ opacity: 0, scale: 0.6 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5, ease: "easeInOut" }}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
      className="fixed bottom-5 right-5 z-50 flex h-11 w-11 items-center justify-center rounded-full border border-white/40 bg-white/30 text-[var(--ruby)] backdrop-blur-md shadow-lg"
      style={{ boxShadow: "0 6px 18px -6px oklch(0.56 0.22 354 / 0.5)" }}
    >
      {muted ? <VolumeX className="h-5 w-5" /> : <Volume2 className="h-5 w-5" />}
    </motion.button>
  );
}
