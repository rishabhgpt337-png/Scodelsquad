"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "motion/react";
import { MagnifyingGlass, MapPin, CalendarBlank, Users, Sparkle, ArrowRight } from "@phosphor-icons/react";
import RaahiLogo from "@/components/common/RaahiLogo";
import LocationBadge from "@/components/location/LocationBadge";
import UserNav from "@/components/auth/UserNav";
import { POPULAR_DESTINATIONS } from "@/lib/destinations";

const TRENDING_CIRCUITS = [
  { name: "Varanasi Ghats", emoji: "🪔" },
  { name: "Jaipur Palaces", emoji: "🏰" },
  { name: "Leh Ladakh", emoji: "🏔️" },
  { name: "Kerala Backwaters", emoji: "🌴" },
  { name: "Hampi Ruins", emoji: "🏛️" },
  { name: "Amritsar Heritage", emoji: "🙏" },
];

export default function LandingHero() {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState("");
  const [showSuggestions, setShowSuggestions] = useState(false);

  const filteredDestinations = POPULAR_DESTINATIONS.filter((d) =>
    d.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <section className="relative w-full min-h-[90dvh] flex flex-col bg-slate-950">
      {/* Background with Ambient gradient */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-amber-900/20 via-slate-950 to-slate-950" />
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1524492412937-b28074a5d7da?auto=format&fit=crop&w=2400&q=90')] bg-cover bg-center opacity-10" />
      </div>

      {/* Navigation */}
      <nav className="relative z-30 flex items-center justify-between px-8 md:px-16 lg:px-20 h-24">
        <RaahiLogo size="md" />
        <div className="hidden md:flex items-center gap-10 text-[11px] font-semibold uppercase tracking-[0.2em] text-white/60">
          <a href="#destinations" className="hover:text-amber-400 transition-colors">Destinations</a>
          <a href="/trip-planner" className="hover:text-amber-400 transition-colors">AI Trip Planner</a>
          <a href="#about" className="hover:text-amber-400 transition-colors">Heritage</a>
        </div>
        <div className="flex items-center gap-4">
          <LocationBadge className="hidden sm:inline-flex" />
          <UserNav />
        </div>
      </nav>

      {/* Main Content */}
      <div className="relative z-20 flex-1 flex flex-col justify-center items-center px-8 text-center pb-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="max-w-4xl"
        >
          {/* Eyebrow */}
          <div className="inline-flex items-center gap-3 mb-6 bg-white/5 border border-white/10 px-4 py-1.5 rounded-full">
            <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse" />
            <span className="text-[10px] font-bold tracking-[0.3em] uppercase text-white/80">
              Ministry of Tourism • Authentic Digital Bharat Portal
            </span>
          </div>

          <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-[-0.03em] text-white mb-6 leading-[1.1]">
            Explore India's <span className="text-amber-400">Heritage</span>.<br />
            Plan With <span className="text-white/40 italic">Precision</span>.
          </h1>

          <p className="text-lg md:text-xl text-white/60 mb-12 max-w-2xl mx-auto leading-relaxed">
            AI-powered authentic itineraries, certified local artisans, and sacred heritage trails — curated without commercial middlemen.
          </p>

          {/* Search Planner Widget */}
          <div className="relative max-w-3xl mx-auto w-full">
            <div className="bg-slate-900/50 backdrop-blur-xl border border-white/10 p-2 rounded-2xl md:rounded-full shadow-2xl flex flex-col md:flex-row items-center gap-2">
              <div className="flex-1 w-full flex items-center px-4 gap-3">
                <MapPin className="text-amber-400" size={20} />
                <input
                  type="text"
                  placeholder="Where to? (e.g., Varanasi)"
                  className="bg-transparent border-none outline-none text-white placeholder-white/30 text-sm w-full py-4"
                  value={searchQuery}
                  onChange={(e) => {
                    setSearchQuery(e.target.value);
                    setShowSuggestions(true);
                  }}
                  onFocus={() => setShowSuggestions(true)}
                />
              </div>

              <button
                onClick={() => router.push("/trip-planner")}
                className="w-full md:w-auto bg-amber-400 hover:bg-amber-300 text-slate-950 font-bold px-8 py-4 rounded-xl md:rounded-full transition-all duration-200 flex items-center justify-center gap-2 shadow-lg"
              >
                Plan Journey
                <ArrowRight size={16} />
              </button>
            </div>

            {/* Suggestions Dropdown */}
            <AnimatePresence>
              {showSuggestions && searchQuery && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                  className="absolute w-full mt-2 bg-slate-900 border border-white/10 rounded-xl overflow-hidden z-50 shadow-2xl"
                >
                  {filteredDestinations.map((dest) => (
                    <button
                      key={dest.name}
                      onClick={() => {
                        setSearchQuery(dest.name);
                        setShowSuggestions(false);
                      }}
                      className="w-full px-6 py-3 text-left text-white/80 hover:bg-white/5 transition-colors flex items-center justify-between"
                    >
                      {dest.name}
                      <span className="text-[10px] text-white/30 uppercase">{dest.state}</span>
                    </button>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Trending Pills */}
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <span className="text-[10px] font-semibold uppercase tracking-[0.2em] text-white/30 pt-1">
              Trending Circuits:
            </span>
            {TRENDING_CIRCUITS.map((circuit) => (
              <button
                key={circuit.name}
                onClick={() => router.push(`/trip-planner?dest=${circuit.name}`)}
                className="bg-white/5 hover:bg-white/10 text-white/70 text-[11px] px-4 py-1.5 rounded-full border border-white/5 transition-all"
              >
                {circuit.emoji} {circuit.name}
              </button>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Footer Stats Bar */}
      <div className="relative z-10 w-full border-t border-white/5 py-8 px-8 md:px-20 grid grid-cols-2 md:grid-cols-4 gap-8">
        {[
          { label: "Verified Heritage Sites", val: "500+" },
          { label: "Artisans & Weavers", val: "1.2k+" },
          { label: "Community Impact", val: "100%" },
          { label: "GPS Guided Trails", val: "Real-Time" },
        ].map((stat) => (
          <div key={stat.label} className="text-center md:text-left">
            <div className="text-2xl font-bold text-white mb-1">{stat.val}</div>
            <div className="text-[10px] uppercase tracking-widest text-white/40">{stat.label}</div>
          </div>
        ))}
      </div>
    </section>
  );
}
