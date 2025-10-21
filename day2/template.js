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

    }

    // Zeichnet die Frucht.
    function renderFruit(fruit) {

    }

    // Zeichnet den Game Over screen, wenn das Spiel vorbei ist.
    function renderStats(state) {

    }

    // Fügt ein neues Segment zur Schlange hinzu und achtet darauf, 
    // dass das Gitter nicht verlassen wird.
    function growSnakeInBounds(snake) {
        
    }

    // Berechnet den nächsten Zeitschritt.
    function updateTick(state) {
        return state
    }

    // Ändert die Bewegungsrichtung der Schlange.
    function updateMove(state, dir) {
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
