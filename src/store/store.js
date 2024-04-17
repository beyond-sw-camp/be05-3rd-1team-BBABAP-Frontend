import { createStore } from 'vuex';

const store = createStore({
  state: {
    user: null // 사용자 정보를 저장할 상태
  },
  mutations: {
    setUser(state, user) {
      state.user = user;
    },
    clearUser(state) {
      state.user = null;
    }
  },
  getters: {
    // user 상태의 nickname 속성을 반환하는 getter
    userNickname: state => {
      return state.user ? state.user.nickname : null;
    }
  }
});

export default store;