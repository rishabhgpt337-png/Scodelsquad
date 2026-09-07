"use client";

import { motion } from "motion/react";
import {
  Compass,
  Sparkle,
  UsersThree,
  ShieldCheck,
  QrCode,
  HeartStraight,
} from "@phosphor-icons/react";

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

import SmartRadar from "./SmartRadar";

export default function FeaturesSection() {
  return (
    <section
      id="features"
      className="py-28 px-8 md:px-16 lg:px-20 bg-slate-950 relative overflow-hidden"
    >
      <div className="max-w-6xl mx-auto relative z-10">
        {/* Section Header */}
        <div className="max-w-xl mb-20">
          <div className="flex items-center gap-3 mb-4">
            <span className="w-8 h-[1.5px] bg-amber-400/50" />
            <span className="text-[10px] font-bold tracking-[0.35em] uppercase text-amber-400/80">
              Platform Capabilities
            </span>
          </div>
          <h2 className="text-3xl md:text-[2.75rem] font-bold text-white tracking-tight leading-[1.15] mb-5">
            Why India Travels{" "}
            <span className="text-amber-400">With Raahi</span>
          </h2>
          <p className="text-white/50 text-base leading-relaxed">
            Replacing fragmented apps, crowded tourist traps, and unreliable
            agents with a single intelligent travel ecosystem built for Bharat.
          </p>
        </div>

        {/* Feature Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px bg-white/[0.04] rounded-2xl overflow-hidden mb-24">
          {FEATURES.map((feature, idx) => {
            const Icon = feature.icon;
            return (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: idx * 0.08 }}
                className="bg-slate-950 p-8 flex flex-col group hover:bg-slate-900/80 transition-colors duration-300"
              >
                <div className={`w-10 h-10 rounded-lg ${feature.accentBg} border ${feature.accentBorder} flex items-center justify-center mb-5`}>
                  <Icon size={20} weight="duotone" className={feature.accent} />
                </div>
                <h3 className="text-lg font-semibold text-white mb-1 group-hover:text-amber-400 transition-colors duration-200">
                  {feature.title}
                </h3>
                <div className="text-[11px] font-medium text-white/40 uppercase tracking-wider mb-3">
                  {feature.tagline}
                </div>
                <p className="text-sm text-white/55 leading-relaxed mt-auto">
                  {feature.description}
                </p>
              </motion.div>
            );
          })}
        </div>

        {/* Smart Radar Showcase */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="bg-slate-900/50 border border-white/[0.06] rounded-2xl p-10 md:p-14 flex flex-col md:flex-row items-center gap-14"
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
        </motion.div>
      </div>
    </section>
  );
}
