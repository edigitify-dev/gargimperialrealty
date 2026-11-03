"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowDown, ArrowUpRight } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";
import useReducedMotion from "@/hooks/use-reduced-motion";
import { journalCategories, type JournalSummary } from "@/data/journal";
import JournalReveal from "./journal-reveal";

export default function JournalIndex({ posts }: { posts: JournalSummary[] }) {
  const [category, setCategory] = useState<(typeof journalCategories)[number]>("All stories");
  const reduced = useReducedMotion();
  const [featured, ...stories] = posts;
  const visible = category === "All stories" ? stories : stories.filter(post => post.category === category);

  return (
    <div className="journal-page">
      <section className="journal-opening container" aria-labelledby="journal-heading">
        <div className="journal-masthead"><span>The Imperial Journal</span><span>Land. Life. Perspective.</span></div>
        <div className="journal-opening-layout">
          <h1 id="journal-heading"><span className="journal-title-line"><span>Beyond</span></span><span className="journal-title-line"><em>the address.</em></span></h1>
          <div className="journal-opening-aside">
            <span className="journal-eyebrow">A different point of view</span>
            <p>Ideas for the places we choose.<br />Inspiration for the lives we build.</p>
            <a className="journal-explore" href="#stories">Explore the journal <span><ArrowDown size={16} strokeWidth={1.4} aria-hidden="true" /></span></a>
          </div>
        </div>
      </section>

      <section className="journal-feature container" aria-label="Featured story">
        <JournalReveal className="journal-feature-visual" variant="image">
          <Link href={`/blog/${featured.slug}/`} className="journal-feature-image" aria-label={`Read ${featured.title}`}>
            <Image src={featured.image} alt={featured.imageAlt} fill priority sizes="(max-width: 760px) 100vw, 64vw" style={{ objectPosition: featured.imagePosition }} />
            <span className="journal-image-label">A little room. A world of possibility.</span>
            <span className="journal-feature-seal" aria-hidden="true"><ArrowUpRight size={24} strokeWidth={1.1} /></span>
          </Link>
        </JournalReveal>
        <div className="journal-feature-copy">
          <JournalReveal>
            <div className="journal-feature-kicker"><span className="journal-eyebrow">The cover story</span><span aria-hidden="true">01 /</span></div>
            <div className="journal-meta"><span>{featured.category}</span><span>{featured.readingMinutes} min read</span></div>
            <h2><Link href={`/blog/${featured.slug}/`}>{featured.title}</Link></h2>
            <p>{featured.excerpt}</p>
            <Link className="journal-read-link" href={`/blog/${featured.slug}/`}>Read the story <ArrowUpRight size={19} strokeWidth={1.3} aria-hidden="true" /></Link>
          </JournalReveal>
        </div>
      </section>

      <section className="journal-stories container" id="stories" aria-labelledby="stories-heading">
        <JournalReveal className="journal-stories-heading">
          <div><span className="journal-eyebrow">Notes worth making time for</span><h2 id="stories-heading">A considered <em>collection.</em></h2></div>
          <p>Fresh perspectives on space, setting,<br />and the feeling of home.</p>
        </JournalReveal>
        <div className="journal-filter-bar">
          <div className="journal-filters" role="group" aria-label="Filter stories by category">
            {journalCategories.map(item => <button key={item} type="button" aria-pressed={category === item} onClick={() => setCategory(item)}>
              {item}
              {category === item && <motion.span className="journal-filter-line" layoutId="journal-category" transition={{ duration: reduced ? 0 : .3 }} />}
            </button>)}
          </div>
          <span className="journal-story-count" role="status">{String(visible.length).padStart(2, "0")} {visible.length === 1 ? "story" : "stories"}</span>
        </div>
        <motion.div className="journal-grid" layout={reduced ? false : true}>
          <AnimatePresence mode="popLayout" initial={false}>
            {visible.map(post => <motion.article key={post.slug} layout={reduced ? false : "position"} initial={{ opacity: 0, y: reduced ? 0 : 24 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: reduced ? 0 : -16 }} transition={{ duration: reduced ? 0 : .35 }}>
              <JournalReveal className="journal-card" variant="image">
                <Link href={`/blog/${post.slug}/`} className="journal-card-link">
                  <div className="journal-card-image"><Image src={post.image} alt={post.imageAlt} fill sizes="(max-width: 760px) 100vw, 47vw" style={{ objectPosition: post.imagePosition }} /><span className="journal-card-arrow" aria-hidden="true"><ArrowUpRight size={22} strokeWidth={1.2} /></span></div>
                  <div className="journal-meta"><span>{post.category}</span><span>{post.readingMinutes} min read</span></div>
                  <h3>{post.title}</h3>
                  <p>{post.excerpt}</p>
                  <span className="journal-card-read">Read the story <ArrowUpRight size={15} strokeWidth={1.3} aria-hidden="true" /></span>
                </Link>
              </JournalReveal>
            </motion.article>)}
          </AnimatePresence>
        </motion.div>
      </section>

      <aside className="journal-note" aria-label="Our point of view">
        <JournalReveal className="container journal-note-layout" variant="note">
          <div className="journal-note-label"><span className="journal-eyebrow">Our point of view</span><span className="journal-note-mark" aria-hidden="true">“</span></div>
          <div><p>A place is more than where we live.<br /><em>It is how we choose to live.</em></p><Link href="/about/" className="journal-read-link">The thinking behind our work <ArrowUpRight size={18} strokeWidth={1.3} aria-hidden="true" /></Link></div>
        </JournalReveal>
      </aside>
    </div>
  );
}
