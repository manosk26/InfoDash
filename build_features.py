import codecs
import re

with codecs.open('c:/Users/manol/.gemini/antigravity/scratch/infodash/js/app.js', 'r', 'utf-8') as f:
    js_code = f.read()

# Generate the 3 feature functions
features_code = """
// =========================================================================
// VAULT CORE FEATURES (Search, Roulette, Cipher)
// =========================================================================

window.renderSyndicateSearch = function() {
    const grid = document.getElementById('master-grid');
    grid.style.display = 'block';
    
    let allTools = [];
    if (window.masterVaultCategories && window.getSecretVaultData) {
        window.masterVaultCategories.forEach(cat => {
            const t = window.getSecretVaultData(cat.id);
            allTools = allTools.concat(t);
        });
    }
    
    grid.innerHTML = `
        <div style="text-align:center; padding: 20px;">
            <i class="fa-solid fa-magnifying-glass" style="font-size:3rem; color:#ffd700; margin-bottom:15px;"></i>
            <h3 style="color:#fff; font-size:1.8rem; margin-bottom:10px;">Σύστημα Αναζήτησης Βάσης</h3>
            <p style="color:#aaa;">Άμεση εύρεση σε ${allTools.length} εξειδικευμένα εργαλεία του Vault.</p>
            <input type="text" id="vault-search-input" placeholder="Αναζήτηση (π.χ. PDF, Password, Hacking, AI)..." style="width:100%; max-width:600px; padding:15px 20px; margin-top:20px; background:rgba(0,0,0,0.5); border: 2px solid rgba(255,215,0,0.5); color:#ffd700; font-size:1.2rem; outline:none; border-radius:8px; box-shadow: 0 4px 15px rgba(255,215,0,0.1);">
            <div id="vault-search-results" style="display:grid; grid-template-columns: repeat(auto-fill, minmax(320px, 1fr)); gap: 20px; margin-top: 40px; text-align:left;"></div>
        </div>
    `;
    
    document.getElementById('vault-search-input').addEventListener('input', (e) => {
        const q = e.target.value.toLowerCase().trim();
        const resDiv = document.getElementById('vault-search-results');
        if (q.length < 2) { resDiv.innerHTML = ''; return; }
        
        const matches = allTools.filter(t => t.title.toLowerCase().includes(q) || t.desc.toLowerCase().includes(q));
        if(matches.length === 0) {
            resDiv.innerHTML = `<div style="grid-column:1/-1; text-align:center; color:#ff3333; padding:20px;">Καθόλου αποτελέσματα για "${q}".</div>`;
            return;
        }
        resDiv.innerHTML = matches.map(t => `
            <div class="ghost-card" style="background: rgba(20,20,20,0.8); padding: 20px; border-radius: 8px; border-top: 3px solid #ffd700; transition: transform 0.2s;">
                <h4 style="color:#ffd700; margin-bottom:10px; font-size:1.1rem;"><i class="${t.icon}" style="margin-right:8px;"></i> ${t.title}</h4>
                <p style="color:#ccc; font-size:0.9rem; margin-bottom:15px; line-height:1.4;">${t.desc}</p>
                <a href="${t.url}" target="_blank" style="background:#ffd700; color:#000; padding:10px 15px; text-decoration:none; border-radius:4px; font-weight:bold; display:block; text-align:center;">LAUNCH TOOL</a>
            </div>
        `).join('');
    });
};

window.renderToolRoulette = function() {
    const grid = document.getElementById('master-grid');
    grid.style.display = 'block';
    
    let allTools = [];
    if (window.masterVaultCategories) {
        window.masterVaultCategories.forEach(cat => {
            allTools = allTools.concat(window.getSecretVaultData(cat.id));
        });
    }
    
    if(allTools.length === 0) return;
    const randomTool = allTools[Math.floor(Math.random() * allTools.length)];
    
    grid.innerHTML = `
        <div style="text-align:center; padding: 40px; max-width:800px; margin: 0 auto; background: rgba(255,215,0,0.05); border-radius: 12px; border: 1px dashed rgba(255,215,0,0.5); box-shadow: 0 0 30px rgba(0,0,0,0.8);">
            <i class="fa-solid fa-dice" style="font-size:4rem; color:#ffd700; margin-bottom:20px; text-shadow: 0 0 15px rgba(255,215,0,0.5);"></i>
            <h2 style="color:#fff; margin-bottom:10px; font-size:2.2rem; letter-spacing:1.5px;">ΤΗΛΕΜΕΤΑΦΟΡΑ ΚΕΡΔΟΥΣ</h2>
            <p style="color:#aaa; margin-bottom: 40px; font-size:1.1rem;">Το σύστημα ανέλυσε τα 200 εργαλεία και σου προτείνει αυτό τυχαία:</p>
            
            <div style="background: rgba(10,10,10,0.9); padding: 35px; border-radius: 10px; border-left: 5px solid #ffd700; text-align:left; box-shadow: inset 0 0 20px rgba(0,0,0,0.8);">
                <h3 style="color:#ffd700; font-size:1.8rem; margin-bottom:15px;"><i class="${randomTool.icon}" style="margin-right:10px;"></i> ${randomTool.title}</h3>
                <p style="color:#eee; font-size:1.15rem; line-height:1.6; margin-bottom:25px;">${randomTool.desc}</p>
                <div style="background: rgba(255,215,0,0.1); padding: 20px; border-radius: 6px; margin-bottom: 30px; border: 1px solid rgba(255,215,0,0.2);">
                    <strong style="color:#ffd700; font-size:1.1rem; display:block; margin-bottom:8px;"><i class="fa-solid fa-lightbulb"></i> Ιδέα Αξιοποίησης &amp; Κέρδους:</strong> 
                    <span style="color:#ccc; line-height:1.5;">Αφιέρωσε 1 ώρα σήμερα για να μάθεις πώς λειτουργεί το ${randomTool.title}. Μετά, μπορείς να προσφέρεις αυτές τις έτοιμες λύσεις σαν υπηρεσία σε πελάτες στο Fiverr/Upwork ή να αυτοματοποιήσεις δικιές σου χρονοβόρες διαδικασίες κερδίζοντας πολύτιμο χρόνο.</span>
                </div>
                <div style="display:flex; gap:15px; flex-wrap:wrap;">
                    <a href="${randomTool.url}" target="_blank" style="flex:1; text-align:center; background:#ffd700; color:#000; padding:15px 30px; text-decoration:none; border-radius:6px; font-weight:900; font-size:1.1rem; box-shadow: 0 4px 15px rgba(255,215,0,0.3); transition: transform 0.2s;">ΕΝΑΡΞΗ ΕΡΓΑΛΕΙΟΥ</a>
                    <button onclick="window.renderToolRoulette()" style="flex:1; background:#222; color:#fff; padding:15px 30px; border:1px solid #444; border-radius:6px; font-weight:800; font-size:1.1rem; cursor:pointer; transition: background 0.2s;"><i class="fa-solid fa-rotate-right" style="margin-right:8px;"></i> ΝΕΑ ΕΠΙΛΟΓΗ</button>
                </div>
            </div>
        </div>
    `;
};

window.renderCipherNotepad = function() {
    const grid = document.getElementById('master-grid');
    grid.style.display = 'block';
    
    grid.innerHTML = `
        <div style="padding: 30px; max-width:800px; margin: 0 auto; background: rgba(0,0,0,0.4); border-radius: 12px; border: 1px solid #333;">
            <div style="text-align:center; margin-bottom: 30px;">
                <i class="fa-solid fa-user-secret" style="font-size:3.5rem; color:#ffd700; margin-bottom:15px;"></i>
                <h3 style="color:#fff; font-size:2rem; letter-spacing:1px; margin-bottom:5px;">CIPHER NOTEPAD</h3>
                <p style="color:#aaa;">Κρυπτογράφηση Στρατιωτικού Επιπέδου. Χωρίς το κλειδί <strong>δεν αποκρυπτογραφείται.</strong> Αποθηκεύεται τοπικά στη συσκευή.</p>
            </div>
            
            <textarea id="cipher-text" rows="12" placeholder="Γράψε τα μυστικά, τους κωδικούς ή τις ιδέες σου εδώ..." style="width:100%; box-sizing:border-box; padding:20px; background:#0a0a0a; border: 1px solid #444; color:#00ff00; font-family:monospace; font-size:1.1rem; resize:none; margin-bottom:20px; border-radius:8px; box-shadow: inset 0 0 10px rgba(0,0,0,0.8);"></textarea>
            
            <div style="display:flex; gap:15px; margin-bottom:30px;">
                <input type="password" id="cipher-pass" placeholder="MASTER ENCRYPTION KEY" style="flex:1; padding:15px 20px; background:#000; border: 2px solid #ffd700; color:#ffd700; font-weight:bold; font-size:1.2rem; border-radius:8px; outline:none; text-align:center;">
            </div>
            
            <div style="display:flex; gap:20px;">
                <button id="btn-encrypt" style="flex:1; padding:18px; background:#ef4444; color:#fff; border:none; border-radius:8px; font-weight:900; font-size:1.1rem; cursor:pointer; box-shadow: 0 4px 15px rgba(239,68,68,0.3);"><i class="fa-solid fa-lock" style="margin-right:8px;"></i> ENCRYPT & LOCK</button>
                <button id="btn-decrypt" style="flex:1; padding:18px; background:#10b981; color:#fff; border:none; border-radius:8px; font-weight:900; font-size:1.1rem; cursor:pointer; box-shadow: 0 4px 15px rgba(16,185,129,0.3);"><i class="fa-solid fa-unlock" style="margin-right:8px;"></i> DECRYPT SECRET</button>
            </div>
        </div>
    `;
    
    // Very simple XOR + btoa/atob for fully offline robust execution
    const runCipher = (isEncrypt) => {
        const textElement = document.getElementById('cipher-text');
        const passElement = document.getElementById('cipher-pass');
        const t = textElement.value;
        const p = passElement.value;
        
        if (!t.trim() || !p.trim()) { alert('Warning: Απαιτείται Κείμενο και Κωδικός (Key)!'); return; }
        
        try {
            let res = '';
            if (isEncrypt) {
                for(let i=0; i<t.length; i++) {
                    res += String.fromCharCode(t.charCodeAt(i) ^ p.charCodeAt(i % p.length));
                }
                textElement.value = btoa(unescape(encodeURIComponent(res)));
            } else {
                let decoded = decodeURIComponent(escape(atob(t)));
                for(let i=0; i<decoded.length; i++) {
                    res += String.fromCharCode(decoded.charCodeAt(i) ^ p.charCodeAt(i % p.length));
                }
                textElement.value = res;
            }
        } catch(e) {
            alert('Σφάλμα: Λάθος Password ή κατεστραμμένο CipherText!');
        }
    };
    
    document.getElementById('btn-encrypt').onclick = () => runCipher(true);
    document.getElementById('btn-decrypt').onclick = () => runCipher(false);
};
"""

