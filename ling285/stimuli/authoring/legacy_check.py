"""Establish unchanged failures in historical count-specific tests."""
import subprocess,tempfile,pathlib,json,re
base='b5cc465577464d8f4c769ecb1830a085e6d13539'
with tempfile.TemporaryDirectory() as folder:
 # Only the LING285 subtree is needed; no installation or application mutation.
 archive=subprocess.Popen(['git','archive',base,'ling285'],stdout=subprocess.PIPE)
 subprocess.run(['tar','-x','-C',folder],stdin=archive.stdout,check=True);archive.stdout.close();assert archive.wait()==0
 commands=['node','--test','--test-name-pattern=Version 4 covers|the earlier teaching','ling285/tests/transcripts-v4.test.cjs']
 original=subprocess.run(commands,cwd=folder,capture_output=True,text=True)
 current=subprocess.run(commands,capture_output=True,text=True)
 failed=lambda r:re.findall(r'^not ok \d+ - (.+)$',r.stdout,re.M)
 assert failed(original)==failed(current),{'original':failed(original),'current':failed(current)}
 assert original.returncode==current.returncode
 report={'unchanged':True,'baseline':base,'baseline_exit':original.returncode,'current_exit':current.returncode,'historical_failed_checks':failed(current),'explanation':'Historical tests retain pre-lecture-16/17 counts (99 pages and 342 questions); the unchanged current course has 123 module-II pages and 442 questions.'}
 pathlib.Path('ling285/stimuli/qa/legacy-check.json').write_text(json.dumps(report,indent=2))
 print('PASS: historical failures match baseline:',failed(current))
