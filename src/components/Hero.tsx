import Image from "next/image";
import { ArrowRight, CheckCircle2, Phone, ShieldCheck, Star } from "lucide-react";
import { SITE_CONFIG } from "@/lib/site-config";

const HERITAGE_SWATCHES = [
  { name: "Navy", hex: "#0B2D5B" },
  { name: "Royal", hex: "#0F62B5" },
  { name: "Cerulean", hex: "#1996E6" },
  { name: "Porcelain", hex: "#EDF4FB" },
];

export default function Hero() {
  return (
    <section
      id="home"
      className="relative flex min-h-screen flex-col justify-between overflow-hidden bg-georgian text-white"
    >
      {/* Background Architectural Photo */}
      <div className="absolute inset-0">
        <Image
          src="/images/hero-dublin.jpg"
          alt="Freshly painted Georgian living room in Dublin by Dolphin Painter"
          fill
          priority
          className="object-cover object-center scale-[1.02]"
        />
        {/* Layered Editorial Scrim for crisp legibility */}
        <div className="absolute inset-0 bg-gradient-to-r from-georgian/92 via-georgian/72 to-georgian/35" />
        <div className="absolute inset-0 bg-gradient-to-t from-georgian via-transparent to-georgian/55" />
      </div>

      {/* Main Content */}
      <div className="relative z-10 mx-auto flex w-full max-w-7xl flex-1 items-center px-5 pb-16 pt-32 sm:px-8 lg:pt-36">
        <div className="grid w-full items-end gap-12 lg:grid-cols-12">
          {/* Left Copy Column */}
          <div className="lg:col-span-8">
            <div className="inline-flex items-center gap-2.5 rounded-full border border-white/15 bg-white/10 px-4 py-1.5 backdrop-blur-md">
              <div className="flex items-center gap-0.5 text-ochre">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} className="h-3.5 w-3.5 fill-current" />
                ))}
              </div>
              <span className="text-[11px] font-semibold uppercase tracking-[0.2em] text-alabaster/95">
                Trusted Master Painters Across Dublin
              </span>
            </div>

            <h1 className="mt-7 font-serif text-4xl font-medium leading-[1.06] tracking-tight text-alabaster sm:text-6xl lg:text-[4.35rem]">
              Elevating Dublin homes with{" "}
              <span className="italic text-ochre">timeless</span> paintwork.
            </h1>

            <p className="mt-6 max-w-2xl text-base leading-relaxed text-alabaster/80 sm:text-lg">
              From Georgian townhouses in Rathmines to bespoke kitchen spray
              finishes and city-centre offices, {SITE_CONFIG.brandName} delivers
              flawless interior and exterior decorating built on meticulous prep
              and lasting craft.
            </p>

            {/* Primary & Call CTAs */}
            <div className="mt-9 flex flex-wrap items-center gap-3.5">
              <a
                href="#contact"
                className="group inline-flex items-center gap-2.5 rounded-full bg-ochre px-7 py-3.5 text-sm font-semibold text-white shadow-lg shadow-black/20 transition-all hover:bg-ochre-dark hover:translate-y-[-1px]"
              >
                <span>Request a Free Quote</span>
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
              </a>

              <a
                href={SITE_CONFIG.contacts.primaryPhone.href}
                className="inline-flex items-center gap-2.5 rounded-full border border-white/25 bg-white/10 px-6 py-3.5 text-sm font-semibold text-white backdrop-blur-md transition-all hover:bg-white/20"
              >
                <Phone className="h-4 w-4 text-ochre" />
                <span>{SITE_CONFIG.contacts.primaryPhone.display}</span>
              </a>

              <a
                href="#gallery"
                className="inline-flex items-center gap-2 px-3 py-3 text-sm font-medium text-alabaster/85 underline decoration-ochre/60 underline-offset-8 transition-colors hover:text-white"
              >
                See Before &amp; Afters
              </a>
            </div>

            {/* Trust Row */}
            <div className="mt-9 flex flex-wrap items-center gap-x-6 gap-y-3 text-xs font-medium tracking-wide text-alabaster/80 sm:text-sm">
              <span className="inline-flex items-center gap-2">
                <ShieldCheck className="h-4 w-4 text-ochre" />
                Fully Insured &amp; Tax Compliant
              </span>
              <span className="inline-flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4 text-ochre" />
                Dust-Free Sanding System
              </span>
              <span className="inline-flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4 text-ochre" />
                Free 24hr Dublin Quotes
              </span>
            </div>
          </div>

          {/* Right Floating Architectural Card */}
          <div className="lg:col-span-4">
            <div className="rounded-3xl border border-white/15 bg-georgian/75 p-6 shadow-2xl backdrop-blur-xl">
              <div className="flex items-center justify-between border-b border-white/10 pb-4">
                <span className="text-[11px] font-semibold uppercase tracking-[0.2em] text-ochre">
                  Dublin Finish Palette
                </span>
                <span className="text-xs text-alabaster/65">
                  Trade &amp; Heritage
                </span>
              </div>

              {/* Paint Swatches */}
              <div className="mt-4 grid grid-cols-4 gap-2.5">
                {HERITAGE_SWATCHES.map((swatch) => (
                  <div key={swatch.name} className="group text-center">
                    <div
                      className="h-12 w-full rounded-xl border border-white/15 shadow-inner transition-transform group-hover:scale-105"
                      style={{ backgroundColor: swatch.hex }}
                    />
                    <span className="mt-1.5 block truncate text-[10px] text-alabaster/70">
                      {swatch.name}
                    </span>
                  </div>
                ))}
              </div>

              {/* Stats Grid */}
              <div className="mt-6 grid grid-cols-3 gap-3 border-t border-white/10 pt-5">
                <div>
                  <p className="font-serif text-2xl font-semibold text-white">
                    10+
                  </p>
                  <p className="mt-0.5 text-[11px] uppercase tracking-wider text-alabaster/60">
                    Years Exp.
                  </p>
                </div>
                <div>
                  <p className="font-serif text-2xl font-semibold text-white">
                    500+
                  </p>
                  <p className="mt-0.5 text-[11px] uppercase tracking-wider text-alabaster/60">
                    Projects
                  </p>
                </div>
                <div>
                  <p className="font-serif text-2xl font-semibold text-ochre">
                    5.0★
                  </p>
                  <p className="mt-0.5 text-[11px] uppercase tracking-wider text-alabaster/60">
                    Dublin Rated
                  </p>
                </div>
              </div>

              {/* Mini Quote */}
              <p className="mt-5 border-t border-white/10 pt-4 text-xs italic leading-relaxed text-alabaster/75">
                &ldquo;Immaculate prep, crisp hand-cut lines, and left the house
                cleaner than they found it.&rdquo;
                <span className="mt-1 block not-italic font-medium text-alabaster/95">
                  — Homeowner, Rathmines D6
                </span>
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Scroll Cue */}
      <div className="relative z-10 mx-auto flex w-full max-w-7xl items-center justify-between border-t border-white/10 px-5 py-4 text-xs text-alabaster/65 sm:px-8">
        <span>Serving All Dublin Postcodes · D1–D24 &amp; County Dublin</span>
        <a
          href="#services"
          className="hidden items-center gap-2 tracking-widest uppercase transition-colors hover:text-ochre sm:inline-flex"
        >
          <span>Explore Portfolio</span>
          <span className="inline-block h-1.5 w-1.5 rounded-full bg-ochre" />
        </a>
      </div>
    </section>
  );
}
