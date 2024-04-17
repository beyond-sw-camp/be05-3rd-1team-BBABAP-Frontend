import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import axios from 'axios';
import store from './store/store'; // Vuex store import

const app = createApp(App);

// Vuex를 Vue에 등록
app.use(store);

app.config.globalProperties.$axios = axios;  
app.config.globalProperties.$serverUrl = '//localhost:7777'; 

app.use(router).mount('#app');
// 앱이 로드될 때 로컬 스토리지에서 사용자 정보를 가져와 Vuex에 복원
store.commit('restoreUser');