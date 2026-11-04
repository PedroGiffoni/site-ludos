export function serviceMotion(gsap,ScrollTrigger,desktop){
  if(!document.querySelector('.service-landing'))return;
  gsap.utils.toArray('.service-intro h2,.service-ages h2,.service-family-copy h2,.perspectives-copy h2,.service-start h2,.service-contact h2').forEach(heading=>gsap.from(heading,{y:40,opacity:.25,duration:.85,ease:'power2.out',scrollTrigger:{trigger:heading,start:'top 92%',toggleActions:'play none none reverse'}}));
  gsap.utils.toArray('.expression-drawing>span:not(.expression-star)').forEach((item,i)=>gsap.from(item,{y:20,rotation:i%2?8:-8,opacity:.25,ease:'none',scrollTrigger:{trigger:'.expression-drawing',start:'top 90%',end:'top 45%',scrub:1}}));
  gsap.utils.toArray('.service-chapter').forEach((chapter,i)=>{
    gsap.from(chapter,{y:25,opacity:.35,ease:'none',scrollTrigger:{trigger:chapter,start:'top 95%',end:'top 55%',scrub:1}});
    const art=chapter.querySelector('.chapter-art');
    gsap.to(art,{rotation:i%2?-15:15,x:desktop?35:12,ease:'none',scrollTrigger:{trigger:chapter,start:'top bottom',end:'bottom top',scrub:1}});
  });
  if(document.querySelector('.service-story')){
    ScrollTrigger.create({trigger:'.service-story',start:'top 45%',end:'bottom 70%',onUpdate:self=>document.querySelector('#world')?.setAttribute('chapter-progress',self.progress.toFixed(3))});
    gsap.to('.story-meter>span',{scaleX:1,ease:'none',scrollTrigger:{trigger:'.service-story',start:'top 45%',end:'bottom 70%',scrub:1}});
  }
  gsap.utils.toArray('.service-photo-grid figure').forEach((photo,i)=>gsap.from(photo,{y:i?60:30,rotation:i?2:-2,ease:'none',scrollTrigger:{trigger:photo,start:'top bottom',end:'top 35%',scrub:1}}));
  gsap.utils.toArray('.service-photo-note img,.teen-drawing,.expression-star').forEach(art=>gsap.to(art,{rotation:'+=25',ease:'none',scrollTrigger:{trigger:art,start:'top bottom',end:'bottom top',scrub:1}}));
  gsap.utils.toArray('.puzzle-tile').forEach((tile,i)=>gsap.from(tile,{x:i%2?40:-40,y:i>1?35:-35,rotation:i%2?25:-25,ease:'none',scrollTrigger:{trigger:'.perspective-puzzle',start:'top 90%',end:'top 35%',scrub:1}}));
  return ()=>document.querySelector('#world')?.removeAttribute('chapter-progress');
}

export function setupCognitiveMap(){
  const buttons=[...document.querySelectorAll('[data-topic]')];
  if(!buttons.length)return;
  const panels=[...document.querySelectorAll('.cognitive-panel')];
  const select=id=>{
    buttons.forEach(button=>button.setAttribute('aria-pressed',String(button.dataset.topic===id)));
    panels.forEach(panel=>panel.hidden=panel.id!=='cog-'+id);
  };
  buttons.forEach(button=>button.addEventListener('click',()=>select(button.dataset.topic)));
  select(buttons[0].dataset.topic);
}
