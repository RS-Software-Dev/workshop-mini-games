class CanvasRenderer {
    constructor({ canvas, tileSize, draw }) {
        this.canvas = canvas
        this.tileSize = tileSize
        this.context = canvas.getContext('2d')
        this.draw = draw.bind(this.context)


        this.context.fillRoundRect = function(x, y, w, h, r) {
            this.beginPath()
            this.roundRect(x, y, w, h, r)
            this.fill()
            this.closePath()
        }.bind(this.context)
    }

    render(state) {
        this.context.reset()
        this.draw(state)
    }
}

CanvasRenderer.auto = ({ rows, cols, tileSize, draw }) => {
    const canvas = document.createElement('canvas')
    canvas.width = cols * tileSize
    canvas.height = rows * tileSize

    return new CanvasRenderer({
        canvas,
        tileSize,
        draw
    })
}

CanvasRenderer.autoAppend = ({ parent, rows, cols, tileSize, draw }) => {
    const renderer = CanvasRenderer.auto({ rows, cols, tileSize, draw })
    parent.append(renderer.canvas)
    return renderer
}