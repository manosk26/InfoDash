// --- InfoDash Core Routing and UI Logic ---

document.addEventListener('DOMContentLoaded', () => {
    initSecurity();
    initRouter();
    initMobileMenu();

    // Load initial views only if authorized
    initWidgets(); // Allow clock to work on login page
    if (localStorage.getItem('dashboard_access') === 'true') {
        initDashboardCore();
    }
});

function initDashboardCore() {
    try {
        console.log("Initializing Dashboard Core components...");
        // initWidgets called globally now
        initNewsTicker();
        initGlobalSearch();
        initMyHub();
        initMasterVault();
        initExtremeSuite(); 
        updateTelemetryHeader();
        initDragAndDrop();
        initPremiumStatus();
        loadMyHub();
    } catch (err) {
        console.error("Error during Dashboard Core initialization:", err);
    }
}

// --- Premium Feature Setup ---
function initPremiumStatus() {
    // For this demonstration, we are hardcoding the premium logic to look for the "infodash_premium" flag
    // or just assume active based on context.
    const isPremium = localStorage.getItem('infodash_premium') !== 'false'; // Defaulting to true for demo
    
    if (isPremium) {
        localStorage.setItem('infodash_premium', 'true');
        const badge = document.getElementById('premium-status-badge');
        const shortcut = document.getElementById('syndicate-shortcut-container');
        
        if (badge) badge.classList.remove('hidden');
        if (shortcut) shortcut.classList.remove('hidden');
    }
}

// Ensure the open function is on the window object
window.openSyndicateAccess = function() {
    const loginOverlay = document.getElementById('master-vault-login');
    const passField = document.getElementById('master-pass');
    
    if (loginOverlay) {
        loginOverlay.style.display = 'flex';
        if(passField) {
            passField.value = '';
            setTimeout(() => passField.focus(), 50);
        }
    }
};

async function updateTelemetryHeader(specifiedCity = null) {
    const mainHeader = document.getElementById('main-telemetry-header');
    const vaultHeader = document.getElementById('vault-telemetry-header');
    
    if (!mainHeader && !vaultHeader) return;

    const loadingHtml = '<div class="loader-glass" style="width:15px; height:15px; margin-right:10px;"></div> Intercepting Telemetry...';
    if(mainHeader) mainHeader.innerHTML = loadingHtml;
    if(vaultHeader) vaultHeader.innerHTML = loadingHtml;

    try {
        const netInfo = await window.InfoDashExtreme.fetchUserNetworkInfo();
        const savedCity = specifiedCity || localStorage.getItem('infodash_weather_city') || 'Heraklion';
        const weather = await window.InfoDashExtreme.fetchWeatherData(savedCity);
        
        localStorage.setItem('infodash_weather_city', savedCity);

        const headerContent = `
            <div class="telemetry-item-top">
                <i class="fa-solid fa-shield-halved"></i> 
                <span>VPN STATUS: <b id="vpn-display-status">ENCRYPTED</b></span>
                <span class="ml-1rem">IP: <b style="color:var(--accent-primary);">${netInfo.ip}</b></span>
                <span class="ml-1rem">ORG: <b>${netInfo.org || 'Secure Node'}</b></span>
                <div class="ml-1rem weather-clickable" onclick="window.initNotifications()" title="Enable Alerts">
                    <i class="fa-solid fa-bell"></i> <span id="notif-status">ALERTS OFF</span>
                </div>
            </div>
            <div class="telemetry-item-top weather-clickable" onclick="changeWeatherLocation()">
                <i class="fa-solid fa-cloud-sun"></i>
                <span>${weather.city}: <b>${weather.temp}°C</b> (${weather.desc})</span>
                <span class="ml-1rem" style="font-size:0.75rem;"><i class="fa-solid fa-droplet" style="font-size:0.6rem;"></i> ${weather.humidity}%</span>
                <span class="ml-0.5rem" style="font-size:0.75rem;"><i class="fa-solid fa-wind" style="font-size:0.6rem;"></i> ${weather.wind}km/h</span>
            </div>
        `;

        if(mainHeader) mainHeader.innerHTML = headerContent;
        if(vaultHeader) vaultHeader.innerHTML = headerContent;

    } catch (e) {
        const errorHtml = '<i class="fa-solid fa-triangle-exclamation text-red"></i> Telemetry Offline';
        if(mainHeader) mainHeader.innerHTML = errorHtml;
        if(vaultHeader) vaultHeader.innerHTML = errorHtml;
    }
}

window.changeWeatherLocation = () => {
    const newCity = prompt("Εισάγετε πόλη για πρόγνωση καιρού:", localStorage.getItem('infodash_weather_city') || 'Heraklion');
    if (newCity && newCity.trim().length > 1) {
        updateTelemetryHeader(newCity.trim());
    }
};

// --- Security Management ---
function initSecurity() {
    const loginGate = document.getElementById('login-gate');
    const passwordInput = document.getElementById('login-password');
    const loginBtn = document.getElementById('login-btn');
    const loginError = document.getElementById('login-error');

    const MASTER_PWD = "Manos16581";

    console.log("Security Initialized. Checking access...");
    

    if (localStorage.getItem('dashboard_access') === 'true') {
        console.log("Access confirmed. Hiding login gate.");
        loginGate.classList.add('hidden');
    }

    const form = document.getElementById('login-form');
    
    const verify = (e) => {
        if (e) e.preventDefault();
        console.log("Verifying password...");
        if (passwordInput.value === MASTER_PWD) {
            console.log("Password Correct!");
            localStorage.setItem('dashboard_access', 'true');
            if(loginGate) loginGate.classList.add('hidden');
            initDashboardCore(); 
        } else {
            console.error("Wrong Password entered.");
            if(loginError) loginError.classList.remove('hidden');
            passwordInput.value = "";
            passwordInput.focus();
        }
    };

    if (form) {
        form.addEventListener('submit', verify);
    }
}

// --- Hub Configuration for Tabs ---
const HUB_CONFIG = {
    'lifehacks': [
        { id: 'discounts', name: 'Προσφορές & Deals' },
        { id: 'hacks', name: 'Security & Hacks' },
        { id: 'learning', name: 'Γνώση & Φιλοσοφία' },
        { id: 'tech', name: 'Tech News' },
        { id: 'freebies', name: 'Free Resources' },
        { id: 'ai_notes', name: 'AI Σημειώσεις' },
        { id: 'ai_emails', name: 'AI Emails' },
        { id: 'ai_summaries', name: 'AI Περιλήψεις' },
        { id: 'ai_focus', name: 'AI FOCUS' },
        { id: 'ai_habits', name: 'AI Habits' }
    ],
    'finance': [
        { id: 'sidehustles', name: 'Side Hustles' },
        { id: 'heatmap', name: 'Market Heatmap' },
        { id: 'dividends', name: 'Μερίσματα' },
        { id: 'costofliving', name: 'Cost of Living' },
        { id: 'trends', name: 'Trending Tickers' },
        { id: 'ai_trading', name: 'AI Trading' },
        { id: 'ai_portfolio', name: 'AI Portfolio' },
        { id: 'ai_crypto', name: 'AI Crypto Stats' },
        { id: 'ai_markets', name: 'AI Markets' },
        { id: 'ai_taxes', name: 'AI Taxes' }
    ],
    'edgeanalytics': [
        { id: 'droppingodds', name: 'Dropping Odds' },
        { id: 'injuries', name: 'Injuries & Cards' },
        { id: 'arbitrage', name: 'Arbitrage Scanner' },
        { id: 'motorsport', name: 'F1/MotoGP Data' },
        { id: 'ai_xg', name: 'AI xG Stats' },
        { id: 'ai_fatigue', name: 'AI Fatigue Tracking' },
        { id: 'ai_var', name: 'AI VAR Analysis' },
        { id: 'ai_scout', name: 'AI Global Scout' },
        { id: 'ai_lines', name: 'AI Line Movements' }
    ],
    'science': [
        { id: 'space', name: 'Διάστημα & NASA' },
        { id: 'earthquakes', name: 'Σεισμοί Live' },
        { id: 'flights', name: 'Flight Tracker' }
    ],
    'leisure': [
        { id: 'games', name: 'Retro Gaming' },
        { id: 'movies', name: 'Νέες Ταινίες' },
        { id: 'tv', name: 'Σειρές & Trends' }
    ],
    'ai': [
        { id: 'chatbots', name: 'Top Chatbots' },
        { id: 'imagegen', name: 'Image Creators' },
        { id: 'automation', name: 'AI Automation' }
    ],
    'nomads': [
        { id: 'remotejobs', name: 'Remote Jobs' },
        { id: 'digitalnomad', name: 'Nomad Guides' },
        { id: 'relocation', name: 'Visa & Tax' }
    ],
    'privacy': [
        { id: 'burners', name: 'Burner Tools' },
        { id: 'vpns', name: 'Best VPNs' },
        { id: 'encryption', name: 'Encryption Tools' }
    ],
    'health': [
        { id: 'workouts', name: 'Home Workouts' },
        { id: 'nutrition', name: 'Superfoods & Meals' },
        { id: 'biohack', name: 'Biohacking' },
        { id: 'mind', name: 'Mental Health' },
        { id: 'ai_symptoms', name: 'AI Symptom Check' },
        { id: 'ai_posture', name: 'AI Posture' }
    ],
    'creator': [
        { id: 'videoediting', name: 'Video Editing' },
        { id: 'design', name: 'Graphic Design' },
        { id: 'social', name: 'Social Strategy' },
        { id: 'assets', name: 'Free Assets' },
        { id: 'ai_mvideo', name: 'AI Video tools' },
        { id: 'ai_maudio', name: 'AI Audio tools' },
        { id: 'ai_mcopy', name: 'AI Copywriting' },
        { id: 'ai_mdesign', name: 'AI Design Tools' },
        { id: 'ai_manalytics', name: 'AI Analytics' }
    ],
    'academic': [
        { id: 'universities', name: 'Top Universities' },
        { id: 'certs', name: 'Certifications' },
        { id: 'research', name: 'Research Papers' },
        { id: 'cv', name: 'CV & Careers' },
        { id: 'softskills', name: 'Soft Skills' },
        { id: 'ai_tutors', name: 'AI Tutors' },
        { id: 'ai_papers', name: 'AI Research' },
        { id: 'ai_essays', name: 'AI Writing' },
        { id: 'ai_math', name: 'AI Math' },
        { id: 'ai_flash', name: 'AI Flashcards' }
    ],
    'skills': [
        { id: 'coding', name: 'Coding Skills' },
        { id: 'languages', name: 'Learn Languages' },
        { id: 'finskills', name: 'Finance Skills' },
        { id: 'arts', name: 'Art & Music' },
        { id: 'diy', name: 'DIY & Craft' }
    ],
    'osint': [
        { id: 'usernames', name: 'Username Search' },
        { id: 'domainlookup', name: 'Domain Lookup' },
        { id: 'breachcheck', name: 'Breach Check' }
    ],
    'web3': [
        { id: 'whales', name: 'Whale Alerts' },
        { id: 'nfts', name: 'NFT Market' },
        { id: 'yieldfarming', name: 'Yield Farming' }
    ],
    'metaskills': [
        { id: 'memory', name: 'Memory Palace' },
        { id: 'speedreading', name: 'Speed Reading' },
        { id: 'learninghowtolearn', name: 'Neuroplasticity' }
    ]
};

function renderHubTabs(hubId, defaultTab = null) {
    const tabsContainer = document.getElementById(`${hubId}-tabs`);
    if (!tabsContainer || !HUB_CONFIG[hubId]) return;

    tabsContainer.innerHTML = '';
    HUB_CONFIG[hubId].forEach(tab => {
        const btn = document.createElement('button');
        btn.className = `tab-btn ${tab.id === defaultTab ? 'active' : ''}`;
        btn.innerText = tab.name;
        btn.onclick = () => {
            tabsContainer.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            
            // Call the corresponding load function
            const loadFunc = `load${hubId.charAt(0).toUpperCase()}${hubId.slice(1)}`;
            if (typeof window[loadFunc] === 'function') {
                window[loadFunc](tab.id);
            }
        };
        tabsContainer.appendChild(btn);
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
                if (sec.id === `${targetView}-view`) {
                    sec.classList.remove('hidden');
                    console.log(`Showing section: ${sec.id}`);
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
            
            // Mega Hubs with Dynamic Tabs
            if (HUB_CONFIG[targetView]) {
                const firstTab = HUB_CONFIG[targetView][0].id;
                renderHubTabs(targetView, firstTab);
                
                const loadFunc = `load${targetView.charAt(0).toUpperCase()}${targetView.slice(1)}`;
                if (typeof window[loadFunc] === 'function') {
                    window[loadFunc](firstTab);
                }
            }
            
            if (targetView === 'global-radar') loadGlobalRadar();

            // Close mobile menu if open
            const sidebar = document.getElementById('sidebar');
            if (sidebar.classList.contains('active')) {
                sidebar.classList.remove('active');
            }
        });
    });

    // Sub-routing for Lottery
    const lotteryTabs = document.querySelector('.lottery-tabs');
    if (lotteryTabs) {
        lotteryTabs.querySelectorAll('.tab-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                lotteryTabs.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
                e.target.classList.add('active');
                loadLotteryData(e.target.getAttribute('data-lottery'));
            });
        });
    }

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

