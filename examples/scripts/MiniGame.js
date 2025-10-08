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

    run(interval = 1000) {
        this.render()

        let next = () => {
            this.update()
            this.render()
        }

        return setInterval(next, interval)
    }
}