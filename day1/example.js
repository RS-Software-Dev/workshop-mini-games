function makeGameOfLife({ canvas, rows, cols, size }) {
    canvas.width = cols * size
    canvas.height = rows * size

    const context = canvas.getContext("2d")

    function updateGrid(grid) {
        return new GameGrid({
            rows,
            cols,
            cell: ({ row, col }) => {
                let aliveNeighbors = 0
                for (const neighbor of grid.neighbors({ row, col })) {
                    if (neighbor.data) aliveNeighbors++
                }

                const isAlive = grid.data[row][col]

                // Game of Life rules
                if (isAlive) {
                    return aliveNeighbors === 2 || aliveNeighbors === 3
                } else {
                    return aliveNeighbors === 3
                }
            }
        })
    }

    function renderGrid(grid) {
        context.reset()

        const style = getComputedStyle(canvas)
        const colorAlive = style.getPropertyValue('--color-alive')
        const colorDead = style.getPropertyValue('--color-dead')

        for (const cell of grid.cells()) {
            if (cell.data) {
                context.fillStyle = colorAlive
            }
            else {
                context.fillStyle = colorDead
            }

            context.fillRect(size * cell.col, size * cell.row, size, size)
        }
    }


    const game = new MiniGame({
        state: {
            generation: 0,
            grid: new GameGrid({
                rows,
                cols,
                cell: () => Math.random() <= 0.5
            })
        },
        render: ({ generation, grid }) => {
            console.log("Generation: " + generation)
            renderGrid(grid)
        },
        update: ({ generation, grid }) => ({
            generation: generation + 1,
            grid: updateGrid(grid)
        })
    })

    // setup on click handler
    canvas.addEventListener('click', (event) => {
        console.log(event)

        // determine which cell was clicked
        const col = Math.floor(event.layerX / size)
        const row = Math.floor(event.layerY / size)

        // toggle cell in the current grid
        const { grid } = game.state
        grid.data[row][col] = !grid.data[row][col]

        // immediately re-render
        game.render()
    })

    return game
}