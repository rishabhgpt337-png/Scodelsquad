"use client";

import { useRef, useEffect } from "react";
import { useRouter } from "next/navigation";
import { MapPin, ArrowRight, Star } from "@phosphor-icons/react";
import { createAnimatable } from "animejs";

interface DestinationCardProps {
  dest: any;
  index: number;
}

export default function DestinationCard({ dest, index }: DestinationCardProps) {
  const router = useRouter();
  const cardRef = useRef<HTMLDivElement>(null);
  const animatableRef = useRef<any>(null);

  useEffect(() => {
    if (!cardRef.current) return;
    
    // Initialize Anime.js v4 Animatable Instance for 3D interactions
    animatableRef.current = createAnimatable(cardRef.current, {
      rotateX: { unit: "deg", duration: 400, ease: "outQuad" },
      rotateY: { unit: "deg", duration: 400, ease: "outQuad" },
      scale: { duration: 300, ease: "outQuad" }
    });
  }, []);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current || !animatableRef.current) return;
    
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left; 
    const y = e.clientY - rect.top;
    
    // Calculate normalized coordinates (-0.5 to 0.5)
    const normalizedX = (x / rect.width) - 0.5;
    const normalizedY = (y / rect.height) - 0.5;
    
    // Apply 3D rotation based on cursor position
    animatableRef.current.rotateY(normalizedX * 12);
    animatableRef.current.rotateX(-normalizedY * 12);
    animatableRef.current.scale(1.02);
  };

  const handleMouseLeave = () => {
    if (!animatableRef.current) return;
    // Reset to resting state
    animatableRef.current.rotateX(0);
    animatableRef.current.rotateY(0);
    animatableRef.current.scale(1);
  };

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="bg-slate-900 border border-white/[0.07] rounded-[1.25rem] overflow-hidden hover:border-white/[0.14] transition-all flex flex-col group cursor-pointer dest-card opacity-0 translate-y-6 will-change-transform transform-style-3d"
      onClick={() => router.push(`/trip?dest=${encodeURIComponent(dest.name)}`)}
      style={{ perspective: "1000px", transformStyle: "preserve-3d" }}
    >
      <div className="relative h-56 overflow-hidden">
        <div className="absolute inset-0 bg-slate-900/20 z-10 mix-blend-overlay" />
        <img
          src={dest.image}
          alt={dest.name}
          className="w-full h-full object-cover group-hover:scale-105 group-hover:rotate-1 transition-transform duration-700 ease-out"
        />
        <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-slate-900 to-transparent z-20" />
        
        <div className="absolute top-4 left-4 z-30 bg-slate-950/80 backdrop-blur-md border border-white/[0.1] px-2.5 py-1.5 rounded-lg flex items-center gap-1.5">
          <Star size={13} weight="fill" className="text-amber-400" />
          <span className="text-[11px] font-bold text-white leading-none">
            {dest.rating}
          </span>
        </div>
        
        <div className="absolute bottom-4 left-5 right-5 z-30">
          <div className="text-[10px] font-bold tracking-widest uppercase text-amber-400 mb-1.5 drop-shadow-md">
            {dest.tag}
          </div>
          <h3 className="text-2xl font-bold text-white drop-shadow-md leading-tight">
            {dest.name}
          </h3>
        </div>
      </div>

      <div className="p-6 flex flex-col flex-1 relative z-30 bg-slate-900" style={{ transform: "translateZ(30px)" }}>
        <div className="flex items-center gap-1.5 text-xs text-white/50 mb-3 font-medium">
          <MapPin size={14} className="text-emerald-400" />
          {dest.state}
        </div>
        
        <p className="text-sm text-white/60 leading-relaxed mb-6">
          {dest.desc}
        </p>

        <div className="mt-auto">
          <div className="text-[10px] uppercase tracking-wider text-white/30 font-bold mb-3">
            Journey Highlights
          </div>
          <div className="flex flex-wrap gap-2 mb-6">
            {dest.highlights.map((hlt: string, h: number) => (
              <span
                key={h}
                className="text-[11px] px-2.5 py-1.5 rounded-md bg-white/[0.04] border border-white/[0.06] text-white/70"
              >
                {hlt}
              </span>
            ))}
          </div>

          <div className="pt-5 border-t border-white/[0.08] flex items-center justify-between group-hover:border-amber-400/20 transition-colors">
            <span className="text-[13px] font-semibold text-white/80 group-hover:text-amber-400 transition-colors">
              Explore Master Plan
            </span>
            <div className="w-8 h-8 rounded-full bg-white/[0.04] flex items-center justify-center group-hover:bg-amber-400 group-hover:text-slate-950 transition-all duration-300">
              <ArrowRight size={14} weight="bold" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
