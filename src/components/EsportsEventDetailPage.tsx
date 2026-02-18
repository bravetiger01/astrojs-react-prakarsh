import {
  ArrowLeft,
  Calendar,
  Clock,
  Gamepad2,
  MapPin,
  Trophy,
  Users,
  Zap,
} from "lucide-react";
import { useEventById } from "../hooks/use-events";
import { CONFIG } from "../lib/config";

interface EsportsEventDetailPageProps {
  eventId?: string;
}

const accentPalette = [
  "#ff006e",
  "#00f5ff",
  "#ffbe0b",
  "#8338ec",
  "#3a86ff",
  "#06ffa5",
];

const formatDate = (value?: string) => {
  if (!value) return null;
  const parsed = new Date(value);
  if (Number.isNaN(parsed.getTime())) return value;
  return parsed.toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });
};

const formatTime = (value?: string) => {
  if (!value) return null;
  const parsed = new Date(`1970-01-01T${value}`);
  if (Number.isNaN(parsed.getTime())) return value;
  return parsed.toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "2-digit",
  });
};

const EsportsEventDetailPage = ({ eventId }: EsportsEventDetailPageProps) => {
  const { event, loading, error } = useEventById(eventId);

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-black mb-4">Loading...</h1>
        </div>
      </div>
    );
  }

  if (error || !event || event.category !== "esports") {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-black mb-4">Event Not Found</h1>
          <a href="/events">Back to Esports</a>
        </div>
      </div>
    );
  }

  const accentColor =
    event.esports?.accentColor ||
    accentPalette[(parseInt(event.id, 10) || 0) % accentPalette.length];
  const gameName =
    event.esports?.gameName || event.name.split(" ")[0] || "Esports";
  const tournamentName = event.esports?.tournamentName || event.name;
  const prizePool = event.esports?.prizePool || "Prize pool to be announced";
  const description = event.description?.[0] || event.tagline || "";
  const rules =
    event.esports?.rules && event.esports.rules.length > 0
      ? event.esports.rules
      : ["Detailed rules will be shared soon."];
  const schedule =
    event.esports?.schedule && event.esports.schedule.length > 0
      ? event.esports.schedule
      : [];
  const prizes =
    event.esports?.prizes && event.esports.prizes.length > 0
      ? event.esports.prizes
      : [prizePool];
  const requirements =
    event.esports?.requirements && event.esports.requirements.length > 0
      ? event.esports.requirements
      : ["Bring Your Own Device."];
  const posterImageRaw = event.esports?.posterImage || event.posterImage;

  // Extract src from ImageMetadata if needed
  const posterImage = posterImageRaw
    ? typeof posterImageRaw === "string"
      ? posterImageRaw
      : posterImageRaw.src
    : undefined;

  return (
    <div
      className="min-h-screen w-full overflow-x-hidden"
      style={{ backgroundColor: "#0a0a0a" }}
    >
      {/* Hero Section with Background */}
      <div className="relative w-full h-[35vh] xs:h-[40vh] sm:h-[50vh] md:h-[60vh] overflow-hidden">
        <div
          className="absolute inset-0"
          style={
            posterImage
              ? {
                  backgroundImage: `url(${posterImage})`,
                  backgroundSize: "cover",
                  backgroundPosition: "center top",
                  filter: "brightness(0.5)",
                }
              : {
                  background:
                    "radial-gradient(circle at 20% 20%, rgba(255,255,255,0.1), transparent 60%), #0a0a0a",
                }
          }
        />

        {/* Gradient overlays */}
        <div
          className="absolute inset-0"
          style={{
            background: `linear-gradient(180deg, transparent 0%, transparent 40%, ${accentColor}20 70%, #0a0a0a 100%)`,
          }}
        />
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(90deg, #0a0a0a 0%, transparent 30%, transparent 70%, #0a0a0a 100%)",
          }}
        />

        {/* Animated scan lines */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            backgroundImage: `repeating-linear-gradient(
              0deg,
              transparent,
              transparent 2px,
              ${accentColor}08 2px,
              ${accentColor}08 4px
            )`,
          }}
        />

        {/* Corner frames */}
        <div
          className="absolute top-2 sm:top-4 md:top-8 left-2 sm:left-4 md:left-8 w-12 sm:w-16 md:w-24 h-12 sm:h-16 md:h-24"
          style={{
            borderTop: `3px solid ${accentColor}`,
            borderLeft: `3px solid ${accentColor}`,
            boxShadow: `inset 10px 10px 30px ${accentColor}30`,
          }}
        />
        <div
          className="absolute top-2 sm:top-4 md:top-8 right-2 sm:right-4 md:right-8 w-12 sm:w-16 md:w-24 h-12 sm:h-16 md:h-24"
          style={{
            borderTop: `3px solid ${accentColor}`,
            borderRight: `3px solid ${accentColor}`,
            boxShadow: `inset -10px 10px 30px ${accentColor}30`,
          }}
        />

        {/* Back button */}
        <a
          href="/events"
          className="absolute top-1 xs:top-2 sm:top-4 md:top-8 left-1 xs:left-2 sm:left-4 md:left-12 lg:left-32 flex items-center gap-1.5 xs:gap-2 px-2 xs:px-3 sm:px-4 py-1.5 xs:py-2 text-white text-[11px] xs:text-xs sm:text-sm font-bold uppercase tracking-wider transition-all duration-300 hover:gap-3"
          style={{
            backgroundColor: `${accentColor}20`,
            border: `1px solid ${accentColor}50`,
            fontSize: "clamp(10px, 2vw, 14px)",
          }}
        >
          <ArrowLeft className="w-2.5 h-2.5 xs:w-3 xs:h-3 sm:w-4 sm:h-4" />
          <span className="hidden xs:inline">Back</span>
          <span className="xs:hidden">↑</span>
        </a>

        {/* Game badge */}
        <div
          className="absolute top-1 xs:top-2 sm:top-4 md:top-8 right-1 xs:right-2 sm:right-4 md:right-12 lg:right-32 px-1.5 xs:px-2 sm:px-4 py-1.5 xs:py-2 flex items-center gap-1 xs:gap-1.5 sm:gap-2"
          style={{
            backgroundColor: accentColor,
            boxShadow: `0 0 30px ${accentColor}80`,
          }}
        >
          <Gamepad2 className="w-3 h-3 xs:w-3.5 xs:h-3.5 sm:w-5 sm:h-5" />
          <span className="text-white text-[10px] xs:text-xs sm:text-sm font-bold uppercase tracking-wider hidden xs:inline break-words max-w-[120px]">
            {gameName}
          </span>
        </div>

        {/* Content */}
        <div className="absolute bottom-3 xs:bottom-4 sm:bottom-8 md:bottom-12 left-0 right-0 w-full px-3 xs:px-4 sm:px-6">
          <div className="max-w-4xl mx-auto">
            <div
              className="inline-flex items-center gap-1 xs:gap-1.5 sm:gap-2 px-2 xs:px-2.5 sm:px-3 py-0.5 xs:py-1 sm:py-1 mb-1.5 xs:mb-2 sm:mb-4 text-[10px] xs:text-xs sm:text-xs font-mono uppercase tracking-wider"
              style={{
                backgroundColor: `${accentColor}30`,
                color: accentColor,
                border: `1px solid ${accentColor}`,
                fontSize: "clamp(9px, 1.5vw, 12px)",
              }}
            >
              <div
                className="w-2 h-2 rounded-full animate-pulse"
                style={{ backgroundColor: accentColor }}
              />
              Registrations Open
            </div>

            <h1
              className="font-black uppercase tracking-tighter mb-1 xs:mb-2 sm:mb-4 leading-tight xs:leading-tight sm:leading-tight"
              style={{
                color: "#ffffff",
                textShadow: `0 0 40px ${accentColor}60, 0 0 80px ${accentColor}30`,
                fontSize: "clamp(1.75rem, 6vw, 4rem)",
                lineHeight: "1.05",
              }}
            >
              {tournamentName}
            </h1>

            <p
              className="text-gray-300 max-w-3xl break-words"
              style={{ fontSize: "clamp(0.75rem, 2vw, 1.125rem)" }}
            >
              {description}
            </p>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="w-full px-3 xs:px-4 sm:px-6 py-4 xs:py-6 sm:py-12 md:py-16">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 xs:gap-6 sm:gap-8 md:gap-12">
            {/* Left Column - Main Info */}
            <div className="lg:col-span-2 space-y-4 xs:space-y-6 sm:space-y-8 md:space-y-12">
              {/* Quick Stats */}
              <div className="grid grid-cols-2 md:grid-cols-3 gap-2 xs:gap-3 sm:gap-4">
                {[
                  {
                    icon: Calendar,
                    label: "Date",
                    value:
                      event.schedules && event.schedules.length > 0
                        ? event.schedules.length > 1
                          ? `${new Date(event.schedules[0].date).toLocaleDateString("en-US", { month: "short", day: "numeric" })} - ${new Date(event.schedules[event.schedules.length - 1].date).toLocaleDateString("en-US", { month: "short", day: "numeric" })}`
                          : new Date(
                              event.schedules[0].date,
                            ).toLocaleDateString("en-US", {
                              month: "short",
                              day: "numeric",
                            })
                        : "Date to be announced",
                  },
                  {
                    icon: Clock,
                    label: "Time",
                    value:
                      event.schedules && event.schedules[0]?.start_time
                        ? new Date(
                            `1970-01-01T${event.schedules[0].start_time}`,
                          ).toLocaleTimeString("en-US", {
                            hour: "numeric",
                            minute: "2-digit",
                          })
                        : "Time to be announced",
                  },
                ].map((stat, index) => (
                  <div
                    key={index}
                    className="p-2 xs:p-3 md:p-4 text-center min-h-[100px] xs:min-h-[110px] sm:min-h-[120px] flex flex-col items-center justify-center"
                    style={{
                      backgroundColor: "#111111",
                      borderBottom: `3px solid ${accentColor}`,
                    }}
                  >
                    <stat.icon
                      className="w-4 h-4 xs:w-5 xs:h-5 md:w-6 md:h-6 mb-1 xs:mb-1.5 sm:mb-2"
                      style={{ color: accentColor }}
                    />
                    <div
                      className="text-white font-bold text-[11px] xs:text-sm md:text-lg break-words line-clamp-2"
                      style={{ fontSize: "clamp(0.65rem, 2vw, 1.125rem)" }}
                    >
                      {stat.value}
                    </div>
                    <div
                      className="text-gray-500 text-[9px] xs:text-xs uppercase tracking-wider whitespace-nowrap"
                      style={{ fontSize: "clamp(7px, 1.5vw, 12px)" }}
                    >
                      {stat.label}
                    </div>
                  </div>
                ))}
              </div>

              {/* Rules */}
              <div
                className="p-3 xs:p-4 sm:p-6"
                style={{
                  backgroundColor: "#111111",
                  border: `1px solid ${accentColor}30`,
                }}
              >
                <h2
                  className="font-black uppercase tracking-tight mb-3 xs:mb-4 sm:mb-6 flex items-center gap-2 sm:gap-3"
                  style={{
                    color: accentColor,
                    fontSize: "clamp(0.875rem, 3vw, 1.5rem)",
                  }}
                >
                  <Zap className="w-4 h-4 xs:w-5 xs:h-5 md:w-6 md:h-6 flex-shrink-0" />
                  <span>Tournament Rules</span>
                </h2>
                <ul className="space-y-2 xs:space-y-2.5 sm:space-y-3">
                  {rules.map((rule, index) => (
                    <li
                      key={index}
                      className="flex items-start gap-2 sm:gap-3 text-gray-300"
                      style={{ fontSize: "clamp(0.7rem, 2vw, 1rem)" }}
                    >
                      <div
                        className="w-5 h-5 md:w-6 md:h-6 flex items-center justify-center text-[10px] xs:text-xs font-bold mt-0.5 flex-shrink-0 min-w-[20px]"
                        style={{
                          backgroundColor: `${accentColor}20`,
                          color: accentColor,
                        }}
                      >
                        {index + 1}
                      </div>
                      <span>{rule}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Schedule */}
              {schedule.length > 0 && (
                <div
                  className="p-3 xs:p-4 sm:p-6"
                  style={{
                    backgroundColor: "#111111",
                    border: `1px solid ${accentColor}30`,
                  }}
                >
                  <h2
                    className="font-black uppercase tracking-tight mb-3 xs:mb-4 sm:mb-6 flex items-center gap-2 sm:gap-3"
                    style={{
                      color: accentColor,
                      fontSize: "clamp(0.875rem, 3vw, 1.5rem)",
                    }}
                  >
                    <Clock className="w-4 h-4 xs:w-5 xs:h-5 md:w-6 md:h-6 flex-shrink-0" />
                    <span>Event Schedule</span>
                  </h2>
                  <div className="space-y-1.5 xs:space-y-2 sm:space-y-4">
                    {schedule.map((item, index) => {
                      const scheduleItem =
                        typeof item === "string"
                          ? { time: "TBD", event: item }
                          : item;
                      return (
                        <div
                          key={index}
                          className="flex flex-col xs:flex-row xs:items-center gap-1 xs:gap-2 sm:gap-4 p-2 xs:p-2.5 sm:p-3 transition-all duration-300 hover:translate-x-1 sm:hover:translate-x-2"
                          style={{
                            backgroundColor: "#0a0a0a",
                            borderLeft: `3px solid ${accentColor}`,
                          }}
                        >
                          <span
                            className="font-mono font-bold whitespace-nowrap"
                            style={{
                              color: accentColor,
                              fontSize: "clamp(0.65rem, 2vw, 0.875rem)",
                            }}
                          >
                            {scheduleItem.time}
                          </span>
                          <span
                            className="text-gray-300"
                            style={{ fontSize: "clamp(0.7rem, 2vw, 1rem)" }}
                          >
                            {scheduleItem.event}
                          </span>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* Multi-Day Event Schedule */}
              {event.schedules && event.schedules.length > 0 && (
                <div
                  className="p-3 xs:p-4 sm:p-6"
                  style={{
                    backgroundColor: "#111111",
                    border: `1px solid ${accentColor}30`,
                  }}
                >
                  <h2
                    className="font-black uppercase tracking-tight mb-3 xs:mb-4 sm:mb-6 flex items-center gap-2 sm:gap-3"
                    style={{
                      color: accentColor,
                      fontSize: "clamp(0.875rem, 3vw, 1.5rem)",
                    }}
                  >
                    <Calendar className="w-4 h-4 xs:w-5 xs:h-5 md:w-6 md:h-6 flex-shrink-0" />
                    <span>Days & Timings</span>
                  </h2>
                  <div className="space-y-1.5 xs:space-y-2 sm:space-y-4">
                    {event.schedules.map((schedule, index) => (
                      <div
                        key={index}
                        className="p-2 xs:p-2.5 sm:p-3"
                        style={{
                          backgroundColor: "#0a0a0a",
                          borderLeft: `3px solid ${accentColor}`,
                        }}
                      >
                        <div
                          className="font-bold mb-1"
                          style={{
                            color: accentColor,
                            fontSize: "clamp(0.65rem, 2vw, 0.875rem)",
                          }}
                        >
                          DAY {schedule.day}
                        </div>
                        <div className="space-y-0.5 text-gray-300">
                          <div
                            style={{ fontSize: "clamp(0.7rem, 2vw, 0.875rem)" }}
                          >
                            {new Date(schedule.date).toLocaleDateString(
                              "en-US",
                              {
                                weekday: "short",
                                month: "short",
                                day: "numeric",
                              },
                            )}
                          </div>
                          {schedule.start_time && (
                            <div
                              style={{
                                fontSize: "clamp(0.65rem, 1.8vw, 0.75rem)",
                              }}
                            >
                              {new Date(
                                `1970-01-01T${schedule.start_time}`,
                              ).toLocaleTimeString("en-US", {
                                hour: "numeric",
                                minute: "2-digit",
                              })}
                              {schedule.end_time &&
                                ` - ${new Date(`1970-01-01T${schedule.end_time}`).toLocaleTimeString("en-US", { hour: "numeric", minute: "2-digit" })}`}
                            </div>
                          )}
                          {schedule.location && (
                            <div
                              className="flex items-center gap-1"
                              style={{
                                fontSize: "clamp(0.65rem, 1.8vw, 0.75rem)",
                              }}
                            >
                              <MapPin className="w-3 h-3 flex-shrink-0" />
                              {schedule.location}
                            </div>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Right Column - Sidebar */}
            <div className="space-y-4 xs:space-y-5 sm:space-y-6">
              {/* Prizes Card */}
              <div
                className="p-3 xs:p-4 sm:p-6 relative overflow-hidden"
                style={{
                  backgroundColor: "#111111",
                  border: `2px solid ${accentColor}`,
                  boxShadow: `0 0 30px ${accentColor}20`,
                }}
              >
                <div
                  className="absolute top-0 right-0 w-16 h-16 xs:w-20 xs:h-20"
                  style={{
                    background: `linear-gradient(135deg, ${accentColor}30, transparent)`,
                  }}
                />
                <Trophy
                  className="w-6 h-6 xs:w-7 xs:h-7 md:w-10 md:h-10 mb-2 xs:mb-3 md:mb-4"
                  style={{ color: accentColor }}
                />
                <h3
                  className="font-black uppercase text-white mb-2 xs:mb-3 md:mb-4"
                  style={{ fontSize: "clamp(0.875rem, 3vw, 1.25rem)" }}
                >
                  Prize Pool
                </h3>
                <div className="space-y-1.5 xs:space-y-2">
                  {prizes.map((prize, index) => (
                    <div
                      key={index}
                      className="flex items-center gap-2 text-gray-300"
                      style={{ fontSize: "clamp(0.65rem, 2vw, 1rem)" }}
                    >
                      <div
                        className="w-1.5 h-1.5 xs:w-2 xs:h-2 flex-shrink-0 rounded-full"
                        style={{
                          backgroundColor: accentColor,
                          opacity: 1 - index * 0.3,
                        }}
                      />
                      <span>{prize}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Requirements */}
              <div
                className="p-3 xs:p-4 sm:p-6"
                style={{
                  backgroundColor: "#111111",
                  border: `1px solid ${accentColor}30`,
                }}
              >
                <h3
                  className="font-black uppercase text-white mb-2 xs:mb-3 md:mb-4"
                  style={{ fontSize: "clamp(0.875rem, 3vw, 1.25rem)" }}
                >
                  Requirements
                </h3>
                <ul className="space-y-1.5 xs:space-y-2">
                  {requirements.map((req, index) => (
                    <li
                      key={index}
                      className="text-gray-400 flex items-start gap-2"
                      style={{ fontSize: "clamp(0.65rem, 2vw, 0.875rem)" }}
                    >
                      <div
                        className="w-1.5 h-1.5 rounded-full mt-1 flex-shrink-0"
                        style={{ backgroundColor: accentColor }}
                      />
                      <span>{req}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Venue */}
              <div
                className="p-3 xs:p-4 sm:p-6"
                style={{
                  backgroundColor: "#111111",
                  border: `1px solid ${accentColor}30`,
                }}
              >
                <MapPin
                  className="w-4 h-4 xs:w-5 xs:h-5 md:w-6 md:h-6 mb-1.5 xs:mb-2 md:mb-3"
                  style={{ color: accentColor }}
                />
                <h3
                  className="font-bold text-white mb-1"
                  style={{ fontSize: "clamp(0.875rem, 2vw, 1.125rem)" }}
                >
                  Venue
                </h3>
                <p
                  className="text-gray-400"
                  style={{ fontSize: "clamp(0.65rem, 2vw, 1rem)" }}
                >
                  {event.schedules && event.schedules[0]?.location
                    ? event.schedules[0].location
                    : "Venue to be announced"}
                </p>
              </div>

              {/* Register Button */}
              <a
                href="https://konfhub.com/svit"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-2.5 xs:py-3 md:py-4 font-bold uppercase tracking-wider transition-all duration-300 flex items-center justify-center gap-1.5 xs:gap-2 md:gap-3 relative overflow-hidden group"
                style={{
                  backgroundColor: accentColor,
                  color: "#ffffff",
                  boxShadow: `0 0 30px ${accentColor}50`,
                  fontSize: "clamp(0.7rem, 2.5vw, 1.125rem)",
                }}
              >
                <Zap className="w-3.5 h-3.5 xs:w-4 xs:h-4 md:w-5 md:h-5" />
                <span className="hidden xs:inline">Register Now</span>
                <span className="xs:hidden">Join</span>
                <div
                  className="absolute inset-0 transition-transform duration-700 group-hover:translate-x-full"
                  style={{
                    background:
                      "linear-gradient(90deg, transparent, rgba(255,255,255,0.3), transparent)",
                    transform: "translateX(-100%)",
                  }}
                />
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom decorative border */}
      <div
        className="h-0.5 xs:h-1 w-full"
        style={{
          background: `linear-gradient(90deg, transparent, ${accentColor}, transparent)`,
        }}
      />
    </div>
  );
};

export default EsportsEventDetailPage;
