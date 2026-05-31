# 🚀 InfoDash Hub - Premium Telemetry & Operations Dashboard

Το **InfoDash Hub** είναι μια πανίσχυρη, 100% δωρεάν, και πλήρως responsive (συμβατή με Windows & Android) πλατφόρμα ελέγχου, παραγωγικότητας, στατιστικής ανάλυσης και πληροφόρησης. 

Σχεδιασμένη με σκοπό να προσφέρει ένα κομψό, premium σκοτεινό περιβάλλον εργασίας (Dark-Themed Dashboard) με dynamic animations και micro-interactions, η πλατφόρμα συγκεντρώνει live telemetry δεδομένα, αθλητικά στατιστικά, αναλύσεις κληρώσεων ΟΠΑΠ, αγορές κρυπτονομισμάτων, OSINT εργαλεία και δεκάδες εξειδικευμένα θεματικά Hubs.

---

## 🔒 1. Ασφάλεια & Πύλη Εισόδου (Security Gate)
* **Login Gate:** Προστασία της εφαρμογής με έλεγχο κωδικού πρόσβασης κατά την έναρξη για την αποτροπή μη εξουσιοδοτημένης πρόσβασης.
* **Διαπιστευτήρια:** Οι κωδικοί πρόσβασης και οι backdoors είναι ασφαλισμένοι και γνωστοί μόνο στον διαχειριστή.
* **Local Persistence:** Χρήση του `localStorage` για τη διατήρηση της εξουσιοδοτημένης συνεδρίας, ώστε ο χρήστης να μην χρειάζεται να συνδέεται συνεχώς.

---

## 🖥️ 2. Προσωπικό Κέντρο Ελέγχου (My Dashboard)
* **Live Telemetry Bar:** 
  * **VPN Status:** Ένδειξη κρυπτογράφησης δικτύου.
  * **IP & Org Detector:** Live εντοπισμός της τρέχουσας IP διεύθυνσης και του παρόχου δικτύου.
  * **Live Weather Widget:** Πρόγνωση καιρού σε πραγματικό χρόνο για επιλεγμένες πόλεις (Αθήνα, Θεσσαλονίκη, Πάτρα, Ηράκλειο, Λονδίνο, Νέα Υόρκη) με εμφάνιση υγρασίας και ταχύτητας ανέμου.
  * **World Clock:** Ψηφιακό ρολόι με δυνατότητα άμεσης αλλαγής ζώνης ώρας (Ελλάδα, Ρωσία, ΗΠΑ, Κίνα, Αυστραλία κλπ.).
* **Live News Hub:** Ροή ειδήσεων σε πραγματικό χρόνο, χωρισμένη σε Ελληνικά και Παγκόσμια νέα.
* **System Health Monitor:** Live Ping Tester και υπολογισμός χρήσης μνήμης RAM (simulated).
* **Todo List / Task Manager:** Πλήρως λειτουργικό widget για προσθήκη, ολοκλήρωση και διαγραφή καθημερινών εργασιών.
* **Saved Directory Links:** Ενότητα όπου εμφανίζονται οι σελίδες που έχει αποθηκεύσει (με αστεράκι) ο χρήστης από το Directory για γρήγορη πρόσβαση.

---

## ⚽ 3. Στοίχημα & Live Αγώνες (Betting & Live Matches)
* **Real-time Scoreboard:** Live αποτελέσματα αγώνων από τα κορυφαία πρωταθλήματα ποδοσφαίρου (Champions League, Europa League, Premier League, La Liga, Serie A, κλπ.).
* **Dynamic Leagues Filtering:** Φιλτράρισμα των αγώνων ανά διοργάνωση με δυναμικό υπολογισμό πλήθους αγώνων.
* **Advanced AI Match Analysis:** Με διπλό κλικ σε οποιονδήποτε αγώνα, ανοίγει ένα αναλυτικό παράθυρο (modal) με:
  * **AI Predictions:** Ποσοστά νίκης, xG (Expected Goals), live tracking κόρνερ και καρτών.
  * **Stadium Weather:** Καιρικές συνθήκες στο γήπεδο διεξαγωγής του αγώνα.
  * **AI Research Notes:** Εξειδικευμένες πληροφορίες για τη φόρμα των ομάδων, απουσίες ή κίνητρο.

---

## 📊 4. Mega Lottery Analytics (OPAP Engine)
Σύνδεση με το επίσημο API του ΟΠΑΠ (μέσω CORS proxy failover) για ανάλυση κληρώσεων **Τζόκερ, Eurojackpot** και **Lotto**.
* **18 Κατηγορίες Στατιστικών & AI:**
  1. **Τελευταία:** Εμφάνιση των τελευταίων 5 κληρώσεων με χρωματική διάκριση αριθμών και bonus.
  2. **Αλγόριθμοι & AI Predictions:** Markov Chain & Delay Weights αλγόριθμοι που κάνουν backtesting στις τελευταίες 25 κληρώσεις και δείχνουν το ποσοστό επιτυχίας τους!
  3. **Algorithm Codebase:** Live προβολή του κώδικα των αλγορίθμων πρόβλεψης σε Javascript και Python (Regression/xG models).
  4. **Προηγούμενες:** Πλήρες ιστορικό προηγούμενων κληρώσεων.
  5. **Πινακάκια & Πίνακας:** Στατιστική απεικόνιση κατανομής αριθμών.
  6. **Hot & Cold:** Live υπολογισμός των πιο συχνών (Hot) και πιο σπάνιων (Cold) αριθμών.
  7. **weird (Παράξενες):** Εντοπισμός κληρώσεων με ασυνήθιστα μοτίβα.
  8. **Check (Backtester δελτίου):** Εισαγωγή των αριθμών σας και έλεγχος αν θα είχατε κερδίσει σε προηγούμενες κληρώσεις.
  9. **Δεκάδες, Λήγοντες, Αθροίσματα, Αποστάσεις, Παρόμοιοι, Συστήματα κλπ.:** Πλήρης μαθηματική ανάλυση για επαγγελματική μελέτη.

