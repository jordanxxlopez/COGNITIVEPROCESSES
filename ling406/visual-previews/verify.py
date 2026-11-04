from pathlib import Path
from PIL import Image,ImageChops
import json,subprocess,hashlib
HERE=Path(__file__).resolve().parent;BASE=HERE.parent
m=json.loads((HERE/"manifest.json").read_text());report=[]
qa=HERE/"qa";qa.mkdir(exist_ok=True)
for c in m["clips"]:
 p=BASE/c["file"]
 probe=json.loads(subprocess.check_output(["ffprobe","-v","error","-show_streams","-show_format","-of","json",str(p)]))
 v=next(s for s in probe["streams"] if s["codec_type"]=="video")
 assert (v["width"],v["height"],v["pix_fmt"],v["codec_name"])==(960,600,"yuv420p","h264")
 assert abs(float(probe["format"]["duration"])-c["duration"])<.1
 assert int(v["nb_frames"])==c["duration"]*30
 assert any(s["codec_type"]=="audio" for s in probe["streams"])==bool(c["audio"])
 frames=[]
 for i,t in enumerate([.1,1.4,3.8,6.8]):
  out=qa/f"{c['id']}-{i}.png"
  subprocess.run(["ffmpeg","-y","-v","error","-ss",str(t),"-i",str(p),"-frames:v","1",str(out)],check=True)
  frames.append(Image.open(out).convert("RGB"))
 assert any(ImageChops.difference(frames[0],f).getbbox() is not None for f in frames[1:]),c["id"]+" must change visually"
 strip=Image.new("RGB",(960,600))
 for i,frame in enumerate(frames):strip.paste(frame.resize((480,300)),((i%2)*480,(i//2)*300))
 strip.save(qa/f"{c['id']}-contact.jpg",quality=88)
 report.append({"id":c["id"],"bytes":p.stat().st_size,"duration":float(probe["format"]["duration"]),"frames":int(v["nb_frames"]),"sha256":hashlib.sha256(p.read_bytes()).hexdigest(),"audio":bool(c["audio"]),"status":"passed"})
(HERE/"validation.json").write_text(json.dumps({"clips":report,"status":"passed"},indent=2)+"\n")
print(json.dumps(report,indent=2))
