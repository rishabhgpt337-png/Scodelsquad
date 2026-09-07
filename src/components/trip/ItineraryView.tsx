"use client";

import { useState, useEffect, useRef } from "react";
import { animate, stagger } from "animejs";
import { Clock, MapPin, Coffee, Camera, Sun, Moon, NavigationArrow, Calendar, Users, CurrencyInr, DownloadSimple, Check } from "@phosphor-icons/react";
import { DESTINATION_DETAILS } from "@/lib/destinations";

interface ItineraryDay {
  day: number;
  title: string;
  date: string;
  theme: string;
  timeSlots: {
    time: string;
    activity: string;
    icon: React.ReactNode;
    duration: string;
    location: string;
    description: string;
  }[];
}

interface ItineraryViewProps {
  tripData: {
    destination: string;
    state: string;
    arrivalDate: string;
    departureDate: string;
    durationDays: number;
    budgetRange: string;
    groupSize: number;
    selectedActivities: string[];
  };
}

export default function ItineraryView({ tripData }: ItineraryViewProps) {
  const [activeDay, setActiveDay] = useState<number>(1);
  const [viewMode, setViewMode] = useState<"timeline" | "map">("timeline");
  const timelineRef = useRef<HTMLDivElement>(null);

  const destData = DESTINATION_DETAILS[tripData.destination] || DESTINATION_DETAILS.default;

  const generateItinerary = (): ItineraryDay[] => {
    const days: ItineraryDay[] = [];
    const themes = destData.themes.length > 0 ? destData.themes : ["Cultural Exploration", "Heritage Discovery", "Local Experiences"];
    const morningSpots = destData.morningSpots;
    const foodSpots = destData.foodSpots;
    const landmarks = destData.landmarks;

    const baseDate = new Date(tripData.arrivalDate);

    for (let i = 0; i < tripData.durationDays; i++) {
      const currentDate = new Date(baseDate);
      currentDate.setDate(currentDate.getDate() + i);

      days.push({
        day: i + 1,
        title: `Day ${i + 1}: ${themes[i % themes.length]}`,
        date: currentDate.toLocaleDateString("en-IN", { weekday: "short", day: "numeric", month: "short" }),
        theme: themes[i % themes.length],
        timeSlots: [
          {
            time: "06:00",
            activity: "Sunrise Experience",
            icon: <Sun size={15} weight="bold" className="text-amber-400" />,
            duration: "2h",
            location: morningSpots[i % morningSpots.length],
            description: "Start your morning with verified local vantage points before peak crowds."
          },
          {
            time: "08:30",
            activity: "Traditional Breakfast",
            icon: <Coffee size={15} weight="bold" className="text-amber-400" />,
            duration: "1.5h",
            location: foodSpots[0],
            description: "Authentic local culinary spread endorsed by neighborhood vendors."
          },
          {
            time: "10:00",
            activity: tripData.selectedActivities[i % (tripData.selectedActivities.length || 1)] || "Heritage Walking Tour",
            icon: <MapPin size={15} weight="bold" className="text-emerald-400" />,
            duration: "3h",
            location: landmarks[0],
            description: "Curated historical access led by registered community guides."
          },
          {
            time: "13:30",
            activity: "Regional Lunch & Midday Rest",
            icon: <Coffee size={15} weight="bold" className="text-amber-400" />,
            duration: "2h",
            location: foodSpots[1] || foodSpots[0],
            description: "Culinary tasting paired with quiet cultural immersion."
          },
          {
            time: "15:30",
            activity: i === 0 ? "Artisan Workshop & Guild Walk" : "Community Craft Visit",
            icon: <Camera size={15} weight="bold" className="text-purple-400" />,
            duration: "2.5h",
            location: "Local Artisan Quarter",
            description: "Direct encounter with verified traditional craftspeople."
          },
          {
            time: "18:30",
            activity: i % 2 === 0 ? "Evening Aarti & Viewpoint" : "Sunset Heritage Gathering",
            icon: <Moon size={15} weight="bold" className="text-blue-400" />,
            duration: "2h",
            location: morningSpots[(i + 1) % morningSpots.length] || "Main Ghat",
            description: "Witness timeless ritual traditions with safe crowd-flow management."
          },
          {
            time: "20:30",
            activity: "Evening Dinner",
            icon: <Coffee size={15} weight="bold" className="text-amber-400" />,
            duration: "1.5h",
            location: foodSpots[2] || foodSpots[0],
            description: "Traditional dinner menu curated for your selected budget tier."
          }
        ]
      });
    }

    return days;
  };

  const itineraryDays = generateItinerary();
  const activeDayData = itineraryDays.find((day) => day.day === activeDay) || itineraryDays[0];

  useEffect(() => {
    if (viewMode === "timeline" && timelineRef.current) {
      const items = timelineRef.current.querySelectorAll('.timeline-slot');
      if (items.length > 0) {
        animate(items, {
          translateY: [25, 0],
          opacity: [0, 1],
          duration: 650,
          ease: "outExpo",
          delay: stagger(70)
        });
      }
    }
  }, [activeDay, viewMode]);

  const getBudgetDisplay = () => {
    const ranges: Record<string, string> = {
      smart: "₹10,000 - ₹20,000",
      comfort: "₹20,000 - ₹35,000",
      premium: "₹35,000 - ₹50,000",
      bespoke: "Bespoke / Custom"
    };
    return ranges[tripData.budgetRange] || "₹20,000 - ₹35,000";
  };

  return (
    <div className="w-full bg-slate-900 border border-white/[0.08] rounded-2xl overflow-hidden shadow-sm">
      {/* Header */}
      <div className="p-8 border-b border-white/[0.08] bg-slate-950/50">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
              <span className="text-[10px] font-bold uppercase tracking-[0.25em] text-emerald-400">
                Verified Master Plan
              </span>
            </div>
            <h1 className="text-2xl md:text-3xl font-bold text-white mb-3 tracking-tight">
              Itinerary: <span className="text-amber-400">{tripData.destination}</span>
            </h1>
            <div className="flex flex-wrap items-center gap-4 text-xs text-white/50">
              <div className="flex items-center gap-1.5">
                <MapPin size={14} className="text-amber-400" />
                <span className="text-white/80 font-medium">{tripData.destination}, {tripData.state}</span>
              </div>
              <span className="text-white/20">•</span>
              <div className="flex items-center gap-1.5">
                <Calendar size={14} className="text-white/40" />
                <span>{tripData.arrivalDate} → {tripData.departureDate} ({tripData.durationDays} Days)</span>
              </div>
              <span className="text-white/20">•</span>
              <div className="flex items-center gap-1.5">
                <Users size={14} className="text-white/40" />
                <span>{tripData.groupSize} Traveler{tripData.groupSize > 1 ? "s" : ""}</span>
              </div>
              <span className="text-white/20">•</span>
              <div className="flex items-center gap-1.5">
                <CurrencyInr size={14} className="text-amber-400" />
                <span className="text-amber-400 font-semibold">{getBudgetDisplay()}</span>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2 bg-slate-950 border border-white/[0.08] p-1 rounded-xl">
            <button
              onClick={() => setViewMode("timeline")}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-colors ${
                viewMode === "timeline"
                  ? "bg-slate-800 text-white border border-white/[0.1]"
                  : "text-white/50 hover:text-white"
              }`}
            >
              <Clock size={14} className="inline mr-1.5" />
              Timeline
            </button>
            <button
              onClick={() => setViewMode("map")}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-colors ${
                viewMode === "map"
                  ? "bg-slate-800 text-white border border-white/[0.1]"
                  : "text-white/50 hover:text-white"
              }`}
            >
              <MapPin size={14} className="inline mr-1.5" />
              Map Radar
            </button>
          </div>
        </div>
      </div>

      <div className="p-8">
        {/* Day Selector */}
        <div className="mb-8">
          <div className="text-[10px] font-bold uppercase tracking-[0.25em] text-white/40 mb-3">
            Schedule Days
          </div>
          <div className="flex flex-wrap gap-2.5">
            {itineraryDays.map((day) => (
              <button
                key={day.day}
                onClick={() => setActiveDay(day.day)}
                className={`text-left px-4 py-3 rounded-xl border transition-all ${
                  activeDay === day.day
                    ? "bg-slate-800 border-amber-400/80 text-white shadow-sm"
                    : "bg-slate-950 border-white/[0.08] text-white/60 hover:border-white/20"
                }`}
              >
                <div className="flex items-center gap-2 mb-1">
                  <span className="font-bold text-xs text-white">Day {day.day}</span>
                  <span className="text-[10px] text-amber-400 font-medium">{day.date}</span>
                </div>
                <div className="text-[11px] text-white/40 truncate max-w-[140px]">{day.theme}</div>
              </button>
            ))}
          </div>
        </div>

        {/* Timeline View */}
        {viewMode === "timeline" && activeDayData && (
          <div ref={timelineRef} className="space-y-6">
            <div className="bg-slate-950 border border-white/[0.08] rounded-xl p-6">
              <div className="flex items-center justify-between pb-6 mb-6 border-b border-white/[0.08]">
                <div>
                  <h3 className="text-lg font-bold text-white">{activeDayData.title}</h3>
                  <p className="text-xs text-white/45 mt-0.5">{activeDayData.theme} • Curated Sequence</p>
                </div>
                <span className="text-xs font-semibold px-3 py-1 rounded-md bg-amber-400/10 text-amber-400 border border-amber-400/20">
                  {activeDayData.date}
                </span>
              </div>

              {/* Timeline Items */}
              <div className="relative pl-6 space-y-6">
                <div className="absolute left-[11px] top-2 bottom-2 w-[1.5px] bg-white/[0.1]" />

                {activeDayData.timeSlots.map((slot, index) => (
                  <div key={index} className="timeline-slot opacity-0 relative group">
                    <div className="absolute left-[-23px] top-1 w-6 h-6 rounded-full bg-slate-900 border border-white/[0.15] flex items-center justify-center">
                      {slot.icon}
                    </div>

                    <div className="bg-slate-900/60 border border-white/[0.06] rounded-xl p-4.5 hover:border-white/[0.12] transition-colors">
                      <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
                        <div className="flex items-center gap-3">
                          <span className="text-xs font-bold font-mono text-amber-400 bg-amber-400/10 px-2.5 py-1 rounded-md border border-amber-400/20">
                            {slot.time}
                          </span>
                          <h4 className="text-sm font-semibold text-white">{slot.activity}</h4>
                        </div>
                        <span className="text-[11px] text-white/40 font-mono">{slot.duration}</span>
                      </div>

                      <div className="flex items-center gap-2 mb-2 text-xs text-emerald-400/90 font-medium">
                        <MapPin size={13} />
                        <span>{slot.location}</span>
                      </div>

                      <p className="text-xs text-white/50 leading-relaxed mb-3">
                        {slot.description}
                      </p>

                      <div className="flex gap-2">
                        <button className="text-[11px] bg-slate-800 hover:bg-slate-700 text-white font-medium py-1.5 px-3 rounded-lg border border-white/[0.08] flex items-center gap-1.5 transition-colors">
                          <NavigationArrow size={12} className="text-amber-400" />
                          Directions
                        </button>
                        <button className="text-[11px] bg-slate-950 hover:bg-slate-800 text-white/60 hover:text-white font-medium py-1.5 px-3 rounded-lg border border-white/[0.08] transition-colors">
                          Local Guide Tips
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Recommendations Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-slate-950 border border-white/[0.08] rounded-xl p-5">
                <div className="text-[10px] font-bold text-white/40 uppercase tracking-[0.2em] mb-3">
                  Safety & Advisory
                </div>
                <ul className="space-y-2 text-xs text-white/60">
                  <li className="flex items-start gap-2">
                    <span className="text-emerald-400 font-bold">•</span>
                    Verified local boatmen associations active on ghats
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-emerald-400 font-bold">•</span>
                    Official UPI QR acceptance enabled at heritage ticket gates
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-emerald-400 font-bold">•</span>
                    24/7 Tourist Police Station within 800m
                  </li>
                </ul>
              </div>

              <div className="bg-slate-950 border border-white/[0.08] rounded-xl p-5">
                <div className="text-[10px] font-bold text-white/40 uppercase tracking-[0.2em] mb-3">
                  Live Conditions
                </div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs text-white/70">Clear Skies</span>
                  <span className="text-lg font-bold text-white font-mono">27°C</span>
                </div>
                <p className="text-[11px] text-white/40 leading-snug">
                  Optimal humidity for morning heritage walks. Sunset view conditions verified favorable.
                </p>
              </div>

              <div className="bg-slate-950 border border-white/[0.08] rounded-xl p-5">
                <div className="text-[10px] font-bold text-white/40 uppercase tracking-[0.2em] mb-3">
                  Digital Travel Pass
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-14 h-14 bg-slate-900 border border-white/[0.1] rounded-lg flex items-center justify-center text-[10px] font-mono text-emerald-400">
                    QR-PASS
                  </div>
                  <div>
                    <span className="text-xs font-semibold text-white block">Raahi Monument Access</span>
                    <span className="text-[11px] text-emerald-400 flex items-center gap-1 mt-0.5">
                      <Check size={12} weight="bold" /> Active & Verified
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Map View */}
        {viewMode === "map" && (
          <div className="bg-slate-950 border border-white/[0.08] rounded-xl p-8 text-center">
            <div className="w-full h-80 bg-slate-900 border border-white/[0.08] rounded-xl flex flex-col items-center justify-center mb-4 p-6">
              <MapPin size={40} className="text-amber-400 mb-3" />
              <h3 className="text-base font-bold text-white mb-1">Spatial Radar for {tripData.destination}</h3>
              <p className="text-xs text-white/50 max-w-md">
                Connecting to Ministry of Tourism GIS mapping layers for real-time crowd densities, certified guides, and heritage stops.
              </p>
            </div>
            <p className="text-xs text-white/40">Real-time geospatial telemetry enabled for all licensed checkpoints.</p>
          </div>
        )}
      </div>

      {/* Action Footer */}
      <div className="p-6 border-t border-white/[0.08] bg-slate-950/60 flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="text-xs text-white/50">
          Official master itinerary generated by <strong className="text-amber-400 font-semibold">Raahi Tourism Engine</strong>
        </div>
        <div className="flex items-center gap-3">
          <button
            onClick={() => window.print()}
            className="px-4 py-2.5 bg-slate-800 hover:bg-slate-700 text-white text-xs font-semibold rounded-xl border border-white/[0.08] flex items-center gap-2 transition-colors"
          >
            <DownloadSimple size={15} />
            Export Document
          </button>
          <button
            className="px-5 py-2.5 bg-emerald-500 hover:bg-emerald-400 text-slate-950 text-xs font-bold rounded-xl transition-colors"
          >
            Lock & Confirm Journey
          </button>
        </div>
      </div>
    </div>
  );
}
