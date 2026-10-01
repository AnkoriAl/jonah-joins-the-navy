import type { gsap } from 'gsap';
import { asset, type ChapterDefinition } from '../cinematic';
import { Art, Caption } from '../World';
import './Storm.css';

function StormWorld() {
  return (
    <div className="chapter-world storm-world">
      <div className="storm-final-sea">
        <Art file="storm-sea.png" className="storm-plate" />
      </div>
      <div className="storm-deck-layer">
        <Art file="storm-deck.png" className="storm-plate storm-deck-plate" />
        <div className="storm-sleeper">
          <div className="storm-sleep-pose">
            <Art file="storm-jonah-poses.png" className="storm-sleep-board" />
          </div>
        </div>
      </div>
      <div className="storm-afloat">
        <div className="storm-afloat-pose">
          <Art file="storm-jonah-poses.png" className="storm-afloat-board" />
        </div>
      </div>
      <div className="storm-waterline">
        <Art file="storm-sea.png" className="storm-plate" />
      </div>
      <Art file="storm-wave.png" className="storm-crest" />
      <div className="storm-caption-shade" />
      <Caption className="storm-caption storm-caption-sleep">While Jonah sleeps, the sea begins to rage.</Caption>
      <Caption className="storm-caption storm-caption-wave">A great wave washes him into the sea.</Caption>
    </div>
  );
}

function animate(root: HTMLElement, timeline: gsap.core.Timeline) {
  const local = (selector: string) => root.querySelector<HTMLElement>(selector);
  const deck = local('.storm-deck-layer');
  const sleeper = local('.storm-sleeper');
  const sea = local('.storm-final-sea');
  const crest = local('.storm-crest');
  const afloat = local('.storm-afloat');
  const waterline = local('.storm-waterline');
  const caption = local('.storm-caption-sleep');
  const waveCaption = local('.storm-caption-wave');
  if (!deck || !sleeper || !sea || !crest || !afloat || !waterline || !caption || !waveCaption) return;

  // Absolute times and local targets let the shared scroll timeline seek in either direction.
  timeline.set(deck, { opacity: 1 }, 0);
  timeline.set(sleeper, { opacity: 1, xPercent: 0, yPercent: 0 }, 0);
  timeline.set([sea, afloat, waterline, caption, waveCaption], { opacity: 0 }, 0);
  timeline.set(afloat, { yPercent: 5 }, 0);
  timeline.set(crest, { opacity: 0, xPercent: 28, yPercent: 92 }, 0);
  timeline.to(caption, { opacity: 1, duration: 1.2, ease: 'power1.out' }, 0.8);
  timeline.to(caption, { opacity: 0, duration: .4, ease: 'none' }, 12.5);
  timeline.to(waveCaption, { opacity: 1, duration: .6, ease: 'none' }, 13.2);

  // Seven seconds of stillness; then one wave enters from the sea at the right.
  timeline.to(crest, { opacity: 1, duration: 0.8, ease: 'none' }, 7);
  timeline.to(crest, { xPercent: 13, yPercent: 18, duration: 4.5, ease: 'power1.inOut' }, 7);
  timeline.to(crest, { xPercent: -6, yPercent: -9, duration: 1.25, ease: 'power1.in' }, 11.5);

  // The opaque water body covers Jonah before his resting place disappears.
  timeline.to(sleeper, { xPercent: -13, yPercent: 10, duration: 0.9, ease: 'power1.in' }, 11.75);
  timeline.to(sleeper, { opacity: 0, duration: 0.25, ease: 'none' }, 12.35);
  timeline.to(sea, { opacity: 1, duration: 0.8, ease: 'none' }, 12.65);
  timeline.to(deck, { opacity: 0, duration: 0.7, ease: 'none' }, 12.65);
  timeline.to(crest, { xPercent: -24, yPercent: 6, duration: 1.3, ease: 'power1.out' }, 12.75);
  timeline.to(crest, { opacity: 0, duration: 0.8, ease: 'none' }, 13.2);

  // The final six seconds are the quiet ocean tableau, ready for an editorial cut.
  timeline.to([afloat, waterline], { opacity: 1, duration: 0.8, ease: 'none' }, 13.2);
  timeline.to(afloat, { yPercent: 0, duration: 0.8, ease: 'power1.out' }, 13.2);
  timeline.to(afloat, { yPercent: 1.25, duration: 6, ease: 'sine.inOut' }, 14);
}

export const storm: ChapterDefinition = {
  id: 'storm',
  title: 'Jonah sleeps; the sea rises',
  duration: 20,
  description: 'A sleeping Jonah is carried overboard by a wave. The destroyer remains intact.',
  poster: asset('storm-sea.png'),
  assets: ['storm-deck.png', 'storm-wave.png', 'storm-sea.png', 'storm-jonah-poses.png'].map(asset),
  Component: StormWorld,
  animate,
};
