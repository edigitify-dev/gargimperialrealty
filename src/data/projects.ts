export type Project = {
  id: string;
  name: string;
  location: string;
  region: string;
  sizes: [number, number];
  budget: "essential" | "signature" | "bespoke";
  type: string;
  image: string;
  description: string;
};

// Illustrative, editable sample data. Replace with approved inventory before launch.
// Budget bands demonstrate filtering only and do not represent verified prices.
export const projects: Project[] = [
  {
    id: "imperial-greens", name: "Imperial Greens", location: "New Chandigarh", region: "Chandigarh region",
    sizes: [150, 250], budget: "essential", type: "Garden-side residential plots", image: "/images/landscape.webp",
    description: "A concept for a quieter everyday. Generous green edges and thoughtfully connected residential plots offer room to imagine a home of your own.",
  },
  {
    id: "the-imperial-enclave", name: "The Imperial Enclave", location: "Mohali", region: "Mohali region",
    sizes: [250, 500], budget: "signature", type: "Gated plotted community", image: "/images/hero.webp",
    description: "An illustrative gated community bringing considered architecture, open landscapes and well-planned residential streets into one cohesive vision.",
  },
  {
    id: "imperial-meadows", name: "Imperial Meadows", location: "Panchkula", region: "Panchkula region",
    sizes: [350, 1000], budget: "bespoke", type: "Expansive residential plots", image: "/images/aerial.webp",
    description: "An expansive land concept with a landscape-first approach, generous plot proportions and the freedom to plan for what comes next.",
  },
];
