import { useEffect, useRef } from 'react';
import { useSimulationStore } from '../store/simulationStore';
import { useDataStore } from '../store/dataStore';
import { PROCESS_STAGES, TOTAL_DURATION } from '../data/processStages';
import { SENSOR_CONFIGS } from '../data/sensorConfig';
import { generateSensorValue, getSensorStatus, generateMetrics } from '../utils/dataGenerator';
import { LIQUID_COLORS } from '../utils/constants';

export function useSimulation() {
  const {
    isPlaying,
    currentStage,
    elapsedTime,
    speed,
    parameters,
    setStage,
    setProgress,
    setElapsedTime,
    updateLiquidState,
    updateSensorData,
    complete,
  } = useSimulationStore();

  const { updateMetrics } = useDataStore();

  const animationFrameRef = useRef<number>();
  const lastTimeRef = useRef<number>(Date.now());

  useEffect(() => {
    if (!isPlaying) {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
      return;
    }

    const animate = () => {
      const now = Date.now();
      const deltaTime = (now - lastTimeRef.current) / 1000; // Convert to seconds
      lastTimeRef.current = now;

      // Update elapsed time based on speed multiplier
      const newElapsedTime = elapsedTime + deltaTime * speed;
      setElapsedTime(newElapsedTime);

      // Calculate overall progress (0-100)
      const progress = Math.min(100, (newElapsedTime / TOTAL_DURATION) * 100);
      setProgress(progress);

      // Determine current stage based on elapsed time
      const stage = PROCESS_STAGES.find(
        (s) => newElapsedTime >= s.startTime && newElapsedTime < s.endTime
      );

      if (stage && stage.id !== currentStage) {
        setStage(stage.id);
        updateLiquidStateForStage(stage.id);
      }

      // Update sensor data
      SENSOR_CONFIGS.forEach((sensor) => {
        const value = generateSensorValue(
          sensor.type,
          currentStage,
          parameters,
          newElapsedTime
        );
        const status = getSensorStatus(value, sensor.normalRange);
        updateSensorData(sensor.id, value, status);
      });

      // Update metrics
      const metrics = generateMetrics(currentStage, progress, parameters);
      updateMetrics(metrics);

      // Check if simulation is complete
      if (newElapsedTime >= TOTAL_DURATION) {
        complete();
        return;
      }

      // Continue animation loop
      animationFrameRef.current = requestAnimationFrame(animate);
    };

    // Start animation loop
    animationFrameRef.current = requestAnimationFrame(animate);

    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [
    isPlaying,
    elapsedTime,
    speed,
    currentStage,
    parameters,
    setStage,
    setProgress,
    setElapsedTime,
    updateSensorData,
    updateMetrics,
    complete,
  ]);

  // Update liquid state based on stage
  const updateLiquidStateForStage = (stage: number) => {
    const liquidStates = {
      0: { fillLevel: 0, color: LIQUID_COLORS.STAGE_0, opacity: 0.8, turbidity: 0 },
      1: { fillLevel: 0.75, color: LIQUID_COLORS.STAGE_1, opacity: 0.95, turbidity: 0.95 },
      2: { fillLevel: 0.75, color: LIQUID_COLORS.STAGE_2, opacity: 0.9, turbidity: 0.85 },
      3: { fillLevel: 0.75, color: LIQUID_COLORS.STAGE_3, opacity: 0.88, turbidity: 0.75 },
      4: { fillLevel: 0.7, color: LIQUID_COLORS.STAGE_4, opacity: 0.85, turbidity: 0.6 },
      5: { fillLevel: 0.7, color: LIQUID_COLORS.STAGE_5, opacity: 0.8, turbidity: 0.5 },
      6: { fillLevel: 0.65, color: LIQUID_COLORS.STAGE_6, opacity: 0.75, turbidity: 0.4 },
      7: { fillLevel: 0.6, color: LIQUID_COLORS.STAGE_7, opacity: 0.7, turbidity: 0.3 },
      8: { fillLevel: 0.55, color: LIQUID_COLORS.STAGE_8, opacity: 0.65, turbidity: 0.2 },
      9: { fillLevel: 0.5, color: LIQUID_COLORS.STAGE_9, opacity: 0.6, turbidity: 0.1 },
    };

    const liquidState = liquidStates[stage as keyof typeof liquidStates];
    if (liquidState) {
      updateLiquidState(liquidState);
    }
  };
}
