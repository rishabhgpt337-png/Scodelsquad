"use client";

import { useState, useEffect, useRef } from "react";
import { MagnifyingGlass, MapPin, Check, SpinnerGap, CaretDown, NavigationArrow } from "@phosphor-icons/react";
import { useDestination, Destination } from "@/context/DestinationContext";

interface DestinationSearchProps {
  onSelect?: (destination: Destination) => void;
  inline?: boolean;
}

export default function DestinationSearch({ onSelect, inline = false }: DestinationSearchProps) {
  const { destination, setDestination } = useDestination();
  const [query, setQuery] = useState<string>("");
  const [suggestions, setSuggestions] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const wrapperRef = useRef<HTMLDivElement>(null);

  // Close suggestions when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSearch = async (text: string) => {
    setQuery(text);
    if (!text.trim() || text.length < 2) {
      setSuggestions([]);
      setIsOpen(false);
      return;
    }

    setIsOpen(true);
    setIsLoading(true);

    try {
      const response = await fetch('/api/places/search', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ query: text }),
      });

      if (response.ok) {
        const data = await response.json();
        setSuggestions(data.places || []);
      }
    } catch (error) {
      console.error("Search failed:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSelect = (place: any) => {
    const newDest: Destination = {
      id: place.id,
      name: place.displayName?.text || place.formattedAddress?.split(',')[0],
      state: place.formattedAddress?.split(',').slice(-2, -1)[0]?.trim(),
      country: place.formattedAddress?.split(',').slice(-1)[0]?.trim(),
      location: place.location ? { lat: place.location.latitude, lng: place.location.longitude } : undefined
    };

    setDestination(newDest);
    setQuery("");
    setIsOpen(false);

    if (onSelect) {
      onSelect(newDest);
    }
  };

  const handleDetectLocation = () => {
    if (!navigator.geolocation) return;

    setIsLoading(true);
    setQuery("Detecting current location...");

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        try {
          // Find via nearby search context mapping to a city level if possible
          // For now, default construct a current location object
          const newDest: Destination = {
            id: 'current_location',
            name: 'Current Location',
            location: {
              lat: position.coords.latitude,
              lng: position.coords.longitude
            }
          };
          setDestination(newDest);
          setQuery("");
          if (onSelect) onSelect(newDest);
        } catch (error) {
          console.error(error);
          setQuery("");
        } finally {
          setIsLoading(false);
        }
      },
      () => {
        setIsLoading(false);
        setQuery("");
      }
    );
  };

  if (inline && destination) {
    return (
      <div className="bg-emerald-950/40 border border-emerald-400/30 rounded-xl px-4 py-3 flex items-center justify-between text-white text-sm shadow-sm backdrop-blur-md">
        <span className="flex items-center gap-3">
          <MapPin size={22} className="text-emerald-400 shrink-0" weight="fill" />
          <div className="flex flex-col">
            <strong className="text-emerald-400 font-bold tracking-wide">{destination.name}</strong>
            <span className="text-xs text-emerald-400/70">{destination.state || destination.country}</span>
          </div>
        </span>
        <button
          onClick={() => {
            setDestination(null);
          }}
          className="text-xs text-white/50 hover:text-white uppercase font-bold tracking-widest border border-white/10 hover:border-white/30 rounded-md px-3 py-1.5 transition-all"
        >
          Change
        </button>
      </div>
    );
  }

  if (destination && !inline) {
    return (
      <div className="bg-slate-900 border border-emerald-500/[0.15] bg-gradient-to-r from-slate-900 to-emerald-950/20 rounded-2xl p-8 shadow-sm relative overflow-hidden group">
        <div className="absolute inset-0 bg-emerald-400/5 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
        <h3 className="text-lg font-bold mb-4 flex items-center gap-3 text-white">
          <Check size={24} weight="bold" className="text-emerald-400 bg-emerald-400/10 p-1 rounded-full" />
          Destination Confirmed
        </h3>

        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-4xl font-bold text-white mb-2">{destination.name}</h2>
            <p className="text-emerald-400 font-medium tracking-wide">{destination.state && `${destination.state}, `}{destination.country}</p>
          </div>
          <button
            onClick={() => setDestination(null)}
            className="bg-slate-950/50 hover:bg-slate-950 border border-white/[0.1] text-white/80 hover:text-white text-sm font-bold uppercase tracking-wider px-5 py-3 rounded-xl transition-all"
          >
            Change Goal
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className={`relative ${inline ? '' : 'bg-slate-900 border border-white/[0.08] rounded-2xl p-6 md:p-8 shadow-sm flex flex-col'}`} ref={wrapperRef}>
      {!inline && (
        <h3 className="text-lg font-bold mb-6 flex items-center justify-between text-white">
          <span className="flex items-center gap-3">
            <MapPin size={22} className="text-amber-400" />
            Where do you want to explore?
          </span>
          <button
            onClick={handleDetectLocation}
            className="flex items-center gap-2 text-xs font-semibold px-3 py-2 bg-amber-400/10 text-amber-400 hover:bg-amber-400/20 rounded-lg transition-colors border border-amber-400/20"
          >
            <NavigationArrow size={14} weight="bold" />
            <span>Use My Location</span>
          </button>
        </h3>
      )}

      <div className="relative w-full z-20">
        <input
          type="text"
          value={query}
          onChange={(e) => handleSearch(e.target.value)}
          placeholder="Search any city, town, or monument worldwide..."
          className="w-full bg-slate-950 border border-white/[0.15] hover:border-white/[0.25] text-white text-base md:text-lg rounded-xl pl-12 pr-12 py-4 focus:outline-none focus:border-amber-400 focus:ring-1 focus:ring-amber-400/50 transition-all shadow-inner"
        />
        <MagnifyingGlass
          size={20}
          className="absolute left-4 top-1/2 -translate-y-1/2 text-white/40"
          weight="bold"
        />

        {isLoading && (
          <SpinnerGap size={20} className="absolute right-4 top-1/2 -translate-y-1/2 text-amber-400 animate-spin" />
        )}

        {isOpen && suggestions.length > 0 && (
          <ul className="absolute top-[calc(100%+8px)] left-0 right-0 bg-slate-900 border border-white/[0.15] rounded-xl shadow-2xl overflow-hidden z-30 max-h-80 overflow-y-auto">
            {suggestions.map((item, idx) => {
              const name = item.displayName?.text || item.formattedAddress;
              const subtext = item.formattedAddress;

              return (
                <li
                  key={item.id || idx}
                  onClick={() => handleSelect(item)}
                  className="px-5 py-4 hover:bg-slate-800 cursor-pointer flex items-center gap-4 border-b border-white/[0.05] last:border-0 transition-colors group"
                >
                  <div className="w-10 h-10 rounded-full bg-slate-950 flex items-center justify-center shrink-0 border border-white/[0.05] group-hover:border-amber-400/30 group-hover:text-amber-400 transition-colors text-white/50">
                    <MapPin size={18} weight="fill" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <span className="font-bold text-white block truncate text-base">{name}</span>
                    {subtext && name !== subtext && (
                      <span className="text-xs text-white/50 truncate block mt-0.5">{subtext}</span>
                    )}
                  </div>
                </li>
              );
            })}
          </ul>
        )}

        {isOpen && !isLoading && suggestions.length === 0 && query.length >= 2 && (
          <div className="absolute top-[calc(100%+8px)] left-0 right-0 bg-slate-900 border border-white/[0.15] rounded-xl shadow-2xl p-6 text-center z-30">
            <span className="text-white/50 text-sm">No destinations found matching "{query}"</span>
          </div>
        )}
      </div>

      {!inline && (
        <div className="mt-4 flex flex-wrap gap-2">
          <span className="text-xs text-white/40 font-medium py-1.5 px-1 uppercase tracking-wider mr-1">Trending:</span>
          {["Varanasi", "Kyoto", "Santorini", "Bali", "Leh"].map(city => (
            <button
              key={city}
              onClick={() => handleSearch(city)}
              className="text-xs font-semibold px-3 py-1.5 bg-white/[0.03] hover:bg-white/[0.08] text-white/70 rounded-full border border-white/[0.05] transition-colors"
            >
              {city}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
