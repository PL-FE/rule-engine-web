export default function (graph) {
    graph.on('node:mouseenter', (evt) => {
        const { item } = evt
        graph.setItemState(item, 'hover', true)
    })

    graph.on('node:mouseleave', (evt) => {
        const { item } = evt
        graph.setItemState(item, 'hover', false)
    })

    graph.on('node:click', (evt) => {
        console.log('evt', evt)
        const { item, target } = evt
        const targetType = target.get('type')
        const name = target.get('name')

        // 增加元素
        if (targetType === 'image') {
            const model = item.getModel()
            if (name === 'add-item') {
                if (!model.children) {
                    model.children = []
                }
                const id = `n-${Math.random()}`
                model.children.push({
                    id,
                    label: id.substr(0, 8),
                    leftIcon: {
                        style: {
                            fill: '#e6fffb',
                            stroke: '#e6fffb'
                        },
                        img: 'https://gw.alipayobjects.com/mdn/rms_f8c6a0/afts/img/A*Q_FQT6nwEC8AAAAAAAAAAABkARQnAQ'
                    }
                })
                graph.updateChild(model, model.id)
            } else if (name === 'remove-item') {
                console.log('remove-item', 22)
                graph.removeChild(model.id)
            }
        }
    })
}