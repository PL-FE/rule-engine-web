import G6 from '@antv/g6'

export default function () {

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