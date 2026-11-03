"""Reproducible flat study films. Run from the repository root; no AI assets."""
from pathlib import Path
from PIL import Image, ImageDraw, ImageFont, ImageFilter
import subprocess, json, math, hashlib
ROOT=Path(__file__).resolve().parents[2]
BASE=ROOT/"ling406"; HERE=Path(__file__).resolve().parent
MANIFEST=json.loads((HERE/"manifest.json").read_text())
W,H,FPS=960,600,30
FONT="/usr/share/fonts/truetype/dejavu/DejaVuSans.ttf"
def font(n):return ImageFont.truetype(FONT,n)
def title(im,s):
 d=ImageDraw.Draw(im)
 d.rectangle((0,0,W,47),fill=(248,248,246))
 d.text((24,12),s,font=font(19),fill=(36,42,46))
def smooth(t):
 t=max(0,min(1,t));return t*t*(3-2*t)
def apple_image():
 # Conventional raster shading, deterministic geometry and texture.
 size=112;im=Image.new("RGBA",(size,size))
 pix=im.load()
 for y in range(size):
  for x in range(size):
   xx=(x-56)/46;yy=(y-62)/43
   r=xx*xx+yy*yy
   if r<1:
    light=max(0,1-r)**.4
    highlight=math.exp(-((xx+.35)**2+(yy+.4)**2)*21)
    fleck=math.sin(x*17.1+y*9.2)*math.cos(x*3.1-y*11.4)
    pix[x,y]=(int(min(240,111+66*light+54*highlight+3*fleck)),int(20+27*light+65*highlight),int(17+15*light+45*highlight),255)
 d=ImageDraw.Draw(im);d.line((56,25,60,10),fill=(90,60,31),width=5)
 d.ellipse((58,10,77,20),fill=(69,100,45))
 return im
APPLE=apple_image()
def towel(d,box,napkin=False):
 x,y,x2,y2=box
 color=(230,229,218) if napkin else (202,214,215)
 d.rounded_rectangle(box,radius=3,fill=color,outline=(155,167,168),width=2)
 for a in range(x+3,x2-2,5):d.line((a,y+3,a,y2-3),fill=(218,225,223),width=1)
 for b in range(y+4,y2-2,5):d.line((x+3,b,x2-3,b),fill=(193,206,207) if not napkin else (219,219,206),width=1)
 d.line((x+11,y+4,x+11,y2-4),fill=(156,174,175),width=2)
 d.line((x2-11,y+4,x2-11,y2-4),fill=(156,174,175),width=2)
def apple_frame(t,two):
 im=Image.new("RGB",(W,H),(236,231,220));d=ImageDraw.Draw(im)
 # Flat overhead layout preserves the object set, not undocumented exact dimensions.
 towel(d,(150,112,363,267));towel(d,(597,112,810,267))
 d.rectangle((591,354,816,534),fill=(147,112,74))
 d.rectangle((602,365,805,523),fill=(190,156,112))
 d.rectangle((610,373,797,515),fill=(205,177,139))
 if two:
  towel(d,(174,370,339,514),True);im.paste(APPLE,(200,380),APPLE)
 else:
  d.polygon([(168,465),(350,391),(356,408),(174,482)],fill=(216,167,57),outline=(123,98,57))
  d.polygon([(168,465),(174,482),(145,485)],fill=(206,178,136))
  d.polygon([(145,485),(157,479),(153,475)],fill=(48,49,47))
  d.polygon([(350,391),(375,381),(382,397),(356,408)],fill=(167,172,174))
  d.polygon([(375,381),(391,375),(398,391),(382,397)],fill=(187,120,115))
 u=smooth((t-5)/2)
 x=200+(647-200)*u;y=133+(386-133)*u
 # No invented gaze path and no incorrect intermediate placement.
 im.paste(APPLE,(round(x),round(y)),APPLE)
 title(im,"Tanenhaus et al. (1995)  ·  "+("Two apples" if two else "One apple"))
 return im
