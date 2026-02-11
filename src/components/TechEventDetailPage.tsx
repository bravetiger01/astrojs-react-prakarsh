import { motion } from "framer-motion";
import { ArrowLeft, Sparkles, Users, Calendar, MapPin } from "lucide-react";
import { useEventById } from "../hooks/use-events";
import ParticleField from "./ParticleField";
import { CONFIG } from "../lib/config";

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

  const teamSizeLabel =
    event?.solo === true
      ? "Solo"
      : event?.solo === false
        ? "Multiple"
        : "Individual";

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

      {/* Floating gradient orbs for premium effect */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <motion.div
          animate={{
            x: [0, 100, 0],
            y: [0, -100, 0],
            scale: [1, 1.2, 1],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute top-1/4 left-1/4 w-64 h-64 md:w-96 md:h-96 rounded-full opacity-20 blur-3xl"
          style={{
            background: `radial-gradient(circle, ${COLORS.peach}60, transparent)`,
          }}
        />
        <motion.div
          animate={{
            x: [0, -100, 0],
            y: [0, 100, 0],
            scale: [1, 1.3, 1],
          }}
          transition={{
            duration: 25,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute bottom-1/4 right-1/4 w-64 h-64 md:w-96 md:h-96 rounded-full opacity-20 blur-3xl"
          style={{
            background: `radial-gradient(circle, ${COLORS.accent}60, transparent)`,
          }}
        />
      </div>

      {/* Back button */}
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.4 }}
        className="fixed top-4 left-4 md:top-6 md:left-6 z-50"
      >
        <a
          href={getBackLink()}
          className="flex items-center gap-2 px-4 py-2 md:px-5 md:py-2.5 font-display tracking-wider text-xs md:text-sm hover:gap-4 transition-all backdrop-blur-sm"
          style={{
            backgroundColor: COLORS.white,
            color: COLORS.accent,
            border: `2px solid ${COLORS.peach}`,
            boxShadow: `0 0 20px ${COLORS.peach}40`,
          }}
        >
          <ArrowLeft size={16} className="md:w-[18px] md:h-[18px]" />
          BACK
        </a>
      </motion.div>

      {/* Floating Register Button - Desktop */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.8 }}
        className="hidden md:block fixed bottom-8 right-8 z-50"
      >
        <motion.a
          href="https://konfhub.com/svit"
          target="_blank"
          rel="noopener noreferrer"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="group relative flex items-center gap-3 px-8 py-4 font-display tracking-widest text-base font-bold overflow-hidden backdrop-blur-sm"
          style={{
            backgroundColor: COLORS.peach,
            color: COLORS.accent,
            border: `2px solid ${COLORS.accent}`,
            boxShadow: `0 8px 32px ${COLORS.peach}60, 0 0 0 1px ${COLORS.accent}20`,
          }}
        >
          {/* Animated shine effect */}
          <motion.div
            className="absolute inset-0 -translate-x-full"
            animate={{
              translateX: ["100%", "200%"],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: "linear",
            }}
            style={{
              background: `linear-gradient(90deg, transparent, ${COLORS.white}40, transparent)`,
            }}
          />

          <Sparkles size={20} className="animate-pulse" />
          <span>REGISTER NOW</span>

          {/* Hover glow */}
          <motion.div
            className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
            style={{
              boxShadow: `0 0 40px ${COLORS.peach}, inset 0 0 20px ${COLORS.white}20`,
            }}
          />
        </motion.a>
      </motion.div>

      {/* Sticky Register Button - Mobile */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.8 }}
        className="md:hidden fixed bottom-0 left-0 right-0 z-50 p-4"
        style={{
          background: `linear-gradient(to top, ${COLORS.white}, ${COLORS.white}00)`,
        }}
      >
        <motion.a
          href="https://konfhub.com/svit"
          target="_blank"
          rel="noopener noreferrer"
          whileTap={{ scale: 0.97 }}
          className="group relative flex items-center justify-center gap-2 w-full px-6 py-4 font-display tracking-widest text-sm font-bold overflow-hidden backdrop-blur-sm"
          style={{
            backgroundColor: COLORS.peach,
            color: COLORS.accent,
            border: `2px solid ${COLORS.accent}`,
            boxShadow: `0 8px 32px ${COLORS.peach}60, 0 0 0 1px ${COLORS.accent}20`,
          }}
        >
          {/* Animated shine effect */}
          <motion.div
            className="absolute inset-0 -translate-x-full"
            animate={{
              translateX: ["100%", "200%"],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: "linear",
            }}
            style={{
              background: `linear-gradient(90deg, transparent, ${COLORS.white}40, transparent)`,
            }}
          />

          <Sparkles size={18} className="animate-pulse" />
          <span>REGISTER NOW</span>
        </motion.a>
      </motion.div>

      {/* Main content */}
      <div className="relative z-10 pt-20 md:pt-24 pb-24 md:pb-16 px-4 md:px-6">
        <div className="max-w-6xl mx-auto">
          <div className="grid gap-8 md:gap-12 lg:gap-16 lg:grid-cols-2 items-start">
            {/* Left: badge, name, tagline, keywords */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-left"
            >
              {/* Badge with glow */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="inline-flex items-center gap-2 md:gap-3 px-4 py-2 md:px-5 md:py-2.5 mb-4 md:mb-6 font-display tracking-widest uppercase text-xs md:text-sm font-medium backdrop-blur-sm"
                style={{
                  backgroundColor: COLORS.peach,
                  color: COLORS.accent,
                  border: `2px solid ${COLORS.peach}`,
                  boxShadow: `0 0 20px ${COLORS.peach}50, 0 4px 12px ${COLORS.peach}30`,
                }}
              >
                <motion.span
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                  className="w-1.5 h-1.5 md:w-2 md:h-2 rounded-full"
                  style={{ backgroundColor: COLORS.accent }}
                />
                Prakarsh '26
                <motion.span
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ duration: 2, repeat: Infinity, delay: 1 }}
                  className="w-1.5 h-1.5 md:w-2 md:h-2 rounded-full"
                  style={{ backgroundColor: COLORS.accent }}
                />
              </motion.div>

              {/* Event name with gradient text effect */}
              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
                className="font-display text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black mb-4 md:mb-6 leading-tight relative break-words hyphens-auto"
                style={{ color: COLORS.accent }}
              >
                {event.name}
                {/* Subtle underline accent */}
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: "80px" }}
                  transition={{ duration: 0.8, delay: 0.5 }}
                  className="h-1 mt-2 md:hidden"
                  style={{
                    backgroundColor: COLORS.peach,
                    boxShadow: `0 0 10px ${COLORS.peach}60`,
                  }}
                />
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: "120px" }}
                  transition={{ duration: 0.8, delay: 0.5 }}
                  className="h-1 mt-2 hidden md:block"
                  style={{
                    backgroundColor: COLORS.peach,
                    boxShadow: `0 0 10px ${COLORS.peach}60`,
                  }}
                />
              </motion.h1>

              {/* Tagline */}
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="text-lg sm:text-xl md:text-2xl font-medium mb-6 md:mb-10 max-w-xl"
                style={{ color: COLORS.accent }}
              >
                {event.tagline}
              </motion.p>

              {/* Quick Info Cards */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="grid grid-cols-1 sm:grid-cols-2 gap-3 md:gap-4 mb-6 md:mb-10"
              >
                {/* Participants */}
                <div
                  className="flex items-center gap-3 p-3 md:p-4 backdrop-blur-sm"
                  style={{
                    backgroundColor: `${COLORS.white}80`,
                    border: `1.5px solid ${COLORS.peach}40`,
                  }}
                >
                  <div
                    className="p-2 rounded-full flex-shrink-0"
                    style={{ backgroundColor: `${COLORS.peach}30` }}
                  >
                    <Users
                      size={16}
                      className="md:w-[18px] md:h-[18px]"
                      style={{ color: COLORS.accent }}
                    />
                  </div>
                  <div>
                    <p
                      className="text-xs font-display tracking-wide opacity-70"
                      style={{ color: COLORS.accent }}
                    >
                      TEAM SIZE
                    </p>
                    <p
                      className="font-display font-bold text-sm md:text-base"
                      style={{ color: COLORS.accent }}
                    >
                      {teamSizeLabel}
                    </p>
                  </div>
                </div>

                {/* Date */}
                <div
                  className="flex items-center gap-3 p-3 md:p-4 backdrop-blur-sm"
                  style={{
                    backgroundColor: `${COLORS.white}80`,
                    border: `1.5px solid ${COLORS.peach}40`,
                  }}
                >
                  <div
                    className="p-2 rounded-full flex-shrink-0"
                    style={{ backgroundColor: `${COLORS.peach}30` }}
                  >
                    <Calendar
                      size={16}
                      className="md:w-[18px] md:h-[18px]"
                      style={{ color: COLORS.accent }}
                    />
                  </div>
                  <div>
                    <p
                      className="text-xs font-display tracking-wide opacity-70"
                      style={{ color: COLORS.accent }}
                    >
                      DATE
                    </p>
                    <p
                      className="font-display font-bold text-sm md:text-base"
                      style={{ color: COLORS.accent }}
                    >
                      TBA
                    </p>
                  </div>
                </div>
              </motion.div>

              {/* Keywords with hover effect */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                className="flex flex-wrap gap-3"
              >
                {event.keywords.map((keyword, index) => (
                  <motion.span
                    key={keyword}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.3, delay: 0.5 + index * 0.1 }}
                    whileHover={{
                      scale: 1.05,
                      backgroundColor: `${COLORS.peach}40`,
                    }}
                    className="px-4 py-2 text-sm font-display font-medium tracking-wider cursor-default backdrop-blur-sm"
                    style={{
                      border: `1.5px solid ${COLORS.peach}`,
                      color: COLORS.accent,
                      backgroundColor: `${COLORS.peach}20`,
                      transition: "all 0.3s ease",
                    }}
                  >
                    {keyword}
                  </motion.span>
                ))}
              </motion.div>
            </motion.div>

            {/* Right: about + highlights */}
            <div className="space-y-8">
              {/* Event description card with enhanced styling */}
              <motion.div
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="relative p-6 md:p-8 lg:p-12 backdrop-blur-sm"
                style={{
                  backgroundColor: COLORS.accent,
                  border: `2px solid ${COLORS.peach}`,
                  boxShadow: `0 0 40px -15px ${COLORS.peach}50, 0 0 0 1px ${COLORS.peach}, 0 20px 40px -20px ${COLORS.accent}50`,
                }}
              >
                {/* Corner notches */}
                <div
                  className="absolute top-0 left-0 w-3 h-3 md:w-4 md:h-4"
                  style={{
                    background: `linear-gradient(135deg, ${COLORS.accent} 50%, transparent 50%)`,
                    boxShadow: `inset -1px -1px 0 ${COLORS.peach}`,
                  }}
                />
                <div
                  className="absolute bottom-0 right-0 w-3 h-3 md:w-4 md:h-4"
                  style={{
                    background: `linear-gradient(-45deg, ${COLORS.accent} 50%, transparent 50%)`,
                    boxShadow: `inset 1px 1px 0 ${COLORS.peach}`,
                  }}
                />

                {/* Decorative top accent */}
                <div
                  className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 px-3 md:px-4 py-1 font-display text-xs tracking-widest"
                  style={{
                    backgroundColor: COLORS.peach,
                    color: COLORS.accent,
                  }}
                >
                  DETAILS
                </div>

                <h2
                  className="font-display text-xl md:text-2xl font-bold mb-4 md:mb-6 flex items-center gap-3"
                  style={{ color: COLORS.white }}
                >
                  <div
                    className="w-1.5 h-5 md:w-2 md:h-6"
                    style={{ backgroundColor: COLORS.peach }}
                  />
                  About the Event
                </h2>
                <div className="space-y-3 md:space-y-4">
                  {event.description.map((paragraph, index) => (
                    <motion.p
                      key={index}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.5, delay: 0.3 + index * 0.1 }}
                      className="leading-relaxed text-base md:text-lg"
                      style={{ color: COLORS.white }}
                    >
                      {paragraph}
                    </motion.p>
                  ))}
                </div>

                {/* Inline register CTA */}
                {/* <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.6 }}
                  className="mt-6 md:mt-8 pt-4 md:pt-6"
                  style={{ borderTop: `1px solid ${COLORS.peach}40` }}
                >
                  <a
                    href="#register"
                    className="group inline-flex items-center gap-2 font-display tracking-wider text-sm font-medium hover:gap-3 transition-all"
                    style={{ color: COLORS.peach }}
                  >
                    <span>Secure Your Spot</span>
                    <motion.span
                      animate={{ x: [0, 5, 0] }}
                      transition={{ duration: 1.5, repeat: Infinity }}
                    >
                      →
                    </motion.span>
                  </a>
                </motion.div> */}
              </motion.div>
            </div>
          </div>

          {/* Rules Section - Only show if event has rules */}
          {event.rules && (
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="mt-12 md:mt-16"
            >
              <h2
                className="font-display text-2xl sm:text-3xl md:text-4xl font-bold mb-6 md:mb-8 text-center"
                style={{ color: COLORS.accent }}
              >
                Game Rules
              </h2>

              <div className="grid gap-6 md:gap-8 lg:grid-cols-2">
                {/* Singles Rules */}
                {event.rules.singles && (
                  <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: 0.6 }}
                    className="relative p-6 md:p-8"
                    style={{
                      backgroundColor: COLORS.accent,
                      border: `2px solid ${COLORS.peach}`,
                      boxShadow: `0 0 40px -15px ${COLORS.peach}50, 0 0 0 1px ${COLORS.peach}`,
                    }}
                  >
                    {/* Corner notches */}
                    <div
                      className="absolute top-0 left-0 w-3 h-3 md:w-4 md:h-4"
                      style={{
                        background: `linear-gradient(135deg, ${COLORS.accent} 50%, transparent 50%)`,
                        boxShadow: `inset -1px -1px 0 ${COLORS.peach}`,
                      }}
                    />
                    <div
                      className="absolute bottom-0 right-0 w-3 h-3 md:w-4 md:h-4"
                      style={{
                        background: `linear-gradient(-45deg, ${COLORS.accent} 50%, transparent 50%)`,
                        boxShadow: `inset 1px 1px 0 ${COLORS.peach}`,
                      }}
                    />

                    <h3
                      className="font-display text-lg md:text-xl font-bold mb-4 md:mb-6 text-center"
                      style={{ color: COLORS.peach }}
                    >
                      {event.rules.singles.title}
                    </h3>

                    <div className="space-y-4 md:space-y-6">
                      {event.rules.singles.sections.map(
                        (section, sectionIdx) => (
                          <div
                            key={sectionIdx}
                            className="space-y-2 md:space-y-3"
                          >
                            <div className="flex items-start gap-2 md:gap-3">
                              <span
                                className="font-display font-bold text-base md:text-lg flex-shrink-0 w-5 h-5 md:w-6 md:h-6 flex items-center justify-center rounded-full"
                                style={{
                                  backgroundColor: `${COLORS.peach}40`,
                                  color: COLORS.peach,
                                }}
                              >
                                {section.number}
                              </span>
                              <h4
                                className="font-display font-semibold text-base md:text-lg"
                                style={{ color: COLORS.white }}
                              >
                                {section.title}
                              </h4>
                            </div>

                            <div className="ml-7 md:ml-9 space-y-2 md:space-y-3">
                              {section.items.map((item, itemIdx) => (
                                <div
                                  key={itemIdx}
                                  className="space-y-1.5 md:space-y-2"
                                >
                                  {item.subtitle && (
                                    <p
                                      className="font-medium text-sm md:text-base"
                                      style={{ color: `${COLORS.white}90` }}
                                    >
                                      {item.subtitle}
                                    </p>
                                  )}
                                  <ul className="space-y-1 md:space-y-1.5">
                                    {item.points.map((point, pointIdx) => (
                                      <li
                                        key={pointIdx}
                                        className="flex items-start gap-2 text-xs md:text-sm"
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
                    className="relative p-6 md:p-8"
                    style={{
                      backgroundColor: COLORS.accent,
                      border: `2px solid ${COLORS.peach}`,
                      boxShadow: `0 0 40px -15px ${COLORS.peach}50, 0 0 0 1px ${COLORS.peach}`,
                    }}
                  >
                    {/* Corner notches */}
                    <div
                      className="absolute top-0 left-0 w-3 h-3 md:w-4 md:h-4"
                      style={{
                        background: `linear-gradient(135deg, ${COLORS.accent} 50%, transparent 50%)`,
                        boxShadow: `inset -1px -1px 0 ${COLORS.peach}`,
                      }}
                    />
                    <div
                      className="absolute bottom-0 right-0 w-3 h-3 md:w-4 md:h-4"
                      style={{
                        background: `linear-gradient(-45deg, ${COLORS.accent} 50%, transparent 50%)`,
                        boxShadow: `inset 1px 1px 0 ${COLORS.peach}`,
                      }}
                    />

                    <h3
                      className="font-display text-lg md:text-xl font-bold mb-4 md:mb-6 text-center"
                      style={{ color: COLORS.peach }}
                    >
                      {event.rules.doubles.title}
                    </h3>

                    <div className="space-y-4 md:space-y-6">
                      {event.rules.doubles.sections.map(
                        (section, sectionIdx) => (
                          <div
                            key={sectionIdx}
                            className="space-y-2 md:space-y-3"
                          >
                            <div className="flex items-start gap-2 md:gap-3">
                              <span
                                className="font-display font-bold text-base md:text-lg flex-shrink-0 w-5 h-5 md:w-6 md:h-6 flex items-center justify-center rounded-full"
                                style={{
                                  backgroundColor: `${COLORS.peach}40`,
                                  color: COLORS.peach,
                                }}
                              >
                                {section.number}
                              </span>
                              <h4
                                className="font-display font-semibold text-base md:text-lg"
                                style={{ color: COLORS.white }}
                              >
                                {section.title}
                              </h4>
                            </div>

                            <div className="ml-7 md:ml-9 space-y-2 md:space-y-3">
                              {section.items.map((item, itemIdx) => (
                                <div
                                  key={itemIdx}
                                  className="space-y-1.5 md:space-y-2"
                                >
                                  {item.subtitle && (
                                    <p
                                      className="font-medium text-sm md:text-base"
                                      style={{ color: `${COLORS.white}90` }}
                                    >
                                      {item.subtitle}
                                    </p>
                                  )}
                                  <ul className="space-y-1 md:space-y-1.5">
                                    {item.points.map((point, pointIdx) => (
                                      <li
                                        key={pointIdx}
                                        className="flex items-start gap-2 text-xs md:text-sm"
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

          {/* Bottom CTA Section */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.7 }}
            className="mt-12 md:mt-20 relative overflow-hidden p-8 md:p-12 text-center"
            style={{
              backgroundColor: COLORS.accent,
              border: `2px solid ${COLORS.peach}`,
              boxShadow: `0 0 60px -20px ${COLORS.peach}70, 0 0 0 1px ${COLORS.peach}`,
            }}
          >
            {/* Animated background pattern */}
            <motion.div
              className="absolute inset-0 opacity-10"
              style={{
                backgroundImage: `repeating-linear-gradient(45deg, ${COLORS.peach} 0, ${COLORS.peach} 1px, transparent 1px, transparent 20px)`,
              }}
              animate={{ backgroundPosition: ["0px 0px", "40px 40px"] }}
              transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            />

            <div className="relative z-10">
              <h3
                className="font-display text-2xl sm:text-3xl md:text-4xl font-bold mb-3 md:mb-4"
                style={{ color: COLORS.white }}
              >
                Ready to Join?
              </h3>
              <p
                className="text-base md:text-lg mb-6 md:mb-8 max-w-2xl mx-auto px-4"
                style={{ color: `${COLORS.white}90` }}
              >
                Don't miss out on this incredible opportunity to showcase your
                innovation and entrepreneurial skills!
              </p>
              {/* <motion.a
                href="#register"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="inline-flex items-center gap-2 md:gap-3 px-6 md:px-10 py-4 md:py-5 font-display tracking-widest text-sm md:text-lg font-bold"
                style={{
                  backgroundColor: COLORS.peach,
                  color: COLORS.accent,
                  border: `2px solid ${COLORS.peach}`,
                  boxShadow: `0 10px 40px ${COLORS.peach}60`,
                }}
              >
                <Sparkles size={20} className="md:w-[24px] md:h-[24px]" />
                <span className="hidden sm:inline">REGISTER FOR {event.name.toUpperCase()}</span>
                <span className="sm:hidden">REGISTER NOW</span>
              </motion.a> */}
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default EventPage;
