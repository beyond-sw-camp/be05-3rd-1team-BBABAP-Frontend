import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import axios from 'axios';
// import store from './store/store'; // Vuex store import

const app = createApp(App);

app.config.globalProperties.$axios = axios;  
app.config.globalProperties.$serverUrl = '//localhost:7777'; 

// app.use(store);
app.use(router).mount('#app');