---

## 🪙 5. Crypto Markets Intelligence (Top 100)
* **15-Point Deep Statistics Table:** Αναλυτικός πίνακας των 100 κορυφαίων κρυπτονομισμάτων με στοιχεία σε πραγματικό χρόνο:
  * Rank, Coin Name, Live Price, 1h / 24h / 7d εκατοστιαία αλλαγή.
  * Market Cap, 24h Volume, Circulating Supply, FDV (Fully Diluted Valuation).
  * ATH (All-Time High), 24h High/Low.
  * Volatility (Μεταβλητότητα) & Sentiment (Κλίμα αγοράς - Bullish/Bearish).

---

## 📈 6. Finance & Trends
* **Side Hustles:** Ιδέες και οδηγοί για συμπληρωματικό εισόδημα.
* **Market Heatmap:** Οπτικοποίηση των τάσεων της αγοράς.
* **Μερίσματα & Cost of Living:** Οικονομικά εργαλεία και δείκτες κόστους ζωής.
* **AI Trading & AI Portfolio:** Στρατηγικές διαχείρισης χαρτοφυλακίου με χρήση τεχνητής νοημοσύνης.

---

## 💡 7. LifeHack & Productivity
* **Deals & Discounts:** Πύλη προσφορών και έξυπνων αγορών.
* **Security & Hacks:** Συμβουλές ψηφιακής ασφάλειας.
* **AI Productivity Tools:** AI Notes, AI Emails templates, AI Focus guides, και AI Habits tracking.

---

## 🌌 8. Επιστήμη & Δεδομένα (Science & Data)
* **Space & NASA:** Live νέα από το διάστημα και φωτογραφία της ημέρας.
* **Σεισμοί Live:** Live telemetry δεδομένα για πρόσφατες σεισμικές δονήσεις.
* **Flight Tracker:** Ενσωμάτωση χαρτών εντοπισμού πτήσεων.

---

## 🔗 9. Directory (Χρήσιμοι Σύνδεσμοι)
* Κατηγοριοποιημένος κατάλογος με χρήσιμα links (Search Engines, AI Tools, Tech News, Productivity, κλπ.).
* Δυνατότητα αποθήκευσης οποιουδήποτε συνδέσμου απευθείας στο **My Dashboard** με το πάτημα ενός κουμπιού (αστεράκι).

---

## 🕹️ 10. Leisure & Retro
* **Retro Gaming:** Ενσωματωμένοι emulators και retro παιχνίδια.
* **Movies & TV Shows:** Τάσεις, νέες κυκλοφορίες και προτάσεις.

---

## ⚡ 11. Specialized Hubs (Δεξιά Στήλη - 13 Ενότητες)
Η δεξιά πλευρική μπάρα ξεκλειδώνει εξειδικευμένες σουίτες εργαλείων:
1. **AI & Automation:** Εργαλεία Chatbots, Image Generators και αυτοματισμοί.
2. **Top Picks:** Οι προτάσεις του InfoDash.
3. **Nomads & Remote:** Remote εργασία, Nomad Guides, Visa & Tax πληροφορίες.
4. **Privacy & Cyber:** Burner tools, VPN reviews, encryption tools.
5. **Health & Fitness:** Home Workouts, Biohacking, AI Symptom checker.
6. **Creator Studio:** Video editing assets, Graphic design, Social strategy.
7. **Career & Academic:** Certifications, CV tips, AI Tutors.
8. **Lifelong Skills:** Coding, Languages, DIY crafts.
9. **OSINT Scanner:** Εργαλεία αναζήτησης usernames, domains και breach checks.
10. **Web3 Whale Watch:** Whale Alerts, NFT markets, Yield farming trackers.
11. **Metaskills Hub:** Memory Palace, Speed Reading, Neuroplasticity.
12. **Security Fortress:** 
    * *Dark Web Leak Checker:* Έλεγχος διαρροής email/username.
    * *URL Reputation Scanner:* Έλεγχος ασφάλειας συνδέσμων.
13. **Global Radar:** Simulated Satellite Pass Alerts και live telemetry feed.

---

## 🤫 12. Κρυφό Μενού (Syndicate Access)
* **Ενεργοποίηση:** Ειδική κρυφή αλληλεπίδραση (easter egg) στην αριστερή στήλη πλοήγησης.
* **Λειτουργία:** Ανοίγει την πύλη εισόδου της premium/backstage κονσόλας ελέγχου για τον διαχειριστή.

---

## 📱 13. Συμβατότητα Κινητών (Mobile Responsive & Android)
* **Off-Canvas Sidebars:** Σε αναλύσεις κινητών (< 768px), η αριστερή και η δεξιά στήλη κρύβονται και εμφανίζονται ως slide-in μενού.
* **Close & Open Controls:** 
  * Ειδικό burger κουμπί (`#mobile-menu-open`) για την αριστερή στήλη.
  * Κουμπί κεραυνού (`#mobile-hubs-open`) για τη δεξιά στήλη.
  * Κουμπιά κλεισίματος (`Xmark`) για εύκολη πλοήγηση με την αφή.
