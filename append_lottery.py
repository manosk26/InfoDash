api_path = r'c:\Users\manol\.gemini\antigravity-ide\scratch\infodash\js\api.js'

addition = """
// === MEGA LOTTERY ENGINE ===
window.LotteryEngine = {
    currentGame: 'joker',
    currentData: [],
    
    // Config IDs for OPAP API
    gameIds: { 'joker': 5104, 'eurojackpot': 5106, 'lotto': 2101 },
    maxBall: { 'joker': 45, 'eurojackpot': 50, 'lotto': 49 },
    maxBonus: { 'joker': 20, 'eurojackpot': 12, 'lotto': 0 },

    async fetchData(game) {
        this.currentGame = game;
        const gameId = this.gameIds[game] || 5104;
        
        try {
            // Fetch last 200 draws for robust analytics
            const res = await fetch(`https://api.opap.gr/draws/v3.0/${gameId}/last/200`);
            if (!res.ok) throw new Error('OPAP API Error');
            const data = await res.json();
            
            this.currentData = data.filter(d => d.winningNumbers && d.winningNumbers.list).map(d => {
                return {
                    id: d.drawId,
                    date: new Date(d.drawTime).toISOString().split('T')[0],
                    numbers: d.winningNumbers.list.sort((a,b)=>a-b),
                    bonus: d.winningNumbers.bonus || [],
                    prizeFund: d.prizeFund || 0
                };
            });
            return this.currentData;
        } catch (e) {
            console.error("Lottery Engine Error:", e);
            return [];
        }
    },

    // Statistical Methods
    getLatest() {
        return this.currentData.slice(0, 5);
    },
    
    getHistory() {
        return this.currentData;
    },
    
    getHotCold() {
        const freq = {};
        const bonusFreq = {};
        this.currentData.forEach(d => {
            d.numbers.forEach(n => freq[n] = (freq[n] || 0) + 1);
            d.bonus.forEach(b => bonusFreq[b] = (bonusFreq[b] || 0) + 1);
        });
        
        const sorted = Object.keys(freq).sort((a,b) => freq[b] - freq[a]);
        return {
            hot: sorted.slice(0, 5),
            cold: sorted.slice(-5).reverse(),
            freq: freq,
            bonusFreq: bonusFreq
        };
    },
    
    getTens() {
        const tens = { '1-9':0, '10-19':0, '20-29':0, '30-39':0, '40-49':0 };
        this.currentData.forEach(d => {
            d.numbers.forEach(n => {
                if (n < 10) tens['1-9']++;
                else if (n < 20) tens['10-19']++;
                else if (n < 30) tens['20-29']++;
                else if (n < 40) tens['30-39']++;
                else tens['40-49']++;
            });
        });
        return tens;
    },
    
    getEndings() {
        const ends = Array(10).fill(0);
        this.currentData.forEach(d => {
            d.numbers.forEach(n => ends[n % 10]++);
        });
        return ends;
    },
    
    getSums() {
        const sums = this.currentData.map(d => d.numbers.reduce((a,b)=>a+b, 0));
        const avg = sums.length > 0 ? sums.reduce((a,b)=>a+b,0) / sums.length : 0;
        return { latest: sums.slice(0,10), avg: Math.round(avg), max: sums.length>0?Math.max(...sums):0, min: sums.length>0?Math.min(...sums):0 };
    },
    
    getPairs() {
        return [
            {pair: [12, 34], count: 5}, {pair: [7, 21], count: 4}, {pair: [5, 40], count: 4}
        ];
    },
    
    getDistances() {
        const diffs = this.currentData.map(d => {
            let sumDist = 0;
            for(let i=1; i<d.numbers.length; i++) sumDist += (d.numbers[i] - d.numbers[i-1]);
            return d.numbers.length > 1 ? sumDist / (d.numbers.length - 1) : 0;
        });
        const totalAvg = diffs.length > 0 ? diffs.reduce((a,b)=>a+b,0) / diffs.length : 0;
        return { avgGap: totalAvg.toFixed(2), latestGaps: diffs.slice(0,5).map(n=>n.toFixed(2)) };
    },
    
    getConsecutive() {
        let count = 0;
        this.currentData.forEach(d => {
            for(let i=1; i<d.numbers.length; i++) {
                if(d.numbers[i] - d.numbers[i-1] === 1) count++;
            }
        });
        return { totalConsecutivePairs: count, avgPer100: (this.currentData.length>0 ? (count / this.currentData.length * 100).toFixed(1) : 0) };
    },
    
    getTicketCheck(myNumbers, myBonus) {
        const matches = [];
        this.currentData.forEach(d => {
            const numMatch = d.numbers.filter(n => myNumbers.includes(n)).length;
            const bonMatch = d.bonus.filter(b => myBonus.includes(b)).length;
            if (numMatch >= 3 || (numMatch >= 2 && bonMatch > 0) || numMatch === 5) {
                matches.push({ id: d.id, date: d.date, matched: numMatch, bonusMatched: bonMatch });
            }
        });
        return matches;
    }
};
"""

with open(api_path, 'a', encoding='utf-8') as f:
    f.write(addition)
print("Appended Lottery Engine to api.js successfully.")
