import re

# 1. Update index.html
html_path = r'c:\Users\manol\.gemini\antigravity\scratch\infodash\index.html'
with open(html_path, 'r', encoding='utf-8') as f:
    html_text = f.read()

new_crypto_html = '''<section id="crypto-view" class="view-section hidden">
    <div class="section-header">
        <h1>Crypto <span class="gradient-text">Top 100 Intelligence</span></h1>
        <p>15-Point Deep Statistics Dashboard</p>
    </div>
    
    <div class="glass-panel" style="overflow-x:auto;">
        <table id="cmc-crypto-table" class="crypto-table" style="min-width: 1200px; font-size: 0.85rem;">
            <thead>
                <tr>
                    <th style="width:30px;">#</th>
                    <th style="width:180px;">Name</th>
                    <th>Price</th>
                    <th>1h %</th>
                    <th>24h %</th>
                    <th>7d %</th>
                    <th>Market Cap</th>
                    <th>Volume(24h)</th>
                    <th>Circulating Supply</th>
                    <th>FDV</th>
                    <th>ATH</th>
                    <th>24h High/Low</th>
                    <th>Volatility</th>
                    <th>Sentiment</th>
                </tr>
            </thead>
            <tbody>
                <!-- Rows injected via JS -->
            </tbody>
        </table>
    </div>
</section>'''

html_pattern = re.compile(r'<section id="crypto-view".*?</section>', re.DOTALL)
html_new, html_count = html_pattern.subn(new_crypto_html, html_text)
if html_count > 0:
    with open(html_path, 'w', encoding='utf-8') as f:
        f.write(html_new)
    print("Updated index.html for Crypto")

# 2. Update api.js
api_path = r'c:\Users\manol\.gemini\antigravity\scratch\infodash\js\api.js'
with open(api_path, 'r', encoding='utf-8') as f:
    api_text = f.read()

new_fetch_crypto = '''async function fetchCryptos() {
    try {
        // Fetch top 100 by market cap
        const resTop = await fetch('https://api.coingecko.com/api/v3/coins/markets?vs_currency=eur&order=market_cap_desc&per_page=100&page=1&sparkline=false&price_change_percentage=1h,24h,7d');
        if (!resTop.ok) throw new Error('CoinGecko limit top');
        const top100Data = await resTop.json();

        const getSentiment = (change7d, change24h) => {
            if (change24h > 5 && change7d > 10) return 'Bullish 🔥';
            if (change24h < -5 && change7d < -10) return 'Bearish 🧊';
            if (change24h > 1) return 'Buy +';
            if (change24h < -1) return 'Sell -';
            return 'Neutral';
        };

        const formatCurrency = (val) => {
            if (val >= 1e9) return '€' + (val / 1e9).toFixed(2) + 'B';
            if (val >= 1e6) return '€' + (val / 1e6).toFixed(2) + 'M';
            return '€' + val.toLocaleString();
        };

        const mapped = top100Data.map((c, index) => {
            const mcap = c.market_cap || 0;
            const vol = c.total_volume || 0;
            const price = c.current_price || 0;
            
            return {
                id: c.id, 
                rank: index + 1,
                sym: c.symbol.toUpperCase(), 
                name: c.name, 
                image: c.image,
                price: price < 0.01 ? '€' + price.toFixed(6) : '€' + price.toLocaleString('en-US', {minimumFractionDigits:2, maximumFractionDigits:2}), 
                change1h: c.price_change_percentage_1h_in_currency || 0,
                change24h: c.price_change_percentage_24h || 0,
                change7d: c.price_change_percentage_7d_in_currency || 0,
                marketCap: formatCurrency(mcap),
                volume: formatCurrency(vol),
                circulating: (c.circulating_supply || 0).toLocaleString(undefined, {maximumFractionDigits:0}) + ' ' + c.symbol.toUpperCase(),
                fdv: formatCurrency(c.fully_diluted_valuation || mcap),
                ath: '€' + (c.ath || 0).toLocaleString(),
                high24: '€' + (c.high_24h || 0).toLocaleString(),
                low24: '€' + (c.low_24h || 0).toLocaleString(),
                volatility: price > 0 ? (Math.abs((c.high_24h || 0) - (c.low_24h || 0)) / price * 100).toFixed(2) + '%' : '0%',
                sentiment: getSentiment(c.price_change_percentage_7d_in_currency || 0, c.price_change_percentage_24h || 0)
            };
        });

        return { top20: mapped, newCheap: [] }; // keep backward compat format for now, though we only use the array in our new render
    } catch (e) {
        console.error("Crypto API Error:", e);
        // Fallback
        return { top20: [], newCheap: [] };
    }
}'''

