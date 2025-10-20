const DIR_UP = 1
const DIR_DOWN = -1
const DIR_LEFT = 2
const DIR_RIGHT = -2

function isDir(any) {
    return any == DIR_UP || any == DIR_DOWN || any == DIR_LEFT || any == DIR_RIGHT
}

function makePos(row, col) {
    return {row, col}
}

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


function addPos(a, b) {
    return makePos(a.row + b.row, a.col + b.col)
}

function addDir(a, b) {
    return addPos(a, dirToPos(b))
}

function isSamePos(a, b) {
    return a.row == b.row && a.col == b.col
}