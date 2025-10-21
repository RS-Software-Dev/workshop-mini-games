---
title: "Workshop Tag 2: Snake"
theme: default
class: text-center font-mono
lineNumbers: true
transition: slide-left
---

# Snake
## Workshop Retro Games

---

<style>
table td,
table th {
  padding: 6px !important;
  border: none !important;
}

table {
  border-collapse: collapse;
}
</style>


| Zeit              | Dauer  | Programmpunkt                                                                                                                                                        |
| ----------------- | ------ | -------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **15:30 – 15:50** | 20 min | **Begrüßung & Rückblick**    |
| **15:50 – 16:05** | 15 min | **Spielfeld & Setup**                                             |
| **16:05 – 16:20** | 15 min | **Bewegung der Schlange**                                                    |
| **16:20 – 16:35** | 15 min | **Steuerung per Tastatur**                                                                    |
| **16:35 – 16:45** | 10 min | **Längere Pause**                                                                                                                                                  |
| **16:45 – 17:00** | 15 min | **Futter einbauen**                                                                                         |
| **17:00 – 17:15** | 15 min | **Wachstum & Punkte**                                                                              |
| **17:15 – 17:30** | 15 min | **Game Over-Logik**                                                                          |
| **17:30 – 17:35** | 5 min  | **Kurze Pause**                                                                                                                                                    |
| **17:35 – 17:55** | 20 min | **Freies Üben / Bonusaufgaben** |
| **17:55 – 18:00** | 5 min  | **Abschluss & Ausblick**                                                                               |

---
layout: center
---

# Rückblick

---

# Letztes Mal: Game of Life
- Zeichnen mit `<canvas>`
- Aufbau der Game Loop:
  - `state`: Aktueller Zustand
  - `render`: Zeichnet Zustand
  - `update`: Berechnet Zustand

---

# Dieses Mal: Snake
- Verschiedene Gründe für Updates:
  - Richtung der Schlange ändert sich
  - Zeit schreitet voran
  - Spiel neustarten
- Zustände:
  - Game Over
  - Eine Frucht
  - Eine Schlange

---
layout: center
---

<h2><a href="./example.html">Beispiel</a></h2>




---

# Bonusaufgaben
- Zeichne den Kopf der Schlange in einem anderen Stil (z.B. Form, Farbe)
- Füge mehrere Früchte hinzu
- Füge verschiedene Arten von Früchten hinzu
  - Jede art soll eine eigene Farbe und einen eigenen Punkte Wert haben