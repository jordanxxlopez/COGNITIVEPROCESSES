# Glass measuring beakers with water, matching the studio slide style: height and radius scale with capacity^(1/3).
# Usage: blender -b --factory-startup --python blender/jugs/jugs.py -- <states.json> <outdir>
import bpy, sys, json, math
args = sys.argv[sys.argv.index('--') + 1:]
states = json.load(open(args[0])); out = args[1]
bpy.ops.wm.read_factory_settings(use_empty=True)
sc = bpy.context.scene
sc.render.engine = 'BLENDER_EEVEE'; sc.render.resolution_x = 1280; sc.render.resolution_y = 720
sc.view_settings.view_transform = 'Standard'; sc.view_settings.look = 'None'
sc.world = bpy.data.worlds.new('W'); sc.world.use_nodes = True
sc.world.node_tree.nodes['Background'].inputs['Color'].default_value = (1, 1, 1, 1)
def mat(name, rgb, rough=0.2):
    m = bpy.data.materials.new(name); m.use_nodes = True
    b = m.node_tree.nodes['Principled BSDF']; b.inputs['Base Color'].default_value = (*rgb, 1); b.inputs['Roughness'].default_value = rough
    return m
glass = mat('Glass', (0.85, 0.92, 0.96), 0.05); glass.surface_render_method = 'BLENDED'; glass.node_tree.nodes['Principled BSDF'].inputs['Alpha'].default_value = 0.22; water = mat('Water', (0.10, 0.62, 0.72), 0.15); water.surface_render_method = 'BLENDED'; water.node_tree.nodes['Principled BSDF'].inputs['Alpha'].default_value = 0.85; ink = mat('Ink', (0.12, 0.14, 0.16), 0.5)
bpy.ops.object.light_add(type='SUN', location=(4, -6, 9)); bpy.context.object.data.energy = 3.0; bpy.context.object.data.use_shadow = False
bpy.ops.object.camera_add(location=(0, -30, 6.0)); cam = bpy.context.object; sc.camera = cam; cam.data.lens = 50
cam.rotation_euler = (math.radians(84), 0, 0)
XS = {'A': -6.0, 'B': 0.0, 'C': 6.0}
K = 1.25  # height per unit of capacity^(1/3)
def beaker(name, x, cap, vol):
    h = K * cap ** (1/3) * 1.0; r = 0.42 * cap ** (1/3) / 2.0 * 1.6 + 0.6
    base_z = -1.6
    bpy.ops.mesh.primitive_cylinder_add(radius=r, depth=h, location=(x, 0, base_z + h / 2), vertices=48)
    g = bpy.context.object; g.name = name + '_glass'; g.data.materials.append(glass)
    # open top rim (thin ring) to read as a glass container
    fill = max(0.0, min(1.0, vol / cap))
    if fill > 0:
        wh = (h - 0.12) * fill
        bpy.ops.mesh.primitive_cylinder_add(radius=r * 0.9, depth=wh, location=(x, 0, base_z + 0.06 + wh / 2), vertices=48)
        w = bpy.context.object; w.name = name + '_water'; w.data.materials.append(water)
    return g
def arrow(x0, x1, y=2.8):
    bpy.ops.mesh.primitive_cube_add(size=1, location=((x0 + x1) / 2, 0, y))
    o = bpy.context.object; o.scale = (abs(x1 - x0) / 2, 0.08, 0.08); o.data.materials.append(ink)
for i, st in enumerate(states):
    for o in list(bpy.data.objects):
        if o.type == 'MESH': bpy.data.objects.remove(o, do_unlink=True)
    for k in 'ABC':
        beaker(k, XS[k], st['cap'][k], st['vol'][k])
    bpy.context.view_layer.update()
    sc.render.filepath = f'{out}/jug-{i:02d}.png'
    bpy.ops.render.render(write_still=True)
print('JUGS_OK', len(states))
