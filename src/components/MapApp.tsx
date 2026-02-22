import React, { useEffect, useState } from "react";
import { Toaster } from "@/components/map/ui/toaster";
import { Toaster as Sonner } from "@/components/map/ui/sonner";
import { TooltipProvider } from "@/components/map/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useMapData } from "@/hooks/map/useMapData";
import FloorNavigator from "@/components/map/FloorNavigator";
import MapViewer from "@/components/map/MapViewer";
import EventSidebar from "@/components/map/EventSidebar";
import SearchBar from "@/components/map/SearchBar";
import { motion } from "framer-motion";
import "@/styles/map.css";
import { createPortal } from "react-dom";

const queryClient = new QueryClient();

const MapContent = () => {
  const {
    mapData,
    activeFloor,
    activeFloorId,
    setActiveFloorId,
    selectedMarker,
    setSelectedMarker,
    searchQuery,
    setSearchQuery,
    searchResults,
    navigateToEvent,
    allMarkers,
  } = useMapData();

  const [desktopContainer, setDesktopContainer] = useState<HTMLElement | null>(null);
  const [mobileContainer, setMobileContainer] = useState<HTMLElement | null>(null);

  useEffect(() => {
    setDesktopContainer(document.getElementById('desktop-search-container'));
    setMobileContainer(document.getElementById('mobile-search-container'));
  }, []);

  return (
    <div className="flex flex-col h-full bg-background overflow-hidden">
      {/* Portal search bars into header containers */}
      {desktopContainer && createPortal(
        <SearchBar
          query={searchQuery}
          onQueryChange={setSearchQuery}
          results={searchResults}
          onResultClick={navigateToEvent}
        />,
        desktopContainer
      )}
      
      {mobileContainer && createPortal(
        <SearchBar
          query={searchQuery}
          onQueryChange={setSearchQuery}
          results={searchResults}
          onResultClick={navigateToEvent}
        />,
        mobileContainer
      )}

      {/* Main */}
      <div className="flex flex-1 overflow-hidden relative">
        {/* Floor navigator - horizontal on mobile, vertical on desktop */}
        <div className="absolute top-2 md:top-3 left-2 md:left-3 z-20">
          <FloorNavigator
            floors={mapData.floors}
            activeFloorId={activeFloorId}
            onFloorChange={(id) => {
              setActiveFloorId(id);
              setSelectedMarker(null);
            }}
          />
        </div>

        {/* Floor label */}
        <div className="absolute top-2 md:top-3 left-1/2 -translate-x-1/2 z-20 flex items-center gap-2">
          <motion.div
            key={activeFloorId}
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-card/80 backdrop-blur-md border border-border rounded-lg px-3 md:px-4 py-1 md:py-1.5"
          >
            <span className="font-display text-xs md:text-sm font-bold text-foreground">{activeFloor.name}</span>
          </motion.div>
        </div>

        {/* Map */}
        <div className="flex-1 p-1 md:p-2">
          <MapViewer
            floor={activeFloor}
            selectedMarker={selectedMarker}
            onMarkerClick={setSelectedMarker}
            onBackgroundClick={() => setSelectedMarker(null)}
          />
        </div>

        {/* Event sidebar */}
        <EventSidebar
          marker={selectedMarker}
          floorName={activeFloor.name}
          onClose={() => setSelectedMarker(null)}
          allMarkers={allMarkers.map((m) => ({
            id: m.id,
            eventName: m.eventName,
            floorName: m.floorName,
          }))}
          onNavigateTo={navigateToEvent}
        />
      </div>
    </div>
  );
};

const MapApp = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <MapContent />
    </TooltipProvider>
  </QueryClientProvider>
);

export default MapApp;
