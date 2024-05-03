<template>
  <el-card
    :style="{ top: `${menuData?.y}px`, left: `${menuData?.x}px` }"
    class="absolute bg-white menu"
  >
    <div
      v-for="menu in menuList"
      :key="menu.type"
      @click="handlerCommon(menu)"
      class="flex items-center cursor-pointer hover:bg-[#f0f7ff] pl-2 pr-3 py-1"
      :class="menu.class"
      :valueType="menu.type"
    >
      <img v-if="menu.img" :src="menu.img" width="20px" height="20px" />
      <svg-icon v-else-if="menu.icon" :iconName="menu.icon" :size="20"></svg-icon>
      <p class="ml-2">
        {{ menu.label }}
      </p>
    </div>
  </el-card>
</template>

<script setup>
import { computed } from 'vue'
import { nodeTypeMap } from '../../config/nodeTypeMap'

const menuData = defineModel('menuData')

// menuData
//   graph: Object,
//   node: Object,
//   x: Number,
//   y: Number

function handlerCommon(menu) {
  menu.handler(menu.type)
}

const menuList = computed(() => {
  const model = menuData.value?.node?.getModel()
  if (!model) {
    return []
  }
  const newNodeList = Object.values(nodeTypeMap)
    .map((item) => ({
      label: item.label,
      img: item.icon,
      type: item.type,
      handler: handleAddItem
    }))
    .filter((item) => item.type !== 'start')

  const actionList = [
    {
      label: '删除节点',
      icon: 'v-icon-delete-copy',
      type: 'delete',
      handler: handleDeleteItem
    }
  ].filter((it) => model.id !== 'root')
  return [...newNodeList, ...actionList]
})

function handleDeleteItem() {
  const model = menuData.value.node.getModel()
  menuData.value.graph.removeChild(model.id)
}
function handleAddItem(type) {
  const model = menuData.value.node.getModel()
  if (!model.children) {
    model.children = []
  }
  const id = `n-${Math.random()}`
  model.children.push({
    id,
    label: nodeTypeMap[type]?.label,
    nodeType: type
  })
  document.body.click()
  graph.updateChild(model, model.id)
}
</script>

<style lang="less">
.menu {
  font-size: 12px;
  .el-card__body {
    padding: 0;
  }
}
</style>
