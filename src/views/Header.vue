<template>
  <div id="app">
    <header>
      <nav>
        <ul>
          <li><router-link to="/map">지도</router-link></li>
          <li><router-link to="/boards">게시판</router-link></li>
          <li v-if="isLoggedIn" class="user-info">
            <span>{{ userNickname }}</span>
            <button @click="logout">로그아웃</button>
          </li>
          <li v-else>
            <router-link to="/login">로그인</router-link>
          </li>
        </ul>
      </nav>
    </header>
    <router-view></router-view>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';

export default {
  name: 'App',
  computed: {
    ...mapGetters(['isLoggedIn', 'userNickname']) // Vuex의 getters를 가져옵니다.
  },
  methods: {
    ...mapActions(['logout']),
  },
  created() {
    if (this.isLoggedIn) {
      this.$router.push('/index'); // 로그인한 사용자인 경우 지도 페이지로 리다이렉트
    }
  }
}
</script>

<style scoped>
header {
  background-color: #333;
  padding: 10px;
}

nav ul {
  list-style-type: none;
  padding: 0;
  margin: 0;
}

nav ul li {
  display: inline;
  margin-right: 10px;
}

nav ul li a {
  color: white;
  text-decoration: none;
}

nav ul li span {
  color: white;
  margin-right: 10px;
}

nav ul li button {
  background-color: #4CAF50;
  border: none;
  color: white;
  padding: 5px 10px;
  text-align: center;
  text-decoration: none;
  font-size: 14px;
  border-radius: 3px;
  cursor: pointer;
}

nav ul li button:hover {
  background-color: #45a049;
}

nav ul li button:focus {
  outline: none;
}

.user-info {
  margin-left: auto; /* 로그아웃 버튼을 오른쪽으로 이동 */
}

nav ul li {
  font-size: 16px; /* nav 아이템의 글자 크기를 키움 */
}
</style>
