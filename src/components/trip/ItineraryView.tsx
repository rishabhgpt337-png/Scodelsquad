"use client";

import { useState, useEffect, useRef } from "react";
import { animate, stagger } from "animejs";
import { Clock, MapPin, Coffee, Camera, Sun, Moon, NavigationArrow, Calendar, Users, CurrencyInr, DownloadSimple, Check, Info } from "@phosphor-icons/react";
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
    category?: string;
    localGuideTip?: string;
    coordinates?: { lat: number; lng: number };
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
    days?: any[];
  };
}

export default function ItineraryView({ tripData }: ItineraryViewProps) {
  const [activeDay, setActiveDay] = useState<number>(1);
  const [viewMode, setViewMode] = useState<"timeline" | "map">("timeline");
  const timelineRef = useRef<HTMLDivElement>(null);
  const [expandedTips, setExpandedTips] = useState<string[]>([]);

  const toggleTip = (id: string) => {
    setExpandedTips((prev) => prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]);
  };

  const destData = DESTINATION_DETAILS[tripData.destination] || DESTINATION_DETAILS.default;

  const getSlotIcon = (slot: any) => {
    if (slot.icon && typeof slot.icon === 'object' && '$$typeof' in slot.icon) {
      return slot.icon;
    }
    const time = slot.time || "";
    const hour = parseInt(time.split(":")[0], 10) || 12;
    const activity = (slot.activity || "").toLowerCase();
    const category = (slot.category || "").toLowerCase();

    if (activity.includes("breakfast") || activity.includes("lunch") || activity.includes("dinner") || activity.includes("food") || activity.includes("eat") || category.includes("culinary")) {
      return <Coffee size={15} weight="bold" className="text-[#C8B79F]" />;
    }
    if (hour < 8 || activity.includes("sunrise") || category.includes("sunrise")) {
      return <Sun size={15} weight="bold" className="text-[#C8B79F]" />;
    }
    if (hour >= 18 || activity.includes("sunset") || activity.includes("aarti") || activity.includes("night")) {
      return <Moon size={15} weight="bold" className="text-[#C8B79F]" />;
    }
    if (activity.includes("craft") || activity.includes("workshop") || activity.includes("artisan") || activity.includes("photo")) {
      return <Camera size={15} weight="bold" className="text-[#C8B79F]" />;
    }
    return <MapPin size={15} weight="bold" className="text-[#C8B79F]" />;
  };

  const generateItinerary = (): ItineraryDay[] => {
    if (tripData.days && tripData.days.length > 0) {
      return tripData.days.map((d: any, idx: number) => ({
        day: d.day || idx + 1,
        title: d.title || `Day ${idx + 1}: ${d.theme || "Cultural Discovery"}`,
        date: d.date || (() => {
          const dt = new Date(tripData.arrivalDate);
          dt.setDate(dt.getDate() + idx);
          return dt.toLocaleDateString("en-IN", { weekday: "short", day: "numeric", month: "short" });
        })(),
        theme: d.theme || "Curated Experience",
        timeSlots: (d.timeSlots || []).map((slot: any) => ({
          ...slot,
          icon: getSlotIcon(slot),
        })),
      }));
    }
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
            icon: <Sun size={15} weight="bold" className="text-[#C8B79F]" />,
            duration: "2h",
            location: morningSpots[i % morningSpots.length],
            description: "Start your morning with verified local vantage points before peak crowds."
          },
          {
            time: "08:30",
            activity: "Traditional Breakfast",
            icon: <Coffee size={15} weight="bold" className="text-[#C8B79F]" />,
            duration: "1.5h",
            location: foodSpots[0],
            description: "Authentic local culinary spread endorsed by neighborhood vendors."
          },
          {
            time: "10:00",
            activity: tripData.selectedActivities[i % (tripData.selectedActivities.length || 1)] || "Heritage Walking Tour",
            icon: <MapPin size={15} weight="bold" className="text-[#C8B79F]" />,
            duration: "3h",
            location: landmarks[0],
            description: "Curated historical access led by registered community guides."
          },
          {
            time: "13:30",
            activity: "Regional Lunch & Midday Rest",
            icon: <Coffee size={15} weight="bold" className="text-[#C8B79F]" />,
            duration: "2h",
            location: foodSpots[1] || foodSpots[0],
            description: "Culinary tasting paired with quiet cultural immersion."
          },
          {
            time: "15:30",
            activity: i === 0 ? "Artisan Workshop & Guild Walk" : "Community Craft Visit",
            icon: <Camera size={15} weight="bold" className="text-[#C8B79F]" />,
            duration: "2.5h",
            location: "Local Artisan Quarter",
            description: "Direct encounter with verified traditional craftspeople."
          },
          {
            time: "18:30",
            activity: i % 2 === 0 ? "Evening Aarti & Viewpoint" : "Sunset Heritage Gathering",
            icon: <Moon size={15} weight="bold" className="text-[#C8B79F]" />,
            duration: "2h",
            location: morningSpots[(i + 1) % morningSpots.length] || "Main Ghat",
            description: "Witness timeless ritual traditions with safe crowd-flow management."
          },
          {
            time: "20:30",
            activity: "Evening Dinner",
            icon: <Coffee size={15} weight="bold" className="text-[#C8B79F]" />,
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
          translateY: [20, 0],
          opacity: [0, 1],
          duration: 600,
          ease: "outExpo",
          delay: stagger(60)
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
    <div className="w-full bg-[#151310] border border-white/[0.08] rounded-xl overflow-hidden shadow-sm">
      {/* Header */}
      <div className="p-8 md:p-10 border-b border-white/[0.08] bg-[#0D0C0A]">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="w-1.5 h-1.5 rounded-full bg-[#C8B79F]" />
              <span className="text-[10px] font-bold uppercase tracking-[0.25em] text-[#C8B79F]">
                Verified Master Plan
              </span>
            </div>
            <h1 className="text-3xl md:text-4xl font-normal text-[#F3EDE3] mb-4 tracking-tight" style={{ fontFamily: "var(--font-playfair, serif)" }}>
              Itinerary: <span className="italic text-[#C8B79F]">{tripData.destination}</span>
            </h1>
            <div className="flex flex-wrap items-center gap-4 text-xs text-[#A9A096]">
              <div className="flex items-center gap-1.5">
                <MapPin size={14} className="text-[#C8B79F]" />
                <span className="text-[#F3EDE3] font-medium">{tripData.destination}, {tripData.state}</span>
              </div>
              <span className="text-white/20">•</span>
              <div className="flex items-center gap-1.5">
                <Calendar size={14} className="text-[#A9A096]" />
                <span>{tripData.arrivalDate} → {tripData.departureDate} ({tripData.durationDays} Days)</span>
              </div>
              <span className="text-white/20">•</span>
              <div className="flex items-center gap-1.5">
                <Users size={14} className="text-[#A9A096]" />
                <span>{tripData.groupSize} Traveler{tripData.groupSize > 1 ? "s" : ""}</span>
              </div>
              <span className="text-white/20">•</span>
              <div className="flex items-center gap-1.5">
                <CurrencyInr size={14} className="text-[#C8B79F]" />
                <span className="text-[#C8B79F] font-medium">{getBudgetDisplay()}</span>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2 bg-[#0D0C0A] border border-white/[0.08] p-1 rounded-lg">
            <button
              onClick={() => setViewMode("timeline")}
              className={`px-4 py-2 rounded text-xs font-medium tracking-wider uppercase transition-colors ${
                viewMode === "timeline"
                  ? "bg-white/[0.08] text-[#F3EDE3]"
                  : "text-[#A9A096] hover:text-[#F3EDE3]"
              }`}
            >
              <Clock size={13} className="inline mr-1.5" />
              Timeline
            </button>
            <button
              onClick={() => setViewMode("map")}
              className={`px-4 py-2 rounded text-xs font-medium tracking-wider uppercase transition-colors ${
                viewMode === "map"
                  ? "bg-white/[0.08] text-[#F3EDE3]"
                  : "text-[#A9A096] hover:text-[#F3EDE3]"
              }`}
            >
              <MapPin size={13} className="inline mr-1.5" />
              Map Radar
            </button>
          </div>
        </div>
      </div>

      <div className="p-8 md:p-10">
        {/* Day Selector */}
        <div className="mb-10">
          <div className="text-[10px] font-bold uppercase tracking-[0.25em] text-[#A9A096] mb-4">
            Schedule Days
          </div>
          <div className="flex flex-wrap gap-3">
            {itineraryDays.map((day) => (
              <button
                key={day.day}
                onClick={() => setActiveDay(day.day)}
                className={`text-left px-5 py-3.5 rounded-lg border transition-all ${
                  activeDay === day.day
                    ? "bg-white/[0.06] border-[#C8B79F] text-[#F3EDE3]"
                    : "bg-[#0D0C0A] border-white/[0.08] text-[#A9A096] hover:border-white/20"
                }`}
              >
                <div className="flex items-center gap-2 mb-1">
                  <span className="font-medium text-xs text-[#F3EDE3]">Day {day.day}</span>
                  <span className="text-[10px] text-[#C8B79F]">{day.date}</span>
                </div>
                <div className="text-[11px] text-[#A9A096] truncate max-w-[140px] font-light">{day.theme}</div>
              </button>
            ))}
          </div>
        </div>

        {/* Timeline View */}
        {viewMode === "timeline" && activeDayData && (
          <div ref={timelineRef} className="space-y-8">
            <div className="bg-[#0D0C0A] border border-white/[0.08] rounded-lg p-6 md:p-8">
              <div className="flex items-center justify-between pb-6 mb-8 border-b border-white/[0.08]">
                <div>
                  <h3 className="text-xl font-normal text-[#F3EDE3]" style={{ fontFamily: "var(--font-playfair, serif)" }}>{activeDayData.title}</h3>
                  <p className="text-xs text-[#A9A096] mt-1 font-light">{activeDayData.theme} • Curated Sequence</p>
                </div>
                <span className="text-[11px] font-medium tracking-widest uppercase px-3 py-1 bg-white/[0.04] text-[#C8B79F] border border-white/[0.08] rounded">
                  {activeDayData.date}
                </span>
              </div>

              {/* Timeline Items */}
              <div className="relative pl-6 space-y-6">
                <div className="absolute left-[11px] top-2 bottom-2 w-[1px] bg-white/[0.08]" />

                {activeDayData.timeSlots.map((slot, index) => (
                  <div key={index} className="timeline-slot opacity-0 relative group">
                    <div className="absolute left-[-23px] top-1 w-6 h-6 rounded-full bg-[#151310] border border-white/[0.12] flex items-center justify-center">
                      {slot.icon}
                    </div>

                    <div className="bg-[#151310] border border-white/[0.06] rounded-lg p-5 hover:border-white/[0.15] transition-colors">
                      <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
                        <div className="flex items-center gap-3">
                          <span className="text-xs font-mono text-[#C8B79F] bg-white/[0.03] px-2.5 py-1 rounded border border-white/[0.06]">
                            {slot.time}
                          </span>
                          <h4 className="text-sm font-medium text-[#F3EDE3]">{slot.activity}</h4>
                        </div>
                        <span className="text-[11px] text-[#A9A096] font-mono">{slot.duration}</span>
                      </div>

                      <div className="flex items-center gap-2 mb-3 text-xs text-[#C8B79F]">
                        <MapPin size={13} />
                        <span>{slot.location}</span>
                      </div>

                      <p className="text-xs text-[#A9A096] leading-relaxed mb-4 font-light">
                        {slot.description}
                      </p>

                      <div className="flex gap-3">
                        <button
                          onClick={() => {
                            let destinationQuery = slot.location || slot.activity;
                            if (tripData.destination) {
                              const cityContext = `${tripData.destination}, ${tripData.state || 'India'}`;
                              if (!destinationQuery.toLowerCase().includes(tripData.destination.toLowerCase())) {
                                destinationQuery = `${destinationQuery}, ${cityContext}`;
                              }
                            }
                            const mapsUrl = `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(destinationQuery)}`;
                            window.open(mapsUrl, '_blank');
                          }}
                          className="text-[11px] uppercase tracking-wider bg-white/[0.04] hover:bg-white/[0.08] text-[#F3EDE3] font-medium py-2 px-3.5 rounded border border-white/[0.08] flex items-center gap-2 transition-colors"
                        >
                          <NavigationArrow size={12} className="text-[#C8B79F]" />
                          Directions
                        </button>
                        <button
                          onClick={() => toggleTip(`${activeDayData.day}-${index}`)}
                          className={`text-[11px] uppercase tracking-wider font-medium py-2 px-3.5 rounded border transition-colors flex items-center gap-2 ${
                            expandedTips.includes(`${activeDayData.day}-${index}`)
                              ? "bg-white/[0.08] text-[#C8B79F] border-[#C8B79F]"
                              : "bg-[#0D0C0A] hover:bg-white/[0.04] text-[#A9A096] hover:text-[#F3EDE3] border-white/[0.08]"
                          }`}
                        >
                          <Info size={12} weight="bold" className={expandedTips.includes(`${activeDayData.day}-${index}`) ? "text-[#C8B79F]" : ""} />
                          {expandedTips.includes(`${activeDayData.day}-${index}`) ? "Hide Tip" : "Local Guide Tip"}
                        </button>
                      </div>

                      {expandedTips.includes(`${activeDayData.day}-${index}`) && slot.localGuideTip && (
                        <div className="mt-4 bg-[#0D0C0A] border border-[#C8B79F]/30 rounded-lg p-4 transition-all">
                          <div className="flex items-center gap-2 mb-1.5">
                            <span className="w-1.5 h-1.5 rounded-full bg-[#C8B79F]" />
                            <span className="text-[#C8B79F] font-bold text-[10px] uppercase tracking-[0.2em]">Elder's Secret</span>
                          </div>
                          <p className="text-xs text-[#F3EDE3]/90 leading-relaxed italic font-light">
                            "{slot.localGuideTip}"
                          </p>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Recommendations Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-[#0D0C0A] border border-white/[0.08] rounded-lg p-6">
                <div className="text-[10px] font-bold text-[#A9A096] uppercase tracking-[0.2em] mb-4">
                  Safety & Advisory
                </div>
                <ul className="space-y-3 text-xs text-[#A9A096] font-light">
                  <li className="flex items-start gap-2">
                    <span className="text-[#C8B79F]">•</span>
                    Verified local boatmen associations active on ghats
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-[#C8B79F]">•</span>
                    Official UPI QR acceptance enabled at heritage ticket gates
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-[#C8B79F]">•</span>
                    24/7 Tourist Police Station within 800m
                  </li>
                </ul>
              </div>

              <div className="bg-[#0D0C0A] border border-white/[0.08] rounded-lg p-6">
                <div className="text-[10px] font-bold text-[#A9A096] uppercase tracking-[0.2em] mb-4">
                  Live Conditions
                </div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs text-[#F3EDE3]">Clear Skies</span>
                  <span className="text-lg font-medium text-[#F3EDE3] font-mono">27°C</span>
                </div>
                <p className="text-xs text-[#A9A096] leading-relaxed font-light">
                  Optimal humidity for morning heritage walks. Sunset view conditions verified favorable.
                </p>
              </div>

              <div className="bg-[#0D0C0A] border border-white/[0.08] rounded-lg p-6">
                <div className="text-[10px] font-bold text-[#A9A096] uppercase tracking-[0.2em] mb-4">
                  Digital Travel Pass
                </div>
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-white/[0.03] border border-white/[0.1] rounded flex items-center justify-center text-[10px] font-mono text-[#C8B79F]">
                    PASS
                  </div>
                  <div>
                    <span className="text-xs font-medium text-[#F3EDE3] block">Raahi Monument Access</span>
                    <span className="text-[11px] text-[#C8B79F] flex items-center gap-1 mt-1">
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
          <div className="bg-[#0D0C0A] border border-white/[0.08] rounded-lg p-6 md:p-8 text-center">
            <h3 className="text-xl font-normal text-[#F3EDE3] mb-2" style={{ fontFamily: "var(--font-playfair, serif)" }}>Spatial Radar: {tripData.destination}</h3>
            <p className="text-xs text-[#A9A096] mb-6 font-light">
              Interactive local telemetry and mapped checkpoints via Google Maps.
            </p>
            <div className="w-full h-[400px] bg-[#151310] border border-white/[0.08] rounded-lg flex flex-col items-center justify-center relative overflow-hidden shadow-inner">
              {tripData.destination ? (
                <iframe
                  title={`Map of ${tripData.destination}`}
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  loading="lazy"
                  allowFullScreen
                  src={`https://maps.google.com/maps?q=${encodeURIComponent(
                    tripData.destination + (tripData.state ? ", " + tripData.state : ", India")
                  )}&t=&z=13&ie=UTF8&iwloc=&output=embed`}
                ></iframe>
              ) : (
                <div className="p-6">
                  <MapPin size={32} className="text-[#C8B79F] mb-3 mx-auto" />
                  <p className="text-[#F3EDE3] text-sm">Connecting to Map Services...</p>
                </div>
              )}
            </div>
          </div>
        )}
      </div>

      {/* Action Footer */}
      <div className="p-6 md:p-8 border-t border-white/[0.08] bg-[#0D0C0A] flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="text-xs text-[#A9A096] font-light">
          Official master itinerary generated by <strong className="text-[#F3EDE3] font-medium">Raahi Tourism Engine</strong>
        </div>
        <div className="flex items-center gap-4">
          <button
            onClick={() => window.print()}
            className="px-6 py-3 bg-white/[0.03] hover:bg-white/[0.08] text-[#F3EDE3] text-xs font-medium tracking-widest uppercase rounded border border-white/[0.08] flex items-center gap-2 transition-colors"
          >
            <DownloadSimple size={14} />
            Export
          </button>
          <button
            className="px-6 py-3 bg-[#F3EDE3] hover:bg-white text-[#0D0C0A] text-xs font-medium tracking-widest uppercase rounded transition-colors"
          >
            Confirm Plan
          </button>
        </div>
      </div>
    </div>
  );
}
