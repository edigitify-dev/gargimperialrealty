"use client";

import useReducedMotion from "@/hooks/use-reduced-motion";
import { useSiteVisit } from "@/components/site-visit/site-visit-provider";
import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import { motion, useScroll, useSpring, useTransform, type MotionValue } from "motion/react";
import { useRef } from "react";
import "./horizon-cta.css";

function useRisingReveal(progress: MotionValue<number>, reduced: boolean | null, start: number, end: number, distance = 24) {
  const y = useTransform(progress, [0, start, end, .76, 1], [distance, distance, 0, 0, -distance]);
  const opacity = useTransform(progress, [0, start, end, .86, 1], [0, 0, 1, 1, 0]);
  return reduced ? undefined : { y, opacity };
}

export default function HorizonCTA() {
  const { openVisit } = useSiteVisit();
  const section = useRef<HTMLElement>(null);
  const reduced = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: section, offset: ["start end", "end start"] });
  const progress = useSpring(scrollYProgress, { stiffness: 125, damping: 28, mass: .45, restDelta: .001 });
  const firstLine = useRisingReveal(progress, reduced, .09, .29, 45);
  const secondLine = useRisingReveal(progress, reduced, .14, .34, 45);
  const description = useRisingReveal(progress, reduced, .18, .36, 18);
  const actions = useRisingReveal(progress, reduced, .22, .39, 20);
  const panelY = useTransform(progress, [0, .3, .76, 1], [20, 0, 0, -18]);
  const buildingY = useTransform(progress, [0, .08, .38, .74, 1], [80, 80, 0, 0, -65]);
  const buildingOpacity = useTransform(progress, [0, .08, .29, .83, 1], [0, 0, 1, 1, 0]);
  const buildingClip = useTransform(progress, [0, .08, .38, .74, 1], [
    "inset(100% -30% -14% -30%)",
    "inset(100% -30% -14% -30%)",
    "inset(-14% -30% -14% -30%)",
    "inset(-14% -30% -14% -30%)",
    "inset(-14% -30% 100% -30%)",
  ]);
  const frameOpacity = useTransform(progress, [0, .1, .34, .8, 1], [0, 0, 1, 1, 0]);
  const sweepX = useTransform(progress, [.08, .44], ["-100%", "100%"]);
  const sweepOpacity = useTransform(progress, [0, .12, .24, .42, 1], [0, 0, 1, 0, 0]);

  return (
    <section className="horizon-cta" id="contact" aria-labelledby="horizon-heading" ref={section}>
      <div className="container">
        <motion.div className="horizon-panel" style={reduced ? undefined : { y: panelY }}>
          <motion.div className="horizon-panel-detail" aria-hidden="true" style={reduced ? undefined : { opacity: frameOpacity }} />
          {!reduced && <div className="horizon-light-sweep" aria-hidden="true"><motion.span style={{ x: sweepX, opacity: sweepOpacity }} /></div>}
          <div className="horizon-invitation">
            <h2 id="horizon-heading"><span className="horizon-title-line"><motion.span style={firstLine}>A place for</motion.span></span><span className="horizon-title-line horizon-title-accent"><motion.span style={secondLine}>what’s next.</motion.span></span></h2>
            <motion.p className="horizon-description" style={description}>A place of your own. A world of possibilities.</motion.p>
          </div>
          <motion.div className="horizon-architecture" style={reduced ? undefined : { y: buildingY, opacity: buildingOpacity, clipPath: buildingClip }}>
            <Image src="/images/high-rise-cutout.png" alt="Architectural concept of two illuminated residential towers" fill sizes="(max-width: 600px) 160px, (max-width: 960px) 280px, 330px" />
          </motion.div>
          <motion.div className="horizon-actions" style={actions}>
            <button className="horizon-book" onClick={openVisit}>Book a Site Visit <ArrowUpRight size={19} strokeWidth={1.4} aria-hidden="true" /></button>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
