<template>
    <div class="user-info">
      <h2>회원 정보 변경</h2>
      <form @submit.prevent="updateUserInfo">
        <div class="form-group">
          <label for="username">ID</label>
          <input type="text" id="username" v-model="userInfo.username" :disabled="disableInput" required>
        </div>
        <div class="form-group">
          <label for="nickname">닉네임</label>
          <input type="text" id="nickname" v-model="userInfo.nickname" :disabled="disableInput" required>
        </div>
        <div class="form-group">
          <label for="email">E-MAIL</label>
          <input type="email" id="email" v-model="userInfo.email" :disabled="disableInput" required @blur="validateEmail">
          <p v-if="emailErrorMessage" class="error-message">{{ emailErrorMessage }}</p>
        </div>
        <div class="form-group">
          <label for="password">새 비밀번호</label>
          <input type="password" id="password" v-model="password" :disabled="disableInput" required @input="validatePassword">
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
          <input type="password" id="passwordConfirm" v-model="passwordConfirm" :disabled="disableInput" required @input="validatePasswordConfirm">
          <p v-if="passwordMismatch" class="error-message">비밀번호가 일치하지 않습니다.</p>
        </div>
        <button type="button" @click="toggleInput" v-if="!editMode">수정</button>
        <button type="submit" v-if="editMode" :disabled="!canSubmit">변경</button>
      </form>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        userInfo: {
          id: '', // 사용자 ID
          username: '',
          nickname: '',
          email: ''
        },
        password: '',
        passwordConfirm: '',
        emailErrorMessage: '',
        passwordMismatch: false,
        passwordLengthMet: false,
        passwordUpperCaseMet: false,
        passwordSpecialCharacterMet: false,
        passwordConditionsMet: 0,
        editMode: false,
        disableInput: true // 수정 모드일 때 입력 필드 활성화 여부
      };
    },
    computed: {
      canSubmit() {
        return (
          this.userInfo.username &&
          this.userInfo.nickname &&
          this.userInfo.email &&
          this.password &&
          this.passwordConfirm &&
          !this.emailErrorMessage &&
          !this.passwordMismatch &&
          this.passwordConditionsMet === 3
        );
      }
    },
    methods: {
    async checkUsername() {
      try {
        const response = await fetch(`http://localhost:3000/users?username=${this.userInfo.username}`);

        if (response.ok) {
          const userData = await response.json();
          this.usernameExists = userData.length > 0;
        } else {
          console.error('아이디 중복 검사 오류');
        }
      } catch (error) {
        console.error('아이디 중복 검사 오류:', error);
      }
    },
      async updateUserInfo() {
        // 유효성 검사
        if (!this.canSubmit) {
          console.error('모든 필드를 올바르게 입력하세요.');
          return;
        }
  
        // 실제 업데이트 로직
        try {
          const response = await fetch(`http://localhost:3000/users/${this.userInfo.id}`, {
            method: 'PUT',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({
              username: this.userInfo.username,
              nickname: this.userInfo.nickname,
              email: this.userInfo.email,
              password: this.password
            })
          });
  
          if (response.ok) {
            console.log('회원 정보 변경 성공');
            this.toggleInput();
          } else {
            console.error('회원 정보 변경 실패');
          }
        } catch (error) {
          console.error('회원 정보 변경 오류:', error);
        }
      },
      validateEmail() {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  
        if (!emailRegex.test(this.userInfo.email)) {
          this.emailErrorMessage = '올바른 이메일을 입력하세요.';
        } else {
          this.emailErrorMessage = '';
        }
      },
      validatePassword() {
        this.passwordLengthMet = this.password.length >= 4;
        this.passwordUpperCaseMet = /[A-Z]/.test(this.password);
        this.passwordSpecialCharacterMet = /[ `!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?~]/.test(this.password);
        this.passwordConditionsMet = [
          this.passwordLengthMet,
          this.passwordUpperCaseMet,
          this.passwordSpecialCharacterMet
        ].filter(condition => condition).length;
      },
      validatePasswordConfirm() {
        this.passwordMismatch = this.password !== this.passwordConfirm;
      },
      toggleInput() {
        this.editMode = !this.editMode;
        this.disableInput = !this.disableInput; // 수정 모드일 때 입력 필드 활성화 여부 변경
      }
    }
  };
  </script>
  
  <style scoped>
  .user-info {
    padding: 20px;
  }
  
  .form-group {
    margin-bottom: 20px;
  }
  
  input[type="text"],
  input[type="email"],
  input[type="password"] {
    width: 100%;
    padding: 8px;
    border: 1px solid #ccc;
    border-radius: 4px;
  }
  
  button {
    padding: 10px 20px;
    background-color: #007bff;
    color: white;
    border: none;
    border-radius: 4px;
    cursor: pointer;
  }
  
  button:hover {
    background-color: #0056b3;
  }
  
  button:disabled {
    background-color: #ccc;
    cursor: not-allowed;
  }
  </style>
  