// Vuex store 생성
import { createStore } from 'vuex';

const store = createStore({
  state: {
    user: null // 사용자 정보를 저장할 상태
  },
  mutations: {
    setUser(state, user) {
      state.user = user;
      // 로그인 후 사용자 정보를 로컬 스토리지에 저장
      localStorage.setItem('user', JSON.stringify(user));
    },
    clearUser(state) {
      state.user = null;
      // 로그아웃 시 로컬 스토리지의 사용자 정보를 삭제
      localStorage.removeItem('user');
    },
    restoreUser(state) {
      // 로컬 스토리지에서 사용자 정보를 가져와 Vuex에 복원
      const user = JSON.parse(localStorage.getItem('user'));
      if (user) {
        state.user = user;
      }
    }
  }
});

export default store;
