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
app.component('SvgIcon', SvgIcon);

app.mount('#app')
