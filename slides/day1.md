---
title: "Workshop Tag 1: Game of Life"
theme: default
class: text-center font-mono
lineNumbers: true
transition: slide-left
hideInToc: true
layout: center
---

# Workshop Mini Games

---
hideInToc: true
---

# Begrüßung

## Helena 5min
## Roman 5min
- Ich hab in der Schulzeit angefangen
- Dann studiert und als App Entwickler gearbeitet
- Während dessen angefangen als Mentor für MYS zu arbeiten
- Heute freiberuflicher Softwareentwickler


---
hideInToc: true
---

# Inhalt des Workshops

<Toc maxDepth="1"/>


---
layout: center
---

# Einführung


---

## Was ist das "Game of Life"?
- Kein klassisches Spiel — eine **Zellulärer Automat** von John Conway (1970)
- Jede Zelle hat zwei Zustände: **lebendig** oder **tot**
- Regeln (für **nächste Generation**):
  1. Lebende Zelle mit <2 Nachbarn → stirbt (Unterbevölkerung)
  2. Lebende Zelle mit 2 oder 3 Nachbarn → bleibt leben
  3. Lebende Zelle mit >3 Nachbarn → stirbt (Überbevölkerung)
  4. Tote Zelle mit genau 3 Nachbarn → wird lebendig (Reproduktion)

<!--
Erkläre anhand eines kleinen 3x3- oder 5x5-Beispiels: zähle Nachbarn.
Zeige auf, dass einfache Regeln komplexe Muster erzeugen.
-->

---

## Kurze Demo

<!--
Wenn möglich Live Beispiel einfügen
-->


---

# Erwartungen & Ziele von heute
- Am Ende könnt ihr:
  - ein Raster zeichnen und Zellen rendern
  - einen Simulationsschritt ausführen und Regeln anwenden
  - die Simulation automatisch laufen lassen (Start/Stopp)
  - per Klick Zellen togglen (lebendig/tot)

<!--
Motiviere die Teilnehmenden: das ist überschaubar und macht Spaß.
Erwähne Möglichkeit für Fragen & Hilfestellungen während der Implementierung.
-->

---
layout: center
---

# Grundgerüst

---

## Unsere Werkzeuge heute
- HTML: Grundgerüst & `<canvas>` für die Darstellung
- CSS: Styling, Größen und Farben
- JavaScript: Datenstrukturen und Spiellogik
- Starter-Dateien: `index.html`, `style.css`, `main.js` (bereitgestellt)

<!--
Erkläre kurz, wie das Starter-Kit geöffnet wird (VS Code / Live Server / einfach im Browser).
Sage, wo sie die Dateien finden (Repo/ZIP).
-->

---
layout: two-cols
---

# HTML-Grundgerüst & Canvas

<ul>
    <li v-click="1"> HTML definiert die Struktur </li>
    <li v-click="2"> CSS verändert die Gestaltung </li>
    <li v-click="3"> JS erweckt das Dokument zum Leben</li>
</ul>


::right::

<<< @/snippets/hallo.html {|1-6,11-18,24-26|7-10|19-23}

---

# Raster zeichnen

---

# Simulationsschritt programmieren

---
layout: center
hideInToc: true
---

# Pause

Wir sehen uns wieder in 5min.

---

# Automatisches Laufen lassen

---

# Styling & Usability

---
layout: center
hideInToc: true
---

# Pause
Wir sehen uns wieder in 10min.

---

# Freies Üben / Bonusaufgaben

---

# Abschluss