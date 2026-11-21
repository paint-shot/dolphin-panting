"use client";

import { useEffect, useRef, useState } from "react";
import {
  ArrowRight,
  ChevronLeft,
  ChevronRight,
  Film,
  Pause,
  Play,
  Volume2,
  VolumeX,
  Wind,
} from "lucide-react";
import { SITE_CONFIG } from "@/lib/site-config";
import type { ShowcaseVideoItem } from "@/lib/library-media";
import { resolveCustomVideos } from "@/lib/admin-store";

interface VideoShowcaseProps {
  videos: ShowcaseVideoItem[];
}

export default function VideoShowcase({ videos }: VideoShowcaseProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [customVideos, setCustomVideos] = useState<ShowcaseVideoItem[]>([]);
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(true);

  useEffect(() => {
    resolveCustomVideos().then((resolved) => {
      if (resolved.length > 0) {
        setCustomVideos(
          resolved.map((v) => ({
            id: v.id,
            src: v.resolvedSrc,
            title: v.title,
            category: v.category,
            description: v.description,
          }))
        );
      }
    });
  }, []);

  const allVideos = [...customVideos, ...videos];
  if (allVideos.length === 0) return null;

  const activeVideo = allVideos[activeIndex] ?? allVideos[0];

  const selectVideo = (index: number) => {
    setActiveIndex(index);
    setIsPlaying(false);
  };

  const goPrev = () => {
    selectVideo((activeIndex - 1 + allVideos.length) % allVideos.length);
  };

  const goNext = () => {
    selectVideo((activeIndex + 1) % allVideos.length);
  };

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
          <div className="flex flex-col items-center lg:col-span-5">
            <div className="relative w-full max-w-[340px] rounded-[2.2rem] border border-white/15 bg-black/50 p-3 shadow-[0_30px_90px_rgba(0,0,0,0.55)] backdrop-blur-md">
              <div className="relative aspect-[9/16] w-full overflow-hidden rounded-[1.65rem] bg-black">
                <video
                  key={activeVideo.src}
                  ref={videoRef}
                  playsInline
                  muted={isMuted}
                  loop
                  controls
                  preload="metadata"
                  onPlay={() => setIsPlaying(true)}
                  onPause={() => setIsPlaying(false)}
                  className="h-full w-full object-cover"
                >
                  <source src={activeVideo.src} type="video/mp4" />
                  {activeVideo.fallbackSrc && (
                    <source src={activeVideo.fallbackSrc} type="video/mp4" />
                  )}
                </video>

                {/* Floating Play Overlay when paused */}
                {!isPlaying && (
                  <button
                    type="button"
                    onClick={togglePlay}
                    aria-label={`Play ${activeVideo.title}`}
                    className="group absolute inset-0 flex flex-col items-center justify-center bg-georgian/35 transition-colors hover:bg-georgian/20"
                  >
                    <span className="flex h-16 w-16 items-center justify-center rounded-full border border-white/30 bg-ochre text-white shadow-2xl transition-transform duration-300 group-hover:scale-110">
                      <Play className="ml-1 h-7 w-7 fill-current" />
                    </span>
                    <span className="mt-3 rounded-full border border-white/20 bg-georgian/80 px-3.5 py-1 text-[11px] font-semibold uppercase tracking-[0.18em] text-alabaster backdrop-blur-md">
                      Play Reel {activeIndex + 1} of {allVideos.length}
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

              {/* Caption Footer + Carousel Controls */}
              <div className="mt-3 flex items-center justify-between gap-2 px-2 pb-1">
                <div className="min-w-0">
                  <p className="truncate text-xs font-semibold text-white">
                    {activeVideo.title}
                  </p>
                  <p className="truncate text-[11px] text-alabaster/60">
                    {activeVideo.category}
                  </p>
                </div>
                {allVideos.length > 1 && (
                  <div className="flex shrink-0 items-center gap-1.5">
                    <button
                      type="button"
                      onClick={goPrev}
                      aria-label="Previous video"
                      className="flex h-8 w-8 items-center justify-center rounded-full border border-white/15 bg-white/10 text-white transition-colors hover:bg-ochre"
                    >
                      <ChevronLeft className="h-4 w-4" />
                    </button>
                    <button
                      type="button"
                      onClick={goNext}
                      aria-label="Next video"
                      className="flex h-8 w-8 items-center justify-center rounded-full border border-white/15 bg-white/10 text-white transition-colors hover:bg-ochre"
                    >
                      <ChevronRight className="h-4 w-4" />
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Right: Editorial Narrative + Video Reel Selector */}
          <div className="lg:col-span-7">
            <span className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.22em] text-ochre">
              <span className="h-px w-8 bg-ochre" />
              Video Showcase · {allVideos.length} Reels
            </span>

            <h2 className="mt-4 font-serif text-3xl font-medium leading-[1.12] tracking-tight text-alabaster sm:text-5xl">
              Watch our craft{" "}
              <span className="italic text-ochre">in action</span>.
            </h2>

            <p className="mt-5 max-w-xl text-base leading-relaxed text-alabaster/75">
              {activeVideo.description}
            </p>

            {/* Clickable Playlist Cards */}
            <div className="mt-8 space-y-3.5">
              {allVideos.map((video, idx) => {
                const isSelected = idx === activeIndex;
                return (
                  <button
                    key={video.id}
                    type="button"
                    onClick={() => selectVideo(idx)}
                    className={`flex w-full items-start gap-4 rounded-2xl border p-4 text-left backdrop-blur-sm transition-all sm:p-5 ${
                      isSelected
                        ? "border-ochre bg-ochre/15 shadow-lg"
                        : "border-white/10 bg-white/[0.04] hover:border-white/25 hover:bg-white/[0.08]"
                    }`}
                  >
                    <span
                      className={`mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-xl transition-colors ${
                        isSelected
                          ? "bg-ochre text-white"
                          : "bg-ochre/20 text-ochre"
                      }`}
                    >
                      {isSelected ? (
                        <Play className="ml-0.5 h-4 w-4 fill-current" />
                      ) : (
                        <Film className="h-4 w-4" />
                      )}
                    </span>
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center justify-between gap-2">
                        <h3 className="truncate text-base font-semibold text-white">
                          {video.title}
                        </h3>
                        <span className="shrink-0 text-[10px] font-semibold uppercase tracking-wider text-ochre">
                          {isSelected ? "Now Selected" : `Reel 0${idx + 1}`}
                        </span>
                      </div>
                      <p className="mt-1 line-clamp-2 text-sm leading-relaxed text-alabaster/70">
                        {video.description}
                      </p>
                    </div>
                  </button>
                );
              })}
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
