export type MarkdownAtom = {
  semantic_type: "markdown";
  content: {
    text: string;
  }
}

export type YouTubeAtom = {
  semantic_type: "youtube";
  content: {
    video_id: string;
  }
}

export type Atom = {
  semantic_type: string;
} | MarkdownAtom | YouTubeAtom;

export type Lesson = {
  slug: string;
  title: string;
  description: string;
  atoms: Atom[];
}

export type Course = {
  slug: string;
  title: string;
  description: string;
  level: string;
  lessons: Lesson[];
}
