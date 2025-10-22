# Notizen: Brick Break

## Spielfeld zeichnen
15:50 - 16:05

// Zeichnet den Ball.
function renderBall(ball) {
    setFillStyle('--ball-color')
    fillCircle(ball)
}

// Zeichnet einen Block
function renderBlock(block) {
    setFillStyle(`--block-color-${block.val}`)
    fillRect(makeBlockRect(block))
}

// Zeichnet alle Blöcke.
function renderBlocks(blocks) {
    for (const block of blocks) {
        renderBlock(block)
    }
}

// Zeichnet den Schläger.
function renderPaddle(paddle) {
    setFillStyle('--paddle-color')
    fillRect(makePaddleRect(paddle))
}

// Zeichnet die Punkte auf das Overlay.
function renderScore({hits, sum}, isGameOver) {
    overlay.innerHTML = `
    ${isGameOver ? '<span class="game-over">Game Over</span>' : ''}
    <div class="score">
        <span>Hits: ${hits}</span>
        <span>Sum: ${sum}</span>
    </div>
    `
}

## Den Ball bewegen
16:05 - 16:20

// Bewegt den Ball basierend auf der vergangenen Zeit.
function moveBall(ball, sec) {
    ball.x = Math.round(ball.x + ball.dx * sec)
    ball.y = Math.round(ball.y + ball.dy * sec)

    return ball
}

## Kollision mit Wand
16:20 - 16:35

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

// Lässt den Ball von der Wand abprallen.
function bounceFromWall(ball) {
    const dir = checkWallCollisionSide(ball, canvas)

    if (isDir(dir)) {
        bounce(ball, dir)
        return dir == DIR_DOWN
    }
}

## 10 MIN PAUSE
16:35 - 16:45

## Den Schläger bewegen
16:45 - 17:00

// Berechnet die Geschwindigkeit des Schlägers, basierend auf einer Richtung.
function paddleSpeed(dir) {
    switch (dir) {
        case DIR_LEFT:
            return -speed
        case DIR_RIGHT:
            return +speed
        default:
            return 0
    }
}

// Bewegt den Schläger basierend auf der vergangenen Zeit.
function movePaddle({ pos, dir }, sec) {
    return {
        pos: pos + paddleSpeed(dir) * sec,
        dir
    }
}

## Kollision mit dem Schläger
17:00 - 17:15

// Lässt den Ball vom Schläger abprallen.
function bounceFromPaddle(ball, paddle) {
    const rect = makePaddleRect(paddle)
    const dir = checkBallCollisionSide(ball, rect)
    if (isDir(dir)) {
        bounce(ball, dir)
    }
}

## Kollision mit Blöcken
17:15 - 17:30

// Lässt den Ball von einem Block abprallen.
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

// Lässt den Ball von allen Blöcken abprallen.
function bounceFromBlocks(ball, blocks, score) {
    for(const block of blocks) {
        bounceFromBlock(ball, block, score)
    }

    return blocks.filter((block) => 0 <= block.val)
}

## 5 MIN PAUSE
17:30 - 17:35

## Freies Üben/ Bonusaufgaben
17:35 - 17:55