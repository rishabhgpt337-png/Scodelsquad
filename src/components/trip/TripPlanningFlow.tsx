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
    <div className="w-full bg-slate-900 border border-white/[0.08] rounded-2xl p-8 space-y-10">
      <div className="border-b border-white/[0.08] pb-6">
        <h2 className="text-2xl font-bold text-white mb-2">
          Trip Settings: <span className="text-amber-400">{destination.name}</span>
        </h2>
        <p className="text-sm text-white/50">
          Customize your journey parameters below to generate a master itinerary.
        </p>
      </div>

      {/* Inputs */}
      <div className="space-y-8">
        {/* Step 1 */}
        <div className="space-y-4">
          <label className="text-sm font-semibold text-white flex items-center gap-2">
            <Calendar size={18} className="text-amber-400" />
            Arrival Date & Duration
          </label>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input
              type="date"
              value={arrivalDate}
              onChange={(e) => setArrivalDate(e.target.value)}
              className="bg-slate-950 border border-white/[0.1] text-white text-sm rounded-xl px-4 py-3.5 focus:outline-none focus:border-amber-400"
            />
            <div className="flex items-center gap-2 bg-slate-950 border border-white/[0.1] rounded-xl px-2">
              {[1, 2, 3, 5, 7].map((num) => (
                <button
                  key={num}
                  type="button"
                  onClick={() => setDays(num)}
                  className={`flex-1 py-2.5 rounded-lg text-xs font-semibold transition-all ${
                    days === num ? "bg-amber-400 text-slate-950" : "text-white/60 hover:bg-white/[0.05]"
                  }`}
                >
                  {num}D
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Step 2 */}
        <div className="space-y-4">
          <label className="text-sm font-semibold text-white flex items-center gap-2">
            <CurrencyInr size={18} className="text-amber-400" />
            Budget Preference
          </label>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {BUDGET_RANGES.map((b) => (
              <div
                key={b.id}
                onClick={() => setBudget(b.id)}
                className={`p-4 rounded-xl border cursor-pointer transition-all ${
                  budget === b.id
                    ? "bg-slate-800 border-amber-400 text-white"
                    : "bg-slate-950 border-white/[0.08] text-white/60 hover:border-white/20"
                }`}
              >
                <div className="flex items-center justify-between mb-1.5">
                  <span className="font-bold text-sm text-white">{b.label}</span>
                  <span className="text-xs font-semibold text-amber-400 tabular-nums">{b.range}</span>
                </div>
                <p className="text-[11px] text-white/40 leading-tight">{b.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Step 3 */}
        <div className="space-y-4">
          <label className="text-sm font-semibold text-white flex items-center gap-2">
            <Sparkle size={18} className="text-amber-400" />
            Interests
          </label>
          <div className="flex flex-wrap gap-2">
            {activities.map((act) => {
              const isSelected = selectedActivities.includes(act);
              return (
                <button
                  key={act}
                  type="button"
                  onClick={() => toggleActivity(act)}
                  className={`px-4 py-3 rounded-lg text-xs font-semibold border flex items-center gap-2 transition-all ${
                    isSelected
                      ? "bg-emerald-500 text-slate-950 border-emerald-500"
                      : "bg-slate-950 border-white/[0.08] text-white/70 hover:border-white/20"
                  }`}
                >
                  {isSelected && <CheckCircle size={14} weight="bold" />}
                  {act}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      <button
        onClick={handleSubmit}
        className="w-full bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold py-4 rounded-xl flex items-center justify-center gap-2 transition-all"
      >
        Generate Master Itinerary
        <ArrowRight size={18} weight="bold" />
      </button>
    </div>
  );
}
