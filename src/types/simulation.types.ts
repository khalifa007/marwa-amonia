export type ProcessStage = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9;

export interface SimulationParameters {
  voltage: number; // 0-12V
  temperature: number; // 15-40°C
  pH: number; // 6-9
  flowRate: number; // 0-100 L/h
}

export interface ProcessStageInfo {
  id: ProcessStage;
  name: string;
  description: string;
  duration: number; // seconds
  startTime: number; // seconds from start
  endTime: number; // seconds from start
}

export interface LiquidState {
  fillLevel: number; // 0-1
  color: string; // hex color
  opacity: number; // 0-1
  turbidity: number; // 0-1
}

export interface SimulationState {
  isPlaying: boolean;
  isPaused: boolean;
  isComplete: boolean;
  currentStage: ProcessStage;
  progress: number; // 0-100
  elapsedTime: number; // seconds
  speed: number; // 0.5x, 1x, 2x, 4x
  parameters: SimulationParameters;
  autoPlayOnLoad: boolean;
  liquidState: LiquidState;
}
