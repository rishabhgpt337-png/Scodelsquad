"use client";

import { motion } from "motion/react";
import { ArrowRight, CheckCircle } from "@phosphor-icons/react";

const STATS = [
  { value: "100%", label: "Direct Vendor Payout", desc: "No aggregator commissions deducted" },
  { value: "4.8", label: "Guide & Artisan Rating", desc: "Peer-reviewed by verified travelers" },
  { value: "1,200+", label: "Generational Artisans", desc: "Weavers, sculptors, and heritage guides" },
  { value: "₹2.4 Cr", label: "Direct Local Impact", desc: "Generated for local Indian families" },
];

const TRUST_POINTS = [
  "Government ID & Police Verified local partners",
  "Transparent fixed pricing with zero bargaining hassle",
  "Support preserving UNESCO intangible cultural heritage",
];

export default function VendorImpactSection() {
  return (
    <section
      id="about"
      className="py-28 px-8 md:px-16 lg:px-20 bg-slate-950 relative overflow-hidden border-t border-white/[0.05]"
    >
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Left: Copy */}
          <div>
            <div className="flex items-center gap-3 mb-5">
              <span className="w-8 h-[1.5px] bg-emerald-400/50" />
              <span className="text-[10px] font-bold tracking-[0.35em] uppercase text-emerald-400/80">
                Local First Economy
              </span>
            </div>
            <h2 className="text-3xl md:text-[2.75rem] font-bold text-white tracking-tight leading-[1.15] mb-6">
              Empowering India's True{" "}
              <span className="text-emerald-400">Culture Keepers</span>
            </h2>
            <p className="text-white/50 text-base leading-relaxed mb-8">
              Mass tourism often exploits local craftsmen while foreign middlemen take 30–40% cuts. Raahi provides a verified digital identity and UPI-direct booking to real artisans, traditional boatmen, and certified storytellers.
            </p>

            <ul className="space-y-3 mb-10">
              {TRUST_POINTS.map((point, i) => (
                <li key={i} className="flex items-start gap-3 text-sm text-white/65">
                  <CheckCircle size={16} weight="fill" className="text-emerald-400 shrink-0 mt-0.5" />
                  <span>{point}</span>
                </li>
              ))}
            </ul>

            <a
              href="#partner-apply"
              onClick={(e) => {
                e.preventDefault();
                alert("Artisan / Guide Partner onboarding form opening!");
              }}
              className="inline-flex items-center gap-2 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-semibold px-6 py-3.5 rounded-full text-sm transition-all duration-200"
            >
              Join as Local Partner
              <ArrowRight size={15} weight="bold" />
            </a>
          </div>

          {/* Right: Stats */}
          <div className="grid grid-cols-2 gap-4">
            {STATS.map((stat, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: idx * 0.1 }}
                className="bg-slate-900/80 border border-white/[0.07] rounded-2xl p-6 flex flex-col hover:border-emerald-400/20 transition-all duration-300"
              >
                <div className="text-3xl md:text-4xl font-bold text-emerald-400 mb-2 tabular-nums">
                  {stat.value}
                </div>
                <div className="text-xs font-semibold text-white mb-1">{stat.label}</div>
                <div className="text-[11px] text-white/40 leading-snug">{stat.desc}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
