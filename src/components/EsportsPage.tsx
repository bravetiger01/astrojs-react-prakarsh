import { motion } from "framer-motion";
import { ArrowLeft } from "lucide-react";
import { EsportsCard } from "@/export-cards";
import ParticleField from "@/components/ParticleField";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useEventsByCategory } from "@/hooks/use-events";

const EsportsPage = () => {
  const { events: esportsEvents, loading } = useEventsByCategory("esports");
  const accentColors = [
    "#ff006e",
    "#00f5ff",
    "#ffbe0b",
    "#8338ec",
    "#3a86ff",
    "#06ffa5",
  ];

  return (
    <div className="relative min-h-screen">
      <ParticleField />
      <Navbar />

      <main className="relative z-10">
        {/* Corner decorations */}
        {/* <div className="absolute top-20 sm:top-32 left-4 sm:left-8 w-12 sm:w-20 h-12 sm:h-20 border-l-2 border-t-2 border-primary/30 pointer-events-none" />
        <div className="absolute top-20 sm:top-32 right-4 sm:right-8 w-12 sm:w-20 h-12 sm:h-20 border-r-2 border-t-2 border-accent/30 pointer-events-none" />
        <div className="absolute bottom-4 sm:bottom-8 left-4 sm:left-8 w-12 sm:w-20 h-12 sm:h-20 border-l-2 border-b-2 border-accent/30 pointer-events-none" />
        <div className="absolute bottom-4 sm:bottom-8 right-4 sm:right-8 w-12 sm:w-20 h-12 sm:h-20 border-r-2 border-b-2 border-primary/30 pointer-events-none" /> */}

        {/* Page content */}
        <div className="pt-16 sm:pt-24 md:pt-32 pb-8 sm:pb-12 md:pb-16 px-4 sm:px-6">
          <div className="max-w-7xl mx-auto">
            {/* Back Button */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3 }}
              className="mb-8 sm:mb-12"
            >
              <a
                href="/"
                className="inline-flex items-center gap-2 text-xs sm:text-sm font-mono uppercase tracking-wider hover:gap-4 transition-all"
              >
                <ArrowLeft size={16} className="sm:w-[18px] sm:h-[18px]" />
                Back to Home
              </a>
            </motion.div>

            {/* Page Header */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-center mb-12 sm:mb-16 md:mb-20"
            >
              <h1 className="font-display text-3xl sm:text-5xl md:text-7xl lg:text-8xl font-black mb-4 sm:mb-6 text-neon-purple">
                Esports
              </h1>

              <div className="flex items-center justify-center gap-3 sm:gap-4 mb-4 sm:mb-6">
                <div className="h-[2px] w-16 sm:w-24 bg-gradient-to-r from-transparent to-primary" />
                <div className="w-2 h-2 sm:w-3 sm:h-3 rotate-45 border-2 border-neon-green" />
                <div className="h-[2px] w-16 sm:w-24 bg-gradient-to-l from-transparent to-accent" />
              </div>

              <p className="text-sm sm:text-base md:text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed px-4">
                Compete in high-stakes gaming tournaments. Free Fire MAX,
                Valorant, and more. Show the world your gaming excellence.
              </p>

              <p className="text-xs sm:text-sm text-muted-foreground mt-3 sm:mt-4">
                {esportsEvents.length} tournament
                {esportsEvents.length !== 1 ? "s" : ""} available
              </p>
            </motion.div>

            {/* Events Grid */}
            {loading ? (
              <div className="text-center py-20">
                <p className="text-muted-foreground text-lg">
                  Loading tournaments...
                </p>
              </div>
            ) : (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="flex flex-wrap justify-center gap-4 sm:gap-6 md:gap-8 relative px-2 sm:px-4"
              >
                {esportsEvents.map((event, index) => (
                  <motion.div
                    key={event.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: index * 0.1 }}
                  >
                    <Link
                      to={`/esports-event/${event.id}`}
                      className="block h-full"
                    >
                      <EsportsCard
                        gameName={event.name.split(" ")[0]}
                        tournamentName={event.name}
                        prizePool="TBA"
                        teamSize="Squad"
                        date="Prakarsh '26"
                        posterImage={event.posterImage || ""}
                        accentColor={accentColors[index % accentColors.length]}
                      />
                    </Link>
                  </motion.div>
                ))}
              </motion.div>
            )}

            {!loading && esportsEvents.length === 0 && (
              <div className="text-center py-20">
                <p className="text-muted-foreground text-lg">
                  No tournaments available.
                </p>
              </div>
            )}
          </div>
        </div>

        <Footer />
      </main>
    </div>
  );
};

export default EsportsPage;
