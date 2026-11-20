import { Phone, Mail } from "lucide-react";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Services from "@/components/Services";
import GallerySection from "@/components/GallerySection";
import VideoShowcase from "@/components/VideoShowcase";
import ProcessTestimonials from "@/components/ProcessTestimonials";
import ContactFooter from "@/components/ContactFooter";
import WhatsAppWidget, { WhatsAppIcon } from "@/components/WhatsAppWidget";
import { SITE_CONFIG } from "@/lib/site-config";

export default function HomePage() {
  return (
    <div className="min-h-screen bg-alabaster text-ink">
      <Navbar />
      <main>
        <Hero />
        <Services />
        <GallerySection />
        <VideoShowcase />
        <ProcessTestimonials />
        <ContactFooter />
      </main>

      {/* Floating WhatsApp Quick-Chat Button (both numbers) */}
      <WhatsAppWidget />

      {/* Mobile Sticky Quick-Contact Bar */}
      <div className="fixed inset-x-0 bottom-0 z-40 flex items-center justify-between gap-2 border-t border-stone-border bg-alabaster/95 px-3 py-2.5 shadow-[0_-8px_24px_rgba(8,30,61,0.08)] backdrop-blur-md lg:hidden">
        <a
          href={SITE_CONFIG.contacts.primaryPhone.href}
          className="flex flex-1 items-center justify-center gap-1.5 rounded-full bg-georgian py-2.5 text-xs font-semibold text-white"
        >
          <Phone className="h-3.5 w-3.5 text-ochre" />
          <span>Call</span>
        </a>
        <a
          href={SITE_CONFIG.contacts.primaryPhone.whatsappHref}
          target="_blank"
          rel="noopener noreferrer"
          className="flex flex-1 items-center justify-center gap-1.5 rounded-full bg-[#25D366] py-2.5 text-xs font-semibold text-white"
        >
          <WhatsAppIcon className="h-3.5 w-3.5" />
          <span>WhatsApp</span>
        </a>
        <a
          href="#contact"
          className="flex flex-1 items-center justify-center gap-1.5 rounded-full bg-ochre py-2.5 text-xs font-semibold text-white"
        >
          <Mail className="h-3.5 w-3.5" />
          <span>Free Quote</span>
        </a>
      </div>
    </div>
  );
}
