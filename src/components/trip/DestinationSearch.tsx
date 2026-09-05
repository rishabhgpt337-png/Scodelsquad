"use client";

import { useState } from "react";
import { INDIAN_STATES, POPULAR_DESTINATIONS } from "@/lib/destinations";
import { MagnifyingGlass, MapPin, Check } from "@phosphor-icons/react";

interface DestinationSearchProps {
  onSelect: (destination: { name: string; state: string }) => void;
}

export default function DestinationSearch({ onSelect }: DestinationSearchProps) {
  const [selectedState, setSelectedState] = useState<string>("");
  const [query, setQuery] = useState<string>("");
  const [suggestions, setSuggestions] = useState<typeof POPULAR_DESTINATIONS>([]);
  const [selectedDest, setSelectedDest] = useState<{ name: string; state: string } | null>(null);

  // Fuzzy search implementation
  const handleSearch = (text: string) => {
    setQuery(text);
    if (!text.trim()) {
      setSuggestions([]);
      return;
    }

    const lower = text.toLowerCase().trim();
    const matched = POPULAR_DESTINATIONS.filter((d) => {
      const matchName = d.name.toLowerCase().includes(lower);
      const matchAlias = d.aliases.some((a) => a.includes(lower) || lower.includes(a));
      const matchState = selectedState ? d.state === selectedState : true;
      return (matchName || matchAlias) && matchState;
    });

    setSuggestions(matched);
  };

  const handleSelect = (dest: { name: string; state: string }) => {
    setSelectedDest(dest);
    setQuery(dest.name);
    setSelectedState(dest.state);
    setSuggestions([]);
    onSelect(dest);
  };

  return (
    <div className="w-full max-w-2xl bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6 shadow-2xl">
      <h3 className="text-xl font-bold mb-4 flex items-center gap-2 text-white">
        <MapPin size={22} className="text-amber-400" />
        Where do you want to explore?
      </h3>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mb-4">
        {/* State selector */}
        <select
          value={selectedState}
          onChange={(e) => {
            setSelectedState(e.target.value);
            if (query) handleSearch(query);
          }}
          className="bg-slate-800/80 border border-white/15 text-white text-sm rounded-xl px-4 py-3 focus:outline-none focus:border-amber-400"
        >
          <option value="">All States / UTs</option>
          {INDIAN_STATES.map((state) => (
            <option key={state} value={state}>
              {state}
            </option>
          ))}
        </select>

        {/* Search input with fuzzy search */}
        <div className="md:col-span-2 relative">
          <div className="relative flex items-center">
            <input
              type="text"
              value={query}
              onChange={(e) => handleSearch(e.target.value)}
              placeholder="e.g. Banaras, Jaipur, Goa, Munnar..."
              className="w-full bg-slate-800/80 border border-white/15 text-white text-sm rounded-xl pl-11 pr-4 py-3 focus:outline-none focus:border-amber-400"
            />
            <MagnifyingGlass
              size={18}
              className="absolute left-4 text-white/50 pointer-events-none"
            />
          </div>

          {/* Autocomplete dropdown */}
          {suggestions.length > 0 && (
            <ul className="absolute top-full left-0 right-0 mt-2 bg-slate-900 border border-white/15 rounded-xl shadow-2xl overflow-hidden z-30">
              {suggestions.map((item, idx) => (
                <li
                  key={idx}
                  onClick={() => handleSelect(item)}
                  className="px-4 py-3 hover:bg-white/10 cursor-pointer flex items-center justify-between border-b border-white/5 last:border-0 transition-colors"
                >
                  <div>
                    <span className="font-semibold text-white block">{item.name}</span>
                    <span className="text-xs text-white/50">{item.state}</span>
                  </div>
                  <span className="text-xs text-amber-400/80">Select</span>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>

      {/* Selected destination confirmation pill */}
      {selectedDest && (
        <div className="bg-amber-400/10 border border-amber-400/30 rounded-xl p-3 flex items-center justify-between text-amber-200 text-sm">
          <span className="flex items-center gap-2">
            <Check size={18} className="text-amber-400" />
            Destination locked: <strong>{selectedDest.name}</strong>, {selectedDest.state}
          </span>
          <button
            onClick={() => {
              setSelectedDest(null);
              setQuery("");
            }}
            className="text-xs text-white/60 hover:text-white"
          >
            Change
          </button>
        </div>
      )}
    </div>
  );
}
