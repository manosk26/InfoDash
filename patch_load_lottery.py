import re

app_path = r'c:\Users\manol\.gemini\antigravity-ide\scratch\infodash\js\app.js'
with open(app_path, 'r', encoding='utf-8') as f:
    app_text = f.read()

lottery_script = '''
async function loadLottery(game = 'joker') {
    const content = document.getElementById('lottery-engine-content');
    const loader = document.getElementById('lottery-loader');
    const viewContainer = document.getElementById('lottery-view-container');
    const navButtons = document.querySelectorAll('.lottery-sub-tabs button');
    
    if (!content || !loader || !viewContainer) return;
    
    loader.classList.remove('hidden');
    viewContainer.style.opacity = 0;
    
    // Activate nav setup
    navButtons.forEach(btn => {
        btn.onclick = () => {
            navButtons.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            renderLotteryCategory(btn.dataset.cat);
        };
    });
    
    try {
        if (!window.LotteryEngine) {
            console.error("LotteryEngine not found");
            return;
        }
        await window.LotteryEngine.fetchData(game);
        
        loader.classList.add('hidden');
        viewContainer.style.opacity = 1;
        
        // Render current active tab
        const activeTab = document.querySelector('.lottery-sub-tabs button.active');
        if (activeTab) renderLotteryCategory(activeTab.dataset.cat);
        else renderLotteryCategory('latest');
        
    } catch (e) {
        console.error("Lottery rendering error", e);
        loader.classList.add('hidden');
        viewContainer.innerHTML = '<div class="text-red" style="text-align:center;">Σφάλμα σύνδεσης με OPAP API. Παρακαλώ δοκιμάστε αργότερα.</div>';
        viewContainer.style.opacity = 1;
    }
}

function renderLotteryCategory(cat) {
    const container = document.getElementById('lottery-view-container');
    if (!container || !window.LotteryEngine) return;
    
    let html = '';
    const eng = window.LotteryEngine;
    
    const drawBall = (n, isBonus=false) => `<div class="number-ball ${isBonus?'joker-bonus':''}">${n}</div>`;
    
    switch(cat) {
        case 'latest':
            const latest = eng.getLatest();
            html = `<h3><i class="fa-solid fa-clock-rotate-left text-blue"></i> Τελευταίες 5 Κληρώσεις</h3><div style="display:flex; flex-direction:column; gap:10px; margin-top:15px;">`;
            latest.forEach(d => {
                html += `<div class="glass-panel" style="padding:15px; display:flex; justify-content:space-between; align-items:center;">
                    <div><span style="color:var(--text-secondary)">Κλήρωση: ${d.id}</span> <span style="margin-left:15px; font-weight:bold;">${d.date}</span></div>
                    <div>${d.numbers.map(n=>drawBall(n)).join('')} ${d.bonus.map(b=>drawBall(b,true)).join('')}</div>
                </div>`;
            });
            html += `</div>`;
            break;
            
        case 'history':
            const all = eng.getHistory();
            html = `<h3><i class="fa-solid fa-book text-green"></i> Ιστορικό (${all.length} κληρώσεις)</h3>
            <div style="max-height:500px; overflow-y:auto; margin-top:15px; display:flex; flex-direction:column; gap:5px;">`;
            all.forEach(d => {
                html += `<div style="padding:10px; background:rgba(0,0,0,0.2); border-radius:5px; display:flex; justify-content:space-between;">
                    <span>#${d.id} (${d.date})</span>
                    <span>${d.numbers.join(', ')} <span class="text-orange"> + ${d.bonus.join(',')}</span></span>
                </div>`;
            });
            html += `</div>`;
            break;
            
        case 'hotcold':
            const hc = eng.getHotCold();
            html = `<h3><i class="fa-solid fa-fire text-red"></i> Hot & Cold Αριθμοί</h3>
            <div style="display:grid; grid-template-columns: 1fr 1fr; gap:20px; margin-top:20px;">
                <div class="glass-panel" style="padding:20px; text-align:center;">
                    <h4 class="text-red" style="margin-bottom:15px;">Πιο Συχνοί (Hot)</h4>
                    <div style="display:flex; justify-content:center; gap:10px; flex-wrap:wrap;">
                        ${hc.hot.map(n => `<div><div class="number-ball hot">${n}</div><div style="font-size:0.8rem; color:var(--text-secondary)">${hc.freq[n]}x</div></div>`).join('')}
                    </div>
                </div>
                <div class="glass-panel" style="padding:20px; text-align:center;">
                    <h4 class="text-blue" style="margin-bottom:15px;">Πιο Σπάνιοι (Cold)</h4>
                    <div style="display:flex; justify-content:center; gap:10px; flex-wrap:wrap;">
                        ${hc.cold.map(n => `<div><div class="number-ball cold">${n}</div><div style="font-size:0.8rem; color:var(--text-secondary)">${hc.freq[n]||0}x</div></div>`).join('')}
                    </div>
                </div>
            </div>`;
            break;
            
        case 'tens':
            const tens = eng.getTens();
            html = `<h3><i class="fa-solid fa-layer-group text-purple"></i> Εμφανίσεις ανά Δεκάδα</h3>
            <div style="display:flex; flex-direction:column; gap:10px; margin-top:20px;">`;
            Object.keys(tens).forEach(k => {
                const pct = Math.min(100, (tens[k] / (eng.getHistory().length * 5)) * 100).toFixed(1);
                html += `<div style="display:flex; align-items:center; gap:15px;">
                    <div style="width:60px; font-weight:bold;">${k}</div>
                    <div style="flex:1; background:rgba(0,0,0,0.3); height:20px; border-radius:10px; overflow:hidden;">
                        <div style="width:${pct}%; background:var(--accent-primary); height:100%;"></div>
                    </div>
                    <div style="width:50px; text-align:right;">${tens[k]}</div>
                </div>`;
            });
            html += `</div>`;
            break;
            
        case 'sum':
            const sums = eng.getSums();
            html = `<h3><i class="fa-solid fa-calculator text-orange"></i> Στατιστικά Αθροίσματος</h3>
            <div class="stat-box-container" style="margin-top:20px;">
                <div class="stat-box">Μέσος Όρος<div class="stat-val">${sums.avg}</div></div>
                <div class="stat-box">Μικρότερο (Min)<div class="stat-val text-blue">${sums.min}</div></div>
                <div class="stat-box">Μεγαλύτερο (Max)<div class="stat-val text-red">${sums.max}</div></div>
            </div>
            <h4 style="margin-top:20px;">Τελευταία Αθροίσματα</h4>
            <div style="display:flex; gap:10px; margin-top:10px;">
                ${sums.latest.map(s => `<div style="padding:10px; background:rgba(255,255,255,0.1); border-radius:5px; font-weight:bold;">${s}</div>`).join('')}
            </div>`;
            break;
            
        case 'check':
            html = `<h3><i class="fa-solid fa-check-double text-green"></i> Έλεγχος Συστημάτων (Backtest)</h3>
            <p style="color:var(--text-secondary); margin-top:10px;">Βάλε 5 αριθμούς για να δεις πόσες φορές κέρδισαν στις 200 τελευταίες κληρώσεις.</p>
            <div style="display:flex; gap:10px; margin-top:20px;">
                <input type="number" id="chk1" placeholder="1-45" style="width:60px; padding:10px; background:#111; color:white;">
                <input type="number" id="chk2" placeholder="1-45" style="width:60px; padding:10px; background:#111; color:white;">
                <input type="number" id="chk3" placeholder="1-45" style="width:60px; padding:10px; background:#111; color:white;">
                <input type="number" id="chk4" placeholder="1-45" style="width:60px; padding:10px; background:#111; color:white;">
                <input type="number" id="chk5" placeholder="1-45" style="width:60px; padding:10px; background:#111; color:white;">
                <span style="font-size:1.5rem; align-self:center;">+</span>
                <input type="number" id="chkBonus" placeholder="ΤΖ" style="width:60px; padding:10px; background:#111; border:1px solid var(--premium-gold); color:var(--premium-gold); font-weight:bold;">
                <button onclick="runLotteryCheck()" class="tab-btn active" style="margin-left:10px;">Έλεγχος</button>
            </div>
            <div id="lottery-check-results" style="margin-top:20px; font-weight:bold;"></div>`;
            
            // Inject helper func to window
            window.runLotteryCheck = () => {
                const nums = [1,2,3,4,5].map(i => parseInt(document.getElementById('chk'+i).value)).filter(n=>!isNaN(n));
                const bon = parseInt(document.getElementById('chkBonus').value);
                if (nums.length !== 5) { alert('Παρακαλώ εισάγετε 5 αριθμούς.'); return; }
                const bArr = isNaN(bon) ? [] : [bon];
                const matches = window.LotteryEngine.getTicketCheck(nums, bArr);
                document.getElementById('lottery-check-results').innerHTML = `<div class="text-green">Βρέθηκαν ${matches.length} κληρώσεις που κερδίζουν!</div>` + 
                    matches.map(m => `<div style="margin-top:5px; font-size:0.9rem;">Κλήρωση ${m.id} (${m.date}) - Έπιασε: <span class="text-orange">${m.matched} + ${m.bonusMatched}</span></div>`).join('');
            };
            break;
            
        case 'jackpot':
            html = `<div style="text-align:center; padding:50px;">
                <i class="fa-solid fa-sack-dollar fa-4x text-yellow" style="margin-bottom:20px;"></i>
                <h2 style="font-size:2.5rem; color:var(--premium-gold);">Εκτιμώμενο Jackpot</h2>
                <div style="font-size:4rem; font-weight:900; margin:20px 0; letter-spacing:2px; text-shadow: 0 0 20px rgba(255,215,0,0.5);">-- Γίνεται Υπολογισμός --</div>
                <p>Λαμβάνονται live δεδομένα από το OPAP Pool...</p>
            </div>`;
            setTimeout(() => {
                const h2 = container.querySelector('div[style*="4rem"]');
                if(h2) h2.innerHTML = '<span class="text-green">€ΛΑΘΟΣ ΣΥΝΔΕΣΗΣ</span> <br><span style="font-size:1.2rem; color:white;">(Απαιτείται σύνδεση WebSocket)</span>';
            }, 1500);
            break;

        default:
            html = `<div style="padding:40px; text-align:center; color:var(--text-secondary);">
                <i class="fa-solid fa-screwdriver-wrench fa-3x" style="margin-bottom:20px;"></i>
                <h3>Ενότητα υπό κατασκευή</h3>
                <p>Λειτουργία "${cat}" θα προστεθεί σύντομα.</p>
            </div>`;
    }
    
    container.innerHTML = html;
}
'''

pattern = re.compile(r'async function loadLottery.*?\}\s*(?=async function loadBetting)', re.DOTALL)
new_app, count = pattern.subn(lottery_script, app_text)
if count > 0:
    with open(app_path, 'w', encoding='utf-8') as f:
        f.write(new_app)
    print("Patched loadLottery in app.js")
else:
    print("loadLottery pattern not found.")
