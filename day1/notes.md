# Notizen: Game of Life

Folien:
https://gh.rs-software.dev/day1/

Beispiel:
https://gh.rs-software.dev/day1/example.html

Starter Kit:
https://github.com/RS-Software-Dev/workshop-retro-games/releases/latest

Canvas API:
https://developer.mozilla.org/de/docs/Web/API/CanvasRenderingContext2D

## HTML Grundgerüst
15:50 - 16:05

```
console.log("Hallo JavaScript")
```

```
.hallo-css {
    background-color: red
    color: white
}
```

```
function makeGameOfLife({canvas, rows, cols, size}) {
    canvas.width = cols * size
    canvas.height = rows * size
}
```

- In eigene Datein verschieben?


## Raster zeichnen 
16:05 - 16:20

```
function makeRandomGrid({ rows, cols }) {
    return new Grid({
        rows,
        cols,
        cell: () => Math.random() <= 0.5
    })
}
```

```
const context = canvas.getContext("2d")
const grid = makeRandomGrid({rows, cols}) 
context.fillStyle = "lime"
context.strokeStyle = "white"
context.lineWidth = 2.0

for (let row = 0; row < rows; row++) {
  for (let col = 0; col < cols; col++) {
    context.strokeRect(col * size, row * size, size, size)
  }
}
```

function renderGrid(grid) {
    context.reset()

    for (const cell of grid.cells()) {
        if (cell.data) {
            context.fillStyle = "lime"
        }
        else {
            context.fillStyle = "red"
        }

        context.fillRect(size * cell.col, size * cell.row, size, size)
    }
}


## Simulationsschritt berechnen
16:20 - 16:35

function updateGrid(grid) {
    return new GameGrid({
        rows,
        cols,
        cell: ({ row, col }) => {
            let aliveNeighbors = 0
            for (const neighbor of grid.neighbors({ row, col })) {
                if (neighbor.data) aliveNeighbors++
            }

            const isAlive = grid.data[row][col]

            // Game of Life rules
            if (isAlive) {
                return aliveNeighbors === 2 || aliveNeighbors === 3
            } else {
                return aliveNeighbors === 3
            }
        }
    })
}


let grid = makeRandomGrid({rows, cols})
renderGrid(grid)

.controls {
    margin: 16px;
    display: flex;
    flex-direction: row;
    justify-content: center;
}

<div class="controls">
    <button onclick="grid = updateGrid(grid) ; renderGrid(grid)">Update</button>
</div>



## Kurze Pause
16:35 - 16:40



## Automatische Updates
16:40 - 16:55

function makeGameOfLife({canvas, rows, cols, size}) {
    canvas.width = cols * size
    canvas.height = rows * size

    return new MiniGame({
        state: {
            generation: 0,
            grid: new GameGrid({
                rows,
                cols,
                cell: () => Math.random() <= 0.5
            })
        },
        render: ({ generation, grid }) => {
            console.log("Generation: " + generation)
            renderGrid(grid)
        },
        update: ({ generation, grid }) => ({
            generation: generation + 1,
            grid: updateGrid(grid)
        })
    })
}


<script src="./lib/MiniGame.js"></script>

const game = makeGameOfLife({
    canvas: document.querySelector('#main'),
    rows: 30,
    cols: 40,
    size: 16
})

game.run()


## Styling & Usability
16:55 - 17:10

<div class="controls">
    <button onclick="game.update() ; game.render()">Update</button>
    <button onclick="game.run()">Start</button>
    <button onclick="game.stop()">Stop</button>
</div>


// Für drawGrid
const style = getComputedStyle(canvas)
const colorAlive = style.getPropertyValue('--color-alive')
const colorDead = style.getPropertyValue('--color-dead')


## Click Handler
17:15 - 17:25

// setup on click handler
canvas.addEventListener('click', (event) => {
    console.log(event)

    // determine which cell was clicked
    const col = Math.floor(event.layerX / size)
    const row = Math.floor(event.layerY / size)

    // toggle cell in the current grid
    const { grid } = game.state
    grid.data[row][col] = !grid.data[row][col]

    // immediately re-render
    game.render()
})

## Längere Pause
17:25 - 17:35

## Freies Üben
17:35 - 17:55

- Farben und Formen anpassen
- Eingabefeld/Slider für Geschwindigkeit
- Muster ausprobieren
- So lange wie möglich Überleben


## Links
- https://de.wikipedia.org/wiki/Conways_Spiel_des_Lebens
- https://conwaylife.appspot.com/library/