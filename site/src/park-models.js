import * as THREE from 'three';
import {RoundedBoxGeometry} from 'three/addons/geometries/RoundedBoxGeometry.js';
import {rampPoint} from './park-path.js';

// Cross-sections follow the same centreline as the actor, including its S bends.
export function tubeSection(curve,radius,startAngle,endAngle,rows=120,columns=24){
  const positions=[],indices=[];
  for(let row=0;row<=rows;row++){
    const t=row/rows,p=curve.getPoint(t),tangent=curve.getTangent(t);
    const normal=new THREE.Vector3(-tangent.y,tangent.x,0).normalize();
    for(let col=0;col<=columns;col++){
      const angle=startAngle+(endAngle-startAngle)*col/columns;
      positions.push(p.x+normal.x*radius*Math.cos(angle),p.y+normal.y*radius*Math.cos(angle),p.z+radius*Math.sin(angle));
      if(row<rows&&col<columns){const a=row*(columns+1)+col,b=a+columns+1;indices.push(a,a+1,b,a+1,b+1,b);}
    }
  }
  const geometry=new THREE.BufferGeometry();geometry.setAttribute('position',new THREE.Float32BufferAttribute(positions,3));geometry.setIndex(indices);geometry.computeVertexNormals();return geometry;
}

export function createEnclosedSlide(curve,radius,materials){
  const group=new THREE.Group();group.name='Tobogã fechado com janela de acrílico';
  const add=(geometry,material)=>{const mesh=new THREE.Mesh(geometry,material);group.add(mesh);return mesh;};
  // Thick opaque rear shell, visible inner lining and a separate transparent front half.
  const shell=add(tubeSection(curve,radius,Math.PI,Math.PI*2),materials.shell);shell.castShadow=true;
  add(tubeSection(curve,radius-.035,Math.PI,Math.PI*2),materials.lining);
  const glass=add(tubeSection(curve,radius,0,Math.PI),materials.glass);glass.renderOrder=3;
  // Small edge seals give the window a tangible boundary.
  for(const angle of [0,Math.PI]){
    const pts=Array.from({length:121},(_,i)=>{const t=i/120,p=curve.getPoint(t),v=curve.getTangent(t);const n=new THREE.Vector3(-v.y,v.x,0).normalize();return p.addScaledVector(n,radius*Math.cos(angle));});
    add(new THREE.TubeGeometry(new THREE.CatmullRomCurve3(pts),120,.022,8,false),materials.trim);
  }
  // Narrow curved highlights on the acrylic; broken lengths read as reflections, not rails.
  for(const [from,to,angle] of [[.04,.27,.57],[.32,.57,.57],[.64,.94,.57],[.15,.38,2.3],[.59,.84,2.3]]){
    const pts=Array.from({length:30},(_,i)=>{const t=from+(to-from)*i/29,p=curve.getPoint(t),v=curve.getTangent(t);const n=new THREE.Vector3(-v.y,v.x,0).normalize();p.addScaledVector(n,(radius+.008)*Math.cos(angle));p.z+=(radius+.008)*Math.sin(angle);return p;});
    const reflection=add(new THREE.TubeGeometry(new THREE.CatmullRomCurve3(pts),32,.009,6,false),materials.reflection);reflection.renderOrder=4;
  }
  for(const t of [0,.25,.5,.75,1]){
    const p=curve.getPoint(t),axis=curve.getTangent(t);
    const collar=add(new THREE.TorusGeometry(radius+.008,.035,12,48),materials.trim);collar.position.copy(p);collar.quaternion.setFromUnitVectors(new THREE.Vector3(0,0,1),axis);collar.castShadow=true;
    for(const side of [-1,1]){
      const n=new THREE.Vector3(-axis.y,axis.x,0).normalize();
      const bolt=add(new THREE.SphereGeometry(.045,16,12),materials.metal);bolt.position.copy(p).addScaledVector(n,side*radius);bolt.scale.z=.55;
    }
  }
  return group;
}


