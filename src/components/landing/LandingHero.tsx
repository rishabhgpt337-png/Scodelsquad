"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "motion/react";
import AuthModal from "@/components/auth/AuthModal";
import RaahiLogo from "@/components/common/RaahiLogo";
import LocationBadge from "@/components/location/LocationBadge";

const HERO_DESTINATIONS = [
  {
    name: "Varanasi",
    state: "Uttar Pradesh",
    tagline: "Where spirituality meets the sacred Ganges",
    description:
      "Experience one of the oldest living cities on Earth. Discover ancient ghats, sacred boat rides at dawn, and hidden artisan workshops — curated with precision for an unforgettable journey.",
    image:
      "https://images.unsplash.com/photo-1524492412937-b28074a5d7da?auto=format&fit=crop&w=2400&q=90",
  },
];

export default function LandingHero() {
  const [showAuthModal, setShowAuthModal] = useState(false);
  const router = useRouter();
  const dest = HERO_DESTINATIONS[0];

  return (
    <section className="relative w-full min-h-[100dvh] overflow-hidden bg-[#0a1628]">
      {/* Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: `url("${dest.image}")`,
        }}
      />
      {/* Dark overlay for readability */}
      <div className="absolute inset-0 bg-gradient-to-r from-[#0a1628]/90 via-[#0a1628]/70 to-[#0a1628]/40" />
      <div className="absolute inset-0 bg-gradient-to-t from-[#0a1628] via-transparent to-[#0a1628]/30" />

      {/* Navigation */}
      <nav className="relative z-20 flex items-center justify-between px-8 md:px-16 lg:px-20 h-20 md:h-24">
        <RaahiLogo size="md" />
        <div className="hidden md:flex items-center gap-12 text-[11px] font-semibold uppercase tracking-[0.2em] text-white/70">
          <a href="#destinations" className="hover:text-white transition-colors duration-200">
            Destinations
          </a>
          <a href="#features" className="hover:text-white transition-colors duration-200">
            Features
          </a>
          <a href="#about" className="hover:text-white transition-colors duration-200">
            About
          </a>
        </div>
        <div className="flex items-center gap-4">
          <LocationBadge className="hidden sm:inline-flex" />
          <button
            onClick={() => setShowAuthModal(true)}
            className="hidden md:block text-[11px] font-semibold uppercase tracking-[0.15em] text-white/80 hover:text-white transition-colors"
          >
            Log In
          </button>
          <button
            onClick={() => setShowAuthModal(true)}
            className="border border-white/25 hover:bg-white hover:text-slate-900 text-white text-[11px] font-semibold uppercase tracking-[0.15em] px-5 py-2.5 rounded-full transition-all duration-200"
          >
            Sign Up
          </button>
        </div>
      </nav>

      {/* Main Content */}
      <div className="relative z-10 flex flex-col justify-center px-8 md:px-16 lg:px-20 pt-16 md:pt-24 pb-32 min-h-[calc(100dvh-6rem)]">
        <motion.div
          className="max-w-[620px]"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
        >
          {/* Eyebrow */}
          <div className="flex items-center gap-3 mb-6">
            <span className="w-8 h-[1.5px] bg-amber-400/60" />
            <span className="text-[10px] font-bold tracking-[0.35em] uppercase text-amber-400/90">
              Smart India Hackathon 2024–25
            </span>
          </div>

          {/* Heading */}
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold leading-[0.92] tracking-[-0.025em] text-white mb-6">
            {dest.name}
          </h1>

          {/* Subheading */}
          <p className="text-base md:text-lg leading-relaxed text-white/65 max-w-[520px] mb-10 font-normal">
            {dest.description}
          </p>

          {/* CTA */}
          <div className="flex items-center gap-5">
            <button
              onClick={() => router.push("/trip-planner")}
              className="inline-flex items-center gap-3 bg-white text-slate-900 font-semibold text-sm px-8 py-4 rounded-full hover:bg-amber-400 transition-colors duration-200"
            >
              Explore Routes
              <span className="text-base">→</span>
            </button>
            <button
              onClick={() => {
                const el = document.getElementById("features");
                el?.scrollIntoView({ behavior: "smooth" });
              }}
              className="text-[11px] font-semibold uppercase tracking-[0.15em] text-white/70 hover:text-white transition-colors"
            >
              Learn More
            </button>
          </div>
        </motion.div>

        {/* Bottom indicator */}
        <div className="absolute bottom-8 left-8 md:left-16 lg:left-20 right-8 md:right-16 lg:right-20 flex items-end justify-between z-20">
          <div className="text-[10px] font-semibold uppercase tracking-[0.2em] text-white/40">
            {dest.state}
          </div>
          <div className="flex flex-col items-center gap-2">
            <span className="text-[9px] uppercase tracking-widest text-white/30 font-medium">
              Scroll
            </span>
            <motion.div
              className="w-[1px] h-6 bg-white/30"
              animate={{ scaleY: [1, 0.4, 1] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
              style={{ transformOrigin: "top" }}
            />
          </div>
          <div className="text-[10px] font-semibold uppercase tracking-[0.2em] text-white/40">
            01 / 06
          </div>
        </div>
      </div>

      {/* Auth Modal */}
      <AuthModal isOpen={showAuthModal} onClose={() => setShowAuthModal(false)} />
    </section>
  );
}
