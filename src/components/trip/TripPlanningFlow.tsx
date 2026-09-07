"use client";

import { useState } from "react";
import {
  Calendar, Users, CurrencyInr, Sparkle, ArrowRight, CheckCircle, MapPin,
  Clock, Heart, ShieldCheck, PaintBrush, Leaf, ForkKnife, Compass, Sparkle as SparkleIcon
} from "@phosphor-icons/react";
import { Destination } from "@/context/DestinationContext";

interface Step {
  id: number;
  title: string;
  icon: React.ReactNode;
}

const STEPS: Step[] = [
  { id: 1, title: "Trip Params", icon: <Calendar size={18} /> },
  { id: 2, title: "Party & Pace", icon: <Users size={18} /> },
  { id: 3, title: "Budget Tier", icon: <CurrencyInr size={18} /> },
  { id: 4, title: "Persona & Vibe", icon: <Sparkle size={18} /> },
  { id: 5, title: "Artisans & Guilds", icon: <PaintBrush size={18} /> },
  { id: 6, title: "Culinary Trails", icon: <ForkKnife size={18} /> },
  { id: 7, title: "Activity Focus", icon: <MapPin size={18} /> },
  { id: 8, title: "Safety & Passes", icon: <ShieldCheck size={18} /> },
];

export const BUDGET_RANGES = [
  { id: "smart", label: "Smart Explorer", range: "₹10,000 - ₹20,000", desc: "Authentic homestays, verified heritage walks & local culinary gems" },
  { id: "comfort", label: "Comfort Plus", range: "₹20,000 - ₹35,000", desc: "Heritage havelis, AC transport & curated Ministry-guided slots" },
  { id: "premium", label: "Heritage Luxury", range: "₹35,000 - ₹50,000", desc: "Boutique royal suites, private dawn boat & fine regal dining" },
  { id: "bespoke", label: "Bespoke Royal", range: "₹50,000+", desc: "VIP access, private masterclass with generational artisans" },
];

const PERSONAS = [
  { id: "heritage", title: "Heritage & History Connoisseur", desc: "Deep architectural marvels, hidden inscriptions & ancient texts" },
  { id: "spiritual", title: "Spiritual Seeker", desc: "Sunrise ghat aartis, sacred temple darshans & meditation retreats" },
  { id: "culinary", title: "Gastronomic Explorer", desc: "Generational street eats, royal thalis & spice bazaar secret trails" },
  { id: "photography", title: "Visual Storyteller", desc: "Golden hour viewpoints, aerial vantage points & uncrowded corners" },
];

const ARTISAN_CRAFTS = [
  "Zardozi & Silk Handloom Guilds",
  "Handcrafted Terracotta & Pottery",
  "Generational Brass & Metal Craft",
  "Miniature Heritage Canvas Painting",
  "Wood Carving & Stone Filigree",
  "Natural Botanical Perfumes (Attar)",
];

const CULINARY_PREFS = [
  "Strict Pure Vegetarian (Satvik)",
  "Royal Mughlai & Nawabi Heritage",
  "Traditional Local Sweets & Lassi Trails",
  "Historic Street Food Legends (100+ Yrs)",
  "Temple Prasad & Community Kitchens",
];

const ACTIVITIES_LIST = [
  "Private Dawn Boat Procession",
  "Offbeat Ghat & Old Lane Secret Walk",
  "Master Artisan Loom Interactive Workshop",
  "VIP Reserved Evening Aarti Pavilions",
  "Fortification Rampart Sunset Viewpoint",
  "Museum & Rare Manuscripts Private Tour",
];

interface TripPlanningFlowProps {
  destination: Destination;
  onComplete: (tripData: any) => void;
}

