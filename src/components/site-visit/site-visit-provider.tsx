"use client";

import { createContext, useCallback, useContext, useMemo, useState, type ReactNode } from "react";
import type { Project } from "@/data/projects";
import Dialog from "@/components/ui/dialog";
import ProjectDetails from "./project-details";
import VisitForm from "./visit-form";

type SiteVisitActions = {
  openVisit: () => void;
  openProject: (project: Project) => void;
};

const SiteVisitContext = createContext<SiteVisitActions | null>(null);

export function useSiteVisit() {
  const context = useContext(SiteVisitContext);

  if (!context) {
    throw new Error("useSiteVisit must be used within SiteVisitProvider");
  }

  return context;
}

export default function SiteVisitProvider({ children }: { children: ReactNode }) {
  const [visitOpen, setVisitOpen] = useState(false);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const openVisit = useCallback(() => setVisitOpen(true), []);
  const openProject = useCallback((project: Project) => setSelectedProject(project), []);
  const actions = useMemo(() => ({ openVisit, openProject }), [openVisit, openProject]);

  return (
    <SiteVisitContext.Provider value={actions}>
      {children}
      {visitOpen && (
        <Dialog label="Prepare a site visit enquiry" onClose={() => setVisitOpen(false)}>
          <VisitForm project={selectedProject?.name} />
        </Dialog>
      )}
      {selectedProject && !visitOpen && (
        <Dialog
          label={`${selectedProject.name} project details`}
          onClose={() => setSelectedProject(null)}
          wide
        >
          <ProjectDetails project={selectedProject} onBookVisit={openVisit} />
        </Dialog>
      )}
    </SiteVisitContext.Provider>
  );
}
