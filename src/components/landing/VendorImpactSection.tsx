"use client";

import { motion } from "motion/react";
import { ArrowRight, CheckCircle, SealCheck, Users, CurrencyInr, Star } from "@phosphor-icons/react";

const STATS = [
  { value: "100%", label: "Direct Vendor Payout", desc: "No aggregator commissions deducted", icon: <CurrencyInr size={24} /> },
  { value: "4.8", label: "Guide & Artisan Rating", desc: "Peer-reviewed by verified travelers", icon: <Star size={24} /> },
  { value: "1,200+", label: "Generational Artisans", desc: "Weavers, sculptors, and heritage guides", icon: <Users size={24} /> },
  { value: "₹2.4 Cr", label: "Direct Local Impact", desc: "Generated for local Indian families", icon: <SealCheck size={24} /> },
];

export default function VendorImpactSection() {
  return (
    <section
      id="about"
      className="py-28 px-6 bg-[#050505] relative border-t border-white/[0.05]"
    >
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col lg:flex-row gap-16 items-center">

          {/* Content */}
          <div className="flex-1 space-y-8">
            <h2 className="text-4xl md:text-5xl font-semibold text-white tracking-[-0.02em]">
              Architecting Impact, <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-300 to-emerald-600">
                Preserving Heritage.
              </span>
            </h2>
            <p className="text-white/50 text-lg font-light leading-relaxed max-w-lg">
              Mass tourism exploits local craftsmen. Raahi enables direct digital connection to the source, ensuring every transaction empowers traditional communities while honoring their legacy.
            </p>

            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="px-8 py-4 rounded-full bg-white/[0.05] border border-white/[0.1] text-white hover:bg-white/[0.1] transition-all flex items-center gap-2"
            >
              Learn about our Impact Engine <ArrowRight size={16} />
            </motion.button>
          </div>

          {/* Bento Stats */}
          <div className="flex-1 w-full grid grid-cols-1 sm:grid-cols-2 gap-4">
            {STATS.map((stat, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                className="bg-white/[0.02] border border-white/[0.05] rounded-3xl p-6 hover:bg-white/[0.04] transition-colors"
              >
                <div className="text-emerald-400 mb-4">{stat.icon}</div>
                <div className="text-3xl font-bold text-white mb-1 tabular-nums">{stat.value}</div>
                <div className="text-sm font-medium text-white mb-1">{stat.label}</div>
                <div className="text-xs text-white/40">{stat.desc}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
