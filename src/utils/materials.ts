import * as THREE from 'three';

// Create realistic glass material for container
export function createGlassMaterial(): THREE.MeshPhysicalMaterial {
  return new THREE.MeshPhysicalMaterial({
    metalness: 0.1,
    roughness: 0.05,
    transmission: 0.95,
    thickness: 0.5,
    ior: 1.5,
    clearcoat: 1.0,
    clearcoatRoughness: 0.1,
    reflectivity: 0.3,
    envMapIntensity: 1.5,
    color: new THREE.Color('#06B6D4'),
    transparent: true,
    opacity: 0.3,
    side: THREE.DoubleSide,
  });
}

// Create liquid material with color
export function createLiquidMaterial(color: string, opacity: number = 0.8): THREE.MeshPhysicalMaterial {
  return new THREE.MeshPhysicalMaterial({
    color: new THREE.Color(color),
    metalness: 0.2,
    roughness: 0.3,
    opacity: opacity,
    transparent: true,
    side: THREE.DoubleSide,
  });
}

// Create sensor probe material with glow
export function createSensorMaterial(color: string, glowing: boolean = false): THREE.MeshStandardMaterial {
  const material = new THREE.MeshStandardMaterial({
    color: new THREE.Color(color),
    metalness: 0.7,
    roughness: 0.3,
    emissive: glowing ? new THREE.Color(color) : new THREE.Color(0x000000),
    emissiveIntensity: glowing ? 0.5 : 0,
  });
  return material;
}

// Create particle material
export function createParticleMaterial(color: string, size: number = 0.05): THREE.PointsMaterial {
  return new THREE.PointsMaterial({
    color: new THREE.Color(color),
    size: size,
    transparent: true,
    opacity: 0.8,
    blending: THREE.AdditiveBlending,
    depthWrite: false,
  });
}

// Create electrical discharge material (line)
export function createElectricalMaterial(): THREE.LineBasicMaterial {
  return new THREE.LineBasicMaterial({
    color: 0xFFFFFF,
    linewidth: 2,
    opacity: 0.9,
    transparent: true,
    blending: THREE.AdditiveBlending,
  });
}

// Create pipe material
export function createPipeMaterial(): THREE.MeshStandardMaterial {
  return new THREE.MeshStandardMaterial({
    color: 0x37474F,
    metalness: 0.9,
    roughness: 0.2,
  });
}
