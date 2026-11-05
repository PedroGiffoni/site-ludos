import {test} from 'node:test';
import assert from 'node:assert/strict';
import {parkPose,swingMotion} from '../src/park-path.js';
const stops=[
  {at:0,x:600,y:400,scale:.5,kind:'join'},
  {at:500,x:900,y:800,scale:.34,kind:'jump',lift:100,swing:24},
  {at:1500,x:960,y:1800,scale:.34,kind:'slide',lift:100,swing:24},
  {at:2200,x:900,y:2500,scale:.34,kind:'jump',lift:100,swing:24}
];
test('the playground has continuous poses across every landing',()=>{
  for(const stop of stops.slice(1,-1)){
    const before=parkPose(stops,stop.at-.001),after=parkPose(stops,stop.at+.001);
    assert.ok(Math.abs(before.x-after.x)<.01);
    assert.ok(Math.abs(before.y-after.y)<.01);
    assert.ok(Math.abs(before.scale-after.scale)<.0001);
  }
});
test('jump lifts the actor and reversing the scroll restores the exact pose',()=>{
  const midway=parkPose(stops,250);
  assert.ok(midway.y<stops[0].y);
  assert.equal(midway.air,1);
  parkPose(stops,1700);
  assert.deepEqual(parkPose(stops,250),midway);
});
test('slide reaches both endpoints without a lateral snap',()=>{
  assert.equal(parkPose(stops,500).x,900);
  assert.ok(Math.abs(parkPose(stops,1500).x-960)<.000001);
  assert.equal(parkPose(stops,1500).y,1800);
});
test('somersault, turn and cartwheel complete full revolutions and land facing forward',()=>{
  for(const [maneuver,axis] of [['flip','flip'],['spin','yaw'],['cartwheel','roll']]){
    const sequence=[stops[0],{...stops[1],maneuver}];
    const midway=parkPose(sequence,250),landed=parkPose(sequence,500);
    assert.ok(Math.abs(midway[axis])>1);
    assert.ok(Math.abs(Math.abs(landed[axis])-Math.PI*2)<.000001);
    assert.ok(Math.abs(Math.sin(landed[axis]))<.000001);
  }
});
test('poses outside the route do not produce invalid rig transforms',()=>{
  for(const scroll of [-1,5000]){
    const pose=parkPose(stops,scroll);
    for(const key of ['t','flip','yaw','roll','landing'])assert.ok(Number.isFinite(pose[key]));
  }
});

test('each jump waits on its support before takeoff and after touchdown',()=>{
  const departure=parkPose(stops,500),waiting=parkPose(stops,40);
  assert.equal(waiting.x,stops[0].x);assert.equal(waiting.y,stops[0].y);assert.equal(waiting.air,0);
  const arrived=parkPose(stops,460);
  assert.equal(arrived.x,stops[1].x);assert.equal(arrived.y,stops[1].y);assert.ok(Math.abs(arrived.air)<1e-12);
  assert.ok(Math.abs(arrived.flip+Math.PI*2)<1e-8);
  assert.equal(departure.scale,arrived.scale);
});



test('both tube exits descend without jumping while completing a horizontal 360 turn',()=>{
  const route=[...stops,{at:3000,x:960,y:3300,scale:.34,kind:'slide',swing:24},{at:3700,x:900,y:4000,scale:.34,kind:'jump',lift:100,maneuver:'flip'}];
  for(const index of [2,4]){
    const start=route[index],end=route[index+1];
    const held=parkPose(route,start.at+(end.at-start.at)*.04);
    assert.equal(held.y,start.y);assert.equal(held.x,start.x);
    let previous=start.y;
    for(let j=1;j<=100;j++){
      const scroll=start.at+(end.at-start.at)*j/100;
      const pose=parkPose(route,scroll);
      assert.ok(pose.y>=previous-1e-8);assert.ok(pose.y<=end.y);
      for(const axis of ['air','flip','roll'])assert.equal(pose[axis],0);
      assert.deepEqual(parkPose(route,scroll),pose);
      previous=pose.y;
    }
    assert.equal(previous,end.y);
    assert.ok(Math.abs(parkPose(route,end.at)['yaw']-Math.PI*2)<1e-8);
    assert.ok(Math.abs(parkPose(route,(start.at+end.at)/2).yaw-Math.PI)<1e-8);
  }
});

test('playground bounce lands at the ramp entry and sliding follows its bed to the exit',()=>{
  const route=[{at:0,x:930,y:900,scale:.37,kind:'join'},
    {at:200,x:904,y:900,scale:.37,kind:'jump',maneuver:'flip',lift:90,toy:'ramp-entry'},
    {at:600,x:870,y:1400,scale:.37,kind:'ramp',swing:16},
    {at:800,x:900,y:1600,scale:.37,kind:'jump',lift:130}];
  assert.ok(parkPose(route,100).flip<0);
  const entry=parkPose(route,200);assert.equal(entry.x,904);assert.equal(entry.y,900);
  assert.equal(parkPose(route,100).y,810); // Small bounce returns to the same level.
  let previous=900;
  for(let i=1;i<=100;i++){
    const pose=parkPose(route,200+i*4);
    assert.ok(pose.y>=previous);assert.equal(pose.air,0);assert.equal(pose.flip,0);previous=pose.y;
  }
  assert.equal(previous,1400);
  const exit=parkPose(route,600.001);assert.ok(Math.abs(exit.y-1400)<1e-5);assert.equal(exit.air,0);
});




test('swing keeps oscillating without scroll and its rider stays attached to the seat',()=>{
  const length=2,footY=-1.1236,scale=.37;
  assert.ok(Object.values(swingMotion(0,length,footY,scale)).every(value=>Math.abs(value)<1e-8));
  const forward=swingMotion(2,length,footY,scale),backward=swingMotion(4,length,footY,scale);
  assert.ok(forward.angle*backward.angle<0);
  for(let time=0;time<30;time+=.1){
    const pose=swingMotion(time,length,footY,scale);
    // Rotated bottom centre follows the very same pendulum as the seat.
    const bottomY=pose.y+footY*scale*Math.cos(pose.angle);
    const bottomZ=pose.z+footY*scale*Math.sin(pose.angle);
    assert.ok(Math.abs(bottomY-(footY*scale+length*(1-Math.cos(pose.angle))))<1e-8);
    assert.ok(Math.abs(bottomZ+length*Math.sin(pose.angle))<1e-8);
  }
});

