window.FREE_APIS_CATEGORIES = [
    { id: 'all', name: 'Όλα τα APIs', icon: 'fa-solid fa-list' },
    { id: 'public-data', name: 'Δημόσια & Κοινωνικά Δεδομένα', icon: 'fa-solid fa-users' },
    { id: 'weather', name: 'Καιρός & Περιβάλλον', icon: 'fa-solid fa-cloud-sun' },
    { id: 'finance', name: 'Οικονομικά & Crypto', icon: 'fa-solid fa-money-bill-trend-up' },
    { id: 'dev-tools', name: 'Εργαλεία & Ανάπτυξη', icon: 'fa-solid fa-code' },
    { id: 'entertainment', name: 'Ψυχαγωγία & AI', icon: 'fa-solid fa-brain' }
];

window.FREE_APIS_DATA = [
    // 1. Δημόσια & Κοινωνικά Δεδομένα (public-data)
    {
        name: 'OpenStreetMap Nominatim',
        url: 'https://nominatim.openstreetmap.org',
        category: 'public-data',
        icon: 'fa-solid fa-map-location-dot',
        desc: 'Γεωκωδικοποίηση και αναζήτηση διευθύνσεων παγκοσμίως. Μετατρέπει συντεταγμένες σε διευθύνσεις και το αντίστροφο δωρεάν.'
    },
    {
        name: 'RestCountries',
        url: 'https://restcountries.com',
        category: 'public-data',
        icon: 'fa-solid fa-flag',
        desc: 'Αναλυτικές πληροφορίες για όλες τις χώρες του κόσμου. Παρέχει στοιχεία για πληθυσμό, πρωτεύουσα, σημαία, νομίσματα και σύνορα.'
    },
    {
        name: 'IP-API',
        url: 'http://ip-api.com',
        category: 'public-data',
        icon: 'fa-solid fa-network-wired',
        desc: 'Εντοπισμός γεωγραφικής θέσης, παρόχου δικτύου (ISP), συντεταγμένων και ζώνης ώρας βάσει οποιασδήποτε διεύθυνσης IP.'
    },
    {
        name: 'Universities List API',
        url: 'http://universities.hipolabs.com',
        category: 'public-data',
        icon: 'fa-solid fa-graduation-cap',
        desc: 'Αναζήτηση και λίστα πανεπιστημιακών ιδρυμάτων ανά χώρα σε όλο τον κόσμο με τους αντίστοιχους ιστότοπούς τους.'
    },
    {
        name: 'Wikipedia API',
        url: 'https://en.wikipedia.org/w/api.php',
        category: 'public-data',
        icon: 'fa-brands fa-wikipedia-w',
        desc: 'Αναζήτηση άρθρων, λήψη περιλήψεων, εικόνων και ιστορικών δεδομένων από τη Wikipedia σε πραγματικό χρόνο.'
    },
    {
        name: 'Zippopotam.us',
        url: 'http://www.zippopotam.us',
        category: 'public-data',
        icon: 'fa-solid fa-envelope-open-text',
        desc: 'Εύρεση γεωγραφικών συντεταγμένων, πόλης και περιοχής βάσει ταχυδρομικού κώδικα (ΤΚ) για δεκάδες χώρες.'
    },
    {
        name: 'Open Library API',
        url: 'https://openlibrary.org/developers/api',
        category: 'public-data',
        icon: 'fa-solid fa-book-open',
        desc: 'Αναζήτηση βιβλίων, συγγραφέων, εξωφύλλων και εκδόσεων από μια τεράστια ανοικτή ψηφιακή βιβλιοθήκη.'
    },
    {
        name: 'City of Athens Open Data',
        url: 'https://opendata.ath.gr',
        category: 'public-data',
        icon: 'fa-solid fa-monument',
        desc: 'Ανοικτά δεδομένα του Δήμου Αθηναίων για σημεία ενδιαφέροντος, μουσεία, δημόσιες υπηρεσίες και πολιτιστικές εκδηλώσεις.'
    },
    {
        name: 'Bored API',
        url: 'https://www.boredapi.com',
        category: 'public-data',
        icon: 'fa-solid fa-face-laugh-beam',
        desc: 'Προτάσεις για δραστηριότητες και χόμπι ανάλογα με τον αριθμό των ατόμων, τον τύπο απασχόλησης και τον προϋπολογισμό.'
    },
    {
        name: 'US Holidays API',
        url: 'https://date.nager.at',
        category: 'public-data',
        icon: 'fa-solid fa-calendar-day',
        desc: 'Επίσημες αργίες και εορτολόγια για πάνω από 100 χώρες παγκοσμίως, συμπεριλαμβανομένης της Ελλάδας.'
    },

    // 2. Καιρός & Περιβάλλον (weather)
    {
        name: 'Open-Meteo',
        url: 'https://open-meteo.com',
        category: 'weather',
        icon: 'fa-solid fa-temperature-half',
        desc: 'Δωρεάν προγνώσεις καιρού χωρίς κλειδί API για οποιεσδήποτε συντεταγμένες παγκοσμίως, με ωριαία δεδομένα.'
    },
    {
        name: 'OpenWeatherMap',
        url: 'https://openweathermap.org',
        category: 'weather',
        icon: 'fa-solid fa-sun-cloud',
        desc: 'Τρέχουσες καιρικές συνθήκες και προγνώσεις παγκοσμίως (με δωρεάν όριο 1.000 κλήσεων/ημέρα κατόπιν εγγραφής).'
    },
    {
        name: 'Weatherbit',
        url: 'https://www.weatherbit.io',
        category: 'weather',
        icon: 'fa-solid fa-wind',
        desc: 'Αναλυτικά ιστορικά δεδομένα καιρού, τρέχουσες συνθήκες, δείκτης ποιότητας αέρα και πρόγνωση 16 ημερών.'
    },
    {
        name: 'AQICN (Air Quality Index)',
        url: 'https://aqicn.org',
        category: 'weather',
        icon: 'fa-solid fa-smog',
        desc: 'Πληροφορίες για την ποιότητα του αέρα και επίπεδα επικίνδυνων ρύπων σε πραγματικό χρόνο για χιλιάδες πόλεις.'
    },
    {
        name: 'NASA Open APIs',
        url: 'https://api.nasa.gov',
        category: 'weather',
        icon: 'fa-solid fa-user-astronaut',
        desc: 'Φωτογραφίες της ημέρας από το διάστημα (APOD), δεδομένα αστεροειδών και τηλεμετρία από τον πλανήτη Άρη.'
    },
    {
        name: 'Sunrise Sunset API',
        url: 'https://sunrise-sunset.org/api',
        category: 'weather',
        icon: 'fa-solid fa-sun',
        desc: 'Ώρες ανατολής, δύσης ηλίου και λυκόφωτος για οποιοδήποτε γεωγραφικό σημείο στη γη με βάση τις συντεταγμένες.'
    },
    {
        name: 'USGS Earthquake API',
        url: 'https://earthquake.usgs.gov',
        category: 'weather',
        icon: 'fa-solid fa-house-crack',
        desc: 'Δεδομένα σεισμών σε πραγματικό χρόνο παγκοσμίως, με πληροφορίες για το μέγεθος, το επίκεντρο και το βάθος.'
    },
    {
        name: 'Carbon Intensity API',
        url: 'https://carbonintensity.org.uk',
        category: 'weather',
        icon: 'fa-solid fa-leaf',
        desc: 'Δεδομένα εκπομπών CO2 από την παραγωγή ηλεκτρικής ενέργειας και πρόγνωση έντασης άνθρακα.'
    },
    {
        name: 'RainViewer API',
        url: 'https://www.rainviewer.com/api.html',
        category: 'weather',
        icon: 'fa-solid fa-cloud-showers-water',
        desc: 'Δεδομένα ραντάρ βροχής και νεφώσεων για οπτικοποίηση σε διαδραστικούς χάρτες σε πραγματικό χρόνο.'
    },
    {
        name: 'Stormglass API',
        url: 'https://stormglass.io',
        category: 'weather',
        icon: 'fa-solid fa-water',
        desc: 'Δεδομένα για ύψος κυμάτων, παλίρροιες, ρεύματα και θαλάσσιο καιρό για ναυσιπλοΐα και αθλητές (δωρεάν όριο).'
    },

    // 3. Οικονομικά & Crypto (finance)
    {
        name: 'CoinGecko API',
        url: 'https://www.coingecko.com/en/api',
        category: 'finance',
        icon: 'fa-brands fa-ethereum',
        desc: 'Τιμές, κεφαλαιοποίηση, όγκος και ιστορικά δεδομένα για χιλιάδες κρυπτονομίσματα από εκατοντάδες ανταλλακτήρια.'
    },
    {
        name: 'CoinCap API',
        url: 'https://coincap.io',
        category: 'finance',
        icon: 'fa-solid fa-coins',
        desc: 'Δεδομένα αγοράς crypto σε πραγματικό χρόνο με υποστήριξη REST και WebSocket για άμεση ενημέρωση.'
    },
    {
        name: 'Frankfurter Exchange API',
        url: 'https://www.frankfurter.app',
        category: 'finance',
        icon: 'fa-solid fa-euro-sign',
        desc: 'Τρέχουσες και ιστορικές ισοτιμίες νομισμάτων που δημοσιεύονται από την Ευρωπαϊκή Κεντρική Τράπεζα (ΕΚΤ).'
    },
    {
        name: 'ExchangeRate-API',
        url: 'https://www.exchangerate-api.com',
        category: 'finance',
        icon: 'fa-solid fa-money-bill-transfer',
        desc: 'Δωρεάν μετατροπέας συναλλάγματος για 160+ νομίσματα με καθημερινή ενημέρωση των ισοτιμιών.'
    },
    {
        name: 'CryptoCompare',
        url: 'https://min-api.cryptocompare.com',
        category: 'finance',
        icon: 'fa-solid fa-chart-line',
        desc: 'Ιστορικά δεδομένα, τιμές κρυπτονομισμάτων, ειδήσεις από την αγορά των crypto και σύγκριση ανταλλακτηρίων.'
    },
    {
        name: 'Coinpaprika',
        url: 'https://api.coinpaprika.com',
        category: 'finance',
        icon: 'fa-solid fa-chart-bar',
        desc: 'Αναλυτικά στατιστικά αγοράς, τιμές κρυπτονομισμάτων, προφίλ projects και πληροφορίες ομάδων ανάπτυξης.'
    },
    {
        name: 'Alpha Vantage',
        url: 'https://www.alphavantage.co',
        category: 'finance',
        icon: 'fa-solid fa-arrow-trend-up',
        desc: 'Ιστορικές τιμές μετοχών, Forex, Crypto, οικονομικοί δείκτες και τεχνικοί δείκτες ανάλυσης (δωρεάν όριο).'
    },
    {
        name: 'Binance API',
        url: 'https://binance-docs.github.io/apidocs/spot/en/',
        category: 'finance',
        icon: 'fa-brands fa-btc',
        desc: 'Δημόσια δεδομένα τιμών, βιβλίου εντολών, όγκου συναλλαγών και ιστορικών κεριών από το ανταλλακτήριο Binance.'
    },
    {
        name: 'Yahoo Finance API',
        url: 'https://financeapi.net',
        category: 'finance',
        icon: 'fa-solid fa-landmark-flag',
        desc: 'Δεδομένα χρηματιστηρίου, δεικτών, οικονομικών νέων, ισοτιμιών και προφίλ εταιρειών παγκοσμίως.'
    },
    {
        name: 'Financial Modeling Prep (FMP)',
        url: 'https://financialmodelingprep.com/developer/docs/',
        category: 'finance',
        icon: 'fa-solid fa-receipt',
        desc: 'Οικονομικές καταστάσεις εταιρειών, ισολογισμοί, ταμειακές ροές και τιμές μετοχών σε πραγματικό χρόνο (δωρεάν όριο).'
    },

    // 4. Εργαλεία & Ανάπτυξη (dev-tools)
    {
        name: 'JSONPlaceholder',
        url: 'https://jsonplaceholder.typicode.com',
        category: 'dev-tools',
        icon: 'fa-solid fa-database',
        desc: 'Ψεύτικα δεδομένα (posts, comments, users) για δοκιμές frontend και prototyping χωρίς ανάγκη δικού σας backend.'
    },
    {
        name: 'Robohash',
        url: 'https://robohash.org',
        category: 'dev-tools',
        icon: 'fa-solid fa-robot',
        desc: 'Δημιουργία μοναδικών και διασκεδαστικών avatar/ρομπότ από οποιοδήποτε κείμενο, όνομα ή IP διεύθυνση.'
    },
    {
        name: 'Dicebear Avatars',
        url: 'https://www.dicebear.com',
        category: 'dev-tools',
        icon: 'fa-solid fa-user-gear',
        desc: 'Γεννήτρια premium avatars με δεκάδες στυλ σχεδίασης (pixel, human, vector, initials) για mockups.'
    },
    {
        name: 'Httpbin',
        url: 'https://httpbin.org',
        category: 'dev-tools',
        icon: 'fa-solid fa-square-poll-horizontal',
        desc: 'Εργαλείο για δοκιμές HTTP requests. Επιστρέφει headers, IP, μεθόδους (GET, POST), cookies και αρχεία.'
    },
    {
        name: 'QR Code Generator API',
        url: 'https://goqr.me/api/',
        category: 'dev-tools',
        icon: 'fa-solid fa-qrcode',
        desc: 'Δημιουργία κωδικών QR άμεσα από κείμενο, τηλέφωνα, SMS, vCards ή URL διευθύνσεις μέσω απλού HTTP GET.'
    },
    {
        name: 'cdnjs API',
        url: 'https://cdnjs.com/api',
        category: 'dev-tools',
        icon: 'fa-solid fa-magnifying-glass-chart',
        desc: 'Αναζήτηση, λήψη συνδέσμων και πληροφοριών για χιλιάδες βιβλιοθήκες JavaScript/CSS από το CDNJS.'
    },
    {
        name: 'GitHub API',
        url: 'https://api.github.com',
        category: 'dev-tools',
        icon: 'fa-brands fa-github',
        desc: 'Δεδομένα χρηστών, οργανισμών, αποθετηρίων (repositories), commits, issues και releases του GitHub.'
    },
    {
        name: 'CleanURI URL Shortener',
        url: 'https://cleanuri.com',
        category: 'dev-tools',
        icon: 'fa-solid fa-scissors',
        desc: 'Δωρεάν εργαλείο για συντόμευση μακροσκελών συνδέσμων URL μέσω απλού API αιτήματος (POST request).'
    },
    {
        name: 'Cloudflare Trace',
        url: 'https://www.cloudflare.com/cdn-cgi/trace',
        category: 'dev-tools',
        icon: 'fa-brands fa-cloudflare',
        desc: 'Πληροφορίες για το δίκτυο, την τοποθεσία, τη διεύθυνση IP και το πρωτόκολλο σύνδεσης Cloudflare του χρήστη.'
    },
    {
        name: 'RandomUser Generator',
        url: 'https://randomuser.me',
        category: 'dev-tools',
        icon: 'fa-solid fa-users-viewfinder',
        desc: 'Δημιουργία τυχαίων προφίλ χρηστών (όνομα, φωτογραφία, email, τηλέφωνο, διεύθυνση) για mockups.'
    },

    // 5. Ψυχαγωγία & AI (entertainment)
    {
        name: 'The Dog API',
        url: 'https://thedogapi.com',
        category: 'entertainment',
        icon: 'fa-solid fa-dog',
        desc: 'Τυχαίες εικόνες, ράτσες, χαρακτηριστικά και αναλυτικές πληροφορίες για σκύλους (με δωρεάν API Key).'
    },
    {
        name: 'The Cat API',
        url: 'https://thecatapi.com',
        category: 'entertainment',
        icon: 'fa-solid fa-cat',
        desc: 'Τυχαίες εικόνες, ράτσες, χαρακτηριστικά και αναλυτικές πληροφορίες για γάτες (με δωρεάν API Key).'
    },
    {
        name: 'PokeAPI',
        url: 'https://pokeapi.co',
        category: 'entertainment',
        icon: 'fa-solid fa-gamepad',
        desc: 'Τεράστια και εξαιρετικά αναλυτική βάση δεδομένων για Pokémon (στατιστικά, ικανότητες, κινήσεις, εικόνες).'
    },
    {
        name: 'TVmaze API',
        url: 'https://www.tvmaze.com/api',
        category: 'entertainment',
        icon: 'fa-solid fa-tv',
        desc: 'Πληροφορίες για τηλεοπτικές σειρές, επεισόδια, ηθοποιούς, προγράμματα καναλιών και trends παγκοσμίως.'
    },
    {
        name: 'Jikan API (MyAnimeList)',
        url: 'https://jikan.moe',
        category: 'entertainment',
        icon: 'fa-solid fa-dragon',
        desc: 'Αναζήτηση anime, manga, χαρακτήρων, φωνών ηθοποιών και κριτικών απευθείας από το MyAnimeList.'
    },
    {
        name: 'Chuck Norris Jokes',
        url: 'https://api.chucknorris.io',
        category: 'entertainment',
        icon: 'fa-solid fa-shield-cat',
        desc: 'Τυχαία αστεία, ανέκδοτα και αποφθέγματα για τον Chuck Norris κατηγοριοποιημένα.'
    },
    {
        name: 'Quotes Free API',
        url: 'https://type.fit/api/quotes',
        category: 'entertainment',
        icon: 'fa-solid fa-quote-left',
        desc: 'Τυχαία γνωμικά, αποφθέγματα, ρητά και διάσημες ατάκες ιστορικών προσωπικοτήτων.'
    },
    {
        name: 'Numbers API',
        url: 'http://numbersapi.com',
        category: 'entertainment',
        icon: 'fa-solid fa-calculator',
        desc: 'Ενδιαφέροντα ιστορικά γεγονότα και μαθηματικά στοιχεία για οποιονδήποτε αριθμό ή ημερομηνία.'
    },
    {
        name: 'AnimeChan',
        url: 'https://animechan.xyz',
        category: 'entertainment',
        icon: 'fa-solid fa-quote-right',
        desc: 'Τυχαία αποφθέγματα από χαρακτήρες anime με φιλτράρισμα ανά σειρά ή χαρακτήρα.'
    },
    {
        name: 'LibreTranslate API',
        url: 'https://libretranslate.com',
        category: 'entertainment',
        icon: 'fa-solid fa-language',
        desc: 'Δωρεάν open-source μετάφραση κειμένου ανάμεσα σε δεκάδες γλώσσες χωρίς περιορισμούς ιδιωτικότητας.'
    }
];
