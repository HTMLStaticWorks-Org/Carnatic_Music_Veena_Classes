import re

with open('assets/css/style.css', 'r', encoding='utf-8') as f:
    css = f.read()

for m in re.finditer(r'([^{}]*\.btn[^{}]*\{[^}]*\})', css):
    text = m.group(1)
    if 'min-width' in text or 'white-space' in text or 'width' in text or 'max-width' in text:
        print(text[:250])
        print('---')
