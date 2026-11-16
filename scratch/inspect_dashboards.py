import re

for filename in ['pages/student-dashboard.html', 'pages/instructor-dashboard.html']:
    print(f'=== {filename} ===')
    with open(filename, 'r', encoding='utf-8') as f:
        text = f.read()

    # Find stat cards
    cards = re.findall(r'<div class="dash-stat-card"[^>]*>(.*?)</div>', text, re.DOTALL)
    print(f'Stat cards: {len(cards)}')
    for i, c in enumerate(cards):
        clean_c = re.sub(r'\s+', ' ', c)[:100]
        print(f'  Card {i+1}: {clean_c}')

    # Find tables
    tables = re.findall(r'<table[^>]*>(.*?)</table>', text, re.DOTALL)
    print(f'Tables: {len(tables)}')
    for i, t in enumerate(tables):
        headers = re.findall(r'<th[^>]*>(.*?)</th>', t, re.DOTALL)
        clean_headers = [re.sub(r'<[^>]+>', '', h).strip() for h in headers]
        print(f'  Table {i+1} headers: {clean_headers}')

    # Check scroll-to-top
    has_scroll_btn = 'scroll-to-top' in text
    print(f'Scroll-to-top button present: {has_scroll_btn}')
    print()
