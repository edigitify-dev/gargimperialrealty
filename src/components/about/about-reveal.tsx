"use client";

import { motion, useTransform } from "motion/react";
import { useRef, type ReactNode } from "react";
import { useSceneTimeline } from "@/hooks/use-scene-timeline";

export const aboutEase = [.22, 1, .36, 1] as const;

type RevealVariant = "rise" | "heading" | "portrait" | "detail" | "chapter";

export default function AboutReveal({ children, className = "", delay = 0, variant = "rise" }: {
  children: ReactNode;
  className?: string;
  delay?: number;
  variant?: RevealVariant;
}) {
  const target = useRef<HTMLDivElement>(null);
  const { progress, reduced } = useSceneTimeline(target);
  // Stagger by scroll distance, so both entrances and exits reverse naturally.
  const stagger = Math.min(Math.max(delay, 0), .3) * .18;
  const points = [0, .025 + stagger, .25 + stagger, .86, 1];
  const image = variant === "portrait" || variant === "detail";
  const distance = variant === "portrait" ? 48 : variant === "heading" ? 24 : 32;
  const y = useTransform(progress, points, [distance, distance, 0, 0, -distance * .65]);
  const x = useTransform(progress, points, [variant === "detail" ? 24 : 0, variant === "detail" ? 24 : 0, 0, 0, variant === "detail" ? -16 : 0]);
  const opacity = useTransform(progress, [0, .015 + stagger, .17 + stagger, .92, 1], [0, 0, 1, 1, 0]);
  const scale = useTransform(progress, points, [image ? .96 : 1, image ? .96 : 1, 1, 1, image ? .985 : 1]);
  const clipPath = useTransform(progress, points, [
    variant === "detail" ? "inset(0% 18% 0% 0%)" : "inset(12% 0% 0% 0%)",
    variant === "detail" ? "inset(0% 18% 0% 0%)" : "inset(12% 0% 0% 0%)",
    "inset(0% 0% 0% 0%)",
    "inset(0% 0% 0% 0%)",
    variant === "detail" ? "inset(0% 0% 0% 16%)" : "inset(0% 0% 12% 0%)",
  ]);
  const rule = useTransform(progress, [0, .025 + stagger, .3 + stagger, .86, 1], [0, 0, 1, 1, 0]);

  return (
    <motion.div
      ref={target}
      className={`about-reveal ${className}`}
      data-about-reveal={variant}
      style={reduced ? undefined : {
        y, x, opacity, scale,
        ...(image ? { clipPath } : {}),
        ...(variant === "chapter" ? { "--about-rule": rule } : {}),
      }}
    >
      {children}
    </motion.div>
  );
}