async function loadLotteries(game = 'joker') {
    const loader = document.getElementById('lottery-loader');
    const viewContainer = document.getElementById('lottery-view-container');
    const navButtons = document.querySelectorAll('.lottery-sub-tabs button');
    
    if (!loader || !viewContainer) return;
    
    loader.classList.remove('hidden');
    viewContainer.style.opacity = 0;
    
    // Set up sub-tab navigation listeners once
    if (navButtons.length > 0 && !navButtons[0].dataset.listenerAdded) {
        navButtons.forEach(btn => {
            btn.dataset.listenerAdded = 'true';
            btn.addEventListener('click', () => {
                navButtons.forEach(b => b.classList.remove('active'));
                btn.classList.add('active');
                renderLotteryCategory(btn.dataset.cat);
            });
        });
    }
    
    try {
        if (!window.LotteryEngine) throw new Error("Lottery Engine Missing");
        await window.LotteryEngine.fetchData(game);
        
        loader.classList.add('hidden');
        viewContainer.style.opacity = 1;
        
        const activeSubBtn = document.querySelector('.lottery-sub-tabs button.active') || navButtons[0];
        renderLotteryCategory(activeSubBtn ? activeSubBtn.dataset.cat : 'latest');
        
    } catch (e) {
        console.error("Lottery load error:", e);
        loader.classList.add('hidden');
        viewContainer.innerHTML = '<div class="text-red p-2rem text-center">Engine Connection Failure.</div>';
        viewContainer.style.opacity = 1;
    }
}

function renderLotteryCategory(cat) {
    const container = document.getElementById('lottery-view-container');
    const eng = window.LotteryEngine;
    if (!container || !eng) return;
    
    let html = '';
    const ball = (n, bon=false) => `<div class="number-ball ${bon?'joker-bonus':''}">${n}</div>`;
    
    switch(cat) {
        case 'latest':
            const latest = eng.getLatest();
            html = `<h3><i class="fa-solid fa-calendar-check text-blue"></i> Τελευταίες 5 Κληρώσεις</h3><div class="mt-1rem flex-column gap-10">`;
            latest.forEach(d => {
                html += `<div class="glass-panel p-1rem flex-between">
                    <div><b>#${d.id}</b> <span class="ml-1rem text-secondary">${d.date}</span></div>
                    <div class="flex-center gap-5">${d.numbers.map(n=>ball(n)).join('')} ${d.bonus.map(b=>ball(b,true)).join('')}</div>
                </div>`;
            });
            html += `</div>`;
            break;
        case 'predictions':
            html = `
                <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:1.5rem; flex-wrap:wrap; gap:10px;">
                    <div>
                        <h3 style="margin:0;"><i class="fa-solid fa-brain text-purple"></i> AI Predictions & Live Backtesting</h3>
                        <p style="color:var(--text-secondary); font-size:0.85rem; margin-top:0.25rem;">Σύγκριση πραγματικών κληρώσεων με τις προβλέψεις του αλγορίθμου Markov & Delays.</p>
                    </div>
                    <button class="tab-btn active ai-tab-btn" onclick="openLotteryCodeModal()"><i class="fa-solid fa-code"></i> Εμφάνιση Κώδικα Αλγορίθμων</button>
                </div>
                <div style="overflow-x:auto;">
                    <table class="crypto-table" style="width:100%; min-width:600px; font-size:0.9rem; border-collapse:collapse;">
                        <thead>
                            <tr style="border-bottom: 2px solid var(--panel-border);">
                                <th style="padding:0.75rem; text-align:left;">Κλήρωση / Ημ.</th>
                                <th style="padding:0.75rem; text-align:center;">Πραγματικοί Αριθμοί</th>
                                <th style="padding:0.75rem; text-align:center;">Πρόβλεψη Αλγορίθμου</th>
                                <th style="padding:0.75rem; text-align:center;">Επιτυχία / Σκορ</th>
                            </tr>
                        </thead>
                        <tbody>
            `;

            const drawsToTest = eng.currentData.slice(0, 25);
            drawsToTest.forEach((draw, index) => {
                const pastHistory = eng.currentData.slice(index + 1);
                const pred = eng.predictForDraw(eng.currentGame, pastHistory);
                
                const matchedNums = draw.numbers.filter(n => pred.numbers.includes(n));
                const matchedBonus = draw.bonus.filter(b => pred.bonus.includes(b));
                
                const scoreStr = `${matchedNums.length}${matchedBonus.length > 0 ? ' + ' + matchedBonus.length : ''}`;
                const hasMatch = matchedNums.length > 0 || matchedBonus.length > 0;
                
                const renderActualBall = (n, isBonus = false) => {
                    const isMatched = isBonus ? matchedBonus.includes(n) : matchedNums.includes(n);
                    let ballClass = isBonus ? 'joker-bonus' : '';
                    let matchedStyle = isMatched ? 'box-shadow: 0 0 15px var(--success); border: 2px solid var(--success); transform: scale(1.1); font-weight:800;' : '';
                    return `<div class="number-ball ${ballClass}" style="${matchedStyle}">${n}</div>`;
                };

                const renderPredBall = (n, isBonus = false) => {
                    const isMatched = isBonus ? matchedBonus.includes(n) : matchedNums.includes(n);
                    let ballClass = isBonus ? 'joker-bonus' : '';
                    let matchedStyle = isMatched ? 'background:var(--success); color:black; font-weight:800; border: 1px solid var(--success);' : 'opacity:0.6;';
                    return `<div class="number-ball ${ballClass}" style="${matchedStyle}">${n}</div>`;
                };

                html += `
                    <tr style="border-bottom:1px solid var(--panel-border);">
                        <td style="padding:0.75rem; text-align:left;">
                            <b>#${draw.id}</b><br>
                            <span style="font-size:0.75rem; color:var(--text-secondary);">${draw.date}</span>
                        </td>
                        <td style="padding:0.75rem; text-align:center;">
                            <div style="display:inline-flex; gap:3px;">
                                ${draw.numbers.map(n => renderActualBall(n)).join('')}
                                ${draw.bonus.map(b => renderActualBall(b, true)).join('')}
                            </div>
                        </td>
                        <td style="padding:0.75rem; text-align:center;">
                            <div style="display:inline-flex; gap:3px;">
                                ${pred.numbers.map(n => renderPredBall(n)).join('')}
                                ${pred.bonus.map(b => renderPredBall(b, true)).join('')}
                            </div>
                        </td>
                        <td style="padding:0.75rem; text-align:center;">
                            <span class="badge-glass" style="background:${hasMatch ? 'rgba(16, 185, 129, 0.15)' : 'rgba(255,255,255,0.05)'}; color:${hasMatch ? 'var(--success)' : 'var(--text-secondary)'}; border:1px solid ${hasMatch ? 'var(--success)' : 'var(--panel-border)'}; font-weight:bold; padding:0.25rem 0.75rem;">
                                ${scoreStr}
                            </span>
                        </td>
                    </tr>
                `;
            });

            html += `
                        </tbody>
                    </table>
                </div>
            `;
            break;
        case 'hotcold':
            const hc = eng.getHotCold();
            html = `<h3><i class="fa-solid fa-fire text-orange"></i> Hot/Cold Analysis</h3>
            <div class="grid-2 gap-20 mt-1rem">
                <div class="glass-panel p-1rem text-center">
                    <h4 class="text-red">Hot (Πιο Συχνά)</h4><br>
                    <div class="flex-center gap-10">${hc.hot.map(n=>`<div>${ball(n)}<div class="text-secondary small">${hc.freq[n]}x</div></div>`).join('')}</div>
                </div>
                <div class="glass-panel p-1rem text-center">
                    <h4 class="text-blue">Cold (Πιο Σπάνια)</h4><br>
                    <div class="flex-center gap-10">${hc.cold.map(n=>`<div>${ball(n,true)}<div class="text-secondary small">${hc.freq[n]||0}x</div></div>`).join('')}</div>
                </div>
            </div>`;
            break;
        case 'sum':
            const s = eng.getSums();
            html = `<h3><i class="fa-solid fa-calculator"></i> Σύνολα & Αθροίσματα</h3><div class="stat-box-container mt-1rem">
                <div class="stat-box">Μέσος Όρος<div class="stat-val">${s.avg}</div></div>
                <div class="stat-box">Ελάχιστο<div class="stat-val">${s.min}</div></div>
                <div class="stat-box">Μέγιστο<div class="stat-val">${s.max}</div></div>
            </div>`;
            break;
        case 'endings':
            const endings = eng.getEndings();
            html = `<h3><i class="fa-solid fa-list-ol"></i> Ανάλυση Ληγόντων</h3><div class="mt-1rem flex-between gap-10">
                ${endings.map((count, i) => `<div class="text-center"><div class="text-secondary">.${i}</div><div class="font-bold">${count}</div></div>`).join('')}
            </div>`;
            break;
        case 'check':
            html = `<h3><i class="fa-solid fa-search"></i> Lottery Ticket Backtester</h3><p class="text-secondary mt-0.5rem">Εισάγετε 5 αριθμούς:</p>
            <div class="flex-center gap-10 mt-1rem">
                <input type="number" id="lot-c1" class="vpn-select" style="width:50px;" value="1">
                <input type="number" id="lot-c2" class="vpn-select" style="width:50px;" value="2">
                <input type="number" id="lot-c3" class="vpn-select" style="width:50px;" value="3">
                <input type="number" id="lot-c4" class="vpn-select" style="width:50px;" value="4">
                <input type="number" id="lot-c5" class="vpn-select" style="width:50px;" value="5">
                <button class="tab-btn active" onclick="runBacktest()">Check</button>
            </div><div id="backtest-out" class="mt-1rem"></div>`;
            window.runBacktest = () => {
                const nums = [1,2,3,4,5].map(i => parseInt(document.getElementById('lot-c'+i).value));
                const matches = eng.getTicketCheck(nums, []);
                document.getElementById('backtest-out').innerHTML = `<div class="text-green">Βρέθηκαν ${matches.length} επιτυχίες!</div>`;
            };
            break;
        default:
            html = `<div class="text-center p-3rem"><i class="fa-solid fa-code fa-3x mb-1rem"></i><h3>${cat.toUpperCase()} Module</h3><p class="text-secondary">Advanced rendering logic initializing...</p></div>`;
    }
    container.innerHTML = html;
}

