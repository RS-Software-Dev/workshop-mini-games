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
| **15:50 – 16:05** | 15 min | **Spielfeld zeichnen**                                             |
| **16:05 – 16:20** | 15 min | **Schlange bewegen**                                                    |
| **16:20 – 16:35** | 15 min | **Steuerung per Tastatur**                                                                    |
| **16:35 – 16:45** | 10 min | **Längere Pause**                                                                                                                                                  |
| **16:45 – 17:00** | 15 min | **Frucht einsammeln**                                                                                         |
| **17:00 – 17:15** | 15 min | **Kollision mit Schlange**                                                                              |
| **17:15 – 17:30** | 15 min | **Game Over**                                                                          |
| **17:30 – 17:35** | 5 min  | **Kurze Pause**                                                                                                                                                    |
| **17:35 – 17:55** | 20 min | **Freies Üben / Bonusaufgaben** |
| **17:55 – 18:00** | 5 min  | **Abschluss & Ausblick**                                                                               |


---

# Letztes Mal: Game of Life
- Zeichnen mit `<canvas>`
- Aufbau der Game Loop:
  - `state`: Aktueller Zustand
  - `render`: Zeichnet Zustand
  - `update`: Berechnet Zustand

---
layout: two-cols
---

# Dieses Mal: <a href="./example.html">Snake</a>
<v-clicks>

- Zustände:
  - Game Over
  - Frucht
  - Schlange
- Zeichnen:
  - Game Over
  - Frucht
  - Schlange
- Verändern:
  - Zeit schreitet voran
  - Bewegunsrichtung ändern
  - Spiel zurücksetzten

</v-clicks>

::right::

<v-clicks>

```js
new MiniGame({
  state: {
    isGameOver: false,
    fruit: { row: 0, col: 0 },
    snake: {
      segments: [{ row: 1, col: 1 }],
      oldDirection: DIR_UP,
      newDirection: DIR_UP
    }
  },
  render: (state) => {
    renderSnake(state.snake)
    renderFruit(state.fruit)
    renderStats(state)
  },
  update: (state, { type, args }) => {
    switch (type) {
      case "move":
        return updateMove(state, args)
      case "tick":
        return updateTick(state)
      case "reset":
        return makeRandomState()
    }
  }
})
```

</v-clicks>

---

# Unser <a href="https://github.com/RS-Software-Dev/workshop-retro-games/releases/latest">Starter Kit</a>

- `lib/`
  - `MiniGame.js`
  - `MiniGrid.js` 
  - `SnakeHelper.js` 
- `index.html`
- `main.js`



---
layout: center
---

Live Coding




---

# Bonusaufgaben
- Zeichne den Kopf der Schlange in einem anderen Stil (z.B. Form, Farbe)
- Stelle die Richtung der Schlange visuelle dar
- Füge mehrere Früchte hinzu
- Füge verschiedene Arten von Früchten hinzu (verschiedene Farben, Punktwerte)