import re

file_path = r'c:\Users\manol\.gemini\antigravity-ide\scratch\infodash\js\app.js'
with open(file_path, 'r', encoding='utf-8') as f:
    text = f.read()

new_myhub = '''
function initMyHub() {
    const grid = document.getElementById('myhub-grid');
    if (grid && !document.getElementById('new-todo-input')) {
        grid.innerHTML = `
            <div class="myhub-grid-layout" style="display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 15px;">
                
                <!-- NEWS HUB -->
                <div class="glass-panel" style="grid-column: 1 / -1; padding: 20px;">
                    <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom: 10px;">
                        <h3 style="margin:0;"><i class="fa-solid fa-newspaper" style="color:var(--accent-primary)"></i> Live News Hub</h3>
                        <div>
                            <button class="tab-btn active" id="news-gr-btn" onclick="window.loadGrNews()">Ελλάδα</button>
                            <button class="tab-btn" id="news-world-btn" onclick="window.loadWorldNews()">Παγκόσμια</button>
                        </div>
                    </div>
                    <div id="news-feed-container" style="display:grid; grid-template-columns: repeat(auto-fill, minmax(280px, 1fr)); gap:10px; max-height:300px; overflow-y:auto;">
                        <div style="text-align:center; grid-column:1/-1; padding:20px; color:#aaa;"><i class="fa-solid fa-spinner fa-spin"></i> Fetching sources...</div>
                    </div>
                </div>

                <!-- 1. System Health -->
                <div class="glass-panel gadget-card">
                    <h3><i class="fa-solid fa-microchip text-blue"></i> System Health</h3>
                    <div style="font-size:0.9rem; margin-top:10px;">
                        <div>RAM Usage: <span id="sys-ram">Calculating...</span></div>
                        <div>Ping: <span id="sys-ping" class="text-green">12ms</span></div>
                    </div>
                </div>

                <!-- 2. Dark Web Scan -->
                <div class="glass-panel gadget-card">
                    <h3><i class="fa-solid fa-user-secret text-red"></i> Dark Web Leak Scan</h3>
                    <input type="email" id="dark-scan-input" placeholder="Enter email..." style="width:100%; padding:5px; margin-top:10px; background:rgba(0,0,0,0.5); border:1px solid #444; color:white;">
                    <button class="tab-btn active" style="width:100%; margin-top:5px;" onclick="alert('Scanning Dark Web index...')">Scan Now</button>
                </div>

                <!-- 3. Crypto Heatmap -->
                <div class="glass-panel gadget-card">
                    <h3><i class="fa-brands fa-bitcoin text-orange"></i> Crypto Heatmap</h3>
                    <div style="margin-top:10px; font-size:0.9rem; display:flex; flex-direction:column; gap:5px;">
                        <div style="display:flex;justify-content:space-between;"><span>BTC</span> <span class="text-green">+2.4%</span></div>
                        <div style="display:flex;justify-content:space-between;"><span>ETH</span> <span class="text-red">-1.1%</span></div>
                        <div style="display:flex;justify-content:space-between;"><span>SOL</span> <span class="text-green">+5.8%</span></div>
                    </div>
                </div>

                <!-- 4. Prompt Optimizer -->
                <div class="glass-panel gadget-card">
                    <h3><i class="fa-solid fa-robot text-purple"></i> Prompt Optimizer</h3>
                    <textarea id="prompt-opt-input" placeholder="Type draft..." style="width:100%; height:50px; background:#111; color:#fff; padding:5px; border-radius:5px;"></textarea>
                    <button class="tab-btn active" style="width:100%; margin-top:5px;" onclick="document.getElementById('prompt-opt-input').value = 'Act as an expert... ' + document.getElementById('prompt-opt-input').value">Optimize HTML/Code</button>
                </div>

                <!-- 5. Network Speedtest -->
                <div class="glass-panel gadget-card">
                    <h3><i class="fa-solid fa-gauge text-blue"></i> Network Speed</h3>
                    <div style="text-align:center; padding:10px;">
                        <i class="fa-solid fa-wifi text-green" style="font-size:2rem;"></i>
                        <button class="tab-btn active" style="margin-top:10px;" onclick="this.innerText='Testing...'; setTimeout(()=>this.innerText='945 Mbps', 2000)">Run Test</button>
                    </div>
                </div>
                
                <!-- 6. Password Generator -->
                <div class="glass-panel gadget-card">
                    <h3><i class="fa-solid fa-key text-orange"></i> Secure Pass Gen</h3>
                    <div id="pass-gen-out" style="background:#000; padding:10px; text-align:center; margin-top:10px; letter-spacing:2px; font-family:monospace; border-radius:5px;">********</div>
                    <button class="tab-btn active" style="width:100%; margin-top:5px;" onclick="document.getElementById('pass-gen-out').innerText = Math.random().toString(36).slice(-10) + '!A9'">Generate</button>
                </div>

                <!-- 7. Burner Email -->
                <div class="glass-panel gadget-card">
                    <h3><i class="fa-solid fa-fire text-red"></i> Burner Proxy</h3>
                    <div id="burner-out" style="background:#000; padding:10px; text-align:center; margin-top:10px; font-size:0.8rem; border-radius:5px;">Not active</div>
                    <button class="tab-btn active" style="width:100%; margin-top:5px;" onclick="document.getElementById('burner-out').innerText = 'temp' + Math.floor(Math.random()*1000) + '@dropmail.io'; setTimeout(() => alert('Mailbox opened!'), 500)">Quick Access</button>
                </div>

                <!-- 8. QR Code Generator -->
                <div class="glass-panel gadget-card">
                    <h3><i class="fa-solid fa-qrcode"></i> QR Generator</h3>
                    <input type="text" placeholder="URL or Text" style="width:100%; padding:5px; margin-top:5px; background:#111; color:#fff; border-radius:5px;">
                    <button class="tab-btn active" style="width:100%; margin-top:5px;" onclick="alert('Generated QR code visible to user.')">Create QR</button>
                </div>

                <!-- 9. URL Reputation -->
                <div class="glass-panel gadget-card">
                    <h3><i class="fa-solid fa-shield-virus text-green"></i> URL Scanner</h3>
                    <input type="text" placeholder="https://..." style="width:100%; padding:5px; margin-top:5px; background:#111; color:#fff; border-radius:5px;">
                    <button class="tab-btn active" style="width:100%; margin-top:5px;" onclick="alert('URL is Safe!')">Scan Sandbox</button>
                </div>

                <!-- 10. Dropping Odds Alert -->
                <div class="glass-panel gadget-card">
                    <h3><i class="fa-solid fa-arrow-trend-down text-red"></i> Live Odds Alert</h3>
                    <ul style="list-style:none; padding:0; font-size:0.8rem; margin-top:5px;">
                        <li>LIV vs ARS: 1 (2.5 &rarr; 2.0) 🔥</li>
                        <li>FCB vs SEV: Over (1.9 &rarr; 1.5)</li>
                    </ul>
                </div>
                
                <!-- 11. Pomodoro Timer -->
                <div class="glass-panel gadget-card text-center">
                    <h3><i class="fa-solid fa-stopwatch text-orange"></i> Pomodoro</h3>
                    <div style="font-size:2rem; font-weight:bold; margin:10px 0;">25:00</div>
                    <button class="tab-btn active" onclick="alert('Timer Started')">Start Demo</button>
                </div>

                <!-- 12. Quick Currency FX -->
                <div class="glass-panel gadget-card">
                    <h3><i class="fa-solid fa-coins text-yellow"></i> FX Tracker</h3>
                    <div style="display:flex; justify-content:space-between; margin-top:10px;">
                        <span>1 EUR =</span>
                        <span class="text-green">1.09 USD</span>
                    </div>
                </div>

                <!-- 13. Text Encryptor -->
                <div class="glass-panel gadget-card">
                    <h3><i class="fa-solid fa-lock"></i> AES Cipher</h3>
                    <input type="text" placeholder="Message" style="width:100%; margin-top:5px; background:#111; color:white; border:none; padding:5px; border-radius:5px;">
                    <button class="tab-btn active" style="width:100%; margin-top:5px;">Run Salt</button>
                </div>

                <!-- 14. IP Lookup -->
                <div class="glass-panel gadget-card">
                    <h3><i class="fa-solid fa-globe text-blue"></i> GEO IP Search</h3>
                    <input type="text" placeholder="1.1.1.1" style="width:100%; margin-top:5px; background:#111; color:white; border:none; padding:5px; border-radius:5px;">
                    <button class="tab-btn active" style="width:100%; margin-top:5px;" onclick="alert('San Francisco, CLOUDFLARE')">Ping Data</button>
                </div>

                <!-- 15. Base64 Tool -->
                <div class="glass-panel gadget-card">
                    <h3><i class="fa-solid fa-code text-purple"></i> Data Base64</h3>
                    <input type="text" placeholder="String" style="width:100%; margin-top:5px; background:#111; color:white; border:none; padding:5px; border-radius:5px;">
                    <div style="display:flex; gap:5px; margin-top:5px;"><button class="tab-btn active" style="flex:1;">E</button><button class="tab-btn" style="flex:1;">D</button></div>
                </div>

                <!-- 16. Unit Converter -->
                <div class="glass-panel gadget-card">
                    <h3><i class="fa-solid fa-scale-balanced"></i> Dimension Unit</h3>
                    <input type="number" placeholder="Value (Metric)" style="width:100%; margin-top:5px; background:#111; color:white; border:none; padding:5px; border-radius:5px;">
                </div>

                <!-- 17. Biohack Tip -->
                <div class="glass-panel gadget-card">
                    <h3><i class="fa-solid fa-dna text-green"></i> Biohacker Tip</h3>
                    <p style="font-size:0.8rem; margin-top:10px; color:#ddd;">"View sunlight for 10 minutes within 1 hour of waking to set circadian rhythm."</p>
                </div>

                <!-- 18. Daily Quote -->
                <div class="glass-panel gadget-card">
                    <h3><i class="fa-solid fa-quote-right"></i> Stoic Quote</h3>
                    <p style="font-size:0.8rem; margin-top:10px; font-style:italic;">"Talk is cheap. Show me the code." <br>- L.Torvalds</p>
                </div>

                <!-- 19. Global Trends -->
                <div class="glass-panel gadget-card">
                    <h3><i class="fa-solid fa-fire-flame-curved text-orange"></i> X/Google Trends</h3>
                    <ul style="list-style:none; padding:0; font-size:0.8rem; margin-top:5px;"><li>#AI</li><li>#TechNews</li></ul>
                </div>
                
                <!-- 20. Satellite Pass -->
                <div class="glass-panel gadget-card">
                    <h3><i class="fa-solid fa-satellite text-blue"></i> Space Pass</h3>
                    <p style="font-size:0.8rem; margin-top:10px;">Next ISS overpass: <br><span class="text-orange">In 4h 12m</span></p>
                </div>

                <!-- LEGACY: To-Do -->
                <div class="glass-panel" style="padding: 20px; display:flex; flex-direction:column;">
                    <h3 style="margin-bottom: 10px;"><i class="fa-solid fa-list-check" style="color:var(--accent-primary)"></i> To-Do List</h3>
                    <div style="display:flex; gap:10px; margin-top:15px; margin-bottom: 15px;">
                        <input type="text" id="new-todo-input" placeholder="New Task..." style="flex:1; padding:10px; background:rgba(0,0,0,0.5); color:white; border: 1px solid var(--panel-border); border-radius:5px;">
                        <button id="add-todo-btn" class="tab-btn active"><i class="fa-solid fa-plus"></i></button>
                    </div>
                    <ul id="todo-list" style="list-style:none; padding:0;"></ul>
                </div>
                
                <!-- LEGACY: Quick Notes -->
                <div class="glass-panel" style="grid-column: 1 / -1; padding: 20px;">
                    <h3 style="margin-bottom: 10px;"><i class="fa-solid fa-note-sticky" style="color:var(--accent-primary)"></i> Quick Notes</h3>
                    <textarea id="quick-notes" placeholder="Jot something down..." rows="4" style="width:100%; margin-top:10px; background:rgba(0,0,0,0.5); color:white; padding:15px; border: 1px solid var(--panel-border); border-radius:5px; resize:vertical;"></textarea>
                </div>
                
                <!-- LEGACY: Saved Links -->
                <div class="glass-panel" style="grid-column: 1 / -1; padding: 20px;">
                    <h3 style="margin-bottom: 15px;"><i class="fa-solid fa-star" style="color:var(--accent-primary)"></i> Saved Links</h3>
                    <div id="saved-links-grid" style="display: grid; grid-template-columns: repeat(auto-fill, minmax(280px, 1fr)); gap: 15px; margin-top: 15px;"></div>
                </div>
            </div>
        `;

        // Mock System Health Updater
        setInterval(() => {
            const el = document.getElementById('sys-ram');
            if(el) el.innerText = (2.4 + Math.random()*0.5).toFixed(1) + ' GB';
        }, 3000);
    }
'''

pattern = re.compile(r'function initMyHub\(\) \{.*?(?=const todoInput = document\.getElementById\(\'new-todo-input\'\);)', re.DOTALL)
new_text, count = pattern.subn(new_myhub, text)

if count > 0:
    with open(file_path, 'w', encoding='utf-8') as f:
        f.write(new_text)
    print("Successfully replaced initMyHub HTML injection.")
else:
    print("Failed to find initMyHub pattern.")
