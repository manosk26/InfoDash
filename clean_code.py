import re
import os

def clean_file(path, patterns):
    if not os.path.exists(path):
        return
    with open(path, 'r', encoding='utf-8') as f:
        content = f.read()
    
    for pattern in patterns:
        content = re.sub(pattern, '', content, flags=re.DOTALL | re.IGNORECASE)
    
    with open(path, 'w', encoding='utf-8') as f:
        f.write(content)

# File Paths
index_path = r'c:\Users\manol\.gemini\antigravity\scratch\infodash\index.html'
css_path = r'c:\Users\manol\.gemini\antigravity\scratch\infodash\css\styles.css'
js_path = r'c:\Users\manol\.gemini\antigravity\scratch\infodash\js\app.js'

# CSS Patterns (Selectors to remove)
css_patterns = [
    r'\.infogpt-fab\s*\{.*?\}',
    r'\.infogpt-fab i\s*\{.*?\}',
    r'\.infogpt-fab span\s*\{.*?\}',
    r'\.infogpt-panel-hidden\s*\{.*?\}',
    r'\.infogpt-panel-visible\s*\{.*?\}',
    r'\.infogpt-header\s*\{.*?\}',
    r'\.infogpt-title\s*\{.*?\}',
    r'\.infogpt-close\s*\{.*?\}',
    r'\.infogpt-messages\s*\{.*?\}',
    r'\.gpt-message\s*\{.*?\}',
    r'\.gpt-message\.user\s*\{.*?\}',
    r'\.gpt-message\.ai\s*\{.*?\}',
    r'\.infogpt-input-area\s*\{.*?\}',
    r'\.infogpt-input-area input\s*\{.*?\}',
    r'\.infogpt-input-area button\s*\{.*?\}',
    r'\.theme-btn\s*\{.*?\}',
    r'\.theme-toggle\s*\{.*?\}'
]

# JS Patterns (Functions to remove)
js_patterns = [
    r'window\.toggleInfoGPT\s*=\s*function\(.*?\)\s*\{.*?\};',
    r'window\.sendMessageGPT\s*=\s*async\s*function\(.*?\)\s*\{.*?\};',
    r'function getInfoGPTResponse\(.*?\)\s*\{.*?\}',
    r'window\.setTheme\s*=\s*function\(.*?\)\s*\{.*?\};',
    r'\(function\(\)\s*\{\s*const savedTheme\s*=\s*localStorage\.getItem\(\'infodash_theme\'\);.*?\}\)\(\);',
    r'if\s*\(savedTheme\)\s*window\.setTheme\(savedTheme\);'
]

# HTML Patterns (Tags to remove)
html_patterns = [
    r'<button id="theme-toggle".*?</button>',
    r'<div id="infogpt-panel".*?</div>',
    r'<button onclick="window\.toggleInfoGPT.*?</button>',
    r'<link.*?sw\.js.*?>',
    r'navigator\.serviceWorker\.register.*?\.then\(.*?\);'
]

print("Cleaning index.html...")
clean_file(index_path, html_patterns)

print("Cleaning styles.css...")
clean_file(css_path, css_patterns)

print("Cleaning app.js...")
clean_file(js_path, js_patterns)

# Fix Sidebar Headers
with open(index_path, 'r', encoding='utf-8') as f:
    idx_content = f.read()
    
# Manual replacements for headers (ensuring correct Greek/English mix)
idx_content = idx_content.replace('Extreme Suite', 'Specialized Hubs')
idx_content = idx_content.replace('fa-terminal', 'fa-bolt')

with open(index_path, 'w', encoding='utf-8') as f:
    f.write(idx_content)

print("Done!")
