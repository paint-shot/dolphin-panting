"use client";

export type InteractionType =
  | "page_view"
  | "call_click"
  | "whatsapp_click"
  | "quote_submit"
  | "gallery_view";

export interface ActivityEvent {
  id: string;
  type: InteractionType;
  label: string;
  detail: string;
  timestamp: string; // ISO
}

export type LeadStatus = "New" | "Contacted" | "Quoted" | "Won";

export interface QuoteLead {
  id: string;
  name: string;
  phone: string;
  email: string;
  area: string;
  service: string;
  details: string;
  status: LeadStatus;
  createdAt: string;
}

export interface DailyMetric {
  day: string;
  visits: number;
  interactions: number;
}

export interface AnalyticsState {
  totals: {
    visits: number;
    callClicks: number;
    whatsappClicks: number;
    quoteEnquiries: number;
    galleryViews: number;
  };
  daily: DailyMetric[];
  events: ActivityEvent[];
}

export interface CustomPhoto {
  id: string;
  src: string; // compressed data URL
  alt: string;
  uploadedAt: string;
}

export interface CustomVideoMeta {
  id: string;
  title: string;
  category: string;
  description: string;
  url?: string; // external URL if provided
  hasBlob?: boolean; // stored in IndexedDB if uploaded file
  uploadedAt: string;
}

const KEYS = {
  ANALYTICS: "dolphin_admin_analytics_v1",
  LEADS: "dolphin_admin_leads_v1",
  PHOTOS: "dolphin_admin_custom_photos_v1",
  VIDEOS: "dolphin_admin_custom_videos_v1",
} as const;

const DB_NAME = "dolphin_painter_media_db";
const VIDEO_STORE = "videos";

function hoursAgo(h: number): string {
  return new Date(Date.now() - h * 3600 * 1000).toISOString();
}

const SEED_ANALYTICS: AnalyticsState = {
  totals: {
    visits: 1284,
    callClicks: 94,
    whatsappClicks: 138,
    quoteEnquiries: 31,
    galleryViews: 412,
  },
  daily: [
    { day: "Mon", visits: 148, interactions: 29 },
    { day: "Tue", visits: 176, interactions: 38 },
    { day: "Wed", visits: 162, interactions: 34 },
    { day: "Thu", visits: 204, interactions: 46 },
    { day: "Fri", visits: 229, interactions: 52 },
    { day: "Sat", visits: 198, interactions: 41 },
    { day: "Sun", visits: 167, interactions: 31 },
  ],
  events: [
    {
      id: "evt-1",
      type: "whatsapp_click",
      label: "WhatsApp Click",
      detail: "Primary Line (089 960 9741) · Floating Widget",
      timestamp: hoursAgo(1.2),
    },
    {
      id: "evt-2",
      type: "quote_submit",
      label: "New Quote Enquiry",
      detail: "Niamh O'Connor · Interior Painting · Clontarf, D3",
      timestamp: hoursAgo(3.5),
    },
    {
      id: "evt-3",
      type: "call_click",
      label: "Phone Call Click",
      detail: "089 960 9741 · Hero CTA",
      timestamp: hoursAgo(5.8),
    },
    {
      id: "evt-4",
      type: "gallery_view",
      label: "Gallery Inspection",
      detail: "Opened Real Work Gallery Lightbox",
      timestamp: hoursAgo(9.1),
    },
    {
      id: "evt-5",
      type: "whatsapp_click",
      label: "WhatsApp Click",
      detail: "Additional Line (085 220 0539) · Contact Card",
      timestamp: hoursAgo(14.4),
    },
  ],
};

const SEED_LEADS: QuoteLead[] = [
  {
    id: "lead-1",
    name: "Niamh O'Connor",
    phone: "087 412 8890",
    email: "niamh.oconnor@example.ie",
    area: "Clontarf, Dublin 3",
    service: "Interior Painting",
    details:
      "3-bed semi-detached — hallway, stairs, landing, and living room walls & woodwork. Hoping to book within 2 weeks.",
    status: "New",
    createdAt: hoursAgo(3.5),
  },
  {
    id: "lead-2",
    name: "Cormac Byrne",
    phone: "086 903 4421",
    email: "cormac.b@example.ie",
    area: "Rathmines, Dublin 6",
    service: "Exterior Painting",
    details:
      "Front facade masonry refresh plus 4 sash window frames and front door gloss finish.",
    status: "Quoted",
    createdAt: hoursAgo(22),
  },
  {
    id: "lead-3",
    name: "Sarah Gallagher",
    phone: "085 771 3104",
    email: "sarah.g@example.ie",
    area: "Blackrock, Co. Dublin",
    service: "Kitchen Spraying",
    details:
      "18 kitchen cabinet doors and island to be hand-sprayed in satin heritage navy.",
    status: "Contacted",
    createdAt: hoursAgo(46),
  },
  {
    id: "lead-4",
    name: "Mark Doyle",
    phone: "087 229 6510",
    email: "mdoyle@studio-d2.ie",
    area: "Dublin 2",
    service: "Commercial / Office",
    details:
      "120sqm office repaint over a weekend — crisp white walls and one navy meeting room feature wall.",
    status: "Won",
    createdAt: hoursAgo(92),
  },
];

