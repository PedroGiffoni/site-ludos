import {test} from 'node:test';
import assert from 'node:assert/strict';
import {clamp,sampleFrames} from '../src/scene-math.js';
import {pages} from '../src/pages.js';
import {config} from '../src/config.js';

test('scroll state clamps outside the timeline and is reversible',()=>{
  const frames=[{at:0,x:10,scale:1},{at:100,x:90,scale:2}];
  assert.equal(sampleFrames(frames,-20).x,10);
  assert.equal(sampleFrames(frames,120).x,90);
  const forward=sampleFrames(frames,35);
  sampleFrames(frames,80);
  assert.deepEqual(sampleFrames(frames,35),forward);
  assert.equal(sampleFrames(frames,50).x,50);
});
test('progress cannot escape its normalized bounds',()=>{
  assert.equal(clamp(-1),0);assert.equal(clamp(1.1),1);assert.equal(clamp(.5),.5);
});
test('closed course has no checkout or first-lot offer',()=>{
  const html=pages['/cursopersonalidadeepsicopatologia'].html;
  assert.match(html,/Inscrições encerradas/);
  assert.ok(!html.includes(config.events));
  assert.doesNotMatch(html,/primeiro lote|GARANTA SUA VAGA/i);
});
test('available course preserves real program and commercial terms',()=>{
  const html=pages['/cursoneuropsi'].html;
  assert.ok(html.includes(config.program));assert.match(html,/R\$ 199,00/);assert.match(html,/12 meses/);
});
