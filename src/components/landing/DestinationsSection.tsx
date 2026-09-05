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
    highlights: ["Assi Ghat Sunrise", "Kashi Corridor", "Malaiyo Trail"]
  },
  {
    name: "Jaipur",
    state: "Rajasthan",
    tag: "Royal Architecture",
    rating: "4.8",
    image: "https://images.unsplash.com/photo-1603258849062-108747a07011?auto=format&fit=crop&w=800&q=80",
    desc: "The Pink City with majestic hill forts, block print bazaars, and royal dining.",
    highlights: ["Amer Fort", "Nahargarh Sunset", "Johari Bazaar"]
  },
  {
    name: "Leh Ladakh",
    state: "Ladakh",
    tag: "High-Altitude Wonder",
    rating: "4.9",
    image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?auto=format&fit=crop&w=800&q=80",
    desc: "Pristine monasteries, dramatic mountain passes, and stargazing at Pangong Tso.",
    highlights: ["Pangong Lake", "Nubra Valley", "Thiksey Monastery"]
  },
  {
    name: "Alleppey",
    state: "Kerala",
    tag: "Tranquil Waters",
    rating: "4.8",
    image: "https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?auto=format&fit=crop&w=800&q=80",
    desc: "Traditional solar houseboats winding through emerald palm-fringed canals.",
    highlights: ["Backwater Cruise", "Ayurveda Retreat", "Marari Beach"]
  },
  {
    name: "Hampi",
    state: "Karnataka",
    tag: "Ancient Monoliths",
    rating: "4.9",
    image: "https://images.unsplash.com/photo-1600100397608-f010f443b74a?auto=format&fit=crop&w=800&q=80",
    desc: "UNESCO boulder wonderland, Vijayanagara ruins, and coracle boat rides.",
    highlights: ["Virupaksha Temple", "Stone Chariot", "Matanga Hill"]
  },
  {
    name: "Rishikesh",
    state: "Uttarakhand",
    tag: "Yoga & Adventure",
    rating: "4.7",
    image: "https://images.unsplash.com/photo-1596895111956-bf1cf0599ce5?auto=format&fit=crop&w=800&q=80",
    desc: "Foothills of the Himalayas, sacred Ganges ashrams, and whitewater rafting.",
    highlights: ["Triveni Ghat Aarti", "Beatles Ashram", "Shivpuri Rafting"]
  }
];

export default function DestinationsSection() {
  const router = useRouter();

  return (
    <section id="destinations" className="py-24 px-6 md:px-12 bg-slate-900/60 relative">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-14">
          <div>
            <div className="text-amber-400 font-semibold text-xs uppercase tracking-widest mb-2">
              Curated Circuits
            </div>
            <h2 className="text-3xl md:text-5xl font-extrabold text-white tracking-tight">
              Iconic Indian Destinations
            </h2>
          </div>
          <p className="text-white/60 text-sm md:text-base max-w-md mt-4 md:mt-0">
            Handpicked routes verified with local community elders, expert guides, and safety protocols.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {DESTINATIONS.map((dest, i) => (
            <motion.div
              key={dest.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="bg-slate-800/60 border border-white/10 rounded-2xl overflow-hidden hover:border-amber-400/40 transition-all flex flex-col group"
            >
              {/* Image with zoom on hover */}
              <div className="relative h-52 overflow-hidden">
                <img
                  src={dest.image}
                  alt={dest.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/20 to-transparent" />
                <div className="absolute top-3 left-3 bg-black/60 backdrop-blur-md px-3 py-1 rounded-full text-xs font-semibold text-white border border-white/10 flex items-center gap-1.5">
                  <MapPin size={12} className="text-amber-400" />
                  {dest.state}
                </div>
                <div className="absolute top-3 right-3 bg-amber-400 text-slate-900 px-2.5 py-0.5 rounded-full text-xs font-bold flex items-center gap-1">
                  <Star size={12} weight="fill" />
                  {dest.rating}
                </div>
                <div className="absolute bottom-3 left-3">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-amber-300 bg-amber-400/20 px-2 py-0.5 rounded">
                    {dest.tag}
                  </span>
                  <h3 className="text-2xl font-bold text-white mt-1">{dest.name}</h3>
                </div>
              </div>

              {/* Body */}
              <div className="p-5 flex-1 flex flex-col justify-between">
                <p className="text-white/70 text-xs leading-relaxed mb-4">{dest.desc}</p>

                <div>
                  <div className="text-[11px] font-semibold text-white/50 uppercase tracking-wider mb-2">
                    Key Highlights
                  </div>
                  <div className="flex flex-wrap gap-1.5 mb-5">
                    {dest.highlights.map((h) => (
                      <span
                        key={h}
                        className="text-[11px] bg-white/5 border border-white/10 text-white/80 px-2.5 py-1 rounded-lg"
                      >
                        {h}
                      </span>
                    ))}
                  </div>

                  <button
                    onClick={() => router.push("/trip-planner")}
                    className="w-full bg-white/10 hover:bg-amber-400 hover:text-slate-900 text-white font-bold text-xs py-3 rounded-xl transition-all flex items-center justify-center gap-2 group-hover:bg-amber-400 group-hover:text-slate-900"
                  >
                    Plan Trip To {dest.name}
                    <ArrowRight size={14} weight="bold" />
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