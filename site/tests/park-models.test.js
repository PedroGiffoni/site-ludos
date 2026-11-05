import {test} from 'node:test';
import assert from 'node:assert/strict';
import * as THREE from 'three';
import {tubeSection} from '../src/park-models.js';

test('front acrylic and rear shell meet along the same seams on a curved tube',()=>{
  const curve=new THREE.CatmullRomCurve3([new THREE.Vector3(0,0,1.2),new THREE.Vector3(.3,-2,1.2),new THREE.Vector3(-.2,-4,1.2)]);
  const front=tubeSection(curve,.64,0,Math.PI,20,12);
  const rear=tubeSection(curve,.64,Math.PI,Math.PI*2,20,12);
  const f=front.attributes.position,r=rear.attributes.position;
  for(let row=0;row<=20;row++){
    for(const [a,b] of [[row*13,row*13+12],[row*13+12,row*13]]){
      for(const component of ['getX','getY','getZ'])assert.ok(Math.abs(f[component](a)-r[component](b))<1e-6);
    }
  }
  assert.ok([...f.array,...front.attributes.normal.array].every(Number.isFinite));
  front.dispose();rear.dispose();
});

test('open playground remains behind the character throughout a full somersault',async()=>{
  const {createPlaygroundSlide}=await import('../src/park-models.js');
  const {createCharacterModel}=await import('../src/character-models.js');
  const materials=Object.fromEntries(['cream','green','ink','yellow','orange','pink','blue'].map(name=>[name,new THREE.MeshStandardMaterial()]));
  const actor=createCharacterModel('edy');
  const foot=new THREE.Box3().setFromObject(actor).min.y;
  for(const mobile of [false,true]){
    const top={x:900,y:800,scale:mobile?.21:.37};
    const playground=createPlaygroundSlide(top,{...top,x:880},{...top,x:860,y:1100,swing:10},foot,materials,mobile);
    const front=new THREE.Box3().setFromObject(playground).max.z;
    actor.position.z=1.2;actor.scale.setScalar(top.scale);
    for(let i=0;i<=32;i++){
      actor.rotation.x=i/32*Math.PI*2;
      assert.ok(new THREE.Box3().setFromObject(actor).min.z>front);
    }
    playground.traverse(part=>part.geometry?.dispose());
  }
  actor.traverse(part=>part.geometry?.dispose());
  Object.values(materials).forEach(material=>material.dispose());
});

test('playground grounding puts its base on the section boundary without changing its size',async()=>{
  const {groundPlayground}=await import('../src/park-models.js');
  const group=new THREE.Group();const mesh=new THREE.Mesh(new THREE.BoxGeometry(2,3,1),new THREE.MeshStandardMaterial());group.add(mesh);group.position.set(4,-12,1);group.scale.setScalar(1.6);
  const before=new THREE.Box3().setFromObject(group).getSize(new THREE.Vector3());
  const offset=groundPlayground(group,1200);
  assert.ok(Math.abs(-new THREE.Box3().setFromObject(group).min.y*100-1200)<1e-8);
  assert.ok(new THREE.Box3().setFromObject(group).getSize(new THREE.Vector3()).distanceTo(before)<1e-8);
  assert.ok(Math.abs(offset+240)<1e-5);
  mesh.geometry.dispose();mesh.material.dispose();
});
