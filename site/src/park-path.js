import {clamp} from './scene-math.js';

// All positions use CSS pixels. The same scroll coordinate always gives the same pose.
export function parkPose(stops,scroll){
  if(!stops.length)return null;
  if(scroll<=stops[0].at)return {...stops[0],tilt:0,air:0,flip:0,yaw:0,roll:0,landing:0,t:0,segment:0};
  for(let i=1;i<stops.length;i++){
    const b=stops[i],a=stops[i-1];
    if(scroll>b.at)continue;
    const timeline=clamp((scroll-a.at)/(b.at-a.at));
    // Hold on the landing before takeoff and after touchdown, even while scrolling.
    const t=b.kind==='jump'?clamp((timeline-.14)/.72):timeline;
    const smooth=t*t*(3-2*t);
    const slide=b.kind==='slide';
    const jump=b.kind==='jump';
    const turn=clamp((t-.18)/.64);
    const rotation=turn*turn*(3-2*turn)*Math.PI*2;
    const x=a.x+(b.x-a.x)*(slide?t:smooth)+(slide?Math.sin(t*Math.PI*2)*b.swing:0);
    const lift=jump?Math.max(b.lift,Math.abs(b.y-a.y)*.4+80):0;
    const y=a.y+(b.y-a.y)*(jump?smooth:t)-(jump?Math.sin(Math.PI*t)*lift:0);
    const maneuver=b.maneuver??(i%3===0?'spin':'flip');
    return {x,y,scale:a.scale+(b.scale-a.scale)*smooth,at:scroll,tilt:slide?Math.sin(t*Math.PI*2)*.3:jump?Math.sin(Math.PI*t)*((b.x>a.x)?-.2:.2):0,air:jump?Math.sin(Math.PI*t):0,flip:jump&&maneuver==='flip'?-rotation:slide?Math.sin(t*Math.PI)*.25:0,yaw:jump&&maneuver==='spin'?rotation:slide?Math.sin(t*Math.PI*2)*.55:0,roll:jump&&maneuver==='cartwheel'?rotation:0,landing:jump?Math.sin(clamp((t-.83)/.17)*Math.PI):0,segment:i,t};
  }
  return {...stops.at(-1),tilt:0,air:0,flip:0,yaw:0,roll:0,landing:0,t:1,segment:stops.length-1};
}


