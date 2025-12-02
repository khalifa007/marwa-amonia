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
        1: 1 + time * 0.05,
        2: 2 + time * 0.08,
        3: 3 + time * 0.1,
        4: 2.5 + time * 0.07,
        5: 2 + time * 0.05,
        6: 5 + time * 0.15,
        7: 6 + time * 0.1,
        8: 3 + time * 0.05,
        9: 1,
      }[stage] || 0;
      return baseTemp + tempVariation + noise * 0.5;

    case 'ph':
      const basePh = parameters.pH;
      const phShift = {
        0: 0,
        1: -0.5,
        2: -0.6,
        3: -0.4,
        4: -0.2,
        5: 0,
        6: 0.1,
        7: 0.2,
        8: 0.3,
        9: 0.2,
      }[stage] || 0;
      return Math.max(6, Math.min(9, basePh + phShift + noise * 0.1));

    case 'pressure':
      const basePressure = 101;
      const pressureVariation = {
        0: 0,
        1: 1,
        2: 1.5,
        3: 2,
        4: 2.5,
        5: 2,
        6: 5,
        7: 8,
        8: 3,
        9: 1,
      }[stage] || 0;
      return basePressure + pressureVariation + noise * 0.5;

    case 'ammonia':
      const ammoniaPpm = {
        0: 2,
        1: 15 + time * 1,
        2: 30 + time * 2,
        3: 45 + time * 3,
        4: 50 + time * 4,
        5: 55 + time * 4,
        6: 100 + time * 10,
        7: 200 + time * 20,
        8: 150 + time * 5,
        9: 300,
      }[stage] || 0;
      return Math.max(0, ammoniaPpm + noise * 10);

    case 'conductivity':
      const baseConductivity = {
        0: 1,
        1: 10 + time * 0.3,
        2: 12 + time * 0.4,
        3: 11 + time * 0.3,
        4: 9 + time * 0.2,
        5: 7 + time * 0.1,
        6: 15 + time * 0.5,
        7: 12 + time * 0.3,
        8: 8 + time * 0.2,
        9: 5,
      }[stage] || 5;
      return baseConductivity + noise * 0.5;

    case 'flowRate':
      const flowRate = parameters.flowRate;
      const flowVariation = {
        0: 0,
        1: 1,
        2: 0.9,
        3: 0.85,
        4: 0.8,
        5: 0.75,
        6: 0.7,
        7: 0.5,
        8: 0.6,
        9: 0.3,
      }[stage] || 0;
      return flowRate * flowVariation + noise * 2;

    case 'oxygen':
      const oxygenLevel = {
        0: 21,
        1: 18 - time * 0.2,
        2: 16 - time * 0.3,
        3: 14 - time * 0.4,
        4: 12 - time * 0.3,
        5: 10 - time * 0.2,
        6: 8 - time * 0.15,
        7: 6 - time * 0.1,
        8: 7,
        9: 8,
      }[stage] || 20;
      return Math.max(0, Math.min(100, oxygenLevel + noise * 2));

    case 'voltage':
      const voltage = parameters.voltage;
      const voltageActive = {
        0: 0,
        1: 0,
        2: 0,
        3: 0,
        4: 0,
        5: 0,
        6: voltage * (0.8 + time * 0.015),
        7: voltage * (0.9 + time * 0.01),
        8: 0,
        9: 0,
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

  // Energy production starts at electrolysis (stage 6)
  const energyProduced = stage >= 6
    ? (12 + stageProgress * 3) * (parameters.voltage / 8)
    : 0;

  // Ammonia extraction happens during electrolysis (stage 6) and synthesis (stage 7)
  const ammoniaExtracted = stage >= 6
    ? (18 + stageProgress * 7) * (parameters.flowRate / 50)
    : 0;

  // Minerals recovered during separation (stage 2) and biological process (stage 3)
  const mineralsRecovered = stage >= 2
    ? (3 + stageProgress * 2) * (parameters.temperature / 25)
    : 0;

  // Water recovery happens during water recycling (stage 8)
  const waterRecovered = stage >= 8
    ? (60 + stageProgress * 15)
    : stage >= 2
    ? (20 + stageProgress * 5)
    : 0;

  const co2Reduction = energyProduced * 0.7;

  // Efficiency increases throughout the process, peaks at ammonia synthesis
  const efficiency = stage >= 6
    ? Math.min(100, 70 + stageProgress * 15 + (parameters.voltage / 12) * 10)
    : stage >= 2
    ? Math.min(100, 40 + stageProgress * 10)
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
