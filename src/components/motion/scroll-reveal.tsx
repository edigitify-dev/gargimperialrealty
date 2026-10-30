"use client";

import { motion, useTransform } from "motion/react";
import { useRef, type HTMLAttributes, type ReactNode } from "react";
import { useSceneTimeline } from "@/hooks/use-scene-timeline";
import "./scene-motion.css";

type Props = {
  children: ReactNode;
  className?: string;
  delay?: number;
  variant?: "rise" | "image" | "soft" | "editorial" | "sequence";
  as?: "div" | "figure";
} & Pick<HTMLAttributes<HTMLElement>, "id" | "role" | "tabIndex" | "aria-labelledby" | "aria-live">;

export default function ScrollReveal({ children, className = "", delay = 0, variant = "editorial", as = "div", ...props }: Props) {
  const target = useRef<HTMLDivElement>(null);
  const { progress, reduced } = useSceneTimeline(target);
  const stagger = Math.min(Math.max(delay, 0), .4) * .25;
  const points = [0, .04 + stagger, (variant === "soft" ? .22 : .3) + stagger, .83, 1];
  const distance = variant === "image" ? 44 : variant === "soft" ? 20 : 32;
  const y = useTransform(progress, points, [distance, distance, 0, 0, -distance * .8]);
  const opacity = useTransform(progress, points, [0, 0, 1, 1, 0]);
  const scale = useTransform(progress, points, [variant === "rise" ? 1 : .975, variant === "rise" ? 1 : .975, 1, 1, variant === "rise" ? 1 : .99]);
  const clipPath = useTransform(progress, points, [
    "inset(14% 0% 0% 0%)", "inset(14% 0% 0% 0%)",
    "inset(0% 0% 0% 0%)", "inset(0% 0% 0% 0%)", "inset(0% 0% 12% 0%)",
  ]);
  const enter = useTransform(progress, [.025 + stagger, .36 + stagger], [0, 1]);
  const exit = useTransform(progress, [.84, 1], [0, 1]);
  const rotateX = useTransform(progress, points, [4, 4, 0, 0, -3]);
  const editorial = variant === "editorial" || variant === "sequence";
  const style = reduced ? undefined : {
    "--scene-enter": enter, "--scene-exit": exit,
    ...(!editorial ? { y, opacity, scale, ...(variant === "soft" ? { rotateX, transformPerspective: 1200 } : {}) } : {}),
    ...(variant === "image" ? { clipPath } : {}),
  };
  const shared = { ...props, ref: target, className: `scroll-reveal ${editorial ? "scene-editorial" : ""} ${className}`, style, "data-scroll-reveal": variant };

  return as === "figure" ? <motion.figure {...shared}>{children}</motion.figure> : <motion.div {...shared}>{children}</motion.div>;
}
