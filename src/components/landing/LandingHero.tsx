"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "motion/react";
import { Sparkle, ArrowRight, Spinner } from "@phosphor-icons/react";
import RaahiLogo from "@/components/common/RaahiLogo";
import UserNav from "@/components/auth/UserNav";
import { useAuth } from "@/context/AuthContext";

export default function LandingHero() {
  const router = useRouter();
  const { user, signInWithGoogle } = useAuth();
  const [isSigningIn, setIsSigningIn] = useState(false);

  const handleLaunchBuilder = async () => {
    if (user) {
      router.push("/trip-planner");
      return;
    }

    try {
      setIsSigningIn(true);
      await signInWithGoogle();
      router.push("/trip-planner");
    } catch (error) {
      console.error("Authentication required or cancelled:", error);
    } finally {
      setIsSigningIn(false);
    }
  };

  return (
    <section className="relative w-full min-h-screen flex flex-col bg-[#0D0C0A] overflow-hidden selection:bg-[#C8B79F]/30 selection:text-[#F3EDE3]">
      {/* Cinematic Dark Warm Background */}
      <div className="absolute inset-0 z-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 brightness-75 contrast-150 mix-blend-overlay pointer-events-none" />
      <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
        <div className="absolute top-[-10%] left-[-10%] w-[600px] h-[600px] bg-[#211B16] rounded-full blur-[140px] opacity-40 mix-blend-screen" />
        <div className="absolute bottom-[-20%] right-[-10%] w-[800px] h-[800px] bg-[#1A1612] rounded-full blur-[160px] opacity-60 mix-blend-screen" />
      </div>

      {/* Floating Nano-Nav */}
      <div className="relative z-50 w-full px-6 pt-10 flex justify-center">
        <nav className="w-full max-w-6xl bg-white/[0.02] backdrop-blur-xl border border-white/[0.08] rounded-xl h-16 flex items-center justify-between px-6 sm:px-8 shadow-sm">
          <RaahiLogo size="sm" />

          <div className="hidden md:flex items-center gap-10 text-[13px] tracking-wide font-medium text-[#A9A096]">
            <a href="#features" className="hover:text-[#F3EDE3] transition-colors duration-300">Features</a>
            <a href="#impact" className="hover:text-[#F3EDE3] transition-colors duration-300">Impact</a>
            <a href="#technology" className="hover:text-[#F3EDE3] transition-colors duration-300">Technology</a>
            <a href="/assistant" className="text-[#C8B79F] hover:text-[#E8DAC2] transition-colors duration-300 flex items-center gap-1.5 font-medium">
              <Sparkle weight="fill" size={12} className="text-[#C8B79F]" />
              <span>Concierge</span>
            </a>
          </div>

          <div className="flex items-center gap-4">
            <UserNav />
          </div>
        </nav>
      </div>

      {/* Hero Content Main Stage */}
      <div className="relative z-10 flex-1 flex flex-col items-center pt-32 md:pt-40 px-6 text-center">

        {/* Editorial Headline */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1, ease: "easeOut" }}
          className="text-5xl md:text-7xl lg:text-[90px] font-normal text-[#F3EDE3] leading-[1.1] max-w-5xl"
          style={{ fontFamily: "var(--font-playfair, serif)" }}
        >
          Architect The Perfect <br />
          <span className="italic text-[#C8B79F] font-light">
            Journey.
          </span>
        </motion.h1>

        {/* Sub-headline */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
          className="mt-10 text-base md:text-lg text-[#A9A096] max-w-2xl font-light leading-relaxed tracking-wide"
        >
          An advanced intelligence layer mapping India's vast heritage. Generate hyper-personalized, artisan-verified itineraries with precision mapping and local insights.
        </motion.p>

        {/* Actions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" }}
          className="mt-12 flex flex-col sm:flex-row items-center gap-6 w-full sm:w-auto"
        >
          <button
            onClick={handleLaunchBuilder}
            disabled={isSigningIn}
            className="w-full sm:w-auto px-10 py-4 bg-[#F3EDE3] text-[#0D0C0A] font-medium text-[13px] tracking-widest uppercase hover:bg-white transition-all duration-300 flex items-center justify-center gap-3 disabled:opacity-70 shadow-lg cursor-pointer"
          >
            {isSigningIn ? (
              <>
                <Spinner size={16} className="animate-spin" />
                <span>Authorizing...</span>
              </>
            ) : (
              <>
                Launch Builder <ArrowRight size={16} />
              </>
            )}
          </button>

          <button
            onClick={() => router.push("/assistant")}
            className="w-full sm:w-auto px-10 py-4 border border-white/[0.15] hover:border-white/[0.3] text-[#F3EDE3] font-medium text-[13px] tracking-widest uppercase transition-all duration-300 flex items-center justify-center gap-3 bg-white/[0.02] backdrop-blur-md cursor-pointer"
          >
            Ask Concierge
          </button>
        </motion.div>
      </div>
    </section>
  );
}
