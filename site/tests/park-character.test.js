import {test} from 'node:test';
import assert from 'node:assert/strict';
import {nextParkCharacter} from '../src/park-character.js';

test('homepage visits alternate yellow and pink, starting with yellow',()=>{
  const data=new Map(),storage={getItem:key=>data.get(key)??null,setItem:(key,value)=>data.set(key,value)};
  assert.deepEqual(Array.from({length:6},()=>nextParkCharacter(storage)),['fred','amora','fred','amora','fred','amora']);
  assert.equal(data.size,1);
});
test('blocked browser storage preserves a working default character',()=>{
  assert.equal(nextParkCharacter({getItem(){throw new Error('blocked');}}),'fred');
  assert.equal(nextParkCharacter({getItem(){return null;},setItem(){throw new Error('blocked');}}),'fred');
});
