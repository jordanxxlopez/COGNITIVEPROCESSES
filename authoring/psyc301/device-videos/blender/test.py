import bpy
bpy.ops.wm.read_factory_settings(use_empty=True)
bpy.ops.mesh.primitive_torus_add(major_radius=1, minor_radius=0.2, location=(0, 0, 0))
bpy.ops.object.light_add(type='SUN', location=(3, -3, 5))
bpy.ops.object.camera_add(location=(0, -4, 2), rotation=(1.1, 0, 0))
bpy.context.scene.camera = bpy.context.object
sc = bpy.context.scene
sc.render.engine = 'BLENDER_EEVEE'
sc.render.resolution_x = 640; sc.render.resolution_y = 360
sc.render.filepath = '/private/tmp/claude-501/-Users-jordanlopez-BEHAVNEUR392-Revisions/d87b0a3b-bce4-4a1c-af1e-8fdf2eb98e97/scratchpad/blender_test.png'
bpy.ops.render.render(write_still=True)
print('BLENDER_RENDER_OK')
