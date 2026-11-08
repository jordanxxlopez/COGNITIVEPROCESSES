# Tower of Hanoi, three disks, white background. Renders one still per state.
# Usage: blender -b --factory-startup --python blender/hanoi.py -- <outdir>
import bpy, sys, math
out = sys.argv[sys.argv.index('--') + 1]
bpy.ops.wm.read_factory_settings(use_empty=True)
sc = bpy.context.scene
sc.render.engine = 'BLENDER_EEVEE'; sc.render.resolution_x = 1280; sc.render.resolution_y = 720
sc.view_settings.view_transform = 'Standard'; sc.view_settings.look = 'None'
sc.world = bpy.data.worlds.new('W'); sc.world.use_nodes = True
sc.world.node_tree.nodes['Background'].inputs['Color'].default_value = (1, 1, 1, 1)
def mat(name, rgb):
    m = bpy.data.materials.new(name); m.use_nodes = True
    b = m.node_tree.nodes['Principled BSDF']; b.inputs['Base Color'].default_value = (*rgb, 1); b.inputs['Roughness'].default_value = 0.45
    return m
wood = mat('Wood', (0.72, 0.6, 0.45)); disks = [mat('D1', (0.80, 0.22, 0.20)), mat('D2', (0.25, 0.62, 0.30)), mat('D3', (0.20, 0.38, 0.75))]
PX = [-4.2, 0.0, 4.2]
def cyl(name, r, h, x, y, z, m):
    bpy.ops.mesh.primitive_cylinder_add(radius=r, depth=h, location=(x, y, z), vertices=48)
    o = bpy.context.object; o.name = name; o.data.materials.append(m); return o
base = bpy.ops.mesh.primitive_cube_add(size=1, location=(0, 0, -1.2)); base = bpy.context.object
base.scale = (10.5, 2.2, 0.15); base.data.materials.append(wood)
for i, x in enumerate(PX): cyl(f'peg{i}', 0.09, 3.6, x, 0, 0.6, wood)
radii = {1: 0.7, 2: 1.05, 3: 1.4}
def state(stacks):
    for o in list(bpy.data.objects):
        if o.name.startswith('disk'): bpy.data.objects.remove(o, do_unlink=True)
    for peg, stack in enumerate(stacks):
        for lvl, d in enumerate(stack):
            cyl(f'disk{d}', radii[d], 0.3, PX[peg], 0, -0.8 + lvl * 0.34, disks[d - 1])
    bpy.context.view_layer.update()
bpy.ops.object.light_add(type='SUN', location=(4, -6, 9)); bpy.context.object.data.energy = 3.2; bpy.context.object.data.use_shadow = False
bpy.ops.object.camera_add(location=(0, -23.0, 0.6)); cam = bpy.context.object; sc.camera = cam
cam.data.lens = 50
cam.rotation_euler = (math.radians(90), 0, 0)
moves = [(0,2),(0,1),(2,1),(0,2),(1,0),(1,2),(0,2)]
stacks = [[3,2,1],[],[]]
states = [[list(s) for s in stacks]]
for a,b in moves:
    stacks[b].append(stacks[a].pop()); states.append([list(s) for s in stacks])
for i, st in enumerate(states):
    state(st)
    sc.render.filepath = f'{out}/hanoi-{i:02d}.png'
    bpy.ops.render.render(write_still=True)
print('HANOI_OK', len(states))
