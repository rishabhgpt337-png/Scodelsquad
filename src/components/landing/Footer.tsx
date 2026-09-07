"use client";

import RaahiLogo from "@/components/common/RaahiLogo";

const PLATFORM_LINKS = [
  { label: "AI Trip Planner", href: "/trip-planner" },
  { label: "Curated Circuits", href: "#destinations" },
  { label: "Smart Radar", href: "#features" },
  { label: "Digital Travel Pass", href: "#features" },
  { label: "SOS Tourist Safety", href: "#features" },
];

const IMPACT_LINKS = [
  { label: "Become a Guide", href: "#" },
  { label: "Artisan Marketplace", href: "#" },
  { label: "Homestay Onboarding", href: "#" },
  { label: "Ministry of Tourism Guidelines", href: "#" },
];

export default function Footer() {
  return (
    <footer className="bg-slate-950 border-t border-white/[0.06] text-white/50">
      <div className="max-w-6xl mx-auto px-8 md:px-16 lg:px-20 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-14">
          {/* Brand */}
          <div className="md:col-span-2">
            <div className="mb-5">
              <RaahiLogo size="md" />
            </div>
            <p className="text-sm text-white/45 max-w-sm mb-5 leading-relaxed">
              India's dignified smart travel companion. Re-imagining tourism through hyper-local AI context, authentic artisan economies, and unified digital monument access.
            </p>
            <div className="text-[11px] font-semibold text-amber-400/70 uppercase tracking-[0.2em]">
              Smart India Hackathon 2024–25
            </div>
          </div>

          {/* Platform */}
          <div>
            <h4 className="text-white/80 text-[10px] font-bold uppercase tracking-[0.25em] mb-5">
              Platform
            </h4>
            <ul className="space-y-3">
              {PLATFORM_LINKS.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="text-sm text-white/45 hover:text-white/90 transition-colors duration-150"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Local Impact */}
          <div>
            <h4 className="text-white/80 text-[10px] font-bold uppercase tracking-[0.25em] mb-5">
              Local Impact
            </h4>
            <ul className="space-y-3">
              {IMPACT_LINKS.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="text-sm text-white/45 hover:text-white/90 transition-colors duration-150"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-white/[0.05] flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-white/30">
          <div>
            © {new Date().getFullYear()} Raahi Platform. All rights reserved.
          </div>
          <div className="flex items-center gap-6">
            <a href="#" className="hover:text-white/70 transition-colors duration-150">Privacy Policy</a>
            <a href="#" className="hover:text-white/70 transition-colors duration-150">Terms of Service</a>
            <a href="#" className="hover:text-white/70 transition-colors duration-150">Security Architecture</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
