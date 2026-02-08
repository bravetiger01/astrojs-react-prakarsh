import { useState } from "react";

interface SponsorBannerProps {
  title: string;
  sponsorLogos: { name: string; imageSrc: string }[];
  accentColor?: string;
  secondaryColor?: string;
  scale?: number;
}

const SponsorBanner = ({
  title,
  sponsorLogos,
  accentColor = "#7B7BF8",
  secondaryColor = "#4af0f0",
  scale = 1,
}: SponsorBannerProps) => {
  const [isHovered, setIsHovered] = useState(false);

  const baseWidth = 550;
  const baseHeight = 500;

  return (
    <div
      style={{
        position: "relative",
        width: `${baseWidth * scale}px`,
        height: `${baseHeight * scale}px`,
        transform: `scale(${scale > 1 ? 1 : 1})`,
        transformOrigin: "top center",
      }}
    >
      {/* Flying Ship Body */}
      <div
        style={{
          position: "absolute",
          top: `${20 * scale}px`,
          left: "50%",
          transform: "translateX(-50%)",
          width: `${200 * scale}px`,
          height: `${80 * scale}px`,
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
            width: `${200 * scale}px`,
            height: `${80 * scale}px`,
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
          <polygon points="185,25 195,15 195,25" fill={accentColor} opacity="0.8" />
          <polygon points="185,55 195,65 195,55" fill={accentColor} opacity="0.8" />
          <polygon points="185,35 200,40 185,45" fill={secondaryColor} opacity="0.8" />
        </svg>

        {/* Propellers/Engines */}
        <svg
          style={{
            position: "absolute",
            bottom: `${-15 * scale}px`,
            left: "30%",
            width: `${30 * scale}px`,
            height: `${30 * scale}px`,
          }}
          viewBox="0 0 30 30"
        >
          <circle cx="15" cy="15" r="12" fill="#1a0a2e" stroke={accentColor} strokeWidth="2" />
          <circle cx="15" cy="15" r="8" fill={accentColor} opacity="0.3" />
          <line
            x1="15" y1="3" x2="15" y2="27"
            stroke={accentColor} strokeWidth="2"
            style={{ animation: "propellerSpin 0.5s linear infinite" }}
          />
          <line
            x1="3" y1="15" x2="27" y2="15"
            stroke={accentColor} strokeWidth="2"
            style={{ animation: "propellerSpin 0.5s linear infinite" }}
          />
        </svg>

        <svg
          style={{
            position: "absolute",
            bottom: `${-15 * scale}px`,
            right: "30%",
            width: `${30 * scale}px`,
            height: `${30 * scale}px`,
          }}
          viewBox="0 0 30 30"
        >
          <circle cx="15" cy="15" r="12" fill="#1a0a2e" stroke={accentColor} strokeWidth="2" />
          <circle cx="15" cy="15" r="8" fill={accentColor} opacity="0.3" />
          <line
            x1="15" y1="3" x2="15" y2="27"
            stroke={accentColor} strokeWidth="2"
            style={{ animation: "propellerSpin 0.5s linear infinite" }}
          />
          <line
            x1="3" y1="15" x2="27" y2="15"
            stroke={accentColor} strokeWidth="2"
            style={{ animation: "propellerSpin 0.5s linear infinite" }}
          />
        </svg>

        {/* Gondola/Cabin underneath */}
        <svg
          style={{
            position: "absolute",
            bottom: `${-35 * scale}px`,
            left: "50%",
            transform: "translateX(-50%)",
            width: `${60 * scale}px`,
            height: `${25 * scale}px`,
          }}
          viewBox="0 0 60 25"
        >
          <rect
            x="5" y="5" width="50" height="18" rx="3"
            fill="#2a1a4a" stroke={accentColor} strokeWidth="2"
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
            bottom: `${-100 * scale}px`,
            left: "25%",
            width: "2px",
            height: `${100 * scale}px`,
          }}
          viewBox="0 0 2 100"
        >
          <line x1="1" y1="0" x2="1" y2="100" stroke={accentColor} strokeWidth="2" />
        </svg>
        <svg
          style={{
            position: "absolute",
            bottom: `${-100 * scale}px`,
            right: "25%",
            width: "2px",
            height: `${100 * scale}px`,
          }}
          viewBox="0 0 2 100"
        >
          <line x1="1" y1="0" x2="1" y2="100" stroke={accentColor} strokeWidth="2" />
        </svg>
      </div>

      {/* Banner/Billboard with Sponsors */}
      <div
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        style={{
          position: "absolute",
          bottom: `${20 * scale}px`,
          left: "50%",
          transform: "translateX(-50%)",
          width: `${500 * scale}px`,
          height: `${340 * scale}px`,
          animation: "bannerSway 4s ease-in-out infinite",
        }}
      >
        {/* Banner frame */}
        <div
          style={{
            position: "relative",
            width: "100%",
            height: "100%",
            background: "linear-gradient(145deg, #2C0060, #1a0a2e)",
            border: `3px solid ${accentColor}`,
            overflow: "hidden",
            transform: isHovered ? "scale(1.02)" : "scale(1)",
            transition: "transform 0.3s ease",
            boxShadow: `
              0 0 30px ${accentColor}40,
              inset 0 0 30px ${accentColor}10
            `,
          }}
        >
          {/* Background pattern */}
          <svg
            style={{
              position: "absolute",
              inset: 0,
              width: "100%",
              height: "100%",
              opacity: 0.1,
            }}
            viewBox="0 0 360 200"
          >
            <defs>
              <pattern id="sponsor-grid" width="20" height="20" patternUnits="userSpaceOnUse">
                <path d="M 20 0 L 0 0 0 20" fill="none" stroke={accentColor} strokeWidth="0.5" />
              </pattern>
            </defs>
            <rect width="360" height="200" fill="url(#sponsor-grid)" />
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
              gap: `${10 * scale}px`,
              padding: `${15 * scale}px`,
            }}
          >
            {/* Title Label */}
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "8px",
                fontSize: `${16 * scale}px`,
                fontFamily: "'Bruno Ace SC', sans-serif",
                color: accentColor,
                letterSpacing: "3px",
                textTransform: "uppercase",
              }}
            >
              <div style={{ width: "20px", height: "2px", background: accentColor }} />
              {title}
              <div style={{ width: "20px", height: "2px", background: accentColor }} />
            </div>

            {/* Sponsor logos grid */}
            <div
              style={{
                display: "flex",
                flexWrap: "wrap",
                justifyContent: "center",
                alignItems: "center",
                gap: `${12 * scale}px`,
                maxWidth: "90%",
              }}
            >
              {sponsorLogos.map((sponsor, index) => (
                <div
                  key={index}
                  style={{
                    width: `${180 * scale}px`,
                    height: `${130 * scale}px`,
                    background: "rgba(255, 255, 255, 0.95)",
                    border: `2px solid ${accentColor}`,
                    borderRadius: "8px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    padding: `${10 * scale}px`,
                    transition: "all 0.3s ease",
                    boxShadow: `0 0 20px ${accentColor}30`,
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.borderColor = accentColor;
                    e.currentTarget.style.boxShadow = `0 0 15px ${accentColor}40`;
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.borderColor = `${accentColor}40`;
                    e.currentTarget.style.boxShadow = "none";
                  }}
                >
                  <img
                    src={sponsor.imageSrc}
                    alt={sponsor.name}
                    style={{
                      maxWidth: "100%",
                      maxHeight: "100%",
                      objectFit: "contain",
                      filter: "brightness(1.1)",
                    }}
                  />
                </div>
              ))}
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
              background: `linear-gradient(90deg, transparent, ${accentColor}15, transparent)`,
              animation: "scanMove 4s linear infinite",
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
      </div>

      {/* Animations */}
      <style>{`
        @keyframes shipFloat {
          0%, 100% { transform: translateX(-50%) translateY(0px); }
          50% { transform: translateX(-50%) translateY(-10px); }
        }

        @keyframes bannerSway {
          0%, 100% { transform: translateX(-50%) rotate(0deg); }
          25% { transform: translateX(-50%) rotate(0.5deg); }
          75% { transform: translateX(-50%) rotate(-0.5deg); }
        }

        @keyframes propellerSpin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }

        @keyframes scanMove {
          0% { left: -100%; }
          100% { left: 100%; }
        }
      `}</style>
    </div>
  );
};

export default SponsorBanner;
