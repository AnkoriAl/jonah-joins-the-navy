import type { CSSProperties } from 'react';
import { Art, SongCaption } from '../World';
import { asset, type ChapterDefinition } from '../cinematic';
import './Machine.css';

const plates = ['room', 'install', 'hammock', 'oil', 'clean', 'pull', 'exterior', 'empty'] as const;
type Plate = typeof plates[number];

function Machine() {
  return <div className="chapter-world machine-world" aria-hidden="true">
    <div className="machine-frame"><div className="machine-plane"><div className="machine-camera">
      {plates.map(name => <Art key={name} file={`machine-v2-${name}.png`} className={`machine-plate machine-plate-${name}`} />)}
      <div className="machine-oil-drop" />
      <div className="machine-surface-light" />
      <div className="machine-exterior-effects">
        <div className="machine-torpedo"><Art file="machine-props.png" /></div>
        <div className="machine-bubbles">{Array.from({length: 9}, (_, i) => <i key={i} style={{'--bubble-x': `${i * 10}%`, '--bubble-y': `${(i % 3) * 30}%`, '--bubble-size': `${3 + i % 4 * 2}px`} as CSSProperties} />)}</div>
      </div>
      <div className="machine-travel-light" />
    </div></div></div>
    <div className="machine-portrait-frame"><Art file="machine-v2-hammock-portrait.png" className="machine-plate machine-plate-hammock" /></div>
    <div className="machine-caption-shade" />
    <SongCaption className="machine-caption machine-caption-cramped" quote="cramped" />
    <SongCaption className="machine-caption machine-caption-hammock" quote="hammock" />
    <SongCaption className="machine-caption machine-caption-liver" quote="liver" />
    <SongCaption className="machine-caption machine-caption-gallbladder" quote="gallbladder" />
    <SongCaption className="machine-caption machine-caption-launch" quote="launch" />
    <SongCaption className="machine-caption machine-caption-living" quote="living" />
  </div>;
}

