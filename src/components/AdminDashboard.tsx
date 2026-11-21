"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Activity,
  ArrowLeft,
  BarChart3,
  CheckCircle2,
  Eye,
  EyeOff,
  Film,
  Images,
  Inbox,
  Lock,
  LogOut,
  Phone,
  Plus,
  Trash2,
  UploadCloud,
  Users,
} from "lucide-react";
import { SITE_CONFIG } from "@/lib/site-config";
import type { LibraryPhoto, ShowcaseVideoItem } from "@/lib/library-media";
import {
  addCustomPhoto,
  addCustomVideo,
  deleteLead,
  getAnalytics,
  getCustomPhotos,
  getLeads,
  removeCustomPhoto,
  removeCustomVideo,
  resolveCustomVideos,
  updateLeadStatus,
  type AnalyticsState,
  type CustomPhoto,
  type CustomVideoMeta,
  type LeadStatus,
  type QuoteLead,
} from "@/lib/admin-store";
import { WhatsAppIcon } from "./WhatsAppWidget";

const ADMIN_PASSWORD =
  process.env.NEXT_PUBLIC_ADMIN_PASSWORD || "dolphin2026";
const SESSION_KEY = "dolphin_admin_auth_v1";

type TabKey = "overview" | "enquiries" | "gallery" | "videos";

interface AdminDashboardProps {
  libraryPhotos: LibraryPhoto[];
  libraryVideos: ShowcaseVideoItem[];
}

function timeAgo(iso: string): string {
  const diffMs = Date.now() - new Date(iso).getTime();
  const mins = Math.max(1, Math.floor(diffMs / 60000));
  if (mins < 60) return `${mins}m ago`;
  const hrs = Math.floor(mins / 60);
  if (hrs < 24) return `${hrs}h ago`;
  return `${Math.floor(hrs / 24)}d ago`;
}

