import {test} from 'node:test';
import assert from 'node:assert/strict';
import {parkPose} from '../src/park-path.js';
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