def pointer(d,x,y,clicked=False):
 p=[(x,y),(x,y+24),(x+6,y+18),(x+12,y+29),(x+17,y+26),(x+11,y+16),(x+23,y+16)]
 d.polygon(p,fill=(30,34,37),outline=(245,245,245),width=1)
 if clicked:d.ellipse((x-15,y-15,x+15,y+15),outline=(64,94,110),width=2)
SLIDE=Image.open(BASE/"assets/slides/speech2/10.webp")
# Figure only, excluding lecture prose and the figure caption.
FIG=SLIDE.crop((60,145,497,548)).resize((500,461),Image.Resampling.LANCZOS)
def picture_frame(t):
 im=Image.new("RGB",(W,H),"white");im.paste(FIG,(230,85));d=ImageDraw.Draw(im)
 if t>=.5:
  d.line((469,315,491,315),fill=(25,25,25),width=2);d.line((480,304,480,326),fill=(25,25,25),width=2)
 if .5<=t<1.5:
  u=smooth((t-.5)/.7);pointer(d,800-320*u,530-215*u,t>=1.2)
 elif 1.5<=t<3:pointer(d,480,315)
 elif 3<=t:
  u=smooth((t-3)/1.2);pointer(d,480+169*u,315+139*u,4.2<=t<4.7)
 title(im,"McMurray et al. (2003)")
 return im
def vernier_frame(t):
 im=Image.new("RGB",(W,H),(41,44,46));d=ImageDraw.Draw(im)
 d.ellipse((220,65,740,585),fill=(206,206,206))
 # Three teaching trials; actual 1 s stimulus exposures, illustrative offset magnitudes.
 for start,offset in [(1,7),(3.25,-7),(5.5,3)]:
  if start<=t<start+1:
   d.rectangle((469,230,490,324),fill=(41,41,41))
   d.rectangle((469+offset,325,490+offset,419),fill=(41,41,41))
 title(im,"Levi & Polat (1996)")
 return im
def render(c):
 out=HERE/"clips";posters=HERE/"posters";out.mkdir(exist_ok=True);posters.mkdir(exist_ok=True)
 id=c["id"];frames={"apple-one":lambda t:apple_frame(t,False),"apple-two":lambda t:apple_frame(t,True),"mcmurray-pictures":picture_frame,"levi-polat-vernier":vernier_frame}
 make=frames[id];temp=out/(id+".silent.mp4")
 cmd=["ffmpeg","-y","-v","error","-f","rawvideo","-pix_fmt","rgb24","-s",f"{W}x{H}","-r",str(FPS),"-i","-","-an","-c:v","libx264","-preset","fast","-crf","19","-pix_fmt","yuv420p","-movflags","+faststart",str(temp)]
 p=subprocess.Popen(cmd,stdin=subprocess.PIPE)
 for frame in range(c["duration"]*FPS):p.stdin.write(make(frame/FPS).tobytes())
 p.stdin.close()
 if p.wait()!=0:raise RuntimeError("FFmpeg failed")
 final=out/(id+".mp4")
 if c["audio"]:
  subprocess.run(["ffmpeg","-y","-v","error","-i",str(temp),"-i",str(BASE/c["audio"]),"-filter_complex",f"[1:a]adelay=1200:all=1,apad=whole_dur={c['duration']}[a]","-map","0:v","-map","[a]","-c:v","copy","-c:a","aac","-b:a","128k","-t",str(c["duration"]),"-movflags","+faststart",str(final)],check=True);temp.unlink()
  (out/(id+".vtt")).write_text('WEBVTT\n\n00:01.200 --> 00:04.800\nPut the apple on the towel in the box.\n')
 else:temp.replace(final)
 make(1.3 if id=="levi-polat-vernier" else 0).save(posters/(id+".jpg"),quality=90)
 print("Rendered",final,flush=True)
if __name__=="__main__":
 for c in MANIFEST["clips"]:render(c)
