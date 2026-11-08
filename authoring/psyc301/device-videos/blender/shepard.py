# Shepard & Metzler-style pairs: a random 10-cube polycube (seeded), its rotated copy (same) or its mirror image (different).
# Usage: blender -b --factory-startup --python blender/shepard.py -- <seed> <kind:same|mirror> <outfile>
import bpy, sys, random, math
from mathutils import Matrix, Vector
args = sys.argv[sys.argv.index('--') + 1:]
seed, kind, outfile = int(args[0]), args[1], args[2]
rnd = random.Random(seed)

# grow a connected set of 10 unit cubes in 3D
cells = {(0, 0, 0)}
dirs = [(1,0,0),(-1,0,0),(0,1,0),(0,-1,0),(0,0,1),(0,0,-1)]
while len(cells) < 10:
    c = rnd.choice(sorted(cells)); d = rnd.choice(dirs)
    n = (c[0]+d[0], c[1]+d[1], c[2]+d[2])
    if n not in cells: cells.add(n)
cells = sorted(cells)

def rot_matrix(seed_rot):
    # rigid turn in 90-degree steps about x, y, z (keeps cubes on the grid, so the copy is exact)
    r = random.Random(seed_rot)
    M = Matrix.Identity(4)
    for _ in range(3):
        axis = r.choice(['X', 'Y', 'Z']); k = r.choice([1, 2, 3])
        M = Matrix.Rotation(math.radians(90 * k), 4, axis) @ M
    return M

M = rot_matrix(seed + 1000)
if kind == 'mirror':
    T = Matrix(((-1,0,0,0),(0,1,0,0),(0,0,1,0),(0,0,0,1)))  # reflect across x
    other = [T @ Vector(c) for c in cells]
else:
    other = [M @ Vector(c) for c in cells]

bpy.ops.wm.read_factory_settings(use_empty=True)
mat = bpy.data.materials.new('Block'); mat.use_nodes = True
bsdf = mat.node_tree.nodes['Principled BSDF']
bsdf.inputs['Base Color'].default_value = (0.22, 0.34, 0.46, 1)
bsdf.inputs['Roughness'].default_value = 0.35
bsdf.inputs['Metallic'].default_value = 0.1

def build(points, offset_x, name):
    objs = []
    for p in points:
        bpy.ops.mesh.primitive_cube_add(size=0.96, location=(p[0] + offset_x, p[1], p[2]))
        o = bpy.context.object; o.data.materials.append(mat); objs.append(o)
    for o in objs: o.select_set(True)
    bpy.context.view_layer.objects.active = objs[0]
    bpy.ops.object.join(); j = bpy.context.object; j.name = name
    bpy.ops.object.origin_set(type='ORIGIN_GEOMETRY', center='BOUNDS')
    return j

# centre both shapes on the same origin; left = base, right = comparison
def centred(points):
    c = sum((Vector(p) for p in points), Vector()) / len(points)
    return [Vector(p) - c for p in points]
base = centred(cells); comp = centred(other)
build(base, -3.6, 'base'); build(comp, 3.6, 'comparison')

bpy.ops.object.light_add(type='SUN', location=(4, -6, 8)); bpy.context.object.data.energy = 3.5; bpy.context.object.data.use_shadow = False
bpy.ops.object.light_add(type='AREA', location=(-5, -4, 3)); bpy.context.object.data.energy = 180; bpy.context.object.data.use_shadow = False
bpy.ops.object.camera_add(location=(0, -18, 8.5))
cam = bpy.context.object; bpy.context.scene.camera = cam
cam.data.lens = 35
direction = Vector((0, 0, -0.8)) - cam.location
cam.rotation_euler = direction.to_track_quat('-Z', 'Y').to_euler()
sc = bpy.context.scene
sc.render.engine = 'BLENDER_EEVEE'
sc.view_settings.view_transform = 'Standard'
sc.view_settings.look = 'None'
sc.render.resolution_x = 1280; sc.render.resolution_y = 720
sc.render.film_transparent = False
sc.world = bpy.data.worlds.new('W'); sc.world.use_nodes = True
sc.world.node_tree.nodes['Background'].inputs['Color'].default_value = (1.0, 1.0, 1.0, 1)
sc.render.filepath = outfile
bpy.ops.render.render(write_still=True)
print('SHEPARD_OK', seed, kind, outfile)
