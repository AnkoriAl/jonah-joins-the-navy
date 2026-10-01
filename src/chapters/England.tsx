import { gsap } from 'gsap';
import { asset, type ChapterDefinition } from '../cinematic';
import { Art, Caption } from '../World';
import './England.css';

function EnglandWorld() {
  return (
    <div className="chapter-world england-world">
      <div className="england-composition" aria-hidden="true">
        <Art file="england-dock.png" className="england-dock" />
        <div className="england-atmosphere" />
        <div className="england-berth">
          <div className="england-fish-layer england-fish-body">
            <Art file="england-fish.png" />
          </div>
          <div className="england-fish-layer england-gill-layer">
            <Art file="england-fish.png" className="england-gill" />
          </div>
          <div className="england-jonah">
            <div className="england-navy-half">
              <Art file="jonah-board.png" className="england-navy-board" />
            </div>
            <div className="england-ground-shadow" />
          </div>
          <div className="england-fish-layer england-jaw-front">
            <Art file="england-fish.png" />
          </div>
        </div>
        <div className="england-tunnel" />
        <div className="england-interior-dark" />
      </div>
      <Caption className="england-caption england-caption-buy">
        <p>In England for training, the navy buys a giant fish.</p>
      </Caption>
      <Caption className="england-caption england-caption-enter">
        <p>Jonah climbs inside his new submarine.</p>
      </Caption>
    </div>
  );
}

function animateEngland(root: HTMLElement, timeline: gsap.core.Timeline) {
  const q = gsap.utils.selector(root);
  const portrait = window.matchMedia('(max-width: 767px)').matches;
  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const width = root.clientWidth || window.innerWidth;
  const height = root.clientHeight || window.innerHeight;
  const fish = root.querySelector<HTMLElement>('.england-fish-body');
  const fishWidth = fish?.offsetWidth || width * (portrait ? 1.75 : .74);
  const fishHeight = fish?.offsetHeight || fishWidth * 766 / 2053;
  const mouthX = (fish?.offsetLeft || width * (portrait ? .22 : .29)) + fishWidth * .064;
  const mouthY = (fish?.offsetTop || height * (portrait ? .5 : .41)) + fishHeight * .438;
  const tunnelWidth = fishWidth * .09;
  const tunnelHeight = fishHeight * .37;
  const tunnelScale = Math.hypot(width / tunnelWidth, height / tunnelHeight) * 1.4;

  timeline
    .set(q('.england-composition'), { opacity: 1 }, 0)
    .set(q('.england-dock'), { scale: 1.035, x: 0, y: 0, transformOrigin: '45% 55%' }, 0)
    .set(q('.england-atmosphere'), { opacity: .52 }, 0)
    .set(q('.england-berth'), { scale: 1, transformOrigin: `${mouthX}px ${mouthY}px` }, 0)
    .set(q('.england-fish-layer'), { opacity: 0, scale: reduced ? 1 : .975, xPercent: reduced ? 0 : 3, transformOrigin: '6.4% 43.8%' }, 0)
    .set(q('.england-gill'), { scaleX: 1, transformOrigin: '22% 43%' }, 0)
    .set(q('.england-jonah'), { opacity: 1, x: 0, y: 0, scale: 1, transformOrigin: '50% 100%' }, 0)
    .set(q('.england-caption'), { opacity: 0, y: 0 }, 0)
    .set(q('.england-caption-buy'), { opacity: 1 }, 0)
    .set(q('.england-tunnel'), { opacity: 0, left: mouthX, top: mouthY, width: tunnelWidth, height: tunnelHeight, xPercent: -50, yPercent: -50, scale: 1, transformOrigin: '50% 50%' }, 0)
    .set(q('.england-interior-dark'), { opacity: 0 }, 0)
    .to(q('.england-fish-layer'), { opacity: 1, duration: reduced ? .6 : 3, ease: 'sine.inOut' }, 5)
    .to(q('.england-fish-layer'), { scale: 1, xPercent: 0, duration: reduced ? .6 : 6, ease: 'power1.out' }, 5)
    .to(q('.england-caption-buy'), { opacity: 0, duration: .45, ease: 'none' }, 16.2)
    .to(q('.england-caption-enter'), { opacity: 1, duration: .65, ease: 'none' }, 16.8)
    .to(q('.england-caption-enter'), { opacity: 0, duration: .45, ease: 'none' }, 24.4);

  if (reduced) {
    timeline
      .to(q('.england-jonah'), { opacity: 0, duration: .6, ease: 'none' }, 21.5)
      .to(q('.england-interior-dark'), { opacity: 1, duration: 1.5, ease: 'none' }, 23.5);
  } else {
    timeline
      // Only the clipped gill surface breathes; the fish's silhouette stays calm.
      .to(q('.england-gill'), { scaleX: 1.018, duration: 1, repeat: 3, yoyo: true, ease: 'sine.inOut' }, 12)
      .to(q('.england-jonah'), { x: width * (portrait ? .34 : .18), y: -height * .018, scale: .86, duration: 7, ease: 'sine.inOut' }, 16)
      // The duplicated near jaw occludes the same figure before it fades away.
      .to(q('.england-jonah'), { opacity: 0, duration: .35, ease: 'none' }, 22.65)
      .to(q('.england-berth'), { scale: portrait ? 4.2 : 6, duration: 2, ease: 'power2.in' }, 23)
      .to(q('.england-tunnel'), { opacity: 1, duration: .3, ease: 'none' }, 23)
      .to(q('.england-tunnel'), { scale: tunnelScale, duration: 2, ease: 'power2.in' }, 23)
      .to(q('.england-interior-dark'), { opacity: 1, duration: .5, ease: 'none' }, 24.5);
  }

  // Explicit local end state preserves reversible seeking and a 25-second chapter.
  timeline.set(q('.england-interior-dark'), { opacity: 1 }, 25);
}

export const england: ChapterDefinition = {
  id: 'england',
  title: 'England delivers a giant fish',
  duration: 25,
  description: 'The song sends Jonah to England for training, then turns submarine procurement into the comic purchase of a giant living fish. Jonah enters its innards.',
  poster: asset('england-dock.png'),
  assets: ['england-dock.png', 'england-fish.png', 'jonah-board.png'].map(asset),
  Component: EnglandWorld,
  animate: animateEngland,
};
