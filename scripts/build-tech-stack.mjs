import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
const root=path.resolve(path.dirname(fileURLToPath(import.meta.url)),'..');
const dir=path.join(root,'assets');
const font='font-family="Segoe UI, Arial, sans-serif"';
const esc=s=>s.replaceAll('&','&amp;');
const text=(x,y,size,fill,s,extra='')=>`<text x="${x}" y="${y}" ${font} font-size="${size}" fill="${fill}" ${extra}>${esc(s)}</text>`;
const defs=`<defs>
<linearGradient id="bg" x2="1" y2="1"><stop stop-color="#091624"/><stop offset="1" stop-color="#143746"/></linearGradient>
<linearGradient id="top" x2=".8" y2="1"><stop stop-color="#A8F4E4"/><stop offset=".48" stop-color="#52BCAF"/><stop offset="1" stop-color="#247782"/></linearGradient>
<linearGradient id="side" x2="1" y2="1"><stop stop-color="#257984"/><stop offset="1" stop-color="#153449"/></linearGradient>
<linearGradient id="tile" x2="1" y2="1"><stop stop-color="#274B5C"/><stop offset="1" stop-color="#122A3C"/></linearGradient>
<radialGradient id="halo"><stop stop-color="#3DA99F" stop-opacity=".27"/><stop offset="1" stop-color="#3DA99F" stop-opacity="0"/></radialGradient>
<pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse"><path d="M40 0H0V40" fill="none" stroke="#69A4AF" stroke-opacity=".08"/></pattern>
</defs>`;
const motion=`<style>
.float{animation:float 7s ease-in-out infinite}.slow{animation:float 10s ease-in-out infinite;animation-delay:-3s}.orbit{transform-origin:930px 250px;animation:orbit 40s linear infinite}.signal{stroke-dasharray:6 12;animation:signal 12s linear infinite}.tile-float{animation:float 6s ease-in-out infinite}
@keyframes float{0%,100%{transform:translateY(0)}50%{transform:translateY(-10px)}}
@keyframes orbit{to{transform:rotate(360deg)}}
@keyframes signal{to{stroke-dashoffset:-180}}
@media(prefers-reduced-motion:reduce){.float,.slow,.orbit,.signal,.tile-float{animation:none!important}}
</style>`;
function svg(name,w,h,title,desc,body){fs.writeFileSync(path.join(dir,name),`<svg xmlns="http://www.w3.org/2000/svg" width="${w}" height="${h}" viewBox="0 0 ${w} ${h}" role="img" aria-labelledby="title desc"><title id="title">${esc(title)}</title><desc id="desc">${esc(desc)}</desc>${defs}${motion}${body}</svg>\n`)}
const rows=[
['LANGUAGES & WEB',[['python','Python'],['typescript','TypeScript'],['javascript','JavaScript'],['react','React'],['html5','HTML5'],['css3','CSS3']]],
['MOBILE & SERVICES',[['java','Java'],['kotlin','Kotlin'],['android','Android'],['firebase','Firebase'],['nodejs','Node.js'],['fastapi','FastAPI']]],
['DATA & DELIVERY',[['docker','Docker'],['git','Git'],['googlecloud','Google Cloud'],['mysql','MySQL'],['mongodb','MongoDB'],['sqlite','SQLite']]]];
function icon(name,x,y){let source=fs.readFileSync(path.join(dir,'icons',name+'.svg'),'utf8').replace(/<\?xml[^>]*>/g,'');source=source.replace(/\bid="([^"]+)"/g,(_,id)=>`id="${name}-${id}"`).replace(/url\(#([^)]+)\)/g,(_,id)=>`url(#${name}-${id})`).replace(/(href|xlink:href)="#([^"]+)"/g,(_,a,id)=>`${a}="#${name}-${id}"`);return source.replace(/<svg\b[^>]*>/,tag=>tag.replace(/\s(width|height|x|y)="[^"]*"/g,'').replace('<svg',`<svg x="${x}" y="${y}" width="56" height="56"`));}
let board=`<rect width="1200" height="805" rx="20" fill="url(#bg)"/><rect width="1200" height="805" rx="20" fill="url(#grid)"/>${text(40,54,16,'#86E7CF','THE ENGINEERING TOOLKIT','letter-spacing="3"')}${text(40,106,38,'#F0F6F5','From interface to infrastructure.','font-weight="650" letter-spacing="-1"')}`;
rows.forEach(([label,items],r)=>{let y=170+r*211;board+=text(40,y,15,'#BBD0D9',label,'letter-spacing="2"');items.forEach(([name,label],i)=>{let x=45+i*193;board+=`<g transform="translate(${x} ${y+20})"><ellipse cx="71" cy="126" rx="66" ry="10" fill="#061321" opacity=".5"/><g class="tile-float" style="animation-delay:-${r+i*.6}s"><path d="M8 12L26 0H142L124 12Z" fill="#3A6878"/><path d="M124 12L142 0V96L124 110Z" fill="#0D2333"/><rect x="8" y="12" width="116" height="98" rx="10" fill="url(#tile)" stroke="#537B8B"/>${icon(name,38,31)}<path d="M23 100H109" stroke="#5DABAC" stroke-opacity=".6"/></g>${text(70,157,18,'#DDEBF0',label,'text-anchor="middle"')}</g>`})});
svg('tech-stack.svg',1200,805,'Technology stack — languages, mobile, services, data and delivery','Gently floating 3D-style tiles with eighteen technology logos. Full technology list is also provided in text below.',board);
console.log('Generated animated technology board.');
