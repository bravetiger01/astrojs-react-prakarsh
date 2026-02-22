import { useRef, useState, useEffect } from "react";
import MapMarker from "./MapMarker";

interface Marker {
  id: string;
  x: number;
  y: number;
  eventName: string;
  locationName: string;
}

interface Floor {
  id: string;
  name: string;
  svgPath: string;
  markers: Marker[];
}

interface MapViewerProps {
  floor: Floor;
  selectedMarker: Marker | null;
  onMarkerClick: (marker: Marker) => void;
  onBackgroundClick: () => void;
}

export default function MapViewer({ floor, selectedMarker, onMarkerClick, onBackgroundClick }: MapViewerProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const [imgError, setImgError] = useState(false);
  const [scale, setScale] = useState(1);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });

  // Reset zoom and position when floor changes
  useEffect(() => {
    setScale(1);
    setPosition({ x: 0, y: 0 });
  }, [floor.id]);

  // Handle wheel zoom
  const handleWheel = (e: React.WheelEvent) => {
    e.preventDefault();
    const delta = e.deltaY * -0.001;
    const newScale = Math.min(Math.max(0.5, scale + delta), 3);
    setScale(newScale);
  };

  // Handle touch/mouse drag
  const handlePointerDown = (e: React.PointerEvent) => {
    // Only start dragging if clicking on the container or image, not on markers
    const target = e.target as HTMLElement;
    if (target.closest('button')) return; // Don't drag when clicking markers
    
    setIsDragging(true);
    setDragStart({ x: e.clientX - position.x, y: e.clientY - position.y });
    e.currentTarget.setPointerCapture(e.pointerId);
  };

  const handlePointerMove = (e: React.PointerEvent) => {
    if (isDragging) {
      e.preventDefault();
      setPosition({
        x: e.clientX - dragStart.x,
        y: e.clientY - dragStart.y,
      });
    }
  };

  const handlePointerUp = (e: React.PointerEvent) => {
    setIsDragging(false);
    if (e.currentTarget.hasPointerCapture(e.pointerId)) {
      e.currentTarget.releasePointerCapture(e.pointerId);
    }
  };

  return (
    <div
      ref={containerRef}
      className="relative w-full h-full overflow-hidden bg-muted/50 rounded-lg border border-border touch-none select-none"
      onWheel={handleWheel}
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={handlePointerUp}
      onPointerCancel={handlePointerUp}
    >
      <div 
        ref={contentRef}
        className="relative w-full h-full flex items-center justify-center"
        style={{
          transform: `translate(${position.x}px, ${position.y}px) scale(${scale})`,
          transformOrigin: 'center center',
          transition: isDragging ? 'none' : 'transform 0.1s ease-out',
          cursor: isDragging ? 'grabbing' : 'grab',
          willChange: 'transform',
        }}
        onClick={(e) => {
          // Only trigger background click if we didn't drag
          if (!isDragging && e.target === e.currentTarget) {
            onBackgroundClick();
          }
        }}
      >
        {/* Floor SVG or placeholder */}
        <div className="relative w-full max-w-[1200px]">
          {!imgError ? (
            <img
              src={floor.svgPath}
              alt={floor.name}
              className="w-full h-auto opacity-80 select-none"
              onError={() => setImgError(true)}
              draggable={false}
            />
          ) : (
            <div className="w-full aspect-video bg-gradient-to-br from-secondary to-mauve-deep flex items-center justify-center rounded-lg">
              <div className="text-center">
                <span className="text-6xl block mb-4">🗺️</span>
                <h3 className="font-display text-xl text-foreground">{floor.name}</h3>
                <p className="text-muted-foreground text-sm font-body mt-1">Floor map not loaded</p>
                <p className="text-muted-foreground text-xs font-body mt-1">Place SVG at: {floor.svgPath}</p>
              </div>
            </div>
          )}

          {/* Markers overlay */}
          <div className="absolute inset-0 pointer-events-none">
            <div className="relative w-full h-full pointer-events-auto">
              {floor.markers.map((marker) => (
                <MapMarker
                  key={marker.id}
                  marker={marker}
                  isSelected={selectedMarker?.id === marker.id}
                  onClick={() => onMarkerClick(marker)}
                />
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Zoom controls */}
      <div className="absolute bottom-4 right-4 flex flex-col gap-2 bg-card/80 backdrop-blur-md border border-border rounded-lg p-1 shadow-lg">
        <button
          onClick={() => setScale(Math.min(scale + 0.2, 3))}
          className="w-8 h-8 flex items-center justify-center text-foreground hover:bg-secondary rounded transition-colors"
          aria-label="Zoom in"
        >
          +
        </button>
        <button
          onClick={() => setScale(Math.max(scale - 0.2, 0.5))}
          className="w-8 h-8 flex items-center justify-center text-foreground hover:bg-secondary rounded transition-colors"
          aria-label="Zoom out"
        >
          −
        </button>
        <button
          onClick={() => {
            setScale(1);
            setPosition({ x: 0, y: 0 });
          }}
          className="w-8 h-8 flex items-center justify-center text-xs text-foreground hover:bg-secondary rounded transition-colors"
          aria-label="Reset zoom"
        >
          ⟲
        </button>
      </div>
    </div>
  );
}
