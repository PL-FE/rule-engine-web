import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import './assets/styles/main.css'
import router from './router'
const app = createApp(App)
import SvgIcon from '@/components/svg-icon/index.vue'

app.use(createPinia())
app.use(ElementPlus)
app.use(router)
app.component('SvgIcon', SvgIcon)
app.directive('resize', {
  mounted(el, binding) {
    const dragDom = el
    const { modifiers } = binding
    let { x, y } = modifiers
    if (!x && !y) {
      x = true
    }
    if (!dragDom.style.position || dragDom.style.position === 'static') {
      dragDom.style.position = 'relative'
    }
    if (x) {
      const dragDomRight = document.createElement('div')
      dragDomRight.classList.add('dragDomRight')
      dragDomRight.style.cursor = 'col-resize'
      dragDomRight.style.position = 'absolute'
      dragDomRight.style.right = '0'
      dragDomRight.style.top = '0'
      dragDom.appendChild(dragDomRight)
      // 拖动dragDomRight，改变dragDom的宽度
      dragDomRight.onmousedown = (e) => {
        const disX = e.clientX - dragDom.offsetWidth
        document.onmousemove = (e) => {
          e.preventDefault()
          dragDom.style.width = e.clientX - disX + 'px'
        }
        document.onmouseup = () => {
          document.onmousemove = null
          document.onmouseup = null
        }
      }
    } else {
      const dragDomTop = document.createElement('div')
      dragDomTop.classList.add('dragDomTop')
      dragDomTop.style.cursor = 'row-resize'
      dragDomTop.style.position = 'absolute'
      dragDomTop.style.left = '0'
      dragDomTop.style.top = '0'
      dragDom.appendChild(dragDomTop)
      dragDomTop.onmousedown = (e) => {
        const disY = e.clientY - dragDom.offsetHeight
        document.onmousemove = (e) => {
          e.preventDefault()
          console.log('disY', disY)
          console.log('e.clientY', e.clientY)
          dragDom.style.height = disY - e.clientY + 'px'
        }
        document.onmouseup = () => {
          document.onmousemove = null
          document.onmouseup = null
        }
      }
    }
  }
})
app.mount('#app')
