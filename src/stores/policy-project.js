import { ref, computed, reactive } from 'vue'
import { defineStore } from 'pinia'
import data from './data.js'

export const usePolicyProjectStore = defineStore('policyProject', () => {
    const policyProjectData = reactive({
        name: '信贷简单审核示例',
        data
    })

    return { policyProjectData }
})
