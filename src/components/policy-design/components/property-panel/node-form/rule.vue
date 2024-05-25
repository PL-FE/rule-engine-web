<template>
  <div>
    <!-- <img :src="ruleImg" alt="" srcset="" /> -->
    <div class="flex items-center">
      <p class="flex mr-2">
        当关系式(<span v-html="calcExpression" class="flex"></span>)成立时，则该节点结果为
      </p>
      <el-select class="!inline-block !w-48" v-model="nodeResultValue">
        <el-option
          v-for="it in PROCESS_RESULT"
          :key="it.value"
          :label="it.label"
          :value="it.value"
        ></el-option>
      </el-select>
    </div>

    <div>
      <el-button link type="primary" @click="addRelaGrounp">添加关系组</el-button>
    </div>

    <div v-for="(grounp, idx) in ruleList" :key="idx + ruleList.length">
      <div class="py-3 px-3 bg-[#f5f7fa] my-3">
        <div class="flex items-center">
          <div>
            <div v-for="(item, itemIdx) in grounp.children" :key="item.id" class="mt-3">
              <div class="flex items-center">
                <div class="index w-[18px]">{{ calcItemIndex(idx, itemIdx) }}</div>
                <el-select class="!w-48 mr-3" v-model="item.varValue" placeholder="请选择变量">
                  <el-option
                    v-for="varItem in varList"
                    :key="varItem.key"
                    :label="varItem.label"
                    :value="varItem.key"
                  ></el-option>
                </el-select>
                <el-select class="!w-48 mr-3" v-model="item.judge" placeholder="请选择判断符">
                  <el-option
                    v-for="varItem in DATA_TYPE_OPERATE"
                    :key="varItem.value"
                    :label="varItem.label"
                    :value="varItem.value"
                  >
                    <span style="float: left">{{ varItem.label }}</span>
                    <span
                      style="float: right; color: var(--el-text-color-secondary); font-size: 13px"
                    >
                      {{ varItem.value }}
                    </span>
                  </el-option>
                </el-select>

                <el-input class="!w-48 mr-3" v-model="item.value" placeholder="请输入值" />
                <el-input class="!w-48 mr-3" v-model="item.remark" placeholder="备注" />
                <el-button @click="removeRelaItem(idx, itemIdx)">删除</el-button>
              </div>
              <el-select
                v-if="itemIdx !== grounp.children.length - 1"
                class="!w-48 ml-[26px] mt-3"
                v-model="item.loginValue"
                placeholder="请选择逻辑"
              >
                <el-option
                  v-for="varItem in LOGIC"
                  :key="varItem.value"
                  :label="varItem.label"
                  :value="varItem.value"
                >
                </el-option>
              </el-select>
            </div>

            <el-button @click="addRelaItem(idx)" class="mt-3 ml-[26px]">添加</el-button>
          </div>
        </div>
      </div>
      <el-select
        class="!w-48 ml-[40px]"
        v-model="grounp.loginValue"
        placeholder="请选择逻辑"
        v-if="idx !== ruleList.length - 1"
      >
        <el-option
          v-for="varItem in LOGIC"
          :key="varItem.value"
          :label="varItem.label"
          :value="varItem.value"
        >
        </el-option>
      </el-select>
    </div>
  </div>
</template>

<script setup>
import { PROCESS_RESULT, DATA_TYPE_OPERATE, LOGIC } from '@/enum/index.js'
import { computed, ref } from 'vue'

const props = defineProps({
  node: Object,
  varList: Array
})

const nodeResultValue = ref(1)
const ruleList = ref([])
const addRelaGrounp = () => {
  ruleList.value.push({
    loginValue: 1,
    children: [
      {
        varValue: '',
        judge: '',
        value: '',
        remark: '',
        loginValue: 1
      }
    ]
  })
}

const addRelaItem = (idx) => {
  ruleList.value[idx].children.push({
    varValue: '',
    judge: '',
    value: '',
    remark: '',
    loginValue: 1
  })
}
const removeRelaItem = (idx, itemIdx) => {
  ruleList.value[idx].splice(itemIdx, 1)
  if (!ruleList.value[idx].length) {
    ruleList.value.splice(idx, 1)
  }
}
const calcItemIndex = (idx, itemIdx) => {
  const group = ruleList.value.slice(0, idx)
  const baseIndex = group.reduce((pre, cur) => (pre += cur.children.length), 0)
  return baseIndex + itemIdx + 1
}

const createIndexHtml = (index) => {
  return `<span class="index w-[18px] mx-1">${index}</span>`
}
const calcExpression = computed(() => {
  let exp = ''
  let curIndex = 1
  ruleList.value.forEach((item, index) => {
    let groupExp = ''
    item.children?.forEach((it, i) => {
      let itExp = ''
      if (i !== item.children.length - 1) {
        itExp = it.loginValue === 1 ? '且' : '或'
      }
      groupExp += `${createIndexHtml(curIndex)}${itExp}`
      curIndex++
    })
    let itemExp = ''
    if (index !== ruleList.value.length - 1) {
      itemExp = item.loginValue === 1 ? '且' : '或'
    }
    exp += `(${groupExp})${itemExp}`
  })
  return exp
})
</script>

<style scoped lang="less"></style>
