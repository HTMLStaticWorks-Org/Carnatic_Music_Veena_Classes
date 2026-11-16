with open('assets/css/style.css', 'r', encoding='utf-8') as f:
    lines = f.readlines()

for i in range(4973, 5950):
    if 'card-grid' in lines[i]:
        print(f'{i+1}: {lines[i]}', end='')
