"use client";

import { motion, useScroll } from "motion/react";
import useReducedMotion from "@/hooks/use-reduced-motion";
import "./scroll-progress.css";

export default function ScrollProgress() {
  const reduced = useReducedMotion();
  const { scrollYProgress } = useScroll();

  return <motion.div className="scroll-progress" style={{ scaleX: reduced ? 0 : scrollYProgress }} aria-hidden="true" />;
}
