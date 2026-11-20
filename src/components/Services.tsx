import { Building2, Check, Home, Paintbrush, Sparkles } from "lucide-react";
import { SERVICES, type ServiceItem } from "@/lib/site-config";

function ServiceIcon({ icon }: { icon: ServiceItem["icon"] }) {
  const cls = "h-5 w-5 text-ochre";
  switch (icon) {
    case "home":
      return <Home className={cls} />;
    case "paintbrush":
      return <Paintbrush className={cls} />;
    case "sparkles":
      return <Sparkles className={cls} />;
    case "building":
      return <Building2 className={cls} />;
  }
}

export default function Services() {
  return (
    <section
      id="services"
      className="relative border-b border-stone-border bg-linen/70 py-24 sm:py-32"
    >
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        {/* Section Header */}
        <div className="grid gap-8 lg:grid-cols-12 lg:items-end">
          <div className="lg:col-span-7">
            <span className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.22em] text-ochre-dark">
              <span className="h-px w-8 bg-ochre" />
              Our Craft &amp; Services
            </span>
            <h2 className="mt-4 font-serif text-3xl font-medium leading-[1.12] tracking-tight text-georgian sm:text-5xl">
              Tailored decorating for every{" "}
              <span className="italic text-forest">Dublin</span> space.
            </h2>
          </div>
          <p className="text-base leading-relaxed text-muted-ink lg:col-span-5">
            Whether restoring a period Georgian parlour, refreshing a red-brick
            exterior, or spray-finishing a kitchen, we combine traditional trade
            discipline with modern dust-free equipment.
          </p>
        </div>

        {/* 4-Card Editorial Grid */}
        <div className="mt-14 grid gap-6 md:grid-cols-2">
          {SERVICES.map((service) => (
            <article
              key={service.number}
              className="group relative flex flex-col justify-between rounded-3xl border border-stone-border bg-alabaster p-8 transition-all duration-300 hover:-translate-y-1 hover:border-ochre/45 hover:shadow-[0_20px_50px_rgba(15,31,26,0.08)] sm:p-9"
            >
              <div>
                <div className="flex items-start justify-between">
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-georgian/10 bg-georgian text-white shadow-sm transition-transform duration-300 group-hover:scale-105">
                    <ServiceIcon icon={service.icon} />
                  </div>
                  <span className="font-serif text-3xl font-normal text-stone-border transition-colors group-hover:text-ochre/60">
                    {service.number}
                  </span>
                </div>

                <h3 className="mt-6 font-serif text-2xl font-medium text-georgian">
                  {service.title}
                </h3>
                <p className="mt-1 text-xs font-semibold uppercase tracking-[0.16em] text-ochre-dark">
                  {service.subtitle}
                </p>

                <p className="mt-4 text-sm leading-relaxed text-muted-ink sm:text-[15px]">
                  {service.description}
                </p>
              </div>

              <ul className="mt-7 space-y-2.5 border-t border-stone-border/80 pt-6">
                {service.highlights.map((item) => (
                  <li
                    key={item}
                    className="flex items-center gap-2.5 text-sm text-ink/85"
                  >
                    <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-ochre/15 text-ochre-dark">
                      <Check className="h-3 w-3" />
                    </span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
