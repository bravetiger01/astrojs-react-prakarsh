import { useState, useRef, useEffect } from "react";
import { Search, X, MapPin } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface SearchBarProps {
  query: string;
  onQueryChange: (q: string) => void;
  results: { id: string; eventName: string; floorName: string }[];
  onResultClick: (id: string) => void;
}

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

export default function SearchBar({ query, onQueryChange, results, onResultClick }: SearchBarProps) {
  const [focused, setFocused] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const showResults = focused && query.trim().length > 0;

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "/" && !e.ctrlKey && !e.metaKey) {
        const tag = (e.target as HTMLElement).tagName;
        if (tag !== "INPUT" && tag !== "TEXTAREA") {
          e.preventDefault();
          inputRef.current?.focus();
        }
      }
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, []);

  return (
    <div className="relative w-full max-w-[200px] md:max-w-md">
      {/* Modern Search Input with Glass Effect */}
      <motion.div 
        className="relative"
        animate={{ 
          width: focused ? "100%" : "280px",
        }}
        transition={{ duration: 0.3, ease: "easeInOut" }}
      >
        <div className="relative bg-white/20 backdrop-blur-xl border border-white/30 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 md:w-5 md:h-5 text-gray-800" />
          <input
            ref={inputRef}
            value={query}
            onChange={(e) => onQueryChange(e.target.value)}
            onFocus={() => setFocused(true)}
            onBlur={() => setTimeout(() => setFocused(false), 200)}
            placeholder="Search events..."
            className="w-full bg-transparent border-none rounded-2xl pl-11 md:pl-12 pr-10 md:pr-12 py-3 md:py-3.5 text-sm md:text-base font-body text-black placeholder:text-gray-700 focus:outline-none transition-all"
          />
          {query ? (
            <button
              onClick={() => onQueryChange("")}
              className="absolute right-3 top-1/2 -translate-y-1/2 p-1.5 rounded-full hover:bg-white/20 text-gray-800 hover:text-black transition-all"
            >
              <X className="w-4 h-4" />
            </button>
          ) : (
            <div className="absolute right-3 top-1/2 -translate-y-1/2 px-2 py-1 rounded-md bg-white/20 text-gray-800 text-xs font-medium hidden md:block">
              /
            </div>
          )}
        </div>
      </motion.div>

      {/* Modern Results Dropdown */}
      <AnimatePresence>
        {showResults && (
          <motion.div
            initial={{ opacity: 0, y: -10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.95 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            className="absolute top-full mt-3 left-0 right-0 bg-white/20 backdrop-blur-2xl border border-white/30 rounded-2xl shadow-2xl overflow-hidden z-[10000] max-h-[70vh] overflow-y-auto"
          >
            {results.length > 0 ? (
              <div className="py-2">
                {results.map((r, index) => {
                  const logoPath = getEventLogoPath(r.eventName);
                  return (
                    <motion.button
                      key={r.id}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.03 }}
                      onMouseDown={() => onResultClick(r.id)}
                      className="w-full flex items-center gap-3 px-4 py-3.5 text-sm font-body text-black hover:bg-white/20 transition-all duration-200 group"
                    >
                      <div className="flex items-center gap-3 flex-1 min-w-0">
                        {/* Event Logo */}
                        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#2a1e3d] to-[#1a1625] flex items-center justify-center flex-shrink-0 p-1.5 group-hover:scale-110 transition-transform duration-200">
                          {logoPath ? (
                            <img
                              src={logoPath}
                              alt={r.eventName}
                              className="w-full h-full object-contain"
                              onError={(e) => {
                                // Fallback to MapPin icon if logo fails to load
                                e.currentTarget.style.display = 'none';
                                const parent = e.currentTarget.parentElement;
                                if (parent) {
                                  parent.innerHTML = '<svg class="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"/></svg>';
                                }
                              }}
                            />
                          ) : (
                            <MapPin className="w-5 h-5 text-white" />
                          )}
                        </div>
                        
                        {/* Event Info */}
                        <div className="flex flex-col items-start flex-1 min-w-0">
                          <span className="text-left w-full font-semibold text-black group-hover:text-[#b7654a] transition-colors break-words line-clamp-2">
                            {r.eventName}
                          </span>
                          <span className="text-xs text-gray-800 mt-0.5">
                            {r.floorName}
                          </span>
                        </div>
                      </div>
                      
                      {/* Arrow Icon - Always visible on right */}
                      <div className="flex-shrink-0 self-center ml-2">
                        <svg className="w-4 h-4 text-gray-800 group-hover:text-[#b7654a] transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                      </div>
                    </motion.button>
                  );
                })}
              </div>
            ) : (
              <div className="px-4 py-8 text-sm text-gray-800 text-center font-body">
                <div className="text-3xl mb-3">🔍</div>
                <p className="font-medium text-black">No events found</p>
                <p className="text-xs mt-1 text-gray-700">Try a different search term</p>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
