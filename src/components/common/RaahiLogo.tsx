"use client";

interface RaahiLogoProps {
  size?: "sm" | "md" | "lg" | "xl";
  showText?: boolean;
  className?: string;
  variant?: "light" | "dark" | "gold";
}

export default function RaahiLogo({
  size = "md",
  showText = true,
  className = "",
  variant = "gold",
}: RaahiLogoProps) {
  const sizeMap = {
    sm: { icon: 26, text: "text-lg", sub: "text-[8px] tracking-[0.25em]" },
    md: { icon: 34, text: "text-2xl", sub: "text-[9px] tracking-[0.3em]" },
    lg: { icon: 44, text: "text-3xl", sub: "text-[10px] tracking-[0.35em]" },
    xl: { icon: 56, text: "text-4xl", sub: "text-[11px] tracking-[0.4em]" },
  };

  const currentSize = sizeMap[size];

  return (
    <div className={`inline-flex items-center gap-3 select-none ${className}`}>
      {/* Precision Vector Emblem */}
      <div className="relative flex items-center justify-center shrink-0">
        <svg
          width={currentSize.icon}
          height={currentSize.icon}
          viewBox="0 0 100 100"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="drop-shadow-[0_4px_16px_rgba(245,158,11,0.35)] transition-transform duration-300 hover:scale-105"
        >
          <defs>
            {/* Ambient Background Gradient */}
            <linearGradient id="raahi-bg" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#1E293B" />
              <stop offset="100%" stopColor="#0B132B" />
            </linearGradient>

            {/* Radiant Gold Gradient */}
            <linearGradient id="raahi-gold" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#FDE68A" />
              <stop offset="35%" stopColor="#F59E0B" />
              <stop offset="100%" stopColor="#D97706" />
            </linearGradient>

            {/* Ember Accent Gradient */}
            <linearGradient id="raahi-ember" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#FB923C" />
              <stop offset="100%" stopColor="#DC2626" />
            </linearGradient>

            {/* Subtle Outer Glow Filter */}
            <filter id="gold-glow" x="-20%" y="-20%" width="140%" height="140%">
              <feGaussianBlur stdDeviation="3" result="blur" />
              <feComposite in="SourceGraphic" in2="blur" operator="over" />
            </filter>
          </defs>

          {/* Outer Rounded Shield / Frame */}
          <rect
            x="4"
            y="4"
            width="92"
            height="92"
            rx="24"
            fill="url(#raahi-bg)"
            stroke="url(#raahi-gold)"
            strokeWidth="2.5"
            strokeOpacity="0.5"
          />

          {/* Concentric Subtle Orbit Rings */}
          <circle
            cx="50"
            cy="50"
            r="34"
            stroke="white"
            strokeOpacity="0.08"
            strokeWidth="1.5"
            strokeDasharray="4 4"
          />
          <circle
            cx="50"
            cy="50"
            r="24"
            stroke="url(#raahi-gold)"
            strokeOpacity="0.2"
            strokeWidth="1"
          />

          {/* Cardinal Coordinate Ticks */}
          <line x1="50" y1="12" x2="50" y2="18" stroke="url(#raahi-gold)" strokeWidth="2.5" strokeLinecap="round" />
          <line x1="88" y1="50" x2="82" y2="50" stroke="url(#raahi-gold)" strokeWidth="2" strokeLinecap="round" strokeOpacity="0.6" />
          <line x1="50" y1="88" x2="50" y2="82" stroke="url(#raahi-gold)" strokeWidth="2" strokeLinecap="round" strokeOpacity="0.6" />
          <line x1="12" y1="50" x2="18" y2="50" stroke="url(#raahi-gold)" strokeWidth="2" strokeLinecap="round" strokeOpacity="0.6" />

          {/* Intertwined 'R' & Dynamic Pathfinder Needle */}
          {/* Path 1: Infinite Journey Loop (The Road / Arch) */}
          <path
            d="M28 68 C28 42, 42 30, 60 30 C74 30, 80 40, 74 52 C68 64, 48 60, 48 72"
            stroke="url(#raahi-gold)"
            strokeWidth="5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />

          {/* Path 2: Dynamic Compass North Pointer (The Pathfinder) */}
          <path
            d="M50 20 L58 46 L50 40 L42 46 Z"
            fill="url(#raahi-gold)"
            filter="url(#gold-glow)"
          />

          {/* Southern Compass Shadow Needle */}
          <path
            d="M50 80 L44 58 L50 62 L56 58 Z"
            fill="url(#raahi-ember)"
            opacity="0.85"
          />

          {/* Center Waypoint Core */}
          <circle cx="50" cy="50" r="4.5" fill="#FFF" />
          <circle cx="50" cy="50" r="2.5" fill="#B45309" />

          {/* North Star Sparkle Accent */}
          <path
            d="M74 24 L76 18 L78 24 L84 26 L78 28 L76 34 L74 28 L68 26 Z"
            fill="url(#raahi-gold)"
            opacity="0.9"
          />
        </svg>
      </div>

      {/* Bespoke Wordmark */}
      {showText && (
        <div className="flex flex-col justify-center leading-none">
          <div className="flex items-center gap-1">
            <span
              className={`font-black tracking-tight ${currentSize.text} bg-gradient-to-r from-amber-200 via-amber-400 to-orange-400 bg-clip-text text-transparent drop-shadow-sm`}
              style={{ fontFamily: "var(--font-display, system-ui)" }}
            >
              Raahi
            </span>
            <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-pulse mb-2 shadow-[0_0_8px_#F59E0B]" />
          </div>
          <span
            className={`font-bold uppercase text-white/50 ${currentSize.sub}`}
            style={{ letterSpacing: "0.28em" }}
          >
            Bharat Explorer
          </span>
        </div>
      )}
    </div>
  );
}
