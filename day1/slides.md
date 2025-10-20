---
title: "Workshop Tag 1: Game of Life"
theme: default
class: text-center
lineNumbers: true
transition: slide-left
hideInToc: true
layout: center
---


# Workshop Retro Games

<!--
- Hi ich bin Roman
- Ich bin freiberuflicherer Softwareentwickler
- Seit 2018 auch Mentor bei Make You School
- Heute schauen wir uns an wie man Retro Spiele im Browser programmiert
-->



---
hideInToc: true
---

<style>
/* Target all table cells in Markdown slides */
table td,
table th {
  padding: 6px !important;  /* force removal of padding */
  border: none !important;
}

/* Optional: collapse borders for the whole table */
table {
  border-collapse: collapse;
}
</style>

| Zeit              | Dauer  | Programmpunkt                                                                                                                                                        |
| ----------------- | ------ | -------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **15:30 – 15:50** | 20 min | **Begrüßung & Einführung**            |
| **15:50 – 16:05** | 15 min | **HTML-Grundgerüst**                 |
| **16:05 – 16:20** | 15 min | **Raster zeichnen**                                                                          |
| **16:20 – 16:35** | 15 min | **Simulationsschritt programmieren**                                                                      |
| **16:35 – 16:40** | 5 min  | **Kurze Pause**                                                                                                                                                    |
| **16:40 – 16:55** | 15 min | **Automatisches Laufen lassen**                                             |
| **16:55 – 17:10** | 15 min | **Styling & Usability**                                |
| **17:10 – 17:25** | 15 min | **Lebende Zellen aktivieren**                                           |
| **17:25 – 17:35** | 10 min | **Längere Pause**                                                                                                                                                  |
| **17:35 – 17:55** | 20 min | **Freies Üben / Bonusaufgaben**|
| **17:55 – 18:00** | 5 min  | **Abschluss & Ausblick**                                                                                        |


---
layout: center
---

# Einführung

---


## Was ist das "Game of Life"?
<v-clicks>

- Kein klassisches Spiel — eine **Zellulärer Automat** von John Conway (1970)
- Jede Zelle hat zwei Zustände: **lebendig** oder **tot**
- Der **nächste Generation** Zustand wird nach festen Regeln berechnet
- Komplexe Muster möglich

</v-clicks>
<!--
- Keine Spieler, da es keine Entscheidungsmöglichkeit gibt
- Binäre Zustände
-->

---
layout: center
---

<h2><a href="./example.html">Beispiel</a></h2>


---


<h2 class="text-center text-4xl mb-8 mt-4">
   Die Spielregeln
</h2>

<div class="grid grid-cols-4 gap-4 text-center text-sm w-full mt-16">

<div class="flex flex-col items-center w-full">
  <div class="w-full grid grid-cols-3 gap-1">
    <div class="aspect-square border"></div>
    <div class="aspect-square border"></div>
    <div class="aspect-square border"></div>
    <div class="aspect-square border"></div>
    <div class="aspect-square bg-lime-500 border-4 border-red-500"></div>
    <div class="aspect-square border"></div>
    <div class="aspect-square border"></div>
    <div class="aspect-square border"></div>
    <div class="aspect-square border"></div>
  </div>
  <h3>Vereinsamung</h3>
</div>

<div class="flex flex-col items-center w-full">
  <div class="w-full grid grid-cols-3 gap-1">
    <div class="aspect-square bg-lime-500 border"></div>
    <div class="aspect-square bg-lime-500 border"></div>
    <div class="aspect-square bg-lime-500 border"></div>
    <div class="aspect-square bg-lime-500 border"></div>
    <div class="aspect-square bg-lime-500 border-4 border-red-500"></div>
    <div class="aspect-square bg-lime-500 border"></div>
    <div class="aspect-square border"></div>
    <div class="aspect-square border"></div>
    <div class="aspect-square border"></div>
  </div>
  <h3>Überbevölkerung</h3>
</div>

<div class="flex flex-col items-center w-full">
  <div class="w-full grid grid-cols-3 gap-1">
    <div class="aspect-square border"></div>
    <div class="aspect-square bg-lime-500 border"></div>
    <div class="aspect-square border"></div>
    <div class="aspect-square bg-lime-500 border"></div>
    <div class="aspect-square bg-lime-500 border-4 border-red-500"></div>
    <div class="aspect-square bg-lime-500 border"></div>
    <div class="aspect-square border"></div>
    <div class="aspect-square border"></div>
    <div class="aspect-square border"></div>
  </div>
  <h3>Überleben</h3>
</div>

<div class="flex flex-col items-center w-full">
  <div class="w-full grid grid-cols-3 gap-1">
    <div class="aspect-square border"></div>
    <div class="aspect-square bg-lime-500 border"></div>
    <div class="aspect-square border"></div>
    <div class="aspect-square bg-lime-500 border"></div>
    <div class="aspect-square border-4 border-red-500"></div>
    <div class="aspect-square bg-lime-500 border"></div>
    <div class="aspect-square border"></div>
    <div class="aspect-square border"></div>
    <div class="aspect-square border"></div>
  </div>
  <h3>Vermehrung</h3>
</div>

</div>

<!--
4 Regeln:
1. Eine Zelle 
-->





---

# Unsere Ziele
- Ein Gitter zeichnen
- Einen Simulationsschritt ausführen
- Die Simulation automatisch laufen lassen (Start/Stopp)
- Per Klick Zellen togglen (lebendig/tot)

---

# Unsere Werkzeuge
- Text-Editor
  - z.B. Notepad++, VSCodium, <a href="https://codepen.io/pen/"> CodePen </a>
- Browser
  - z.B. Firefox, Chrome, Safari 
- <a href="https://github.com/RS-Software-Dev/workshop-retro-games/releases/latest">Starter Kit</a>
  - `index.html` ist unsere Hauptseite
  - `lib/` enthält hilfreiche Skripte

<!--
Erkläre kurz, wie das Starter-Kit geöffnet wird (VS Code / Live Server / einfach im Browser).
Sage, wo sie die Dateien finden (Repo/ZIP).
-->

---
layout: center
---

# Live Coding


---
layout: center
---

# Abschluss

---
layout: center
---

# Nächstes Mal

## Snake
Am 22.10. um 15:30
