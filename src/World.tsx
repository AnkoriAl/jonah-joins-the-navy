import { createContext, useContext, type CSSProperties } from 'react';
import { asset } from './cinematic';
import { songQuotes, type SongQuoteId } from './songQuotes';

export const LoadArtContext = createContext(true);

export function Art({file, className = '', style, alt = ''}: {file:string; className?:string; style?:CSSProperties; alt?:string}) {
  const load = useContext(LoadArtContext);
  return <img src={load ? asset(file) : undefined} className={`art ${className}`} style={style} alt={alt} draggable={false} decoding="async" />;
}
export function Caption({className = '', children}: {className?:string; children:React.ReactNode}) {
  return <div className={`story-caption ${className}`}>{children}</div>;
}

export function LyricPair({quote}: {quote: SongQuoteId}) {
  const text = songQuotes[quote];
  return <div className="lyric-pair" data-quote={quote}>
    <p className="lyric-english" lang="en" dir="ltr">{text.en}</p>
    <blockquote className="lyric-hebrew" lang="he" dir="rtl" cite="https://benyehuda.org/read/12456">{text.he}</blockquote>
  </div>;
}

export function SongCaption({quote, className = '', note}: {quote: SongQuoteId; className?: string; note?: string}) {
  return <Caption className={`song-caption ${className}`}><LyricPair quote={quote} />{note && <small className="lyric-note">{note}</small>}</Caption>;
}
