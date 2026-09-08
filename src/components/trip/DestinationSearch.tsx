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
      <div className="bg-[#151310] border border-[#C8B79F]/30 rounded-lg px-4 py-3 flex items-center justify-between text-[#F3EDE3] text-sm shadow-sm backdrop-blur-md">
        <span className="flex items-center gap-3">
          <MapPin size={18} className="text-[#C8B79F] shrink-0" weight="fill" />
          <div className="flex flex-col">
            <strong className="text-[#F3EDE3] font-medium tracking-wide">{destination.name}</strong>
            <span className="text-xs text-[#A9A096] font-light">{destination.state || destination.country}</span>
          </div>
        </span>
        <button
          onClick={() => {
            setDestination(null);
          }}
          className="text-[10px] text-[#A9A096] hover:text-[#F3EDE3] uppercase font-medium tracking-widest border border-white/[0.08] hover:border-white/[0.2] rounded px-3 py-1.5 transition-all"
        >
          Change
        </button>
      </div>
    );
  }

  if (destination && !inline) {
    return (
      <div className="bg-[#151310] border border-white/[0.08] rounded-xl p-8 md:p-10 shadow-sm relative overflow-hidden group">
        <div className="flex items-center gap-2 mb-3">
          <span className="w-1.5 h-1.5 rounded-full bg-[#C8B79F]" />
          <span className="text-[10px] font-bold uppercase tracking-[0.25em] text-[#C8B79F]">
            Destination Confirmed
          </span>
        </div>

        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div>
            <h2 className="text-3xl md:text-4xl font-normal text-[#F3EDE3] mb-1 tracking-tight" style={{ fontFamily: "var(--font-playfair, serif)" }}>
              {destination.name}
            </h2>
            <p className="text-xs text-[#A9A096] font-light tracking-wide">
              {destination.state && `${destination.state}, `}{destination.country || "India"}
            </p>
          </div>
          <button
            onClick={() => setDestination(null)}
            className="bg-white/[0.04] hover:bg-white/[0.08] border border-white/[0.08] text-[#A9A096] hover:text-[#F3EDE3] text-xs font-medium uppercase tracking-widest px-6 py-3.5 rounded transition-all"
          >
            Change Destination
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className={`relative ${inline ? '' : 'bg-[#151310] border border-white/[0.08] rounded-xl p-8 md:p-10 shadow-sm flex flex-col'}`} ref={wrapperRef}>
      {!inline && (
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="w-1.5 h-1.5 rounded-full bg-[#C8B79F]" />
              <span className="text-[10px] font-bold uppercase tracking-[0.25em] text-[#C8B79F]">Destination Search</span>
            </div>
            <h3 className="text-2xl font-normal text-[#F3EDE3] tracking-tight" style={{ fontFamily: "var(--font-playfair, serif)" }}>
              Where would you like to journey?
            </h3>
          </div>
          <button
            onClick={handleDetectLocation}
            className="flex items-center gap-2 text-[11px] font-medium tracking-wider uppercase px-4 py-2.5 bg-white/[0.04] hover:bg-white/[0.08] text-[#C8B79F] rounded border border-white/[0.08] transition-colors self-start sm:self-auto"
          >
            <NavigationArrow size={13} weight="bold" />
            <span>Use My Location</span>
          </button>
        </div>
      )}

      <div className="relative w-full z-20">
        <input
          type="text"
          value={query}
          onChange={(e) => handleSearch(e.target.value)}
          placeholder="Search any historic city, district, or monument..."
          className="w-full bg-[#0D0C0A] border border-white/[0.1] hover:border-white/[0.2] text-[#F3EDE3] text-sm md:text-base rounded-lg pl-12 pr-12 py-4 focus:outline-none focus:border-[#C8B79F] transition-all"
        />
        <MagnifyingGlass
          size={18}
          className="absolute left-4 top-1/2 -translate-y-1/2 text-[#A9A096]"
          weight="bold"
        />

        {isLoading && (
          <SpinnerGap size={18} className="absolute right-4 top-1/2 -translate-y-1/2 text-[#C8B79F] animate-spin" />
        )}

        {isOpen && suggestions.length > 0 && (
          <ul className="absolute top-[calc(100%+8px)] left-0 right-0 bg-[#0D0C0A] border border-white/[0.12] rounded-lg shadow-2xl overflow-hidden z-30 max-h-80 overflow-y-auto divide-y divide-white/[0.05]">
            {suggestions.map((item, idx) => {
              const name = item.displayName?.text || item.formattedAddress;
              const subtext = item.formattedAddress;

              return (
                <li
                  key={item.id || idx}
                  onClick={() => handleSelect(item)}
                  className="px-5 py-3.5 hover:bg-white/[0.04] cursor-pointer flex items-center gap-4 transition-colors group"
                >
                  <div className="w-8 h-8 rounded-full bg-white/[0.03] flex items-center justify-center shrink-0 border border-white/[0.06] group-hover:border-[#C8B79F]/40 group-hover:text-[#C8B79F] transition-colors text-[#A9A096]">
                    <MapPin size={15} weight="fill" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <span className="font-medium text-[#F3EDE3] block truncate text-sm">{name}</span>
                    {subtext && name !== subtext && (
                      <span className="text-xs text-[#A9A096] truncate block font-light mt-0.5">{subtext}</span>
                    )}
                  </div>
                </li>
              );
            })}
          </ul>
        )}

        {isOpen && !isLoading && suggestions.length === 0 && query.length >= 2 && (
          <div className="absolute top-[calc(100%+8px)] left-0 right-0 bg-[#0D0C0A] border border-white/[0.12] rounded-lg shadow-2xl p-6 text-center z-30">
            <span className="text-[#A9A096] text-xs font-light">No heritage destinations found matching "{query}"</span>
          </div>
        )}
      </div>

      {!inline && (
        <div className="mt-6 flex flex-wrap items-center gap-2">
          <span className="text-[10px] text-[#A9A096] font-medium uppercase tracking-[0.2em] mr-1">Trending:</span>
          {["Varanasi", "Jaipur", "Hampi", "Kochi", "Udaipur", "Amritsar"].map(city => (
            <button
              key={city}
              onClick={() => handleSearch(city)}
              className="text-xs font-light px-3.5 py-1.5 bg-white/[0.02] hover:bg-white/[0.06] text-[#F3EDE3]/80 hover:text-[#F3EDE3] rounded border border-white/[0.06] hover:border-white/[0.15] transition-colors"
            >
              {city}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