function isBrowser(): boolean {
  return typeof window !== "undefined";
}

export function getAnalytics(): AnalyticsState {
  if (!isBrowser()) return SEED_ANALYTICS;
  try {
    const raw = localStorage.getItem(KEYS.ANALYTICS);
    if (!raw) {
      localStorage.setItem(KEYS.ANALYTICS, JSON.stringify(SEED_ANALYTICS));
      return SEED_ANALYTICS;
    }
    return JSON.parse(raw) as AnalyticsState;
  } catch {
    return SEED_ANALYTICS;
  }
}

export function trackEvent(type: InteractionType, detail: string): void {
  if (!isBrowser()) return;
  try {
    const state = getAnalytics();
    if (type === "page_view") state.totals.visits += 1;
    if (type === "call_click") state.totals.callClicks += 1;
    if (type === "whatsapp_click") state.totals.whatsappClicks += 1;
    if (type === "quote_submit") state.totals.quoteEnquiries += 1;
    if (type === "gallery_view") state.totals.galleryViews += 1;

    const todayIdx = state.daily.length - 1;
    if (todayIdx >= 0) {
      if (type === "page_view") {
        state.daily[todayIdx].visits += 1;
      } else {
        state.daily[todayIdx].interactions += 1;
      }
    }

    const labelMap: Record<InteractionType, string> = {
      page_view: "Website Visit",
      call_click: "Phone Call Click",
      whatsapp_click: "WhatsApp Click",
      quote_submit: "New Quote Enquiry",
      gallery_view: "Gallery Inspection",
    };

    if (type !== "page_view") {
      state.events = [
        {
          id: `evt-${Date.now()}-${Math.random().toString(36).slice(2, 6)}`,
          type,
          label: labelMap[type],
          detail,
          timestamp: new Date().toISOString(),
        },
        ...state.events,
      ].slice(0, 40);
    }

    localStorage.setItem(KEYS.ANALYTICS, JSON.stringify(state));
  } catch {
    // ignore quota errors
  }
}

export function getLeads(): QuoteLead[] {
  if (!isBrowser()) return SEED_LEADS;
  try {
    const raw = localStorage.getItem(KEYS.LEADS);
    if (!raw) {
      localStorage.setItem(KEYS.LEADS, JSON.stringify(SEED_LEADS));
      return SEED_LEADS;
    }
    return JSON.parse(raw) as QuoteLead[];
  } catch {
    return SEED_LEADS;
  }
}

export function addLead(
  lead: Omit<QuoteLead, "id" | "status" | "createdAt">
): QuoteLead {
  const newLead: QuoteLead = {
    ...lead,
    id: `lead-${Date.now()}`,
    status: "New",
    createdAt: new Date().toISOString(),
  };
  if (isBrowser()) {
    const current = getLeads();
    localStorage.setItem(KEYS.LEADS, JSON.stringify([newLead, ...current]));
    trackEvent(
      "quote_submit",
      `${lead.name} · ${lead.service} · ${lead.area || "Dublin"}`
    );
  }
  return newLead;
}

export function updateLeadStatus(id: string, status: LeadStatus): QuoteLead[] {
  const updated = getLeads().map((l) => (l.id === id ? { ...l, status } : l));
  if (isBrowser()) {
    localStorage.setItem(KEYS.LEADS, JSON.stringify(updated));
  }
  return updated;
}

export function deleteLead(id: string): QuoteLead[] {
  const updated = getLeads().filter((l) => l.id !== id);
  if (isBrowser()) {
    localStorage.setItem(KEYS.LEADS, JSON.stringify(updated));
  }
  return updated;
}

/* ---------- Custom Photos (compressed data URLs in localStorage) ---------- */

export function getCustomPhotos(): CustomPhoto[] {
  if (!isBrowser()) return [];
  try {
    const raw = localStorage.getItem(KEYS.PHOTOS);
    return raw ? (JSON.parse(raw) as CustomPhoto[]) : [];
  } catch {
    return [];
  }
}

export async function compressImageToDataUrl(
  file: File,
  maxDim = 1200,
  quality = 0.78
): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onerror = () => reject(new Error("Could not read file"));
    reader.onload = () => {
      const img = new Image();
      img.onerror = () => reject(new Error("Invalid image"));
      img.onload = () => {
        const scale = Math.min(1, maxDim / Math.max(img.width, img.height));
        const w = Math.max(1, Math.round(img.width * scale));
        const h = Math.max(1, Math.round(img.height * scale));
        const canvas = document.createElement("canvas");
        canvas.width = w;
        canvas.height = h;
        const ctx = canvas.getContext("2d");
        if (!ctx) {
          resolve(reader.result as string);
          return;
        }
        ctx.drawImage(img, 0, 0, w, h);
        resolve(canvas.toDataURL("image/jpeg", quality));
      };
      img.src = reader.result as string;
    };
    reader.readAsDataURL(file);
  });
}

