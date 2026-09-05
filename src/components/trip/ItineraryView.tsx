"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Clock, MapPin, Coffee, Camera, Sun, Moon, NavigationArrow, Calendar, Users, CurrencyInr } from "@phosphor-icons/react";

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

  // Generate sample itinerary based on destination and activities
  const generateItinerary = (): ItineraryDay[] => {
    const days: ItineraryDay[] = [];
    const themeMap = ["Cultural Immersion", "Heritage Exploration", "Local Experiences", "Relax & Reflect"];
    const iconMap = [<Sun size={16} />, <Coffee size={16} />, <Camera size={16} />, <MapPin size={16} />];

    const baseDate = new Date(tripData.arrivalDate);

    for (let i = 0; i < tripData.durationDays; i++) {
      const currentDate = new Date(baseDate);
      currentDate.setDate(currentDate.getDate() + i);

      days.push({
        day: i + 1,
        title: `Day ${i + 1}: ${themeMap[i % themeMap.length]}`,
        date: currentDate.toLocaleDateString('en-IN', { weekday: 'short', day: 'numeric', month: 'short' }),
        theme: themeMap[i % themeMap.length],
        timeSlots: [
          {
            time: "06:00",
            activity: "Sunrise Experience",
            icon: <Sun size={16} weight="fill" className="text-orange-400" />,
            duration: "2h",
            location: i === 0 ? "Assi Ghat" : i === 1 ? "Dashashwamedh Ghat" : "Local Riverbank",
            description: "Boat ride with chai, watching the city wake up"
          },
          {
            time: "08:30",
            activity: "Breakfast & Local Delicacies",
            icon: <Coffee size={16} weight="fill" className="text-amber-400" />,
            duration: "1.5h",
            location: i === 0 ? "Blue Lassi Shop" : i === 1 ? "Kachori Gali" : "Heritage Cafe",
            description: "Authentic local breakfast with a food guide"
          },
          {
            time: "10:00",
            activity: tripData.selectedActivities[i % tripData.selectedActivities.length] || "Heritage Walking Tour",
            icon: <MapPin size={16} weight="fill" className="text-emerald-400" />,
            duration: "3h",
            location: "Main Heritage Zone",
            description: "Guided exploration of key landmarks with historical context"
          },
          {
            time: "13:30",
            activity: "Lunch Break & Relax",
            icon: <Coffee size={16} weight="fill" className="text-amber-400" />,
            duration: "2h",
            location: i === 0 ? "Traditional Thali House" : i === 1 ? "Rooftop Restaurant" : "Street Food Trail",
            description: "Local cuisine tasting with free time"
          },
          {
            time: "15:30",
            activity: i === 0 ? "Silk & Handloom Tour" : i === 1 ? "Photography Session" : "Cultural Workshop",
            icon: <Camera size={16} weight="fill" className="text-purple-400" />,
            duration: "2.5h",
            location: i === 0 ? "Bunkar Colony" : i === 1 ? "Hidden Photo Spots" : "Artisan Center",
            description: "Interactive experience with local craftspeople"
          },
          {
            time: "18:30",
            activity: "Evening Rituals & Aarti",
            icon: <Moon size={16} weight="fill" className="text-blue-400" />,
            duration: "2h",
            location: "Main Ghat",
            description: "Evening ceremonies and cultural performances"
          },
          {
            time: "20:30",
            activity: "Dinner & Local Recommendations",
            icon: <Coffee size={16} weight="fill" className="text-amber-400" />,
            duration: "2h",
            location: "Curated Restaurant List",
            description: "Based on your preferences and budget"
          }
        ]
      });
    }

    return days;
  };

  const itineraryDays = generateItinerary();
  const activeDayData = itineraryDays.find(day => day.day === activeDay);

  // Budget range display
  const getBudgetDisplay = () => {
    const ranges: Record<string, string> = {
      "smart": "₹10K - 20K",
      "comfort": "₹20K - 35K",
      "premium": "₹35K - 50K",
      "bespoke": "Custom"
    };
    return ranges[tripData.budgetRange] || "₹20K - 35K";
  };

  return (
    <div className="w-full max-w-6xl mx-auto bg-gradient-to-br from-slate-900 to-slate-950 rounded-3xl shadow-2xl overflow-hidden">
      {/* Header */}
      <div className="p-8 md:p-10 border-b border-white/10 bg-gradient-to-r from-slate-800/30 via-slate-800/20 to-slate-800/10">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
          <div>
            <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">
              Your <span className="text-amber-400">Raahi</span> Itinerary
            </h1>
            <div className="flex flex-wrap items-center gap-4 text-sm text-white/60">
              <div className="flex items-center gap-2">
                <MapPin size={16} />
                <span className="font-medium text-white/80">{tripData.destination}, {tripData.state}</span>
              </div>
              <div className="flex items-center gap-2">
                <Calendar size={16} />
                <span>{tripData.arrivalDate} → {tripData.departureDate}</span>
              </div>
              <div className="flex items-center gap-2">
                <Users size={16} />
                <span>{tripData.groupSize} {tripData.groupSize === 1 ? 'Person' : 'People'}</span>
              </div>
              <div className="flex items-center gap-2">
                <CurrencyInr size={16} />
                <span className="font-medium text-amber-400">{getBudgetDisplay()}</span>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => setViewMode("timeline")}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                viewMode === "timeline"
                  ? "bg-amber-400 text-slate-900"
                  : "bg-slate-800 text-white/70 hover:bg-slate-700"
              }`}
            >
              <Clock size={18} className="inline mr-2" />
              Timeline
            </button>
            <button
              onClick={() => setViewMode("map")}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                viewMode === "map"
                  ? "bg-amber-400 text-slate-900"
                  : "bg-slate-800 text-white/70 hover:bg-slate-700"
              }`}
            >
              <MapPin size={18} className="inline mr-2" />
              Map View
            </button>
          </div>
        </div>
      </div>

      <div className="p-8 md:p-10">
        {/* Day Selector */}
        <div className="mb-8">
          <div className="flex items-center gap-2 mb-4">
            <span className="text-sm font-semibold text-white/60 uppercase tracking-wider">Daily Breakdown</span>
            <div className="h-px flex-1 bg-white/10"></div>
          </div>
          <div className="flex flex-wrap gap-3">
            {itineraryDays.map((day) => (
              <motion.button
                key={day.day}
                onClick={() => setActiveDay(day.day)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.98 }}
                className={`px-5 py-3 rounded-xl border transition-all ${
                  activeDay === day.day
                    ? "bg-amber-400 text-slate-900 border-amber-400 shadow-xl shadow-amber-400/20"
                    : "bg-slate-800 border-white/10 text-white/80 hover:border-white/25"
                }`}
              >
                <div className="text-left">
                  <div className="font-bold text-lg mb-1">Day {day.day}</div>
                  <div className="text-xs opacity-80">{day.date}</div>
                  <div className="text-xs font-semibold mt-1">{day.theme}</div>
                </div>
              </motion.button>
            ))}
          </div>
        </div>

        {/* Timeline View */}
        {viewMode === "timeline" && activeDayData && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="space-y-6"
          >
            <div className="bg-slate-800/30 rounded-2xl p-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-bold text-white">{activeDayData.title}</h3>
                <span className="text-sm font-medium text-amber-400">{activeDayData.date}</span>
              </div>

              {/* Timeline */}
              <div className="relative pl-6">
                {/* Vertical line */}
                <div className="absolute left-[13px] top-0 bottom-0 w-[2px] bg-gradient-to-b from-amber-400 via-amber-400/40 to-transparent"></div>

                {activeDayData.timeSlots.map((slot, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3, delay: index * 0.1 }}
                    className="relative mb-8 last:mb-0"
                  >
                    {/* Timeline dot */}
                    <div className="absolute left-[-13px] top-[2px] w-8 h-8 rounded-full bg-slate-900 border-2 border-amber-400 flex items-center justify-center">
                      {slot.icon}
                    </div>

                    <div className="ml-8">
                      <div className="flex flex-wrap items-center justify-between mb-2">
                        <div className="flex items-center gap-4">
                          <span className="text-lg font-bold text-white bg-slate-800 px-3 py-1 rounded-lg">
                            {slot.time}
                          </span>
                          <h4 className="text-lg font-bold text-white">{slot.activity}</h4>
                        </div>
                        <span className="text-sm font-medium text-amber-400">{slot.duration}</span>
                      </div>

                      <div className="flex items-center gap-2 mb-2 text-sm text-white/60">
                        <MapPin size={14} />
                        <span>{slot.location}</span>
                      </div>

                      <p className="text-white/70 text-sm leading-relaxed mb-4">
                        {slot.description}
                      </p>

                      <div className="flex gap-3">
                        <button className="text-xs bg-amber-400 hover:bg-amber-500 text-slate-900 font-bold py-2 px-4 rounded-lg flex items-center gap-1.5 transition-colors">
                          <NavigationArrow size={14} />
                          Navigate
                        </button>
                        <button className="text-xs bg-white/10 hover:bg-white/20 text-white font-bold py-2 px-4 rounded-lg transition-colors">
                          Save for Later
                        </button>
                        <button className="text-xs bg-white/10 hover:bg-white/20 text-white font-bold py-2 px-4 rounded-lg transition-colors">
                          Adjust Timing
                        </button>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Recommendations Panel */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-slate-800/30 border border-white/10 rounded-2xl p-5">
                <div className="text-xs font-bold text-white/50 uppercase tracking-wider mb-3">Daily Tips</div>
                <ul className="space-y-2 text-sm text-white/70">
                  <li className="flex items-start gap-2">
                    <span className="text-amber-400">•</span>
                    Wear comfortable walking shoes (8,000+ steps expected)
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-amber-400">•</span>
                    Carry cash for small vendors and temples
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-amber-400">•</span>
                    Book boat ride in advance for best rates
                  </li>
                </ul>
              </div>

              <div className="bg-slate-800/30 border border-white/10 rounded-2xl p-5">
                <div className="text-xs font-bold text-white/50 uppercase tracking-wider mb-3">Weather Forecast</div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm text-white">Mostly Sunny</span>
                  <span className="text-lg font-bold text-white">28°C</span>
                </div>
                <div className="text-xs text-white/50">Perfect for outdoor exploration</div>
              </div>

              <div className="bg-slate-800/30 border border-white/10 rounded-2xl p-5">
                <div className="text-xs font-bold text-white/50 uppercase tracking-wider mb-3">Travel Pass</div>
                <div className="text-center">
                  <div className="w-32 h-32 mx-auto bg-gradient-to-br from-slate-700 to-slate-800 rounded-xl flex items-center justify-center mb-3">
                    <div className="text-white font-mono text-sm">RAAHI-PASS</div>
                  </div>
                  <div className="text-xs text-white/60">Show this QR at partner locations</div>
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {/* Map View Placeholder */}
        {viewMode === "map" && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="bg-slate-800/30 rounded-2xl p-8 text-center"
          >
            <div className="w-full h-96 bg-gradient-to-br from-slate-800 to-slate-900 rounded-xl flex items-center justify-center mb-6">
              <div className="text-center">
                <MapPin size={48} className="text-amber-400 mx-auto mb-4" />
                <h3 className="text-xl font-bold text-white mb-2">Live Map Integration</h3>
                <p className="text-white/60">Connecting to Google Maps API for real-time location tracking</p>
              </div>
            </div>
            <p className="text-sm text-white/50">Showing partner locations, recommended routes, and live traffic for {tripData.destination}</p>
          </motion.div>
        )}
      </div>

      {/* Action Bar */}
      <div className="p-8 border-t border-white/10 bg-slate-800/20">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="text-sm text-white/60">
            <strong className="text-amber-400">Pro tip:</strong> Download PDF or sync to calendar for offline access
          </div>
          <div className="flex gap-4">
            <button className="px-6 py-3 bg-white/10 hover:bg-white/20 text-white font-bold rounded-xl transition-colors">
              Export PDF
            </button>
            <button className="px-6 py-3 bg-amber-400 hover:bg-amber-500 text-slate-900 font-bold rounded-xl shadow-lg shadow-amber-400/20 transition-all">
              Book This Trip
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}