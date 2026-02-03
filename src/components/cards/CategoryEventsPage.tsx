import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import EventCard from "./EventCard";
import ParticleField from "./ParticleField";
import Navbar from "./Navbar";
import Footer from "./Footer";
import type { Event } from "@/data/event-types";

interface CategoryEventsPageProps {
  category: "tech" | "non-tech" | "esports" | "workshops";
  title: string;
  description: string;
  events: Event[];
}

const CategoryEventsPage = ({
  category,
  title,
  description,
  events,
}: CategoryEventsPageProps) => {
  const categoryColors: Record<string, { color: string; glow: string }> = {
    tech: { color: "text-neon-cyan", glow: "from-cyan-500/20 to-cyan-500/5" },
    "non-tech": {
      color: "text-neon-pink",
      glow: "from-pink-500/20 to-pink-500/5",
    },
    esports: {
      color: "text-neon-purple",
      glow: "from-purple-500/20 to-purple-500/5",
    },
    workshops: {
      color: "text-neon-green",
      glow: "from-green-500/20 to-green-500/5",
    },
  };

  const categoryColor = categoryColors[category];

  return (
    <div className="relative min-h-screen">
      <ParticleField />
      <Navbar />

      <main className="relative z-10">
        {/* Background decorations */}
        <div className="absolute inset-0 hex-grid opacity-20 pointer-events-none" />
        <div
          className={`absolute top-0 left-0 right-0 h-[50vh] bg-gradient-to-b ${categoryColor.glow} pointer-events-none`}
        />

        {/* Corner decorations */}
        <div className="absolute top-32 left-8 w-20 h-20 border-l-2 border-t-2 border-primary/30 pointer-events-none" />
        <div className="absolute top-32 right-8 w-20 h-20 border-r-2 border-t-2 border-accent/30 pointer-events-none" />
        <div className="absolute bottom-8 left-8 w-20 h-20 border-l-2 border-b-2 border-accent/30 pointer-events-none" />
        <div className="absolute bottom-8 right-8 w-20 h-20 border-r-2 border-b-2 border-primary/30 pointer-events-none" />

        {/* Page content */}
        <div className="pt-32 pb-16 px-6">
          <div className="max-w-7xl mx-auto">
            {/* Page Header */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-center mb-20"
            >
              <h1
                className={`font-display text-5xl md:text-7xl lg:text-8xl font-black mb-6 ${categoryColor.color}`}
              >
                {title}
              </h1>

              <div className="flex items-center justify-center gap-4 mb-6">
                <div className="h-[2px] w-24 bg-gradient-to-r from-transparent to-primary" />
                <div className="w-3 h-3 rotate-45 border-2 border-neon-green" />
                <div className="h-[2px] w-24 bg-gradient-to-l from-transparent to-accent" />
              </div>

              <p className="text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
                {description}
              </p>

              <p className="text-sm text-muted-foreground mt-4">
                {events.length} event{events.length !== 1 ? "s" : ""} available
              </p>
            </motion.div>

            {/* Events Grid */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 relative"
            >
              {events.map((event, index) => (
                <motion.div
                  key={event.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                >
                  <EventCard event={event} index={index} />
                </motion.div>
              ))}
            </motion.div>

            {events.length === 0 && (
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

export default CategoryEventsPage;
