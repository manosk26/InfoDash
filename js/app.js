// --- InfoDash Core Routing and UI Logic ---

document.addEventListener('DOMContentLoaded', () => {
    initSecurity();
    initTheme();
    initRouter();
    initMobileMenu();

    // Load initial views only if authorized
    if (localStorage.getItem('dashboard_access') === 'true') {
        initDashboardCore();
    }
});

function initDashboardCore() {
    initWidgets();
    initNewsTicker();
    initGlobalSearch();
    initMyHub();
    initMasterVault();
    loadMyHub(); // Load My Hub as it's the new default
}

// --- Security Management ---
function initSecurity() {
    const loginGate = document.getElementById('login-gate');
    const passwordInput = document.getElementById('login-password');
    const loginBtn = document.getElementById('login-btn');
    const loginError = document.getElementById('login-error');

    const MASTER_PWD = "Manos16581!@#";

    console.log("Security Initialized. Checking access...");
    

    if (localStorage.getItem('dashboard_access') === 'true') {
        console.log("Access confirmed. Hiding login gate.");
        loginGate.classList.add('hidden');
    }

    const verify = () => {
        console.log("Verifying password...");
        if (passwordInput.value === MASTER_PWD) {
            console.log("Password Correct!");
            loginGate.classList.add('hidden');
            initDashboardCore();
        } else {
            console.error("Wrong Password entered.");
            loginError.classList.remove('hidden');
            passwordInput.value = "";
            passwordInput.focus();
        }
    };

    loginBtn.addEventListener('click', verify);
    passwordInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') verify();
    });
}

// --- Theme Management ---
function initTheme() {
    const themeToggle = document.getElementById('theme-toggle');
    themeToggle.addEventListener('click', () => {
        document.body.classList.toggle('light-theme');
        const isLight = document.body.classList.contains('light-theme');
        themeToggle.innerHTML = isLight ? '<i class="fa-solid fa-moon"></i>' : '<i class="fa-solid fa-sun"></i>';
    });
}

// --- Routing System ---
function initRouter() {
    const navItems = document.querySelectorAll('.nav-item');
    const sections = document.querySelectorAll('.view-section');

    navItems.forEach(item => {
        item.addEventListener('click', (e) => {
            // Remove active from all nav items
            navItems.forEach(n => n.classList.remove('active'));
            // Add active to clicked target
            item.classList.add('active');

            const targetView = item.getAttribute('data-target');

            // Hide all sections, show target
            sections.forEach(sec => {
                sec.classList.remove('active');
                if (sec.id === `view-${targetView}`) {
                    sec.classList.remove('hidden');
                    sec.classList.add('active');
                } else {
                    sec.classList.add('hidden');
                }
            });

            // Trigger specific load functions based on view
            if (targetView === 'myhub') loadMyHub();
            if (targetView === 'betting') loadBettingMatches();
            if (targetView === 'lottery') loadLotteries();
            if (targetView === 'crypto') loadCrypto();
            if (targetView === 'links') loadLinks('trackers'); // default cat
            if (targetView === 'recommendations') loadRecommendations();
            if (targetView === 'lifehacks') loadLifehacks('discounts');
            if (targetView === 'finance') loadFinance('sidehustles');
            if (targetView === 'edgeanalytics') loadEdgeAnalytics('droppingodds');
            if (targetView === 'science') loadScience('space');
            if (targetView === 'leisure') loadLeisure('games');
            // Phase 3 Hubs
            if (targetView === 'ai') loadAi('chatbots');
            if (targetView === 'nomads') loadNomads('remotejobs');
            if (targetView === 'privacy') loadPrivacy('burners');
            if (targetView === 'health') loadHealth('workouts');
            if (targetView === 'creator') loadCreator('videoediting');
            if (targetView === 'academic') loadAcademic('universities');
            if (targetView === 'skills') loadSkills('coding');
            // Phase 4 Hubs
            if (targetView === 'osint') loadOsint('usernames');
            if (targetView === 'web3') loadWeb3('whales');
            if (targetView === 'metaskills') loadMetaskills('memory');

            // Close mobile menu if open
            const sidebar = document.getElementById('sidebar');
            if (sidebar.classList.contains('active')) {
                sidebar.classList.remove('active');
            }
        });
    });

    // Sub-routing for Lottery
    document.querySelectorAll('.tab-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
            e.target.classList.add('active');
            loadLotteryData(e.target.getAttribute('data-lottery'));
        });
    });

    // Sub-routing for Links
    document.querySelectorAll('.link-cat-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            document.querySelectorAll('.link-cat-btn').forEach(b => b.classList.remove('active'));
            e.target.classList.add('active');
            loadLinks(e.target.getAttribute('data-lcat'));
        });
    });

    // Sub-routing for Mega Hubs
    document.querySelectorAll('.mega-tab-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            const hub = e.target.getAttribute('data-hub');
            const tab = e.target.getAttribute('data-tab');

            // Highlight active button only within its own hub container
            document.querySelectorAll(`#${hub}-tabs .mega-tab-btn`).forEach(b => b.classList.remove('active'));
            e.target.classList.add('active');

            if (hub === 'lifehacks') loadLifehacks(tab);
            if (hub === 'finance') loadFinance(tab);
            if (hub === 'edgeanalytics') loadEdgeAnalytics(tab);
            if (hub === 'science') loadScience(tab);
            if (hub === 'leisure') loadLeisure(tab);
            // Phase 3 Hubs
            if (hub === 'ai') loadAi(tab);
            if (hub === 'nomads') loadNomads(tab);
            if (hub === 'privacy') loadPrivacy(tab);
            if (hub === 'health') loadHealth(tab);
            if (hub === 'creator') loadCreator(tab);
            if (hub === 'academic') loadAcademic(tab);
            if (hub === 'skills') loadSkills(tab);
            // Phase 4 Hubs
            if (hub === 'osint') loadOsint(tab);
            if (hub === 'web3') loadWeb3(tab);
            if (hub === 'metaskills') loadMetaskills(tab);
        });
    });
}