export default function AdminDashboard({
  libraryPhotos,
  libraryVideos,
}: AdminDashboardProps) {
  const [authed, setAuthed] = useState(false);
  const [password, setPassword] = useState("");
  const [showPass, setShowPass] = useState(false);
  const [authError, setAuthError] = useState("");

  const [tab, setTab] = useState<TabKey>("overview");
  const [analytics, setAnalytics] = useState<AnalyticsState | null>(null);
  const [leads, setLeads] = useState<QuoteLead[]>([]);
  const [customPhotos, setCustomPhotos] = useState<CustomPhoto[]>([]);
  const [customVideos, setCustomVideos] = useState<
    Array<CustomVideoMeta & { resolvedSrc: string }>
  >([]);

  // Upload states
  const [photoCaption, setPhotoCaption] = useState("");
  const [uploadingPhoto, setUploadingPhoto] = useState(false);
  const [uploadNotice, setUploadNotice] = useState<string | null>(null);

  const [videoTitle, setVideoTitle] = useState("");
  const [videoCategory, setVideoCategory] = useState("Recent Work · On Site");
  const [videoDesc, setVideoDesc] = useState("");
  const [videoUrl, setVideoUrl] = useState("");
  const [videoFile, setVideoFile] = useState<File | null>(null);
  const [uploadingVideo, setUploadingVideo] = useState(false);

  const refreshAll = async () => {
    setAnalytics(getAnalytics());
    setLeads(getLeads());
    setCustomPhotos(getCustomPhotos());
    const resolved = await resolveCustomVideos();
    setCustomVideos(resolved);
  };

  useEffect(() => {
    if (typeof window !== "undefined") {
      if (sessionStorage.getItem(SESSION_KEY) === "true") {
        setAuthed(true);
      }
    }
  }, []);

  useEffect(() => {
    if (authed) {
      refreshAll();
    }
  }, [authed]);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (password.trim() === ADMIN_PASSWORD) {
      sessionStorage.setItem(SESSION_KEY, "true");
      setAuthed(true);
      setAuthError("");
      setPassword("");
    } else {
      setAuthError("Incorrect password. Please try again.");
    }
  };

  const handleLogout = () => {
    sessionStorage.removeItem(SESSION_KEY);
    setAuthed(false);
  };

  const handlePhotoUpload = async (files: FileList | null) => {
    if (!files || files.length === 0) return;
    setUploadingPhoto(true);
    setUploadNotice(null);
    try {
      let latest = customPhotos;
      for (const file of Array.from(files)) {
        if (!file.type.startsWith("image/")) continue;
        latest = await addCustomPhoto(file, photoCaption);
      }
      setCustomPhotos(latest);
      setPhotoCaption("");
      setUploadNotice(
        `Added ${files.length} photo${files.length > 1 ? "s" : ""} — now live in the Real Work Gallery!`
      );
    } catch {
      setUploadNotice(
        "Could not save photo (browser storage full — try a smaller image)."
      );
    } finally {
      setUploadingPhoto(false);
    }
  };

  const handleVideoSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!videoFile && !videoUrl.trim()) return;
    setUploadingVideo(true);
    setUploadNotice(null);
    try {
      await addCustomVideo({
        title: videoTitle || "New Dublin Project Reel",
        category: videoCategory,
        description: videoDesc,
        file: videoFile ?? undefined,
        url: videoUrl.trim() || undefined,
      });
      const resolved = await resolveCustomVideos();
      setCustomVideos(resolved);
      setVideoTitle("");
      setVideoDesc("");
      setVideoUrl("");
      setVideoFile(null);
      setUploadNotice("Video added — now live in the Video Showcase!");
    } catch {
      setUploadNotice("Could not save video. Please try a smaller MP4 or URL.");
    } finally {
      setUploadingVideo(false);
    }
  };

  /* -------------------- PASSWORD GATE -------------------- */
  if (!authed) {
    return (
      <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-georgian px-4 py-12 text-white">
        <div className="pointer-events-none absolute inset-0 bg-architectural-grid opacity-75" />
        <div className="pointer-events-none absolute -right-32 -top-32 h-96 w-96 rounded-full bg-ochre/15 blur-3xl" />

        <div className="relative z-10 w-full max-w-md rounded-3xl border border-white/15 bg-alabaster p-8 text-ink shadow-2xl sm:p-10">
          <div className="flex flex-col items-center text-center">
            <div className="rounded-2xl border border-stone-border bg-white p-3 shadow-sm">
              <Image
                src="/images/dolphin-mark.png"
                alt={SITE_CONFIG.brandName}
                width={52}
                height={52}
                className="h-12 w-12 object-contain"
              />
            </div>
            <span className="mt-4 inline-flex items-center gap-1.5 rounded-full bg-linen px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.18em] text-forest">
              <Lock className="h-3 w-3" />
              Admin Portal
            </span>
            <h1 className="mt-3 font-serif text-3xl font-medium text-georgian">
              {SITE_CONFIG.brandName}
            </h1>
            <p className="mt-1.5 text-sm text-muted-ink">
              Enter your admin password to monitor interactions and manage media.
            </p>
          </div>

          <form onSubmit={handleLogin} className="mt-7 space-y-4">
            <div>
              <label
                htmlFor="admin-password"
                className="block text-xs font-semibold uppercase tracking-[0.15em] text-muted-ink"
              >
                Admin Password
              </label>
              <div className="relative mt-2">
                <input
                  id="admin-password"
                  type={showPass ? "text" : "password"}
                  required
                  autoFocus
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter password..."
                  className="w-full rounded-xl border border-stone-border bg-white py-3 pl-4 pr-11 text-sm text-ink placeholder:text-muted-ink/50 focus:border-ochre focus:outline-none focus:ring-2 focus:ring-ochre/20"
                />
                <button
                  type="button"
                  onClick={() => setShowPass((p) => !p)}
                  aria-label={showPass ? "Hide password" : "Show password"}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-ink hover:text-georgian"
                >
                  {showPass ? (
                    <EyeOff className="h-4 w-4" />
                  ) : (
                    <Eye className="h-4 w-4" />
                  )}
                </button>
              </div>
              {authError && (
                <p className="mt-2 text-xs font-medium text-red-600">
                  {authError}
                </p>
              )}
            </div>

            <button
              type="submit"
              className="w-full rounded-full bg-georgian py-3.5 text-sm font-semibold text-white shadow-md transition-colors hover:bg-forest"
            >
              Sign In to Dashboard
            </button>
          </form>

          <div className="mt-6 flex items-center justify-between border-t border-stone-border pt-5 text-xs text-muted-ink">
            <Link
              href="/"
              className="inline-flex items-center gap-1.5 font-medium text-georgian hover:text-ochre-dark"
            >
              <ArrowLeft className="h-3.5 w-3.5" />
              Back to Website
            </Link>
            <span>Dublin · Admin</span>
          </div>
        </div>
      </div>
    );
  }

  /* -------------------- AUTHENTICATED DASHBOARD -------------------- */
  const maxVisits = analytics
    ? Math.max(...analytics.daily.map((d) => d.visits), 1)
    : 1;
  const newLeadCount = leads.filter((l) => l.status === "New").length;

  return (
    <div className="min-h-screen bg-alabaster text-ink">
      {/* Top Admin Bar */}
      <header className="sticky top-0 z-40 border-b border-stone-border bg-white/95 backdrop-blur-md">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-3.5 sm:px-8">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-stone-border bg-white p-1 shadow-xs">
              <Image
                src="/images/dolphin-mark.png"
                alt={SITE_CONFIG.brandName}
                width={36}
                height={36}
                className="h-full w-full object-contain"
              />
            </div>
            <div>
              <p className="font-serif text-lg font-semibold leading-none text-georgian">
                {SITE_CONFIG.brandName}
              </p>
              <p className="mt-1 text-[10px] font-semibold uppercase tracking-[0.2em] text-ochre-dark">
                Owner Dashboard
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2.5">
            <Link
              href="/"
              className="inline-flex items-center gap-1.5 rounded-full border border-stone-border bg-alabaster px-4 py-2 text-xs font-semibold text-georgian transition-colors hover:bg-linen"
            >
              <ArrowLeft className="h-3.5 w-3.5" />
              <span>View Live Site</span>
            </Link>
            <button
              type="button"
              onClick={handleLogout}
              className="inline-flex items-center gap-1.5 rounded-full bg-georgian px-4 py-2 text-xs font-semibold text-white transition-colors hover:bg-forest"
            >
              <LogOut className="h-3.5 w-3.5" />
              <span className="hidden sm:inline">Sign Out</span>
            </button>
          </div>
        </div>

        {/* Tab Strip */}
        <div className="mx-auto flex max-w-7xl gap-1 overflow-x-auto px-5 sm:px-8">
          {(
            [
              { id: "overview", label: "Overview & Traffic", icon: BarChart3 },
              {
                id: "enquiries",
                label: `Quote Enquiries (${leads.length})`,
                icon: Inbox,
                badge: newLeadCount,
              },
              {
                id: "gallery",
                label: `Photo Gallery (${libraryPhotos.length + customPhotos.length})`,
                icon: Images,
              },
              {
                id: "videos",
                label: `Video Reels (${libraryVideos.length + customVideos.length})`,
                icon: Film,
              },
            ] as const
          ).map((item) => {
            const Icon = item.icon;
            const active = tab === item.id;
            return (
              <button
                key={item.id}
                type="button"
                onClick={() => {
                  setTab(item.id);
                  setUploadNotice(null);
                }}
                className={`inline-flex shrink-0 items-center gap-2 border-b-2 px-4 py-3 text-xs font-semibold uppercase tracking-[0.12em] transition-colors ${
                  active
                    ? "border-ochre text-georgian"
                    : "border-transparent text-muted-ink hover:text-georgian"
                }`}
              >
                <Icon className="h-4 w-4 text-ochre-dark" />
                <span>{item.label}</span>
                {"badge" in item && item.badge > 0 && (
                  <span className="rounded-full bg-ochre px-2 py-0.5 text-[10px] font-bold text-white">
                    {item.badge}
                  </span>
                )}
              </button>
            );
          })}
        </div>
      </header>

      <main className="mx-auto max-w-7xl px-5 py-8 sm:px-8 sm:py-10">
        {uploadNotice && (
          <div className="mb-6 flex items-center justify-between rounded-2xl border border-ochre/30 bg-ochre/10 px-5 py-3.5 text-sm font-medium text-georgian">
            <span className="inline-flex items-center gap-2">
              <CheckCircle2 className="h-4 w-4 text-ochre-dark" />
              {uploadNotice}
            </span>
            <Link
              href={tab === "videos" ? "/#videos" : "/#photos"}
              className="text-xs font-semibold text-forest underline"
            >
              Preview on Site →
            </Link>
          </div>
        )}

        {/* ==================== TAB 1: OVERVIEW ==================== */}
        {tab === "overview" && analytics && (
          <div className="space-y-8">
            {/* KPI Cards */}
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              <div className="rounded-2xl border border-stone-border bg-white p-6 shadow-xs">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-semibold uppercase tracking-wider text-muted-ink">
                    Website Visits
                  </span>
                  <Users className="h-4 w-4 text-ochre" />
                </div>
                <p className="mt-3 font-serif text-3xl font-semibold text-georgian">
                  {analytics.totals.visits.toLocaleString()}
                </p>
                <p className="mt-1 text-xs text-forest">+18% vs last 7 days</p>
              </div>

              <div className="rounded-2xl border border-stone-border bg-white p-6 shadow-xs">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-semibold uppercase tracking-wider text-muted-ink">
                    WhatsApp Clicks
                  </span>
                  <WhatsAppIcon className="h-4 w-4 text-[#25D366]" />
                </div>
                <p className="mt-3 font-serif text-3xl font-semibold text-georgian">
                  {analytics.totals.whatsappClicks.toLocaleString()}
                </p>
                <p className="mt-1 text-xs text-muted-ink">
                  Primary: {SITE_CONFIG.contacts.primaryPhone.display}
                </p>
              </div>

              <div className="rounded-2xl border border-stone-border bg-white p-6 shadow-xs">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-semibold uppercase tracking-wider text-muted-ink">
                    Direct Call Clicks
                  </span>
                  <Phone className="h-4 w-4 text-ochre" />
                </div>
                <p className="mt-3 font-serif text-3xl font-semibold text-georgian">
                  {analytics.totals.callClicks.toLocaleString()}
                </p>
                <p className="mt-1 text-xs text-muted-ink">
                  Both Dublin phone lines
                </p>
              </div>

              <div className="rounded-2xl border border-stone-border bg-white p-6 shadow-xs">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-semibold uppercase tracking-wider text-muted-ink">
                    Quote Enquiries
                  </span>
                  <Inbox className="h-4 w-4 text-forest" />
                </div>
                <p className="mt-3 font-serif text-3xl font-semibold text-georgian">
                  {analytics.totals.quoteEnquiries.toLocaleString()}
                </p>
                <p className="mt-1 text-xs text-forest">
                  {newLeadCount} new awaiting reply
                </p>
              </div>
            </div>

            {/* Chart + Live Activity Feed */}
            <div className="grid gap-6 lg:grid-cols-12">
              <div className="rounded-3xl border border-stone-border bg-white p-6 shadow-xs lg:col-span-7 sm:p-7">
                <div className="flex items-center justify-between">
                  <div>
                    <h2 className="font-serif text-xl font-medium text-georgian">
                      7-Day Dublin Traffic &amp; Interactions
                    </h2>
                    <p className="mt-0.5 text-xs text-muted-ink">
                      Daily visits (navy) vs direct contact interactions (blue)
                    </p>
                  </div>
                </div>

                <div className="mt-8 grid h-56 grid-cols-7 items-end gap-3">
                  {analytics.daily.map((d) => {
                    const visitPct = Math.max(
                      12,
                      Math.round((d.visits / maxVisits) * 100)
                    );
                    const intPct = Math.max(
                      8,
                      Math.round((d.interactions / maxVisits) * 100)
                    );
                    return (
                      <div
                        key={d.day}
                        className="flex h-full flex-col items-center justify-end gap-2"
                      >
                        <div className="flex h-full w-full items-end justify-center gap-1.5">
                          <div
                            title={`${d.visits} visits`}
                            className="w-4 rounded-t-lg bg-georgian transition-all sm:w-5"
                            style={{ height: `${visitPct}%` }}
                          />
                          <div
                            title={`${d.interactions} interactions`}
                            className="w-4 rounded-t-lg bg-ochre transition-all sm:w-5"
                            style={{ height: `${intPct}%` }}
                          />
                        </div>
                        <span className="text-xs font-medium text-muted-ink">
                          {d.day}
                        </span>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Recent Interactions Feed */}
              <div className="rounded-3xl border border-stone-border bg-white p-6 shadow-xs lg:col-span-5 sm:p-7">
                <div className="flex items-center justify-between">
                  <h2 className="font-serif text-xl font-medium text-georgian">
                    Recent Interactions
                  </h2>
                  <Activity className="h-4 w-4 text-ochre" />
                </div>

                <div className="mt-5 space-y-3">
                  {analytics.events.slice(0, 6).map((evt) => (
                    <div
                      key={evt.id}
                      className="flex items-start justify-between gap-3 rounded-2xl border border-stone-border/70 bg-alabaster px-4 py-3"
                    >
                      <div className="min-w-0">
                        <p className="text-xs font-semibold text-georgian">
                          {evt.label}
                        </p>
                        <p className="mt-0.5 truncate text-xs text-muted-ink">
                          {evt.detail}
                        </p>
                      </div>
                      <span className="shrink-0 text-[11px] text-muted-ink">
                        {timeAgo(evt.timestamp)}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ==================== TAB 2: ENQUIRIES ==================== */}
        {tab === "enquiries" && (
          <div className="space-y-4">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div>
                <h2 className="font-serif text-2xl font-medium text-georgian">
                  Quote Enquiries Inbox
                </h2>
                <p className="text-sm text-muted-ink">
                  Leads submitted via the website quote form appear here
                  automatically.
                </p>
              </div>
            </div>

            <div className="space-y-4">
              {leads.map((lead) => (
                <div
                  key={lead.id}
                  className="rounded-2xl border border-stone-border bg-white p-6 shadow-xs"
                >
                  <div className="flex flex-wrap items-start justify-between gap-4">
                    <div>
                      <div className="flex flex-wrap items-center gap-2.5">
                        <h3 className="font-serif text-xl font-medium text-georgian">
                          {lead.name}
                        </h3>
                        <span className="rounded-full bg-linen px-3 py-0.5 text-[11px] font-semibold text-forest">
                          {lead.service}
                        </span>
                        <span className="text-xs text-muted-ink">
                          {lead.area} · {timeAgo(lead.createdAt)}
                        </span>
                      </div>
                      <p className="mt-2.5 max-w-3xl text-sm leading-relaxed text-ink/85">
                        {lead.details}
                      </p>
                      <div className="mt-3 flex flex-wrap items-center gap-4 text-xs text-muted-ink">
                        <a
                          href={`tel:${lead.phone.replace(/\s+/g, "")}`}
                          className="font-semibold text-georgian hover:text-ochre-dark"
                        >
                          {lead.phone}
                        </a>
                        {lead.email && <span>{lead.email}</span>}
                      </div>
                    </div>

                    <div className="flex flex-wrap items-center gap-2">
                      {(
                        ["New", "Contacted", "Quoted", "Won"] as LeadStatus[]
                      ).map((s) => (
                        <button
                          key={s}
                          type="button"
                          onClick={() => setLeads(updateLeadStatus(lead.id, s))}
                          className={`rounded-full px-3 py-1 text-xs font-semibold transition-colors ${
                            lead.status === s
                              ? "bg-georgian text-white"
                              : "border border-stone-border bg-alabaster text-muted-ink hover:text-georgian"
                          }`}
                        >
                          {s}
                        </button>
                      ))}
                      <button
                        type="button"
                        onClick={() => setLeads(deleteLead(lead.id))}
                        aria-label="Delete enquiry"
                        className="ml-1 flex h-8 w-8 items-center justify-center rounded-full border border-stone-border text-muted-ink hover:border-red-200 hover:bg-red-50 hover:text-red-600"
                      >
                        <Trash2 className="h-3.5 w-3.5" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ==================== TAB 3: PHOTO GALLERY MANAGER ==================== */}
        {tab === "gallery" && (
          <div className="space-y-8">
            {/* Upload Box */}
            <div className="rounded-3xl border border-stone-border bg-white p-6 shadow-xs sm:p-8">
              <h2 className="font-serif text-2xl font-medium text-georgian">
                Upload New Gallery Photos
              </h2>
              <p className="mt-1 text-sm text-muted-ink">
                Newly uploaded photos are optimized and added immediately to the
                top of your Real Work Gallery.
              </p>

              <div className="mt-5 grid gap-4 sm:grid-cols-12">
                <div className="sm:col-span-5">
                  <label className="block text-xs font-semibold uppercase tracking-wider text-muted-ink">
                    Optional Caption / Location
                  </label>
                  <input
                    type="text"
                    value={photoCaption}
                    onChange={(e) => setPhotoCaption(e.target.value)}
                    placeholder="e.g. Living Room Repaint · Rathmines"
                    className="mt-2 w-full rounded-xl border border-stone-border bg-alabaster px-4 py-3 text-sm focus:border-ochre focus:outline-none"
                  />
                </div>
                <div className="sm:col-span-7">
                  <label className="block text-xs font-semibold uppercase tracking-wider text-muted-ink">
                    Select Photos (JPG, PNG, WebP)
                  </label>
                  <label className="mt-2 flex cursor-pointer items-center justify-center gap-3 rounded-xl border-2 border-dashed border-ochre/45 bg-linen/50 px-5 py-3 text-sm font-semibold text-georgian transition-colors hover:border-ochre hover:bg-linen">
                    <UploadCloud className="h-5 w-5 text-ochre" />
                    <span>
                      {uploadingPhoto
                        ? "Optimizing & uploading..."
                        : "Choose Photo(s) to Upload"}
                    </span>
                    <input
                      type="file"
                      accept="image/*"
                      multiple
                      disabled={uploadingPhoto}
                      onChange={(e) => handlePhotoUpload(e.target.files)}
                      className="hidden"
                    />
                  </label>
                </div>
              </div>
            </div>

            {/* Custom Uploaded Photos */}
            {customPhotos.length > 0 && (
              <div>
                <h3 className="font-serif text-xl font-medium text-georgian">
                  Recently Uploaded ({customPhotos.length})
                </h3>
                <div className="mt-4 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
                  {customPhotos.map((p) => (
                    <div
                      key={p.id}
                      className="group relative overflow-hidden rounded-2xl border border-ochre/40 bg-white shadow-xs"
                    >
                      <div className="aspect-[4/3] w-full overflow-hidden">
                        <img
                          src={p.src}
                          alt={p.alt}
                          className="h-full w-full object-cover"
                        />
                      </div>
                      <div className="flex items-center justify-between gap-2 px-3 py-2.5">
                        <p className="truncate text-xs font-medium text-georgian">
                          {p.alt}
                        </p>
                        <button
                          type="button"
                          onClick={() =>
                            setCustomPhotos(removeCustomPhoto(p.id))
                          }
                          aria-label="Remove uploaded photo"
                          className="text-muted-ink hover:text-red-600"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Existing Library Photos Preview */}
            <div>
              <h3 className="font-serif text-xl font-medium text-georgian">
                Existing Library Photos ({libraryPhotos.length})
              </h3>
              <div className="mt-4 grid grid-cols-3 gap-3 sm:grid-cols-4 lg:grid-cols-6">
                {libraryPhotos.slice(0, 18).map((p) => (
                  <div
                    key={p.id}
                    className="aspect-[4/3] overflow-hidden rounded-xl border border-stone-border bg-white"
                  >
                    <img
                      src={p.src}
                      alt={p.alt}
                      loading="lazy"
                      className="h-full w-full object-cover"
                    />
                  </div>
                ))}
              </div>
              {libraryPhotos.length > 18 && (
                <p className="mt-3 text-xs text-muted-ink">
                  + {libraryPhotos.length - 18} more library photos published in
                  the live gallery.
                </p>
              )}
            </div>
          </div>
        )}

        {/* ==================== TAB 4: VIDEO MANAGER ==================== */}
        {tab === "videos" && (
          <div className="space-y-8">
            <form
              onSubmit={handleVideoSubmit}
              className="rounded-3xl border border-stone-border bg-white p-6 shadow-xs sm:p-8"
            >
              <h2 className="font-serif text-2xl font-medium text-georgian">
                Add New Showcase Video
              </h2>
              <p className="mt-1 text-sm text-muted-ink">
                Upload an MP4 reel directly or paste a hosted video URL — it
                will immediately join the Video Showcase on the homepage.
              </p>

              <div className="mt-6 grid gap-4 sm:grid-cols-2">
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-muted-ink">
                    Video Title *
                  </label>
                  <input
                    type="text"
                    required
                    value={videoTitle}
                    onChange={(e) => setVideoTitle(e.target.value)}
                    placeholder="e.g. Hallway Spray Finish · Ballsbridge"
                    className="mt-2 w-full rounded-xl border border-stone-border bg-alabaster px-4 py-3 text-sm focus:border-ochre focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-muted-ink">
                    Category Tag
                  </label>
                  <input
                    type="text"
                    value={videoCategory}
                    onChange={(e) => setVideoCategory(e.target.value)}
                    placeholder="Recent Work · On Site"
                    className="mt-2 w-full rounded-xl border border-stone-border bg-alabaster px-4 py-3 text-sm focus:border-ochre focus:outline-none"
                  />
                </div>
              </div>

              <div className="mt-4">
                <label className="block text-xs font-semibold uppercase tracking-wider text-muted-ink">
                  Short Description
                </label>
                <input
                  type="text"
                  value={videoDesc}
                  onChange={(e) => setVideoDesc(e.target.value)}
                  placeholder="Describe the project or painting technique..."
                  className="mt-2 w-full rounded-xl border border-stone-border bg-alabaster px-4 py-3 text-sm focus:border-ochre focus:outline-none"
                />
              </div>

              <div className="mt-4 grid gap-4 sm:grid-cols-2">
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-muted-ink">
                    Upload Video File (.mp4 / .webm)
                  </label>
                  <label className="mt-2 flex cursor-pointer items-center justify-center gap-2 rounded-xl border-2 border-dashed border-ochre/45 bg-linen/50 px-4 py-3 text-xs font-semibold text-georgian hover:border-ochre">
                    <UploadCloud className="h-4 w-4 text-ochre" />
                    <span className="truncate">
                      {videoFile ? videoFile.name : "Choose Video File"}
                    </span>
                    <input
                      type="file"
                      accept="video/*"
                      onChange={(e) =>
                        setVideoFile(e.target.files?.[0] ?? null)
                      }
                      className="hidden"
                    />
                  </label>
                </div>

                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-muted-ink">
                    Or Paste Direct Video URL (.mp4)
                  </label>
                  <input
                    type="url"
                    value={videoUrl}
                    onChange={(e) => setVideoUrl(e.target.value)}
                    placeholder="https://.../video.mp4"
                    className="mt-2 w-full rounded-xl border border-stone-border bg-alabaster px-4 py-3 text-sm focus:border-ochre focus:outline-none"
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={uploadingVideo || (!videoFile && !videoUrl.trim())}
                className="mt-6 inline-flex items-center gap-2 rounded-full bg-ochre px-6 py-3 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-ochre-dark disabled:opacity-50"
              >
                <Plus className="h-4 w-4" />
                <span>
                  {uploadingVideo ? "Adding Video..." : "Add to Video Showcase"}
                </span>
              </button>
            </form>

            {/* Uploaded + Existing Reels */}
            <div className="grid gap-5 md:grid-cols-3">
              {customVideos.map((v) => (
                <div
                  key={v.id}
                  className="overflow-hidden rounded-2xl border border-ochre/45 bg-white shadow-xs"
                >
                  <video
                    src={v.resolvedSrc}
                    controls
                    preload="metadata"
                    className="aspect-video w-full bg-black object-cover"
                  />
                  <div className="flex items-start justify-between gap-2 p-4">
                    <div className="min-w-0">
                      <span className="text-[10px] font-semibold uppercase tracking-wider text-ochre-dark">
                        Uploaded · {v.category}
                      </span>
                      <p className="mt-0.5 truncate text-sm font-semibold text-georgian">
                        {v.title}
                      </p>
                    </div>
                    <button
                      type="button"
                      onClick={async () => {
                        await removeCustomVideo(v.id);
                        setCustomVideos(await resolveCustomVideos());
                      }}
                      aria-label="Remove uploaded video"
                      className="text-muted-ink hover:text-red-600"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              ))}

              {libraryVideos.map((v) => (
                <div
                  key={v.id}
                  className="overflow-hidden rounded-2xl border border-stone-border bg-white shadow-xs"
                >
                  <video
                    src={v.src}
                    controls
                    preload="metadata"
                    className="aspect-video w-full bg-black object-cover"
                  />
                  <div className="p-4">
                    <span className="text-[10px] font-semibold uppercase tracking-wider text-muted-ink">
                      Published · {v.category}
                    </span>
                    <p className="mt-0.5 truncate text-sm font-semibold text-georgian">
                      {v.title}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
