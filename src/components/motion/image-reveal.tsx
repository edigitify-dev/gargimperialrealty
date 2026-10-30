"use client";

import { motion, useTransform, type MotionValue } from "motion/react";
import { Children, isValidElement, useRef, type ReactNode } from "react";
import { useSceneTimeline } from "@/hooks/use-scene-timeline";
import "./scene-motion.css";

type Variant = "shutters" | "aperture" | "blueprint";

function Shutter({ index, progress }: { index: number; progress: MotionValue<number> }) {
  const stagger = index * .035;
  const y = useTransform(progress, [0, .04 + stagger, .24 + stagger, .81 + stagger * .3, 1], ["0%", "0%", "-102%", "-102%", "-102%"]);
  const exitY = useTransform(progress, [.81 + stagger * .3, 1], ["102%", "0%"]);
  return <><motion.span className="image-shutter" style={{ left: `${index * 33.333}%`, y }} /><motion.span className="image-shutter image-shutter-exit" style={{ left: `${index * 33.333}%`, y: exitY }} /></>;
}

export default function ImageReveal({ children, className = "", variant, as = "div" }: {
  children: ReactNode; className?: string; variant: Variant; as?: "div" | "figure";
}) {
  const target = useRef<HTMLDivElement>(null);
  const { progress, reduced } = useSceneTimeline(target);
  const points = [0, .04, .34, .81, 1];
  const y = useTransform(progress, points, [variant === "blueprint" ? 55 : 35, variant === "blueprint" ? 55 : 35, 0, 0, -40]);
  const scale = useTransform(progress, points, [variant === "blueprint" ? .93 : 1.14, variant === "blueprint" ? .93 : 1.14, 1, 1, 1.055]);
  const rotateX = useTransform(progress, points, [variant === "blueprint" ? 13 : 0, variant === "blueprint" ? 13 : 0, 0, 0, variant === "blueprint" ? -7 : 0]);
  const rotate = useTransform(progress, points, [variant === "blueprint" ? -2 : 0, variant === "blueprint" ? -2 : 0, 0, 0, variant === "blueprint" ? 1 : 0]);
  const opacity = useTransform(progress, [0, .025, .16, .91, 1], [0, 0, 1, 1, 0]);
  const clipPath = useTransform(progress, points, variant === "aperture" ? [
    "polygon(0% 85%, 100% 45%, 100% 100%, 0% 100%)",
    "polygon(0% 85%, 100% 45%, 100% 100%, 0% 100%)",
    "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
    "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
    "polygon(0% 0%, 100% 0%, 100% 12%, 0% 40%)",
  ] : [
    "polygon(8% 16%, 92% 8%, 100% 100%, 0% 100%)",
    "polygon(8% 16%, 92% 8%, 100% 100%, 0% 100%)",
    "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
    "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
    "polygon(0% 0%, 100% 0%, 92% 80%, 8% 88%)",
  ]);
  const enter = useTransform(progress, [.03, .36], [0, 1]);
  const exit = useTransform(progress, [.81, 1], [0, 1]);
  const scanY = useTransform(progress, [.06, .38], ["-10%", "110%"]);
  const scanOpacity = useTransform(progress, [0, .06, .17, .37, 1], [0, 0, 1, 0, 0]);
  const shared = { ref: target, className: `image-reveal image-reveal-${variant} ${className}`, "data-image-reveal": variant, style: reduced ? undefined : { clipPath, opacity, "--scene-enter": enter, "--scene-exit": exit } };
  const items = Children.toArray(children);
  const isCaption = (child: ReactNode) => as === "figure" && isValidElement(child) && child.type === "figcaption";
  const content = <>
    <motion.div className="image-reveal-content" style={reduced ? undefined : { y, scale, rotate, rotateX, transformPerspective: 1100 }}>{items.filter(child => !isCaption(child))}</motion.div>
    {items.filter(isCaption)}
    {!reduced && variant === "shutters" && <div className="image-shutters" aria-hidden="true">{[0, 1, 2].map(index => <Shutter key={index} index={index} progress={progress} />)}</div>}
    {!reduced && variant === "blueprint" && <motion.div className="image-blueprint-scan" aria-hidden="true" style={{ y: scanY, opacity: scanOpacity }}><span /></motion.div>}
  </>;

  return as === "figure" ? <motion.figure {...shared}>{content}</motion.figure> : <motion.div {...shared}>{content}</motion.div>;
}
