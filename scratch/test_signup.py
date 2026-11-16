import re

with open('pages/signup.html', 'r', encoding='utf-8') as f:
    html = f.read()

tags = re.findall(r'<[a-zA-Z0-9]+[^>]*style="([^"]*)"', html)
for t in tags:
    print('Inline style:', t)
