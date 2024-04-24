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
import registerBehavior from './registerBehavior.js'
import registerNode from './registerNode.js'
import eventListener from './eventListener.js'
import data from './data.js'

import {
  defaultStateStyles,
  defaultNodeStyle,
  defaultEdgeStyle,
  defaultLayout,
  defaultLabelCfg
} from './defaultConfig'

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

  eventListener(graph)

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
./registerNode.js
