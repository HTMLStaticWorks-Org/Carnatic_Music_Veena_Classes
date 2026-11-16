import re

with open('assets/css/style.css', 'r', encoding='utf-8') as f:
    css = f.read()

for m in re.finditer(r'([^{}]*\.container[^{}]*\{[^}]*\})', css):
    print(m.group(1))
