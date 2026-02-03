import { motion } from "framer-motion";
import { ArrowLeft } from "lucide-react";
import { useEventById } from "../hooks/use-events";
import ParticleField from "./ParticleField";

interface EventPageProps {
  eventId?: string;
}

// Cassette card color scheme
const COLORS = {
  white: "#FFFFFF",
  peach: "#F1B5A2",
  accent: "#3C2A56",
} as const;

const EventPage = ({ eventId }: EventPageProps) => {
  const { event, loading, error } = useEventById(eventId);

  // Determine the back link based on event category
  const getBackLink = () => {
    if (!event) return "/events";
    switch (event.category) {
      case "tech":
        return "/events";
      case "non-tech":
        return "/events";
      case "esports":
        return "/events";
      case "workshops":
        return "/events";
      default:
        return "/events";
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="font-display text-4xl font-bold mb-4">Loading...</h1>
        </div>
      </div>
    );
  }

  if (error || !event) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="font-display text-4xl font-bold mb-4">
            Event Not Found
          </h1>
          {error && <p className="text-red-500 mb-4">{error.message}</p>}
          <a href="/events" className="text-primary hover:underline">
            ← Back to Events
          </a>
        </div>
      </div>
    );
  }

  return (
    <div
      className="min-h-screen relative"
      style={{ backgroundColor: "#F5F5F5" }}
    >
      <ParticleField />

      {/* Back button */}
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.4 }}
        className="fixed top-6 left-6 z-50"
      >
        <a
          href={getBackLink()}
          className="flex items-center gap-2 px-5 py-2.5 font-display tracking-wider text-sm hover:gap-4 transition-all"
          style={{
            backgroundColor: COLORS.white,
            color: COLORS.accent,
            border: `2px solid ${COLORS.peach}`,
            boxShadow: `0 0 20px ${COLORS.peach}40`,
          }}
        >
          <ArrowLeft size={18} />
          BACK
        </a>
      </motion.div>

      {/* Main content */}
      <div className="relative z-10 pt-24 pb-16 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="grid gap-10 lg:grid-cols-2 items-start">
            {/* Left: badge, name, tagline, keywords */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-left"
            >
              {/* Badge */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="inline-flex items-center gap-3 px-5 py-2.5 mb-6 font-display tracking-widest uppercase text-sm font-medium"
                style={{
                  backgroundColor: COLORS.peach,
                  color: COLORS.accent,
                  border: `2px solid ${COLORS.peach}`,
                  boxShadow: `0 0 20px ${COLORS.peach}50`,
                }}
              >
                <span
                  className="w-2 h-2 rounded-full"
                  style={{ backgroundColor: COLORS.accent }}
                />
                Prakarsh '26
                <span
                  className="w-2 h-2 rounded-full"
                  style={{ backgroundColor: COLORS.accent }}
                />
              </motion.div>

              {/* Event name */}
              <h1
                className="font-display text-5xl md:text-7xl font-black mb-6 leading-tight"
                style={{ color: COLORS.accent }}
              >
                {event.name}
              </h1>

              {/* Tagline */}
              <p
                className="text-xl md:text-2xl font-medium mb-10 max-w-xl"
                style={{ color: COLORS.accent }}
              >
                {event.tagline}
              </p>

              {/* Keywords */}
              <div className="flex flex-wrap gap-3">
                {event.keywords.map((keyword) => (
                  <span
                    key={keyword}
                    className="px-4 py-2 text-sm font-display font-medium tracking-wider"
                    style={{
                      border: `1.5px solid ${COLORS.peach}`,
                      color: COLORS.accent,
                      backgroundColor: `${COLORS.peach}20`,
                    }}
                  >
                    {keyword}
                  </span>
                ))}
              </div>
            </motion.div>

            {/* Right: about + highlights */}
            <div className="space-y-8">
              {/* Event description card */}
              <motion.div
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="relative p-8 md:p-12"
                style={{
                  backgroundColor: COLORS.accent,
                  border: `2px solid ${COLORS.peach}`,
                  boxShadow: `0 0 40px -15px ${COLORS.peach}50, 0 0 0 1px ${COLORS.peach}`,
                }}
              >
                {/* Corner notches */}
                <div
                  className="absolute top-0 left-0 w-4 h-4"
                  style={{
                    background: `linear-gradient(135deg, ${COLORS.accent} 50%, transparent 50%)`,
                    boxShadow: `inset -1px -1px 0 ${COLORS.peach}`,
                  }}
                />
                <div
                  className="absolute bottom-0 right-0 w-4 h-4"
                  style={{
                    background: `linear-gradient(-45deg, ${COLORS.accent} 50%, transparent 50%)`,
                    boxShadow: `inset 1px 1px 0 ${COLORS.peach}`,
                  }}
                />

                <h2
                  className="font-display text-2xl font-bold mb-6 flex items-center gap-3"
                  style={{ color: COLORS.white }}
                >
                  <div
                    className="w-2 h-6"
                    style={{ backgroundColor: COLORS.peach }}
                  />
                  About the Event
                </h2>
                <div className="space-y-4">
                  {event.description.map((paragraph, index) => (
                    <p
                      key={index}
                      className="leading-relaxed text-lg"
                      style={{ color: COLORS.white }}
                    >
                      {paragraph}
                    </p>
                  ))}
                </div>
              </motion.div>
            </div>
          </div>

          {/* Rules Section - Only show if event has rules */}
          {event.rules && (
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="mt-16"
            >
              <h2
                className="font-display text-3xl md:text-4xl font-bold mb-8 text-center"
                style={{ color: COLORS.accent }}
              >
                Game Rules
              </h2>

              <div className="grid gap-8 lg:grid-cols-2">
                {/* Singles Rules */}
                {event.rules.singles && (
                  <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: 0.6 }}
                    className="relative p-8"
                    style={{
                      backgroundColor: COLORS.accent,
                      border: `2px solid ${COLORS.peach}`,
                      boxShadow: `0 0 40px -15px ${COLORS.peach}50, 0 0 0 1px ${COLORS.peach}`,
                    }}
                  >
                    {/* Corner notches */}
                    <div
                      className="absolute top-0 left-0 w-4 h-4"
                      style={{
                        background: `linear-gradient(135deg, ${COLORS.accent} 50%, transparent 50%)`,
                        boxShadow: `inset -1px -1px 0 ${COLORS.peach}`,
                      }}
                    />
                    <div
                      className="absolute bottom-0 right-0 w-4 h-4"
                      style={{
                        background: `linear-gradient(-45deg, ${COLORS.accent} 50%, transparent 50%)`,
                        boxShadow: `inset 1px 1px 0 ${COLORS.peach}`,
                      }}
                    />

                    <h3
                      className="font-display text-xl font-bold mb-6 text-center"
                      style={{ color: COLORS.peach }}
                    >
                      {event.rules.singles.title}
                    </h3>

                    <div className="space-y-6">
                      {event.rules.singles.sections.map(
                        (section, sectionIdx) => (
                          <div key={sectionIdx} className="space-y-3">
                            <div className="flex items-start gap-3">
                              <span
                                className="font-display font-bold text-lg flex-shrink-0 w-6 h-6 flex items-center justify-center rounded-full"
                                style={{
                                  backgroundColor: `${COLORS.peach}40`,
                                  color: COLORS.peach,
                                }}
                              >
                                {section.number}
                              </span>
                              <h4
                                className="font-display font-semibold text-lg"
                                style={{ color: COLORS.white }}
                              >
                                {section.title}
                              </h4>
                            </div>

                            <div className="ml-9 space-y-3">
                              {section.items.map((item, itemIdx) => (
                                <div key={itemIdx} className="space-y-2">
                                  {item.subtitle && (
                                    <p
                                      className="font-medium"
                                      style={{ color: `${COLORS.white}90` }}
                                    >
                                      {item.subtitle}
                                    </p>
                                  )}
                                  <ul className="space-y-1.5">
                                    {item.points.map((point, pointIdx) => (
                                      <li
                                        key={pointIdx}
                                        className="flex items-start gap-2 text-sm"
                                        style={{ color: `${COLORS.white}70` }}
                                      >
                                        <span
                                          className="w-1.5 h-1.5 mt-1.5 flex-shrink-0 rounded-full"
                                          style={{
                                            backgroundColor: COLORS.peach,
                                          }}
                                        />
                                        <span>{point}</span>
                                      </li>
                                    ))}
                                  </ul>
                                </div>
                              ))}
                            </div>
                          </div>
                        ),
                      )}
                    </div>
                  </motion.div>
                )}

                {/* Doubles Rules */}
                {event.rules.doubles && (
                  <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: 0.6 }}
                    className="relative p-8"
                    style={{
                      backgroundColor: COLORS.accent,
                      border: `2px solid ${COLORS.peach}`,
                      boxShadow: `0 0 40px -15px ${COLORS.peach}50, 0 0 0 1px ${COLORS.peach}`,
                    }}
                  >
                    {/* Corner notches */}
                    <div
                      className="absolute top-0 left-0 w-4 h-4"
                      style={{
                        background: `linear-gradient(135deg, ${COLORS.accent} 50%, transparent 50%)`,
                        boxShadow: `inset -1px -1px 0 ${COLORS.peach}`,
                      }}
                    />
                    <div
                      className="absolute bottom-0 right-0 w-4 h-4"
                      style={{
                        background: `linear-gradient(-45deg, ${COLORS.accent} 50%, transparent 50%)`,
                        boxShadow: `inset 1px 1px 0 ${COLORS.peach}`,
                      }}
                    />

                    <h3
                      className="font-display text-xl font-bold mb-6 text-center"
                      style={{ color: COLORS.peach }}
                    >
                      {event.rules.doubles.title}
                    </h3>

                    <div className="space-y-6">
                      {event.rules.doubles.sections.map(
                        (section, sectionIdx) => (
                          <div key={sectionIdx} className="space-y-3">
                            <div className="flex items-start gap-3">
                              <span
                                className="font-display font-bold text-lg flex-shrink-0 w-6 h-6 flex items-center justify-center rounded-full"
                                style={{
                                  backgroundColor: `${COLORS.peach}40`,
                                  color: COLORS.peach,
                                }}
                              >
                                {section.number}
                              </span>
                              <h4
                                className="font-display font-semibold text-lg"
                                style={{ color: COLORS.white }}
                              >
                                {section.title}
                              </h4>
                            </div>

                            <div className="ml-9 space-y-3">
                              {section.items.map((item, itemIdx) => (
                                <div key={itemIdx} className="space-y-2">
                                  {item.subtitle && (
                                    <p
                                      className="font-medium"
                                      style={{ color: `${COLORS.white}90` }}
                                    >
                                      {item.subtitle}
                                    </p>
                                  )}
                                  <ul className="space-y-1.5">
                                    {item.points.map((point, pointIdx) => (
                                      <li
                                        key={pointIdx}
                                        className="flex items-start gap-2 text-sm"
                                        style={{ color: `${COLORS.white}70` }}
                                      >
                                        <span
                                          className="w-1.5 h-1.5 mt-1.5 flex-shrink-0 rounded-full"
                                          style={{
                                            backgroundColor: COLORS.peach,
                                          }}
                                        />
                                        <span>{point}</span>
                                      </li>
                                    ))}
                                  </ul>
                                </div>
                              ))}
                            </div>
                          </div>
                        ),
                      )}
                    </div>
                  </motion.div>
                )}
              </div>
            </motion.div>
          )}
        </div>
      </div>
    </div>
  );
};

export default EventPage;
