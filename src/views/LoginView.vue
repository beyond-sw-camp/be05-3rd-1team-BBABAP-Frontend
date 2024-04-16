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
      // 폼 데이터 생성
      let formData = new FormData();
      formData.append('email', this.email);
      formData.append('password', this.password);

      axios.post('http://localhost:7777/login', formData)
      .then(response => {
        console.log('로그인 성공:', response.data);
        // 로그인 성공 후 다음 작업 수행
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
