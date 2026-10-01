import { createContext, useContext, type CSSProperties } from 'react';
import { asset } from './cinematic';

export const LoadArtContext = createContext(true);

export function Art({file, className = '', style, alt = ''}: {file:string; className?:string; style?:CSSProperties; alt?:string}) {
  const load = useContext(LoadArtContext);
  return <img src={load ? asset(file) : undefined} className={`art ${className}`} style={style} alt={alt} draggable={false} decoding="async" />;
}
export function Caption({className = '', children}: {className?:string; children:React.ReactNode}) {
  return <div className={`story-caption ${className}`}>{children}</div>;
}
