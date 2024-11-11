// import './assets/main.css';

// import { createApp } from 'vue';

import { createApp } from 'vue';
import { createPinia } from 'pinia';
import App from './App.vue';
import router from './router';
import Antd from 'ant-design-vue';

const pinia = createPinia();

createApp(App).use(router).use(pinia).use(Antd).mount('#app');
