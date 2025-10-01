class GameGrid {
    constructor({ rows, cols, cell }) {
        this.rows = rows
        this.cols = cols
        this.vals = []

        for (let row = 0; row < rows; row++) {
            this.vals[row] = [];
            for (let col = 0; col < cols; col++) {
                // Ask the cellFunction what should be here
                this.vals[row][col] = cell({ row, col });
            }
        }
    }

    getCell({ row, col }) {
        if (0 <= row && row < this.rows && 0 <= col && col < this.cols) {
            return this.vals[row][col]
        }

        return undefined
    }

    *cells() {
        for (let row = 0; row < this.rows; row++) {
            for (let col = 0; col < this.cols; col++) {
                yield {
                    row,
                    col,
                    val: this.getCell({ row, col })
                }
            }
        }
    }

    *neighbors({ row, col }) {
        for (let dr = -1; dr <= 1; dr++) {
            for (let dc = -1; dc <= 1; dc++) {
                if (dr === 0 && dc === 0) continue; // Skip self
                yield {
                    row: row + dr,
                    col: col + dc,
                    val: this.getCell({ row: row + dr, col: col + dc })
                }
            }
        }
    }
}