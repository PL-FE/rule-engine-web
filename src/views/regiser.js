import G6 from '@antv/g6'
import delImg from '@/assets/del.png'
import addImg from '@/assets/add.png'

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
                    name: 'add-item'
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
                        name: 'remove-item'
                    })
                }
                if (cfg.label) {
                    group.addShape('text', {
                        attrs: {
                            ...labelCfg.style,
                            text: cfg.label,
                            x: 0,
                            y: 0,
                            textAlign: 'center',
                            textBaseline: 'middle',
                            cursor: 'pointer'
                        },
                        draggable: true
                    })
                }

                return keyShape
            },
            update: undefined
        },
        'rect'
    )

    G6.registerBehavior('activate-node', {
        getDefaultCfg () {
            return {
                multiple: false
            }
        },
        getEvents () {
            return {
                'node:click': 'onNodeClick',
                'canvas:click': 'onCanvasClick'
            }
        },
        onNodeClick (e) {
            console.log('11', 11)
            const graph = this.graph
            const item = e.item
            if (item.hasState('active')) {
                graph.setItemState(item, 'active', false)
                return
            }
            // this 上即可取到配置，如果不允许多个 'active'，先取消其他节点的 'active' 状态
            if (!this.multiple) {
                this.removeNodesState()
            }
            // 置点击的节点状态 'active' 为 true
            graph.setItemState(item, 'active', true)
        },
        onCanvasClick (e) {
            // shouldUpdate 可以由用户复写，返回 true 时取消所有节点的 'active' 状态，即将 'active' 状态置为 false
            if (this.shouldUpdate(e)) {
                this.removeNodesState()
            }
        },
        removeNodesState () {
            this.graph.findAllByState('node', 'active').forEach((node) => {
                this.graph.setItemState(node, 'active', false)
            })
        }
    })

    G6.registerBehavior('drag-node-connect', {
        getDefaultCfg () {
            return {
                minDisNode: undefined
            }
        },
        getEvents () {
            return {
                'node:dragstart': 'onNodeDragstart',
                'node:drag': 'onNodeDrag',
                'node:dragend': 'onNodeDragend'
            }
        },
        onNodeDragstart () {
            this.minDisNode = undefined
        },
        onNodeDrag (e) {
            this.minDisNode = undefined
            const item = e.item
            const model = item.getModel()
            const nodes = this.graph.getNodes()
            let minDis = Infinity
            nodes.forEach((inode) => {
                this.graph.setItemState(inode, 'closest', false)
                const node = inode.getModel()
                if (node.id === model.id) return
                const dis = (node.x - e.x) * (node.x - e.x) + (node.y - e.y) * (node.y - e.y)
                if (dis < minDis) {
                    minDis = dis
                    this.minDisNode = inode
                }
            })
            console.log('minDis', minDis, this.minDisNode)
            if (minDis < 2000) this.graph.setItemState(this.minDisNode, 'closest', true)
            else this.minDisNode = undefined
        },
        onNodeDragend (e) {
            if (!this.minDisNode) {
                return
            }
            const item = e.item
            const id = item.getID()
            const data = this.graph.findDataById(id)

            let isDescent = false
            const minDisNodeId = this.minDisNode.getID()
            console.log('dragend', minDisNodeId, isDescent, data, id)

            G6.Util.traverseTree(data, (d) => {
                if (d.id === minDisNodeId) isDescent = true
            })
            if (isDescent) {
                return
            }

            this.graph.removeChild(id)

            setTimeout(() => {
                const newParentData = this.graph.findDataById(minDisNodeId)
                let newChildren = newParentData?.children || []
                if (newChildren) newChildren.push(data)
                else newChildren = [data]
                this.graph.updateChildren(newChildren, minDisNodeId)
            }, 600)
        },
    })
}