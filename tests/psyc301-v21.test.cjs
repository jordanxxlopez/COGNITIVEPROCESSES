'use strict';
const test=require('node:test'),path=require('node:path'),{execFileSync}=require('node:child_process');
const root=path.resolve(__dirname,'..');
test('Version 21 covers every Module II page in natural teaching notes and leaves earlier editions unchanged',()=>{
 execFileSync('python3',['authoring/psyc301/version21/build.py'],{cwd:root,stdio:'pipe'});
 execFileSync('python3',['authoring/psyc301/version21/verify.py'],{cwd:root,stdio:'pipe'});
});
