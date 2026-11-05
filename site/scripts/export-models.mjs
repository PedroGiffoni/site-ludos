import {mkdir,writeFile} from 'node:fs/promises';
import {GLTFExporter} from 'three/addons/exporters/GLTFExporter.js';
import {createCharacterModel} from '../src/character-models.js';

// GLTFExporter uses the browser FileReader interface to package binary buffers.
globalThis.FileReader??=class{
  readAsArrayBuffer(blob){blob.arrayBuffer().then(result=>{this.result=result;this.onloadend?.();},error=>this.onerror?.(error));}
  readAsDataURL(blob){blob.arrayBuffer().then(result=>{this.result=`data:${blob.type};base64,${Buffer.from(result).toString('base64')}`;this.onloadend?.();},error=>this.onerror?.(error));}
};
const destination=new URL('../public/models/',import.meta.url);await mkdir(destination,{recursive:true});
for(const name of ['edy','fred','amora','jr','zoe']){
  const model=createCharacterModel(name);
  delete model.userData.rig;
  const binary=await new GLTFExporter().parseAsync(model,{binary:true});
  await writeFile(new URL(`${name}.glb`,destination),Buffer.from(binary));
  const materials=new Set();model.traverse(object=>{object.geometry?.dispose();if(object.material)materials.add(object.material);});materials.forEach(material=>material.dispose());
  console.log(`${name}.glb: ${(binary.byteLength/1024).toFixed(0)} kB`);
}
