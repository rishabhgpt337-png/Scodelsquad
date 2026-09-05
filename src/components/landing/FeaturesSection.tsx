"use client";

import { motion } from "motion/react";
import { Compass, Sparkle, UsersThree, ShieldCheck, QrCode, HeartStraight } from "@phosphor-icons/react";

const FEATURES = [
  {
    icon: Compass,
    title: "Dynamic Smart Radar",
    tagline: "Hyper-local Proactive Pings",
    description: "Detects your current walking route and suggests hidden chai stalls, secret sunset angles, or artisan clusters before you even have to search.",
    badge: "AI Powered",
    color: "from-amber-500/20 to-orange-500/5",
    border: "border-amber-500/30",
    iconColor: "text-amber-400"
  },
  {
    icon: Sparkle,
    title: "Dignified Itineraries",
    tagline: "No Slop, True Cultural Immersion",
    description: "Customized multi-day timelines respecting your exact pace, morning rituals, dietary restrictions, and genuine curiosity without cookie-cutter tours.",
    badge: "Smart Engine",
    color: "from-blue-500/20 to-indigo-500/5",
    border: "border-blue-500/30",
    iconColor: "text-blue-400"
  },
  {
    icon: UsersThree,
    title: "Direct Artisan Economy",
    tagline: "Zero Middleman Markups",
    description: "Connect directly with generational weavers, potters, and street chefs. 100% of fair-trade bookings go right to local creators.",
    badge: "Social Impact",
    color: "from-emerald-500/20 to-teal-500/5",
    border: "border-emerald-500/30",
    iconColor: "text-emerald-400"
  },
  {
    icon: QrCode,
    title: "Unified Digital Travel Pass",
    tagline: "One QR for All Monuments & Stays",
    description: "Skip ticket queues at ASI monuments, local ferries, and verified homestays with an encrypted offline-ready pass on your phone.",
    badge: "Instant Entry",
    color: "from-purple-500/20 to-pink-500/5",
    border: "border-purple-500/30",
    iconColor: "text-purple-400"
  },
  {
    icon: ShieldCheck,
    title: "SOS & Verified Safe Zones",
    tagline: "24x7 Tourist Police Link",
    description: "One-tap emergency distress signal connected directly to local tourist police cells, authorized guides, and verified medical clinics.",
    badge: "Tourist Safety",
    color: "from-rose-500/20 to-red-500/5",
    border: "border-rose-500/30",
    iconColor: "text-rose-400"
  },
  {
    icon: HeartStraight,
    title: "Crowd Flow Intelligence",
    tagline: "Avoid Peak Ghat & Temple Congestion",
    description: "Live sensor & heat-map feeds guide you to pristine, quiet morning slots and peaceful darshans before tour buses arrive.",
    badge: "Real-Time",
    color: "from-cyan-500/20 to-blue-500/5",
    border: "border-cyan-500/30",
    iconColor: "text-cyan-400"
  }
];

import SmartRadar from "./SmartRadar";

export default function FeaturesSection() {
  return (
    <section id="features" className="py-24 px-6 md:px-12 bg-slate-950 relative overflow-hidden border-t border-white/5">
      {/* Background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-amber-500/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-6xl mx-auto relative z-10">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-400/10 border border-amber-400/20 text-amber-400 text-xs font-semibold uppercase tracking-wider mb-4">
            Designed For Bharat, Built For Explorers
          </div>
          <h2 className="text-3xl md:text-5xl font-extrabold text-white tracking-tight leading-tight mb-4">
            Why India Travels With <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-orange-400">Raahi</span>
          </h2>
          <p className="text-white/60 text-base md:text-lg">
            Replacing fragmented apps, crowded tourist traps, and unreliable agents with a single, intelligent travel ecosystem.
          </p>
        </div>

        {/* Feature Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
          {FEATURES.map((feature, idx) => {
            const Icon = feature.icon;
            return (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                whileHover={{ y: -4, transition: { duration: 0.2 } }}
                className={`bg-gradient-to-b ${feature.color} backdrop-blur-md rounded-2xl p-6 border ${feature.border} flex flex-col justify-between relative group shadow-xl`}
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-12 h-12 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center">
                      <Icon size={24} weight="duotone" className={feature.iconColor} />
                    </div>
                    <span className="text-[10px] font-bold px-2.5 py-1 rounded-full bg-white/10 text-white/80 border border-white/10">
                      {feature.badge}
                    </span>
                  </div>
                  <h3 className="text-xl font-bold text-white mb-1 group-hover:text-amber-400 transition-colors">
                    {feature.title}
                  </h3>
                  <div className="text-xs font-medium text-amber-400/80 mb-3">{feature.tagline}</div>
                  <p className="text-xs md:text-sm text-white/70 leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Smart Radar Showcase */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="bg-gradient-to-br from-slate-900 to-slate-800 border border-white/10 rounded-3xl p-8 md:p-12 flex flex-col md:flex-row items-center gap-12 shadow-2xl"
        >
          <div className="flex-1">
            <h3 className="text-2xl md:text-3xl font-bold text-white mb-4">Live Context Radar in Action</h3>
            <p className="text-white/60 mb-6 leading-relaxed">
              Our Smart Radar acts as your personal local companion. Instead of endlessly scrolling reviews, Raahi learns your pace. If you've been walking the Ghats for hours, it proactively finds the best rated, quietest chai spot within 200 meters.
            </p>
            <ul className="space-y-3">
              <li className="flex items-center gap-3 text-sm text-white/80">
                <span className="w-1.5 h-1.5 rounded-full bg-amber-400"></span>
                Triggers based on step count and time of day
              </li>
              <li className="flex items-center gap-3 text-sm text-white/80">
                <span className="w-1.5 h-1.5 rounded-full bg-amber-400"></span>
                Filters out tourist traps automatically
              </li>
              <li className="flex items-center gap-3 text-sm text-white/80">
                <span className="w-1.5 h-1.5 rounded-full bg-amber-400"></span>
                100% verified local vendor recommendations
              </li>
            </ul>
          </div>
          <div className="w-full md:w-auto relative">
            <div className="absolute inset-0 bg-amber-400/20 blur-3xl rounded-full scale-110"></div>
            <SmartRadar />
          </div>
        </motion.div>
      </div>
    </section>
  );
}