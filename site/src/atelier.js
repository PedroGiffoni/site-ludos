import * as THREE from 'three';
import {OrbitControls} from 'three/addons/controls/OrbitControls.js';
import {GLTFLoader} from 'three/addons/loaders/GLTFLoader.js';
import {gsap} from 'gsap';

const container=document.querySelector('#model-view');
const status=document.querySelector('#model-status');
const scene=new THREE.Scene();
const camera=new THREE.PerspectiveCamera(35,1,.1,100);camera.position.set(0,.3,8.5);
let renderer,controls,model,sequence=0,raf=0,mounted=true;
const pivot=new THREE.Group();scene.add(pivot);
const loader=new GLTFLoader();
const names={edy:'Edy',fred:'Fred',amora:'Amora',jr:'Jr',zoe:'Zoe'};
function dispose(object){const materials=new Set();object.traverse(child=>{child.geometry?.dispose();if(child.material)materials.add(child.material);});materials.forEach(material=>material.dispose());}
try{
  renderer=new THREE.WebGLRenderer({antialias:true,alpha:true});renderer.setPixelRatio(Math.min(devicePixelRatio,1.7));renderer.shadowMap.enabled=true;renderer.shadowMap.type=THREE.PCFShadowMap;container.append(renderer.domElement);
  scene.add(new THREE.HemisphereLight('#fff7df','#849671',2));
  const light=new THREE.DirectionalLight('#fff4df',2.4);light.position.set(-3,5,8);scene.add(light);
  const fill=new THREE.DirectionalLight('#d8eee3',1);fill.position.set(4,1,-4);scene.add(fill);
  controls=new OrbitControls(camera,renderer.domElement);controls.enableDamping=true;controls.enablePan=false;controls.minDistance=4;controls.maxDistance=13;controls.target.set(0,0,0);
  const shadow=new THREE.Mesh(new THREE.CircleGeometry(1.5,48),new THREE.MeshBasicMaterial({color:'#7c8e6b',transparent:true,opacity:.13,depthWrite:false}));shadow.rotation.x=-Math.PI/2;shadow.position.y=-1.9;shadow.scale.y=.5;scene.add(shadow);
  function resize(){const r=container.getBoundingClientRect();renderer.setSize(r.width,r.height);camera.aspect=r.width/r.height;camera.updateProjectionMatrix();}
  const observer=new ResizeObserver(resize);observer.observe(container);resize();
  const render=()=>{if(!mounted)return;controls.update();renderer.render(scene,camera);raf=requestAnimationFrame(render);};render();
  async function select(name){
    const id=++sequence;status.textContent=`Carregando ${names[name]}…`;
    try{
      const gltf=await loader.loadAsync(`/models/${name}.glb`);
      if(id!==sequence||!mounted){dispose(gltf.scene);return;}
      gsap.killTweensOf(pivot.rotation);pivot.rotation.set(0,-.22,0);
      if(model){pivot.remove(model);dispose(model);}
      model=gltf.scene;pivot.add(model);
      const box=new THREE.Box3().setFromObject(model);const center=box.getCenter(new THREE.Vector3());model.position.sub(center);
      const size=box.getSize(new THREE.Vector3());const scale=Math.min(1.05,3.5/Math.max(size.x,size.y));model.scale.setScalar(scale);
      document.querySelectorAll('[data-model]').forEach(button=>button.setAttribute('aria-pressed',String(button.dataset.model===name)));
      document.querySelector('#model-download').href=`/models/${name}.glb`;status.textContent=`${names[name]} · arraste para explorar`;
    }catch(error){status.textContent='Não foi possível carregar o modelo.';console.error(error);}
  }
  document.querySelectorAll('[data-model]').forEach(button=>button.addEventListener('click',()=>select(button.dataset.model)));
  document.querySelectorAll('[data-move]').forEach(button=>button.addEventListener('click',()=>{
    if(!model)return;
    gsap.killTweensOf(pivot.rotation);pivot.rotation.set(0,-.22,0);
    const axis={flip:'x',spin:'y',cartwheel:'z'}[button.dataset.move];
    gsap.to(pivot.rotation,{[axis]:pivot.rotation[axis]+Math.PI*2,duration:2.2,ease:'power2.inOut'});
  }));
  document.querySelector('#model-reset').addEventListener('click',()=>{gsap.killTweensOf(pivot.rotation);gsap.to(pivot.rotation,{x:0,y:-.22,z:0,duration:.6});camera.position.set(0,.3,8.5);controls.target.set(0,0,0);});
  container.addEventListener('keydown',event=>{if(event.key==='ArrowLeft'||event.key==='ArrowRight'){event.preventDefault();pivot.rotation.y+=event.key==='ArrowLeft'?-.2:.2;}});
  window.addEventListener('pagehide',()=>{mounted=false;sequence++;cancelAnimationFrame(raf);observer.disconnect();controls.dispose();if(model)dispose(model);shadow.geometry.dispose();shadow.material.dispose();renderer.dispose();},{once:true});
  select('edy');
}catch(error){status.textContent='Este navegador não disponibilizou o 3D. Os arquivos GLB podem ser baixados pelo botão ao lado.';console.warn(error);}
