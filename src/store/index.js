// // store/index.js
// import { createStore } from 'vuex';
// import axios from 'axios';
//
// // 로컬 스토리지에서 사용자 정보를 가져오는 함수
// function getUserFromLocalStorage() {
//     const user = JSON.parse(localStorage.getItem('user'));
//     const access = localStorage.getItem('access');
//     return user && access ? { user, access } : null;
// }
//
// export default createStore({
//     state: {
//         // 초기에는 로컬 스토리지에서 사용자 정보를 가져옵니다.
//         user: getUserFromLocalStorage(),
//     },
//     // mutations에서 login 함수 수정
//     mutations: {
//         login(state, { access, user }) { // 매개변수 순서 변경
//             state.user = { nickname: user.nickname }; // 사용자 정보에서 닉네임 값만 추출하여 저장
//             localStorage.setItem('access', access); // access 토큰은 localStorage에 저장
//         },
//         logout(state) {
//             state.user = null;
//             localStorage.removeItem('access');
//         }
//     },
//
// // actions에서 login 함수 수정
//     actions: {
//         login({ commit }, { email, password }) {
//             axios.post('http://localhost:7777/login', { email, password })
//             .then(response => {
//                 console.log('로그인 성공:', response.data);
//                 // 사용자 닉네임과 access 토큰을 Vuex 스토어에 저장
//                 commit('login', { access: response.headers.get('access'), user: response.data.user });
//                 this.$router.push('/index'); // 로그인 후 /index 페이지로 이동
//             })
//             .catch(error => {
//                 console.error('로그인 실패:', error);
//                 // 로그인 실패 시 처리
//             });
//         },
//         logout({ commit }) {
//             commit('logout');
//         }
//     },
//     getters: {
//         isLoggedIn: state => state.user !== null,
//         userNickname: state => state.user ? state.user.nickname : '',
//     }
// });
