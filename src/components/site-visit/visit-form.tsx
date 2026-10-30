"use client";

import { ArrowRight, ArrowUpRight, CheckCheck, Download } from "lucide-react";
import { useState, type FormEvent } from "react";
import { projects } from "@/data/projects";
import "./visit-form.css";

export default function VisitForm({ project }: { project?: string }) {
  const [request, setRequest] = useState<string | null>(null);
  const today = new Intl.DateTimeFormat("en-CA", { timeZone: "Asia/Kolkata" }).format(new Date());

  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const data = new FormData(event.currentTarget);

    setRequest([
      "GARG IMPERIAL REALTY — SITE VISIT ENQUIRY",
      "",
      `Name: ${data.get("name")}`,
      `Phone: ${data.get("phone")}`,
      `Email: ${data.get("email")}`,
      `Preferred date: ${data.get("date")}`,
      `Interest: ${data.get("interest")}`,
      `Notes: ${data.get("message") || "None"}`,
      "",
      "Prepared locally. This request has not been sent. Please share it with the Garg Imperial Realty team to arrange your visit.",
      "Sample projects are illustrative and not verified inventory.",
    ].join("\n"));
  }

  function download() {
    if (!request) return;

    const url = URL.createObjectURL(new Blob([request], { type: "text/plain;charset=utf-8" }));
    const link = document.createElement("a");
    link.href = url;
    link.download = "garg-imperial-site-visit.txt";
    link.click();
    URL.revokeObjectURL(url);
  }

  if (request !== null) {
    return (
      <div className="visit-success" role="status">
        <span className="success-icon"><CheckCheck /></span>
        <p className="eyebrow">YOUR NEXT CHAPTER</p>
        <h2>Your visit enquiry,<br /><em>thoughtfully prepared.</em></h2>
        <p>
          Download your enquiry and share it with the Garg Imperial Realty team to arrange your visit.
          Your request has been prepared on this device and has not been sent.
        </p>
        <button onClick={download} className="button primary">
          Download my enquiry <Download size={17} />
        </button>
        <button className="text-link" onClick={() => setRequest(null)}>
          Edit enquiry <ArrowRight size={16} />
        </button>
      </div>
    );
  }

  return (
    <>
      <p className="eyebrow">LET’S WALK THE POSSIBILITIES</p>
      <h2>A place for<br /><em>your next chapter.</em></h2>
      <p className="muted form-intro">
        Tell us a little about your plans. Prepare a site-visit enquiry to share with our team.
      </p>
      <form onSubmit={submit} className="visit-form">
        <label>
          Your name
          <input name="name" autoComplete="name" placeholder="Full name" required maxLength={100} />
        </label>
        <div className="form-row">
          <label>
            Phone number
            <input name="phone" type="tel" autoComplete="tel" placeholder="+91" pattern="[+0-9 ]{8,20}" required />
          </label>
          <label>
            Email address
            <input name="email" type="email" autoComplete="email" placeholder="you@example.com" required />
          </label>
        </div>
        <div className="form-row">
          <label>
            Preferred date
            <input name="date" type="date" min={today} required />
          </label>
          <label>
            Interested in
            <select name="interest" defaultValue={project || "Help me explore"}>
              <option>Help me explore</option>
              {projects.map((item) => <option key={item.id}>{item.name}</option>)}
            </select>
          </label>
        </div>
        <label>
          A little about your vision <span>(optional)</span>
          <textarea
            name="message"
            placeholder="Your preferred location, plot size, or anything you have in mind…"
            rows={3}
            maxLength={1000}
          />
        </label>
        <p className="form-note">
          This demo prepares a downloadable enquiry. No personal information is transmitted,
          and a visit is not booked automatically.
        </p>
        <button type="submit" className="button primary">
          Prepare my site visit <ArrowUpRight size={18} />
        </button>
      </form>
    </>
  );
}
