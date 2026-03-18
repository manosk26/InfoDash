import codecs
import re

print("Starting refactor...")

# 1. api.js
with codecs.open('c:/Users/manol/.gemini/antigravity/scratch/infodash/js/api.js', 'r', 'utf-8') as f:
    api_content = f.read()
api_content = re.sub(r'^export\s+', '', api_content, flags=re.MULTILINE)
with codecs.open('c:/Users/manol/.gemini/antigravity/scratch/infodash/js/api.js', 'w', 'utf-8') as f:
    f.write(api_content)
print("api.js refactored.")

# 2. app.js
with codecs.open('c:/Users/manol/.gemini/antigravity/scratch/infodash/js/app.js', 'r', 'utf-8') as f:
    app_content = f.read()

app_content = re.sub(r'\s*const\s+\{[^\}]+\}\s*=\s*await\s+import\(\'\./api\.js\'\);', '', app_content)
app_content = re.sub(r'\s*initGhostVault\(\);', '', app_content)
app_content = re.sub(r'// =========================================================================\r?\n// GHOST VAULT LOGIC.*?(?=\s*// =========================================================================\r?\n// INITIALIZATION|\Z)', '', app_content, flags=re.DOTALL)

with codecs.open('c:/Users/manol/.gemini/antigravity/scratch/infodash/js/app.js', 'w', 'utf-8') as f:
    f.write(app_content)
print("app.js refactored.")

# 3. index.html
with codecs.open('c:/Users/manol/.gemini/antigravity/scratch/infodash/index.html', 'r', 'utf-8') as f:
    html_content = f.read()

# Replace ghost vault and add script tags
html_content = re.sub(r'<!-- GHOST VAULT LOGIN -->.*?<script src="\./js/app\.js" type="module"></script>', '<script src="./js/api.js"></script>\n    <script src="./js/app.js"></script>', html_content, flags=re.DOTALL)

with codecs.open('c:/Users/manol/.gemini/antigravity/scratch/infodash/index.html', 'w', 'utf-8') as f:
    f.write(html_content)
print("index.html refactored.")

print("Done.")