api_pattern = re.compile(r'async function fetchCryptos\(\) \{.*?\}\s*(?=\n// === 4\.)', re.DOTALL)
api_new, api_count = api_pattern.subn(new_fetch_crypto, api_text)
if api_count > 0:
    with open(api_path, 'w', encoding='utf-8') as f:
        f.write(api_new)
    print("Updated api.js for Crypto")

# 3. Update app.js
app_path = r'c:\Users\manol\.gemini\antigravity\scratch\infodash\js\app.js'
with open(app_path, 'r', encoding='utf-8') as f:
    app_text = f.read()

new_load_crypto = '''async function loadCrypto() {
    const tableBody = document.querySelector('#cmc-crypto-table tbody');
    if (!tableBody) return;
    
    tableBody.innerHTML = '<tr><td colspan="14" style="text-align:center;"><div class="loader-glass"></div><br>Φόρτωση Top 100 Cryptocurrencies...</td></tr>';
    
    try {
        const api = await import('./api.js');
        const data = await api.fetchCryptos();
        const cryptos = Array.isArray(data) ? data : data.top20; // fallback logic
        
        tableBody.innerHTML = '';
        
        cryptos.forEach(coin => {
            const getColor = (val) => val >= 0 ? 'text-green' : 'text-red';
            const formatPct = (val) => {
                const num = parseFloat(val);
                return `<span class="${getColor(num)}">
                            <i class="fa-solid ${num >= 0 ? 'fa-caret-up' : 'fa-caret-down'}"></i> 
                            ${Math.abs(num).toFixed(2)}%
                        </span>`;
            };
            
            const tr = document.createElement('tr');
            tr.innerHTML = `
                <td style="color:var(--text-secondary);">${coin.rank}</td>
                <td>
                    <div class="coin-info" style="display:flex; align-items:center; gap:10px;">
                        <img src="${coin.image}" alt="${coin.name}" width="24" height="24" style="border-radius:50%;">
                        <div>
                            <span style="font-weight:bold; display:block;">${coin.name}</span>
                            <span style="font-size:0.75rem; color:var(--text-secondary);">${coin.sym}</span>
                        </div>
                    </div>
                </td>
                <td style="font-weight:bold;">${coin.price}</td>
                <td>${formatPct(coin.change1h)}</td>
                <td>${formatPct(coin.change24h)}</td>
                <td>${formatPct(coin.change7d)}</td>
                <td>${coin.marketCap}</td>
                <td>${coin.volume}</td>
                <td style="font-size:0.8rem;">${coin.circulating}</td>
                <td style="font-size:0.8rem; color:var(--text-secondary);">${coin.fdv}</td>
                <td style="font-size:0.8rem;">${coin.ath}</td>
                <td style="font-size:0.8rem; color:var(--text-secondary);">${coin.low24} / ${coin.high24}</td>
                <td style="font-size:0.8rem;">${coin.volatility}</td>
                <td><span style="background:rgba(255,255,255,0.05); padding:3px 6px; border-radius:4px; font-size:0.8rem;">${coin.sentiment}</span></td>
            `;
            tableBody.appendChild(tr);
        });
        
    } catch (e) {
        console.error("Failed to load crypto:", e);
        tableBody.innerHTML = '<tr><td colspan="14" class="text-red" style="text-align:center;">Σφάλμα φόρτωσης δεδομένων CoinGecko.</td></tr>';
    }
}'''

app_pattern = re.compile(r'async function loadCrypto\(\) \{.*?(?=async function loadLinks\(\) \{)', re.DOTALL)
app_new, app_count = app_pattern.subn(new_load_crypto, app_text)
if app_count > 0:
    with open(app_path, 'w', encoding='utf-8') as f:
        f.write(app_new)
    print("Updated app.js for Crypto")
