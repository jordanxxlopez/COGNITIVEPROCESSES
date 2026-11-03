#!/usr/bin/env python3
"""Package downloaded published speech stimuli without acoustic resynthesis."""
from pathlib import Path
import argparse
import hashlib
import json
import shutil
import subprocess
import wave
import numpy as np

PACKAGE_ROOT = Path(__file__).resolve().parent
CACHE = PACKAGE_ROOT / 'archive-source-wavs'
parser=argparse.ArgumentParser(description=__doc__)
parser.add_argument('--output-dir',type=Path,required=True,help='Fresh destination for repackaged archive WAVs, MP3s and metadata.')
HERE=parser.parse_args().output_dir.resolve();HERE.mkdir(parents=True,exist_ok=True)
required=[CACHE/'osf_stimuli_index.json']+[CACHE/'haskins_original'/n for n in ('labm020.wav','lab0000.wav','labp020.wav','labp040.wav','labp060.wav','labp080.wav')]+[CACHE/'published_beach_peach'/f'beachpeach{i}.wav' for i in range(1,10)]
missing=[str(p)for p in required if not p.is_file()]
if missing:
    raise FileNotFoundError('Required retained archive input missing: '+', '.join(missing)+'. Restore archive-source-wavs from this package; no scratch-cache fallback is used.')
SOURCES = HERE / "sources"
WAV = HERE / "wav"
CLIPS = HERE / "clips"
RATE = 44100
for p in (SOURCES, WAV, CLIPS):
    p.mkdir(parents=True, exist_ok=True)


def sha(path):
    return hashlib.sha256(path.read_bytes()).hexdigest()


def command(args):
    return subprocess.run(args, check=True, capture_output=True)


def pcm_at_44100(path):
    return command(["ffmpeg", "-v", "error", "-i", str(path), "-ac", "1", "-ar", str(RATE), "-f", "s16le", "-"]).stdout


def write_pcm(path, data):
    with wave.open(str(path), "wb") as out:
        out.setnchannels(1)
        out.setsampwidth(2)
        out.setframerate(RATE)
        out.writeframes(data)


def wav_info(path):
    with wave.open(str(path), "rb") as f:
        n = f.getnframes()
        rate = f.getframerate()
        channels = f.getnchannels()
        width = f.getsampwidth()
        assert width == 2 and channels == 1
        a = np.frombuffer(f.readframes(n), dtype="<i2").astype(float) / 32768.0
    return {"sample_rate": rate, "channels": channels,
            "duration_seconds": n / rate, "frames": n,
            "peak": float(np.max(np.abs(a))),
            "rms": float(np.sqrt(np.mean(a*a)))}


rows = []
audio_pcm = {}


def encode(row, data, source_paths):
    stem = row["id"]
    out_wav = WAV / (stem + ".wav")
    out_mp3 = CLIPS / (stem + ".mp3")
    write_pcm(out_wav, data)
    command(["ffmpeg", "-v", "error", "-y", "-i", str(out_wav), "-codec:a", "libmp3lame", "-b:a", "192k", "-ar", str(RATE), "-map_metadata", "-1", str(out_mp3)])
    command(["ffmpeg", "-v", "error", "-i", str(out_mp3), "-f", "null", "-"])
    probe = json.loads(command(["ffprobe", "-v", "error", "-show_streams", "-show_format", "-of", "json", str(out_mp3)]).stdout)
    row.update({"file": "clips/" + out_mp3.name,
                "wav_file": "wav/" + out_wav.name,
                "sha256": sha(out_mp3), "wav_sha256": sha(out_wav),
                "decoded_without_errors": True, "synthetic": row.get("synthetic", False),
                "sample_rate": RATE, "channels": 1,
                "duration_seconds": float(probe["format"]["duration"]),
                "wav_metrics": wav_info(out_wav),
                "source_files": [{"file": "sources/" + s.name, "sha256": sha(s), **wav_info(s)} for s in source_paths],
                "processing": "Native source WAV resampled to 44.1 kHz mono PCM, then MP3 encoded at 192 kbps; no normalization, time stretching, pitch shifting, speech synthesis, or within-token editing. Comparisons concatenate intact tokens with silence."})
    rows.append(row)
    audio_pcm[stem] = data
    return stem


