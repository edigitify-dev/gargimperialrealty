"use client";

import { ArrowUpRight, Plus } from "lucide-react";
import Image from "next/image";
import { useState } from "react";
import ImageReveal from "@/components/motion/image-reveal";
import KineticText from "@/components/motion/kinetic-text";
import Reveal from "@/components/motion/scroll-reveal";
import { masterplanPoints } from "@/data/masterplan";
import "./masterplan-section.css";

export default function MasterplanSection() {
  const [activePoint, setActivePoint] = useState(0);
  const selectedPoint = masterplanPoints[activePoint];

  return (
    <section className="section masterplan" id="masterplan">
      <div className="container">
        <div className="masterplan-layout">
          <Reveal className="masterplan-copy">
            <KineticText lines={[
              { text: "Every great future" },
              { text: "starts with a" },
              { text: "thoughtful plan.", italic: true },
            ]} />
            <p className="muted">
              Beyond individual plots, we see the whole picture. Connected streets, generous green
              spaces, and places that bring people together.
            </p>
            <div className="plan-list motion-sequence" role="group" aria-label="Explore masterplan features">
              {masterplanPoints.map((point, index) => (
                <button
                  key={point.name}
                  onClick={() => setActivePoint(index)}
                  aria-pressed={activePoint === index}
                  className={activePoint === index ? "is-active" : ""}
                >
                  <span>0{index + 1}</span>{point.name}<ArrowUpRight size={16} />
                </button>
              ))}
            </div>
          </Reveal>
          <ImageReveal className="plan-visual" variant="blueprint">
            <div className="plan-image">
              <Image
                src="/images/masterplan.webp"
                alt="Illustrative top-down masterplan showing residential plots, internal roads, a central green park, and community spaces"
                fill
                sizes="(max-width: 900px) 100vw, 60vw"
              />
              {masterplanPoints.map((point, index) => (
                <button
                  key={point.name}
                  className={`plan-point ${activePoint === index ? "is-active" : ""}`}
                  style={{ left: `${point.x}%`, top: `${point.y}%` }}
                  aria-label={point.name}
                  aria-pressed={activePoint === index}
                  aria-describedby={activePoint === index ? "plan-tooltip" : undefined}
                  onMouseEnter={() => setActivePoint(index)}
                  onFocus={() => setActivePoint(index)}
                  onClick={() => setActivePoint(index)}
                >
                  <Plus size={17} />
                </button>
              ))}
              <div className="plan-tooltip" id="plan-tooltip" role="status">
                <span className="tooltip-number">0{activePoint + 1}</span>
                <div>
                  <strong>{selectedPoint.name}</strong>
                  <p>{selectedPoint.description}</p>
                </div>
              </div>
              <span className="plan-north" aria-label="Conceptual north orientation">
                N<ArrowUpRight size={22} />
              </span>
            </div>
          </ImageReveal>
        </div>
      </div>
    </section>
  );
}
