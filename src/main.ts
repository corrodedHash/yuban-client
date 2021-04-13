import { createApp } from 'vue'
import App from './App.vue'
import { registerServiceWorker } from './registerServiceWorker'
import { ElLoading } from 'element-plus'

import router from './router'

let x = registerServiceWorker()

const app = createApp(App, { "update_state": x })
app.use(router)
ElLoading.install(app)
app.mount('#app')