export interface Metrics {
  energyProduced: number; // kWh
  ammoniaExtracted: number; // Liters
  mineralsRecovered: number; // kg
  efficiency: number; // percentage 0-100
  co2Reduction: number; // kg
  waterRecovered: number; // Liters
}

export interface MetricTargets {
  energyProduced: number;
  ammoniaExtracted: number;
  mineralsRecovered: number;
  efficiency: number;
  co2Reduction: number;
  waterRecovered: number;
}

export interface TimeSeriesDataPoint {
  timestamp: number;
  energyProduced: number;
  ammoniaExtracted: number;
  temperature: number;
  pH: number;
  efficiency: number;
}

export interface ExportData {
  sessionId: string;
  timestamp: number;
  parameters: {
    voltage: number;
    temperature: number;
    pH: number;
    flowRate: number;
  };
  metrics: Metrics;
  sensorReadings: {
    sensorId: string;
    sensorName: string;
    readings: Array<{ timestamp: number; value: number }>;
  }[];
  duration: number;
  stages: string[];
}
