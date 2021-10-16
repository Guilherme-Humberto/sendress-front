import HandleBars from 'handlebars'

const compileHTMLContent = ({ ...props }) => {
    const template = HandleBars.compile(props.content)

    const keys = [props.data]

    for(let x = 0; x < keys.length; x++) {
        const variable = keys[x]
        return template({ ...variable })
    }

}

export { compileHTMLContent }