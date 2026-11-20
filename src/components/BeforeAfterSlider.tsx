"use client";

import { useCallback, useRef, useState } from "react";
import Image from "next/image";
import { MoveHorizontal, Maximize2 } from "lucide-react";

interface BeforeAfterSliderProps {
  beforeSrc: string;
  afterSrc: string;
  alt: string;
  initialPosition?: number;
  aspectClass?: string;
  onExpand?: () => void;
}

export default function BeforeAfterSlider({
  beforeSrc,
  afterSrc,
  alt,
  initialPosition = 52,
  aspectClass = "aspect-[4/3]",
  onExpand,
}: BeforeAfterSliderProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState(initialPosition);
  const [dragging, setDragging] = useState(false);

  const updateFromClientX = useCallback((clientX: number) => {
    const el = containerRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const pct = ((clientX - rect.left) / rect.width) * 100;
    setPosition(Math.max(4, Math.min(96, pct)));
  }, []);

  const handlePointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    // Ignore clicks on the expand button
    if ((e.target as HTMLElement).closest("button[data-expand='true']")) return;
    e.currentTarget.setPointerCapture(e.pointerId);
    setDragging(true);
    updateFromClientX(e.clientX);
  };

  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!dragging) return;
    updateFromClientX(e.clientX);
  };

  const handlePointerUp = () => {
    setDragging(false);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.key === "ArrowLeft") {
      e.preventDefault();
      setPosition((p) => Math.max(4, p - 4));
    } else if (e.key === "ArrowRight") {
      e.preventDefault();
      setPosition((p) => Math.min(96, p + 4));
    }
  };

  return (
    <div
      ref={containerRef}
      role="slider"
      tabIndex={0}
      aria-label={`Before and after comparison for ${alt}`}
      aria-valuemin={0}
      aria-valuemax={100}
      aria-valuenow={Math.round(position)}
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={handlePointerUp}
      onPointerCancel={handlePointerUp}
      onKeyDown={handleKeyDown}
      className={`group relative w-full ${aspectClass} select-none overflow-hidden bg-georgian/10 cursor-ew-resize touch-none focus:outline-none focus-visible:ring-2 focus-visible:ring-ochre`}
    >
      {/* AFTER Image (Full Base Layer) */}
      <Image
        src={afterSrc}
        alt={`After: ${alt}`}
        fill
        sizes="(max-width: 768px) 100vw, 50vw"
        className="pointer-events-none object-cover"
        draggable={false}
      />

      {/* BEFORE Image (Clipped Overlay Layer) */}
      <div
        className="pointer-events-none absolute inset-0 overflow-hidden"
        style={{ clipPath: `inset(0 ${100 - position}% 0 0)` }}
      >
        <Image
          src={beforeSrc}
          alt={`Before: ${alt}`}
          fill
          sizes="(max-width: 768px) 100vw, 50vw"
          className="object-cover"
          draggable={false}
        />
      </div>

      {/* Labels */}
      <span
        className="pointer-events-none absolute left-3.5 top-3.5 z-10 rounded-full border border-white/20 bg-georgian/75 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.18em] text-alabaster backdrop-blur-md transition-opacity"
        style={{ opacity: position > 14 ? 1 : 0 }}
      >
        Before
      </span>
      <span
        className="pointer-events-none absolute right-3.5 top-3.5 z-10 rounded-full border border-white/25 bg-ochre/90 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.18em] text-white backdrop-blur-md transition-opacity"
        style={{ opacity: position < 86 ? 1 : 0 }}
      >
        After
      </span>

      {/* Optional Expand Button */}
      {onExpand && (
        <button
          type="button"
          data-expand="true"
          onClick={(e) => {
            e.stopPropagation();
            onExpand();
          }}
          aria-label={`Inspect ${alt} in fullscreen`}
          className="absolute bottom-3.5 right-3.5 z-20 flex h-9 w-9 items-center justify-center rounded-full border border-white/25 bg-georgian/70 text-white backdrop-blur-md transition-all hover:scale-105 hover:bg-georgian"
        >
          <Maximize2 className="h-4 w-4" />
        </button>
      )}

      {/* Vertical Divider Line & Handle */}
      <div
        className="pointer-events-none absolute inset-y-0 z-10 w-0.5 bg-white shadow-[0_0_16px_rgba(0,0,0,0.45)]"
        style={{ left: `${position}%` }}
      >
        <div
          className={`absolute left-1/2 top-1/2 flex h-11 w-11 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border-2 border-white bg-georgian text-ochre shadow-xl transition-transform duration-150 ${
            dragging ? "scale-110 bg-ochre text-white" : "group-hover:scale-105"
          }`}
        >
          <MoveHorizontal className="h-5 w-5" />
        </div>
      </div>
    </div>
  );
}
