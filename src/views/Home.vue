<template>
  <div class="dnm-container">
    <div class="tool-container">
      <el-button @click="save">保存</el-button>
      <el-button @click="delNode('c1-1')">删除c1-1</el-button>
    </div>
    <div id="container" ref="container" />
  </div>
</template>

<script setup>
import G6 from '@antv/g6'
import { onMounted } from 'vue'
import register from './regiser.js'

let graph = null
onMounted(() => {
  const data = {
    id: 'root',
    label: 'root',
    children: [
      {
        id: 'c1',
        label: 'c1',
        children: [
          {
            id: 'c1-1',
            label: 'c1-1'
          },
          {
            id: 'c1-2',
            label: 'c1-2',
            children: [
              {
                id: 'c1-2-1',
                label: 'c1-2-1'
              },
              {
                id: 'c1-2-2',
                label: 'c1-2-2'
              }
            ]
          }
        ]
      },
      {
        id: 'c2',
        label: 'c2'
      },
      {
        id: 'c3',
        label: 'c3',
        children: [
          {
            id: 'c3-1',
            label: 'c3-1'
          },
          {
            id: 'c3-2',
            label: 'c3-2',
            children: [
              {
                id: 'c3-2-1',
                label: 'c3-2-1'
              },
              {
                id: 'c3-2-2',
                label: 'c3-2-2'
              },
              {
                id: 'c3-2-3',
                label: 'c3-2-3'
              }
            ]
          },
          {
            id: 'c3-3',
            label: 'c3-3'
          }
        ]
      }
    ]
  }

  const defaultStateStyles = {
    hover: {
      stroke: '#1879ff',
      lineDash: [2]
    },
    closest: {
      stroke: 'green'
    },
    active: {
      stroke: '#1879ff'
    }
  }

  const defaultNodeStyle = {
    fill: '#ffffff',
    stroke: '#000000',
    radius: 5,
    lineWidth: 0.5
  }

  const defaultEdgeStyle = {
    stroke: '#c1c6c9'
    // endArrow: {
    //   path: 'M 0,0 L 12, 6 L 9,0 L 12, -6 Z',
    //   fill: '#91d5ff',
    //   d: -20
    // }
  }

  const defaultLayout = {
    type: 'compactBox',
    direction: 'LR',
    getId: function getId(d) {
      return d.id
    },
    getHeight: function getHeight() {
      return 16
    },
    getWidth: function getWidth() {
      return 16
    },
    getVGap: function getVGap() {
      return 40
    },
    getHGap: function getHGap() {
      return 70
    }
  }

  const defaultLabelCfg = {
    style: {
      fill: '#565758',
      fontSize: 12
    }
  }

  const container = document.getElementById('container')
  const width = container.scrollWidth
  const height = container.scrollHeight - 1 || 500

  register()

  graph = new G6.TreeGraph({
    container: 'container',
    width,
    height,
    modes: {
      default: [
        'drag-canvas',
        'zoom-canvas',
        {
          type: 'drag-node',
          enableDelegate: true
        },
        'activate-node',
        'drag-node-connect'
      ]
    },
    defaultNode: {
      type: 'icon-node',
      size: [90, 30],
      style: defaultNodeStyle,
      labelCfg: defaultLabelCfg
    },
    defaultEdge: {
      style: defaultEdgeStyle
    },
    nodeStateStyles: defaultStateStyles,
    edgeStateStyles: defaultStateStyles,
    layout: defaultLayout
  })

  graph.data(data)
  graph.render()
  graph.fitView()

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

  if (typeof window !== 'undefined')
    window.onresize = () => {
      if (!graph || graph.get('destroyed')) return
      if (!container || !container.scrollWidth || !container.scrollHeight) return
      graph.changeSize(container.scrollWidth, container.scrollHeight)
    }
})
function save() {
  const data = graph.save()
  console.log('daat', data)
}
function delNode(id) {
  graph.removeChild(id)
}
</script>

<style scoped lang="less">
.dnm-container {
  height: 100vh;

  .tool-container {
    height: 60px;
    align-items: center;
    display: flex;
    justify-content: end;
    padding: 0 30px;
  }

  #container {
    height: calc(100% - 60px);
  }
}
</style>
