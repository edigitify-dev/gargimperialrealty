"use client";

import { motion, useTransform } from "motion/react";
import { useRef, type ReactNode } from "react";
import { useSceneTimeline } from "@/hooks/use-scene-timeline";

export default function JournalReveal({ children, className = "", variant = "copy" }: {
  children: ReactNode;
  className?: string;
  variant?: "copy" | "image" | "note";
}) {
  const target = useRef<HTMLDivElement>(null);
  const { progress, reduced } = useSceneTimeline(target);
  const y = useTransform(progress, [0, .025, .24, .87, 1], [32, 32, 0, 0, -24]);
  const opacity = useTransform(progress, [0, .01, .16, .94, 1], [0, 0, 1, 1, 0]);
  const clipPath = useTransform(progress, [0, .025, .3, .87, 1], [
    "inset(0% 12% 8% 0%)", "inset(0% 12% 8% 0%)", "inset(0% 0% 0% 0%)", "inset(0% 0% 0% 0%)", "inset(8% 0% 0% 10%)",
  ]);
  const line = useTransform(progress, [0, .04, .32, .88, 1], [0, 0, 1, 1, 0]);

  return <motion.div ref={target} className={`journal-reveal ${className}`} data-journal-reveal={variant} style={reduced ? undefined : {
    y, opacity, ...(variant === "image" ? { clipPath } : {}), ...(variant === "note" ? { "--journal-line": line } : {}),
  }}>{children}</motion.div>;
}
