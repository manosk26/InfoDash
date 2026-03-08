// --- InfoDash Core Routing and UI Logic ---

document.addEventListener('DOMContentLoaded', () => {
    initSecurity();
    initTheme();
    initRouter();
    initMobileMenu();

    // Load initial views only if authorized
    if (localStorage.getItem('dashboard_access') === 'true') {
        loadBettingMatches();
    }
});

// --- Security Management ---
function initSecurity() {
    const loginGate = document.getElementById('login-gate');
    const passwordInput = document.getElementById('login-password');
    const loginBtn = document.getElementById('login-btn');
    const loginError = document.getElementById('login-error');

    const MASTER_PWD = "Manos16581!@#";

    if (localStorage.getItem('dashboard_access') === 'true') {
        loginGate.classList.add('hidden');
    }

    const verify = () => {
        if (passwordInput.value === MASTER_PWD) {
            localStorage.setItem('dashboard_access', 'true');
            loginGate.classList.add('hidden');
            loadBettingMatches();
        } else {
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
                if (sec.id === `view-${targetView}`) {
                    sec.classList.remove('hidden');
                } else {
                    sec.classList.add('hidden');
                }
            });

            // Trigger specific load functions based on view
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
        const { fetchPopularMatches } = await import('./api.js');
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
            <div class="match-card glass-panel" data-league="${match.league}">
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
        const { fetchLotteryDraws } = await import('./api.js');
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
        const { fetchCryptos } = await import('./api.js');
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
        const { getLinksDirectory } = await import('./api.js');
        const links = getLinksDirectory(category);

        container.innerHTML = '';
        links.forEach(link => {
            container.innerHTML += `
                <a href="${link.url}" target="_blank" class="link-card glass-panel">
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
        const { getRecommendations } = await import('./api.js');
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
        const { getLifehacksData } = await import('./api.js');
        const data = await getLifehacksData(tab);
        renderDataGrid(container, data);
    } catch (e) { container.innerHTML = 'Σφάλμα'; }
}

async function loadFinance(tab) {
    const container = document.getElementById('finance-content');
    container.innerHTML = '<div class="loader-glass">Φόρτωση δεδομένων (Finance)...</div>';
    try {
        const { getFinanceData } = await import('./api.js');
        const data = await getFinanceData(tab);
        renderDataGrid(container, data);
    } catch (e) { container.innerHTML = 'Σφάλμα'; }
}

async function loadEdgeAnalytics(tab) {
    const container = document.getElementById('edgeanalytics-content');
    container.innerHTML = '<div class="loader-glass">Φόρτωση δεδομένων (Edge Analytics)...</div>';
    try {
        const { getEdgeAnalyticsData } = await import('./api.js');
        const data = await getEdgeAnalyticsData(tab);
        renderDataGrid(container, data);
    } catch (e) { container.innerHTML = 'Σφάλμα'; }
}

async function loadScience(tab) {
    const container = document.getElementById('science-content');
    container.innerHTML = '<div class="loader-glass">Φόρτωση δεδομένων (Science)...</div>';
    try {
        const { getScienceData } = await import('./api.js');
        const data = await getScienceData(tab);
        renderDataGrid(container, data);
    } catch (e) { container.innerHTML = 'Σφάλμα'; }
}

async function loadLeisure(tab) {
    const container = document.getElementById('leisure-content');
    container.innerHTML = '<div class="loader-glass">Φόρτωση δεδομένων (Leisure)...</div>';
    try {
        const { getLeisureData } = await import('./api.js');
        const data = await getLeisureData(tab);
        renderDataGrid(container, data);
    } catch (e) { container.innerHTML = 'Σφάλμα'; }
}

// --- PHASE 3 MEGA HUBS LOADERS ---
async function loadAi(tab) {
    const container = document.getElementById('ai-content');
    container.innerHTML = '<div class="loader-glass">Φόρτωση δεδομένων (ΑΙ)...</div>';
    try {
        const { getAiData } = await import('./api.js');
        const data = await getAiData(tab);
        renderDataGrid(container, data);
    } catch (e) { container.innerHTML = 'Σφάλμα'; }
}

async function loadNomads(tab) {
    const container = document.getElementById('nomads-content');
    container.innerHTML = '<div class="loader-glass">Φόρτωση δεδομένων (Nomads)...</div>';
    try {
        const { getNomadsData } = await import('./api.js');
        const data = await getNomadsData(tab);
        renderDataGrid(container, data);
    } catch (e) { container.innerHTML = 'Σφάλμα'; }
}

async function loadPrivacy(tab) {
    const container = document.getElementById('privacy-content');
    container.innerHTML = '<div class="loader-glass">Φόρτωση δεδομένων (Privacy)...</div>';
    try {
        const { getPrivacyData } = await import('./api.js');
        const data = await getPrivacyData(tab);
        renderDataGrid(container, data);
    } catch (e) { container.innerHTML = 'Σφάλμα'; }
}

async function loadHealth(tab) {
    const container = document.getElementById('health-content');
    container.innerHTML = '<div class="loader-glass">Φόρτωση δεδομένων (Health)...</div>';
    try {
        const { getHealthData } = await import('./api.js');
        const data = await getHealthData(tab);
        renderDataGrid(container, data);
    } catch (e) { container.innerHTML = 'Σφάλμα'; }
}

async function loadCreator(tab) {
    const container = document.getElementById('creator-content');
    container.innerHTML = '<div class="loader-glass">Φόρτωση δεδομένων (Creator)...</div>';
    try {
        const { getCreatorData } = await import('./api.js');
        const data = await getCreatorData(tab);
        renderDataGrid(container, data);
    } catch (e) { container.innerHTML = 'Σφάλμα'; }
}

async function loadAcademic(tab) {
    const container = document.getElementById('academic-content');
    container.innerHTML = '<div class="loader-glass">Φόρτωση δεδομένων (Academic)...</div>';
    try {
        const { getAcademicData } = await import('./api.js');
        const data = await getAcademicData(tab);
        renderDataGrid(container, data);
    } catch (e) { container.innerHTML = 'Σφάλμα'; }
}

async function loadSkills(tab) {
    const container = document.getElementById('skills-content');
    container.innerHTML = '<div class="loader-glass">Φόρτωση δεδομένων (Skills)...</div>';
    try {
        const { getSkillsData } = await import('./api.js');
        const data = await getSkillsData(tab);
        renderDataGrid(container, data);
    } catch (e) { container.innerHTML = 'Σφάλμα'; }
}

async function loadOsint(tab) {
    const container = document.getElementById('osint-content');
    container.innerHTML = '<div class="loader-glass">Φόρτωση δεδομένων (OSINT)...</div>';
    try {
        const { getOsintData } = await import('./api.js');
        const data = await getOsintData(tab);
        renderDataGrid(container, data);
    } catch (e) { container.innerHTML = 'Σφάλμα'; }
}

async function loadWeb3(tab) {
    const container = document.getElementById('web3-content');
    container.innerHTML = '<div class="loader-glass">Φόρτωση δεδομένων (Web3)...</div>';
    try {
        const { getWeb3Data } = await import('./api.js');
        const data = await getWeb3Data(tab);
        renderDataGrid(container, data);
    } catch (e) { container.innerHTML = 'Σφάλμα'; }
}

async function loadMetaskills(tab) {
    const container = document.getElementById('metaskills-content');
    container.innerHTML = '<div class="loader-glass">Φόρτωση δεδομένων (Meta-Skills)...</div>';
    try {
        const { getMetaskillsData } = await import('./api.js');
        const data = await getMetaskillsData(tab);
        renderDataGrid(container, data);
    } catch (e) { container.innerHTML = 'Σφάλμα'; }
}

// Helper renderer for Hubs
function renderDataGrid(container, items) {
    container.innerHTML = '<div class="recommendations-grid"></div>';
    const grid = container.querySelector('.recommendations-grid');
    items.forEach(item => {
        grid.innerHTML += `
            <div class="match-card glass-panel" style="border-top:3px solid var(--accent-primary)">
                <h3 style="margin-bottom:1rem; display:flex; align-items:center; gap:0.5rem;"><i class="${item.icon} text-orange"></i> ${item.title}</h3>
                <p style="color:var(--text-secondary); margin-bottom:1.5rem; font-size:0.95rem;">${item.desc}</p>
                ${item.extraHtml ? `<div style="margin-bottom:1rem; padding:0.5rem; background:rgba(255,255,255,0.05); border-radius:8px;">${item.extraHtml}</div>` : ''}
                ${item.url ? `<a href="${item.url}" target="_blank" style="display:inline-block; padding:0.5rem 1.5rem; background:var(--accent-gradient); color:white; text-decoration:none; border-radius:30px; font-weight:bold;">${item.btnText || 'Δείτε το'}</a>` : ''}
            </div>
        `;
    });
}