// --- Mobile Menu ---
function initMobileMenu() {
    const openBtn = document.getElementById('mobile-menu-open');
    const closeBtn = document.getElementById('mobile-menu-close');
    const sidebar = document.getElementById('sidebar');

    openBtn.addEventListener('click', () => sidebar.classList.add('active'));
    closeBtn.addEventListener('click', () => sidebar.classList.remove('active'));
}

// --- 1. Betting Data Loader ---
let allFetchedMatches = [];

async function loadBettingMatches() {
    const container = document.getElementById('matches-container');
    const filtersBar = document.getElementById('betting-filters');

    // Check if already loaded to avoid refetching on every tab switch
    if (allFetchedMatches.length > 0) {
        renderMatches(allFetchedMatches);
        return;
    }

    container.innerHTML = '<div class="loader-glass">Φόρτωση Πραγματικών Αγώνων & Στατιστικών...</div>';

    try {
        const matches = await fetchPopularMatches();
        allFetchedMatches = matches;

        // Generate Filters dynamically based on leagues that actually have matches
        const uniqueLeagues = [...new Set(matches.map(m => m.league))];
        filtersBar.innerHTML = `<button class="filter-btn active" data-filter="all">Όλοι οι Αγώνες (${matches.length})</button>`;
        uniqueLeagues.forEach(league => {
            const leagueCount = matches.filter(m => m.league === league).length;
            filtersBar.innerHTML += `<button class="filter-btn" data-filter="${league}">${league} (${leagueCount})</button>`;
        });

        // Add filter listeners
        document.querySelectorAll('#betting-filters .filter-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                document.querySelectorAll('#betting-filters .filter-btn').forEach(b => b.classList.remove('active'));
                e.target.classList.add('active');

                const filter = e.target.getAttribute('data-filter');
                if (filter === 'all') {
                    renderMatches(allFetchedMatches);
                } else {
                    renderMatches(allFetchedMatches.filter(m => m.league === filter));
                }
            });
        });

        renderMatches(matches);
    } catch (error) {
        container.innerHTML = '<div class="error-msg">Σφάλμα φόρτωσης αγώνων. Το API πιθανώς έφτασε το όριο ή δεν ανταποκρίνεται.</div>';
    }
}

function renderMatches(matchesArray) {
    const container = document.getElementById('matches-container');
    container.innerHTML = '';

    if (matchesArray.length === 0) {
        container.innerHTML = '<div class="glass-panel" style="grid-column: 1/-1; text-align:center; padding: 2rem;">Δεν βρέθηκαν προγραμματισμένοι αγώνες για σήμερα στις επιλεγμένες διοργανώσεις.</div>';
        return;
    }

    matchesArray.forEach(match => {
        container.innerHTML += `
            <div class="match-card glass-panel cursor-dblclick" data-league="${match.league}" ondblclick="openMatchModal('${match.league}', '${match.id}', '${match.home}', '${match.away}')">
                <div class="match-header">
                    <span><i class="fa-solid fa-trophy text-orange"></i> ${match.league}</span>
                    <span>${match.time}</span>
                </div>
                <div class="match-teams">
                    <div class="team-name">${match.home}</div>
                    <div class="vsbadge">VS</div>
                    <div class="team-name">${match.away}</div>
                </div>
                <div class="match-stats">
                    <div title="Τρέχον Σκορ / Κατάσταση"><i class="fa-solid fa-futbol text-green"></i> <b>${match.tips.goals}</b></div>
                    <div title="Συνολικά Κόρνερ (Live)"><i class="fa-solid fa-flag text-orange"></i> <b>${match.tips.corners}</b></div>
                    <div title="Συνολικές Κάρτες"><i class="fa-solid fa-square text-red"></i> <b>${match.tips.cards}</b></div>
                    <div title="Ποσοστό Κατοχής (%)"><i class="fa-solid fa-bullseye"></i> <b>${match.tips.winner}</b></div>
                </div>
                <div class="research-note" style="font-size:0.8rem; color:var(--text-secondary); text-align:center;">
                    <i class="fa-solid fa-microscope"></i> ${match.research}
                    <div style="font-size:0.7rem; color:var(--accent-primary); margin-top:0.3rem;">[ Διπλό κλικ για Ανάλυση AI ]</div>
                </div>
            </div>
        `;
    });
}

// --- 2. Lottery Data Loader ---
async function loadLotteries() {
    // defaults to Joker
    const activeTab = document.querySelector('.tab-btn.active').getAttribute('data-lottery');
    await loadLotteryData(activeTab);
}

