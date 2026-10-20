"""Generate additional temporal review samples without claiming a full frame-by-frame review."""
import argparse,json,subprocess
from pathlib import Path
from PIL import Image,ImageDraw
parser=argparse.ArgumentParser(description=__doc__)
parser.add_argument("source")
parser.add_argument("--samples",type=int,default=24)
args=parser.parse_args()
if args.samples<3:parser.error("At least three samples are required")
root=Path(__file__).resolve().parents[1];authoring=root/"authoring"
base=authoring/"embedded"/args.source;out=authoring/"review-grids";report=[]
for p in sorted(base.glob("*.mp4")):
 probe=json.loads(subprocess.check_output(["ffprobe","-v","quiet","-show_format","-show_streams","-of","json",str(p)]));dur=float(probe["format"]["duration"]);samples=args.samples
 # Uneven offsets prevent locking onto an animation's period; retain beginning/end.
 times=[0.0]+[dur*(i+((i*0.61803398875)%1)*0.77)/samples for i in range(1,samples-1)]+[max(0,dur-0.5)]
 frames=[]
 for i,t in enumerate(times):
  f=base/f"{p.stem}-phase{i:02}.png";subprocess.run(["ffmpeg","-v","error","-y","-ss",str(t),"-i",str(p),"-frames:v","1",str(f)],check=True);
  if not f.is_file() or not f.stat().st_size:raise RuntimeError(f"No decoded frame at {t} seconds in {p}")
  frames.append(f)
 for start in range(0,samples,8):
  grid=Image.new("RGB",(2400,1440),"#ddd");draw=ImageDraw.Draw(grid)
  for j,f in enumerate(frames[start:start+8]):
   im=Image.open(f);im.thumbnail((1180,330));x=j%2*1200;y=j//2*360;grid.paste(im,(x+(1200-im.width)//2,y+26));draw.text((x+8,y+4),f"{p.name} time {times[start+j]:.3f} / {dur:.3f} s",fill="black")
  grid.save(out/f"{args.source}-{p.stem}-phases{start:02}.jpg",quality=95)
 report.append({"file":str(p.relative_to(root)),"duration":dur,"fps":probe["streams"][0].get("avg_frame_rate"),"audioStreamCount":sum(s["codec_type"]=="audio" for s in probe["streams"]),"sampleTimes":times,"sampling":f"{samples} temporal samples with nonuniform offsets to avoid periodic phase locking, in addition to the four intake samples","grids":[str((out/f"{args.source}-{p.stem}-phases{start:02}.jpg").relative_to(root)) for start in range(0,samples,8)]})
 print(p.name,dur,flush=True)
(authoring/"extracted"/f"{args.source}-media-probe.json").write_text(json.dumps(report,indent=2))
