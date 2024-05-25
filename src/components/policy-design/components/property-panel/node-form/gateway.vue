<template>
  <div class="p-3">
    <!-- <img :src="img" alt="" srcset="" /> -->
    <p>如不满足以下条件，则拒绝</p>
    <div v-for="(c, idx) in children" :key="c.id" class="flex mt-3 items-center">
      <div class="index">{{ idx + 1 }}</div>
      <el-tag type="info " class="!w-24 mr-3">{{ c.label }}</el-tag>
      <el-select
        class="!w-48 mr-3"
        size="small"
        v-model="data[idx].varValue"
        placeholder="请选择变量"
      >
        <el-option
          v-for="varItem in varList"
          :key="varItem.key"
          :label="varItem.label"
          :value="varItem.key"
        ></el-option>
      </el-select>
      <el-select
        class="!w-48 mr-3"
        size="small"
        v-model="data[idx].judge"
        placeholder="请选择判断符"
      >
        <el-option
          v-for="varItem in DATA_TYPE_OPERATE"
          :key="varItem.value"
          :label="varItem.label"
          :value="varItem.value"
        >
          <span style="float: left">{{ varItem.label }}</span>
          <span style="float: right; color: var(--el-text-color-secondary); font-size: 13px">
            {{ varItem.value }}
          </span>
        </el-option>
      </el-select>

      <el-input class="!w-48 mr-3" size="small" v-model="data[idx].value" placeholder="请输入值" />
      <el-input class="!w-48 mr-3" size="small" v-model="data[idx].remark" placeholder="备注" />
    </div>
  </div>
</template>

<script setup>
import { computed, ref, watch } from 'vue'
import { DATA_TYPE_OPERATE } from '@/enum/index.js'
const props = defineProps({
  node: Object,
  varList: Array
})
const data = ref([])
const children = computed(() => {
  const c = props.node?._cfg?.children || []
  return c.map((nodeC) => {
    const model = nodeC.getModel()
    const { id, label } = model
    return {
      id,
      label
    }
  })
})
watch(
  children,
  (c) => {
    c.forEach((it, idx) => {
      data.value[idx] = {
        varValue: '',
        judge: '',
        value: '',
        remark: ''
      }
    })
  },
  {
    immediate: true
  }
)
console.log('children', children)
</script>

<style scoped lang="less"></style>
