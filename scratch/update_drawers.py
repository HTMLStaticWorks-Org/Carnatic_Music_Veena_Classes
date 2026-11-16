import re, os

page_active_map = {
    'index.html': 'home-1',
    'pages/home-2.html': 'home-2',
    'pages/about.html': 'about',
    'pages/concerts.html': 'concerts',
    'pages/fees.html': 'fees',
    'pages/gallery.html': 'gallery',
    'pages/blog.html': 'blog',
    'pages/blog-detail.html': 'blog',
    'pages/faq.html': 'faq',
    'pages/contact.html': 'contact',
    'pages/courses.html': 'courses',
    'pages/course-detail.html': 'courses',
    'pages/teachers.html': 'teachers',
    'pages/teacher-detail.html': 'teachers',
    'pages/resources.html': 'resources'
}

def generate_drawer(fpath):
    active_key = page_active_map[fpath]
    is_root = (fpath == 'index.html')
    
    p = 'pages/' if is_root else ''
    root_home = 'index.html' if is_root else '../index.html'
    
    def act(key):
        return ' is-active' if active_key == key else ''

    nav_list = f"""    <nav class="mobile-drawer__list">
      <a href="{root_home}" class="mobile-drawer__link{act('home-1')}">Home 1</a>
      <a href="{p}home-2.html" class="mobile-drawer__link{act('home-2')}">Home 2</a>
      <div class="mobile-drawer__dropdown is-open">
        <a href="{p}about.html" class="mobile-drawer__link mobile-drawer__dropdown-toggle" aria-expanded="true">
          <span>Explore</span>
          <i class="fa-solid fa-chevron-down" style="font-size:0.7rem;" aria-hidden="true"></i>
        </a>
        <div class="mobile-drawer__sub">
          <a href="{p}about.html" class="mobile-drawer__link{act('about')}">About &amp; Lineage</a>
          <a href="{p}concerts.html" class="mobile-drawer__link{act('concerts')}">Concerts &amp; Sabha</a>
          <a href="{p}fees.html" class="mobile-drawer__link{act('fees')}">Fees &amp; Pricing</a>
          <a href="{p}gallery.html" class="mobile-drawer__link{act('gallery')}">Photo Gallery</a>
          <a href="{p}blog.html" class="mobile-drawer__link{act('blog')}">Musicology Blog</a>
          <a href="{p}faq.html" class="mobile-drawer__link{act('faq')}">Admission FAQ</a>
          <a href="{p}contact.html" class="mobile-drawer__link{act('contact')}">Contact &amp; Demo</a>
        </div>
      </div>
      <a href="{p}courses.html" class="mobile-drawer__link{act('courses')}">Courses</a>
      <a href="{p}teachers.html" class="mobile-drawer__link{act('teachers')}">Teachers</a>
      <a href="{p}resources.html" class="mobile-drawer__link{act('resources')}">Resources</a>
    </nav>"""

    ctas = f"""    <div class="mobile-drawer__ctas">
      <a href="{p}login.html" class="btn btn--outline">Login</a>
      <a href="{p}student-dashboard.html" class="btn btn--primary">Dashboard</a>
    </div>"""

    return nav_list, ctas

for fpath in page_active_map:
    with open(fpath, 'r', encoding='utf-8') as f:
        content = f.read()

    new_list, new_ctas = generate_drawer(fpath)

    # Replace mobile-drawer__list
    list_pattern = r'<nav class="mobile-drawer__list">.*?</nav>'
    if not re.search(list_pattern, content, re.DOTALL):
        print(f"FAILED to find list in {fpath}")
        continue
    content = re.sub(list_pattern, new_list, content, flags=re.DOTALL)

    # Replace mobile-drawer__ctas
    ctas_pattern = r'<div class="mobile-drawer__ctas">.*?</div>'
    if not re.search(ctas_pattern, content, re.DOTALL):
        print(f"FAILED to find ctas in {fpath}")
        continue
    content = re.sub(ctas_pattern, new_ctas, content, flags=re.DOTALL)

    with open(fpath, 'w', encoding='utf-8') as f:
        f.write(content)

    print(f"UPDATED: {fpath}")

print("\nALL FILES UPDATED SUCCESSFULLY!")
