class HtmlRenderer {
    constructor({ parent, template }) {
        this.parent = parent
        this.template = template
    }

    render(state) {
        this.parent.innerHTML = this.template(state)
    }
}

HtmlRenderer.append = ({ parent, template }) => {
    let div = document.createElement('div')
    parent.append(div)
    return new HtmlRenderer({
        parent: div,
        template: template
    })
}