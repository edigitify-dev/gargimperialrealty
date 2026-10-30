"use client";

import useReducedMotion from "@/hooks/use-reduced-motion";
import { useSiteVisit } from "@/components/site-visit/site-visit-provider";
import Image from "next/image";
import { AnimatePresence, motion, useScroll, useTransform } from "motion/react";
import { ArrowLeft, ArrowRight, ArrowUpRight, MapPin } from "lucide-react";
import { useId, useRef, useState, type KeyboardEvent } from "react";
import type { Project } from "@/data/projects";
import Reveal from "@/components/motion/scroll-reveal";
import KineticText from "@/components/motion/kinetic-text";
import ImageReveal from "@/components/motion/image-reveal";
import "./project-folio.css";

type ProjectFolioProps = {
  projects: Project[];
};

const ease = [.22, 1, .36, 1] as const;

export default function ProjectFolio({ projects }: ProjectFolioProps) {
  const { openProject } = useSiteVisit();
  const section = useRef<HTMLElement>(null);
  const tabs = useRef<(HTMLButtonElement | null)[]>([]);
  const [selectedId, setSelectedId] = useState(projects[0]?.id ?? "");
  const [direction, setDirection] = useState(1);
  const reduced = useReducedMotion();
  const id = useId();
  const activeIndex = Math.max(0, projects.findIndex(project => project.id === selectedId));
  const active = projects[activeIndex];
  const { scrollYProgress } = useScroll({ target: section, offset: ["start end", "end start"] });
  const imageY = useTransform(scrollYProgress, [0, 1], [-20, 20]);

  function exploreProjects() {
    section.current?.scrollIntoView({ behavior: reduced ? "instant" : "smooth" });
  }

  function select(index: number) {
    if (!projects.length) return;
    const next = (index + projects.length) % projects.length;
    setDirection(next >= activeIndex ? 1 : -1);
    setSelectedId(projects[next].id);
  }

  function navigate(event: KeyboardEvent<HTMLButtonElement>, index: number) {
    const next = event.key === "Home" ? 0
      : event.key === "End" ? projects.length - 1
      : ["ArrowDown", "ArrowRight"].includes(event.key) ? (index + 1) % projects.length
      : ["ArrowUp", "ArrowLeft"].includes(event.key) ? (index - 1 + projects.length) % projects.length
      : null;
    if (next === null) return;
    event.preventDefault();
    tabs.current[next]?.focus();
  }

  return (
    <section className="project-folio" id="projects" ref={section} aria-labelledby="folio-heading">
      <div className="container">
        <Reveal className="folio-heading">
          <div><KineticText id="folio-heading" lines={[{ text: "Find your place." }]} /></div>
          <div className="folio-heading-note"><button onClick={exploreProjects}>Explore the collection <ArrowUpRight size={16} /></button></div>
        </Reveal>

        {active ? (
          <div className="folio-layout">
            <Reveal className="folio-sidebar" variant="sequence" delay={.12}>
              <div className="folio-index motion-sequence" role="tablist" aria-label="Choose a development">
                {projects.map((project, index) => {
                  const isActive = active.id === project.id;
                  const words = project.name.split(" ");
                  const lastWord = words.pop();
                  return (
                    <button className={`folio-tab ${isActive ? "is-active" : ""}`} key={project.id} role="tab" id={`${id}-tab-${project.id}`} aria-controls={`${id}-panel`} aria-selected={isActive} tabIndex={isActive ? 0 : -1} ref={element => { tabs.current[index] = element; }} onClick={() => select(index)} onFocus={() => select(index)} onKeyDown={event => navigate(event, index)}>
                      <span className="folio-tab-copy"><span className="folio-tab-name">{words.join(" ")} <span className="folio-tab-last-word">{lastWord}</span></span><span className="folio-tab-location">{project.location}</span></span>
                      <ArrowUpRight className="folio-tab-arrow" size={21} strokeWidth={1.2} />
                    </button>
                  );
                })}
              </div>
              <div className="folio-pagination">
                <div><button aria-label="Previous development" onClick={() => select(activeIndex - 1)} disabled={projects.length < 2}><ArrowLeft size={19} strokeWidth={1.3} /></button><button aria-label="Next development" onClick={() => select(activeIndex + 1)} disabled={projects.length < 2}><ArrowRight size={19} strokeWidth={1.3} /></button></div>
              </div>
            </Reveal>

            <div className="folio-feature" role="tabpanel" id={`${id}-panel`} aria-labelledby={`${id}-tab-${active.id}`} tabIndex={0}>
              <ImageReveal className="folio-image-frame" variant="shutters">
              <button className="folio-image" onClick={() => openProject(active)} aria-label={`View details of ${active.name}`}>
                <AnimatePresence initial={false} custom={direction}>
                  <motion.div className="folio-image-slide" key={active.id} custom={direction} variants={{ enter: (travel: number) => ({ clipPath: travel > 0 ? "inset(0% 0% 100% 0%)" : "inset(100% 0% 0% 0%)", opacity: 1 }), visible: { clipPath: "inset(0% 0% 0% 0%)", opacity: 1 }, exit: { opacity: 0 } }} initial="enter" animate="visible" exit="exit" transition={{ duration: reduced ? 0 : .8, ease }}>
                    <motion.div className="folio-image-parallax" style={{ y: imageY }}><Image src={active.image} alt={`${active.name}: ${active.type.toLowerCase()}, architectural concept`} fill sizes="(max-width: 900px) 100vw, 65vw" /></motion.div>
                  </motion.div>
                </AnimatePresence>
                <span className="folio-image-shade" />
                <span className="folio-image-action"><span>View project</span><ArrowUpRight size={25} strokeWidth={1.2} /></span>
              </button>
              </ImageReveal>

              <Reveal className="folio-details">
                <div className="folio-detail-copy">
                  <AnimatePresence mode="wait" initial={false}>
                    <motion.div key={active.id} initial={{ opacity: 0, y: 9 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -7 }} transition={{ duration: reduced ? 0 : .2 }}>
                      <p className="folio-location"><MapPin size={12} strokeWidth={1.4} /> {active.location}</p>
                      <h3>{active.name}</h3>
                      <p className="folio-development-type">{active.type}</p>
                    </motion.div>
                  </AnimatePresence>
                </div>
                <div className="folio-plot-size"><span>Plot size</span><strong>{active.sizes[0]}–{active.sizes[1]} <small>sq. yd.</small></strong><button onClick={() => openProject(active)}>View project <ArrowUpRight size={16} /></button></div>
              </Reveal>
            </div>
          </div>
        ) : (
          <Reveal className="folio-empty" variant="soft"><h3>A little more room<br />to explore.</h3><p>No concepts match this combination. Broaden your preferences to explore the collection.</p><button className="text-link" onClick={exploreProjects}>Reset your preferences <ArrowUpRight size={17} /></button></Reveal>
        )}

      </div>
    </section>
  );
}
