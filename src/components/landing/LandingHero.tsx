"use client";

import { useRouter } from "next/navigation";
import { motion } from "motion/react";
import { Sparkle, ArrowRight } from "@phosphor-icons/react";
import RaahiLogo from "@/components/common/RaahiLogo";
import UserNav from "@/components/auth/UserNav";

export default function LandingHero() {
  const router = useRouter();

  return (
    <section className="relative w-full min-h-screen flex flex-col bg-[#050505] overflow-hidden selection:bg-amber-500/30">
      {/* Abstract Animated Glows & Mesh Gradients */}
      <div className="absolute inset-0 z-0 flex items-center justify-center pointer-events-none">
        <div className="absolute top-[-20%] left-[-10%] w-[600px] h-[600px] bg-indigo-600/20 rounded-full blur-[120px] mix-blend-screen animate-pulse" style={{ animationDuration: '4s' }} />
        <div className="absolute bottom-[-10%] right-[-5%] w-[500px] h-[500px] bg-amber-500/10 rounded-full blur-[100px] mix-blend-screen" />
        <div className="absolute top-[20%] right-[10%] w-[400px] h-[400px] bg-emerald-500/10 rounded-full blur-[120px] mix-blend-screen" />
      </div>

      <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 brightness-100 contrast-150 mix-blend-overlay z-0 pointer-events-none" />

      {/* Floating Nano-Nav */}
      <div className="relative z-50 w-full px-6 pt-8 flex justify-center">
        <nav className="w-full max-w-5xl bg-white/[0.03] backdrop-blur-2xl border border-white/[0.08] rounded-full h-16 flex items-center justify-between px-6 sm:px-8 shadow-[0_8px_32px_rgba(0,0,0,0.4)]">
          <RaahiLogo size="sm" />

          <div className="hidden md:flex items-center gap-8 text-xs font-medium text-white/50">
            <a href="#features" className="hover:text-white transition-colors duration-300">Features</a>
            <a href="#impact" className="hover:text-white transition-colors duration-300">Impact</a>
            <a href="#technology" className="hover:text-white transition-colors duration-300">Technology</a>
            <a href="/assistant" className="text-amber-400 hover:text-amber-300 transition-colors duration-300 flex items-center gap-1.5 font-semibold">
              <Sparkle weight="fill" size={13} className="text-amber-400" />
              <span>AI Concierge</span>
            </a>
          </div>

          <div className="flex items-center gap-4">
            <UserNav />
          </div>
        </nav>
      </div>

      {/* Hero Content Main Stage */}
      <div className="relative z-10 flex-1 flex flex-col items-center pt-24 md:pt-32 px-6 text-center">

        {/* Huge SaaS Headline */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1, ease: "easeOut" }}
          className="text-5xl md:text-7xl lg:text-[84px] font-semibold text-white tracking-[-0.03em] leading-[1.05] max-w-5xl"
        >
          Architect The Perfect <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-200 via-amber-400 to-amber-600">
            Journey.
          </span>
        </motion.h1>

        {/* Sub-headline */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
          className="mt-8 text-lg md:text-xl text-white/40 max-w-2xl font-light leading-relaxed"
        >
          An advanced intelligence layer mapping India's vast heritage. Generate hyper-personalized, artisan-verified itineraries with precision mapping and local insights.
        </motion.p>

        {/* Actions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3, ease: "easeOut" }}
          className="mt-10 flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto"
        >
          <button
            onClick={() => router.push("/trip-planner")}
            className="w-full sm:w-auto px-8 py-4 rounded-full bg-white text-black font-semibold text-sm hover:scale-105 hover:bg-neutral-200 transition-all duration-300 flex items-center justify-center gap-2 shadow-[0_0_40px_rgba(255,255,255,0.2)]"
          >
            Launch Builder <Sparkle weight="fill" size={16} />
          </button>

          <button
            onClick={() => router.push("/assistant")}
            className="w-full sm:w-auto px-7 py-4 rounded-full bg-white/[0.06] hover:bg-white/[0.12] border border-white/10 text-white font-medium text-sm transition-all duration-300 flex items-center justify-center gap-2 backdrop-blur-xl"
          >
            <span>Ask AI Concierge</span>
            <ArrowRight size={16} />
          </button>
        </motion.div>
      </div>
    </section>
  );
}
