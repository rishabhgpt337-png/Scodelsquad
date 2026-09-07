"use client";

import { useEffect, useRef } from "react";
import { animate, stagger } from "animejs";
import DestinationCard from "./DestinationCard";

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
  const gridRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    // We use IntersectionObserver to trigger animation when section scrolls into view
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          // Animate header elements
          if (headerRef.current) {
             animate(headerRef.current.children, {
               translateY: [30, 0],
               opacity: [0, 1],
               duration: 800,
               ease: "outExpo",
               delay: stagger(150)
             });
          }
          
          // Animate destination cards with a beautiful stagger entrance
          if (gridRef.current) {
            animate(gridRef.current.querySelectorAll('.dest-card'), {
              translateY: [40, 0],
              opacity: [0, 1],
              scale: [0.95, 1],
              duration: 1000,
              ease: "outElastic(1, .8)",
              delay: stagger(100, { start: 200 })
            });
          }
          
          // Stop observing after firing once
          observer.disconnect();
        }
      },
      { threshold: 0.15 }
    );

    if (gridRef.current) {
      observer.observe(gridRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section
      id="destinations"
      className="py-28 px-8 md:px-16 lg:px-20 bg-slate-900/60 relative overflow-hidden"
    >
      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <div ref={headerRef} className="flex flex-col md:flex-row md:items-end justify-between mb-16">
          <div className="opacity-0">
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
          <p className="opacity-0 text-white/50 text-sm md:text-base max-w-md mt-6 md:mt-0 leading-relaxed">
            Handpicked routes verified with local community elders, expert guides, and safety protocols.
          </p>
        </div>

        {/* Destination Grid */}
        <div ref={gridRef} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {DESTINATIONS.map((dest, i) => (
            <DestinationCard key={dest.name} dest={dest} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
