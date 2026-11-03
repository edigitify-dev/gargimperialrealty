"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, Mail, MapPin, Phone, Plus } from "lucide-react";
import { useId, useState } from "react";
import ScrollReveal from "@/components/motion/scroll-reveal";
import { useSiteVisit } from "@/components/site-visit/site-visit-provider";
import { contactDetails, contactQuestions } from "@/data/contact";
import ContactForm from "./contact-form";
import "./contact.css";

export default function ContactExperience() {
  const { openVisit } = useSiteVisit();
  const [expanded, setExpanded] = useState<number | null>(0);
  const id = useId();
  const hasDetails = Boolean(contactDetails.phone || contactDetails.email || contactDetails.office);

  return <div className="contact-page">
    <section className="contact-opening container" aria-labelledby="contact-heading">
      <div className="contact-opening-rule"><span className="contact-eyebrow">Contact Garg Imperial Realty</span><span>Good things begin with a conversation.</span></div>
      <div className="contact-opening-layout">
        <div className="contact-introduction">
          <h1 id="contact-heading"><span className="contact-title-line"><span>Let’s talk</span></span><span className="contact-title-line"><em>possibilities.</em></span></h1>
          <p className="contact-opening-copy">A place of your own. A plan taking shape. Or simply a question about what comes next. We’re here to help you explore it.</p>
          <ScrollReveal className="contact-visual" variant="image"><div className="contact-picture"><Image src="/images/landscape.webp" alt="An illustrative landscaped garden path beside still water, framed by trees and warm light" fill sizes="(max-width: 760px) 100vw, 46vw" priority /><div className="contact-picture-shade" aria-hidden="true" /><p>Your ideas.<br /><em>Room to grow.</em></p><span className="contact-picture-corner" aria-hidden="true" /></div><p className="contact-picture-note">A little space for bigger plans. <span>Illustrative imagery.</span></p></ScrollReveal>
          <div className="contact-invitation"><span className="contact-invitation-mark" aria-hidden="true">↗</span><div><p>Prefer to explore in person?</p><button type="button" onClick={openVisit}>Prepare a site-visit enquiry <ArrowUpRight size={16} strokeWidth={1.3} aria-hidden="true" /></button></div></div>
        </div>
        <ContactForm />
      </div>
    </section>

    {hasDetails && <section className="contact-details container" aria-label="Business contact details">
      {contactDetails.phone && <a href={`tel:${contactDetails.phone.replace(/[^+\d]/g, "")}`}><Phone size={20} strokeWidth={1.2} aria-hidden="true" /><span><span className="contact-eyebrow">Call us</span>{contactDetails.phone}</span></a>}
      {contactDetails.email && <a href={`mailto:${contactDetails.email}`}><Mail size={20} strokeWidth={1.2} aria-hidden="true" /><span><span className="contact-eyebrow">Write to us</span>{contactDetails.email}</span></a>}
      {contactDetails.office && <div><MapPin size={20} strokeWidth={1.2} aria-hidden="true" /><span><span className="contact-eyebrow">Find us</span><address>{contactDetails.office}</address>{contactDetails.officeMapUrl && <a href={contactDetails.officeMapUrl} target="_blank" rel="noreferrer">View directions <ArrowUpRight size={14} aria-hidden="true" /></a>}</span></div>}
    </section>}

    <section className="contact-questions" aria-labelledby="contact-questions-heading">
      <div className="container contact-questions-layout">
        <ScrollReveal variant="rise" className="contact-questions-intro"><span className="contact-eyebrow">A little clarity</span><h2 id="contact-questions-heading">Before we<br /> <em>begin.</em></h2><p>You don’t need all the answers.<br />A good question is a lovely place to start.</p><Link href="/about/" className="contact-about-link">Get to know us <ArrowUpRight size={18} strokeWidth={1.3} aria-hidden="true" /></Link></ScrollReveal>
        <div className="contact-question-list">{contactQuestions.map((item, index) => {
          const open = expanded === index;
          return <div className={`contact-question ${open ? "is-open" : ""}`} key={item.question}>
            <h3><button type="button" id={`${id}-question-${index}`} aria-expanded={open} aria-controls={`${id}-answer-${index}`} onClick={() => setExpanded(open ? null : index)}><span className="contact-question-number" aria-hidden="true">{String(index + 1).padStart(2, "0")}</span><span>{item.question}</span><Plus size={19} strokeWidth={1.2} aria-hidden="true" /></button></h3>
            <div className="contact-question-answer" id={`${id}-answer-${index}`} role="region" aria-labelledby={`${id}-question-${index}`} aria-hidden={!open} inert={!open}><div><p>{item.answer}</p></div></div>
          </div>;
        })}</div>
      </div>
    </section>

    <aside className="contact-closing container" aria-label="Continue exploring"><span className="contact-eyebrow">Until we speak</span><p>A fresh perspective<br />is always <em>a good beginning.</em></p><Link href="/blog/">Spend a moment with the journal <ArrowUpRight size={19} strokeWidth={1.3} aria-hidden="true" /></Link></aside>
  </div>;
}
