import { create } from 'zustand';
import { SimulationState, ProcessStage, SimulationParameters, LiquidState } from '../types/simulation.types';
import { DEFAULT_PARAMETERS, LIQUID_COLORS } from '../utils/constants';
import { SensorMap } from '../types/sensor.types';
import { SENSOR_CONFIGS } from '../data/sensorConfig';

interface SimulationStore extends SimulationState {
  sensorData: SensorMap;

  // Actions
  play: () => void;
  pause: () => void;
  reset: () => void;
  setStage: (stage: ProcessStage) => void;
  setProgress: (progress: number) => void;
  setElapsedTime: (time: number) => void;
  setSpeed: (speed: number) => void;
  updateParameters: (params: Partial<SimulationParameters>) => void;
  updateLiquidState: (state: Partial<LiquidState>) => void;
  updateSensorData: (sensorId: string, value: number, status: 'normal' | 'warning' | 'critical' | 'idle') => void;
  complete: () => void;
}

const initialLiquidState: LiquidState = {
  fillLevel: 0,
  color: LIQUID_COLORS.STAGE_0,
  opacity: 0.8,
  turbidity: 0.9,
};

const initializeSensorData = (): SensorMap => {
  const sensorMap: SensorMap = {};
  SENSOR_CONFIGS.forEach((config) => {
    sensorMap[config.id] = {
      ...config,
      currentValue: config.minValue,
      readings: [],
      isActive: false,
    };
  });
  return sensorMap;
};

export const useSimulationStore = create<SimulationStore>((set) => ({
  isPlaying: false,
  isPaused: false,
  isComplete: false,
  currentStage: 0,
  progress: 0,
  elapsedTime: 0,
  speed: 1,
  parameters: { ...DEFAULT_PARAMETERS },
  autoPlayOnLoad: true,
  liquidState: { ...initialLiquidState },
  sensorData: initializeSensorData(),

  play: () => set({ isPlaying: true, isPaused: false }),

  pause: () => set({ isPlaying: false, isPaused: true }),

  reset: () => set({
    isPlaying: false,
    isPaused: false,
    isComplete: false,
    currentStage: 0,
    progress: 0,
    elapsedTime: 0,
    liquidState: { ...initialLiquidState },
    sensorData: initializeSensorData(),
  }),

  setStage: (stage) => set({ currentStage: stage }),

  setProgress: (progress) => set({ progress }),

  setElapsedTime: (time) => set({ elapsedTime: time }),

  setSpeed: (speed) => set({ speed }),

  updateParameters: (params) => set((state) => ({
    parameters: { ...state.parameters, ...params },
  })),

  updateLiquidState: (liquidState) => set((state) => ({
    liquidState: { ...state.liquidState, ...liquidState },
  })),

  updateSensorData: (sensorId, value, status) => set((state) => {
    const sensor = state.sensorData[sensorId];
    if (!sensor) return state;

    const newReading = {
      timestamp: Date.now(),
      value,
      status,
    };

    return {
      sensorData: {
        ...state.sensorData,
        [sensorId]: {
          ...sensor,
          currentValue: value,
          readings: [...sensor.readings.slice(-100), newReading], // Keep last 100 readings
          isActive: status !== 'idle',
        },
      },
    };
  }),

  complete: () => set({ isPlaying: false, isComplete: true }),
}));
