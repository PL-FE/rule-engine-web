<template>
  <div class="aside-container px-2 h-full flex flex-col">
    <div class="flex justify-between py-2">
      <b>决策列表</b>
      <svg-icon iconName="v-icon-addition" isPointer></svg-icon>
    </div>
    <el-input v-model="filterText" placeholder="请输入关键字" />
    <el-tree
      :current-node-key="[policyProjectStore.policyProjectData.id]"
      default-expand-all
      class="tree-box flex-1 overflow-auto"
      ref="treeRef"
      node-key="id"
      :data="policyProjectStore.policyTreeData"
      :props="defaultProps"
      @node-click="handleNodeClick"
      :filter-node-method="filterNode"
      highlight-current
    />
  </div>
</template>

<script setup>
import { ref, watch, watchEffect } from 'vue'

import { usePolicyProjectStore } from '@/stores/policy-project.js'
const policyProjectStore = usePolicyProjectStore()
const { setPolicyProjectData } = policyProjectStore
const filterText = ref('')
const treeRef = ref(null)
watch(filterText, (val) => {
  treeRef.value?.filter(val)
})
const filterNode = (value, data) => {
  if (!value) return true
  return data.label.includes(value)
}

watchEffect(() => {
  if (policyProjectStore.policyProjectData?.data) {
    const { id } = policyProjectStore.policyProjectData
    treeRef.value?.setCurrentKey(id)
  }
})

const handleNodeClick = (data) => {
  if (data.children?.length) return
  setPolicyProjectData(data)
}

const defaultProps = {
  children: 'children',
  label: 'name'
}
</script>

<style scoped lang="less"></style>
