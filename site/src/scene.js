import * as THREE from 'three';
import silhouettes from './characters.json';
import { clamp, sampleFrames } from './scene-math.js';

const COLORS = { fred: '#FFD86E', amora: '#F3B4B4', edy: '#FBB277', jr: '#8DD1DC', zoe: '#AFC8A0' };
const BASES = [[-1.8, -.05, .7], [-3.55, -.72, 1.45], [.65, .5, -.15], [.75, -1.02, 1.9], [3.2, -.4, .8]];
const PHASES={hero:0,universe:1,space:2,courses:3,neuro:4,personality:5,therapy:6,assessment:7,family:8};

function contains(point, points) {
  let inside = false;
  for (let i = 0, j = points.length - 1; i < points.length; j = i++) {
    const [xi, yi] = points[i], [xj, yj] = points[j];
    if ((yi > point[1]) !== (yj > point[1]) && point[0] < (xj - xi) * (point[1] - yi) / (yj - yi) + xi) inside = !inside;
  }
  return inside;
}
function path(points, Path = THREE.Shape) {
  const result = new Path();
  const first = points[0], last = points.at(-1);
  result.moveTo((first[0] + last[0]) / 2, (first[1] + last[1]) / 2);
  points.forEach((point, i) => {
    const next = points[(i + 1) % points.length];
    result.quadraticCurveTo(point[0], point[1], (point[0] + next[0]) / 2, (point[1] + next[1]) / 2);
  });
  result.closePath();
  return result;
}

function character(name) {
  const group = new THREE.Group();
  const data = silhouettes[name];
  [['body', COLORS[name], .34, .075, 0], ['cream', '#FFF1CC', .025, .012, .43], ['dark', '#30382E', .07, .018, .43]].forEach(([layer, color, depth, bevel, z]) => {
    const loops = data[layer];
    const material = new THREE.MeshStandardMaterial({ color, roughness: .67, metalness: 0 });
    loops.filter(loop => loop.area > 0).forEach(loop => {
      const shape = path(loop.points);
      loops.filter(hole => hole.area < 0 && contains(hole.points[0], loop.points)).forEach(hole => shape.holes.push(path(hole.points, THREE.Path)));
      const geometry = new THREE.ExtrudeGeometry(shape, { depth, bevelEnabled: true, bevelSegments: 3, steps: 1, bevelSize: bevel, bevelThickness: bevel, curveSegments: 3 });
      geometry.computeVertexNormals();
      const mesh = new THREE.Mesh(geometry, material);
      mesh.position.z = z;
      group.add(mesh);
    });
  });
  group.name = name;
  return group;
}

