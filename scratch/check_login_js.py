with open('assets/js/main.js', 'r', encoding='utf-8') as f:
    js = f.read()

idx = js.find("formType === 'login'")
print(js[idx:idx+700])
