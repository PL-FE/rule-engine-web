<template>
  <div class="dnm-container">
    <div class="tool-meun-container">
      <el-button @click="save">保存</el-button>
    </div>
    <div id="container" ref="container" />
    <PropertyPanel v-model:node="propertyPanelData" />
    <Menu v-show="!!menuXY" :x="menuXY?.x" :y="menuXY?.y" />
  </div>
</template>

<script setup>
import G6 from '@antv/g6'
import { onMounted, ref } from 'vue'
import registerBehavior from './config/registerBehavior.js'
import registerNode from './config/registerNode.js'
import data from './config/data.js'
import PropertyPanel from './components/property-panel/index.vue'
import Menu from './components/menu/index.vue'

import {
  defaultStateStyles,
  defaultNodeStyle,
  defaultEdgeStyle,
  defaultLayout,
  defaultLabelCfg
} from './config/defaultConfig'

const propertyPanelData = ref(null)
const menuXY = ref(null)
let graph = null

onMounted(() => {
  // const container = document.querySelector('#container')
  // const width = container.scrollWidth
  // const height = container.scrollHeight - 1 || 500
  registerBehavior()
  registerNode()

  graph = new G6.TreeGraph({
    container: 'container',
    fitView: true,
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
      type: 'baseNode',
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
  window.graph = graph

  graph.data(data)
  graph.render()
  graph.fitView()

  eventListener()

  if (typeof window !== 'undefined')
    window.onresize = () => {
      if (!graph || graph.get('destroyed')) return
      if (!container || !container.clientWidth || !container.clientHeight) return
      graph.changeSize(container.clientWidth, container.clientHeight)
    }
})
function save() {
  const data = graph.save()
  console.log('data', data)
}

function eventListener() {
  // 鼠标移入目标元素上方，鼠标移到其后代元素上时会触发
  graph.on('node:mouseenter', (evt) => {
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
    console.log('click', evt)
    const { item, target } = evt
    handleToolAction(item, target)
    handlePropertyPanel(item)
  })
}

function handlePropertyPanel(node) {
  const model = node.getModel()
  if (model.id === 'root') {
    propertyPanelData.value = null
    return
  }
  propertyPanelData.value = node
}

/**
 * 处理按钮的点击行为
 * @param {Node} node
 * @param {Shape} shape
 */
function handleToolAction(node, shape) {
  const name = shape.get('name')
  const targetType = shape.get('type')
  toggleToolAction(node)
  if (targetType === 'image') {
    const model = node.getModel()
    if (name === 'add-item') {
      // TODO: 左键菜单
      // const size = node.getBBox()
      // console.log('size', size)
      // menuXY.value = graph.getClientByPoint(
      //   size.centerX + size.width / 2,
      //   size.centerY - size.height / 2
      // )
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
  background-color: #f4f7f9;
  .tool-meun-container {
    height: 60px;
    align-items: center;
    display: flex;
    justify-content: end;
    padding: 0 30px;
    position: fixed;
    right: 0;
  }

  #container {
    height: 100vh;
    overflow: hidden;
  }
}
</style>
