import LandingHero from "@/components/landing/LandingHero";
import LiveMapSection from "@/components/landing/LiveMapSection";
import VendorImpactSection from "@/components/landing/VendorImpactSection";
import Footer from "@/components/landing/Footer";

export default function HomePage() {
  return (
    <main className="min-h-screen bg-slate-950 text-white flex flex-col">
      {/* 1. Cinematic Hero */}
      <LandingHero />

      {/* 2. Live Map Section with Nearby Places */}
      <LiveMapSection />

      {/* 3. Direct Vendor / Artisan Impact */}
      <VendorImpactSection />

      {/* 4. Footer */}
      <Footer />
    </main>
  );
}
