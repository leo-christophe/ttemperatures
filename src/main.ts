import './assets/main.css'

import { createApp } from 'vue'
import App from './App.vue'
import router from './router'

import PrimeVue from 'primevue/config'
import ToastService from 'primevue/toastservice';
import 'primevue/resources/themes/saga-blue/theme.css';       // theme
import 'primevue/resources/primevue.min.css';                        

const app = createApp(App)
app.use(ToastService);

app.use(router)
app.use(PrimeVue)

app.mount('#app')
