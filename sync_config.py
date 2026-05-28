import re

path = r'c:\Users\manol\.gemini\antigravity-ide\scratch\infodash\js\app.js'
with open(path, 'r', encoding='utf-8') as f:
    content = f.read()

new_config = """const HUB_CONFIG = {
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
};"""

content = re.sub(r'const HUB_CONFIG = \{.*?\};', new_config, content, flags=re.DOTALL)

with open(path, 'w', encoding='utf-8') as f:
    f.write(content)
