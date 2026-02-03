import { useState } from "react";
import { cn } from "../lib/utils";
import { Gamepad2, Users, Trophy, Calendar, Zap } from "lucide-react";

interface EsportsCardProps {
  gameName: string;
  tournamentName: string;
  prizePool: string;
  teamSize: string;
  date: string;
  posterImage: string | { src: string }; // Accept both string and ImageMetadata
  accentColor: string;
  className?: string;
}

const EsportsCard = ({
  gameName,
  tournamentName,
  prizePool,
  teamSize,
  date,
  posterImage,
  accentColor,
  className,
}: EsportsCardProps) => {
  const [isHovered, setIsHovered] = useState(false);

  // Extract src from ImageMetadata if needed
  const imageSrc = typeof posterImage === 'string' ? posterImage : posterImage.src;

  return (
    <div
      className={cn(
        "relative w-[280px] sm:w-[320px] h-[390px] sm:h-[450px] rounded-lg overflow-hidden cursor-pointer transition-all duration-500 group",
        isHovered ? "scale-[1.02]" : "scale-100",
        className,
      )}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{
        boxShadow: isHovered
          ? `0 0 40px ${accentColor}50, 0 0 80px ${accentColor}30, inset 0 0 60px ${accentColor}20`
          : `0 10px 40px rgba(0,0,0,0.5)`,
      }}
    >
      {/* Background Image */}
      <img
        src={imageSrc}
        alt="Game poster"
        className="absolute inset-0 w-full h-full object-cover transition-transform duration-700"
        style={{
          transform: isHovered ? "scale(1.1)" : "scale(1)",
        }}
      />

      {/* Gradient Overlays */}
      <div
        className="absolute inset-0 transition-opacity duration-500"
        style={{
          background: `linear-gradient(180deg, 
            transparent 0%, 
            transparent 30%,
            rgba(0,0,0,0.6) 60%,
            rgba(0,0,0,0.95) 100%
          )`,
        }}
      />

      {/* Color accent overlay */}
      <div
        className="absolute inset-0 transition-opacity duration-500"
        style={{
          background: `linear-gradient(135deg, ${accentColor}20 0%, transparent 50%, ${accentColor}10 100%)`,
          opacity: isHovered ? 1 : 0.5,
        }}
      />

      {/* Animated scan line */}
      <div
        className="absolute inset-0 pointer-events-none overflow-hidden"
        style={{
          opacity: isHovered ? 1 : 0,
        }}
      >
        <div
          className="absolute w-full h-1 animate-pulse"
          style={{
            background: `linear-gradient(90deg, transparent, ${accentColor}, transparent)`,
            top: "30%",
            boxShadow: `0 0 20px ${accentColor}`,
            animation: isHovered ? "scanLine 2s ease-in-out infinite" : "none",
          }}
        />
      </div>

      {/* Top corner accents */}
      <div
        className="absolute top-0 left-0 w-12 sm:w-20 h-12 sm:h-20 transition-all duration-500"
        style={{
          borderTop: `3px solid ${accentColor}`,
          borderLeft: `3px solid ${accentColor}`,
          opacity: isHovered ? 1 : 0.5,
          boxShadow: isHovered
            ? `inset 10px 10px 20px ${accentColor}30`
            : "none",
        }}
      />
      <div
        className="absolute top-0 right-0 w-12 sm:w-20 h-12 sm:h-20 transition-all duration-500"
        style={{
          borderTop: `3px solid ${accentColor}`,
          borderRight: `3px solid ${accentColor}`,
          opacity: isHovered ? 1 : 0.5,
          boxShadow: isHovered
            ? `inset -10px 10px 20px ${accentColor}30`
            : "none",
        }}
      />

      {/* Game badge */}
      <div
        className="absolute top-2 sm:top-3 left-2 sm:left-3 px-2 sm:px-3 py-1 sm:py-1.5 rounded-sm flex items-center gap-1 sm:gap-2 transition-all duration-300"
        style={{
          backgroundColor: `${accentColor}dd`,
          boxShadow: `0 0 15px ${accentColor}80`,
          transform: isHovered ? "translateX(5px)" : "translateX(0)",
        }}
      >
        <Gamepad2 className="w-3 h-3 sm:w-4 sm:h-4 text-white flex-shrink-0" />
        <span className="text-white text-[10px] sm:text-xs font-bold uppercase tracking-wider hidden sm:inline">
          {gameName}
        </span>
        <span className="text-white text-[10px] sm:hidden font-bold uppercase">
          {gameName.substring(0, 3)}
        </span>
      </div>

      {/* Live indicator */}
      <div
        className="absolute top-2 sm:top-3 right-2 sm:right-3 flex items-center gap-1 sm:gap-2 transition-opacity duration-300"
        style={{ opacity: isHovered ? 1 : 0.7 }}
      >
        <div
          className="w-2 h-2 rounded-full animate-pulse"
          style={{
            backgroundColor: accentColor,
            boxShadow: `0 0 10px ${accentColor}`,
          }}
        />
        <span className="text-white text-[10px] sm:text-xs font-mono uppercase hidden sm:inline">
          Registering
        </span>
        <span className="text-white text-[10px] sm:hidden font-mono uppercase">
          Live
        </span>
      </div>

      {/* Content Area */}
      <div className="absolute bottom-0 left-0 right-0 p-3 sm:p-5">
        {/* Tournament Name */}
        <h3
          className="text-lg sm:text-2xl font-black uppercase tracking-tight mb-2 sm:mb-3 transition-all duration-300 line-clamp-2"
          style={{
            color: "#ffffff",
            textShadow: `0 0 20px ${accentColor}80, 0 2px 4px rgba(0,0,0,0.8)`,
            transform: isHovered ? "translateY(-5px)" : "translateY(0)",
            fontSize: "clamp(0.875rem, 2vw, 1.5rem)",
          }}
        >
          {tournamentName}
        </h3>

        {/* Stats Grid */}

        {/* Register Button */}
        <button
          className="w-full py-2 sm:py-3 rounded-sm font-bold uppercase tracking-wider text-xs sm:text-sm transition-all duration-300 flex items-center justify-center gap-1 sm:gap-2 overflow-hidden relative"
          style={{
            backgroundColor: isHovered ? accentColor : "transparent",
            border: `2px solid ${accentColor}`,
            color: isHovered ? "#ffffff" : accentColor,
            boxShadow: isHovered ? `0 0 30px ${accentColor}60` : "none",
          }}
        >
          <Zap className="w-3 h-3 sm:w-4 sm:h-4" />
          <span className="hidden sm:inline">Register Now</span>
          <span className="sm:hidden">Join</span>

          {/* Button shine effect */}
          <div
            className="absolute inset-0 transition-transform duration-700"
            style={{
              background: `linear-gradient(90deg, transparent, rgba(255,255,255,0.3), transparent)`,
              transform: isHovered ? "translateX(200%)" : "translateX(-200%)",
            }}
          />
        </button>
      </div>

      {/* Bottom corner accents */}
      <div
        className="absolute bottom-0 left-0 w-10 sm:w-16 h-10 sm:h-16 transition-all duration-500"
        style={{
          borderBottom: `3px solid ${accentColor}`,
          borderLeft: `3px solid ${accentColor}`,
          opacity: isHovered ? 1 : 0.5,
        }}
      />
      <div
        className="absolute bottom-0 right-0 w-10 sm:w-16 h-10 sm:h-16 transition-all duration-500"
        style={{
          borderBottom: `3px solid ${accentColor}`,
          borderRight: `3px solid ${accentColor}`,
          opacity: isHovered ? 1 : 0.5,
        }}
      />

      {/* Glitch effect on hover */}
      {isHovered && (
        <>
          <div
            className="absolute inset-0 pointer-events-none animate-pulse"
            style={{
              background: `repeating-linear-gradient(
                0deg,
                transparent,
                transparent 2px,
                ${accentColor}08 2px,
                ${accentColor}08 4px
              )`,
            }}
          />
        </>
      )}

      {/* CSS for scan line animation */}
      <style>{`
        @keyframes scanLine {
          0%, 100% { top: 20%; opacity: 0; }
          50% { top: 80%; opacity: 1; }
        }
      `}</style>
    </div>
  );
};

export default EsportsCard;
