import LandingHero from "@/components/landing/LandingHero";
import VendorImpactSection from "@/components/landing/VendorImpactSection";
import SmartRadar from "@/components/landing/SmartRadar";
import Footer from "@/components/landing/Footer";

export default function HomePage() {
  return (
    <main className="min-h-screen bg-slate-950 text-white flex flex-col">
      {/* 1. Cinematic Hero */}
      <LandingHero />

      {/* 5. Direct Vendor / Artisan Impact */}
      <VendorImpactSection />

      {/* 6. Footer */}
      <Footer />
    </main>
  );
}