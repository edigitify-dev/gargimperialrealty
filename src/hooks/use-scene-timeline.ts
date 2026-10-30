"use client";

import useReducedMotion from "@/hooks/use-reduced-motion";
import { useScroll, useSpring } from "motion/react";
import type { RefObject } from "react";

export function useSceneTimeline(target: RefObject<HTMLElement | null>) {
  const reduced = useReducedMotion();
  const { scrollYProgress } = useScroll({ target, offset: ["start end", "end start"] });
  const progress = useSpring(scrollYProgress, { stiffness: 155, damping: 30, mass: .4, restDelta: .001 });
  return { progress, reduced };
}
