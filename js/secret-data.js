// --- SECRET MASTER VAULT DB ---
// Contains 20 Highly Specialized Cash-Flow & Growth Categories

window.masterVaultCategories = [
    { id: 'ai_arbitrage', icon: 'fa-solid fa-money-bill-transfer', title: 'AI Drop-Servicing', desc: 'Αυτοματοποίηση υπηρεσιών (μετάφραση, κείμενα, βίντεο) για μεταπώληση στο Fiverr/Upwork με μηδενικό κόπο.' },
    { id: 'osint_leads', icon: 'fa-solid fa-radar', title: 'OSINT Lead Gen', desc: 'Ανεύρεση κρυφών εταιρικών email και πελατών (B2B) μέσα από ανοιχτές βάσεις - Πούλα λίστες πελατών.' },
    { id: 'web_scraping', icon: 'fa-solid fa-spider', title: 'Smart Data Scraping', desc: 'Εξαγωγή χιλιάδων δεδομένων από websites χωρίς κώδικα (ακίνητα, τιμές, reviews) για δημιουργία δικών σου APIs.' },
    { id: 'nocode_saas', icon: 'fa-solid fa-cubes', title: 'No-Code Micro SaaS', desc: 'Φτιάξε δικά σου συνδρομητικά λογισμικά (SaaS) μέσα σε Σαββατοκύριακα χωρίς να ξέρεις καθόλου προγραμματισμό.' },
    { id: 'prog_seo', icon: 'fa-solid fa-chart-line', title: 'Programmatic SEO', desc: 'Δημιουργία 10.000+ σελίδων αυτόματα (Google Sheets & AI) για να μονοπωλήσεις τις αναζητήσεις στο Google.' },
    { id: 'domain_flip', icon: 'fa-solid fa-earth-europe', title: 'Expired Domain Flipping', desc: 'Βρες παρατημένα domains με τεράστιο authority (Backlinks) και πούλησέ τα σε SEO Agencies.' },
    { id: 'crypto_airdrop', icon: 'fa-brands fa-ethereum', title: 'Crypto Airdrop Bots', desc: 'Αυτοματοποιημένα Scripts που "φαρμάρουν" νέα Crypto Airdrops κάνοντας χιλιάδες testnet transactions δωρεάν.' },
    { id: 'algo_trading', icon: 'fa-solid fa-chart-candlestick', title: 'Quant Algo Trading', desc: 'Δωρεάν πλατφόρμες και αλγόριθμοι που κάνουν paper trade και live trade αυτόματα βάσει μαθηματικών.' },
    { id: 'cold_email', icon: 'fa-solid fa-envelope-open-text', title: 'Cold-Email Outreach', desc: 'Στείλε χιλιάδες προσωποποιημένα emails αυτόματα αποφεύγοντας τα Spam Filters. Ο απόλυτος τρόπος εύρεσης πελατών.' },
    { id: 'ai_agents', icon: 'fa-solid fa-network-wired', title: 'White-Label AI Agents', desc: 'Φτιάξε Custom ChatGPT Chatbots με τα PDF των πελατών σου και νοίκιασέ τα σε επιχειρήσεις.' },
    { id: 'pod_automation', icon: 'fa-solid fa-shirt', title: 'Print-on-Demand Automation', desc: 'AI που ζωγραφίζει σχέδια μπλουζών και τα ανεβάζει αυτόματα σε RedBubble, Etsy κλπ.' },
    { id: 'yt_faceless', icon: 'fa-brands fa-youtube', title: 'Faceless YouTube Empire', desc: 'Μετατροπή κειμένου σε βίντεο (Με φωνή, εικόνα & μοντάζ) για δημιουργία εσόδων από YouTube Ads.' },
    { id: 'affiliate_spy', icon: 'fa-solid fa-mask', title: 'Affiliate Ad Spying', desc: 'Δες ακριβώς ποια Posts & Google Ads βγάζουν χρήματα στους ανταγωνιστές σου και αντίγραψέ τα.' },
    { id: 'freelance_gap', icon: 'fa-solid fa-briefcase', title: 'Freelance Arbitrage', desc: 'Εξειδικευμένα εργαλεία που λύνουν τεράστια προβλήματα επιχειρήσεων με 1 κλικ (Background removal, audio cleanup).' },
    { id: 'bug_bounty', icon: 'fa-solid fa-bug', title: 'Bug Bounty Scanners', desc: 'Αυτόματα script που ψάχνουν ευπάθειες σε εταιρικά site (Legal Hacking) για να πληρωθείς bounty από τις εταιρείες.' },
    { id: 'mev_arbitrage', icon: 'fa-solid fa-bolt', title: 'MEV Smart Contracts', desc: 'Δωρεάν Github Repo για Flash Loans & MEV Arbitrage στο Ethereum/BSC - Βγάλε κέρδος από διαφορές τιμών (Για Hardcore).' },
    { id: 'prompt_sales', icon: 'fa-solid fa-comment-dollar', title: 'AI Prompt Marketplaces', desc: 'Γράψε τον ιδανικό κώδικα/κείμενο/prompt στο Midjourney ή ChatGPT και πούλα το έτοιμο prompt σε άλλους.' },
    { id: 'newsletters', icon: 'fa-regular fa-newspaper', title: 'Newsletter Flipping', desc: 'Δωρεάν πλατφόρμες για να χτίσεις email-list με AI Curation, να πάρεις χορηγίες και να πουλήσεις το Newsletter.' },
    { id: 'sports_algo', icon: 'fa-solid fa-futbol', title: 'Sports Math APIs', desc: 'Αναλύσεις και APIs που προσφέρουν Historical Data για μαθηματικά μοντέλα στο Αθλητικό Arbitrage.' },
    { id: 'b2b_tools', icon: 'fa-solid fa-building-user', title: 'B2B Micro Tools', desc: 'Μικρά δωρεάν APIs (π.χ. PDF to Excel, Watermark remover) που μπορείς να τα κάνεις monetise με ads/subscriptions.' }

    ,{ id: 'off_passwords', icon: 'fa-solid fa-key', title: 'Offline Password & Hashes', desc: 'Εργαλεία Hash Cracking (Offline) για ανάκτηση και σπάσιμο κωδικών πρόσβασης.' },
    { id: 'off_networks', icon: 'fa-solid fa-network-wired', title: 'Offline Network Sniffing', desc: 'Ανάλυση πακέτων (PCAP) και παρακολούθηση δικτύου εκτός σύνδεσης.' },
    { id: 'off_forensics', icon: 'fa-solid fa-magnifying-glass-chart', title: 'Offline Digital Forensics', desc: 'Ανάλυση μνήμης RAM, σκληρών δίσκων και αναζήτηση ιχνών σε νεκρά συστήματα.' },
    { id: 'off_reversing', icon: 'fa-solid fa-microchip', title: 'Reverse Engineering Labs', desc: 'Αποσυμπίληση λογισμικού (Decompiling), εύρεση κώδικα και ανάλυση Malware.' },
    { id: 'on_recon', icon: 'fa-solid fa-satellite-dish', title: 'Online Target Reconnaissance', desc: 'Σάρωση υποδομών, χαρτογράφηση στόχων και εύρεση Subdomains στο Web.' },
    { id: 'on_web_scanners', icon: 'fa-solid fa-spider', title: 'Online Web Scanners', desc: 'Αυτοματοποιημένος εντοπισμός κενών ασφαλείας (SQL, XSS) σε Web εφαρμογές.' },
    { id: 'on_exploitation', icon: 'fa-solid fa-bomb', title: 'Online Exploitation Frameworks', desc: 'Πλατφόρμες εκμετάλλευσης τρωτών σημείων και παράκαμψης συστημάτων (PenTesting).' },
    { id: 'on_phishing', icon: 'fa-solid fa-fish-fins', title: 'Phishing Simulators & Social Eng.', desc: 'Δοκιμές κοινωνικής μηχανικής (Social Engineering) και πλαστές καμπάνιες Phishing.' }

    ,{ id: 'git_ai', icon: 'fa-solid fa-robot', title: 'GitHub: AI & Machine Learning', desc: 'Τα κορυφαία Open Source έργα Τεχνητής Νοημοσύνης.' },
    { id: 'git_cyber', icon: 'fa-solid fa-user-secret', title: 'GitHub: Cyber Security (1)', desc: 'Κορυφαία εργαλεία Hacking & Security Testing.' },
    { id: 'git_cyber2', icon: 'fa-solid fa-shield-halved', title: 'GitHub: Cyber Security (2)', desc: 'Λειτουργικά Συστήματα Hackers, Privacy & VPNs.' },
    { id: 'git_dev', icon: 'fa-solid fa-code', title: 'GitHub: Development & No-Code', desc: 'Εργαλεία συγγραφής κώδικα και εναλλακτικές Cloud.' },
    { id: 'git_dev2', icon: 'fa-solid fa-laptop-code', title: 'GitHub: Frameworks & Automation', desc: 'Βιβλιοθήκες Web, Mobile Development και Αυτοματισμοί.' },
    { id: 'git_data', icon: 'fa-solid fa-database', title: 'GitHub: Data, Scraping & Diagrams', desc: 'Σάρωση δεδομένων, σχεδιασμός διαγραμμάτων και AI Data.' },
    { id: 'git_prod', icon: 'fa-solid fa-wand-magic-sparkles', title: 'GitHub: Productivity & Media', desc: 'Δωρεάν προγράμματα οθόνης, ήχου, 3D και Streaming.' },
    { id: 'git_tools', icon: 'fa-solid fa-toolbox', title: 'GitHub: Utils & OSINT', desc: 'Κατέβασμα βίντεο, προσπέραση συνδρομών και Media Players.' }
];

