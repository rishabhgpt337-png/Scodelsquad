"use client";

import { useEffect, useRef } from "react";
import { animate, stagger } from "animejs";
import RaahiLiveMap from "@/components/map/RaahiLiveMap";

export default function LiveMapSection() {
  const headerRef = useRef<HTMLDivElement>(null);
  const mapContainerRef = useRef<HTMLDivElement>(null);

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
            } else if (entry.target === mapContainerRef.current && mapContainerRef.current) {
              animate(mapContainerRef.current, {
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
      { threshold: 0.15 }
    );

    if (headerRef.current) observer.observe(headerRef.current);
    if (mapContainerRef.current) observer.observe(mapContainerRef.current);

    return () => observer.disconnect();
  }, []);

  return (
    <section
      id="live-radar"
      className="py-28 px-8 md:px-16 lg:px-20 bg-slate-950 relative overflow-hidden border-t border-white/[0.05]"
    >
      <div className="max-w-6xl mx-auto relative z-10">
        {/* Section Header */}
        <div ref={headerRef} className="max-w-xl mb-12">
          <div className="opacity-0 flex items-center gap-3 mb-4">
            <span className="w-8 h-[1.5px] bg-amber-400/60" />
            <span className="text-[10px] font-bold tracking-[0.35em] uppercase text-amber-400/90">
              Live Spatial Radar
            </span>
          </div>
          <h2 className="opacity-0 text-3xl md:text-[2.75rem] font-bold text-white tracking-tight leading-[1.15] mb-5">
            Real-Time Heritage <span className="text-amber-400">& Discovery</span>
          </h2>
          <p className="opacity-0 text-white/50 text-base leading-relaxed">
            Scan verified monuments, certified generational artisan workshops, authentic culinary spots, and registered guides around your exact live location.
          </p>
        </div>

        {/* Live Map Frame */}
        <div ref={mapContainerRef} className="opacity-0">
          <RaahiLiveMap />
        </div>
      </div>
    </section>
  );
}