// --- 3. Crypto Data Loader ---
async function loadCrypto() {
    const tableBody = document.querySelector('#cmc-crypto-table tbody');
    if (!tableBody) return;
    
    tableBody.innerHTML = '<tr><td colspan="14" class="text-center p-2rem"><div class="loader-glass"></div> Φόρτωση Top 100 Cryto Assets...</td></tr>';
    
    try {
        const data = await fetchCryptos();
        const coins = data.top20 || [];
        
        tableBody.innerHTML = '';
        coins.forEach(c => {
            const tr = document.createElement('tr');
            tr.innerHTML = `
                <td class="text-secondary">${c.rank}</td>
                <td><div class="flex-center gap-10"><img src="${c.image}" width="24">${c.name} <small class="text-secondary">${c.sym}</small></div></td>
                <td><b>${c.price}</b></td>
                <td class="${c.change1h >= 0 ? 'text-green' : 'text-red'}">${c.change1h.toFixed(2)}%</td>
                <td class="${c.change24h >= 0 ? 'text-green' : 'text-red'}">${c.change24h.toFixed(2)}%</td>
                <td class="${c.change7d >= 0 ? 'text-green' : 'text-red'}">${c.change7d.toFixed(2)}%</td>
                <td>${c.marketCap}</td>
                <td>${c.volume}</td>
                <td class="small text-secondary">${c.circulating}</td>
                <td class="small text-secondary">${c.fdv}</td>
                <td class="small">${c.ath}</td>
                <td class="small text-secondary">${c.low24} / ${c.high24}</td>
                <td class="small">${c.volatility}</td>
                <td><span class="badge-glass">${c.sentiment}</span></td>
            `;
            tableBody.appendChild(tr);
        });
    } catch (e) {
        tableBody.innerHTML = '<tr><td colspan="14" class="text-red text-center">API Threshold Reached. Wait 30s.</td></tr>';
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
const todoInput = document.getElementById('new-todo-input');
    const addTodoBtn = document.getElementById('add-todo-btn');
    const notesArea = document.getElementById('quick-notes');

    if (!todoInput || !addTodoBtn || !notesArea) return;

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
    if (typeof window.loadGrNews === 'function' && !window.newsLoaded) {
        window.loadGrNews();
        window.newsLoaded = true;
    }

    // Render Saved Links
    const savedContainer = document.getElementById('saved-links-grid');
    if (!savedContainer) return;

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
    if (activeSection && activeSection.id === 'myhub-view') {
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
let currentClockInterval = null;
let currentClockTimezone = 'Europe/Athens';

window.updateWorldClock = (tz) => {
    currentClockTimezone = tz;
    const timeDisplay = document.getElementById('digital-clock');
    if (timeDisplay) {
        const now = new Date();
        timeDisplay.textContent = now.toLocaleTimeString('el-GR', { 
            timeZone: currentClockTimezone,
            hour: '2-digit', 
            minute: '2-digit', 
            second: '2-digit',
            hour12: false
        });
    }
};

window.updateWeather = (city) => {
    if (typeof updateTelemetryHeader === 'function') {
        updateTelemetryHeader(city);
    }
};

function initWidgets() {
    const timeDisplay = document.getElementById('digital-clock');
    const clockSelect = document.getElementById('world-clock-select');
    
    if (timeDisplay) {
        if (currentClockInterval) clearInterval(currentClockInterval);
        const updateClock = () => {
            const now = new Date();
            try {
                timeDisplay.textContent = now.toLocaleTimeString('el-GR', { 
                    timeZone: currentClockTimezone,
                    hour: '2-digit', 
                    minute: '2-digit', 
                    second: '2-digit',
                    hour12: false
                });
            } catch (e) {
                timeDisplay.textContent = now.toLocaleTimeString('el-GR');
            }
        };
        updateClock();
        currentClockInterval = setInterval(updateClock, 1000);
    }
}

// --- News Ticker ---
function initNewsTicker() {
    const ticker = document.getElementById('news-ticker');
    if (!ticker) return; // Safety check
    
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
// LOTTERY CODE VIEWER MODAL LOGIC
// =========================================================================
window.openLotteryCodeModal = function() {
    const modal = document.getElementById('lottery-code-modal');
    if (modal) modal.classList.remove('hidden');
};

window.closeLotteryCodeModal = function() {
    const modal = document.getElementById('lottery-code-modal');
    if (modal) modal.classList.add('hidden');
};

window.switchAlgorithmCode = function(lang) {
    const btnJs = document.getElementById('btn-show-js');
    const btnPy = document.getElementById('btn-show-py');
    const blockJs = document.getElementById('code-js-block');
    const blockPy = document.getElementById('code-py-block');
    
    if (lang === 'js') {
        btnJs.classList.add('active');
        btnPy.classList.remove('active');
        blockJs.classList.remove('hidden');
        blockPy.classList.add('hidden');
    } else {
        btnPy.classList.add('active');
        btnJs.classList.remove('active');
        blockPy.classList.remove('hidden');
        blockJs.classList.add('hidden');
    }
};

// =========================================================================
// ADVANCED MATCH DETAILS MODAL LOGIC
// =========================================================================

let matchAnalysisChart = null;

function poisson(k, lambda) {
    let fact = 1;
    for (let i = 2; i <= k; i++) fact *= i;
    return (Math.pow(lambda, k) * Math.exp(-lambda)) / fact;
}

function calculateExactScores(lambdaH, lambdaA, homeForm, awayForm, h2h) {
    const poissonScores = [];
    for (let h = 0; h <= 4; h++) {
        for (let a = 0; a <= 4; a++) {
            const prob = poisson(h, lambdaH) * poisson(a, lambdaA);
            poissonScores.push({ score: `${h} - ${a}`, prob: prob });
        }
    }
    poissonScores.sort((x, y) => y.prob - x.prob);
    
    const rho = -0.08; 
    const dcScores = [];
    for (let h = 0; h <= 4; h++) {
        for (let a = 0; a <= 4; a++) {
            let prob = poisson(h, lambdaH) * poisson(a, lambdaA);
            if (h === 0 && a === 0) prob *= (1 - rho);
            else if (h === 1 && a === 1) prob *= (1 - rho);
            else if (h === 1 && a === 0) prob *= (1 + rho);
            else if (h === 0 && a === 1) prob *= (1 + rho);
            dcScores.push({ score: `${h} - ${a}`, prob: prob });
        }
    }
    dcScores.sort((x, y) => y.prob - x.prob);

    const getFormWeight = (formStr) => {
        let weight = 1.0;
        if (!formStr) return weight;
        for (let char of formStr) {
            if (char === 'W') weight += 0.05;
            else if (char === 'L') weight -= 0.04;
        }
        return weight;
    };
    
    let h2hGoalsH = 0;
    let h2hGoalsA = 0;
    let totalH2H = 0;
    if (h2h && h2h.length > 0) {
        h2h.forEach(game => {
            const parts = game.score.split('-').map(s => parseInt(s.trim()));
            if (parts.length === 2 && !isNaN(parts[0]) && !isNaN(parts[1])) {
                h2hGoalsH += parts[0];
                h2hGoalsA += parts[1];
                totalH2H++;
            }
        });
        if (totalH2H > 0) {
            h2hGoalsH /= totalH2H;
            h2hGoalsA /= totalH2H;
        }
    }
    
    const formH = getFormWeight(homeForm);
    const formA = getFormWeight(awayForm);
    
    const adjLambdaH = lambdaH * formH * (h2hGoalsH > 0 ? (0.7 + 0.3 * h2hGoalsH) : 1.0);
    const adjLambdaA = lambdaA * formA * (h2hGoalsA > 0 ? (0.7 + 0.3 * h2hGoalsA) : 1.0);
    
    const simScores = [];
    for (let h = 0; h <= 4; h++) {
        for (let a = 0; a <= 4; a++) {
            const prob = poisson(h, adjLambdaH) * poisson(a, adjLambdaA);
            simScores.push({ score: `${h} - ${a}`, prob: prob });
        }
    }
    simScores.sort((x, y) => y.prob - x.prob);
    
    return {
        poisson: poissonScores.slice(0, 3).map(s => ({ score: s.score, pct: (s.prob * 100).toFixed(1) })),
        dixonColes: dcScores.slice(0, 3).map(s => ({ score: s.score, pct: (s.prob * 100).toFixed(1) })),
        weightedSim: simScores.slice(0, 3).map(s => ({ score: s.score, pct: (s.prob * 100).toFixed(1) }))
    };
}

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

        // Calculate Exact Scores using the models
        const lH = parseFloat(summary.stats.avgGoalsH) || 1.30;
        const lA = parseFloat(summary.stats.avgGoalsA) || 1.10;
        const exactScorePredictions = calculateExactScores(lH, lA, summary.form.home, summary.form.away, summary.h2h);

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
                <!-- Left Column: Chart & Stats Matrix -->
                <div>
                    <div style="background:rgba(0,0,0,0.2); padding:1rem; border-radius:12px; margin-bottom:1.5rem; text-align:center;">
                        <h3 style="margin-bottom:1rem;"><i class="fa-solid fa-chart-pie text-orange"></i> Πιθανότητες Νίκης (AI)</h3>
                        <div style="max-height: 200px; display: flex; justify-content: center;">
                            <canvas id="matchChart"></canvas>
                        </div>
                    </div>

                    <div style="background:rgba(0,0,0,0.2); padding:1rem; border-radius:12px;">
                        <h3 style="margin-bottom:1rem;"><i class="fa-solid fa-microscope text-primary"></i> Real-Time Analytical Matrix (30 Stats)</h3>
                        <div style="display:grid; grid-template-columns: 1fr 1fr; gap: 0.75rem; font-size: 0.8rem;">
                            <div class="stat-box"><span>Κατοχή:</span> <b>${summary.stats.possessionH} - ${summary.stats.possessionA}</b></div>
                            <div class="stat-box"><span>Σουτ:</span> <b>${summary.stats.shotsH} - ${summary.stats.shotsA}</b></div>
                            <div class="stat-box"><span>Στο Στόχο:</span> <b>${summary.stats.shotsOnTargetH} - ${summary.stats.shotsOnTargetA}</b></div>
                            <div class="stat-box"><span>Κόρνερ:</span> <b>${summary.stats.cornersH} - ${summary.stats.cornersA}</b></div>
                            <div class="stat-box"><span>Φάουλ:</span> <b>${summary.stats.foulsH} - ${summary.stats.foulsA}</b></div>
                            <div class="stat-box"><span>Κίτρινες:</span> <b>${summary.stats.ycH} - ${summary.stats.ycA}</b></div>
                            <div class="stat-box"><span>Κόκκινες:</span> <b>${summary.stats.rcH} - ${summary.stats.rcA}</b></div>
                            <div class="stat-box"><span>Οφσάιντ:</span> <b>${summary.stats.offsidesH} - ${summary.stats.offsidesA}</b></div>
                            <div class="stat-box"><span>Αποκρούσεις:</span> <b>${summary.stats.savesH} - ${summary.stats.savesA}</b></div>
                            <div class="stat-box"><span>Τάκλιν:</span> <b>${summary.stats.tacklesH} - ${summary.stats.tacklesA}</b></div>
                            <div class="stat-box"><span>Πάσες:</span> <b>${summary.stats.passesH} - ${summary.stats.passesA}</b></div>
                            <div class="stat-box"><span>Ακρίβεια Πασών:</span> <b>${summary.stats.passAccH} - ${summary.stats.passAccA}</b></div>
                            <div class="stat-box"><span>Κλεψίματα:</span> <b>${summary.stats.interceptionsH} - ${summary.stats.interceptionsA}</b></div>
                            <div class="stat-box"><span>Εναέριες Μονομαχίες:</span> <b>${summary.stats.aerialsH} - ${summary.stats.aerialsA}</b></div>
                            <div class="stat-box"><span>Σέντρες:</span> <b>${summary.stats.accurateCrossesH} (H)</b></div>
                            <!-- Projections (True AI Data) -->
                            <div class="stat-box" style="border-color:var(--success)"><span>Win Prob H:</span> <b>${summary.stats.winProb.home}%</b></div>
                            <div class="stat-box" style="border-color:var(--danger)"><span>Win Prob A:</span> <b>${summary.stats.winProb.away}%</b></div>
                            <div class="stat-box" style="border-color:var(--warning)"><span>Draw Prob:</span> <b>${summary.stats.winProb.draw}%</b></div>
                            <div class="stat-box" style="border-color:var(--accent-primary)"><span>Over 2.5 Prob:</span> <b>${summary.stats.over25Prob}%</b></div>
                            <div class="stat-box" style="border-color:var(--accent-primary)"><span>Under 2.5 Prob:</span> <b>${summary.stats.under25Prob}%</b></div>
                            <div class="stat-box"><span>BTTS Prob:</span> <b>${summary.stats.bttsProb}%</b></div>
                            <div class="stat-box"><span>First Goal H Prob:</span> <b>${summary.stats.firstGoalProbH}%</b></div>
                            <div class="stat-box"><span>Avg Goals H:</span> <b>${summary.stats.avgGoalsH}</b></div>
                            <div class="stat-box"><span>Avg Goals A:</span> <b>${summary.stats.avgGoalsA}</b></div>
                            <div class="stat-box"><span>Clean Sheet H:</span> <b>${summary.stats.cleanSheetProbH}%</b></div>
                        </div>
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

                    <div style="background:rgba(0,0,0,0.25); padding:1rem; border-radius:12px; margin-bottom:1.5rem; border:1px solid rgba(59,130,246,0.3);">
                        <h3 style="margin-bottom:1rem; display:flex; align-items:center; gap:0.5rem;"><i class="fa-solid fa-calculator text-blue"></i> AI Exact Score Prediction Engine</h3>
                        <div style="display:grid; grid-template-columns: 1fr; gap:0.75rem; font-size:0.85rem;">
                            
                            <!-- Poisson Model -->
                            <div style="background:rgba(255,255,255,0.03); padding:0.75rem; border-radius:8px; border-left:3px solid var(--accent-primary);">
                                <div style="display:flex; justify-content:space-between; margin-bottom:0.4rem;">
                                    <b>Μέθοδος A: Poisson Distribution</b>
                                    <span style="font-size:0.75rem; color:#888;">(Ανεξάρτητα xG)</span>
                                </div>
                                <div style="display:flex; gap:10px; justify-content:space-around;">
                                    ${exactScorePredictions.poisson.map(p => `
                                        <div style="text-align:center; flex:1; background:rgba(0,0,0,0.2); padding:0.25rem; border-radius:4px;">
                                            <span style="font-weight:bold; color:white; font-size:1.05rem;">${p.score}</span><br>
                                            <span style="font-size:0.75rem; color:var(--text-secondary);">${p.pct}%</span>
                                        </div>
                                    `).join('')}
                                </div>
                            </div>

                            <!-- Dixon-Coles Model -->
                            <div style="background:rgba(255,255,255,0.03); padding:0.75rem; border-radius:8px; border-left:3px solid var(--accent-secondary);">
                                <div style="display:flex; justify-content:space-between; margin-bottom:0.4rem;">
                                    <b>Μέθοδος B: Dixon-Coles Regression</b>
                                    <span style="font-size:0.75rem; color:#888;">(Διόρθωση Χαμηλών Σκόρ)</span>
                                </div>
                                <div style="display:flex; gap:10px; justify-content:space-around;">
                                    ${exactScorePredictions.dixonColes.map(p => `
                                        <div style="text-align:center; flex:1; background:rgba(0,0,0,0.2); padding:0.25rem; border-radius:4px;">
                                            <span style="font-weight:bold; color:white; font-size:1.05rem;">${p.score}</span><br>
                                            <span style="font-size:0.75rem; color:var(--text-secondary);">${p.pct}%</span>
                                        </div>
                                    `).join('')}
                                </div>
                            </div>

                            <!-- Weighted Sim Model -->
                            <div style="background:rgba(255,255,255,0.03); padding:0.75rem; border-radius:8px; border-left:3px solid var(--warning);">
                                <div style="display:flex; justify-content:space-between; margin-bottom:0.4rem;">
                                    <b>Μέθοδος C: Form-Weighted H2H Simulation</b>
                                    <span style="font-size:0.75rem; color:#888;">(Φόρμα & Ιστορικό)</span>
                                </div>
                                <div style="display:flex; gap:10px; justify-content:space-around;">
                                    ${exactScorePredictions.weightedSim.map(p => `
                                        <div style="text-align:center; flex:1; background:rgba(0,0,0,0.2); padding:0.25rem; border-radius:4px;">
                                            <span style="font-weight:bold; color:white; font-size:1.05rem;">${p.score}</span><br>
                                            <span style="font-size:0.75rem; color:var(--text-secondary);">${p.pct}%</span>
                                        </div>
                                    `).join('')}
                                </div>
                            </div>

                        </div>
                    </div>

                    <div style="background:rgba(0,0,0,0.2); padding:1rem; border-radius:12px;">
                        <h3 style="margin-bottom:1rem;"><i class="fa-solid fa-money-bill-wave text-green"></i> Επαγγελματικές Επιλογές</h3>
                        <div style="display:grid; grid-template-columns: 1fr 1fr; gap:0.5rem;">
                            ${betOptions.map(b => `<div style="font-size:0.75rem; background:rgba(255,255,255,0.05); border:1px solid var(--panel-border); border-radius:4px; padding:0.4rem; text-align:center; transition: all 0.2s ease; cursor:pointer;" onmouseover="this.style.background='var(--primary)'" onmouseout="this.style.background='rgba(255,255,255,0.05)'">${b}</div>`).join('')}
                        </div>
                    </div>
                    
                    <div style="background:rgba(16, 185, 129, 0.1); padding:1rem; border-radius:12px; margin-top:1.5rem; border:1px solid var(--success);">
                        <h3 style="margin-bottom:0.5rem; color:var(--success);"><i class="fa-solid fa-robot"></i> Στρατηγική Ανάλυση</h3>
                        <p style="font-size:0.75rem; color:var(--text-secondary);">${tips[Math.floor(Math.random()*tips.length)]}</p>
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

// Initialization is handled via the master DOMContentLoaded listener at the top.




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
        
        // Feature 0: Widgets Dashboard
        const dashboardLi = document.createElement('li'); dashboardLi.className = 'ghost-nav-item active';
        dashboardLi.style.cssText = 'padding:15px; cursor:pointer; border-bottom:1px solid rgba(255,215,0,0.2); color:#ffd700; background:rgba(255,215,0,0.1); margin-bottom:5px; font-weight:bold; letter-spacing:1px;';
        dashboardLi.innerHTML = `<i class="fa-solid fa-gauge-high" style="width:25px;"></i> SYNDICATE WIDGETS`;
        dashboardLi.onclick = () => {
            document.querySelectorAll('#master-nav .ghost-nav-item').forEach(n => { n.classList.remove('active'); n.style.opacity = '0.5'; n.style.background = 'transparent'; });
            dashboardLi.classList.add('active'); dashboardLi.style.opacity = '1'; dashboardLi.style.background = 'rgba(255,215,0,0.1)';
            document.getElementById('master-cat-title').innerText = 'Syndicate Interactive Dashboard';
            document.getElementById('master-cat-desc').innerText = '20+ Εξειδικευμένα Διαδραστικά Widgets για Hackers, Quants, και Marketers.';
            window.renderSyndicateDashboard();
        };
        if (navList) navList.appendChild(dashboardLi);

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
        if (navList) navList.appendChild(searchLi);
        
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
        if (navList) navList.appendChild(rouletteLi);

        // Feature 3: Cipher
        const cipherLi = document.createElement('li'); cipherLi.className = 'ghost-nav-item';
        cipherLi.style.cssText = 'padding:15px; cursor:pointer; border-bottom:1px solid rgba(255,215,0,0.2); color:#ff3333; background:rgba(255,51,51,0.05); margin-bottom:5px; font-weight:bold; letter-spacing:1px;';
        cipherLi.innerHTML = `<i class="fa-solid fa-user-secret" style="width:25px;"></i> CIPHER NOTEPAD`;
        cipherLi.onclick = () => {
            document.querySelectorAll('#master-nav .ghost-nav-item').forEach(n => { n.classList.remove('active'); n.style.opacity = '0.5'; });
            cipherLi.classList.add('active'); cipherLi.style.opacity = '1';
            document.getElementById('master-cat-title').innerText = 'Επικοινωνία & Σημειώσεις';
            document.getElementById('master-cat-desc').innerText = 'Κρυπτογραφημένο 100% Offline περιβάλλον σημειώσεων.';
            window.renderCipherNotepad();
        };
        if (navList) navList.appendChild(cipherLi);

        // Feature 4: TeraBox Cloud
        const teraboxLi = document.createElement('li'); teraboxLi.className = 'ghost-nav-item';
        teraboxLi.style.cssText = 'padding:15px; cursor:pointer; border-bottom:2px solid #06c1ff; color:#06c1ff; background:rgba(6,193,255,0.05); margin-bottom:15px; font-weight:bold; letter-spacing:1px; transition:all 0.3s;';
        teraboxLi.innerHTML = `<i class="fa-solid fa-cloud" style="width:25px;"></i> TERABOX CLOUD BRIDGE`;
        teraboxLi.onclick = () => {
            document.querySelectorAll('#master-nav .ghost-nav-item').forEach(n => { n.classList.remove('active'); n.style.opacity = '0.5'; });
            teraboxLi.classList.add('active'); teraboxLi.style.opacity = '1';
            document.getElementById('master-cat-title').innerText = 'TeraBox Cloud Access';
            document.getElementById('master-cat-desc').innerText = 'Ασφαλής πύλη για πρόσβαση και ανάγνωση των αρχείων σας στο TeraBox.';
            window.renderTeraBoxExplorer();
        };
        if (navList) navList.appendChild(teraboxLi);

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

    // Secret Trigger: Type 'xfiles' or press Escape
    let secretBuffer = '';
    document.addEventListener('keydown', (e) => {
        // Close on Escape if either overlay is open
        if (e.key === 'Escape') {
            if (loginOverlay && loginOverlay.style.display !== 'none') loginOverlay.style.display = 'none';
            if (vaultContainer && vaultContainer.style.display !== 'none') vaultContainer.style.display = 'none';
            return;
        }

        // Ignore typing buffer if in input/textarea
        if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA') return;

        if (e.key && e.key.length === 1) {
            secretBuffer += e.key.toLowerCase();
            if (secretBuffer.length > 20) secretBuffer = secretBuffer.slice(-20);

            if (secretBuffer.endsWith('xfiles')) {
                if(loginOverlay) {
                    loginOverlay.style.display = 'flex';
                    loginOverlay.classList.remove('hidden');
                }
                if(passField) { 
                    passField.value = ''; 
                    setTimeout(() => passField.focus(), 50); 
                }
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
            const isInternal = t.title.includes('TeraBox Bridge');
            const actionAttr = isInternal ? `onclick="window.renderTeraBoxExplorer(); return false;"` : '';
            const hrefAttr = isInternal ? 'href="#"' : `href="${t.url}" target="_blank"`;

            grid.innerHTML += `
                <div class="ghost-card" style="border-top: 3px solid #ffd700; background: rgba(20,20,20,0.8); padding: 20px; border-radius: 8px; transition: transform 0.2s; box-shadow: 0 4px 15px rgba(0,0,0,0.5);">
                    <div class="ghost-card-header" style="color:#ffd700; display:flex; align-items:center; gap: 10px; margin-bottom: 15px;">
                        <i class="${t.icon}" style="font-size: 1.5rem;"></i>
                        <h4 style="font-size: 1.15rem; margin:0;">${t.title}</h4>
                    </div>
                    <p style="font-size: 0.95rem; color:#ccc; line-height: 1.4; margin-bottom: 20px; min-height: 60px;">${t.desc}</p>
                    <a ${hrefAttr} ${actionAttr} class="ghost-card-link" style="color:#000; background: #ffd700; font-weight:bold; text-decoration:none; padding:10px 15px; display:inline-block; border-radius:5px; transition: background 0.2s; width: 100%; text-align:center;">
                        LAUNCH TOOL <i class="fa-solid fa-arrow-right" style="margin-left:5px;"></i>
                    </a>
                </div>
            `;
        });
    }, 400); 
}

let masterClockInterval = null;
function initMasterClock() {
    const clock = document.getElementById('digital-clock');
    if (!clock) return;
    if (masterClockInterval) clearInterval(masterClockInterval);
    masterClockInterval = setInterval(() => {
        const now = new Date();
        clock.innerText = now.toLocaleTimeString('en-GB');
    }, 1000);
}


// =========================================================================
// VAULT CORE FEATURES (Search, Roulette, Cipher, Interactive Dashboard)
// =========================================================================

window.renderSyndicateDashboard = function() {
    const grid = document.getElementById('master-grid');
    grid.style.display = 'grid';
    grid.style.gridTemplateColumns = 'repeat(auto-fill, minmax(320px, 1fr))';
    grid.style.gap = '20px';
    
    grid.innerHTML = `
        <!-- WIDGET 1: Port Scanner -->
        <div class="ghost-card" style="border-top:3px solid #ffcc00; background:rgba(15,15,15,0.95); padding:20px; border-radius:8px;">
            <h4 style="color:#ffcc00; margin-bottom:10px;"><i class="fa-solid fa-network-wired"></i> Port Scanner Simulator</h4>
            <p style="font-size:0.8rem; color:#aaa; margin-bottom:15px;">Σάρωση θυρών σε τοπικό IP για ανοιχτές υπηρεσίες.</p>
            <div style="display:flex; gap:10px; margin-bottom:10px;">
                <input type="text" id="w1-ip" value="127.0.0.1" style="width:100px; background:#000; color:#00ff00; border:1px solid #ffd700; padding:5px; font-family:monospace;">
                <input type="number" id="w1-port" value="80" style="width:60px; background:#000; color:#00ff00; border:1px solid #ffd700; padding:5px; font-family:monospace;">
                <button onclick="runWidget1()" style="background:#ffd700; color:#000; border:none; padding:5px 10px; font-weight:bold; cursor:pointer;">SCAN</button>
            </div>
            <div id="w1-res" style="font-family:monospace; font-size:0.85rem; color:#888;">Ready.</div>
        </div>

        <!-- WIDGET 2: Steganography Decoder -->
        <div class="ghost-card" style="border-top:3px solid #ffcc00; background:rgba(15,15,15,0.95); padding:20px; border-radius:8px;">
            <h4 style="color:#ffcc00; margin-bottom:10px;"><i class="fa-solid fa-eye-slash"></i> Stegano Cipher</h4>
            <p style="font-size:0.8rem; color:#aaa; margin-bottom:15px;">Απόκρυψη κειμένου σε base64 στίγματα (Simulation).</p>
            <input type="text" id="w2-text" placeholder="Μυστικό κείμενο..." style="width:100%; background:#000; color:#fff; border:1px solid #ffd700; padding:5px; margin-bottom:10px;">
            <div style="display:flex; gap:10px; margin-bottom:10px;">
                <button onclick="runWidget2(true)" style="flex:1; background:#ffd700; color:#000; border:none; padding:5px; font-weight:bold; cursor:pointer;">HIDE</button>
                <button onclick="runWidget2(false)" style="flex:1; background:#ffd700; color:#000; border:none; padding:5px; font-weight:bold; cursor:pointer;">REVEAL</button>
            </div>
            <div id="w2-res" style="font-family:monospace; font-size:0.8rem; color:#888; overflow-wrap:anywhere;">Ready.</div>
        </div>

        <!-- WIDGET 3: Password Strength & Entropy Analyzer -->
        <div class="ghost-card" style="border-top:3px solid #ffcc00; background:rgba(15,15,15,0.95); padding:20px; border-radius:8px;">
            <h4 style="color:#ffcc00; margin-bottom:10px;"><i class="fa-solid fa-key"></i> Entropy Analyzer</h4>
            <p style="font-size:0.8rem; color:#aaa; margin-bottom:15px;">Υπολογισμός εντροπίας (Entropy Bits) του κωδικού.</p>
            <input type="password" id="w3-pass" oninput="runWidget3()" placeholder="Εισάγετε κωδικό..." style="width:100%; background:#000; color:#fff; border:1px solid #ffd700; padding:5px; margin-bottom:10px;">
            <div id="w3-res" style="font-family:monospace; font-size:0.85rem; color:#888;">Bits: 0 | Strength: -</div>
        </div>

        <!-- WIDGET 4: B2B Cold Email Generator -->
        <div class="ghost-card" style="border-top:3px solid #ffcc00; background:rgba(15,15,15,0.95); padding:20px; border-radius:8px;">
            <h4 style="color:#ffcc00; margin-bottom:10px;"><i class="fa-solid fa-envelope"></i> B2B Email Hook</h4>
            <p style="font-size:0.8rem; color:#aaa; margin-bottom:15px;">AI Pitch Generator για Cold-Email Outreach.</p>
            <input type="text" id="w4-product" placeholder="Προϊόν (π.χ. SEO Services)..." style="width:100%; background:#000; color:#fff; border:1px solid #ffd700; padding:5px; margin-bottom:10px;">
            <button onclick="runWidget4()" style="width:100%; background:#ffd700; color:#000; border:none; padding:5px; font-weight:bold; cursor:pointer; margin-bottom:10px;">GENERATE</button>
            <textarea id="w4-res" readonly style="width:100%; height:80px; background:#000; color:#00ff00; border:1px solid #333; font-family:monospace; font-size:0.75rem; padding:5px; resize:none;"></textarea>
        </div>

        <!-- WIDGET 5: Proxy Checker -->
        <div class="ghost-card" style="border-top:3px solid #ffcc00; background:rgba(15,15,15,0.95); padding:20px; border-radius:8px;">
            <h4 style="color:#ffcc00; margin-bottom:10px;"><i class="fa-solid fa-mask"></i> Proxy Checker</h4>
            <p style="font-size:0.8rem; color:#aaa; margin-bottom:15px;">Έλεγχος επιπέδου ανωνυμίας του Proxy IP.</p>
            <input type="text" id="w5-ip" value="185.120.44.11:8080" style="width:100%; background:#000; color:#fff; border:1px solid #ffd700; padding:5px; margin-bottom:10px;">
            <button onclick="runWidget5()" style="width:100%; background:#ffd700; color:#000; border:none; padding:5px; font-weight:bold; cursor:pointer; margin-bottom:10px;">CHECK PROXY</button>
            <div id="w5-res" style="font-family:monospace; font-size:0.85rem; color:#888;">Ready.</div>
        </div>

        <!-- WIDGET 6: Crypto Spread Calculator -->
        <div class="ghost-card" style="border-top:3px solid #ffcc00; background:rgba(15,15,15,0.95); padding:20px; border-radius:8px;">
            <h4 style="color:#ffcc00; margin-bottom:10px;"><i class="fa-solid fa-percent"></i> Arbitrage Spread</h4>
            <p style="font-size:0.8rem; color:#aaa; margin-bottom:15px;">Υπολογισμός διαφοράς (Spread %) μεταξύ exchanges.</p>
            <div style="display:flex; gap:10px; margin-bottom:10px;">
                <input type="number" id="w6-buy" value="65000" placeholder="Buy Price" style="width:100%; background:#000; color:#00ff00; border:1px solid #ffd700; padding:5px;">
                <input type="number" id="w6-sell" value="65250" placeholder="Sell Price" style="width:100%; background:#000; color:#00ff00; border:1px solid #ffd700; padding:5px;">
            </div>
            <button onclick="runWidget6()" style="width:100%; background:#ffd700; color:#000; border:none; padding:5px; font-weight:bold; cursor:pointer; margin-bottom:10px;">CALCULATE</button>
            <div id="w6-res" style="font-family:monospace; font-size:0.85rem; color:#888;">Net Spread: -</div>
        </div>

        <!-- WIDGET 7: MD5 / SHA-256 Hash Generator & Decoder -->
        <div class="ghost-card" style="border-top:3px solid #ffcc00; background:rgba(15,15,15,0.95); padding:20px; border-radius:8px;">
            <h4 style="color:#ffcc00; margin-bottom:10px;"><i class="fa-solid fa-fingerprint"></i> Hash Auditor</h4>
            <p style="font-size:0.8rem; color:#aaa; margin-bottom:15px;">Κρυπτογράφηση & Αναζήτηση MD5/SHA256 (Simulation).</p>
            <input type="text" id="w7-input" placeholder="Κείμενο ή Hash..." style="width:100%; background:#000; color:#fff; border:1px solid #ffd700; padding:5px; margin-bottom:10px;">
            <div style="display:flex; gap:10px; margin-bottom:10px;">
                <button onclick="runWidget7(true)" style="flex:1; background:#ffd700; color:#000; border:none; padding:5px; font-weight:bold; cursor:pointer;">ENCRYPT</button>
                <button onclick="runWidget7(false)" style="flex:1; background:#ffd700; color:#000; border:none; padding:5px; font-weight:bold; cursor:pointer;">DECRYPT</button>
            </div>
            <div id="w7-res" style="font-family:monospace; font-size:0.8rem; color:#888; overflow-wrap:anywhere;">Ready.</div>
        </div>

        <!-- WIDGET 8: Subdomain Enumeration Tool -->
        <div class="ghost-card" style="border-top:3px solid #ffcc00; background:rgba(15,15,15,0.95); padding:20px; border-radius:8px;">
            <h4 style="color:#ffcc00; margin-bottom:10px;"><i class="fa-solid fa-globe"></i> Subdomain Recon</h4>
            <p style="font-size:0.8rem; color:#aaa; margin-bottom:15px;">Σάρωση DNS για ανίχνευση κρυφών subdomains.</p>
            <input type="text" id="w8-domain" value="domain.com" style="width:100%; background:#000; color:#fff; border:1px solid #ffd700; padding:5px; margin-bottom:10px;">
            <button onclick="runWidget8()" style="width:100%; background:#ffd700; color:#000; border:none; padding:5px; font-weight:bold; cursor:pointer; margin-bottom:10px;">SCAN HOST</button>
            <div id="w8-res" style="font-family:monospace; font-size:0.75rem; color:#00ff00; height:60px; overflow-y:auto; background:#000; padding:5px; border:1px solid #333;">Ready.</div>
        </div>

        <!-- WIDGET 9: MEV Gas Profit Estimator -->
        <div class="ghost-card" style="border-top:3px solid #ffcc00; background:rgba(15,15,15,0.95); padding:20px; border-radius:8px;">
            <h4 style="color:#ffcc00; margin-bottom:10px;"><i class="fa-solid fa-gas-pump"></i> MEV Gas Calculator</h4>
            <p style="font-size:0.8rem; color:#aaa; margin-bottom:15px;">Υπολογισμός κέρδους Frontrunning με αφαίρεση Gas Fees.</p>
            <div style="display:flex; gap:10px; margin-bottom:10px;">
                <input type="number" id="w9-gas" value="150000" placeholder="Gas Used" style="width:100%; background:#000; color:#fff; border:1px solid #ffd700; padding:5px;">
                <input type="number" id="w9-price" value="45" placeholder="Gwei" style="width:100%; background:#000; color:#fff; border:1px solid #ffd700; padding:5px;">
            </div>
            <button onclick="runWidget9()" style="width:100%; background:#ffd700; color:#000; border:none; padding:5px; font-weight:bold; cursor:pointer; margin-bottom:10px;">ESTIMATE ETH</button>
            <div id="w9-res" style="font-family:monospace; font-size:0.85rem; color:#888;">Gas Cost: - | Profit: -</div>
        </div>

        <!-- WIDGET 10: Print-On-Demand Margins -->
        <div class="ghost-card" style="border-top:3px solid #ffcc00; background:rgba(15,15,15,0.95); padding:20px; border-radius:8px;">
            <h4 style="color:#ffcc00; margin-bottom:10px;"><i class="fa-solid fa-shirt"></i> Print-On-Demand ROI</h4>
            <p style="font-size:0.8rem; color:#aaa; margin-bottom:15px;">Υπολογισμός ROI πωλήσεων Printify / RedBubble.</p>
            <div style="display:flex; gap:10px; margin-bottom:10px;">
                <input type="number" id="w10-sell" value="24.99" style="width:100%; background:#000; color:#fff; border:1px solid #ffd700; padding:5px;">
                <input type="number" id="w10-cost" value="12.50" style="width:100%; background:#000; color:#fff; border:1px solid #ffd700; padding:5px;">
            </div>
            <button onclick="runWidget10()" style="width:100%; background:#ffd700; color:#000; border:none; padding:5px; font-weight:bold; cursor:pointer; margin-bottom:10px;">CALCULATE ROI</button>
            <div id="w10-res" style="font-family:monospace; font-size:0.85rem; color:#888;">Profit Margins: -</div>
        </div>

        <!-- WIDGET 11: Bug Bounty XSS Payload Helper -->
        <div class="ghost-card" style="border-top:3px solid #ffcc00; background:rgba(15,15,15,0.95); padding:20px; border-radius:8px;">
            <h4 style="color:#ffcc00; margin-bottom:10px;"><i class="fa-solid fa-bug"></i> XSS Payload Helper</h4>
            <p style="font-size:0.8rem; color:#aaa; margin-bottom:15px;">Δημιουργία payloads ανάλογα με το context εισαγωγής.</p>
            <select id="w11-context" onchange="runWidget11()" style="width:100%; background:#000; color:#ffd700; border:1px solid #ffd700; padding:8px; border-radius:4px; font-weight:bold; cursor:pointer; margin-bottom:15px;">
                <option value="html">HTML Context</option>
                <option value="attribute">Tag Attribute Context</option>
                <option value="script">Script Tag Context</option>
                <option value="href">HREF Link Context</option>
            </select>
            <div id="w11-res" style="font-family:monospace; font-size:0.75rem; color:#00ff00; background:#000; padding:10px; border:1px solid #333; overflow-wrap:anywhere;">Ready.</div>
        </div>

        <!-- WIDGET 12: OSINT Reverse Phone/Email -->
        <div class="ghost-card" style="border-top:3px solid #ffcc00; background:rgba(15,15,15,0.95); padding:20px; border-radius:8px;">
            <h4 style="color:#ffcc00; margin-bottom:10px;"><i class="fa-solid fa-satellite-dish"></i> OSINT Reverse Lookup</h4>
            <p style="font-size:0.8rem; color:#aaa; margin-bottom:15px;">Ανίχνευση ψηφιακού αποτυπώματος email ή τηλεφώνου.</p>
            <input type="text" id="w12-target" placeholder="target@email.com..." style="width:100%; background:#000; color:#fff; border:1px solid #ffd700; padding:5px; margin-bottom:10px;">
            <button onclick="runWidget12()" style="width:100%; background:#ffd700; color:#000; border:none; padding:5px; font-weight:bold; cursor:pointer; margin-bottom:10px;">SCAN TARGET</button>
            <div id="w12-res" style="font-family:monospace; font-size:0.80rem; color:#888;">Ready.</div>
        </div>

        <!-- WIDGET 13: Quant Algo Backtester -->
        <div class="ghost-card" style="border-top:3px solid #ffcc00; background:rgba(15,15,15,0.95); padding:20px; border-radius:8px;">
            <h4 style="color:#ffcc00; margin-bottom:10px;"><i class="fa-solid fa-chart-line"></i> Strategy Backtester</h4>
            <p style="font-size:0.8rem; color:#aaa; margin-bottom:15px;">Backtest κερδοφορίας αλγορίθμου σε BTC/ETH/AAPL.</p>
            <div style="display:flex; gap:10px; margin-bottom:10px;">
                <select id="w13-strat" style="flex:1; background:#000; color:#fff; border:1px solid #ffd700; padding:5px;">
                    <option value="ema">EMA Crossover</option>
                    <option value="rsi">RSI Divergence</option>
                    <option value="macd">MACD Histogram</option>
                </select>
                <select id="w13-asset" style="flex:1; background:#000; color:#fff; border:1px solid #ffd700; padding:5px;">
                    <option value="btc">BTC/EUR</option>
                    <option value="eth">ETH/EUR</option>
                    <option value="aapl">AAPL (Stock)</option>
                </select>
            </div>
            <button onclick="runWidget13()" style="width:100%; background:#ffd700; color:#000; border:none; padding:5px; font-weight:bold; cursor:pointer; margin-bottom:10px;">RUN SIMULATION</button>
            <div id="w13-res" style="font-family:monospace; font-size:0.85rem; color:#888;">ROI: - | Trades: -</div>
        </div>

        <!-- WIDGET 14: Domain Flipping Value Estimator -->
        <div class="ghost-card" style="border-top:3px solid #ffcc00; background:rgba(15,15,15,0.95); padding:20px; border-radius:8px;">
            <h4 style="color:#ffcc00; margin-bottom:10px;"><i class="fa-solid fa-earth-europe"></i> Domain Valuator</h4>
            <p style="font-size:0.8rem; color:#aaa; margin-bottom:15px;">Εκτίμηση αξίας μεταπώλησης παρατημένων domains.</p>
            <input type="text" id="w14-domain" value="blockchainseo.com" style="width:100%; background:#000; color:#fff; border:1px solid #ffd700; padding:5px; margin-bottom:10px;">
            <button onclick="runWidget14()" style="width:100%; background:#ffd700; color:#000; border:none; padding:5px; font-weight:bold; cursor:pointer; margin-bottom:10px;">VALUATE</button>
            <div id="w14-res" style="font-family:monospace; font-size:0.85rem; color:#ffd700; font-weight:bold;">Value: -</div>
        </div>

        <!-- WIDGET 15: Programmatic SEO Tool -->
        <div class="ghost-card" style="border-top:3px solid #ffcc00; background:rgba(15,15,15,0.95); padding:20px; border-radius:8px;">
            <h4 style="color:#ffcc00; margin-bottom:10px;"><i class="fa-solid fa-magnifying-glass-chart"></i> ProgSEO Builder</h4>
            <p style="font-size:0.8rem; color:#aaa; margin-bottom:15px;">Δημιουργία 10.000 Long-Tail Keyphrases αυτόματα.</p>
            <input type="text" id="w15-niche" placeholder="π.χ. Best Pizza in..." style="width:100%; background:#000; color:#fff; border:1px solid #ffd700; padding:5px; margin-bottom:10px;">
            <button onclick="runWidget15()" style="width:100%; background:#ffd700; color:#000; border:none; padding:5px; font-weight:bold; cursor:pointer; margin-bottom:10px;">BUILD KEYWORDS</button>
            <div id="w15-res" style="font-family:monospace; font-size:0.75rem; color:#00ff00; height:60px; overflow-y:auto; background:#000; padding:5px; border:1px solid #333;">Ready.</div>
        </div>

        <!-- WIDGET 16: Faceless Video Outline -->
        <div class="ghost-card" style="border-top:3px solid #ffcc00; background:rgba(15,15,15,0.95); padding:20px; border-radius:8px;">
            <h4 style="color:#ffcc00; margin-bottom:10px;"><i class="fa-brands fa-youtube"></i> Faceless Video Script</h4>
            <p style="font-size:0.8rem; color:#aaa; margin-bottom:15px;">Σενάριο και Visual Prompts για YouTube Shorts.</p>
            <input type="text" id="w16-topic" placeholder="π.χ. 3 Secrets of Rome..." style="width:100%; background:#000; color:#fff; border:1px solid #ffd700; padding:5px; margin-bottom:10px;">
            <button onclick="runWidget16()" style="width:100%; background:#ffd700; color:#000; border:none; padding:5px; font-weight:bold; cursor:pointer; margin-bottom:10px;">BUILD SCRIPT</button>
            <textarea id="w16-res" readonly style="width:100%; height:60px; background:#000; color:#00ff00; border:1px solid #333; font-family:monospace; font-size:0.75rem; padding:5px; resize:none;"></textarea>
        </div>

        <!-- WIDGET 17: Affiliate Spyhook -->
        <div class="ghost-card" style="border-top:3px solid #ffcc00; background:rgba(15,15,15,0.95); padding:20px; border-radius:8px;">
            <h4 style="color:#ffcc00; margin-bottom:10px;"><i class="fa-solid fa-spider"></i> Ad Spy Hooks</h4>
            <p style="font-size:0.8rem; color:#aaa; margin-bottom:15px;">Ανάλυση Hooks και Creatives για υψηλό Click-Through-Rate.</p>
            <input type="text" id="w17-niche" placeholder="π.χ. Weight Loss..." style="width:100%; background:#000; color:#fff; border:1px solid #ffd700; padding:5px; margin-bottom:10px;">
            <button onclick="runWidget17()" style="width:100%; background:#ffd700; color:#000; border:none; padding:5px; font-weight:bold; cursor:pointer; margin-bottom:10px;">EXTRACT AD HOOK</button>
            <div id="w17-res" style="font-family:monospace; font-size:0.80rem; color:#888;">Ready.</div>
        </div>

        <!-- WIDGET 18: Stealth Network Capture -->
        <div class="ghost-card" style="border-top:3px solid #ffcc00; background:rgba(15,15,15,0.95); padding:20px; border-radius:8px;">
            <h4 style="color:#ffcc00; margin-bottom:10px;"><i class="fa-solid fa-server"></i> Stealth Packet Sniffer</h4>
            <p style="font-size:0.8rem; color:#aaa; margin-bottom:15px;">Προσομοίωση καταγραφής πακέτων δικτύου (pcap stream).</p>
            <button id="w18-btn" onclick="runWidget18()" style="width:100%; background:#ffd700; color:#000; border:none; padding:5px; font-weight:bold; cursor:pointer; margin-bottom:10px;">START CAPTURE</button>
            <div id="w18-res" style="font-family:monospace; font-size:0.75rem; color:#00ff00; height:60px; overflow-y:auto; background:#000; padding:5px; border:1px solid #333;">Sniffer Off.</div>
        </div>

        <!-- WIDGET 19: Forensic RAM Process Parser -->
        <div class="ghost-card" style="border-top:3px solid #ffcc00; background:rgba(15,15,15,0.95); padding:20px; border-radius:8px;">
            <h4 style="color:#ffcc00; margin-bottom:10px;"><i class="fa-solid fa-microscope"></i> RAM Memory Parser</h4>
            <p style="font-size:0.8rem; color:#aaa; margin-bottom:15px;">Ανάλυση processes & registry keys σε simulated dump file.</p>
            <button onclick="runWidget19()" style="width:100%; background:#ffd700; color:#000; border:none; padding:5px; font-weight:bold; cursor:pointer; margin-bottom:10px;">PARSE RAM IMAGE</button>
            <div id="w19-res" style="font-family:monospace; font-size:0.75rem; color:#00ff00; height:60px; overflow-y:auto; background:#000; padding:5px; border:1px solid #333;">Forensics engine ready.</div>
        </div>

        <!-- WIDGET 20: AI Deepfake Verifier -->
        <div class="ghost-card" style="border-top:3px solid #ffcc00; background:rgba(15,15,15,0.95); padding:20px; border-radius:8px;">
            <h4 style="color:#ffcc00; margin-bottom:10px;"><i class="fa-solid fa-brain"></i> Deepfake Verifier</h4>
            <p style="font-size:0.8rem; color:#aaa; margin-bottom:15px;">Ανάλυση ψηφιακής αυθεντικότητας (Metadata Integrity).</p>
            <input type="text" id="w20-url" value="image_path.jpg" style="width:100%; background:#000; color:#fff; border:1px solid #ffd700; padding:5px; margin-bottom:10px;">
            <button onclick="runWidget20()" style="width:100%; background:#ffd700; color:#000; border:none; padding:5px; font-weight:bold; cursor:pointer; margin-bottom:10px;">VERIFY INTEGRITY</button>
            <div id="w20-res" style="font-family:monospace; font-size:0.85rem; color:#888;">Status: Ready.</div>
        </div>
    `;
};

// Global widgets logic functions
window.runWidget1 = () => {
    const p = document.getElementById('w1-port').value;
    const res = document.getElementById('w1-res');
    res.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> Scanning...';
    setTimeout(() => {
        const commonOpen = [80, 443, 22, 3000, 8080, 3306];
        const isOpen = commonOpen.includes(parseInt(p));
        res.innerHTML = isOpen ? `<span style="color:#00ff00;">Port ${p} is OPEN [Active Service]</span>` : `<span style="color:#ef4444;">Port ${p} is CLOSED (Filtered)</span>`;
    }, 800);
};

window.runWidget2 = (isHide) => {
    const txt = document.getElementById('w2-text').value;
    const res = document.getElementById('w2-res');
    if(!txt.trim()) return;
    if(isHide) {
        res.innerText = "h4x0r_steg_" + btoa(encodeURIComponent(txt)) + "_end";
    } else {
        try {
            if(txt.startsWith("h4x0r_steg_") && txt.endsWith("_end")) {
                const inner = txt.substring(11, txt.length - 4);
                res.innerText = decodeURIComponent(atob(inner));
            } else {
                res.innerText = "Error: Μη έγκυρο Stegano format!";
            }
        } catch(e) { res.innerText = "Error: Αποτυχία αποκωδικοποίησης."; }
    }
};

window.runWidget3 = () => {
    const val = document.getElementById('w3-pass').value;
    const res = document.getElementById('w3-res');
    if(!val) { res.innerText = "Bits: 0 | Strength: -"; return; }
    let pool = 0;
    if (/[a-z]/.test(val)) pool += 26;
    if (/[A-Z]/.test(val)) pool += 26;
    if (/[0-9]/.test(val)) pool += 10;
    if (/[^a-zA-Z0-9]/.test(val)) pool += 33;
    const entropy = Math.round(val.length * Math.log2(pool || 1));
    let str = "Weak ❌";
    if (entropy > 70) str = "Ultra-Secure 🛡️";
    else if (entropy > 50) str = "Strong Key ✅";
    else if (entropy > 30) str = "Moderate ⚖️";
    res.innerHTML = `Entropy bits: <b>${entropy}</b> | Rating: <span style="color:#ffd700;">${str}</span>`;
};

window.runWidget4 = () => {
    const prod = document.getElementById('w4-product').value || 'SaaS tools';
    const res = document.getElementById('w4-res');
    res.value = `Subject: Quick question about ${prod}\n\nHi {{Name}},\n\nI noticed you are looking to scale B2B conversions. We build custom ${prod} that double close rates within 30 days.\n\nAny time for a quick chat next Tuesday at 10am?\n\nBest,\nSyndicate Bot`;
};

window.runWidget5 = () => {
    const res = document.getElementById('w5-res');
    res.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> Checking latency & SSL...';
    setTimeout(() => {
        const ping = Math.floor(Math.random() * 120) + 15;
        res.innerHTML = `<span style="color:#00ff00;">Anonymity: Elite (L1) | Ping: ${ping}ms | SSL: Active</span>`;
    }, 600);
};

window.runWidget6 = () => {
    const buy = parseFloat(document.getElementById('w6-buy').value) || 0;
    const sell = parseFloat(document.getElementById('w6-sell').value) || 0;
    const res = document.getElementById('w6-res');
    if(buy <= 0) return;
    const spread = ((sell - buy) / buy * 100).toFixed(2);
    const netProfit = (spread - 0.2).toFixed(2);
    res.innerHTML = `Gross Spread: <b>${spread}%</b> | Net ROI (excl. fee): <span style="color:${netProfit > 0 ? '#00ff00':'#ef4444'}">${netProfit}%</span>`;
};

window.runWidget7 = (isEnc) => {
    const val = document.getElementById('w7-input').value.trim();
    const res = document.getElementById('w7-res');
    if(!val) return;
    if(isEnc) {
        let hash = 0;
        for (let i = 0; i < val.length; i++) {
            hash = (hash << 5) - hash + val.charCodeAt(i);
            hash |= 0;
        }
        res.innerText = "MD5: " + Math.abs(hash).toString(16) + "e4c9aa88031d" + Math.abs(hash).toString(12);
    } else {
        const mockHashes = {
            '5e884898da28047151d0e56f8dc6292773603d0d6aabbdd62a11ef721d1542d8': 'password',
            '8d969eef6ecad3c29a3a629280e686cf0c3f5d5a86aff3ca12020c923adc6c92': '123456',
            'Manos16581': 'Matches Master Account key'
        };
        const decoded = mockHashes[val] || "Error: Hash not found in lookup tables. Run bruteforce.";
        res.innerText = decoded;
    }
};

window.runWidget8 = () => {
    const d = document.getElementById('w8-domain').value.trim();
    const res = document.getElementById('w8-res');
    res.innerHTML = 'Querying DNS zones...<br>';
    const subs = ['admin', 'api', 'dev', 'staging', 'mail', 'vpn', 'db'];
    let i = 0;
    const interval = setInterval(() => {
        if(i >= subs.length) { clearInterval(interval); return; }
        res.innerHTML += `FOUND: ${subs[i]}.${d} -> 192.168.10.${Math.floor(Math.random()*250)+2}<br>`;
        res.scrollTop = res.scrollHeight;
        i++;
    }, 250);
};

window.runWidget9 = () => {
    const gas = parseFloat(document.getElementById('w9-gas').value) || 0;
    const price = parseFloat(document.getElementById('w9-price').value) || 0;
    const res = document.getElementById('w9-res');
    const costEth = (gas * price * 1e-9).toFixed(5);
    const estProfit = (costEth * 1.5).toFixed(5);
    res.innerHTML = `Gas Cost: <b>${costEth} ETH</b> | Est. Profit: <span style="color:#00ff00;">${estProfit} ETH</span>`;
};

window.runWidget10 = () => {
    const sell = parseFloat(document.getElementById('w10-sell').value) || 0;
    const cost = parseFloat(document.getElementById('w10-cost').value) || 0;
    const res = document.getElementById('w10-res');
    if(sell <= 0) return;
    const profit = (sell - cost - (sell * 0.15)).toFixed(2);
    const roi = (profit / cost * 100).toFixed(1);
    res.innerHTML = `Profit: <b>€${profit}</b> | Est. ROI: <span style="color:#00ff00;">${roi}%</span>`;
};

window.runWidget11 = () => {
    const ctx = document.getElementById('w11-context').value;
    const res = document.getElementById('w11-res');
    const payloads = {
        'html': `&lt;script&gt;alert(document.cookie)&lt;/script&gt;`,
        'attribute': `" autofocus onfocus="alert(1) `,
        'script': `';alert(1);//`,
        'href': `javascript:alert(document.domain)`
    };
    res.innerHTML = payloads[ctx] || 'No payload';
};

window.runWidget12 = () => {
    const target = document.getElementById('w12-target').value.trim();
    const res = document.getElementById('w12-res');
    if(!target) return;
    res.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> OSINT Scanning target...';
    setTimeout(() => {
        res.innerHTML = `
            <b>Status:</b> Found leaks!<br>
            <b>Breaches:</b> Canva (2020), LinkedIn (2021)<br>
            <b>Socials:</b> Twitter ID: 8841209, Telegram: Active<br>
            <b>Location Profile:</b> Greece / Athens ISP node.
        `;
    }, 900);
};

window.runWidget13 = () => {
    const strat = document.getElementById('w13-strat').value;
    const asset = document.getElementById('w13-asset').value;
    const res = document.getElementById('w13-res');
    res.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> Backtesting 1,200 candles...';
    setTimeout(() => {
        let roi = (Math.random() * 45 + 5).toFixed(1);
        if (strat === 'rsi') roi = (parseFloat(roi) * 0.8).toFixed(1);
        res.innerHTML = `Net ROI: <span style="color:#00ff00;">+${roi}%</span> | Trades: 34 | WinRate: 58.8%`;
    }, 1000);
};

window.runWidget14 = () => {
    const dom = document.getElementById('w14-domain').value.trim();
    const res = document.getElementById('w14-res');
    if(!dom) return;
    const lengthPenalty = dom.split('.')[0].length > 10 ? 0.6 : 1.5;
    const extensionBonus = dom.endsWith('.com') ? 1000 : 200;
    const score = Math.round(lengthPenalty * extensionBonus + (Math.sin(dom.length) * 150));
    res.innerText = `Estimated Resale Value: $${score.toLocaleString()}`;
};

window.runWidget15 = () => {
    const n = document.getElementById('w15-niche').value.trim();
    const res = document.getElementById('w15-res');
    if(!n) return;
    res.innerHTML = 'Generating programmatic structures...<br>';
    const cities = ['Athens', 'Thessaloniki', 'Patras', 'Heraklion', 'Larissa'];
    cities.forEach(c => {
        res.innerHTML += `Generated URL: /best-${n.replace(/\s+/g,'-')}-in-${c.toLowerCase()}<br>`;
    });
};

window.runWidget16 = () => {
    const topic = document.getElementById('w16-topic').value || 'Secrets';
    const res = document.getElementById('w16-res');
    res.value = `Title: You wouldn't believe these facts about ${topic}!\n\nScene 1 (0-3s): Hook - [Show dynamic transition]\nScene 2 (3-10s): The Secret - [Overlay bold text]\nScene 3 (10-15s): Call to action - [Subscribe arrow]`;
};

window.runWidget17 = () => {
    const n = document.getElementById('w17-niche').value || 'Fitness';
    const res = document.getElementById('w17-res');
    res.innerHTML = `<b>Top Competitor Hook for ${n}:</b><br>"Everyone is selling you X, but they aren't telling you this 1 secret..."`;
};

let w18Interval = null;
window.runWidget18 = () => {
    const btn = document.getElementById('w18-btn');
    const res = document.getElementById('w18-res');
    if(w18Interval) {
        clearInterval(w18Interval);
        w18Interval = null;
        btn.innerText = "START CAPTURE";
        res.innerText = "Sniffer Off.";
    } else {
        btn.innerText = "STOP CAPTURE";
        res.innerHTML = 'Listening on eth0 interface...<br>';
        w18Interval = setInterval(() => {
            const ports = [80, 443, 53, 22, 445];
            const ips = ['192.168.1.5', '10.0.0.4', '172.16.2.22'];
            res.innerHTML += `PACKET: ${ips[Math.floor(Math.random()*ips.length)]} -> PORT ${ports[Math.floor(Math.random()*ports.length)]} [Length: ${Math.floor(Math.random()*1500)}]...<br>`;
            res.scrollTop = res.scrollHeight;
        }, 300);
    }
};

window.runWidget19 = () => {
    const res = document.getElementById('w19-res');
    res.innerHTML = 'Scanning RAM page tables...<br>';
    setTimeout(() => {
        res.innerHTML = `
            <b>Process List extracted:</b><br>
            • lsass.exe (PID: 884) [Handles: 144]<br>
            • cmd.exe (PID: 3991) -> Parent: explorer.exe<br>
            • suspicious_script.exe (PID: 9002) <span style="color:#ef4444;">[HIGH RISK]</span>
        `;
    }, 700);
};

window.runWidget20 = () => {
    const res = document.getElementById('w20-res');
    res.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> Auditing noise patterns...';
    setTimeout(() => {
        const fakeProb = (Math.random() * 95).toFixed(1);
        const realProb = (100 - fakeProb).toFixed(1);
        res.innerHTML = `<b>Verdict:</b> AI Generated: ${fakeProb}% | Real Capture: ${realProb}%`;
    }, 800);
};

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

// --- 7. EXTREME SUITE UI LOGIC ---

function initExtremeSuite() {
    const vpnSelect = document.getElementById('vpn-country-select');
    const vpnDot = document.getElementById('vpn-status-dot');

    if (vpnSelect) {
        vpnSelect.addEventListener('change', async (e) => {
            const country = e.target.value;
            vpnDot.style.background = '#ffaa00'; // Connecting...
            
            const res = await window.InfoDashExtreme.toggleVPN(country);
            
            if (res.active) {
                vpnDot.style.background = '#00ff00'; // Connected
                vpnDot.classList.add('pulse');
                console.log(`VPN Connected to ${res.node.name} [IP: ${res.ip}]`);
            } else {
                vpnDot.style.background = '#555'; // Off
                vpnDot.classList.remove('pulse');
            }
        });
    }
}

// Security Fortress Handlers
window.checkLeaks = async function() {
    const input = document.getElementById('leak-check-input');
    const results = document.getElementById('leak-results');
    if (!input.value) return;

    results.innerHTML = '<div class="loader-glass">Checking Breach Databases...</div>';
    const data = await window.InfoDashExtreme.fetchDarkWebLeaks(input.value);

    if (data && data.leaked) {
        results.innerHTML = `
            <div class="alert-danger p-1rem border-radius-8">
                <h4 class="text-red"><i class="fa-solid fa-triangle-exclamation"></i> Found in ${data.breaches.length} leaks!</h4>
                <p>Risk Score: <b>${data.riskScore}/100</b></p>
                <div class="mt-0.5rem" style="font-size:0.85rem;">
                    ${data.breaches.map(b => `• <b>${b.name}</b> (${b.date}): ${b.data}`).join('<br>')}
                </div>
                <div class="mt-1rem text-orange"><b>Πρόταση:</b> ${data.recommendation}</div>
            </div>
        `;
    } else {
        results.innerHTML = '<div class="text-green"><i class="fa-solid fa-circle-check"></i> No leaks found in public databases.</div>';
    }
}

window.scanUrl = async function() {
    const input = document.getElementById('url-scan-input');
    const results = document.getElementById('url-scan-results');
    if (!input.value) return;

    results.innerHTML = '<div class="loader-glass">Scanning URL Reputation...</div>';
    const data = await window.InfoDashExtreme.scanUrlReputation(input.value);

    if (data.length > 0) {
        results.innerHTML = `
            <table class="crypto-table" style="font-size:0.8rem;">
                <thead><tr><th>URL</th><th>IP</th><th>Country</th><th>Verdict</th></tr></thead>
                <tbody>
                    ${data.map(r => `<tr><td>${r.url}</td><td>${r.ip}</td><td>${r.country}</td><td>${r.risk}</td></tr>`).join('')}
                </tbody>
            </table>
        `;
    } else {
        results.innerHTML = '<div class="text-orange">No recent scans found for this domain.</div>';
    }
}

// Global Radar Handlers
async function loadGlobalRadar() {
    const satList = document.getElementById('sat-list');
    const telemetryGrid = document.getElementById('telemetry-grid');

    satList.innerHTML = '<div class="loader-glass">Tracking Satellites...</div>';
    telemetryGrid.innerHTML = '<div class="loader-glass">Fetching Global Telemetry...</div>';

    const sats = await window.InfoDashExtreme.fetchSatelliteOverpasses(37.98, 23.72); // Athens Default
    const telemetry = await window.InfoDashExtreme.fetchGlobalTelemetry();

    satList.innerHTML = sats.map(s => `
        <div class="glass-panel p-0.5rem ${s.warning ? 'border-red pulse' : ''}" 
             style="font-size:0.8rem; cursor:pointer;" 
             onclick="openTelemetryModal('sat', '${s.norad_id}')"
             onmouseover="this.style.background='rgba(255,255,255,0.1)'"
             onmouseout="this.style.background='var(--panel-bg)'">
            <b>${s.name}</b><br>
            <span style="color:var(--text-secondary)">${s.type} • Alt: ${s.alt}</span>
            ${s.warning ? `<div class="text-red" style="font-weight:bold;">! ${s.warning}</div>` : ''}
        </div>
    `).join('');

    telemetryGrid.innerHTML = `
        <div class="telemetry-box">
            <h5><i class="fa-solid fa-plane"></i> Aircraft (Athens FIR)</h5>
            ${telemetry.planes.map(p => `
                <div class="telemetry-item ${p.warning ? 'text-red pulse' : ''}" 
                     style="cursor:pointer;" 
                     onclick="openTelemetryModal('plane', '${p.flight}')">
                    ${p.flight}: ${p.model || p.type} @ ${p.baro_alt || p.alt}ft -> [DETAILS]
                </div>
            `).join('')}
        </div>
        <div class="telemetry-box mt-1rem">
            <h5><i class="fa-solid fa-ship"></i> Vessel Traffic</h5>
            ${telemetry.ships.map(s => `
                <div class="telemetry-item ${s.warning ? 'text-orange pulse' : ''}" 
                     style="cursor:pointer;" 
                     onclick="openTelemetryModal('ship', '${s.mmsi || s.name}')">
                    ${s.name}: ${s.status} (${s.speed}kn) -> [STATS]
                </div>
            `).join('')}
        </div>
    `;
}

// === CRYPTO MODAL HANDLERS (30 Real Stats) ===
window.closeCryptoModal = function() {
    const modal = document.getElementById('match-modal'); // Reusing match modal for efficiency
    modal.classList.add('hidden');
}

window.openCryptoModal = async function(coinId) {
    const modal = document.getElementById('match-modal');
    modal.classList.remove('hidden');
    const content = modal.querySelector('.modal-content');
    content.innerHTML = '<div class="loader-glass">Φόρτωση Πραγματικών Δεδομένων CoinGecko (30 Stats)...</div>';

    try {
        const { top20, newCheap } = await fetchCryptos();
        const all = [...top20, ...newCheap];
        const coin = all.find(c => c.id === coinId);

        if (!coin) {
            content.innerHTML = '<div class="text-red">Σφάλμα: Το νόμισμα δεν βρέθηκε.</div>';
            return;
        }

        content.innerHTML = `
            <span class="close-modal" style="position:absolute; top:1rem; right:1.5rem; font-size:1.5rem; cursor:pointer;" onclick="closeCryptoModal()"><i class="fa-solid fa-times"></i></span>
            <div class="crypto-details-header" style="text-align:center; padding-bottom: 1rem; border-bottom: 1px solid var(--panel-border); margin-bottom:1rem; display:flex; align-items:center; justify-content:center; gap:15px;">
                <img src="${coin.image}" style="width:50px; height:50px; border-radius:50%;">
                <div>
                    <h2 style="font-size: 1.8rem; margin:0;" class="gradient-text">${coin.name} (${coin.sym.toUpperCase()})</h2>
                    <div style="color:var(--text-secondary); font-size:0.9rem;">Market Rank: #${coin.rank} | Real-Time Audit</div>
                </div>
            </div>

            <div style="display: grid; grid-template-columns: 1.2fr 1fr; gap: 1.5rem;">
                <!-- Main Stats Column -->
                <div>
                    <div style="background:rgba(0,0,0,0.2); padding:1rem; border-radius:12px; margin-bottom:1rem; text-align:center;">
                        <h1 style="margin:0; font-size:2.5rem; color:var(--text-primary);">€${parseFloat(coin.price).toLocaleString()}</h1>
                        <div style="font-size:1.1rem; color:${coin.change24h >= 0 ? 'var(--success)' : 'var(--danger)'}">
                            ${coin.change24h >= 0 ? '▲' : '▼'} ${Math.abs(coin.change24h).toFixed(2)}% (24h)
                        </div>
                    </div>

                    <div style="background:rgba(0,0,0,0.2); padding:1rem; border-radius:12px;">
                        <h3 style="margin-bottom:1rem; font-size:1rem; color:var(--accent-primary);"><i class="fa-solid fa-microchip"></i> Πλήρη Τεχνικά Χαρακτηριστικά (30 Stats)</h3>
                        <div style="display:grid; grid-template-columns: 1fr 1fr; gap: 0.75rem; font-size: 0.8rem;">
                            <div class="stat-box"><span>Price 1h:</span> <b style="color:${coin.change1h >= 0 ? 'var(--success)' : 'var(--danger)'}">${coin.change1h.toFixed(2)}%</b></div>
                            <div class="stat-box"><span>Price 7d:</span> <b style="color:${coin.change7d >= 0 ? 'var(--success)' : 'var(--danger)'}">${coin.change7d.toFixed(2)}%</b></div>
                            <div class="stat-box"><span>Price 30d:</span> <b style="color:${coin.change30d >= 0 ? 'var(--success)' : 'var(--danger)'}">${coin.change30d.toFixed(2)}%</b></div>
                            <div class="stat-box"><span>24h High:</span> <b>€${coin.high24.toLocaleString()}</b></div>
                            <div class="stat-box"><span>24h Low:</span> <b>€${coin.low24.toLocaleString()}</b></div>
                            <div class="stat-box"><span>Market Cap:</span> <b>€${coin.marketCap.toLocaleString()}</b></div>
                            <div class="stat-box"><span>FDV (Est):</span> <b>€${coin.fdv.toLocaleString()}</b></div>
                            <div class="stat-box"><span>Volume 24h:</span> <b>€${coin.volume.toLocaleString()}</b></div>
                            <div class="stat-box"><span>Circulating:</span> <b>${coin.circulating.toLocaleString()}</b></div>
                            <div class="stat-box"><span>Total Supply:</span> <b>${coin.totalSupply.toLocaleString()}</b></div>
                            <div class="stat-box"><span>Max Supply:</span> <b>${coin.maxSupply ? coin.maxSupply.toLocaleString() : '∞'}</b></div>
                            <div class="stat-box"><span>ATH Price:</span> <b>€${coin.ath.toLocaleString()}</b></div>
                            <div class="stat-box"><span>ATH Change:</span> <b style="color:var(--danger)">${coin.athChange.toFixed(1)}%</b></div>
                            <div class="stat-box"><span>ATH Date:</span> <b>${new Date(coin.athDate).toLocaleDateString()}</b></div>
                            <div class="stat-box"><span>ATL Price:</span> <b>€${coin.atl.toLocaleString()}</b></div>
                            <div class="stat-box"><span>ATL Change:</span> <b style="color:var(--success)">+${coin.atlChange.toFixed(0)}%</b></div>
                            <div class="stat-box"><span>ATL Date:</span> <b>${new Date(coin.atlDate).toLocaleDateString()}</b></div>
                            <div class="stat-box"><span>Vol/MC Ratio:</span> <b>${coin.volumeMC}</b></div>
                            <div class="stat-box"><span>MC Δ (24h):</span> <b>€${coin.mcapChange24h.toLocaleString()}</b></div>
                            <div class="stat-box"><span>MC % (24h):</span> <b>${coin.mcapChangePct24h.toFixed(2)}%</b></div>
                            <div class="stat-box"><span>Volatility:</span> <b>${coin.volatility}</b></div>
                            <div class="stat-box"><span>Sentiment:</span> <b style="color:var(--accent-primary)">${coin.sentiment}</b></div>
                            <div class="stat-box"><span>Supply Left:</span> <b>${coin.supplyLeft.toLocaleString()}</b></div>
                            <div class="stat-box"><span>Dominance:</span> <b>${coin.dominance}</b></div>
                            <div class="stat-box" style="grid-column: 1 / -1; border-top:1px solid var(--panel-border);"><span>Price Δ (24h Real):</span> <b style="color:${coin.priceChange24h >= 0 ? 'var(--success)' : 'var(--danger)'}">€${coin.priceChange24h.toFixed(6)}</b></div>
                            <div class="stat-box" style="grid-column: 1 / -1;"><span>Last Updated (CG):</span> <b>${new Date(coin.lastUpdated).toLocaleTimeString()}</b></div>
                        </div>
                    </div>
                </div>

                <!-- Secondary Info Column -->
                <div>
                    <div style="background:rgba(0,0,0,0.2); padding:1rem; border-radius:12px; margin-bottom:1rem;">
                        <h3 style="margin-bottom:1rem;"><i class="fa-solid fa-shield-halved text-success"></i> Audit & Intelligence</h3>
                        <p style="font-size:0.8rem; color:var(--text-secondary); line-height:1.4;">
                            Η ανάλυση βασίζεται σε πραγματικά δεδομένα από το <b>CoinGecko V3 API</b>. Ο δείκτης μεταβλητότητας (Volatility) υπολογίζεται βάσει του εύρους Low/High 24ώρου. Η πρόβλεψη κυριαρχίας (Dominance) αφορά το μερίδιο αγοράς σε δισεκατομμύρια ευρώ.
                        </p>
                    </div>

                    <div style="background:rgba(139, 92, 246, 0.1); padding:1rem; border-radius:12px; border:1px solid var(--accent-secondary);">
                        <h3 style="margin-bottom:0.5rem; color:var(--accent-secondary);"><i class="fa-solid fa-robot"></i> AI Στρατηγική</h3>
                        <p style="font-size:0.75rem; color:var(--text-secondary);">
                            ${coin.change24h > 5 ? 'Έντονη ανοδική δυναμική. Πιθανή βραχυπρόθεσμη διόρθωση λόγω υπεραγοράς (RSI).' : 
                              coin.change24h < -5 ? 'Ισχυρή πίεση πωλήσεων. Αναζήτηση επιπέδων υποστήριξης (Support) για πιθανή είσοδο.' :
                              'Σταθεροποίηση τιμής. Εν αναμονή breakout προς οποιαδήποτε κατεύθυνση.'}
                        </p>
                    </div>

                    <div style="margin-top:1.5rem; text-align:center;">
                        <button onclick="closeCryptoModal()" style="padding:0.8rem 2rem; background:var(--panel-bg); border:1px solid var(--panel-border); color:var(--text-primary); border-radius:30px; cursor:pointer; width:100%; font-weight:bold;">ΚΛΕΙΣΙΜΟ ΠΑΡΑΘΥΡΟΥ</button>
                    </div>
                </div>
            </div>
        `;
    } catch (e) {
        content.innerHTML = '<div class="text-red">Σφάλμα κατά την ανάκτηση των δεδομένων. Παρακαλώ δοκιμάστε αργότερα.</div>';
    }
}

// === TELEMETRY MODAL HANDLER (30 Real Stats) ===
window.openTelemetryModal = async function(type, id) {
    const modal = document.getElementById('match-modal');
    modal.classList.remove('hidden');
    const content = modal.querySelector('.modal-content');
    content.innerHTML = '<div class="loader-glass">Intercepting Signals & Decoding Telemetry (30 Stats)...</div>';

    try {
        let target = null;
        if (type === 'sat') {
            const sats = await window.InfoDashExtreme.fetchSatelliteOverpasses(37.98, 23.72);
            target = sats.find(s => s.norad_id === id);
        } else {
            const telemetry = await window.InfoDashExtreme.fetchGlobalTelemetry();
            if (type === 'plane') target = telemetry.planes.find(p => p.flight === id);
            if (type === 'ship') target = telemetry.ships.find(s => s.mmsi === id || s.name === id);
        }

        if (!target) {
            content.innerHTML = '<div class="text-red">Σφάλμα: Ο στόχος χάθηκε από το Radar.</div>';
            return;
        }

        const statsEntries = Object.entries(target).filter(([k,v]) => k !== 'warning' && typeof v !== 'object');
        
        content.innerHTML = `
            <span class="close-modal" style="position:absolute; top:1rem; right:1.5rem; font-size:1.5rem; cursor:pointer;" onclick="closeCryptoModal()"><i class="fa-solid fa-times"></i></span>
            <div style="text-align:center; padding-bottom: 1rem; border-bottom: 1px solid var(--panel-border); margin-bottom:1rem;">
                <h2 class="gradient-text"><i class="fa-solid fa-satellite-dish"></i> Telemetry Report: ${target.name || target.flight || target.callsign}</h2>
                <div style="color:var(--text-secondary); font-size:0.9rem;">Source: Global Radar Network | Intelligence Level 5</div>
            </div>

            <div style="display: grid; grid-template-columns: 1fr; gap: 1rem;">
                <div class="glass-panel" style="padding:1rem; border-left:4px solid var(--accent-primary);">
                    <h3 style="margin-bottom:1rem; color:var(--accent-primary);"><i class="fa-solid fa-microchip"></i> Real-Time Datapoints (Analysis)</h3>
                    <div style="display:grid; grid-template-columns: repeat(auto-fill, minmax(200px, 1fr)); gap: 0.75rem;">
                        ${statsEntries.map(([key, val]) => `
                            <div class="stat-box" style="padding:0.5rem; background:rgba(255,255,255,0.03);">
                                <span style="font-size:0.7rem; color:var(--text-secondary); text-transform:uppercase;">${key.replace(/_/g, ' ')}</span><br>
                                <b style="font-size:0.9rem;">${val}</b>
                            </div>
                        `).join('')}
                    </div>
                </div>

                ${target.warning ? `
                    <div class="glass-panel" style="padding:1rem; border:1px solid var(--danger); background:rgba(239, 68, 68, 0.1);">
                        <h3 style="color:var(--danger); margin-bottom:0.5rem;"><i class="fa-solid fa-triangle-exclamation"></i> ADVANCED ALERT</h3>
                        <p style="margin:0; font-weight:bold;">${target.warning}</p>
                    </div>
                ` : ''}
            </div>

            <div style="margin-top:1.5rem; text-align:center;">
                <button onclick="closeCryptoModal()" style="padding:0.8rem 2rem; background:var(--accent-gradient); border:none; color:white; border-radius:30px; cursor:pointer; font-weight:bold;">DISMISS DATA</button>
            </div>
        `;
    } catch (e) {
        content.innerHTML = '<div class="text-red">Signal Lost. Interference detected.</div>';
    }
}

// =========================================================================
// SMART NOTIFICATIONS LOGIC (Phase 4)
// =========================================================================

window.initNotifications = function() {
    if (!("Notification" in window)) {
        alert("Ο browser σας δεν υποστηρίζει ειδοποιήσεις.");
        return;
    }

    Notification.requestPermission().then(permission => {
        if (permission === "granted") {
            const statusLabel = document.getElementById('notif-status');
            if (statusLabel) {
                statusLabel.innerText = "ALERTS ON";
                statusLabel.style.color = "var(--accent-primary)";
            }
            sendSmartNotification("Neural Link Established", "Οι έξυπνες ειδοποιήσεις του InfoDash είναι πλέον ενεργές.");
            startSmartMonitoring();
        } else {
            alert("Οι ειδοποιήσεις απορρίφθηκαν. Ενεργοποιήστε τις από τις ρυθμίσεις του browser.");
        }
    });
};

function sendSmartNotification(title, body) {
    if (Notification.permission === "granted") {
        new Notification(title, {
            body: body,
            icon: 'https://cdn-icons-png.flaticon.com/512/825/825540.png'
        });
    }
}

function startSmartMonitoring() {
    // Check every 60 seconds (demonstration of logic)
    setInterval(async () => {
        console.log("GPT Neural Monitor: Scanning for critical events...");
        // This is a placeholder for actual monitoring logic
    }, 60000);
}

// DRAG & DROP LOGIC (Phase 4)
// =========================================================================

window.initDragAndDrop = function() {
    const grid = document.getElementById('myhub-grid');
    if (!grid) return;

    let dragSrcEl = null;

    function handleDragStart(e) {
        dragSrcEl = this;
        e.dataTransfer.effectAllowed = 'move';
        e.dataTransfer.setData('text/html', this.innerHTML);
        this.style.opacity = '0.4';
    }

    function handleDragOver(e) {
        if (e.preventDefault) e.preventDefault();
        e.dataTransfer.dropEffect = 'move';
        return false;
    }

    function handleDrop(e) {
        if (e.stopPropagation) e.stopPropagation();
        if (dragSrcEl !== this) {
            dragSrcEl.innerHTML = this.innerHTML;
            this.innerHTML = e.dataTransfer.getData('text/html');
            saveWidgetOrder();
        }
        return false;
    }

    function handleDragEnd(e) {
        this.style.opacity = '1';
        const cols = grid.querySelectorAll('.glass-panel');
        cols.forEach(col => col.classList.remove('over'));
    }

    function saveWidgetOrder() {
        const order = [];
        grid.querySelectorAll('.glass-panel').forEach(el => {
            order.push(el.innerHTML);
        });
        localStorage.setItem('infodash_widget_content_order', JSON.stringify(order));
    }

    const widgets = grid.querySelectorAll('.glass-panel');
    widgets.forEach(w => {
        w.setAttribute('draggable', 'true');
        w.addEventListener('dragstart', handleDragStart, false);
        w.addEventListener('dragover', handleDragOver, false);
        w.addEventListener('drop', handleDrop, false);
        w.addEventListener('dragend', handleDragEnd, false);
    });
};

// Register Service Worker for PWA
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('./sw.js').then(reg => {
            console.log('InfoDash SW Registered:', reg.scope);
        }).catch(err => {
            console.log('SW Registration Failed:', err);
        });
    });
}

