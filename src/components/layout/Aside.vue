<template>
  <div class="aside-container px-2 h-full flex flex-col">
    <div class="flex justify-between py-2">
      <b>决策列表</b>
      <svg-icon iconName="v-icon-addition" isPointer></svg-icon>
    </div>
    <el-input v-model="filterText" placeholder="请输入关键字" />
    <el-tree
      class="tree-box flex-1 overflow-auto"
      ref="treeRef"
      :data="data"
      :props="defaultProps"
      @node-click="handleNodeClick"
      :filter-node-method="filterNode"
    />
  </div>
</template>

<script setup>
import { ref, watch } from 'vue'
import { useLayout } from './layoutHooks.js'
const { leftData } = useLayout()

const filterText = ref('')
const treeRef = ref(null)
watch(filterText, (val) => {
  treeRef.value?.filter(val)
})
const filterNode = (value, data) => {
  if (!value) return true
  return data.label.includes(value)
}

const handleNodeClick = (data) => {
  if (data.children?.length) return
  leftData.selected = data.label
}

const defaultProps = {
  children: 'children',
  label: 'label'
}

const data = [
  {
    label: 'Level one 1',
    children: [
      {
        label: 'Level two 1-1',
        children: [
          {
            label: 'Level three 1-1-1'
          }
        ]
      }
    ]
  },
  {
    label: 'Level one 2',
    children: [
      {
        label: 'Level two 2-1',
        children: [
          {
            label: 'Level three 2-1-1'
          }
        ]
      },
      {
        label: 'Level two 2-2',
        children: [
          {
            label: 'Level three 2-2-1'
          }
        ]
      }
    ]
  },
  {
    label: 'Level one 3',
    children: [
      {
        label: 'Level two 3-1',
        children: [
          {
            label: 'Level three 3-1-1'
          }
        ]
      },
      {
        label: 'Level two 3-2',
        children: [
          {
            label: 'Level three 3-2-1'
          }
        ]
      }
    ]
  }
]
</script>

<style scoped lang="less"></style>
