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
    const newScale = Math.min(Math.max(0.6, scale + delta), 5); // Min zoom 0.6 (was 0.8)
    setScale(newScale);
  };

  // Handle touch/mouse drag
  const handlePointerDown = (e: React.PointerEvent) => {
    const target = e.target as HTMLElement;
    if (target.closest('button')) return; // Don't drag when clicking markers
    
    setIsDragging(true);
    setDragStart({ x: e.clientX - position.x, y: e.clientY - position.y });
    e.currentTarget.setPointerCapture(e.pointerId);
  };

  const handlePointerMove = (e: React.PointerEvent) => {
    if (isDragging) {
      e.preventDefault();
      
      // Calculate new position
      const newX = e.clientX - dragStart.x;
      const newY = e.clientY - dragStart.y;
      
      // Define boundaries (adjust these values to control how far users can pan)
      // Smaller values = tighter boundaries
      const maxPanX = 400; // Maximum pixels to pan horizontally
      const maxPanY = 400; // Maximum pixels to pan vertically
      
      // Clamp the position within boundaries
      const clampedX = Math.max(-maxPanX, Math.min(maxPanX, newX));
      const clampedY = Math.max(-maxPanY, Math.min(maxPanY, newY));
      
      setPosition({
        x: clampedX,
        y: clampedY,
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
      className="relative w-full h-full overflow-hidden rounded-lg border border-[#8b6f47] touch-none select-none"
      style={{
        backgroundColor: '#1a1625',
      }}
      onWheel={handleWheel}
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={handlePointerUp}
      onPointerCancel={handlePointerUp}
    >
      <div 
        ref={contentRef}
        className="absolute inset-0"
        style={{
          transform: `translate(${position.x}px, ${position.y}px) scale(${scale})`,
          transformOrigin: 'center center',
          transition: isDragging ? 'none' : 'transform 0.1s ease-out',
          cursor: isDragging ? 'grabbing' : 'grab',
          willChange: 'transform',
        }}
        onClick={(e) => {
          if (!isDragging && e.target === e.currentTarget) {
            onBackgroundClick();
          }
        }}
      >
        {/* Background Image - Using actual dimensions */}
        <div 
          className="absolute pointer-events-none"
          style={{
            backgroundImage: 'url(/background/Gemini_Generated_Image_kpf6u6kpf6u6kpf6.png)',
            backgroundSize: 'contain',
            backgroundRepeat: 'repeat',
            backgroundPosition: 'center',
            width: '3000px',
            height: '5000px',
            left: '50%',
            top: '50%',
            transform: 'translate(-50%, -50%)',
          }}
        />
        
        {/* Parchment texture overlay */}
        <div 
          className="absolute pointer-events-none opacity-20"
          style={{
            backgroundImage: `
              repeating-linear-gradient(
                0deg,
                transparent,
                transparent 2px,
                rgba(139, 111, 71, 0.03) 2px,
                rgba(139, 111, 71, 0.03) 4px
              ),
              repeating-linear-gradient(
                90deg,
                transparent,
                transparent 2px,
                rgba(139, 111, 71, 0.03) 2px,
                rgba(139, 111, 71, 0.03) 4px
              )
            `,
            width: '3000px',
            height: '5000px',
            left: '50%',
            top: '50%',
            transform: 'translate(-50%, -50%)',
          }}
        />

        {/* Map centered */}
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
          {!imgError ? (
            <div className="relative">
              <img
                src={floor.svgPath}
                alt={floor.name}
                className="relative w-auto h-auto select-none"
                style={{
                  filter: 'drop-shadow(0 4px 12px rgba(139, 111, 71, 0.3))',
                  mixBlendMode: 'multiply',
                  maxWidth: '1200px',
                }}
                onError={() => setImgError(true)}
                draggable={false}
              />
              
              {/* Markers overlay */}
              <div className="absolute inset-0 pointer-events-none">
                <div className="relative w-full h-full pointer-events-auto">
                  {floor.markers.map((marker) => (
                    <MapMarker
                      key={marker.id}
                      marker={marker}
                      isSelected={selectedMarker?.id === marker.id}
                      onClick={() => onMarkerClick(marker)}
                      scale={scale}
                    />
                  ))}
                </div>
              </div>
            </div>
          ) : (
            <div className="w-[800px] aspect-video bg-gradient-to-br from-secondary to-mauve-deep flex items-center justify-center rounded-lg">
              <div className="text-center">
                <span className="text-6xl block mb-4">🗺️</span>
                <h3 className="font-display text-xl text-foreground">{floor.name}</h3>
                <p className="text-muted-foreground text-sm font-body mt-1">Floor map not loaded</p>
                <p className="text-muted-foreground text-xs font-body mt-1">Place SVG at: {floor.svgPath}</p>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Zoom controls */}
      <div className="absolute bottom-4 left-4 flex flex-col gap-2 bg-card/80 backdrop-blur-md border border-border rounded-lg p-1 shadow-lg z-10">
        <button
          onClick={() => setScale(Math.min(scale + 0.2, 5))}
          className="w-8 h-8 flex items-center justify-center text-foreground hover:bg-secondary rounded transition-colors font-bold text-lg"
          aria-label="Zoom in"
        >
          +
        </button>
        <button
          onClick={() => setScale(Math.max(scale - 0.2, 0.6))}
          className="w-8 h-8 flex items-center justify-center text-foreground hover:bg-secondary rounded transition-colors font-bold text-lg"
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
