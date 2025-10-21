function makeBrickBreakGame({ canvas, overlay, rows, cols, size }) {
    canvas.width = cols * size
    canvas.height = rows * size


    function makeRandomBall() {
        const speed = size * 16
        return {
            x: cols * size / 2,
            y: rows * size * 3 / 4,
            r: size / 2,
            dx: speed * (Math.random() <= 0.5 ? -1 : +1),
            dy: speed,
        }
    }
    function makeRandomBlockRow(row) {
        return grid.listCols().map(col => makeRandomBlock(row, col))
    }

    function makeRandomBlocks() {
        return listUpTo(rows / 2).flatMap(makeRandomBlockRow)
    }

    function makeRandomState() {
        return {
            isGameOver: false,
            score: { hits: 0, sum: 0 },
            blocks: makeRandomBlocks(),
            ball: makeRandomBall(),
            paddle: {
                pos: cols / 2 * size,
                dir: null
            }
        }
    }


    const context = canvas.getContext("2d")
    const grid = makeGrid(rows, cols)

    // Änderte die Füllfarbe zu der Style Eigenschaft mit dem angegebenen Namen.
    function setFillStyle(name) {
        context.fillStyle = getComputedStyle(canvas).getPropertyValue(name)
    }

    function fillRect({ x, y, w, h }) {
        context.fillRect(x, y, w, h)
    }

    function fillCircle({ x, y, r }) {
        context.beginPath()
        context.arc(x, y, r, 0, Math.PI * 2)
        context.closePath()
        context.fill()
    }

    // Erstellt die Form des Schlägers.
    function makePaddleRect(pos) {
        const w = size * 8
        const h = size

        const x = pos - w / 2
        const y = (rows - 4) * size


        return makeRect(x, y, w, h)
    }

    function makeBlockRect({ row, col }) {
        return makeRect(col * size, row * size, size, size)
    }

    // Zeichnet einen Block
    function fillBlock({ row, col }) {
        const x = col * size
        const y = row * size
        const s = size

        fillRect({ x, y, w: s, h: s })
    }

    // Zeichnet den Ball
    function renderBall(ball) {
        setFillStyle('--ball-color')
        fillCircle(ball)
    }

    // Zeichnet alle Blöcke
    function renderBlocks(blocks) {
        for (const block of blocks) {
            setFillStyle(`--block-color-${block.val}`)
            fillBlock(block)
        }
    }

    // Zeichnet den Schläger
    function renderPaddle({ pos }) {
        setFillStyle('--paddle-color')
        fillRect(makePaddleRect(pos))
    }

    function renderScore({hits, sum}, isGameOver) {
        overlay.innerHTML = `
        ${isGameOver ? '<span class="game-over">Game Over</span>' : ''}
        <div class="score">
            <span>Hits: ${hits}</span>
            <span>Sum: ${sum}</span>
        </div>
        `
    }

    

  
    function checkWallCollisionSide(ball) {
        if (ball.x - ball.r < 0) {
            ball.x = ball.r
            return DIR_LEFT
        }
        else if (canvas.width < ball.x + ball.r) {
            ball.x = canvas.width - ball.r
            return DIR_RIGHT
        }
        else if (ball.y - ball.r < 0) {
            ball.y = ball.r
            return DIR_UP
        }
        else if (canvas.height < ball.y + ball.r) {
            ball.y = canvas.height - ball.r
            return DIR_DOWN
        }
    }

    // Verändert die Bewergungsrichtung des Balls.
    function bounce(ball, dir) {
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

    //
    function bounceFromWall(ball) {
        const dir = checkWallCollisionSide(ball)

        if (isDir(dir)) {
            bounce(ball, dir)
            return dir == DIR_DOWN
        }
    }

    // 
    function bounceFromPaddle(ball, {pos}) {
        const rect = makePaddleRect(pos)
        const dir = checkBallCollisionSide(ball, rect)
        if (isDir(dir)) {
            bounce(ball, dir)
        }
    }

    function bounceFromBlock(ball, block, score) {
        const rect = makeBlockRect(block)
        const dir = checkBallCollisionSide(ball, rect)

        if (isDir(dir)) {
            score.hits += 1
            score.sum += block.val

            block.val -= 1
            bounce(ball, dir)
        }
    }

    function bounceFromBlocks(ball, blocks, score) {
        for(const block of blocks) {
            bounceFromBlock(ball, block, score)
        }

        return blocks.filter((block) => 0 <= block.val)
    }


    function paddleSpeed(dir) {
        const baseSpeed = size * 16

        switch (dir) {
            case DIR_LEFT:
                return -baseSpeed
            case DIR_RIGHT:
                return +baseSpeed
            default:
                return 0
        }
    }

    function moveBall(ball, sec) {
        ball.x = Math.round(ball.x + ball.dx * sec)
        ball.y = Math.round(ball.y + ball.dy * sec)

        return ball
    }

    function movePaddle({ pos, dir }, sec) {
        return {
            pos: pos + paddleSpeed(dir) * sec,
            dir
        }
    }


    function updateTick(state, timePassed) {
        if(state.isGameOver)
            return state

        const sec = timePassed / 1000.0

        state.ball = moveBall(state.ball, sec)
        state.paddle = movePaddle(state.paddle, sec)
        bounceFromPaddle(state.ball, state.paddle)

        state.blocks = bounceFromBlocks(state.ball, state.blocks, state.score)
        state.isGameOver = bounceFromWall(state.ball)
        return state
    }

    function updateMove(state, dir) {
        state.paddle.dir = dir
        return state
    }

    return new MiniGame({
        state: makeRandomState(),
        render: (state) => {
            context.reset()
            renderBall(state.ball)
            renderBlocks(state.blocks)
            renderPaddle(state.paddle)
            renderScore(state.score, state.isGameOver)
        },
        update: (state, { type, args }) => {
            switch (type) {
                case "tick":
                    return updateTick(state, args)
                case "move":
                    return updateMove(state, args)
                case "reset":
                    return makeRandomState()
                default:
                    console.log("Unbekannte Eingabe: ", type)
                    return state
            }
        }
    })
}