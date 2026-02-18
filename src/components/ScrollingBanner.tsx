interface ScrollingBannerProps {
  message: string;
  accentColor?: string;
  secondaryColor?: string;
}

const ScrollingBanner = ({
  message,
  accentColor = "#ff00ff",
  secondaryColor = "#4af0f0",
}: ScrollingBannerProps) => {
  return (
    <div
      style={{
        position: "relative",
        width: "100%",
        height: "60px",
        overflow: "hidden",
        pointerEvents: "none",
      }}
    >
      {/* Scrolling text container */}
      <div
        style={{
          position: "absolute",
          top: "50%",
          transform: "translateY(-50%)",
          display: "flex",
          alignItems: "center",
          gap: "80px",
          animation: "scrollLeft 20s linear infinite",
          whiteSpace: "nowrap",
        }}
      >
        {/* Repeat message multiple times for seamless loop */}
        {[...Array(10)].map((_, i) => (
          <div
            key={i}
            style={{
              display: "flex",
              alignItems: "center",
              gap: "20px",
            }}
          >
            {/* Warning icon */}
            <svg width="32" height="32" viewBox="0 0 32 32">
              <circle
                cx="16"
                cy="16"
                r="14"
                fill="none"
                stroke={accentColor}
                strokeWidth="2"
              />
              <path
                d="M 16 8 L 16 18"
                stroke={accentColor}
                strokeWidth="3"
                strokeLinecap="round"
              />
              <circle cx="16" cy="23" r="2" fill={accentColor} />
              <circle
                cx="16"
                cy="16"
                r="12"
                fill={accentColor}
                opacity="0.1"
                style={{ animation: "pulse 2s ease-in-out infinite" }}
              />
            </svg>

            {/* Message text */}
            <span
              style={{
                fontFamily: "'Bruno Ace SC', sans-serif",
                fontSize: "24px",
                fontWeight: "bold",
                color: "#ffffff",
                textTransform: "uppercase",
                letterSpacing: "4px",
                textShadow: `
                  2px 2px 0 ${accentColor}60,
                  -1px -1px 0 ${secondaryColor}30,
                  0 0 20px ${accentColor}40
                `,
              }}
            >
              {message}
            </span>

            {/* Decorative separator */}
            <svg width="40" height="4" viewBox="0 0 40 4">
              <rect
                width="40"
                height="4"
                fill={`url(#gradient-${i})`}
                rx="2"
              />
              <defs>
                <linearGradient id={`gradient-${i}`} x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor={accentColor} stopOpacity="0" />
                  <stop offset="50%" stopColor={accentColor} stopOpacity="1" />
                  <stop offset="100%" stopColor={secondaryColor} stopOpacity="0" />
                </linearGradient>
              </defs>
            </svg>
          </div>
        ))}
      </div>

      {/* Top border */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          height: "2px",
          background: `linear-gradient(90deg, transparent, ${accentColor}, ${secondaryColor}, ${accentColor}, transparent)`,
        }}
      />

      {/* Bottom border */}
      <div
        style={{
          position: "absolute",
          bottom: 0,
          left: 0,
          right: 0,
          height: "2px",
          background: `linear-gradient(90deg, transparent, ${secondaryColor}, ${accentColor}, ${secondaryColor}, transparent)`,
        }}
      />

      {/* Background glow */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background: `linear-gradient(90deg, 
            transparent 0%, 
            ${accentColor}10 25%, 
            ${secondaryColor}10 50%, 
            ${accentColor}10 75%, 
            transparent 100%
          )`,
          pointerEvents: "none",
        }}
      />

      {/* Animations */}
      <style>{`
        @keyframes scrollLeft {
          0% {
            transform: translateY(-50%) translateX(0);
          }
          100% {
            transform: translateY(-50%) translateX(-50%);
          }
        }

        @keyframes pulse {
          0%, 100% {
            opacity: 0.1;
            transform: scale(1);
          }
          50% {
            opacity: 0.3;
            transform: scale(1.1);
          }
        }
      `}</style>
    </div>
  );
};

export default ScrollingBanner;
