"use client";

import { useState } from "react";
import Link from "next/link";
import DestinationSearch from "@/components/trip/DestinationSearch";
import TripPlanningFlow from "@/components/trip/TripPlanningFlow";
import ItineraryView from "@/components/trip/ItineraryView";
import RaahiLogo from "@/components/common/RaahiLogo";
import UserNav from "@/components/auth/UserNav";
import { useDestination } from "@/context/DestinationContext";
import { useAuth } from "@/context/AuthContext";
import { GoogleLogo, Spinner } from "@phosphor-icons/react";

export default function TripPlannerPage() {
  const { user, loading, signInWithGoogle } = useAuth();
  const { destination } = useDestination();
  const [isSigningIn, setIsSigningIn] = useState(false);
  const [tripData, setTripData] = useState<{
    destination: string;
    state?: string;
    arrivalDate: string;
    departureDate: string;
    durationDays: number;
    budgetRange: string;
    groupSize: number;
    selectedActivities: string[];
  } | null>(null);

  const resetPlanner = () => {
    setTripData(null);
  };

  const handleSignIn = async () => {
    try {
      setIsSigningIn(true);
      await signInWithGoogle();
    } catch (err) {
      console.error("Sign in failed:", err);
    } finally {
      setIsSigningIn(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#0D0C0A] text-[#F3EDE3] flex items-center justify-center">
        <Spinner size={32} className="animate-spin text-[#C8B79F]" />
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-screen bg-[#0D0C0A] text-[#F3EDE3] flex flex-col items-center justify-center p-6">
        <RaahiLogo size="lg" className="mb-8" />
        <div className="max-w-md w-full bg-[#151310] border border-white/[0.08] rounded-2xl p-8 text-center shadow-xl">
          <h2 className="text-2xl font-normal text-[#F3EDE3] mb-3 tracking-tight" style={{ fontFamily: "var(--font-playfair, serif)" }}>
            Sign in to Architect Your Journey
          </h2>
          <p className="text-sm text-[#A9A096] mb-8 font-light leading-relaxed">
            Please authenticate to access the trip builder. Your generated itineraries will be saved to your profile securely.
          </p>
          <button
            onClick={handleSignIn}
            disabled={isSigningIn}
            className="w-full flex items-center justify-center gap-2 bg-[#C8B79F] hover:bg-[#D4C5AF] text-[#0D0C0A] font-medium py-3.5 rounded-xl transition-colors uppercase tracking-wider text-xs"
          >
            {isSigningIn ? (
              <Spinner size={18} className="animate-spin" />
            ) : (
              <>
                <GoogleLogo size={18} weight="bold" />
                Continue with Google
              </>
            )}
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0D0C0A] text-[#F3EDE3] flex flex-col">
      <nav className="w-full flex items-center justify-between px-8 md:px-16 lg:px-20 h-24 border-b border-white/[0.05]">
        <Link href="/">
          <RaahiLogo size="sm" />
        </Link>
        <UserNav />
      </nav>

      <div className="flex-1 px-8 py-20 md:px-16 lg:px-20">
        <div className="max-w-5xl mx-auto">
          {/* Header */}
          <div className="mb-20">
            <div className="flex items-center gap-3 mb-6">
              <span className="w-10 h-[1px] bg-[#C8B79F]" />
              <span className="text-[10px] font-bold tracking-[0.35em] uppercase text-[#C8B79F]">
                Trip Architect
              </span>
            </div>
            <h1 className="text-5xl md:text-6xl font-normal text-[#F3EDE3] mb-6 tracking-tight" style={{ fontFamily: "var(--font-playfair, serif)" }}>
              Plan Your <span className="italic">Raahi</span> Journey
            </h1>
            <p className="text-[#A9A096] text-base max-w-xl leading-relaxed font-light tracking-wide">
              Data-backed planning verified with local community elders, expert guides, and safety protocols to craft your perfect master itinerary.
            </p>
          </div>

          {!tripData ? (
            !destination ? (
              <DestinationSearch />
            ) : (
              <div className="transition-all duration-300">
                <TripPlanningFlow
                  destination={destination}
                  onComplete={(data) => {
                    setTripData(data);
                    window.scrollTo({ top: 0, behavior: "smooth" });
                  }}
                />
              </div>
            )
          ) : (
            <div className="animate-in fade-in slide-in-from-bottom-4 duration-700">
              <ItineraryView tripData={{ ...tripData, state: tripData.state || "" }} />
              <div className="mt-16">
                <button
                  onClick={resetPlanner}
                  className="bg-white/[0.03] border border-white/[0.08] hover:border-white/[0.15] text-[#A9A096] hover:text-[#F3EDE3] text-[11px] font-medium uppercase tracking-widest px-8 py-4 rounded transition-all duration-300"
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
