const DIR_UP = 1
const DIR_DOWN = -1
const DIR_LEFT = 2
const DIR_RIGHT = -2

// Überpürft ob etwas eine Richtung ist.
function isDir(any) {
    return any == DIR_UP || any == DIR_DOWN || any == DIR_LEFT || any == DIR_RIGHT
}

// Erstellt eine Position
function makePos(row, col) {
    return {row, col}
}

// Wandelt eine Richtung in eine Position um.
function dirToPos(dir) {
    switch(dir) {
        case DIR_UP:
            return makePos(-1, 0)
        case DIR_DOWN:
            return makePos(+1, 0)
        case DIR_LEFT:
            return makePos(0, -1)
        case DIR_RIGHT:
            return makePos(0, +1)
        default:
            return makePos(0, 0)
    }
}

// Übersetzt eine Richtung zu Text.
function dirToStr(dir) {
    switch(dir) {
        case DIR_UP:
            return "UP"
        case DIR_DOWN:
            return "DOWN"
        case DIR_LEFT:
            return "LEFT"
        case DIR_RIGHT:
            return "RIGHT"
        default:
            return ""
    }
}


// Addiert zwei Positionen.
function addPos(a, b) {
    return makePos(a.row + b.row, a.col + b.col)
}

// Addiert eine Position mit einer Richtung.
function addDir(a, b) {
    return addPos(a, dirToPos(b))
}

// Überprüft ob sich zwei Positionen gleichen.
function isSamePos(a, b) {
    return a.row == b.row && a.col == b.col
}

function listUpTo(num) {
    return new Array(num).fill(null).map((_, i) => i)
}

// Erstellt ein Hilfsobjekt für ein Gitter.
function makeGrid(rows, cols) {
    return {
        rows,
        cols,

        // Erzeugt eine zufällige Position innerhalb des Gitters.
        makeRandomPos: () => makePos(
            Math.floor(Math.random() * rows), 
            Math.floor(Math.random() * cols)
        ),

        // Fängt Positionen ein, die außerhalb des Gitters liegen.
        keepInBounds: ({ row, col }) => makePos(
            row < 0 ? row + rows : row % rows, 
            col < 0 ? col + cols : col % cols
        ),

        listRows: () => listUpTo(rows),
        listCols: () => listUpTo(cols)
    }
}
