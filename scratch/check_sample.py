import re

for f in ['index.html', 'pages/fees.html']:
    with open(f, 'r', encoding='utf-8') as fp:
        c = fp.read()
    m_list = re.search(r'<nav class="mobile-drawer__list">.*?</nav>', c, re.DOTALL)
    m_ctas = re.search(r'<div class="mobile-drawer__ctas">.*?</div>', c, re.DOTALL)
    print(f'=== {f} ===')
    if m_list:
        print(m_list.group(0))
    if m_ctas:
        print(m_ctas.group(0))
