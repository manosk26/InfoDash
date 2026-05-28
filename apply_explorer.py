import codecs

print("Refactoring app.js to include Vault Explorer...")

with codecs.open('c:/Users/manol/.gemini/antigravity-ide/scratch/infodash/js/app.js', 'r', 'utf-8') as f:
    js_code = f.read()

# 1. Inject Vault Explorer Button in Sidebar
target1 = """    if(window.masterVaultCategories) {
        window.masterVaultCategories.forEach((cat, index) => {"""
replace1 = """    if(window.masterVaultCategories) {
        // --- PREPEND EXPLORER TAB ---
        const explorerLi = document.createElement('li');
        explorerLi.className = 'ghost-nav-item';
        explorerLi.style.cssText = 'padding: 15px; cursor:pointer; border-bottom: 2px solid #ff3333; color: #ff3333; transition: all 0.2s; background: rgba(255,51,51,0.05); margin-bottom: 10px; font-weight:bold; letter-spacing:1px;';
        explorerLi.innerHTML = `<i class=\"fa-solid fa-folder-tree\" style=\"width: 25px;\"></i> VAULT EXPLORER`;
        explorerLi.onclick = () => {
            document.querySelectorAll('#master-nav .ghost-nav-item').forEach(n => {
                n.classList.remove('active');
                if (n !== explorerLi) { n.style.background = 'transparent'; n.style.color = '#ccc'; n.style.fontWeight = 'normal'; }
            });
            explorerLi.classList.add('active');
            explorerLi.style.fontWeight = 'bold';
            document.getElementById('master-cat-title').innerText = 'Local Vault Explorer';
            document.getElementById('master-cat-desc').innerHTML = 'Οργανώστε & δείτε αρχεία του υπολογιστή σας <strong>100% ιδιωτικά μέσα από τον browser</strong>, χωρίς καθόλου ίντερνετ!';
            if(window.initVaultExplorer) window.initVaultExplorer();
        };
        navList.appendChild(explorerLi);

        window.masterVaultCategories.forEach((cat, index) => {"""

if target1 in js_code:
    js_code = js_code.replace(target1, replace1)

# 2. Reset display in loadMasterCategory
target2 = """function loadMasterCategory(categoryId) {
    const grid = document.getElementById('master-grid');
    if (!grid) return;
    
    grid.innerHTML = '<div class="loader-glass" """
replace2 = """function loadMasterCategory(categoryId) {
    const grid = document.getElementById('master-grid');
    if (!grid) return;
    
    grid.style.display = 'grid'; // reset
    grid.innerHTML = '<div class="loader-glass" """

if target2 in js_code:
    js_code = js_code.replace(target2, replace2)

