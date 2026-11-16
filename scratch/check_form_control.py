with open('assets/css/style.css', 'r', encoding='utf-8') as f:
    css = f.read()

import re
for m in re.finditer(r'([^{}]*\.form-control[^{}]*\{[^}]*\})', css):
    print(m.group(1))
    print('---')
