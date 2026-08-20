import { useCallback, useRef, useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { motion, AnimatePresence } from "motion/react";
import { FloatingPetals } from "@/components/proposal/FloatingPetals";
import { MusicControl } from "@/components/proposal/MusicControl";
import { Page1Heart } from "@/components/proposal/pages/Page1Heart";
import { Page2Cupid } from "@/components/proposal/pages/Page2Cupid";
import { Page3Memory } from "@/components/proposal/pages/Page3Memory";
import { Page4Gallery } from "@/components/proposal/pages/Page4Gallery";
import { Page5Reasons } from "@/components/proposal/pages/Page5Reasons";
import { Page6Question } from "@/components/proposal/pages/Page6Question";
import { Page7Celebration } from "@/components/proposal/pages/Page7Celebration";
import type { PageNumber } from "@/lib/proposal-data";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Yes, Vedika 💗 — A Love Story" },
      {
        name: "description",
        content:
          "Something handmade, from the depth of my heart — for Vedika.",
      },
      { property: "og:title", content: "Yes, Vedika 💗" },
      {
        property: "og:description",
        content: "Something handmade, from the depth of my heart — for Vedika.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Proposal,
});

function Proposal() {
  const [page, setPage] = useState<PageNumber>(1);
  const [audioStarted, setAudioStarted] = useState(false);
  const [muted, setMuted] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);

  const beginAudio = useCallback(() => {
    const a = audioRef.current;
    if (a && !audioStarted) {
      a.volume = 0.4;
      a.play().catch(() => {});
      setAudioStarted(true);
    }
  }, [audioStarted]);

  const toggleMute = useCallback(() => {
    const a = audioRef.current;
    if (a) a.muted = !a.muted;
    setMuted((m) => !m);
  }, []);

  const next = useCallback(
    () => setPage((p) => (p >= 7 ? p : ((p + 1) as PageNumber))),
    [],
  );

  // single persistent audio element — never restarts between pages
  // Aryan: drop your track at public/proposal-music.mp3 to enable music.
  return (
    <div className="romantic-bg relative min-h-screen w-full overflow-x-hidden">
      <FloatingPetals />

      <main className="relative z-10 mx-auto flex min-h-screen w-full max-w-md flex-col px-5">
        <AnimatePresence mode="wait">
          <motion.section
            key={page}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -24 }}
            transition={{ duration: 0.5, ease: [0.4, 0, 0.2, 1] }}
            className="flex min-h-screen flex-col"
          >
            {page === 1 && <Page1Heart onBegin={beginAudio} onNext={next} />}
            {page === 2 && <Page2Cupid onNext={next} />}
            {page === 3 && <Page3Memory onNext={next} />}
            {page === 4 && <Page4Gallery onNext={next} />}
            {page === 5 && <Page5Reasons onNext={next} />}
            {page === 6 && <Page6Question onYes={next} />}
            {page === 7 && <Page7Celebration />}
          </motion.section>
        </AnimatePresence>
      </main>

      {audioStarted && <MusicControl muted={muted} onToggle={toggleMute} />}

      <audio ref={audioRef} src="/proposal-music.mp3" loop preload="auto" />
    </div>
  );
}
