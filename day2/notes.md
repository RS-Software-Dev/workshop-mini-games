# Notizen: Snake

- Schriftgröße im Editor hochstellen


## Spielfeld zeichnen
15:50 - 16:05

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

## Schlange bewegen
16:05 - 16:20

// Fügt ein neues Segment zur Schlange hinzu und achtet darauf, 
// dass das Gitter nicht verlassen wird.
function growSnakeInBounds(snake) {
    const s = growSnake(snake)
    s.segments = s.segments.map(grid.keepInBounds)
    return s
}

// Berechnet den nächsten Zeitschritt.
function updateTick(state) {

    state.snake = growSnakeInBounds(state.snake)
    shrinkSnake(state.snake)

    return state
}


## Steuerung per Tastatur
16:20 - 16:35

// Reagiert auf Tasten die gedrückt werden.
document.addEventListener('keydown', (e) => {
    switch (e.key.toLowerCase()) {
        case 'w':
        case 'arrowup':
            game.handle("move", DIR_UP)
            break
        case 's':
        case 'arrowdown':
            game.handle("move", DIR_DOWN)
            break
        case 'a':
        case 'arrowleft':
            game.handle("move", DIR_LEFT)
            break
        case 'd':
        case 'arrowright':
            game.handle("move", DIR_RIGHT)
            break
   }
})

// Ändert die Bewegungsrichtung der Schlange.
function updateMove(state, dir) {
    state.snake = updateSnakeDirection(state.snake, dir)
    return state
}


## 10 MIN PAUSE
16:35 - 16:45

## Frucht einsammeln
16:45 - 17:00

// Überprüft ob die Schlange die Frucht berührt.
function checkFruitCollision({ snake, fruit }) {
    return snake.segments.some((seg) => isSamePos(seg, fruit))
}

// Berechnet den nächsten Zeitschritt.
function updateTick(state) {
    state.snake = growSnakeInBounds(state.snake)

    if (checkFruitCollision(state)) {
        state.fruit = grid.makeRandomPos()
    }
    else {
        shrinkSnake(state.snake)
    }

    return state
}

## Kollision mit Schlange
17:00 - 17:15

// Überprüft ob die Schlange sich überschneidet.
function checkSnakeCollision({ segments }) {
    const [head, ...rest] = segments
    return rest.some((seg) => isSamePos(head, seg))
}


// Berechnet den nächsten Zeitschritt.
function updateTick(state) {
    if (state.isGameOver)
        return state

    ...

    state.isGameOver = checkSnakeCollision(state.snake)
    return state
}


## Game Over
17:15 - 17:30

// Zeichnet den Game Over screen, wenn das Spiel vorbei ist.
function renderStats(state) {
    overlay.innerHTML = state.isGameOver ?
        gameOverTemplate({ score: state.snake.segments.length }) :
        ''
}

function gameOverTemplate({score}) {
    return `
    <span class="game-over">Game Over</span>
    <p class="score">Score: ${score}</p>
    `
}


