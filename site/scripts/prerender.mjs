import {readFile,writeFile,mkdir} from 'node:fs/promises';
import {pages} from '../src/pages.js';

const template=await readFile(new URL('../dist/index.html',import.meta.url),'utf8');
const mainPattern=/(<main id="conteudo">)[\s\S]*?(<\/main>)/;
const courses=template.match(/<section class="courses section"[\s\S]*?(?=<section class="faq section")/)?.[0];
const routes={...pages,'/cursos':{title:'Cursos e formação | Clínica Ludos',html:`<div class="detail-page">${courses.replace('<h2>','<h1>').replace('</h2>','</h1>')}</div>`}};
for(const [route,page] of Object.entries(routes)){
  const html=template.replace(/<title>.*?<\/title>/,`<title>${page.title}</title>`).replace(mainPattern,`$1${page.html}$2`);
  const dir=new URL(`../dist${route}/`,import.meta.url);await mkdir(dir,{recursive:true});await writeFile(new URL('index.html',dir),html);
}
console.log(`Generated ${Object.keys(routes).length} HTML pages with readable content without JavaScript.`);
