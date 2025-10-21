function makeBrickBreakGame({ canvas, rows, cols, size }) {
    canvas.width = cols * size
    canvas.height = rows * size

    const context = canvas.getContext("2d")

    function fillTile({ row, col }) {
        context.fillRect(col * size, row * size, size, size)
    }

    function renderBall({ x, y, r }) {
        context.fillStyle = "red"

        context.beginPath()
        context.arc(x, y, r, 0, Math.PI * 2)
        context.fill()
        context.closePath()
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

    function renderBlocks(blocks) {
        context.fillStyle = "red"

        for (const row of blocks) {
            for (const block of row) {
                fillTile(block)
            }
        }
    }

    /*
    function checkBlockCollision({ row, col }, ball) {
        const minX = col * size
        const minY = row * size

        const maxX = minX + size
        const maxY = minY + size

        const insideX = (n) => (minX <= n) && (n <= maxX)
        const insideY = (n) => (minY <= n) && (n <= maxY)

        if (insideX(ball.x - ball.r)) {
            return DIR_LEFT
        }
        else if (insideX(ball.x + ball.r)) {
            return DIR_RIGHT
        }
        else if (insideY(ball.y - ball.r)) {
            return DIR_UP
        }
        else if (insideY(ball.y + ball.r)) {
            return DIR_DOWN
        }
    }*/

    function checkBlockCollision(block, ball) {
        const { row, col } = block
        const minX = col * size
        const minY = row * size
        const maxX = minX + size
        const maxY = minY + size

        // 1️⃣ Check if the ball actually overlaps the block
        if (
            ball.x + ball.r < minX || // too far left
            ball.x - ball.r > maxX || // too far right
            ball.y + ball.r < minY || // too far above
            ball.y - ball.r > maxY    // too far below
        ) {
            return null // no collision
        }

        // 2️⃣ Determine which side the collision happened on
        const overlapLeft = ball.x + ball.r - minX
        const overlapRight = maxX - (ball.x - ball.r)
        const overlapTop = ball.y + ball.r - minY
        const overlapBottom = maxY - (ball.y - ball.r)

        // Find the smallest overlap → that’s the collision side
        const minOverlap = Math.min(overlapLeft, overlapRight, overlapTop, overlapBottom)

        if (minOverlap === overlapLeft) return DIR_LEFT
        if (minOverlap === overlapRight) return DIR_RIGHT
        if (minOverlap === overlapTop) return DIR_UP
        if (minOverlap === overlapBottom) return DIR_DOWN
    }


    function updateBlocks(blocks, ball) {
        return blocks.map((row) => row.filter((block) => {
            const dir = checkBlockCollision(block, ball)
            if (isDir(dir)) {
                updateBallCollision(ball, dir)
                return false
            }
            else {
                return true
            }
        }))
    }

    function renderPaddle({ x, y }) {
        context.fillStyle = "lime"
        context.fillRect(x - 4 * size, y - size / 2, size * 8, size)
    }

    function checkPaddleCollision(paddle, ball) {
        const minX = paddle.x - 4 * size
        const minY = paddle.y - size / 2
        const maxX = minX + 8 * size
        const maxY = minY + size

        // 1️⃣ Check if the ball actually overlaps the block
        if (
            ball.x + ball.r < minX || // too far left
            ball.x - ball.r > maxX || // too far right
            ball.y + ball.r < minY || // too far above
            ball.y - ball.r > maxY    // too far below
        ) {
            return null // no collision
        }

        // 2️⃣ Determine which side the collision happened on
        const overlapLeft = ball.x + ball.r - minX
        const overlapRight = maxX - (ball.x - ball.r)
        const overlapTop = ball.y + ball.r - minY
        const overlapBottom = maxY - (ball.y - ball.r)

        // Find the smallest overlap → that’s the collision side
        const minOverlap = Math.min(overlapLeft, overlapRight, overlapTop, overlapBottom)

        if (minOverlap === overlapLeft) return DIR_LEFT
        if (minOverlap === overlapRight) return DIR_RIGHT
        if (minOverlap === overlapTop) return DIR_UP
        if (minOverlap === overlapBottom) return DIR_DOWN
    }

    function updatePaddleCollision(paddle, ball) {
        const dir = checkPaddleCollision(paddle, ball)
        if(isDir(dir)) {
            updateBallCollision(ball, dir)
        }
    }

    function updatePaddle(paddle, time) {
        const speed = 500
        paddle.x += paddle.d * time * speed
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
        update: (state, input) => {

            if (input.type == "tick") {
                const sec = input.timePassed / 1000.0
                updateBall(state.ball, sec)
                updatePaddle(state.paddle, sec)
                state.blocks = updateBlocks(state.blocks, state.ball)
                updateWallCollision(state.ball)
                updatePaddleCollision(state.paddle, state.ball)
            }
            else if (input.type = "move") {
                state.paddle.d = input.dir == DIR_LEFT ? -1 : 
                    input.dir == DIR_RIGHT ? 1 : 0
            }

            return state
        }
    })
}