"use client";

import { useEffect, useRef, useState } from "react";
import { animate, stagger } from "animejs";
import {
  Compass,
  Sparkle,
  UsersThree,
  ShieldCheck,
  QrCode,
  HeartStraight,
  CheckCircle,
  ShieldCheck as ShieldCheckIcon,
  PhoneCall,
  LockKey
} from "@phosphor-icons/react";
import FeatureCard from "./FeatureCard";

const FEATURES = [
  {
    icon: Compass,
    title: "Dynamic Smart Radar",
    tagline: "Hyper-local Proactive Pings",
    description:
      "Detects your walking route and suggests hidden chai stalls, sunset angles, or artisan clusters before you even search.",
    accent: "text-amber-400",
    accentBg: "bg-amber-400/10",
    accentBorder: "border-amber-400/20",
  },
  {
    icon: Sparkle,
    title: "Dignified Itineraries",
    tagline: "True Cultural Immersion",
    description:
      "Multi-day timelines respecting your pace, morning rituals, dietary restrictions, and curiosity — no cookie-cutter tours.",
    accent: "text-blue-400",
    accentBg: "bg-blue-400/10",
    accentBorder: "border-blue-400/20",
  },
  {
    icon: UsersThree,
    title: "Direct Artisan Economy",
    tagline: "Zero Middleman Markups",
    description:
      "Connect directly with generational weavers, potters, and street chefs. 100% of fair-trade bookings go to local creators.",
    accent: "text-emerald-400",
    accentBg: "bg-emerald-400/10",
    accentBorder: "border-emerald-400/20",
  },
  {
    icon: QrCode,
    title: "Unified Digital Travel Pass",
    tagline: "One QR for Monuments & Stays",
    description:
      "Skip ticket queues at ASI monuments, local ferries, and verified homestays with an encrypted offline-ready pass.",
    accent: "text-violet-400",
    accentBg: "bg-violet-400/10",
    accentBorder: "border-violet-400/20",
  },
  {
    icon: ShieldCheck,
    title: "SOS & Verified Safe Zones",
    tagline: "24×7 Tourist Police Link",
    description:
      "One-tap emergency signal connected to local tourist police cells, authorized guides, and verified medical clinics.",
    accent: "text-rose-400",
    accentBg: "bg-rose-400/10",
    accentBorder: "border-rose-400/20",
  },
  {
    icon: HeartStraight,
    title: "Crowd Flow Intelligence",
    tagline: "Avoid Peak Congestion",
    description:
      "Live sensor and heat-map feeds guide you to quiet morning slots and peaceful darshans before tour buses arrive.",
    accent: "text-cyan-400",
    accentBg: "bg-cyan-400/10",
    accentBorder: "border-cyan-400/20",
  },
];

