import { create } from 'zustand';
import { Metrics, MetricTargets, TimeSeriesDataPoint } from '../types/data.types';
import { METRIC_TARGETS } from '../utils/constants';

interface DataStore {
  metrics: Metrics;
  targets: MetricTargets;
  historicalData: TimeSeriesDataPoint[];

  // Actions
  updateMetrics: (metrics: Partial<Metrics>) => void;
  addDataPoint: (dataPoint: TimeSeriesDataPoint) => void;
  resetData: () => void;
  calculateEfficiency: () => number;
}

const initialMetrics: Metrics = {
  energyProduced: 0,
  ammoniaExtracted: 0,
  mineralsRecovered: 0,
  efficiency: 0,
  co2Reduction: 0,
  waterRecovered: 0,
};

export const useDataStore = create<DataStore>((set, get) => ({
  metrics: { ...initialMetrics },
  targets: { ...METRIC_TARGETS },
  historicalData: [],

  updateMetrics: (newMetrics) => set((state) => ({
    metrics: { ...state.metrics, ...newMetrics },
  })),

  addDataPoint: (dataPoint) => set((state) => ({
    historicalData: [...state.historicalData, dataPoint],
  })),

  resetData: () => set({
    metrics: { ...initialMetrics },
    historicalData: [],
  }),

  calculateEfficiency: () => {
    const { metrics, targets } = get();
    const energyEff = (metrics.energyProduced / targets.energyProduced) * 100;
    const ammoniaEff = (metrics.ammoniaExtracted / targets.ammoniaExtracted) * 100;
    const mineralEff = (metrics.mineralsRecovered / targets.mineralsRecovered) * 100;

    return Math.min(100, (energyEff + ammoniaEff + mineralEff) / 3);
  },
}));
