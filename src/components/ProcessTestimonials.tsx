import { MapPin, Quote, Star } from "lucide-react";
import { DUBLIN_AREAS, PROCESS_STEPS, TESTIMONIALS } from "@/lib/site-config";

export default function ProcessTestimonials() {
  return (
    <section
      id="process"
      className="bg-linen/60 bg-linen-grid py-24 sm:py-32"
    >
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        {/* Process Header */}
        <div className="max-w-2xl">
          <span className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.22em] text-ochre-dark">
            <span className="h-px w-8 bg-ochre" />
            How We Work
          </span>
          <h2 className="mt-4 font-serif text-3xl font-medium leading-[1.12] tracking-tight text-georgian sm:text-5xl">
            A calm, tidy,{" "}
            <span className="italic text-forest">four-step</span> standard.
          </h2>
        </div>

        {/* 4-Step Timeline */}
        <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {PROCESS_STEPS.map((item) => (
            <div
              key={item.step}
              className="relative rounded-3xl border border-stone-border bg-alabaster p-7 transition-all duration-300 hover:border-ochre/45 hover:shadow-lg"
            >
              <span className="font-serif text-4xl font-normal text-ochre/70">
                {item.step}
              </span>
              <h3 className="mt-4 font-serif text-xl font-medium text-georgian">
                {item.title}
              </h3>
              <p className="mt-2.5 text-sm leading-relaxed text-muted-ink">
                {item.description}
              </p>
            </div>
          ))}
        </div>

        {/* Testimonials Divider */}
        <div className="mt-24 border-t border-stone-border pt-20">
          <div className="flex flex-col justify-between gap-4 md:flex-row md:items-end">
            <div>
              <span className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.22em] text-ochre-dark">
                <span className="h-px w-8 bg-ochre" />
                Client Words
              </span>
              <h2 className="mt-3 font-serif text-3xl font-medium text-georgian sm:text-4xl">
                Trusted across Dublin neighbourhoods.
              </h2>
            </div>
            <div className="inline-flex items-center gap-2 rounded-full border border-stone-border bg-white px-4 py-2 text-xs font-semibold text-georgian">
              <div className="flex text-ochre">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} className="h-3.5 w-3.5 fill-current" />
                ))}
              </div>
              <span>5.0 Average Dublin Rating</span>
            </div>
          </div>

          <div className="mt-10 grid gap-6 md:grid-cols-3">
            {TESTIMONIALS.map((t) => (
              <blockquote
                key={t.author}
                className="flex flex-col justify-between rounded-3xl border border-stone-border bg-white p-7 shadow-sm"
              >
                <div>
                  <Quote className="h-7 w-7 text-ochre/45" />
                  <p className="mt-4 text-sm leading-relaxed text-ink/85 sm:text-[15px]">
                    &ldquo;{t.quote}&rdquo;
                  </p>
                </div>
                <footer className="mt-6 border-t border-stone-border/70 pt-4">
                  <p className="font-serif text-base font-semibold text-georgian">
                    {t.author}
                  </p>
                  <p className="mt-0.5 text-xs text-muted-ink">
                    {t.project} · {t.area}
                  </p>
                </footer>
              </blockquote>
            ))}
          </div>

          {/* Dublin Areas Coverage Strip */}
          <div className="mt-12 rounded-2xl border border-stone-border bg-alabaster/90 px-6 py-5">
            <div className="flex flex-wrap items-center gap-2.5 text-xs text-muted-ink">
              <span className="inline-flex items-center gap-1.5 font-semibold uppercase tracking-[0.16em] text-georgian">
                <MapPin className="h-3.5 w-3.5 text-ochre" />
                Areas Covered:
              </span>
              {DUBLIN_AREAS.map((area) => (
                <span
                  key={area}
                  className="rounded-full border border-stone-border bg-white px-3 py-1 text-xs text-ink/80"
                >
                  {area}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
