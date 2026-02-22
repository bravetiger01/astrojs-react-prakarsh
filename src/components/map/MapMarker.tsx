import { motion } from "framer-motion";

interface Marker {
  id: string;
  x: number;
  y: number;
  eventName: string;
  locationName: string;
}

interface MapMarkerProps {
  marker: Marker;
  isSelected: boolean;
  onClick: () => void;
}

export default function MapMarker({ marker, isSelected, onClick }: MapMarkerProps) {
  return (
    <motion.button
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
      onClick={(e) => {
        e.stopPropagation();
        onClick();
      }}
      className="absolute z-10 -translate-x-1/2 -translate-y-1/2 group"
      style={{ left: `${marker.x}%`, top: `${marker.y}%` }}
      title={marker.eventName}
    >
      {/* Outer pulse ring - smaller on mobile */}
      <span className={`absolute inset-0 w-6 h-6 md:w-10 md:h-10 -translate-x-1 -translate-y-1 rounded-full ${isSelected ? "bg-primary/30" : "bg-copper-glow/20"} marker-pulse`} />
      
      {/* Marker pin - smaller on mobile, no emoji */}
      <span
        className={`relative flex items-center justify-center w-5 h-5 md:w-8 md:h-8 rounded-full border-2 transition-all ${
          isSelected
            ? "bg-primary border-copper-glow text-primary-foreground shadow-[var(--shadow-marker)] scale-110 md:scale-125"
            : "bg-card border-primary text-primary hover:bg-primary hover:text-primary-foreground hover:shadow-[var(--shadow-marker)]"
        }`}
      >
        {/* Pin dot instead of emoji */}
        <span className="w-2 h-2 md:w-3 md:h-3 rounded-full bg-current"></span>
      </span>

      {/* Tooltip on hover (desktop only) */}
      <span className="hidden md:group-hover:flex absolute left-1/2 -translate-x-1/2 -top-10 bg-card border border-border text-foreground text-[10px] font-body font-semibold px-2 py-1 rounded whitespace-nowrap shadow-lg z-20">
        {marker.eventName}
      </span>
    </motion.button>
  );
}
