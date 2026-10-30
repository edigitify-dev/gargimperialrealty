"use client";

import { ArrowUpRight } from "lucide-react";
import { useSiteVisit } from "@/components/site-visit/site-visit-provider";
import AboutReveal from "./about-reveal";
import { aboutJourney } from "./about-content";

export default function AboutApproach() {
  const { openVisit } = useSiteVisit();

  return (
    <section className="about-journey" id="approach" aria-labelledby="approach-heading">
      <div className="container">
        <AboutReveal className="about-journey-intro" variant="heading">
          <div className="about-journey-heading">
            <p className="about-journey-eyebrow">A considered way forward</p>
            <h2 id="approach-heading">Take your time.<br /><em>Find your place.</em></h2>
          </div>
          <div className="about-journey-aside"><p>A conversation. A closer look. A clearer perspective. We’re here to guide you, at a pace that feels right for you.</p><button className="about-conversation" onClick={openVisit}>Let’s talk about your plans <ArrowUpRight size={20} strokeWidth={1.3} aria-hidden="true" /></button></div>
        </AboutReveal>
        <ol className="about-journey-steps">
          {aboutJourney.map((step, index) => (
            <li key={step.title}>
              <AboutReveal className="about-journey-step" delay={index * .1} variant="chapter">
                <div className="about-journey-marker" aria-hidden="true">
                  <span>{String(index + 1).padStart(2, "0")}</span>
                </div>
                <h3>{step.title}</h3>
                <p>{step.description}</p>
              </AboutReveal>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
