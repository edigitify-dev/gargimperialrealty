import type { Metadata } from "next";
import JournalIndex from "@/components/journal/journal-index";
import { journalPosts, summarizePost } from "@/data/journal";

export const metadata: Metadata = {
  title: "The Imperial Journal | Garg Imperial Realty",
  description: "Beyond the address. Thoughtful perspectives on considered spaces, beautiful settings, and the feeling of home from Garg Imperial Realty.",
  openGraph: { title: "The Imperial Journal | Beyond the address.", description: "Ideas for the places we choose. Inspiration for the lives we build.", images: [{ url: "/images/hero.webp", alt: "A contemporary pavilion opening onto gardens and a reflecting pool" }] },
};

export default function BlogPage() {
  return <JournalIndex posts={journalPosts.map(summarizePost)} />;
}
