"use client";

import { useState } from "react";
import { Clock, MapPin, Paintbrush2, X } from "lucide-react";
import BeforeAfterSlider from "./BeforeAfterSlider";
import {
  TRANSFORMATIONS,
  type ProjectCategory,
  type TransformationProject,
} from "@/lib/site-config";

const CATEGORIES: ProjectCategory[] = [
  "All",
  "Interior",
  "Exterior",
  "Spray Finish",
  "Commercial",
];

export default function GallerySection() {
  const [activeCategory, setActiveCategory] = useState<ProjectCategory>("All");
  const [modalProject, setModalProject] =
    useState<TransformationProject | null>(null);

  const filtered =
    activeCategory === "All"
      ? TRANSFORMATIONS
      : TRANSFORMATIONS.filter((item) => item.category === activeCategory);

  return (
    <section id="gallery" className="bg-alabaster py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        {/* Header + Filter Bar */}
        <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-2xl">
            <span className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.22em] text-ochre-dark">
              <span className="h-px w-8 bg-ochre" />
              Before &amp; After Portfolio
            </span>
            <h2 className="mt-4 font-serif text-3xl font-medium leading-[1.12] tracking-tight text-georgian sm:text-5xl">
              Transformations across{" "}
              <span className="italic text-forest">Dublin</span>.
            </h2>
            <p className="mt-4 text-base leading-relaxed text-muted-ink">
              Drag the divider on any project to compare the before and after
              finish. Click the expand icon for a closer look at our cut lines
              and surface preparation.
            </p>
          </div>

          {/* Filter Pills */}
          <div
            role="tablist"
            aria-label="Filter projects by category"
            className="flex flex-wrap gap-2"
          >
            {CATEGORIES.map((cat) => {
              const isActive = cat === activeCategory;
              return (
                <button
                  key={cat}
                  type="button"
                  role="tab"
                  aria-selected={isActive}
                  onClick={() => setActiveCategory(cat)}
                  className={`rounded-full px-4 py-2 text-xs font-semibold uppercase tracking-[0.14em] transition-all ${
                    isActive
                      ? "bg-georgian text-alabaster shadow-sm"
                      : "border border-stone-border bg-white text-muted-ink hover:border-georgian/30 hover:text-georgian"
                  }`}
                >
                  {cat}
                </button>
              );
            })}
          </div>
        </div>

        {/* Projects Grid */}
        <div className="mt-14 grid gap-8 lg:grid-cols-2">
          {filtered.map((project) => (
            <article
              key={project.id}
              className="group overflow-hidden rounded-3xl border border-stone-border bg-white shadow-[0_12px_36px_rgba(15,31,26,0.05)] transition-all duration-300 hover:border-ochre/40 hover:shadow-[0_24px_60px_rgba(15,31,26,0.09)]"
            >
              <BeforeAfterSlider
                beforeSrc={project.beforeImage}
                afterSrc={project.afterImage}
                alt={`${project.title} — ${project.location}`}
                onExpand={() => setModalProject(project)}
              />

              <div className="p-6 sm:p-7">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <span className="inline-flex items-center gap-1.5 rounded-full bg-linen px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.15em] text-forest">
                    {project.category}
                  </span>
                  <span className="inline-flex items-center gap-1.5 text-xs font-medium text-muted-ink">
                    <MapPin className="h-3.5 w-3.5 text-ochre" />
                    {project.location}
                  </span>
                </div>

                <h3 className="mt-4 font-serif text-2xl font-medium text-georgian">
                  {project.title}
                </h3>

                <p className="mt-2.5 text-sm leading-relaxed text-muted-ink">
                  {project.description}
                </p>

                <div className="mt-5 flex flex-wrap items-center gap-x-5 gap-y-2 border-t border-stone-border/70 pt-4 text-xs text-ink/75">
                  <span className="inline-flex items-center gap-1.5">
                    <Paintbrush2 className="h-3.5 w-3.5 text-ochre" />
                    {project.finish}
                  </span>
                  <span className="inline-flex items-center gap-1.5">
                    <Clock className="h-3.5 w-3.5 text-ochre" />
                    {project.duration}
                  </span>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>

      {/* Fullscreen Inspection Lightbox Modal */}
      {modalProject && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={`Fullscreen comparison: ${modalProject.title}`}
          className="fixed inset-0 z-50 flex items-center justify-center bg-georgian/90 p-4 backdrop-blur-md sm:p-8"
          onClick={() => setModalProject(null)}
        >
          <div
            className="relative w-full max-w-5xl overflow-hidden rounded-3xl border border-white/15 bg-alabaster shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between border-b border-stone-border px-6 py-4">
              <div>
                <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-ochre-dark">
                  {modalProject.category} · {modalProject.location}
                </p>
                <h3 className="font-serif text-xl font-medium text-georgian">
                  {modalProject.title}
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setModalProject(null)}
                aria-label="Close comparison"
                className="flex h-10 w-10 items-center justify-center rounded-full border border-stone-border bg-white text-georgian transition-colors hover:bg-linen"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <BeforeAfterSlider
              beforeSrc={modalProject.beforeImage}
              afterSrc={modalProject.afterImage}
              alt={modalProject.title}
              aspectClass="aspect-[16/10]"
            />

            <div className="flex flex-wrap items-center justify-between gap-4 bg-linen/70 px-6 py-4 text-xs text-muted-ink">
              <span>
                <strong className="text-georgian">Finish:</strong>{" "}
                {modalProject.finish}
              </span>
              <span>
                <strong className="text-georgian">Turnaround:</strong>{" "}
                {modalProject.duration}
              </span>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
