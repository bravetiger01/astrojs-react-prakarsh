import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import TechEventCard from "../components/cards/TechEventCardNew";
import ParticleField from "../components/cards/ParticleField";

import { useEventsByCategory } from "@/hooks/use-events";

const TechnicalEventsPage = () => {
  const { events: technicalEvents, loading } = useEventsByCategory("tech");
  const neonColors = [
    "cyan",
    "blue",
    "purple",
    "pink",
    "orange",
    "red",
  ] as const;

  return (
    <div className="relative min-h-screen">
      <ParticleField />

      <main className="relative z-10">
        {/* Corner decorations */}
        <div className="absolute top-32 left-8 w-20 h-20 border-l-2 border-t-2 border-primary/30 pointer-events-none" />
        <div className="absolute top-32 right-8 w-20 h-20 border-r-2 border-t-2 border-accent/30 pointer-events-none" />
        <div className="absolute bottom-8 left-8 w-20 h-20 border-l-2 border-b-2 border-accent/30 pointer-events-none" />
        <div className="absolute bottom-8 right-8 w-20 h-20 border-r-2 border-b-2 border-primary/30 pointer-events-none" />

        {/* Page content */}
        <div className="pt-32 pb-16 px-6">
          <div className="max-w-7xl mx-auto">
            {/* Back Button */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3 }}
              className="mb-12"
            >
              <Link
                to="/"
                className="inline-flex items-center gap-2 text-sm font-mono uppercase tracking-wider hover:gap-4 transition-all"
              >
                <ArrowLeft size={18} />
                Back to Home
              </Link>
            </motion.div>

            {/* Page Header */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-center mb-20"
            >
              <h1 className="font-display text-5xl md:text-7xl lg:text-8xl font-black mb-6 text-neon-cyan">
                Technical Events
              </h1>

              <div className="flex items-center justify-center gap-4 mb-6">
                <div className="h-[2px] w-24 bg-gradient-to-r from-transparent to-primary" />
                <div className="w-3 h-3 rotate-45 border-2 border-neon-green" />
                <div className="h-[2px] w-24 bg-gradient-to-l from-transparent to-accent" />
              </div>

              <p className="text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
                Dive into cutting-edge challenges in AI, cybersecurity, web
                development, and more. Showcase your coding prowess and
                innovative tech solutions.
              </p>

              <p className="text-sm text-muted-foreground mt-4">
                {technicalEvents.length} event
                {technicalEvents.length !== 1 ? "s" : ""} available
              </p>
            </motion.div>

            {/* Events Grid */}
            {loading ? (
              <div className="text-center py-20">
                <p className="text-muted-foreground text-lg">
                  Loading events...
                </p>
              </div>
            ) : (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 relative"
              >
                {technicalEvents.map((event, index) => (
                  <motion.div
                    key={event.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: index * 0.1 }}
                  >
                    <TechEventCard
                      event={{
                        ...event,
                        neonColor: neonColors[index % neonColors.length],
                      }}
                      index={index}
                    />
                  </motion.div>
                ))}
              </motion.div>
            )}

            {!loading && technicalEvents.length === 0 && (
              <div className="text-center py-20">
                <p className="text-muted-foreground text-lg">
                  No events available in this category.
                </p>
              </div>
            )}
          </div>
        </div>

      </main>
    </div>
  );
};

export default TechnicalEventsPage;
