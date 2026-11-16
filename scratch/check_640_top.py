with open('assets/css/style.css', 'r', encoding='utf-8') as f:
    lines = f.readlines()

for i, l in enumerate(lines):
    if '@media (max-width: 639.98px)' in l:
        for k in range(i+1, i+20):
            print(f'{k+1}: {lines[k]}', end='')
        break
