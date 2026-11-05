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
