
// Erstellt ein Rechtec
function makeRect(x, y, w, h) {
    return { x, y, w, h }
}



// Sorgt dafür das der Wert `val` innerhalb von `min` und `max` bleibt.
function clamp(val, min, max) {
    return Math.max(min, Math.min(val, max))
}

// Überprüft ob ein Kreis und ein Rechteck sich schneiden.
function checkBallCollision(ball, rect) {
    const nearestX = clamp(ball.x, rect.x, rect.x + rect.w)
    const nearestY = clamp(ball.y, rect.y, rect.y + rect.h)
    const dx = ball.x - nearestX
    const dy = ball.y - nearestY
    return dx * dx + dy * dy <= ball.r * ball.r
}


// Berechnet die Seite des Balles auf der eine Kollision statt findet
// (oder `null` falls keine collisiont statt findet.
function checkBallCollisionSide(ball, rect) {
    if (!checkBallCollision(ball, rect)) return null

    // Abstand zu den Seiten des Kreises
    const distUp = Math.abs(ball.y - rect.y)
    const distDown = Math.abs(rect.y + rect.h - ball.y)
    const distLeft = Math.abs(ball.x - rect.x)
    const distRight = Math.abs(rect.x + rect.w - ball.x)

    // Kleinster Abstand
    const minDist = Math.min(distUp, distDown, distLeft, distRight)

    switch (minDist) {
        case distUp:
            ball.y -= distUp
            return DIR_UP
        case distDown:
            ball.y += distDown
            return DIR_DOWN
        case distLeft:
            ball.x -= distLeft
            return DIR_LEFT
        case distRight:
            ball.x += distRight
            return DIR_RIGHT
    }
}

function makeRandomBlock(row, col) {
    return {
        row,
        col,
        val: Math.floor(Math.random() * 4) + 1
    }
}


// Überprüft ob der Ball eine der Wände berührt.
function checkWallCollisionSide(ball, {width, height}) {
    if (ball.x - ball.r < 0) {
        ball.x = ball.r
        return DIR_LEFT
    }
    else if (width < ball.x + ball.r) {
        ball.x = width - ball.r
        return DIR_RIGHT
    }
    else if (ball.y - ball.r < 0) {
        ball.y = ball.r
        return DIR_UP
    }
    else if (height < ball.y + ball.r) {
        ball.y = height - ball.r
        return DIR_DOWN
    }
}