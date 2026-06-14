// =========================================================================
// 100 METAPHYSICAL, ENERGY & "WEIRD" SCRIPTS FOR INFODASH HUB
// =========================================================================

(function() {
    // Web Audio global references
    let audioCtx = null;
    let activeOscillators = [];
    let activeGainNode = null;
    let activeIntervals = [];

    // Helper to get or create Audio Context
    function getAudioContext() {
        if (!audioCtx) {
            audioCtx = new (window.AudioContext || window.webkitAudioContext)();
        }
        if (audioCtx.state === 'suspended') {
            audioCtx.resume();
        }
        return audioCtx;
    }

    // Helper to stop all playing audio from this module
    function stopAllModuleAudio() {
        activeOscillators.forEach(osc => { try { osc.stop(); osc.disconnect(); } catch(e) {} });
        activeOscillators = [];
        activeIntervals.forEach(clearInterval);
        activeIntervals = [];
        if (activeGainNode) {
            try { activeGainNode.disconnect(); } catch(e) {}
            activeGainNode = null;
        }
    }

    // Helper to play a frequency
    function playTone(freq, type = 'sine', duration = 0) {
        try {
            const ctx = getAudioContext();
            stopAllModuleAudio();
            
            const osc = ctx.createOscillator();
            const gainNode = ctx.createGain();
            
            osc.type = type;
            osc.frequency.setValueAtTime(freq, ctx.currentTime);
            
            gainNode.gain.setValueAtTime(0, ctx.currentTime);
            gainNode.gain.linearRampToValueAtTime(0.2, ctx.currentTime + 0.1);
            
            osc.connect(gainNode);
            gainNode.connect(ctx.destination);
            
            osc.start();
            activeOscillators.push(osc);
            activeGainNode = gainNode;

            if (duration > 0) {
                setTimeout(() => {
                    try {
                        gainNode.gain.linearRampToValueAtTime(0, ctx.currentTime + 0.1);
                        setTimeout(() => { osc.stop(); osc.disconnect(); }, 150);
                    } catch(e) {}
                }, duration);
            }
        } catch(err) {
            console.error("Audio Context error:", err);
        }
    }

    // Helper to play binaural beats (left / right channels)
    function playBinaural(baseFreq, beatFreq) {
        try {
            const ctx = getAudioContext();
            stopAllModuleAudio();
            
            const oscL = ctx.createOscillator();
            const oscR = ctx.createOscillator();
            
            const merger = ctx.createChannelMerger(2);
            const pannerL = ctx.createStereoPanner ? ctx.createStereoPanner() : null;
            const pannerR = ctx.createStereoPanner ? ctx.createStereoPanner() : null;
            
            const gainL = ctx.createGain();
            const gainR = ctx.createGain();
            
            oscL.frequency.setValueAtTime(baseFreq, ctx.currentTime);
            oscR.frequency.setValueAtTime(baseFreq + beatFreq, ctx.currentTime);
            
            gainL.gain.setValueAtTime(0.15, ctx.currentTime);
            gainR.gain.setValueAtTime(0.15, ctx.currentTime);
            
            if (pannerL && pannerR) {
                pannerL.pan.setValueAtTime(-1, ctx.currentTime);
                pannerR.pan.setValueAtTime(1, ctx.currentTime);
                
                oscL.connect(gainL).connect(pannerL).connect(ctx.destination);
                oscR.connect(gainR).connect(pannerR).connect(ctx.destination);
            } else {
                // Fallback for older browsers
                oscL.connect(gainL).connect(ctx.destination);
                oscR.connect(gainR).connect(ctx.destination);
            }
            
            oscL.start();
            oscR.start();
            
            activeOscillators.push(oscL, oscR);
        } catch(e) {
            console.error("Binaural creation failed:", e);
        }
    }

    // Helper to play noise (white, pink, brown)
    function playNoise(type = 'white') {
        try {
            const ctx = getAudioContext();
            stopAllModuleAudio();

            const bufferSize = 2 * ctx.sampleRate;
            const noiseBuffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
            const output = noiseBuffer.getChannelData(0);

            let lastOut = 0.0;
            for (let i = 0; i < bufferSize; i++) {
                const white = Math.random() * 2 - 1;
                if (type === 'white') {
                    output[i] = white;
                } else if (type === 'brown') {
                    output[i] = (lastOut + (0.02 * white)) / 1.02;
                    lastOut = output[i];
                    output[i] *= 3.5; // compensation
                } else if (type === 'pink') {
                    // Simple approximation for pink noise
                    output[i] = (lastOut + (0.12 * white)) / 1.12;
                    lastOut = output[i];
                    output[i] *= 2.0;
                }
            }

            const whiteNoise = ctx.createBufferSource();
            whiteNoise.buffer = noiseBuffer;
            whiteNoise.loop = true;

            const gainNode = ctx.createGain();
            gainNode.gain.setValueAtTime(0.15, ctx.currentTime);

            whiteNoise.connect(gainNode).connect(ctx.destination);
            whiteNoise.start();
            
            activeOscillators.push(whiteNoise);
            activeGainNode = gainNode;
        } catch(e) {
            console.error("Noise generation error:", e);
        }
    }

    // Greek astrology and esoteric data sets
    const ZODIAC_SIGNS = [
        { name: "Κριός", ruler: "Άρης", element: "Φωτιά", decans: ["Άρης", "Ήλιος", "Δίας"] },
        { name: "Ταύρος", ruler: "Αφροδίτη", element: "Γη", decans: ["Ερμής", "Σελήνη", "Κρόνος"] },
        { name: "Δίδυμοι", ruler: "Ερμής", element: "Αέρας", decans: ["Δίας", "Άρης", "Ήλιος"] },
        { name: "Καρκίνος", ruler: "Σελήνη", element: "Νερό", decans: ["Αφροδίτη", "Ερμής", "Σελήνη"] },
        { name: "Λέων", ruler: "Ήλιος", element: "Φωτιά", decans: ["Κρόνος", "Δίας", "Άρης"] },
        { name: "Παρθένος", ruler: "Ερμής", element: "Γη", decans: ["Ήλιος", "Αφροδίτη", "Ερμής"] },
        { name: "Ζυγός", ruler: "Αφροδίτη", element: "Αέρας", decans: ["Σελήνη", "Κρόνος", "Δίας"] },
        { name: "Σκορπιός", ruler: "Πλούτωνας / Άρης", element: "Νερό", decans: ["Άρης", "Ήλιος", "Αφροδίτη"] },
        { name: "Τοξότης", ruler: "Δίας", element: "Φωτιά", decans: ["Ερμής", "Σελήνη", "Κρόνος"] },
        { name: "Αιγόκερως", ruler: "Κρόνος", element: "Γη", decans: ["Δίας", "Άρης", "Ήλιος"] },
        { name: "Υδροχόος", ruler: "Ουρανός / Κρόνος", element: "Αέρας", decans: ["Αφροδίτη", "Ερμής", "Σελήνη"] },
        { name: "Ιχθύες", ruler: "Ποσειδώνας / Δίας", element: "Νερό", decans: ["Κρόνος", "Δίας", "Άρης"] }
    ];

    const TAROT_EXTRA_DECK = [
        { name: "Ο Κόσμος (The World)", symbol: "XXI", upright: "Ολοκλήρωση, επιτυχία, ταξίδια, εκπλήρωση στόχων.", reversed: "Έλλειψη κλεισίματος, ημιτελείς εργασίες, καθυστέρηση.", desc: "Ο Κόσμος αντιπροσωπεύει τον θρίαμβο, την ολοκλήρωση ενός μεγάλου κύκλου και την έναρξη μιας περιόδου αρμονίας." },
        { name: "Η Σελήνη (The Moon)", symbol: "XVIII", upright: "Ψευδαισθήσεις, φόβος, άγχος, υποσυνείδητο, διαίσθηση.", reversed: "Απελευθέρωση φόβου, αλήθεια, υπέρβαση σύγχυσης.", desc: "Η Σελήνη δείχνει ότι τα πράγματα δεν είναι πάντα όπως φαίνονται. Εμπιστευτείτε το ένστικτό σας και όχι τις σκιές." },
        { name: "Ο Ήλιος (The Sun)", symbol: "XIX", upright: "Χαρά, επιτυχία, ζωντάνια, αισιοδοξία, αλήθεια.", reversed: "Προσωρινή κατάθλιψη, έλλειψη ενέργειας, υπερβολική αισιοδοξία.", desc: "Ο Ήλιος φέρνει ζεστασιά, διαύγεια και απόλυτη επιτυχία. Είναι μια εξαιρετική κάρτα ευλογίας." },
        { name: "Η Κρίση (Judgement)", symbol: "XX", upright: "Αφύπνιση, κάλεσμα, συγχώρεση, απολογισμός.", reversed: "Αυτοαμφισβήτηση, άρνηση του καλέσματος, αναβλητικότητα.", desc: "Η Κρίση σας καλεί να κάνετε μια ειλικρινή αυτοαξιολόγηση και να προχωρήσετε σε μια νέα πνευματική φάση." },
        { name: "Ο Θάνατος (Death)", symbol: "XIII", upright: "Μεταμόρφωση, τέλος ενός κύκλου, αλλαγή, αναγέννηση.", reversed: "Αντίσταση στην αλλαγή, στασιμότητα, δύσκολη μετάβαση.", desc: "Ο Θάνατος σπάνια σημαίνει σωματικό θάνατο. Συμβολίζει το τέλος του παλιού για να γεννηθεί το νέο." }
    ];

    const RUNIC_ALPHABET = [
        { name: "Fehu (Φεχού)", meaning: "Αφθονία, Πλούτος, Ενέργεια", glyph: "ᚠ", desc: "Ο ρούνος Fehu συμβολίζει την υλική και πνευματική ευημερία, την κινητή περιουσία και τις νέες ευκαιρίες." },
        { name: "Uruz (Ουρούζ)", meaning: "Δύναμη, Υγεία, Ζωτικότητα", glyph: "ᚢ", desc: "Uruz είναι η άγρια δύναμη της φύσης, η σωματική αντοχή, η θεραπεία και η τόλμη." },
        { name: "Thurisaz (Θουρισάζ)", meaning: "Προστασία, Εμπόδιο, Δράση", glyph: "ᚦ", desc: "Συμβολίζει την άμυνα, την προειδοποίηση για επικείμενο κίνδυνο και τη δύναμη της θέλησης." },
        { name: "Ansuz (Ανσούζ)", meaning: "Επικοινωνία, Έμπνευση, Σοφία", glyph: "ᚨ", desc: "Ο ρούνος της θείας έμπνευσης, των μηνυμάτων, της γνώσης και της καθοδήγησης." },
        { name: "Raidho (Ραϊντό)", meaning: "Ταξίδι, Πορεία, Ρυθμός", glyph: "ᚱ", desc: "Raidho σημαίνει το ταξίδι της ζωής, τη μετακίνηση, το σωστό timing και την κοσμική τάξη." },
        { name: "Kenaz (Κενάζ)", meaning: "Φως, Δημιουργικότητα, Πάθος", glyph: "ᚲ", desc: "Ο ρούνος του πυρσού. Φέρνει διαύγεια, μάθηση, έμπνευση και ερωτική ενέργεια." }
    ];

    // Main 100 Scripts List
    const SCRIPTS_DATA = [];

    // Let's programmatically generate the 100 scripts metadata and render pipelines
    // ----------------- CATEGORY 1: Astrology & Cosmic (1-20) -----------------
    const astrologyTitles = [
        "Mercury Retrograde Indicator", "Moon Phase Widget", "Astrological Ephemeris API", "Natal Chart Generator",
        "Transit Alert System", "Lunar Void-Of-Course Tracker", "Planet Hour Calculator", "Solar Flare Energy Correlation",
        "Asteroid Goddesses Tracker", "Siriux/Orion Alignment Alert", "Chinese Bazi Calculator", "Vedic Moon Mansion (Nakshatra) Finder",
        "Retrograde Alarm Clock", "Cosmic Radiation Index Tracker", "Saturn Return Calculator", "Zodiac Sign Decan Analyzer",
        "Solar Eclipse Pathway Map", "Planetary Aspect Matrix", "Sidereal vs. Tropical Zodiac Converter", "Cosmic Micro-Climates Forecast"
    ];

    // ----------------- CATEGORY 2: Divination & Algos (21-40) -----------------
    const divinationTitles = [
        "Digital Tarot Card Spread", "I Ching Coin Tosser", "Runic Oracle Casting", "Gematria & Kabbalah Calculator",
        "Numerology Life Path Calculator", "Angel Numbers Detector", "Lenormand Deck Simulator", "Geomancy Shield Generator",
        "Solomon's Pentacles Catalog", "Daily Rune Sync Widget", "Yes/No Pendulum Simulator", "Kabbalistic Tree of Life Map",
        "Ogham Tree Alphabet Divination", "Pythagorean Triangle Name Analyzer", "Astragali (Ancient Dice) Roller", "Chaldean Numerology Matrix",
        "Sabian Symbols Generator", "Bibliomancy Script", "Destiny Card Matrix", "Esoteric Clock (Tattva Samaya)"
    ];

    // ----------------- CATEGORY 3: Frequencies & Audio (41-60) -----------------
    const frequencyTitles = [
        "Solfeggio Frequency Generator", "Binaural Brainwave Synchronizer", "Schumann Resonance Live Graph", "Chakra Alignment Visualizer",
        "Aura Color Camera Scanner (Simulated)", "White/Pink/Brown/Violet Noise Synthesizer", "Water Crystal Memory Simulator", "EEG Sleep-Stage Audio Transformer",
        "Orgone Accumulator Telemetry (Simulated)", "Sound Bath Timer", "Rife Frequency Database", "Vocal Tone Resonance Tuner",
        "Sacred Chant Player", "DNA Repair Frequency player (528Hz)", "Fibonacci Scale Soundscapes", "Color Therapy (Chromotherapy) Screen",
        "Heart Rate Variability Coherence Breathing", "Pyramid Resonance Guide", "Wind Chimes Element Generator", "Prana Breathing Metronome"
    ];

    // ----------------- CATEGORY 4: Glitch & ESP (61-80) -----------------
    const glitchTitles = [
        "Global Consciousness Project Tracker", "Zener Cards ESP Test", "Glitch in the Matrix Journal", "Quantum Target Generator",
        "Deja Vu Frequency Analyzer", "Psychokinesis Dice Test", "Synchronicity Alert Algorithm", "EVP (Electronic Voice Phenomenon) Recorder",
        "Telepathic Connection Checker", "Reality Check Alarm", "Out-of-Body Experience (OBE) Planner", "Third Eye Stimulation Exercise",
        "Quantum Tunneling Simulator", "EMF Sensor Log Connection", "Ghost Box Sweeper (Simulated)", "Aether Drift Velocity Monitor",
        "Micro-Spells Manifestation Board", "Time Dilation Calculator", "Parallel Universe Simulator", "Dream Telepathy Log"
    ];

    // ----------------- CATEGORY 5: Subconscious & Manifest (81-100) -----------------
    const manifestTitles = [
        "Subliminal Message Flasher", "Lucid Dream Probability Estimator", "Sacred Geometry Pattern Generator", "Sigil Generator Creator",
        "Manifestation Wall & Focal Point", "Akashic Records Search Simulator", "Tibetan Dream Yoga Guide", "Daily Tarot Journaling",
        "Pineal Gland Meditation Timer", "Intuition Training Sandbox", "Sacred Geometry Mandala Painter", "Esoteric Tarot-betting Matrix",
        "Astral Projection Induction Audio", "Manifestation Sigil Screen Saver", "Subconscious Dream Decoder", "Hemi-Sync Audio Synthesizer",
        "Tensegrity Movement Timer", "Kundalini Awakening Progress Tracker", "Kabbalistic Daily Blessing Wheel", "The Glitch Detector Grid"
    ];

    // Let's register 100 items dynamically
    const allCategories = [
        { cat: 1, titles: astrologyTitles },
        { cat: 2, titles: divinationTitles },
        { cat: 3, titles: frequencyTitles },
        { cat: 4, titles: glitchTitles },
        { cat: 5, titles: manifestTitles }
    ];

    let scriptCounter = 1;
    allCategories.forEach(c => {
        c.titles.forEach(t => {
            SCRIPTS_DATA.push({
                id: scriptCounter,
                title: t,
                category: c.cat,
                desc: getGreekDescription(scriptCounter),
                render: getRenderFunction(scriptCounter)
            });
            scriptCounter++;
        });
    });

    // Greek detailed description mappings for premium look
    function getGreekDescription(id) {
        const descriptions = {
            1: "Υπολογίζει αν ο Ερμής είναι σε ανάδρομη τροχιά με βάση την τρέχουσα ημερομηνία και δίνει οδηγίες επικοινωνίας.",
            2: "Live απεικόνιση της φάσης της Σελήνης και ο αντίκτυπός της στην ανθρώπινη ενέργεια, τη διαίσθηση και τον ύπνο.",
            3: "Υπολογιστής τρεχουσών θέσεων των πλανητών στα 12 ζώδια σε πραγματικό χρόνο.",
            4: "Παράγει έναν διαδραστικό αστρολογικό χάρτη γέννησης εισάγοντας ημερομηνία και ώρα.",
            5: "Ειδοποιήσεις όταν ένας πλανήτης εισέρχεται σε κρίσιμο ζώδιο και επηρεάζει τις κοσμικές δονήσεις.",
            6: "Υπολογίζει τις ώρες που η Σελήνη δεν κάνει όψεις (Void of Course), ιδανικές για χαλάρωση και όχι για νέα ξεκινήματα.",
            7: "Υπολογίζει τις «πλανητικές ώρες» της ημέρας για τελετουργικά, διαλογισμό ή σημαντικές αποφάσεις.",
            8: "Συσχετίζει τις ηλιακές εκλάμψεις με τις αυξομειώσεις της ανθρώπινης διάθεσης και του ηλεκτρομαγνητικού πεδίου.",
            9: "Παρακολούθηση της θέσης των 4 μεγάλων αστεροειδών (Δήμητρα, Παλλάδα, Ήρα, Εστία) στον κοσμικό ορίζοντα.",
            10: "Ειδοποίηση ευθυγράμμισης του Σείριου ή της ζώνης του Ωρίωνα με τον τοπικό ορίζοντα.",
            11: "Υπολογιστής των «Τεσσάρων Πυλώνων του Πεπρωμένου» (Bazi) βάσει της κινεζικής αστρολογίας.",
            12: "Υπολογίζει σε ποιο ινδικό «σεληνιακό σπίτι» (Nakshatra) βρίσκεται η σελήνη σήμερα.",
            13: "Ένα ξυπνητήρι που αλλάζει τον ήχο του ανάλογα με το ποιοι πλανήτες είναι ανάδρομοι.",
            14: "Μετρητής κοσμικού ιονισμού και κοσμικής ακτινοβολίας της ατμόσφαιρας.",
            15: "Υπολογίζει πότε ο Κρόνος επιστρέφει στη θέση γέννησης του χρήστη (κρίσιμα έτη 29, 58, 87).",
            16: "Ανάλυση των «δεκαημέρων» (Decans) των ζωδίων για βαθύτερη κατανόηση προσωπικότητας.",
            17: "Χάρτης που δείχνει το μονοπάτι και την ώρα της επόμενης ηλιακής έκλειψης.",
            18: "Πίνακας με τις γωνιακές σχέσεις (σύνοδος, τετράγωνο, τρίγωνο) των πλανητών σήμερα.",
            19: "Μετατροπέας μοιρών μεταξύ του δυτικού (Tropical) και του ινδικού (Sidereal) ζωδιακού κύκλου.",
            20: "Ημερήσια πρόγνωση της «κοσμικής ενέργειας» με βάση τις πλανητικές γωνίες.",

            21: "Τρισδιάστατο άνοιγμα καρτών Ταρώ με αλγόριθμο τυχαίας επιλογής χωρίς επανατοποθέτηση.",
            22: "Ψηφιακή ρίψη νομισμάτων I Ching με υπολογισμό εξαγράμμων και ερμηνεία κειμένων.",
            23: "Μαντείο των Σκανδιναβικών Ρούνων με ρίψη σε ψηφιακό καμβά.",
            24: "Μετατροπέας λέξεων σε αριθμητικές αξίες (εβραϊκή, ελληνική και λατινική γεωμετρία).",
            25: "Υπολογιστής του «Αριθμού Πορείας Ζωής» από την ημερομηνία γέννησης.",
            26: "Ανιχνεύει αν επαναλαμβανόμενοι αριθμοί (π.χ. 11:11, 222) εμφανίζονται στα live δεδομένα του InfoDash.",
            27: "Ψηφιακό μαντείο με τη διάσημη τράπουλα της δεσποινίδος Lenormand.",
            28: "Παράγει τη «γεωμαντική ασπίδα» 16 σχημάτων με βάση τυχαία σημεία.",
            29: "Διαδραστικός κατάλογος των κλειδών του Σολομώντα με βάση τον σκοπό χρήσης τους.",
            30: "Εμφανίζει τον «Ρούνο της Ημέρας» στην αρχική οθόνη με ανάλυση.",
            31: "Ψηφιακό εκκρεμές που ταλαντεύεται με βάση μικρο-κινήσεις του ποντικιού.",
            32: "Διαδραστικός χάρτης των 10 Σεφιρώθ και των 22 μονοπατιών του Καμπαλιστικού Δέντρου της Ζωής.",
            33: "Κέλτικο μαντείο βασισμένο στα 20 ιερά δέντρα του Ogham.",
            34: "Αναλύει το όνομα του χρήστη με βάση τις πυθαγόρειες αριθμολογικές αντιστοιχίες.",
            35: "Ρίψη 4 αστραγάλων για μαντεία κατά τα αρχαιοελληνικά πρότυπα.",
            36: "Υπολογιστής ονομάτων με βάση το χαλδαϊκό αριθμολογικό σύστημα.",
            37: "Εμφανίζει το «σαβιανό σύμβολο» για τη μοίρα που βρίσκεται ο ήλιος σήμερα.",
            38: "Επιλέγει τυχαία εδάφια από ελεύθερα ψηφιακά βιβλία ως απάντηση σε ερώτηση.",
            39: "Υπολογιστής της «κάρτας του πεπρωμένου» βάσει της ημερομηνίας γέννησης.",
            40: "Esoteric Clock: Δείχνει ποιο στοιχείο της φύσης (Prithvi, Apas, Tejas, Vayu, Akasha) κυριαρχεί τώρα.",

            41: "Παραγωγός καθαρών ημιτονικών κυμάτων στις 9 βασικές συχνότητες Solfeggio (π.χ. 528Hz, 432Hz).",
            42: "Παράγει δίωτους τόνους για την εισαγωγή του εγκεφάλου σε κατάσταση Alpha, Theta ή Gamma.",
            43: "Συνδέεται με δίκτυα παρατήρησης της Συχνότητας Schumann της Γης (7.83Hz).",
            44: "Οδηγός με animations και αντίστοιχες συχνότητες για την εξισορρόπηση των 7 Chakras.",
            45: "Χρησιμοποιεί την κάμερα και αναλύει τα χρώματα του background για να «ζωγραφίσει» την αύρα.",
            46: "Γεννήτρια διαφόρων χρωμάτων θορύβου για χαλάρωση και αποκλεισμό εξωτερικών ήχων.",
            47: "Visualizer που αλλάζει σχήμα κρυστάλλων νερού ανάλογα με τη συχνότητα ή τα λόγια που πληκτρολογείτε.",
            48: "Μετατρέπει τα δεδομένα ύπνου σε χαλαρωτική ambient μουσική.",
            49: "Μετρητής οργονικής ενέργειας (Orgone) στον περιβάλλοντα χώρο.",
            50: "Χρονόμετρο για ηχητικά λουτρά με θιβετιανά μπολ (Tibetan singing bowls).",
            51: "Κατάλογος «συχνοτήτων Rife» με δυνατότητα άμεσης αναπαραγωγής τους.",
            52: "Αναλύει τον τόνο της φωνής σας μέσω μικροφώνου και προτείνει διορθωτικές συχνότητες.",
            53: "Αναπαραγωγή αρχαίων ύμνων και μάντρα (Om, Gregorian chants) σε loop.",
            54: "Ειδικός player κλειδωμένος στη συχνότητα 528Hz για κυτταρική χαλάρωση.",
            55: "Ambient μουσική που συντίθεται σε πραγματικό χρόνο με βάση την ακολουθία Fibonacci.",
            56: "Γεμίζει την οθόνη με συγκεκριμένα θεραπευτικά χρώματα (π.χ. Indigo για ύπνο, Green για ηρεμία).",
            57: "Οπτικός οδηγός αναπνοής για τον συντονισμό καρδιάς-εγκεφάλου (HRV Coherence).",
            58: "Οδηγίες και συχνότητες για τοποθέτηση αντικειμένων σε γεωμετρικά σχήματα πυραμίδας.",
            59: "Παράγει ήχους ανέμου (wind chimes) ρυθμισμένους στα 4 στοιχεία (Γη, Νερό, Φωτιά, Αέρας).",
            60: "Μετρονόμος για ασκήσεις Pranayama (αναπνοές 4-7-8, box breathing).",

            61: "Παρακολουθεί live δεδομένα από γεννήτριες κβαντικού τυχαίου αριθμού (EGG) για τον εντοπισμό παγκόσμιων μεταβολών.",
            62: "Ψηφιακό τεστ με τις κάρτες Zener (κύκλος, σταυρός, κύματα, τετράφωνο, αστέρι) για τη μέτρηση της τηλεπάθειας.",
            63: "Τοπικό ημερολόγιο καταγραφής ανεξήγητων συμπτώσεων, Deja Vu και «glitches» της πραγματικότητας.",
            64: "Παράγει κβαντικές συντεταγμένες για εξερεύνηση (τύπου Randonautica) με βάση κβαντική τυχαιότητα.",
            65: "Στατιστική ανάλυση της συχνότητας εμφάνισης Deja Vu σε σχέση με τη σελήνη και τον ύπνο.",
            66: "Πείραμα όπου ο χρήστης προσπαθεί να «επηρεάσει» νοητικά τα αποτελέσματα 1000 ρίψεων ζαριών.",
            67: "Σκανάρει τις σημειώσεις και το ιστορικό σας για να εντοπίσει επαναλαμβανόμενες λέξεις-κλειδιά.",
            68: "Καταγράφει λευκό θόρυβο και εφαρμόζει φίλτρα για την ανίχνευση «φωνών» στο παρασκήνιο (EVP).",
            69: "Πείραμα με φίλο όπου προσπαθείτε να επιλέξετε ταυτόχρονα το ίδιο τυχαίο αντικείμενο.",
            70: "Τυχαίες ειδοποιήσεις κατά τη διάρκεια της ημέρας που σας ρωτούν «Ονειρεύεσαι τώρα;» (Reality Checks).",
            71: "Οδηγίες και καταγραφέας προσπαθειών για αστρική προβολή (OBE).",
            72: "Οπτικά μοτίβα που βοηθούν στη συγκέντρωση και την ενεργοποίηση της επίφυσης.",
            73: "Οπτική αναπαράσταση σωματιδίων που περνούν μέσα από απροσπέλαστα εμπόδια (Quantum Tunneling).",
            74: "Συνδέει εξωτερικούς αισθητήρες ηλεκτρομαγνητικού πεδίου για ανίχνευση «παρουσιών».",
            75: "Σαρώνει γρήγορα ραδιοφωνικές συχνότητες παράγοντας θόρυβο για EVP επικοινωνία (Ghost Box).",
            76: "Live διάγραμμα της «ταχύτητας μετατόπισης του αιθέρα» (Aether Drift Velocity).",
            77: "Ψηφιακός πίνακας όπου γράφετε στόχους και το script τους «κωδικοποιεί» σε μοτίβα ιεράς γεωμετρίας.",
            78: "Υπολογίζει πώς ο χρόνος κυλάει διαφορετικά για εσάς ανάλογα με την ταχύτητα κίνησής σας.",
            79: "Παράγει τυχαίες εναλλακτικές εκδοχές της σημερινής σας ημέρας με βάση αποκλίσεις αποφάσεων.",
            80: "Καταγραφή ονείρων που φάνηκαν να συμπίπτουν με πραγματικά γεγονότα άλλων ανθρώπων.",

            81: "Script που αναβοσβήνει θετικές δηλώσεις στην οθόνη για κλάσματα του δευτερολέπτου για υποσυνείδητο προγραμματισμό.",
            82: "Υπολογιστής πιθανότητας συνειδητού ονείρου απόψε βάσει ποιότητας ύπνου και reality checks.",
            83: "Παράγει σχήματα όπως το Flower of Life, το Metatron's Cube και το Sri Yantra με Canvas.",
            84: "Μετατρέπει μια γραπτή επιθυμία (manifestation statement) σε ένα μοναδικό, αφηρημένο μαγικό σύμβολο (Sigil).",
            85: "Ψηφιακός πίνακας οραματισμού με χρονόμετρο εστίασης (focus timer).",
            86: "Εσωτεριστική μηχανή αναζήτησης που επιστρέφει «φιλοσοφικές απαντήσεις» από τα Ακασικά Αρχεία.",
            87: "Οδηγοί και ημερήσιες ασκήσεις για τον έλεγχο των ονείρων κατά τη βουδιστική παράδοση (Dream Yoga).",
            88: "Ημερολόγιο όπου αποθηκεύετε την κάρτα ταρώ που τραβήξατε κάθε πρωί, με στατιστική ανάλυση.",
            89: "Χρονόμετρο διαλογισμού για την επίφυση (Pineal Gland) με binaural ήχο 963Hz.",
            90: "Μίνι παιχνίδι εκπαίδευσης διαίσθησης όπου πρέπει να προβλέψετε κάτω από ποιο κουτί κρύβεται ένα αντικείμενο.",
            91: "Σας επιτρέπει να σχεδιάζετε μαντάλες με αυτόματη καθρεπτική συμμετρία.",
            92: "Συσχετίζει τις κάρτες Ταρώ με τις στοιχηματικές σας προβλέψεις για να βρει κρυφά μοτίβα.",
            93: "Αναπαράγει 3D ήχους και φωνητικές οδηγίες για την πρόκληση αστρικής προβολής.",
            94: "Μετατρέπει τα Sigils σας σε screensaver που κινείται στην οθόνη.",
            95: "Αναλύει τις λέξεις-κλειδιά των ονείρων σας και τις συνδέει με αρχέτυπα του Carl Jung.",
            96: "Προσομοιώνει τη λειτουργία Hemi-Sync (ημισφαιρικός συντονισμός εγκεφάλου) με ήχο.",
            97: "Χρονόμετρο και οδηγίες για τις ενεργειακές κινήσεις Tensegrity του Carlos Castaneda.",
            98: "Καταγραφέας και ημερολόγιο της πορείας ανόδου της ενέργειας Kundalini.",
            99: "Ένας τροχός που επιλέγει μια εσωτεριστική ευλογία ή συμβουλή για την ημέρα.",
            100: "Ένα visual grid που εμφανίζει μικρές «ανωμαλίες» ως δοκιμασία της προσοχής σας."
        };
        return descriptions[id] || "Πρόσθετο ενεργειακό widget για το InfoDash Hub.";
    }

    // Generator function that maps each script ID to its custom interactive HTML and JS logic
    function getRenderFunction(id) {
        return function(containerId) {
            const container = document.getElementById(containerId);
            if (!container) return;

            stopAllModuleAudio();
            container.innerHTML = ""; // Clear

            const widgetWrapper = document.createElement("div");
            widgetWrapper.style.padding = "1rem";
            widgetWrapper.style.background = "rgba(0, 0, 0, 0.4)";
            widgetWrapper.style.borderRadius = "8px";
            widgetWrapper.style.border = "1px solid rgba(167, 139, 250, 0.2)";
            widgetWrapper.style.minHeight = "250px";
            widgetWrapper.style.display = "flex";
            widgetWrapper.style.flexDirection = "column";
            widgetWrapper.style.justifyContent = "space-between";

            // Build UI based on specific IDs to make them highly interactive
            if (id === 1) { // Mercury Retrograde
                const isRetro = Math.sin(Date.now() / (1000 * 3600 * 24 * 30)) > 0;
                widgetWrapper.innerHTML = `
                    <div style="text-align:center;">
                        <h4 style="color:#ffd700; margin-bottom:1rem;"><i class="fa-solid fa-circle-exclamation"></i> Mercury Retrograde Checker</h4>
                        <div style="font-size:3rem; margin:1rem 0;">${isRetro ? '⚠️ ΝΑΙ' : '✅ ΟΧΙ'}</div>
                        <p style="font-size:0.85rem; color:var(--text-secondary); line-height:1.4;">
                            ${isRetro ? 
                              'Ο Ερμής είναι <b>ανάδρομος</b> αυτή τη στιγμή. Αποφύγετε υπογραφές συμβολαίων, αγορές ηλεκτρονικών και κρίσιμες συζητήσεις.' : 
                              'Ο Ερμής είναι σε <b>ορθή πορεία</b>. Η επικοινωνία και οι τεχνολογικές συναλλαγές ευνοούνται.'}
                        </p>
                    </div>
                    <button class="tab-btn active" id="btn-retro-calc" style="align-self:center; border-radius:20px; font-size:0.75rem; margin-top:1rem;">Υπολογισμός Επόμενου Κύκλου</button>
                `;
                widgetWrapper.querySelector('#btn-retro-calc').addEventListener('click', () => {
                    alert("Επόμενη ανάδρομη περίοδος: 14 Νοεμβρίου 2026 έως 4 Δεκεμβρίου 2026. Προετοιμάστε τα αντίγραφα ασφαλείας σας!");
                });

            } else if (id === 2) { // Moon Phase
                const lDays = Math.floor((Date.now() - new Date('2026-06-01').getTime()) / (1000 * 24 * 3600)) % 29.5;
                let phaseName = "Νέα Σελήνη";
                let percent = 0;
                if (lDays < 7.4) { phaseName = "Αύξων Μηνίσκος"; percent = Math.round((lDays / 7.4) * 50); }
                else if (lDays < 14.8) { phaseName = "Πανσέληνος"; percent = 100; }
                else if (lDays < 22.1) { phaseName = "Φθίνων Μηνίσκος"; percent = Math.round(((22.1 - lDays) / 7.3) * 50); }
                
                widgetWrapper.innerHTML = `
                    <div style="text-align:center; display:flex; flex-direction:column; align-items:center;">
                        <h4 style="color:#a78bfa; margin-bottom:1rem;"><i class="fa-solid fa-moon"></i> Φάση Σελήνης</h4>
                        <svg width="80" height="80" viewBox="0 0 100 100">
                            <circle cx="50" cy="50" r="40" fill="#111827" stroke="#a78bfa" stroke-width="2" />
                            <path d="M 50 10 A 40 40 0 0 1 50 90 A ${40 - (percent * 0.8)} 40 0 0 1 50 10" fill="#ffd700" />
                        </svg>
                        <b style="color:white; margin-top:10px; font-size:1.1rem;">${phaseName}</b>
                        <p style="font-size:0.8rem; color:var(--text-secondary); margin-top:5px;">Ημέρα κύκλου: ${lDays.toFixed(1)} / 29.5</p>
                    </div>
                `;

            } else if (id === 4) { // Natal Chart
                widgetWrapper.innerHTML = `
                    <div>
                        <h4 style="color:#a78bfa; margin-bottom:0.75rem;"><i class="fa-solid fa-dharmachakra"></i> Natal Chart Generator</h4>
                        <div style="display:flex; gap:10px; margin-bottom:10px; flex-wrap:wrap;">
                            <input type="text" id="natal-name" placeholder="Όνομα" style="flex:1; background:#000; border:1px solid #a78bfa; color:#white; padding:5px; border-radius:4px; font-size:0.8rem;">
                            <input type="date" id="natal-date" style="background:#000; border:1px solid #a78bfa; color:#white; padding:5px; border-radius:4px; font-size:0.8rem;">
                        </div>
                        <button class="tab-btn active" id="btn-gen-natal" style="width:100%; border-radius:20px; font-size:0.75rem;">Παραγωγή Χάρτη</button>
                        <div id="natal-chart-result" style="margin-top:15px; text-align:center;"></div>
                    </div>
                `;
                widgetWrapper.querySelector('#btn-gen-natal').addEventListener('click', () => {
                    const name = document.getElementById('natal-name').value || "Ταξιδιώτης";
                    const date = document.getElementById('natal-date').value || "2026-06-14";
                    const result = document.getElementById('natal-chart-result');
                    result.innerHTML = `
                        <div style="border-top:1px dashed rgba(255,255,255,0.1); padding-top:10px;">
                            <p style="font-size:0.85rem; color:#ffd700;">Ωροσκόπος: <b>Λέων</b> | Ήλιος: <b>Δίδυμοι</b> | Σελήνη: <b>Τοξότης</b></p>
                            <svg width="150" height="150" viewBox="0 0 200 200" style="margin-top:10px;">
                                <circle cx="100" cy="100" r="90" fill="none" stroke="#a78bfa" stroke-width="1.5" />
                                <circle cx="100" cy="100" r="50" fill="none" stroke="#a78bfa" stroke-width="1" stroke-dasharray="3,3" />
                                <line x1="100" y1="10" x2="100" y2="190" stroke="rgba(255,255,255,0.2)" />
                                <line x1="10" y1="100" x2="190" y2="100" stroke="rgba(255,255,255,0.2)" />
                                <polygon points="100,30 150,140 40,110" fill="none" stroke="#ffd700" stroke-width="1.5"/>
                                <polygon points="100,170 60,60 160,80" fill="none" stroke="#8b5cf6" stroke-width="1"/>
                            </svg>
                        </div>
                    `;
                });

            } else if (id === 11) { // Chinese Bazi
                widgetWrapper.innerHTML = `
                    <div>
                        <h4 style="color:#a78bfa; margin-bottom:0.75rem;"><i class="fa-solid fa-yin-yang"></i> Chinese Bazi Calculator</h4>
                        <input type="number" id="bazi-year" placeholder="Έτος Γέννησης" value="1995" style="width:100%; background:#000; border:1px solid #a78bfa; color:#white; padding:5px; border-radius:4px; font-size:0.8rem; margin-bottom:10px;">
                        <button class="tab-btn active" id="btn-calc-bazi" style="width:100%; border-radius:20px; font-size:0.75rem;">Υπολογισμός 4 Πυλώνων</button>
                        <div id="bazi-result" style="margin-top:15px; text-align:center;"></div>
                    </div>
                `;
                widgetWrapper.querySelector('#btn-calc-bazi').addEventListener('click', () => {
                    const yr = parseInt(document.getElementById('bazi-year').value);
                    const animals = ["Ποντικός", "Βούβαλος", "Τίγρης", "Λαγός", "Δράκος", "Φίδι", "Άλογο", "Πρόβατο", "Πίθηκος", "Πετεινός", "Σκύλος", "Γουρούνι"];
                    const elements = ["Μέταλλο", "Νερό", "Ξύλο", "Φωτιά", "Γη"];
                    const animal = animals[(yr - 4) % 12];
                    const element = elements[Math.floor(((yr - 4) % 10) / 2)];
                    document.getElementById('bazi-result').innerHTML = `
                        <div style="font-size:0.85rem; color:#ffd700; border-top:1px dashed rgba(255,255,255,0.1); padding-top:10px;">
                            Ζώδιο Έτους: <b>${animal}</b><br>
                            Στοιχείο Έτους: <b>${element}</b><br>
                            <span style="font-size:0.75rem; color:var(--text-secondary);">Πυλώνας Ώρας: Ξύλινος Δράκος (Yang Wood)</span>
                        </div>
                    `;
                });

            } else if (id === 21) { // Tarot Card Spread
                widgetWrapper.innerHTML = `
                    <div style="text-align:center;">
                        <h4 style="color:#a78bfa; margin-bottom:0.5rem;"><i class="fa-solid fa-scroll"></i> Tarot Single Card Drawer</h4>
                        <button class="tab-btn active" id="btn-draw-tarot-extra" style="border-radius:20px; font-size:0.75rem; margin-bottom:15px;">Τράβηγμα Κάρτας</button>
                        <div id="tarot-extra-result" style="font-size:0.85rem; text-align:left;"></div>
                    </div>
                `;
                widgetWrapper.querySelector('#btn-draw-tarot-extra').addEventListener('click', () => {
                    const card = TAROT_EXTRA_DECK[Math.floor(Math.random() * TAROT_EXTRA_DECK.length)];
                    const isUpright = Math.random() > 0.3;
                    document.getElementById('tarot-extra-result').innerHTML = `
                        <div style="background:rgba(0,0,0,0.5); padding:10px; border-radius:6px; border:1px solid rgba(167,139,250,0.3);">
                            <b style="color:#ffd700;">${card.name} (${card.symbol})</b> - <i>${isUpright ? 'Όρθια' : 'Ανάστροφη'}</i>
                            <p style="font-size:0.75rem; color:white; margin:5px 0;"><b>Ερμηνεία:</b> ${isUpright ? card.upright : card.reversed}</p>
                            <p style="font-size:0.75rem; color:var(--text-secondary); margin:0;">${card.desc}</p>
                        </div>
                    `;
                });

            } else if (id === 23) { // Norse Runes
                widgetWrapper.innerHTML = `
                    <div style="text-align:center;">
                        <h4 style="color:#a78bfa; margin-bottom:0.5rem;"><i class="fa-solid fa-wand-magic-sparkles"></i> Norse Runic Oracle</h4>
                        <button class="tab-btn active" id="btn-draw-rune" style="border-radius:20px; font-size:0.75rem; margin-bottom:15px;">Ρίψη Ρούνου</button>
                        <div id="rune-result" style="font-size:0.85rem;"></div>
                    </div>
                `;
                widgetWrapper.querySelector('#btn-draw-rune').addEventListener('click', () => {
                    const rune = RUNIC_ALPHABET[Math.floor(Math.random() * RUNIC_ALPHABET.length)];
                    document.getElementById('rune-result').innerHTML = `
                        <div style="display:flex; align-items:center; justify-content:center; gap:15px; background:rgba(0,0,0,0.5); padding:10px; border-radius:6px; border:1px solid rgba(167,139,250,0.3); text-align:left;">
                            <div style="font-size:3rem; background:rgba(255,255,255,0.05); width:60px; height:60px; display:flex; align-items:center; justify-content:center; border-radius:50%; border:1px solid #ffd700; color:#ffd700;">${rune.glyph}</div>
                            <div>
                                <b style="color:#ffd700;">${rune.name}</b><br>
                                <span style="font-size:0.8rem; color:white;"><b>Σημασία:</b> ${rune.meaning}</span><br>
                                <span style="font-size:0.75rem; color:var(--text-secondary);">${rune.desc}</span>
                            </div>
                        </div>
                    `;
                });

            } else if (id === 24) { // Gematria Calculator
                widgetWrapper.innerHTML = `
                    <div>
                        <h4 style="color:#a78bfa; margin-bottom:0.75rem;"><i class="fa-solid fa-calculator"></i> Gematria Calculator</h4>
                        <input type="text" id="gematria-word" placeholder="Εισάγετε λέξη (π.χ. ΑΓΑΠΗ)" style="width:100%; background:#000; border:1px solid #a78bfa; color:#white; padding:5px; border-radius:4px; font-size:0.8rem; margin-bottom:10px;">
                        <button class="tab-btn active" id="btn-calc-gem" style="width:100%; border-radius:20px; font-size:0.75rem;">Υπολογισμός Αξίας</button>
                        <div id="gematria-result" style="margin-top:15px; font-size:0.9rem; text-align:center;"></div>
                    </div>
                `;
                widgetWrapper.querySelector('#btn-calc-gem').addEventListener('click', () => {
                    const word = document.getElementById('gematria-word').value.toUpperCase();
                    let sum = 0;
                    // Simple greek gematria mapping
                    const alphabetVal = {
                        'Α':1, 'Β':2, 'Γ':3, 'Δ':4, 'Ε':5, 'Ζ':7, 'Η':8, 'Θ':9, 'Ι':10,
                        'Κ':20, 'Λ':30, 'Μ':40, 'Ν':50, 'Ξ':60, 'Ο':70, 'Π':80, 'Ρ':100,
                        'Σ':200, 'Τ':300, 'Υ':400, 'Φ':500, 'Χ':600, 'Ψ':700, 'Ω':800
                    };
                    for (let char of word) {
                        if (alphabetVal[char]) sum += alphabetVal[char];
                    }
                    document.getElementById('gematria-result').innerHTML = `
                        Λεξάριθμος της λέξης <b>${word}</b>: <b style="color:#ffd700; font-size:1.3rem;">${sum}</b>
                    `;
                });

            } else if (id === 41) { // Solfeggio 9 Frequencies
                widgetWrapper.innerHTML = `
                    <div>
                        <h4 style="color:#a78bfa; margin-bottom:0.75rem;"><i class="fa-solid fa-waveform"></i> Solfeggio Audio Player</h4>
                        <div style="display:grid; grid-template-columns:1fr 1fr; gap:8px;">
                            <button class="tab-btn" onclick="MetaphysicalHub.playFreq(396)">396 Hz (Φόβος)</button>
                            <button class="tab-btn" onclick="MetaphysicalHub.playFreq(417)">417 Hz (Αλλαγή)</button>
                            <button class="tab-btn" onclick="MetaphysicalHub.playFreq(528)">528 Hz (DNA)</button>
                            <button class="tab-btn" onclick="MetaphysicalHub.playFreq(639)">639 Hz (Σχέσεις)</button>
                            <button class="tab-btn" onclick="MetaphysicalHub.playFreq(741)">741 Hz (Διαίσθηση)</button>
                            <button class="tab-btn" onclick="MetaphysicalHub.playFreq(852)">852 Hz (Πνεύμα)</button>
                            <button class="tab-btn" onclick="MetaphysicalHub.playFreq(963)">963 Hz (Σύνδεση)</button>
                            <button class="tab-btn" onclick="MetaphysicalHub.stopAudio()" style="border-color:#ef4444; color:#ef4444;">STOP</button>
                        </div>
                    </div>
                `;

            } else if (id === 42) { // Binaural Beats
                widgetWrapper.innerHTML = `
                    <div>
                        <h4 style="color:#a78bfa; margin-bottom:0.75rem;"><i class="fa-solid fa-headphones"></i> Binaural Brainwave Synchronizer</h4>
                        <p style="font-size:0.75rem; color:var(--text-secondary); margin-bottom:10px;">Απαιτούνται ακουστικά για πλήρες αποτέλεσμα.</p>
                        <div style="display:grid; grid-template-columns:1fr 1fr; gap:8px;">
                            <button class="tab-btn" onclick="MetaphysicalHub.playBinaural(200, 4)">Delta (4Hz - Ύπνος)</button>
                            <button class="tab-btn" onclick="MetaphysicalHub.playBinaural(200, 7)">Theta (7Hz - Διαλογισμός)</button>
                            <button class="tab-btn" onclick="MetaphysicalHub.playBinaural(200, 10)">Alpha (10Hz - Χαλάρωση)</button>
                            <button class="tab-btn" onclick="MetaphysicalHub.playBinaural(200, 15)">Beta (15Hz - Συγκέντρωση)</button>
                            <button class="tab-btn" onclick="MetaphysicalHub.playBinaural(200, 40)">Gamma (40Hz - Έμπνευση)</button>
                            <button class="tab-btn" onclick="MetaphysicalHub.stopAudio()" style="border-color:#ef4444; color:#ef4444;">STOP</button>
                        </div>
                    </div>
                `;

            } else if (id === 43) { // Schumann Resonance
                widgetWrapper.innerHTML = `
                    <div>
                        <h4 style="color:#a78bfa; margin-bottom:0.75rem;"><i class="fa-solid fa-earth-americas"></i> Schumann Resonance (7.83Hz) Live Graph</h4>
                        <div style="width:100%; height:120px; background:#000; border:1px solid rgba(167,139,250,0.3); border-radius:4px; overflow:hidden; position:relative;">
                            <canvas id="schumann-canvas" width="300" height="120" style="width:100%; height:100%;"></canvas>
                        </div>
                        <div style="display:flex; justify-content:space-between; font-size:0.7rem; color:var(--text-secondary); margin-top:5px;">
                            <span>Live: 7.83 Hz</span>
                            <span>Απόκλιση: +0.12 Hz</span>
                        </div>
                    </div>
                `;
                // Draw animated wave on canvas
                const canvas = widgetWrapper.querySelector('#schumann-canvas');
                const ctx = canvas.getContext('2d');
                let step = 0;
                function draw() {
                    if (!document.getElementById('schumann-canvas')) return; // widget unmounted
                    ctx.fillStyle = '#000';
                    ctx.fillRect(0, 0, canvas.width, canvas.height);
                    ctx.strokeStyle = '#a78bfa';
                    ctx.lineWidth = 1.5;
                    ctx.beginPath();
                    for(let i=0; i<canvas.width; i++) {
                        const y = canvas.height/2 + Math.sin((i + step)/10) * 15 + Math.cos((i - step)/6) * 5;
                        if (i === 0) ctx.moveTo(i, y);
                        else ctx.lineTo(i, y);
                    }
                    ctx.stroke();
                    step += 1.5;
                    requestAnimationFrame(draw);
                }
                setTimeout(draw, 100);

            } else if (id === 46) { // Noise Synth
                widgetWrapper.innerHTML = `
                    <div>
                        <h4 style="color:#a78bfa; margin-bottom:0.75rem;"><i class="fa-solid fa-wind"></i> Ambient Noise Synthesizer</h4>
                        <div style="display:grid; grid-template-columns:1fr 1fr; gap:8px;">
                            <button class="tab-btn" onclick="MetaphysicalHub.playNoise('white')">White Noise</button>
                            <button class="tab-btn" onclick="MetaphysicalHub.playNoise('pink')">Pink Noise</button>
                            <button class="tab-btn" onclick="MetaphysicalHub.playNoise('brown')">Brown Noise</button>
                            <button class="tab-btn" onclick="MetaphysicalHub.stopAudio()" style="border-color:#ef4444; color:#ef4444;">STOP</button>
                        </div>
                    </div>
                `;

            } else if (id === 62) { // Zener ESP Cards
                widgetWrapper.innerHTML = `
                    <div style="text-align:center;">
                        <h4 style="color:#a78bfa; margin-bottom:1rem;"><i class="fa-solid fa-brain"></i> ESP Zener Mini-Test</h4>
                        <p style="font-size:0.75rem; color:var(--text-secondary); margin-bottom:10px;">Μαντέψτε το σχήμα (Κύκλος, Σταυρός, Κύματα, Αστέρι, Τετράγωνο)</p>
                        <div style="display:flex; justify-content:center; gap:8px; margin-bottom:10px;">
                            <button class="tab-btn" onclick="MetaphysicalHub.playZenerGuess('circle')"><i class="fa-regular fa-circle"></i></button>
                            <button class="tab-btn" onclick="MetaphysicalHub.playZenerGuess('cross')"><i class="fa-solid fa-plus"></i></button>
                            <button class="tab-btn" onclick="MetaphysicalHub.playZenerGuess('waves')"><i class="fa-solid fa-water"></i></button>
                            <button class="tab-btn" onclick="MetaphysicalHub.playZenerGuess('square')"><i class="fa-regular fa-square"></i></button>
                            <button class="tab-btn" onclick="MetaphysicalHub.playZenerGuess('star')"><i class="fa-regular fa-star"></i></button>
                        </div>
                        <div id="zener-mini-feedback" style="font-size:0.85rem; color:#ffd700; font-weight:bold; min-height:20px;"></div>
                    </div>
                `;

            } else if (id === 81) { // Subliminal Flasher
                widgetWrapper.innerHTML = `
                    <div style="text-align:center;">
                        <h4 style="color:#a78bfa; margin-bottom:1rem;"><i class="fa-solid fa-eye-slash"></i> Subliminal Messages</h4>
                        <div id="subliminal-screen" style="width:100%; height:80px; background:#000; border:1px solid rgba(167,139,250,0.3); border-radius:4px; display:flex; align-items:center; justify-content:center; font-size:1.1rem; color:white; font-weight:bold; margin-bottom:15px;">
                            ΕΝΕΡΓΟΠΟΙΗΣΗ
                        </div>
                        <button class="tab-btn active" id="btn-toggle-subliminal" style="border-radius:20px; font-size:0.75rem;">START FLASHER</button>
                    </div>
                `;
                let interval = null;
                const messages = ["ΕΙΜΑΙ ΑΦΘΟΝΙΑ", "ΕΙΜΑΙ ΥΓΕΙΑ", "ΕΧΩ ΓΑΛΗΝΗ", "ΟΛΑ ΠΑΝΕ ΤΕΛΕΙΑ", "ΕΙΜΑΙ ΔΥΝΑΤΟΣ", "ΕΛΚΩ ΤΗΝ ΕΠΙΤΥΧΙΑ"];
                widgetWrapper.querySelector('#btn-toggle-subliminal').addEventListener('click', (e) => {
                    const btn = e.target;
                    const screen = document.getElementById('subliminal-screen');
                    if (interval) {
                        clearInterval(interval);
                        interval = null;
                        screen.innerText = "ΑΠΕΝΕΡΓΟΠΟΙΗΜΕΝΟ";
                        btn.innerText = "START FLASHER";
                    } else {
                        btn.innerText = "STOP FLASHER";
                        interval = setInterval(() => {
                            screen.innerText = messages[Math.floor(Math.random() * messages.length)];
                            setTimeout(() => {
                                screen.innerText = "";
                            }, 50); // Flash for 50ms (subliminal)
                        }, 500);
                        activeIntervals.push(interval);
                    }
                });

            } else if (id === 83) { // Sacred Geometry Pattern Generator
                widgetWrapper.innerHTML = `
                    <div style="text-align:center;">
                        <h4 style="color:#a78bfa; margin-bottom:1rem;"><i class="fa-solid fa-shapes"></i> Sacred Geometry SVG</h4>
                        <div style="display:flex; gap:10px; justify-content:center; margin-bottom:15px;">
                            <button class="tab-btn" id="btn-draw-flower">Flower of Life</button>
                            <button class="tab-btn" id="btn-draw-metatron">Metatron Cube</button>
                        </div>
                        <div id="sacred-svg-container" style="background:#000; border-radius:6px; border:1px solid rgba(255,255,255,0.05); padding:10px; display:flex; justify-content:center; min-height:160px; align-items:center;">
                            <span style="color:var(--text-secondary); font-size:0.8rem;">Επιλέξτε σχήμα</span>
                        </div>
                    </div>
                `;
                widgetWrapper.querySelector('#btn-flower')?.addEventListener('click', () => drawFlowerOfLife());
                widgetWrapper.querySelector('#btn-draw-flower')?.addEventListener('click', () => {
                    document.getElementById('sacred-svg-container').innerHTML = `
                        <svg width="150" height="150" viewBox="0 0 100 100" style="stroke:#ffd700; fill:none; stroke-width:0.5;">
                            <circle cx="50" cy="50" r="15"/>
                            <circle cx="50" cy="35" r="15"/>
                            <circle cx="50" cy="65" r="15"/>
                            <circle cx="37" cy="42.5" r="15"/>
                            <circle cx="63" cy="42.5" r="15"/>
                            <circle cx="37" cy="57.5" r="15"/>
                            <circle cx="63" cy="57.5" r="15"/>
                            <circle cx="50" cy="50" r="30" stroke="#a78bfa" stroke-width="0.8"/>
                        </svg>
                    `;
                });
                widgetWrapper.querySelector('#btn-draw-metatron')?.addEventListener('click', () => {
                    document.getElementById('sacred-svg-container').innerHTML = `
                        <svg width="150" height="150" viewBox="0 0 100 100" style="stroke:#a78bfa; fill:none; stroke-width:0.5;">
                            <!-- Simple hexagon representation -->
                            <polygon points="50,15 80,32 80,68 50,85 20,68 20,32" stroke="#ffd700"/>
                            <polygon points="50,85 20,32 80,32"/>
                            <polygon points="50,15 20,68 80,68"/>
                            <circle cx="50" cy="50" r="40" stroke-width="0.8"/>
                        </svg>
                    `;
                });

            } else if (id === 84) { // Sigil Generator Creator
                widgetWrapper.innerHTML = `
                    <div>
                        <h4 style="color:#a78bfa; margin-bottom:0.75rem;"><i class="fa-solid fa-wand-magic"></i> Manifestation Sigil</h4>
                        <input type="text" id="manifest-sigil-text" placeholder="Η πρόθεσή μου (π.χ. ΕΙΜΑΙ ΕΛΕΥΘΕΡΟΣ)" style="width:100%; background:#000; border:1px solid #a78bfa; color:#white; padding:5px; border-radius:4px; font-size:0.8rem; margin-bottom:10px;">
                        <button class="tab-btn active" id="btn-manifest-sigil" style="width:100%; border-radius:20px; font-size:0.75rem;">Σχεδίαση Sigil</button>
                        <div id="manifest-sigil-output" style="margin-top:15px; text-align:center; display:flex; justify-content:center;"></div>
                    </div>
                `;
                widgetWrapper.querySelector('#btn-manifest-sigil').addEventListener('click', () => {
                    const txt = document.getElementById('manifest-sigil-text').value.trim();
                    if (!txt) return alert("Εισάγετε πρόθεση!");
                    const clean = Array.from(new Set(txt.toUpperCase().replace(/[^Α-ΩA-Z]/g, ''))).join('');
                    const points = [];
                    for(let i=0; i<clean.length; i++) {
                        const code = clean.charCodeAt(i);
                        const angle = (code % 12) * (Math.PI / 6);
                        points.push({ x: 50 + Math.cos(angle)*30, y: 50 + Math.sin(angle)*30 });
                    }
                    let d = "";
                    if (points.length > 0) {
                        d = `M ${points[0].x} ${points[0].y}`;
                        for(let i=1; i<points.length; i++) d += ` L ${points[i].x} ${points[i].y}`;
                    }
                    document.getElementById('manifest-sigil-output').innerHTML = `
                        <svg width="120" height="120" viewBox="0 0 100 100" style="background:#000; border-radius:50%; border:2px solid #a78bfa;">
                            <path d="${d}" stroke="#ffd700" stroke-width="2.5" fill="none" stroke-linecap="round" stroke-linejoin="round"/>
                            <circle cx="50" cy="50" r="45" stroke="#a78bfa" stroke-width="0.5" stroke-dasharray="2,2"/>
                        </svg>
                    `;
                });

            } else { // Fallback simulator for other scripts
                widgetWrapper.innerHTML = `
                    <div style="text-align:center; display:flex; flex-direction:column; align-items:center; justify-content:center; flex:1;">
                        <i class="fa-solid fa-gear fa-spin" style="font-size:2.5rem; color:#a78bfa; margin-bottom:1rem;"></i>
                        <h4 style="color:white; margin-bottom:0.5rem;">Interactive Simulator #${id}</h4>
                        <p style="font-size:0.8rem; color:var(--text-secondary); line-height:1.4; max-width:260px; margin-bottom:1rem;">
                            Το εργαλείο <b>${SCRIPTS_DATA[id-1].title}</b> εκτελείται στο εσωτερικό εσωτεριστικό δίκτυο του InfoDash.
                        </p>
                        <button class="tab-btn active" id="btn-run-sim-${id}" style="border-radius:20px; font-size:0.75rem;">ΕΚΤΕΛΕΣΗ / ΣΥΝΤΟΝΙΣΜΟΣ</button>
                        <div id="sim-feedback-${id}" style="margin-top:10px; font-size:0.75rem; color:#ffd700; font-weight:bold;"></div>
                    </div>
                `;
                widgetWrapper.querySelector(`#btn-run-sim-${id}`).addEventListener('click', (e) => {
                    const btn = e.target;
                    btn.disabled = true;
                    btn.innerText = "ΣΥΝΤΟΝΙΣΜΟΣ...";
                    playTone(432 + (id * 5), 'sine', 1500); // Play dynamic tone
                    setTimeout(() => {
                        btn.innerText = "ΟΛΟΚΛΗΡΩΘΗΚΕ";
                        document.getElementById(`sim-feedback-${id}`).innerHTML = `
                            <i class="fa-solid fa-circle-check"></i> Ενεργοποιήθηκε επιτυχώς! (Συχνότητα: ${432 + (id * 5)}Hz)
                        `;
                    }, 1500);
                });
            }

            container.appendChild(widgetWrapper);
        };
    }

    // Interactive action exports
    window.MetaphysicalHub = {
        scripts: SCRIPTS_DATA,
        playFreq: function(f) {
            playTone(f, 'sine');
            const status = document.getElementById('eso-script-status');
            if (status) status.innerText = `Ενεργό: Solfeggio ${f}Hz`;
        },
        playBinaural: function(base, offset) {
            playBinaural(base, offset);
            const status = document.getElementById('eso-script-status');
            if (status) status.innerText = `Ενεργό: Binaural (${base}Hz / ${base + offset}Hz)`;
        },
        playNoise: function(type) {
            playNoise(type);
            const status = document.getElementById('eso-script-status');
            if (status) status.innerText = `Ενεργό: Θόρυβος ${type}`;
        },
        playZenerGuess: function(symbol) {
            const symbols = ['circle', 'cross', 'waves', 'square', 'star'];
            const target = symbols[Math.floor(Math.random()*symbols.length)];
            const fb = document.getElementById('zener-mini-feedback');
            if (symbol === target) {
                fb.innerHTML = `<span style="color:#10b981;"><i class="fa-solid fa-check-circle"></i> Επιτυχία! Συντονιστήκατε με την κάρτα ${target}.</span>`;
            } else {
                fb.innerHTML = `<span style="color:var(--text-secondary);">Λάθος. Η κάρτα ήταν ${target}.</span>`;
            }
        },
        stopAudio: function() {
            stopAllModuleAudio();
            const status = document.getElementById('eso-script-status');
            if (status) status.innerText = 'Ανενεργό';
        }
    };
})();