export function createPlaygroundSlide(top,entry,exit,footY,materials,mobile){
  const group=new THREE.Group();group.name='Escorregador Ludos com escada e patamar';
  // This shallow, open toy stays behind the actor throughout its somersault.
  // Enclosed tubes keep their own front glass and original depth unchanged.
  group.position.z=-1.6;
  const width=mobile?.72:1.26;
  const foot=-footY*top.scale;
  const add=(geometry,color,x,y,z)=>{const mesh=new THREE.Mesh(geometry,materials[color]);mesh.position.set(x,-y,z);mesh.castShadow=true;mesh.receiveShadow=true;group.add(mesh);return mesh;};
  const bar=(a,b,radius,color)=>{
    const delta=b.clone().sub(a),mesh=new THREE.Mesh(new THREE.CylinderGeometry(radius,radius,delta.length(),16),materials[color]);mesh.position.copy(a).add(b).multiplyScalar(.5);mesh.quaternion.setFromUnitVectors(new THREE.Vector3(0,1,0),delta.normalize());mesh.castShadow=true;group.add(mesh);return mesh;
  };
  const tx=top.x/100,ty=top.y/100+foot;
  const ex=entry.x/100,ey=entry.y/100+foot;
  const bottom=exit.y/100+foot;
  add(new RoundedBoxGeometry(width+Math.abs(tx-ex),.12,.8,5,.05),'cream',(tx+ex)/2,ty+.06,1.2);
  // Rear ladder in perspective, with rounded rails, moulded treads and grounded feet.
  const ladderX=tx+width*(mobile?-.16:.10);
  for(const side of [-1,1]){
    const z=side<0?.70:.96;
    const upper=new THREE.Vector3(ladderX+side*width*.20,-ty+.4,z);
    const lower=new THREE.Vector3(ladderX+side*width*.20+width*.30,-bottom,z);
    bar(upper,lower,.045,'green');
    add(new RoundedBoxGeometry(.25,.09,.23,3,.035),'ink',lower.x,bottom+.04,z);
    const supportX=tx-width*.28;
    bar(new THREE.Vector3(supportX,-ty,.72),new THREE.Vector3(supportX,-bottom,.72),.045,'green');
  }
  for(let i=0;i<=6;i++){
    const t=i/6,stepY=ty+(bottom-ty)*t;
    const step=add(new RoundedBoxGeometry(width*.47,.065,.30,4,.025),i%2?'yellow':'orange',ladderX+width*.30*t,stepY, .965);step.rotation.z=.04;
  }
  // A small upper landing joins the bounce destination to the ramp's first lip.
  // The single level deck meets the ramp lip at exactly the same height.
  for(const z of [.79,1.61]){
    bar(new THREE.Vector3(tx+width*.35,-ty,z),new THREE.Vector3(tx+width*.35,-ty+.42,z),.035,'pink');
    bar(new THREE.Vector3(tx+width*.35,-ty+.42,z),new THREE.Vector3(ex+width*.35,-ey+.42,z),.035,'pink');
  }
  // Thick ramp bed, curved sidewalls and rounded lips, with a solid underside.
  const centres=Array.from({length:101},(_,i)=>{const p=rampPoint(entry,exit,i/100);return new THREE.Vector3(p.x/100,-(p.y/100+foot),1.2);});
  const vertices=[],indices=[];
  for(const p of centres)for(const depth of [0,-.12])for(const side of [-1,1])vertices.push(p.x+side*width*.47,p.y,p.z+depth);
  for(let i=0;i<100;i++){const a=i*4,b=a+4;indices.push(a,a+1,b,a+1,b+1,b,a+2,b+2,a+3,a+3,b+2,b+3,a,b,a+2,a+2,b,b+2,a+1,a+3,b+1,a+3,b+3,b+1);}
  indices.push(0,2,1,1,2,3,400,401,402,401,403,402);
  const bed=new THREE.BufferGeometry();bed.setAttribute('position',new THREE.Float32BufferAttribute(vertices,3));bed.setIndex(indices);bed.computeVertexNormals();
  const bedMesh=new THREE.Mesh(bed,materials.blue);bedMesh.material.side=THREE.DoubleSide;bedMesh.receiveShadow=false;group.add(bedMesh);
  for(const side of [-1,1]){
    const edge=centres.map(p=>new THREE.Vector3(p.x+side*width*.49,p.y+.015,p.z+.12));
    const rail=new THREE.Mesh(new THREE.TubeGeometry(new THREE.CatmullRomCurve3(edge),100,mobile?.045:.065,16,false),materials.pink);rail.castShadow=true;group.add(rail);
    const underside=centres.map(p=>new THREE.Vector3(p.x+side*width*.45,p.y-.07,p.z-.10));
    group.add(new THREE.Mesh(new THREE.TubeGeometry(new THREE.CatmullRomCurve3(underside),100,.04,12,false),materials.green));
  }
  const last=centres.at(-1);
  add(new RoundedBoxGeometry(width,.12,.78,5,.05),'cream',last.x,bottom+.06,1.2);
  for(const fraction of [.42,.76]){
    const p=centres[Math.round(fraction*100)];
    bar(new THREE.Vector3(p.x,-bottom,.65),new THREE.Vector3(p.x,p.y,.65),.04,'green');
    add(new RoundedBoxGeometry(.30,.10,.40,3,.04),'cream',p.x,bottom+.06,.65);
  }
  return group;
}






