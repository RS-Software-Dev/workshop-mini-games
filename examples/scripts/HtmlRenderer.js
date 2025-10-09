class HtmlRenderer {
    constructor({ container, template }) {
        this.container = container
        this.template = template
    }

    render(state) {
        this.container.innerHTML = this.template(state)
    }
}

HtmlRenderer.append = ({ parent, template }) => {
    let div = document.createElement('div')
    parent.append(div)
    return new HtmlRenderer({
        container: div,
        template: template
    })
}