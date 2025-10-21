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