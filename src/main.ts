import { createApp } from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import { ElLoading } from 'element-plus'

import router from './router'

const app = createApp(App)
app.use(router)
ElLoading.install(app)
app.mount('#app')