import LandingHero from "@/components/landing/LandingHero";
import VendorImpactSection from "@/components/landing/VendorImpactSection";
import Footer from "@/components/landing/Footer";

export default function HomePage() {
  return (
    <main className="min-h-screen bg-[#050505] text-white flex flex-col">
      {/* 1. Cinematic Hero */}
      <LandingHero />

      {/* 2. Direct Vendor / Artisan Impact */}
      <VendorImpactSection />

      {/* 3. Footer */}
      <Footer />
    </main>
  );
}
