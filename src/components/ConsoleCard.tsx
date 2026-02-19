import { useState } from "react";
import { cn } from "../lib/utils";

interface ColorScheme {
  border: string;
  text: string;
  accent: string;
  accentDark: string;
  glow: string;
}

interface ConsoleCardProps {
  title: string;
  edition?: string;
  description: string;
  category: string;
  className?: string;
  colorScheme?: ColorScheme;
}

const defaultColorScheme: ColorScheme = {
  border: "#3c2a56",
  text: "#3c2a56",
  accent: "#f1b5a2",
  accentDark: "#2a1e3d",
  glow: "#f1b5a2",
};

const colorSchemes: ColorScheme[] = [
  {
    border: "#3c2a56",
    text: "#3c2a56",
    accent: "#f1b5a2",
    accentDark: "#2a1e3d",
    glow: "#f1b5a2",
  },
  {
    border: "#7B7BF8",
    text: "#2C0060",
    accent: "#FF67D5",
    accentDark: "#4a3a8a",
    glow: "#FF67D5",
  },
  {
    border: "#FF67D5",
    text: "#3c2a56",
    accent: "#7B7BF8",
    accentDark: "#4a3a8a",
    glow: "#FF67D5",
  },
  {
    border: "#C9C9FF",
    text: "#2C0060",
    accent: "#FF67D5",
    accentDark: "#4a3a8a",
    glow: "#C9C9FF",
  },
  {
    border: "#2C0060",
    text: "#F1B5A2",
    accent: "#7B7BF8",
    accentDark: "#1a0040",
    glow: "#7B7BF8",
  },
  {
    border: "#F1B5A2",
    text: "#2C0060",
    accent: "#C9C9FF",
    accentDark: "#3c2a56",
    glow: "#F1B5A2",
  },
];

export { colorSchemes };

