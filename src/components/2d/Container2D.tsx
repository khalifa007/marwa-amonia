import { motion } from 'framer-motion';
import { useSimulationStore } from '../../store/simulationStore';
import { SENSOR_CONFIGS } from '../../data/sensorConfig';
import { PROCESS_STAGES } from '../../data/processStages';

const CONTAINER_HEIGHT = 500;
const CONTAINER_WIDTH = 200;
const CONTAINER_X = 100;
const CONTAINER_Y = 50;

export function Container2D() {
  const { liquidState, currentStage, sensorData } = useSimulationStore();

  // Calculate liquid position and height with proper bounds
  const maxLiquidHeight = CONTAINER_HEIGHT - 6; // Account for stroke and padding
  const liquidHeight = Math.min(liquidState.fillLevel * CONTAINER_HEIGHT, maxLiquidHeight);
  const liquidY = Math.max(CONTAINER_Y + 3, CONTAINER_Y + CONTAINER_HEIGHT - liquidHeight - 3);

  return (
    <div className="relative w-full h-full flex items-center justify-center bg-gradient-to-b from-background-dark to-background-light">
      <svg
        width="100%"
        height="100%"
        viewBox="0 0 400 600"
        className="max-w-lg"
      >
        {/* Define gradients and clip paths */}
        <defs>
          {/* Glass gradient */}
          <linearGradient id="glass-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#06B6D4" stopOpacity="0.1" />
            <stop offset="50%" stopColor="#0EA5E9" stopOpacity="0.05" />
            <stop offset="100%" stopColor="#06B6D4" stopOpacity="0.1" />
          </linearGradient>

          {/* Liquid gradient for shimmer effect */}
          <linearGradient id="liquid-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor={liquidState.color} stopOpacity="0.9" />
            <stop offset="50%" stopColor={liquidState.color} stopOpacity="1" />
            <stop offset="100%" stopColor={liquidState.color} stopOpacity="0.9" />
          </linearGradient>

          {/* Clip path to keep liquid inside container */}
          <clipPath id="container-clip">
            <rect
              x={CONTAINER_X + 3}
              y={CONTAINER_Y + 3}
              width={CONTAINER_WIDTH - 6}
              height={CONTAINER_HEIGHT - 6}
              rx="3"
            />
          </clipPath>
        </defs>

        {/* Glass container outline */}
        <rect
          x={CONTAINER_X}
          y={CONTAINER_Y}
          width={CONTAINER_WIDTH}
          height={CONTAINER_HEIGHT}
          fill="url(#glass-gradient)"
          stroke="#0EA5E9"
          strokeWidth="3"
          rx="5"
          style={{
            filter: 'drop-shadow(0 4px 6px rgba(0,0,0,0.3))',
          }}
        />

        {/* Animated liquid */}
        <motion.rect
          x={CONTAINER_X + 3}
          y={liquidY}
          width={CONTAINER_WIDTH - 6}
          height={liquidHeight}
          fill="url(#liquid-gradient)"
          clipPath="url(#container-clip)"
          initial={{ height: 0, y: CONTAINER_Y + CONTAINER_HEIGHT - 3 }}
          animate={{
            height: liquidHeight,
            y: liquidY,
          }}
          transition={{
            duration: 0.5,
            ease: 'easeOut',
          }}
          style={{
            opacity: liquidState.opacity,
          }}
        />

        {/* Top rim indicator */}
        <rect
          x={CONTAINER_X - 10}
          y={CONTAINER_Y - 5}
          width={CONTAINER_WIDTH + 20}
          height="8"
          fill="#0EA5E9"
          rx="4"
          style={{
            filter: 'drop-shadow(0 2px 4px rgba(14,165,233,0.5))',
          }}
        />

        {/* Sensor indicators */}
        {SENSOR_CONFIGS.map((sensor, index) => {
          const sensorInfo = sensorData[sensor.id];
          const isActive = sensorInfo?.isActive || currentStage >= 2;

          // Position sensors on left and right sides
          const side = index % 2 === 0 ? -40 : CONTAINER_WIDTH + 40;
          const yPos = CONTAINER_Y + 50 + (index * 60);

          return (
            <g key={sensor.id}>
              {/* Sensor dot */}
              <motion.circle
                cx={CONTAINER_X + side}
                cy={yPos}
                r="8"
                fill={sensor.color}
                stroke="#fff"
                strokeWidth="2"
                animate={{
                  opacity: isActive ? [1, 0.5, 1] : 0.3,
                }}
                transition={{
                  duration: 1.5,
                  repeat: isActive ? Infinity : 0,
                  ease: 'easeInOut',
                }}
              />

              {/* Sensor label */}
              <text
                x={CONTAINER_X + side}
                y={yPos + 25}
                fontSize="10"
                fill="#94A3B8"
                textAnchor="middle"
                className="font-mono"
              >
                {sensor.type}
              </text>

              {/* Connection line to container */}
              {isActive && (
                <motion.line
                  x1={CONTAINER_X + side}
                  y1={yPos}
                  x2={CONTAINER_X + (side < 0 ? 0 : CONTAINER_WIDTH)}
                  y2={yPos}
                  stroke={sensor.color}
                  strokeWidth="1"
                  strokeDasharray="3,3"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 0.3 }}
                  transition={{ duration: 0.3 }}
                />
              )}
            </g>
          );
        })}

        {/* Bubbles during electrolysis stage */}
        {currentStage === 6 &&
          Array.from({ length: 15 }).map((_, i) => {
            const bubbleX = CONTAINER_X + 30 + Math.random() * (CONTAINER_WIDTH - 60);
            const delay = i * 0.15;

            return (
              <motion.circle
                key={i}
                cx={bubbleX}
                r={2 + Math.random() * 3}
                fill="#FFEB3B"
                opacity="0.7"
                initial={{ cy: liquidY, opacity: 0.7 }}
                animate={{
                  cy: [liquidY, liquidY - 100, liquidY - 200],
                  opacity: [0.7, 0.5, 0],
                }}
                transition={{
                  duration: 2.5,
                  repeat: Infinity,
                  delay: delay,
                  ease: 'linear',
                }}
              />
            );
          })}

        {/* Stage label */}
        <text
          x="200"
          y="30"
          fontSize="12"
          fill="#94A3B8"
          textAnchor="middle"
          className="font-medium"
        >
          Stage {currentStage + 1}/{PROCESS_STAGES.length}: {PROCESS_STAGES[currentStage]?.name || 'Unknown'}
        </text>
      </svg>
    </div>
  );
}
