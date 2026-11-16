import re

for fpath in ['pages/signup.html', 'pages/login.html']:
    with open(fpath, 'r', encoding='utf-8') as f:
        content = f.read()

    assert 'class="auth-page-main"' in content, f"Missing auth-page-main in {fpath}"
    assert 'class="auth-container"' in content or 'class="auth-container"' in content, f"Missing auth-container in {fpath}"
    assert 'class="auth-card"' in content, f"Missing auth-card in {fpath}"
    assert 'class="btn btn--primary btn-submit"' in content, f"Missing btn-submit in {fpath}"
    assert 'card-grid-2' not in content, f"Found card-grid-2 inside {fpath}"
    print(f"PASS: {fpath} layout structure verified!")

print("\nALL AUTH PAGE LAYOUTS VERIFIED SUCCESSFULLY!")
