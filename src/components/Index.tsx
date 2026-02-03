import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import EventsSection from "@/components/EventsSection";
import Footer from "@/components/Footer";
import ParticleField from "@/components/ParticleField";

const Index = () => {
  return (
    <div className="relative min-h-screen">
      <ParticleField />
      <Navbar />
      <main className="relative z-10">
        <HeroSection />
        <EventsSection />
        <Footer />
      </main>
    </div>
  );
};

export default Index;
