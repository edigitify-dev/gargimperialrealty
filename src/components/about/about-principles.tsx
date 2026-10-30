"use client";

import Image from "next/image";
import { Plus } from "lucide-react";
import { motion } from "motion/react";
import { useId, useState } from "react";
import useReducedMotion from "@/hooks/use-reduced-motion";
import AboutReveal, { aboutEase } from "./about-reveal";
import { aboutPrinciples } from "./about-content";

export default function AboutPrinciples() {
  const [active, setActive] = useState(0);
  const [expanded, setExpanded] = useState<number | null>(0);
  const reduced = useReducedMotion();
  const id = useId();

  return (
    <section className="about-beliefs" id="principles" aria-labelledby="principles-heading">
      <div className="about-beliefs-layout">
        <AboutReveal className="about-beliefs-visual" variant="portrait">
          {aboutPrinciples.map((principle, index) => (
            <motion.div
              key={principle.image}
              className="about-beliefs-image"
              aria-hidden={active !== index}
              initial={false}
              animate={{ opacity: active === index ? 1 : 0, scale: reduced || active !== index ? 1 : 1.025 }}
              transition={{ duration: reduced ? 0 : 1.1, ease: aboutEase }}
            >
              <Image src={principle.image} alt={principle.alt} fill sizes="(max-width: 760px) 100vw, 50vw" />
            </motion.div>
          ))}
          <div className="about-beliefs-shade" aria-hidden="true" />
          <p className="about-beliefs-caption">{aboutPrinciples[active].caption}</p>
        </AboutReveal>
        <div className="about-beliefs-content">
          <AboutReveal variant="heading">
            <h2 id="principles-heading">Good relationships.<br /><em>Better beginnings.</em></h2>
            <p className="about-beliefs-intro">The way we work is simple. Be attentive, be clear, and keep your plans at the centre of the conversation.</p>
          </AboutReveal>
          <AboutReveal className="about-beliefs-list" delay={.1}>
            {aboutPrinciples.map((principle, index) => {
              const open = expanded === index;
              return (
                <div className={`about-belief ${open ? "is-open" : ""}`} key={principle.title}>
                  <h3><button id={`${id}-trigger-${index}`} aria-expanded={open} aria-controls={`${id}-answer-${index}`} onClick={() => { setExpanded(open ? null : index); if (!open) setActive(index); }}><span>{principle.title}</span><Plus size={19} strokeWidth={1.3} aria-hidden="true" /></button></h3>
                  <div id={`${id}-answer-${index}`} className="about-belief-answer" role="region" aria-labelledby={`${id}-trigger-${index}`} aria-hidden={!open} inert={!open}>
                    <div><p>{principle.description}</p></div>
                  </div>
                </div>
              );
            })}
          </AboutReveal>
        </div>
      </div>
    </section>
  );
}
