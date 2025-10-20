


function updateSnakeDir(snake, dir) {
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

function checkSnakeCollision({ segments }) {
    const [head, ...rest] = segments
    return rest.some((seg) => isSamePos(head, seg))
}

function updateGameOver(state) {
    state.isGameOver = checkSnakeCollision(state.snake)
}

function checkFruitCollision({ snake, fruit }) {
    return snake.segments.some((seg) => isSamePos(seg, fruit))
}

function growSnake(snake) {
    const newHead = addDir(snake.segments[0], snake.newDirection)

    return {
        segments: [newHead, ...snake.segments],
        oldDirection: snake.newDirection,
        newDirection: snake.newDirection
    }
}


function shrinkSnake({ segments }) {
    segments.pop()
}

function makeSnake(head, dir) {
    return {
        segments: [head],
        oldDirection: dir,
        newDirection: dir
    }
}


function makeSnakeGame({ canvas, rows, cols, size }) {
    canvas.width = cols * size
    canvas.height = rows * size

    const context = canvas.getContext("2d")

    function fillTile({ row, col }) {
        context.fillRect(col * size, row * size, size, size)
    }

    function renderSnake({ segments }) {
        context.fillStyle = "lime"
        for (const seg of segments) {
            fillTile(seg)
        }
    }

    function renderFruit(fruit) {
        context.fillStyle = "red"
        fillTile(fruit)
    }



    function makeRandomPos() {
        return makePos(Math.floor(Math.random() * rows), Math.floor(Math.random() * cols))
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

    function keepSnakeInBounds(snake) {
        snake.segments = snake.segments.map(keepInBounds)
    }

    function updateTick(state) {
        const newSnake = growSnake(state.snake)
        keepSnakeInBounds(newSnake)
        state.snake = newSnake

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

            if (state.isGameOver) {
                console.log("Game Over")
            }
        },
        update: (state, input) => {
            if (state.isGameOver)
                return state

            if (isDir(input)) {
                state.snake = updateSnakeDir(state.snake, input)
                return state
            }
            else if (input == "reset") {
                return makeRandomState()
            }
            else if (input == "tick") {
                return updateTick(state)
            } else {
                console.log("Other event: ", input)
                return state
            }
        }
    })
}





