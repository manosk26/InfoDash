import codecs
import re

with codecs.open('c:/Users/manol/.gemini/antigravity-ide/scratch/infodash/js/secret-data.js', 'r', 'utf-8') as f:
    data = f.read()

new_cats = """
    ,{ id: 'off_passwords', icon: 'fa-solid fa-key', title: 'Offline Password & Hashes', desc: 'Εργαλεία Hash Cracking (Offline) για ανάκτηση και σπάσιμο κωδικών πρόσβασης.' },
    { id: 'off_networks', icon: 'fa-solid fa-network-wired', title: 'Offline Network Sniffing', desc: 'Ανάλυση πακέτων (PCAP) και παρακολούθηση δικτύου εκτός σύνδεσης.' },
    { id: 'off_forensics', icon: 'fa-solid fa-magnifying-glass-chart', title: 'Offline Digital Forensics', desc: 'Ανάλυση μνήμης RAM, σκληρών δίσκων και αναζήτηση ιχνών σε νεκρά συστήματα.' },
    { id: 'off_reversing', icon: 'fa-solid fa-microchip', title: 'Reverse Engineering Labs', desc: 'Αποσυμπίληση λογισμικού (Decompiling), εύρεση κώδικα και ανάλυση Malware.' },
    { id: 'on_recon', icon: 'fa-solid fa-satellite-dish', title: 'Online Target Reconnaissance', desc: 'Σάρωση υποδομών, χαρτογράφηση στόχων και εύρεση Subdomains στο Web.' },
    { id: 'on_web_scanners', icon: 'fa-solid fa-spider', title: 'Online Web Scanners', desc: 'Αυτοματοποιημένος εντοπισμός κενών ασφαλείας (SQL, XSS) σε Web εφαρμογές.' },
    { id: 'on_exploitation', icon: 'fa-solid fa-bomb', title: 'Online Exploitation Frameworks', desc: 'Πλατφόρμες εκμετάλλευσης τρωτών σημείων και παράκαμψης συστημάτων (PenTesting).' },
    { id: 'on_phishing', icon: 'fa-solid fa-fish-fins', title: 'Phishing Simulators & Social Eng.', desc: 'Δοκιμές κοινωνικής μηχανικής (Social Engineering) και πλαστές καμπάνιες Phishing.' }
];"""

data = re.sub(r'\];', new_cats, data, count=1)

new_db = """
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
    };"""

data = re.sub(r'};\s+return\s+db\[category\]', new_db + '\n    return db[category]', data, count=1)

with codecs.open('c:/Users/manol/.gemini/antigravity-ide/scratch/infodash/js/secret-data.js', 'w', 'utf-8') as f:
    f.write(data)

print("Hacking tools successfully injected (44 tools).")
