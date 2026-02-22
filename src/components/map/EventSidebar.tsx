import { motion, AnimatePresence } from "framer-motion";
import { X, MapPin, Navigation } from "lucide-react";

interface Marker {
  id: string;
  x: number;
  y: number;
  eventName: string;
  locationName: string;
}

interface EventSidebarProps {
  marker: Marker | null;
  floorName?: string;
  onClose: () => void;
  onNavigateNext?: () => void;
  onNavigatePrev?: () => void;
  allMarkers: { id: string; eventName: string; floorName: string }[];
  onNavigateTo: (id: string) => void;
}

export default function EventSidebar({
  marker,
  floorName,
  onClose,
  allMarkers,
  onNavigateTo,
}: EventSidebarProps) {
  return (
    <AnimatePresence>
      {marker && (
        <>
          {/* Mobile: bottom sheet */}
          <motion.div
            key="mobile-sheet"
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            exit={{ y: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="fixed bottom-0 left-0 right-0 z-50 md:hidden bg-card border-t border-border rounded-t-2xl shadow-2xl max-h-[70vh] overflow-y-auto"
          >
            <div className="flex justify-center pt-2 pb-1">
              <div className="w-10 h-1 bg-muted-foreground/30 rounded-full" />
            </div>
            <EventContent marker={marker} floorName={floorName} onClose={onClose} allMarkers={allMarkers} onNavigateTo={onNavigateTo} />
          </motion.div>

          {/* Desktop: sidebar */}
          <motion.div
            key="desktop-sidebar"
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="hidden md:flex fixed top-0 right-0 h-full w-96 z-50 bg-card/95 backdrop-blur-xl border-l border-border shadow-2xl flex-col"
          >
            <EventContent marker={marker} floorName={floorName} onClose={onClose} allMarkers={allMarkers} onNavigateTo={onNavigateTo} />
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

function EventContent({
  marker,
  floorName,
  onClose,
  allMarkers,
  onNavigateTo,
}: {
  marker: Marker;
  floorName?: string;
  onClose: () => void;
  allMarkers: { id: string; eventName: string; floorName: string }[];
  onNavigateTo: (id: string) => void;
}) {
  const otherEvents = allMarkers.filter((m) => m.id !== marker.id);

  return (
    <div className="flex flex-col gap-4 p-5">
      {/* Header */}
      <div className="flex items-start justify-between">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 bg-gradient-to-br from-primary to-copper-glow rounded-lg flex items-center justify-center text-2xl shadow-[var(--shadow-glow)]">
            🎮
          </div>
          <div>
            <h2 className="font-display text-lg font-bold text-foreground leading-tight">
              {marker.eventName}
            </h2>
            <div className="flex items-center gap-1 text-sm text-muted-foreground font-body">
              <MapPin className="w-3 h-3" />
              {marker.locationName}
            </div>
          </div>
        </div>
        <button
          onClick={onClose}
          className="p-1.5 rounded-md bg-muted hover:bg-secondary text-muted-foreground hover:text-foreground transition-colors"
        >
          <X className="w-4 h-4" />
        </button>
      </div>

      {/* Details */}
      <div className="bg-muted/50 rounded-lg p-4 border border-border">
        <h3 className="font-pixel text-[10px] text-primary mb-2 tracking-wider">EVENT INFO</h3>
        <div className="space-y-2 text-sm font-body">
          <div className="flex justify-between">
            <span className="text-muted-foreground">Floor</span>
            <span className="text-foreground font-semibold">{floorName || "—"}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-muted-foreground">Location</span>
            <span className="text-foreground font-semibold">{marker.locationName}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-muted-foreground">Position</span>
            <span className="text-foreground font-semibold font-mono text-xs">
              ({marker.x.toFixed(1)}%, {marker.y.toFixed(1)}%)
            </span>
          </div>
        </div>
      </div>

      {marker.description && (
        <div className="bg-muted/50 rounded-lg p-4 border border-border">
          <h3 className="font-pixel text-[10px] text-primary mb-2 tracking-wider">DESCRIPTION</h3>
          <p className="text-sm text-foreground font-body leading-relaxed">{marker.description}</p>
        </div>
      )}

      {/* Navigate to other events */}
      {otherEvents.length > 0 && (
        <div>
          <h3 className="font-pixel text-[10px] text-primary mb-2 tracking-wider">NAVIGATE TO</h3>
          <div className="space-y-1.5 max-h-40 overflow-y-auto">
            {otherEvents.map((evt) => (
              <button
                key={evt.id}
                onClick={() => onNavigateTo(evt.id)}
                className="w-full flex items-center gap-2 px-3 py-2 bg-muted/50 hover:bg-secondary rounded-md text-sm font-body text-foreground transition-colors border border-transparent hover:border-border"
              >
                <Navigation className="w-3 h-3 text-primary" />
                <span className="flex-1 text-left">{evt.eventName}</span>
                <span className="text-[10px] text-muted-foreground">{evt.floorName}</span>
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
