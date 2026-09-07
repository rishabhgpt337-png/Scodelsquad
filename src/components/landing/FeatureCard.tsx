"use client";

import { useRef, useEffect } from "react";
import { createAnimatable } from "animejs";

interface FeatureCardProps {
  feature: {
    icon: any;
    title: string;
    tagline: string;
    description: string;
    accent: string;
    accentBg: string;
    accentBorder: string;
  };
  index: number;
}

export default function FeatureCard({ feature, index }: FeatureCardProps) {
  const Icon = feature.icon;
  const cardRef = useRef<HTMLDivElement>(null);
  const animatableRef = useRef<any>(null);

  useEffect(() => {
    if (!cardRef.current) return;
    
    // Using Anime.js v4 Animatable API for unit-driven 3D transforms
    animatableRef.current = createAnimatable(cardRef.current, {
      rotateX: { unit: "deg", duration: 400, ease: "outQuad" },
      rotateY: { unit: "deg", duration: 400, ease: "outQuad" },
      translateY: { unit: "px", duration: 300, ease: "outCubic" },
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
    
    // Subtly rotate based on hover
    animatableRef.current.rotateY(normalizedX * 10);
    animatableRef.current.rotateX(-normalizedY * 10);
    animatableRef.current.translateY(-5); // Slight lift
  };

  const handleMouseLeave = () => {
    if (!animatableRef.current) return;
    
    // Reset state smoothly
    animatableRef.current.rotateX(0);
    animatableRef.current.rotateY(0);
    animatableRef.current.translateY(0);
  };

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="feature-card opacity-0 bg-slate-950 p-8 flex flex-col group hover:bg-slate-900/80 transition-colors duration-500 will-change-transform transform-style-3d cursor-default"
      style={{ perspective: "1000px", transformStyle: "preserve-3d" }}
    >
      <div 
        className={`w-10 h-10 rounded-lg ${feature.accentBg} border ${feature.accentBorder} flex items-center justify-center mb-5 shadow-lg group-hover:scale-110 transition-transform duration-500`}
        style={{ transform: "translateZ(20px)" }}
      >
        <Icon size={20} weight="duotone" className={feature.accent} />
      </div>
      <h3 
        className="text-lg font-semibold text-white mb-1 group-hover:text-amber-400 transition-colors duration-200"
        style={{ transform: "translateZ(10px)" }}
      >
        {feature.title}
      </h3>
      <div className="text-[11px] font-medium text-white/40 uppercase tracking-wider mb-3">
        {feature.tagline}
      </div>
      <p className="text-sm text-white/55 leading-relaxed mt-auto">
        {feature.description}
      </p>
    </div>
  );
}
