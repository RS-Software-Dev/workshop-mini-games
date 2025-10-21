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

    run({interval }) {
        this.stop()
        this.render()

        if(interval) {
            this.intervalId = setInterval(() => this.handle("tick", interval), interval)
        }
        else {
            
            requestAnimationFrame((t0) => {
                let lastTime = t0
                let tick = (time) => {
                    const timePassed = time - lastTime
                    
                    if (timePassed < 200)
                        this.handle("tick", timePassed)

                    lastTime = time
                }

                function loop(time) {
                    tick(time)
                    requestAnimationFrame(loop)
                }

                requestAnimationFrame(loop)
            })
        }
    }

    handle(type, args = {}) {
        this.update({ type, args})
        this.render()
    }
}

