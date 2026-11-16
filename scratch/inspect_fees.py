import re

with open('pages/fees.html', 'r', encoding='utf-8') as f:
    text = f.read()

m = re.search(r'<nav class="mobile-drawer__list">.*?</nav>', text, re.DOTALL)
if m:
    print(m.group(0))
