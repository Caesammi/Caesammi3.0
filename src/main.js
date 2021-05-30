import { createApp } from 'vue'
import App from './App.vue';
import store from './store'
import router from './router/index.js'
import ElementPlus from 'element-plus';
import 'element-plus/lib/theme-chalk/index.css';

const app = createApp(App)
app
  .use(ElementPlus)
  .use(store)
  .use(router)
app.mount('#app')
