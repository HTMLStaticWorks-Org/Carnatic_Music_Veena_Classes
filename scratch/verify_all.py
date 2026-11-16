import os, re

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

expected_sub_items = [
    'About &amp; Lineage',
    'Concerts &amp; Sabha',
    'Fees &amp; Pricing',
    'Photo Gallery',
    'Musicology Blog',
    'Admission FAQ',
    'Contact &amp; Demo'
]

all_passed = True
for fpath in files:
    if not os.path.exists(fpath):
        print(f'MISSING: {fpath}')
        all_passed = False
        continue
    with open(fpath, 'r', encoding='utf-8') as f:
        content = f.read()

    # Check desktop nav items
    nav_match = re.search(r'<ul class="nav-menu">(.*?)</ul>', content, re.DOTALL)
    if not nav_match:
        print(f'NO nav-menu: {fpath}')
        all_passed = False
        continue
    nav_text = nav_match.group(1)
    
    # Extract nav links in order
    links = re.findall(r'<a\s+[^>]*class="nav-link[^"]*"[^>]*>(.*?)</a>', nav_text, re.DOTALL)
    cleaned_links = [re.sub(r'<[^>]+>', '', l).strip() for l in links]
    if len(cleaned_links) < 2 or 'Home' not in cleaned_links[0] or 'Explore' not in cleaned_links[1]:
        print(f'FAIL DESKTOP NAV in {fpath}: {cleaned_links}')
        all_passed = False
        continue

    # Check mobile drawer
    drawer_match = re.search(r'<nav class="mobile-drawer__list">(.*?)</nav>', content, re.DOTALL)
    if not drawer_match:
        print(f'NO mobile drawer: {fpath}')
        all_passed = False
        continue
    d_text = drawer_match.group(1)

    # 1. Check Explore presence and icon
    if 'Explore' not in d_text or 'fa-chevron-down' not in d_text:
        print(f'FAIL: Explore or chevron icon missing in mobile drawer of {fpath}')
        all_passed = False
        continue

    # 2. Check sub items
    for item in expected_sub_items:
        if item not in d_text:
            print(f'FAIL: Sub item "{item}" missing in {fpath}')
            all_passed = False
            break

    # 3. Check Courses, Teachers, Resources names
    if '>Courses<' not in d_text:
        print(f'FAIL: "Courses" missing in {fpath}')
        all_passed = False
    if '>Teachers<' not in d_text:
        print(f'FAIL: "Teachers" missing in {fpath}')
        all_passed = False
    if '>Resources<' not in d_text:
        print(f'FAIL: "Resources" missing in {fpath}')
        all_passed = False

    # 4. Check CTAs
    ctas_match = re.search(r'<div class="mobile-drawer__ctas">(.*?)</div>', content, re.DOTALL)
    if not ctas_match:
        print(f'NO mobile-drawer__ctas: {fpath}')
        all_passed = False
        continue
    ctas_text = ctas_match.group(1)
    if '>Login<' not in ctas_text or '>Dashboard<' not in ctas_text:
        print(f'FAIL: CTAs not matching Login/Dashboard in {fpath}')
        all_passed = False
        continue
    if 'Student Login' in ctas_text:
        print(f'FAIL: Old "Student Login" still in {fpath}')
        all_passed = False
        continue

    print(f'PASS: {fpath}')

if all_passed:
    print('\nALL 15 PAGES PERFECTLY CONFIGURED!')
else:
    print('\nSOME PAGES FAILED!')
