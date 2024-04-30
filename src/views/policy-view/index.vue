<template>
  <div class="policy-view-container relative h-full mx-4">
    <el-tabs v-model="activeName" @tab-click="handleClick" class="h-full">
      <el-tab-pane label="决策配置" name="1">
        <Viewer />
      </el-tab-pane>
      <el-tab-pane label="基本信息" name="2">基本信息</el-tab-pane>
      <el-tab-pane label="调用示例" name="3">调用示例</el-tab-pane>
      <el-tab-pane label="执行日志" name="4">执行日志</el-tab-pane>
      <el-tab-pane label="统计指标" name="5">统计指标</el-tab-pane>
    </el-tabs>
    <div class="tool absolute right-0 top-0">
      <el-button type="primary">启用</el-button>
      <el-button type="primary" @click="router.push({ path: '/policy-design/123' })"
        >设计</el-button
      >
    </div>
  </div>
</template>
<script setup>
import { ref } from 'vue'
import Viewer from '@/components/policy-design/Viewer.vue'
import { useRouter } from 'vue-router'
const router = useRouter()
const activeName = ref('1')

const handleClick = (tab, event) => {
  console.log(tab, event)
}
</script>

<style lang="less">
.policy-view-container {
  .el-tabs__header {
    margin: 0;
  }
}
</style>
