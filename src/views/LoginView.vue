<template>
  <div className="login-container">
    <h1>로그인</h1>
    <form @submit.prevent="loginUser" class="login-form">
      <label htmlFor="email">이메일:</label>
      <input type="email" id="email" v-model="email" required>

      <label htmlFor="password">비밀번호:</label>
      <input type="password" id="password" v-model="password" required>

      <button type="submit">로그인</button>
    </form>
    <p>회원이 아니신가요?
      <router-link to="/register">여기에서 회원가입 하세요.</router-link>
    </p>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      email: '',
      password: ''
    };
  },
  methods: {
    loginUser() {
      let formData = new FormData();
      formData.append('email', this.email);
      formData.append('password', this.password);

      axios.post('http://localhost:7777/login', formData)
      .then(response => {
        console.log('로그인 성공:', response.data);
        // 로그인 성공 시 사용자 정보를 Vuex 스토어에 저장
        this.$store.commit('login', {user: response.data.user, access: response.data.access});
        this.$router.push('/index'); // 로그인 후 /index 페이지로 이동
      })
      .catch(error => {
        console.error('로그인 실패:', error);
        // 로그인 실패 시 처리
      });
    }
  }
};
</script>

<style scoped>
.login-container {
  max-width: 400px;
  margin: 0 auto;
  padding: 20px;
  border: 1px solid #ccc;
  border-radius: 5px;
  background-color: #f9f9f9;
}

.login-form label {
  font-weight: bold;
}

.login-form input[type="email"],
.login-form input[type="password"] {
  width: 100%;
  padding: 8px;
  margin-top: 5px;
  margin-bottom: 10px;
  border: 1px solid #ccc;
  border-radius: 3px;
}

.login-form button {
  width: 100%;
  padding: 10px;
  background-color: #4caf50;
  color: white;
  border: none;
  border-radius: 3px;
  cursor: pointer;
  transition: background-color 0.3s;
}

.login-form button:hover {
  background-color: #45a049;
}

.login-container p {
  margin-top: 10px;
  text-align: center;
}

.login-container p a {
  color: #007bff;
  text-decoration: none;
}

.login-container p a:hover {
  text-decoration: underline;
}
</style>
