---
title: "Workshop Tag 3: Brick Break"
theme: default
class: text-center font-mono
lineNumbers: true
transition: slide-left
---

# Brick Break
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

| Zeit              | Dauer  | Programmpunkt                                                                                                                                                    |
| ----------------- | ------ | ---------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **15:30 – 15:50** | 20 min | **Begrüßung & Rückblick**         |
| **15:50 – 16:05** | 15 min | **Spielfeld zeichnen**                                                           |
| **16:05 – 16:20** | 15 min | **Ball bewegen**                                                            |
| **16:20 – 16:35** | 15 min | **Kollision mit Wand**                                                       |
| **16:35 – 16:45** | 10 min | **Längere Pause**                                                      |
| **16:45 – 17:00** | 15 min | **Schläger bewegen**         |
| **17:00 – 17:15** | 15 min | **Kollision mit Schläger**                                          |
| **17:15 – 17:30** | 15 min | **Kollision mit Blöcken**                                                  |
| **17:30 – 17:35** | 5 min  | **Kurze Pause**       |
| **17:35 – 17:55** | 20 min | **Freies Üben / Bonusaufgaben** |
| **17:55 – 18:00** | 5 min  | **Abschluss & Workshop-Fazit**                                       |

---
layout: two-cols
---

# Letztes Mal: Snake

<v-clicks>

- Zustand aus mehreren Teilen:
  - Position der Frucht
  - Richtung und Segmente der Schlange
- Mehrere Arten von Änderung:
  - Zeitschritt
  - Bewegungsrichtung
  - Zurücksetzten
- Extra Features:
  - Multiplayer
  - Game Over beim Verlassen des Feldes
  - Gewinner wird angezeigt

</v-clicks>

::right::

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


---
layout: two-cols
---

# Dieses Mal: <a href="./example.html">Brick Break</a>
<v-clicks>

- Zustände:
  - Ball
  - Blöcke
  - Schläger
- Zeichnen:
  - Game Over
  - Ball
  - Blöcke
  - Schläger
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
    ball: {
        // Position, Größe, Richtung
    }
    blocks: [
        // Position, Wert
    ]
    paddle: {
        // Position, Richtung
    }
  },
  render: (state) => {
    // Zeichnet die einzelnen Objekte
  },
  update: (state, { type, args }) => {
    switch (type) {
      case "move":
        return updateMove(state, args)
      case "tick":
        return updateTick(state, args)
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
  - `BrickBreakHelper.js` 
  - `style.css`
- `index.html`
- `main.js`



---
layout: center
---

Live Coding


---

# Bonusaufgaben
- Styling der Blöcke ändern
- Mehrere Bälle einfügen
- Schläger mit Maus bewegen
- Soundeffekte bei Treffer

---
layout: center
---

# Abschluss

---
layout: center
---

# Vielen Dank
## Noch Fragen?