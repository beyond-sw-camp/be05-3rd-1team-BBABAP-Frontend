<template>
  <form @submit.prevent="registerUser">
    <label htmlFor="email">이메일:</label>
    <input type="email" id="email" v-model="email" required>

    <label htmlFor="password">비밀번호:</label>
    <input type="password" id="password" v-model="password" required>

    <label htmlFor="nickname">닉네임:</label>
    <input type="text" id="nickname" v-model="nickname" required>

    <button type="submit">등록</button>
  </form>
</template>

<script>
import axios from 'axios';

export default {
  name: "RegisterView",
  data() {
    return {
      email: '',
      password: '',
      nickname: ''
    };
  },
  methods: {
    registerUser() {
      axios.post('http://localhost:7777/members/register', {
        email: this.email,
        password: this.password,
        nickname: this.nickname
      })
      .then(response => {
        console.log('등록 성공:', response.data);
        this.$router.push('/login');
        // 등록 후 폼 초기화
        this.email = '';
        this.password = '';
        this.nickname = '';
        // 등록이 성공했을 때의 처리, 예를 들어 페이지를 이동하는 등의 작업을 수행할 수 있음
      })
      .catch(error => {
        console.error('등록 실패:', error);
        // 등록이 실패했을 때의 처리
      });
    }
  }
};
</script>

<style scoped>
/* 필요한 스타일 작성 */
</style>
