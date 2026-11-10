'use strict';
// Fit the existing DOM without replacing course text, source assets or study IDs.
(() => {
 document.documentElement.dataset.lingFitting='true';
 const roots=['content','readerDialog','imageDialog'].map(id=>document.getElementById(id)).filter(Boolean);
 const query=selector=>roots.flatMap(root=>[...root.querySelectorAll(selector)]);
 const players=new WeakMap(),observedSelects=new Set();
 let scheduled=false;
 const time=value=>{
  if(!Number.isFinite(value))return '--:--';
  const seconds=Math.max(0,Math.floor(value)),hours=Math.floor(seconds/3600),minutes=Math.floor(seconds%3600/60);
  return (hours?hours+':'+String(minutes).padStart(2,'0'):String(minutes))+':'+String(seconds%60).padStart(2,'0');
 };
 function loadMedia(video){
  let changed=false;
  for(const source of video.querySelectorAll('source[data-src]')){source.src=source.dataset.src;delete source.dataset.src;changed=true;}
  if(changed)video.load();
 }
 function fitVideo(video){
  if(players.has(video))return;
  const player=document.createElement('div');player.className='fit-player';
  const stage=document.createElement('div');stage.className='fit-video-stage';stage.tabIndex=0;stage.setAttribute('role','group');
  stage.setAttribute('aria-label',video.getAttribute('aria-label') || 'Original video');
  const controls=document.createElement('div');controls.className='fit-player-controls';controls.setAttribute('role','group');controls.setAttribute('aria-label','Video playback controls');
  controls.innerHTML='<button type="button" data-fit-control="play" aria-label="Play video">Play</button><button type="button" data-fit-control="mute" aria-label="Mute video">Mute</button><label>Volume <input class="fit-volume" type="range" min="0" max="1" step="0.05" value="1" aria-label="Video volume"></label><label>Speed <select data-fit-control="speed" aria-label="Playback speed"><option value="0.5">0.5×</option><option value="0.75">0.75×</option><option value="1" selected>1×</option><option value="1.25">1.25×</option><option value="1.5">1.5×</option><option value="2">2×</option></select></label><button type="button" data-fit-control="fullscreen">Full screen</button><a data-fit-open target="_blank" rel="noopener">Open video</a><a data-fit-download download>Download</a><div class="fit-timeline"><input type="range" data-fit-control="seek" min="0" max="0" step="0.1" value="0" aria-label="Video position" disabled><span class="fit-video-time" aria-live="off">0:00 / --:--</span></div><p class="fit-player-status" role="status"></p>';
  const pip=document.createElement('button');pip.type='button';pip.dataset.fitControl='pip';pip.textContent='Picture in picture';
  if(document.pictureInPictureEnabled || video.webkitSetPresentationMode)controls.querySelector('[data-fit-open]').before(pip);
  video.before(player);stage.append(video);player.append(stage,controls);
  const play=controls.querySelector('[data-fit-control=play]'),mute=controls.querySelector('[data-fit-control=mute]'),seek=controls.querySelector('[data-fit-control=seek]');
  const volume=controls.querySelector('.fit-volume'),speed=controls.querySelector('select'),status=controls.querySelector('.fit-player-status');
  let seeking=false,lastVolume=video.volume || 1;
  function update(){
   const duration=Number.isFinite(video.duration)?video.duration:0;
   play.textContent=video.paused?'Play':'Pause';play.setAttribute('aria-label',video.paused?'Play video':'Pause video');
   mute.textContent=video.muted?'Unmute':'Mute';mute.setAttribute('aria-label',video.muted?'Unmute video':'Mute video');
   volume.value=String(video.muted?0:video.volume);speed.value=String(video.playbackRate);
   seek.disabled=duration<=0;seek.max=String(duration);
   if(!seeking)seek.value=String(video.currentTime || 0);
   seek.setAttribute('aria-valuetext',time(video.currentTime)+' of '+time(video.duration));
   controls.querySelector('.fit-video-time').textContent=time(video.currentTime)+' / '+time(video.duration);
   pip.disabled=video.readyState<1;
   const src=video.currentSrc || video.querySelector('source')?.src || video.src || video.querySelector('source[data-src]')?.dataset.src;
   if(src)for(const a of controls.querySelectorAll('a'))a.href=src;
  }
  async function togglePlay(){
   try{loadMedia(video);if(video.paused)await video.play();else video.pause();status.textContent='';}
   catch{status.textContent='Use Open video if this browser cannot play the source here.';}
   update();
  }
  play.addEventListener('click',togglePlay);
  video.addEventListener('click',togglePlay);
  mute.addEventListener('click',()=>{if(video.muted || video.volume===0){video.muted=false;video.volume=lastVolume;}else{lastVolume=video.volume;video.muted=true;}update();});
  volume.addEventListener('input',()=>{video.volume=Number(volume.value);video.muted=video.volume===0;if(video.volume>0)lastVolume=video.volume;update();});
  speed.addEventListener('change',()=>{video.playbackRate=Number(speed.value);});
  seek.addEventListener('pointerdown',()=>{seeking=true;});
  seek.addEventListener('input',()=>{if(Number.isFinite(video.duration))video.currentTime=Number(seek.value);update();});
  seek.addEventListener('change',()=>{seeking=false;update();});
  for(const event of ['pointerup','pointercancel','blur'])seek.addEventListener(event,()=>{seeking=false;update();});
  controls.querySelector('[data-fit-control=fullscreen]').addEventListener('click',async()=>{
   try{
    if(document.fullscreenElement===player)await document.exitFullscreen();
    else if(player.requestFullscreen)await player.requestFullscreen();
    else if(video.webkitEnterFullscreen)video.webkitEnterFullscreen();
   }catch{status.textContent='Open video to use the browser’s full-screen player.';}
  });
  pip.addEventListener('click',async()=>{
   try{if(document.pictureInPictureElement===video)await document.exitPictureInPicture();else if(video.requestPictureInPicture)await video.requestPictureInPicture();else video.webkitSetPresentationMode('picture-in-picture');}
   catch{status.textContent='Picture in picture is unavailable for this source in this browser.';}
  });
  stage.addEventListener('keydown',event=>{
   if(event.target!==stage && event.target!==video)return;
   if(![' ','ArrowLeft','ArrowRight','m','M','f','F'].includes(event.key))return;
   event.preventDefault();event.stopPropagation();
   if(event.key===' ')togglePlay();
   else if(event.key.toLowerCase()==='m')mute.click();
   else if(event.key.toLowerCase()==='f')controls.querySelector('[data-fit-control=fullscreen]').click();
   else if(Number.isFinite(video.duration))video.currentTime=Math.max(0,Math.min(video.duration,video.currentTime+(event.key==='ArrowLeft'?-5:5)));
  });
  for(const event of ['loadedmetadata','durationchange','timeupdate','play','pause','ended','volumechange','ratechange','loadeddata'])video.addEventListener(event,update);
  video.addEventListener('loadedmetadata',schedule);
  video.addEventListener('error',()=>{update();status.textContent='Use Open video to inspect the original source.';});
  // Disable overlaid native chrome only after its replacement is ready.
  players.set(video,{update,player});video.controls=false;video.playsInline=true;update();
 }
 function fitFooter(pair){
  const parent=pair.parentElement,left=pair.firstElementChild;
  if(!parent || !left || pair.dataset.fitFooter)return;
  pair.dataset.fitFooter='true';
  const nodes=[...left.children].filter(node=>node.matches('.section-tools,.notes-box,.source-excerpt,.modern-source-links,label.readiness,.modern-evidence'));
  const card=pair.closest('.modern-core');
  const outside=card?.querySelector(':scope > .modern-evidence');if(outside)nodes.push(outside);
  if(!nodes.length)return;
  const footer=document.createElement('div');footer.className='fit-study-footer';
  pair.after(footer);for(const node of nodes)footer.append(node);
 }
 const canvas=document.createElement('canvas'),measure=canvas.getContext('2d');
 function fitSelect(select){
  if(select.closest('.fit-player-controls'))return;
  let label=select.closest('label,.fit-select-field');
  if(!label){label=document.createElement('div');label.className='fit-select-field';select.before(label);label.append(select);}
  const text=select.selectedOptions[0]?.textContent || '',css=getComputedStyle(select);
  measure.font=css.font;
  const available=select.clientWidth-parseFloat(css.paddingLeft)-parseFloat(css.paddingRight)-28;
  const clipped=select.clientWidth>0 && measure.measureText(text).width>available;
  let note=label.querySelector(':scope > .fit-selection');
  if(!note && clipped){note=document.createElement('span');note.className='fit-selection';note.setAttribute('aria-hidden','true');label.append(note);}
  if(note){if(note.textContent!==text)note.textContent=text;note.hidden=!clipped;}
 }
 const selectObserver=new ResizeObserver(entries=>entries.forEach(entry=>fitSelect(entry.target)));
 function fit(){
  scheduled=false;
  for(const pair of query('.section-pair,.modern-qa-pair,.aid-split'))fitFooter(pair);
  for(const video of query('video'))fitVideo(video);
  for(const select of query('select')){
   if(select.closest('.fit-player-controls'))continue;
   if(!observedSelects.has(select)){selectObserver.observe(select);observedSelects.add(select);}
   fitSelect(select);
  }
  for(const select of observedSelects)if(!select.isConnected){selectObserver.unobserve(select);observedSelects.delete(select);}
  for(const table of query('table')){
   table.classList.add('fit-table');const headings=[...table.querySelectorAll('thead th')].map(el=>el.textContent.trim());
   for(const row of table.querySelectorAll('tbody tr'))for(const [index,cell] of [...row.children].entries())cell.dataset.fitLabel=headings[index] || '';
  }
  for(const figure of query('.section-pair>.source-figure')){
   const pair=figure.parentElement,stage=figure.closest('.reader-stage');
   const room=(stage?.clientHeight || innerHeight)-32;
   const follows=document.body.classList.contains('follow-slides') && getComputedStyle(pair).gridTemplateColumns.split(' ').length>1 && figure.getBoundingClientRect().height<=room;
   figure.toggleAttribute('data-fit-follow',follows);
  }
 }
 function schedule(){if(!scheduled){scheduled=true;requestAnimationFrame(fit);}}
 const observer=new MutationObserver(changes=>{if(changes.some(change=>!change.target.closest?.('.fit-player-controls')))schedule();});
 for(const root of roots)observer.observe(root,{childList:true,subtree:true});
 document.addEventListener('change',event=>{if(event.target.matches('select'))fitSelect(event.target);});
 document.addEventListener('toggle',schedule,true);
 document.addEventListener('fullscreenchange',()=>{
  for(const button of query('[data-fit-control=fullscreen]'))button.textContent=button.closest('.fit-player')===document.fullscreenElement?'Exit full screen':'Full screen';
 });
 window.addEventListener('resize',schedule);
 fit();
})();
