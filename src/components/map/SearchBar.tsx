import { useState, useRef, useEffect } from "react";
import { Search, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface SearchBarProps {
  query: string;
  onQueryChange: (q: string) => void;
  results: { id: string; eventName: string; floorName: string }[];
  onResultClick: (id: string) => void;
}

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
    <div className="relative w-full max-w-[200px] md:max-w-sm">
      <div className="relative">
        <Search className="absolute left-2 md:left-3 top-1/2 -translate-y-1/2 w-3 h-3 md:w-4 md:h-4 text-muted-foreground" />
        <input
          ref={inputRef}
          value={query}
          onChange={(e) => onQueryChange(e.target.value)}
          onFocus={() => setFocused(true)}
          onBlur={() => setTimeout(() => setFocused(false), 200)}
          placeholder="Search..."
          className="w-full bg-muted/80 backdrop-blur-sm border border-border rounded-lg pl-7 md:pl-9 pr-7 md:pr-8 py-1.5 md:py-2 text-xs md:text-sm font-body text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all"
        />
        {query && (
          <button
            onClick={() => onQueryChange("")}
            className="absolute right-1.5 md:right-2 top-1/2 -translate-y-1/2 p-0.5 rounded text-muted-foreground hover:text-foreground"
          >
            <X className="w-3 h-3 md:w-4 md:h-4" />
          </button>
        )}
      </div>

      <AnimatePresence>
        {showResults && (
          <motion.div
            initial={{ opacity: 0, y: -4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -4 }}
            className="absolute top-full mt-2 left-0 right-0 md:left-auto md:right-0 md:min-w-[400px] bg-card/95 backdrop-blur-md border border-border rounded-xl shadow-2xl overflow-hidden z-[10000] max-h-[70vh] overflow-y-auto"
          >
            {results.length > 0 ? (
              <div className="py-1">
                {results.map((r, index) => (
                  <button
                    key={r.id}
                    onMouseDown={() => onResultClick(r.id)}
                    className="w-full flex items-center justify-between gap-3 px-4 py-3 text-sm font-body text-foreground hover:bg-primary/10 transition-colors group"
                  >
                    <div className="flex items-center gap-2 flex-1 min-w-0">
                      <div className="w-2 h-2 rounded-full bg-primary flex-shrink-0"></div>
                      <span className="text-left truncate font-medium group-hover:text-primary transition-colors">
                        {r.eventName}
                      </span>
                    </div>
                    <span className="text-xs text-muted-foreground bg-muted/50 px-2 py-1 rounded-md flex-shrink-0 font-medium">
                      {r.floorName}
                    </span>
                  </button>
                ))}
              </div>
            ) : (
              <div className="px-4 py-6 text-sm text-muted-foreground text-center font-body">
                <div className="text-2xl mb-2">🔍</div>
                No events found
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
