"use client";

import React from "react";

interface ThreeSceneErrorBoundaryProps {
  children: React.ReactNode;
  fallback?: React.ReactNode;
}

interface ThreeSceneErrorBoundaryState {
  hasError: boolean;
}

export default class ThreeSceneErrorBoundary extends React.Component<
  ThreeSceneErrorBoundaryProps,
  ThreeSceneErrorBoundaryState
> {
  constructor(props: ThreeSceneErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(): ThreeSceneErrorBoundaryState {
    return { hasError: true };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo): void {
    console.error("ThreeScene error:", error, errorInfo);
  }

  render(): React.ReactNode {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return this.props.fallback;
      }

      return (
        <div
          className="w-full h-full min-h-[300px] rounded-lg"
          style={{
            background:
              "radial-gradient(ellipse at center, #1a1a2e 0%, #0a0a0f 70%)",
          }}
          role="img"
          aria-label="3D scene fallback"
        >
          <div className="flex items-center justify-center w-full h-full min-h-[300px]">
            <p className="text-[#a0a0b0] text-sm">
              3D content unavailable
            </p>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
