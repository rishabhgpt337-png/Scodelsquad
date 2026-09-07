"use client";

import { useState } from "react";
import Link from "next/link";
import DestinationSearch from "@/components/trip/DestinationSearch";
import TripPlanningFlow from "@/components/trip/TripPlanningFlow";
import ItineraryView from "@/components/trip/ItineraryView";
import RaahiLogo from "@/components/common/RaahiLogo";
import UserNav from "@/components/auth/UserNav";

export default function TripPlannerPage() {
  const [selectedDestination, setSelectedDestination] = useState<{
    name: string;
    state: string;
  } | null>(null);

  const [tripData, setTripData] = useState<{
    destination: string;
    state: string;
    arrivalDate: string;
    departureDate: string;
    durationDays: number;
    budgetRange: string;
    groupSize: number;
    selectedActivities: string[];
  } | null>(null);

  return (
    <div className="min-h-screen bg-slate-950 flex flex-col">
      <nav className="w-full flex items-center justify-between px-8 md:px-16 lg:px-20 h-20 md:h-24 border-b border-white/5">
        <Link href="/">
          <RaahiLogo size="sm" />
        </Link>
        <UserNav />
      </nav>

      <div className="flex-1 px-8 py-12 md:px-16 lg:px-20 lg:py-16">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
        <div className="mb-14">
          <div className="flex items-center gap-3 mb-4">
            <span className="w-8 h-[1.5px] bg-amber-400/50" />
            <span className="text-[10px] font-bold tracking-[0.35em] uppercase text-amber-400/80">
              Trip Architect
            </span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-5 tracking-tight leading-[1.15]">
            Plan Your <span className="text-amber-400">Raahi</span> Journey
          </h1>
          <p className="text-white/50 text-base max-w-2xl leading-relaxed">
            Data-backed planning verified with local community elders, expert guides, and safety protocols to craft your perfect master itinerary.
          </p>
        </div>

        {!tripData ? (
          !selectedDestination ? (
            <DestinationSearch onSelect={setSelectedDestination} />
          ) : (
            <div className="transition-all duration-300">
              <TripPlanningFlow
                destination={selectedDestination}
                onComplete={(data) => {
                  setTripData(data);
                  window.scrollTo({ top: 0, behavior: "smooth" });
                }}
              />
              <button
                onClick={() => setSelectedDestination(null)}
                className="mt-8 text-sm text-white/50 hover:text-white transition-colors duration-200 uppercase tracking-widest font-semibold"
              >
                ← Back to Destinations
              </button>
            </div>
          )
        ) : (
          <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
            <ItineraryView tripData={tripData} />
            <div className="mt-10">
              <button
                onClick={() => {
                  setTripData(null);
                  setSelectedDestination(null);
                }}
                className="bg-slate-900 border border-white/[0.08] hover:border-white/[0.15] text-white/80 hover:text-white text-xs font-semibold px-6 py-3 rounded-lg transition-all duration-200"
              >
                Draft Another Itinerary
              </button>
            </div>
          </div>
        )}
        </div>
      </div>
    </div>
  );
}
