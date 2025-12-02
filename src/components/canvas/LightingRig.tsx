export function LightingRig() {
  return (
    <>
      {/* Ambient light for overall illumination */}
      <ambientLight intensity={0.4} />

      {/* Main directional light (sun-like) */}
      <directionalLight
        position={[10, 10, 5]}
        intensity={1}
        castShadow
        shadow-mapSize-width={2048}
        shadow-mapSize-height={2048}
      />

      {/* Fill light from the side */}
      <directionalLight
        position={[-5, 5, -5]}
        intensity={0.5}
      />

      {/* Bottom light for glass effect */}
      <pointLight
        position={[0, -3, 0]}
        intensity={0.8}
        color="#06B6D4"
      />

      {/* Top accent light */}
      <spotLight
        position={[0, 8, 0]}
        angle={0.5}
        penumbra={1}
        intensity={0.5}
        castShadow
      />
    </>
  );
}
