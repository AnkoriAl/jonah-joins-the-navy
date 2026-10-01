import { useLayoutEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { enlist } from './chapters/Enlist';
import { storm } from './chapters/Storm';
import { transfer } from './chapters/Transfer';
import { england } from './chapters/England';
import { machine } from './chapters/Machine';
import { periscope } from './chapters/Periscope';
import { lab } from './chapters/Lab';
import { asset, type ChapterId } from './cinematic';
import { LoadArtContext } from './World';

gsap.registerPlugin(ScrollTrigger);
const chapters = [enlist, storm, transfer, england, machine, periscope, lab];
const starts = [0,15,35,55,80,125,150];
const duration = 180;
// Chapter links land after the .8-second dissolve, when the incoming art is visible.
function chapterTime(index:number) { return starts[index]+(index>0?1:0); }
const stillCopy = [
  'Tarshish becomes a ship.', 'Jonah sleeps. The sea rises.',
  'A transfer. A torpedo boat. Submarine service.', 'In England, they bought a giant fish.',
  'Between spleen and kidneys, a living submarine.', 'Nineveh, imagined as a port.',
  'And should I not care about Nineveh?'
];
function route() {
  const hash=decodeURIComponent(location.hash.slice(1));
  if(hash==='listen'||hash==='references') return {footer:true,time:0};
  if(hash==='reflection') return {footer:false,time:178};
  const id=hash.replace(/^scene\//,'').replace(/^fish$/,'machine');
  const index=chapters.findIndex(c=>c.id===id);
  return {footer:false,time:index<0?0:chapterTime(index)};
}
function preload(files:string[]) {
  return Promise.all([...new Set(files)].map(src=>new Promise<void>(resolve=>{
    const image=new Image(); image.onload=()=>{image.decode().catch(()=>{}).finally(resolve)};image.onerror=()=>resolve();image.src=src;
  })));
}
function initialTime() {const params=new URLSearchParams(location.search);return params.has('frame')?Math.max(0,Math.min(180,Number(params.get('frame'))||0)):route().time;}
function indexAt(time:number) { return starts.reduce((index,start,i)=>time>=start?i:index,0); }
function nearby(index:number) {return [index-1,index,index+1].filter(i=>i>=0&&i<chapters.length);}
function stillMotion() {return new URLSearchParams(location.search).get('motion')==='still'||matchMedia('(prefers-reduced-motion: reduce)').matches;}

export default function App() {
  const story=useRef<HTMLDivElement>(null);
  const stage=useRef<HTMLDivElement>(null);
  const footer=useRef<HTMLElement>(null);
  const master=useRef<gsap.core.Timeline|null>(null);
  const trigger=useRef<ScrollTrigger|null>(null);
  const clock=useRef(0);
  const playingRef=useRef(false);
  const timeRef=useRef(0);
  const savedTime=useRef(0);
  const resizing=useRef(false);
  const lastSize=useRef(`${innerWidth}x${innerHeight}`);
  const initialized=useRef(false);
  const [viewport,setViewport]=useState(()=>`${innerWidth}x${innerHeight}`);
  const hideTimer=useRef<ReturnType<typeof setTimeout>|undefined>(undefined);
  const [playing,setPlaying]=useState(false);
  const [time,setTime]=useState(initialTime);
  const [loaded,setLoaded]=useState(()=>new Set(nearby(indexAt(initialTime()))));
  const playVersion=useRef(0);
  const alive=useRef(true);
  const allReady=useRef(false);
  const preparingRef=useRef(false);
  const [preparing,setPreparing]=useState(false);
  const [ready,setReady]=useState(false);
  const [reduced,setReduced]=useState(stillMotion);
  const [controls,setControls]=useState(true);
  const [menu,setMenu]=useState(false);
  const [failed,setFailed]=useState<Set<ChapterId>>(new Set());
  const presenter=new URLSearchParams(location.search).has('presenter');
  const current=indexAt(time);

  function reveal() {
    setControls(true); clearTimeout(hideTimer.current);
    hideTimer.current=setTimeout(()=>{if(!menu&&!document.querySelector('.transport:focus-within'))setControls(false)},2000);
  }
  function pause() { playVersion.current++;playingRef.current=false;setPlaying(false);cancelAnimationFrame(clock.current); }
  function seek(seconds:number) {
    const t=Math.max(0,Math.min(duration,seconds));
    if(reduced){document.getElementById(chapters[indexAt(t)].id)?.scrollIntoView();return;}
    const st=trigger.current;
    if(st){window.scrollTo({top:st.start+(st.end-st.start)*(t/duration),behavior:'instant'});st.update();timeRef.current=t;setTime(t);const hash=chapters[indexAt(t)].id;if(location.hash!==`#${hash}`)history.replaceState(null,'',`${location.pathname}${location.search}#${hash}`);}
  }
  function jump(index:number) { pause();setMenu(false);seek(chapterTime(index));reveal(); }
  async function play() {
    if(playingRef.current){pause();return;}
    if(!ready||reduced||preparingRef.current)return;
    const version=++playVersion.current;
    if(!allReady.current){
      preparingRef.current=true;setPreparing(true);
      await preload(chapters.flatMap(c=>c.assets));
      if(!alive.current)return;
      allReady.current=true;preparingRef.current=false;setPreparing(false);
      setLoaded(new Set([0,1,2,3,4,5,6]));
      await new Promise<void>(resolve=>requestAnimationFrame(()=>resolve()));
    }
    if(version!==playVersion.current||!alive.current||document.hidden||stillMotion())return;
    if(timeRef.current>=179.98)seek(0);
    playingRef.current=true;setPlaying(true);reveal();
    const base=timeRef.current;
    const started=performance.now();
    const tick=(now:number)=>{
      if(!playingRef.current)return;
      const next=Math.min(duration,base+(now-started)/1000);
      seek(next);
      if(next>=duration){pause();return;}
      clock.current=requestAnimationFrame(tick);
    };
    clock.current=requestAnimationFrame(tick);
  }

  useLayoutEffect(()=>{
    alive.current=true;
    const motion=matchMedia('(prefers-reduced-motion: reduce)');
    const change=()=>{pause();setReduced(stillMotion())};
    motion.addEventListener('change',change);
    let resizeTimer:ReturnType<typeof setTimeout>;
    const resize=()=>{
      clearTimeout(resizeTimer);
      const nextSize=`${innerWidth}x${innerHeight}`;
      if(nextSize===lastSize.current){if(resizing.current){seek(savedTime.current);resizing.current=false}return;}
      if(!resizing.current)savedTime.current=timeRef.current;
      resizing.current=true;pause();
      resizeTimer=setTimeout(()=>{lastSize.current=`${innerWidth}x${innerHeight}`;setViewport(lastSize.current)},120);
    };
    window.addEventListener('resize',resize);
    const initial=nearby(indexAt(initialTime())); const files=chapters.filter((_,i)=>initial.includes(i)).flatMap(c=>c.assets);
    let live=true;
    preload(files).then(()=>{if(live)setReady(true)});
    return()=>{live=false;alive.current=false;motion.removeEventListener('change',change);window.removeEventListener('resize',resize);clearTimeout(resizeTimer);pause();clearTimeout(hideTimer.current)};
  },[]);

  useLayoutEffect(()=>{setLoaded(old=>{const neighbors=nearby(current);if(neighbors.every(i=>old.has(i)))return old;return new Set([...old,...neighbors])})},[current]);

  useLayoutEffect(()=>{
    if(!reduced)return;
    const navigate=()=>{const r=route();if(r.footer)footer.current?.scrollIntoView();else document.getElementById(chapters[indexAt(r.time)].id)?.scrollIntoView()};
    const frame=requestAnimationFrame(navigate);window.addEventListener('hashchange',navigate);
    return()=>{cancelAnimationFrame(frame);window.removeEventListener('hashchange',navigate)};
  },[reduced]);

  useLayoutEffect(()=>{
    if(reduced)return;
    if(!ready)return;
    const ctx=gsap.context(()=>{
      const tl=gsap.timeline({paused:true});
      const layers=Array.from(stage.current!.querySelectorAll<HTMLElement>('.chapter-layer'));
      gsap.set(layers,{autoAlpha:0});
      chapters.forEach((chapter,i)=>{
        const local=gsap.timeline();chapter.animate(layers[i],local);
        tl.add(local,starts[i]);
        tl.set(layers[i],{autoAlpha:1},starts[i]);
        if(i>0){tl.fromTo(layers[i],{opacity:0},{opacity:1,duration:.8,ease:'power1.inOut',immediateRender:false},starts[i]);tl.to(layers[i-1],{autoAlpha:0,duration:.8},starts[i]);}
      });
      tl.to({}, {duration:1},179);
      master.current=tl;
      trigger.current=ScrollTrigger.create({trigger:story.current,pin:stage.current,start:'top top',end:()=>`+=${window.innerHeight*14}`,animation:tl,scrub:true,invalidateOnRefresh:true,
        onUpdate:st=>{
          if(resizing.current)return;
          const value=st.progress*duration;timeRef.current=value;
          setTime(old=>Math.abs(old-value)>.15||value===duration?value:old);
          const hash=chapters[indexAt(value)].id;
          if(location.hash!==`#${hash}`&&st.isActive)history.replaceState(null,'',`${location.pathname}${location.search}#${hash}`);
        }
      });
      const initial=initialized.current?{footer:false,time:savedTime.current}:route(); const exportFrame=Number(new URLSearchParams(location.search).get('frame')); if(!initialized.current&&new URLSearchParams(location.search).has('frame'))initial.time=Math.max(0,Math.min(180,exportFrame)); initialized.current=true;
      requestAnimationFrame(()=>{ScrollTrigger.refresh();if(initial.footer)footer.current?.scrollIntoView();else seek(initial.time);resizing.current=false});
    },story);
    const hash=()=>{const r=route();pause();if(r.footer)footer.current?.scrollIntoView();else seek(r.time)};
    const stop=(event:Event)=>{if(event.isTrusted)pause();reveal()};
    const key=(event:KeyboardEvent)=>{
      if(event.target instanceof HTMLElement&&event.target.closest('select,input,textarea'))return;
      if(event.code==='Space'){if(event.target instanceof HTMLElement&&event.target.closest('button,a'))return;event.preventDefault();play();return;}
      if(presenter&&['ArrowLeft','ArrowRight','Home'].includes(event.key)){
        event.preventDefault();jump(event.key==='Home'?0:Math.max(0,Math.min(6,indexAt(timeRef.current)+(event.key==='ArrowRight'?1:-1))));return;
      }
      if(['ArrowDown','ArrowUp','PageDown','PageUp','End','Home'].includes(event.key))pause();
    };
    const hidden=()=>{if(document.hidden)pause()};
    window.addEventListener('wheel',stop,{passive:true});window.addEventListener('touchstart',stop,{passive:true});window.addEventListener('keydown',key);
    window.addEventListener('hashchange',hash);document.addEventListener('visibilitychange',hidden);
    return()=>{if(!resizing.current)savedTime.current=timeRef.current;ctx.revert();master.current=null;trigger.current=null;pause();window.removeEventListener('wheel',stop);window.removeEventListener('touchstart',stop);window.removeEventListener('keydown',key);window.removeEventListener('hashchange',hash);document.removeEventListener('visibilitychange',hidden)};
  },[reduced,ready,presenter,viewport]);

  const sources=<footer ref={footer} className="references" id="references">
    <p className="eyebrow">The song and its sources</p>
    <h2>A prophet, an unexpected career</h2>
    <p>An original visual adaptation of Dan Almagor’s <span lang="he" dir="rtl">הצוללן העברי הראשון</span>. Music by Albert Piamenta; performed by Arik Lavie. The published edition identifies a 1971 television performance.</p>
    <a id="listen" className="recording-link" href="https://www.youtube.com/watch?v=E4hRF0R1T-s" target="_blank" rel="noreferrer">Listen to the recording <span aria-hidden="true">↗</span></a>
    <ul>
      <li><a href="https://benyehuda.org/read/12456" target="_blank" rel="noreferrer">Song, lyrics, and credits · Project Ben-Yehuda</a></li>
      <li><a href="https://www.amutayam.org.il/?ArticleID=1116&CategoryID=603" target="_blank" rel="noreferrer">Rahav, Tanin, and training in England · Navy veterans’ archive</a></li>
      <li><a href="https://www.technion.ac.il/en/the-history-of-the-technion/" target="_blank" rel="noreferrer">Technion history</a></li>
      <li><a href="https://mechon-mamre.org/p/pt/pt1701.htm" target="_blank" rel="noreferrer">The Hebrew book of Jonah · Mechon Mamre</a></li>
    </ul>
    <p className="credit">For Almog Ankori’s Book of Jonah class at JTS. Original generated artwork; animation and visual additions adapt the song. The destroyer and Nineveh harbor are fictional. The kikayon’s botanical identity remains uncertain. Final verse excerpt: working English translation.</p>
    <button className="text-button" onClick={()=>jump(0)}>Return to the beginning</button>
    {!reduced&&<a className="still-link" href={`${location.pathname}?motion=still#enlist`}>View the still story</a>}
  </footer>;

  if(reduced)return <><main className="still-story">{chapters.map((chapter,i)=><section id={chapter.id} className="still-chapter" key={chapter.id}><img src={asset(`poster-${chapter.id}.webp`)} alt={chapter.description}/><div><span className="eyebrow">{String(i+1).padStart(2,'0')} / {chapter.title}</span><h1>{i===0?'Jonah Joins the Navy':stillCopy[i]}</h1>{i===0&&<p lang="he" dir="rtl">הצוללן העברי הראשון</p>}{i===6&&<><p lang="he" dir="rtl">וַאֲנִי לֹא אָחוּס עַל־נִינְוֵה</p><small>Jonah 4:11 · excerpt</small></>}</div></section>)}</main>{sources}</>;

  return <>
    <main ref={story} className="scroll-story" onPointerMove={reveal}>
      <div ref={stage} className={`story-stage ${new URLSearchParams(location.search).has('frame')?'export-frame':''} ${new URLSearchParams(location.search).has('art')?'art-frame':''}`} data-time={time.toFixed(3)} data-playing={playing} aria-label="Jonah Joins the Navy — seven chapter visual story">
        {chapters.map((chapter,i)=><section key={chapter.id} className={`chapter-layer chapter-${chapter.id}`} data-chapter={chapter.id} aria-hidden={i!==current}>
          {failed.has(chapter.id)?<img className="poster-fallback" src={asset(`poster-${chapter.id}.webp`)} alt={chapter.description}/>:<div className="chapter-mount" aria-hidden="true" onErrorCapture={()=>setFailed(old=>new Set(old).add(chapter.id))}><LoadArtContext.Provider value={loaded.has(i)}><chapter.Component/></LoadArtContext.Provider></div>}
        </section>)}
        <p className="sr-only" aria-live="polite">{chapters[current].title}: {chapters[current].description}</p>
        <nav className={`transport ${controls||menu?'is-visible':''}`} aria-label="Story controls" onFocus={reveal} onPointerEnter={reveal}>
          <button className="play-control" onClick={play} disabled={!ready||preparing} aria-label={playing?'Pause story':'Play story'}><span className="play-symbol" aria-hidden="true">{playing?'Ⅱ':'▷'}</span>{preparing?'Preparing…':playing?'Pause':'Play story'}</button>
          {presenter&&<button onClick={()=>{pause();seek(0);reveal()}}>Restart</button>}
          <button className="chapter-control" aria-expanded={menu} aria-controls="chapter-menu" onClick={()=>{pause();setMenu(!menu);reveal()}}>{String(current+1).padStart(2,'0')} / 07 <span aria-hidden="true">⌄</span></button>
          <a href="#references" onClick={pause}>Sources</a>
          <span className="transport-progress" style={{transform:`scaleX(${time/duration})`}}/>
          {menu&&<div id="chapter-menu" className="chapter-menu">{chapters.map((chapter,i)=><button key={chapter.id} onClick={()=>jump(i)} aria-current={i===current?'step':undefined}><span>{String(i+1).padStart(2,'0')}</span>{chapter.title}</button>)}</div>}
        </nav>
        <div className={`scroll-cue ${time>2?'is-gone':''}`} aria-hidden="true">Scroll to unfold <span>↓</span></div>
      </div>
    </main>
    {sources}
  </>;
}
