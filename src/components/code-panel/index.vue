<template>
  <el-drawer v-model="visble" title="数据面板" direction="rtl">
    <pre>{{ jsonData }}</pre>
  </el-drawer>
</template>

<script setup>
import { ref, watch } from 'vue'

const visble = defineModel('modelValue')
const jsonData = ref(null)
const props = defineProps({
  queryData: Function
})
watch(
  () => visble.value,
  (val) => {
    if (val && props.queryData) {
      jsonData.value = props.queryData()
    }
  },
  {
    immediate: true
  }
)
</script>

<style scoped lang="scss"></style>
