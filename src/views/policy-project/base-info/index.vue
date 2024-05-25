<template>
  <div class="base-info-container h-full">
    <el-card class="w-[1200px]" shadow="never">
      <b>基础配置</b>
      <el-form :model="form" label-width="auto" label-position="top" class="mt-6">
        <el-form-item label="决策名称" required>
          <el-input
            v-model="policyProjectStore.policyProjectData.name"
            @change="(val) => (form.name = val)"
          />
        </el-form-item>
        <el-form-item label="决策描述">
          <el-input v-model="form.desc" type="textarea" :rows="4" />
        </el-form-item>
      </el-form>
    </el-card>

    <el-card class="w-[1200px]" shadow="never">
      <b>自定义入参</b>
      <div class="config flex">
        <div class="w-96 flex flex-col">
          <div>
            JSON <span class="text-red-400 text-sm">{{ codeValErr }}</span>
          </div>
          <code-mirror
            class="code-mirror flex-1 min-h-96"
            basic
            :lang="lang"
            v-model="codeVal"
            style="height: 400px"
          />
        </div>
        <div class="flex-1 pl-5">
          <el-row :gutter="20">
            <el-col :span="6"><span class="validate-text-label">字段名称</span></el-col>
            <el-col :span="6"><span class="validate-text-label">字段key</span></el-col>
            <el-col :span="4"><span class="validate-text-label">类型</span></el-col>
            <el-col :span="6"><span class="validate-text-label">字段解释</span></el-col>
            <el-col :span="2" class="!flex items-center cursor-pointer">
              <span @click="hadnleAddJsonItem">
                <svg-icon
                  iconName="v-icon-addition"
                  class="action-btn-radius"
                  color="#409eff"
                ></svg-icon>
              </span>
            </el-col>
          </el-row>
          <el-row :gutter="20" v-for="(item, idx) in codeValWrap" :key="idx">
            <el-col :span="6"><el-input v-model="item.label"></el-input> </el-col>
            <el-col :span="6"> <el-input v-model="item.key"></el-input> </el-col>
            <el-col :span="4"
              ><el-select v-model="item.type">
                <el-option
                  v-for="item in options"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                />
              </el-select>
            </el-col>
            <el-col :span="6"><el-input v-model="item.remark"></el-input> </el-col>
            <el-col :span="2" class="!flex items-center cursor-pointer">
              <span @click="handleRemoveJsonItem(idx)">
                <svg-icon
                  iconName="v-icon-subtraction"
                  class="action-btn-radius"
                  color="#409eff"
                ></svg-icon>
              </span>
            </el-col>
          </el-row>
        </div>
      </div>
    </el-card>
  </div>
</template>

<script setup>
import { computed, ref, watch } from 'vue'
import CodeMirror from 'vue-codemirror6'
import { json } from '@codemirror/lang-json'
import { usePolicyProjectStore } from '@/stores/policy-project.js'
import { DATA_TYPE } from '@/enum/index.js'

const policyProjectStore = usePolicyProjectStore()
const form = ref({
  name: '',
  desc: ''
})

const options = DATA_TYPE

let codeValErr = ref('')
let codeVal = ref('')
let codeValWrap = ref(policyProjectStore.varList)
// 转成json字符串并格式化
watch(
  codeVal,
  (val) => {
    if (!val) {
      return
    }
    try {
      codeValWrap.value = JSON.parse(val)
      codeValErr.value = ''
    } catch (error) {
      codeValErr.value = '格式错误'
      console.warn('格式错误')
    }
  },
  {
    immediate: true
  }
)
watch(
  codeValWrap,
  (val) => {
    if (!val) {
      return
    }
    codeVal.value = JSON.stringify(val, null, '\t')
    policyProjectStore.setVarList(val)
  },
  {
    deep: true,
    immediate: true
  }
)

// json
const lang = json()

const hadnleAddJsonItem = () => {
  codeValWrap.value.push({
    key: `field_${codeValWrap.value.length}`,
    type: '字符串',
    label: `label_${codeValWrap.value.length}`,
    remark: ''
  })
}
const handleRemoveJsonItem = (idx) => {
  codeValWrap.value.splice(idx, 1)
}
</script>

<style lang="less">
.base-info-container {
  .el-row {
    margin-bottom: 20px;
  }
  .el-card {
    margin-bottom: 20px;
  }
}
</style>
<style scoped lang="less">
.code-mirror {
  border: 1px solid #eee;
  > div {
    height: 100%;
  }
}
.action-btn-radius {
  border: 1px solid #409eff;
  border-radius: 50%;
}
.validate-text-label::before {
  content: '*';
  color: #f56c6c;
  margin-right: 4px;
}
</style>