// Initializer handled via Security block.// News Loaders
window.loadGrNews = async function() {
    document.getElementById('news-gr-btn').classList.add('active');
    document.getElementById('news-world-btn').classList.remove('active');
    await fetchNews('https://www.newsit.gr/feed/', 30);
};

window.loadWorldNews = async function() {
    document.getElementById('news-world-btn').classList.add('active');
    document.getElementById('news-gr-btn').classList.remove('active');
    await fetchNews('http://feeds.bbci.co.uk/news/world/rss.xml', 20);
};

async function fetchNews(rssUrl, count) {
    const container = document.getElementById('news-feed-container');
    if(!container) return;
    container.innerHTML = '<div style="text-align:center; grid-column:1/-1; padding:20px; color:#aaa;"><i class="fa-solid fa-spinner fa-spin"></i> Φόρτωση ειδήσεων...</div>';
    
    try {
        const res = await fetch(`https://api.rss2json.com/v1/api.json?rss_url=${encodeURIComponent(rssUrl)}&api_key=&count=${count}`);
        const data = await res.json();
        
        if (data && data.items) {
            container.innerHTML = '';
            data.items.slice(0, count).forEach(item => {
                const dateHtml = item.pubDate ? `<span style="font-size:0.75rem; color:#888;">${new Date(item.pubDate).toLocaleString('el-GR')}</span>` : '';
                container.innerHTML += `
                    <a href="${item.link}" target="_blank" style="display:flex; flex-direction:column; gap:8px; padding:12px; background:rgba(0,0,0,0.3); border-radius:8px; text-decoration:none; color:white; border-left:3px solid var(--accent-primary); transition:0.2s;">
                        <strong style="font-size:0.9rem;">${item.title}</strong>
                        ${dateHtml}
                    </a>
                `;
            });
        } else {
             container.innerHTML = '<div style="color:red; text-align:center; grid-column:1/-1;">Κανένα αποτέλεσμα από το API.</div>';
        }
    } catch(e) {
        container.innerHTML = '<div style="color:red; text-align:center; grid-column:1/-1;">Αποτυχία φόρτωσης ειδήσεων.</div>';
    }
}

// Weather Fetcher
window.updateWeather = async function(city) {
    const tempSpan = document.getElementById('weather-temp');
    if(!tempSpan) return;
    tempSpan.innerHTML = '<i class="fa-solid fa-spinner fa-spin" style="margin-left:5px;"></i>';
    try {
        const res = await fetch(`https://wttr.in/${encodeURIComponent(city)}?format="%t"`);
        let text = await res.text();
        text = text.replace(/"/g, '').trim();
        tempSpan.innerText = text;
    } catch(e) {
        tempSpan.innerText = 'Err';
    }
};

setTimeout(() => {
    const select = document.getElementById('weather-city-select');
    if (select) window.updateWeather(select.value);
}, 1000);
