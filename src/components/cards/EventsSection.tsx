import { motion } from "framer-motion";
import EventCard from "./EventCard";
import { useEvents } from "@/hooks/use-events";
import { useState } from "react";

const EventsSection = () => {
  const [selectedCategory, setSelectedCategory] = useState<
    "all" | "tech" | "non-tech" | "esports" | "workshops"
  >("all");
  const { events, loading, error } = useEvents();

  const categories = [
    { id: "all", label: "All Events", color: "text-neon-orange" },
    { id: "tech", label: "Tech", color: "text-neon-cyan" },
    { id: "non-tech", label: "Non-Tech", color: "text-neon-pink" },
    { id: "esports", label: "Esports", color: "text-neon-purple" },
    { id: "workshops", label: "Workshops", color: "text-neon-green" },
  ] as const;

  const filteredEvents = (() => {
    const categoryEvents =
      selectedCategory === "all"
        ? events
        : events.filter((event) => event.category === selectedCategory);

    if (selectedCategory === "all") {
      // Shuffle events for "all" category
      return [...categoryEvents].sort(() => Math.random() - 0.5);
    }

    return categoryEvents;
  })();

  return (
    <section id="events" className="relative py-28 px-6">
      {/* Background decorations */}
      <div className="absolute inset-0 hex-grid opacity-20 pointer-events-none" />
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-primary/50 to-transparent pointer-events-none" />

      {/* Corner decorations */}
      <div className="absolute top-8 left-8 w-20 h-20 border-l-2 border-t-2 border-primary/30 pointer-events-none" />
      <div className="absolute top-8 right-8 w-20 h-20 border-r-2 border-t-2 border-accent/30 pointer-events-none" />
      <div className="absolute bottom-8 left-8 w-20 h-20 border-l-2 border-b-2 border-accent/30 pointer-events-none" />
      <div className="absolute bottom-8 right-8 w-20 h-20 border-r-2 border-b-2 border-primary/30 pointer-events-none" />

      {/* Section header */}
      <div className="max-w-7xl mx-auto mb-20">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center"
        >
          <h2 className="font-display text-4xl md:text-6xl lg:text-7xl font-black mb-6">
            <span className="text-gradient-primary">30+ Events.</span>{" "}
            <span className="text-foreground">Infinite Possibilities.</span>
          </h2>

          <div className="flex items-center justify-center gap-4 mb-6">
            <div className="h-[2px] w-24 bg-gradient-to-r from-transparent to-primary" />
            <div className="w-3 h-3 rotate-45 border-2 border-neon-green" />
            <div className="h-[2px] w-24 bg-gradient-to-l from-transparent to-accent" />
          </div>

          <p className="text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            From AI challenges to cybersecurity showdowns, from design battles
            to VR experiences.
            <span className="text-primary"> Choose your arena.</span>
          </p>
        </motion.div>

        {/* Category Filter */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="flex flex-wrap justify-center gap-3 mt-12"
        >
          {categories.map((category) => (
            <motion.button
              key={category.id}
              onClick={() => setSelectedCategory(category.id as any)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className={`px-6 py-2.5 rounded-full border-2 transition-all duration-300 font-medium text-sm cursor-pointer ${
                selectedCategory === category.id
                  ? `border-neon-orange bg-neon-orange/15 ${category.color} shadow-[0_0_12px_hsl(20,95%,55%,0.3)]`
                  : "border-primary/30 bg-primary/5 text-muted-foreground hover:border-primary/60 hover:bg-primary/10"
              }`}
            >
              {category.label}
            </motion.button>
          ))}
        </motion.div>
      </div>

      {/* Events grid */}
      <div className="max-w-7xl mx-auto relative">
        {/* Grid background lines */}
        <div className="absolute inset-0 grid-overlay opacity-10 pointer-events-none" />

        {loading && (
          <div className="text-center py-12">
            <p className="text-foreground/70">Loading events...</p>
          </div>
        )}

        {error && (
          <div className="text-center py-12">
            <p className="text-red-500">
              Error loading events: {error.message}
            </p>
          </div>
        )}

        {!loading && !error && (
          <motion.div
            layout
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 relative"
          >
            {filteredEvents.length > 0 ? (
              filteredEvents.map((event, index) => (
                <motion.div
                  key={event.id}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <EventCard event={event} index={index} />
                </motion.div>
              ))
            ) : (
              <div className="col-span-full text-center py-12">
                <p className="text-foreground/70">
                  No events found in this category.
                </p>
              </div>
            )}
          </motion.div>
        )}
      </div>

      {/* Bottom decoration */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-accent/50 to-transparent pointer-events-none" />
    </section>
  );
};

export default EventsSection;
