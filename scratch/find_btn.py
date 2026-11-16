with open('assets/css/style.css', 'r', encoding='utf-8') as f:
    lines = f.readlines()

for i, l in enumerate(lines):
    if l.startswith('.btn '):
        for k in range(i, i+25):
            print(f'{k+1}: {lines[k]}', end='')
        break
