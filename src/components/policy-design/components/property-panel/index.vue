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
    <div class="from-body flex">
      <el-scrollbar class="from-var w-1/5 min-h-full">
        <div
          class="fieid my-3 flex"
          v-for="varItem in policyProjectStore.varList"
          :key="varItem.key"
        >
          <el-tag type="primary" class="mx-3">变量</el-tag>
          <el-tooltip :content="varItem.remark" :disabled="!varItem.remark" placement="right">
            <el-tag type="info " class="flex-1 !justify-start">{{ varItem.label }}</el-tag>
          </el-tooltip>
          <el-tag type="warning" class="mx-3 w-20">{{ varItem.type }}</el-tag>
        </div>
      </el-scrollbar>
      <el-scrollbar class="w-full min-h-full">
        <component
          v-if="data?.nodeType"
          :is="nodeTypeMap[data.nodeType].propertyPanel"
          :key="data.id"
          :node="node"
          :varList="policyProjectStore.varList"
        ></component>
      </el-scrollbar>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { nodeTypeMap } from '../../config/nodeTypeMap.js'

import { usePolicyProjectStore } from '@/stores/policy-project.js'
const policyProjectStore = usePolicyProjectStore()

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
    height: 50px;
    border-bottom: 1px solid #dce3e8;
  }
  .from-body {
    height: calc(100% - 50px);
  }
}
.from-var {
  border-right: 1px solid #dce3e8;
}
</style>