export function createPlaygroundSwing(stop,footY,materials,mobile){
  const group=new THREE.Group();group.name='Balanço Ludos com estrutura e assento articulado';
  const width=mobile?.88:1.65,length=mobile?1.25:2;
  const x=stop.x/100,seatY=-(stop.y/100-footY*stop.scale),z=1.2;
  const pivot=new THREE.Group();pivot.position.set(x,seatY+length,z);group.add(pivot);
  const add=(parent,geometry,color,position)=>{const mesh=new THREE.Mesh(geometry,materials[color]);mesh.position.copy(position);mesh.castShadow=true;mesh.receiveShadow=true;parent.add(mesh);return mesh;};
  const bar=(parent,a,b,radius,color)=>{const d=b.clone().sub(a);const mesh=add(parent,new THREE.CylinderGeometry(radius,radius,d.length(),24),color,a.clone().add(b).multiplyScalar(.5));mesh.quaternion.setFromUnitVectors(new THREE.Vector3(0,1,0),d.normalize());return mesh;};
  for(const side of [-1,1]){
    for(const depth of [-.50,.50]){
      const top=new THREE.Vector3(x+side*width*.40,seatY+length,z);
      const base=new THREE.Vector3(x+side*width*.48,seatY-.65,z+depth);
      bar(group,top,base,mobile?.035:.055,'green');
      add(group,new RoundedBoxGeometry(mobile?.17:.25,.09,.23,5,.035),'ink',base.clone().add(new THREE.Vector3(0,-.035,0)));
      add(group,new THREE.SphereGeometry(.055,24,16),'metal',top);
    }
    bar(group,new THREE.Vector3(x+side*width*.46,seatY-.45,z-.43),new THREE.Vector3(x+side*width*.46,seatY-.45,z+.43),.025,'cream');
  }
  const beam=add(group,new THREE.CapsuleGeometry(mobile?.055:.085,width*.93,8,24),'pink',new THREE.Vector3(x,seatY+length+.04,z));beam.rotation.z=Math.PI/2;
  const seatWidth=mobile?.72:1.30;
  add(pivot,new RoundedBoxGeometry(seatWidth,.12,.64,6,.05),'orange',new THREE.Vector3(0,-length-.06,0));
  add(pivot,new RoundedBoxGeometry(seatWidth*.92,.035,.56,5,.015),'cream',new THREE.Vector3(0,-length-.008,0));
  for(const side of [-1,1]){
    const ropeX=side*seatWidth*.40;
    bar(pivot,new THREE.Vector3(ropeX,0,0),new THREE.Vector3(ropeX,-length,0),.014,'ink');
    const mount=add(group,new THREE.TorusGeometry(.055,.015,12,28),'metal',new THREE.Vector3(x+ropeX,seatY+length,z));mount.rotation.y=Math.PI/2;
    for(const depth of [-.20,.20])bar(pivot,new THREE.Vector3(ropeX,-length+.28,0),new THREE.Vector3(ropeX,-length,depth),.012,'ink');
    add(pivot,new THREE.SphereGeometry(.027,20,12),'metal',new THREE.Vector3(ropeX,-length+.02,.22));
  }
  return {group,pivot,length};
}
