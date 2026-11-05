import * as THREE from 'three';

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
