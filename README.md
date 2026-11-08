# Stimmungstagebuch

Eine statische, mobilfreundliche Web-App zum Erfassen der Stimmung am Morgen, Nachmittag und Abend. Einträge werden lokal im Browser gespeichert und können manuell in ein Google Sheet hochgeladen werden.

## GitHub Pages

Dieses Repository kann als eigenes GitHub-Repository veröffentlicht werden. Bei einem Projekt-Repository ist die App unter `https://<benutzer>.github.io/<repository>/` erreichbar. Relative Links und der Service Worker funktionieren auch in diesem Unterpfad.

Das Manifest hat eine eigene App-ID und 192×192-, 512×512- sowie maskierbare PNG-Icons, damit Android die Stimmungstagebuch-App getrennt vom Timer installieren kann.

Die kleine Versionsnummer neben dem Titel folgt der Service-Worker-Version und wird bei jedem App-Update erhöht.

Aktiviere in den Repository-Einstellungen unter **Pages** die Veröffentlichung aus dem gewünschten Branch und Ordner (üblicherweise `main` und `/ (root)`).

## Google Sheets

Die App verwendet dieselbe OAuth-Webclient-ID wie `custom-timer`. In der Google Cloud Console muss die Ursprungsdomain bereits als autorisierter JavaScript-Ursprung eingetragen sein (zum Beispiel `https://<benutzer>.github.io`). Ein eigener Pfad pro Repository braucht keinen zusätzlichen OAuth-Ursprung.

Beim ersten Upload legt die App ein Sheet namens **Stimmungstagebuch (moodtracker)** in Google Drive an. Der Tab **Stimmung** hat die Spalten `Datum`, `Morgen`, `Nachmittag`, `Abend`, `Notizen`. Das Datum wird als echtes Tabellen-Datum formatiert. Jede Zeile enthält einen Tag und dessen optionale Notiz. Der Tab **Wochentage** enthält editierbare Start- und Enddaten in `B1` und `D1`; Formeln in der Tabelle berechnen Anzahl und Durchschnitt je Wochentag direkt aus dem Tab **Stimmung**. Upload aktualisiert beide Tabs aus den lokalen Einträgen und bewahrt den gewählten Datumsbereich; **Vom Sheet laden** importiert die Einträge auf ein weiteres Gerät und ersetzt dort vorhandene Einträge nach Bestätigung.

## Lokal ansehen

Zum Testen muss die Seite über einen lokalen HTTP-Server geöffnet werden, damit der Service Worker funktioniert. Zum Beispiel: `python3 -m http.server 8000` und dann `http://localhost:8000/`.
