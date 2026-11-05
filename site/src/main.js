import {gsap} from 'gsap';
import {ScrollTrigger} from 'gsap/ScrollTrigger';
import {config} from './config.js';
import {pages} from './pages.js';
import {clamp} from './scene-math.js';
import './course-style.css';
import './service-style.css';
import './home-park.css';
import {serviceMotion,setupCognitiveMap} from './service-motion.js';

const pathname = location.pathname.replace(/\/$/,'') || '/';
const page = pages[pathname];
document.documentElement.classList.toggle('home-park',pathname==='/');
if(page){
  document.title=page.title;
  document.querySelector('#conteudo').innerHTML=page.html;
  document.querySelectorAll('.header a[href^="#"],.footer .brand').forEach(a=>a.href='/'+a.getAttribute('href'));
} else if(pathname==='/cursos'){
  document.title='Cursos e formação | Clínica Ludos';
  const courses=document.querySelector('#cursos').outerHTML;
  document.querySelector('#conteudo').innerHTML=`<div class="detail-page">${courses.replace('<h2>','<h1>').replace('</h2>','</h1>')}</div>`;
  document.querySelectorAll('.header a[href^="#"],.footer .brand').forEach(a=>a.href='/'+a.getAttribute('href'));
} else if(pathname!=='/'){
  document.title='Página não encontrada | Clínica Ludos';
  document.querySelector('#conteudo').innerHTML='<section class="detail-page section"><p class="eyebrow">UM NOVO CAMINHO</p><h1>Vamos voltar<br />ao nosso universo?</h1><p>Não encontramos esta página.</p><a class="button button-green" href="/">Ir para o início <span>↗</span></a></section>';
}

const systemMotion=matchMedia('(prefers-reduced-motion: reduce)');
const motionToggle=document.querySelector('#motion-toggle');
let preference;
try{preference=localStorage.getItem('ludos-motion');}catch{}
let reduced=systemMotion.matches||preference==='reduced';
const world=document.querySelector('#world');
let media;
function setMotion(value){
  reduced=value;
  document.documentElement.classList.toggle('motion-reduced',reduced);
  document.documentElement.classList.toggle('course-motion',!reduced);
  motionToggle.setAttribute('aria-pressed',String(reduced));
  motionToggle.innerHTML=`Movimento: ${reduced?'reduzido':'ativado'} <span>${reduced?'○':'◉'}</span>`;
  world.setAttribute('motion-mode',reduced?'reduced':'full');
  media?.revert();
  if(!reduced)animate();
}
function animate(){
  gsap.registerPlugin(ScrollTrigger);
  media=gsap.matchMedia();
  media.add({allowMotion:'(prefers-reduced-motion: no-preference)',desktop:'(min-width: 761px)'},context=>{
    if(!context.conditions.allowMotion)return;
    gsap.utils.toArray('.universe-copy h2,.section-heading h2,.space-copy h2,.paula-grid h2,.faq h2').forEach(heading=>gsap.from(heading,{y:35,opacity:.2,duration:.8,ease:'power2.out',scrollTrigger:{trigger:heading,start:'top 94%',toggleActions:'play none none reverse'}}));
    if(document.querySelector('.flower'))gsap.to('.flower',{rotation:-8,y:-25,ease:'none',scrollTrigger:{trigger:'.universe',start:'top bottom',end:'bottom top',scrub:1}});
    if(document.querySelector('.space-photo'))gsap.to('.space-photo>img',{scale:1.08,yPercent:3,ease:'none',scrollTrigger:{trigger:'.space-photo',start:'top bottom',end:'bottom top',scrub:1}});
    if(document.querySelector('.personality-shapes'))gsap.to('.personality-shapes',{rotation:55,y:-25,ease:'none',scrollTrigger:{trigger:'.personality-art',start:'top bottom',end:'bottom top',scrub:1}});
    gsap.utils.toArray('.course-intro h2,.experience-copy h2,.teacher-copy h2,.enrollment-grid h2,.course-next h2').forEach(heading=>gsap.from(heading,{y:45,opacity:.25,duration:.85,ease:'power2.out',scrollTrigger:{trigger:heading,start:'top 92%',toggleActions:'play none none reverse'}}));
    gsap.utils.toArray('.teacher-orbit,.lens-art').forEach(art=>gsap.to(art,{rotation:'+=55',ease:'none',scrollTrigger:{trigger:art,start:'top bottom',end:'bottom top',scrub:1}}));
    gsap.utils.toArray('.concept-item').forEach(item=>gsap.from(item,{x:40,opacity:.25,ease:'none',scrollTrigger:{trigger:item,start:'top 90%',end:'top 55%',scrub:1}}));
    if(document.querySelector('.curriculum')){
      const desktop=context.conditions.desktop;
      if(desktop){
        const track=document.querySelector('.curriculum-track'),viewport=document.querySelector('.curriculum-window');
        gsap.to(track,{x:()=>-Math.max(0,track.scrollWidth-viewport.clientWidth),ease:'none',scrollTrigger:{trigger:'.curriculum',start:'top top',end:'bottom bottom',scrub:1,invalidateOnRefresh:true}});
        gsap.to('.curriculum-meter>span',{scaleX:1,ease:'none',scrollTrigger:{trigger:'.curriculum',start:'top top',end:'bottom bottom',scrub:1}});
      }
    }
    return serviceMotion(gsap,ScrollTrigger,context.conditions.desktop);
  });
}
motionToggle.addEventListener('click',()=>{setMotion(!reduced);try{localStorage.setItem('ludos-motion',reduced?'reduced':'full');}catch{}});
systemMotion.addEventListener('change',event=>setMotion(event.matches));
setupCognitiveMap();
setMotion(reduced);

