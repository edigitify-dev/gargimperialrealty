import AboutHero from "./about-hero";
import AboutStory from "./about-story";
import AboutPrinciples from "./about-principles";
import AboutApproach from "./about-approach";
import "./about-experience.css";

export default function AboutExperience() {
  return (
    <div className="about-page">
      <AboutHero />
      <AboutStory />
      <AboutPrinciples />
      <AboutApproach />
    </div>
  );
}
