import fs from "fs";
import path from "path";
import { SITE_CONFIG } from "./site-config";

export interface LibraryPhoto {
  id: string;
  src: string;
  alt: string;
}

export interface ShowcaseVideoItem {
  id: string;
  src: string;
  fallbackSrc?: string;
  title: string;
  category: string;
  description: string;
}

const IMAGE_EXTENSIONS = new Set([".jpg", ".jpeg", ".png", ".webp", ".avif"]);
const VIDEO_EXTENSIONS = new Set([".mp4", ".webm", ".mov"]);

const LIBRARY_VIDEO_META = [
  {
    title: "Dublin Interior Walkthrough",
    category: "Recent Work · On Site",
    description:
      "A closer look at a freshly painted Dublin residential interior — clean woodwork, crisp ceiling cut lines, and smooth wall finishes.",
  },
  {
    title: "Precision Finish & Detailing",
    category: "Recent Work · Craftsmanship",
    description:
      "Real on-site footage showcasing our surface preparation, spotless masking, and durable multi-coat painting standard.",
  },
];

export function getLibraryMedia(): {
  photos: LibraryPhoto[];
  videos: ShowcaseVideoItem[];
} {
  const libraryDir = path.join(process.cwd(), "public", "library");

  let files: string[] = [];
  try {
    files = fs
      .readdirSync(libraryDir)
      .sort((a, b) => a.localeCompare(b, undefined, { numeric: true }));
  } catch {
    files = [];
  }

  const photos: LibraryPhoto[] = [];
  const libraryVideos: ShowcaseVideoItem[] = [];

  for (const file of files) {
    const ext = path.extname(file).toLowerCase();
    const encodedSrc = `/library/${encodeURIComponent(file)}`;

    if (IMAGE_EXTENSIONS.has(ext)) {
      const index = photos.length + 1;
      photos.push({
        id: `photo-${index}`,
        src: encodedSrc,
        alt: `Dolphin Painter Dublin completed project photo ${index}`,
      });
    } else if (VIDEO_EXTENSIONS.has(ext)) {
      const idx = libraryVideos.length;
      const meta = LIBRARY_VIDEO_META[idx] ?? {
        title: `Dublin Project Reel ${idx + 1}`,
        category: "Recent Work · On Site",
        description:
          "Real on-site painting and decorating footage from our team across Dublin.",
      };
      libraryVideos.push({
        id: `lib-video-${idx + 1}`,
        src: encodedSrc,
        title: meta.title,
        category: meta.category,
        description: meta.description,
      });
    }
  }

  const videos: ShowcaseVideoItem[] = [
    ...libraryVideos,
    {
      id: "spray-showcase",
      src: SITE_CONFIG.video.localSrc,
      fallbackSrc: SITE_CONFIG.video.fallbackSrc,
      title: SITE_CONFIG.video.title,
      category: SITE_CONFIG.video.category,
      description: SITE_CONFIG.video.description,
    },
  ];

  return { photos, videos };
}
