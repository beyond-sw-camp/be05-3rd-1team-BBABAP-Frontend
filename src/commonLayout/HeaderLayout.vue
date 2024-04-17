<template>
  <header :class="headerClasses">
    <div class="navbar">
      <router-link to="/" class="brand">BBABAP</router-link>
      <div class="nav-links">
        <router-link to="/" class="nav-link">Home</router-link>
        <router-link to="/about" class="nav-link">About</router-link>
        <router-link to="/boardlist" class="nav-link">Board</router-link>
        <router-link v-if="!user" to="/login" class="nav-link">Login</router-link>
        <router-link v-if="!user" to="/signup" class="nav-link">Join us</router-link>
        <div v-if="user" class="user-info">
          <span class="user-greeting">  {{ user.nickname }}님 반갑습니다!</span>
          <button @click="logout" class="logout-btn">로그아웃</button>
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
    },
    headerClasses() {
      return {
        'fixed-header': this.shrinkHeader,
        'expanded-header': !this.shrinkHeader
      };
    }
  },
  data() {
    return {
      shrinkHeader: true
    };
  },
  mounted() {
    window.addEventListener('scroll', this.handleScroll);
    this.handleScroll(); // Call handleScroll initially to set the initial state
  },
  beforeUnmount() {
    window.removeEventListener('scroll', this.handleScroll);
  },
  methods: {
    handleScroll() {
      this.shrinkHeader = window.scrollY > 0;
    },
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
.fixed-header {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  background-color: #343a40;
  color: #fff;
  padding: 20px 0;
  text-align: center;
  display: flex;
  justify-content: space-between;
  align-items: center;
  z-index: 1000;
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.1);
  transition: height 0.3s ease;
}

.expanded-header {
  padding: 30px 0;
  background-color: #343a40;
}

.navbar {
  display: flex;
  justify-content: space-between; /* Align brand and nav-links to the opposite ends */
  align-items: center;
  padding: 0 60px; /* Add padding to the navbar */
}

.brand {
  font-size: 20px;
  font-weight: bold;
  margin-right: 20px; /* Add right margin to the brand */
}

.nav-links {
  display: flex;
  align-items: center;
}

.nav-link {
  margin-left: 10px;
  font-weight: bold;
  color: #fff;
  text-decoration: none;
  transition: color 0.3s, border-bottom 0.3s;
}

.nav-link:hover {
  color: #42b983;
}

.nav-link.router-link-exact-active {
  border-bottom: 2px solid #42b983;
}

.user-info {
  display: flex;
  align-items: center;
}

.user-greeting {
  color: #fff; /* Set text color to white */
  font-weight: bold;
  margin: 10px;
  /*margin-right: 10px; !* Add right margin to separate from the button *!*/
}

.logout-btn {
  background-color: #42b983;
  color: #fff;
  border: none;
  padding: 8px 16px;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s;
}

.logout-btn:hover {
  background-color: #2c3e50;
}
</style>
