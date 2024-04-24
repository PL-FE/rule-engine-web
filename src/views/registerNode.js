import G6 from '@antv/g6'
import delImg from '@/assets/del.png'
import addImg from '@/assets/add.png'
import startImg from '@/assets/nodeType/start.png'
import ruleImg from '@/assets/nodeType/rule.png'

const nodeTypeMap = {
    start: startImg,
    rule: ruleImg,
}

export default function () {
    G6.registerNode(
        'icon-node',
        {
            options: {
                size: [60, 20],
                stroke: '#91d5ff',
                fill: '#91d5ff'
            },
            draw (cfg, group) {
                const styles = this.getShapeStyle(cfg)
                console.log('cfg', cfg);
                const { labelCfg = {} } = cfg
                const w = styles.width
                const h = styles.height

                const keyShape = group.addShape('rect', {
                    attrs: {
                        ...styles,
                        x: -w / 2,
                        y: -h / 2,
                        cursor: 'pointer'
                    },
                    draggable: true
                })
                group.addShape('rect', {
                    attrs: {
                        radius: [styles.radius, 0, 0, styles.radius],
                        fill: '#1879ff',
                        width: 6,
                        height: h,
                        x: -w / 2,
                        y: -h / 2,
                        cursor: 'pointer'
                    },
                    draggable: true
                })

                /**
                 * leftIcon 格式如下：
                 *  {
                 *    style: ShapeStyle;
                 *    img: ''
                 *  }
                 */

                // 如果不需要动态增加或删除元素，则不需要 add 这两个 marker

                group.addShape('image', {
                    attrs: {
                        x: w / 2 - 15,
                        y: -h / 2 - 15,
                        width: 15,
                        height: 15,
                        img: addImg,
                        cursor: 'pointer'
                    },
                    name: 'add-item',
                    visible: false
                })

                if (cfg.id !== 'root') {
                    group.addShape('image', {
                        attrs: {
                            x: w / 2 - 15 - 20,
                            y: -h / 2 - 15,
                            width: 15,
                            height: 15,
                            radius: [2, 4],
                            img: delImg,
                            cursor: 'pointer'
                        },
                        name: 'remove-item',
                        visible: false
                    })
                }
                if (cfg.label) {
                    group.addShape('text', {
                        attrs: {
                            ...labelCfg.style,
                            text: cfg.label,
                            x: 15 / 2,
                            y: 0,
                            textAlign: 'center',
                            textBaseline: 'middle',
                            cursor: 'pointer'
                        },
                        draggable: true
                    })
                    let nodeType = cfg.nodeType || 'rule'
                    if (cfg.id === 'root') {
                        nodeType = 'start'
                    }
                    group.addShape('image', {
                        attrs: {
                            x: 0 - 15 / 2 - w / 2 + 20,
                            y: 0 - 15 / 2,
                            width: 15,
                            height: 15,
                            img: nodeTypeMap[nodeType],
                            textAlign: 'center',
                            textBaseline: 'middle',
                        },
                        name: 'node-type-icon',
                    })
                }

                return keyShape
            },
            update: undefined
        },
        'rect'
    )
}