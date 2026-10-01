import { gsap } from 'gsap';
import { asset, type ChapterDefinition } from '../cinematic';
import { Art, SongCaption } from '../World';
import './Periscope.css';

function PeriscopeWorld() {
  return <div className="chapter-world periscope-world">
    <div className="periscope-machine" aria-hidden="true">
      <Art file="machine-v2-empty.png" className="periscope-interior" />
      <div className="periscope-interior-shade" />
    </div>
    <Art file="lab-paper.png" className="periscope-lab-paper" />
    <div className="periscope-reveal" aria-hidden="true">
      <Art file="periscope-harbor.png" className="periscope-harbor" />
      <div className="periscope-harbor-shade" />
    </div>
    <div className="periscope-botanical" aria-hidden="true">
      <div className="periscope-botanical-glass"><Art file="lab-leaf.png" /></div>
    </div>
    <div className="periscope-ring" aria-hidden="true">
      <Art file="optical-rim.png" />
    </div>
    <div className="periscope-service" aria-hidden="true">
      <div className="periscope-service-paper">
        <Art file="lab-paper.png" />
        <div className="periscope-service-number">1</div>
        <div className="periscope-service-label">SUBMARINER</div>
      </div>
      <div className="periscope-page periscope-page-one"><Art file="lab-paper.png" /></div>
      <div className="periscope-page periscope-page-two"><Art file="lab-paper.png" /></div>
    </div>
    <SongCaption className="periscope-caption periscope-caption-throat" quote="throat" />
    <SongCaption className="periscope-caption periscope-caption-harbor" quote="harbor" note="The song imagines Nineveh as a port." />
    <SongCaption className="periscope-caption periscope-caption-service" quote="service" />
  </div>;
}

