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

    update(input) {
        this.state = this.#update(this.state, input)
    }

    get isRunning() {
        return this.intervalId != null
    }

    stop() {
        if(this.isRunning) {
            clearInterval(this.intervalId)
        }
    }

    run(interval = 1000) {
        this.stop()
        this.render()

        this.intervalId = setInterval(() => this.handle("tick"), interval)
    }

    handle(input) {
        this.update(input)
        this.render()
    }
}

