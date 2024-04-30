
import { reactive } from "vue";

const leftData = reactive({
    selected: '',
})
export function useLayout () {
    return {
        leftData
    }
}