function animatePeriscope(root: HTMLElement, timeline: gsap.core.Timeline) {
  const q = gsap.utils.selector(root);
  const portrait = window.matchMedia('(max-width: 767px)').matches;
  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const width = root.clientWidth || window.innerWidth;
  const height = root.clientHeight || window.innerHeight;
  const centerX = width * (portrait ? .44 : .48);
  const centerY = height * .40;
  const diameter = height * (portrait ? .38 : .34);
  // The transparent rim's real opening occupies 66% of its image width.
  const radius = diameter * .33;
  const coverRadius = Math.max(
    Math.hypot(centerX, centerY),
    Math.hypot(width - centerX, height - centerY),
    Math.hypot(width - centerX, centerY),
    Math.hypot(centerX, height - centerY),
  ) * 1.1;
  const finalDiameter = height * .42;
  const finalX = width * .52;
  const finalY = height * .54;
  const rise = reduced ? 0 : height * .34;
  const circle = (r: number, x = centerX, y = centerY) => `circle(${r}px at ${x}px ${y}px)`;

  timeline
    .set(q('.periscope-machine'), { opacity: 1 }, 0)
    .set(q('.periscope-interior'), { scale: 1, transformOrigin: '62% 59%' }, 0)
    .set(q('.periscope-reveal'), { opacity: 0, y: rise, clipPath: circle(radius) }, 0)
    .set(q('.periscope-harbor'), { scale: 1.035, transformOrigin: portrait ? '67% 60%' : '66% 60%' }, 0)
    .set(q('.periscope-harbor-shade'), { opacity: .65 }, 0)
    .set(q('.periscope-ring'), {
      opacity: 0, width: diameter, height: diameter,
      left: centerX, top: centerY, xPercent: -50, yPercent: -50,
      y: rise, scale: 1, transformOrigin: '50% 50%',
    }, 0)
    .set(q('.periscope-lab-paper, .periscope-botanical, .periscope-service'), { opacity: 0 }, 0)
    .set(q('.periscope-botanical'), { width: finalDiameter, height: finalDiameter, left: finalX, top: finalY, xPercent: -50, yPercent: -50 }, 0)
    .set(q('.periscope-service'), { x: reduced ? 0 : width * .08, y: reduced ? 0 : height * .08, rotation: reduced ? 0 : 4 }, 0)
    .set(q('.periscope-page-one'), { xPercent: 118, rotation: 9, opacity: 0 }, 0)
    .set(q('.periscope-page-two'), { xPercent: 118, rotation: -7, opacity: 0 }, 0)
    .set(q('.periscope-caption'), { opacity: 0, y: reduced ? 0 : 12 }, 0)
    .to(q('.periscope-caption-throat'), { opacity: 1, y: 0, duration: .65, ease: 'none' }, .1)
    .to(q('.periscope-reveal, .periscope-ring'), { opacity: 1, duration: .7, ease: 'none' }, .85)
    .to(q('.periscope-reveal, .periscope-ring'), { y: 0, duration: reduced ? .45 : 2.6, ease: 'power2.out' }, .85)
    .to(q('.periscope-interior'), { scale: reduced ? 1 : 1.045, duration: 3.2, ease: 'sine.inOut' }, .85)
    .to(q('.periscope-reveal'), { clipPath: circle(coverRadius), duration: reduced ? .6 : 3.35, ease: 'power2.inOut' }, 3.35)
    .to(q('.periscope-ring'), { scale: coverRadius / radius, duration: reduced ? .6 : 3.35, ease: 'power2.inOut' }, 3.35)
    .to(q('.periscope-machine'), { opacity: 0, duration: .6, ease: 'none' }, 6.45)
    .to(q('.periscope-caption-throat'), { opacity: 0, duration: .45, ease: 'none' }, 7.45)
    .to(q('.periscope-caption-harbor'), { opacity: 1, y: 0, duration: .65, ease: 'none' }, 8)
    .to(q('.periscope-harbor'), { scale: reduced ? 1.035 : 1.115, duration: 13.3, ease: 'none' }, 8)
    .to(q('.periscope-harbor-shade'), { opacity: .4, duration: 2, ease: 'none' }, 8)
    .to(q('.periscope-caption-harbor'), { opacity: 0, duration: .45, ease: 'none' }, 15.45)
    .to(q('.periscope-caption-service'), { opacity: 1, y: 0, duration: .65, ease: 'none' }, 16)
    .to(q('.periscope-harbor-shade'), { opacity: .95, duration: 1.1, ease: 'none' }, 16)
    .to(q('.periscope-service'), { opacity: 1, x: 0, y: 0, rotation: 0, duration: reduced ? .5 : 1.35, ease: 'power2.out' }, 16.2);

  // Blank textured sheets pass over an editorial number; these are not insignia.
  if (!reduced) {
    timeline
      .set(q('.periscope-page-one'), { opacity: 1 }, 17.9)
      .to(q('.periscope-page-one'), { xPercent: -150, rotation: -13, duration: 1.35, ease: 'sine.inOut' }, 17.9)
      .to(q('.periscope-page-one'), { opacity: 0, duration: .2 }, 19.05)
      .set(q('.periscope-page-two'), { opacity: 1 }, 19.55)
      .to(q('.periscope-page-two'), { xPercent: -150, rotation: 12, duration: 1.3, ease: 'sine.inOut' }, 19.55)
      .to(q('.periscope-page-two'), { opacity: 0, duration: .2 }, 20.65);
  }

  timeline
    .to(q('.periscope-caption-service'), { opacity: 0, duration: .4, ease: 'none' }, 21.5)
    .to(q('.periscope-service'), { opacity: 0, y: reduced ? 0 : -height * .05, duration: .65, ease: 'none' }, 21.35)
    .to(q('.periscope-lab-paper'), { opacity: 1, duration: 1.5, ease: 'none' }, 22)
    .to(q('.periscope-reveal'), { clipPath: circle(finalDiameter * .33, finalX, finalY), duration: reduced ? .6 : 2.6, ease: 'power2.inOut' }, 22)
    .to(q('.periscope-ring'), {
      left: finalX, top: finalY, scale: finalDiameter / diameter,
      duration: reduced ? .6 : 2.6, ease: 'power2.inOut',
    }, 22)
    .to(q('.periscope-botanical'), { opacity: 1, duration: 1.1, ease: 'none' }, 23.5)
    .to(q('.periscope-reveal'), { opacity: 0, duration: .9, ease: 'none' }, 23.6)
    .set(q('.periscope-ring, .periscope-botanical, .periscope-lab-paper'), { opacity: 1 }, 25);
}

export const periscope: ChapterDefinition = {
  id: 'periscope',
  title: 'Nineveh comes into view',
  duration: 25,
  description: 'The fish’s throat becomes a periscope. Nineveh is imagined as a port, and years of service make Jonah the number-one submariner.',
  poster: asset('periscope-harbor.png'),
  assets: ['periscope-harbor.png', 'machine-v2-empty.png', 'optical-rim.png', 'lab-leaf.png', 'lab-paper.png'].map(asset),
  Component: PeriscopeWorld,
  animate: animatePeriscope,
};
