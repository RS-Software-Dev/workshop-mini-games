# Retro Games: Ein spielerischer Einstieg in die Webentwicklung

In diesem Workshop widmen wir uns den Grundlagen der Webentwicklung.
Wir lernen wie wir Webseiten mit HTML strukurieren, mit CSS gestalten und mit JavaScript zum Leben erwecken.
Dazu wollen wir gemeinsam ein paar klassische Videospiele nachbauen.
Der Workshop richtet sich an Einsteiger und setzt keine Programmiererfahrung voraus.

## Tag 1: Game of Life


- [Beispiel](https://gh.rs-software.dev/day1/example.html)
- [Folien](https://gh.rs-software.dev/day1/)
- [Starter Kit](https://github.com/RS-Software-Dev/workshop-retro-games/releases/latest)

| Zeit              | Dauer  | Programmpunkt                                                                                                                                                        |
| ----------------- | ------ | -------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **15:30 – 15:50** | 20 min | **Begrüßung & Einführung**<br>– Kurze Vorstellungsrunde<br>– Was ist ein “Game of Life”? (Beispiel zeigen)<br>– Überblick über HTML, CSS & JS im Projekt             |
| **15:50 – 16:05** | 15 min | **HTML-Grundgerüst & Canvas**<br>– `<canvas>` erklären<br>– Starter-Dateien öffnen<br>– Erste Ausgabe auf dem Canvas erzeugen                                        |
| **16:05 – 16:20** | 15 min | **Raster zeichnen**<br>– Zellen mit Schleifen rendern<br>– Farben mit CSS-Variablen steuern                                                                          |
| **16:20 – 16:35** | 15 min | **Simulationsschritt programmieren**<br>– Nachbarn zählen<br>– Regeln erklären und umsetzen                                                                          |
| **16:35 – 16:40** | 5 min  | **Kurze Pause**                                                                                                                                                    |
| **16:40 – 16:55** | 15 min | **Automatisches Laufen lassen**<br>– `setInterval()` einbauen<br>– Start/Stop-Button hinzufügen                                                                      |
| **16:55 – 17:10** | 15 min | **Styling & Usability**<br>– Farben, Zellgröße, Buttons verschönern<br>– Layout mit Flexbox                                                                          |
| **17:10 – 17:25** | 15 min | **Lebende Zellen aktivieren**<br>– Klick-Event auf Canvas<br>– Zellen togglen (lebendig/tot)                                                                         |
| **17:25 – 17:35** | 10 min | **Längere Pause**                                                                                                                                                  |
| **17:35 – 17:55** | 20 min | **Freies Üben / Bonusaufgaben**<br>Ideen für Fortgeschrittene:<br>– Slider für Geschwindigkeit<br>– Zufällige Startgeneration<br>– Speichern/Laden des Spielfelds |
| **17:55 – 18:00** | 5 min  | **Abschluss & Ausblick**<br>– Kurzes Fazit<br>– Vorschau auf Tag 2 (*Snake*)                                                                                         |




## Tag 2: Snake

| Zeit              | Dauer  | Programmpunkt                                                                                                                                                        |
| ----------------- | ------ | -------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **15:30 – 15:50** | 20 min | **Begrüßung & Recap**<br>– Kurzer Rückblick auf Tag 1 (Game of Life)<br>– Ziel des Tages: „Snake“ verstehen und umsetzen<br>– Aufbau des Starter-Projekts zeigen     |
| **15:50 – 16:05** | 15 min | **Spielfeld & Setup**<br>– Canvas vorbereiten<br>– Gitter/Zellen zeichnen<br>– Schlange initial anzeigen                                                             |
| **16:05 – 16:20** | 15 min | **Bewegung der Schlange**<br>– Richtung speichern (z. B. `dx`, `dy`)<br>– Bewegung mit `setInterval()` umsetzen                                                      |
| **16:20 – 16:35** | 15 min | **Steuerung per Tastatur**<br>– `keydown`-Events abfangen<br>– Richtung ändern mit Pfeiltasten                                                                       |
| **16:35 – 16:45** | 10 min | **Längere Pause**                                                                                                                                                  |
| **16:45 – 17:00** | 15 min | **Futter einbauen**<br>– Zufällige Position generieren<br>– Essen zeichnen                                                                                           |
| **17:00 – 17:15** | 15 min | **Wachstum & Punkte**<br>– Schlange verlängern bei Treffer<br>– Punktestand anzeigen                                                                                 |
| **17:15 – 17:30** | 15 min | **Game Over-Logik**<br>– Kollision mit Wand oder Körper erkennen<br>– Neustart ermöglichen                                                                           |
| **17:30 – 17:35** | 5 min  | **Kurze Pause**                                                                                                                                                    |
| **17:35 – 17:55** | 20 min | **Freies Üben / Bonusaufgaben **<br> Ideen für Fortgeschrittene:<br>– Farbverlauf für die Schlange<br>– Levelsystem oder Geschwindigkeit erhöhen<br>– Highscore-Anzeige |
| **17:55 – 18:00** | 5 min  | **Abschluss & Ausblick**<br>– Kurzes Fazit<br>– Vorschau auf Tag 3 (*Brick Break*)                                                                                   |


## Tag 3: Brick Break

| Zeit              | Dauer  | Programmpunkt                                                                                                                                                    |
| ----------------- | ------ | ---------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **15:30 – 15:50** | 20 min | **Begrüßung & Recap**<br>– Kurzer Rückblick auf Tag 2 (Snake)<br>– Ziel des Tages: „Brick Break“ verstehen und umsetzen<br>– Starter-Projekt vorstellen          |
| **15:50 – 16:05** | 15 min | **Canvas & Spielfeld**<br>– Canvas vorbereiten<br>– Paddle, Ball und Blöcke als Grundobjekte zeichnen                                                            |
| **16:05 – 16:20** | 15 min | **Ballbewegung & Kollisionslogik**<br>– Ball bewegen (`dx`, `dy`)<br>– Kollision mit Wänden erkennen                                                             |
| **16:20 – 16:35** | 15 min | **Paddle-Steuerung**<br>– Pfeiltasten oder Mausbewegung<br>– Paddle bewegen, Ball abprallen lassen                                                               |
| **16:35 – 16:45** | 10 min | **Längere Pause**                                                                                                                                              |
| **16:45 – 17:00** | 15 min | **Kollision mit Blöcken**<br>– Blöcke zerstören<br>– Punkte zählen                                                                                               |
| **17:00 – 17:15** | 15 min | **Ballgeschwindigkeit & Richtungslogik**<br>– Geschwindigkeit anpassen<br>– Richtungsänderung bei Blocktreffer / Paddle                                          |
| **17:15 – 17:30** | 15 min | **Level & Styling**<br>– Blöcke farbig gestalten<br>– Paddle/Ball Design verbessern                                                                              |
| **17:30 – 17:35** | 5 min  | **Kurze Pause**                                                                                                                                                |
| **17:35 – 17:55** | 20 min | **Freies Üben / Bonusaufgaben**<br> Ideen für Fortgeschrittene:<br>– Verschiedene Blocktypen (härter, Spezialeffekte)<br>– Livesystem<br>– Highscore speichern |
| **17:55 – 18:00** | 5 min  | **Abschluss & Workshop-Fazit**<br>– Feedbackrunde<br>– Tipps für eigene Mini-Spiele                                                                              |