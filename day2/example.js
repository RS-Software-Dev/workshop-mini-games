
function gameOverTemplate({score}) {
    return `
    <span class="game-over">Game Over</span>
    <p class="score">Score: ${score}</p>
    `
}

function makeSnakeGame({ canvas, overlay, rows, cols, size }) {
    canvas.width = cols * size
    canvas.height = rows * size

    const context = canvas.getContext("2d")
    const grid = makeGrid(rows, cols)

    // Füllt das Feld mit einem Rechteck.
    function fillTile({ row, col }) {
        context.fillRect(col * size, row * size, size, size)
    }

    // Füllt das Feld mit einem Kreis.
    function fillCircle({row, col}) {
        const r = size / 2
        const x = col * size + r
        const y = row * size + r

        context.beginPath()
        context.arc(x, y, r, 0, Math.PI * 2)
        context.closePath()

        context.fill()
    }

    // Änderte die Füllfarbe zu der Style Eigenschaft mit dem angegebenen Namen.
    function setFillStyle(name) {
        context.fillStyle = getComputedStyle(canvas).getPropertyValue(name)
    }

    // Erstellt einen zufälligen Zustand.
    function makeRandomState() {
        return {
            isGameOver: false,
            fruit: grid.makeRandomPos(),
            snake: {
                segments: [grid.makeRandomPos()],
                oldDirection: DIR_UP,
                newDirection: DIR_UP
            }
        }
    }

    // Zeichnet die Schlange
    function renderSnake({ segments }) {
        setFillStyle('--snake-color')
        for (const seg of segments) {
            fillTile(seg)
        }
    }

    // Zeichnet die Frucht.
    function renderFruit(fruit) {
        setFillStyle('--fruit-color')
        fillCircle(fruit)
    }

    // Zeichnet den Game Over screen, wenn das Spiel vorbei ist.
    function renderStats(state) {
        overlay.innerHTML = state.isGameOver ?
            gameOverTemplate({ score: state.snake.segments.length }) :
            ''
    }

    // Fügt ein neues Segment zur Schlange hinzu und achtet darauf, 
    // dass das Gitter nicht verlassen wird.
    function growSnakeInBounds(snake) {
        const s = growSnake(snake)
        s.segments = s.segments.map(grid.keepInBounds)
        return s
    }

    // Berechnet den nächsten Zeitschritt.
    function updateTick(state) {
        if (state.isGameOver)
            return state

        state.snake = growSnakeInBounds(state.snake)

        if (checkFruitCollision(state)) {
            state.fruit = grid.makeRandomPos()
        }
        else {
            shrinkSnake(state.snake)
        }

        state.isGameOver = checkSnakeCollision(state.snake)
        return state
    }

    // Ändert die Bewegungsrichtung der Schlange.
    function updateMove(state, dir) {
        state.snake = updateSnakeDirection(state.snake, dir)
        return state
    }

    // Erstellt ein neues Spiel.
    return new MiniGame({
        state: makeRandomState(),
        render: (state) => {
            context.reset()
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
                default:
                    console.log("Unbekannte Eingabe: ", type, args)
                    return state
            }
        }
    })
}
