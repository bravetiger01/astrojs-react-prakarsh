import { useState } from "react";

interface FlyingShipBannerProps {
  title: string;
  href: string;
  accentColor?: string;
  secondaryColor?: string;
}

const FlyingShipBanner = ({ 
  title, 
  href, 
  accentColor = "#ff00ff",
  secondaryColor = "#4af0f0"
}: FlyingShipBannerProps) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      style={{
        position: "relative",
        width: "400px",
        height: "300px",
      }}
    >
      {/* Flying Ship Body */}
      <div
        style={{
          position: "absolute",
          top: "20px",
          left: "50%",
          transform: "translateX(-50%)",
          width: "200px",
          height: "80px",
          animation: "shipFloat 4s ease-in-out infinite",
        }}
      >
        {/* Main ship hull - blimp/zeppelin style */}
        <svg
          style={{
            position: "absolute",
            top: 0,
            left: "50%",
            transform: "translateX(-50%)",
            width: "200px",
            height: "80px",
          }}
          viewBox="0 0 200 80"
        >
          {/* Main body */}
          <ellipse
            cx="100"
            cy="40"
            rx="90"
            ry="35"
            fill="#2a1a4a"
            stroke={accentColor}
            strokeWidth="3"
          />
          <ellipse
            cx="100"
            cy="40"
            rx="80"
            ry="28"
            fill="#3d2a5c"
            opacity="0.8"
          />
          
          {/* Highlight stripe */}
          <ellipse
            cx="100"
            cy="30"
            rx="70"
            ry="15"
            fill={accentColor}
            opacity="0.2"
          />
          
          {/* Window panels */}
          <circle cx="70" cy="35" r="8" fill={secondaryColor} opacity="0.6" />
          <circle cx="90" cy="35" r="8" fill={secondaryColor} opacity="0.6" />
          <circle cx="110" cy="35" r="8" fill={secondaryColor} opacity="0.6" />
          <circle cx="130" cy="35" r="8" fill={secondaryColor} opacity="0.6" />
          
          {/* Nose cone */}
          <path
            d="M 10 40 Q 5 40 5 40 L 10 35 L 10 45 Z"
            fill="#1a0a2e"
            stroke={accentColor}
            strokeWidth="2"
          />
          
          {/* Tail fins */}
          <polygon
            points="185,25 195,15 195,25"
            fill={accentColor}
            opacity="0.8"
          />
          <polygon
            points="185,55 195,65 195,55"
            fill={accentColor}
            opacity="0.8"
          />
          <polygon
            points="185,35 200,40 185,45"
            fill={secondaryColor}
            opacity="0.8"
          />
        </svg>

        {/* Propellers/Engines */}
        <svg
          style={{
            position: "absolute",
            bottom: "-15px",
            left: "30%",
            width: "30px",
            height: "30px",
          }}
          viewBox="0 0 30 30"
        >
          <circle cx="15" cy="15" r="12" fill="#1a0a2e" stroke={accentColor} strokeWidth="2" />
          <circle cx="15" cy="15" r="8" fill={accentColor} opacity="0.3" />
          {/* Propeller blades - 4 blades */}
          <g style={{ transformOrigin: "15px 15px", animation: "propellerSpin 1s linear infinite" }}>
            <ellipse cx="15" cy="6" rx="2" ry="9" fill={accentColor} opacity="0.8" />
            <ellipse cx="24" cy="15" rx="9" ry="2" fill={accentColor} opacity="0.8" />
            <ellipse cx="15" cy="24" rx="2" ry="9" fill={accentColor} opacity="0.6" />
            <ellipse cx="6" cy="15" rx="9" ry="2" fill={accentColor} opacity="0.6" />
          </g>
          <circle cx="15" cy="15" r="3" fill="#1a0a2e" stroke={accentColor} strokeWidth="1" />
        </svg>

        <svg
          style={{
            position: "absolute",
            bottom: "-15px",
            right: "30%",
            width: "30px",
            height: "30px",
          }}
          viewBox="0 0 30 30"
        >
          <circle cx="15" cy="15" r="12" fill="#1a0a2e" stroke={accentColor} strokeWidth="2" />
          <circle cx="15" cy="15" r="8" fill={accentColor} opacity="0.3" />
          {/* Propeller blades - 4 blades */}
          <g style={{ transformOrigin: "15px 15px", animation: "propellerSpin 1s linear infinite" }}>
            <ellipse cx="15" cy="6" rx="2" ry="9" fill={accentColor} opacity="0.8" />
            <ellipse cx="24" cy="15" rx="9" ry="2" fill={accentColor} opacity="0.8" />
            <ellipse cx="15" cy="24" rx="2" ry="9" fill={accentColor} opacity="0.6" />
            <ellipse cx="6" cy="15" rx="9" ry="2" fill={accentColor} opacity="0.6" />
          </g>
          <circle cx="15" cy="15" r="3" fill="#1a0a2e" stroke={accentColor} strokeWidth="1" />
        </svg>

        {/* Gondola/Cabin underneath */}
        <svg
          style={{
            position: "absolute",
            bottom: "-35px",
            left: "50%",
            transform: "translateX(-50%)",
            width: "60px",
            height: "25px",
          }}
          viewBox="0 0 60 25"
        >
          <rect
            x="5"
            y="5"
            width="50"
            height="18"
            rx="3"
            fill="#2a1a4a"
            stroke={accentColor}
            strokeWidth="2"
          />
          <rect x="10" y="8" width="8" height="8" fill={secondaryColor} opacity="0.5" />
          <rect x="22" y="8" width="8" height="8" fill={secondaryColor} opacity="0.5" />
          <rect x="34" y="8" width="8" height="8" fill={secondaryColor} opacity="0.5" />
          <rect x="46" y="8" width="8" height="8" fill={secondaryColor} opacity="0.5" />
        </svg>

        {/* Cables connecting to banner */}
        <svg
          style={{
            position: "absolute",
            bottom: "-80px",
            left: "25%",
            width: "2px",
            height: "80px",
          }}
          viewBox="0 0 2 80"
        >
          <line x1="1" y1="0" x2="1" y2="80" stroke={accentColor} strokeWidth="2" />
        </svg>
        <svg
          style={{
            position: "absolute",
            bottom: "-80px",
            right: "25%",
            width: "2px",
            height: "80px",
          }}
          viewBox="0 0 2 80"
        >
          <line x1="1" y1="0" x2="1" y2="80" stroke={accentColor} strokeWidth="2" />
        </svg>
      </div>

      {/* Banner/Billboard */}
      <a
        href={href}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        onTouchStart={() => setIsHovered(true)}
        onTouchEnd={() => setIsHovered(false)}
        style={{
          position: "absolute",
          bottom: "20px",
          left: "50%",
          transform: "translateX(-50%)",
          display: "block",
          width: "320px",
          height: "160px",
          textDecoration: "none",
          cursor: "pointer",
          animation: "bannerSway 4s ease-in-out infinite",
          pointerEvents: "auto",
          touchAction: "manipulation",
        }}
      >
        {/* Banner frame */}
        <div
          style={{
            position: "relative",
            width: "100%",
            height: "100%",
            background: "#1a0a2e",
            border: `3px solid ${accentColor}`,
            overflow: "hidden",
            transform: isHovered ? "scale(1.05)" : "scale(1)",
            transition: "transform 0.3s ease",
          }}
        >
          {/* Background pattern */}
          <svg
            style={{
              position: "absolute",
              inset: 0,
              width: "100%",
              height: "100%",
              opacity: 0.15,
            }}
            viewBox="0 0 320 160"
          >
            <defs>
              <pattern id="banner-grid" width="20" height="20" patternUnits="userSpaceOnUse">
                <path d="M 20 0 L 0 0 0 20" fill="none" stroke={accentColor} strokeWidth="0.5" />
              </pattern>
            </defs>
            <rect width="320" height="160" fill="url(#banner-grid)" />
            <circle cx="260" cy="30" r="25" fill="none" stroke={secondaryColor} strokeWidth="2" />
            <polygon points="40,130 60,140 40,140" fill={accentColor} opacity="0.3" />
          </svg>

          {/* Top bar */}
          <div
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              right: 0,
              height: "3px",
              background: `linear-gradient(90deg, ${accentColor}, ${secondaryColor}, ${accentColor})`,
            }}
          />

          {/* Corner brackets */}
          <svg style={{ position: "absolute", top: "8px", left: "8px", width: "20px", height: "20px" }} viewBox="0 0 20 20">
            <path d="M 0 6 L 0 0 L 6 0" fill="none" stroke={accentColor} strokeWidth="2" />
          </svg>
          <svg style={{ position: "absolute", top: "8px", right: "8px", width: "20px", height: "20px" }} viewBox="0 0 20 20">
            <path d="M 20 6 L 20 0 L 14 0" fill="none" stroke={accentColor} strokeWidth="2" />
          </svg>
          <svg style={{ position: "absolute", bottom: "8px", left: "8px", width: "20px", height: "20px" }} viewBox="0 0 20 20">
            <path d="M 0 14 L 0 20 L 6 20" fill="none" stroke={accentColor} strokeWidth="2" />
          </svg>
          <svg style={{ position: "absolute", bottom: "8px", right: "8px", width: "20px", height: "20px" }} viewBox="0 0 20 20">
            <path d="M 20 14 L 20 20 L 14 20" fill="none" stroke={accentColor} strokeWidth="2" />
          </svg>

          {/* Content */}
          <div
            style={{
              position: "absolute",
              inset: 0,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              gap: "12px",
            }}
          >
            {/* Label */}
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "6px",
                fontSize: "10px",
                fontFamily: "'Courier New', monospace",
                color: accentColor,
                letterSpacing: "2px",
              }}
            >
              <div style={{ width: "15px", height: "2px", background: accentColor }} />
              ACCESS
              <div style={{ width: "15px", height: "2px", background: accentColor }} />
            </div>

            {/* Title */}
            <h2
              style={{
                fontFamily: "'Bruno Ace SC', sans-serif",
                fontSize: "32px",
                fontWeight: "normal",
                color: "#ffffff",
                textTransform: "uppercase",
                letterSpacing: "5px",
                margin: 0,
                textShadow: `
                  3px 3px 0 ${accentColor}40,
                  -2px -2px 0 ${secondaryColor}20
                `,
              }}
            >
              {title}
            </h2>

            {/* Status */}
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "8px",
                fontSize: "9px",
                fontFamily: "'Courier New', monospace",
                color: accentColor,
                letterSpacing: "2px",
              }}
            >
              <svg width="14" height="14" viewBox="0 0 14 14">
                <circle cx="7" cy="7" r="5" fill="none" stroke={accentColor} strokeWidth="2" />
                <circle cx="7" cy="7" r="2.5" fill={accentColor} style={{ animation: "statusPulse 2s ease-in-out infinite" }} />
              </svg>
              ONLINE
            </div>
          </div>

          {/* Scan line */}
          <div
            style={{
              position: "absolute",
              top: 0,
              left: "-100%",
              width: "100%",
              height: "100%",
              background: `linear-gradient(90deg, transparent, ${accentColor}20, transparent)`,
              animation: "scanMove 3s linear infinite",
              pointerEvents: "none",
            }}
          />

          {/* Bottom bar */}
          <div
            style={{
              position: "absolute",
              bottom: 0,
              left: 0,
              right: 0,
              height: "3px",
              background: `linear-gradient(90deg, ${secondaryColor}, ${accentColor}, ${secondaryColor})`,
            }}
          />
        </div>
      </a>

      {/* Animations */}
      <style>{`
        @keyframes shipFloat {
          0%, 100% { transform: translateX(-50%) translateY(0px); }
          50% { transform: translateX(-50%) translateY(-10px); }
        }

        @keyframes bannerSway {
          0%, 100% { transform: translateX(-50%) rotate(0deg); }
          25% { transform: translateX(-50%) rotate(1deg); }
          75% { transform: translateX(-50%) rotate(-1deg); }
        }

        @keyframes propellerSpin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }

        @keyframes scanMove {
          0% { left: -100%; }
          100% { left: 100%; }
        }

        @keyframes statusPulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.3; }
        }
      `}</style>
    </div>
  );
};

export default FlyingShipBanner;
