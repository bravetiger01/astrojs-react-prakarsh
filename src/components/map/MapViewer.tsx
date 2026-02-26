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
  const [imgLoaded, setImgLoaded] = useState(false);
  const [scale, setScale] = useState(1);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const [initialPinchDistance, setInitialPinchDistance] = useState<number | null>(null);
  const [initialScale, setInitialScale] = useState(1);

  // Reset zoom, position, and loading state when floor changes
  useEffect(() => {
    setScale(1);
    setPosition({ x: 0, y: 0 });
    setImgLoaded(false);
    setImgError(false);
  }, [floor.id]);

  // Calculate distance between two touch points
  const getTouchDistance = (touches: React.TouchList) => {
    if (touches.length < 2) return 0;
    const touch1 = touches[0];
    const touch2 = touches[1];
    const dx = touch1.clientX - touch2.clientX;
    const dy = touch1.clientY - touch2.clientY;
    return Math.sqrt(dx * dx + dy * dy);
  };

  // Handle touch start for pinch zoom
  const handleTouchStart = (e: React.TouchEvent) => {
    if (e.touches.length === 2) {
      // Two fingers - start pinch zoom
      e.preventDefault();
      const distance = getTouchDistance(e.touches);
      setInitialPinchDistance(distance);
      setInitialScale(scale);
      setIsDragging(false);
    } else if (e.touches.length === 1) {
      // Single finger - start drag
      const touch = e.touches[0];
      setIsDragging(true);
      setDragStart({ x: touch.clientX - position.x, y: touch.clientY - position.y });
      setInitialPinchDistance(null);
    }
  };

  // Handle touch move for pinch zoom and drag
  const handleTouchMove = (e: React.TouchEvent) => {
    if (e.touches.length === 2 && initialPinchDistance !== null) {
      // Two fingers - pinch zoom
      e.preventDefault();
      const currentDistance = getTouchDistance(e.touches);
      const scaleChange = currentDistance / initialPinchDistance;
      const newScale = Math.min(Math.max(0.9, initialScale * scaleChange), 5); // Min zoom 0.9
      setScale(newScale);
    } else if (e.touches.length === 1 && isDragging && initialPinchDistance === null) {
      // Single finger - drag
      e.preventDefault();
      const touch = e.touches[0];
      const newX = touch.clientX - dragStart.x;
      const newY = touch.clientY - dragStart.y;
      
      // Apply asymmetric boundaries on desktop
      const isDesktop = window.innerWidth >= 1024;
      
      console.log('Touch drag - isDesktop:', isDesktop, 'window width:', window.innerWidth);
      
      // Horizontal boundaries
      const baseMaxPanX = isDesktop ? 200 : 350;
      
      // Vertical boundaries - ASYMMETRIC - FIXED (not scaled with zoom on desktop)
      const baseMaxPanUp = isDesktop ? 450 : 450;   // Pan UP limit - increased for desktop
      const baseMaxPanDown = isDesktop ? 550 : 350; // Pan DOWN limit
      
      console.log('Touch boundaries - maxPanUp:', baseMaxPanUp, 'maxPanDown:', baseMaxPanDown);
      
      const minZoom = 0.9;
      const zoomFactor = Math.max(scale / minZoom, 1);
      
      // Desktop: fixed boundaries, Mobile: scale with zoom
      const maxPanX = isDesktop ? baseMaxPanX : baseMaxPanX * zoomFactor;
      const maxPanUp = isDesktop ? baseMaxPanUp : baseMaxPanUp * zoomFactor;
      const maxPanDown = isDesktop ? baseMaxPanDown : baseMaxPanDown * zoomFactor;
      
      const clampedX = Math.max(-maxPanX, Math.min(maxPanX, newX));
      const clampedY = Math.max(-maxPanUp, Math.min(maxPanDown, newY));
      
      setPosition({ x: clampedX, y: clampedY });
    }
  };

  // Handle touch end
  const handleTouchEnd = (e: React.TouchEvent) => {
    if (e.touches.length < 2) {
      setInitialPinchDistance(null);
    }
    if (e.touches.length === 0) {
      setIsDragging(false);
    }
  };

  // Handle wheel zoom
  const handleWheel = (e: React.WheelEvent) => {
    e.preventDefault();
    const delta = e.deltaY * -0.001;
    const newScale = Math.min(Math.max(0.9, scale + delta), 5); // Min zoom 0.9 (was 0.6) to prevent seeing edges
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
      
      // Asymmetric boundaries to prevent seeing edges/watermark
      // Desktop: stricter limits, Mobile: more lenient
      const isDesktop = window.innerWidth >= 1024;
      
      console.log('Pointer drag - isDesktop:', isDesktop, 'window width:', window.innerWidth);
      
      // Horizontal boundaries (left/right)
      const baseMaxPanX = isDesktop ? 200 : 350;
      
      // Vertical boundaries (up/down) - ASYMMETRIC
      const baseMaxPanUp = isDesktop ? 450 : 450;   // How far you can pan UP (negative Y) - increased for desktop
      const baseMaxPanDown = isDesktop ? 550 : 350; // How far you can pan DOWN (positive Y)
      
      console.log('Pointer boundaries - maxPanUp:', baseMaxPanUp, 'maxPanDown:', baseMaxPanDown, 'newY:', newY);
      
      // When zooming in, allow MORE panning to reach all parts of the map
      const minZoom = 0.9;
      const zoomFactor = Math.max(scale / minZoom, 1);
      
      // Desktop: fixed boundaries, Mobile: scale with zoom
      const maxPanX = isDesktop ? baseMaxPanX : baseMaxPanX * zoomFactor;
      const maxPanUp = isDesktop ? baseMaxPanUp : baseMaxPanUp * zoomFactor;
      const maxPanDown = isDesktop ? baseMaxPanDown : baseMaxPanDown * zoomFactor;
      
      // Clamp the position with asymmetric vertical boundaries
      const clampedX = Math.max(-maxPanX, Math.min(maxPanX, newX));
      const clampedY = Math.max(-maxPanUp, Math.min(maxPanDown, newY));
      
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
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
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
        {/* Desktop Background - landscape, zoomed in to hide watermark */}
        <div 
          className="hidden md:block absolute pointer-events-none"
          style={{
            backgroundImage: 'url(/background/map-bg-desktop.avif)',
            backgroundSize: 'cover',
            backgroundRepeat: 'no-repeat',
            backgroundPosition: 'center',
            width: '180vw',
            height: '180vh',
            left: '50%',
            top: '50%',
            transform: 'translate(-50%, -50%) scale(1.5)',
            filter: 'blur(0.5px)',
          }}
        />
        
        {/* Mobile background - portrait */}
        <div 
          className="md:hidden absolute pointer-events-none"
          style={{
            backgroundImage: 'url(/background/map-bg-mobile.avif)',
            backgroundSize: 'cover',
            backgroundRepeat: 'no-repeat',
            backgroundPosition: 'center',
            width: '140vw',
            height: '140vh',
            left: '50%',
            top: '50%',
            transform: 'translate(-50%, -50%) scale(1.3)',
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
              {/* Loading spinner while SVG loads */}
              {!imgLoaded && (
                <div className="absolute inset-0 flex items-center justify-center bg-[#e8d4b8]/80 rounded-lg z-10">
                  <div className="text-center">
                    <div className="w-12 h-12 border-4 border-[#8b6f47] border-t-transparent rounded-full animate-spin mx-auto mb-2"></div>
                    <p className="text-sm text-[#8b6f47] font-semibold">Loading {floor.name}...</p>
                  </div>
                </div>
              )}
              
              <img
                src={floor.svgPath}
                alt={floor.name}
                className="relative w-auto h-auto select-none"
                style={{
                  filter: 'drop-shadow(0 4px 12px rgba(139, 111, 71, 0.3))',
                  mixBlendMode: 'multiply',
                  maxWidth: '1200px',
                  opacity: imgLoaded ? 1 : 0,
                  transition: 'opacity 0.3s ease-in',
                }}
                onLoad={() => setImgLoaded(true)}
                onError={() => setImgError(true)}
                draggable={false}
              />
              
              {/* Markers overlay - only show when image is loaded */}
              {imgLoaded && (
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
              )}
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
          onClick={() => setScale(Math.max(scale - 0.2, 0.9))}
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
