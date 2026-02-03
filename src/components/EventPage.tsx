import { motion } from "framer-motion";
import { ArrowLeft } from "lucide-react";
import { useEventById } from "../hooks/use-events";
import ParticleField from "./ParticleField";

interface EventPageProps {
  eventId?: string;
}

// Neutral styling (neonColor removed from data)
const defaultNeonClass = "text-foreground";
const defaultGradientClass = "from-white/10 via-white/5 to-transparent";
const defaultGlowClass = "shadow-[0_0_40px_rgba(255,255,255,0.08)]";
const defaultBorderColor = "hsl(0, 0%, 70%)";

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

  const borderColor = defaultBorderColor;

  return (
    <div className="min-h-screen relative">
      <ParticleField />

      {/* Background decorations */}
      <div className="absolute inset-0 hex-grid opacity-20" />
      <div
        className={`absolute top-0 left-0 right-0 h-[60vh] bg-gradient-to-b ${defaultGradientClass}`}
      />

      {/* Back button */}
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.4 }}
        className="fixed top-6 left-6 z-50"
      >
        <a
          href={getBackLink()}
          className="flex items-center gap-2 px-5 py-2.5 bg-background/80 backdrop-blur-xl border border-border text-foreground hover:text-primary hover:border-primary/50 transition-all"
          style={{
            clipPath:
              "polygon(10px 0, 100% 0, 100% calc(100% - 10px), calc(100% - 10px) 100%, 0 100%, 0 10px)",
          }}
        >
          <ArrowLeft size={18} />
          <span className="text-sm font-display tracking-wider">BACK</span>
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
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="inline-flex items-center gap-3 px-5 py-2.5 mb-6 border border-primary/30 bg-primary/5 backdrop-blur-sm"
                style={{
                  clipPath:
                    "polygon(10px 0, calc(100% - 10px) 0, 100% 50%, calc(100% - 10px) 100%, 10px 100%, 0 50%)",
                }}
              >
                <span className="w-2 h-2 rounded-full bg-neon-green animate-pulse" />
                <span className="text-sm font-display font-medium text-primary tracking-widest uppercase">
                  Prakarsh '26
                </span>
                <span className="w-2 h-2 rounded-full bg-neon-green animate-pulse" />
              </motion.div>

              {/* Event name */}
              <h1
                className={`font-display text-5xl md:text-7xl font-black mb-6 ${defaultNeonClass}`}
              >
                {event.name}
              </h1>

              {/* Tagline */}
              <p className="text-xl md:text-2xl text-foreground/80 font-medium mb-10 max-w-xl">
                {event.tagline}
              </p>

              {/* Keywords */}
              <div className="flex flex-wrap gap-3">
                {event.keywords.map((keyword) => (
                  <span
                    key={keyword}
                    className="px-4 py-2 text-sm font-display font-medium tracking-wider"
                    style={{
                      border: `1px solid ${borderColor}`,
                      color: borderColor,
                      backgroundColor: `${borderColor}10`,
                      clipPath:
                        "polygon(8px 0, 100% 0, 100% calc(100% - 8px), calc(100% - 8px) 100%, 0 100%, 0 8px)",
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
                className={`relative p-8 md:p-12 bg-background/80 backdrop-blur-xl border ${defaultGlowClass}`}
                style={{
                  borderColor: `${borderColor}50`,
                  clipPath:
                    "polygon(20px 0, 100% 0, 100% calc(100% - 20px), calc(100% - 20px) 100%, 0 100%, 0 20px)",
                }}
              >
                {/* Corner decorations */}
                <div
                  className="absolute top-0 left-0 w-8 h-8 border-t-2 border-l-2"
                  style={{ borderColor }}
                />
                <div
                  className="absolute top-0 right-0 w-8 h-8 border-t-2 border-r-2"
                  style={{ borderColor }}
                />
                <div
                  className="absolute bottom-0 left-0 w-8 h-8 border-b-2 border-l-2"
                  style={{ borderColor }}
                />
                <div
                  className="absolute bottom-0 right-0 w-8 h-8 border-b-2 border-r-2"
                  style={{ borderColor }}
                />

                <h2 className="font-display text-2xl font-bold mb-6 text-foreground flex items-center gap-3">
                  <div
                    className="w-2 h-6"
                    style={{ backgroundColor: borderColor }}
                  />
                  About the Event
                </h2>
                <div className="space-y-4">
                  {event.description.map((paragraph, index) => (
                    <p
                      key={index}
                      className="text-foreground/80 leading-relaxed text-lg"
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
              <h2 className="font-display text-3xl md:text-4xl font-bold mb-8 text-center text-foreground">
                Game Rules
              </h2>

              <div className="grid gap-8 lg:grid-cols-2">
                {/* Singles Rules */}
                {event.rules.singles && (
                  <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: 0.6 }}
                    className={`relative p-8 bg-background/80 backdrop-blur-xl border ${defaultGlowClass}`}
                    style={{
                      borderColor: `${borderColor}50`,
                      clipPath:
                        "polygon(20px 0, 100% 0, 100% calc(100% - 20px), calc(100% - 20px) 100%, 0 100%, 0 20px)",
                    }}
                  >
                    {/* Corner decorations */}
                    <div
                      className="absolute top-0 left-0 w-8 h-8 border-t-2 border-l-2"
                      style={{ borderColor }}
                    />
                    <div
                      className="absolute top-0 right-0 w-8 h-8 border-t-2 border-r-2"
                      style={{ borderColor }}
                    />
                    <div
                      className="absolute bottom-0 left-0 w-8 h-8 border-b-2 border-l-2"
                      style={{ borderColor }}
                    />
                    <div
                      className="absolute bottom-0 right-0 w-8 h-8 border-b-2 border-r-2"
                      style={{ borderColor }}
                    />

                    <h3
                      className="font-display text-xl font-bold mb-6 text-center"
                      style={{ color: borderColor }}
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
                                  backgroundColor: `${borderColor}20`,
                                  color: borderColor,
                                }}
                              >
                                {section.number}
                              </span>
                              <h4 className="font-display font-semibold text-lg text-foreground">
                                {section.title}
                              </h4>
                            </div>

                            <div className="ml-9 space-y-3">
                              {section.items.map((item, itemIdx) => (
                                <div key={itemIdx} className="space-y-2">
                                  {item.subtitle && (
                                    <p className="font-medium text-foreground/90">
                                      {item.subtitle}
                                    </p>
                                  )}
                                  <ul className="space-y-1.5">
                                    {item.points.map((point, pointIdx) => (
                                      <li
                                        key={pointIdx}
                                        className="flex items-start gap-2 text-foreground/70 text-sm"
                                      >
                                        <span
                                          className="w-1.5 h-1.5 mt-1.5 flex-shrink-0 rounded-full"
                                          style={{
                                            backgroundColor: borderColor,
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
                    className={`relative p-8 bg-background/80 backdrop-blur-xl border ${defaultGlowClass}`}
                    style={{
                      borderColor: `${borderColor}50`,
                      clipPath:
                        "polygon(20px 0, 100% 0, 100% calc(100% - 20px), calc(100% - 20px) 100%, 0 100%, 0 20px)",
                    }}
                  >
                    {/* Corner decorations */}
                    <div
                      className="absolute top-0 left-0 w-8 h-8 border-t-2 border-l-2"
                      style={{ borderColor }}
                    />
                    <div
                      className="absolute top-0 right-0 w-8 h-8 border-t-2 border-r-2"
                      style={{ borderColor }}
                    />
                    <div
                      className="absolute bottom-0 left-0 w-8 h-8 border-b-2 border-l-2"
                      style={{ borderColor }}
                    />
                    <div
                      className="absolute bottom-0 right-0 w-8 h-8 border-b-2 border-r-2"
                      style={{ borderColor }}
                    />

                    <h3
                      className="font-display text-xl font-bold mb-6 text-center"
                      style={{ color: borderColor }}
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
                                  backgroundColor: `${borderColor}20`,
                                  color: borderColor,
                                }}
                              >
                                {section.number}
                              </span>
                              <h4 className="font-display font-semibold text-lg text-foreground">
                                {section.title}
                              </h4>
                            </div>

                            <div className="ml-9 space-y-3">
                              {section.items.map((item, itemIdx) => (
                                <div key={itemIdx} className="space-y-2">
                                  {item.subtitle && (
                                    <p className="font-medium text-foreground/90">
                                      {item.subtitle}
                                    </p>
                                  )}
                                  <ul className="space-y-1.5">
                                    {item.points.map((point, pointIdx) => (
                                      <li
                                        key={pointIdx}
                                        className="flex items-start gap-2 text-foreground/70 text-sm"
                                      >
                                        <span
                                          className="w-1.5 h-1.5 mt-1.5 flex-shrink-0 rounded-full"
                                          style={{
                                            backgroundColor: borderColor,
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
