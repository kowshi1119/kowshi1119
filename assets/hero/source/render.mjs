import fs from 'node:fs/promises';
import path from 'node:path';
import os from 'node:os';
import {fileURLToPath,pathToFileURL} from 'node:url';
import {spawnSync} from 'node:child_process';
import {chromium} from 'playwright';
const source=path.dirname(fileURLToPath(import.meta.url));
const destination=path.dirname(source);
const args=process.argv.slice(2);
const option=(key,defaultValue)=>args.includes(key)?args[args.indexOf(key)+1]:defaultValue;
const ffmpeg=option('--ffmpeg','ffmpeg');
const work=path.resolve(option('--work-dir',path.join(os.tmpdir(),'kowshikan-hero-render')));
const fps=25,frames=250;
const renderTime=Date.now();
function encode(dir,out,width,colors=192){
 const palette=path.join(dir,'palette.png');
 const raw=path.join(dir,'unoptimized.gif');
 const run=a=>{const r=spawnSync(ffmpeg,['-hide_banner','-loglevel','error','-y',...a],{encoding:'utf8',maxBuffer:8*1024*1024});if(r.error||r.status!==0)throw Error(r.error?.message||r.stderr)};
 run(['-framerate',String(fps),'-i',path.join(dir,'%04d.png'),'-vf',`scale=${width}:-1:flags=lanczos,palettegen=max_colors=${colors}:stats_mode=diff`,'-frames:v','1',palette]);
 run(['-framerate',String(fps),'-i',path.join(dir,'%04d.png'),'-i',palette,'-lavfi',`[0:v]scale=${width}:-1:flags=lanczos[s];[s][1:v]paletteuse=dither=bayer:bayer_scale=4:diff_mode=rectangle`,'-loop','0',raw]);
 const optimized=spawnSync(option('--python','python'),[path.join(source,'optimize_gif.py'),raw,out],{encoding:'utf8',maxBuffer:8*1024*1024});
 if(optimized.error||optimized.status!==0)throw Error(optimized.error?.message||optimized.stderr);
 console.log(optimized.stdout.trim());
}
const browser=await chromium.launch({headless:true});
const results=[];
try{
 const page=await browser.newPage({viewport:{width:1600,height:900},deviceScaleFactor:1});
 const errors=[];page.on('pageerror',e=>errors.push(e.message));
 await page.goto(pathToFileURL(path.join(source,'index.html')).href+'?export');
 await page.evaluate(()=>document.fonts.ready);
 for(const [name,mobile,width] of [['ai-qa-dev-flow',false,1600],['ai-qa-dev-flow-mobile',true,800]]){
  const dir=path.join(work,name);await fs.mkdir(dir,{recursive:true});
  for(let i=0;i<frames;i++){
   if(args.includes('--reuse-frames')){try{await fs.access(path.join(dir,String(i).padStart(4,'0')+'.png'));continue}catch{}}
   const png=await page.evaluate(({t,mobile})=>{window.renderHero(t,mobile);return document.querySelector('canvas').toDataURL('image/png').split(',')[1]},{t:i/fps,mobile});
   await fs.writeFile(path.join(dir,String(i).padStart(4,'0')+'.png'),Buffer.from(png,'base64'));
   if(i%50===0)console.log(`${name}: ${i}/${frames} frames`);
  }
  const still=await page.evaluate(mobile=>{window.renderHero(8.7,mobile);return document.querySelector('canvas').toDataURL('image/png').split(',')[1]},mobile);
  await fs.writeFile(path.join(destination,name+'.png'),Buffer.from(still,'base64'));
  const out=path.join(destination,name+'.gif');
  encode(dir,out,width);
  let bytes=(await fs.stat(out)).size;
  if(bytes>9*1024*1024){encode(dir,out,mobile?720:1280,160);bytes=(await fs.stat(out)).size}
  if(bytes>10*1024*1024)throw Error(`${name}: GIF exceeds 10 MiB (${bytes} bytes)`);
  results.push({file:name+'.gif',frames,fps,durationSeconds:10,bytes});
  console.log(`${name}: ${(bytes/1024/1024).toFixed(2)} MiB`);
 }
 if(errors.length)throw Error(errors.join('\n'));
 await fs.writeFile(path.join(work,'export-report.json'),JSON.stringify({results,elapsedSeconds:(Date.now()-renderTime)/1000},null,2));
 console.log(JSON.stringify(results));
}finally{await browser.close()}
