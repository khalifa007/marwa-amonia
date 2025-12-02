import { Canvas } from '@react-three/fiber';
import { OrbitControls, Environment, Grid } from '@react-three/drei';
import { GlassContainer } from './GlassContainer';
import { LiquidSimulation } from './LiquidSimulation';
import { LightingRig } from './LightingRig';
import { CAMERA_CONFIG } from '../../utils/constants';

export function Scene() {
  return (
    <Canvas
      camera={{
        position: CAMERA_CONFIG.INITIAL_POSITION,
        fov: CAMERA_CONFIG.FOV,
        near: CAMERA_CONFIG.NEAR,
        far: CAMERA_CONFIG.FAR,
      }}
      shadows
    >
      {/* Better lighting */}
      <LightingRig />
      <Environment preset="warehouse" />

      {/* Main 3D objects */}
      <GlassContainer />
      <LiquidSimulation />

      {/* Camera controls */}
      <OrbitControls
        enablePan={true}
        minDistance={CAMERA_CONFIG.MIN_DISTANCE}
        maxDistance={CAMERA_CONFIG.MAX_DISTANCE}
        maxPolarAngle={Math.PI / 1.5}
        minPolarAngle={Math.PI / 6}
      />
    </Canvas>
  );
}