haskins_note = ("Published Haskins labial stop–vowel stimuli made with the Haskins formant synthesizer (three formants and labial release transitions). VOT values are the source archive's nominal labels. These files are from an Abramson–Lisker VOT experiment, not verified as the original Eimas et al. (1971) recordings. Only the CV contrast and nominal intervals match the lecture example; they are not beach/peach, bear/pear, or corpse/gorpse word stimuli.")
haskins_source = "https://www.haskinslaboratories.org/vot"
has_paths = {}
has_ids = {}
for vot, filename in [(-20, "labm020.wav"), (0, "lab0000.wav"), (20, "labp020.wav"), (40, "labp040.wav"), (60, "labp060.wav"), (80, "labp080.wav")]:
    path = SOURCES / ("haskins-" + filename)
    shutil.copyfile(CACHE / "haskins_original" / filename, path)
    label = ("minus" if vot < 0 else "plus" if vot > 0 else "zero") + (str(abs(vot)) if vot else "")
    ident = "haskins-vot-" + label
    has_paths[vot] = path
    has_ids[vot] = encode({"id": ident,
                          "title": f"Haskins /ba–pa/: nominal VOT {vot:+d} ms" if vot else "Haskins /ba–pa/: nominal VOT 0 ms",
                          "spokenText": "A labial stop followed by [a]",
                          "family": "haskins-labial-cv-vot", "synthetic": True,
                          "kind": "published-research-stimulus",
                          "scope": "Published labial CV example, not the original Eimas recording",
                          "note": haskins_note,
                          "source_url": haskins_source,
                          "source_download_url": "https://www.haskinslaboratories.org/s/VOT_Audio_WAV.zip",
                          "source_reference": "Abramson and Lisker VOT stimuli, Haskins Laboratories VOT demonstration archive",
                          "doi": None, "nominal_vot_ms": vot,
                          "license_note": "No explicit reuse license was displayed on the archive page; source attribution is preserved."}, pcm_at_44100(path), [path])


def sequence(ident, title, values, ids, paths, base, pause=.65):
    silence = bytes(round(pause * RATE) * 2)
    lead = bytes(round(.35 * RATE) * 2)
    data = lead + silence.join(audio_pcm[ids[x]] for x in values) + lead
    return encode({"id": ident, "title": title,
                   "spokenText": "; ".join(str(x) for x in values),
                   **base, "sequence": [ids[x] for x in values],
                   "between_token_silence_seconds": pause,
                   "leading_and_trailing_silence_seconds": .35}, data, [paths[x] for x in dict.fromkeys(values)])


has_base = {"family": "haskins-labial-cv-vot", "kind": "published-stimulus-comparison", "synthetic": True,
            "scope": "Listening comparison assembled from published labial CV stimuli",
            "note": haskins_note + " Repetition and pauses are new teaching assembly, not the original experimental trial procedure.",
            "source_url": haskins_source,
            "source_reference": "Abramson and Lisker VOT stimuli, Haskins Laboratories VOT demonstration archive",
            "doi": None,
            "license_note": "No explicit reuse license was displayed on the archive page; source attribution is preserved."}
for ident, title, values in [
    ("haskins-vot-eimas-across", "Labial CV comparison: +20, +40, +20, +40 ms", [20, 40, 20, 40]),
    ("haskins-vot-eimas-within-short", "Labial CV comparison: −20, 0, −20, 0 ms", [-20, 0, -20, 0]),
    ("haskins-vot-eimas-within-long", "Labial CV comparison: +60, +80, +60, +80 ms", [60, 80, 60, 80]),
    ("haskins-vot-zero-eighty", "Labial CV endpoints: 0 and +80 ms", [0, 80]),
    ("haskins-vot-five-step", "Labial CV series: 0, +20, +40, +60, +80 ms", [0, 20, 40, 60, 80]),
]:
    sequence(ident, title, values, has_ids, has_paths, has_base)

