import { motion } from "framer-motion";
import { ArrowLeft } from "lucide-react";
import { ConsoleCard } from "@/export-cards";
import ParticleField from "@/components/ParticleField";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useEventsByCategory } from "@/hooks/use-events";

const NonTechnicalEventsPage = () => {
  const { events: nonTechnicalEvents, loading } =
    useEventsByCategory("non-tech");
  return (
    <div className="relative min-h-screen">
      <ParticleField />
      <Navbar />

      <main className="relative z-10">
        {/* Corner decorations */}
        {/* <div className="absolute top-32 left-8 w-20 h-20 border-l-2 border-t-2 border-primary/30 pointer-events-none" />
        <div className="absolute top-32 right-8 w-20 h-20 border-r-2 border-t-2 border-accent/30 pointer-events-none" />
        <div className="absolute bottom-8 left-8 w-20 h-20 border-l-2 border-b-2 border-accent/30 pointer-events-none" />
        <div className="absolute bottom-8 right-8 w-20 h-20 border-r-2 border-b-2 border-primary/30 pointer-events-none" /> */}

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
              <a
                href="/"
                className="inline-flex items-center gap-2 text-sm font-mono uppercase tracking-wider hover:gap-4 transition-all"
              >
                <ArrowLeft size={18} />
                Back to Home
              </a>
            </motion.div>

            {/* Page Header */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-center mb-20"
            >
              <h1 className="font-display text-5xl md:text-7xl lg:text-8xl font-black mb-6 text-neon-pink">
                Non-Technical Events
              </h1>

              <div className="flex items-center justify-center gap-4 mb-6">
                <div className="h-[2px] w-24 bg-gradient-to-r from-transparent to-primary" />
                <div className="w-3 h-3 rotate-45 border-2 border-neon-green" />
                <div className="h-[2px] w-24 bg-gradient-to-l from-transparent to-accent" />
              </div>

              <p className="text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
                Engage your creativity, communication, and strategic thinking.
                From mystery challenges to business simulations, test your
                skills across diverse domains.
              </p>

              <p className="text-sm text-muted-foreground mt-4">
                {nonTechnicalEvents.length} event
                {nonTechnicalEvents.length !== 1 ? "s" : ""} available
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
                className="flex flex-wrap justify-center gap-8 relative"
              >
                {nonTechnicalEvents.map((event, index) => (
                  <motion.div
                    key={event.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: index * 0.1 }}
                  >
                    <Link
                      to={`/console-event/${event.id}`}
                      className="block h-full"
                    >
                      <ConsoleCard
                        title={event.name}
                        description={event.tagline}
                        category={event.category}
                      />
                    </Link>
                  </motion.div>
                ))}
              </motion.div>
            )}

            {!loading && nonTechnicalEvents.length === 0 && (
              <div className="text-center py-20">
                <p className="text-muted-foreground text-lg">
                  No events available in this category.
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

export default NonTechnicalEventsPage;
