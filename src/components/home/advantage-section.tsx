"use client";

import Image from "next/image";
import { ArrowUpRight, Compass, Expand, MapPin, Plus, ShieldCheck } from "lucide-react";
import Reveal from "@/components/motion/scroll-reveal";
import KineticText from "@/components/motion/kinetic-text";
import ImageReveal from "@/components/motion/image-reveal";
import { useId, useState } from "react";
import "./advantage-section.css";

const advantages = [
  {
    icon: MapPin,
    title: "A location with a sense of belonging.",
    text: "Look beyond the address. Explore locations with everyday connections, neighborhood character, and space for the life you have in mind.",
  },
  {
    icon: ShieldCheck,
    title: "Clarity that inspires confidence.",
    text: "Make room for every question. Discuss project details, documentation, and the next steps with a team that values clear, understandable information.",
  },
  {
    icon: Expand,
    title: "Space to make it your own.",
    text: "A home, a garden, a new beginning. Explore plotted opportunities with the room and flexibility to bring your own vision to life.",
  },
  {
    icon: Compass,
    title: "A more personal way forward.",
    text: "From your first enquiry to a closer look at the possibilities, find attentive guidance shaped around your preferences, questions, and plans.",
  },
];

export default function AdvantageSection() {
  const [expanded, setExpanded] = useState<number | null>(0);
  const id = useId();

  return (
    <section className="imperial-advantage" id="advantage" aria-labelledby="advantage-heading">
      <div className="container">
        <Reveal className="advantage-heading">
          <div>
            <KineticText id="advantage-heading" lines={[{ text: "The difference is" }, { text: "in the details.", accent: true }]} />
          </div>
          <p className="advantage-heading-copy">A place to call your own deserves a more considered approach. Thoughtful choices. Open conversations. A vision that starts with you.</p>
        </Reveal>

        <div className="advantage-experience">
          <ImageReveal as="figure" className="advantage-landscape" variant="aperture">
            <Image src="/images/landscape.webp" alt="An architectural concept of a sunlit garden with a stone walkway, reflecting water and a shaded pavilion" fill sizes="(max-width: 760px) 100vw, 50vw" />
            <div className="advantage-image-wash" aria-hidden="true" />
            <figcaption>
              <span className="advantage-image-line" aria-hidden="true" />
              <p>Thoughtfully chosen.<br />Personally yours.</p>
            </figcaption>
          </ImageReveal>

          <Reveal className="advantage-principles" variant="sequence" delay={.12}>
            <div className="advantage-accordion motion-sequence">
              {advantages.map(({ icon: Icon, title, text }, index) => {
                const open = expanded === index;
                return (
                  <div className={`advantage-principle ${open ? "is-open" : ""}`} key={title}>
                    <h3>
                      <button id={`${id}-trigger-${index}`} aria-expanded={open} aria-controls={`${id}-panel-${index}`} onClick={() => setExpanded(open ? null : index)}>
                        <span className="advantage-principle-icon"><Icon size={21} strokeWidth={1.25} aria-hidden="true" /></span>
                        <span>{title}</span>
                        <Plus className="advantage-expand-icon" size={17} strokeWidth={1.3} aria-hidden="true" />
                      </button>
                    </h3>
                    <div className="advantage-answer" id={`${id}-panel-${index}`} role="region" aria-labelledby={`${id}-trigger-${index}`} hidden={!open}>
                      <p>{text}</p>
                    </div>
                  </div>
                );
              })}
            </div>
            <a className="advantage-conversation" href="#contact"><span>Let’s explore your next chapter</span><span className="advantage-cta-icon"><ArrowUpRight size={20} strokeWidth={1.4} aria-hidden="true" /></span></a>
          </Reveal>
        </div>

      </div>
    </section>
  );
}
