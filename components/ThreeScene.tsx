"use client";

import { Canvas } from "@react-three/fiber";
import { Suspense, useEffect, useState } from "react";

interface ThreeSceneProps {
  children: React.ReactNode;
  className?: string;
  fallback?: React.ReactNode;
}

function detectWebGLSupport(): boolean {
  if (typeof window === "undefined") return false;
  if (!window.WebGLRenderingContext) return false;
  try {
    const canvas = document.createElement("canvas");
    const gl =
      canvas.getContext("webgl") || canvas.getContext("experimental-webgl");
    return gl !== null;
  } catch {
    return false;
  }
}

function GradientFallback({ className }: { className?: string }) {
  return (
    <div
      className={className}
      style={{
        background:
          "radial-gradient(ellipse at center, #1a1a2e 0%, #0a0a0f 70%)",
      }}
      aria-label="3D scene fallback"
    />
  );
}

export function ThreeScene({ children, className, fallback }: ThreeSceneProps) {
  const [webGLSupported, setWebGLSupported] = useState<boolean | null>(null);

  useEffect(() => {
    setWebGLSupported(detectWebGLSupport());
  }, []);

  // While checking WebGL support, render the fallback or nothing
  if (webGLSupported === null) {
    return (
      <div className={className}>
        {fallback ?? <GradientFallback className="w-full h-full" />}
      </div>
    );
  }

  // If WebGL is not supported, render static gradient fallback
  if (!webGLSupported) {
    return <GradientFallback className={className} />;
  }

  return (
    <div className={className} style={{ pointerEvents: "none" }}>
      <Canvas style={{ pointerEvents: "none" }}>
        <Suspense fallback={fallback ?? null}>{children}</Suspense>
      </Canvas>
    </div>
  );
}
