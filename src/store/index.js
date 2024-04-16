// store/index.js
import { createStore } from 'vuex';
import axios from 'axios';

// 로컬 스토리지에서 사용자 정보를 가져오는 함수
function getUserFromLocalStorage() {
    const user = JSON.parse(localStorage.getItem('user'));
    const access = localStorage.getItem('access');
    return user && access ? { user, access } : null;
}

export default createStore({
    state: {
        // 초기에는 로컬 스토리지에서 사용자 정보를 가져옵니다.
        user: getUserFromLocalStorage(),
    },
    mutations: {
        login(state, { user, access }) {
            state.user = user;
            localStorage.setItem('user', user);
            localStorage.setItem('access', access);
        },
        logout(state) {
            state.user = null;
            localStorage.removeItem('user');
            localStorage.removeItem('access');
        }
    },
    actions: {
        login({ commit }, { email, password }) { // 함수 매개변수 이름 변경
            axios.post('http://localhost:7777/login', { email, password }) // axios.post 메서드에 데이터를 객체로 전달
            .then(response => {
                console.log('로그인 성공:', response.data);
                // 로그인 성공 후 다음 작업 수행
                commit('login', { user: response.data.user, access: response.data.access });
            })
            .catch(error => {
                console.error('로그인 실패:', error);
                // 로그인 실패 시 처리
            });
        },
        logout({ commit }) {
            commit('logout');
        }
    },
    getters: {
        isLoggedIn: state => state.user !== null,
        userNickname: state => state.user ? state.user.nickname : '',
    }
});