export async function addCustomPhoto(
  file: File,
  caption?: string
): Promise<CustomPhoto[]> {
  const dataUrl = await compressImageToDataUrl(file);
  const photo: CustomPhoto = {
    id: `custom-photo-${Date.now()}-${Math.random().toString(36).slice(2, 6)}`,
    src: dataUrl,
    alt: caption?.trim() || file.name.replace(/\.[^.]+$/, "") || "Uploaded project photo",
    uploadedAt: new Date().toISOString(),
  };
  const updated = [photo, ...getCustomPhotos()];
  localStorage.setItem(KEYS.PHOTOS, JSON.stringify(updated));
  return updated;
}

export function removeCustomPhoto(id: string): CustomPhoto[] {
  const updated = getCustomPhotos().filter((p) => p.id !== id);
  if (isBrowser()) {
    localStorage.setItem(KEYS.PHOTOS, JSON.stringify(updated));
  }
  return updated;
}

/* ---------- Custom Videos (IndexedDB for blobs + localStorage metadata) ---------- */

function openVideoDb(): Promise<IDBDatabase> {
  return new Promise((resolve, reject) => {
    const req = indexedDB.open(DB_NAME, 1);
    req.onupgradeneeded = () => {
      const db = req.result;
      if (!db.objectStoreNames.contains(VIDEO_STORE)) {
        db.createObjectStore(VIDEO_STORE);
      }
    };
    req.onsuccess = () => resolve(req.result);
    req.onerror = () => reject(req.error);
  });
}

async function saveVideoBlob(id: string, blob: Blob): Promise<void> {
  const db = await openVideoDb();
  return new Promise((resolve, reject) => {
    const tx = db.transaction(VIDEO_STORE, "readwrite");
    tx.objectStore(VIDEO_STORE).put(blob, id);
    tx.oncomplete = () => resolve();
    tx.onerror = () => reject(tx.error);
  });
}

async function getVideoBlob(id: string): Promise<Blob | null> {
  const db = await openVideoDb();
  return new Promise((resolve, reject) => {
    const tx = db.transaction(VIDEO_STORE, "readonly");
    const req = tx.objectStore(VIDEO_STORE).get(id);
    req.onsuccess = () => resolve((req.result as Blob) ?? null);
    req.onerror = () => reject(req.error);
  });
}

async function deleteVideoBlob(id: string): Promise<void> {
  const db = await openVideoDb();
  return new Promise((resolve, reject) => {
    const tx = db.transaction(VIDEO_STORE, "readwrite");
    tx.objectStore(VIDEO_STORE).delete(id);
    tx.oncomplete = () => resolve();
    tx.onerror = () => reject(tx.error);
  });
}

export function getCustomVideoMetas(): CustomVideoMeta[] {
  if (!isBrowser()) return [];
  try {
    const raw = localStorage.getItem(KEYS.VIDEOS);
    return raw ? (JSON.parse(raw) as CustomVideoMeta[]) : [];
  } catch {
    return [];
  }
}

export async function resolveCustomVideos(): Promise<
  Array<CustomVideoMeta & { resolvedSrc: string }>
> {
  if (!isBrowser()) return [];
  const metas = getCustomVideoMetas();
  const out: Array<CustomVideoMeta & { resolvedSrc: string }> = [];
  for (const meta of metas) {
    if (meta.hasBlob) {
      try {
        const blob = await getVideoBlob(meta.id);
        if (blob) {
          out.push({ ...meta, resolvedSrc: URL.createObjectURL(blob) });
        }
      } catch {
        // skip broken blob
      }
    } else if (meta.url) {
      out.push({ ...meta, resolvedSrc: meta.url });
    }
  }
  return out;
}

export async function addCustomVideo(params: {
  title: string;
  category: string;
  description: string;
  file?: File;
  url?: string;
}): Promise<CustomVideoMeta[]> {
  const id = `custom-video-${Date.now()}`;
  const meta: CustomVideoMeta = {
    id,
    title: params.title.trim() || "New Project Reel",
    category: params.category.trim() || "Recent Work · On Site",
    description:
      params.description.trim() ||
      "Fresh on-site painting and decorating footage from Dolphin Painter Dublin.",
    uploadedAt: new Date().toISOString(),
  };

  if (params.file) {
    await saveVideoBlob(id, params.file);
    meta.hasBlob = true;
  } else if (params.url) {
    meta.url = params.url.trim();
  }

  const updated = [meta, ...getCustomVideoMetas()];
  localStorage.setItem(KEYS.VIDEOS, JSON.stringify(updated));
  return updated;
}

export async function removeCustomVideo(id: string): Promise<CustomVideoMeta[]> {
  const updated = getCustomVideoMetas().filter((v) => v.id !== id);
  if (isBrowser()) {
    localStorage.setItem(KEYS.VIDEOS, JSON.stringify(updated));
    try {
      await deleteVideoBlob(id);
    } catch {
      // ignore
    }
  }
  return updated;
}
