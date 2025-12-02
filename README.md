# OmaniMonia - Ammonia Extraction Simulation

A professional 3D web simulation demonstrating ammonia extraction from sanitation waste using sensors, AI processing, and electrical separation. Built for investor demonstrations.

## Features

- 🧪 **3D Visualization**: Realistic glass container with liquid simulation
- 📊 **Real-time Metrics**: Live data tracking for energy, ammonia, minerals, and more
- 🎯 **8 Sensors**: Interactive sensor system with detailed readings
- 🤖 **AI Processing**: Visual simulation of AI optimization
- ⚡ **Electrical Extraction**: Animated ammonia separation process
- 🎵 **Sound Design**: Immersive audio effects synchronized with animations
- 📸 **Export Features**: Screenshot capture and CSV data export
- ▶️ **Auto-play**: Automatically starts on page load

## Technology Stack

- **Frontend**: React 18 + TypeScript
- **3D Graphics**: Three.js + React Three Fiber
- **State Management**: Zustand
- **Animations**: GSAP + Framer Motion
- **Styling**: Tailwind CSS
- **Build Tool**: Vite
- **Charts**: Recharts
- **Audio**: Howler.js

## Getting Started

### Prerequisites

- Node.js 18+
- npm or yarn

### Installation

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## Project Structure

```
src/
├── components/
│   ├── canvas/          # 3D Three.js components
│   ├── ui/              # UI overlay components
│   └── shared/          # Reusable components
├── store/               # Zustand state management
├── hooks/               # Custom React hooks
├── utils/               # Utility functions
├── types/               # TypeScript definitions
├── data/                # Configuration data
└── styles/              # Global styles
```

## Development Roadmap

### Phase 1: Foundation ✅
- [x] Project setup and configuration
- [x] Type definitions and data structures
- [x] State management with Zustand
- [x] Utility functions and constants

### Phase 2: 3D Scene (In Progress)
- [ ] Glass container with realistic material
- [ ] Liquid simulation with shaders
- [ ] Sensor markers and positioning
- [ ] Particle systems (bubbles, discharge, minerals)
- [ ] Lighting rig

### Phase 3: UI Components (In Progress)
- [x] Basic layout and header
- [x] Process stage indicator
- [x] Metrics panel
- [ ] Timeline controls with scrubber
- [ ] Parameter adjustment controls
- [ ] Sensor data modal

### Phase 4: Animation & Interaction
- [ ] GSAP timeline for process stages
- [ ] Camera controls (OrbitControls)
- [ ] Click interactions for sensors
- [ ] Smooth transitions between stages

### Phase 5: Sound & Effects
- [ ] Sound manager implementation
- [ ] Audio synchronization with stages
- [ ] Post-processing effects (bloom, SSAO)

### Phase 6: Export & Polish
- [ ] Screenshot capture
- [ ] CSV data export
- [ ] Loading screen
- [ ] Performance optimization

## Configuration

### Process Stages

The simulation runs through 6 stages over 3 minutes:
1. **Initial** (0-5s): Empty container
2. **Input** (5-35s): Filling with waste
3. **Sensing** (35-60s): Data collection
4. **AI Processing** (60-85s): Optimization
5. **Extraction** (85-150s): Ammonia separation
6. **Complete** (150-180s): Results display

### Sensors

8 sensors monitor the process:
- Temperature (°C)
- pH Level
- Pressure (kPa)
- Ammonia Concentration (ppm)
- Electrical Conductivity (mS/cm)
- Flow Rate (L/h)
- Oxygen Level (%)
- Voltage (V)

### Default Parameters

- Voltage: 8V
- Temperature: 25°C
- pH: 7.5
- Flow Rate: 50 L/h

## Performance

Target: 60 FPS on modern devices

Optimizations:
- Instanced rendering for particles
- Frustum culling
- Texture compression
- Component memoization
- Code splitting

## Browser Support

- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+

Requires WebGL 2.0 support.

## License

Proprietary - OmaniMonia

## Contact

For questions or support, please contact the development team.
