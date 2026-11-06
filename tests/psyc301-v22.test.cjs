'use strict';
const test=require('node:test'),path=require('node:path'),{execFileSync}=require('node:child_process');
const root=path.resolve(__dirname,'..');
test('Version22 preserves V21 coverage and prior editions while allowing researcher citation years',()=>{
 execFileSync('python3',['authoring/psyc301/version22/build.py'],{cwd:root,stdio:'pipe'});
 execFileSync('python3',['authoring/psyc301/version22/verify.py'],{cwd:root,stdio:'pipe'});
});