export class LudosScene extends HTMLElement {
  static observedAttributes = ['motion-mode', 'progress', 'scene-id', 'chapter-progress'];
  connectedCallback() {
    if (this.renderer) return;
    try { this.mount(); }
    catch (error) { this.dispose(); this.dispatchEvent(new CustomEvent('ludos-error', { detail: { message: 'WebGL indisponível' }, bubbles: true })); console.warn('A composição estática está disponível.', error); }
  }
  attributeChangedCallback() {
    this.reduced = this.getAttribute('motion-mode') !== 'full';
    this.requestRender?.();
  }
  mount() {
    this.reduced = this.getAttribute('motion-mode') !== 'full';
    this.abort = new AbortController();
    this.renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true, powerPreference: 'low-power' });
    this.renderer.setClearColor(0x000000, 0);
    this.renderer.outputColorSpace = THREE.SRGBColorSpace;
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 1.6));
    this.append(this.renderer.domElement);
    this.scene = new THREE.Scene();
    this.camera = new THREE.OrthographicCamera(-8, 8, 5, -5, .1, 100);
    this.camera.position.set(0, 0, 30);
    this.scene.add(new THREE.HemisphereLight('#fff9e5', '#698461', 1.8));
    const key = new THREE.DirectionalLight('#fff4db', 2.1); key.position.set(-7, 9, 13); this.scene.add(key);
    const fill = new THREE.DirectionalLight('#e8f5df', .9); fill.position.set(7, 1, 6); this.scene.add(fill);
    this.root = new THREE.Group(); this.scene.add(this.root);
    this.friends = ['fred', 'amora', 'edy', 'jr', 'zoe'].map((name, i) => {
      const friend = character(name);
      friend.position.set(...BASES[i]);
      friend.userData.scale = [1, .77, 1.15, .57, .83][i];
      friend.scale.setScalar(friend.userData.scale);
      this.root.add(friend);
      return friend;
    });
    this.props = new THREE.Group(); this.root.add(this.props);
    const orbMaterial = new THREE.MeshStandardMaterial({ color: '#fff6de', roughness: .7 });
    [[-3.4, 1.2, 0, .19], [3.7, 1.1, .2, .26], [2.9, -1.8, 1, .13]].forEach(([x,y,z,s]) => {
      const orb = new THREE.Mesh(new THREE.SphereGeometry(s, 20, 16), orbMaterial); orb.position.set(x,y,z); this.props.add(orb);
    });
    const torus = new THREE.Mesh(new THREE.TorusGeometry(.48,.085,10,40), new THREE.MeshStandardMaterial({color:'#F3B4B4',roughness:.65}));
    torus.position.set(-2.7,1.7,-.5);torus.rotation.set(.35,.2,.4);this.props.add(torus);
    this.courseOrbits=new THREE.Group();this.root.add(this.courseOrbits);
    const orbitColors=['#AFC8A0','#FBB277','#8DD1DC'];
    orbitColors.forEach((color,i)=>{
      const ring=new THREE.Group();
      const hoop=new THREE.Mesh(new THREE.TorusGeometry(2.3+i*.25,.035,8,90),new THREE.MeshStandardMaterial({color,roughness:.6}));ring.add(hoop);
      const bead=new THREE.Mesh(new THREE.SphereGeometry(.17+i*.03,18,14),new THREE.MeshStandardMaterial({color,roughness:.55}));bead.position.x=2.3+i*.25;ring.add(bead);
      ring.rotation.set(.55+i*.7,.15+i*.4,i*.8);this.courseOrbits.add(ring);
    });
    this.therapyProps=new THREE.Group();this.root.add(this.therapyProps);
    const flowerMaterial=new THREE.MeshStandardMaterial({color:'#F3B4B4',roughness:.75});
    [[-2.4,1.2,-.4],[2.5,-.6,.2]].forEach(([x,y,z],index)=>{
      const flower=new THREE.Group();
      for(let i=0;i<7;i++){const petal=new THREE.Mesh(new THREE.SphereGeometry(.24,16,12),flowerMaterial);petal.scale.z=.4;petal.position.set(Math.cos(i/7*Math.PI*2)*.32,Math.sin(i/7*Math.PI*2)*.32,0);flower.add(petal);}
      const center=new THREE.Mesh(new THREE.SphereGeometry(.22,16,12),new THREE.MeshStandardMaterial({color:'#FFD86E',roughness:.7}));center.scale.z=.45;center.position.z=.1;flower.add(center);flower.position.set(x,y,z);flower.userData.base=[x,y,z];flower.scale.setScalar(index?.85:1);this.therapyProps.add(flower);
    });
    const arch=new THREE.Mesh(new THREE.TorusGeometry(.6,.09,10,40,Math.PI),new THREE.MeshStandardMaterial({color:'#AFC8A0',roughness:.7}));arch.position.set(2.1,1.4,-.4);arch.rotation.z=-.5;this.therapyProps.add(arch);
    this.assessmentProps=new THREE.Group();this.root.add(this.assessmentProps);
    const nodes=[[-2.7,1.2,.2],[2.3,1.5,-.3],[2.8,-.8,1],[-1.8,-1.8,.5],[.4,2.3,-.6]];
    nodes.forEach(([x,y,z],i)=>{
      const node=new THREE.Mesh(new THREE.SphereGeometry(.18+i*.015,18,14),new THREE.MeshStandardMaterial({color:['#8DD1DC','#AFC8A0','#FBB277','#F3B4B4','#FFD86E'][i],roughness:.65}));node.position.set(x,y,z);this.assessmentProps.add(node);
      const next=nodes[(i+1)%nodes.length];
      const curve=new THREE.QuadraticBezierCurve3(new THREE.Vector3(x,y,z),new THREE.Vector3((x+next[0])*.65,(y+next[1])*.65,-1),new THREE.Vector3(...next));
      const edge=new THREE.Mesh(new THREE.TubeGeometry(curve,25,.025,6,false),new THREE.MeshStandardMaterial({color:'#709a82',roughness:.8}));this.assessmentProps.add(edge);
    });
    this.clockStart = performance.now();
    this.pointer = { x: 0, y: 0 };
    this.requestRender = () => { if (!this.raf && !document.hidden) this.raf = requestAnimationFrame(this.tick); };
    this.tick = now => {
      this.raf = 0;
      if (!this.renderer || document.hidden) return;
      this.draw(now);
      if (!this.reduced && this.visibleScene) this.requestRender();
    };
    const options = { signal: this.abort.signal, passive: true };
    window.addEventListener('scroll', this.requestRender, options);
    window.addEventListener('pointermove', event => { this.pointer.x = event.clientX / innerWidth - .5; this.pointer.y = event.clientY / innerHeight - .5; this.requestRender(); }, options);
    document.addEventListener('visibilitychange', () => { if(document.hidden){cancelAnimationFrame(this.raf);this.raf=0;}else this.requestRender(); }, {signal:this.abort.signal});
    this.renderer.domElement.addEventListener('webglcontextlost', event => { event.preventDefault();document.documentElement.classList.remove('has-3d');cancelAnimationFrame(this.raf);this.raf=0; }, {signal:this.abort.signal});
    this.renderer.domElement.addEventListener('webglcontextrestored', () => {document.documentElement.classList.add('has-3d');this.requestRender();}, {signal:this.abort.signal});
    this.observer = new ResizeObserver(() => this.resize()); this.observer.observe(document.documentElement);if(this.getAttribute('layout')==='contained')this.observer.observe(this);
    window.addEventListener('resize', () => this.resize(), options);
    document.fonts?.ready.then(() => { if(this.renderer)this.resize(); });
    this.resize();
    document.documentElement.classList.add('has-3d');
    this.dispatchEvent(new CustomEvent('ludos-ready', {bubbles:true}));
  }
  resize() {
    if (!this.renderer) return;
    const own=this.getAttribute('layout')==='contained'?this.getBoundingClientRect():null;
    this.width = own?Math.max(1,own.width):innerWidth; this.height = own?Math.max(1,own.height):innerHeight;
    this.renderer.setSize(this.width, this.height);
    this.camera.left = -this.width/200; this.camera.right = this.width/200;
    this.camera.top = this.height/200; this.camera.bottom = -this.height/200; this.camera.updateProjectionMatrix();
    this.anchors = [...document.querySelectorAll('.scene-anchor')].map(element => {
      const r=element.getBoundingClientRect();
      const story=element.closest('.service-story');
      return { element, at:r.top+scrollY+r.height/2-this.height*.52, holdUntil:story&&this.width>760?story.getBoundingClientRect().bottom+scrollY-this.height*.9:null, x:r.left+r.width/2, y:this.height*.52, scale:r.width / 980, phase:PHASES[element.dataset.scene] ?? 0, alpha:1 };
    });
    this.requestRender();
  }
  draw(now) {
    const time=(now-this.clockStart)/1000;
    const externalProgress=this.hasAttribute('progress')?Number(this.getAttribute('progress')):null;
    const y=externalProgress!==null?clamp(Number.isFinite(externalProgress)?externalProgress:0)*(document.documentElement.scrollHeight-innerHeight):scrollY;
    const anchors=this.anchors;
    const contained=this.getAttribute('layout')==='contained';
    if(!anchors?.length&&!contained)return;
    const mobile=this.width<761;
    const frames=[];
    anchors.forEach((original,i)=>{
      const a={...original};
      const r=a.element.getBoundingClientRect();
      a.y=i===0?r.top+r.height*.51:clamp(r.top+r.height*.51,this.height*.2,this.height*.8);
      if(i===0){frames.push({...a,at:-1,scale:a.scale*(mobile?1.08:1.05)});}
      frames.push({...a,scale:a.scale*(mobile?1.06:1.05)});
      if(i===0)frames.push({...a,at:a.at+this.height*.25,scale:a.scale*(mobile?1.06:1.05)});
      if(a.holdUntil)frames.push({...a,at:Math.max(a.at,a.holdUntil),scale:a.scale*1.05});
      // Characters retreat between the deliberately reserved scenes.
      if(i<anchors.length-1){const next=anchors[i+1];frames.push({...a,at:Math.min(next.at-1,Math.max(a.at+(next.at-a.at)*.55,a.holdUntil?a.holdUntil+this.height*.15:0)),x:this.width+180,scale:.12,alpha:0});}
    });
    const last=anchors.at(-1);if(last)frames.push({...last,at:Math.max(last.at+this.height*.65,last.holdUntil?last.holdUntil+this.height*.25:0),x:this.width+200,alpha:0,scale:.1});
    let state=contained?{x:this.width/2,y:this.height*.53,scale:Math.min(this.width/980,this.height/460),phase:(PHASES[this.getAttribute('scene-id')]??0),alpha:1}:sampleFrames(frames.sort((a,b)=>a.at-b.at),y);
    if(this.reduced&&!contained){
      const visible=anchors.map(a=>({...a,rect:a.element.getBoundingClientRect()})).filter(a=>a.rect.bottom>0&&a.rect.top<this.height).sort((a,b)=>Math.abs(a.rect.top+a.rect.height/2-this.height/2)-Math.abs(b.rect.top+b.rect.height/2-this.height/2))[0];
      state=visible?{...visible,x:visible.rect.left+visible.rect.width/2,y:visible.rect.top+visible.rect.height*.51,alpha:1}:{...state,alpha:0};
    }
    if(!this.reduced&&!contained){
      const pinned=anchors.find(a=>{const r=a.element.getBoundingClientRect();return a.element.closest('.service-story')&&r.top<this.height*.8&&r.bottom>this.height*.15;});
      if(pinned){const r=pinned.element.getBoundingClientRect();state={...pinned,x:r.left+r.width/2,y:r.top+r.height*.51,alpha:1};}
    }
    if(contained&&externalProgress!==null){state.x+=Math.sin(clamp(externalProgress)*Math.PI*2)*this.width*.08;}
    this.visibleScene = state.alpha>.01;
    this.root.visible=this.visibleScene;
    if(this.visibleScene){
      this.root.position.set((state.x-this.width/2)/100,(this.height/2-state.y)/100,0);
      this.root.scale.setScalar(state.scale*state.alpha*(state.phase>=7.5?1.05:state.phase>=4?1.35:1));
      const phase=state.phase;
      this.root.rotation.set(-.08,this.reduced?-.13:-.13+this.pointer.x*.2,0);
      this.friends.forEach((friend,i)=>{
        const base=BASES[i], pulse=this.reduced?0:Math.sin(time*1.3+i*1.4)*.075;
        const family=phase>7.5;
        const focus=family?[1,2,3].includes(i):phase>6.5?i===0:phase>4.5?i===1:phase>2.5?i===0:phase>.5&&phase<1.6?i===2:phase>1.6&&phase<2.5?i===3:true;
        const mix=phase>.5?1:0;
        friend.visible=focus;
        const familyBase=({1:[-2.6,-.3,1],2:[0,.3,-.3],3:[2.4,-.4,1.4]})[i];
        friend.position.set(family&&familyBase?familyBase[0]:focus&&mix?0:base[0],(family&&familyBase?familyBase[1]:focus&&mix?0:base[1])+pulse,family&&familyBase?familyBase[2]:focus&&mix?.5:base[2]);
        friend.scale.setScalar(friend.userData.scale*(family?1.1:mix?1.8:1));
        friend.rotation.set(0,this.reduced?0:Math.sin(time*.7+i)*.09, (i-2)*.055+(this.reduced?0:Math.sin(time*.8+i)*.025));
      });
      this.props.visible=phase<.5;
      this.courseOrbits.visible=phase>=4&&phase<5.5;
      if(this.courseOrbits.visible){
        this.courseOrbits.children.forEach((ring,i)=>{ring.rotation.z=i*.8+(this.reduced?0:time*(.15+i*.05)+y*.0005);});
        this.courseOrbits.rotation.y=this.reduced?.15:Math.sin(time*.25)*.2;
      }
      this.therapyProps.visible=phase>=5.5&&phase<6.5;
      const chapter=clamp(Number(this.getAttribute('chapter-progress'))||0);
      if(this.therapyProps.visible){this.therapyProps.rotation.z=this.reduced?0:Math.sin(time*.4)*.1+chapter*.4;this.therapyProps.children.forEach((prop,i)=>{if(prop.userData.base){prop.position.x=prop.userData.base[0]*(this.reduced?1:1-chapter*.15);prop.rotation.z=this.reduced?0:time*.15*(i?1:-1);}});}
      this.assessmentProps.visible=phase>=6.5&&phase<7.5;
      if(this.assessmentProps.visible){this.assessmentProps.rotation.set(this.reduced?0:Math.sin(time*.3)*.08,this.reduced?0:chapter*.35, this.reduced?0:Math.sin(time*.2)*.05);}
      if(!this.reduced)this.props.rotation.z=Math.sin(time*.5)*.08;
    }
    this.renderer.render(this.scene,this.camera);
  }
  disconnectedCallback() { this.dispose(); }
  dispose() {
    cancelAnimationFrame(this.raf); this.raf=0;
    this.abort?.abort();this.observer?.disconnect();
    const geometries=new Set(),materials=new Set();
    this.scene?.traverse(object=>{if(object.geometry)geometries.add(object.geometry);if(object.material){for(const m of Array.isArray(object.material)?object.material:[object.material])materials.add(m);}});
    geometries.forEach(g=>g.dispose());materials.forEach(m=>m.dispose());
    this.renderer?.dispose(); this.renderer?.domElement.remove();this.renderer=null;
    document.documentElement.classList.remove('has-3d');
  }
}
if (!customElements.get('ludos-scene')) customElements.define('ludos-scene',LudosScene);
