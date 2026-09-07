"use client";

import { useRouter } from "next/navigation";
import { motion } from "motion/react";
import { MapPin, ArrowRight, Star } from "@phosphor-icons/react";

const DESTINATIONS = [
  {
    name: "Varanasi",
    state: "Uttar Pradesh",
    tag: "Spiritual & Heritage",
    rating: "4.9",
    image: "https://images.unsplash.com/photo-1524492412937-b28074a5d7da?auto=format&fit=crop&w=800&q=80",
    desc: "Ancient ghats, evening Ganga Aarti, and centuries-old silk weaving traditions.",
    highlights: ["Assi Ghat Sunrise", "Kashi Corridor", "Malaiyo Trail"],
  },
  {
    name: "Jaipur",
    state: "Rajasthan",
    tag: "Royal Architecture",
    rating: "4.8",
    image: "https://images.unsplash.com/photo-1603258849062-108747a07011?auto=format&fit=crop&w=800&q=80",
    desc: "The Pink City with majestic hill forts, block print bazaars, and royal dining.",
    highlights: ["Amer Fort", "Nahargarh Sunset", "Johari Bazaar"],
  },
  {
    name: "Leh Ladakh",
    state: "Ladakh",
    tag: "High-Altitude Wonder",
    rating: "4.9",
    image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?auto=format&fit=crop&w=800&q=80",
    desc: "Pristine monasteries, dramatic mountain passes, and stargazing at Pangong Tso.",
    highlights: ["Pangong Lake", "Nubra Valley", "Thiksey Monastery"],
  },
  {
    name: "Alleppey",
    state: "Kerala",
    tag: "Tranquil Waters",
    rating: "4.8",
    image: "https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?auto=format&fit=crop&w=800&q=80",
    desc: "Traditional solar houseboats winding through emerald palm-fringed canals.",
    highlights: ["Backwater Cruise", "Ayurveda Retreat", "Marari Beach"],
  },
  {
    name: "Hampi",
    state: "Karnataka",
    tag: "Ancient Monoliths",
    rating: "4.9",
    image: "https://images.unsplash.com/photo-1600100397608-f010f443b74a?auto=format&fit=crop&w=800&q=80",
    desc: "UNESCO boulder wonderland, Vijayanagara ruins, and coracle boat rides.",
    highlights: ["Virupaksha Temple", "Stone Chariot", "Matanga Hill"],
  },
  {
    name: "Rishikesh",
    state: "Uttarakhand",
    tag: "Yoga & Adventure",
    rating: "4.7",
    image: "https://images.unsplash.com/photo-1596895111956-bf1cf0599ce5?auto=format&fit=crop&w=800&q=80",
    desc: "Foothills of the Himalayas, sacred Ganges ashrams, and whitewater rafting.",
    highlights: ["Triveni Ghat Aarti", "Beatles Ashram", "Shivpuri Rafting"],
  },
];

export default function DestinationsSection() {
  const router = useRouter();

  return (
    <section
      id="destinations"
      className="py-28 px-8 md:px-16 lg:px-20 bg-slate-900/60 relative"
    >
      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16">
          <div>
            <div className="flex items-center gap-3 mb-4">
              <span className="w-8 h-[1.5px] bg-amber-400/50" />
              <span className="text-[10px] font-bold tracking-[0.35em] uppercase text-amber-400/80">
                Curated Circuits
              </span>
            </div>
            <h2 className="text-3xl md:text-[2.75rem] font-bold text-white tracking-tight leading-[1.15]">
              Iconic Indian Destinations
            </h2>
          </div>
          <p className="text-white/50 text-sm md:text-base max-w-md mt-6 md:mt-0 leading-relaxed">
            Handpicked routes verified with local community elders, expert guides, and safety protocols.
          </p>
        </div>

        {/* Destination Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {DESTINATIONS.map((dest, i) => (
            <motion.div
              key={dest.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.45, delay: i * 0.08 }}
              className="bg-slate-900 border border-white/[0.07] rounded-2xl overflow-hidden hover:border-white/[0.14] transition-all duration-300 flex flex-col group"
            >
              {/* Image */}
              <div className="relative h-48 overflow-hidden">
                <img
                  src={dest.image}
                  alt={dest.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/20 to-transparent" />
                <div className="absolute top-3 left-3 flex items-center gap-1.5 bg-black/50 backdrop-blur-sm px-2.5 py-1 rounded-full border border-white/10">
                  <MapPin size={11} className="text-amber-400" />
                  <span className="text-[10px] font-semibold text-white/90">{dest.state}</span>
                </div>
                <div className="absolute top-3 right-3 flex items-center gap-1 bg-amber-400 px-2 py-0.5 rounded-full">
                  <Star size={10} weight="fill" className="text-slate-900" />
                  <span className="text-[10px] font-bold text-slate-900">{dest.rating}</span>
                </div>
                <div className="absolute bottom-4 left-4">
                  <div className="text-[9px] font-bold uppercase tracking-[0.2em] text-amber-400/80 mb-1">
                    {dest.tag}
                  </div>
                  <h3 className="text-xl font-bold text-white">{dest.name}</h3>
                </div>
              </div>

              {/* Body */}
              <div className="p-5 flex-1 flex flex-col">
                <p className="text-white/55 text-xs leading-relaxed mb-4">{dest.desc}</p>

                <div className="mt-auto">
                  <div className="text-[10px] font-semibold text-white/35 uppercase tracking-[0.15em] mb-2">
                    Key Highlights
                  </div>
                  <div className="flex flex-wrap gap-1.5 mb-5">
                    {dest.highlights.map((h) => (
                      <span
                        key={h}
                        className="text-[10px] bg-white/[0.05] border border-white/[0.08] text-white/70 px-2.5 py-1 rounded-md"
                      >
                        {h}
                      </span>
                    ))}
                  </div>

                  <button
                    onClick={() => router.push("/trip-planner")}
                    className="w-full bg-white/[0.06] hover:bg-amber-400 hover:text-slate-900 text-white/80 font-semibold text-xs py-3 rounded-xl transition-all duration-200 flex items-center justify-center gap-2"
                  >
                    Plan Trip to {dest.name}
                    <ArrowRight size={13} weight="bold" />
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
