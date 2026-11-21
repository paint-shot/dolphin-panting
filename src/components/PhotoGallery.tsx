"use client";

import { useCallback, useEffect, useState } from "react";
import {
  Camera,
  ChevronLeft,
  ChevronRight,
  Expand,
  Images,
  X,
} from "lucide-react";
import type { LibraryPhoto } from "@/lib/library-media";
import { getCustomPhotos, trackEvent } from "@/lib/admin-store";

interface PhotoGalleryProps {
  photos: LibraryPhoto[];
}

const INITIAL_COUNT = 12;
const LOAD_STEP = 16;

export default function PhotoGallery({ photos }: PhotoGalleryProps) {
  const [customPhotos, setCustomPhotos] = useState<LibraryPhoto[]>([]);
  const [visibleCount, setVisibleCount] = useState(INITIAL_COUNT);
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  useEffect(() => {
    const stored = getCustomPhotos().map((p) => ({
      id: p.id,
      src: p.src,
      alt: p.alt,
    }));
    if (stored.length > 0) setCustomPhotos(stored);
  }, []);

  const allPhotos = [...customPhotos, ...photos];
  const visiblePhotos = allPhotos.slice(0, visibleCount);
  const hasMore = visibleCount < allPhotos.length;

  const goNext = useCallback(() => {
    setLightboxIndex((prev) =>
      prev === null ? null : (prev + 1) % allPhotos.length
    );
  }, [allPhotos.length]);

  const goPrev = useCallback(() => {
    setLightboxIndex((prev) =>
      prev === null ? null : (prev - 1 + allPhotos.length) % allPhotos.length
    );
  }, [allPhotos.length]);

  useEffect(() => {
    if (lightboxIndex === null) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setLightboxIndex(null);
      if (e.key === "ArrowRight") goNext();
      if (e.key === "ArrowLeft") goPrev();
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [lightboxIndex, goNext, goPrev]);

  if (allPhotos.length === 0) return null;

  const activePhoto =
    lightboxIndex !== null ? allPhotos[lightboxIndex] : null;

  return (
    <section
      id="photos"
      className="border-t border-stone-border bg-linen/70 py-24 sm:py-32"
    >
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        {/* Section Header */}
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div className="max-w-2xl">
            <span className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.22em] text-ochre-dark">
              <span className="h-px w-8 bg-ochre" />
              Real Work Gallery
            </span>
            <h2 className="mt-4 font-serif text-3xl font-medium leading-[1.12] tracking-tight text-georgian sm:text-5xl">
              Recent projects{" "}
              <span className="italic text-forest">in detail</span>.
            </h2>
            <p className="mt-4 text-base leading-relaxed text-muted-ink">
              Browse real photos from our painting and decorating jobs across
              Dublin. Click any photo to inspect it full screen.
            </p>
          </div>

          <div className="inline-flex items-center gap-2 self-start rounded-full border border-stone-border bg-white px-4 py-2 text-xs font-semibold text-georgian md:self-auto">
            <Camera className="h-4 w-4 text-ochre" />
            <span>{allPhotos.length} Project Photos</span>
          </div>
        </div>

        {/* Photo Grid */}
        <div className="mt-12 grid grid-cols-2 gap-3.5 sm:gap-5 md:grid-cols-3 lg:grid-cols-4">
          {visiblePhotos.map((photo, idx) => (
            <button
              key={photo.id}
              type="button"
              onClick={() => {
                setLightboxIndex(idx);
                trackEvent("gallery_view", `Inspected photo #${idx + 1}`);
              }}
              aria-label={`View project photo ${idx + 1} full screen`}
              className="group relative aspect-[4/3] w-full overflow-hidden rounded-2xl border border-stone-border bg-white text-left shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:border-ochre/50 hover:shadow-xl focus:outline-none focus-visible:ring-2 focus-visible:ring-ochre"
            >
              <img
                src={photo.src}
                alt={photo.alt}
                loading="lazy"
                decoding="async"
                className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-georgian/55 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
              <span className="pointer-events-none absolute bottom-3 right-3 flex h-8 w-8 items-center justify-center rounded-full border border-white/25 bg-georgian/75 text-white opacity-0 backdrop-blur-md transition-all duration-300 group-hover:opacity-100">
                <Expand className="h-3.5 w-3.5" />
              </span>
            </button>
          ))}
        </div>

        {/* Load More / Show All Controls */}
        <div className="mt-10 flex flex-wrap items-center justify-center gap-3">
          {hasMore && (
            <>
              <button
                type="button"
                onClick={() =>
                  setVisibleCount((c) =>
                    Math.min(allPhotos.length, c + LOAD_STEP)
                  )
                }
                className="inline-flex items-center gap-2 rounded-full bg-georgian px-7 py-3.5 text-sm font-semibold text-white shadow-sm transition-all hover:bg-forest"
              >
                <Images className="h-4 w-4 text-ochre" />
                <span>
                  Load More Photos ({allPhotos.length - visibleCount} remaining)
                </span>
              </button>
              <button
                type="button"
                onClick={() => setVisibleCount(allPhotos.length)}
                className="rounded-full border border-stone-border bg-white px-6 py-3.5 text-sm font-semibold text-georgian transition-colors hover:border-georgian/35 hover:bg-alabaster"
              >
                Show All {allPhotos.length}
              </button>
            </>
          )}
          {!hasMore && allPhotos.length > INITIAL_COUNT && (
            <button
              type="button"
              onClick={() => setVisibleCount(INITIAL_COUNT)}
              className="rounded-full border border-stone-border bg-white px-6 py-3 text-sm font-semibold text-georgian transition-colors hover:bg-alabaster"
            >
              Show Fewer Photos
            </button>
          )}
        </div>
      </div>

      {/* Lightbox Modal */}
      {activePhoto && lightboxIndex !== null && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={`Project photo ${lightboxIndex + 1} of ${allPhotos.length}`}
          className="fixed inset-0 z-50 flex items-center justify-center bg-georgian/95 p-4 backdrop-blur-md sm:p-8"
          onClick={() => setLightboxIndex(null)}
        >
          {/* Top Bar */}
          <div className="absolute inset-x-0 top-0 flex items-center justify-between px-5 py-4 sm:px-8">
            <span className="rounded-full border border-white/15 bg-white/10 px-3.5 py-1 text-xs font-semibold tracking-wider text-white backdrop-blur-md">
              {lightboxIndex + 1} / {allPhotos.length}
            </span>
            <button
              type="button"
              onClick={() => setLightboxIndex(null)}
              aria-label="Close lightbox"
              className="flex h-10 w-10 items-center justify-center rounded-full border border-white/20 bg-white/10 text-white backdrop-blur-md transition-colors hover:bg-white/20"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          {/* Prev Button */}
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              goPrev();
            }}
            aria-label="Previous photo"
            className="absolute left-3 top-1/2 z-10 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-white/20 bg-georgian/75 text-white backdrop-blur-md transition-all hover:scale-105 hover:bg-ochre sm:left-6"
          >
            <ChevronLeft className="h-5 w-5" />
          </button>

          {/* Image Frame */}
          <div
            className="relative flex max-h-[82vh] max-w-5xl items-center justify-center"
            onClick={(e) => e.stopPropagation()}
          >
            <img
              src={activePhoto.src}
              alt={activePhoto.alt}
              className="max-h-[82vh] max-w-full rounded-2xl border border-white/15 object-contain shadow-2xl"
            />
          </div>

          {/* Next Button */}
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              goNext();
            }}
            aria-label="Next photo"
            className="absolute right-3 top-1/2 z-10 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-white/20 bg-georgian/75 text-white backdrop-blur-md transition-all hover:scale-105 hover:bg-ochre sm:right-6"
          >
            <ChevronRight className="h-5 w-5" />
          </button>
        </div>
      )}
    </section>
  );
}
