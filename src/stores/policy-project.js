import { ref, computed, reactive } from 'vue'
import { defineStore } from 'pinia'
import data from './data.js'

export const usePolicyProjectStore = defineStore('policyProject', () => {
    const policyProjectData = ref(null)

    const setPolicyProjectData = (val) => {
        policyProjectData.value = val
    }

    const policyTreeData = reactive([{
        name: '决策示例',
        id: 1,
        children: [
            {
                name: '信贷简单审核示例',
                data,
                id: 2
            },
            {
                name: '风控示例',
                data,
                id: 3
            },
        ]
    }])

    const varList = ref([
        {
            key: 'age',
            type: '数值',
            label: '年龄',
            remark: '年龄'
        },
        {
            key: 'income',
            type: '数值',
            label: '月收入',
            remark: '月收入数据'
        },
        {
            key: 'overdue',
            type: '布尔',
            label: '逾期标志',
            remark: '逾期标志，0不逾期，1逾期'
        }
    ])

    const setVarList = (val) => {
        varList.value = val
    }

    return { policyProjectData, policyTreeData, setPolicyProjectData, varList, setVarList }
}, {
    persist: true,
})