export const machine: ChapterDefinition = {
  id: 'machine',
  title: 'The fish’s body becomes machinery',
  duration: 45,
  description: 'Inside one narrow living submarine, Jonah ties a hammock between the spleen and kidneys, oils the liver, wipes the gallbladder, and pulls the large intestine. A torpedo travels into empty water.',
  poster: asset('poster-machine.webp'),
  assets: [...plates.map(name => asset(`machine-v2-${name}.png`)), asset('machine-v2-hammock-portrait.png'), asset('machine-props.png')],
  Component: Machine,
  animate(root, tl) {
    const q = (selector: string) => root.querySelectorAll(selector);
    const plane = root.querySelector<HTMLElement>('.machine-plane');
    const planeWidth = plane?.clientWidth || root.clientWidth;
    const maxPan = Math.max(0, (planeWidth - root.clientWidth) / 2);
    // Follow the action whenever the room is wider than the viewport, without exposing an edge.
    const cameraX = (focus: number) => Math.max(-maxPan, Math.min(maxPan, (.5 - focus) * planeWidth));
    let preceding: Plate = 'room';
    const showPlate = (name: Plate, at: number, focus = .5) => {
      // Opaque editorial cuts prevent two bodies or unattached arms appearing together.
      if(name !== preceding){
        tl.set(q(`.machine-plate-${preceding}`), { autoAlpha: 0 }, at);
        tl.set(q(`.machine-plate-${name}`), { autoAlpha: 1 }, at);
        preceding = name;
      }
      tl.set(q('.machine-plane'), { x: cameraX(focus) }, at);
    };
    const caption = (name: string, start: number, end: number) => {
      tl.to(q(`.machine-caption-${name}`), { opacity: 1, duration: .4, ease: 'none' }, start);
      if (end < 45) tl.to(q(`.machine-caption-${name}`), { opacity: 0, duration: .25, ease: 'none' }, end - .25);
    };

    tl.set(q('.machine-caption'), { opacity: 0 }, 0);
    tl.set(q('.machine-plate:not(.machine-plate-room)'), { autoAlpha: 0 }, 0);
    tl.set(q('.machine-camera, .machine-portrait-frame'), { scale: 1, transformOrigin: '50% 50%' }, 0);
    tl.set(q('.machine-oil-drop, .machine-surface-light, .machine-exterior-effects, .machine-travel-light'), { opacity: 0 }, 0);
    tl.set(q('.machine-torpedo'), { xPercent: 0, scaleX: -1 }, 0);
    tl.set(q('.machine-bubbles'), { xPercent: 0, opacity: 0 }, 0);
    showPlate('room', 0, .40);
    showPlate('install', 5, .29);
    showPlate('hammock', 8.8, .51);
    showPlate('oil', 15, .66);
    showPlate('clean', 23, .68);
    showPlate('pull', 30, .70);
    showPlate('exterior', 36, .61);
    showPlate('empty', 40, .50);
    caption('cramped', 0, 5);
    caption('hammock', 5, 15);
    caption('liver', 15, 23);
    caption('gallbladder', 23, 30);
    caption('launch', 30, 40);
    caption('living', 40, 45);

    // Camera and changing light belong to the complete room, never separate organs.
    tl.to(q('.machine-camera, .machine-portrait-frame'), { scale: 1.018, duration: 5, ease: 'sine.inOut' }, 0);
    tl.to(q('.machine-camera, .machine-portrait-frame'), { scale: 1.035, duration: 9.5, ease: 'none' }, 5);
    tl.set(q('.machine-camera, .machine-portrait-frame'), { scale: 1.015 }, 15);
    tl.to(q('.machine-camera, .machine-portrait-frame'), { scale: 1.035, duration: 7.5, ease: 'none' }, 15);
    tl.set(q('.machine-oil-drop'), { opacity: .9, y: 0 }, 17.7);
    tl.to(q('.machine-oil-drop'), { y: planeWidth * .008, duration: .75, ease: 'power2.in' }, 17.7);
    tl.to(q('.machine-oil-drop'), { opacity: 0, duration: .2 }, 18.3);
    tl.set(q('.machine-camera, .machine-portrait-frame'), { scale: 1.015 }, 23);
    tl.to(q('.machine-camera, .machine-portrait-frame'), { scale: 1.03, duration: 6.5, ease: 'none' }, 23);
    tl.to(q('.machine-surface-light'), { opacity: .26, duration: 1.5, ease: 'sine.inOut' }, 25);
    tl.to(q('.machine-surface-light'), { opacity: 0, duration: 1.7 }, 27);
    tl.set(q('.machine-camera, .machine-portrait-frame'), { scale: 1.015 }, 30);
    tl.to(q('.machine-camera, .machine-portrait-frame'), { scale: 1.035, duration: 5.5, ease: 'power1.in' }, 30);

    tl.set(q('.machine-camera, .machine-portrait-frame'), { scale: 1 }, 36);
    tl.set(q('.machine-exterior-effects'), { opacity: 1 }, 36.2);
    tl.set(q('.machine-torpedo'), { clipPath: 'inset(0 100% 0 0)' }, 36.2);
    tl.to(q('.machine-torpedo'), { clipPath: 'inset(0 0% 0 0)', duration: .45, ease: 'none' }, 36.2);
    tl.to(q('.machine-torpedo'), { xPercent: -470, duration: 3.1, ease: 'power1.in' }, 36.2);
    tl.set(q('.machine-bubbles'), { opacity: .65 }, 36.6);
    tl.to(q('.machine-bubbles'), { xPercent: -260, opacity: 0, duration: 3.1, ease: 'sine.out' }, 36.6);
    if (maxPan > 0) tl.to(q('.machine-plane'), { x: cameraX(.42), duration: 3.1, ease: 'sine.inOut' }, 36.5);
    tl.set(q('.machine-exterior-effects'), { opacity: 0 }, 40);
    tl.set(q('.machine-camera, .machine-portrait-frame'), { scale: 1 }, 40);
    tl.to(q('.machine-travel-light'), { opacity: .25, duration: 2.2, ease: 'none' }, 40);
    tl.to(q('.machine-travel-light'), { opacity: 0, duration: 2.5, ease: 'none' }, 42.5);
  },
};
