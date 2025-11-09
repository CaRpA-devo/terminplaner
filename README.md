# MemoMe – Terminplaner

MemoMe ist eine kleine Termin- und Erinnerungs-App auf Basis von React und Vite. Nach einem Login können Nutzer:innen Termine mit Datum und Notiz anlegen. Die Einträge werden lokal gespeichert, nach Jahr, Monat und Kalenderwoche gruppiert und lassen sich als erledigt markieren oder löschen.

## Funktionsumfang

- Login-Maske mit einfachem Credential-Check (Demo-Zugang: Benutzername `Patrick`, Passwort `12345`)
- Terminverwaltung mit Datum und Notizfeld
- Automatische Gruppierung der Einträge nach Jahr → Monat → Kalenderwoche → Wochentag
- Kennzeichnung aktueller Kalenderwochen und responsive Darstellung
- Persistenz der Daten via `localStorage` im Browser
- Benachrichtigungen bei fehlerhaften Logins über `react-toastify`

## Technischer Stack

- React 19 mit Vite 6 als Build-Tool
- Tailwind CSS 4 und DaisyUI für das Styling
- React Toastify für Benachrichtigungen
- ESLint für statische Code-Analyse

## Loslegen

```bash
npm install
npm run dev
```

Nach dem Start steht die Anwendung in der Regel unter `http://localhost:5173` bereit. Für den Login die oben genannten Demo-Zugangsdaten verwenden.

## Production-Build

```bash
npm run build
npm run preview
```

Die gebauten Assets liegen anschließend im Ordner `dist/` und können von dort aus auf einen Webserver deployed werden.

## Nützliche Scripts

- `npm run dev` – Entwicklungsserver mit Hot Module Replacement
- `npm run build` – Optimierter Produktionsbuild
- `npm run preview` – Vorschau des Produktionsbuilds
- `npm run lint` – Ausführen der ESLint-Regeln

## Weiterentwicklung & Ideen

- Austausch der statischen Login-Daten gegen eine echte Authentifizierung
- Verbesserte Gestaltung der Terminansicht (Farben, Icons, Drag & Drop)
- Erweiterte Filter- und Suchfunktionen
- Export/Import der gespeicherten Termine

Viel Spaß beim Ausprobieren! Feedback und Contributions sind willkommen.
