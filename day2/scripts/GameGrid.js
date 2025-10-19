class GameGrid {
    //#region constructor
    constructor({ rows, cols, cell }) {
        this.rows = rows
        this.cols = cols
        this.data = []

        for (let row = 0; row < rows; row++) {
            this.data[row] = [];
            for (let col = 0; col < cols; col++) {
                // Ask the cellFunction what should be here
                this.data[row][col] = cell({ row, col });
            }
        }
    }
    //#endregion

    //#region getData
    getData({ row, col }) {
        if (0 <= row && row < this.rows && 0 <= col && col < this.cols) {
            return this.data[row][col]
        }

        return undefined
    }
    //#endregion

    setData({ row, col, data }) {
        if (0 <= row && row < this.rows && 0 <= col && col < this.cols) {
            this.data[row][col] = data
        }
    }

    setGrid({ row, col, data }) {
        for(let dr = 0; dr < data.length; dr++) {
            const dataRow = data[dr]
            for(let dc = 0; dc < dataRow.length; dc++) {
                this.setData({
                    row: row + dr,
                    col: col + dc,
                    data: dataRow[dc]
                })
            }
        }
    }

    getCell({ row, col }) {
        return new GameCell({
            grid: this,
            row,
            col
        })
    }

    *cells() {
        for (let row = 0; row < this.rows; row++) {
            for (let col = 0; col < this.cols; col++) {
                yield this.getCell({ row, col })
            }
        }
    }

    *neighbors({ row, col }) {
        for (let dr = -1; dr <= 1; dr++) {
            for (let dc = -1; dc <= 1; dc++) {
                if (dr === 0 && dc === 0) continue; // Skip self
                yield this.getCell({
                    row: row + dr,
                    col: col + dc
                })
            }
        }
    }

    map(transform) {
        return new GameGrid({
            rows: this.rows,
            cols: this.cols,
            cell: ({row, col}) => transform(this.getCell({row, col}))
        })
    }
}

class GameCell {
    constructor({ grid, row, col }) {
        this.grid = grid
        this.row = row
        this.col = col
    }

    get data() {
        return this.grid.getData({
            row: this.row,
            col: this.col
        })
    }

    set(data) {
        this.grid.setData({
            row: this.row,
            col: this.col,
            data
        })
    }

    *neighbors() {
        yield* this.grid.neighbors({
            row: this.row,
            col: this.col
        })
    }
}