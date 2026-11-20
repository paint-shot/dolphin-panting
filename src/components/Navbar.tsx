"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { Menu, Phone, X, ArrowUpRight } from "lucide-react";
import { SITE_CONFIG } from "@/lib/site-config";

const NAV_LINKS = [
  { label: "Services", href: "#services" },
  { label: "Transformations", href: "#gallery" },
  { label: "In Action", href: "#videos" },
  { label: "Process", href: "#process" },
  { label: "Contact", href: "#contact" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 32);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-alabaster/98 backdrop-blur-md border-b border-stone-border shadow-[0_6px_30px_rgba(15,31,26,0.08)] py-3"
          : "bg-transparent py-5"
      }`}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between px-5 sm:px-8">
        {/* Brand */}
        <a
          href="#home"
          className="group flex items-center gap-3 focus:outline-none"
        >
          <span className="relative flex h-11 w-11 items-center justify-center overflow-hidden rounded-xl border border-white/25 bg-white p-1 shadow-sm transition-transform duration-300 group-hover:scale-105">
            <Image
              src="/images/dolphin-mark.png"
              alt={`${SITE_CONFIG.brandName} logo`}
              width={40}
              height={40}
              className="h-full w-full object-contain"
              priority
            />
          </span>
          <div className="flex flex-col leading-none">
            <span
              className={`font-serif text-lg font-semibold tracking-tight transition-colors ${
                scrolled ? "text-georgian" : "text-white"
              }`}
            >
              {SITE_CONFIG.brandName}
            </span>
            <span
              className={`mt-1 text-[10px] font-semibold uppercase tracking-[0.2em] transition-colors ${
                scrolled ? "text-ochre-dark" : "text-ochre"
              }`}
            >
              Dublin · Ireland
            </span>
          </div>
        </a>

        {/* Desktop Nav */}
        <nav aria-label="Primary" className="hidden items-center gap-8 lg:flex">
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className={`text-sm font-medium tracking-wide transition-colors ${
                scrolled
                  ? "text-ink/80 hover:text-georgian"
                  : "text-white/85 hover:text-white"
              }`}
            >
              {link.label}
            </a>
          ))}
        </nav>

        {/* Desktop Actions */}
        <div className="hidden items-center gap-3 lg:flex">
          <a
            href={SITE_CONFIG.contacts.primaryPhone.href}
            className={`inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-medium transition-all ${
              scrolled
                ? "text-georgian hover:bg-linen"
                : "text-white/90 hover:bg-white/10"
            }`}
          >
            <Phone className="h-3.5 w-3.5 text-ochre" />
            <span>{SITE_CONFIG.contacts.primaryPhone.display}</span>
          </a>
          <a
            href="#contact"
            className="inline-flex items-center gap-1.5 rounded-full bg-ochre px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition-all hover:bg-ochre-dark hover:shadow-md"
          >
            <span>Free Quote</span>
            <ArrowUpRight className="h-4 w-4" />
          </a>
        </div>

        {/* Mobile Menu Button */}
        <button
          type="button"
          onClick={() => setMobileOpen((prev) => !prev)}
          aria-label={mobileOpen ? "Close menu" : "Open menu"}
          className={`inline-flex h-10 w-10 items-center justify-center rounded-full border transition-colors lg:hidden ${
            scrolled
              ? "border-stone-border bg-white text-georgian"
              : "border-white/25 bg-white/10 text-white backdrop-blur-sm"
          }`}
        >
          {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      {/* Mobile Drawer */}
      {mobileOpen && (
        <div className="border-t border-stone-border bg-alabaster px-6 pb-7 pt-5 shadow-xl lg:hidden">
          <nav className="flex flex-col gap-3">
            {NAV_LINKS.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setMobileOpen(false)}
                className="rounded-xl px-3 py-2.5 text-base font-medium text-georgian transition-colors hover:bg-linen"
              >
                {link.label}
              </a>
            ))}
          </nav>

          <div className="mt-5 flex flex-col gap-2.5 border-t border-stone-border pt-5">
            <a
              href={SITE_CONFIG.contacts.primaryPhone.href}
              className="flex items-center justify-center gap-2 rounded-full border border-georgian/20 bg-white px-5 py-3 text-sm font-semibold text-georgian"
            >
              <Phone className="h-4 w-4 text-ochre" />
              Call {SITE_CONFIG.contacts.primaryPhone.display}
            </a>
            <a
              href={SITE_CONFIG.contacts.secondaryPhone.href}
              className="flex items-center justify-center gap-2 rounded-full border border-georgian/15 bg-linen/70 px-5 py-2.5 text-sm font-medium text-georgian"
            >
              <Phone className="h-4 w-4 text-ochre" />
              Alt: {SITE_CONFIG.contacts.secondaryPhone.display}
            </a>
            <a
              href="#contact"
              onClick={() => setMobileOpen(false)}
              className="flex items-center justify-center gap-2 rounded-full bg-ochre px-5 py-3 text-sm font-semibold text-white"
            >
              Get a Free Quote
              <ArrowUpRight className="h-4 w-4" />
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
