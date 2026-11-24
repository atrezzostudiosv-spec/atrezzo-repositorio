import fs from 'node:fs';import {execFileSync} from 'node:child_process';import {chromium} from 'playwright';
const dir='components/originales/atrezzo/ATZ-SEC-016/assets/',browser=await chromium.launch();
try{const p=await browser.newPage({viewport:{width:1280,height:720}});const img='data:image/svg+xml;base64,'+fs.readFileSync(dir+'scene-1.svg').toString('base64');await p.setContent('<style>html,body{margin:0;width:100%;height:100%;background:#182126}img{width:100%;height:100%;object-fit:cover;display:block}</style><img src="'+img+'">');await p.locator('img').evaluate(i=>i.decode());await p.screenshot({path:dir+'poster.jpg',type:'jpeg',quality:92});}finally{await browser.close()}
const run=(args)=>execFileSync('ffmpeg',['-hide_banner','-loglevel','error','-y',...args],{stdio:'inherit'});
run(['-loop','1','-i',dir+'poster.jpg','-vf',"scale=2560:1440,zoompan=z='1.025+0.025*(1-cos(2*PI*on/180))/2':x='iw/2-iw/zoom/2':y='ih/2-ih/zoom/2':d=1:s=1280x720:fps=30",'-t','6','-an','-c:v','libx264','-preset','fast','-crf','23','-pix_fmt','yuv420p','-movflags','+faststart',dir+'film.mp4']);
run(['-i',dir+'film.mp4','-an','-c:v','libvpx-vp9','-b:v','0','-crf','32','-deadline','good','-cpu-used','4',dir+'film.webm']);
run(['-i',dir+'film.mp4','-vf','scale=768:-2','-an','-c:v','libx264','-preset','fast','-crf','25','-pix_fmt','yuv420p','-movflags','+faststart',dir+'film-mobile.mp4']);
console.log('Generated neutral illustrative demo media; NOT client footage.');
