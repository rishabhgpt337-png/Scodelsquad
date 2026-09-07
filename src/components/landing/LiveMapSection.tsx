"use client";

import { useEffect, useRef } from "react";
import { animate, stagger } from "animejs";
import RaahiLiveMap from "@/components/map/RaahiLiveMap";
import SmartRadar from "@/components/landing/SmartRadar";

export default function LiveMapSection() {
  const headerRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            if (entry.target === headerRef.current && headerRef.current) {
              animate(headerRef.current.children, {
                translateY: [25, 0],
                opacity: [0, 1],
                duration: 800,
                ease: "outExpo",
                delay: stagger(100),
              });
              observer.unobserve(entry.target);
            } else if (entry.target === containerRef.current && containerRef.current) {
              animate(containerRef.current, {
                translateY: [40, 0],
                opacity: [0, 1],
                scale: [0.98, 1],
                duration: 900,
                ease: "outExpo",
              });
              observer.unobserve(entry.target);
            }
          }
        });
      },
      { threshold: 0.1 }
    );

    if (headerRef.current) observer.observe(headerRef.current);
    if (containerRef.current) observer.observe(containerRef.current);

    return () => observer.disconnect();
  }, []);

  return (
    <section
      id="live-radar"
      className="py-24 md:py-28 px-6 sm:px-8 md:px-12 lg:px-16 xl:px-20 bg-slate-950 relative overflow-hidden border-t border-white/[0.06]"
    >
      {/* Background ambient lighting */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[800px] h-[500px] bg-amber-500/5 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Section Header */}
        <div ref={headerRef} className="max-w-2xl mb-12 md:mb-16">
          <div className="opacity-0 flex items-center gap-3 mb-3.5">
            <span className="w-8 h-[1.5px] bg-amber-400/80" />
            <span className="text-[10px] font-extrabold tracking-[0.35em] uppercase text-amber-400">
              Spatial Intelligence
            </span>
          </div>
          <h2 className="opacity-0 text-3xl sm:text-4xl md:text-[2.75rem] font-bold text-white tracking-tight leading-[1.15] mb-4">
            Real-Time Radar & <span className="text-amber-400">Live Spatial Map</span>
          </h2>
          <p className="opacity-0 text-white/50 text-sm sm:text-base leading-relaxed">
            Scan ASI-verified monuments, certified artisan guilds, hidden generational culinary institutions, and live surge alerts synced with your active destination.
          </p>
        </div>

        {/* Unified 2-Column Command Hub */}
        <div
          ref={containerRef}
          className="opacity-0 grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch"
        >
          {/* Interactive Map Column */}
          <div className="lg:col-span-7 xl:col-span-7 flex flex-col">
            <RaahiLiveMap />
          </div>

          {/* Smart Radar Assistant Column */}
          <div className="lg:col-span-5 xl:col-span-5 flex flex-col justify-between">
            <SmartRadar />
          </div>
        </div>
      </div>
    </section>
  );
}
