"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  NavigationArrow, Hamburger, MapTrifold, Camera, Bag, X, Sparkle,
  Clock, MapPin, Compass, ShieldCheck, SpeakerHigh, Bell
} from "@phosphor-icons/react";
import { useDestination } from "@/context/DestinationContext";
import { DESTINATION_DETAILS } from "@/lib/destinations";

interface RadarSuggestion {
  name: string;
  category: string;
  distance: string;
  walkTime: string;
  rating: number;
  tip: string;
  coordinates: { lat: number; lng: number };
  badge: string;
}

const DESTINATION_RADAR_DATA: Record<string, Record<string, RadarSuggestion>> = {
  "Varanasi": {
    food: {
      name: "Blue Lassi & Kashi Chaat Bhandar",
      category: "Generational Culinary Gem",
      distance: "180m",
      walkTime: "3 min",
      rating: 4.9,
      tip: "Try the Tamatar Chaat and Pomegranate Malai Lassi served in traditional terracotta kulhads.",
      coordinates: { lat: 25.3109, lng: 83.0104 },
      badge: "100+ Yrs Heritage",
    },
    photo: {
      name: "Chet Singh Fort Ghat Balcony",
      category: "Secret Golden Hour Viewpoint",
      distance: "350m",
      walkTime: "5 min",
      rating: 4.8,
      tip: "Arrive at 17:15 for ancient fort rampart silhouettes reflecting across the misty Ganges.",
      coordinates: { lat: 25.2954, lng: 83.0039 },
      badge: "Zero Crowd Secret",
    },
    shop: {
      name: "Madanpura Master Weavers Guild",
      category: "Direct-from-Loom Silk Guild",
      distance: "420m",
      walkTime: "6 min",
      rating: 5.0,
      tip: "Zero middleman commissions. Verified authentic GI-tagged Banarasi Katan silk saris & dupattas.",
      coordinates: { lat: 25.305, lng: 83.001 },
      badge: "Govt. Verified Artisan",
    },
    explore: {
      name: "Hidden Kabir Chaura Lane Walk",
      category: "15-Min Historical Mystic Trail",
      distance: "250m",
      walkTime: "4 min",
      rating: 4.7,
      tip: "Walk the historic cobblestone quarters of 15th-century saint-poet Kabir and classical musicians.",
      coordinates: { lat: 25.318, lng: 82.998 },
      badge: "Offbeat Discovery",
    },
  },
  "Jaipur": {
    food: {
      name: "Laxmi Mishthan Bhandar (LMB) & Gulab Ji Chai",
      category: "Royal Rajasthani Culinary Trail",
      distance: "220m",
      walkTime: "3 min",
      rating: 4.8,
      tip: "Fresh Pyaaz Kachori and saffron Ghewar with masala chai boiled with whole spices.",
      coordinates: { lat: 26.9239, lng: 75.8267 },
      badge: "Iconic Royal Taste",
    },
    photo: {
      name: "Hawa Mahal Wind Pavilions Rooftop",
      category: "Panoramic Jharokha Framing",
      distance: "300m",
      walkTime: "4 min",
      rating: 4.9,
      tip: "Tattoo Cafe rooftop terrace offers the perfect straight-on angle with early morning golden light.",
      coordinates: { lat: 26.9239, lng: 75.8267 },
      badge: "Prime Geometry",
    },
    shop: {
      name: "Sanganeri Block Printing Guild",
      category: "Heritage Hand-Block Printing",
      distance: "500m",
      walkTime: "7 min",
      rating: 4.9,
      tip: "Direct botanical dye hand block fabrics crafted with carved teakwood blocks.",
      coordinates: { lat: 26.81, lng: 75.79 },
      badge: "Certified Handloom",
    },
    explore: {
      name: "Panna Meena Ka Kund Stepwell",
      category: "8-Century Symmetrical Geometry",
      distance: "400m",
      walkTime: "5 min",
      rating: 4.8,
      tip: "Marvel at criss-cross geometric stairways before afternoon tour buses arrive.",
      coordinates: { lat: 26.985, lng: 75.851 },
      badge: "Architectural Marvel",
    },
  },
  "Hampi": {
    food: {
      name: "Mango Tree & Gouthami Heritage Cafe",
      category: "Banana Leaf Thali & Filter Coffee",
      distance: "250m",
      walkTime: "4 min",
      rating: 4.8,
      tip: "South Indian filter kaapi paired with Mysore Pak and warm banana buns under coconut palms.",
      coordinates: { lat: 15.335, lng: 76.46 },
      badge: "Eco-Heritage Eatery",
    },
    photo: {
      name: "Matanga Hill Sunrise Panorama",
      category: "360° Boulder & Temple Vistas",
      distance: "450m",
      walkTime: "12 min hike",
      rating: 5.0,
      tip: "Climb the ancient stone stairs 45 minutes before sunrise to watch Tungabhadra River glow amber.",
      coordinates: { lat: 15.332, lng: 76.467 },
      badge: "Master Viewpoint",
    },
    shop: {
      name: "Lambani Tribal Embroidery Guild",
      category: "Mirrorwork & Natural Dye Textiles",
      distance: "300m",
      walkTime: "5 min",
      rating: 4.9,
      tip: "Traditional Banjara geometric mirror-work bags, stoles and brass bell ornaments.",
      coordinates: { lat: 15.33, lng: 76.455 },
      badge: "Tribal Artisan Collective",
    },
    explore: {
      name: "Achutaraya Temple & Courtesan Street",
      category: "Secluded Vijayanagara Enclave",
      distance: "350m",
      walkTime: "6 min",
      rating: 4.9,
      tip: "Walk through the solitary colonnaded bazaar tucked behind Gandhamadana hill.",
      coordinates: { lat: 15.338, lng: 76.471 },
      badge: "Hidden Sanctuary",
    },
  },
};

