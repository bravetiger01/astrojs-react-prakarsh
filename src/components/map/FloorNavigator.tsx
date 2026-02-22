import { motion } from "framer-motion";

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

interface FloorNavigatorProps {
  floors: Floor[];
  activeFloorId: string;
  onFloorChange: (id: string) => void;
}

const floorLabels: Record<string, string> = {
  ground: "G",
  first: "1",
  second: "2",
  third: "3",
};

export default function FloorNavigator({ floors, activeFloorId, onFloorChange }: FloorNavigatorProps) {
  return (
    <div className="flex md:flex-col gap-1.5 bg-card/80 backdrop-blur-md border border-border rounded-lg p-1.5 md:p-2 shadow-lg">
      <span className="hidden md:block text-[10px] font-pixel text-primary text-center tracking-wider">FLOORS</span>
      {[...floors].reverse().map((floor) => {
        const isActive = floor.id === activeFloorId;
        return (
          <motion.button
            key={floor.id}
            whileHover={{ scale: 1.08 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => onFloorChange(floor.id)}
            className={`relative flex items-center justify-center gap-1 px-2 py-1.5 md:px-3 md:py-2 rounded-md text-xs font-display font-semibold transition-all ${
              isActive
                ? "bg-primary text-primary-foreground shadow-[var(--shadow-glow)]"
                : "bg-muted text-muted-foreground hover:bg-secondary hover:text-secondary-foreground"
            }`}
          >
            <span className="hidden md:inline whitespace-nowrap">{floor.name}</span>
            <span className="md:hidden text-sm">{floorLabels[floor.id] || floor.id[0].toUpperCase()}</span>
            {floor.markers.length > 0 && (
              <span className="absolute -top-1 -right-1 w-4 h-4 bg-copper-glow text-primary-foreground text-[8px] font-pixel rounded-full flex items-center justify-center">
                {floor.markers.length}
              </span>
            )}
          </motion.button>
        );
      })}
    </div>
  );
}
