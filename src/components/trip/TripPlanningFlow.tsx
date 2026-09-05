"use client";

import { useState } from "react";
import { Calendar, Users, CurrencyInr, Sparkle, ArrowRight, CheckCircle } from "@phosphor-icons/react";
import { DESTINATION_DETAILS } from "@/lib/destinations";

interface TripPlanningFlowProps {
  destination: { name: string; state: string };
  onComplete: (tripData: any) => void;
}

export const BUDGET_RANGES = [
  { id: "smart", label: "Smart Explorer", range: "₹10,000 - ₹20,000", desc: "Best value, authentic homestays & local transport" },
  { id: "comfort", label: "Comfort Plus", range: "₹20,000 - ₹35,000", desc: "3-star heritage stays, AC cabs & curated guided slots" },
  { id: "premium", label: "Premium Experience", range: "₹35,000 - ₹50,000", desc: "Boutique luxury resorts, private boat & dining" },
  { id: "bespoke", label: "Bespoke / Custom", range: "Flexible", desc: "Customized to your exact vision without constraints" },
];

export default function TripPlanningFlow({ destination, onComplete }: TripPlanningFlowProps) {
  const [arrivalDate, setArrivalDate] = useState<string>("2026-10-28");
  const [days, setDays] = useState<number>(3);
  const [budget, setBudget] = useState<string>("comfort");
  const [groupSize, setGroupSize] = useState<number>(2);
  const [selectedActivities, setSelectedActivities] = useState<string[]>([]);

  // Calculate return date
  const getReturnDate = () => {
    const d = new Date(arrivalDate);
    d.setDate(d.getDate() + (days - 1));
    return d.toISOString().split("T")[0];
  };

  const destinationData = DESTINATION_DETAILS[destination.name] || DESTINATION_DETAILS.default;
  const activities = destinationData.activities;

  const toggleActivity = (act: string) => {
    setSelectedActivities((prev) =>
      prev.includes(act) ? prev.filter((a) => a !== act) : [...prev, act]
    );
  };

  const handleSubmit = () => {
    onComplete({
      destination: destination.name,
      state: destination.state,
      arrivalDate,
      departureDate: getReturnDate(),
      durationDays: days,
      budgetRange: budget,
      groupSize,
      selectedActivities,
    });
  };

  return (
    <div className="w-full max-w-2xl bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6 shadow-2xl space-y-6">
      <div className="border-b border-white/10 pb-4">
        <h2 className="text-2xl font-bold text-white">
          Plan your trip to <span className="text-amber-400">{destination.name}</span>
        </h2>
        <p className="text-sm text-white/60 mt-1">
          Customize your dates, pace, and interests for a tailored master itinerary.
        </p>
      </div>

      {/* Step 1: Dates & Duration */}
      <div className="space-y-3">
        <label className="text-sm font-semibold text-white flex items-center gap-2">
          <Calendar size={18} className="text-amber-400" />
          When are you arriving?
        </label>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          <input
            type="date"
            value={arrivalDate}
            onChange={(e) => setArrivalDate(e.target.value)}
            className="bg-slate-800/80 border border-white/15 text-white text-sm rounded-xl px-4 py-3 focus:outline-none focus:border-amber-400"
          />
          <div className="flex items-center gap-2 bg-slate-800/80 border border-white/15 rounded-xl px-4 py-2">
            <span className="text-xs text-white/60">Duration:</span>
            {[1, 2, 3, 5, 7].map((num) => (
              <button
                key={num}
                type="button"
                onClick={() => setDays(num)}
                className={`px-3 py-1 rounded-lg text-xs font-semibold transition-colors ${
                  days === num ? "bg-amber-400 text-slate-900" : "bg-white/10 text-white hover:bg-white/20"
                }`}
              >
                {num}D
              </button>
            ))}
          </div>
        </div>

        {/* Departure auto-badge */}
        <div className="bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-xs text-white/80 flex items-center justify-between">
          <span>
            📍 <strong>{arrivalDate}</strong> (Arrival) → <strong>{getReturnDate()}</strong> (Departure)
          </span>
          <span className="text-amber-400 font-semibold">{days} Days & {days - 1} Nights</span>
        </div>
      </div>

      {/* Step 2: Dignified Budget */}
      <div className="space-y-3">
        <label className="text-sm font-semibold text-white flex items-center gap-2">
          <CurrencyInr size={18} className="text-amber-400" />
          Budget Preference
        </label>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {BUDGET_RANGES.map((b) => (
            <div
              key={b.id}
              onClick={() => setBudget(b.id)}
              className={`p-3.5 rounded-xl border cursor-pointer transition-all ${
                budget === b.id
                  ? "bg-amber-400/15 border-amber-400 text-white"
                  : "bg-slate-800/50 border-white/10 text-white/70 hover:border-white/25"
              }`}
            >
              <div className="flex items-center justify-between mb-1">
                <span className="font-bold text-sm text-white">{b.label}</span>
                <span className="text-xs font-semibold text-amber-400">{b.range}</span>
              </div>
              <p className="text-[11px] text-white/60 leading-tight">{b.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Step 3: Things you want to do */}
      <div className="space-y-3">
        <label className="text-sm font-semibold text-white flex items-center gap-2">
          <Sparkle size={18} className="text-amber-400" />
          Things you want to experience in {destination.name}
        </label>
        <div className="flex flex-wrap gap-2">
          {activities.map((act) => {
            const isSelected = selectedActivities.includes(act);
            return (
              <button
                key={act}
                type="button"
                onClick={() => toggleActivity(act)}
                className={`px-3.5 py-2 rounded-xl text-xs font-medium border flex items-center gap-2 transition-all ${
                  isSelected
                    ? "bg-amber-400 text-slate-900 border-amber-400 font-semibold shadow-lg shadow-amber-400/20"
                    : "bg-slate-800/60 border-white/10 text-white/80 hover:border-white/30"
                }`}
              >
                {isSelected && <CheckCircle size={14} weight="bold" />}
                {act}
              </button>
            );
          })}
        </div>
      </div>

      {/* Submit Button */}
      <button
        onClick={handleSubmit}
        className="w-full bg-[#1976d2] hover:bg-[#2186e0] text-white font-bold py-3.5 rounded-xl shadow-lg flex items-center justify-center gap-2 transition-all hover:translate-y-[-1px]"
      >
        Generate Master Itinerary
        <ArrowRight size={18} weight="bold" />
      </button>
    </div>
  );
}
