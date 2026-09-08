"use client";

import { useState, useEffect } from "react";
import {
  Calendar, Users, CurrencyInr, Sparkle, ArrowRight, CheckCircle, MapPin,
  Clock, Heart, ShieldCheck, PaintBrush, Leaf, ForkKnife, Compass, Sparkle as SparkleIcon,
  Bed, Phone, Star, ArrowSquareOut
} from "@phosphor-icons/react";
import { Destination } from "@/context/DestinationContext";
import { getCityCustomization, LocalizedStay } from "@/lib/cityPersonalization";

interface Step {
  id: number;
  title: string;
  icon: React.ReactNode;
}

const STEPS: Step[] = [
  { id: 1, title: "Trip Essentials", icon: <Calendar size={18} /> },
  { id: 2, title: "Vibe & Budget", icon: <Sparkle size={18} /> },
  { id: 3, title: "Experiences", icon: <MapPin size={18} /> },
  { id: 4, title: "Stays & Safety", icon: <ShieldCheck size={18} /> },
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
    selectedStay: null as string | null,
    includeFestivalAlerts: true,
    digitalPassRequested: true,
    safetyAssistance: true,
  });

  const cityData = getCityCustomization(destination?.name || "");

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

      const payload = {
        ...(data.itinerary || {}),
        destination: destination.name,
        state: destination.state || 'India',
        arrivalDate: formData.arrivalDate,
        departureDate: (() => {
          const d = new Date(formData.arrivalDate);
          d.setDate(d.getDate() + formData.durationDays);
          return d.toISOString().split('T')[0];
        })(),
        durationDays: formData.durationDays,
        budgetRange: formData.budgetRange,
        groupSize: formData.groupSize,
        selectedActivities: formData.selectedActivities,
        selectedCrafts: formData.selectedCrafts,
        selectedCulinary: formData.selectedCulinary,
        selectedStay: formData.selectedStay,
      };

      onComplete(payload);
    } catch (e) {
      console.error("Itinerary submission failed:", e);
      // Fallback
      onComplete({
        destination: destination.name,
        state: destination.state || 'India',
        arrivalDate: formData.arrivalDate,
        departureDate: (() => {
          const d = new Date(formData.arrivalDate);
          d.setDate(d.getDate() + formData.durationDays);
          return d.toISOString().split('T')[0];
        })(),
        durationDays: formData.durationDays,
        budgetRange: formData.budgetRange,
        groupSize: formData.groupSize,
        selectedActivities: formData.selectedActivities,
        selectedCrafts: formData.selectedCrafts,
        selectedCulinary: formData.selectedCulinary,
        selectedStay: formData.selectedStay,
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full bg-[#151310] border border-white/[0.08] rounded-xl p-8 md:p-12 space-y-12 shadow-sm">
      {/* Header */}
      <div className="border-b border-white/[0.08] pb-8 flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <span className="w-1.5 h-1.5 rounded-full bg-[#C8B79F]" />
            <span className="text-[10px] font-bold uppercase tracking-widest text-[#C8B79F]">Step {step} of {STEPS.length}</span>
          </div>
          <h2 className="text-3xl md:text-4xl font-normal text-[#F3EDE3] tracking-tight" style={{ fontFamily: "var(--font-playfair, serif)" }}>
            Architecting: <span className="italic text-[#C8B79F]">{destination.name}</span>
          </h2>
          <p className="text-xs text-[#A9A096] tracking-wide mt-2 font-light">
            {STEPS[step - 1].title} — Tailoring your cultural journey with precision
          </p>
        </div>

        {/* Step Progress Indicators */}
        <div className="flex gap-2 overflow-x-auto pb-2 md:pb-0">
          {STEPS.map(s => (
            <button
              key={s.id}
              onClick={() => setStep(s.id)}
              className={`h-1.5 rounded-full transition-all duration-300 ${
                step === s.id
                  ? "w-8 bg-[#C8B79F]"
                  : step > s.id
                  ? "w-4 bg-white/40"
                  : "w-2.5 bg-white/10 hover:bg-white/20"
              }`}
              title={s.title}
            />
          ))}
        </div>
      </div>

      {/* Step 1: Trip Essentials */}
      {step === 1 && (
        <div className="space-y-10">
          <div>
            <label className="text-xs font-medium uppercase tracking-widest text-[#A9A096] mb-3 block">Planned Arrival Date</label>
            <input
              type="date"
              value={formData.arrivalDate}
              onChange={e => setFormData({ ...formData, arrivalDate: e.target.value })}
              className="w-full bg-[#0D0C0A] border border-white/[0.1] text-[#F3EDE3] text-sm rounded-lg px-4 py-3.5 focus:border-[#C8B79F] outline-none transition"
            />
          </div>

          <div>
            <label className="text-xs font-medium uppercase tracking-widest text-[#A9A096] mb-4 block">Expedition Duration (Days)</label>
            <div className="grid grid-cols-5 gap-3">
              {[2, 3, 5, 7, 10].map(d => (
                <button
                  key={d}
                  onClick={() => setFormData({ ...formData, durationDays: d })}
                  className={`py-4 rounded-lg text-xs font-medium transition flex flex-col items-center gap-1 ${
                    formData.durationDays === d
                      ? "bg-[#F3EDE3] text-[#0D0C0A]"
                      : "bg-[#0D0C0A] border border-white/[0.08] text-[#A9A096] hover:border-white/20 hover:text-[#F3EDE3]"
                  }`}
                >
                  <span className="text-lg font-medium">{d}</span>
                  <span className="text-[10px] uppercase tracking-wider">Days</span>
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="text-xs font-medium uppercase tracking-widest text-[#A9A096] mb-4 block">Travel Party Composition</label>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {[
                { id: "solo", label: "Solo Explorer", icon: "🧭" },
                { id: "couple", label: "Couple / Duo", icon: "✨" },
                { id: "family", label: "Heritage Family", icon: "🏛️" },
                { id: "group", label: "Curated Group", icon: "👥" },
              ].map(p => (
                <button
                  key={p.id}
                  onClick={() => setFormData({ ...formData, travelParty: p.id })}
                  className={`p-5 rounded-lg border text-left transition ${
                    formData.travelParty === p.id
                      ? "bg-white/[0.05] border-[#C8B79F] text-[#F3EDE3]"
                      : "bg-[#0D0C0A] border-white/[0.08] text-[#A9A096] hover:border-white/20"
                  }`}
                >
                  <span className="text-2xl block mb-3">{p.icon}</span>
                  <span className="text-xs font-medium uppercase tracking-wider block text-[#F3EDE3]">{p.label}</span>
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Step 2: Vibe & Budget */}
      {step === 2 && (
        <div className="space-y-10">
          <div>
            <label className="text-xs font-medium uppercase tracking-widest text-[#A9A096] mb-4 block">Budget Tier</label>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {BUDGET_RANGES.map((b) => (
                <div
                  key={b.id}
                  onClick={() => setFormData({ ...formData, budgetRange: b.id })}
                  className={`p-6 rounded-lg border cursor-pointer transition ${
                    formData.budgetRange === b.id
                      ? "bg-white/[0.04] border-[#C8B79F]"
                      : "bg-[#0D0C0A] border-white/[0.08] hover:border-white/20"
                  }`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-medium text-sm text-[#F3EDE3]">{b.label}</span>
                    <span className="text-[11px] font-medium text-[#C8B79F] tracking-wide">{b.range}</span>
                  </div>
                  <p className="text-xs text-[#A9A096] leading-relaxed font-light">{b.desc}</p>
                </div>
              ))}
            </div>
          </div>

          <div>
             <label className="text-xs font-medium uppercase tracking-widest text-[#A9A096] mb-4 block">Persona & Vibe</label>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {PERSONAS.map(p => (
                <div
                  key={p.id}
                  onClick={() => setFormData({ ...formData, persona: p.id })}
                  className={`p-6 rounded-lg border cursor-pointer transition ${
                    formData.persona === p.id
                      ? "bg-white/[0.04] border-[#C8B79F]"
                      : "bg-[#0D0C0A] border-white/[0.08] hover:border-white/20"
                  }`}
                >
                  <h4 className="font-medium text-sm text-[#F3EDE3] mb-2">{p.title}</h4>
                  <p className="text-xs text-[#A9A096] leading-relaxed font-light">{p.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Step 3: Experiences */}
      {step === 3 && (
        <div className="space-y-8">
          <div className="space-y-3">
            <h4 className="text-xs font-medium uppercase tracking-widest text-[#A9A096]">Artisan Guilds</h4>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              {cityData.crafts.map(craft => {
                const isSelected = formData.selectedCrafts.includes(craft);
                return (
                  <button
                    key={craft}
                    onClick={() => toggleArrayItem('selectedCrafts', craft)}
                    className={`p-4 rounded-lg border text-left flex items-center justify-between transition ${
                      isSelected
                        ? "bg-white/[0.05] border-[#C8B79F] text-[#F3EDE3]"
                        : "bg-[#0D0C0A] border-white/[0.08] text-[#A9A096] hover:border-white/20"
                    }`}
                  >
                    <span className="text-xs font-medium">{craft}</span>
                  </button>
                );
              })}
            </div>
          </div>

          <div className="space-y-3">
            <h4 className="text-xs font-medium uppercase tracking-widest text-[#A9A096]">Culinary Trails</h4>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              {cityData.culinary.map(food => {
                const isSelected = formData.selectedCulinary.includes(food);
                return (
                  <button
                    key={food}
                    onClick={() => toggleArrayItem('selectedCulinary', food)}
                    className={`p-4 rounded-lg border text-left flex items-center justify-between transition ${
                      isSelected
                        ? "bg-white/[0.05] border-[#C8B79F] text-[#F3EDE3]"
                        : "bg-[#0D0C0A] border-white/[0.08] text-[#A9A096] hover:border-white/20"
                    }`}
                  >
                    <span className="text-xs font-medium">{food}</span>
                  </button>
                );
              })}
            </div>
          </div>

          <div className="space-y-3">
            <h4 className="text-xs font-medium uppercase tracking-widest text-[#A9A096]">Activity Focus</h4>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              {cityData.activities.map(act => {
                const isSelected = formData.selectedActivities.includes(act);
                return (
                  <button
                    key={act}
                    onClick={() => toggleArrayItem('selectedActivities', act)}
                    className={`p-4 rounded-lg border text-left flex items-center justify-between transition ${
                      isSelected
                        ? "bg-white/[0.05] border-[#C8B79F] text-[#F3EDE3]"
                        : "bg-[#0D0C0A] border-white/[0.08] text-[#A9A096] hover:border-white/20"
                    }`}
                  >
                    <span className="text-xs font-medium">{act}</span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {/* Step 4: Stays & Safety */}
      {step === 4 && (
        <div className="space-y-10">
          <div className="space-y-4">
            <h4 className="text-xs font-medium uppercase tracking-widest text-[#A9A096]">Heritage Stays</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {cityData.recommendedStays.map((stay: LocalizedStay) => {
                const isSelected = formData.selectedStay === stay.id;
                return (
                  <div
                    key={stay.id}
                    onClick={() => setFormData(prev => ({ ...prev, selectedStay: isSelected ? null : stay.id }))}
                    className={`p-6 rounded-lg border text-left transition-all cursor-pointer ${
                      isSelected
                        ? "bg-white/[0.05] border-[#C8B79F] text-[#F3EDE3]"
                        : "bg-[#0D0C0A] border-white/[0.08] text-[#A9A096] hover:border-white/20"
                    }`}
                  >
                     <h4 className="text-sm font-medium text-[#F3EDE3] mb-1.5 tracking-tight">{stay.name}</h4>
                     <p className="text-xs text-[#C8B79F] italic font-light">"{stay.tagline}"</p>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="bg-[#0D0C0A] border border-white/[0.08] p-6 rounded-lg space-y-4">
            <h4 className="text-xs font-medium uppercase tracking-widest text-[#F3EDE3] flex items-center gap-2">
              <ShieldCheck size={18} className="text-[#C8B79F]" />
              Safety Protocols & Passes
            </h4>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2">
              <label className="flex items-center gap-3 text-xs text-[#A9A096] cursor-pointer">
                <input
                  type="checkbox"
                  checked={formData.digitalPassRequested}
                  onChange={e => setFormData({ ...formData, digitalPassRequested: e.target.checked })}
                  className="rounded accent-[#C8B79F]"
                />
                Heritage QR Pass
              </label>
              <label className="flex items-center gap-3 text-xs text-[#A9A096] cursor-pointer">
                <input
                  type="checkbox"
                  checked={formData.includeFestivalAlerts}
                  onChange={e => setFormData({ ...formData, includeFestivalAlerts: e.target.checked })}
                  className="rounded accent-[#C8B79F]"
                />
                Festival Alerts
              </label>
              <label className="flex items-center gap-3 text-xs text-[#A9A096] cursor-pointer">
                <input
                  type="checkbox"
                  checked={formData.safetyAssistance}
                  onChange={e => setFormData({ ...formData, safetyAssistance: e.target.checked })}
                  className="rounded accent-[#C8B79F]"
                />
                Tour Police Aid
              </label>
            </div>
          </div>
        </div>
      )}

      {/* Footer Navigation */}
      <div className="flex justify-between items-center pt-8 border-t border-white/[0.08]">
        {step > 1 ? (
          <button
            onClick={() => setStep(step - 1)}
            disabled={loading}
            className="text-[#A9A096] hover:text-[#F3EDE3] text-xs font-medium tracking-widest uppercase transition"
          >
            ← Back
          </button>
        ) : (
          <div />
        )}

        {step < STEPS.length ? (
          <button
            onClick={() => setStep(step + 1)}
            className="ml-auto bg-[#F3EDE3] text-[#0D0C0A] font-medium px-8 py-3.5 rounded text-xs tracking-widest uppercase hover:bg-white transition"
          >
            Next Step →
          </button>
        ) : (
          <button
            onClick={handleSubmit}
            disabled={loading}
            className="ml-auto bg-[#C8B79F] text-[#0D0C0A] font-medium px-8 py-3.5 rounded hover:bg-[#D4C5AF] text-xs tracking-widest uppercase transition flex items-center gap-2"
          >
            {loading ? (
              <>Generating Master Plan...</>
            ) : (
              <>
                Generate Master Itinerary <ArrowRight size={14} weight="bold" />
              </>
            )}
          </button>
        )}
      </div>
    </div>
  );
}
