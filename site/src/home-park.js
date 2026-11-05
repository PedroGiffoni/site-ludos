import * as THREE from 'three';
import {RoundedBoxGeometry} from 'three/addons/geometries/RoundedBoxGeometry.js';
import {createEnclosedSlide} from './park-models.js';
import {parkPose} from './park-path.js';

export class HomePark{
  constructor(scene,actor){
    this.scene=scene;this.actor=actor;
    this.actorFootY=new THREE.Box3().setFromObject(actor).min.y;
    this.contactVertices=[];
    actor.traverse(part=>{
      if(!part.isMesh)return;
      const attribute=part.geometry.attributes.position;
      for(let i=0;i<attribute.count;i++)this.contactVertices.push(new THREE.Vector3().fromBufferAttribute(attribute,i).applyMatrix4(part.matrixWorld));
    });
    this.group=new THREE.Group();this.group.name='Parque Ludos';scene.add(this.group);
    this.actorGroup=new THREE.Group();this.actorGroup.add(actor);scene.add(this.actorGroup);
    this.materials={};
    for(const [name,color] of Object.entries({green:'#AFC8A0',pink:'#F3B4B4',blue:'#8DD1DC',yellow:'#FFD86E',orange:'#FBB277',cream:'#FFF6DE',ink:'#537359'}))this.materials[name]=new THREE.MeshPhysicalMaterial({color,roughness:.45,metalness:0,clearcoat:.22,clearcoatRoughness:.5});
    this.materials.glass=new THREE.MeshPhysicalMaterial({color:'#e6faff',transparent:true,opacity:.16,roughness:.08,metalness:.08,clearcoat:1,clearcoatRoughness:.04,side:THREE.DoubleSide,depthWrite:false});
    this.materials.reflection=new THREE.MeshBasicMaterial({color:'#ffffff',transparent:true,opacity:.72,depthWrite:false});
    this.materials.metal=new THREE.MeshPhysicalMaterial({color:'#d7e6dc',metalness:.65,roughness:.24});
    this.materials.pinkLining=new THREE.MeshPhysicalMaterial({color:'#f4c9c6',roughness:.32,side:THREE.DoubleSide});
    this.materials.blueLining=new THREE.MeshPhysicalMaterial({color:'#b3dce3',roughness:.32,side:THREE.DoubleSide});
    this.actorGroup.visible=false;
  }
  mesh(geometry,color,x,y,z=0){const m=new THREE.Mesh(geometry,this.materials[color]);m.position.set(x,-y,z);m.castShadow=true;m.receiveShadow=true;this.group.add(m);return m;}
  clear(){this.group.traverse(object=>object.geometry?.dispose());this.group.clear();}
  resize(width,height,hero){
    this.clear();this.width=width;this.height=height;this.hero=hero;
    const mobile=width<761;
    this.railWidth=mobile?62:145;
    const right=mobile?width-47:width-95;
    const left=mobile?width-58:width-155;
    const start=Math.max(0,hero.top+hero.height*.51-height*.53);
    this.start=start;
    this.end=document.querySelector('#contato').getBoundingClientRect().top+scrollY-height*.28;
    const end=Math.max(start+height*3,this.end);
    const span=end-start;
    const sx=hero.left+hero.width*.5+.65*hero.width/980*1.05*100;
    const sy=hero.top+hero.height*.51-.5*hero.width/980*1.05*100;
    const small=mobile?.21:.37;
    // Each following landing belongs to a physical toy in document space.
    const anchors=[
      [0,sx,sy,hero.width/980*1.05*1.15,'join'],
      [.055,left,start+height*.56,small,'jump'],
      [.13,right,start+span*.13+height*.55,small,'jump'],
      [.22,left,start+span*.22+height*.55,small,'jump'],
      [.30,right,start+span*.30+height*.55,small,'jump'],
      [.45,left,start+span*.45+height*.55,small,'slide'],
      [.53,right,start+span*.53+height*.55,small,'jump'],
      [.63,left,start+span*.63+height*.55,small,'jump'],
      [.79,right,start+span*.79+height*.55,small,'slide'],
      [.87,left,start+span*.87+height*.55,small,'jump'],
      [1,right,end+height*.45,small,'jump']
    ];
    this.stops=anchors.map(([fraction,x,y,scale,kind],i)=>({at:start+span*fraction,x,y,scale,kind,lift:mobile?75:130,swing:mobile?8:24,maneuver:i%4===0?'cartwheel':i%3===0?'spin':'flip'}));
    const unit=100;
    const actorHalfHeight=-this.actorFootY*small*unit;
    this.toys=[];
    this.stops.slice(1).forEach((stop,index)=>{
      const x=stop.x/unit,y=(stop.y-this.actorFootY*stop.scale*unit)/unit;
      const firstPart=this.group.children.length;
      let toy;
      if(stop.kind==='slide'){
        const prev=this.stops[index];
        const points=[];
        for(let j=0;j<=120;j++){
          const t=j/120;
          points.push(new THREE.Vector3((prev.x+(stop.x-prev.x)*t+Math.sin(t*Math.PI*2)*stop.swing)/unit,-(prev.y+(stop.y-prev.y)*t)/unit,1.2));
        }
        const curve=new THREE.CatmullRomCurve3(points);
        const radius=mobile?.35:.64;
        const shell=this.materials[index%2?'pink':'blue'];shell.side=THREE.DoubleSide;
        toy=createEnclosedSlide(curve,radius,{shell,lining:this.materials[index%2?'pinkLining':'blueLining'],glass:this.materials.glass,trim:this.materials.cream,metal:this.materials.metal,reflection:this.materials.reflection});
        this.group.add(toy);
        for(const fraction of [.12,.38,.64,.88]){
          const p=curve.getPoint(fraction);
          const bracket=this.mesh(new RoundedBoxGeometry(radius*1.9,.13,.28,3,.04),'green',p.x,-p.y,.38);
          const stem=this.mesh(new THREE.CylinderGeometry(.065,.085,.65,20),'metal',p.x,-p.y+.30,.15);
          this.mesh(new RoundedBoxGeometry(radius*1.45,.14,.65,4,.055),'cream',p.x,-p.y+.65,.15);
        }      }else if(index%3===1){
        const radius=mobile?.28:.48;
        // Solve contact against the curved sphere, including the space between Edy's feet.
        let contact=-Infinity;
        for(const vertex of this.contactVertices){
          const vx=vertex.x*stop.scale,vz=vertex.z*stop.scale;
          const disk=radius*radius-vx*vx-vz*vz;
          if(disk>=0)contact=Math.max(contact,Math.sqrt(disk)-vertex.y*stop.scale);
        }
        const ballY=stop.y/unit+contact;
        toy=this.mesh(new THREE.SphereGeometry(radius,40,28),'yellow',x,ballY,.15);
        for(const angle of [.6,2.2]){const ring=new THREE.Mesh(new THREE.TorusGeometry(radius*1.012,.018,8,50),this.materials.cream);ring.rotation.set(angle,.6,.3);toy.add(ring);}
                const base=this.mesh(new THREE.CylinderGeometry(radius*.85,radius,.16,40),'pink',x,ballY+radius+.08,-.05);
        this.mesh(new THREE.CylinderGeometry(radius*.88,radius*.88,.035,40),'cream',x,ballY+radius+.015,-.05);
        this.mesh(new THREE.CylinderGeometry(radius*.98,radius*.98,.055,40),'ink',x,ballY+radius+.18,-.05);
        const button=new THREE.Mesh(new THREE.SphereGeometry(radius*.17,20,16),this.materials.orange);button.position.set(0,0,radius*.99);button.scale.z=.3;toy.add(button);
      }else{
        const size=mobile?.65:1.12;
        toy=this.mesh(new RoundedBoxGeometry(size,size*.9,size*.95,6,.09),index%2?'pink':'green',x,y+size*.4,-.15);toy.rotation.y=.3;toy.rotation.z=index%2?.04:-.04;
        const cap=this.mesh(new RoundedBoxGeometry(size*1.16,.1,size*.95,3,.04),'cream',x,y+.05,-.1);cap.rotation.y=.3;
        const dot=new THREE.Mesh(new THREE.SphereGeometry(size*.13,20,16),this.materials[index%2?'cream':'yellow']);dot.scale.z=.2;dot.position.z=size*.42;toy.add(dot);
        for(const side of [-1,1]){
          const screw=new THREE.Mesh(new THREE.SphereGeometry(size*.055,16,12),this.materials.metal);screw.position.set(side*size*.37,0,size*.49);screw.scale.z=.5;toy.add(screw);
        }
        const foot=this.mesh(new RoundedBoxGeometry(size*.85,.12,size*.8,4,.04),'ink',x,y+size*.87,-.15);foot.rotation.y=.3;
      }
      // Match the actor's actual foot bounds and depth, rather than a visual estimate.
      // Each solid support is centred on the same z plane as the body.
      if(stop.kind!=='slide'){
        const depthOffset=1.2-(index%3===1?.15:-.15);
        for(const part of this.group.children.slice(firstPart))part.position.z+=depthOffset;
        stop.supportY=y*unit;stop.supportZ=1.2;
      }
      if(index%3===2&&stop.kind!=='slide'){
        const archRadius=mobile?.27:.43;
        this.mesh(new THREE.TorusGeometry(archRadius,.045,8,32,Math.PI),'orange',x,y-archRadius*.1,-.5);
      }
      this.toys.push(toy);
    });
    this.stops.slice(1).forEach((stop,i)=>{
      if(stop.kind==='slide')return;
      const prev=this.stops[i];
      for(let j=1;j<9;j++){
        const pose=parkPose(this.stops,prev.at+(stop.at-prev.at)*j/9);
        this.mesh(new THREE.SphereGeometry(mobile?.018:.025,6,5),'green',pose.x/unit,(pose.y+actorHalfHeight)/unit,-.6);
      }
    });
    this.group.visible=false;
  }
  draw(scroll,reduced){
    const active=scroll>=this.start&&scroll<=this.end+this.height*.8&&!reduced;
    this.group.visible=active;this.actorGroup.visible=active;
    if(!active)return false;
    const pose=parkPose(this.stops,scroll);
    this.group.position.set(-this.width/200,(this.height/2+scroll)/100,0);
    this.actorGroup.position.set((pose.x-this.width/2)/100,(this.height/2-(pose.y-scroll))/100,1.2);
    const inSlide=this.stops[pose.segment]?.kind==='slide';
    const fit=inSlide?1-.24*Math.sin(Math.PI*pose.t):1;
    this.actor.scale.setScalar(pose.scale*fit);
    this.actor.rotation.set(pose.flip,pose.yaw,pose.tilt+pose.roll);
    this.actorGroup.rotation.set(0,0,0);
    const rig=this.actor.userData.rig;
    if(rig){
      rig.accessories.position.y=pose.air*.12+pose.landing*.06;
      rig.accessories.rotation.z=Math.sin(pose.t*Math.PI*2)*pose.air*.08;
      rig.face.rotation.z=pose.landing*.025;
      rig.eyes.forEach(eye=>eye.scale.y=1-pose.landing*.55);
    }
    return true;
  }
}






