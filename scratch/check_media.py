with open('assets/css/style.css', 'r', encoding='utf-8') as f:
    lines = f.readlines()

for i in range(6955, 6500, -1):
    if '@media' in lines[i]:
        print(f'{i+1}: {lines[i]}')
        break
