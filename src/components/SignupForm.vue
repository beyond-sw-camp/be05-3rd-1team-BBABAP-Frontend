<template>
  <div class="signup-form">
    <h2>회원가입</h2>
    <form @submit.prevent="signup">
      <div class="form-group">
        <label for="username">ID</label>
        <input type="text" id="username" v-model="username" required>
      </div>
      <div class="form-group">
        <label for="nickname">닉네임</label>
        <input type="text" id="nickname" v-model="nickname" required>
      </div>
      <div class="form-group">
        <label for="email">E-MAIL</label>
        <input type="email" id="email" v-model="email" required @blur="validateEmail">
        <p v-if="emailErrorMessage" class="error-message">{{ emailErrorMessage }}</p>
      </div>
      <div class="form-group">
        <label for="password">PASSWORD</label>
        <input type="password" id="password" v-model="password" required @input="validatePassword">
        <div class="password-strength-bar">
          <div :style="{ width: passwordLengthMet ? '33.33%' : '0%', backgroundColor: passwordLengthMet ? '#6f9e5e' : '' }" class="strength-meter-1"></div>
          <div :style="{ width: passwordUpperCaseMet ? '33.33%' : '0%', backgroundColor: passwordUpperCaseMet ? '#6f9e5e' : '' }" class="strength-meter-2"></div>
          <div :style="{ width: passwordSpecialCharacterMet ? '33.33%' : '0%', backgroundColor: passwordSpecialCharacterMet ? '#6f9e5e' : '' }" class="strength-meter-3"></div>
        </div>
        <div class="password-conditions">
          <span :class="{ 'condition-met': passwordLengthMet }">최소 4자 이상</span>
          <span :class="{ 'condition-met': passwordUpperCaseMet }">대문자 포함</span>
          <span :class="{ 'condition-met': passwordSpecialCharacterMet }">특수문자 포함</span>
        </div>
      </div>
      <div class="form-group">
        <label for="passwordConfirm">비밀번호 확인</label>
        <input type="password" id="passwordConfirm" v-model="passwordConfirm" required @input="validatePasswordConfirm">
        <p v-if="passwordMismatch" class="error-message">비밀번호가 일치하지 않습니다.</p>
      </div>
      <button :disabled="!canSubmit" type="submit">회원가입</button>
    </form>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      username: '',
      nickname: '',
      email: '',
      password: '',
      passwordConfirm: '',
      emailErrorMessage: '',
      passwordMismatch: false,
      passwordLengthMet: false,
      passwordUpperCaseMet: false,
      passwordSpecialCharacterMet: false,
      passwordConditionsMet: 0,
      users: [] // 사용자 데이터를 저장할 배열
    };
  },
  async created() {
    try {
      const response = await axios.get('http://localhost:3000/users');
      this.users = response.data;
    } catch (error) {
      console.error('사용자 데이터를 가져오는 중 에러 발생:', error);
    }
  },
  computed: {
    canSubmit() {
      return (
        this.username &&
        this.nickname &&
        this.email &&
        this.password &&
        this.passwordConfirm &&
        !this.emailErrorMessage &&
        !this.passwordMismatch &&
        this.passwordConditionsMet === 3
      );
    }
  },
  methods: {
    async signup() {
  // 유효성 검사
  if (!this.canSubmit) {
    alert('모든 필드를 올바르게 입력하세요.');
    return;
  }

  // 아이디와 닉네임 중복 검사
  const usernameExists = this.checkUsernameExists(this.username);
  const nicknameExists = this.checkNicknameExists(this.nickname);

  if (usernameExists || nicknameExists) {
    alert('아이디 또는 닉네임이 이미 사용 중입니다.');
    return;
  }

  try {
    const response = await fetch('http://localhost:3000/users', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        username: this.username,
        nickname: this.nickname,
        email: this.email,
        password: this.password
      })
    });

    if (response.ok) {
  // 회원가입 성공
  console.log('회원가입 성공');
  
  // Vue Router를 사용하여 로그인 페이지로 이동
  this.$router.push({ path: '/login' });
} else {
  // 회원가입 실패
  console.error('회원가입 실패');
}

  } catch (error) {
    console.error('회원가입 오류:', error);
  }
},

    checkUsernameExists(username) {
      return this.users.some(user => user.username === username);
    },
    checkNicknameExists(nickname) {
      return this.users.some(user => user.nickname === nickname);
    },
    validateEmail() {
      // 간단한 이메일 유효성 검사 정규식
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

      if (!emailRegex.test(this.email)) {
        this.emailErrorMessage = '올바른 이메일을 입력하세요.';
      } else {
        this.emailErrorMessage = '';
      }
    },
    validatePassword() {
      // 비밀번호 길이가 4자 이상인지 확인
      this.passwordLengthMet = this.password.length >= 4;

      // 대문자 포함 여부 확인
      this.passwordUpperCaseMet = /[A-Z]/.test(this.password);

      // 특수문자 포함 여부 확인
      this.passwordSpecialCharacterMet = /[ `!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?~]/.test(this.password);

      // 만족하는 비밀번호 조건 개수 계산
      this.passwordConditionsMet = [
        this.passwordLengthMet,
        this.passwordUpperCaseMet,
        this.passwordSpecialCharacterMet
      ].filter(condition => condition).length;
    },
    validatePasswordConfirm() {
      // 비밀번호 확인 일치 여부 확인
      this.passwordMismatch = this.password !== this.passwordConfirm;
    }
  }
}

</script>

<style>
/* 스타일은 그대로 유지됩니다. */
.password-strength-bar {
  display: flex;
  height: 5px;
  background-color: #ccc;
  margin-bottom: 5px;
}

.strength-meter-1,
.strength-meter-2,
.strength-meter-3 {
  height: 100%;
  transition: width 0.3s;
}

.strength-meter-1 {
  background-color: #6f9e5e;
}

.strength-meter-2 {
  background-color: #6f9e5e;
}

.strength-meter-3 {
  background-color: #6f9e5e;
}

.password-conditions {
  display: flex;
  justify-content: space-between;
  margin-bottom: 10px;
}

.condition-met {
  color: green;
}

.signup-form {
  max-width: 400px;
  margin: 0 auto;
  padding: 20px;
  border: 1px solid #ccc;
  border-radius: 5px;
  background-color: #f9f9f9;
}

.signup-form h2 {
  margin-bottom: 20px;
}

.signup-form form {
  display: flex;
  flex-direction: column;
}

.signup-form .form-group {
  display: flex;
  flex-direction: column;
  margin-bottom: 20px; /* 변경된 부분: 이전에는 15px 였습니다 */
}

.signup-form label {
  margin-bottom: 5px; /* 변경된 부분: 간격이 너무 컸습니다 */
}

.signup-form input {
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 3px;
  margin-bottom: 10px; /* 변경된 부분: 라벨과의 간격을 조정했습니다 */
}

.signup-form button {
  padding: 10px 20px;
  background-color: #007bff;
  color: #fff;
  border: none;
  border-radius: 3px;
  cursor: pointer;
}

.signup-form button:hover {
  background-color: #0056b3;
}
</style>