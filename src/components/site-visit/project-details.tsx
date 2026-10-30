import { ArrowUpRight, MapPin } from "lucide-react";
import Image from "next/image";
import type { Project } from "@/data/projects";
import "./project-details.css";

type ProjectDetailsProps = {
  project: Project;
  onBookVisit: () => void;
};

export default function ProjectDetails({ project, onBookVisit }: ProjectDetailsProps) {
  return (
    <>
      <div className="detail-image">
        <Image src={project.image} alt={`${project.name} architectural concept`} fill sizes="800px" />
      </div>
      <div className="detail-content">
        <p className="eyebrow">ILLUSTRATIVE DEVELOPMENT CONCEPT</p>
        <h2>{project.name}</h2>
        <p className="detail-location">
          <MapPin size={16} /> {project.location} · Sample location
        </p>
        <p className="muted">{project.description}</p>
        <div className="detail-facts">
          <div>
            <span>PLOT SIZE CONCEPT</span>
            <strong>{project.sizes[0]}–{project.sizes[1]} sq. yd.</strong>
          </div>
          <div>
            <span>DEVELOPMENT TYPE</span>
            <strong>{project.type}</strong>
          </div>
        </div>
        <p className="form-note">
          This is an editable sample, not a real property offering. Pricing, availability,
          legal approvals and amenities are unverified. Speak with the team about approved opportunities.
        </p>
        <button className="button primary" onClick={onBookVisit}>
          Enquire about your vision <ArrowUpRight size={18} />
        </button>
      </div>
    </>
  );
}
