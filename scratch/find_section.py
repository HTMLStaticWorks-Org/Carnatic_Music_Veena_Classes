with open('assets/css/style.css', 'r', encoding='utf-8') as f:
    lines = f.readlines()

for i, l in enumerate(lines):
    if l.startswith('.section ') or l.startswith('.section{'):
        for k in range(i, i+20):
            print(f'{k+1}: {lines[k]}', end='')
        break
