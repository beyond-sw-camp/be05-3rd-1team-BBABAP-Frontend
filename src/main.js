import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import axios from 'axios';
import store from './store/store'; // Vuex store import

const app = createApp(App);

// Vuex를 Vue에 등록
app.use(store);

//globalProperties는 모든 컴포넌트에서 사용할 변수들이 입력된 object
app.config.globalProperties.$axios = axios;  
app.config.globalProperties.$serverUrl = '//localhost:7777'; 

app.use(router).mount('#app');