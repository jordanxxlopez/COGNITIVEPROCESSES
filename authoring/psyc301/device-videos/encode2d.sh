#!/bin/bash
# usage: encode2d.sh <sceneId> <durationSeconds> [eventSeconds...]  -> out-v2/<sceneId>.mp4 (frames from frames2d/<id>, beep at the first event)
id=$1; dur=$2; shift 2
cd "$(dirname "$0")"
rm -rf frames2d/$id; node frames2d.mjs $id 0 100000 && /opt/homebrew/bin/ffmpeg -v error -y -framerate 60 -i frames2d/$id/f%05d.png -c:v libx264 -pix_fmt yuv420p -crf 18 out-v2/$id.silent.mp4 && /opt/homebrew/bin/ffmpeg -v error -y -i out-v2/$id.silent.mp4 -f lavfi -t 0.15 -i "sine=frequency=1000:sample_rate=44100" -filter_complex "[1:a]volume=0.5,adelay=4700|4700,apad[a]" -map 0:v -map "[a]" -c:v copy -c:a aac -t $dur out-v2/$id.mp4 && echo ENCODE_DONE $id
