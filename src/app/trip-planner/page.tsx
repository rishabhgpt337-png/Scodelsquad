"use client";

import { useState } from "react";
import DestinationSearch from "@/components/trip/DestinationSearch";
import TripPlanningFlow from "@/components/trip/TripPlanningFlow";

export default function TripPlannerPage() {
  const [selectedDestination, setSelectedDestination] = useState<{
    name: string;
    state: string;
  } | null>(null);

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-900 to-slate-950 p-6 md:p-12">
      <div className="max-w-4xl mx-auto">
        <div className="mb-12 text-center">
          <h1 className="text-4xl md:text-5xl font-extrabold text-white mb-2">
            Plan Your <span className="text-amber-400">Raahi</span> Journey
          </h1>
          <p className="text-white/60 text-lg">
            Tell us where, when, and how you want to travel — we'll handle the rest with AI magic.
          </p>
        </div>

        {/* Step 1: Destination Selection */}
        {!selectedDestination ? (
          <DestinationSearch onSelect={setSelectedDestination} />
        ) : (
          <>
            {/* Step 2: Trip Planning */}
            <TripPlanningFlow
              destination={selectedDestination}
              onComplete={(tripData) => {
                console.log("Trip planned:", tripData);
                alert("Master itinerary generated! (Check console for data)");
              }}
            />

            {/* Back Button */}
            <button
              onClick={() => setSelectedDestination(null)}
              className="mt-6 text-center w-full text-white/60 hover:text-white text-sm transition-colors"
            >
              ← Change destination
            </button>
          </>
        )}
      </div>
    </div>
  );
}
