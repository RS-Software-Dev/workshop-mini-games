class MiniGame {
    #render
    #update

    constructor({ state, render, update }) {
        this.state = state

        this.#render = render
        this.#update = update
    }

    render() {
        this.#render(this.state)
    }

    update(event) {
        this.state = this.#update(this.state, event)
    }

    get isRunning() {
        return this.intervalId != null
    }

    run(interval = 1000) {
        this.stop()
        this.render()

        let next = () => {
            this.update()
            this.render()
        }

        this.intervalId = setInterval(next, interval)
    }

    stop() {
        if(this.isRunning) {
            clearInterval(this.intervalId)
        }
    }
}

