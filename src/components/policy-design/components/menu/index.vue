<template>
  <div :style="{ top: `${y}px`, left: `${x}px` }" class="fixed bg-white">
    <ul>
      <li>Option 1</li>
      <li>Option 2</li>
      <li>Option 3</li>
    </ul>
  </div>
</template>

<script setup>
defineProps({
  x: Number,
  y: Number
})
</script>

<style scoped lang="less"></style>
