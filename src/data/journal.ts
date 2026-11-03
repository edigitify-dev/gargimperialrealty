export const journalCategories = ["All stories", "Living well", "Design notes", "Land & place"] as const;
export type JournalCategory = Exclude<(typeof journalCategories)[number], "All stories">;

export type JournalPost = {
  slug: string;
  category: JournalCategory;
  title: string;
  excerpt: string;
  image: string;
  imageAlt: string;
  imagePosition?: string;
  sections: { id: string; title: string; paragraphs: string[] }[];
};

// Original editorial copy. Images illustrate ideas, rather than specific properties.
export const journalPosts: JournalPost[] = [
  {
    slug: "the-quiet-luxury-of-room-to-breathe",
    category: "Living well",
    title: "The quiet luxury of room to breathe.",
    excerpt: "Some of life’s finest things aren’t things at all. A slower morning. A little more green. The freedom to make a place your own.",
    image: "/images/hero.webp",
    imageAlt: "An illustrative stone pavilion opening onto a still reflecting pool and gardens",
    imagePosition: "center 65%",
    sections: [
      { id: "a-different-kind-of-luxury", title: "A different kind of luxury", paragraphs: [
        "Picture a morning with nothing competing for your attention. Light arrives slowly across the floor. A door opens to the garden. There is a place to sit, and enough time to enjoy it. It is a modest scene, but an expansive feeling.",
        "When we imagine a home, it is easy to begin with what can be seen: a beautiful entrance, a generous room, a carefully chosen finish. Yet the details we come to value most are often the ones that give something back. A sense of ease. A moment of privacy. Room to breathe.",
      ] },
      { id: "space-for-the-everyday", title: "Space for the everyday", paragraphs: [
        "A little extra space need not have a grand purpose. It might become a corner for books, a kitchen garden, or an open patch where children invent their own games. Its value lies in the possibility, rather than in a fixed idea of what it should be.",
        "Think about the ordinary moments you would like your home to hold. Where would you have your first cup of tea? Where would friends gather? What would you like to see when you look outside? These small questions can reveal more than a long list of features.",
      ] },
      { id: "a-place-that-feels-like-you", title: "A place that feels like you", paragraphs: [
        "Choosing a place is also a chance to choose a rhythm. You may be drawn to a quiet edge, an open view, or the feeling of being part of a neighbourhood. There is no single version of a life well lived.",
        "Begin with the feeling you are looking for. Walk slowly. Notice where you naturally pause. Give yourself permission to imagine a life there, beyond the first impression. Sometimes the most meaningful kind of luxury is simply a place that lets you feel at home.",
      ] },
    ],
  },
  {
    slug: "a-home-that-follows-the-light",
    category: "Design notes",
    title: "A home that follows the light.",
    excerpt: "Before the finishes and the furniture, there is daylight. A few thoughts on making room for its changing character.",
    image: "/images/hero-estate-background.webp",
    imageAlt: "An illustrative contemporary clubhouse with deep rooflines, open glazing and a landscaped forecourt",
    imagePosition: "center 65%",
    sections: [
      { id: "notice-the-morning", title: "Notice the morning", paragraphs: [
        "The same room can hold many different moods over the course of a day. Morning light may feel gentle and inviting; later, a shaded corner might become the place everyone gravitates towards. Before imagining a finished interior, it can be useful to imagine these changing moments.",
        "When you visit a setting, notice where the sun is and where shade falls. Picture the spaces you use most, from a breakfast table to a place for reading. A conversation with your architect can turn these observations into questions worth exploring in a design.",
      ] },
      { id: "make-room-for-shade", title: "Make room for shade", paragraphs: [
        "A love of daylight does not mean every space needs to be bright all the time. A verandah, a deep threshold, or a tree outside a window can create a softer transition between indoors and out. Shade has its own atmosphere.",
        "Think of light as something to compose with, alongside privacy, views, and the way you move through a home. The most comfortable balance will depend on the setting and on how you like to live. It deserves a considered discussion rather than a universal formula.",
      ] },
      { id: "leave-space-for-change", title: "Leave space for change", paragraphs: [
        "You do not need to decide every detail at once. Begin by noticing the places that make you feel comfortable, and the qualities they share. Keep photographs or a few simple notes about the light, the materials, and the time of day.",
        "A home takes shape through many decisions. Remembering the feeling you started with can help those decisions form a coherent whole: a place that looks beautiful, but also feels right on an ordinary afternoon.",
      ] },
    ],
  },
  {
    slug: "look-beyond-the-boundary",
    category: "Land & place",
    title: "Look beyond the boundary.",
    excerpt: "A plot is part of a bigger picture. Take a walk through the surroundings, and discover what a map alone cannot tell you.",
    image: "/images/aerial.webp",
    imageAlt: "An illustrative aerial view of residential plots, tree-lined streets and landscaped open space",
    sections: [
      { id: "the-setting-is-part-of-the-story", title: "The setting is part of the story", paragraphs: [
        "It is natural to focus on the outline of a plot. But the feeling of a place often begins before you reach its boundary: the approach, the character of the streets, the view at a corner, or a pocket of green along the way.",
        "Give the surroundings the same attention you give the plot itself. Walk a little further than you planned. Notice what you would pass each day and where you might choose to linger. These observations can help you picture everyday life with greater clarity.",
      ] },
      { id: "picture-your-own-routine", title: "Picture your own routine", paragraphs: [
        "Your idea of a good location is personal. It may be shaped by the places you visit often, the people you want to stay close to, or the kind of quiet you seek at the end of the day. Start with your real routine rather than an imagined ideal.",
        "Make a short list of the journeys that matter to you. Explore them for yourself where possible, and leave room for questions. A first visit offers a useful impression; another visit at a different time can add a new perspective.",
      ] },
      { id: "bring-your-questions", title: "Bring your questions", paragraphs: [
        "A thoughtful visit is an opportunity to learn, not a test you need to prepare for perfectly. Ask about what you see, what is planned, and what information is available to take away and review.",
        "Give yourself time to put the details alongside the feeling of the place. Both deserve attention. The aim is a fuller understanding of the setting, so the next conversation can begin from something more concrete than a first impression.",
      ] },
    ],
  },
  {
    slug: "the-beauty-of-an-ordinary-morning",
    category: "Living well",
    title: "The beauty of an ordinary morning.",
    excerpt: "A garden path, an unhurried cup of tea, a familiar face. The little rituals that make a neighbourhood feel like home.",
    image: "/images/landscape.webp",
    imageAlt: "An illustrative shaded garden path beside a reflecting pool and lush planting",
    sections: [
      { id: "begin-with-a-small-ritual", title: "Begin with a small ritual", paragraphs: [
        "Some of the strongest memories of home are surprisingly simple. The sound of a gate, a particular chair in the morning sun, or the route of a familiar walk. They belong to the ordinary parts of life, repeated until they become something personal.",
        "When imagining a new place, try beginning with a ritual rather than a room. Perhaps it is watering plants before breakfast or stepping outside after work. Consider the setting that would make that small moment feel natural.",
      ] },
      { id: "the-spaces-in-between", title: "The spaces in between", paragraphs: [
        "Life in a neighbourhood happens between destinations as well as within them. A shaded stretch of path, a shared edge, or a place to pause can become part of the rhythm of a day. These spaces are worth noticing on a visit.",
        "There is no need to imagine an entirely different version of yourself. Think about what you already enjoy, and what you would like a little more room for. A place can support a quieter routine without asking you to reinvent your life.",
      ] },
      { id: "a-familiar-kind-of-belonging", title: "A familiar kind of belonging", paragraphs: [
        "Belonging often arrives gradually. It grows through the details you learn by living somewhere: the evening light, a seasonal change, a friendly greeting along the same path. A place becomes yours through attention as much as through arrangement.",
        "As you explore, leave space for that quieter possibility. Beyond the impressive view and the first impression, ask a simpler question: could you see yourself enjoying an ordinary morning here?",
      ] },
    ],
  },
  {
    slug: "make-the-most-of-a-site-visit",
    category: "Land & place",
    title: "The art of taking a closer look.",
    excerpt: "Leave room to wander, pause, and ask. A thoughtful site visit begins with curiosity, not a perfect checklist.",
    image: "/images/about-community.webp",
    imageAlt: "An illustrative residential avenue framed by green spaces and contemporary homes",
    imagePosition: "center 75%",
    sections: [
      { id: "arrive-with-an-open-mind", title: "Arrive with an open mind", paragraphs: [
        "Photographs give you a starting point. A visit adds the experience of being there: the approach, the scale, the sounds, and the way one space leads into another. Allow the two impressions to sit alongside each other.",
        "Bring a few notes about what matters to you, but leave room for something unexpected. You might find yourself drawn to a different outlook or discover a question that had not occurred to you before. That is part of the value of looking in person.",
      ] },
      { id: "walk-at-your-own-pace", title: "Walk at your own pace", paragraphs: [
        "Take time to pause at the places that interest you. Look outward as well as inward. Imagine arriving home, stepping into a garden, or making a journey you take often. Small exercises like these can make an unfamiliar setting easier to understand.",
        "Ask your guide to explain what you are seeing and to distinguish the current setting from illustrative plans. If something is unclear, ask again. A useful conversation gives you more clarity, rather than more details to remember all at once.",
      ] },
      { id: "give-yourself-time-afterwards", title: "Give yourself time afterwards", paragraphs: [
        "Before leaving, note the things you liked and the questions you would like to revisit. Ask which project information is available for you to review separately. You do not have to reach every conclusion during a single visit.",
        "Later, compare the experience with the priorities you brought with you. What felt right? What needs another conversation? A considered next step begins with the freedom to reflect, and the confidence to keep asking questions.",
      ] },
    ],
  },
];

export type JournalSummary = Omit<JournalPost, "sections"> & { readingMinutes: number };

export function summarizePost(post: JournalPost): JournalSummary {
  const { sections, ...summary } = post;
  const words = sections.flatMap(section => [section.title, ...section.paragraphs]).join(" ").split(/\s+/).length;
  return { ...summary, readingMinutes: Math.max(1, Math.ceil(words / 180)) };
}
