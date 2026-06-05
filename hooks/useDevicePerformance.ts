"use client";

import { useState, useEffect } from "react";

export type PerformanceLevel = "high" | "medium" | "low";

function checkWebGLSupport(): boolean {
  try {
    const canvas = document.createElement("canvas");
    const gl =
      canvas.getContext("webgl") || canvas.getContext("experimental-webgl");
    return gl !== null;
  } catch {
    return false;
  }
}

function getGPUTier(): "high" | "medium" | "low" {
  try {
    const canvas = document.createElement("canvas");
    const gl = canvas.getContext("webgl") as WebGLRenderingContext | null;
    if (!gl) return "low";

    const debugInfo = gl.getExtension("WEBGL_debug_renderer_info");
    if (!debugInfo) return "medium";

    const renderer = gl.getParameter(debugInfo.UNMASKED_RENDERER_WEBGL) as string;
    const rendererLower = renderer.toLowerCase();

    // Low-tier indicators: software renderers, integrated mobile GPUs
    const lowTierPatterns = [
      "swiftshader",
      "llvmpipe",
      "software",
      "microsoft basic render",
    ];

    if (lowTierPatterns.some((pattern) => rendererLower.includes(pattern))) {
      return "low";
    }

    // High-tier indicators: dedicated GPUs
    const highTierPatterns = [
      "nvidia",
      "geforce",
      "radeon",
      "rx ",
      "rtx",
      "gtx",
      "quadro",
      "amd",
    ];

    if (highTierPatterns.some((pattern) => rendererLower.includes(pattern))) {
      return "high";
    }

    // Everything else (Intel integrated, Apple GPU, etc.) is medium
    return "medium";
  } catch {
    return "medium";
  }
}

function isMobileUserAgent(): boolean {
  if (typeof navigator === "undefined") return false;
  return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
    navigator.userAgent
  );
}

function detectPerformanceLevel(): PerformanceLevel {
  // Check WebGL support first — no WebGL means low performance
  if (!checkWebGLSupport()) {
    return "low";
  }

  const devicePixelRatio = window.devicePixelRatio ?? 1;
  const gpuTier = getGPUTier();

  // Low GPU tier means low performance regardless
  if (gpuTier === "low") {
    return "low";
  }

  // Low pixel ratio or mobile user agent suggests medium performance
  if (devicePixelRatio < 1.5 || isMobileUserAgent()) {
    return "medium";
  }

  // Medium GPU tier defaults to medium
  if (gpuTier === "medium") {
    return "medium";
  }

  // High GPU tier with decent pixel ratio = high performance
  return "high";
}

export function useDevicePerformance(): PerformanceLevel {
  const [performanceLevel, setPerformanceLevel] =
    useState<PerformanceLevel>("medium");

  useEffect(() => {
    const level = detectPerformanceLevel();
    setPerformanceLevel(level);
  }, []);

  return performanceLevel;
}