const RADAR_MOODS = [
  {
    id: "food",
    icon: Hamburger,
    label: "Hungry? Local Eats",
    desc: "100-year-old culinary icons within 500m",
    color: "text-orange-400",
    bg: "bg-orange-400/10",
    border: "border-orange-400/20",
  },
  {
    id: "photo",
    icon: Camera,
    label: "Secret Photo Spot",
    desc: "Uncrowded angles & golden hour vistas",
    color: "text-purple-400",
    bg: "bg-purple-400/10",
    border: "border-purple-400/20",
  },
  {
    id: "shop",
    icon: Bag,
    label: "Artisan Guilds",
    desc: "Direct-from-maker zero commission crafts",
    color: "text-emerald-400",
    bg: "bg-emerald-400/10",
    border: "border-emerald-400/20",
  },
  {
    id: "explore",
    icon: MapTrifold,
    label: "Hidden Walk Trail",
    desc: "10-minute heritage lanes & secret relics",
    color: "text-blue-400",
    bg: "bg-blue-400/10",
    border: "border-blue-400/20",
  },
];

export default function SmartRadar() {
  const { destination } = useDestination();
  const [showNotification, setShowNotification] = useState(false);
  const [activeMood, setActiveMood] = useState<string>("food");
  const [navigating, setNavigating] = useState(false);

  const destName = destination?.name || "Varanasi";
  const radarOptions = DESTINATION_RADAR_DATA[destName] || DESTINATION_RADAR_DATA["Varanasi"];
  const currentItem = radarOptions[activeMood] || radarOptions.food;

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowNotification(true);
    }, 4500);
    return () => clearTimeout(timer);
  }, []);

  const handleStartNavigation = () => {
    setNavigating(true);
    const googleMapsUrl = `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(
      `${currentItem.name} ${destName}`
    )}`;
    window.open(googleMapsUrl, "_blank", "noopener,noreferrer");
    setTimeout(() => setNavigating(false), 2000);
  };

  return (
    <div className="w-full bg-slate-900/80 backdrop-blur-xl border border-white/[0.08] rounded-3xl p-6 md:p-8 flex flex-col justify-between shadow-2xl relative overflow-hidden">
      {/* Glow Effect */}
      <div className="absolute top-0 right-0 w-48 h-48 bg-amber-400/5 rounded-full blur-3xl pointer-events-none" />

      <div>
        {/* Header */}
        <div className="flex items-center justify-between mb-6 border-b border-white/[0.06] pb-4">
          <div className="flex items-center gap-2.5">
            <span className="relative flex h-2.5 w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-400"></span>
            </span>
            <div>
              <span className="text-[10px] font-bold uppercase tracking-[0.25em] text-emerald-400 block">
                Live Smart Radar
              </span>
              <p className="text-xs text-white/50">
                Contextual AI for <span className="text-white font-semibold">{destName}</span>
              </p>
            </div>
          </div>

          <div className="flex items-center gap-1.5 bg-white/[0.05] border border-white/[0.08] px-3 py-1 rounded-full">
            <Clock size={12} className="text-amber-400" />
            <span className="text-[11px] font-medium text-white/70">Real-time Surge Sync</span>
          </div>
        </div>

        {/* Mood Selector Grid */}
        <div className="grid grid-cols-2 gap-2.5 mb-6">
          {RADAR_MOODS.map((mood) => (
            <button
              key={mood.id}
              onClick={() => setActiveMood(mood.id)}
              className={`text-left p-3.5 rounded-2xl border transition-all duration-300 relative overflow-hidden ${
                activeMood === mood.id
                  ? "border-amber-400 bg-slate-800/90 shadow-lg shadow-amber-400/10"
                  : "border-white/[0.06] bg-slate-950/60 hover:bg-slate-800/50 hover:border-white/[0.15]"
              }`}
            >
              <div className={`w-8 h-8 rounded-xl ${mood.bg} border ${mood.border} flex items-center justify-center mb-2.5`}>
                <mood.icon size={16} className={mood.color} weight="duotone" />
              </div>
              <div className="font-bold text-xs text-white leading-tight mb-1">
                {mood.label}
              </div>
              <div className="text-[10px] text-white/40 leading-snug line-clamp-1">
                {mood.desc}
              </div>
            </button>
          ))}
        </div>

        {/* Active Suggestion Details */}
        <AnimatePresence mode="wait">
          {currentItem && (
            <motion.div
              key={`${destName}-${activeMood}`}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.25 }}
              className="bg-slate-950 border border-white/[0.08] rounded-2xl p-5 space-y-4"
            >
              <div className="flex justify-between items-start">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-[9px] font-extrabold uppercase tracking-widest text-amber-400 bg-amber-400/10 px-2 py-0.5 rounded-md border border-amber-400/20">
                      {currentItem.badge}
                    </span>
                    <span className="text-[10px] text-white/40">• {currentItem.walkTime} walk</span>
                  </div>
                  <h4 className="font-bold text-white text-base leading-snug">{currentItem.name}</h4>
                  <p className="text-xs text-white/50">{currentItem.category}</p>
                </div>

                <div className="text-right bg-emerald-500/10 border border-emerald-500/20 px-2.5 py-1 rounded-xl">
                  <div className="text-xs font-black text-emerald-400">★ {currentItem.rating}</div>
                  <div className="text-[9px] text-emerald-400/70 font-semibold">{currentItem.distance}</div>
                </div>
              </div>

              {/* Insider Tip Box */}
              <div className="bg-slate-900/90 border border-white/[0.05] p-3 rounded-xl flex items-start gap-2.5">
                <Sparkle size={15} className="text-amber-400 flex-shrink-0 mt-0.5" weight="fill" />
                <p className="text-xs text-white/70 leading-relaxed italic">
                  &ldquo;{currentItem.tip}&rdquo;
                </p>
              </div>

              {/* Actions */}
              <div className="flex gap-2.5 pt-1">
                <button
                  onClick={handleStartNavigation}
                  className="flex-1 bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-300 hover:to-amber-400 text-slate-950 text-xs font-extrabold py-3 rounded-xl flex items-center justify-center gap-2 transition shadow-lg shadow-amber-400/15"
                >
                  <NavigationArrow size={14} weight="bold" />
                  {navigating ? "Launching GPS..." : "Live Step-by-Step Guidance"}
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Proactive Push Notification Banner */}
      <AnimatePresence>
        {showNotification && (
          <motion.div
            initial={{ x: 60, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: 60, opacity: 0 }}
            transition={{ type: "spring", stiffness: 350, damping: 28 }}
            className="fixed bottom-6 right-6 max-w-sm w-[90vw] bg-slate-900 border border-amber-400/30 shadow-2xl rounded-2xl p-4.5 z-50 text-white overflow-hidden backdrop-blur-2xl"
          >
            <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-amber-400 via-emerald-400 to-amber-400" />
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 shrink-0 rounded-xl bg-amber-400/15 border border-amber-400/30 flex items-center justify-center text-lg">
                🔔
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex justify-between items-center mb-1">
                  <span className="text-[10px] font-bold text-amber-400 uppercase tracking-widest">
                    Raahi Live Sentinel
                  </span>
                  <button
                    onClick={() => setShowNotification(false)}
                    className="text-white/40 hover:text-white transition"
                  >
                    <X size={14} />
                  </button>
                </div>
                <h4 className="font-bold text-xs text-white leading-snug">
                  Golden Hour Aarti Surge Detected
                </h4>
                <p className="text-[11px] text-white/60 leading-snug mt-1">
                  Maha Aarti gathering in {destName} begins in 45 minutes. Raahi VIP pavilion slots are active with queue bypass.
                </p>
                <div className="mt-3 flex gap-2">
                  <button
                    onClick={() => {
                      setActiveMood("explore");
                      setShowNotification(false);
                    }}
                    className="text-[10px] bg-amber-400 text-slate-950 font-bold py-1.5 px-3 rounded-lg hover:bg-amber-300 transition"
                  >
                    View Passage
                  </button>
                  <button
                    onClick={() => setShowNotification(false)}
                    className="text-[10px] bg-white/[0.08] text-white/60 font-semibold py-1.5 px-3 rounded-lg hover:bg-white/15 transition"
                  >
                    Dismiss
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
