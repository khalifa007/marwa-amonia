import { useEffect, useState } from 'react';
import { Button } from './components/shared/Button';
import { Card } from './components/shared/Card';
import { Modal } from './components/shared/Modal';
import { ProcessInfo } from './components/shared/ProcessInfo';
import { useSimulationStore } from './store/simulationStore';
import { useDataStore } from './store/dataStore';
import { useSimulation } from './hooks/useSimulation';
import { Container2D } from './components/2d/Container2D';

function App() {
  const [isProcessInfoOpen, setIsProcessInfoOpen] = useState(false);

  const {
    isPlaying,
    currentStage,
    progress,
    elapsedTime,
    play,
    pause,
    reset
  } = useSimulationStore();

  const { metrics } = useDataStore();

  // Run simulation engine
  useSimulation();

  // Auto-play on mount
  useEffect(() => {
    const timer = setTimeout(() => {
      play();
    }, 1000);
    return () => clearTimeout(timer);
  }, [play]);

  return (
    <div className="w-full h-full bg-background-dark text-white">
      {/* Header */}
      <header className="glass border-b border-white/10 px-6 py-4 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold gradient-text">OmaniMonia</h1>
          <p className="text-sm text-gray-400">Ammonia Extraction Simulation</p>
        </div>
        <div className="flex gap-3">
          <Button variant="accent" size="sm" onClick={() => setIsProcessInfoOpen(true)}>
            ℹ️ Process Info
          </Button>
          <Button variant="primary" size="sm" onClick={() => alert('Screenshot feature coming soon!')}>
            📸 Screenshot
          </Button>
          <Button variant="secondary" size="sm" onClick={() => alert('Export feature coming soon!')}>
            📊 Export Data
          </Button>
        </div>
      </header>

      {/* Main Content */}
      <div className="flex h-[calc(100vh-80px)]">
        {/* Left Sidebar - Process Stages */}
        <aside className="w-64 glass border-r border-white/10 p-4">
          <Card title="Process Stages">
            <div className="space-y-3">
              {['Initial', 'Input', 'Sensing', 'AI Process', 'Extract', 'Complete'].map((stage, index) => (
                <div
                  key={index}
                  className={`p-3 rounded-lg transition-all ${
                    currentStage === index
                      ? 'bg-primary/20 border-2 border-primary'
                      : 'bg-white/5 border border-white/10'
                  }`}
                >
                  <div className="flex items-center gap-2">
                    <div
                      className={`w-3 h-3 rounded-full ${
                        currentStage === index ? 'bg-primary animate-pulse-glow' : 'bg-gray-600'
                      }`}
                    />
                    <span className="font-medium">{stage}</span>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </aside>

        {/* Center - 2D Animated Container */}
        <main className="flex-1 relative bg-gradient-to-b from-background-dark to-background-light">
          {/* 2D SVG Container */}
          <div className="absolute inset-0">
            <Container2D />
          </div>

          {/* Overlay Controls */}
          <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-10">
            <div className="glass rounded-lg p-4 flex items-center gap-4">
              {isPlaying ? (
                <Button variant="accent" onClick={pause} size="lg">
                  ⏸ Pause
                </Button>
              ) : (
                <Button variant="primary" onClick={play} size="lg">
                  ▶ Play
                </Button>
              )}
              <Button variant="ghost" onClick={reset} size="lg">
                🔄 Reset
              </Button>
              <div className="ml-4 border-l border-white/20 pl-4">
                <div className="text-sm text-gray-400 mb-1">Progress</div>
                <div className="w-48 h-2 bg-white/10 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-primary to-accent transition-all duration-300"
                    style={{ width: `${progress}%` }}
                  />
                </div>
                <div className="text-xs text-gray-400 mt-1 text-center">
                  {Math.round(progress)}%
                </div>
              </div>
            </div>
          </div>

          {/* Stage Name Overlay */}
          <div className="absolute top-8 left-1/2 transform -translate-x-1/2 z-10">
            <div className="glass rounded-lg px-6 py-3">
              <div className="text-sm text-gray-400">Current Stage</div>
              <div className="text-xl font-bold gradient-text">
                {['Initial', 'Input', 'Sensing', 'AI Process', 'Extraction', 'Complete'][currentStage]}
              </div>
            </div>
          </div>
        </main>

        {/* Right Sidebar - Metrics */}
        <aside className="w-80 glass border-l border-white/10 p-4">
          <Card title="Live Metrics">
            <div className="space-y-4">
              <MetricItem
                label="Energy Produced"
                value={metrics.energyProduced}
                unit="kWh"
                color="text-yellow-400"
              />
              <MetricItem
                label="Ammonia Extracted"
                value={metrics.ammoniaExtracted}
                unit="L"
                color="text-blue-400"
              />
              <MetricItem
                label="Minerals Recovered"
                value={metrics.mineralsRecovered}
                unit="kg"
                color="text-green-400"
              />
              <MetricItem
                label="Efficiency"
                value={metrics.efficiency}
                unit="%"
                color="text-purple-400"
              />
              <MetricItem
                label="CO2 Reduction"
                value={metrics.co2Reduction}
                unit="kg"
                color="text-emerald-400"
              />
              <MetricItem
                label="Water Recovered"
                value={metrics.waterRecovered}
                unit="L"
                color="text-cyan-400"
              />
            </div>
          </Card>

          <Card title="Parameters" className="mt-4">
            <div className="space-y-3 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-400">Voltage:</span>
                <span className="font-mono">8.0 V</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">Temperature:</span>
                <span className="font-mono">25.0 °C</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">pH:</span>
                <span className="font-mono">7.5</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">Flow Rate:</span>
                <span className="font-mono">50 L/h</span>
              </div>
            </div>
          </Card>
        </aside>
      </div>

      {/* Footer Timeline */}
      <footer className="glass border-t border-white/10 px-6 py-3">
        <div className="flex items-center justify-between text-sm">
          <span className="text-gray-400">Stage: {currentStage + 1}/6</span>
          <span className="text-gray-400">Time: {formatTime(elapsedTime)} / 1:00</span>
          <span className="text-gray-400">Speed: 1x</span>
        </div>
      </footer>

      {/* Process Information Modal */}
      <Modal
        isOpen={isProcessInfoOpen}
        onClose={() => setIsProcessInfoOpen(false)}
        title="Treatment Process"
      >
        <ProcessInfo />
      </Modal>
    </div>
  );
}

interface MetricItemProps {
  label: string;
  value: number;
  unit: string;
  color: string;
}

function MetricItem({ label, value, unit, color }: MetricItemProps) {
  return (
    <div className="bg-white/5 rounded-lg p-3">
      <div className="text-sm text-gray-400 mb-1">{label}</div>
      <div className="flex items-baseline gap-2">
        <span className={`text-2xl font-bold font-mono ${color}`}>
          {value.toFixed(2)}
        </span>
        <span className="text-sm text-gray-400">{unit}</span>
      </div>
    </div>
  );
}

// Helper function to format time
function formatTime(seconds: number): string {
  const mins = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60);
  return `${mins}:${secs.toString().padStart(2, '0')}`;
}

export default App;
