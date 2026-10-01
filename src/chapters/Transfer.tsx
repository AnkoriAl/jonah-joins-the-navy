import { gsap } from 'gsap';
import { asset, type ChapterDefinition } from '../cinematic';
import { Art, Caption } from '../World';
import './Transfer.css';

function NavyJonah({ className }: { className: string }) {
  return (
    <div className={className}>
      <div className="transfer-jonah-half">
        <Art file="jonah-board.png" className="transfer-jonah-board" />
      </div>
    </div>
  );
}

function TransferWorld() {
  return (
    <div className="chapter-world transfer-world">
      <div className="transfer-composition" aria-hidden="true">
        <Art file="transfer-backdrop.png" className="transfer-backdrop" />
        <div className="transfer-paper-wash" />
        <NavyJonah className="transfer-survivor" />
        <div className="transfer-boat-group">
          <NavyJonah className="transfer-aboard" />
          <Art file="transfer-boat.png" className="transfer-boat-art" />
          <div className="transfer-waterline" />
        </div>
        <div className="transfer-slip">
          <div className="transfer-slip-fibre" style={{ backgroundImage: `url("${asset('transfer-backdrop.png')}")` }} />
          <div className="transfer-slip-rule" />
          <div className="transfer-slip-fastener" />
        </div>
      </div>
      <Caption className="transfer-caption transfer-survived">
        <p>Jonah barely survives—he cannot swim.</p>
      </Caption>
      <Caption className="transfer-caption transfer-request">
        <p>He transfers to a torpedo boat.</p>
      </Caption>
      <Caption className="transfer-caption transfer-rolling">
        <p>The boat keeps rolling on the waves.</p>
      </Caption>
      <Caption className="transfer-caption transfer-volunteer">
        <p>He volunteers to serve in a submarine.</p>
      </Caption>
    </div>
  );
}

function animateTransfer(root: HTMLElement, timeline: gsap.core.Timeline) {
  const select = gsap.utils.selector(root);
  const portrait = window.matchMedia('(max-width: 767px)').matches;
  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const width = root.clientWidth || window.innerWidth;
  const shortFade = reduced ? .25 : .6;

  timeline
    .set(select('.transfer-composition, .transfer-backdrop'), { opacity: 1 }, 0)
    .set(select('.transfer-paper-wash'), { opacity: .12 }, 0)
    .set(select('.transfer-survivor'), { opacity: 1, scale: 1, x: 0, y: 0 }, 0)
    .set(select('.transfer-boat-group'), {
      opacity: 0, rotation: 0, x: 0, y: reduced ? 0 : 24, transformOrigin: '50% 75%',
    }, 0)
    .set(select('.transfer-slip'), {
      opacity: 0,
      x: reduced ? 0 : -width * .62,
      y: 0,
      width: portrait ? '74%' : '43%',
      height: portrait ? '19%' : '23%',
      left: portrait ? '13%' : '12%',
      top: portrait ? '46%' : '44%',
      rotation: reduced ? 0 : -4,
    }, 0)
    .set(select('.transfer-slip-rule, .transfer-slip-fastener'), { opacity: .5 }, 0)
    .set(select('.transfer-caption'), { opacity: 0, y: reduced ? 0 : 12 }, 0)
    .to(select('.transfer-survived'), { opacity: 1, y: 0, duration: shortFade, ease: 'power1.out' }, .2)
    .to(select('.transfer-survived'), { opacity: 0, y: reduced ? 0 : -8, duration: .35 }, 4.7)

    // A paper cut changes the setting; nothing depicts or explains the rescue.
    .to(select('.transfer-slip'), { opacity: 1, x: 0, duration: reduced ? .25 : 1.25, ease: 'power2.out' }, 5)
    .to(select('.transfer-request'), { opacity: 1, y: 0, duration: shortFade }, 5.15)
    .to(select('.transfer-survivor'), { opacity: 0, duration: .4 }, 6.05)
    .to(select('.transfer-boat-group'), { opacity: 1, y: 0, duration: reduced ? .25 : 1.1, ease: 'power1.out' }, 6.25)
    .to(select('.transfer-paper-wash'), { opacity: 0, duration: .65 }, 6.6)
    .to(select('.transfer-slip'), { opacity: 0, duration: .5 }, 8.1)
    .to(select('.transfer-request'), { opacity: 0, duration: .4 }, 8.4)
    .to(select('.transfer-rolling'), { opacity: 1, y: 0, duration: shortFade }, 9)
    .to(select('.transfer-rolling'), { opacity: 0, duration: .4 }, 13.65)

    // A still horizon makes the renewed discomfort legible without moving the camera.
    .set(select('.transfer-slip'), { x: 0, rotation: reduced ? 0 : 2 }, 14)
    .to(select('.transfer-slip'), { opacity: 1, duration: shortFade }, 14.05)
    .to(select('.transfer-volunteer'), { opacity: 1, y: 0, duration: shortFade }, 14.45)
    .to(select('.transfer-boat-group'), { opacity: 0, duration: .7 }, 15.3)
    .to(select('.transfer-slip-rule, .transfer-slip-fastener'), { opacity: 0, duration: .6 }, 16.2)
    .to(select('.transfer-slip'), {
      width: '100%', height: '100%', left: '0%', top: '0%', rotation: 0,
      duration: reduced ? .6 : 3.15, ease: 'power2.inOut',
    }, reduced ? 18.9 : 16.8)
    .to(select('.transfer-volunteer'), { opacity: 0, duration: .5 }, 19.5);

  if (!reduced) {
    timeline
      .to(select('.transfer-boat-group'), { rotation: -3, duration: .8, ease: 'sine.inOut' }, 9.05)
      .to(select('.transfer-boat-group'), { rotation: 3, duration: 1.65, ease: 'sine.inOut' }, 9.85)
      .to(select('.transfer-boat-group'), { rotation: -2.8, duration: 1.6, ease: 'sine.inOut' }, 11.5)
      .to(select('.transfer-boat-group'), { rotation: 0, duration: .9, ease: 'sine.inOut' }, 13.1);
  }

  // Fully specified endpoints keep repeated visits and reverse scrubbing deterministic.
  timeline.set(select('.transfer-slip'), {
    opacity: 1, x: 0, y: 0, width: '100%', height: '100%', left: '0%', top: '0%', rotation: 0,
  }, 20);
}

export const transfer: ChapterDefinition = {
  id: 'transfer',
  title: 'A transfer, then a torpedo boat',
  duration: 20,
  description: 'Jonah barely survives without knowing how to swim, requests a transfer, and volunteers for submarine service when the torpedo boat keeps rolling.',
  poster: asset('transfer-backdrop.png'),
  assets: [asset('transfer-backdrop.png'), asset('transfer-boat.png'), asset('jonah-board.png')],
  Component: TransferWorld,
  animate: animateTransfer,
};
