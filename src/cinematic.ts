import type { ComponentType } from 'react';
import type { gsap } from 'gsap';

export type ChapterId = 'enlist' | 'storm' | 'transfer' | 'england' | 'machine' | 'periscope' | 'lab';
export type ChapterDefinition = {
  id: ChapterId;
  title: string;
  duration: number;
  description: string;
  poster: string;
  assets: string[];
  Component: ComponentType;
  animate: (root: HTMLElement, timeline: gsap.core.Timeline) => void;
};
export const asset = (file: string) => `${import.meta.env.BASE_URL}cinematic/${file.replace(/\.png$/, '.webp')}`;
