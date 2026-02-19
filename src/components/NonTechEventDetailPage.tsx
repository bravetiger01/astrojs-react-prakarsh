import {
  ArrowLeft,
  Calendar,
  Clock,
  Cpu,
  MapPin,
  Settings,
  Users,
  Volume2,
  Zap,
} from "lucide-react";
import { useEventById } from "@/hooks/use-events";
import { CONFIG } from "@/lib/config";

interface ConsoleEventPageDetails {
  eventId: string;
}

const ConsoleEventDetailPage = ({ eventId }: ConsoleEventPageDetails) => {
  const { event, loading, error } = useEventById(eventId);

  if (loading) {
    return (
      <div
        className="min-h-screen flex items-center justify-center"
        style={{ backgroundColor: "#f1b5a2" }}
      >
        <div className="text-center">
          <h1 className="text-4xl font-black mb-4">Loading...</h1>
        </div>
      </div>
    );
  }

  if (
    error ||
    !event ||
    (event.category !== "non-tech" && event.category !== "workshops")
  ) {
    return (
      <div
        className="min-h-screen flex items-center justify-center"
        style={{ backgroundColor: "#f1b5a2" }}
      >
        <div className="text-center">
          <h1 className="text-4xl font-black mb-4">Event Not Found</h1>
          <a href="/events?category=non-tech">Back to Events</a>
        </div>
      </div>
    );
  }

  const primaryColor = "#3c2a56";
  const accentColor = "#f1b5a2";
  const lightColor = "#f1b5a2";

  const title = event.console?.title || event.name;
  const edition = event.console?.edition;
  const displayCategory =
    event.console?.displayCategory ||
    (event.category === "workshops" ? "WORKSHOP" : "NON-TECH");
  const fullDescription =
    event.console?.fullDescription ||
    event.description?.join(" ") ||
    event.tagline;
  const description = event.console?.description || event.tagline;
  const features =
    event.console?.features && event.console.features.length > 0
      ? event.console.features
      : event.eventHighlights && event.eventHighlights.length > 0
        ? event.eventHighlights
        : ["Full feature list will be shared soon."];
  const techStack =
    event.console?.techStack && event.console.techStack.length > 0
      ? event.console.techStack
      : event.keywords && event.keywords.length > 0
        ? event.keywords
        : ["Details coming soon"];
  const prerequisites =
    event.console?.prerequisites && event.console.prerequisites.length > 0
      ? event.console.prerequisites
      : ["No prerequisites announced yet"];
  const capacity = event.console?.capacity || "Open";

  const backLink =
    event.category === "workshops"
      ? "/events?category=workshops"
      : "/events?category=non-tech";

  return (
    <div 
      className="min-h-screen" 
      style={{ 
        backgroundColor: lightColor,
        paddingLeft: 'max(16px, env(safe-area-inset-left))',
        paddingRight: 'max(16px, env(safe-area-inset-right))',
      }}
    >
      {/* Hero Section */}
      <div
        className="relative py-6 sm:py-8 overflow-hidden flex mt-3 sm:mt-4 mb-4 sm:mb-6 rounded-lg"
        style={{
          background: `linear-gradient(145deg, #e8e8e8 0%, ${lightColor} 20%, #c0c0c0 40%, #d8d8d8 60%, ${lightColor} 80%, #b8b8b8 100%)`,
          marginLeft: '0',
          marginRight: '0',
          paddingLeft: '16px',
          paddingRight: '16px',
        }}
      >
        {/* Metallic shine overlay */}
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(135deg, transparent 30%, rgba(255,255,255,0.6) 50%, transparent 70%)",
          }}
        />

        {/* Corner accents */}
        {/* <div
          className="absolute top-0 left-0 w-32 h-32"
          style={{
            borderTop: `4px solid ${primaryColor}`,
            borderLeft: `4px solid ${primaryColor}`,
          }}
        />
        <div
          className="absolute top-0 right-0 w-32 h-32"
          style={{
            borderTop: `4px solid ${primaryColor}`,
            borderRight: `4px solid ${primaryColor}`,
          }}
        /> */}

        {/* Cable connector */}
        {/* <div className="absolute top-4 left-16 flex flex-col items-center">
          <div
            className="w-4 h-4 rounded-full"
            style={{ backgroundColor: primaryColor }}
          />
          <div
            className="w-1.5 h-8"
            style={{ backgroundColor: primaryColor }}
          />
        </div> */}

        {/* Back button */}
        <div className="relative z-10 max-w-7xl mx-auto">
          <a
            href={backLink}
            className="inline-flex items-center gap-2 px-3 sm:px-4 py-2 text-xs sm:text-sm font-bold uppercase tracking-wider transition-all duration-300 hover:gap-3 mb-6 sm:mb-8"
            style={{
              backgroundColor: primaryColor,
              color: lightColor,
            }}
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Events
          </a>

          <div>
            <div
              className="inline-flex items-center gap-2 px-3 py-1 mb-4 text-xs font-mono uppercase tracking-[0.2em]"
              style={{
                border: `1px solid ${primaryColor}`,
                color: primaryColor,
              }}
            >
              <Settings className="w-3 h-3" />
              {displayCategory}
            </div>

            <h1
              className="text-5xl md:text-7xl font-black tracking-tighter mb-2 break-words"
              style={{ color: primaryColor }}
            >
              {title}
            </h1>

            {edition && (
              <div className="flex items-baseline gap-3 mb-6">
                <span
                  className="text-5xl font-black"
                  style={{ color: primaryColor }}
                >
                  {edition}
                </span>
                <span
                  className="text-xs font-mono tracking-widest uppercase"
                  style={{ color: primaryColor, opacity: 0.6 }}
                >
                  GENERATION
                </span>
              </div>
            )}

            <p
              className="text-sm font-mono leading-relaxed mb-6"
              style={{ color: primaryColor, opacity: 0.7 }}
            >
              {fullDescription}
            </p>

            <div className="flex flex-wrap gap-3">
              {techStack.map((tech, index) => (
                <span
                  key={index}
                  className="px-4 py-2 text-sm font-mono uppercase tracking-wider"
                  style={{
                    background: "linear-gradient(145deg, #d0d0d0, #c0c0c0)",
                    color: primaryColor,
                  }}
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom LED strip */}
        <div
          className="absolute bottom-0 left-0 right-0 h-2"
          style={{
            background: `linear-gradient(90deg, transparent, ${accentColor}, transparent)`,
            boxShadow: `0 0 30px ${accentColor}`,
          }}
        />
      </div>

      {/* Main Content - Dark Section */}
      <div 
        className="rounded-lg mb-4 sm:mb-6" 
        style={{ 
          backgroundColor: primaryColor,
          marginLeft: '0',
          marginRight: '0',
        }}
      >
        <div 
          className="py-6 sm:py-8 md:py-16 max-w-7xl mx-auto"
          style={{
            paddingLeft: '16px',
            paddingRight: '16px',
          }}
        >
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* Left Column */}
            <div className="lg:col-span-2 space-y-12">
              {/* Quick Info */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
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
                              year: "numeric",
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
                  {
                    icon: MapPin,
                    label: "Venue",
                    value:
                      event.schedules && event.schedules[0]?.location
                        ? event.schedules[0].location
                        : "Venue to be announced",
                  },
                  { icon: Users, label: "Capacity", value: capacity },
                ].map((stat, index) => (
                  <div
                    key={index}
                    className="p-4 text-center"
                    style={{
                      background:
                        "linear-gradient(180deg, #d0d0d0, #a0a0a0, #c0c0c0)",
                    }}
                  >
                    <stat.icon
                      className="w-5 h-5 mx-auto mb-2"
                      style={{ color: primaryColor }}
                    />
                    <div
                      className="text-sm font-bold"
                      style={{ color: primaryColor }}
                    >
                      {stat.value}
                    </div>
                    <div
                      className="text-[10px] uppercase tracking-wider"
                      style={{ color: primaryColor, opacity: 0.6 }}
                    >
                      {stat.label}
                    </div>
                  </div>
                ))}
              </div>

              {/* Description */}
              <div
                className="p-6 rounded-lg"
                style={{ backgroundColor: "#2a1e3d" }}
              >
                <h2
                  className="text-2xl font-black uppercase tracking-tight mb-6 flex items-center gap-3"
                  style={{ color: accentColor }}
                >
                  <Zap className="w-6 h-6" />
                  Overview
                </h2>
                <p
                  className="text-sm leading-relaxed"
                  style={{ color: lightColor, opacity: 0.8 }}
                >
                  {description}
                </p>
              </div>

              {/* Features */}
              <div
                className="p-6 rounded-lg"
                style={{ backgroundColor: "#2a1e3d" }}
              >
                <h2
                  className="text-2xl font-black uppercase tracking-tight mb-6 flex items-center gap-3"
                  style={{ color: accentColor }}
                >
                  <Cpu className="w-6 h-6" />
                  Core Features
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {features.map((feature, index) => (
                    <div
                      key={index}
                      className="flex items-start gap-3 p-3"
                      style={{
                        backgroundColor: primaryColor,
                        borderLeft: `3px solid ${accentColor}`,
                      }}
                    >
                      <div
                        className="w-6 h-6 flex items-center justify-center text-xs font-mono"
                        style={{ color: accentColor }}
                      >
                        {String(index + 1).padStart(2, "0")}
                      </div>
                      <span style={{ color: lightColor, opacity: 0.8 }}>
                        {feature}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Multi-Day Schedule */}
              {event.schedules && event.schedules.length > 0 && (
                <div
                  className="p-6 rounded-lg"
                  style={{ backgroundColor: "#2a1e3d" }}
                >
                  <h2
                    className="text-2xl font-black uppercase tracking-tight mb-6 flex items-center gap-3"
                    style={{ color: accentColor }}
                  >
                    <Calendar className="w-6 h-6" />
                    Event Schedule
                  </h2>
                  <div className="space-y-4">
                    {event.schedules.map((schedule, index) => (
                      <div
                        key={index}
                        className="p-4"
                        style={{
                          backgroundColor: primaryColor,
                          borderLeft: `3px solid ${accentColor}`,
                        }}
                      >
                        <div
                          className="font-bold text-sm mb-2"
                          style={{ color: accentColor }}
                        >
                          DAY {schedule.day}
                        </div>
                        <div className="space-y-2 text-sm">
                          <div style={{ color: lightColor, opacity: 0.9 }}>
                            <strong>Date:</strong>{" "}
                            {new Date(schedule.date).toLocaleDateString(
                              "en-US",
                              {
                                weekday: "short",
                                month: "short",
                                day: "numeric",
                                year: "numeric",
                              },
                            )}
                          </div>
                          {schedule.start_time && (
                            <div style={{ color: lightColor, opacity: 0.9 }}>
                              <strong>Time:</strong>{" "}
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
                            <div style={{ color: lightColor, opacity: 0.9 }}>
                              <strong>Location:</strong> {schedule.location}
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
            <div className="space-y-6">
              {/* Prerequisites */}
              <div
                className="p-6 rounded-lg relative overflow-hidden"
                style={{
                  background:
                    "linear-gradient(180deg, #d0d0d0, #a0a0a0, #c0c0c0)",
                }}
              >
                <h3
                  className="text-xl font-black uppercase mb-4"
                  style={{ color: primaryColor }}
                >
                  Prerequisites
                </h3>
                <ul className="space-y-3">
                  {prerequisites.map((prereq, index) => (
                    <li
                      key={index}
                      className="flex items-center gap-3 text-sm"
                      style={{ color: primaryColor }}
                    >
                      <div
                        className="w-2 h-2 rounded-full"
                        style={{ backgroundColor: accentColor }}
                      />
                      {prereq}
                    </li>
                  ))}
                </ul>

                {/* LED indicator */}
                <div
                  className="absolute bottom-3 right-3 w-3 h-3 rounded-full animate-pulse"
                  style={{
                    backgroundColor: accentColor,
                    boxShadow: `0 0 10px ${accentColor}`,
                  }}
                />
              </div>

              {/* Capacity indicator */}
              <div
                className="p-6 rounded-lg"
                style={{
                  background:
                    "linear-gradient(180deg, #d0d0d0, #a0a0a0, #c0c0c0)",
                }}
              >
                <div className="flex items-center gap-4 mb-4">
                  <div
                    className="w-12 h-12 rounded-full flex items-center justify-center"
                    style={{ backgroundColor: primaryColor }}
                  >
                    <Users className="w-6 h-6" style={{ color: accentColor }} />
                  </div>
                  <div>
                    <div
                      className="text-2xl font-black"
                      style={{ color: primaryColor }}
                    >
                      {capacity}
                    </div>
                    <div
                      className="text-xs uppercase tracking-wider"
                      style={{ color: primaryColor, opacity: 0.6 }}
                    >
                      Limited Seats
                    </div>
                  </div>
                </div>
                <div
                  className="h-2 rounded-full overflow-hidden"
                  style={{ backgroundColor: primaryColor }}
                >
                  <div
                    className="h-full w-3/4 rounded-full transition-all duration-1000"
                    style={{
                      backgroundColor: accentColor,
                      boxShadow: `0 0 10px ${accentColor}`,
                    }}
                  />
                </div>
              </div>

              {/* Register Button */}
              <a
                href="https://konfhub.com/svit"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-4 font-bold uppercase tracking-wider text-lg transition-all duration-300 flex items-center justify-center gap-3 relative overflow-hidden group"
                style={{
                  backgroundColor: accentColor,
                  color: primaryColor,
                  boxShadow: `0 0 30px ${accentColor}50`,
                }}
              >
                <Zap className="w-5 h-5" />
                Register Now
                <div
                  className="absolute inset-0 transition-transform duration-700 group-hover:translate-x-full"
                  style={{
                    background:
                      "linear-gradient(90deg, transparent, rgba(255,255,255,0.5), transparent)",
                    transform: "translateX(-100%)",
                  }}
                />
              </a>
            </div>
          </div>
        </div>

        {/* Scan lines overlay */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            backgroundImage: `repeating-linear-gradient(
              0deg,
              transparent,
              transparent 2px,
              rgba(255,255,255,0.02) 2px,
              rgba(255,255,255,0.02) 4px
            )`,
          }}
        />
      </div>

      {/* Bottom decorative border */}
      <div
        className="h-2 mb-3 sm:mb-4 rounded-full"
        style={{
          background: `linear-gradient(90deg, ${primaryColor}, ${accentColor}, ${primaryColor})`,
          marginLeft: '0',
          marginRight: '0',
        }}
      />
    </div>
  );
};

export default ConsoleEventDetailPage;
