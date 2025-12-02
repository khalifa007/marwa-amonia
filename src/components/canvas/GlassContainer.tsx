import { CONTAINER_RADIUS, CONTAINER_HEIGHT, CONTAINER_SEGMENTS } from '../../utils/constants';

export function GlassContainer() {
  return (
    <group position={[0, 0, 0]}>
      {/* Main glass cylinder - simple and visible */}
      <mesh position={[0, 0, 0]}>
        <cylinderGeometry
          args={[
            CONTAINER_RADIUS,
            CONTAINER_RADIUS,
            CONTAINER_HEIGHT,
            CONTAINER_SEGMENTS,
          ]}
        />
        <meshStandardMaterial
          color="#06B6D4"
          transparent
          opacity={0.15}
          roughness={0.1}
          metalness={0.1}
          side={2}
        />
      </mesh>

      {/* Rim */}
      <mesh position={[0, CONTAINER_HEIGHT / 2, 0]}>
        <torusGeometry args={[CONTAINER_RADIUS, 0.08, 16, CONTAINER_SEGMENTS]} />
        <meshStandardMaterial
          color="#0EA5E9"
          emissive="#0EA5E9"
          emissiveIntensity={0.5}
          roughness={0.2}
          metalness={0.8}
        />
      </mesh>

      {/* Vertical guide lines to help see the container */}
      {[0, Math.PI / 2, Math.PI, (3 * Math.PI) / 2].map((angle, i) => (
        <mesh
          key={i}
          position={[
            Math.cos(angle) * CONTAINER_RADIUS,
            0,
            Math.sin(angle) * CONTAINER_RADIUS
          ]}
        >
          <boxGeometry args={[0.02, CONTAINER_HEIGHT, 0.02]} />
          <meshStandardMaterial color="#0EA5E9" opacity={0.3} transparent />
        </mesh>
      ))}
    </group>
  );
}