# 3. Append logic if not present
vault_explorer_code = """
// =========================================================================
// VAULT EXPLORER LOGIC (File System Access API)
// =========================================================================

window.initVaultExplorer = async function() {
    const grid = document.getElementById('master-grid');
    if (!grid) return;
    
    // reset to block so the div layout works nicely
    grid.style.display = 'block';
    grid.innerHTML = `
        <div style="text-align:center; padding: 40px; background: rgba(255,255,255,0.02); border-radius: 12px; border: 1px dashed rgba(255,51,51,0.5);">
            <i class="fa-solid fa-unlock-keyhole" style="font-size: 4rem; color:#ff3333; margin-bottom: 20px;"></i>
            <h3 style="color:#fff; margin-bottom: 10px; font-family:'Outfit', sans-serif; font-size:1.8rem; letter-spacing:1px;">ΕΝΕΡΓΟΠΟΙΗΣΗ ΤΟΠΙΚΗΣ ΠΡΟΣΒΑΣΗΣ</h3>
            <p style="color:#aaa; margin-bottom: 30px; line-height:1.6; font-size:1.1rem; max-width:600px; margin-left:auto; margin-right:auto;">Διαλέξτε τον φάκελο (π.χ. Έγγραφα ή Σκληρός Δίσκος) που θέλετε να προβάλετε <strong>Απόλυτα Ιδιωτικά</strong>.<br/><br/><i class="fa-solid fa-shield-halved" style="color:#ff3333;"></i> Δεν γίνεται ΚΑΝΕΝΑ upload, τα αρχεία μένουν 100% αυστηρά στον υπολογιστή σας.</p>
            <button id="btn-vault-open" style="padding: 18px 40px; background: #ff3333; color: #fff; border: none; font-weight:800; border-radius:8px; cursor:pointer; font-size:1.2rem; transition: transform 0.2s; box-shadow: 0 4px 20px rgba(255,51,51,0.4);">
                <i class="fa-solid fa-folder-plus" style="margin-right:8px;"></i> ΕΠΙΛΟΓΗ ΦΑΚΕΛΟΥ ΥΠΟΛΟΓΙΣΤΗ
            </button>
        </div>
        <div id="vault-explorer-view" style="display:none; margin-top:30px;">
            <div style="display:flex; justify-content:space-between; align-items:center; border-bottom: 1px solid rgba(255,51,51,0.2); padding-bottom:15px; margin-bottom: 25px;">
                <span id="vault-path" style="color:#ff3333; font-family:monospace; font-size: 1.2rem; word-break:break-all;">/</span>
                <span style="color:#666; font-size: 0.85rem; font-style:italic;">*Για να βγείτε και να επιλέξετε άλλο φάκελο, ξαναπατήστε την κατηγορία αριστερά.*</span>
            </div>
            <div id="vault-files-grid" style="display:grid; grid-template-columns: repeat(auto-fill, minmax(130px, 1fr)); gap: 20px;"></div>
        </div>
    `;

    const openBtn = document.getElementById('btn-vault-open');
    if(openBtn) {
        openBtn.onclick = async () => {
            try {
                if (!window.showDirectoryPicker) {
                    alert('Η περιήγηση φακέλων απαιτεί Google Chrome, Edge, ή Opera (Desktop PC).');
                    return;
                }
                const dirHandle = await window.showDirectoryPicker();
                openBtn.parentElement.style.display = 'none';
                document.getElementById('vault-explorer-view').style.display = 'block';
                await window.loadVaultDirectory(dirHandle, dirHandle.name);
            } catch (err) {
                console.error('File Picker Cancelled:', err);
            }
        };
    }
}

window.loadVaultDirectory = async function(dirHandle, pathName) {
    const pathEl = document.getElementById('vault-path');
    if(pathEl) pathEl.innerText = '/' + pathName;
    
    const filesGrid = document.getElementById('vault-files-grid');
    if(!filesGrid) return;
    
    filesGrid.innerHTML = '<div style="color:#ccc; grid-column: 1/-1; text-align:center;"><i class="fa-solid fa-spinner fa-spin" style="margin-right:10px;"></i> Φόρτωση Περιεχομένων Δίσκου...</div>';
    
    const entries = [];
    try {
        for await (const entry of dirHandle.values()) {
            entries.push(entry);
        }
    } catch(e) {
        filesGrid.innerHTML = '<div style="color:#ff3333; grid-column: 1/-1; text-align:center;"><i class="fa-solid fa-triangle-exclamation" style="font-size:2rem; display:block; margin-bottom:10px;"></i><strong>[ACCESS DENIED]</strong><br/>Απέρριψες την άδεια ανάγνωσης / Read Permission.</div>';
        return;
    }

    entries.sort((a,b) => {
        if(a.kind === b.kind) return a.name.localeCompare(b.name);
        return a.kind === 'directory' ? -1 : 1;
    });

    filesGrid.innerHTML = '';
    if(entries.length === 0) {
       filesGrid.innerHTML = '<div style="color:#555; grid-column: 1/-1; text-align:center;">Ο φάκελος είναι άδειος.</div>';
    }
    
    entries.forEach(entry => {
        const div = document.createElement('div');
        div.style.cssText = 'text-align:center; padding: 20px 10px; background: rgba(0,0,0,0.5); border-radius: 8px; cursor:pointer; border: 1px solid rgba(255,255,255,0.05); transition: all 0.2s;';
        div.onmouseover = () => { div.style.background = 'rgba(255,51,51,0.1)'; div.style.borderColor = '#ff3333'; div.style.transform = 'translateY(-3px)'; };
        div.onmouseout = () => { div.style.background = 'rgba(0,0,0,0.5)'; div.style.borderColor = 'rgba(255,255,255,0.05)'; div.style.transform = 'translateY(0)'; };
        
        let icon = 'fa-file';
        let color = '#ccc';
        if(entry.kind === 'directory') {
            icon = 'fa-folder'; color = '#ffd700';
        } else {
            const ext = entry.name.split('.').pop().toLowerCase();
            if(['png','jpg','jpeg','gif','webp','svg'].includes(ext)) { icon = 'fa-image'; color = '#00a8ff'; }
            else if(['pdf'].includes(ext)) { icon = 'fa-file-pdf'; color = '#e84118'; }
            else if(['doc','docx','txt','rtf','md'].includes(ext)) { icon = 'fa-file-word'; color = '#0097e6'; }
            else if(['xls','xlsx','csv'].includes(ext)) { icon = 'fa-file-excel'; color = '#44bd32'; }
            else if(['mp4','mkv','avi','mov'].includes(ext)) { icon = 'fa-film'; color = '#9c88ff'; }
            else if(['mp3','wav','aac'].includes(ext)) { icon = 'fa-music'; color = '#fbc531'; }
            else if(['zip','rar','7z','tar'].includes(ext)) { icon = 'fa-file-zipper'; color = '#B53471'; }
            else if(['exe','bat','sh'].includes(ext)) { icon = 'fa-rocket'; color = '#10ac84'; }
            else if(['html','css','js','py','json'].includes(ext)) { icon = 'fa-code'; color = '#ee5253'; }
        }

        div.innerHTML = `
            <i class="fa-solid ${icon}" style="font-size: 3.5rem; color: ${color}; margin-bottom: 15px; display:block;"></i>
            <div style="color:#ddd; font-size:0.85rem; word-break:break-all; text-overflow:ellipsis; overflow:hidden; display:-webkit-box; -webkit-line-clamp:2; -webkit-box-orient:vertical;" title="${entry.name}">${entry.name}</div>
        `;
        
        div.onclick = async () => {
            if(entry.kind === 'directory') {
                await window.loadVaultDirectory(entry, pathName + '/' + entry.name);
            } else {
                try {
                    const file = await entry.getFile();
                    if(file.type.startsWith('image/') || file.type.startsWith('text/') || file.type === 'application/pdf' || file.type.startsWith('video/') || file.type.startsWith('audio/')) {
                        const url = URL.createObjectURL(file);
                        const win = window.open(url, '_blank');
                        if (!win) alert('Pop-ups are blocked. Please allow them to view files inline.');
                    } else {
                        // Standard download/open dialog prompt if unknown file type
                        alert(`Αρχείο: ${file.name}\\nΜέγεθος: ${(file.size/1024/1024).toFixed(2)} MB\\n\\n(Χρησιμοποιήστε ένα εξειδικευμένο online εργαλείο από το μενού αριστερά για επεξεργασία αυτού του τύπου αρχείου.)`);
                    }
                }catch(e) { console.error('Error opening file:', e); }
            }
        };
        
        filesGrid.appendChild(div);
    });
};
"""

if "initVaultExplorer" not in js_code:
    js_code += "\n" + vault_explorer_code

with codecs.open('c:/Users/manol/.gemini/antigravity-ide/scratch/infodash/js/app.js', 'w', 'utf-8') as f:
    f.write(js_code)

print("Done refactoring app.js!")
