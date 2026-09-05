"use client";

import { Heart, GithubLogo, TwitterLogo, LinkedinLogo } from "@phosphor-icons/react";
import RaahiLogo from "@/components/common/RaahiLogo";

export default function Footer() {
  return (
    <footer className="bg-slate-950 border-t border-white/10 text-white/60 py-16 px-6 md:px-12">
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-10 mb-12">
        {/* Brand */}
        <div className="md:col-span-2">
          <div className="mb-4">
            <RaahiLogo size="md" />
          </div>
          <p className="text-sm text-white/60 max-w-sm mb-6 leading-relaxed">
            India's dignified smart travel companion. Re-imagining tourism through hyper-local AI context, authentic artisan economies, and unified digital monument access.
          </p>
          <div className="flex items-center gap-2 text-xs text-amber-400/90 font-medium">
            <span>Built with precision for Smart India Hackathon</span>
          </div>
        </div>

        {/* Quick Links */}
        <div>
          <h4 className="text-white text-xs font-bold uppercase tracking-wider mb-4">Platform</h4>
          <ul className="space-y-2.5 text-sm">
            <li><a href="/trip-planner" className="hover:text-amber-400 transition-colors">AI Trip Planner</a></li>
            <li><a href="#destinations" className="hover:text-amber-400 transition-colors">Curated Circuits</a></li>
            <li><a href="#features" className="hover:text-amber-400 transition-colors">Smart Radar</a></li>
            <li><a href="#digital-pass" className="hover:text-amber-400 transition-colors">Digital Travel Pass</a></li>
            <li><a href="#safety" className="hover:text-amber-400 transition-colors">SOS Tourist Safety</a></li>
          </ul>
        </div>

        {/* Community & Partners */}
        <div>
          <h4 className="text-white text-xs font-bold uppercase tracking-wider mb-4">Local Impact</h4>
          <ul className="space-y-2.5 text-sm">
            <li><a href="#" className="hover:text-amber-400 transition-colors">Become a Guide</a></li>
            <li><a href="#" className="hover:text-amber-400 transition-colors">Artisan Marketplace</a></li>
            <li><a href="#" className="hover:text-amber-400 transition-colors">Homestay Onboarding</a></li>
            <li><a href="#" className="hover:text-amber-400 transition-colors">Ministry of Tourism Guidelines</a></li>
          </ul>
        </div>
      </div>

      <div className="max-w-6xl mx-auto pt-8 border-t border-white/5 flex flex-col md:flex-row items-center justify-between gap-4 text-xs">
        <div>
          © {new Date().getFullYear()} Raahi Platform. All rights reserved.
        </div>
        <div className="flex items-center gap-6">
          <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
          <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
          <a href="#" className="hover:text-white transition-colors">Security Architecture</a>
        </div>
      </div>
    </footer>
  );
}