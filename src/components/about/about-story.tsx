import Image from "next/image";
import AboutReveal from "./about-reveal";

export default function AboutStory() {
  return (
    <section className="about-story" id="story" aria-labelledby="story-heading">
      <div className="container about-story-layout">
        <AboutReveal className="about-story-portrait" variant="portrait">
          <div className="about-story-portrait-image"><Image src="/images/landscape.webp" alt="A shaded stone path winding through a garden beside still water" fill sizes="(max-width: 760px) 100vw, 45vw" /></div>
          <p>A quieter moment. A different perspective.</p>
        </AboutReveal>
        <div className="about-story-content">
          <AboutReveal variant="heading">
            <h2 id="story-heading">It starts with land.<br /><em>It comes back to you.</em></h2>
            <div className="about-story-copy">
              <p>Choosing a place is personal. It’s the morning light you picture, the garden you’ve always wanted, the room your family needs to grow.</p>
              <p>At Garg Imperial Realty, we bring that perspective to residential plots and planned communities. We take the time to understand what you’re looking for, so you can explore a place with your own life in mind.</p>
              <p>We believe a good decision comes from seeing the whole picture. The location, the details, and how it all fits into your plans.</p>
            </div>
          </AboutReveal>
          <AboutReveal className="about-story-detail" delay={.12} variant="detail">
            <Image src="/images/about-community.webp" alt="An illustrative residential avenue with open green spaces and contemporary low-rise homes" fill sizes="(max-width: 760px) 80vw, 38vw" />
          </AboutReveal>
        </div>
      </div>
    </section>
  );
}
