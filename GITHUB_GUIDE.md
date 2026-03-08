# Οδηγός Ανεβάσματος στο GitHub & Deployment στο Web

Ακολουθήστε αυτά τα βήματα για να ανεβάσετε το **InfoDash Hub** στο διαδίκτυο.

## Βήμα 1: Προετοιμασία Τοπικού Χώρου

Έχω ήδη δημιουργήσει το αρχείο `.gitignore` για εσάς. Ανοίξτε ένα τερματικό (PowerShell ή CMD) στο φάκελο του project και τρέξτε:

```powershell
git init
git add .
git commit -m "Initial commit with Security and Real-Time Data"
```

## Βήμα 2: Δημιουργία Repository στο GitHub

1. Συνδεθείτε στο [GitHub](https://github.com).
2. Πατήστε το **New Repository**.
3. Δώστε το όνομα `InfoDash`.
4. Επιλέξτε **Public** (για να λειτουργήσει το GitHub Pages δωρεάν) ή Private (θέλει πληρωμή για Pages σε μερικές περιπτώσεις).
5. Μην προσθέσετε README/License (τα έχουμε ήδη).
6. Αντιγράψτε την εντολή `git remote add origin ...` που θα σας δώσει.

## Βήμα 3: Ανέβασμα Κώδικα

Τρέξτε τις εντολές που σας έδωσε το GitHub, συνήθως:

```powershell
git branch -M main
git remote add origin https://github.com/[YOUR-USERNAME]/InfoDash.git
git push -u origin main
```

## Βήμα 4: Ενεργοποίηση Web Σελίδας (GitHub Pages)

1. Στο GitHub, πηγαίνετε στα **Settings** του repository.
2. Στο sidebar, επιλέξτε **Pages**.
3. Στο "Build and deployment", επιλέξτε το branch **main**.
4. Πατήστε **Save**.
5. Σε 1-2 λεπτά, η σελίδα σας θα είναι live στο: `https://[YOUR-USERNAME].github.io/InfoDash/`

> [!IMPORTANT]
> Η σελίδα θα ζητάει τον κωδικό **Manos16581!@#** κανονικά στο ίντερνετ όπως και τοπικά!

## Βήμα 5: Εκτελέσιμο στην Επιφάνεια Εργασίας

Για να έχετε το εικονίδιο στην επιφάνεια εργασίας:

1. Κάντε δεξί κλικ στο αρχείο `InfoDash_Launcher.bat` μέσα στο φάκελο.
2. Επιλέξτε **Send to -> Desktop (create shortcut)**.
3. Στην επιφάνεια εργασίας, κάντε δεξί κλικ στο νέο shortcut -> **Properties**.
4. Πατήστε **Change Icon** και επιλέξτε ένα εικονίδιο που σας αρέσει.
5. Μετονομάστε το σε `InfoDash Hub`.
