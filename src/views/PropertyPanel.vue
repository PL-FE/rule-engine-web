<template>
  <!-- <el-drawer :modal="false" v-model="visible" title="I am the title" direction="btt">
    <span>Hi, there!</span>
  </el-drawer> -->
  <div v-show="visible" class="PropertyPanel-container">
    <p>
      {{ data?.label }}
    </p>
  </div>
</template>

<script setup>
import { computed } from 'vue'

const node = defineModel('node')
const visible = computed(() => {
  return !!node.value
})
const data = computed(() => {
  console.log('data', data)
  return node.value?.getModel()
})
</script>

<style scoped lang="less">
.PropertyPanel-container {
  width: 100vw;
  height: 300px;
  background-color: #fff;
  position: fixed;
  bottom: 0;
}
</style>
