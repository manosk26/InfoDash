import codecs
import re

with codecs.open('c:/Users/manol/.gemini/antigravity-ide/scratch/infodash/js/secret-data.js', 'r', 'utf-8') as f:
    data = f.read()

new_cats = """
    ,{ id: 'git_ai', icon: 'fa-solid fa-robot', title: 'GitHub: AI & Machine Learning', desc: 'Τα κορυφαία Open Source έργα Τεχνητής Νοημοσύνης.' },
    { id: 'git_cyber', icon: 'fa-solid fa-user-secret', title: 'GitHub: Cyber Security (1)', desc: 'Κορυφαία εργαλεία Hacking & Security Testing.' },
    { id: 'git_cyber2', icon: 'fa-solid fa-shield-halved', title: 'GitHub: Cyber Security (2)', desc: 'Λειτουργικά Συστήματα Hackers, Privacy & VPNs.' },
    { id: 'git_dev', icon: 'fa-solid fa-code', title: 'GitHub: Development & No-Code', desc: 'Εργαλεία συγγραφής κώδικα και εναλλακτικές Cloud.' },
    { id: 'git_dev2', icon: 'fa-solid fa-laptop-code', title: 'GitHub: Frameworks & Automation', desc: 'Βιβλιοθήκες Web, Mobile Development και Αυτοματισμοί.' },
    { id: 'git_data', icon: 'fa-solid fa-database', title: 'GitHub: Data, Scraping & Diagrams', desc: 'Σάρωση δεδομένων, σχεδιασμός διαγραμμάτων και AI Data.' },
    { id: 'git_prod', icon: 'fa-solid fa-wand-magic-sparkles', title: 'GitHub: Productivity & Media', desc: 'Δωρεάν προγράμματα οθόνης, ήχου, 3D και Streaming.' },
    { id: 'git_tools', icon: 'fa-solid fa-toolbox', title: 'GitHub: Utils & OSINT', desc: 'Κατέβασμα βίντεο, προσπέραση συνδρομών και Media Players.' }
];"""

data = re.sub(r'\];', new_cats, data, count=1)

new_db = """
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
    };"""

data = re.sub(r'};\s+return\s+db\[category\]', new_db + '\n    return db[category]', data, count=1)

with codecs.open('c:/Users/manol/.gemini/antigravity-ide/scratch/infodash/js/secret-data.js', 'w', 'utf-8') as f:
    f.write(data)

print("40 GitHub Top projects integrated successsfully!")
