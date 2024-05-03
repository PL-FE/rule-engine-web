import startImg from '@/assets/images/nodeType/start.png'
import ruleImg from '@/assets/images/nodeType/rule.png'
import gatewayImg from '@/assets/images/nodeType/gateway.png'
import ratingImg from '@/assets/images/nodeType/rating.png'

import rating from '../components/property-panel/node-form/rating.vue'
import gateway from '../components/property-panel/node-form/gateway.vue'
import rule from '../components/property-panel/node-form/rule.vue'

export const nodeTypeMap = {
  start: {
    icon: startImg,
    label: '开始',
    type: 'start'
  },
  rule: {
    icon: ruleImg,
    label: '规则节点',
    type: 'rule',
    propertyPanel: rule
  },
  gateway: {
    icon: gatewayImg,
    label: '条件节点',
    type: 'gateway',
    propertyPanel: gateway
  },
  rating: {
    icon: ratingImg,
    label: '评分卡',
    type: 'rating',
    propertyPanel: rating
  }
}
