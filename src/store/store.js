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
  }
});

export default store;
