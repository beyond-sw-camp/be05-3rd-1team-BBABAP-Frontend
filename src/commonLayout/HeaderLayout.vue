<template>
    <header>
      <div class="navbar">
        <div class="brand">BBABAP</div>
        <div class="nav-links">
          <router-link to="/">Home</router-link>
          <router-link to="/about">About</router-link>
          <router-link to="/boardlist">Board</router-link>
          <router-link v-if="!user" to="/login">Login</router-link>
          <router-link v-if="!user" to="/signup">Join us</router-link>
          <div v-if="user" class="user-info">
            {{ user.nickname }} 님 반갑습니다!
            <router-link to="/mypage">마이페이지</router-link>
            <button @click="logout">로그아웃</button>
          </div>
        </div>
      </div>
    </header>
  </template>
  
  <script>
  export default {
    computed: {
      user() {
        return this.$store.state.user;
      }
    },
    methods: {
      logout() {
        // 로그아웃 처리
        this.$store.commit('clearUser'); // Vuex 사용 시 사용자 정보 초기화
        // 로그아웃 후 홈페이지로 이동
        this.$router.push('/');
      }
    }
  };
  </script>
  
  <style scoped>
  .navbar {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 30px;
  }
  
  .nav-links {
    display: flex;
    align-items: center;
  }
  
  .user-info {
    display: flex;
    align-items: center;
  }
  
  .user-info button {
    margin-left: 10px;
  }
  
  .brand {
    font-size: 20px;
    font-weight: bold;
  }
  
  .auth-link {
    margin-left: 10px;
    font-weight: bold;
    color: #2c3e50;
  }
  
  .auth-link.router-link-exact-active {
    color: #42b983;
  }
  </style>
  