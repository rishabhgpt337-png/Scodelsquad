"use client";

import { motion } from "motion/react";
import { Handshake, CurrencyInr, ShieldCheck, Sparkle, ArrowRight } from "@phosphor-icons/react";

const STATS = [
  { value: "100%", label: "Direct Vendor Payout", desc: "No aggregator commissions deducted" },
  { value: "4.8/5", label: "Guide & Artisan Rating", desc: "Peer-reviewed by verified travelers" },
  { value: "1,200+", label: "Generational Artisans", desc: "Weavers, sculptors, and heritage guides" },
  { value: "₹2.4 Cr", label: "Direct Local Impact", desc: "Generated for local Indian families" },
];

export default function VendorImpactSection() {
  return (
    <section className="py-24 px-6 md:px-12 bg-slate-950 relative overflow-hidden border-t border-white/5">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-16">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-400/10 border border-emerald-400/20 text-emerald-400 text-xs font-semibold uppercase tracking-wider mb-4">
              Local First Economy
            </div>
            <h2 className="text-3xl md:text-5xl font-extrabold text-white tracking-tight leading-tight mb-6">
              Empowering India's True <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-teal-300">Culture Keepers</span>
            </h2>
            <p className="text-white/70 text-base leading-relaxed mb-6">
              Mass tourism often exploits local craftsmen while foreign middlemen take 30-40% cuts. Raahi provides a verified digital identity and UPI-direct booking to real artisans, traditional boatmen, and certified storytellers.
            </p>

            <div className="space-y-3 mb-8">
              <div className="flex items-center gap-3 text-sm text-white/80">
                <div className="w-5 h-5 rounded-full bg-emerald-400/20 text-emerald-400 flex items-center justify-center shrink-0">
                  ✓
                </div>
                <span>Government ID & Police Verified local partners</span>
              </div>
              <div className="flex items-center gap-3 text-sm text-white/80">
                <div className="w-5 h-5 rounded-full bg-emerald-400/20 text-emerald-400 flex items-center justify-center shrink-0">
                  ✓
                </div>
                <span>Transparent fixed pricing with zero bargaining hassle</span>
              </div>
              <div className="flex items-center gap-3 text-sm text-white/80">
                <div className="w-5 h-5 rounded-full bg-emerald-400/20 text-emerald-400 flex items-center justify-center shrink-0">
                  ✓
                </div>
                <span>Support preserving UNESCO intangible cultural heritage</span>
              </div>
            </div>

            <div className="flex flex-wrap gap-4">
              <a
                href="#partner-apply"
                onClick={(e) => {
                  e.preventDefault();
                  alert("Artisan / Guide Partner onboarding form opening!");
                }}
                className="bg-emerald-500 hover:bg-emerald-600 text-slate-950 font-bold px-6 py-3.5 rounded-xl text-sm transition-all flex items-center gap-2 shadow-lg shadow-emerald-500/20"
              >
                Join as Local Partner
                <ArrowRight size={16} weight="bold" />
              </a>
            </div>
          </div>

          {/* Impact Stats Grid */}
          <div className="grid grid-cols-2 gap-4">
            {STATS.map((stat, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: idx * 0.1 }}
                className="bg-slate-900 border border-white/10 rounded-2xl p-6 flex flex-col justify-center text-center hover:border-emerald-400/30 transition-all"
              >
                <div className="text-3xl md:text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-teal-300 mb-1">
                  {stat.value}
                </div>
                <div className="text-xs font-bold text-white mb-1">{stat.label}</div>
                <div className="text-[11px] text-white/50">{stat.desc}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}