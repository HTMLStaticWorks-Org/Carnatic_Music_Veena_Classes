with open('assets/css/style.css', 'r', encoding='utf-8') as f:
    css = f.read()

idx = css.find('.auth-top-actions')
print(css[idx-100:idx+400])
