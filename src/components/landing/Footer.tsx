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
    <footer className="bg-[#0D0C0A] border-t border-white/[0.05] text-[#A9A096]">
      <div className="max-w-6xl mx-auto px-8 md:px-16 lg:px-20 py-20">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-16 mb-20">
          {/* Brand */}
          <div className="md:col-span-2">
            <div className="mb-6">
              <RaahiLogo size="sm" />
            </div>
            <p className="text-sm text-[#A9A096]/70 max-w-sm mb-6 leading-relaxed font-light">
              India's dignified smart travel companion. Re-imagining tourism through hyper-local AI context, authentic artisan economies, and unified digital monument access.
            </p>
            <div className="text-[10px] font-medium text-[#C8B79F]/60 uppercase tracking-[0.25em]">
              Ministry of Tourism • Digital Initiative
            </div>
          </div>

          {/* Platform */}
          <div>
            <h4 className="text-[#F3EDE3] text-[10px] font-bold uppercase tracking-[0.25em] mb-6">
              Platform
            </h4>
            <ul className="space-y-4">
              {PLATFORM_LINKS.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="text-sm text-[#A9A096]/70 hover:text-[#C8B79F] transition-colors duration-200"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Local Impact */}
          <div>
            <h4 className="text-[#F3EDE3] text-[10px] font-bold uppercase tracking-[0.25em] mb-6">
              Local Impact
            </h4>
            <ul className="space-y-4">
              {IMPACT_LINKS.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="text-sm text-[#A9A096]/70 hover:text-[#C8B79F] transition-colors duration-200"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="py-8 border-t border-white/[0.05] flex flex-col md:flex-row items-center justify-between gap-6 text-[11px] text-[#A9A096]/50 tracking-wide">
          <div>
            © {new Date().getFullYear()} Raahi Platform. All rights reserved.
          </div>
          <div className="flex items-center gap-8 uppercase tracking-wider">
            <a href="#" className="hover:text-[#F3EDE3] transition-colors duration-200">Privacy</a>
            <a href="#" className="hover:text-[#F3EDE3] transition-colors duration-200">Terms</a>
            <a href="#" className="hover:text-[#F3EDE3] transition-colors duration-200">Security</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
