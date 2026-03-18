import codecs
import re

print("Starting refactor 2 (Master Vault Integration)...")

js_logic = """
// =========================================================================
// MASTER VAULT LOGIC (The Wealth Syndicate)
// =========================================================================

function initMasterVault() {
    const loginOverlay = document.getElementById('master-vault-login');
    const passField = document.getElementById('master-pass');
    const submitBtn = document.getElementById('master-submit');
    const errorMsg = document.getElementById('master-error');
    const vaultContainer = document.getElementById('master-vault');
    const exitBtn = document.getElementById('master-exit');
    const navList = document.getElementById('master-nav');
    const catTitle = document.getElementById('master-cat-title');
    const catDesc = document.getElementById('master-cat-desc');
    const grid = document.getElementById('master-grid');

    const MASTER_PIN = "16581"; // Target PIN

    if(window.masterVaultCategories) {
        window.masterVaultCategories.forEach((cat, index) => {
            const li = document.createElement('li');
            li.className = 'ghost-nav-item' + (index === 0 ? ' active' : '');
            li.style.cssText = 'padding: 15px; cursor:pointer; border-bottom: 1px solid rgba(255,215,0,0.1); color: #ccc; transition: all 0.2s;';
            li.setAttribute('data-target', cat.id);
            li.innerHTML = `<i class="${cat.icon}" style="width: 25px; color:#ffd700;"></i> ${cat.title}`;
            
            li.onmouseover = () => li.style.background = 'rgba(255,215,0,0.1)';
            li.onmouseout = () => { if(!li.classList.contains('active')) li.style.background = 'transparent'; };

            li.addEventListener('click', () => {
                document.querySelectorAll('#master-nav .ghost-nav-item').forEach(n => {
                    n.classList.remove('active');
                    n.style.background = 'transparent';
                    n.style.color = '#ccc';
                    n.style.fontWeight = 'normal';
                });
                li.classList.add('active');
                li.style.background = 'rgba(255,215,0,0.15)';
                li.style.color = '#ffd700';
                li.style.fontWeight = 'bold';
                
                catTitle.innerText = cat.title;
                catDesc.innerText = cat.desc;
                loadMasterCategory(cat.id);
            });
            navList.appendChild(li);
        });
    }

    const attemptLogin = () => {
        if (passField.value === MASTER_PIN) {
            loginOverlay.classList.add('hidden');
            vaultContainer.classList.remove('hidden');
            passField.value = '';
            
            const first = document.querySelector('#master-nav .ghost-nav-item');
            if(first) first.click();
            
            initMasterClock();
        } else {
            errorMsg.classList.remove('hidden');
            setTimeout(() => errorMsg.classList.add('hidden'), 3000);
        }
    };

    if(submitBtn) submitBtn.addEventListener('click', attemptLogin);
    if(passField) passField.addEventListener('keypress', (e) => { if (e.key === 'Enter') attemptLogin(); });

    if(exitBtn) exitBtn.addEventListener('click', () => {
        vaultContainer.classList.add('hidden');
    });

    // Secret Trigger: Alt + M
    document.addEventListener('keydown', (e) => {
        if (e.altKey && e.key.toLowerCase() === 'm') {
            if(loginOverlay) loginOverlay.classList.remove('hidden');
            if(passField) passField.focus();
            e.preventDefault();
        }
    });
}

function loadMasterCategory(categoryId) {
    const grid = document.getElementById('master-grid');
    if (!grid) return;
    
    grid.innerHTML = '<div class="loader-glass" style="color:#ffd700; border-color:#ffd700; grid-column: 1 / -1; text-align:center; padding: 50px;">DECRYPTING DATABASE...</div>';
    
    setTimeout(() => {
        const tools = window.getSecretVaultData ? window.getSecretVaultData(categoryId) : [];
        if(tools.length === 0) {
            grid.innerHTML = '<div style="color:red; text-align:center; grid-column: 1 / -1; padding: 50px;">NO DATA ACCESSIBLE</div>';
            return;
        }

        grid.innerHTML = '';
        tools.forEach(t => {
            grid.innerHTML += `
                <div class="ghost-card" style="border-top: 3px solid #ffd700; background: rgba(20,20,20,0.8); padding: 20px; border-radius: 8px; transition: transform 0.2s; box-shadow: 0 4px 15px rgba(0,0,0,0.5);">
                    <div class="ghost-card-header" style="color:#ffd700; display:flex; align-items:center; gap: 10px; margin-bottom: 15px;">
                        <i class="${t.icon}" style="font-size: 1.5rem;"></i>
                        <h4 style="font-size: 1.15rem; margin:0;">${t.title}</h4>
                    </div>
                    <p style="font-size: 0.95rem; color:#ccc; line-height: 1.4; margin-bottom: 20px; min-height: 60px;">${t.desc}</p>
                    <a href="${t.url}" target="_blank" class="ghost-card-link" style="color:#000; background: #ffd700; font-weight:bold; text-decoration:none; padding:10px 15px; display:inline-block; border-radius:5px; transition: background 0.2s; width: 100%; text-align:center;">
                        LAUNCH TOOL <i class="fa-solid fa-arrow-right" style="margin-left:5px;"></i>
                    </a>
                </div>
            `;
        });
    }, 400); 
}

let masterClockInterval = null;
function initMasterClock() {
    const clock = document.getElementById('master-clock');
    if (!clock) return;
    if (masterClockInterval) clearInterval(masterClockInterval);
    masterClockInterval = setInterval(() => {
        const now = new Date();
        clock.innerText = now.toLocaleTimeString('en-GB');
    }, 1000);
}
"""

