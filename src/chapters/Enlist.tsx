import { gsap } from 'gsap';
import { asset, type ChapterDefinition } from '../cinematic';
import { Art, Caption } from '../World';
import './Enlist.css';

function EnlistWorld() {
  return (
    <div className="chapter-world enlist-world">
      <div className="enlist-composition" aria-hidden="true">
        <Art file="enlist-hull.png" className="enlist-background" />
        <div className="enlist-atmosphere" />
        <div className="enlist-jonah">
          <div className="enlist-pose enlist-robe">
            <div className="enlist-half enlist-half-robe">
              <Art file="jonah-board.png" className="enlist-board enlist-board-robe" />
            </div>
          </div>
          <div className="enlist-pose enlist-navy">
            <div className="enlist-half enlist-half-navy">
              <Art file="jonah-board.png" className="enlist-board enlist-board-navy" />
            </div>
          </div>
          <div className="enlist-ground-shadow" />
        </div>
      </div>
      <Caption className="enlist-title">
        <h1>Jonah Joins the Navy</h1>
        <p lang="he" dir="rtl">הצוללן העברי הראשון</p>
      </Caption>
      <Caption className="enlist-turn">
        <p>Tarshish becomes a ship.</p>
      </Caption>
      <div className="enlist-hull-label">
        <span>INS TARSHISH</span>
        <span className="enlist-fiction">· fictional destroyer</span>
      </div>
      <div className="enlist-optical" aria-hidden="true">
        <div className="enlist-optical-sea" />
        <Art file="optical-rim.png" className="enlist-optical-rim" />
      </div>
    </div>
  );
}

function animateEnlist(root: HTMLElement, timeline: gsap.core.Timeline) {
  const select = gsap.utils.selector(root);
  const portrait = window.matchMedia('(max-width: 767px)').matches;
  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const width = root.clientWidth || window.innerWidth;
  const height = root.clientHeight || window.innerHeight;
  const optical = root.querySelector<HTMLElement>('.enlist-optical');
  const opticalWidth = optical?.getBoundingClientRect().width || Math.min(width, height) * .28;
  const opticalScale = Math.hypot(width, height) / (opticalWidth * .54) * 1.4;

  timeline
    .set(select('.enlist-composition'), { opacity: 1 }, 0)
    .set(select('.enlist-background'), { scale: 1.055, x: 0, y: 0, transformOrigin: '70% 60%' }, 0)
    .set(select('.enlist-atmosphere'), { opacity: .42 }, 0)
    .set(select('.enlist-jonah'), { opacity: 1, scale: 1, x: 0, y: 0, transformOrigin: '50% 100%' }, 0)
    .set(select('.enlist-robe'), { opacity: 1, clipPath: 'inset(0% 0% 0% 0%)' }, 0)
    .set(select('.enlist-navy'), { opacity: 0, clipPath: 'inset(0% 0% 100% 0%)' }, 0)
    .set(select('.enlist-title, .enlist-turn, .enlist-hull-label'), { opacity: 0, y: 14 }, 0)
    .set(select('.enlist-title'), {opacity:1}, 0)
    .set(select('.enlist-optical'), { opacity: 0, scale: .7, transformOrigin: '50% 50%' }, 0)
    .set(select('.enlist-optical-sea'), { opacity: 1 }, 0)
    .to(select('.enlist-title'), { opacity: 1, y: 0, duration: reduced ? .25 : .8, ease: 'power1.out' }, .15)
    .set(select('.enlist-navy'), { opacity: 1 }, 3.25)
    .to(select('.enlist-navy'), { clipPath: 'inset(0% 0% 0% 0%)', duration: reduced ? .35 : 3.15, ease: 'power1.inOut' }, 3.25)
    .to(select('.enlist-robe'), { clipPath: 'inset(100% 0% 0% 0%)', duration: reduced ? .35 : 3.15, ease: 'power1.inOut' }, 3.25)
    .to(select('.enlist-title'), { opacity: 0, y: -10, duration: .45, ease: 'power1.in' }, 6.55)
    .to(select('.enlist-turn'), { opacity: 1, y: 0, duration: .75, ease: 'power1.out' }, 7)
    .to(select('.enlist-jonah'), {
      scale: portrait ? .48 : .36,
      x: portrait ? -width * .045 : -width * .065,
      y: portrait ? -height * .1 : -height * .215,
      duration: reduced ? .45 : 3.65,
      ease: 'power2.inOut',
    }, 6.1)
    .to(select('.enlist-background'), { scale: 1, duration: reduced ? .45 : 4.75, ease: 'power1.inOut' }, 5.25)
    .to(select('.enlist-hull-label'), { opacity: 1, y: 0, duration: .75, ease: 'power1.out' }, 9)
    .to(select('.enlist-atmosphere'), { opacity: .7, duration: 2.7, ease: 'none' }, 10.8);

  if (reduced) {
    timeline
      .to(select('.enlist-composition'), { opacity: .36, duration: .8 }, 14.2)
      .to(select('.enlist-turn, .enlist-hull-label'), { opacity: 0, duration: .55 }, 14.45);
  } else {
    timeline
      .to(select('.enlist-optical'), { opacity: 1, scale: 1, duration: .8, ease: 'power1.out' }, 11.95)
      .to(select('.enlist-optical'), { scale: opticalScale, duration: 2.3, ease: 'power2.in' }, 12.7)
      .to(select('.enlist-turn, .enlist-hull-label'), { opacity: 0, duration: .6 }, 14.2);
  }
  // An explicit final keyframe keeps the chapter exactly fifteen seconds long.
  timeline.set(select('.enlist-atmosphere'), { opacity: .7 }, 15);
}

export const enlist: ChapterDefinition = {
  id: 'enlist',
  title: 'A prophet puts on a naval uniform',
  duration: 15,
  description: 'Jonah enlists and boards the song’s fictional INS Tarshish. Tarshish, his biblical destination, becomes a ship’s name.',
  poster: asset('enlist-hull.png'),
  assets: [asset('enlist-hull.png'), asset('jonah-board.png'), asset('optical-rim.png')],
  Component: EnlistWorld,
  animate: animateEnlist,
};
