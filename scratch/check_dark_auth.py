with open('assets/css/dark-mode.css', 'r', encoding='utf-8') as f:
    css = f.read()

import re
print('auth in dark-mode.css:', re.findall(r'[^{}]*auth[^{}]*\{[^}]*\}', css))
