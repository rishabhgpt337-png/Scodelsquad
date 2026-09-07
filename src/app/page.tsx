import LandingHero from "@/components/landing/LandingHero";
import DestinationsSection from "@/components/landing/DestinationsSection";
import LiveMapSection from "@/components/landing/LiveMapSection";
import FeaturesSection from "@/components/landing/FeaturesSection";
import VendorImpactSection from "@/components/landing/VendorImpactSection";
import Footer from "@/components/landing/Footer";

export default function HomePage() {
  return (
    <main className="min-h-screen bg-[#050505] text-white flex flex-col selection:bg-amber-400/30 selection:text-amber-200">
      <LandingHero />
      <DestinationsSection />
      <LiveMapSection />
      <FeaturesSection />
      <VendorImpactSection />
      <Footer />
    </main>
  );
}