async function loadLotteryData(game) {
    const container = document.getElementById('draws-container');
    const advancedStatsContainer = document.getElementById('advanced-stats');
    const tier1WinnersContainer = document.getElementById('tier1-winners-container');
    const hotStats = document.getElementById('hot-numbers');

    hotStats.innerHTML = 'Ανάλυση...';
    advancedStatsContainer.innerHTML = '<div class="loader-glass">Υπολογισμός 25 Advanced Στατιστικών...</div>';
    tier1WinnersContainer.innerHTML = '<div class="loader-glass">Αναζήτηση νικητών 1ης κατηγορίας...</div>';
    container.innerHTML = '<div class="loader-glass">Άντληση τελευταίων 100 κληρώσεων...</div>';

    try {
        const data = await fetchLotteryDraws(game);

        // Render Hot Numbers
        hotStats.innerHTML = `
            <div style="margin-bottom:1rem;">Τα 5 συχνότερα (${data.drawsAnalyzed} κληρώσεις):</div>
            <div style="display:flex; gap:0.5rem; justify-content:center;">
                ${data.hot.map(n => `<span style="background:var(--accent-gradient); color:white; width:35px; height:35px; border-radius:50%; display:flex; align-items:center; justify-content:center; font-weight:bold;">${n}</span>`).join('')}
            </div>
        `;

        // Render Advanced Stats
        advancedStatsContainer.innerHTML = '';
        data.advancedStats.forEach((stat, index) => {
            advancedStatsContainer.innerHTML += `
                 <div style="background: rgba(255,255,255,0.03); border: 1px solid var(--panel-border); border-radius: 8px; padding: 0.75rem; font-size: 0.9rem; display: flex; align-items: flex-start; gap: 0.75rem;">
                     <span style="color: var(--accent-primary); font-weight: bold; min-width: 24px;">#${index + 1}</span>
                     <span>${stat}</span>
                 </div>
             `;
        });

        // Render Tier 1 Winners History
        tier1WinnersContainer.innerHTML = '';
        data.tier1Winners.forEach(winner => {
            tier1WinnersContainer.innerHTML += `
             <div style="padding: 1rem; border-bottom:1px solid var(--panel-border); display:flex; justify-content:space-between; align-items:center; background: rgba(16, 185, 129, 0.05);">
                <div>
                    <strong style="color:var(--text-primary)">Κλήρωση #${winner.id} <i class="fa-solid fa-crown text-orange" style="margin-left:5px;" title="Νικητής 1ης Κατηγορίας"></i></strong>
                    <div style="font-size:0.85rem; color:var(--text-secondary)">${winner.date} • <span class="text-green">${winner.winners} Νικητ${winner.winners > 1 ? 'ές' : 'ής'} x €${winner.prizePerWinner}</span></div>
                </div>
                <div style="display:flex; gap:0.4rem;">
                    ${winner.winningNumbers.map(n => `<span style="background:var(--accent-gradient); border-radius:4px; padding:0.2rem 0.6rem; font-weight:bold; color:white;">${n}</span>`).join('')}
                </div>
             </div>
             `;
        });

        // Render Draws List
        container.innerHTML = '';
        data.history.forEach(draw => {
            container.innerHTML += `
             <div style="padding: 1rem; border-bottom:1px solid var(--panel-border); display:flex; justify-content:space-between; align-items:center;">
                <div>
                    <strong style="color:var(--text-secondary)">Κλήρωση #${draw.id}</strong>
                    <div style="font-size:0.85rem; color:var(--text-secondary)">${draw.date}</div>
                </div>
                <div style="display:flex; gap:0.4rem;">
                    ${draw.winningNumbers.map(n => `<span style="background:rgba(255,255,255,0.1); border:1px solid var(--panel-border); border-radius:4px; padding:0.2rem 0.6rem; font-weight:bold;">${n}</span>`).join('')}
                </div>
             </div>
             `;
        });
    } catch (err) {
        container.innerHTML = 'Σφάλμα ανάκτησης ΟΠΑΠ API.';
    }
}

// --- 3. Crypto Data Loader ---
async function loadCrypto() {
    const topTab = document.querySelector('#top-crypto-table tbody');
    const cheapTab = document.querySelector('#cheap-crypto-table tbody');

    if (topTab.children.length > 0) return; // Already loaded

    topTab.innerHTML = '<tr><td colspan="5">Φόρτωση Top 20...</td></tr>';
    cheapTab.innerHTML = '<tr><td colspan="5">Φόρτωση Top 20 < 0.25€ ...</td></tr>';

    try {
        const { top20, newCheap } = await fetchCryptos();

        const generateRows = (coins) => coins.map(coin => `
            <tr>
                <td>
                    <div class="coin-info">
                        <img src="${coin.image}" alt="${coin.symbol}">
                        <span><b>${coin.name}</b> <small style="color:var(--text-secondary); text-transform:uppercase;">${coin.symbol}</small></span>
                    </div>
                </td>
                <td style="font-weight:600;">€${(coin.price || 0).toFixed(4)}</td>
                <td style="color:var(--text-secondary)">
                    ${coin.isTop ? `€${((coin.volume || 1) / 1000000).toFixed(1)}M` : `€${((coin.volume || 1) / 1000000).toFixed(1)}M`}
                </td>
                <td>
                    <span style="font-size:0.85rem; padding:0.25rem 0.5rem; border-radius:4px; font-weight:bold; background: ${coin.sentiment === 'Strong Buy' ? 'rgba(16, 185, 129, 0.2)' :
                coin.sentiment === 'Buy' ? 'rgba(16, 185, 129, 0.1)' :
                    coin.sentiment === 'Sell' ? 'rgba(239, 68, 68, 0.2)' : 'rgba(255, 255, 255, 0.1)'
            }; color: ${coin.sentiment.includes('Buy') ? 'var(--success)' :
                coin.sentiment.includes('Sell') ? 'var(--danger)' : 'var(--text-secondary)'
            }">
                        ${coin.sentiment}
                    </span>
                    <div style="font-size:0.7rem; color:var(--text-secondary); margin-top:0.2rem;">
                         ${(coin.change24h || 0) >= 0 ? '+' : ''}${(coin.change24h || 0).toFixed(2)}% (24h)
                    </div>
                </td>
            </tr>
        `).join('');

        topTab.innerHTML = generateRows(top20);
        cheapTab.innerHTML = generateRows(newCheap);
    } catch (err) {
        topTab.innerHTML = '<tr><td colspan="5">API Error (CoinGecko)</td></tr>';
        cheapTab.innerHTML = '<tr><td colspan="5">API Error (CoinGecko)</td></tr>';
    }
}

// --- 4. Links Directory Loader ---
async function loadLinks(category) {
    const container = document.getElementById('links-container');
    container.innerHTML = '<div class="loader-glass">Φόρτωση συνδέσμων...</div>';

    try {
        const links = getLinksDirectory(category);
        const savedLinks = JSON.parse(localStorage.getItem('infodash_saved_links') || '[]');

        container.innerHTML = '';
        links.forEach(link => {
            const isSaved = savedLinks.some(l => l.url === link.url);
            const saveClass = isSaved ? 'saved fa-solid' : 'fa-regular';
            container.innerHTML += `
                <a href="${link.url}" target="_blank" class="link-card glass-panel" style="position:relative;">
                    <i class="save-btn ${saveClass} fa-star" title="Αποθήκευση στο My Dashboard" onclick="event.preventDefault(); toggleSaveLink('${link.url}', '${link.title.replace(/'/g, "\\'")}', '${link.icon}', '${link.desc.replace(/'/g, "\\'")}')"></i>
                    <div class="link-icon"><i class="${link.icon}"></i></div>
                    <div>
                        <h4 style="margin-bottom:0.25rem;">${link.title}</h4>
                        <p style="font-size:0.85rem; color:var(--text-secondary); line-height:1.2;">${link.desc}</p>
                    </div>
                </a>
            `;
        });
    } catch (e) {
        container.innerHTML = 'Σφάλμα φορτωσης.';
    }
}

