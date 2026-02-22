export interface Marker {
  id: string;
  x: number;
  y: number;
  eventName: string;
  locationName: string;
  description?: string;
  logo?: string;
}

export interface Floor {
  id: string;
  name: string;
  svgPath: string;
  markers: Marker[];
}

export interface MapData {
  floors: Floor[];
  activeFloorId: string;
}
