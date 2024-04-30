<template>
  <div class="main-container h-full flex justify-center items-center flex-col">
    <b class="text-3xl">在线决策</b>
    <p class="opacity-70">
      在线决策是由一系列 判断分析
      的规则集合，可以智能化判断对数据进行分类、过滤、判断、计算，以满足各种的业务决策场景
    </p>
    <div class="flex justify-center mt-4">
      <div v-for="img in defaultImgaes" :key="img.path" class="w-72 text-center">
        <img :src="getAssetsImages(`${img.path}`)" width="100%" />
        <p>
          {{ img.title }}
        </p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { getAssetsImages } from '@/utils/index.js'
const defaultImgaes = [
  {
    path: 'default/1.png',
    title: '1. 创建决策，设置入参'
  },
  {
    path: 'default/2.png',
    title: '2. 设拖拽配置，决策流程'
  },
  {
    path: 'default/3.png',
    title: '3. 引入变量，节点配置'
  },
  {
    path: 'default/4.png',
    title: '4. 设置出参，调用验证'
  }
]
</script>

<style scoped lang="less"></style>
