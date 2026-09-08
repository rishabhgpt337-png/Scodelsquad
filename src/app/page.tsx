import LandingHero from "@/components/landing/LandingHero";
import Footer from "@/components/landing/Footer";

export default function HomePage() {
  return (
    <main className="min-h-screen bg-[#0D0C0A] text-[#F3EDE3] flex flex-col selection:bg-[#C8B79F]/30 selection:text-[#F3EDE3]">
      <LandingHero />
      <Footer />
    </main>
  );
}
