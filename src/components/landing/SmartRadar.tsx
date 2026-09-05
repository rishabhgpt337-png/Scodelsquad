"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { NavigationArrow, Hamburger, MapTrifold, Camera, Bag, X } from "@phosphor-icons/react";

const RADAR_MOODS = [
  { id: "food", icon: Hamburger, label: "Bhookh Lagi Hai?", desc: "Best local cafes & street food within 500m", color: "text-orange-400", bg: "bg-orange-400/10" },
  { id: "photo", icon: Camera, label: "Secret Photo Spot", desc: "No crowds, golden hour angles nearby", color: "text-purple-400", bg: "bg-purple-400/10" },
  { id: "shop", icon: Bag, label: "Local Artisan Shopping", desc: "Handloom & crafts directly from makers", color: "text-emerald-400", bg: "bg-emerald-400/10" },
  { id: "explore", icon: MapTrifold, label: "What Next?", desc: "10-minute heritage walks & nearby gems", color: "text-blue-400", bg: "bg-blue-400/10" },
];

export default function SmartRadar() {
  const [showNotification, setShowNotification] = useState(false);
  const [activeMood, setActiveMood] = useState<string | null>(null);

  // Simulate proactive contextual ping after 5 seconds on the dashboard
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowNotification(true);
    }, 5000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="w-full max-w-sm ml-auto relative pb-10">
      <h3 className="text-sm font-bold text-white/50 uppercase tracking-widest mb-4 flex items-center gap-2">
        <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
        Live Context Radar
      </h3>

      {/* Grid of Moods */}
      <div className="grid grid-cols-2 gap-3 mb-6 relative z-10">
        {RADAR_MOODS.map((mood) => (
          <button
            key={mood.id}
            onClick={() => setActiveMood(mood.id)}
            className={`text-left p-3 rounded-xl border transition-all ${
              activeMood === mood.id
                ? "border-amber-400 shadow-[0_0_20px_rgba(232,164,90,0.15)] bg-slate-800"
                : "border-white/10 bg-slate-800/40 hover:bg-slate-800 hover:border-white/20"
            }`}
          >
            <div className={`w-8 h-8 rounded-full ${mood.bg} flex items-center justify-center mb-2`}>
              <mood.icon size={18} className={mood.color} weight="fill" />
            </div>
            <div className="font-bold text-[11px] text-white leading-tight mb-1">{mood.label}</div>
            <div className="text-[9px] text-white/50 leading-tight line-clamp-2">{mood.desc}</div>
          </button>
        ))}
      </div>

      {/* Selected Action Card */}
      <AnimatePresence mode="wait">
        {activeMood && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="bg-slate-800 border border-amber-400/30 rounded-xl p-4 shadow-xl"
          >
            <div className="flex justify-between items-start mb-3">
              <div>
                <h4 className="font-bold text-white text-sm">Target Locked: Blue Lassi Shop</h4>
                <p className="text-xs text-white/60">Rating 4.8 • 3 min walk (200m)</p>
              </div>
              <button
                onClick={() => setActiveMood(null)}
                className="w-5 h-5 rounded-full bg-white/10 flex items-center justify-center text-white/60 hover:text-white"
              >
                <X size={10} weight="bold" />
              </button>
            </div>
            <div className="flex gap-2">
              <button className="flex-1 bg-amber-400 hover:bg-amber-500 text-slate-900 text-xs font-bold py-2.5 rounded-lg flex items-center justify-center gap-1.5 transition-colors">
                <NavigationArrow size={14} weight="bold" />
                Navigate
              </button>
              <button className="flex-1 bg-white/10 hover:bg-white/20 text-white text-xs font-bold py-2.5 rounded-lg transition-colors">
                See Menu
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Proactive Push Notification (Zomato Style) */}
      <AnimatePresence>
        {showNotification && (
          <motion.div
            initial={{ x: "120%", opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: "120%", opacity: 0 }}
            transition={{ type: "spring", stiffness: 400, damping: 30 }}
            className="fixed bottom-6 right-6 w-80 bg-white shadow-2xl rounded-2xl p-4 z-50 border border-gray-100 overflow-hidden"
          >
            {/* Glossy top highlight */}
            <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-orange-400 to-amber-500" />

            <div className="flex items-start gap-4">
              <div className="w-10 h-10 shrink-0 rounded-full bg-orange-100 flex items-center justify-center mt-1">
                <span className="text-xl">☕</span>
              </div>
              <div className="flex-1">
                <div className="flex justify-between items-start">
                  <h4 className="font-bold text-slate-800 text-sm">Raahi Radar Triggered!</h4>
                  <span className="text-[10px] font-bold text-orange-500 bg-orange-50 px-1.5 py-0.5 rounded">JUST NOW</span>
                </div>
                <p className="text-xs text-slate-600 leading-snug mt-1.5">
                  Ghat par 5,000 steps chal liye boss! Ek kadak kulhad chai aur kachori ho jaaye?
                </p>
                <div className="mt-3 flex gap-2">
                  <button className="text-[11px] bg-slate-900 hover:bg-slate-800 text-white font-bold py-1.5 px-3 rounded-md transition-colors">
                    Haan Bhai, Chalo!
                  </button>
                  <button
                    onClick={() => setShowNotification(false)}
                    className="text-[11px] bg-slate-100 hover:bg-slate-200 text-slate-600 font-bold py-1.5 px-3 rounded-md transition-colors"
                  >
                    Nahi, baad mein
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
