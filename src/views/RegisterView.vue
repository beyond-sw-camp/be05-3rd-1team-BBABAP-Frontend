<template>
  <form @submit.prevent="registerUser" class="register-form">
    <label for="email">이메일:</label>
    <input type="email" id="email" v-model="email" required>

    <label for="password">비밀번호:</label>
    <input type="password" id="password" v-model="password" required>

    <label for="nickname">닉네임:</label>
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
.register-form {
  max-width: 400px;
  margin: 0 auto;
  padding: 20px;
  border: 1px solid #ccc;
  border-radius: 5px;
  background-color: #f9f9f9;
}

.register-form label {
  font-weight: bold;
}

.register-form input[type="email"],
.register-form input[type="password"],
.register-form input[type="text"] {
  width: 100%;
  padding: 8px;
  margin-top: 5px;
  margin-bottom: 10px;
  border: 1px solid #ccc;
  border-radius: 3px;
}

.register-form button {
  width: 100%;
  padding: 10px;
  background-color: #4caf50;
  color: white;
  border: none;
  border-radius: 3px;
  cursor: pointer;
  transition: background-color 0.3s;
}

.register-form button:hover {
  background-color: #45a049;
}
</style>
