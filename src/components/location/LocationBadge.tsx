"use client";

import { useGeolocation } from "@/hooks/useGeolocation";
import { MapPin, NavigationArrow, WarningCircle } from "@phosphor-icons/react";

interface LocationBadgeProps {
  className?: string;
}

export default function LocationBadge({ className = "" }: LocationBadgeProps) {
  const { lat, lng, loading, error } = useGeolocation();

  const formatCoords = (latitude: number, longitude: number) => {
    const latDir = latitude >= 0 ? "N" : "S";
    const lngDir = longitude >= 0 ? "E" : "W";
    return `${Math.abs(latitude).toFixed(2)}°${latDir}, ${Math.abs(longitude).toFixed(2)}°${lngDir}`;
  };

  if (loading) {
    return (
      <div
        className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-slate-900/80 border border-white/[0.08] backdrop-blur-md text-[11px] font-medium text-white/70 shadow-sm ${className}`}
        title="Detecting your current location..."
      >
        <span className="relative flex h-2 w-2">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75"></span>
          <span className="relative inline-flex rounded-full h-2 w-2 bg-amber-400"></span>
        </span>
        <span className="tracking-wide">Locating…</span>
      </div>
    );
  }

  if (error || lat === null || lng === null) {
    return (
      <div
        className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-rose-950/40 border border-rose-500/20 backdrop-blur-md text-[11px] font-medium text-rose-300 shadow-sm ${className}`}
        title={error || "Location unavailable"}
      >
        <span className="h-2 w-2 rounded-full bg-rose-500 shrink-0" />
        <span className="tracking-wide truncate max-w-[280px]">
          Location unavailable — enable it for personalized results
        </span>
      </div>
    );
  }

  return (
    <div
      className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-slate-900/80 border border-amber-400/30 backdrop-blur-md text-[11px] font-medium text-white/90 shadow-sm ${className}`}
      title={`Live GPS locked: ${lat}, ${lng}`}
    >
      <span className="relative flex h-2 w-2 shrink-0">
        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75"></span>
        <span className="relative inline-flex rounded-full h-2 w-2 bg-amber-400"></span>
      </span>
      <NavigationArrow size={12} weight="fill" className="text-amber-400 shrink-0" />
      <span className="font-mono tracking-tight text-white/80">
        {formatCoords(lat, lng)}
      </span>
    </div>
  );
}
