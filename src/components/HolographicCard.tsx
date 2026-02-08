import { useState } from "react";

interface HolographicCardProps {
  title: string;
  href: string;
  accentColor?: string;
  secondaryColor?: string;
  polePosition?: "left" | "right";
}

const HolographicCard = ({ 
  title, 
  href, 
  accentColor = "#4af0f0",
  secondaryColor = "#ff00ff",
  polePosition = "left"
}: HolographicCardProps) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      style={{
        position: "relative",
        width: "340px",
        height: "280px",
      }}
    >
      {/* Support pole structure */}
      <div
        style={{
          position: "absolute",
          bottom: 0,
          [polePosition]: "50%",
          transform: "translateX(-50%)",
          width: "12px",
          height: "80px",
          background: `linear-gradient(180deg, ${accentColor}40, ${accentColor}80)`,
          border: `2px solid ${accentColor}`,
          borderBottom: "none",
          zIndex: 1,
        }}
      >
        {/* Pole segments */}
        <div
          style={{
            position: "absolute",
            top: "20%",
            left: 0,
            right: 0,
            height: "2px",
            background: accentColor,
          }}
        />
        <div
          style={{
            position: "absolute",
            top: "50%",
            left: 0,
            right: 0,
            height: "2px",
            background: accentColor,
          }}
        />
        <div
          style={{
            position: "absolute",
            top: "80%",
            left: 0,
            right: 0,
            height: "2px",
            background: accentColor,
          }}
        />
      </div>

      {/* Support beams connecting to billboard */}
      <svg
        style={{
          position: "absolute",
          bottom: "80px",
          [polePosition]: "50%",
          transform: polePosition === "left" ? "translateX(-50%)" : "translateX(-50%)",
          width: "200px",
          height: "40px",
          zIndex: 2,
        }}
        viewBox="0 0 200 40"
      >
        {/* Main support beam */}
        <line
          x1={polePosition === "left" ? "100" : "100"}
          y1="0"
          x2={polePosition === "left" ? "20" : "180"}
          y2="40"
          stroke={accentColor}
          strokeWidth="3"
        />
        <line
          x1={polePosition === "left" ? "100" : "100"}
          y1="0"
          x2={polePosition === "left" ? "180" : "20"}
          y2="40"
          stroke={accentColor}
          strokeWidth="3"
        />
        
        {/* Connection points */}
        <circle
          cx={polePosition === "left" ? "20" : "180"}
          cy="40"
          r="4"
          fill={accentColor}
        />
        <circle
          cx={polePosition === "left" ? "180" : "20"}
          cy="40"
          r="4"
          fill={accentColor}
        />
        <circle cx="100" cy="0" r="5" fill={accentColor} />
      </svg>

      {/* Billboard frame */}
      <a
        href={href}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          display: "block",
          height: "200px",
          textDecoration: "none",
          cursor: "pointer",
          transform: isHovered ? "translateY(-4px)" : "translateY(0)",
          transition: "transform 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
          zIndex: 10,
        }}
      >
        {/* Outer frame */}
        <div
          style={{
            position: "absolute",
            inset: "-8px",
            background: `linear-gradient(135deg, ${accentColor}60, ${secondaryColor}40)`,
            border: `3px solid ${accentColor}`,
          }}
        >
          {/* Frame corners */}
          <div
            style={{
              position: "absolute",
              top: "-3px",
              left: "-3px",
              width: "20px",
              height: "20px",
              borderTop: `6px solid ${accentColor}`,
              borderLeft: `6px solid ${accentColor}`,
            }}
          />
          <div
            style={{
              position: "absolute",
              top: "-3px",
              right: "-3px",
              width: "20px",
              height: "20px",
              borderTop: `6px solid ${accentColor}`,
              borderRight: `6px solid ${accentColor}`,
            }}
          />
          <div
            style={{
              position: "absolute",
              bottom: "-3px",
              left: "-3px",
              width: "20px",
              height: "20px",
              borderBottom: `6px solid ${accentColor}`,
              borderLeft: `6px solid ${accentColor}`,
            }}
          />
          <div
            style={{
              position: "absolute",
              bottom: "-3px",
              right: "-3px",
              width: "20px",
              height: "20px",
              borderBottom: `6px solid ${accentColor}`,
              borderRight: `6px solid ${accentColor}`,
            }}
          />
        </div>

        {/* Main billboard screen */}
        <div
          style={{
            position: "relative",
            width: "100%",
            height: "100%",
            background: "#1a0a2e",
            border: `3px solid ${accentColor}`,
            overflow: "hidden",
          }}
        >
          {/* Background geometric pattern */}
          <svg
            style={{
              position: "absolute",
              inset: 0,
              width: "100%",
              height: "100%",
              opacity: 0.15,
            }}
            viewBox="0 0 340 200"
            preserveAspectRatio="xMidYMid slice"
          >
            {/* Grid lines */}
            <defs>
              <pattern id={`grid-${title}`} width="20" height="20" patternUnits="userSpaceOnUse">
                <path d="M 20 0 L 0 0 0 20" fill="none" stroke={accentColor} strokeWidth="0.5" />
              </pattern>
            </defs>
            <rect width="340" height="200" fill={`url(#grid-${title})`} />
            
            {/* Geometric shapes */}
            <circle cx="280" cy="40" r="30" fill="none" stroke={secondaryColor} strokeWidth="2" />
            <circle cx="280" cy="40" r="20" fill="none" stroke={secondaryColor} strokeWidth="1" />
            <rect x="30" y="140" width="40" height="40" fill="none" stroke={accentColor} strokeWidth="2" />
            <polygon points="320,160 300,180 320,180" fill={accentColor} opacity="0.3" />
            <line x1="0" y1="100" x2="80" y2="100" stroke={accentColor} strokeWidth="2" />
            <line x1="260" y1="180" x2="340" y2="180" stroke={secondaryColor} strokeWidth="2" />
          </svg>

          {/* Top decorative bar */}
          <div
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              right: 0,
              height: "4px",
              background: `linear-gradient(90deg, ${accentColor}, ${secondaryColor}, ${accentColor})`,
            }}
          />

          {/* Corner brackets - Vector style */}
          {/* Top Left */}
          <svg
            style={{
              position: "absolute",
              top: "12px",
              left: "12px",
              width: "24px",
              height: "24px",
            }}
            viewBox="0 0 24 24"
          >
            <path d="M 0 8 L 0 0 L 8 0" fill="none" stroke={accentColor} strokeWidth="2" />
            <path d="M 0 8 L 0 0 L 8 0" fill="none" stroke={accentColor} strokeWidth="2" opacity="0.3" transform="translate(1, 1)" />
          </svg>

          {/* Top Right */}
          <svg
            style={{
              position: "absolute",
              top: "12px",
              right: "12px",
              width: "24px",
              height: "24px",
            }}
            viewBox="0 0 24 24"
          >
            <path d="M 24 8 L 24 0 L 16 0" fill="none" stroke={accentColor} strokeWidth="2" />
            <path d="M 24 8 L 24 0 L 16 0" fill="none" stroke={accentColor} strokeWidth="2" opacity="0.3" transform="translate(-1, 1)" />
          </svg>

          {/* Bottom Left */}
          <svg
            style={{
              position: "absolute",
              bottom: "12px",
              left: "12px",
              width: "24px",
              height: "24px",
            }}
            viewBox="0 0 24 24"
          >
            <path d="M 0 16 L 0 24 L 8 24" fill="none" stroke={accentColor} strokeWidth="2" />
            <path d="M 0 16 L 0 24 L 8 24" fill="none" stroke={accentColor} strokeWidth="2" opacity="0.3" transform="translate(1, -1)" />
          </svg>

          {/* Bottom Right */}
          <svg
            style={{
              position: "absolute",
              bottom: "12px",
              right: "12px",
              width: "24px",
              height: "24px",
            }}
            viewBox="0 0 24 24"
          >
            <path d="M 24 16 L 24 24 L 16 24" fill="none" stroke={accentColor} strokeWidth="2" />
            <path d="M 24 16 L 24 24 L 16 24" fill="none" stroke={accentColor} strokeWidth="2" opacity="0.3" transform="translate(-1, -1)" />
          </svg>

          {/* Hexagon decoration - Top Right */}
          <svg
            style={{
              position: "absolute",
              top: "20px",
              right: "50px",
              width: "50px",
              height: "50px",
              opacity: 0.4,
            }}
            viewBox="0 0 100 100"
          >
            <polygon
              points="50,10 85,30 85,70 50,90 15,70 15,30"
              fill="none"
              stroke={secondaryColor}
              strokeWidth="3"
            />
            <polygon
              points="50,30 70,42 70,58 50,70 30,58 30,42"
              fill={secondaryColor}
              opacity="0.2"
            />
            <circle cx="50" cy="50" r="8" fill={secondaryColor} />
          </svg>

          {/* Circuit board style decoration - Bottom Left */}
          <svg
            style={{
              position: "absolute",
              bottom: "30px",
              left: "30px",
              width: "80px",
              height: "30px",
              opacity: 0.5,
            }}
            viewBox="0 0 80 30"
          >
            <line x1="0" y1="15" x2="20" y2="15" stroke={accentColor} strokeWidth="2" />
            <circle cx="20" cy="15" r="3" fill={accentColor} />
            <line x1="20" y1="15" x2="30" y2="5" stroke={accentColor} strokeWidth="2" />
            <circle cx="30" cy="5" r="3" fill={accentColor} />
            <line x1="30" y1="5" x2="50" y2="5" stroke={accentColor} strokeWidth="2" />
            <circle cx="50" cy="5" r="3" fill={accentColor} />
            <line x1="20" y1="15" x2="30" y2="25" stroke={accentColor} strokeWidth="2" />
            <circle cx="30" cy="25" r="3" fill={accentColor} />
            <line x1="30" y1="25" x2="50" y2="25" stroke={accentColor} strokeWidth="2" />
            <rect x="50" y="22" width="6" height="6" fill={accentColor} />
          </svg>

          {/* Energy bars - Bottom Right */}
          <div
            style={{
              position: "absolute",
              bottom: "30px",
              right: "50px",
              display: "flex",
              gap: "4px",
              alignItems: "flex-end",
            }}
          >
            {[
              { height: 12, color: accentColor },
              { height: 20, color: accentColor },
              { height: 28, color: secondaryColor },
              { height: 16, color: accentColor },
              { height: 24, color: secondaryColor },
            ].map((bar, i) => (
              <div
                key={i}
                style={{
                  width: "6px",
                  height: `${bar.height}px`,
                  background: bar.color,
                  opacity: isHovered ? 1 : 0.6,
                  transition: "all 0.3s ease",
                  transitionDelay: `${i * 0.05}s`,
                }}
              />
            ))}
          </div>

          {/* Main content area */}
          <div
            style={{
              position: "absolute",
              inset: 0,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              gap: "16px",
              padding: "20px",
            }}
          >
            {/* Top label */}
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "8px",
                fontSize: "11px",
                fontFamily: "'Courier New', monospace",
                color: accentColor,
                letterSpacing: "3px",
                textTransform: "uppercase",
              }}
            >
              <div
                style={{
                  width: "20px",
                  height: "2px",
                  background: accentColor,
                }}
              />
              ACCESS
              <div
                style={{
                  width: "20px",
                  height: "2px",
                  background: accentColor,
                }}
              />
            </div>

            {/* Main title */}
            <h2
              style={{
                fontFamily: "'Bruno Ace SC', sans-serif",
                fontSize: "36px",
                fontWeight: "normal",
                color: "#ffffff",
                textTransform: "uppercase",
                letterSpacing: "6px",
                margin: 0,
                textShadow: `
                  4px 4px 0 ${accentColor}40,
                  -2px -2px 0 ${secondaryColor}20
                `,
                position: "relative",
              }}
            >
              {title}
              {/* Underline */}
              <div
                style={{
                  position: "absolute",
                  bottom: "-8px",
                  left: "50%",
                  transform: "translateX(-50%)",
                  width: isHovered ? "100%" : "60%",
                  height: "3px",
                  background: `linear-gradient(90deg, transparent, ${accentColor}, ${secondaryColor}, ${accentColor}, transparent)`,
                  transition: "width 0.3s ease",
                }}
              />
            </h2>

            {/* Status indicator */}
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "10px",
                fontSize: "10px",
                fontFamily: "'Courier New', monospace",
                color: accentColor,
                letterSpacing: "2px",
                textTransform: "uppercase",
              }}
            >
              <svg width="16" height="16" viewBox="0 0 16 16">
                <circle
                  cx="8"
                  cy="8"
                  r="6"
                  fill="none"
                  stroke={accentColor}
                  strokeWidth="2"
                />
                <circle
                  cx="8"
                  cy="8"
                  r="3"
                  fill={accentColor}
                  style={{
                    animation: "statusPulse 2s ease-in-out infinite",
                  }}
                />
              </svg>
              ONLINE
            </div>
          </div>

          {/* Animated scan line */}
          <div
            style={{
              position: "absolute",
              top: 0,
              left: "-100%",
              width: "100%",
              height: "100%",
              background: `linear-gradient(90deg, transparent, ${accentColor}20, transparent)`,
              animation: "scanMove 4s linear infinite",
              pointerEvents: "none",
            }}
          />

          {/* Hover overlay */}
          {isHovered && (
            <div
              style={{
                position: "absolute",
                inset: 0,
                background: `radial-gradient(circle at center, ${accentColor}10, transparent 70%)`,
                pointerEvents: "none",
              }}
            />
          )}

          {/* Bottom decorative bar */}
          <div
            style={{
              position: "absolute",
              bottom: 0,
              left: 0,
              right: 0,
              height: "4px",
              background: `linear-gradient(90deg, ${secondaryColor}, ${accentColor}, ${secondaryColor})`,
            }}
          />
        </div>

        {/* Outer glow effect on hover */}
        {isHovered && (
          <div
            style={{
              position: "absolute",
              inset: "-14px",
              border: `2px solid ${accentColor}`,
              opacity: 0.3,
              pointerEvents: "none",
              animation: "glowPulse 1s ease-in-out infinite",
            }}
          />
        )}
      </a>

      {/* Animations */}
      <style>{`
        @keyframes scanMove {
          0% { left: -100%; }
          100% { left: 100%; }
        }

        @keyframes statusPulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.3; }
        }

        @keyframes glowPulse {
          0%, 100% { opacity: 0.3; transform: scale(1); }
          50% { opacity: 0.6; transform: scale(1.02); }
        }
      `}</style>
    </div>
  );
};

export default HolographicCard;
