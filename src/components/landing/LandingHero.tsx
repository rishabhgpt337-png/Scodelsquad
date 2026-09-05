"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "motion/react";
import { MagnifyingGlass } from "@phosphor-icons/react";
import AuthModal from "@/components/auth/AuthModal";
import RaahiLogo from "@/components/common/RaahiLogo";

export default function LandingHero() {
  const [showAuthModal, setShowAuthModal] = useState(false);
  const router = useRouter();
  return (
    <section className="relative w-full h-screen min-h-[600px] overflow-hidden bg-[#0a1628]">
      {/* Background with slow zoom animation */}
      <motion.div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage:
            'linear-gradient(90deg, rgba(10,22,40,0.75) 0%, rgba(10,22,40,0.35) 40%, rgba(10,22,40,0.15) 70%, rgba(10,22,40,0.45)), url("https://images.unsplash.com/photo-1524492412937-b28074a5d7da?auto=format&fit=crop&w=2400&q=90")',
        }}
        animate={{ scale: [1.02, 1.08] }}
        transition={{ duration: 18, repeat: Infinity, repeatType: "reverse", ease: "easeInOut" }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-black/25 via-transparent to-black/35" />
      </motion.div>

      {/* Navigation */}
      <nav className="absolute top-0 left-0 right-0 z-20 flex items-center justify-between px-6 md:px-10 h-20">
        <RaahiLogo size="sm" />
        <div className="hidden md:flex items-center gap-10 text-[11px] font-bold uppercase tracking-wider">
          <a href="#destinations" className="opacity-90 hover:opacity-100 transition-opacity">
            Destinations
          </a>
          <a href="#features" className="opacity-90 hover:opacity-100 transition-opacity">
            Features
          </a>
          <a href="#about" className="opacity-90 hover:opacity-100 transition-opacity">
            About
          </a>
        </div>
        <div className="flex items-center gap-5">
          <button
            onClick={() => setShowAuthModal(true)}
            className="text-[10px] font-bold uppercase tracking-wider hover:text-amber-400 transition-colors"
          >
            Log In
          </button>
          <button
            onClick={() => setShowAuthModal(true)}
            className="bg-amber-400 hover:bg-amber-500 text-slate-900 text-[10px] font-bold uppercase tracking-wider px-4 py-2 rounded-lg transition-colors"
          >
            Sign Up
          </button>
        </div>
      </nav>

      {/* Left Timeline Decoration */}
      <div className="absolute left-7 top-20 bottom-14 w-[1px] bg-white/30 z-10">
        <div className="absolute left-[-3px] top-[8%] w-[7px] h-[7px] rounded-full bg-white shadow-[0_90px_0_rgba(255,255,255,0.8),0_180px_0_rgba(255,255,255,0.8),0_270px_0_rgba(255,255,255,0.8)]" />
        <div className="absolute left-[-10px] bottom-[23%] w-5 h-5 rounded-full bg-white/90 flex items-center justify-center text-[#0a1628] text-[8px] font-bold">
          04
        </div>
      </div>

      {/* Main Content */}
      <motion.div
        className="absolute left-[8%] top-[35%] z-10 max-w-[550px]"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.9, ease: [0.2, 0.8, 0.2, 1] }}
      >
        <div className="text-[9px] font-bold tracking-[4px] uppercase mb-1 text-white/90">
          MOTION. ROUTES. DISCOVERY.
        </div>
        <h1 className="text-[clamp(64px,9vw,120px)] font-extrabold leading-[0.85] tracking-[-0.05em] mb-3">
          VARANASI
        </h1>
        <p className="text-[10px] leading-relaxed text-white/90 max-w-[480px] mb-6">
          Varanasi, one of the oldest living cities on Earth, is where spirituality meets the sacred Ganges. Explore
          ancient ghats, boat rides at dawn, street food trails, and hidden temples built for unforgettable journeys.
        </p>
        <button
          onClick={() => router.push("/trip-planner")}
          className="inline-flex items-center gap-5 bg-[#1976d2] hover:bg-[#2186e0] text-white font-bold text-sm px-5 py-[14px] rounded-lg shadow-[0_12px_30px_rgba(0,0,0,0.25)] transition-all hover:translate-y-[-2px]"
        >
          Explore Route
          <span className="text-lg">→</span>
        </button>
      </motion.div>

      {/* Floating Destination Cards */}
      <div className="absolute top-[22%] right-[-20px] z-10 flex gap-3.5">
        {[
          {
            label: "Goa Beaches",
            img: "https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?auto=format&fit=crop&w=700&q=90",
            delay: 0,
            height: "250px",
            marginTop: "0",
          },
          {
            label: "Leh Ladakh",
            img: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?auto=format&fit=crop&w=700&q=90",
            delay: 0.2,
            height: "220px",
            marginTop: "20px",
          },
          {
            label: "Kerala Backwaters",
            img: "https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?auto=format&fit=crop&w=700&q=90",
            delay: 0.4,
            height: "185px",
            marginTop: "42px",
          },
        ].map((card, i) => (
          <motion.article
            key={i}
            className="relative rounded-lg overflow-visible shadow-[0_22px_40px_rgba(0,0,0,0.4)]"
            style={{ width: "160px", height: card.height, marginTop: card.marginTop }}
            animate={{ y: [0, i % 2 === 0 ? -8 : 6, 0] }}
            transition={{
              duration: i === 1 ? 7 : 6.5,
              repeat: Infinity,
              ease: "easeInOut",
              delay: card.delay,
            }}
          >
            <div className="absolute left-0 top-[-20px] text-[10px] font-bold text-white whitespace-nowrap z-10">
              {card.label}
            </div>
            <div className="absolute left-0 top-[-8px] flex gap-[3px] z-10">
              {[...Array(i === 0 ? 5 : i === 1 ? 4 : 3)].map((_, j) => (
                <span key={j} className="w-[3px] h-[3px] rounded-full bg-white opacity-80" />
              ))}
            </div>
            <img
              src={card.img}
              alt={card.label}
              className="w-full h-full object-cover rounded-lg saturate-[0.92]"
            />
            <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-black/35 rounded-lg" />
            <button
              aria-label="Save destination"
              className="absolute right-3 top-3 w-8 h-8 rounded-full bg-white flex items-center justify-center text-gray-600 hover:text-red-500 transition-colors z-10"
            >
              ♡
            </button>
          </motion.article>
        ))}
      </div>

      {/* Bottom Controls */}
      <div className="absolute left-[8%] right-[3%] bottom-6 z-20 flex items-center justify-between text-[8px] uppercase tracking-wider font-semibold">
        <span>01 / DESTINATION</span>
        <div className="flex gap-2">
          <button
            aria-label="Previous"
            className="w-6 h-6 rounded-full bg-white/20 hover:bg-white/30 flex items-center justify-center transition-colors"
          >
            ←
          </button>
          <button
            aria-label="Next"
            className="w-6 h-6 rounded-full bg-white/20 hover:bg-white/30 flex items-center justify-center transition-colors"
          >
            →
          </button>
        </div>
        <span>01&nbsp;&nbsp;&nbsp;09</span>
      </div>

      {/* Vertical Text */}
      <div
        className="absolute left-[2%] bottom-12 z-10 text-[8px] font-medium tracking-wider opacity-90"
        style={{ writingMode: "vertical-rl", transform: "rotate(180deg)" }}
      >
        TRAVEL / INDIA
      </div>

      {/* Auth Modal */}
      <AuthModal isOpen={showAuthModal} onClose={() => setShowAuthModal(false)} />
    </section>
  );
}
