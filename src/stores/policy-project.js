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

    return { policyProjectData, policyTreeData, setPolicyProjectData }
}, {
    persist: true,
})
