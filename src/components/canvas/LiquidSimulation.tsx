import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { useSimulationStore } from '../../store/simulationStore';
import { CONTAINER_RADIUS, CONTAINER_HEIGHT } from '../../utils/constants';

export function LiquidSimulation() {
  const meshRef = useRef<any>(null);
  const { liquidState } = useSimulationStore();

  const targetHeightRef = useRef(0);

  useFrame(() => {
    if (!meshRef.current) return;

    // Calculate target height
    const targetHeight = liquidState.fillLevel * CONTAINER_HEIGHT;
    targetHeightRef.current += (targetHeight - targetHeightRef.current) * 0.1;

    const height = Math.max(0.01, targetHeightRef.current);

    // Update scale for height
    meshRef.current.scale.y = height;

    // Position from bottom: -3 is bottom, -3 + height/2 is where center should be
    meshRef.current.position.y = -CONTAINER_HEIGHT / 2 + height / 2;
  });

  return (
    <mesh ref={meshRef} position={[0, -3, 0]}>
      {/* Using a simple cylinder that scales */}
      <cylinderGeometry args={[CONTAINER_RADIUS - 0.2, CONTAINER_RADIUS - 0.2, 1, 32]} />
      <meshStandardMaterial
        color={liquidState.color}
        roughness={0.3}
        metalness={0.1}
        opacity={0.9}
        transparent
      />
    </mesh>
  );
}
