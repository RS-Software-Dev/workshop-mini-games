function makeBrickBreakGame({ canvas, overlay, rows, cols, size }) {
    canvas.width = cols * size
    canvas.height = rows * size

    const context = canvas.getContext("2d")
    const grid = makeGrid(rows, cols)
    const speed = size * 16


    //////
    // Zustand
    //////

    // Erstellt einen zufällifgen Ball.
    function makeRandomBall() {
        return {
            x: cols * size / 2,
            y: rows * size * 3 / 4,
            r: size / 2,
            dx: speed * (Math.random() <= 0.5 ? -1 : +1),
            dy: speed,
        }
    }

    // Erstellt eine Reihe von Blöcken.
    function makeRandomBlockRow(row) {
        return grid.listCols().map(col => makeRandomBlock(row, col))
    }

    // Erstellt eine Liste von zufälligen Blöcken.
    function makeRandomBlocks() {
        return listUpTo(rows / 2).flatMap(makeRandomBlockRow)
    }

    // Erstellt einen zufälligen Spielezustand.
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


    //////
    // Zeichnen
    //////

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
    function makePaddleRect({pos}) {
        const w = size * 8
        const h = size

        const x = pos - w / 2
        const y = (rows - 4) * size

        return makeRect(x, y, w, h)
    }

    // Erstellt die Form eines Blockes.
    function makeBlockRect({ row, col }) {
        return makeRect(col * size, row * size, size, size)
    }

    // Zeichnet den Ball.
    function renderBall(ball) {
    }

    // Zeichnet einen Block
    function renderBlock(block) {
        
    }

    // Zeichnet alle Blöcke.
    function renderBlocks(blocks) {
        
    }

    // Zeichnet den Schläger.
    function renderPaddle(paddle) {
        
    }

    // Zeichnet die Punkte auf das Overlay.
    function renderScore({hits, sum}, isGameOver) {
        
    }


    //////
    // Verändern
    //////

    // Verändert die Bewergungsrichtung des Balls.
    function bounce(ball, dir) {
        
    }

    // Lässt den Ball von der Wand abprallen.
    function bounceFromWall(ball) {
        
    }

    // Lässt den Ball vom Schläger abprallen.
    function bounceFromPaddle(ball, paddle) {
        
    }

    // Lässt den Ball von einem Block abprallen.
    function bounceFromBlock(ball, block, score) {

    }

    // Lässt den Ball von allen Blöcken abprallen.
    function bounceFromBlocks(ball, blocks, score) {
        return blocks
    }

    

    // Bewegt den Ball basierend auf der vergangenen Zeit.
    function moveBall(ball, sec) {
        return ball
    }

    // Berechnet die Geschwindigkeit des Schlägers, basierend auf einer Richtung.
    function paddleSpeed(dir) {
        return 0
    }

    // Bewegt den Schläger basierend auf der vergangenen Zeit.
    function movePaddle(paddle, sec) {
        return paddle
    }


    //////
    // Komposition
    //////

    function updateTick(state, timePassed) {
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