import { ProcessStageInfo } from '../types/simulation.types';

export const PROCESS_STAGES: ProcessStageInfo[] = [
  {
    id: 0,
    name: 'Initial State',
    description: 'System ready, empty container',
    duration: 2,
    startTime: 0,
    endTime: 2,
  },
  {
    id: 1,
    name: 'Sanitation Input',
    description: 'Filling container with waste material',
    duration: 10,
    startTime: 2,
    endTime: 12,
  },
  {
    id: 2,
    name: 'Data Collection',
    description: 'Sensors analyzing waste composition',
    duration: 8,
    startTime: 12,
    endTime: 20,
  },
  {
    id: 3,
    name: 'AI Processing',
    description: 'AI optimizing extraction parameters',
    duration: 8,
    startTime: 20,
    endTime: 28,
  },
  {
    id: 4,
    name: 'Electrical Extraction',
    description: 'Extracting ammonia using electrolysis',
    duration: 22,
    startTime: 28,
    endTime: 50,
  },
  {
    id: 5,
    name: 'Complete',
    description: 'Process finished, results available',
    duration: 10,
    startTime: 50,
    endTime: 60,
  },
];

export const TOTAL_DURATION = 60; // 1 minute total
