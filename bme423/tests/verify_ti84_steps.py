"""Check the decoded standalone instruction program and every displayed page."""
from pathlib import Path
from collections import deque
import hashlib,json,re,struct
from tivars.models import TI_84PCEPY
from tivars.types import TIProgram
from ti_basic_vm import VM

R=Path(__file__).resolve().parents[1]
OUT=R/'ti84/steps'
m=json.loads((OUT/'manifest.json').read_text())
raw=(OUT/'BMSTEPS.8xp').read_bytes()
assert raw[:8]==b'**TI83F*'
assert struct.unpack('<H',raw[53:55])[0]==len(raw)-57
assert sum(raw[55:-2])%65536==struct.unpack('<H',raw[-2:])[0]
assert hashlib.sha256(raw).hexdigest()==m['sha256']
program=TIProgram.open(str(OUT/'BMSTEPS.8xp'))
assert program.name=='BMSTEPS' and program.supported_by(TI_84PCEPY)
assert len(program.data)<65512
source=program.string(model=TI_84PCEPY)
again=TIProgram(name='BMSTEPS');again.load_string((OUT/'BMSTEPS.txt').read_text(),model=TI_84PCEPY)
assert program.data==again.data
assert not re.search(r'^prgm|^Input |^Prompt |^Send\(|^Get\(',source,re.M)
labels=re.findall(r'^Lbl (\w+)',source,re.M)
assert len(labels)==len(set(labels))
assert set(re.findall(r'^Goto (\w+)',source,re.M))<=set(labels)

routes={}
q=deque([('M0',[])])
seen=set()
while q:
    menu,path=q.popleft()
    if menu in seen:continue
    seen.add(menu)
    for n,item in enumerate(m['menus'][menu]['items'],1):
        dest=item['destination']
        if dest in m['menus']:q.append((dest,path+[n]))
        elif dest!='ZZ':routes[dest]=path+[n]
assert len(routes)==36
screens_checked=0;executions=0
def run(menus,keys=()):
    global executions
    vm=VM(keys=keys,menus=menus).run(source)
    executions+=1
    assert not vm.errors
    return vm
def expected(label):return [s.ljust(26) for s in m['screens'][label]['rows']]
for g in m['guides']:
    path=routes[g['label']]
    assert g['pages'][0]==g['label']
    vm=run(path+[7])
    wanted=m['intro']+g['pages']
    assert len(vm.screens)==len(wanted),(g['name'],len(vm.screens),len(wanted))
    for screen,label in zip(vm.screens,wanted):
        assert screen==expected(label),(g['name'],label,screen,expected(label))
        assert len(screen)==10 and all(len(row)==26 for row in screen)
        screens_checked+=1
    # CLEAR leaves the selected method, then EXIT ends the main menu.
    clear=run(path+[7],[105,105,45])
    assert len(clear.screens)==3
    # LEFT on page 2 returns to page 1; no cross-method navigation.
    back=run(path+[7],[105,105,105,24,45])
    assert back.screens[2]==back.screens[4]==expected(g['pages'][0])
    # LEFT on a method's first page stays there.
    boundary=run(path+[7],[105,105,24,45])
    assert boundary.screens[2]==boundary.screens[3]
    # Right arrow is an alternative to ENTER; CLEAR returns from that page.
    right=run(path+[7],[105,105,26,45])
    assert right.screens[-1]==expected(g['pages'][1])
    actual_step_titles={m['screens'][label]['step'] for label in g['pages']}
    assert {s[0] for s in g['steps']}<=actual_step_titles
    assert any('____' in line for label in g['pages'] for line in m['screens'][label]['rows'])
    assert m['screens'][g['pages'][-1]]['step']=='WRITE THE ANSWER'
    # Every required method has its own equations and separately authored steps.
    assert len(g['steps'])>=3
    assert len({tuple(body) for title,body in g['steps']})==len(g['steps'])
assert len(m['guides'])==36
assert len({tuple((s[0],tuple(s[1])) for s in g['steps']) for g in m['guides']})==36

# Intro back, symbol-key back, CLEAR, menu BACK and exit also work.
v=run([7],[24,105,24,45]);assert len(v.screens)==4
v=run([2,6,7]);assert len(v.screens)==2
v=run([2,1,5,6,7]);assert len(v.screens)==2
report=dict(passed=True,program='BMSTEPS',methods=36,steps=m['steps'],pages=m['pages'],
            screensChecked=screens_checked,executions=executions,bytes=m['bytes'],
            sha256=m['sha256'],manifestSHA256=hashlib.sha256((OUT/'manifest.json').read_bytes()).hexdigest(),
            checks=['TI binary lengths/checksum and CE Python token support','decoded source round trip',
                    'every method reachable from the menus','every screen compared with authored text',
                    'ENTER, right arrow, left arrow, first-page boundary, CLEAR, menu BACK and EXIT',
                    'all 36 calculation methods covered with distinct steps; no helper program calls'],
            execution='Software TI-BASIC execution harness; physical calculator/ROM testing not performed')
(OUT/'validation.json').write_text(json.dumps(report,indent=2)+'\n')
print(f'PASS: one standalone .8xp; all 36 methods, {screens_checked} screens checked, {executions} decoded-code runs; native layout/navigation, no helper dependencies. Hardware not emulated.')
