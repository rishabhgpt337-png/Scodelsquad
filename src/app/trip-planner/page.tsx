"use client";

import { useState } from "react";
import DestinationSearch from "@/components/trip/DestinationSearch";
import TripPlanningFlow from "@/components/trip/TripPlanningFlow";
import ItineraryView from "@/components/trip/ItineraryView";

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
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-900 to-slate-950 p-6 md:p-8 lg:p-12">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-10 text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-white mb-4 tracking-tight">
            Plan Your <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-orange-500">Raahi</span> Journey
          </h1>
          <p className="text-white/60 text-lg md:text-xl max-w-2xl mx-auto">
            AI-powered travel planning that discovers India's hidden gems and crafts your perfect itinerary.
          </p>
        </div>

        {!tripData ? (
          !selectedDestination ? (
            <DestinationSearch onSelect={setSelectedDestination} />
          ) : (
            <div className="transition-all duration-500">
              <TripPlanningFlow
                destination={selectedDestination}
                onComplete={(data) => {
                  setTripData(data);
                  window.scrollTo({ top: 0, behavior: "smooth" });
                }}
              />
              <button
                onClick={() => setSelectedDestination(null)}
                className="mt-6 text-center w-full text-white/60 hover:text-white text-sm transition-colors"
              >
                ← Change destination
              </button>
            </div>
          )
        ) : (
          <div className="animate-in fade-in slide-in-from-bottom-8 duration-700">
            <ItineraryView tripData={tripData} />
            <div className="mt-8 text-center">
              <button
                onClick={() => {
                  setTripData(null);
                  setSelectedDestination(null);
                }}
                className="text-white/70 hover:text-white text-sm font-medium px-6 py-2 rounded-lg hover:bg-white/10 transition-colors"
              >
                Start a New Trip
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
