# Animated water pour between glass beakers (Blender EEVEE), white background, 30 fps.
# Source beaker tilts about its right rim; a stream carries water to the target; levels change continuously.
# Usage: blender -b --factory-startup --python pour.py -- <outdir>
import bpy, sys, math
from mathutils import Vector
out = sys.argv[sys.argv.index('--') + 1]
bpy.ops.wm.read_factory_settings(use_empty=True)
sc = bpy.context.scene
sc.render.engine = 'BLENDER_EEVEE'; sc.render.resolution_x = 960; sc.render.resolution_y = 540
sc.render.fps = 24; sc.eevee.taa_render_samples = 8; sc.render.image_settings.compression = 15; sc.view_settings.view_transform = 'Standard'; sc.view_settings.look = 'None'
sc.world = bpy.data.worlds.new('W'); sc.world.use_nodes = True
sc.world.node_tree.nodes['Background'].inputs['Color'].default_value = (1, 1, 1, 1)
def mat(name, rgb, rough, alpha=1.0):
    m = bpy.data.materials.new(name); m.use_nodes = True
    b = m.node_tree.nodes['Principled BSDF']; b.inputs['Base Color'].default_value = (*rgb, 1); b.inputs['Roughness'].default_value = rough
    if alpha < 1.0: m.surface_render_method = 'BLENDED'; b.inputs['Alpha'].default_value = alpha
    return m
glass = mat('Glass', (0.85, 0.92, 0.96), 0.05, 0.22); water = mat('Water', (0.10, 0.62, 0.72), 0.15, 0.9)
bpy.ops.object.light_add(type='SUN', location=(4, -6, 9)); bpy.context.object.data.energy = 3.0; bpy.context.object.data.use_shadow = False
bpy.ops.object.camera_add(location=(0, -30, 6.0)); cam = bpy.context.object; sc.camera = cam; cam.data.lens = 50
cam.rotation_euler = (math.radians(84), 0, 0)
K = 1.25; BASE = -1.6
class Beaker:
    def __init__(s, name, x, cap):
        s.cap = cap; s.h = K * cap ** (1/3); s.r = 0.42 * cap ** (1/3) / 2.0 * 1.6 + 0.6; s.x = x
        s.pivot = bpy.data.objects.new(name + '_pivot', None); bpy.context.collection.objects.link(s.pivot)
        s.pivot.location = (x + s.r, 0, BASE + s.h)
        bpy.ops.mesh.primitive_cylinder_add(radius=s.r, depth=s.h, location=(x, 0, BASE + s.h / 2), vertices=48)
        s.glass = bpy.context.object; s.glass.data.materials.append(glass)
        bpy.ops.mesh.primitive_cylinder_add(radius=s.r * 0.9, depth=s.h - 0.12, location=(x, 0, BASE + 0.06), vertices=48)
        s.water = bpy.context.object; s.water.data.materials.append(water)
        for o in (s.glass, s.water):
            o.parent = s.pivot; o.matrix_parent_inverse = s.pivot.matrix_world.inverted()
        s.fill = 0.0; s.set(0.0, 0.0)
    def set(s, vol, tilt):
        s.fill = max(0.0, min(1.0, vol / s.cap))
        s.pivot.rotation_euler = (0, tilt, 0)
        wh = (s.h - 0.12) * s.fill
        s.water.scale = (1, 1, 1); s.water.location = (s.x, 0, BASE + 0.06 + wh / 2)
        s.water.scale.z = max(1e-4, s.fill)
        # water dimensions: mesh height is h-0.12, so scale.z = fill keeps the bottom fixed
        s.water.location.z = BASE + 0.06 + (s.h - 0.12) * s.fill / 2
        bpy.context.view_layer.update()
    def rim_point(s):
        return Vector((s.x + s.r, 0, BASE + s.h))
