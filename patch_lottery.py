import re

# 1. Update index.html
html_path = r'c:\Users\manol\.gemini\antigravity\scratch\infodash\index.html'
with open(html_path, 'r', encoding='utf-8') as f:
    html_text = f.read()

new_lottery_html = '''<section id="lottery-view" class="view-section hidden">
    <div class="section-header">
        <h1>Mega <span class="gradient-text">Lottery Analytics</span></h1>
        <p>Advanced OPAP Intelligence Engine</p>
    </div>
    
    <div class="lottery-tabs" style="display:flex; gap:10px; margin-bottom:1rem; border-bottom: 1px solid var(--panel-border); padding-bottom:10px;">
        <button class="tab-btn active" data-lottery="joker" style="font-size:1.1rem; padding:0.5rem 2rem;">Joker</button>
        <button class="tab-btn" data-lottery="eurojackpot" style="font-size:1.1rem; padding:0.5rem 2rem;">Eurojackpot</button>
        <button class="tab-btn" data-lottery="lotto" style="font-size:1.1rem; padding:0.5rem 2rem;">Lotto</button>
        <!-- Game status indicator -->
        <span id="lottery-status-indicator" style="margin-left:auto; display:flex; align-items:center; color:var(--text-secondary); font-size:0.9rem;">
            <i class="fa-solid fa-circle-nodes" style="margin-right:5px; color:var(--accent-primary);"></i> Engine Connected
        </span>
    </div>

    <!-- The 18 Categories Navigation + Content Grid -->
    <div class="lottery-mega-grid">
        <!-- Sidebar Navigation (18 Items) -->
        <div class="lottery-sub-tabs glass-panel" id="lottery-nav">
            <button class="active" data-cat="latest">Τελευταία</button>
            <button data-cat="history">Προηγούμενες</button>
            <button data-cat="tables">Πινακάκια</button>
            <button data-cat="board">Πίνακας</button>
            <button data-cat="weird">Παράξενες</button>
            <button data-cat="numbers">Αριθμοί</button>
            <button data-cat="hotcold">Hot&Cold</button>
            <button data-cat="stats">Στατιστικά</button>
            <button data-cat="check">Ελεγχος</button>
            <button data-cat="pairs">Δυάδες</button>
            <button data-cat="consecutive">Συνεχόμενα</button>
            <button data-cat="tens">Δεκάδες</button>
            <button data-cat="endings">Λήγοντες</button>
            <button data-cat="sum">Αθροισμα</button>
            <button data-cat="distances">Αποστάσεις</button>
            <button data-cat="similar">Παρόμοιοι</button>
            <button data-cat="systems">Συστήματα</button>
            <button data-cat="jackpot">ΤΖΑΚΠΟΤ</button>
        </div>

        <!-- Main Content Area -->
        <div class="lottery-content-area glass-panel" id="lottery-engine-content" style="padding:1.5rem; position:relative;">
            <div id="lottery-loader" class="loader-glass" style="position:absolute; top:50%; left:50%; transform:translate(-50%, -50%); display:flex; flex-direction:column; align-items:center; z-index:10;">
                <i class="fa-solid fa-microchip fa-spin fa-2x" style="color:var(--accent-primary); margin-bottom:10px;"></i>
                <span id="lottery-loader-text">Ανάλυση Κληρώσεων...</span>
            </div>
            
            <div id="lottery-view-container" style="opacity:0; transition: opacity 0.3s; min-height:400px;">
                <!-- Dynamic Content Injected Here by LotteryEngine -->
            </div>
        </div>
    </div>
</section>'''

html_pattern = re.compile(r'<section id="lottery-view".*?</section>', re.DOTALL)
html_new, html_count = html_pattern.subn(new_lottery_html, html_text)
if html_count > 0:
    with open(html_path, 'w', encoding='utf-8') as f:
        f.write(html_new)
    print("Updated index.html for Lottery Mega Dashboard")
else:
    print("Could not find lottery-view in HTML")
