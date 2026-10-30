"use client";

import useReducedMotion from "@/hooks/use-reduced-motion";
import Image from "next/image";
import { motion, useScroll, useTransform } from "motion/react";
import { useRef, useState } from "react";
import KineticText from "@/components/motion/kinetic-text";
import "./about-scene.css";

export default function AboutScene() {
  const scrollSection = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();
  const [ready, setReady] = useState(false);
  const [imageError, setImageError] = useState(false);
  const { scrollYProgress } = useScroll({ target: scrollSection, offset: ["start start", "end end"] });
  const titleY = useTransform(scrollYProgress, [0, .08, .68, .9, 1], ["65vh", "65vh", "0vh", "0vh", "-1vh"]);
  const titleOpacity = useTransform(scrollYProgress, [0, .84, 1], [1, 1, 0]);

  return (
    <section className={`about-chapter ${imageError ? "about-static" : ""}`} id="about" aria-labelledby="about-heading" data-ready={ready || imageError}>
      <div className="about-scroll" ref={scrollSection}>
        <div className="about-sticky">
          <div className="about-stage">
            <div className="about-environment">
              <Image src="/images/about-community.webp" alt="A thoughtfully planned community of contemporary stone villas, open plots and landscaped avenues beneath a clear blue sky" fill sizes="100vw" loading="eager" className="about-scene-image" />
            </div>

            <div className="about-sky-wash" aria-hidden="true" />

            <motion.div className="about-title" style={reduced ? undefined : { y: titleY, opacity: titleOpacity }}>
              <KineticText id="about-heading" progress={scrollYProgress} enter={[.38, .64]} lines={[{ text: "Your vision." }, { text: "Finds its ground.", italic: true }]} />
            </motion.div>

            <div className="about-architecture" aria-hidden="true">
              <Image src="/images/about-community-foreground.webp" alt="" fill sizes="100vw" loading="eager" className="about-scene-image" onLoad={() => setReady(true)} onError={() => setImageError(true)} />
            </div>

          </div>
        </div>
      </div>
    </section>
  );
}
