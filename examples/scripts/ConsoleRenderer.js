class ConsoleRenderer {
    constructor({ alive, dead }) {
        this.alive = alive
        this.dead = dead
    }

    render(grid) {
        let output = ''

        for (let row = 0; row < grid.rows; row++) {
            for (let col = 0; col < grid.cols; col++) {
                if (grid.getCell({ row: row, col: col })) {
                    output = output + this.alive;  // alive
                } else {
                    output = output + this.dead;  // dead
                }
            }
            output = output + '\n';
        }

        console.log(output)
    }
}