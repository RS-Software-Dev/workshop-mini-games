class CanvasRenderer {
    constructor({ canvas, tileSize }) {
        this.canvas = canvas
        this.tileSize = tileSize
        this.context = canvas.getContext('2d')
    }

    centerInCell({ row, col, draw }) {
        this.context.save()
        this.context.translate(
            row * this.tileSize + this.tileSize / 2,
            col * this.tileSize + this.tileSize / 2
        )

        draw()
        this.context.restore()
    }

    fillQuad(size) {
        this.context.beginPath()
        this.context.roundRect(-size / 2, -size / 2, size, size, size / 4)
        this.context.fill()
        this.context.closePath()
    }

    render(grid) {
        this.context.reset()
        const style = getComputedStyle(this.canvas)
        const colorAlive = style.getPropertyValue('--color-alive')
        const colorDead = style.getPropertyValue('--color-dead')

        for (const { row, col, val } of grid.cells()) {
            this.centerInCell({
                row,
                col,
                draw: () => {

                    if (val) {
                        this.context.fillStyle = colorAlive
                    } else {
                        this.context.fillStyle = colorDead
                    }

                    this.fillQuad(this.tileSize - 2)
                }
            })
        }
    }
}

CanvasRenderer.auto = ({ rows, cols, tileSize }) => {
    const canvas = document.createElement('canvas')
    canvas.width = rows * tileSize
    canvas.height = cols * tileSize

    return new CanvasRenderer({
        canvas: canvas,
        tileSize: tileSize
    })
}

CanvasRenderer.autoAppend = ({ parent, rows, cols, tileSize }) => {
    const renderer = CanvasRenderer.auto({ rows, cols, tileSize })
    parent.append(renderer.canvas)
    return renderer
}