with codecs.open('c:/Users/manol/.gemini/antigravity/scratch/infodash/js/app.js', 'r', 'utf-8') as f:
    app_content = f.read()

# Make sure not to duplicate
if "initMasterVault()" not in app_content:
    app_content += "\n" + js_logic
    app_content = re.sub(r'initMyHub\(\);', 'initMyHub();\n    initMasterVault();', app_content)
    with codecs.open('c:/Users/manol/.gemini/antigravity/scratch/infodash/js/app.js', 'w', 'utf-8') as f:
        f.write(app_content)
    print("app.js logic integrated.")

html_overlay = """
    <!-- MASTER VAULT OVERLAY -->
    <div id="master-vault-login" class="hidden" style="background: rgba(0,0,0,0.95); z-index: 10000; position:fixed; top:0;left:0;width:100%;height:100%; display:flex; align-items:center; justify-content:center;">
        <div style="border: 2px solid #ffd700; background: rgba(10,10,10,0.95); padding: 40px; border-radius: 12px; text-align: center; max-width: 400px; width: 90%; box-shadow: 0 0 30px rgba(255,215,0,0.2);">
            <i class="fa-solid fa-crown" style="font-size: 3rem; color: #ffd700; margin-bottom: 20px;"></i>
            <h2 style="color: #ffd700; margin-bottom: 20px; font-family: 'Outfit', sans-serif; letter-spacing: 2px;">THE SYNDICATE</h2>
            <div style="height: 2px; background: #ffd700; width: 100%; margin-bottom: 20px; opacity: 0.5;"></div>
            <p style="color: #aaa; font-size: 0.9rem; margin-bottom: 20px;">Restricted Access Protocol</p>
            <input type="password" id="master-pass" placeholder="ENTER 5-DIGIT PIN" style="border: 1px solid #ffd700; background: #000; color: #ffd700; padding: 15px; width: 100%; text-align: center; margin-bottom: 20px; outline:none; font-family:monospace; font-size:1.2rem; border-radius:6px; box-sizing: border-box;" autocomplete="off">
            <button id="master-submit" style="color: #000; background: #ffd700; border: none; padding: 15px; font-weight: 800; cursor: pointer; width: 100%; border-radius:6px; font-size:1.1rem; transition: transform 0.1s;">DECRYPT & ENTER</button>
            <p id="master-error" class="hidden" style="color: #ff3333; margin-top: 15px; font-family: monospace;">ACCESS DENIED: INVALID SECURITY PIN</p>
        </div>
    </div>

    <!-- MASTER VAULT MAIN INTERFACE -->
    <div id="master-vault" class="hidden" style="background: rgba(10,10,10,0.98); z-index: 9999; position:fixed; top:0;left:0;width:100%;height:100%; display:flex; font-family: 'Outfit', sans-serif;">
        <div style="border-right: 1px solid rgba(255,215,0,0.3); width: 320px; display:flex; flex-direction:column; background: linear-gradient(180deg, rgba(20,20,20,1) 0%, rgba(5,5,5,1) 100%);">
            <div style="color: #ffd700; font-size: 1.3rem; font-weight:800; padding: 25px 20px; border-bottom: 1px solid rgba(255,215,0,0.2); letter-spacing: 1px;">
                <i class="fa-solid fa-crown" style="margin-right:8px;"></i> <span>WEALTH SYNDICATE</span>
            </div>
            <div style="flex:1; overflow-y:auto; overflow-x:hidden; background: rgba(0,0,0,0.2);">
                <ul id="master-nav" style="list-style:none; padding:0; margin:0;">
                    <!-- Nav items injected via JS -->
                </ul>
            </div>
            <div style="padding: 15px; border-top: 1px solid rgba(255,215,0,0.2);">
                <button id="master-exit" style="color:#000; background:#ffd700; border: none; padding: 15px; width:100%; font-weight:bold; cursor:pointer; border-radius:6px; font-size:1rem;">EXIT SYNDICATE TERMINAL</button>
            </div>
        </div>
        
        <div style="flex:1; display:flex; flex-direction:column; padding: 40px; overflow-y:auto; background: radial-gradient(circle at center, rgba(30,30,30,1) 0%, rgba(10,10,10,1) 100%);">
            <div style="border-bottom: 1px solid rgba(255,215,0,0.3); padding-bottom: 20px; display:flex; justify-content:space-between; align-items:center;">
                <div>
                    <h3 style="color:#ffd700; margin:0; font-size: 1.5rem; letter-spacing: 2px;">SECURE CONNECTION ESTABLISHED</h3>
                    <p style="color: #6c757d; margin: 5px 0 0 0; font-size: 0.9rem;">TOP 2% EXCLUSIVE TOOLS SUITE</p>
                </div>
                <div id="master-clock" style="color:#ffd700; font-family:monospace; font-size: 1.5rem; padding: 10px 20px; background: rgba(255,215,0,0.05); border-radius: 8px; border: 1px solid rgba(255,215,0,0.2);">00:00:00</div>
            </div>
            
            <div style="margin-top: 40px;">
                <h2 id="master-cat-title" style="color:#ffd700; font-size: 2.2rem; margin-bottom: 15px; font-weight:800;">Category</h2>
                <p id="master-cat-desc" style="color:#aaa; margin-bottom: 40px; font-size:1.15rem; max-width: 800px; line-height: 1.6;">Desc</p>
                <div id="master-grid" style="display:grid; grid-template-columns: repeat(auto-fill, minmax(320px, 1fr)); gap: 25px;"></div>
            </div>
        </div>
    </div>
"""

with codecs.open('c:/Users/manol/.gemini/antigravity/scratch/infodash/index.html', 'r', 'utf-8') as f:
    html_content = f.read()

if "master-vault-login" not in html_content:
    html_content = html_content.replace('<script src="./js/api.js"></script>', 
        html_overlay + '\n    <script src="./js/secret-data.js"></script>\n    <script src="./js/api.js"></script>')
    with codecs.open('c:/Users/manol/.gemini/antigravity/scratch/infodash/index.html', 'w', 'utf-8') as f:
        f.write(html_content)
    print("index.html HTML integrated.")

print("Done.")