const ConsoleCard = ({
  title,
  edition,
  description,
  category,
  className,
  colorScheme = defaultColorScheme,
}: ConsoleCardProps) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      className={cn(
        "nontech-card relative w-[315px] mx-4 cursor-pointer transition-all duration-500",
        isHovered ? "scale-[1.02]" : "scale-100",
        className,
      )}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Top Console Section */}
      <div
        className="relative h-[200px] overflow-hidden"
        style={{
          background: `linear-gradient(145deg, #e8e8e8 0%, #ffffff 20%, #c0c0c0 40%, #d8d8d8 60%, #ffffff 80%, #b8b8b8 100%)`,
          border: `3px solid ${colorScheme.border}`,
        }}
      >
        {/* Metallic shine overlay */}
        <div
          className="absolute inset-0 transition-all duration-700"
          style={{
            background: `linear-gradient(${isHovered ? 135 : 90}deg, transparent 30%, rgba(255,255,255,0.6) 50%, transparent 70%)`,
            transform: isHovered ? "translateX(100%)" : "translateX(-100%)",
          }}
        />

        {/* Main title */}
        <div className="absolute top-6 left-6 right-28 pr-4">
          <h2
            className="text-2xl font-black tracking-tight leading-tight line-clamp-3 break-words"
            style={{ color: colorScheme.text }}
          >
            {title}
            {edition && <div className="text-lg font-bold mt-1">{edition}</div>}
          </h2>
        </div>

        {/* Circular dial
        <div
          className="absolute top-20 left-6 w-16 h-16 rounded-full transition-transform duration-500"
          style={{
            backgroundColor: "#3c2a56",
            transform: isHovered ? "rotate(90deg)" : "rotate(0deg)",
          }}
        >
          <div
            className="absolute top-1/2 left-1/2 w-2 h-2 rounded-full -translate-x-1/2 -translate-y-1/2"
            style={{ backgroundColor: "#f1b5a2" }}
          />
        </div> */}

        {/* Three dots indicator */}
        <div className="absolute top-[140px] left-8 flex gap-1.5">
          {[0, 1, 2].map((i) => (
            <div
              key={i}
              className="w-2 h-2 rounded-full transition-all duration-300"
              style={{
                backgroundColor: colorScheme.border,
                opacity: isHovered ? 0.6 : 0.3,
                transform: isHovered ? `scale(${1 + i * 0.1})` : "scale(1)",
                transitionDelay: `${i * 50}ms`,
              }}
            />
          ))}
        </div>

        {/* Vent lines */}
        <div className="absolute top-6 right-6 flex flex-col gap-0.5">
          {[...Array(8)].map((_, i) => (
            <div
              key={i}
              className="w-8 h-1 transition-all duration-300"
              style={{
                backgroundColor: colorScheme.border,
                opacity: isHovered ? 0.6 : 0.3,
                transitionDelay: `${i * 30}ms`,
              }}
            />
          ))}
        </div>

        {/* Vertical text */}
        <div
          className="absolute right-3 top-16 bottom-4 flex items-center"
          style={{ writingMode: "vertical-rl" }}
        >
          <span
            className="text-xs font-black tracking-[0.3em] uppercase"
            style={{ color: colorScheme.border }}
          >
            {category}
          </span>
        </div>

        {/* Camera/sensor */}
        <div className="absolute top-4 right-16 flex items-center gap-2">
          <div
            className="w-6 h-3 rounded-sm"
            style={{ backgroundColor: colorScheme.border }}
          />
          <div
            className="w-2 h-2 rounded-full transition-all duration-300"
            style={{
              backgroundColor: colorScheme.accent,
              boxShadow: isHovered ? `0 0 8px ${colorScheme.accent}` : "none",
            }}
          />
        </div>
      </div>

      {/* Bottom Panel Section */}
      <div
        className="relative h-[180px] overflow-hidden"
        style={{
          backgroundColor: colorScheme.accentDark,
          clipPath: "polygon(0 0, 100% 0, 100% 85%, 85% 100%, 0 100%)",
        }}
      >
        {/* Subtle gradient overlay */}
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(180deg, rgba(255,255,255,0.05) 0%, transparent 50%)",
          }}
        />

        {/* Tagline/Subtitle */}
        <div className="absolute left-8 top-8 right-32">
          <p
            className="text-m font-medium leading-relaxed line-clamp-4"
            style={{ color: "#ffffff", opacity: 0.9 }}
          >
            {description}
          </p>
        </div>

        {/* Pill shapes */}
        <div className="absolute right-12 top-12 flex flex-col gap-2">
          <div
            className="w-8 h-16 rounded-full"
            style={{ backgroundColor: colorScheme.border }}
          />
          <div
            className="w-10 h-4 rounded-full"
            style={{ backgroundColor: colorScheme.border }}
          />
        </div>

        {/* Bottom LED indicators */}
        <div className="absolute bottom-4 right-4 flex gap-6">
          {[0, 1, 2].map((i) => (
            <div
              key={i}
              className="w-2 h-2 rounded-full transition-all duration-300"
              style={{
                backgroundColor: colorScheme.accent,
                boxShadow: isHovered
                  ? `0 0 ${8 + i * 4}px ${colorScheme.glow}`
                  : `0 0 2px ${colorScheme.glow}`,
                transitionDelay: `${i * 100}ms`,
              }}
            />
          ))}
        </div>

        {/* Decorative line */}
        <div className="absolute bottom-8 right-4 flex items-center gap-2">
          <div
            className="h-[2px] transition-all duration-500"
            style={{
              backgroundColor: colorScheme.accent,
              width: isHovered ? "60px" : "30px",
              opacity: 0.6,
            }}
          />
          <div
            className="w-1 h-1 rounded-full"
            style={{ backgroundColor: colorScheme.accent }}
          />
        </div>

        {/* Horizontal scan lines overlay */}
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

      {/* Outer glow on hover */}
      <div
        className="absolute -inset-2 pointer-events-none transition-opacity duration-500 rounded-lg"
        style={{
          boxShadow: `0 0 60px ${colorScheme.glow}40`,
          opacity: isHovered ? 1 : 0,
        }}
      />
    </div>
  );
};

export default ConsoleCard;