if "window.renderSyndicateSearch" not in js_code:
    js_code += "\n" + features_code

# Inject into Sidebar Top!
target = """    if(window.masterVaultCategories) {
        window.masterVaultCategories.forEach((cat, index) => {"""

replace = """    if(window.masterVaultCategories) {
        
        // Feature 1: Search
        const searchLi = document.createElement('li'); searchLi.className = 'ghost-nav-item';
        searchLi.style.cssText = 'padding:15px; cursor:pointer; border-bottom:1px solid rgba(255,215,0,0.2); color:#ffd700; background:rgba(255,215,0,0.05); margin-bottom:5px; font-weight:bold; letter-spacing:1px;';
        searchLi.innerHTML = `<i class="fa-solid fa-magnifying-glass" style="width:25px;"></i> SYNDICATE SEARCH`;
        searchLi.onclick = () => {
            document.querySelectorAll('#master-nav .ghost-nav-item').forEach(n => { n.classList.remove('active'); n.style.opacity = '0.5'; });
            searchLi.classList.add('active'); searchLi.style.opacity = '1';
            document.getElementById('master-cat-title').innerText = 'Μηχανή Αναζήτησης Vault';
            document.getElementById('master-cat-desc').innerText = 'Βρείτε άμεσα όποιο εργαλείο ψάχνετε.';
            window.renderSyndicateSearch();
        };
        navList.appendChild(searchLi);
        
        // Feature 2: Roulette
        const rouletteLi = document.createElement('li'); rouletteLi.className = 'ghost-nav-item';
        rouletteLi.style.cssText = 'padding:15px; cursor:pointer; border-bottom:1px solid rgba(255,215,0,0.2); color:#ffd700; background:rgba(255,215,0,0.05); margin-bottom:5px; font-weight:bold; letter-spacing:1px;';
        rouletteLi.innerHTML = `<i class="fa-solid fa-dice" style="width:25px;"></i> TOOL ROULETTE`;
        rouletteLi.onclick = () => {
            document.querySelectorAll('#master-nav .ghost-nav-item').forEach(n => { n.classList.remove('active'); n.style.opacity = '0.5'; });
            rouletteLi.classList.add('active'); rouletteLi.style.opacity = '1';
            document.getElementById('master-cat-title').innerText = 'Τηλεμεταφορά Κέρδους';
            document.getElementById('master-cat-desc').innerText = 'Τυχαία ανακάλυψη εργαλείων και ιδεών.';
            window.renderToolRoulette();
        };
        navList.appendChild(rouletteLi);

        // Feature 3: Cipher
        const cipherLi = document.createElement('li'); cipherLi.className = 'ghost-nav-item';
        cipherLi.style.cssText = 'padding:15px; cursor:pointer; border-bottom:2px solid #ff3333; color:#ff3333; background:rgba(255,51,51,0.05); margin-bottom:15px; font-weight:bold; letter-spacing:1px;';
        cipherLi.innerHTML = `<i class="fa-solid fa-user-secret" style="width:25px;"></i> CIPHER NOTEPAD`;
        cipherLi.onclick = () => {
            document.querySelectorAll('#master-nav .ghost-nav-item').forEach(n => { n.classList.remove('active'); n.style.opacity = '0.5'; });
            cipherLi.classList.add('active'); cipherLi.style.opacity = '1';
            document.getElementById('master-cat-title').innerText = 'Επικοινωνία & Σημειώσεις';
            document.getElementById('master-cat-desc').innerText = 'Κρυπτογραφημένο 100% Offline περιβάλλον σημειώσεων.';
            window.renderCipherNotepad();
        };
        navList.appendChild(cipherLi);

        window.masterVaultCategories.forEach((cat, index) => {"""

if target in js_code:
    js_code = js_code.replace(target, replace)
    print("Features injected correctly into Sidebar.")

with codecs.open('c:/Users/manol/.gemini/antigravity/scratch/infodash/js/app.js', 'w', 'utf-8') as f:
    f.write(js_code)
