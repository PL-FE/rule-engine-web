import { createApp } from 'vue'
import { createPinia } from 'pinia'
import './assets/styles/main.css'
import App from './App.vue'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import router from './router'
const app = createApp(App)
import SvgIcon from '@/components/svg-icon/index.vue'
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'
import { resizeDirectie } from './utils/directive'
const pinia = createPinia();
pinia.use(piniaPluginPersistedstate);
app.use(pinia)
app.use(ElementPlus)
app.use(router)
app.component('SvgIcon', SvgIcon)
app.directive('resize', resizeDirectie)
app.mount('#app')
