import { ProcessStage, SimulationParameters } from '../types/simulation.types';
import { SensorType } from '../types/sensor.types';

// Generate realistic sensor readings based on stage and parameters
export function generateSensorValue(
  sensorType: SensorType,
  stage: ProcessStage,
  parameters: SimulationParameters,
  time: number
): number {
  const noise = (Math.random() - 0.5) * 2; // Random noise

  switch (sensorType) {
    case 'temperature':
      const baseTemp = parameters.temperature;
      const tempVariation = {
        0: 0,
        1: 2 + time * 0.1,
        2: 3 + time * 0.05,
        3: 4 + time * 0.03,
        4: 5 + time * 0.02,
        5: 2,
      }[stage] || 0;
      return baseTemp + tempVariation + noise * 0.5;

    case 'ph':
      const basePh = parameters.pH;
      const phShift = {
        0: 0,
        1: -0.3,
        2: -0.5,
        3: -0.2,
        4: 0.1,
        5: 0.2,
      }[stage] || 0;
      return Math.max(6, Math.min(9, basePh + phShift + noise * 0.1));

    case 'pressure':
      const basePressure = 101;
      const pressureVariation = {
        0: 0,
        1: 2,
        2: 1,
        3: 0,
        4: 3,
        5: 1,
      }[stage] || 0;
      return basePressure + pressureVariation + noise * 0.5;

    case 'ammonia':
      const ammoniaPpm = {
        0: 5,
        1: 20 + time * 2,
        2: 50 + time * 5,
        3: 80 + time * 8,
        4: 150 + time * 15,
        5: 300,
      }[stage] || 0;
      return Math.max(0, ammoniaPpm + noise * 10);

    case 'conductivity':
      const baseConductivity = {
        0: 2,
        1: 8 + time * 0.5,
        2: 12 + time * 0.3,
        3: 10 + time * 0.2,
        4: 15 + time * 0.1,
        5: 7,
      }[stage] || 5;
      return baseConductivity + noise * 0.5;

    case 'flowRate':
      const flowRate = parameters.flowRate;
      const flowVariation = {
        0: 0,
        1: 1,
        2: 0.8,
        3: 0.5,
        4: 0.3,
        5: 0,
      }[stage] || 0;
      return flowRate * flowVariation + noise * 2;

    case 'oxygen':
      const oxygenLevel = {
        0: 21,
        1: 18 - time * 0.5,
        2: 15 - time * 0.3,
        3: 12 - time * 0.2,
        4: 8 - time * 0.1,
        5: 5,
      }[stage] || 20;
      return Math.max(0, Math.min(100, oxygenLevel + noise * 2));

    case 'voltage':
      const voltage = parameters.voltage;
      const voltageActive = {
        0: 0,
        1: 0,
        2: 0,
        3: 0,
        4: voltage * (0.8 + time * 0.01),
        5: 0,
      }[stage] || 0;
      return voltageActive + noise * 0.2;

    default:
      return 0;
  }
}

// Determine sensor status based on value and normal range
export function getSensorStatus(
  value: number,
  normalRange: [number, number]
): 'normal' | 'warning' | 'critical' | 'idle' {
  const [min, max] = normalRange;
  const warningThreshold = (max - min) * 0.2;

  if (value === 0) return 'idle';
  if (value < min - warningThreshold || value > max + warningThreshold) return 'critical';
  if (value < min || value > max) return 'warning';
  return 'normal';
}

// Generate metrics based on stage progress
export function generateMetrics(stage: ProcessStage, progress: number, parameters: SimulationParameters) {
  const stageProgress = progress / 100;

  const energyProduced = stage >= 4
    ? (12 + stageProgress * 3) * (parameters.voltage / 8)
    : 0;

  const ammoniaExtracted = stage >= 4
    ? (18 + stageProgress * 7) * (parameters.flowRate / 50)
    : 0;

  const mineralsRecovered = stage >= 4
    ? (3 + stageProgress * 2) * (parameters.temperature / 25)
    : 0;

  const waterRecovered = stage >= 4
    ? (60 + stageProgress * 15)
    : 0;

  const co2Reduction = energyProduced * 0.7;

  const efficiency = stage >= 4
    ? Math.min(100, 70 + stageProgress * 15 + (parameters.voltage / 12) * 10)
    : 0;

  return {
    energyProduced: Math.round(energyProduced * 100) / 100,
    ammoniaExtracted: Math.round(ammoniaExtracted * 100) / 100,
    mineralsRecovered: Math.round(mineralsRecovered * 100) / 100,
    efficiency: Math.round(efficiency),
    co2Reduction: Math.round(co2Reduction * 100) / 100,
    waterRecovered: Math.round(waterRecovered * 100) / 100,
  };
}
