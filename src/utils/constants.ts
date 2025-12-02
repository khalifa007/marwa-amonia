// Container dimensions
export const CONTAINER_RADIUS = 2;
export const CONTAINER_HEIGHT = 6;
export const CONTAINER_SEGMENTS = 64;

// Liquid colors by stage
export const LIQUID_COLORS = {
  STAGE_0: '#0F172A', // Empty (dark)
  STAGE_1: '#3E2723', // Raw wastewater (dark brown)
  STAGE_2: '#5D4037', // Separation (murky brown after solid removal)
  STAGE_3: '#8D6E63', // Biological process (lighter brown)
  STAGE_4: '#A1887F', // Water polishing (tan/beige - cleaner)
  STAGE_5: '#BCAAA4', // Salinity reduction (light tan)
  STAGE_6: '#90CAF9', // Electrolysis (light blue - ions separating)
  STAGE_7: '#64B5F6', // Ammonia synthesis (medium blue)
  STAGE_8: '#42A5F5', // Water recycling (blue - chlorinated)
  STAGE_9: '#B3E5FC', // Complete (very light blue - clean water)
};

// Particle configuration
export const PARTICLE_CONFIG = {
  AMMONIA_BUBBLES: {
    count: 3000,
    size: 0.05,
    speed: 0.5,
    color: '#FFEB3B',
  },
  MINERALS: {
    count: 500,
    size: 0.08,
    speed: 0.1,
    colors: ['#8D6E63', '#6D4C41', '#5D4037'],
  },
  ELECTRICAL: {
    count: 100,
    size: 0.03,
    speed: 2,
    color: '#FFFFFF',
  },
};

// Animation speeds
export const SPEED_MULTIPLIERS = {
  SLOW: 0.5,
  NORMAL: 1,
  FAST: 2,
  VERY_FAST: 4,
};

// Sound configuration
export const SOUND_CONFIG = {
  VOLUME: {
    AMBIENT: 0.3,
    BUBBLING: 0.5,
    ELECTRICAL: 0.6,
    BEEP: 0.4,
    SUCCESS: 0.7,
  },
};

// UI Colors
export const UI_COLORS = {
  PRIMARY: '#0EA5E9',
  SECONDARY: '#8B5CF6',
  ACCENT: '#10B981',
  WARNING: '#F59E0B',
  ERROR: '#EF4444',
  BACKGROUND_DARK: '#0F172A',
  BACKGROUND_LIGHT: '#1E293B',
  TEXT_PRIMARY: '#F8FAFC',
  TEXT_SECONDARY: '#CBD5E1',
};

// Default simulation parameters
export const DEFAULT_PARAMETERS = {
  voltage: 8,
  temperature: 25,
  pH: 7.5,
  flowRate: 50,
};

// Metric targets
export const METRIC_TARGETS = {
  energyProduced: 15, // kWh
  ammoniaExtracted: 25, // L
  mineralsRecovered: 5, // kg
  efficiency: 85, // %
  co2Reduction: 10, // kg
  waterRecovered: 75, // L
};

// Camera settings
export const CAMERA_CONFIG = {
  INITIAL_POSITION: [8, 4, 8] as [number, number, number],
  FOV: 45,
  NEAR: 0.1,
  FAR: 1000,
  MIN_DISTANCE: 5,
  MAX_DISTANCE: 30,
};
