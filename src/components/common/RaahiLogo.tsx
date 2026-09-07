"use client";

interface RaahiLogoProps {
  size?: "sm" | "md" | "lg" | "xl";
  className?: string;
  variant?: "light" | "dark" | "gold"; // Preserved for API compatibility
}

export default function RaahiLogo({
  size = "md",
  className = "",
}: RaahiLogoProps) {
  // Sophisticated SaaS typography scaling
  const sizeMap = {
    sm: "text-xl tracking-[0.2em]",
    md: "text-3xl tracking-[0.2em]",
    lg: "text-5xl tracking-[0.2em]",
    xl: "text-7xl tracking-[0.2em]",
  };

  const dotSizeMap = {
    sm: "w-1.5 h-1.5 mb-1 ml-1",
    md: "w-2 h-2 mb-2 ml-1.5",
    lg: "w-3 h-3 mb-3 ml-2",
    xl: "w-4 h-4 mb-4 ml-3",
  };

  const currentTextSize = sizeMap[size];
  const currentDotSize = dotSizeMap[size];

  return (
    <div className={`inline-flex items-end select-none group ${className}`}>
      {/* Sleek, bold, modern all-caps wordmark */}
      <span
        className={`font-black uppercase text-transparent bg-clip-text bg-gradient-to-r from-white via-neutral-100 to-neutral-400 drop-shadow-sm group-hover:from-white group-hover:to-white transition-all duration-500 ${currentTextSize}`}
        style={{ fontFamily: "var(--font-dm-sans, system-ui, sans-serif)", lineHeight: "0.85" }}
      >
        RAAHI
      </span>
      {/* Elegant accent dot for SaaS AI aesthetic */}
      <span
        className={`rounded-full bg-amber-500 shadow-[0_0_12px_rgba(245,158,11,0.9)] ${currentDotSize}`}
      />
    </div>
  );
}
