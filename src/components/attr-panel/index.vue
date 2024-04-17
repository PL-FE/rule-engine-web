<template>
  <div class="attr-container h-full flex flex-col">
    <p class="attr-title mb-4">属性面板</p>
    <div class="arrt-body p-4 flex-1">
      <el-form :model="form" label-width="auto" v-show="props.data">
        <el-form-item label="ID">
          <el-input v-model="form.id" disabled />
        </el-form-item>
        <el-form-item label="名称">
          <el-input v-model="form.label" @input="upldateCellAttr" />
        </el-form-item>
        <el-form-item label="输入">
          <el-input v-model="form.input" @input="upldateCellData" />
        </el-form-item>
        <el-form-item label="输出">
          <el-input v-model="form.output" @input="upldateCellData" />
        </el-form-item>
      </el-form>
      <div v-show="!props.data" class="h-full flex justify-center items-center opacity-50">
        暂无数据
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, watch } from 'vue'

const props = defineProps({
  data: Object
})
const form = ref({})
console.log('props.data', props.data)
watch(
  () => props.data,
  (val) => {
    console.log('val', val)
    if (!val) {
      return
    }
    const { id, label } = props.data
    const { input, output } = props.data.data || {}
    form.value = {
      id,
      label,
      input,
      output
    }
  }
)
const upldateCellAttr = (val) => {
  props.data.attr('label/text', val)

  props.data.updateData({
    label: val
  })
}
const upldateCellData = () => {
  props.data.setData(form.value)
}
</script>

<style scoped lang="less">
.attr-title {
  box-sizing: border-box;
  width: 100%;
  height: 32px;
  padding: 0 5px 0 8px;
  color: #666;
  font-weight: 700;
  font-size: 12px;
  line-height: 32px;
}
</style>
