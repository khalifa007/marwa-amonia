export type SensorType =
  | 'temperature'
  | 'ph'
  | 'pressure'
  | 'ammonia'
  | 'conductivity'
  | 'flowRate'
  | 'oxygen'
  | 'voltage';

export interface SensorConfig {
  id: string;
  type: SensorType;
  name: string;
  unit: string;
  color: string; // hex color
  position: [number, number, number]; // [x, y, z]
  minValue: number;
  maxValue: number;
  normalRange: [number, number];
  icon?: string;
}

export interface SensorReading {
  timestamp: number;
  value: number;
  status: 'normal' | 'warning' | 'critical' | 'idle';
}

export interface SensorData extends SensorConfig {
  currentValue: number;
  readings: SensorReading[];
  isActive: boolean;
}

export type SensorMap = Record<string, SensorData>;
