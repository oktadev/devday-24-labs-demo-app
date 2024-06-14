import ReactMarkdown from 'react-markdown'
import { Atom, MarkdownAtom, YouTubeAtom } from '@/data/models'

type Props = {
  atom: Atom;
}

export default function AtomRenderer({ atom } : Props) {
  switch (atom.semantic_type) {
    case "markdown":
      return (
        <section className="prose prose-blue dark:prose-invert prose-xl">
          <ReactMarkdown>
            {(atom as MarkdownAtom).content.text}
          </ReactMarkdown>
        </section>
      )
    case 'youtube':
      return (
        <section className="relative aspect-video">
          <iframe
            width="640"
            height="360"
            src={`https://www.youtube.com/embed/${(atom as YouTubeAtom).content.video_id}`}
            title="YouTube video player"
            style={{
              border: 0,
              width: '100%',
              height: '100%',
              position: 'absolute',
              top: 0,
              bottom: 0,
              left: 0,
              right: 0
            }}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
          ></iframe>
        </section>
      )
  }
}
