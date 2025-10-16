"""fix_imports.py
Fix import paths after moving components. Simple rule-based replacements.
Creates .bak copies of files it edits.
"""
from pathlib import Path
import re

ROOT = Path(__file__).resolve().parent
SRC = ROOT / 'src'

# mapping old basename -> new relative import path from src
REMAP = {
    'FuelConsumptionDashboard': 'pages/Fuel/FuelConsumptionDashboard',
    'EmptyState': 'components/shared/EmptyState',
    'AdminDashboard': 'pages/Admin/AdminDashboard',
    'ComparisonDashboard': 'pages/Compare/ComparisonDashboard',
    'CompareDialog': 'components/shared/CompareDialog',
    'HelpDialog': 'components/shared/HelpDialog',
    'ChatHistory': 'components/chat/ChatHistory',
    'ChatInput': 'components/chat/ChatInput',
    'SettingsDialog': 'components/shared/SettingsDialog',
    'ChatBot': 'components/chat/ChatBot',
    'RegisterForm': 'components/auth/RegisterForm',
    'LoginForm': 'components/auth/LoginForm',
}

IMPORT_RE = re.compile(r"from\s+['\"](\.\./)*src/([^'\"]+)['\"]")
IMPORT_RE2 = re.compile(r"from\s+['\"]\.\./components/([^'\"]+)['\"]")

changed_files = []
for f in SRC.rglob('*.tsx'):
    txt = f.read_text(encoding='utf-8')
    new = txt
    for name, newpath in REMAP.items():
        # replace bare component imports (several heuristics)
        # 1) import X from 'src/components/X'
        new = re.sub(rf"from\s+['\"]/src/components/{name}['\"]", f"from '{newpath}'", new)
        # 2) import X from '../components/X' or '../../components/X'
        new = re.sub(rf"from\s+['\"](\.\./)+components/{name}['\"]", f"from '{newpath}'", new)
        # 3) import {X} from 'src/components'
        new = re.sub(rf"from\s+['\"]/src/components{1,2}['\"]", f"from '{newpath}'", new)
        # generic replace imports that reference component file
        new = new.replace(f"/components/{name}", f"/{newpath}")

    if new != txt:
        bak = f.with_suffix(f"{f.suffix}.bak")
        f.rename(bak)
        f.write_text(new, encoding='utf-8')
        changed_files.append(str(f))

print('Files changed:', len(changed_files))
for c in changed_files[:50]:
    print('-', c)
