function makeBrickBreakGame({ canvas, rows, cols, size }) {
    canvas.width = cols * size
    canvas.height = rows * size

    const context = canvas.getContext("2d")

    // Änderte die Füllfarbe zu der Style Eigenschaft mit dem angegebenen Namen.
    function setFillStyle(name) {
        context.fillStyle = getComputedStyle(canvas).getPropertyValue(name)
    }

    // Zeichnet den Ball
    function renderBall({ x, y, r }) {
        setFillStyle('--ball-color')

        context.beginPath()
        context.arc(x, y, r, 0, Math.PI * 2)
        context.fill()
        context.closePath()
    }

    // Zeichnet einen Block
    function renderBlock({ row, col }) {
        const x = col * size - 1
        const y = row * size - 1
        const s = size - 2
        const r = size / 8

        context.beginPath()
        context.roundRect(x, y, s, s, r)
        context.closePath()

        context.fill()
    }

    // Zeichnet alle Blöcke
    function renderBlocks(blocks) {
        setFillStyle('--block-color')

        for (const row of blocks) {
            for (const block of row) {
                renderBlock(block)
            }
        }
    }

    // Zeichnet den Schläger
    function renderPaddle({ x, y }) {
        setFillStyle('--paddle-color')
        context.fillRect(x - 4 * size, y - size / 2, size * 8, size)
    }


    function updateBall(ball, time) {
        ball.x = Math.round(ball.x + time * ball.dx)
        ball.y = Math.round(ball.y + time * ball.dy)
    }

    function checkWallCollision(ball) {
        if (ball.x - ball.r < 0) {
            return DIR_LEFT
        }
        else if (canvas.width < ball.x + ball.r) {
            return DIR_RIGHT
        }
        else if (ball.y - ball.r < 0) {
            return DIR_UP
        }
        else if (canvas.height < ball.y + ball.r) {
            return DIR_DOWN
        }
    }

    function updateBallCollision(ball, dir) {
        switch (dir) {
            case DIR_DOWN:
            case DIR_UP:
                ball.dy = -ball.dy
                break
            case DIR_LEFT:
            case DIR_RIGHT:
                ball.dx = -ball.dx
                break
        }
    }

    function updateWallCollision(ball) {
        const dir = checkWallCollision(ball)

        if (isDir(dir)) {
            updateBallCollision(ball, dir)
        }
    }

    function makeBlockRow(row) {
        return new Array(cols).fill(null).map((_, index) => makePos(row, index))
    }


    function updateBlocks(blocks, ball) {
        return blocks.map((row) => row.filter((block) => {
            const dir = checkBlockCollision(block, ball, size)
            if (isDir(dir)) {
                updateBallCollision(ball, dir)
                return false
            }
            else {
                return true
            }
        }))
    }

    function updatePaddleCollision(paddle, ball) {
        const dir = checkPaddleCollision(paddle, ball, size)
        if (isDir(dir)) {
            updateBallCollision(ball, dir)
        }
    }

    function updatePaddle(paddle, time) {
        const speed = 500
        paddle.x += paddle.d * time * speed
    }


    function updateTick(state, timePassed) {
        const sec = timePassed / 1000.0
        updateBall(state.ball, sec)
        updatePaddle(state.paddle, sec)
        state.blocks = updateBlocks(state.blocks, state.ball)
        updateWallCollision(state.ball)
        updatePaddleCollision(state.paddle, state.ball)
        return state
    }

    function updateMove(state, dir) {
        state.paddle.d = dir == DIR_LEFT ? -1 : dir == DIR_RIGHT ? 1 : 0
        return state
    }

    return new MiniGame({
        state: {
            blocks: [
                makeBlockRow(0),
                makeBlockRow(2),
                makeBlockRow(3),
                makeBlockRow(5)
            ],
            ball: {
                x: cols / 2 * size,
                y: rows / 2 * size,
                r: size / 2,
                dx: size * cols / 2,
                dy: size * rows / 2
            },
            paddle: {
                x: cols / 2 * size,
                y: (rows - 2) * size,
                d: 0
            }
        },
        render: (state) => {
            context.reset()
            renderBall(state.ball)
            renderBlocks(state.blocks)
            renderPaddle(state.paddle)
        },
        update: (state, { type, args }) => {
            switch(type) {
                case "tick":
                    return updateTick(state, args)
                case "move":
                    return updateMove(state, args)
                default:
                    console.log("Unbekannte Eingabe: ", type)
                    return state
            }
        }
    })
}