import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import MinPriceWidget from "@/components/tourvisor/MinPriceWidget";
import AdvantagesSection from "@/components/AdvantagesSection";
import Footer from "@/components/Footer";

export default function HomePage() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        <HeroSection />
        <MinPriceWidget />
        <AdvantagesSection />
      </main>
      <Footer />
    </div>
  );
}


