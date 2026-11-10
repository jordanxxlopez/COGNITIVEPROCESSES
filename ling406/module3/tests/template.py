# The source-staging template has graduated to the complete module.
from pathlib import Path
import runpy
runpy.run_path(str(Path(__file__).with_name('release.py')),run_name='__main__')
