class GameLoop {
    constructor({ launch, render, update }) {
        this.launch = launch
        this.render = render
        this.update = update
    }

    run() {
        let state = this.launch()
        this.render(state)

        let next = () => {
            state = this.update(state)
            this.render(state)
        }

        setInterval(next, 1000)
    }
}