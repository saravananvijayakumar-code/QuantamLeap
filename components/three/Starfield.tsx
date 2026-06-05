"use client";

import { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

export interface StarfieldProps {
  /** Number of stars */
  count?: number;
  /** Spread radius for star positions */
  spread?: number;
  /** Rotation speed of the entire starfield */
  speed?: number;
  /** Base star color */
  color?: string;
  /** Maximum star size */
  maxSize?: number;
}

export function Starfield({
  count = 1500,
  spread = 30,
  speed = 0.05,
  color = "#ffffff",
  maxSize = 0.08,
}: StarfieldProps) {
  const groupRef = useRef<THREE.Group>(null);
  const pointsRef = useRef<THREE.Points>(null);

  const { positions, sizes, colors } = useMemo(() => {
    const positions = new Float32Array(count * 3);
    const sizes = new Float32Array(count);
    const colors = new Float32Array(count * 3);

    const baseColor = new THREE.Color(color);
    const starColors = [
      new THREE.Color("#ffffff"),  // White
      new THREE.Color("#cce5ff"),  // Blue-white
      new THREE.Color("#ffe5cc"),  // Warm white
      new THREE.Color("#00f0ff"),  // Neon cyan tint
      new THREE.Color("#b4c0ff"),  // Cool blue
    ];

    for (let i = 0; i < count; i++) {
      const i3 = i * 3;

      // Distribute stars in a sphere
      const radius = Math.random() * spread;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);

      positions[i3] = radius * Math.sin(phi) * Math.cos(theta);
      positions[i3 + 1] = radius * Math.sin(phi) * Math.sin(theta);
      positions[i3 + 2] = radius * Math.cos(phi);

      // Random sizes — most stars small, a few large
      const sizeRandom = Math.random();
      sizes[i] = sizeRandom < 0.9
        ? maxSize * (0.1 + Math.random() * 0.4) // 90% small
        : maxSize * (0.5 + Math.random() * 0.5); // 10% bright

      // Random star colors
      const starColor = starColors[Math.floor(Math.random() * starColors.length)];
      colors[i3] = starColor.r;
      colors[i3 + 1] = starColor.g;
      colors[i3 + 2] = starColor.b;
    }

    return { positions, sizes, colors };
  }, [count, spread, color, maxSize]);

  // Slow rotation of the entire starfield
  useFrame((state) => {
    if (!groupRef.current) return;
    groupRef.current.rotation.y += speed * 0.01;
    groupRef.current.rotation.x += speed * 0.003;
  });

  return (
    <group ref={groupRef}>
      {/* Main starfield */}
      <points ref={pointsRef}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            args={[positions, 3]}
            count={count}
            itemSize={3}
          />
          <bufferAttribute
            attach="attributes-color"
            args={[colors, 3]}
            count={count}
            itemSize={3}
          />
        </bufferGeometry>
        <pointsMaterial
          vertexColors
          size={maxSize * 0.5}
          sizeAttenuation
          transparent
          opacity={0.9}
          depthWrite={false}
        />
      </points>

      {/* A few brighter "nearby" stars */}
      <BrightStars count={Math.floor(count * 0.02)} spread={spread * 0.6} />
    </group>
  );
}

/** Larger, brighter stars that twinkle */
function BrightStars({ count, spread }: { count: number; spread: number }) {
  const pointsRef = useRef<THREE.Points>(null);
  const baseOpacities = useMemo(() => {
    const arr = new Float32Array(count);
    for (let i = 0; i < count; i++) {
      arr[i] = 0.6 + Math.random() * 0.4;
    }
    return arr;
  }, [count]);

  const positions = useMemo(() => {
    const pos = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      const i3 = i * 3;
      const radius = Math.random() * spread;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      pos[i3] = radius * Math.sin(phi) * Math.cos(theta);
      pos[i3 + 1] = radius * Math.sin(phi) * Math.sin(theta);
      pos[i3 + 2] = radius * Math.cos(phi);
    }
    return pos;
  }, [count, spread]);

  // Twinkle effect
  useFrame((state) => {
    if (!pointsRef.current) return;
    const material = pointsRef.current.material as THREE.PointsMaterial;
    const time = state.clock.getElapsedTime();
    material.opacity = 0.7 + Math.sin(time * 2) * 0.3;
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
        color="#00f0ff"
        size={0.12}
        sizeAttenuation
        transparent
        opacity={0.8}
        depthWrite={false}
      />
    </points>
  );
}
