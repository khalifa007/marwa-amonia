import { create } from 'zustand';

interface UIStore {
  selectedSensor: string | null;
  showModal: boolean;
  isExporting: boolean;
  showControls: boolean;

  // Actions
  selectSensor: (sensorId: string | null) => void;
  closeModal: () => void;
  setExporting: (isExporting: boolean) => void;
  toggleControls: () => void;
}

export const useUIStore = create<UIStore>((set) => ({
  selectedSensor: null,
  showModal: false,
  isExporting: false,
  showControls: true,

  selectSensor: (sensorId) => set({
    selectedSensor: sensorId,
    showModal: sensorId !== null
  }),

  closeModal: () => set({
    showModal: false,
    selectedSensor: null
  }),

  setExporting: (isExporting) => set({ isExporting }),

  toggleControls: () => set((state) => ({
    showControls: !state.showControls
  })),
}));
