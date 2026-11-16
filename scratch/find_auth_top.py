with open('assets/css/style.css', 'r', encoding='utf-8') as f:
    lines = f.readlines()

for i, l in enumerate(lines):
    if '.auth-top-actions {' in l:
        for k in range(i-2, i+12):
            print(f'{k+1}: {lines[k]}', end='')
        break
