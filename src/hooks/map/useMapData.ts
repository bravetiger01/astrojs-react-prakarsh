import { useState, useCallback } from "react";
import { mapData as mapDataJson } from "@/data/map/mapData";

interface Marker {
  id: string;
  x: number;
  y: number;
  eventName: string;
  locationName: string;
  description?: string;
  logo?: string;
}

interface Floor {
  id: string;
  name: string;
  svgPath: string;
  markers: Marker[];
}

interface MapData {
  floors: Floor[];
  activeFloorId: string;
}

export function useMapData() {
  const [mapData] = useState<MapData>(mapDataJson as any);
  const [activeFloorId, setActiveFloorId] = useState(mapDataJson.activeFloorId);
  const [selectedMarker, setSelectedMarker] = useState<Marker | null>(null);
  const [searchQuery, setSearchQuery] = useState("");

  const activeFloor = mapData.floors.find((f) => f.id === activeFloorId) || mapData.floors[0];

  const allMarkers = mapData.floors.flatMap((f) =>
    f.markers.map((m) => ({ ...m, floorId: f.id, floorName: f.name }))
  );

  const searchResults = searchQuery.trim()
    ? allMarkers.filter((m) =>
        m.eventName.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : [];

  const navigateToEvent = useCallback(
    (markerId: string) => {
      for (const floor of mapData.floors) {
        const marker = floor.markers.find((m) => m.id === markerId);
        if (marker) {
          setActiveFloorId(floor.id);
          setSelectedMarker(marker);
          break;
        }
      }
    },
    [mapData.floors]
  );

  return {
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
  };
}
