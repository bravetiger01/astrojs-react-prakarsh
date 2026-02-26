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
            className="fixed bottom-0 left-0 right-0 z-[10000] md:hidden bg-card border-t border-border rounded-t-2xl shadow-2xl max-h-[70vh] overflow-y-auto"
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
            className="hidden md:flex fixed top-0 right-0 h-full w-96 z-[10000] bg-card/95 backdrop-blur-xl border-l border-border shadow-2xl flex-col"
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
  
  // Map event names to their logo filenames
  const getEventLogoPath = (eventName: string) => {
    const logoMap: Record<string, string> = {
      'Human Foosball': 'Human-Foosball.svg',
      'Free Fire Max Prakarsh Cup 2026': 'firefire 1.svg',
      'Valorant Championship Prakarsh 2026': 'valorant.svg',
      'RC Rush': 'tech trash logo.svg',
      'Box Cricket': 'box cricket 1.svg',
      'Unbound: The Creative Arts': 'UNBOUND_The Creative carnival_20260117_131915_0000 1.svg',
      'Stealscape: Think Steal Escape': 'steal scape 1.svg',
      'Design Deal': 'design deal.svg',
      'Ghost Busters': 'ghost busters 1.svg',
      'Case Closed?': 'gdg case closed.svg',
      'Human Ludo': 'human ludo 1.svg',
      'Game of Prompts': 'game of prompts 1.svg',
      'Stranger Things: The Upside-Down Quest': 'upside down  2.svg',
      'IPL Auction': 'IPL-Auction.svg',
      'Startup Sharks': 'shark tank 1.svg',
      'TradeX 2.0': 'trade x.svg',
      'Sync or Sink': 'sync-or-sink.svg',
      'TechTonic': 'tech tonic 1.svg',
      'BGMI Tournament - Prakarsh 2026': 'BGMI 1.svg',
      'Timber Titans': 'THM logo R 1.svg',
      'Open-R': 'open R 1.svg',
      'The Bazaar Bulls': 'bull event 1.svg',
      'The Sky Sprint': 'sky sprint logo 1.svg',
      'High on Hogwarts': 'High-On-Hogwarts.svg',
      'CTF': 'image 35.svg',
      'VR Arena': 'vr arena 1.svg',
      'Feud.exe': 'feud.exe 1.svg',
      'Estate Empire': 'estate empire 1.svg',
      'HydroHustle': 'hydro.svg',
      'Basic First Aid': 'First-AID.svg',
      'Summit Polaris': 'project polaris 1.svg',
      'Project Polaris': 'project polaris 1.svg',
    };

    const filename = logoMap[eventName];
    return filename ? `/logos/${filename}` : null;
  };

  const logoPath = getEventLogoPath(marker.eventName);

  return (
    <div className="flex flex-col h-full overflow-y-auto">
      {/* Event Image - Google Maps style */}
      <div className="relative w-full h-48 md:h-64 bg-gradient-to-br from-primary/20 to-copper-glow/20 flex-shrink-0 overflow-hidden">
        {logoPath ? (
          <div className="w-full h-full flex items-center justify-center p-8 bg-gradient-to-br from-[#2a1e3d] to-[#1a1625]">
            <img
              src={logoPath}
              alt={marker.eventName}
              className="max-w-full max-h-full object-contain"
              onError={(e) => {
                e.currentTarget.style.display = 'none';
              }}
            />
          </div>
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-primary/30 to-copper-glow/30">
            <div className="text-6xl">🎮</div>
          </div>
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
        
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-3 right-3 p-2 rounded-full bg-black/50 backdrop-blur-sm hover:bg-black/70 text-white transition-colors z-10"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Event name overlay */}
        <div className="absolute bottom-0 left-0 right-0 p-4 md:p-5">
          <h2 className="font-display text-xl md:text-2xl font-bold text-white leading-tight drop-shadow-lg">
            {marker.eventName}
          </h2>
          <div className="flex items-center gap-1.5 text-sm text-white/90 font-body mt-1">
            <MapPin className="w-4 h-4" />
            {marker.locationName}
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="flex flex-col gap-4 p-4 md:p-5">
        {/* Details Card */}
        <div className="bg-muted/50 rounded-xl p-4 border border-border">
          <h3 className="font-pixel text-[10px] text-primary mb-3 tracking-wider">EVENT DETAILS</h3>
          <div className="space-y-2.5 text-sm font-body">
            <div className="flex items-center justify-between">
              <span className="text-muted-foreground flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-primary"></div>
                Floor
              </span>
              <span className="text-foreground font-semibold">{floorName || "—"}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-muted-foreground flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-primary"></div>
                Location
              </span>
              <span className="text-foreground font-semibold text-right">{marker.locationName}</span>
            </div>
          </div>
        </div>

        {marker.description && (
          <div className="bg-muted/50 rounded-xl p-4 border border-border">
            <h3 className="font-pixel text-[10px] text-primary mb-3 tracking-wider">ABOUT</h3>
            <p className="text-sm text-foreground font-body leading-relaxed">{marker.description}</p>
          </div>
        )}

        {/* Navigate to other events */}
        {otherEvents.length > 0 && (
          <div>
            <h3 className="font-pixel text-[10px] text-primary mb-3 tracking-wider">OTHER EVENTS</h3>
            <div className="space-y-2 max-h-60 overflow-y-auto pr-1">
              {otherEvents.slice(0, 10).map((evt) => (
                <button
                  key={evt.id}
                  onClick={() => onNavigateTo(evt.id)}
                  className="w-full flex items-center gap-3 px-3 py-2.5 bg-muted/50 hover:bg-primary/10 rounded-lg text-sm font-body text-foreground transition-all border border-transparent hover:border-primary/20 group"
                >
                  <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0 group-hover:bg-primary/30 transition-colors">
                    <Navigation className="w-4 h-4 text-primary" />
                  </div>
                  <div className="flex-1 text-left min-w-0">
                    <div className="font-medium truncate group-hover:text-primary transition-colors">{evt.eventName}</div>
                    <div className="text-xs text-muted-foreground">{evt.floorName}</div>
                  </div>
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
