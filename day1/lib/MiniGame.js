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

        this.intervalId = setInterval(() => this.tick(), interval)
    }

    tick() {
        this.update()
        this.render()
    }

    stop() {
        if(this.isRunning) {
            clearInterval(this.intervalId)
        }
    }
}

