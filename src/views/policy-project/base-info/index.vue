<template>
  <div class="base-info-container h-full">
    <el-card class="w-[1200px]" shadow="never">
      <b>基础配置</b>
      <el-form :model="form" label-width="auto" label-position="top" class="mt-6">
        <el-form-item label="决策名称" required>
          <el-input v-model="policyProjectData.name" @change="(val) => (form.name = val)" />
        </el-form-item>
        <el-form-item label="决策描述">
          <el-input v-model="form.desc" type="textarea" :rows="4" />
        </el-form-item>
      </el-form>
    </el-card>

    <el-card class="w-[1200px]" shadow="never">
      <b>自定义入参</b>
      <code-mirror
        basic
        :lang="lang"
        v-model="codeVal"
        style="height: 400px"
        @change="handleCodeChange"
      />
    </el-card>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import CodeMirror from 'vue-codemirror6'
import { json } from '@codemirror/lang-json'
import { usePolicyProjectStore } from '@/stores/policy-project.js'
const policyProjectStore = usePolicyProjectStore()
const { policyProjectData } = policyProjectStore

const form = ref({
  name: '',
  desc: ''
})
const initJson = {
  name: `maybaby`,
  year: 25,
  weight: 45,
  height: 165
}
// 初始化
let codeVal = ref('')
// 转成json字符串并格式化
codeVal.value = JSON.stringify(initJson, null, '\t')

const handleCodeChange = (val) => {
  console.log('val', val)
}
// json
const lang = json()
// 主题样式设置
const theme = {
  '&': {
    color: 'white',
    backgroundColor: '#034'
  },
  '.cm-content': {
    caretColor: '#0e9'
  },
  '&.cm-focused .cm-cursor': {
    borderLeftColor: '#0e9'
  },
  '&.cm-focused .cm-selectionBackground, ::selection': {
    backgroundColor: '#074'
  },
  '.cm-gutters': {
    backgroundColor: '#045',
    color: '#ddd',
    border: 'none'
  }
}
</script>

<style scoped lang="less">
:deep(.el-card) {
  margin-bottom: 20px;
}
</style>
