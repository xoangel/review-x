import { createApp } from 'vue'
import { router } from './config/router';
import { pinia } from './config/pinia';
import ElementPlus from 'element-plus';
import 'element-plus/dist/index.css';
import App from './App.vue';



createApp(App)
    .use(router)
    .use(pinia)
    .use(ElementPlus)
    .mount('#app')