export default function TripPlanningFlow({ destination, onComplete }: TripPlanningFlowProps) {
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    arrivalDate: "2026-10-28",
    durationDays: 3,
    groupSize: 2,
    travelParty: "couple",
    pace: "balanced",
    budgetRange: "comfort",
    persona: "heritage",
    selectedCrafts: [] as string[],
    selectedCulinary: [] as string[],
    selectedActivities: [] as string[],
    includeFestivalAlerts: true,
    digitalPassRequested: true,
    safetyAssistance: true,
  });

  const toggleArrayItem = (key: 'selectedCrafts' | 'selectedCulinary' | 'selectedActivities', item: string) => {
    setFormData(prev => ({
      ...prev,
      [key]: prev[key].includes(item)
        ? prev[key].filter(i => i !== item)
        : [...prev[key], item]
    }));
  };

  const handleSubmit = async () => {
    setLoading(true);
    try {
      const response = await fetch('/api/itinerary/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          destination: destination.name,
          state: destination.state,
          arrivalDate: formData.arrivalDate,
          durationDays: formData.durationDays,
          budgetRange: formData.budgetRange,
          groupSize: formData.groupSize,
          travelPersona: formData.persona,
          pace: formData.pace,
          selectedActivities: [
            ...formData.selectedActivities,
            ...formData.selectedCrafts,
            ...formData.selectedCulinary
          ],
        }),
      });
      const data = await response.json();
      onComplete(data.itinerary || {
        destination: destination.name,
        state: destination.state || 'India',
        arrivalDate: formData.arrivalDate,
        durationDays: formData.durationDays,
        budgetRange: formData.budgetRange,
        groupSize: formData.groupSize,
        selectedActivities: formData.selectedActivities,
      });
    } catch (e) {
      console.error("Itinerary submission failed:", e);
      // Fallback
      onComplete({
        destination: destination.name,
        state: destination.state || 'India',
        arrivalDate: formData.arrivalDate,
        durationDays: formData.durationDays,
        budgetRange: formData.budgetRange,
        groupSize: formData.groupSize,
        selectedActivities: formData.selectedActivities,
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full bg-slate-900/90 backdrop-blur-xl border border-white/[0.08] rounded-3xl p-6 md:p-10 space-y-10 shadow-2xl">
      {/* Header */}
      <div className="border-b border-white/[0.08] pb-6 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse" />
            <span className="text-[10px] font-bold uppercase tracking-widest text-amber-400">Step {step} of {STEPS.length}</span>
          </div>
          <h2 className="text-2xl md:text-3xl font-bold text-white tracking-tight">
            Architecting: <span className="text-amber-400">{destination.name}</span>
          </h2>
          <p className="text-xs text-white/50 tracking-wide mt-1">
            {STEPS[step - 1].title} — Tailoring your cultural journey with precision
          </p>
        </div>

        {/* Step Progress Indicators */}
        <div className="flex gap-1.5 overflow-x-auto pb-2 md:pb-0">
          {STEPS.map(s => (
            <button
              key={s.id}
              onClick={() => setStep(s.id)}
              className={`h-2 rounded-full transition-all duration-300 ${
                step === s.id
                  ? "w-8 bg-amber-400"
                  : step > s.id
                  ? "w-4 bg-emerald-500"
                  : "w-2.5 bg-white/10 hover:bg-white/20"
              }`}
              title={s.title}
            />
          ))}
        </div>
      </div>

      {/* Step 1: Trip Parameters */}
      {step === 1 && (
        <div className="space-y-6">
          <div>
            <label className="text-sm font-semibold text-white/90 mb-2 block">Planned Arrival Date</label>
            <input
              type="date"
              value={formData.arrivalDate}
              onChange={e => setFormData({ ...formData, arrivalDate: e.target.value })}
              className="w-full bg-slate-950 border border-white/[0.1] text-white text-sm rounded-xl px-4 py-3.5 focus:border-amber-400 outline-none transition"
            />
          </div>

          <div>
            <label className="text-sm font-semibold text-white/90 mb-3 block">Expedition Duration (Days)</label>
            <div className="grid grid-cols-5 gap-2.5">
              {[2, 3, 5, 7, 10].map(d => (
                <button
                  key={d}
                  onClick={() => setFormData({ ...formData, durationDays: d })}
                  className={`py-3.5 rounded-xl text-xs font-bold transition flex flex-col items-center gap-1 ${
                    formData.durationDays === d
                      ? "bg-amber-400 text-slate-950 shadow-lg shadow-amber-400/20"
                      : "bg-slate-950 border border-white/10 text-white/60 hover:border-white/20 hover:text-white"
                  }`}
                >
                  <span className="text-base font-extrabold">{d}</span>
                  <span className="text-[10px] uppercase tracking-wider">Days</span>
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Step 2: Party & Pace */}
      {step === 2 && (
        <div className="space-y-6">
          <div>
            <label className="text-sm font-semibold text-white/90 mb-3 block">Travel Party Composition</label>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {[
                { id: "solo", label: "Solo Explorer", icon: "🧭" },
                { id: "couple", label: "Couple / Duo", icon: "✨" },
                { id: "family", label: "Heritage Family", icon: "🏛️" },
                { id: "group", label: "Curated Group", icon: "👥" },
              ].map(p => (
                <button
                  key={p.id}
                  onClick={() => setFormData({ ...formData, travelParty: p.id })}
                  className={`p-4 rounded-xl border text-left transition ${
                    formData.travelParty === p.id
                      ? "bg-amber-400/10 border-amber-400 text-white"
                      : "bg-slate-950 border-white/[0.08] text-white/60 hover:border-white/20"
                  }`}
                >
                  <span className="text-2xl block mb-2">{p.icon}</span>
                  <span className="text-xs font-bold block text-white">{p.label}</span>
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="text-sm font-semibold text-white/90 mb-3 block">Travel Cadence / Pace</label>
            <div className="grid grid-cols-3 gap-3">
              {[
                { id: "relaxed", label: "Immersive & Relaxed", sub: "1-2 deep experiences/day" },
                { id: "balanced", label: "Balanced Exploration", sub: "3-4 curated highlights/day" },
                { id: "dense", label: "Intensive Master Trail", sub: "Dawn to dusk heritage circuit" },
              ].map(p => (
                <button
                  key={p.id}
                  onClick={() => setFormData({ ...formData, pace: p.id })}
                  className={`p-4 rounded-xl border text-left transition ${
                    formData.pace === p.id
                      ? "bg-emerald-500/10 border-emerald-500 text-white"
                      : "bg-slate-950 border-white/[0.08] text-white/60 hover:border-white/20"
                  }`}
                >
                  <span className="text-xs font-bold block text-white mb-1">{p.label}</span>
                  <span className="text-[10px] text-white/40 block leading-tight">{p.sub}</span>
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Step 3: Budget Tier */}
      {step === 3 && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {BUDGET_RANGES.map((b) => (
            <div
              key={b.id}
              onClick={() => setFormData({ ...formData, budgetRange: b.id })}
              className={`p-5 rounded-2xl border cursor-pointer transition ${
                formData.budgetRange === b.id
                  ? "bg-amber-400/10 border-amber-400 shadow-lg shadow-amber-400/10"
                  : "bg-slate-950 border-white/[0.08] hover:border-white/20"
              }`}
            >
              <div className="flex items-center justify-between mb-2">
                <span className="font-bold text-sm text-white">{b.label}</span>
                <span className="text-xs font-semibold text-amber-400 bg-amber-400/10 px-2.5 py-1 rounded-full">{b.range}</span>
              </div>
              <p className="text-xs text-white/50 leading-relaxed">{b.desc}</p>
            </div>
          ))}
        </div>
      )}

      {/* Step 4: Persona & Vibe */}
      {step === 4 && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {PERSONAS.map(p => (
            <div
              key={p.id}
              onClick={() => setFormData({ ...formData, persona: p.id })}
              className={`p-5 rounded-2xl border cursor-pointer transition ${
                formData.persona === p.id
                  ? "bg-indigo-500/10 border-indigo-400 shadow-lg shadow-indigo-500/10"
                  : "bg-slate-950 border-white/[0.08] hover:border-white/20"
              }`}
            >
              <h4 className="font-bold text-sm text-white mb-1.5">{p.title}</h4>
              <p className="text-xs text-white/50 leading-relaxed">{p.desc}</p>
            </div>
          ))}
        </div>
      )}

      {/* Step 5: Artisans & Guilds */}
      {step === 5 && (
        <div className="space-y-4">
          <p className="text-xs text-white/60">
            Select traditional craft workshops and artisan guilds to weave directly into your travel itinerary:
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {ARTISAN_CRAFTS.map(craft => {
              const isSelected = formData.selectedCrafts.includes(craft);
              return (
                <button
                  key={craft}
                  onClick={() => toggleArrayItem('selectedCrafts', craft)}
                  className={`p-4 rounded-xl border text-left flex items-center justify-between transition ${
                    isSelected
                      ? "bg-amber-400/15 border-amber-400 text-white"
                      : "bg-slate-950 border-white/[0.08] text-white/70 hover:border-white/20"
                  }`}
                >
                  <span className="text-xs font-semibold">{craft}</span>
                  {isSelected && <CheckCircle size={18} className="text-amber-400 flex-shrink-0" weight="fill" />}
                </button>
              );
            })}
          </div>
        </div>
      )}

      {/* Step 6: Culinary Trails */}
      {step === 6 && (
        <div className="space-y-4">
          <p className="text-xs text-white/60">
            Choose generational culinary philosophies and dining experiences:
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {CULINARY_PREFS.map(food => {
              const isSelected = formData.selectedCulinary.includes(food);
              return (
                <button
                  key={food}
                  onClick={() => toggleArrayItem('selectedCulinary', food)}
                  className={`p-4 rounded-xl border text-left flex items-center justify-between transition ${
                    isSelected
                      ? "bg-amber-400/15 border-amber-400 text-white"
                      : "bg-slate-950 border-white/[0.08] text-white/70 hover:border-white/20"
                  }`}
                >
                  <span className="text-xs font-semibold">{food}</span>
                  {isSelected && <CheckCircle size={18} className="text-amber-400 flex-shrink-0" weight="fill" />}
                </button>
              );
            })}
          </div>
        </div>
      )}

      {/* Step 7: Activity Focus */}
      {step === 7 && (
        <div className="space-y-4">
          <p className="text-xs text-white/60">
            Select signature monument and cultural activities:
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {ACTIVITIES_LIST.map(act => {
              const isSelected = formData.selectedActivities.includes(act);
              return (
                <button
                  key={act}
                  onClick={() => toggleArrayItem('selectedActivities', act)}
                  className={`p-4 rounded-xl border text-left flex items-center justify-between transition ${
                    isSelected
                      ? "bg-emerald-500/15 border-emerald-400 text-white"
                      : "bg-slate-950 border-white/[0.08] text-white/70 hover:border-white/20"
                  }`}
                >
                  <span className="text-xs font-semibold">{act}</span>
                  {isSelected && <CheckCircle size={18} className="text-emerald-400 flex-shrink-0" weight="fill" />}
                </button>
              );
            })}
          </div>
        </div>
      )}

      {/* Step 8: Safety & Passes */}
      {step === 8 && (
        <div className="space-y-4">
          <div className="bg-slate-950 border border-white/[0.08] p-5 rounded-2xl space-y-4">
            <h4 className="text-sm font-bold text-white flex items-center gap-2">
              <ShieldCheck size={20} className="text-emerald-400" />
              Government Certified Safety Protocols
            </h4>
            <div className="space-y-2.5">
              <label className="flex items-center gap-3 text-xs text-white/80 cursor-pointer">
                <input
                  type="checkbox"
                  checked={formData.digitalPassRequested}
                  onChange={e => setFormData({ ...formData, digitalPassRequested: e.target.checked })}
                  className="rounded accent-emerald-500"
                />
                Include Raahi QR Digital Heritage Queue Pass
              </label>
              <label className="flex items-center gap-3 text-xs text-white/80 cursor-pointer">
                <input
                  type="checkbox"
                  checked={formData.includeFestivalAlerts}
                  onChange={e => setFormData({ ...formData, includeFestivalAlerts: e.target.checked })}
                  className="rounded accent-emerald-500"
                />
                Live Festival & Cultural Surge Alerts
              </label>
              <label className="flex items-center gap-3 text-xs text-white/80 cursor-pointer">
                <input
                  type="checkbox"
                  checked={formData.safetyAssistance}
                  onChange={e => setFormData({ ...formData, safetyAssistance: e.target.checked })}
                  className="rounded accent-emerald-500"
                />
                24/7 Verified Tourist Police & Geo-safety Tracking
              </label>
            </div>
          </div>
        </div>
      )}

      {/* Footer Navigation */}
      <div className="flex justify-between items-center pt-6 border-t border-white/[0.08]">
        {step > 1 ? (
          <button
            onClick={() => setStep(step - 1)}
            disabled={loading}
            className="text-white/60 hover:text-white text-xs font-bold transition px-4 py-2.5"
          >
            ← Back
          </button>
        ) : (
          <div />
        )}

        {step < STEPS.length ? (
          <button
            onClick={() => setStep(step + 1)}
            className="ml-auto bg-white text-slate-950 font-bold px-6 py-3 rounded-xl hover:bg-white/90 text-xs transition shadow-lg"
          >
            Next Step →
          </button>
        ) : (
          <button
            onClick={handleSubmit}
            disabled={loading}
            className="ml-auto bg-gradient-to-r from-amber-400 to-amber-500 text-slate-950 font-extrabold px-8 py-3.5 rounded-xl hover:opacity-95 text-xs transition flex items-center gap-2 shadow-xl shadow-amber-400/20"
          >
            {loading ? (
              <>Generating Master Plan...</>
            ) : (
              <>
                Generate Master Itinerary <ArrowRight size={16} weight="bold" />
              </>
            )}
          </button>
        )}
      </div>
    </div>
  );
}
