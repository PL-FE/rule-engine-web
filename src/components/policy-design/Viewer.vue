<template>
  <div class="dnm-container">
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
import PropertyPanel from './components/property-panel/index.vue'
import Menu from './components/menu/index.vue'
import { usePolicyProjectStore } from '@/stores/policy-project.js'
const policyProjectStore = usePolicyProjectStore()
const { policyProjectData } = policyProjectStore

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
      default: ['drag-canvas', 'zoom-canvas', 'activate-node']
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

  graph.data(policyProjectData.data)
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

  graph.on('node:click', (evt) => {
    console.log('click', evt)
    const { item, target } = evt
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
../../stores/data.js
