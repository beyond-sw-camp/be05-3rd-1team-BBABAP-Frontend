import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import axios from 'axios';
import store from './store/store'; // Vuex store import
import { QuillEditor  } from 'vue-quill-editor'; // 수정된 import 문
import 'quill/dist/quill.core.css'; // Quill 에디터의 스타일을 불러옵니다.
import 'quill/dist/quill.snow.css'; // 선택적으로 테마 스타일을 불러올 수 있습니다.

const app = createApp(App);

// QuillEditor를 컴포넌트로 등록
app.component('QuillEditor', QuillEditor);

// Vuex를 Vue에 등록
app.use(store);

app.config.globalProperties.$axios = axios;
app.config.globalProperties.$serverUrl = '//localhost:7777';

app.use(router).mount('#app');
