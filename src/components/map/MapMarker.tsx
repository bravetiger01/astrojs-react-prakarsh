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
  scale: number;
}

// Array of available marker images
const markerImages = [
  '/markers/bg-removed-marker-one.png',
  '/markers/bg-removed-marker-two.png',
  '/markers/bg-removed-marker-three.png',
  '/markers/bg-removed-marker-four.png',
  '/markers/bg-removed-marker-five.png',
  '/markers/bg-removed-marker-six.png',
  '/markers/bg-removed-marker-seven.png',
  '/markers/bg-removed-marker-eight.png',
  '/markers/bg-removed-marker-nine.png',
  '/markers/bg-removed-marker-ten.png',
];

// Function to consistently assign a marker to an event based on its ID
const getMarkerImage = (markerId: string): string => {
  const hash = markerId.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
  return markerImages[hash % markerImages.length];
};

export default function MapMarker({ marker, isSelected, onClick, scale }: MapMarkerProps) {
  const markerImage = getMarkerImage(marker.id);
  
  // Keep marker at constant size - the parent's scale transform will handle zoom
  // But we can adjust slightly for better visibility at extreme zooms
  const baseSize = 40; // Base size in pixels

  return (
    <motion.button
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
      onClick={(e) => {
        e.stopPropagation();
        onClick();
      }}
      className="absolute marker-button"
      style={{ 
        left: `${marker.x}%`, 
        top: `${marker.y}%`,
        width: `${baseSize}px`,
        height: `${baseSize}px`,
        transform: 'translate(-50%, -100%)',
        zIndex: isSelected ? 1000 : 100,
      }}
      title={marker.eventName}
    >
      {/* Always visible label above marker */}
      <span 
        className="absolute left-1/2 -translate-x-1/2 bottom-full mb-1 bg-[#2a1e3d]/95 backdrop-blur-sm border border-[#f1b5a2]/30 text-white font-body font-semibold px-2 py-0.5 rounded shadow-lg pointer-events-none"
        style={{
          fontSize: '9px',
          maxWidth: '100px',
          overflow: 'hidden',
          textOverflow: 'ellipsis',
          whiteSpace: 'nowrap',
          zIndex: isSelected ? 1001 : 101,
        }}
      >
        {marker.eventName}
      </span>

      {/* Marker Image */}
      <div 
        className="relative w-full h-full transition-transform duration-200"
        style={{
          transform: isSelected ? 'scale(1.25)' : 'scale(1)',
          transformOrigin: 'center bottom'
        }}
      >
        <img
          src={markerImage}
          alt={marker.eventName}
          className="w-full h-full object-contain drop-shadow-lg transition-transform duration-200 hover:scale-110"
          style={{
            filter: isSelected 
              ? 'drop-shadow(0 0 8px rgba(241, 181, 162, 0.8)) drop-shadow(0 4px 12px rgba(0, 0, 0, 0.4))' 
              : 'drop-shadow(0 2px 6px rgba(0, 0, 0, 0.3))',
            transformOrigin: 'center bottom'
          }}
        />
        
        {/* Pulse effect when selected */}
        {isSelected && (
          <motion.div
            className="absolute inset-0 rounded-full"
            animate={{
              scale: [1, 1.5, 1],
              opacity: [0.5, 0, 0.5],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut"
            }}
            style={{
              background: 'radial-gradient(circle, rgba(241, 181, 162, 0.6) 0%, transparent 70%)',
              transformOrigin: 'center bottom'
            }}
          />
        )}
      </div>
    </motion.button>
  );
}
