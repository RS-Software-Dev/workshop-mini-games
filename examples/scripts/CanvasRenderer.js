class CanvasRenderer {
    constructor({ canvas, draw }) {
        this.canvas = canvas
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

CanvasRenderer.create = ({ width, height, draw }) => {
    const canvas = document.createElement('canvas')
    canvas.width = width
    canvas.height = height

    return new CanvasRenderer({
        canvas,
        draw
    })
}

CanvasRenderer.createInside = ({ parent, width, height, draw }) => {
    const renderer = CanvasRenderer.create({ width, height, draw })
    parent.append(renderer.canvas)
    return renderer
}