const menu=document.querySelector('.menu-toggle'),nav=document.querySelector('#navigation');
function closeMenu(){menu.setAttribute('aria-expanded','false');nav.classList.remove('open');}
menu.addEventListener('click',()=>{const open=menu.getAttribute('aria-expanded')!=='true';menu.setAttribute('aria-expanded',String(open));nav.classList.toggle('open',open);});
nav.addEventListener('click',event=>{if(event.target.closest('a'))closeMenu();});
document.addEventListener('keydown',event=>{if(event.key==='Escape'&&nav.classList.contains('open')){closeMenu();menu.focus();}});

document.querySelectorAll('.whatsapp').forEach(anchor=>{if(!anchor.href.includes('?text='))anchor.href=config.whatsapp+'?text='+encodeURIComponent('Olá! Gostaria de conhecer o atendimento da Clínica Ludos.');});
document.querySelector('#year').textContent=new Date().getFullYear();

const dialog=document.querySelector('#detail-dialog'),content=document.querySelector('#dialog-content');
const detailHTML={
 psicoterapia:`<p class="eyebrow">NOSSO CUIDADO</p><h2>Psicoterapia<br />infantojuvenil</h2><p>Um espaço para a expressão de sentimentos e experiências. Na infância, o brincar faz parte dessa escuta; na adolescência, o diálogo acolhe mudanças e descobertas.</p><p>A família participa do processo conforme a proposta de acompanhamento. Cada demanda é compreendida em sua singularidade.</p><a class="text-link" href="/psicoterapiainfantojuvenil">Conheça o acompanhamento <span>↗</span></a><br /><a class="button button-green" href="${config.whatsapp}?text=${encodeURIComponent('Olá! Gostaria de informações sobre psicoterapia na Ludos.')}">Conversar sobre psicoterapia <span>↗</span></a>`,
 avaliacao:`<p class="eyebrow">NOSSO CUIDADO</p><h2>Avaliação<br />neuropsicológica</h2><p>Um processo para investigar aspectos cognitivos, emocionais e comportamentais, como atenção, memória e aprendizagem.</p><p>Entrevistas, atividades e instrumentos são selecionados pela profissional conforme a demanda. A devolutiva ajuda a família a compreender os resultados e as orientações pertinentes.</p><a class="text-link" href="/avaliacaoneuropsicologica">Conheça o processo <span>↗</span></a><br /><a class="button button-green" href="${config.whatsapp}?text=${encodeURIComponent('Olá! Gostaria de informações sobre avaliação neuropsicológica na Ludos.')}">Conversar sobre avaliação <span>↗</span></a>`,
 tour:'<p class="eyebrow">POR DENTRO DA LUDOS</p><h2>Um espaço de acolhimento.</h2><video controls playsinline preload="metadata" poster="/assets/tour-poster.webp"><source src="/assets/clinica-tour.mp4" type="video/mp4" /></video><p>Uma visita pelos ambientes da clínica: recepção, assentos coloridos e salas de atendimento. Vídeo sem áudio nesta apresentação.</p>',
 recepcao:'<p class="eyebrow">POR DENTRO DA LUDOS</p><h2>O primeiro acolhimento.</h2><img src="/assets/recepcao.webp" alt="Recepção da Ludos, com logo na parede e assentos coloridos" />',
 sala:'<p class="eyebrow">POR DENTRO DA LUDOS</p><h2>Espaço para o encontro.</h2><img src="/assets/sala.webp" alt="Sala da clínica com mesa, cadeiras e brinquedos" />',
 detalhes:'<p class="eyebrow">POR DENTRO DA LUDOS</p><h2>Descobertas em cada canto.</h2><img src="/assets/detalhes.webp" alt="Mesa infantil e brinquedos em um ambiente da Ludos" />'
};
document.querySelectorAll('[data-dialog]').forEach(button=>button.addEventListener('click',event=>{event.preventDefault();content.innerHTML=detailHTML[button.dataset.dialog];dialog.showModal();}));
document.querySelector('.dialog-close').addEventListener('click',()=>dialog.close());
dialog.addEventListener('click',event=>{if(event.target===dialog){const r=dialog.getBoundingClientRect();if(event.clientX<r.left||event.clientX>r.right||event.clientY<r.top||event.clientY>r.bottom)dialog.close();}});
dialog.addEventListener('close',()=>{content.querySelector('video')?.pause();});
let progressRAF=0;
function updateProgress(){progressRAF=0;const max=document.documentElement.scrollHeight-innerHeight;document.querySelector('.page-progress span').style.transform=`scaleX(${max>0?clamp(scrollY/max):0})`;}
window.addEventListener('scroll',()=>{if(!progressRAF)progressRAF=requestAnimationFrame(updateProgress);},{passive:true});
updateProgress();
if(document.querySelector('.scene-anchor')){
  import('./scene.js').catch(error=>console.warn('A versão estática permanece disponível.',error));
}else world.remove();
