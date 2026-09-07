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
    <div className="bg-slate-900 border border-white/[0.08] rounded-2xl p-8 shadow-sm">
      <h3 className="text-lg font-bold mb-6 flex items-center gap-3 text-white">
        <MapPin size={22} className="text-amber-400" />
        Select Your Destination
      </h3>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <select
          value={selectedState}
          onChange={(e) => {
            setSelectedState(e.target.value);
            if (query) handleSearch(query);
          }}
          className="bg-slate-950 border border-white/[0.1] text-white text-sm rounded-xl px-4 py-3.5 focus:outline-none focus:border-emerald-400 transition-colors"
        >
          <option value="">All States / UTs</option>
          {INDIAN_STATES.map((state) => (
            <option key={state} value={state}>
              {state}
            </option>
          ))}
        </select>

        <div className="md:col-span-2 relative">
          <input
            type="text"
            value={query}
            onChange={(e) => handleSearch(e.target.value)}
            placeholder="Search destination (e.g. Varanasi, Hampi, Leh)..."
            className="w-full bg-slate-950 border border-white/[0.1] text-white text-sm rounded-xl pl-11 pr-4 py-3.5 focus:outline-none focus:border-emerald-400 transition-colors"
          />
          <MagnifyingGlass
            size={18}
            className="absolute left-4 top-4 text-white/50"
          />

          {suggestions.length > 0 && (
            <ul className="absolute top-[calc(100%+8px)] left-0 right-0 bg-slate-950 border border-white/[0.1] rounded-xl shadow-lg overflow-hidden z-30">
              {suggestions.map((item, idx) => (
                <li
                  key={idx}
                  onClick={() => handleSelect(item)}
                  className="px-5 py-4 hover:bg-slate-800 cursor-pointer flex items-center justify-between border-b border-white/[0.05] last:border-0 transition-colors"
                >
                  <div>
                    <span className="font-semibold text-white block">{item.name}</span>
                    <span className="text-xs text-white/50">{item.state}</span>
                  </div>
                  <span className="text-xs font-semibold text-emerald-400 uppercase tracking-widest">Select</span>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>

      {selectedDest && (
        <div className="bg-emerald-950/30 border border-emerald-400/20 rounded-xl p-4 flex items-center justify-between text-white text-sm">
          <span className="flex items-center gap-3">
            <Check size={20} className="text-emerald-400" />
            Destination: <strong className="text-emerald-400">{selectedDest.name}</strong>, {selectedDest.state}
          </span>
          <button
            onClick={() => {
              setSelectedDest(null);
              setQuery("");
            }}
            className="text-xs text-white/60 hover:text-white uppercase font-bold tracking-widest"
          >
            Change
          </button>
        </div>
      )}
    </div>
  );
}
