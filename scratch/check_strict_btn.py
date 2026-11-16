with open('assets/css/style.css', 'r', encoding='utf-8') as f:
    lines = f.readlines()

for i, l in enumerate(lines):
    if 'Strict Uniform Button Sizing on Mobile' in l:
        print(f'Found at line {i+1}:')
        for k in range(i-5, i+30):
            print(f'{k+1}: {lines[k]}', end='')
        break
