with open('assets/css/style.css', 'r', encoding='utf-8') as f:
    css = f.read()

# Check balanced braces
open_braces = css.count('{')
close_braces = css.count('}')
print(f'Open braces: {open_braces}, Close braces: {close_braces}')
if open_braces == close_braces:
    print('Braces are perfectly balanced!')
else:
    print('MISMATCHED BRACES!')

# Check HTML validity of pages/resources.html
from html.parser import HTMLParser

class TagChecker(HTMLParser):
    def __init__(self):
        super().__init__()
        self.stack = []
        self.void_tags = {'area', 'base', 'br', 'col', 'embed', 'hr', 'img', 'input', 'link', 'meta', 'param', 'source', 'track', 'wbr'}
        self.errors = []

    def handle_starttag(self, tag, attrs):
        if tag.lower() not in self.void_tags:
            self.stack.append((tag.lower(), self.getpos()))

    def handle_endtag(self, tag):
        tag_lower = tag.lower()
        if tag_lower in self.void_tags:
            return
        if not self.stack:
            self.errors.append(f'Unexpected closing </{tag}> at {self.getpos()}')
            return
        last_tag, pos = self.stack.pop()
        if last_tag != tag_lower:
            self.errors.append(f'Mismatched tag: expected </{last_tag}> (opened at {pos}), but found </{tag_lower}> at {self.getpos()}')

with open('pages/resources.html', 'r', encoding='utf-8') as f:
    html = f.read()

checker = TagChecker()
checker.feed(html)
print(f'Unclosed tags in pages/resources.html: {len(checker.stack)}')
if checker.stack:
    print('Top unclosed tags:', checker.stack[-5:])
print(f'Tag errors: {len(checker.errors)}')
if checker.errors:
    print('First 5 errors:', checker.errors[:5])
