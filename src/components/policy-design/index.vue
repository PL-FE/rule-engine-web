<template>
  <div class="dnm-container">
    <div id="container" ref="container" />
    <PropertyPanel v-model:node="propertyPanelData" />
    <Menu v-show="!!menuData" v-model:menuData="menuData" />
  </div>
</template>

<script setup>
import G6 from '@antv/g6'
import { onMounted, ref } from 'vue'
import registerBehavior from './config/registerBehavior.js'
import registerNode from './config/registerNode.js'
import PropertyPanel from './components/property-panel/index.vue'
import Menu from './components/menu/index.vue'
import { usePolicyProjectStore } from '@/stores/policy-project.js'
const policyProjectStore = usePolicyProjectStore()

import {
  defaultStateStyles,
  defaultNodeStyle,
  defaultEdgeStyle,
  defaultLayout,
  defaultLabelCfg
} from './config/defaultConfig'

const propertyPanelData = ref(null)
const menuData = ref(null)
let graph = null

onMounted(() => {
  // const container = document.querySelector('#container')
  // const width = container.scrollWidth
  // const height = container.scrollHeight - 1 || 500
  registerBehavior()
  registerNode()
  graph = new G6.TreeGraph({
    container: 'container',
    modes: {
      default: [
        'drag-canvas',
        // 'zoom-canvas',
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

  graph.data(policyProjectStore.policyProjectData?.data)
  graph.render()
  graph.fitCenter()

  eventListener()

  if (typeof window !== 'undefined')
    window.onresize = () => {
      if (!graph || graph.get('destroyed')) return
      if (!container || !container.clientWidth || !container.clientHeight) return
      graph.changeSize(container.clientWidth, container.clientHeight)
    }
})

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
    propertyPanelData.value = null
  })
  // 鼠标右键
  graph.on('node:contextmenu', (evt) => {
    console.log('evt', evt)
    evt.preventDefault()
    hadnleShowMenu(evt)
  })
  window.addEventListener('click', () => {
    menuData.value = null
  })

  graph.on('node:click', (evt) => {
    console.log('click', evt)
    const { item, target } = evt
    handlePropertyPanel(item)
  })
}

function hadnleShowMenu({ clientX, clientY, item }) {
  menuData.value = {
    x: clientX,
    y: clientY - 60, // 60为顶部菜单的高度,
    node: item,
    graph
  }
}
function handlePropertyPanel(node) {
  const model = node.getModel()
  if (model.id === 'root') {
    propertyPanelData.value = null
    return
  }
  propertyPanelData.value = node
}
</script>

<style scoped lang="less">
.dnm-container {
  width: 100%;
  height: 100%;
  background-color: #f4f7f9;
  position: relative;
  overflow: hidden;

  #container {
    height: 100vh;
    overflow: hidden;
  }
}
</style>
