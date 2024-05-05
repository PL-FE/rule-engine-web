<template>
  <div class="layout-container">
    <el-container class="h-screen overflow-hidden">
      <el-header class="header flex items-center">
        <Header></Header>
      </el-header>
      <el-container>
        <el-aside width="200px" v-resize>
          <Aside></Aside>
        </el-aside>
        <el-main>
          <policyView />
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script setup>
import Aside from './Aside.vue'
import Header from './Header.vue'
import DefaultMain from './Main.vue'
import { useLayout } from './layoutHooks.js'
const { leftData } = useLayout()
import policyView from '@/views/policy-view/index.vue'
</script>

<style scoped lang="less">
:deep.layout-container .el-main {
  padding: 0;
}
</style>
