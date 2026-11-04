#!/usr/bin/env python3
"""Fetch the author's official VTL2.4 release and build its offline API on Linux.
Download remains cached outside course assets. Only syntax/platform build adaptations
are made, not numerical DSP or vocal-tract calculations.
"""
from pathlib import Path
import argparse,requests,hashlib,zipfile,subprocess
URL='https://www.vocaltractlab.de/download-vocaltractlab/VTL2.4.zip'
EXPECTED='f1acc3ae62d9078a04321561bc522c290096a5a0a4f53968d8dfe08bfcbede0c'
def main():
 p=argparse.ArgumentParser();p.add_argument('--cache',type=Path,required=True);a=p.parse_args();a.cache.mkdir(parents=True,exist_ok=True);z=a.cache/'VTL2.4.zip'
 if not z.exists():
  r=requests.get(URL,timeout=120);r.raise_for_status();z.write_bytes(r.content)
 assert hashlib.sha256(z.read_bytes()).hexdigest()==EXPECTED,'Author archive changed; review version and source before building.'
 dest=a.cache/'official2.4'
 with zipfile.ZipFile(z)as archive:
  for name in archive.namelist():
   target=(dest/name).resolve();assert target.is_relative_to(dest.resolve())
  archive.extractall(dest)
 src=dest/'API/Developer/Sources'
 for f in src.iterdir():
  if f.suffix in ['.h','.cpp']:f.write_bytes(f.read_bytes().replace(b' throw (std::string)',b'').replace(b' throw (string)',b''))
 library=a.cache/'libVocalTractLabApi24.so';files=sorted(p.name for p in src.glob('*.cpp')if p.name!='SoundLib.cpp')
 subprocess.run(['g++','-O2','-fPIC','-shared','-std=c++17','-D_USE_MATH_DEFINES','-D_CRT_SECURE_NO_WARNINGS',*files,'-o',str(library.resolve())],cwd=src,check=True)
 print('Library:',library);print('Speaker:',dest/'API/W02.speaker')
if __name__=='__main__':main()
