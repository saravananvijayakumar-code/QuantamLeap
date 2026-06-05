"use client";

import { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

export interface ParticleFieldProps {
  /** Number of particles */
  count?: number;
  /** Particle color */
  color?: string;
  /** Size of each particle */
  size?: number;
  /** Speed of particle drift animation */
  speed?: number;
  /** Spread radius for particle positions */
  spread?: number;
}

export function ParticleField({
  count = 200,
  color = "#00f0ff",
  size = 0.02,
  speed = 1,
  spread = 10,
}: ParticleFieldProps) {
  const pointsRef = useRef<THREE.Points>(null);

  const { positions, velocities } = useMemo(() => {
    const positions = new Float32Array(count * 3);
    const velocities = new Float32Array(count * 3);

    for (let i = 0; i < count; i++) {
      const i3 = i * 3;
      // Random positions within spread volume
      positions[i3] = (Math.random() - 0.5) * spread;
      positions[i3 + 1] = (Math.random() - 0.5) * spread;
      positions[i3 + 2] = (Math.random() - 0.5) * spread;

      // Small random velocities for drift
      velocities[i3] = (Math.random() - 0.5) * 0.002;
      velocities[i3 + 1] = (Math.random() - 0.5) * 0.002;
      velocities[i3 + 2] = (Math.random() - 0.5) * 0.002;
    }

    return { positions, velocities };
  }, [count, spread]);

  useFrame(() => {
    if (!pointsRef.current) return;

    const positionAttribute = pointsRef.current.geometry.attributes
      .position as THREE.BufferAttribute;
    const posArray = positionAttribute.array as Float32Array;
    const halfSpread = spread / 2;

    for (let i = 0; i < count; i++) {
      const i3 = i * 3;

      // Apply velocity
      posArray[i3] += velocities[i3] * speed;
      posArray[i3 + 1] += velocities[i3 + 1] * speed;
      posArray[i3 + 2] += velocities[i3 + 2] * speed;

      // Wrap around when particles leave bounds
      for (let axis = 0; axis < 3; axis++) {
        if (posArray[i3 + axis] > halfSpread) {
          posArray[i3 + axis] = -halfSpread;
        } else if (posArray[i3 + axis] < -halfSpread) {
          posArray[i3 + axis] = halfSpread;
        }
      }
    }

    positionAttribute.needsUpdate = true;
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[positions, 3]}
          count={count}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        color={color}
        size={size}
        sizeAttenuation
        transparent
        opacity={0.7}
        depthWrite={false}
      />
    </points>
  );
}
