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
  // Sophisticated luxury resort typography scaling
  const sizeMap = {
    sm: "text-2xl tracking-[0.05em]",
    md: "text-4xl tracking-[0.05em]",
    lg: "text-6xl tracking-[0.05em]",
    xl: "text-8xl tracking-[0.05em]",
  };

  const currentTextSize = sizeMap[size];

  return (
    <div className={`inline-flex flex-col items-center select-none group ${className}`}>
      {/* Elegant Serif Logo */}
      <span
        className={`font-medium text-[#F3EDE3] transition-all duration-500 drop-shadow-sm ${currentTextSize}`}
        style={{ fontFamily: "var(--font-playfair, serif)", lineHeight: "1" }}
      >
        RAAHI
      </span>
      {/* Minimal luxury subtitle if desired, or just dot. We'll stick to simple minimal dot representation or remove it. Let's use a subtle line under it for larger sizes, but original had a dot. We'll use a very subtle luxury dot. */}
      {size !== 'sm' && (
        <span className="w-1.5 h-1.5 rounded-full bg-[#C8B79F] mt-2 opacity-80" />
      )}
    </div>
  );
}
