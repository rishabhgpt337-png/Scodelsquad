"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { NavigationArrow, Hamburger, MapTrifold, Camera, Bag, X } from "@phosphor-icons/react";

const RADAR_MOODS = [
  {
    id: "food",
    icon: Hamburger,
    label: "Bhookh Lagi Hai?",
    desc: "Best local cafes & street food within 500m",
    color: "text-orange-400",
    bg: "bg-orange-400/10",
    border: "border-orange-400/20",
  },
  {
    id: "photo",
    icon: Camera,
    label: "Secret Photo Spot",
    desc: "No crowds, golden hour angles nearby",
    color: "text-purple-400",
    bg: "bg-purple-400/10",
    border: "border-purple-400/20",
  },
  {
    id: "shop",
    icon: Bag,
    label: "Local Artisan Shops",
    desc: "Handloom & crafts directly from makers",
    color: "text-emerald-400",
    bg: "bg-emerald-400/10",
    border: "border-emerald-400/20",
  },
  {
    id: "explore",
    icon: MapTrifold,
    label: "What's Nearby?",
    desc: "10-minute heritage walks & hidden gems",
    color: "text-blue-400",
    bg: "bg-blue-400/10",
    border: "border-blue-400/20",
  },
];

export default function SmartRadar() {
  const [showNotification, setShowNotification] = useState(false);
  const [activeMood, setActiveMood] = useState<string | null>(null);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowNotification(true);
    }, 5000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="w-full max-w-sm ml-auto relative pb-10">
      <div className="flex items-center gap-2 mb-5">
        <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
        <span className="text-[10px] font-bold uppercase tracking-[0.25em] text-emerald-400/80">
          Live Context Radar
        </span>
      </div>

      {/* Mood Grid */}
      <div className="grid grid-cols-2 gap-2.5 mb-5 relative z-10">
        {RADAR_MOODS.map((mood) => (
          <button
            key={mood.id}
            onClick={() => setActiveMood(mood.id)}
            className={`text-left p-3.5 rounded-xl border transition-all duration-200 ${
              activeMood === mood.id
                ? "border-amber-400/50 bg-slate-800"
                : "border-white/[0.08] bg-slate-800/40 hover:bg-slate-800 hover:border-white/[0.15]"
            }`}
          >
            <div className={`w-7 h-7 rounded-lg ${mood.bg} border ${mood.border} flex items-center justify-center mb-2.5`}>
              <mood.icon size={15} className={mood.color} weight="duotone" />
            </div>
            <div className="font-semibold text-[11px] text-white leading-tight mb-1">
              {mood.label}
            </div>
            <div className="text-[9px] text-white/45 leading-snug line-clamp-2">
              {mood.desc}
            </div>
          </button>
        ))}
      </div>

      {/* Selected Result Card */}
      <AnimatePresence mode="wait">
        {activeMood && (
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.2 }}
            className="bg-slate-800/80 border border-white/[0.08] rounded-xl p-4"
          >
            <div className="flex justify-between items-start mb-3">
              <div>
                <h4 className="font-semibold text-white text-sm">Blue Lassi, Vishwanath Gali</h4>
                <p className="text-[11px] text-white/50 mt-0.5">Rating 4.8 • 200m • 3 min walk</p>
              </div>
              <button
                onClick={() => setActiveMood(null)}
                className="w-5 h-5 rounded-full bg-white/[0.08] flex items-center justify-center text-white/50 hover:text-white transition-colors"
              >
                <X size={9} weight="bold" />
              </button>
            </div>
            <div className="flex gap-2">
              <button className="flex-1 bg-amber-400 hover:bg-amber-300 text-slate-900 text-xs font-semibold py-2.5 rounded-lg flex items-center justify-center gap-1.5 transition-colors duration-150">
                <NavigationArrow size={12} weight="bold" />
                Navigate
              </button>
              <button className="flex-1 bg-white/[0.07] hover:bg-white/[0.12] text-white/80 text-xs font-semibold py-2.5 rounded-lg transition-colors duration-150">
                See Menu
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Proactive Push Notification */}
      <AnimatePresence>
        {showNotification && (
          <motion.div
            initial={{ x: "110%", opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: "110%", opacity: 0 }}
            transition={{ type: "spring", stiffness: 380, damping: 32 }}
            className="fixed bottom-6 right-6 w-76 bg-white shadow-2xl rounded-2xl p-4 z-50 border border-gray-100 overflow-hidden"
            style={{ width: "300px" }}
          >
            <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-orange-400 to-amber-400" />
            <div className="flex items-start gap-3.5">
              <div className="w-9 h-9 shrink-0 rounded-full bg-orange-50 flex items-center justify-center mt-0.5 text-lg">
                ☕
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex justify-between items-start gap-2">
                  <h4 className="font-semibold text-slate-800 text-xs leading-snug">
                    Raahi Radar Triggered
                  </h4>
                  <span className="text-[9px] font-bold text-orange-500 bg-orange-50 px-1.5 py-0.5 rounded shrink-0">
                    NOW
                  </span>
                </div>
                <p className="text-[11px] text-slate-500 leading-snug mt-1.5">
                  Ghat par 5,000 steps chal liye! Ek kadak kulhad chai ho jaaye?
                </p>
                <div className="mt-3 flex gap-2">
                  <button className="text-[10px] bg-slate-900 hover:bg-slate-700 text-white font-semibold py-1.5 px-3 rounded-lg transition-colors">
                    Haan, Chalte Hain!
                  </button>
                  <button
                    onClick={() => setShowNotification(false)}
                    className="text-[10px] bg-slate-100 hover:bg-slate-200 text-slate-500 font-semibold py-1.5 px-3 rounded-lg transition-colors"
                  >
                    Baad Mein
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