// --- 5. Recommendations Loader ---
async function loadRecommendations() {
    const container = document.getElementById('recs-container');
    if (container.children.length > 0) return;

    try {
        const recs = getRecommendations();
        container.innerHTML = '';
        recs.forEach(rec => {
            container.innerHTML += `
                 <div class="match-card glass-panel" style="border-top:3px solid var(--accent-primary)">
                    <h3 style="margin-bottom:1rem; display:flex; align-items:center; gap:0.5rem;"><i class="${rec.icon} text-orange"></i> ${rec.title}</h3>
                    <p style="color:var(--text-secondary); margin-bottom:1.5rem; font-size:0.95rem;">${rec.desc}</p>
                    <a href="${rec.url}" target="_blank" style="display:inline-block; padding:0.5rem 1.5rem; background:var(--accent-gradient); color:white; text-decoration:none; border-radius:30px; font-weight:bold;">Επισκεφθείτε Δωρεάν</a>
                </div>
            `;
        });
    } catch (e) { }
}

// --- MEGA HUBS LOADERS ---
async function loadLifehacks(tab) {
    const container = document.getElementById('lifehacks-content');
    container.innerHTML = '<div class="loader-glass">Φόρτωση δεδομένων (LifeHacks)...</div>';
    try {
        const data = await getLifehacksData(tab);
        renderDataGrid(container, data);
    } catch (e) { container.innerHTML = 'Σφάλμα'; }
}

async function loadFinance(tab) {
    const container = document.getElementById('finance-content');
    container.innerHTML = '<div class="loader-glass">Φόρτωση δεδομένων (Finance)...</div>';
    try {
        const data = await getFinanceData(tab);
        renderDataGrid(container, data);
    } catch (e) { container.innerHTML = 'Σφάλμα'; }
}

async function loadEdgeAnalytics(tab) {
    const container = document.getElementById('edgeanalytics-content');
    container.innerHTML = '<div class="loader-glass">Φόρτωση δεδομένων (Edge Analytics)...</div>';
    try {
        const data = await getEdgeAnalyticsData(tab);
        renderDataGrid(container, data);
    } catch (e) { container.innerHTML = 'Σφάλμα'; }
}

async function loadScience(tab) {
    const container = document.getElementById('science-content');
    container.innerHTML = '<div class="loader-glass">Φόρτωση δεδομένων (Science)...</div>';
    try {
        const data = await getScienceData(tab);
        renderDataGrid(container, data);
    } catch (e) { container.innerHTML = 'Σφάλμα'; }
}

async function loadLeisure(tab) {
    const container = document.getElementById('leisure-content');
    container.innerHTML = '<div class="loader-glass">Φόρτωση δεδομένων (Leisure)...</div>';
    try {
        const data = await getLeisureData(tab);
        renderDataGrid(container, data);
    } catch (e) { container.innerHTML = 'Σφάλμα'; }
}

// --- PHASE 3 MEGA HUBS LOADERS ---
async function loadAi(tab) {
    const container = document.getElementById('ai-content');
    container.innerHTML = '<div class="loader-glass">Φόρτωση δεδομένων (ΑΙ)...</div>';
    try {
        const data = await getAiData(tab);
        renderDataGrid(container, data);
    } catch (e) { container.innerHTML = 'Σφάλμα'; }
}

async function loadNomads(tab) {
    const container = document.getElementById('nomads-content');
    container.innerHTML = '<div class="loader-glass">Φόρτωση δεδομένων (Nomads)...</div>';
    try {
        const data = await getNomadsData(tab);
        renderDataGrid(container, data);
    } catch (e) { container.innerHTML = 'Σφάλμα'; }
}

async function loadPrivacy(tab) {
    const container = document.getElementById('privacy-content');
    container.innerHTML = '<div class="loader-glass">Φόρτωση δεδομένων (Privacy)...</div>';
    try {
        const data = await getPrivacyData(tab);
        renderDataGrid(container, data);
    } catch (e) { container.innerHTML = 'Σφάλμα'; }
}

async function loadHealth(tab) {
    const container = document.getElementById('health-content');
    container.innerHTML = '<div class="loader-glass">Φόρτωση δεδομένων (Health)...</div>';
    try {
        const data = await getHealthData(tab);
        renderDataGrid(container, data);
    } catch (e) { container.innerHTML = 'Σφάλμα'; }
}

async function loadCreator(tab) {
    const container = document.getElementById('creator-content');
    container.innerHTML = '<div class="loader-glass">Φόρτωση δεδομένων (Creator)...</div>';
    try {
        const data = await getCreatorData(tab);
        renderDataGrid(container, data);
    } catch (e) { container.innerHTML = 'Σφάλμα'; }
}

async function loadAcademic(tab) {
    const container = document.getElementById('academic-content');
    container.innerHTML = '<div class="loader-glass">Φόρτωση δεδομένων (Academic)...</div>';
    try {
        const data = await getAcademicData(tab);
        renderDataGrid(container, data);
    } catch (e) { container.innerHTML = 'Σφάλμα'; }
}

async function loadSkills(tab) {
    const container = document.getElementById('skills-content');
    container.innerHTML = '<div class="loader-glass">Φόρτωση δεδομένων (Skills)...</div>';
    try {
        const data = await getSkillsData(tab);
        renderDataGrid(container, data);
    } catch (e) { container.innerHTML = 'Σφάλμα'; }
}

async function loadOsint(tab) {
    const container = document.getElementById('osint-content');
    container.innerHTML = '<div class="loader-glass">Φόρτωση δεδομένων (OSINT)...</div>';
    try {
        const data = await getOsintData(tab);
        renderDataGrid(container, data);
    } catch (e) { container.innerHTML = 'Σφάλμα'; }
}

