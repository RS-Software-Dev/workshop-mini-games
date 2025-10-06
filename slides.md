---
theme: default
background: https://images.unsplash.com/photo-1635070041078-e363dbe005cb?w=1200
class: text-center
highlighter: shiki
lineNumbers: true
drawings:
  persist: false
transition: slide-left
title: Conway's Game of Life Workshop
mdc: true
---

# Conway's Game of Life

Building Life with Code

<div class="pt-12">
  <span @click="$slidev.nav.next" class="px-2 py-1 rounded cursor-pointer" hover="bg-white bg-opacity-10">
    Press Space to start <carbon:arrow-right class="inline"/>
  </span>
</div>

---
layout: center
---

# What is the Game of Life?

<v-clicks>

- A **cellular automaton** invented by John Conway in 1970
- Simple rules create complex, life-like behavior
- Zero-player game: set initial state and watch it evolve
- We'll build it with a modular architecture

</v-clicks>

---

# The Rules

<v-clicks>

Every cell is either **alive** or **dead**

1. **Underpopulation**: Cell with < 2 neighbors dies
2. **Survival**: Cell with 2-3 neighbors lives on
3. **Overpopulation**: Cell with > 3 neighbors dies
4. **Reproduction**: Dead cell with exactly 3 neighbors becomes alive

All changes happen **simultaneously** each generation

</v-clicks>

---

# Architecture Overview

Our modular approach:

<v-clicks>

- **GameGrid** - Data structure for the grid
- **GameLoop** - Controls game timing and updates
- **Renderers** - Multiple ways to visualize
  - ConsoleRenderer (ASCII)
  - CanvasRenderer (Visual)
  - HtmlRenderer (Stats/UI)

Each component has a single responsibility!

</v-clicks>

---

# GameGrid: The Data Structure

Stores and accesses cell states

<<< @/examples/scripts/GameGrid.js#L1-L13 {*}{lines: true}

---

# GameGrid: Neighbor Iteration

Finding all 8 neighbors around a cell

```js {all|2-3|4|5-10}
// @include: ./GameGrid.js#L30-L41
```

<v-click>

**Key insight**: This generator makes it easy to count alive neighbors!

</v-click>

---

# Game of Life Rules

Implementing Conway's rules

```js {all|1-5|7-12|14-18}
function updateGameOfLife(grid) {
    return new GameGrid({
        rows: grid.rows,
        cols: grid.cols,
        cell: ({ row, col }) => {
            // Count alive neighbors
            let aliveNeighbors = 0;
            for (const { val } of grid.neighbors({ row, col })) {
                if (val) aliveNeighbors++;
            }

            const isAlive = grid.getCell({ row, col });

            // Game of Life rules
            if (isAlive) {
                return aliveNeighbors === 2 || aliveNeighbors === 3;
            } else {
                return aliveNeighbors === 3;
            }
        }
    })
}
```

---

# ConsoleRenderer: ASCII Output

Simple text-based visualization

```js {all|1-4|6-18|20}
// @include: ./ConsoleRenderer.js
```

<v-click>

Example output:
```
░█░
░█░
░█░
```

</v-click>

---

# CanvasRenderer: Setup

Visual rendering with HTML Canvas

```js {all|1-5|7-15}
// @include: ./CanvasRenderer.js#L1-L16
```

---

# CanvasRenderer: Drawing

Rendering the grid with colors

```js {all|1-6|8-11|13-23}
// @include: ./CanvasRenderer.js#L18-L42
```

---

# CanvasRenderer: Factory Methods

Convenience methods for creating renderers

```js {all|1-10|12-16}
// @include: ./CanvasRenderer.js#L44-L60
```

---

# GameLoop: Control Flow

Managing the game cycle

```js {all|1-5|7-15|17}
// @include: ./GameLoop.js
```

<v-click>

**Pattern**: launch → render → (update → render) × ∞

</v-click>

---

# HtmlRenderer: Dynamic UI

Rendering HTML templates from state

```js {all|1-9|11-17}
// @include: ./HtmlRenderer.js
```

---
layout: two-cols
---

# Putting It All Together

Complete game initialization

```js {all|1-9|11-13|15-35}
function GameOfLife({ 
  parent, rows, cols, tileSize 
}) {
  const canvasRenderer = 
    CanvasRenderer.autoAppend({
      parent, rows, cols, tileSize
    });

  canvasRenderer.canvas
    .classList.add('cool-theme');

  const statsRenderer = 
    HtmlRenderer.append({
      parent,
      template: (grid) => {
        let alive = 0;
        for (const { val } of grid.cells()) {
          if (val) alive += 1;
        }
        return `
          
            
              Cells Alive:
              ${alive}
            
          
        `;
      }
    });
```

::right::

```js {1-20}
  return new GameLoop({
    launch: () => new GameGrid({
      rows, cols,
      cell: () => Math.random() <= 0.5
    }),
    
    render: (state) => {
      canvasRenderer.render(state);
      statsRenderer.render(state);
    },
    
    update: updateGameOfLife
  });
}

// Run the game!
const game = GameOfLife({
  parent: document.querySelector('main'),
  rows: 30, cols: 40, tileSize: 16
});

game.run();
```

---

# Key Design Patterns

What makes this code clean and modular?

<v-clicks>

1. **Separation of Concerns** - Grid logic separate from rendering
2. **Generator Functions** - Clean iteration over cells and neighbors
3. **Factory Pattern** - Static methods for easy renderer creation
4. **Functional Updates** - Create new grid instead of mutating
5. **Dependency Injection** - Pass functions as parameters

</v-clicks>

---

# Live Demo

Let's see it in action!

<v-click>

Open `01-game-of-life.html` in your browser

Watch for:
- Random initial state
- Oscillators (blinkers)
- Gliders moving across screen
- Still lifes (blocks)
- Eventual stabilization or chaos

</v-click>

---

# Your Turn: Experiments

Try modifying the code:

<v-clicks>

1. **Change the rules**: What if cells survive with 1-4 neighbors?
2. **Different patterns**: Create a glider gun initial state
3. **Color by age**: Track how long cells have been alive
4. **Click to toggle**: Add mouse interaction
5. **Speed control**: Add buttons to adjust interval
6. **Wraparound edges**: Modify `getCell` to wrap at boundaries

</v-clicks>

---
layout: center
---

# Why This Matters

<v-clicks>

- **Emergence**: Complex behavior from simple rules
- **Modularity**: Easy to extend and test
- **Performance**: Efficient algorithms matter
- **Visualization**: Multiple renderers for different uses
- **Fun**: Great project for learning!

</v-clicks>

---
layout: center
class: text-center
---

# Let's Code!

Open the files and start experimenting

<div class="mt-10">

Resources:
- [LifeWiki](https://conwaylife.com/wiki/) - Pattern encyclopedia
- [Game of Life Playground](https://playgameoflife.com/)

</div>

---
layout: end
---

# Thanks!

Questions?