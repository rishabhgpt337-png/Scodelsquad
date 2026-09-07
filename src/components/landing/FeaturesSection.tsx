"use client";

import { useEffect, useRef } from "react";
import { animate, stagger } from "animejs";
import {
  Compass,
  Sparkle,
  UsersThree,
  ShieldCheck,
  QrCode,
  HeartStraight,
} from "@phosphor-icons/react";
import SmartRadar from "./SmartRadar";
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
  const radarRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Entrance animation observer
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            if (entry.target === headerRef.current) {
              animate(headerRef.current?.children || [], {
                translateY: [20, 0],
                opacity: [0, 1],
                duration: 800,
                ease: "outQuint",
                delay: stagger(100)
              });
              observer.unobserve(entry.target);
            } 
            else if (entry.target === gridRef.current) {
              const cards = gridRef.current?.querySelectorAll('.feature-card');
              if (cards && cards.length > 0) {
                animate(cards, {
                  translateY: [30, 0],
                  opacity: [0, 1],
                  scale: [0.97, 1],
                  duration: 900,
                  ease: "outElastic(1, .8)",
                  delay: stagger(100)
                });
              }
              observer.unobserve(entry.target);
            }
            else if (entry.target === radarRef.current) {
              animate(radarRef.current, {
                translateY: [40, 0],
                opacity: [0, 1],
                duration: 1000,
                ease: "outExpo"
              });
              observer.unobserve(entry.target);
            }
          }
        });
      },
      { threshold: 0.15 }
    );

    if (headerRef.current) observer.observe(headerRef.current);
    if (gridRef.current) observer.observe(gridRef.current);
    if (radarRef.current) observer.observe(radarRef.current);

    return () => observer.disconnect();
  }, []);

  return (
    <section
      id="features"
      className="py-28 px-8 md:px-16 lg:px-20 bg-slate-950 relative overflow-hidden"
    >
      <div className="max-w-6xl mx-auto relative z-10">
        {/* Section Header */}
        <div ref={headerRef} className="max-w-xl mb-20">
          <div className="opacity-0 flex items-center gap-3 mb-4">
            <span className="w-8 h-[1.5px] bg-amber-400/50" />
            <span className="text-[10px] font-bold tracking-[0.35em] uppercase text-amber-400/80">
              Platform Capabilities
            </span>
          </div>
          <h2 className="opacity-0 text-3xl md:text-[2.75rem] font-bold text-white tracking-tight leading-[1.15] mb-5">
            Why India Travels{" "}
            <span className="text-amber-400">With Raahi</span>
          </h2>
          <p className="opacity-0 text-white/50 text-base leading-relaxed">
            Replacing fragmented apps, crowded tourist traps, and unreliable
            agents with a single intelligent travel ecosystem built for Bharat.
          </p>
        </div>

        {/* Feature Cards Grid */}
        <div ref={gridRef} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px bg-white/[0.04] rounded-2xl overflow-hidden mb-24">
          {FEATURES.map((feature, idx) => (
            <FeatureCard key={idx} feature={feature} index={idx} />
          ))}
        </div>

        {/* Smart Radar Showcase */}
        <div
          ref={radarRef}
          className="opacity-0 bg-slate-900/50 border border-white/[0.06] rounded-2xl p-10 md:p-14 flex flex-col md:flex-row items-center gap-14 translate-y-10"
        >
          <div className="flex-1">
            <div className="flex items-center gap-3 mb-4">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span className="text-[10px] font-bold tracking-[0.3em] uppercase text-emerald-400/80">
                Live Demo
              </span>
            </div>
            <h3 className="text-2xl md:text-3xl font-bold text-white mb-5 tracking-tight">
              Context Radar in Action
            </h3>
            <p className="text-white/50 mb-8 leading-relaxed text-[15px]">
              Our Smart Radar learns your pace. If you've walked the Ghats for
              hours, it proactively finds the best rated, quietest chai spot
              within 200 metres — no searching required.
            </p>
            <ul className="space-y-3">
              {[
                "Triggers based on step count and time of day",
                "Filters out tourist traps automatically",
                "100% verified local vendor recommendations",
              ].map((item, i) => (
                <li
                  key={i}
                  className="flex items-center gap-3 text-sm text-white/65"
                >
                  <span className="w-1 h-1 rounded-full bg-amber-400 shrink-0" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
          <div className="w-full md:w-auto">
            <SmartRadar />
          </div>
        </div>
      </div>
    </section>
  );
}
