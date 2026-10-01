import { gsap } from 'gsap';
import { asset, type ChapterDefinition } from '../cinematic';
import { Art, Caption } from '../World';
import './Lab.css';

function LabWorld() {
  return <div className="chapter-world lab-world">
    <div className="lab-assemblage" aria-hidden="true">
      <Art file="lab-paper.png" className="lab-paper" />
      <div className="lab-specimen"><Art file="lab-leaf.png" /></div>
      <div className="lab-optical">
        <div className="lab-botanical-glass">
          <div className="lab-glass-ground" />
          <Art file="lab-leaf.png" className="lab-magnified-leaf" />
          <div className="lab-glass-light" />
        </div>
        <Art file="optical-rim.png" className="lab-rim" />
      </div>
    </div>
    <Caption className="lab-caption lab-caption-technion">After the navy, he goes to the Technion.<small>Israel’s institute of technology.</small></Caption>
    <Caption className="lab-caption lab-caption-research">There he researches kikayon plants.<small>The plant from Jonah 4.</small></Caption>
    <Caption className="lab-caption lab-caption-question">
      <span className="caption-kicker">Back to the biblical book</span>
      <p>And should I not care about Nineveh?</p>
      <p lang="he" dir="rtl">וַאֲנִי לֹא אָחוּס עַל־נִינְוֵה</p>
      <small>God’s question to Jonah<br />Jonah 4:11 · excerpt</small>
    </Caption>
  </div>;
}

function animateLab(root: HTMLElement, timeline: gsap.core.Timeline) {
  const q = gsap.utils.selector(root);
  const portrait = window.matchMedia('(max-width: 767px)').matches;
  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const width = root.clientWidth || window.innerWidth;
  const height = root.clientHeight || window.innerHeight;
  const entryDiameter = height * .42;
  const endDiameter = portrait ? Math.min(height * .42, width * .79) : height * .5;
  const endX = width * (portrait ? .56 : .72);
  const endY = height * (portrait ? .68 : .58);
  const specimenWidth = portrait ? Math.min(height * .54, width * .90) : height * .68;
  const moveDuration = reduced ? .5 : 7.3;

  timeline
    // The paper and optical view exactly inherit the end of the periscope chapter.
    .set(q('.lab-paper'), { opacity: 1, scale: 1 }, 0)
    .set(q('.lab-optical'), {
      left: width * .52, top: height * .54,
      width: entryDiameter, height: entryDiameter,
      xPercent: -50, yPercent: -50, rotation: 0, opacity: 1,
    }, 0)
    .set(q('.lab-magnified-leaf'), { scale: 1, transformOrigin: '50% 50%' }, 0)
    .set(q('.lab-glass-ground'), { opacity: 1 }, 0)
    .set(q('.lab-glass-light'), { opacity: 0 }, 0)
    .set(q('.lab-specimen'), {
      left: endX, top: endY, width: specimenWidth, height: specimenWidth,
      xPercent: -50, yPercent: -50, scale: reduced ? 1 : .9,
      opacity: 0, rotation: reduced ? 0 : -5,
    }, 0)
    .set(q('.lab-caption'), { opacity: 0, y: 0 }, 0)
    .to(q('.lab-caption-technion'), { opacity: 1, duration: .65, ease: 'none' }, .55)
    .to(q('.lab-optical'), {
      left: endX, top: endY, width: endDiameter, height: endDiameter,
      duration: moveDuration, ease: 'sine.inOut',
    }, 1.4)
    .to(q('.lab-specimen'), {
      opacity: 1, scale: 1, rotation: 0,
      duration: reduced ? .5 : 5.6, ease: 'sine.inOut',
    }, 3.1)
    .to(q('.lab-glass-ground'), { opacity: 0, duration: reduced ? .5 : 4.6, ease: 'none' }, 3.1)
    .to(q('.lab-magnified-leaf'), {
      scale: portrait ? 1.75 : 2.22,
      duration: reduced ? .5 : 6.2, ease: 'sine.inOut',
    }, 3.1)
    .to(q('.lab-glass-light'), { opacity: .34, duration: reduced ? .5 : 4, ease: 'none' }, 5.3)
    .to(q('.lab-caption-technion'), { opacity: 0, duration: .45, ease: 'none' }, 9.35)
    .to(q('.lab-caption-research'), { opacity: 1, duration: .65, ease: 'none' }, 10.05)
    .to(q('.lab-caption-research'), { opacity: 0, duration: .45, ease: 'none' }, 20.2)
    .to(q('.lab-caption-question'), { opacity: 1, duration: 1.2, ease: 'none' }, 21.4)
    // No completion beat: the final verse and material composition remain at rest.
    .set(q('.lab-caption-question'), { opacity: 1 }, 30);
}

export const lab: ChapterDefinition = {
  id: 'lab',
  title: 'The prophet becomes a researcher',
  duration: 30,
  description: 'After discharge, Jonah goes to the Technion to research the kikayon. The song closes his career story; the book ends with God’s question about compassion for Nineveh and no narrated reply from Jonah.',
  poster: asset('lab-paper.png'),
  assets: ['lab-paper.png', 'lab-leaf.png', 'optical-rim.png'].map(asset),
  Component: LabWorld,
  animate: animateLab,
};