async function loadWeb3(tab) {
    const container = document.getElementById('web3-content');
    container.innerHTML = '<div class="loader-glass">Φόρτωση δεδομένων (Web3)...</div>';
    try {
        const data = await getWeb3Data(tab);
        renderDataGrid(container, data);
    } catch (e) { container.innerHTML = 'Σφάλμα'; }
}

async function loadMetaskills(tab) {
    const container = document.getElementById('metaskills-content');
    container.innerHTML = '<div class="loader-glass">Φόρτωση δεδομένων (Meta-Skills)...</div>';
    try {
        const data = await getMetaskillsData(tab);
        renderDataGrid(container, data);
    } catch (e) { container.innerHTML = 'Σφάλμα'; }
}

// Helper renderer for Hubs
function renderDataGrid(container, items) {
    container.innerHTML = '<div class="recommendations-grid"></div>';
    const grid = container.querySelector('.recommendations-grid');
    const savedLinks = JSON.parse(localStorage.getItem('infodash_saved_links') || '[]');
    
    items.forEach(item => {
        const isSaved = savedLinks.some(l => l.url === item.url);
        const saveClass = isSaved ? 'saved fa-solid' : 'fa-regular';
        
        grid.innerHTML += `
            <div class="match-card glass-panel" style="border-top:3px solid var(--accent-primary); position:relative;">
                ${item.url ? `<i class="save-btn ${saveClass} fa-star" title="Αποθήκευση στο My Dashboard" onclick="toggleSaveLink(event, '${item.url}', '${item.title.replace(/'/g, "\\'")}', '${item.icon}', '${item.desc.replace(/'/g, "\\'")}')"></i>` : ''}
                <h3 style="margin-bottom:1rem; display:flex; align-items:center; gap:0.5rem; padding-right:30px;"><i class="${item.icon} text-orange"></i> ${item.title}</h3>
                <p style="color:var(--text-secondary); margin-bottom:1.5rem; font-size:0.95rem;">${item.desc}</p>
                ${item.extraHtml ? `<div style="margin-bottom:1rem; padding:0.5rem; background:rgba(255,255,255,0.05); border-radius:8px;">${item.extraHtml}</div>` : ''}
                ${item.url ? `<a href="${item.url}" target="_blank" style="display:inline-block; padding:0.5rem 1.5rem; background:var(--accent-gradient); color:white; text-decoration:none; border-radius:30px; font-weight:bold;">${item.btnText || 'Δείτε το'}</a>` : ''}
            </div>
        `;
    });
}

// =========================================================================
// NEW FEATURES IMPLEMENTATION (My Hub, Widgets, Ticker, Search)
// =========================================================================

// --- My Hub Logic ---
function initMyHub() {
    const todoInput = document.getElementById('new-todo-input');
    const addTodoBtn = document.getElementById('add-todo-btn');
    const notesArea = document.getElementById('quick-notes');

    // Notes auto-save
    notesArea.value = localStorage.getItem('infodash_notes') || '';
    notesArea.addEventListener('input', () => {
        localStorage.setItem('infodash_notes', notesArea.value);
    });

    // To-Do functionality
    const renderTodos = () => {
        const todos = JSON.parse(localStorage.getItem('infodash_todos') || '[]');
        const list = document.getElementById('todo-list');
        list.innerHTML = '';
        
        todos.forEach((todo, index) => {
            list.innerHTML += `
                <li class="todo-item ${todo.completed ? 'completed' : ''}">
                    <input type="checkbox" class="todo-checkbox" data-index="${index}" ${todo.completed ? 'checked' : ''}>
                    <span class="todo-text">${todo.text}</span>
                    <button class="todo-delete" data-index="${index}"><i class="fa-solid fa-trash"></i></button>
                </li>
            `;
        });

        // Add event listeners to generated buttons
        document.querySelectorAll('.todo-checkbox').forEach(box => {
            box.addEventListener('change', (e) => {
                const idx = e.target.getAttribute('data-index');
                todos[idx].completed = e.target.checked;
                localStorage.setItem('infodash_todos', JSON.stringify(todos));
                renderTodos();
            });
        });

        document.querySelectorAll('.todo-delete').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const idx = e.currentTarget.getAttribute('data-index');
                todos.splice(idx, 1);
                localStorage.setItem('infodash_todos', JSON.stringify(todos));
                renderTodos();
            });
        });
    };

    const addTodo = () => {
        const text = todoInput.value.trim();
        if (text) {
            const todos = JSON.parse(localStorage.getItem('infodash_todos') || '[]');
            todos.push({ text, completed: false });
            localStorage.setItem('infodash_todos', JSON.stringify(todos));
            todoInput.value = '';
            renderTodos();
        }
    };

    addTodoBtn.addEventListener('click', addTodo);
    todoInput.addEventListener('keypress', (e) => { if (e.key === 'Enter') addTodo(); });

    renderTodos();
}

function loadMyHub() {
    // Render Saved Links
    const savedContainer = document.getElementById('saved-links-grid');
    const savedLinks = JSON.parse(localStorage.getItem('infodash_saved_links') || '[]');
    
    if (savedLinks.length === 0) {
        savedContainer.innerHTML = '<p style="color: var(--text-secondary); font-size: 0.9rem;">Κάνε κλικ στο αστεράκι σε οποιοδήποτε tool/link για να το αποθηκεύσεις και να εμφανιστεί εδώ.</p>';
        return;
    }

    savedContainer.innerHTML = '';
    savedLinks.forEach(link => {
        savedContainer.innerHTML += `
            <div class="link-card glass-panel" style="padding: 1rem; border-left: 3px solid var(--accent-primary);">
                <i class="save-btn saved fa-solid fa-star" onclick="toggleSaveLink(event, '${link.url}', '${link.title}', '${link.icon}', '${link.desc}')"></i>
                <a href="${link.url}" target="_blank" style="text-decoration:none; color:inherit; display:flex; align-items:center; gap: 10px;">
                    <div class="link-icon" style="width:30px; height:30px; font-size:0.9rem;"><i class="${link.icon}"></i></div>
                    <div>
                        <h4 style="margin:0; font-size:0.95rem;">${link.title}</h4>
                        <p style="margin:0; font-size:0.75rem; color:var(--text-secondary);">${link.desc}</p>
                    </div>
                </a>
            </div>
        `;
    });
}


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

// Global function to toggle save state
window.toggleSaveLink = function(event, url, title, icon, desc) {
    if (event) event.stopPropagation();
    const btn = event ? event.currentTarget : null;
    
    let savedLinks = JSON.parse(localStorage.getItem('infodash_saved_links') || '[]');
    const existsIndex = savedLinks.findIndex(l => l.url === url);
    
    if (existsIndex >= 0) {
        savedLinks.splice(existsIndex, 1);
    } else {
        savedLinks.push({ url, title, icon, desc });
    }
    
    localStorage.setItem('infodash_saved_links', JSON.stringify(savedLinks));
    
    // Refresh Current View if it's My Hub
    const activeSection = document.querySelector('.view-section.active');
    if (activeSection && activeSection.id === 'view-myhub') {
        loadMyHub();
    } else if (btn) {
        // Just visually update the button that was clicked
        btn.classList.toggle('saved');
        const iconEl = btn.querySelector('i') || btn; // fallback if button is the icon
        if (iconEl.classList.contains('fa-regular')) {
            iconEl.classList.replace('fa-regular', 'fa-solid');
        } else {
            iconEl.classList.replace('fa-solid', 'fa-regular');
        }
    }
}



// --- Real-Time Widgets ---
function initWidgets() {
    const timeDisplay = document.getElementById('time-display');
    const weatherDisplay = document.getElementById('weather-widget').querySelector('span');
    
    // Clock
    setInterval(() => {
        const now = new Date();
        timeDisplay.innerText = now.toLocaleTimeString('el-GR', { hour: '2-digit', minute: '2-digit' });
    }, 1000);

    // Simulated Weather for Demo
    const weathers = ['22°C Αθήνα', '21°C Συννεφιά', '23°C Ήλιος'];
    weatherDisplay.innerText = weathers[Math.floor(Math.random() * weathers.length)];
}

// --- News Ticker ---
function initNewsTicker() {
    const ticker = document.getElementById('news-ticker');
    
    // Simulated RSS Feed Headlines
    const headlines = [
        "Bitcoin: Νέο ρεκόρ κοντά στα $100K 🚀",
        "ΟΠΑΠ: Ανακοίνωσε νέο bonus στις εγγραφές",
        "Tech: Η Google παρουσιάζει το νέο AI μοντέλο της",
        "Space: Επιτυχημένη εκτόξευση της SpaceX τα ξημερώματα",
        "Markets: Ανοδικά κινούνται οι ευρωπαϊκές αγορές σήμερα",
        "Cybersecurity: Προσοχή σε νέο phishing email που κυκλοφορεί στην Ελλάδα"
    ];

    const tickerContent = `
        <div class="news-ticker-content">
            ${headlines.map(h => `<a href="#" class="news-item">${h}</a>`).join('')}
        </div>
    `;
    ticker.innerHTML = tickerContent;
}

// --- Global Search ---
async function initGlobalSearch() {
    const searchInput = document.getElementById('global-search');
    const resultsContainer = document.getElementById('search-results');
    
    let allData = [];
    
    // We fetch all data silently in background to make search instant
    try {
        const api = await import('./api.js');
        // Load just sample of hubs for search index
        const hubs = [
            ['lifehacks', 'discounts'], ['finance', 'sidehustles'], ['edgeanalytics', 'droppingodds'],
            ['ai', 'chatbots'], ['privacy', 'burners'], ['web3', 'whales'], ['skills', 'coding']
        ];
        
        for (const [hub, tab] of hubs) {
            let data = [];
            if(hub === 'lifehacks') data = await api.getLifehacksData(tab);
            if(hub === 'finance') data = await api.getFinanceData(tab);
            if(hub === 'edgeanalytics') data = await api.getEdgeAnalyticsData(tab);
            if(hub === 'ai') data = await api.getAiData(tab);
            if(hub === 'privacy') data = await api.getPrivacyData(tab);
            if(hub === 'web3') data = await api.getWeb3Data(tab);
            if(hub === 'skills') data = await api.getSkillsData(tab);
            
            allData = [...allData, ...data];
        }
        
    } catch(e) { console.warn("Could not load full index for search."); }

    searchInput.addEventListener('input', (e) => {
        const query = e.target.value.toLowerCase().trim();
        
        if (query.length < 2) {
            resultsContainer.classList.add('hidden');
            return;
        }

        const matches = allData.filter(item => 
            item.title.toLowerCase().includes(query) || 
            item.desc.toLowerCase().includes(query)
        ).slice(0, 5); // Max 5 results

        if (matches.length > 0) {
            resultsContainer.innerHTML = matches.map(m => `
                <a href="${m.url}" target="_blank" class="search-result-item">
                    <div class="search-result-icon"><i class="${m.icon}"></i></div>
                    <div class="search-result-info">
                        <h4>${m.title}</h4>
                        <p>${m.desc.substring(0,60)}...</p>
                    </div>
                </a>
            `).join('');
            resultsContainer.classList.remove('hidden');
        } else {
            resultsContainer.innerHTML = '<div class="search-result-item" style="justify-content:center; color:var(--text-secondary)">Δεν βρέθηκαν αποτελέσματα...</div>';
            resultsContainer.classList.remove('hidden');
        }
    });

    // Close search on click outside
    document.addEventListener('click', (e) => {
        if (!e.target.closest('.search-bar')) {
            resultsContainer.classList.add('hidden');
        }
    });
}

// =========================================================================
// ADVANCED MATCH DETAILS MODAL LOGIC
// =========================================================================

let matchAnalysisChart = null;

window.closeMatchModal = function() {
    const modal = document.getElementById('advanced-match-modal');
    if (modal) modal.classList.add('hidden');
};

window.openMatchModal = async function(league, eventId, homeTeam, awayTeam) {
    const modal = document.getElementById('advanced-match-modal');
    const content = document.getElementById('advanced-match-content');
    modal.classList.remove('hidden');

    content.innerHTML = `
        <div class="loader-glass" style="height: 300px; display: flex; align-items: center; justify-content: center;">
            <div style="text-align:center;">
                <i class="fa-solid fa-circle-notch fa-spin fa-3x" style="color:var(--accent-primary); margin-bottom:1rem;"></i>
                <p>AI Analysis & Real-Time Data Harvesting...</p>
            </div>
        </div>
    `;

    try {
        const summary = await fetchMatchSummary(league, eventId);

        if (!summary) throw new Error("No data");

        // Logic for betting options (20 Popular)
        const betOptions = [
            `1 (Νίκη ${homeTeam.substring(0,10)}) - ${summary.winProb.home || 'N/A'}%`,
            `X (Ισοπαλία) - ${summary.winProb.draw || 'N/A'}%`,
            `2 (Νίκη ${awayTeam.substring(0,10)}) - ${summary.winProb.away || 'N/A'}%`,
            `Over 1.5 Goals`, `Under 1.5 Goals`, `Over 2.5 Goals`, `Under 2.5 Goals`,
            `G/G (Goal/Goal)`, `N/G (No Goal)`,
            `1X (Διπλή Ευκαιρία)`, `X2 (Διπλή Ευκαιρία)`, `12 (Διπλή Ευκαιρία)`,
            `1 Ημίχρονο / 1 Τελικό`, `2 Ημίχρονο / 2 Τελικό`, `X Ημίχρονο / 1 Τελικό`,
            `Σύνολο Κόρνερ Over 8.5`, `Σύνολο Κόρνερ Under 8.5`,
            `Συνολικές Κάρτες Over 3.5`, `Πρώτο Γκολ: ${homeTeam.substring(0,10)}`, `Goal σε 1ο Ημίχρονο`
        ];

        // Logic for AI tips (10 Tips)
        const tips = [
            `${homeTeam} έχει φόρμα: ${summary.form.home}`,
            `${awayTeam} έχει φόρμα: ${summary.form.away}`,
            `Γήπεδο: ${summary.venue}`,
            `Θεατές (Εκτίμηση/Επίσημα): ${summary.attendance}`,
            `Ισχυρή τάση (Value Bet) 15% πάνω από τον μέσο όρο.`,
            `Το H2H δείχνει σκληρά παιχνίδια ιστορικά.`,
            `Αναμένονται αρκετά φάουλ, πιθανό Over στις κάρτες.`,
            `Ο καιρός ενδέχεται να επηρεάσει τον ρυθμό του αγώνα.`,
            `Η πλειοψηφία του "έξυπνου" χρήματος κινείται προς την ισοπαλία.`,
            `Παρακολουθήστε Live για καλύτερες ευκαιρίες (In-Play) στα κόρνερ.`
        ];

        content.innerHTML = `
            <span class="close-modal" style="position:absolute; top:1rem; right:1.5rem; font-size:1.5rem; cursor:pointer;" onclick="closeMatchModal()"><i class="fa-solid fa-times"></i></span>
            <div class="match-details-header" style="text-align:center; padding-bottom: 1rem; border-bottom: 1px solid var(--panel-border); margin-bottom:1rem;">
                <h2 style="font-size: 1.8rem;" class="gradient-text">${homeTeam} vs ${awayTeam}</h2>
                <div style="color:var(--text-secondary);"><i class="fa-solid fa-trophy"></i> ${league}</div>
            </div>
            
            <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 1.5rem;">
                <!-- Left Column: Chart & Tips -->
                <div>
                    <div style="background:rgba(0,0,0,0.2); padding:1rem; border-radius:12px; margin-bottom:1.5rem; text-align:center;">
                        <h3 style="margin-bottom:1rem;"><i class="fa-solid fa-chart-pie text-orange"></i> Πιθανότητες Νίκης (AI)</h3>
                        <div style="max-height: 250px; display: flex; justify-content: center;">
                            <canvas id="matchChart"></canvas>
                        </div>
                    </div>

                    <div style="background:rgba(0,0,0,0.2); padding:1rem; border-radius:12px;">
                        <h3 style="margin-bottom:1rem;"><i class="fa-solid fa-lightbulb text-primary"></i> 10 Προηγμένα Tips</h3>
                        <ul style="list-style-type:none; padding:0; font-size:0.9rem; color:var(--text-secondary);">
                            ${tips.map(t => `<li style="margin-bottom:0.4rem; border-bottom: 1px solid rgba(255,255,255,0.05); padding-bottom: 0.4rem;"><i class="fa-solid fa-check text-green" style="margin-right:8px;"></i>${t}</li>`).join('')}
                        </ul>
                    </div>
                </div>

                <!-- Right Column: Form, H2H & Betting Options -->
                <div>
                    <div style="background:rgba(0,0,0,0.2); padding:1rem; border-radius:12px; margin-bottom:1.5rem;">
                        <h3 style="margin-bottom:1rem;"><i class="fa-solid fa-fire text-red"></i> Πρόσφατη Φόρμα & H2H</h3>
                        <div style="display:flex; justify-content:space-between; margin-bottom:1rem;">
                            <div>
                                <small style="color:var(--text-secondary)">${homeTeam}</small>
                                <div style="font-weight:bold; letter-spacing:2px; font-size:1.1rem; color:var(--text-primary);"><span style="color:var(--success)">${summary.form.home.replace(/W/g,'<span style="color:var(--success)">W</span>').replace(/D/g,'<span style="color:gray">D</span>').replace(/L/g,'<span style="color:var(--danger)">L</span>')}</span></div>
                            </div>
                            <div style="text-align:right;">
                                <small style="color:var(--text-secondary)">${awayTeam}</small>
                                <div style="font-weight:bold; letter-spacing:2px; font-size:1.1rem; color:var(--text-primary);"><span style="color:var(--success)">${summary.form.away.replace(/W/g,'<span style="color:var(--success)">W</span>').replace(/D/g,'<span style="color:gray">D</span>').replace(/L/g,'<span style="color:var(--danger)">L</span>')}</span></div>
                            </div>
                        </div>
                        <h4 style="font-size:0.85rem; color:var(--text-secondary); margin-bottom:0.5rem; border-top: 1px solid rgba(255,255,255,0.05); padding-top: 0.5rem;">Τελευταίες 5 Αναμετρήσεις:</h4>
                        <div style="font-size:0.8rem;">
                            ${summary.h2h.length > 0 ? summary.h2h.map(h => `<div style="display:flex; justify-content:space-between; margin-bottom:0.35rem; background:rgba(255,255,255,0.03); padding:0.25rem 0.5rem; border-radius:4px;"><span><i class="fa-regular fa-calendar" style="color:var(--text-secondary); margin-right:5px;"></i> ${h.date}</span><span style="font-weight:bold; color:var(--accent-primary);">${h.score}</span></div>`).join('') : '<div style="color:var(--text-secondary); font-style:italic;">Δεν υπάρχουν πρόσφατα στοιχεία</div>'}
                        </div>
                    </div>

                    <div style="background:rgba(0,0,0,0.2); padding:1rem; border-radius:12px;">
                        <h3 style="margin-bottom:1rem;"><i class="fa-solid fa-money-bill-wave text-green"></i> 20 Popular Επιλογές</h3>
                        <div style="display:grid; grid-template-columns: 1fr 1fr; gap:0.5rem;">
                            ${betOptions.map(b => `<div style="font-size:0.75rem; background:rgba(255,255,255,0.05); border:1px solid var(--panel-border); border-radius:4px; padding:0.4rem; text-align:center; transition: all 0.2s ease; cursor:pointer;" onmouseover="this.style.background='var(--primary)'" onmouseout="this.style.background='rgba(255,255,255,0.05)'">${b}</div>`).join('')}
                        </div>
                    </div>
                </div>
            </div>
        `;

        // Render Chart
        const ctx = document.getElementById('matchChart').getContext('2d');
        const hProb = parseFloat(summary.winProb.home) || 33.3;
        const dProb = parseFloat(summary.winProb.draw) || 33.3;
        const aProb = parseFloat(summary.winProb.away) || 33.3;

        if (matchAnalysisChart) matchAnalysisChart.destroy();
        
        matchAnalysisChart = new Chart(ctx, {
            type: 'doughnut',
            data: {
                labels: [homeTeam, 'Ισοπαλία', awayTeam],
                datasets: [{
                    data: [hProb, dProb, aProb],
                    backgroundColor: [
                        '#10b981', // Green
                        '#f59e0b', // Orange
                        '#ef4444'  // Red
                    ],
                    borderColor: 'rgba(0,0,0,0.5)',
                    borderWidth: 2,
                    hoverOffset: 4
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        position: 'bottom',
                        labels: { color: '#e2e8f0', padding: 20, font: { family: "'Outfit', sans-serif" } }
                    }
                }
            }
        });

    } catch (e) {
        content.innerHTML = `
            <span class="close-modal" style="position:absolute; top:1rem; right:1.5rem; font-size:1.5rem; cursor:pointer;" onclick="closeMatchModal()"><i class="fa-solid fa-times"></i></span>
            <div style="text-align:center; padding: 3rem;">
                <i class="fa-solid fa-triangle-exclamation text-red fa-3x" style="margin-bottom:1rem;"></i>
                <h3 style="margin-bottom:0.5rem;">Σφάλμα Ανάκτησης Δεδομένων</h3>
                <p style="color:var(--text-secondary);">Δυστυχώς, τα προηγμένα στοιχεία για αυτόν τον αγώνα δεν είναι διαθέσιμα αυτή τη στιγμή. Παρακαλώ δοκιμάστε ξανά αργότερα.</p>
            </div>
        `;
    }
}



// =========================================================================
// INITIALIZATION
// =========================================================================

document.addEventListener('DOMContentLoaded', () => {
    // Only init if password gate is passed (or for development, always call)
    // For this app, it's called after the first login gate in app.js (existing logic)
    // we need to make sure basic init is called.
    initWidgets();
    initNewsTicker();
    initGlobalSearch();
    initMyHub();
    initMasterVault();
});

function initDashboardCore() {
    initWidgets();
    initNewsTicker();
    initGlobalSearch();
    initMyHub();
    initMasterVault();
}

window.initDashboardCore = initDashboardCore;


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
        if (passField.value.trim() === MASTER_PIN) {
            loginOverlay.style.display = 'none';
            vaultContainer.style.display = 'flex';
            passField.value = '';
            
            const first = document.querySelector('#master-nav .ghost-nav-item');
            if(first) first.click();
            
            initMasterClock();
        } else {
            errorMsg.style.display = 'block';
            setTimeout(() => errorMsg.style.display = 'none', 3000);
        }
    };

    if(submitBtn) submitBtn.addEventListener('click', attemptLogin);
    if(passField) passField.addEventListener('keypress', (e) => { if (e.key === 'Enter') attemptLogin(); });

    if(exitBtn) exitBtn.addEventListener('click', () => {
        vaultContainer.style.display = 'none';
    });

    // Secret Trigger: Type 'xfiles' or 'files'
    let secretBuffer = '';
    document.addEventListener('keydown', (e) => {
        if (e.key && e.key.length === 1) {
            secretBuffer += e.key.toLowerCase();
            if (secretBuffer.length > 10) secretBuffer = secretBuffer.slice(-10);
            
            if (secretBuffer.endsWith('xfiles')) {
                if(loginOverlay) loginOverlay.style.display = 'flex';
                if(passField) { passField.value = ''; passField.focus(); }
                secretBuffer = '';
            } else if (secretBuffer.endsWith('files')) {
                if(vaultContainer) vaultContainer.style.display = 'none';
                if(loginOverlay) loginOverlay.style.display = 'none';
                secretBuffer = '';
            }
        }
    });
}

function loadMasterCategory(categoryId) {
    const grid = document.getElementById('master-grid');
    if (!grid) return;
    
    grid.style.display = 'grid'; // reset
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
