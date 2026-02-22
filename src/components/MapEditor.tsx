import { useState } from 'react';
import { mapData } from '../data/map/mapData';

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

export default function MapEditor() {
  const [floors, setFloors] = useState<Floor[]>(mapData.floors);
  const [currentFloorIndex, setCurrentFloorIndex] = useState(0);
  const [draggingMarkerId, setDraggingMarkerId] = useState<string | null>(null);
  const [scale, setScale] = useState(1);

  const currentFloor = floors[currentFloorIndex];

  const handleMarkerSelect = (markerId: string) => {
    setDraggingMarkerId(markerId);
  };

  const handleMapClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!draggingMarkerId) return;

    // Get the image element to calculate relative position
    const imgElement = e.currentTarget.querySelector('img');
    if (!imgElement) return;

    const rect = imgElement.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;

    // Update marker position
    setFloors(prevFloors => {
      const newFloors = [...prevFloors];
      const floor = newFloors[currentFloorIndex];
      const markerIndex = floor.markers.findIndex(m => m.id === draggingMarkerId);
      
      if (markerIndex !== -1) {
        floor.markers[markerIndex] = {
          ...floor.markers[markerIndex],
          x: Math.max(0, Math.min(100, x)),
          y: Math.max(0, Math.min(100, y))
        };
      }
      
      return newFloors;
    });

    setDraggingMarkerId(null);
  };

  const exportData = () => {
    const exportObj = {
      floors: floors.map(floor => ({
        id: floor.id,
        name: floor.name,
        svgPath: floor.svgPath,
        markers: floor.markers.map(m => ({
          id: m.id,
          x: parseFloat(m.x.toFixed(2)),
          y: parseFloat(m.y.toFixed(2)),
          eventName: m.eventName,
          locationName: m.locationName
        }))
      }))
    };

    const dataStr = JSON.stringify(exportObj, null, 2);
    const dataBlob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(dataBlob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'updated-map-data.json';
    link.click();
    URL.revokeObjectURL(url);
  };

  const copyToClipboard = () => {
    const exportObj = {
      floors: floors.map(floor => ({
        id: floor.id,
        name: floor.name,
        svgPath: floor.svgPath,
        markers: floor.markers.map(m => ({
          id: m.id,
          x: parseFloat(m.x.toFixed(2)),
          y: parseFloat(m.y.toFixed(2)),
          eventName: m.eventName,
          locationName: m.locationName
        }))
      }))
    };

    navigator.clipboard.writeText(JSON.stringify(exportObj, null, 2));
    alert('Map data copied to clipboard!');
  };

  return (
    <div className="w-full h-screen bg-[#1a1625] text-white flex flex-col">
      {/* Header */}
      <div className="bg-gradient-to-r from-[#3c2a56] to-[#2a1e3d] border-b border-[#f1b5a2]/20 p-2 md:p-4">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-start md:items-center justify-between gap-2">
          <h1 className="text-lg md:text-2xl font-bold">Map Editor</h1>
          <div className="flex gap-2 flex-wrap text-sm">
            <a
              href="/map"
              className="px-3 py-1.5 md:px-4 md:py-2 bg-[#4a3566] text-white rounded-lg hover:bg-[#5a4576] transition-colors flex items-center gap-2"
            >
              <span>🗺️</span>
              <span>View Map</span>
            </a>
            <button
              onClick={exportData}
              className="px-3 py-1.5 md:px-4 md:py-2 bg-[#f1b5a2] text-black rounded-lg hover:bg-[#e89b88] transition-colors"
            >
              Download
            </button>
            <button
              onClick={copyToClipboard}
              className="px-3 py-1.5 md:px-4 md:py-2 bg-[#b7654a] text-white rounded-lg hover:bg-[#a05540] transition-colors"
            >
              Copy
            </button>
          </div>
        </div>
      </div>

      {/* Floor Selector */}
      <div className="bg-[#2a1e3d] border-b border-[#f1b5a2]/20 p-2 md:p-4">
        <div className="max-w-7xl mx-auto flex gap-2 overflow-x-auto">
          {floors.map((floor, index) => (
            <button
              key={floor.id}
              onClick={() => setCurrentFloorIndex(index)}
              className={`px-3 py-1.5 md:px-4 md:py-2 rounded-lg transition-colors text-sm whitespace-nowrap ${
                currentFloorIndex === index
                  ? 'bg-[#f1b5a2] text-black'
                  : 'bg-[#3c2a56] text-white hover:bg-[#4a3566]'
              }`}
            >
              {floor.name}
            </button>
          ))}
        </div>
      </div>

      {/* Instructions */}
      <div className="bg-[#2a1e3d]/50 border-b border-[#f1b5a2]/20 p-2 md:p-3">
        <div className="max-w-7xl mx-auto text-xs md:text-sm text-gray-300">
          <strong>How to use:</strong> 
          <span className="block md:inline md:ml-2">
            1️⃣ Click a marker in the list (right/bottom) to select it
          </span>
          <span className="block md:inline md:ml-2">
            2️⃣ Click anywhere on the map to move it there
          </span>
          {draggingMarkerId && (
            <span className="block md:inline md:ml-4 text-[#f1b5a2] font-semibold mt-1 md:mt-0">
              ✨ Selected: {currentFloor.markers.find(m => m.id === draggingMarkerId)?.eventName}
            </span>
          )}
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col lg:flex-row overflow-hidden">
        {/* Map Area */}
        <div className="flex-1 overflow-auto bg-[#1a1625] p-2 md:p-4">
          <div className="max-w-4xl mx-auto">
            <div className="mb-2 md:mb-4 flex gap-2 flex-wrap items-center">
              <button
                onClick={() => setScale(Math.min(scale + 0.2, 3))}
                className="px-3 py-1 bg-[#3c2a56] rounded hover:bg-[#4a3566] text-sm"
              >
                Zoom In
              </button>
              <button
                onClick={() => setScale(Math.max(scale - 0.2, 0.5))}
                className="px-3 py-1 bg-[#3c2a56] rounded hover:bg-[#4a3566] text-sm"
              >
                Zoom Out
              </button>
              <button
                onClick={() => setScale(1)}
                className="px-3 py-1 bg-[#3c2a56] rounded hover:bg-[#4a3566] text-sm"
              >
                Reset
              </button>
              <span className="text-sm text-gray-400 ml-2">
                Zoom: {Math.round(scale * 100)}%
              </span>
            </div>

            <div className="bg-[#2a1e3d] p-4 rounded-lg inline-block">
              <div
                className="relative bg-[#e8d4b8] rounded-lg border-2 border-[#8b6f47] cursor-crosshair"
                onClick={handleMapClick}
                style={{
                  width: '800px',
                  maxWidth: '100%',
                }}
              >
                <div
                  style={{
                    transform: `scale(${scale})`,
                    transformOrigin: 'top left',
                    width: '800px',
                  }}
                >
                  <div className="relative">
                    <img
                      src={currentFloor.svgPath}
                      alt={currentFloor.name}
                      className="w-full h-auto select-none pointer-events-none block"
                      draggable={false}
                      style={{ width: '800px' }}
                    />
                    
                    {/* Markers */}
                    <div className="absolute inset-0">
                      {currentFloor.markers.map((marker) => (
                        <div
                          key={marker.id}
                          className={`absolute rounded-full border-4 flex items-center justify-center font-bold cursor-pointer transition-all ${
                            draggingMarkerId === marker.id
                              ? 'bg-yellow-400 border-yellow-600 z-20 w-12 h-12 text-xl animate-pulse'
                              : 'bg-red-500 border-red-700 hover:scale-125 z-10 w-10 h-10 text-lg'
                          }`}
                          style={{
                            left: `${marker.x}%`,
                            top: `${marker.y}%`,
                            transform: 'translate(-50%, -50%)',
                            boxShadow: draggingMarkerId === marker.id 
                              ? '0 0 30px rgba(255, 255, 0, 1)' 
                              : '0 4px 12px rgba(0, 0, 0, 0.8)',
                          }}
                          title={marker.eventName}
                          onClick={(e) => {
                            e.stopPropagation();
                            handleMarkerSelect(marker.id);
                          }}
                        >
                          📍
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Marker List Sidebar */}
        <div className="w-full lg:w-80 bg-[#2a1e3d] border-t lg:border-t-0 lg:border-l border-[#f1b5a2]/20 overflow-auto max-h-64 lg:max-h-none">
          <div className="p-3 md:p-4">
            <h2 className="text-base md:text-lg font-bold mb-3 md:mb-4">
              Markers ({currentFloor.markers.length})
            </h2>
            <div className="space-y-2">
              {currentFloor.markers.map((marker) => (
                <button
                  key={marker.id}
                  onClick={() => handleMarkerSelect(marker.id)}
                  className={`w-full text-left p-2 md:p-3 rounded-lg transition-colors ${
                    draggingMarkerId === marker.id
                      ? 'bg-[#f1b5a2] text-black'
                      : 'bg-[#3c2a56] hover:bg-[#4a3566]'
                  }`}
                >
                  <div className="font-semibold text-xs md:text-sm">{marker.eventName}</div>
                  <div className="text-xs opacity-70 mt-1">{marker.locationName}</div>
                  <div className="text-xs opacity-50 mt-1">
                    x: {marker.x.toFixed(2)}%, y: {marker.y.toFixed(2)}%
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
