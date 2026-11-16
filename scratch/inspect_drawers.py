import re

files = [
    'index.html',
    'pages/home-2.html',
    'pages/about.html',
    'pages/courses.html',
    'pages/teachers.html',
    'pages/resources.html',
    'pages/concerts.html',
    'pages/fees.html',
    'pages/gallery.html',
    'pages/blog.html',
    'pages/faq.html',
    'pages/contact.html',
    'pages/course-detail.html',
    'pages/teacher-detail.html',
    'pages/blog-detail.html'
]

for f in files:
    with open(f, 'r', encoding='utf-8') as fp:
        c = fp.read()
    m_list = re.search(r'<nav class="mobile-drawer__list">(.*?)</nav>', c, re.DOTALL)
    m_ctas = re.search(r'<div class="mobile-drawer__ctas">(.*?)</div>', c, re.DOTALL)
    print(f'=== {f} ===')
    if m_list:
        lines = [line.strip() for line in m_list.group(1).strip().splitlines() if line.strip()]
        print('LIST lines count:', len(lines))
    if m_ctas:
        print('CTAS:', ' '.join(m_ctas.group(1).split()))
