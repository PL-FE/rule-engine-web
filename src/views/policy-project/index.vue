<template>
  <el-container class="bg-[#f4f7f9] h-screen">
    <el-header class="flex items-center justify-between relative bg-white">
      <div class="policy-name">
        <svg-icon iconName="v-icon-wjj1" />
        <el-input
          ref="policyNameInputRef"
          type="text"
          v-model="policyName"
          class="!w-60 px-4"
          v-if="isEditPolicyName"
          @blur="isEditPolicyName = false"
        ></el-input>
        <span v-else class="px-4">{{ policyName }}</span>
        <svg-icon
          v-if="!isEditPolicyName"
          iconName="v-icon-icon-edit"
          class="!text-gray-400"
          @click="handleEditPolicyName"
        />
      </div>
      <div class="tabs-container absolute left-1/2">
        <el-tabs v-model="activeName" class="demo-tabs" @tab-click="handleClick">
          <el-tab-pane label="基础信息" name="1"> </el-tab-pane>
          <el-tab-pane label="决策设计" name="2"></el-tab-pane>
          <el-tab-pane label="执行日志" name="3"></el-tab-pane>
        </el-tabs>
      </div>
      <dib class="btn-action">
        <el-button>设计</el-button>
      </dib>
    </el-header>
    <el-main class="!flex justify-center">
      <BaseInfo />
    </el-main>
  </el-container>
</template>

<script setup>
import { ref } from 'vue'
import BaseInfo from './base-info/index.vue'
const activeName = ref('1')
const handleClick = (tab, event) => {
  console.log(tab, event)
}

const policyName = ref('信贷简单审核示例')
const policyNameInputRef = ref(null)
const isEditPolicyName = ref(false)

const handleEditPolicyName = () => {
  isEditPolicyName.value = true
  // 让输入框聚焦
  setTimeout(() => {
    policyNameInputRef.value?.focus()
  }, 0)
}
</script>

<style scoped lang="less">
.tabs-container {
  transform: translateX(-50%);
}
</style>
