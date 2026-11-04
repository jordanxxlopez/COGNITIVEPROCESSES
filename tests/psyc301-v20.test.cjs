'use strict';
const test=require('node:test'),path=require('node:path'),{execFileSync}=require('node:child_process');
const root=path.resolve(__dirname,'..');
test('Version 20 covers every Module II page in natural read-aloud prose and leaves earlier editions unchanged',()=>{
 execFileSync('python3',['authoring/psyc301/version20/build.py'],{cwd:root,stdio:'pipe'});
 execFileSync('python3',['authoring/psyc301/version20/verify.py'],{cwd:root,stdio:'pipe'});
});
