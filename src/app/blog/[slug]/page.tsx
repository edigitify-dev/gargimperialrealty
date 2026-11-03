import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowUpRight } from "lucide-react";
import JournalReveal from "@/components/journal/journal-reveal";
import { journalPosts, summarizePost } from "@/data/journal";

type Props = { params: Promise<{ slug: string }> };
export const dynamicParams = false;

export function generateStaticParams() {
  return journalPosts.map(post => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = journalPosts.find(post => post.slug === slug);
  if (!post) return {};
  return { title: `${post.title} | The Imperial Journal`, description: post.excerpt, openGraph: { type: "article", title: post.title, description: post.excerpt, images: [{ url: post.image, alt: post.imageAlt }] } };
}

export default async function ArticlePage({ params }: Props) {
  const { slug } = await params;
  const post = journalPosts.find(post => post.slug === slug);
  if (!post) notFound();
  const summary = summarizePost(post);
  const related = [...journalPosts.filter(item => item.slug !== slug && item.category === post.category), ...journalPosts.filter(item => item.slug !== slug && item.category !== post.category)].slice(0, 2);

  return <article className="journal-page journal-article">
    <header className="journal-article-heading container">
      <Link href="/blog/" className="journal-back"><ArrowLeft size={16} strokeWidth={1.3} aria-hidden="true" /> Back to the journal</Link>
      <JournalReveal>
        <div className="journal-meta"><span>{post.category}</span><span>{summary.readingMinutes} min read</span></div>
        <h1>{post.title}</h1>
        <p className="journal-article-deck">{post.excerpt}</p>
        <p className="journal-byline">Words by Garg Imperial Realty</p>
      </JournalReveal>
    </header>
    <JournalReveal className="journal-article-hero container" variant="image"><div><Image src={post.image} alt={post.imageAlt} fill priority sizes="100vw" style={{ objectPosition: post.imagePosition }} /></div><p>Architectural imagery is illustrative.</p></JournalReveal>
    <div className="journal-article-layout container">
      <nav className="journal-contents" aria-label="In this story"><span className="journal-eyebrow">In this story</span>{post.sections.map((section, index) => <a key={section.id} href={`#${section.id}`}><span>{String(index + 1).padStart(2, "0")}</span>{section.title}</a>)}</nav>
      <div className="journal-article-body">{post.sections.map(section => <section id={section.id} key={section.id} aria-labelledby={`${section.id}-heading`}><JournalReveal><h2 id={`${section.id}-heading`}>{section.title}</h2>{section.paragraphs.map(paragraph => <p key={paragraph}>{paragraph}</p>)}</JournalReveal></section>)}<Link href="/blog/" className="journal-back journal-article-return"><ArrowLeft size={16} strokeWidth={1.3} aria-hidden="true" /> Return to the journal</Link></div>
    </div>
    <section className="journal-related container" aria-labelledby="related-heading">
      <JournalReveal><span className="journal-eyebrow">Keep exploring</span><h2 id="related-heading">Another <em>perspective.</em></h2></JournalReveal>
      <div className="journal-related-grid">{related.map(item => <Link key={item.slug} href={`/blog/${item.slug}/`}><div className="journal-related-image"><Image src={item.image} alt={item.imageAlt} fill sizes="(max-width: 760px) 100vw, 45vw" /></div><span className="journal-eyebrow">{item.category}</span><h3>{item.title}<ArrowUpRight size={21} strokeWidth={1.3} aria-hidden="true" /></h3></Link>)}</div>
    </section>
  </article>;
}
