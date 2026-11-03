"use client";

import { ArrowLeft, ArrowUpRight, Check, Download } from "lucide-react";
import { motion } from "motion/react";
import { useEffect, useRef, useState, type FormEvent } from "react";
import useReducedMotion from "@/hooks/use-reduced-motion";

const interests = ["Finding a place", "A site visit", "Something else"] as const;
type Interest = (typeof interests)[number];
const initialDetails = { name: "", email: "", phone: "", location: "", message: "" };

export default function ContactForm() {
  const [interest, setInterest] = useState<Interest>(interests[0]);
  const [details, setDetails] = useState(initialDetails);
  const [prepared, setPrepared] = useState<string | null>(null);
  const heading = useRef<HTMLHeadingElement>(null);
  const nameInput = useRef<HTMLInputElement>(null);
  const reduced = useReducedMotion();

  useEffect(() => {
    if (prepared) heading.current?.focus();
  }, [prepared]);

  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setPrepared([
      "GARG IMPERIAL REALTY — CONTACT ENQUIRY", "",
      `Interested in: ${interest}`,
      `Name: ${details.name.trim()}`,
      `Email: ${details.email.trim()}`,
      `Phone: ${details.phone.trim() || "Not provided"}`,
      `Preferred location: ${details.location.trim() || "Open to suggestions"}`,
      "", "YOUR PLANS", details.message.trim() || "I would like to explore the possibilities.", "",
      "Prepared on this device. This enquiry has not been sent. Share it with the Garg Imperial Realty team to start a conversation. A site visit is not confirmed automatically.",
    ].join("\n"));
  }

  function download() {
    if (!prepared) return;
    const url = URL.createObjectURL(new Blob([prepared], { type: "text/plain;charset=utf-8" }));
    const link = document.createElement("a");
    link.href = url;
    link.download = "garg-imperial-enquiry.txt";
    document.body.appendChild(link);
    link.click();
    link.remove();
    setTimeout(() => URL.revokeObjectURL(url), 1000);
  }

  function edit() {
    setPrepared(null);
    requestAnimationFrame(() => nameInput.current?.focus());
  }

  return <div className="contact-form-panel">
    <div className="contact-panel-top"><span className="contact-eyebrow">A personal beginning</span><span className="contact-panel-index" aria-hidden="true">01 /</span></div>
    {prepared ? <motion.div className="contact-prepared" key="prepared" initial={{ opacity: 0, y: reduced ? 0 : 14 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: reduced ? 0 : .4 }}>
      <span className="contact-prepared-icon" aria-hidden="true"><Check size={26} strokeWidth={1.2} /></span>
      <h2 ref={heading} tabIndex={-1}>A little closer<br /><em>to what’s next.</em></h2>
      <p role="status">Your enquiry is ready to download. It has been prepared on this device and has not been sent.</p>
      <dl className="contact-enquiry-summary"><div><dt>Your name</dt><dd>{details.name.trim()}</dd></div><div><dt>Your interest</dt><dd>{interest}</dd></div><div><dt>Email address</dt><dd>{details.email.trim()}</dd></div></dl>
      <button className="contact-submit" type="button" onClick={download}>Download my enquiry <Download size={17} strokeWidth={1.4} aria-hidden="true" /></button>
      <button className="contact-edit" type="button" onClick={edit}><ArrowLeft size={15} strokeWidth={1.3} aria-hidden="true" /> Edit my enquiry</button>
    </motion.div> : <div>
      <h2 id="contact-form-heading">Tell us a little<br /><em>about your plans.</em></h2>
      <p className="contact-form-intro">A few details. A world of possibilities.</p>
      <form className="contact-form" aria-labelledby="contact-form-heading" onSubmit={submit}>
        <fieldset className="contact-interests"><legend>I’d like to talk about</legend><div>{interests.map(item => <label key={item} className={interest === item ? "is-selected" : ""}><input type="radio" name="interest" value={item} checked={interest === item} onChange={() => setInterest(item)} /><span>{item}</span></label>)}</div></fieldset>
        <div className="contact-field-row">
          <label className="contact-field">Your name <input ref={nameInput} name="name" autoComplete="name" placeholder="Full name" value={details.name} onChange={event => setDetails({ ...details, name: event.target.value })} required pattern=".*\S.*" title="Please enter your name." maxLength={100} /></label>
          <label className="contact-field">Email address <input type="email" name="email" autoComplete="email" placeholder="you@example.com" value={details.email} onChange={event => setDetails({ ...details, email: event.target.value })} required maxLength={254} /></label>
        </div>
        <div className="contact-field-row">
          <label className="contact-field">Phone number <span className="contact-optional">(optional)</span><input type="tel" name="phone" autoComplete="tel" placeholder="+91" value={details.phone} onChange={event => setDetails({ ...details, phone: event.target.value })} pattern="[+0-9 \(\)\-]{8,25}" title="Enter a phone number with 8 to 25 characters." maxLength={25} /></label>
          <label className="contact-field">Preferred location <span className="contact-optional">(optional)</span><input name="location" placeholder="Where do you picture yourself?" value={details.location} onChange={event => setDetails({ ...details, location: event.target.value })} maxLength={120} /></label>
        </div>
        <label className="contact-field contact-message">A little about your vision <span className="contact-optional">(optional)</span><textarea name="message" placeholder="Your plans, your questions, or the feeling you’re looking for…" rows={3} value={details.message} onChange={event => setDetails({ ...details, message: event.target.value })} maxLength={2000} /></label>
        <p className="contact-form-note" id="contact-form-note">Prepare a copy to download and share. Your details stay on this device; nothing is sent automatically.</p>
        <button className="contact-submit" type="submit" aria-describedby="contact-form-note">Prepare my enquiry <ArrowUpRight size={19} strokeWidth={1.3} aria-hidden="true" /></button>
      </form>
    </div>}
    <div className="contact-panel-foot"><span aria-hidden="true" />Considered spaces. Personal conversations.</div>
  </div>;
}
