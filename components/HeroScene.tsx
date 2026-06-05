"use client";

import { ThreeScene } from "@/components/ThreeScene";
import { Starfield } from "@/components/three";
import ThreeSceneErrorBoundary from "@/components/ThreeSceneErrorBoundary";

export function HeroScene() {
  return (
    <ThreeSceneErrorBoundary
      fallback={
        <div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse at center, #0a0a1a 0%, #000005 70%)",
          }}
          aria-label="3D scene fallback"
        />
      }
    >
      <ThreeScene className="absolute inset-0 w-full h-full pointer-events-none">
        <Starfield
          count={2000}
          spread={35}
          speed={0.03}
          color="#ffffff"
          maxSize={0.08}
        />
      </ThreeScene>
    </ThreeSceneErrorBoundary>
  );
}
