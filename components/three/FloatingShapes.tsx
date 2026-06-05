"use client";

import { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

interface FloatingShapeProps {
  /** Shape geometry type */
  shape: "sphere" | "torus" | "icosahedron";
  /** Position in 3D space */
  position?: [number, number, number];
  /** Scale of the shape */
  scale?: number;
  /** Emissive neon color */
  color?: string;
  /** Rotation speed multiplier */
  speed?: number;
  /** Orbit radius (0 for no orbit) */
  orbitRadius?: number;
}

function FloatingShape({
  shape,
  position = [0, 0, 0],
  scale = 1,
  color = "#00f0ff",
  speed = 1,
  orbitRadius = 0,
}: FloatingShapeProps) {
  const meshRef = useRef<THREE.Mesh>(null);
  const initialPosition = useMemo(() => new THREE.Vector3(...position), [position]);

  useFrame((state) => {
    if (!meshRef.current) return;

    const elapsed = state.clock.getElapsedTime();

    // Rotation animation
    meshRef.current.rotation.x += 0.005 * speed;
    meshRef.current.rotation.y += 0.008 * speed;

    // Orbit animation
    if (orbitRadius > 0) {
      meshRef.current.position.x =
        initialPosition.x + Math.cos(elapsed * speed * 0.5) * orbitRadius;
      meshRef.current.position.z =
        initialPosition.z + Math.sin(elapsed * speed * 0.5) * orbitRadius;
    }

    // Gentle float up/down
    meshRef.current.position.y =
      initialPosition.y + Math.sin(elapsed * speed * 0.8) * 0.3;
  });

  const geometry = useMemo(() => {
    switch (shape) {
      case "sphere":
        return <sphereGeometry args={[0.5, 24, 24]} />;
      case "torus":
        return <torusGeometry args={[0.5, 0.2, 16, 32]} />;
      case "icosahedron":
        return <icosahedronGeometry args={[0.5, 0]} />;
    }
  }, [shape]);

  return (
    <mesh ref={meshRef} position={position} scale={scale}>
      {geometry}
      <meshStandardMaterial
        color={color}
        emissive={color}
        emissiveIntensity={0.6}
        roughness={0.3}
        metalness={0.8}
        transparent
        opacity={0.85}
      />
    </mesh>
  );
}

export interface FloatingShapesProps {
  /** Speed multiplier for all animations */
  speed?: number;
  /** Override neon colors [primary, secondary, accent] */
  colors?: [string, string, string];
  /** Scale multiplier for all shapes */
  scale?: number;
  /** Number of shapes to render (max 6) */
  count?: number;
}

const DEFAULT_COLORS: [string, string, string] = [
  "#00f0ff", // Neon cyan
  "#b400ff", // Neon purple
  "#00ff88", // Neon green
];

interface ShapeConfig {
  shape: "sphere" | "torus" | "icosahedron";
  position: [number, number, number];
  orbitRadius: number;
  scale: number;
}

const SHAPE_CONFIGS: ShapeConfig[] = [
  { shape: "sphere", position: [-2, 1, -1], orbitRadius: 0.5, scale: 0.8 },
  { shape: "torus", position: [2, -0.5, -2], orbitRadius: 0.8, scale: 1 },
  { shape: "icosahedron", position: [0, 1.5, -1.5], orbitRadius: 0.3, scale: 0.7 },
  { shape: "sphere", position: [1.5, -1, -3], orbitRadius: 0.6, scale: 0.5 },
  { shape: "torus", position: [-1.5, -1.5, -2], orbitRadius: 0.4, scale: 0.6 },
  { shape: "icosahedron", position: [2.5, 0.5, -2.5], orbitRadius: 0.7, scale: 0.9 },
];

export function FloatingShapes({
  speed = 1,
  colors = DEFAULT_COLORS,
  scale = 1,
  count = 3,
}: FloatingShapesProps) {
  const shapesToRender = SHAPE_CONFIGS.slice(0, Math.min(count, 6));

  return (
    <group>
      <ambientLight intensity={0.2} />
      <pointLight position={[5, 5, 5]} intensity={0.8} color={colors[0]} />
      <pointLight position={[-5, -5, 3]} intensity={0.5} color={colors[1]} />
      {shapesToRender.map((config, index) => (
        <FloatingShape
          key={index}
          shape={config.shape}
          position={config.position}
          scale={config.scale * scale}
          color={colors[index % colors.length]}
          speed={speed}
          orbitRadius={config.orbitRadius}
        />
      ))}
    </group>
  );
}
