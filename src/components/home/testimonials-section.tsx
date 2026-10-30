"use client";

import useReducedMotion from "@/hooks/use-reduced-motion";
import { ArrowLeft, ArrowRight, Quote } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";
import Reveal from "@/components/motion/scroll-reveal";
import KineticText from "@/components/motion/kinetic-text";
import "./testimonials-section.css";

// Preview copy only. Replace with approved, consented client testimonials.
const testimonials = [
  {
    quote: "We were looking for a plot. What we really wanted was a place where we could picture the rest of our lives.",
    perspective: "A place to belong",
    person: "A future homeowner",
    detail: "The beginning of a new chapter",
  },
  {
    quote: "Having the space to ask questions made all the difference. We could take our time and think about what mattered to us.",
    perspective: "Confidence in the conversation",
    person: "A family's perspective",
    detail: "Finding a more personal way forward",
  },
  {
    quote: "It started with an idea of our own home. Seeing the possibilities helped us imagine everything that could come next.",
    perspective: "Room for a bigger dream",
    person: "A new beginning",
    detail: "A vision with room to grow",
  },
];

export default function TestimonialsSection() {
  const [active, setActive] = useState(0);
  const reduced = useReducedMotion();
  const testimonial = testimonials[active];
  const select = (index: number) => setActive((index + testimonials.length) % testimonials.length);

  return (
    <section className="imperial-testimonials" id="testimonials" aria-labelledby="testimonials-heading" aria-roledescription="carousel">
      <div className="container testimonials-layout">
        <Reveal className="testimonials-intro">
          <KineticText id="testimonials-heading" lines={[{ text: "Every place." }, { text: "A personal story.", accent: true }]} />
          <p>Illustrative stories about finding a place to call your own.</p>
        </Reveal>

        <Reveal className="testimonials-stage" delay={.12}>
          <Quote className="testimonials-quote-mark" size={44} strokeWidth={.9} aria-hidden="true" />
          <div className="testimonials-story" aria-live="polite" aria-atomic="true">
            <AnimatePresence mode="wait" initial={false}>
              <motion.figure key={active} initial={{ opacity: 0, y: reduced ? 0 : 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: reduced ? 0 : -8 }} transition={{ duration: reduced ? 0 : .22 }}>
                <blockquote><KineticText as="p" lines={[{ text: `“${testimonial.quote}”` }]} /></blockquote>
                <figcaption><span className="testimonials-monogram" aria-hidden="true">GI</span><span><strong>{testimonial.person}</strong><span>{testimonial.detail}</span></span></figcaption>
              </motion.figure>
            </AnimatePresence>
          </div>
          <div className="testimonials-navigation">
            <div className="testimonials-indicators" aria-label="Choose a testimonial">{testimonials.map((item, index) => <button key={item.perspective} aria-label={`Show testimonial ${index + 1}: ${item.perspective}`} aria-current={active === index ? "true" : undefined} onClick={() => select(index)}><span /></button>)}</div>
            <div className="testimonials-arrows"><button aria-label="Previous testimonial" onClick={() => select(active - 1)}><ArrowLeft size={18} strokeWidth={1.3} /></button><button aria-label="Next testimonial" onClick={() => select(active + 1)}><ArrowRight size={18} strokeWidth={1.3} /></button></div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
