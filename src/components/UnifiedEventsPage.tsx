import { motion } from "framer-motion";
import { useState } from "react";
import MatrixRain from "./MatrixRain";
import GeometricPattern from "./GeometricPattern";
import CassetteCard from "./CassetteCard";
import ConsoleCard from "./ConsoleCard";
import EsportsCard from "./EsportsCard";
import type { Event } from "@/lib/event-types";
import { useEvents } from "@/hooks/use-events";

export default function UnifiedEventsPage() {
  const { events, loading, error } = useEvents();

  // Read category from URL parameter
  const getInitialTab = () => {
    if (typeof window !== "undefined") {
      const params = new URLSearchParams(window.location.search);
      const category = params.get("category");
      if (
        category === "tech" ||
        category === "non-tech" ||
        category === "workshops" ||
        category === "esports"
      ) {
        return category;
      }
    }
    return "all";
  };

  const [activeTab, setActiveTab] = useState<
    "all" | "tech" | "non-tech" | "workshops" | "esports"
  >(getInitialTab());

  // Filter events by category
  const technicalEvents = events.filter((e) => e.category === "tech");
  const nonTechnicalEvents = events.filter((e) => e.category === "non-tech");
  const workshopEvents = events.filter((e) => e.category === "workshops");
  const esportsEvents = events.filter((e) => e.category === "esports");

  // Category descriptions
  const categoryDescriptions = {
    all: "Explore all technical events, non-technical challenges, workshops, and esports tournaments at Prakarsh '26",
    tech: "Dive into technical events designed to test your logic, creativity, and problem-solving skills. Compete in coding battles, hardware challenges, design sprints, and innovation-driven competitions built for curious and competitive minds.",
    "non-tech":
      "Step into non-technical events where creativity, strategy, communication, and fun take center stage. Participate in engaging challenges, team activities, and crowd-favorite events that prove you don't need code to compete.",
    workshops:
      "Learn directly from industry experts through hands-on workshops focused on practical skills, emerging technologies, and real-world applications. Perfect for gaining knowledge beyond the classroom.",
    esports:
      "Enter the arena and compete in adrenaline-packed esports tournaments. Show off your gaming skills, teamwork, and strategy in high-stakes matches against the best players at Prakarsh '26.",
  };

  // Show error state only if there's an error AND no cached data
  if (error && events.length === 0) {
    console.log(error.message);
    return (
      <div
        className="min-h-screen flex items-center justify-center"
        style={{ background: "linear-gradient(to bottom, #000000, #1a0033)" }}
      >
        <div className="text-center">
          <div className="text-2xl font-bold text-red-500 mb-4">
            Error Loading Events
          </div>
          {/* <div className="text-gray-400">{error.message}</div> */}
        </div>
      </div>
    );
  }

  const allEvents = [
    ...technicalEvents.map((e) => ({ ...e, displayCategory: "tech" as const })),
    ...nonTechnicalEvents.map((e) => ({
      ...e,
      displayCategory: "non-tech" as const,
    })),
    ...workshopEvents.map((e) => ({
      ...e,
      displayCategory: "workshops" as const,
    })),
    ...esportsEvents.map((e) => ({
      ...e,
      displayCategory: "esports" as const,
    })),
  ];

  const filteredEvents =
    activeTab === "all"
      ? allEvents
      : allEvents.filter((e) => e.displayCategory === activeTab);

  const accentColors = [
    "#ff006e",
    "#00f5ff",
    "#ffbe0b",
    "#8338ec",
    "#3a86ff",
    "#06ffa5",
  ];

  return (
    <div className="relative min-h-screen text-foreground">
      {/* Background animations - switch based on active tab */}
      {activeTab === "esports" ? (
        <GeometricPattern
          backgroundColor="#fbdacc"
          primaryColor="#7B7BF8"
          accentColors={["#7B7BF8", "#FF67D5", "#C9C9FF"]}
          opacity={0.6}
        />
      ) : (
        <MatrixRain />
      )}

      <main className="relative z-10">
        {/* Back Button - At top */}
        {/* <div className="pt-8 px-6">
          <div className="max-w-7xl mx-auto">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3 }}
            >
              <a
                href="/"
                className="inline-flex items-center gap-2 text-sm font-mono uppercase tracking-wider hover:gap-4 transition-all text-foreground hover:text-primary"
              >
                ← Back to Home
              </a>
            </motion.div>
          </div>
        </div> */}

        {/* Page content */}
        <div className="pt-8 pb-8 px-6">
          <div className="max-w-7xl mx-auto">
            {/* Page Header */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-center mb-6"
            >
              <h1 className="font-display text-5xl md:text-7xl lg:text-8xl font-black mb-6 text-neon-cyan py-10 mt-20">
                Events
              </h1>

              {/* Decorative Element */}
              <div className="flex items-center justify-center gap-4 mb-1">
                <div className="h-[2px] w-24 bg-gradient-to-r from-transparent to-primary" />
                <div className="w-3 h-3 rotate-45 border-2 border-neon-green" />
                <div className="h-[2px] w-24 bg-gradient-to-l from-transparent to-accent" />
              </div>

              <p className="text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed mb-8">
                {categoryDescriptions[activeTab]}
              </p>

              {/* Filter Tabs */}
              <div className="flex flex-wrap justify-center gap-4">
                {[
                  { id: "all", label: "All Events", count: allEvents.length },
                  {
                    id: "tech",
                    label: "Technical",
                    count: technicalEvents.length,
                  },
                  {
                    id: "non-tech",
                    label: "Non-Technical",
                    count: nonTechnicalEvents.length,
                  },
                  {
                    id: "workshops",
                    label: "Workshops",
                    count: workshopEvents.length,
                  },
                  {
                    id: "esports",
                    label: "Esports",
                    count: esportsEvents.length,
                  },
                ].map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id as any)}
                    className={`px-6 py-3 font-display text-sm tracking-wider transition-all ${
                      activeTab === tab.id
                        ? "bg-primary text-primary-foreground"
                        : "bg-background/50 text-foreground/70 hover:bg-background/80 border border-border"
                    }`}
                    style={{
                      clipPath:
                        "polygon(10px 0, 100% 0, 100% calc(100% - 10px), calc(100% - 10px) 100%, 0 100%, 0 10px)",
                    }}
                  >
                    {tab.label} ({tab.count})
                  </button>
                ))}
              </div>
            </motion.div>

            {/* Events Grid */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="relative"
            >
              {/* Technical Events - Grid Layout */}
              {activeTab === "tech" || activeTab === "all" ? (
                <div className="mb-12">
                  {activeTab === "all" && technicalEvents.length > 0 && (
                    <h2 className="text-3xl font-display font-black mb-6 text-neon-cyan">
                      Technical Events
                    </h2>
                  )}
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {(activeTab === "tech"
                      ? technicalEvents
                      : technicalEvents
                    ).map((event, index) => (
                      <motion.div
                        key={event.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.4, delay: index * 0.05 }}
                      >
                        <CassetteCard
                          event={event}
                          index={index}
                          totalEvents={technicalEvents.length}
                        />
                      </motion.div>
                    ))}
                  </div>
                </div>
              ) : null}

              {/* Non-Technical Events - Flex Layout */}
              {activeTab === "non-tech" || activeTab === "all" ? (
                <div className="mb-12">
                  {activeTab === "all" && nonTechnicalEvents.length > 0 && (
                    <h2 className="text-3xl font-display font-black mb-6 text-neon-pink">
                      Non-Technical Events
                    </h2>
                  )}
                  <div className="flex flex-wrap justify-center gap-6">
                    {(activeTab === "non-tech"
                      ? nonTechnicalEvents
                      : nonTechnicalEvents
                    ).map((event, index) => (
                      <motion.div
                        key={event.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.4, delay: index * 0.05 }}
                      >
                        <a href={`/event/${event.id}`} className="block">
                          <ConsoleCard
                            title={event.name}
                            description={event.tagline}
                            category="non-tech"
                          />
                        </a>
                      </motion.div>
                    ))}
                  </div>
                </div>
              ) : null}

              {/* Workshops - Flex Layout */}
              {activeTab === "workshops" || activeTab === "all" ? (
                <div className="mb-12">
                  {activeTab === "all" && workshopEvents.length > 0 && (
                    <h2 className="text-3xl font-display font-black mb-6 text-neon-green">
                      Workshops
                    </h2>
                  )}
                  <div className="flex flex-wrap justify-center gap-6">
                    {(activeTab === "workshops"
                      ? workshopEvents
                      : workshopEvents
                    ).map((event, index) => (
                      <motion.div
                        key={event.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.4, delay: index * 0.05 }}
                      >
                        <a href={`/event/${event.id}`} className="block">
                          <ConsoleCard
                            title={event.name}
                            description={event.tagline}
                            category="workshops"
                          />
                        </a>
                      </motion.div>
                    ))}
                  </div>
                </div>
              ) : null}

              {/* Esports - Flex Layout */}
              {activeTab === "esports" || activeTab === "all" ? (
                <div className="mb-12">
                  {activeTab === "all" && esportsEvents.length > 0 && (
                    <h2 className="text-3xl font-display font-black mb-6 text-neon-purple">
                      Esports
                    </h2>
                  )}
                  <div className="flex flex-wrap justify-center gap-6">
                    {(activeTab === "esports"
                      ? esportsEvents
                      : esportsEvents
                    ).map((event, index) => (
                      <motion.div
                        key={event.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.4, delay: index * 0.05 }}
                      >
                        <a href={`/event/${event.id}`} className="block">
                          <EsportsCard
                            gameName={event.name.split(" ")[0]}
                            tournamentName={event.name}
                            prizePool="TBA"
                            teamSize="Squad"
                            date="Prakarsh '26"
                            posterImage={event.posterImage || ""}
                            accentColor={
                              accentColors[index % accentColors.length]
                            }
                          />
                        </a>
                      </motion.div>
                    ))}
                  </div>
                </div>
              ) : null}
            </motion.div>

            {filteredEvents.length === 0 && (
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
}
