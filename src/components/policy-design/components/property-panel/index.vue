<template>
  <div v-show="visible" class="PropertyPanel-container" v-resize.y>
    <div class="top-container flex justify-between px-4 py-2">
      <span class="flex items-center">
        <img :src="nodeConfig?.icon" width="20px" height="20px" class="mr-2" />
        <span>
          {{ nodeConfig?.label }}
        </span>
      </span>
      <span class="flex items-center flex-nowrap">
        <div class="w-32">节点名称</div>
        <el-input class="w-80" v-model="label" :maxlength="5"></el-input>
      </span>
    </div>
    <div class="from-body">
      <component
        v-if="data?.nodeType"
        :is="nodeTypeMap[data.nodeType].propertyPanel"
        :node="node"
      ></component>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { nodeTypeMap } from '../../config/nodeTypeMap.js'

const node = defineModel('node')
const visible = computed(() => {
  console.log('node.value', !!node.value)
  return !!node.value
})
const data = computed(() => {
  return node.value?.getModel()
})
const label = computed({
  get() {
    return data.value?.label
  },
  set(val) {
    window.graph.updateItem(node.value, {
      label: val
    })
  }
})
const nodeConfig = computed(() => {
  return nodeTypeMap[data.value?.nodeType || 'rule']
})
</script>

<style scoped lang="less">
.PropertyPanel-container {
  width: 100vw;
  height: 300px;
  background-color: #fff;
  position: fixed;
  bottom: 0;
  font-size: 14px;

  .top-container {
    border-bottom: 1px solid #dce3e8;
  }
}
</style>
