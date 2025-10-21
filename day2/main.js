// Wechselt die Bewegungsrichtung der Schlange.
function updateSnakeDirection(snake, dir) {
    if (snake.oldDirection != -dir) {
        return {
            segments: snake.segments,
            oldDirection: snake.oldDirection,
            newDirection: dir
        }
    }
    else {
        return snake
    }
}

// Überprüft ob die Schlange sich überschneidet.
function checkSnakeCollision({ segments }) {
    const [head, ...rest] = segments
    return rest.some((seg) => isSamePos(head, seg))
}

// Überprüft ob das Spiel vorbei ist.
function updateGameOver(state) {
    state.isGameOver = checkSnakeCollision(state.snake)
}

// Überprüft ob die Schlange die Frucht berührt.
function checkFruitCollision({ snake, fruit }) {
    return snake.segments.some((seg) => isSamePos(seg, fruit))
}

// Erweitert die Schlange um ein Segment in Bewegungsrichtung.
function growSnake(snake) {
    const newHead = addDir(snake.segments[0], snake.newDirection)

    return {
        segments: [newHead, ...snake.segments],
        oldDirection: snake.newDirection,
        newDirection: snake.newDirection
    }
}

// Entfernt das letzte Segment der Schlange.
function shrinkSnake({ segments }) {
    segments.pop()
}

// Erstelle eine neue Schlange
function makeSnake(head, dir) {
    return {
        segments: [head],
        oldDirection: dir,
        newDirection: dir
    }
}

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

    function fillTile({ row, col }) {
        context.fillRect(col * size, row * size, size, size)
    }

    function fillCircle({row, col}) {
        const r = size / 2
        const x = col * size + r
        const y = row * size + r

        context.beginPath()
        context.arc(x, y, r, 0, Math.PI * 2)
        context.closePath()

        context.fill()
    }

    function getStyle(name) {
        return getComputedStyle(canvas).getPropertyValue(name)
    }


    function renderSnake({ segments }) {
        context.fillStyle = getStyle('--snake-color')
        for (const seg of segments) {
            fillTile(seg)
        }
    }

    function renderFruit(fruit) {
        context.fillStyle = getStyle('--fruit-color')
        fillCircle(fruit)
    }

    function renderStats(state) {
        overlay.innerHTML = state.isGameOver ?
            gameOverTemplate({ score: state.snake.segments.length }) :
            ''
    }


    // Wählt eine zufällige Position innerhalb des Gitters
    function makeRandomPos() {
        return makePos(
            Math.floor(Math.random() * rows), 
            Math.floor(Math.random() * cols)
        )
    }

    function makeRandomState() {
        return {
            isGameOver: false,
            fruit: makeRandomPos(),
            snake: makeSnake(makeRandomPos(), DIR_UP)
        }
    }

    function keepInBounds({ row, col }) {
        return makePos(row < 0 ? row + rows : row % rows, col < 0 ? col + cols : col % cols)
    }

    function growSnakeInBounds(snake) {
        const s = growSnake(snake)
        s.segments = s.segments.map(keepInBounds)
        return s
    }

    function updateTick(state) {
        if (state.isGameOver)
            return state

        state.snake = growSnakeInBounds(state.snake)

        if (checkFruitCollision(state)) {
            state.fruit = makeRandomPos()
        }
        else {
            shrinkSnake(state.snake)
        }

        updateGameOver(state)
        return state
    }


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
                    state.snake = updateSnakeDirection(state.snake, args)
                    return state
                case "tick":
                    return updateTick(state)
                case "reset":
                    return makeRandomState()
                default:
                    console.log("Unbekannter input: ", type)
                    return state
            }
        }
    })
}





