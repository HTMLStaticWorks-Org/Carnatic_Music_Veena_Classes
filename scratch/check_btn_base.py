with open('assets/css/style.css', 'r', encoding='utf-8') as f:
    lines = f.readlines()

for i in range(320, 360):
    if '.btn' in lines[i]:
        for k in range(i, i+25):
            print(f'{k+1}: {lines[k]}', end='')
        break
