<!-- Login.vue -->
<template>
  <div>
    <h1>로그인</h1>
    <form @submit.prevent="loginUser">
      <label htmlFor="email">이메일:</label>
      <input type="email" id="email" v-model="email" required>

      <label htmlFor="password">비밀번호:</label>
      <input type="password" id="password" v-model="password" required>

      <button type="submit">로그인</button>
    </form>
    <p>회원이 아니신가요? <router-link to="/register">여기에서 회원가입 하세요.</router-link></p>
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
        this.$store.commit('login', { user: response.data.user, access: response.data.access });
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
/* 필요한 스타일 작성 */
</style>
