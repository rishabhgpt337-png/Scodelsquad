"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "motion/react";
import { Sparkle, ArrowRight, Mouse, CheckCircle, MapPin, GlobeHemisphereWest } from "@phosphor-icons/react";
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
        </motion.div>

        {/* Dashboard Mockup / Core Portal Visual */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.5, ease: "easeOut" }}
          className="mt-20 relative w-full max-w-6xl mx-auto"
        >
          {/* Glassmorphic Board */}
          <div className="relative rounded-[2rem] border border-white/10 bg-white/[0.02] backdrop-blur-3xl shadow-[0_0_100px_rgba(0,0,0,0.8)] overflow-hidden aspect-[16/9] md:aspect-[21/9] flex items-center justify-center group">
            {/* Minimalist Tech UI representation */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-transparent to-transparent z-10" />

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 p-8 w-full h-full opacity-60 group-hover:opacity-100 transition-opacity duration-700">
              {/* Card 1 */}
              <div className="flex flex-col gap-4 border border-white/5 bg-white/[0.01] rounded-2xl p-6">
                <div className="h-10 w-10 rounded-full bg-amber-500/10 flex items-center justify-center border border-amber-500/20">
                  <MapPin size={20} className="text-amber-500" />
                </div>
                <div className="h-2 w-24 bg-white/10 rounded-full mt-2" />
                <div className="h-2 w-full bg-white/5 rounded-full" />
                <div className="h-2 w-2/3 bg-white/5 rounded-full" />
              </div>

              {/* Card 2  - Primary */}
              <div className="flex flex-col gap-4 border border-white/10 bg-white/[0.03] rounded-2xl p-6 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-500/20 blur-3xl rounded-full" />
                <div className="h-10 w-10 rounded-full bg-indigo-500/10 flex items-center justify-center border border-indigo-500/20">
                  <GlobeHemisphereWest size={20} className="text-indigo-400" />
                </div>
                <div className="h-2 w-32 bg-white/20 rounded-full mt-2" />
                <div className="h-2 w-full bg-white/10 rounded-full" />
                <div className="h-2 w-full bg-white/10 rounded-full" />
                <div className="h-2 w-4/5 bg-white/10 rounded-full" />
              </div>

              {/* Card 3 */}
              <div className="flex flex-col gap-4 border border-white/5 bg-white/[0.01] rounded-2xl p-6">
                <div className="h-10 w-10 rounded-full bg-emerald-500/10 flex items-center justify-center border border-emerald-500/20">
                  <Sparkle size={20} className="text-emerald-500" />
                </div>
                <div className="h-2 w-20 bg-white/10 rounded-full mt-2" />
                <div className="h-2 w-full bg-white/5 rounded-full" />
                <div className="h-2 w-1/2 bg-white/5 rounded-full" />
              </div>
            </div>

            {/* Center HUD Element */}
            <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col items-center z-20">
              <div className="px-6 h-16 rounded-full border border-white/20 bg-black flex items-center justify-center shadow-[0_0_50px_rgba(251,191,36,0.15)] relative">
                <div className="absolute inset-0 rounded-full border border-amber-500/30 animate-[spin_4s_linear_infinite]" />
                <RaahiLogo size="sm" />
              </div>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <div className="relative z-10 pb-8 flex flex-col justify-center items-center gap-2">
        <Mouse size={20} className="text-white/20" />
        <span className="text-[10px] uppercase font-semibold tracking-[0.2em] text-white/20">Scroll to explore</span>
      </div>
    </section>
  );
}
