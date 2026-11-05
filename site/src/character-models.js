import * as THREE from 'three';
import vectors from './vector-characters.json' with {type:'json'};

const colors={fred:'#FFD86E',amora:'#F3B4B4',edy:'#FBB277',jr:'#8DD1DC',zoe:'#AFC8A0'};
function shapes(commands){
  const path=new THREE.ShapePath();
  for(const [type,...v] of commands){
    if(type==='M')path.moveTo(...v);
    else if(type==='L')path.lineTo(...v);
    else if(type==='C')path.bezierCurveTo(...v);
    else if(type==='Z')path.currentPath?.closePath();
  }
  return path.toShapes(false);
}

export function createCharacterModel(name){
  const root=new THREE.Group();root.name=name;
  const body=new THREE.Group(),face=new THREE.Group(),accessories=new THREE.Group();
  body.name='Corpo moldado';face.name='Expressão';accessories.name='Acessórios';
  root.add(body);body.add(face,accessories);
  const materials={
    body:new THREE.MeshPhysicalMaterial({color:colors[name],roughness:.48,metalness:0,clearcoat:.16,clearcoatRoughness:.5}),
    cream:new THREE.MeshStandardMaterial({color:'#FFF1CC',roughness:.65}),
    dark:new THREE.MeshStandardMaterial({color:'#30382E',roughness:.64})
  };
  const eyes=[];
  for(const drawing of vectors[name].paths){
    const isBody=drawing.layer==='body';
    const isEye=name==='edy'&&drawing.layer==='dark'&&drawing.height<.3&&drawing.center[1]<.8&&drawing.center[1]>0;
    const isAccessory=name!=='fred'&&drawing.layer==='dark'&&drawing.center[1]>.7;
    const depth=isBody?.72:isAccessory?.34:.045;
    const bevel=isBody?.105:isAccessory?.045:.012;
    const pivot=new THREE.Group();pivot.position.set(...drawing.center,0);
    pivot.name=isEye?'Olho':isBody?'Volume':'Detalhe';
    for(const shape of shapes(drawing.commands)){
      const geometry=new THREE.ExtrudeGeometry(shape,{depth,steps:2,bevelEnabled:true,bevelSegments:isBody?8:4,bevelSize:bevel,bevelThickness:isBody?.17:bevel,curveSegments:14});
      geometry.translate(-drawing.center[0],-drawing.center[1],isBody?-.36:isAccessory?-.06:.57);
      const mesh=new THREE.Mesh(geometry,materials[drawing.layer]);mesh.castShadow=true;mesh.receiveShadow=true;
      pivot.add(mesh);
    }
    (isBody?body:isAccessory?accessories:face).add(pivot);
    if(isEye)eyes.push(pivot);
  }
  root.userData.rig={body,face,accessories,eyes};
  root.userData.source='Curvas vetoriais originais de ELEMENTOS_LUDOS.ai';
  return root;
}
