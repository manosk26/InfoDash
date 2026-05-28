import codecs

with codecs.open('c:/Users/manol/.gemini/antigravity-ide/scratch/infodash/js/app.js', 'r', 'utf-8') as f:
    js_code = f.read()

custom_link_code = """
// Function to add a completely custom external link
window.addCustomLink = function() {
    const urlInput = document.getElementById('custom-link-url');
    const titleInput = document.getElementById('custom-link-title');
    
    const url = urlInput.value.trim();
    const title = titleInput.value.trim();
    
    if (!url || !title) {
        alert("Παρακαλώ συμπληρώστε και το Link (URL) και το Όνομα του εργαλείου!");
        return;
    }
    
    // Add https:// if missing for valid href
    const finalUrl = url.startsWith('http') ? url : 'https://' + url;
    
    let savedLinks = JSON.parse(localStorage.getItem('infodash_saved_links') || '[]');
    
    // Check if exists
    if (savedLinks.find(l => l.url === finalUrl)) {
        alert("Αυτό το link υπάρχει ήδη αποθηκευμένο στο Dashboard σας!");
        return;
    }
    
    // Add to start of storage
    savedLinks.unshift({
        url: finalUrl,
        title: title,
        icon: 'fa-solid fa-link',
        desc: 'Χειροκίνητη Προσθήκη από Χρήστη (Custom Access)'
    });
    
    localStorage.setItem('infodash_saved_links', JSON.stringify(savedLinks));
    
    // Clear inputs and reload widget
    urlInput.value = '';
    titleInput.value = '';
    
    if (typeof loadMyHub === 'function') {
        loadMyHub();
    }
};
"""

target = "// Global function to toggle save state"

if target in js_code:
    js_code = js_code.replace(target, custom_link_code + "\n" + target)

with codecs.open('c:/Users/manol/.gemini/antigravity-ide/scratch/infodash/js/app.js', 'w', 'utf-8') as f:
    f.write(js_code)
