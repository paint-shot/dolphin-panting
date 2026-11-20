"use client";

import { useRef, useState } from "react";
import {
  ArrowRight,
  CheckCircle2,
  Pause,
  Play,
  Volume2,
  VolumeX,
  Wind,
} from "lucide-react";
import { SITE_CONFIG } from "@/lib/site-config";

const VIDEO_HIGHLIGHTS = [
  {
    title: "Air-Assisted Precision Spraying",
    text: "Delivers an atomized, glass-smooth coat across woodwork, ceilings, and walls with zero roller stipple.",
  },
  {
    title: "Complete Room Protection",
    text: "Floors, fixtures, and adjacent surfaces are sealed tightly before a single drop is sprayed.",
  },
  {
    title: "Faster Dublin Turnaround",
    text: "Achieves superior coverage in less time — ideal for occupied homes and tight commercial handovers.",
  },
];

export default function VideoShowcase() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(true);

  const togglePlay = () => {
    const vid = videoRef.current;
    if (!vid) return;
    if (vid.paused) {
      vid.play();
      setIsPlaying(true);
    } else {
      vid.pause();
      setIsPlaying(false);
    }
  };

  const toggleMute = () => {
    const vid = videoRef.current;
    if (!vid) return;
    vid.muted = !vid.muted;
    setIsMuted(vid.muted);
  };

  return (
    <section
      id="videos"
      className="relative overflow-hidden border-y border-stone-border bg-georgian py-24 text-alabaster sm:py-32"
    >
      <div className="pointer-events-none absolute inset-0 bg-architectural-grid opacity-70" />
      <div className="pointer-events-none absolute -right-40 top-1/4 h-96 w-96 rounded-full bg-ochre/10 blur-3xl" />

      <div className="relative z-10 mx-auto max-w-7xl px-5 sm:px-8">
        <div className="grid items-center gap-14 lg:grid-cols-12">
          {/* Left: Vertical Cinema Video Frame */}
          <div className="flex justify-center lg:col-span-5">
            <div className="relative w-full max-w-[340px] rounded-[2.2rem] border border-white/15 bg-black/50 p-3 shadow-[0_30px_90px_rgba(0,0,0,0.55)] backdrop-blur-md">
              <div className="relative aspect-[9/16] w-full overflow-hidden rounded-[1.65rem] bg-black">
                <video
                  ref={videoRef}
                  playsInline
                  muted={isMuted}
                  loop
                  controls
                  preload="metadata"
                  poster="/images/hero-dublin.jpg"
                  onPlay={() => setIsPlaying(true)}
                  onPause={() => setIsPlaying(false)}
                  className="h-full w-full object-cover"
                >
                  <source src={SITE_CONFIG.video.localSrc} type="video/mp4" />
                  <source
                    src={SITE_CONFIG.video.fallbackSrc}
                    type="video/mp4"
                  />
                </video>

                {/* Floating Play Overlay when paused */}
                {!isPlaying && (
                  <button
                    type="button"
                    onClick={togglePlay}
                    aria-label="Play project showcase video"
                    className="group absolute inset-0 flex flex-col items-center justify-center bg-georgian/40 transition-colors hover:bg-georgian/25"
                  >
                    <span className="flex h-16 w-16 items-center justify-center rounded-full border border-white/30 bg-ochre text-white shadow-2xl transition-transform duration-300 group-hover:scale-110">
                      <Play className="ml-1 h-7 w-7 fill-current" />
                    </span>
                    <span className="mt-3 rounded-full border border-white/20 bg-georgian/80 px-3.5 py-1 text-[11px] font-semibold uppercase tracking-[0.18em] text-alabaster backdrop-blur-md">
                      Watch Reel · 0:36
                    </span>
                  </button>
                )}

                {/* Top Floating Badge */}
                <div className="pointer-events-none absolute left-3.5 right-3.5 top-3.5 flex items-center justify-between">
                  <span className="inline-flex items-center gap-1.5 rounded-full border border-white/20 bg-georgian/75 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.16em] text-ochre backdrop-blur-md">
                    <Wind className="h-3 w-3" />
                    Live On Site
                  </span>
                </div>

                {/* Quick Control Pills when playing */}
                {isPlaying && (
                  <div className="absolute right-3.5 top-3.5 flex items-center gap-2">
                    <button
                      type="button"
                      onClick={toggleMute}
                      aria-label={isMuted ? "Unmute video" : "Mute video"}
                      className="flex h-8 w-8 items-center justify-center rounded-full border border-white/20 bg-georgian/75 text-white backdrop-blur-md hover:bg-georgian"
                    >
                      {isMuted ? (
                        <VolumeX className="h-3.5 w-3.5" />
                      ) : (
                        <Volume2 className="h-3.5 w-3.5" />
                      )}
                    </button>
                    <button
                      type="button"
                      onClick={togglePlay}
                      aria-label="Pause video"
                      className="flex h-8 w-8 items-center justify-center rounded-full border border-white/20 bg-georgian/75 text-white backdrop-blur-md hover:bg-georgian"
                    >
                      <Pause className="h-3.5 w-3.5" />
                    </button>
                  </div>
                )}
              </div>

              {/* Caption Footer */}
              <div className="mt-3 flex items-center justify-between px-2 pb-1">
                <div>
                  <p className="text-xs font-semibold text-white">
                    {SITE_CONFIG.video.title}
                  </p>
                  <p className="text-[11px] text-alabaster/60">
                    {SITE_CONFIG.video.category}
                  </p>
                </div>
                <span className="rounded-full bg-ochre/20 px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-ochre">
                  HD
                </span>
              </div>
            </div>
          </div>

          {/* Right: Editorial Narrative */}
          <div className="lg:col-span-7">
            <span className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.22em] text-ochre">
              <span className="h-px w-8 bg-ochre" />
              Video Showcase
            </span>

            <h2 className="mt-4 font-serif text-3xl font-medium leading-[1.12] tracking-tight text-alabaster sm:text-5xl">
              Watch our craft{" "}
              <span className="italic text-ochre">in action</span>.
            </h2>

            <p className="mt-5 max-w-xl text-base leading-relaxed text-alabaster/75">
              {SITE_CONFIG.video.description}
            </p>

            <div className="mt-9 space-y-5">
              {VIDEO_HIGHLIGHTS.map((item) => (
                <div
                  key={item.title}
                  className="flex items-start gap-4 rounded-2xl border border-white/10 bg-white/[0.04] p-5 backdrop-blur-sm"
                >
                  <span className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-xl bg-ochre/20 text-ochre">
                    <CheckCircle2 className="h-4 w-4" />
                  </span>
                  <div>
                    <h3 className="text-base font-semibold text-white">
                      {item.title}
                    </h3>
                    <p className="mt-1 text-sm leading-relaxed text-alabaster/70">
                      {item.text}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-9 flex flex-wrap items-center gap-4">
              <a
                href="#contact"
                className="group inline-flex items-center gap-2.5 rounded-full bg-ochre px-7 py-3.5 text-sm font-semibold text-white transition-all hover:bg-ochre-dark"
              >
                <span>Book a Free Site Assessment</span>
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
              </a>
              <a
                href={SITE_CONFIG.contacts.primaryPhone.href}
                className="text-sm font-medium text-alabaster/80 underline decoration-ochre/50 underline-offset-8 hover:text-white"
              >
                Or call {SITE_CONFIG.contacts.primaryPhone.display}
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