index = json.loads((CACHE / "osf_stimuli_index.json").read_text())
files = {r["attributes"]["name"]: r for r in index["data"]}
beach_note = ("Actual beach–peach stimulus file from the public materials for Kim, McMurray, Sorensen, and Oleson (2025). Natural American-English recordings were manipulated by progressive cross-splicing in Praat. The published endpoint recordings differ in both VOT (reported as 4 vs 45 ms) and vowel duration (146 vs 107 ms), so this is not labeled a pure VOT-only continuum. Archive step numbers are preserved; per-step VOT has not been inferred from the file names. These are not the original McMurray et al. (2003) or Eimas et al. (1971) recordings.")
beach_base = {"family": "kim2025-beach-peach", "kind": "published-research-stimulus",
              "scope": "Published beach–peach word continuum, Kim et al. (2025)",
              "note": beach_note,
              "source_url": "https://osf.io/36qky/",
              "source_reference": "Kim, H., McMurray, B., Sorensen, E., & Oleson, J. (2025). The consistency of categorization-consistency in speech perception. Psychonomic Bulletin & Review, 32, 2246–2258.",
              "doi": "10.3758/s13423-025-02700-x",
              "license_note": "The article is CC BY 4.0. The OSF project reports no node license; no independent dataset license is asserted."}
beach_ids = {}
beach_paths = {}
for i in range(1, 10):
    name = f"beachpeach{i}.wav"
    item = files[name]
    path = SOURCES / ("kim2025-" + name)
    shutil.copyfile(CACHE / "published_beach_peach" / name, path)
    assert sha(path) == item["attributes"]["extra"]["hashes"]["sha256"]
    beach_paths[i] = path
    beach_ids[i] = encode({"id": f"kim2025-beach-peach-step-{i}",
                           "title": f"Published beach–peach continuum: step {i} of 9",
                           "spokenText": f"beach–peach continuum step {i}",
                           **beach_base, "archive_step": i,
                           "source_download_url": item["links"]["download"],
                           "source_original_filename": name}, pcm_at_44100(path), [path])

sequence("kim2025-beach-peach-endpoints", "Published beach–peach continuum: steps 1 and 9", [1, 9], beach_ids, beach_paths,
         {**beach_base, "kind": "published-stimulus-comparison", "note": beach_note + " This endpoint comparison adds silence between intact archive tokens."})
sequence("kim2025-beach-peach-nine-step", "Published beach–peach continuum: all nine steps", list(range(1, 10)), beach_ids, beach_paths,
         {**beach_base, "kind": "published-stimulus-comparison", "note": beach_note + " This series adds silence between intact archive tokens."})

manifest = {"version": 1,
            "purpose": "Faithful listening examples from genuine published research materials; source identity is distinct from the older experiments discussed in the lectures.",
            "source_pages": [haskins_source, "https://osf.io/36qky/", "https://doi.org/10.3758/s13423-025-02700-x"],
            "assets": rows,
            "verification": {"all_source_hashes_recorded": True,
                             "osf_source_sha256_matches_archive_metadata": True,
                             "all_mp3_decoded_without_errors": True,
                             "source_audio_edited_within_tokens": False,
                             "normalization_applied": False,
                             "pitch_or_speed_changes_applied": False,
                             "count": len(rows)}}
(HERE / "manifest.json").write_text(json.dumps(manifest, indent=2, ensure_ascii=False) + "\n")
print(json.dumps({"assets": len(rows), "mp3_decode_pass": True,
                  "manifest": str(HERE / "manifest.json")}, indent=2))
