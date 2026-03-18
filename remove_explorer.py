import codecs
import re

print("Removing Vault Explorer...")

with codecs.open('c:/Users/manol/.gemini/antigravity/scratch/infodash/js/app.js', 'r', 'utf-8') as f:
    code = f.read()

# Remove the sidebar button
code = re.sub(r'// --- PREPEND EXPLORER TAB ---.*?window\.masterVaultCategories\.forEach\(\(cat, index\) => \{', 'window.masterVaultCategories.forEach((cat, index) => {', code, flags=re.DOTALL)

# Remove the functions at the end of the file
code = re.sub(r'// =========================================================================\r?\n// VAULT EXPLORER LOGIC.*', '', code, flags=re.DOTALL)

with codecs.open('c:/Users/manol/.gemini/antigravity/scratch/infodash/js/app.js', 'w', 'utf-8') as f:
    f.write(code)

print("Vault Explorer removed.")
