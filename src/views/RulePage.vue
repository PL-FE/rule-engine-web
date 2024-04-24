<template>
  <div class="dnm-container">
    <div class="tool-meun-container">
      <el-button @click="save">保存</el-button>
    </div>
    <div id="container" ref="container" />
    <PropertyPanel v-model:node="propertyPanelData" />
  </div>
</template>

<script setup>
import G6 from '@antv/g6'
import { onMounted, ref } from 'vue'
import registerBehavior from './registerBehavior.js'
import registerNode from './registerNode.js'
import data from './data.js'
import PropertyPanel from './PropertyPanel.vue'

import {
  defaultStateStyles,
  defaultNodeStyle,
  defaultEdgeStyle,
  defaultLayout,
  defaultLabelCfg
} from './defaultConfig'

const propertyPanelData = ref(null)

let graph = null
onMounted(() => {
  const container = document.getElementById('container')
  const width = container.scrollWidth
  const height = container.scrollHeight - 1 || 500

  registerBehavior()
  registerNode()

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

  eventListener()

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

function eventListener() {
  // 鼠标移入目标元素上方，鼠标移到其后代元素上时会触发
  graph.on('node:mouseenter', (evt) => {
    console.log('evt', evt)
    const { item } = evt
    graph.setItemState(item, 'hover', true)
  })
  // 鼠标移出目标元素后触发
  graph.on('node:mouseleave', (evt) => {
    const { item } = evt
    graph.setItemState(item, 'hover', false)
  })

  // 鼠标左键单击画布时触发
  graph.on('canvas:click', () => {
    toggleToolAction()
    propertyPanelData.value = null
  })

  graph.on('node:click', (evt) => {
    console.log('evt', evt)
    const { item, target } = evt
    handleToolAction(item, target)
    handlePropertyPanel(item)
  })
}

function handlePropertyPanel(node) {
  propertyPanelData.value = node
}

/**
 * 处理按钮的点击行为
 * @param {Node} node
 * @param {Shape} shape
 */
function handleToolAction(node, shape) {
  toggleToolAction(node)

  const name = shape.get('name')
  const targetType = shape.get('type')
  if (targetType === 'image') {
    const model = node.getModel()
    if (name === 'add-item') {
      if (!model.children) {
        model.children = []
      }
      const id = `n-${Math.random()}`
      model.children.push({
        id,
        label: id.substr(0, 8),
        nodeType: 'rule'
      })
      graph.updateChild(model, model.id)
    } else if (name === 'remove-item') {
      console.log('remove-item', 22)
      graph.removeChild(model.id)
    }
  }
}

/**
 * 找到当前节点下的工具按钮
 * @param {Node} ndoe
 * @returns {Node} child
 */
function findToolAction(ndoe) {
  const group = ndoe.getContainer()
  const child = group.findAll(function (item) {
    return ['add-item', 'remove-item'].includes(item.cfg.name) // 找到首个填充为红色的图形
  })
  return child
}

/**
 * 切换node下工具按钮的显示和隐藏
 * @param {Node} Node
 */
function toggleToolAction(Node) {
  const nodes = graph.getNodes()
  // 先隐藏所有的
  nodes.forEach((node) => {
    const child = findToolAction(node)
    child.forEach((c) => c.cfg.visible && c.hide())
  })
  if (!Node) {
    return
  }
  // 再显示当前点击的
  const child = findToolAction(Node)
  child.forEach((c) => (c.cfg.visible ? c.hide() : c.show()))
}
</script>

<style scoped lang="less">
.dnm-container {
  height: 100vh;
  background-color: #f4f7f9;
  .tool-meun-container {
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
