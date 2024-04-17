<template>
  <div class="login-form">
    <h2>로그인</h2>
    <form @submit.prevent="login">
      <div class="form-group">
        <label for="login-username">ID</label>
        <input type="text" id="login-username" v-model="username" required>
      </div>
      <div class="form-group">
        <label for="login-password">비밀번호</label>
        <input type="password" id="login-password" v-model="password" required>
      </div>
      <button type="submit">로그인</button>
    </form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      username: '',
      password: ''
    };
  },
  methods: {
    async login() {
  try {
    const response = await fetch('http://localhost:3000/users', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    });

    if (response.ok) {
      const users = await response.json();
      const user = users.find(user => user.username === this.username && user.password === this.password);
      if (user) {
        // 로그인 성공
        alert(`${user.nickname} 님 반갑습니다!`);
        // 로그인 성공 시 홈페이지로 자동 이동
        this.$router.push('/');
        // 상단바에 닉네임 표시 및 로그아웃 버튼 추가
        this.$store.commit('setUser', user); // Vuex 사용 시 사용자 정보 저장
      } else {
        // 로그인 실패
        alert('아이디 또는 비밀번호가 틀렸습니다.');
      }
    } else {
      console.error('사용자 정보를 불러오는데 실패했습니다.');
    }
  } catch (error) {
    console.error('로그인 오류:', error);
  }
}

  }
};
</script>

<style scoped>
/* 필요한 스타일링은 여기에 추가하세요 */
.login-form {
  max-width: 400px;
  margin: 0 auto;
  padding: 20px;
  border: 1px solid #ccc;
  border-radius: 5px;
  background-color: #f9f9f9;
}

.login-form h2 {
  margin-bottom: 20px;
}

.login-form form {
  display: flex;
  flex-direction: column;
}

.login-form .form-group {
  display: flex;
  flex-direction: column;
  margin-bottom: 20px;
}

.login-form label {
  margin-bottom: 5px;
}

.login-form input {
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 3px;
  margin-bottom: 10px;
}

.login-form button {
  padding: 10px 20px;
  background-color: #007bff;
  color: #fff;
  border: none;
  border-radius: 3px;
  cursor: pointer;
}

.login-form button:hover {
  background-color: #0056b3;
}
</style>
