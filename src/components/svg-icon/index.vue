<template>
  <svg :class="svgClass" aria-hidden="true" :style="{ width, height }">
    <use :xlink:href="iconClassName" :fill="color" />
  </svg>
</template>
<script setup>
import { computed } from 'vue'
import './svg-icon.js'

const props = defineProps({
  iconName: {
    type: String,
    required: true
  },
  className: {
    type: String,
    default: ''
  },
  color: {
    type: String,
    default: '#606266'
  },
  size: {
    type: [Array, Number],
    default: 16
  },
  isPointer: Boolean
})
// 图标在 iconfont 中的名字
const width = computed(() => {
  return `${Array.isArray(props.size) ? props.size[0] : props.size}px`
})
const height = computed(() => {
  return `${Array.isArray(props.size) ? props.size[1] : props.size}px`
})
// 图标在 iconfont 中的名字
const iconClassName = computed(() => {
  return `#${props.iconName}`
})
// 给图标添加上类名
const svgClass = computed(() => {
  let base = 'svg-icon'
  if (props.className) {
    return (base += ` ${props.className}`)
  }
  if (props.isPointer) {
    return (base += ` cursor-pointer`)
  }
  return base
})
</script>
<style lang="less">
.svg-icon {
  position: relative;
  fill: currentColor;
  vertical-align: -2px;
}
</style>
