"use client";

import { useState } from "react";
import { X, ArrowUpRight } from "lucide-react";
import { SITE_CONFIG } from "@/lib/site-config";
import { trackEvent } from "@/lib/admin-store";

export function WhatsAppIcon({ className = "h-5 w-5" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      className={className}
      aria-hidden="true"
    >
      <path d="M20.52 3.48A11.86 11.86 0 0 0 12.06 0C5.49 0 .15 5.34.15 11.91c0 2.1.55 4.15 1.59 5.96L0 24l6.3-1.65a11.86 11.86 0 0 0 5.76 1.47h.01c6.57 0 11.91-5.34 11.91-11.91 0-3.18-1.24-6.17-3.46-8.43Zm-8.46 18.33h-.01a9.87 9.87 0 0 1-5.04-1.38l-.36-.21-3.74.98 1-3.65-.24-.37a9.84 9.84 0 0 1-1.51-5.27c0-5.45 4.44-9.89 9.9-9.89 2.64 0 5.12 1.03 6.99 2.9a9.83 9.83 0 0 1 2.9 6.99c0 5.46-4.44 9.9-9.89 9.9Zm5.43-7.41c-.3-.15-1.76-.87-2.03-.97-.27-.1-.47-.15-.67.15-.2.3-.77.97-.94 1.17-.17.2-.35.22-.64.07-.3-.15-1.25-.46-2.38-1.47-.88-.78-1.47-1.75-1.65-2.05-.17-.3-.02-.46.13-.61.13-.13.3-.35.45-.52.15-.17.2-.3.3-.5.1-.2.05-.37-.02-.52-.08-.15-.67-1.61-.92-2.21-.24-.58-.49-.5-.67-.51h-.57c-.2 0-.52.07-.79.37-.27.3-1.04 1.02-1.04 2.48s1.07 2.88 1.22 3.08c.15.2 2.1 3.21 5.09 4.5.71.31 1.27.49 1.7.63.72.23 1.37.2 1.88.12.57-.09 1.76-.72 2.01-1.41.25-.69.25-1.29.17-1.41-.07-.12-.27-.2-.57-.35Z" />
    </svg>
  );
}

export default function WhatsAppWidget() {
  const [open, setOpen] = useState(false);

  return (
    <div className="fixed bottom-20 right-4 z-50 lg:bottom-6 lg:right-6">
      {open && (
        <div className="mb-3 w-72 overflow-hidden rounded-2xl border border-stone-border bg-white shadow-2xl">
          <div className="flex items-center justify-between bg-[#075E54] px-4 py-3 text-white">
            <div className="flex items-center gap-2.5">
              <span className="flex h-8 w-8 items-center justify-center rounded-full bg-[#25D366] text-white">
                <WhatsAppIcon className="h-4 w-4" />
              </span>
              <div>
                <p className="text-sm font-semibold leading-tight">
                  WhatsApp {SITE_CONFIG.brandName}
                </p>
                <p className="text-[11px] text-white/80">
                  Typically replies quickly
                </p>
              </div>
            </div>
            <button
              type="button"
              onClick={() => setOpen(false)}
              aria-label="Close WhatsApp menu"
              className="rounded-full p-1 text-white/80 transition-colors hover:bg-white/15 hover:text-white"
            >
              <X className="h-4 w-4" />
            </button>
          </div>

          <div className="space-y-2 p-3.5">
            <p className="px-1 text-xs text-muted-ink">
              Choose a Dublin line to chat or send photos of your rooms:
            </p>

            <a
              href={SITE_CONFIG.contacts.primaryPhone.whatsappHref}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() =>
                trackEvent(
                  "whatsapp_click",
                  `Primary Line (${SITE_CONFIG.contacts.primaryPhone.display}) · Floating Widget`
                )
              }
              className="flex items-center justify-between rounded-xl border border-stone-border bg-alabaster px-3.5 py-2.5 transition-colors hover:border-[#25D366] hover:bg-[#25D366]/5"
            >
              <div className="flex items-center gap-3">
                <span className="flex h-8 w-8 items-center justify-center rounded-full bg-[#25D366]/15 text-[#128C7E]">
                  <WhatsAppIcon className="h-4 w-4" />
                </span>
                <div>
                  <p className="text-[10px] font-semibold uppercase tracking-wider text-muted-ink">
                    {SITE_CONFIG.contacts.primaryPhone.label}
                  </p>
                  <p className="text-sm font-semibold text-georgian">
                    {SITE_CONFIG.contacts.primaryPhone.display}
                  </p>
                </div>
              </div>
              <ArrowUpRight className="h-4 w-4 text-muted-ink" />
            </a>

            <a
              href={SITE_CONFIG.contacts.secondaryPhone.whatsappHref}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-between rounded-xl border border-stone-border bg-alabaster px-3.5 py-2.5 transition-colors hover:border-[#25D366] hover:bg-[#25D366]/5"
            >
              <div className="flex items-center gap-3">
                <span className="flex h-8 w-8 items-center justify-center rounded-full bg-[#25D366]/15 text-[#128C7E]">
                  <WhatsAppIcon className="h-4 w-4" />
                </span>
                <div>
                  <p className="text-[10px] font-semibold uppercase tracking-wider text-muted-ink">
                    {SITE_CONFIG.contacts.secondaryPhone.label}
                  </p>
                  <p className="text-sm font-semibold text-georgian">
                    {SITE_CONFIG.contacts.secondaryPhone.display}
                  </p>
                </div>
              </div>
              <ArrowUpRight className="h-4 w-4 text-muted-ink" />
            </a>
          </div>
        </div>
      )}

      <button
        type="button"
        onClick={() => setOpen((prev) => !prev)}
        aria-label="Chat on WhatsApp"
        className="group flex items-center gap-2.5 rounded-full bg-[#25D366] px-4 py-3 text-sm font-semibold text-white shadow-[0_10px_30px_rgba(37,211,102,0.4)] transition-all hover:scale-105 hover:bg-[#1ebe5d]"
      >
        <WhatsAppIcon className="h-5 w-5" />
        <span className="hidden sm:inline">WhatsApp Us</span>
      </button>
    </div>
  );
}