window.getSecretVaultData = function(category) {
    const db = {
        'ai_arbitrage': [
            { title: 'Tome.app', desc: 'AI που φτιάχνει παρουσιάσεις. Πούλα υπηρεσίες "Presentation Design" στο Fiverr.', url: 'https://tome.app', icon: 'fa-solid fa-desktop' },
            { title: '11Labs', desc: 'Το πιο ρεαλιστικό VoiceOver AI. Πούλα "Professional Voice Over" στο Upwork χωρίς καν μικρόφωνο.', url: 'https://elevenlabs.io', icon: 'fa-solid fa-microphone-lines' },
            { title: 'VocalRemover', desc: 'Διαχωρίζει φωνή από μουσική. Πούλα Acapella/Karaoke extraction σε DJs.', url: 'https://vocalremover.org', icon: 'fa-solid fa-music' },
            { title: 'Descript', desc: 'Ενημερώνει Audio & Video όπως επεξεργάζεσαι κείμενο στο Word. Ιδανικό για podcast editing services.', url: 'https://www.descript.com', icon: 'fa-solid fa-file-audio' },
            { title: 'Rytr / CopyAI', desc: 'Αυτόματο Copywriting. Ανάλαβε να γράφεις Descriptions για e-shops.', url: 'https://rytr.me', icon: 'fa-solid fa-pen-nib' }
        ],
        'osint_leads': [
            { title: 'Apollo.io', desc: 'Αναζήτηση B2B emails. Το δωρεάν πλάνο δίνει εκατοντάδες corporate leads τον μήνα.', url: 'https://www.apollo.io', icon: 'fa-solid fa-magnifying-glass' },
            { title: 'Hunter.io', desc: 'Βρες το email address όλων των εργαζομένων πίσω από οποιοδήποτε domain name.', url: 'https://hunter.io', icon: 'fa-solid fa-at' },
            { title: 'Snov.io', desc: 'Επέκταση Chrome για Extract emails από το LinkedIn δωρεάν.', url: 'https://snov.io', icon: 'fa-brands fa-linkedin' },
            { title: 'Phantombuster', desc: 'Scrape και Automate τα πάντα από το LinkedIn & Google Maps.', url: 'https://phantombuster.com', icon: 'fa-solid fa-ghost' },
            { title: 'Clearbit', desc: 'B2B Data Provider. Μετέτρεψε απλά emails σε πλήρη προφίλ εργαζομένων.', url: 'https://clearbit.com', icon: 'fa-solid fa-database' }
        ],
        'web_scraping': [
            { title: 'Apify', desc: 'Εύκολα "Actors" (bots) που βγάζουν data από Amazon, Instagram, Google Maps.', url: 'https://apify.com', icon: 'fa-solid fa-robot' },
            { title: 'Web Scraper (Chrome Ext)', desc: '100% Δωρεάν Chrome Extension για να τραβάς δεδομένα σε Excel χωρίς κώδικα.', url: 'https://webscraper.io', icon: 'fa-brands fa-chrome' },
            { title: 'Octoparse', desc: 'Visual Web Scraping Tool για δυναμικά sites με συνεχή ανανέωση.', url: 'https://www.octoparse.com', icon: 'fa-solid fa-spider' },
            { title: 'Browse AI', desc: 'Εκπαίδευσε το AI (κάνοντας κλικ) να καταγράφει αλλαγές τιμών στα ανταγωνιστικά e-shops.', url: 'https://www.browse.ai', icon: 'fa-solid fa-eye' },
            { title: 'Simplescraper', desc: 'Μετέτρεψε οποιοδήποτε site σε ένα API endpoint κυριολεκτικά με 2 κλικ.', url: 'https://simplescraper.io', icon: 'fa-solid fa-code' }
        ],
        'nocode_saas': [
            { title: 'Bubble.io', desc: 'Το καλύτερο web app builder. Φτιάξε AirBnb/Uber-clones σε 2 μέρες και πούλα τα.', url: 'https://bubble.io', icon: 'fa-solid fa-cubes' },
            { title: 'Glide Apps', desc: 'Μετέτρεψε αρχεία του Excel (Google Sheets) σε fully functional Mobile Apps.', url: 'https://www.glideapps.com', icon: 'fa-solid fa-mobile-screen' },
            { title: 'Softr', desc: 'Δημιούργησε Client Portals και Marketplaces πάνω στο Airtable.', url: 'https://www.softr.io', icon: 'fa-solid fa-layer-group' },
            { title: 'Carrd', desc: '100% Δωρεάν One-Page sites. Φτιάξε Landing pages για τοπικές επιχειρήσεις με $50.', url: 'https://carrd.co', icon: 'fa-regular fa-file-code' },
            { title: 'Make (Integromat)', desc: 'Όπως το Zapier αλλά πιο φθηνό/δωρεάν. Ένωσε λειτουργικότητες 1000 εφαρμογών.', url: 'https://www.make.com', icon: 'fa-solid fa-diagram-project' }
        ],
        'prog_seo': [
            { title: 'Data Fetcher', desc: 'Τράβα δεδομένα (Ακίνητα, Jobs) σε Airtable και φτιάξε αυτόματα 1000 σελίδες στο Webflow.', url: 'https://datafetcher.com', icon: 'fa-solid fa-table' },
            { title: 'PageFactory', desc: 'Αυτόματη δημιουργία χιλιάδων SEO-optimized άρθρων βασισμένα σε Spintax & AI.', url: 'https://pagefactory.app', icon: 'fa-solid fa-file-lines' },
            { title: 'Ahrefs Webmaster Tools', desc: 'Δωρεάν απόλυτος έλεγχος του SEO του site σας απευθείας από την Ahrefs.', url: 'https://ahrefs.com/awt', icon: 'fa-solid fa-magnifying-glass-chart' },
            { title: 'SEMrush (Free)', desc: 'Βρες το Search Volume χιλιάδων "Long tail keywords".', url: 'https://www.semrush.com', icon: 'fa-solid fa-chart-bar' },
            { title: 'AnswerThePublic', desc: 'Δες ακριβώς τι ερωτήσεις κάνουν οι χρήστες στο Google για να παράγεις περιεχόμενο.', url: 'https://answerthepublic.com', icon: 'fa-solid fa-circle-question' }
        ],
        'domain_flip': [
            { title: 'Expireddomains.net', desc: 'Ο βασιλιάς των ληγμένων DomainNames. Βρες SEO domains με Authority Score 50+ δωρεάν.', url: 'https://www.expireddomains.net', icon: 'fa-solid fa-globe' },
            { title: 'DomCop', desc: 'Ανάλυση ληγμένων domains. (Ιδανικό να στήσεις PBNs Private Blog Networks).', url: 'https://www.domcop.com', icon: 'fa-solid fa-link' },
            { title: 'Flippa', desc: 'Το μεγαλύτερο Marketplace για να πουλάς έτοιμα sites ή domains που αγόρασες.', url: 'https://flippa.com', icon: 'fa-solid fa-comments-dollar' },
            { title: 'Wayback Machine', desc: 'Δες ακριβώς ποιο ήταν το περιεχόμενο ενός ληγμένου domain πριν 10 χρόνια.', url: 'https://archive.org/web/', icon: 'fa-solid fa-clock-rotate-left' },
            { title: 'Namecheap Beast Mode', desc: 'Αναζήτησε χιλιάδες TLDs μαζικά (bulk search).', url: 'https://www.namecheap.com/domains/domain-name-search/beast-mode/', icon: 'fa-solid fa-server' }
        ],
        'crypto_airdrop': [
            { title: 'Dropsearn', desc: 'Ενημερώνεται καθημερινά με Testnets & Retrodrops (Μηδέν επένδυση).', url: 'https://dropsearn.com', icon: 'fa-brands fa-ethereum' },
            { title: 'EarnFi', desc: 'Βάλε την MetaMask Wallet address σου και δες μήπως δικαιούσαι ήδη κάποιο Airdrop.', url: 'https://earni.fi', icon: 'fa-solid fa-parachute-box' },
            { title: 'Airdrops.io', desc: 'Λίστα από Potential Airdrops. Ένα airdrop κοστίζει λίγο gas fee, η απόδοση $2,000+.', url: 'https://airdrops.io', icon: 'fa-solid fa-gift' },
            { title: 'Galxe', desc: 'Η μεγαλύτερη πλατφόρμα Web3 επιβραβεύσεων. Λύσε Quests, πάρε NFTs / Tokens.', url: 'https://galxe.com', icon: 'fa-solid fa-star' },
            { title: 'DappRadar', desc: 'Bρες νέα Dapps, παίξε με τα συμβόλαιά τους πριν βγάλουν token.', url: 'https://dappradar.com', icon: 'fa-solid fa-chart-pie' }
        ],
        'algo_trading': [
            { title: 'TradingView PineScript', desc: 'Γράψε τον δικό σου κώδικα (PineScript) για Trading Alerts και backtesting.', url: 'https://www.tradingview.com/pine-script-docs/en/v5/Introduction.html', icon: 'fa-solid fa-code' },
            { title: 'Freqtrade', desc: 'Εντελώς δωρεάν & open source crypto trading bot βασισμένο σε Python.', url: 'https://www.freqtrade.io', icon: 'fa-brands fa-python' },
            { title: 'QuantConnect', desc: 'Cloud περιβάλλον για algorithmic trading με πρόσβαση σε Ticks History (δωρεάν terabytes data).', url: 'https://www.quantconnect.com', icon: 'fa-solid fa-server' },
            { title: 'Pionex', desc: 'Ανταλλακτήριο με 16+ ενσωματωμένα δωρεάν AI Bots (Grid Bot, DCA).', url: 'https://www.pionex.com', icon: 'fa-solid fa-robot' },
            { title: 'CCXT', desc: 'Η απόλυτη βιβλιοθήκη API (JS, Python, PHP) για επικοινωνία με όλα τα ανταλλακτήρια.', url: 'https://github.com/ccxt/ccxt', icon: 'fa-solid fa-plug' }
        ],
        'cold_email': [
            { title: 'Instantly.ai', desc: 'Cold email software με απεριόριστα email accounts (δωρεάν trial/freemium tricks).', url: 'https://instantly.ai', icon: 'fa-regular fa-paper-plane' },
            { title: 'Lemlist', desc: 'Αυτόματη προσωποποίηση στα emails (Βάζει το λογότυπο του πελάτη σε δική σας εικόνα αυτόματα).', url: 'https://www.lemlist.com', icon: 'fa-solid fa-image-portrait' },
            { title: 'Mail-Tester', desc: 'Έλεγχος Spam. Στείλε email, και σου λέει με βαθμό αν θα πάει Spam ή Inbox.', url: 'https://www.mail-tester.com', icon: 'fa-solid fa-check-double' },
            { title: 'NeverBounce / ZeroBounce', desc: 'Καθαρισμός λίστας (free limits). Μη στέλνεις σε νεκρά emails γιατί τρως penalty.', url: 'https://neverbounce.com', icon: 'fa-solid fa-broom' },
            { title: 'Reply.io (Free Tools)', desc: 'Email search and outreach extension.', url: 'https://reply.io', icon: 'fa-solid fa-reply' }
        ],
        'ai_agents': [
            { title: 'Botpress', desc: 'Οπτικός Builder για ChatGPT bots. Ενσωμάτωση σε WhatsApp, Site. Εντελώς δωρεάν για μικρά bots.', url: 'https://botpress.com', icon: 'fa-solid fa-robot' },
            { title: 'Voiceflow', desc: 'Παρόμοιο με Botpress. Φτιάξε Custom AI Customer Support Agents και πούλα τα 500€/μήνα στις επιχειρήσεις.', url: 'https://www.voiceflow.com', icon: 'fa-solid fa-microphone' },
            { title: 'Flowise', desc: 'Open source UI για LangChain. Φτιάξε Local LLMs (GPT clone στον υπολογιστή σου).', url: 'https://flowiseai.com', icon: 'fa-solid fa-link' },
            { title: 'Dante AI', desc: 'Ανέβασε PDF και αυτομάτως φτιάχνει ένα AI Chatbot που γνωρίζει τα πάντα από αυτό το PDF.', url: 'https://dante-ai.com', icon: 'fa-solid fa-file-pdf' },
            { title: 'Hugging Face Spaces', desc: 'Φιλοξενία των δικών σου AI Scripts/Models δωρεάν.', url: 'https://huggingface.co/spaces', icon: 'fa-solid fa-face-smile' }
        ],
        'pod_automation': [
            { title: 'Midjourney', desc: 'Ζωγραφίζει ό,τι του ζητήσεις. Απειρες παραλλαγές για t-shirts.', url: 'https://www.midjourney.com', icon: 'fa-solid fa-palette' },
            { title: 'Vectorizer.ai', desc: 'Μετατρέπει Raster εικόνες σε τέλεια SVG vectors. Απαραίτητο για το τύπωμα υψηλής ανάλυσης.', url: 'https://vectorizer.ai', icon: 'fa-solid fa-bezier-curve' },
            { title: 'Placeit', desc: 'Τα καλύτερα Mockups (μοντέλα που φοράνε τα ρούχα σας) για να στολίσετε το Etsy.', url: 'https://placeit.net', icon: 'fa-solid fa-tshirt' },
            { title: 'Printify', desc: 'Το Factory. Το συνδέεις με Etsy/Shopify. Αυτοί τυπώνουν/στέλνουν το t-shirt, εσύ κρατάς το κέρδος.', url: 'https://printify.com', icon: 'fa-solid fa-industry' },
            { title: 'Vexels', desc: 'Assets & Designs για όσους κάνουν Merch/POD.', url: 'https://www.vexels.com', icon: 'fa-solid fa-star' }
        ],
        'yt_faceless': [
            { title: 'InVideo / Pictory AI', desc: 'Δίνεις Script και δημιουργεί αυτόματα ένα video clip με Stock πλάνα και Auto Titles.', url: 'https://invideo.io', icon: 'fa-solid fa-video' },
            { title: 'HeyGen', desc: 'Δημιουργία AI Avatars. Το "Ρομπότ" μιλάει με δική σου ή ξένη φωνή, χωρίς να βγαίνεις στην κάμερα.', url: 'https://www.heygen.com', icon: 'fa-solid fa-user-astronaut' },
            { title: 'CapCut', desc: 'Το κορυφαίο Δωρεάν Editor για Shorts, TikToks, Auto-captions.', url: 'https://www.capcut.com', icon: 'fa-solid fa-film' },
            { title: 'VidIQ', desc: 'Extension που σου δείχνει τον ανταγωνισμό στα Keywords στο Youtube. Βρες κενά στην αγορά!', url: 'https://vidiq.com', icon: 'fa-brands fa-youtube' },
            { title: 'TubeBuddy', desc: 'Εργαλείο για A/B Testing σε Thumbnails και bulk updates.', url: 'https://www.tubebuddy.com', icon: 'fa-solid fa-chart-line' }
        ],
        'affiliate_spy': [
            { title: 'Facebook Ad Library', desc: 'Αναζήτησε τις διαφημίσεις ΟΠΟΙΟΥΔΗΠΟΤΕ ανταγωνιστή. 100% Δωρεάν και νόμιμο από τη Meta.', url: 'https://www.facebook.com/ads/library', icon: 'fa-brands fa-facebook' },
            { title: 'Moat', desc: 'Η μεγαλύτερη βάση για Banner Ads. Δες τι creatives τρέχουν τα μεγάλα brands.', url: 'https://moat.com', icon: 'fa-regular fa-images' },
            { title: 'ClickBank', desc: 'Το μεγαλύτερο Affiliate Network. Βρες προϊόντα (Supplements/Info) που δίνουν עד 80% προμήθεια.', url: 'https://www.clickbank.com', icon: 'fa-solid fa-piggy-bank' },
            { title: 'SimilarWeb (Free Ext)', desc: 'Δες ακριβώς ποιο κανάλι φέρνει την κίνηση σε όποιο Affiliate Site επισκέπτεσαι.', url: 'https://www.similarweb.com', icon: 'fa-solid fa-globe' },
            { title: 'Google Keyword Planner', desc: 'Μέσα από το Google Ads Account, βρες ακριβώς τι CPC (Κόστος ανά κλικ) δίνουν οι άλλοι.', url: 'https://ads.google.com/home/tools/keyword-planner/', icon: 'fa-brands fa-google' }
        ],
        'freelance_gap': [
            { title: 'Remove.bg', desc: 'Αφαίρεση Background σε 1 Sec. Πούλα tjänst "Photo cutout" με όγκο.', url: 'https://www.remove.bg', icon: 'fa-solid fa-eraser' },
            { title: 'Adobe Podcast Speech Enhance', desc: 'Κάνει Ηχογραφήσεις από κινητό να ακούγονται σαν Studio Mic (Δωρεάν).', url: 'https://podcast.adobe.com/enhance', icon: 'fa-solid fa-microphone-slash' },
            { title: 'Canva Pro (Edu trick)', desc: 'Graphic design για τα πάντα. Πούλα Social Media kits.', url: 'https://www.canva.com', icon: 'fa-solid fa-object-group' },
            { title: 'WatermarkRemover.io', desc: 'Καθαρίζει υδατογραφήματα μέσω AI (Χρήση με προσοχή).', url: 'https://www.watermarkremover.io/', icon: 'fa-solid fa-droplet-slash' },
            { title: 'DeepL', desc: 'Ο καλύτερος AI μεταφραστής. Αναλαμβάνεις translations gigs και διορθώνεις λίγο το κείμενο.', url: 'https://www.deepl.com', icon: 'fa-solid fa-language' }
        ],
        'bug_bounty': [
            { title: 'HackerOne', desc: 'Η κεντρική πλατφόρμα. Βρες εταιρείες που σε πληρώνουν $5k+ αν βρεις ένα Bug.', url: 'https://www.hackerone.com', icon: 'fa-solid fa-bug' },
            { title: 'Bugcrowd', desc: 'Εναλλακτική του HackerOne με μεγάλα Public Programs & CTF.', url: 'https://bugcrowd.com', icon: 'fa-solid fa-shield-halved' },
            { title: 'Burp Suite (Community)', desc: 'Το #1 εργαλείο penetration testing. Βρίσκει κενά στο Web traffic.', url: 'https://portswigger.net/burp/communitydownload', icon: 'fa-solid fa-network-wired' },
            { title: 'Nmap / Zenmap', desc: 'Καταγραφή ανοιχτών Ports σε έναν Server. Το πρώτο βήμα του Recon.', url: 'https://nmap.org', icon: 'fa-solid fa-eye' },
            { title: 'Shodan.io', desc: 'Η "Google" για Hackers. Αναζήτηση exposed Datacenters, IoT & Cams.', url: 'https://www.shodan.io', icon: 'fa-solid fa-search' }
        ],
        'mev_arbitrage': [
            { title: 'Flashbots', desc: 'Bypass your transaction away from the public mempool (MEV defense / extraction).', url: 'https://www.flashbots.net', icon: 'fa-solid fa-bolt-lightning' },
            { title: 'Etherscan', desc: 'Διαβάζοντας On-Chain data μπορείς να εντοπίσεις Smart Contracts που βγάζουν arbitrage bot κέρδος.', url: 'https://etherscan.io', icon: 'fa-solid fa-cubes' },
            { title: 'Mempool.space', desc: 'Παρακολούθηση Bitcoin & Satoshis Mempool transactions σε πραγματικό χρόνο.', url: 'https://mempool.space', icon: 'fa-brands fa-bitcoin' },
            { title: 'Foundry / Hardhat', desc: 'Εργαλεία ανάπτυξης Ethereum Smart Contracts (Δοκίμασε flashloans σε testnets).', url: 'https://getfoundry.sh', icon: 'fa-solid fa-hammer' },
            { title: 'Dune Analytics', desc: 'Γράψε SQL Queries και βρες Custom Δεδομένα για DeFi, DEX volume, και MEV profit.', url: 'https://dune.com', icon: 'fa-solid fa-database' }
        ],
        'prompt_sales': [
            { title: 'PromptBase', desc: 'Το Marketplace των Prompts. Πούλα το prompt σου $5 το ένα σε χιλιάδες άτομα!', url: 'https://promptbase.com', icon: 'fa-solid fa-store' },
            { title: 'SnackPrompt', desc: 'Share και Ανακάλυψε daily prompts για ChatGPT.', url: 'https://snackprompt.com', icon: 'fa-solid fa-cookie' },
            { title: 'Lexica.art', desc: 'Search engine για Stable Diffusion Prompts, καταλαβαίνεις τι οδηγίες λειτουργούν.', url: 'https://lexica.art', icon: 'fa-solid fa-image' },
            { title: 'Krea.ai', desc: 'Generative AI platform για να φτιάχνεις visual assets και prompts.', url: 'https://www.krea.ai', icon: 'fa-solid fa-pen-ruler' },
            { title: 'FutureTools', desc: 'O Matt Wolfe μαζεύει όλα τα νέα AI Εργαλεία / Prompts καθημερινά.', url: 'https://www.futuretools.io', icon: 'fa-solid fa-toolbox' }
        ],
        'newsletters': [
            { title: 'Beehiiv', desc: 'Η #1 Πλατφόρμα Growth για Newsletters (Καλύτερο monetization από Substack).', url: 'https://www.beehiiv.com', icon: 'fa-solid fa-envelope' },
            { title: 'Substack', desc: 'Γράψε και χρέωσε Monthly Subscription τους αναγνώστες σου. Super απλό UI.', url: 'https://substack.com', icon: 'fa-solid fa-quote-left' },
            { title: 'Feedly', desc: 'RSS Reader για να συνδυάζεις 100 site σε 1. Έτσι βρίσκεις περιεχόμενο για το Newsletter σου γρήγορα.', url: 'https://feedly.com', icon: 'fa-solid fa-rss' },
            { title: 'SparkLoop', desc: 'Growth network που σε πληρώνει (ή πληρώνεις) όταν άλλοι κάνουν recommend το newsletter σου.', url: 'https://sparkloop.app', icon: 'fa-solid fa-arrow-up-right-dots' },
            { title: 'WhoSponsorsStuff', desc: 'Βρες χορηγούς! Δες ποιοι κάνουν promote brands σε άλλα newsletters και προσέγγισέ τους.', url: 'https://whosponsorsstuff.com', icon: 'fa-solid fa-handshake' }
        ],
        'sports_algo': [
            { title: 'API-Football', desc: 'Historical & Live Data, Predictions, Standings, για όλα τα αθλήματα. (Δωρεάν όριο).', url: 'https://www.api-football.com', icon: 'fa-solid fa-futbol' },
            { title: 'FiveThirtyEight Soccer', desc: 'Forecast Models. Τα μαθηματικά μοντέλα της SPI (Soccer Power Index). (Archived but logical).', url: 'https://projects.fivethirtyeight.com/soccer-predictions/', icon: 'fa-solid fa-chart-line' },
            { title: 'Kaggle (Sports Datasets)', desc: 'Κατέβασε 100,000 αγώνες δωρεάν για να εκπαιδεύσεις τα δικά σου AI μοντέλα Python.', url: 'https://www.kaggle.com/datasets', icon: 'fa-solid fa-database' },
            { title: 'Pinnacle API', desc: 'Τα πιο "ακριβή" odds (Closing Lines) για να κάνεις backtest τις αποδόσεις σου.', url: 'https://www.pinnacle.com/en/api/', icon: 'fa-solid fa-code' },
            { title: 'OddsAPI', desc: 'Τράβα σε πραγματικό χρόνο τις αποδόσεις από δεκάδες Bookmakers για Arbitrage bots.', url: 'https://the-odds-api.com', icon: 'fa-solid fa-plug' }
        ],
        'b2b_tools': [
            { title: 'TinyWow', desc: '100% Δωρεάν μικρο-εργαλεία (PDF unlock, Bg remove). Παράδειγμα προς μίμηση για monetization.', url: 'https://tinywow.com', icon: 'fa-solid fa-wand-magic-sparkles' },
            { title: 'Vercel / Netlify', desc: 'Χοστίνγκ (Δωρεάν). Στήσε ένα απλό Next.js SEO tool, φιλοξένησέ το με 0€ και τρέξε Ads.', url: 'https://vercel.com', icon: 'fa-solid fa-server' },
            { title: 'RapidAPI', desc: 'Βρες APIs από το ίντερνετ, φτιάξε ένα UI, και πούλα το σαν εργαλείο (API Arbitrage).', url: 'https://rapidapi.com', icon: 'fa-solid fa-right-left' },
            { title: 'Google Analytics & Adsense', desc: 'Μάθε να στήνεις Ads και Analytics σε Micro-Tools. Το κλειδί για 24/7 Passive Income.', url: 'https://analytics.google.com', icon: 'fa-brands fa-google' },
            { title: 'MicroAcquire (Acquire.com)', desc: 'Πούλα το μικρό σου SaaS ή Site. Πολλοί αγοράζουν ένα Micro-tool που βγάζει $50/μήνα για $2000+.', url: 'https://acquire.com', icon: 'fa-solid fa-money-bill-trend-up' }
        ]
    
        ,'off_passwords': [
            { title: 'Hashcat', desc: 'Ο ταχύτερος και πιο προηγμένος offline password cracker παγκοσμίως.', url: 'https://hashcat.net/hashcat/', icon: 'fa-solid fa-bolt' },
            { title: 'John the Ripper', desc: 'Open-source password security auditing και password recovery tool.', url: 'https://www.openwall.com/john/', icon: 'fa-solid fa-user-ninja' },
            { title: 'Ophcrack', desc: 'Windows password cracker βασισμένο σε rainbow tables.', url: 'http://ophcrack.sourceforge.net/', icon: 'fa-brands fa-windows' },
            { title: 'Cain and Abel', desc: 'Κλασικό εργαλείο ανάρρωσης κωδικών για λειτουργικά συστήματα Windows.', url: 'https://archive.org/details/cain-and-abel_202008', icon: 'fa-solid fa-unlock-keyhole' },
            { title: 'THC Hydra', desc: 'Ένα πολύ γρήγορο network logon cracker.', url: 'https://github.com/vanhauser-thc/thc-hydra', icon: 'fa-solid fa-skull' },
            { title: 'L0phtCrack', desc: 'Ιστορικό password auditing και ανάκτησης εργαλείο.', url: 'https://l0phtcrack.gitlab.io/', icon: 'fa-solid fa-toolbox' }
        ],
        'off_networks': [
            { title: 'Wireshark', desc: 'Ο κορυφαίος network protocol analyzer (packet sniffer) στον κόσμο.', url: 'https://www.wireshark.org', icon: 'fa-solid fa-wave-square' },
            { title: 'Kismet', desc: 'Wireless network and device detector, sniffer, και wardriving tool.', url: 'https://www.kismetwireless.net/', icon: 'fa-solid fa-wifi' },
            { title: 'Ettercap', desc: 'Σουίτα εργαλείων για Man-in-the-Middle επιθέσεις σε LAN.', url: 'https://www.ettercap-project.org/', icon: 'fa-solid fa-arrows-down-to-people' },
            { title: 'Aircrack-ng', desc: 'Πλήρες σύνολο εργαλείων για αξιολόγηση WiFi security (WEP/WPA/WPA2).', url: 'https://www.aircrack-ng.org/', icon: 'fa-solid fa-signal' },
            { title: 'Tcpdump', desc: 'Ισχυρό command-line packet analyzer.', url: 'https://www.tcpdump.org/', icon: 'fa-solid fa-terminal' }
        ],
        'off_forensics': [
            { title: 'Autopsy', desc: 'Digital forensics platform για ανάλυση σκληρών δίσκων και κινητών.', url: 'https://www.sleuthkit.org/autopsy/', icon: 'fa-solid fa-microscope' },
            { title: 'Volatility', desc: 'Εργαλείο ανάλυσης μνήμης (RAM forensics) για extraction malware artifacts.', url: 'https://www.volatilityfoundation.org/', icon: 'fa-solid fa-memory' },
            { title: 'FTK Imager', desc: 'Δημιουργία forensic images από σκληρούς δίσκους χωρίς αλλοίωση.', url: 'https://www.macrium.com', icon: 'fa-solid fa-hard-drive' },
            { title: 'EnCase (Info)', desc: 'Το βιομηχανικό στάνταρ (επί πληρωμή αλλά αξίζει η γνώση) για forensics.', url: 'https://www.opentext.com', icon: 'fa-solid fa-briefcase' },
            { title: 'Bulk_extractor', desc: 'Ανακτά αρχεία, εικόνες, έγγραφα, αγνοώντας το file system.', url: 'https://www.cgsecurity.org/wiki/PhotoRec', icon: 'fa-solid fa-file-export' },
            { title: 'Grep (GNU)', desc: 'Αναζήτηση patterns σε τεράστια data dumps offline.', url: 'https://www.gnu.org/software/grep/', icon: 'fa-solid fa-magnifying-glass' }
        ],
        'off_reversing': [
            { title: 'Ghidra', desc: 'Εργαλείο Reverse Engineering του NSA. 100% Δωρεάν Decompiler.', url: 'https://ghidra-sre.org/', icon: 'fa-solid fa-code-pull-request' },
            { title: 'IDA Free', desc: 'Το κορυφαίο Interactive Disassembler (freeware έκδοση).', url: 'https://hex-rays.com/ida-free/', icon: 'fa-solid fa-layer-group' },
            { title: 'x64dbg', desc: 'Open-source debugger για ανάλυση malware στο Windows.', url: 'https://x64dbg.com/', icon: 'fa-solid fa-bug-slash' },
            { title: 'Radare2', desc: 'Framework για Reverse Engineering Command Line / Visual.', url: 'https://rada.re/n/', icon: 'fa-solid fa-terminal' },
            { title: 'OllyDbg', desc: 'Ιστορικός 32-bit assembler level analyzing debugger.', url: 'http://www.ollydbg.de/', icon: 'fa-solid fa-screwdriver-wrench' },
            { title: 'Cutter', desc: 'Δωρεάν και Open Source Reverse Engineering Platform που βασίζεται στο radare2.', url: 'https://cutter.re/', icon: 'fa-solid fa-scissors'}
        ],
        'on_recon': [
            { title: 'Nmap', desc: 'Ο βασιλιάς του Network Discovery & Security Auditing.', url: 'https://nmap.org/', icon: 'fa-solid fa-map-location-dot' },
            { title: 'Recon-ng', desc: 'Πλήρες Web Reconnaissance framework γραμμένο σε Python.', url: 'https://github.com/lanmaster53/recon-ng', icon: 'fa-solid fa-binoculars' },
            { title: 'Amass', desc: 'In-depth Attack Surface Mapping και Asset Discovery.', url: 'https://github.com/owasp-amass/amass', icon: 'fa-solid fa-globe' },
            { title: 'Sublist3r', desc: 'Γρήγορο subdomain enumeration tool.', url: 'https://github.com/aboul3la/Sublist3r', icon: 'fa-solid fa-list-ul' },
            { title: 'SpiderFoot', desc: 'OSINT automation tool με 200+ modules.', url: 'https://www.spiderfoot.net/', icon: 'fa-solid fa-spider' },
            { title: 'Shodan', desc: 'Η μηχανή αναζήτησης για Internet-connected devices.', url: 'https://www.shodan.io/', icon: 'fa-solid fa-server' }
        ],
        'on_web_scanners': [
            { title: 'Burp Suite (CE)', desc: 'Η #1 πλατφόρμα για web application security testing.', url: 'https://portswigger.net/burp', icon: 'fa-solid fa-shield-cat' },
            { title: 'OWASP ZAP', desc: 'Εντελώς δωρεάν & open-source web app scanner της OWASP.', url: 'https://www.zaproxy.org/', icon: 'fa-solid fa-bolt' },
            { title: 'Nikto', desc: 'Command-line web server scanner που βρίσκει 6700+ επικίνδυνα αρχεία.', url: 'https://cirt.net/Nikto2', icon: 'fa-solid fa-radiation' },
            { title: 'SQLmap', desc: 'Αυτοματοποιημένο σπάσιμο SQL injection flaws και ανάληψη βάσεων.', url: 'https://sqlmap.org/', icon: 'fa-solid fa-database' },
            { title: 'WPScan', desc: 'Black box WordPress vulnerability scanner.', url: 'https://wpscan.com/', icon: 'fa-brands fa-wordpress' }
        ],
        'on_exploitation': [
            { title: 'Metasploit', desc: 'Το πιο ευρέως χρησιμοποιούμενο Penetration Testing Framework στον κόσμο.', url: 'https://www.metasploit.com/', icon: 'fa-solid fa-gun' },
            { title: 'BeEF', desc: 'The Browser Exploitation Framework - εστιάζει στον Web Browser.', url: 'https://beefproject.com/', icon: 'fa-brands fa-firefox' },
            { title: 'Nuclei', desc: 'Γρήγορο και παραμετροποιήσιμο vulnerability scanner (template based).', url: 'https://nuclei.projectdiscovery.io/', icon: 'fa-solid fa-atom' },
            { title: 'Commando VM', desc: 'Μια πλήρως εξοπλισμένη Windows Penetration Testing διανομή της FireEye.', url: 'https://github.com/mandiant/commando-vm', icon: 'fa-brands fa-windows' },
            { title: 'Kali Linux', desc: 'Το λειτουργικό σύστημα των Hackers. Εδώ βρίσκονται 600+ εργαλεία!', url: 'https://www.kali.org/', icon: 'fa-brands fa-linux' },
            { title: 'Exploit Database', desc: 'Το μεγαλύτερο αρχείο με public exploits και pocs.', url: 'https://www.exploit-db.com/', icon: 'fa-solid fa-book-skull' }
        ],
        'on_phishing': [
            { title: 'Gophish', desc: 'Open-source Phishing toolkit σχεδιασμένο για επιχειρήσεις.', url: 'https://getgophish.com/', icon: 'fa-solid fa-fish-fins' },
            { title: 'KingPhisher', desc: 'Εργαλείο Phishing Campaign με πολλαπλές δυνατότητες.', url: 'https://github.com/securestate/king-phisher', icon: 'fa-solid fa-crown' },
            { title: 'SET (Social Eng Toolkit)', desc: 'Python-driven εργαλείο για επιθέσεις Κοινωνικής Μηχανικής.', url: 'https://github.com/trustedsec/social-engineer-toolkit', icon: 'fa-solid fa-users-gear' },
            { title: 'Evilginx2', desc: 'Man-in-the-middle phishing proxy για bypassing 2FA/MFA.', url: 'https://github.com/kgretzky/evilginx2', icon: 'fa-solid fa-user-ninja' },
            { title: 'Zphisher', desc: 'Αυτοματοποιημένο phishing εργαλείο (Χρήση μόνο για Education!).', url: 'https://github.com/htr-tech/zphisher', icon: 'fa-solid fa-user-secret' }
        ]
    
        ,'git_ai': [
            { title: 'Auto-GPT', desc: 'Αυτόνομο AI που τρέχει το GPT για να διεκπεραιώνει μόνο του αποστολές.', url: 'https://github.com/Significant-Gravitas/AutoGPT', icon: 'fa-solid fa-robot' },
            { title: 'Hugging Face Transformers', desc: 'Βιβλιοθήκη με χιλιάδες έτοιμα AI μοντέλα για χρήση.', url: 'https://github.com/huggingface/transformers', icon: 'fa-solid fa-face-smile-beam' },
            { title: 'TensorFlow', desc: 'Tο AI πλαίσιο της Google για να γράψεις προγράμματα μηχανικής μάθησης.', url: 'https://github.com/tensorflow/tensorflow', icon: 'fa-brands fa-google' },
            { title: 'Stable Diffusion WebUI', desc: 'Δημιουργία φωτορεαλιστικών εικόνων τοπικά στον υπολογιστή σου.', url: 'https://github.com/AUTOMATIC1111/stable-diffusion-webui', icon: 'fa-solid fa-palette' },
            { title: 'Ollama', desc: 'Τρέξε Offline πανίσχυρα AI μοντέλα κειμένου (LLMs) χωρίς ίντερνετ.', url: 'https://github.com/ollama/ollama', icon: 'fa-solid fa-brain' }
        ],
        'git_cyber': [
            { title: 'Metasploit', desc: 'Η #1 πλατφόρμα δοκιμής διείσδυσης (PenTesting).', url: 'https://github.com/rapid7/metasploit-framework', icon: 'fa-solid fa-gun' },
            { title: 'Nmap', desc: 'Εργαλείο για σάρωση δικτύων και έλεγχο ανοικτών πορτών.', url: 'https://github.com/nmap/nmap', icon: 'fa-solid fa-map-location-dot' },
            { title: 'Sqlmap', desc: 'Βρίσκει κενά ασφαλείας σε βάσεις δεδομένων (SQLi).', url: 'https://github.com/sqlmapproject/sqlmap', icon: 'fa-solid fa-database' },
            { title: 'Aircrack-ng', desc: 'Σουίτα αναβάθμισης και ελέγχου ασφάλειας σε δίκτυα WiFi.', url: 'https://github.com/aircrack-ng/aircrack-ng', icon: 'fa-solid fa-wifi' },
            { title: 'Wireshark', desc: 'Ο κορυφαίος "κοριός" που διαβάζει πακέτα στο τοπικό δίκτυο.', url: 'https://github.com/wireshark/wireshark', icon: 'fa-solid fa-wave-square' }
        ],
        'git_cyber2': [
            { title: 'Ghidra', desc: 'Το Reverse Engineering Tool της NSA, πλέον δωρεάν.', url: 'https://github.com/NationalSecurityAgency/ghidra', icon: 'fa-solid fa-microchip' },
            { title: 'Bitwarden', desc: 'Ο πιο ασφαλής Password Manager, 100% ανοικτού κώδικα.', url: 'https://github.com/bitwarden', icon: 'fa-solid fa-shield' },
            { title: 'OpenVPN', desc: 'Η ραχοκοκαλιά σχεδόν κάθε VPN για απόκρυψη IP.', url: 'https://github.com/OpenVPN/openvpn', icon: 'fa-solid fa-user-ninja' },
            { title: 'Kali Linux', desc: 'Το OS των Hackers (περιέχει 600+ προεγκατεστημένα εργαλεία).', url: 'https://github.com/KaliLinux', icon: 'fa-brands fa-linux' },
            { title: 'Tor Browser', desc: 'Ο browser για πλοήγηση με απόλυτη ανωνυμία στο Deep Web.', url: 'https://github.com/torproject/torbrowser', icon: 'fa-solid fa-mask' }
        ],
        'git_dev': [
            { title: 'VS Code', desc: 'Ο κορυφαίος editor κώδικα της Microsoft.', url: 'https://github.com/microsoft/vscode', icon: 'fa-solid fa-laptop-code' },
            { title: 'Supabase', desc: 'Το δωρεάν υποκατάστατο της Firebase για online βάσεις.', url: 'https://github.com/supabase/supabase', icon: 'fa-solid fa-server' },
            { title: 'NocoDB', desc: 'Smart Spreadsheets! Μετατρέπει βάσεις δεδομένων σε οπτικό Excel.', url: 'https://github.com/nocodb/nocodb', icon: 'fa-solid fa-table' },
            { title: 'Appsmith', desc: 'Low-Code πλατφόρμα. Φτιάξε web apps σέρνοντας κουμπιά.', url: 'https://github.com/appsmithorg/appsmith', icon: 'fa-solid fa-cubes' },
            { title: 'Nextcloud', desc: 'Στήσε το δικό σου ιδιωτικό Google Drive / Dropbox.', url: 'https://github.com/nextcloud/server', icon: 'fa-solid fa-cloud' }
        ],
        'git_dev2': [
            { title: 'React', desc: 'Το Web Framework του Facebook. Web Design standards.', url: 'https://github.com/facebook/react', icon: 'fa-brands fa-react' },
            { title: 'Flutter', desc: 'Google UI toolkit. Φτιάξε iOS/Android Apps με έναν κώδικα.', url: 'https://github.com/flutter/flutter', icon: 'fa-brands fa-google' },
            { title: 'n8n', desc: 'Open Source Workflow Automation (Αντίπαλος του Zapier).', url: 'https://github.com/n8n-io/n8n', icon: 'fa-solid fa-bolt' },
            { title: 'FFmpeg', desc: 'Το κορυφαίο εργαλείο τερματικού για μετατροπές Video/Audio.', url: 'https://github.com/FFmpeg/FFmpeg', icon: 'fa-solid fa-film' },
            { title: 'Puppeteer', desc: 'Headless Chrome: Ελέγχει αυτοματοποιημένα τον browser για scraping.', url: 'https://github.com/puppeteer/puppeteer', icon: 'fa-brands fa-chrome' }
        ],
        'git_data': [
            { title: 'Scrapy', desc: 'Γρήγορο Web Crawling Framework.', url: 'https://github.com/scrapy/scrapy', icon: 'fa-solid fa-spider' },
            { title: 'Pandas', desc: 'Data Analysis library για Python. Διαβάζει τεράστια Excels στο δευτερόλεπτο.', url: 'https://github.com/pandas-dev/pandas', icon: 'fa-solid fa-file-csv' },
            { title: 'Keras', desc: 'Deep Learning API για εύκολη εκπαίδευση Νευρωνικών Δικτύων.', url: 'https://github.com/keras-team/keras', icon: 'fa-solid fa-network-wired' },
            { title: 'Draw.io', desc: 'Δωρεάν εφαρμογή δημιουργίας διαγραμμάτων και Flowcharts.', url: 'https://github.com/jgraph/drawio', icon: 'fa-solid fa-diagram-project' },
            { title: 'Excalidraw', desc: 'Ψηφιακός πίνακας για χειρόγραφα σχέδια και αρχιτεκτονική.', url: 'https://github.com/excalidraw/excalidraw', icon: 'fa-solid fa-pen-nib' }
        ],
        'git_prod': [
            { title: 'OBS Studio', desc: 'Το στάνταρ εργαλείο για Game/Screen Recording & Live Streaming.', url: 'https://github.com/obsproject/obs-studio', icon: 'fa-solid fa-video' },
            { title: 'Rufus', desc: 'Δημιουργία Bootable USB για εγκατάσταση λειτουργικών.', url: 'https://github.com/pbatard/rufus', icon: 'fa-brands fa-usb' },
            { title: 'Brave Browser', desc: 'Web Browser που κόβει Ads και Trackers by default.', url: 'https://github.com/brave/brave-browser', icon: 'fa-solid fa-shield-virus' },
            { title: 'Audacity', desc: 'Κλασικό πρόγραμμα για ηχογράφηση & επαγγελματικό audio editing.', url: 'https://github.com/audacity/audacity', icon: 'fa-solid fa-microphone' },
            { title: 'Blender', desc: 'Το κορυφαίο δωρεάν λογισμικό παραγωγής 3D / VFX του Hollywood.', url: 'https://github.com/blender/blender', icon: 'fa-solid fa-cube' }
        ],
        'git_tools': [
            { title: 'VLC Media Player', desc: 'Ο παίκτης που παίζει τα ΠΑΝΤΑ, χωρίς Error ΠΟΤΕ.', url: 'https://github.com/videolan/vlc', icon: 'fa-solid fa-play' },
            { title: 'Gophish', desc: 'Επαγγελματικό, πανεύκολο Phishing simulator for enterprises.', url: 'https://github.com/gophish/gophish', icon: 'fa-solid fa-fish' },
            { title: 'Bypass Paywalls', desc: 'Διάβασε δωρεάν τα άρθρα εφημερίδων που απαιτούν πληρωμή.', url: 'https://github.com/iamadamdev/bypass-paywalls-chrome', icon: 'fa-solid fa-newspaper' },
            { title: 'yt-dlp', desc: 'Κατεβάζει Video/Ήχο από χιλιάδες sites στην υψηλότερη ποιότητα.', url: 'https://github.com/yt-dlp/yt-dlp', icon: 'fa-brands fa-youtube' },
            { title: 'Whisper', desc: 'AI Speech-to-Text: Μετατρέπει άμεσα φωνή σε υπότιτλους.', url: 'https://github.com/openai/whisper', icon: 'fa-solid fa-closed-captioning' }
        ]
    };
    return db[category] || [];
};