export default function FeaturesSection() {
  const headerRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);
  const passRef = useRef<HTMLDivElement>(null);
  const [sosActive, setSosActive] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            if (entry.target === headerRef.current && headerRef.current) {
              animate(headerRef.current.children, {
                translateY: [20, 0],
                opacity: [0, 1],
                duration: 800,
                ease: "outQuint",
                delay: stagger(100),
              });
              observer.unobserve(entry.target);
            } else if (entry.target === gridRef.current && gridRef.current) {
              const cards = gridRef.current.querySelectorAll(".feature-card");
              if (cards.length > 0) {
                animate(cards, {
                  translateY: [30, 0],
                  opacity: [0, 1],
                  scale: [0.97, 1],
                  duration: 800,
                  ease: "outExpo",
                  delay: stagger(80),
                });
              }
              observer.unobserve(entry.target);
            } else if (entry.target === passRef.current && passRef.current) {
              animate(passRef.current, {
                translateY: [35, 0],
                opacity: [0, 1],
                duration: 900,
                ease: "outExpo",
              });
              observer.unobserve(entry.target);
            }
          }
        });
      },
      { threshold: 0.12 }
    );

    if (headerRef.current) observer.observe(headerRef.current);
    if (gridRef.current) observer.observe(gridRef.current);
    if (passRef.current) observer.observe(passRef.current);

    return () => observer.disconnect();
  }, []);

  return (
    <section
      id="features"
      className="py-24 md:py-28 px-6 sm:px-8 md:px-12 lg:px-16 xl:px-20 bg-slate-950 relative overflow-hidden"
    >
      <div className="max-w-7xl mx-auto relative z-10">
        {/* Section Header */}
        <div ref={headerRef} className="max-w-2xl mb-16 md:mb-20">
          <div className="opacity-0 flex items-center gap-3 mb-3.5">
            <span className="w-8 h-[1.5px] bg-amber-400/80" />
            <span className="text-[10px] font-extrabold tracking-[0.35em] uppercase text-amber-400">
              Platform Architecture
            </span>
          </div>
          <h2 className="opacity-0 text-3xl sm:text-4xl md:text-[2.75rem] font-bold text-white tracking-tight leading-[1.15] mb-4">
            Why India Travels <span className="text-amber-400">With Raahi</span>
          </h2>
          <p className="opacity-0 text-white/50 text-sm sm:text-base leading-relaxed">
            Replacing fragmented booking engines, crowded tourist traps, and predatory middlemen with a dignified, AI-synchronized heritage ecosystem.
          </p>
        </div>

        {/* Feature Cards Grid */}
        <div
          ref={gridRef}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 mb-20"
        >
          {FEATURES.map((feature, idx) => (
            <FeatureCard key={idx} feature={feature} index={idx} />
          ))}
        </div>

        {/* Live Digital Travel Pass & Safety Sentinel Showcase */}
        <div
          ref={passRef}
          className="opacity-0 bg-gradient-to-br from-slate-900/90 via-slate-900/60 to-slate-950 border border-white/[0.08] rounded-3xl p-8 sm:p-10 md:p-14 shadow-2xl relative overflow-hidden"
        >
          <div className="absolute top-0 right-0 w-96 h-96 bg-amber-500/5 rounded-full blur-3xl pointer-events-none" />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            {/* Left Description */}
            <div className="lg:col-span-7 space-y-6">
              <div className="flex items-center gap-3">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
                <span className="text-[10px] font-extrabold tracking-[0.3em] uppercase text-emerald-400">
                  Government & Security Architecture
                </span>
              </div>

              <h3 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white tracking-tight">
                Unified Encrypted Pass & <br className="hidden sm:inline" />
                <span className="text-amber-400">Tourist Police Sentinel</span>
              </h3>

              <p className="text-white/60 text-sm sm:text-base leading-relaxed max-w-xl">
                One cryptographically signed QR code unlocks instant queue-less entry across ASI heritage monuments, verified heritage ferries, and certified artisan guild sessions without paper vouchers.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 pt-2">
                {[
                  "Offline SHA-256 verifiable token",
                  "ASI & Ministry of Tourism synchronized",
                  "1-Tap SOS to local Tourist Police Cell",
                  "Direct fair-trade artisan compensation",
                ].map((item, i) => (
                  <div key={i} className="flex items-center gap-2.5 text-xs text-white/80 font-medium">
                    <CheckCircle size={16} className="text-emerald-400 shrink-0" weight="fill" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Right Interactive Pass Mockup Card */}
            <div className="lg:col-span-5 flex justify-center">
              <div className="w-full max-w-sm bg-slate-950/90 border border-amber-400/30 rounded-2xl p-6 shadow-2xl relative">
                <div className="flex justify-between items-start border-b border-white/[0.08] pb-4 mb-4">
                  <div>
                    <span className="text-[9px] font-extrabold uppercase tracking-widest text-amber-400 block mb-0.5">
                      RAAHI DIGITAL PASS
                    </span>
                    <h4 className="text-sm font-bold text-white">All-Access Cultural Key</h4>
                  </div>
                  <div className="w-7 h-7 rounded-lg bg-emerald-400/10 border border-emerald-400/30 flex items-center justify-center">
                    <LockKey size={16} className="text-emerald-400" weight="duotone" />
                  </div>
                </div>

                {/* Simulated QR Code Box */}
                <div className="bg-slate-900 border border-white/[0.08] rounded-xl p-4 flex flex-col items-center justify-center gap-3 mb-4">
                  <div className="w-32 h-32 bg-white rounded-lg p-2.5 flex items-center justify-center shadow-inner">
                    {/* SVG QR Code Pattern representation */}
                    <svg viewBox="0 0 100 100" className="w-full h-full text-slate-950">
                      <rect width="100" height="100" fill="white" />
                      <rect x="10" y="10" width="30" height="30" fill="black" />
                      <rect x="16" y="16" width="18" height="18" fill="white" />
                      <rect x="20" y="20" width="10" height="10" fill="black" />
                      <rect x="60" y="10" width="30" height="30" fill="black" />
                      <rect x="66" y="16" width="18" height="18" fill="white" />
                      <rect x="70" y="20" width="10" height="10" fill="black" />
                      <rect x="10" y="60" width="30" height="30" fill="black" />
                      <rect x="16" y="66" width="18" height="18" fill="white" />
                      <rect x="20" y="70" width="10" height="10" fill="black" />
                      <rect x="50" y="50" width="10" height="10" fill="black" />
                      <rect x="65" y="60" width="15" height="10" fill="black" />
                      <rect x="70" y="75" width="20" height="15" fill="black" />
                      <rect x="50" y="70" width="10" height="20" fill="black" />
                    </svg>
                  </div>
                  <div className="text-center">
                    <span className="text-[10px] font-mono text-amber-400 font-bold tracking-wider">
                      RAAHI-2026-IND-PASS-VIP
                    </span>
                    <p className="text-[10px] text-white/40">Verified with Ministry of Tourism</p>
                  </div>
                </div>

                {/* Pass details */}
                <div className="space-y-2 text-xs border-t border-white/[0.08] pt-3 mb-4">
                  <div className="flex justify-between text-white/60">
                    <span>Active Sector</span>
                    <span className="text-white font-semibold">Varanasi • Kashi Ghats</span>
                  </div>
                  <div className="flex justify-between text-white/60">
                    <span>Queue Clearance</span>
                    <span className="text-emerald-400 font-semibold">VIP Fast-Track Active</span>
                  </div>
                </div>

                {/* SOS Hotline button */}
                <button
                  onClick={() => setSosActive(!sosActive)}
                  className={`w-full py-2.5 rounded-xl text-xs font-bold flex items-center justify-center gap-2 transition ${
                    sosActive
                      ? "bg-rose-500 text-white animate-pulse"
                      : "bg-white/[0.06] hover:bg-white/[0.12] text-rose-400 border border-rose-500/20"
                  }`}
                >
                  <PhoneCall size={14} weight="bold" />
                  {sosActive ? "Tourist Police Connected (112)" : "Test Tourist Safety SOS"}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
