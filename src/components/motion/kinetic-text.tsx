"use client";

import { motion, useTransform, type MotionValue } from "motion/react";
import { useRef } from "react";
import { useSceneTimeline } from "@/hooks/use-scene-timeline";
import "./scene-motion.css";

type Line = { text: string; accent?: boolean; italic?: boolean };
type Props = {
  lines: Line[];
  as?: "h2" | "p";
  id?: string;
  className?: string;
  progress?: MotionValue<number>;
  enter?: [number, number];
};

function Word({ text, index, count, progress, reduced, enter, headline }: {
  text: string; index: number; count: number; progress: MotionValue<number>;
  reduced: boolean | null; enter: [number, number]; headline: boolean;
}) {
  const stagger = index / Math.max(count - 1, 1) * .095;
  const points = [0, enter[0] + stagger, enter[1] + stagger, .81 + stagger * .45, 1];
  const y = useTransform(progress, points, ["115%", "115%", "0%", "0%", "-112%"]);
  const rotate = useTransform(progress, points, [headline ? 7 : 3, headline ? 7 : 3, 0, 0, -4]);
  const opacity = useTransform(progress, points, [0, 0, 1, 1, 0]);
  const filter = useTransform(progress, points, ["blur(3px)", "blur(3px)", "blur(0px)", "blur(0px)", "blur(2px)"]);

  return <span className="kinetic-word-mask"><motion.span className="kinetic-word" style={reduced ? undefined : { y, rotate, opacity, ...(headline ? { filter } : {}) }}>{text}</motion.span></span>;
}

export default function KineticText({ lines, as = "h2", id, className = "", progress: external, enter = [.025, .245] }: Props) {
  const target = useRef<HTMLHeadingElement>(null);
  const { progress: local, reduced } = useSceneTimeline(target);
  const progress = external ?? local;
  const count = lines.reduce((total, line) => total + line.text.split(" ").length, 0);
  const label = lines.map(line => line.text).join(" ");
  let index = 0;
  const content = <>
    {as === "p" && <span className="motion-sr-only">{label}</span>}
    {lines.map((line, lineIndex) => <span key={lineIndex} aria-hidden="true" className={`kinetic-line ${line.accent ? "kinetic-line-accent" : ""} ${line.italic ? "kinetic-line-italic" : ""}`}>
      {line.text.split(" ").map((word, wordIndex) => <span key={wordIndex}><Word text={word} index={index++} count={count} progress={progress} reduced={reduced} enter={enter} headline={as === "h2"} />{wordIndex < line.text.split(" ").length - 1 ? " " : null}</span>)}
    </span>)}
  </>;

  return as === "p"
    ? <p ref={target} id={id} className={`kinetic-text ${className}`} data-kinetic-text="paragraph">{content}</p>
    : <h2 ref={target} id={id} aria-label={label} className={`kinetic-text ${className}`} data-kinetic-text="heading">{content}</h2>;
}