stream_obj = None
def stream(src_pt, dst_pt, on, length_frac=1.0):
    global stream_obj
    if stream_obj is None:
        bpy.ops.mesh.primitive_cylinder_add(radius=0.07, depth=1.0, location=(0, 0, 0))
        stream_obj = bpy.context.object; m = mat('Stream', (0.10, 0.62, 0.72), 0.2); stream_obj.data.materials.append(m)
    stream_obj.hide_render = not on; stream_obj.hide_viewport = not on
    if not on: return
    d = dst_pt - src_pt; L = max(0.01, d.length)
    stream_obj.location = (src_pt + dst_pt) / 2
    stream_obj.scale = (1, 1, L * length_frac)
    stream_obj.rotation_mode = 'QUATERNION'
    stream_obj.rotation_quaternion = Vector((0, 0, 1)).rotation_difference(d.normalized())
def ease(u): u = max(0.0, min(1.0, u)); return u * u * (3 - 2 * u)
A = Beaker('A', -6.0, 21); B = Beaker('B', 0.0, 127); C = Beaker('C', 6.0, 3)
bpy.ops.object.camera_add  # keep camera
frame = [0]
def render_frame(label):
    sc.render.filepath = f'{out}/f{frame[0]:05d}.png'
    bpy.ops.render.render(write_still=True); frame[0] += 1
def segment(seconds, step):
    n = int(seconds * sc.render.fps)
    for i in range(n):
        step(i / max(1, n - 1)); render_frame('')
def hold(seconds, state):
    for _ in range(int(seconds * sc.render.fps)):
        state(); render_frame('')
# Pour from src (beaker object) into dst until dst is full or src reaches target volume.
def pour(src, dst, src_from, src_to, dst_from, dst_to):
    def tilt_in(u):
        src.set(src_from, ease(u) * math.radians(40))
        stream(src.rim_point(), Vector((dst.x, 0, BASE + dst.h)), False)
    segment(1.0, tilt_in)
    def flow(u):
        ang = math.radians(40)
        src.set(src_from + (src_to - src_from) * ease(u), ang)
        dst.set(dst_from + (dst_to - dst_from) * ease(u), 0.0)
        stream(src.rim_point(), Vector((dst.x, 0, BASE + dst.h + 0.2)), True)
    segment(2.0, flow)
    def tilt_out(u):
        src.set(src_to, math.radians(40) * (1 - ease(u)))
        dst.set(dst_to, 0.0)
        stream(src.rim_point(), Vector((dst.x, 0, BASE + dst.h)), False)
    segment(0.8, tilt_out)
    hold(0.6, lambda: (src.set(src_to, 0.0), dst.set(dst_to, 0.0), stream(src.rim_point(), Vector((0,0,0)), False)))
# Problem 1 (slide 10:10): B 127 -> A 21 -> 106; discard A; B -> C 3 -> 103; discard C; B -> C 3 -> 100.
hold(1.0, lambda: (B.set(127, 0), A.set(0, 0), C.set(0, 0)))
pour(B, A, 127, 106, 0, 21)
def empty_a(u):
    A.set(21 * (1 - ease(u)), 0.0)
segment(1.0, empty_a); hold(0.4, lambda: A.set(0, 0))
pour(B, C, 106, 103, 0, 3)
segment(0.8, lambda u: C.set(3 * (1 - ease(u)), 0.0)); hold(0.4, lambda: C.set(0, 0))
pour(B, C, 103, 100, 0, 3)
hold(1.5, lambda: (B.set(100, 0), C.set(3, 0), A.set(0, 0)))
# Problem 8 (slide table): A 28 -> C 3 -> 25 (two-jug route, A - C).
A2 = A
hold(0.5, lambda: (A.set(0, 0), B.set(0, 0), C.set(0, 0)))
pour(A, C, 28, 25, 0, 3)
hold(1.5, lambda: (A.set(25, 0), C.set(3, 0)))
print('POUR_OK', frame[0])
