
import startImg from '@/assets/nodeType/start.png'
import ruleImg from '@/assets/nodeType/rule.png'
import gatewayImg from '@/assets/nodeType/gateway.png'
import ratingImg from '@/assets/nodeType/rating.png'


export const nodeTypeMap = {
    start: {
        icon: startImg,
        label: '开始'
    },
    rule: {
        icon: ruleImg,
        label: '规则节点'
    },
    gateway: {
        icon: gatewayImg,
        label: '条件节点'
    },
    rating: {
        icon: ratingImg,
        label: '评分卡'
    },
}