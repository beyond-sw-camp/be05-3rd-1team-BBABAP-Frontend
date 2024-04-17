<template>
  <div>
    <h1>게시판</h1>
    <router-link to="/write">글쓰기</router-link>
    <ul>
      <li v-for="board in boards" :key="board.id">
        {{ board.title }}
        {{ board.nickname}}</li>
    </ul>

  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      boards: []
    };
  },

  goToWritePage() {
    // 글쓰기 페이지로 이동하는 로직을 여기에 추가합니다
    // 예를 들어, Vue Router를 사용한다면 아래와 같이 작성할 수 있습니다
    this.$router.push('/write');
  },

  mounted() {
    // 게시글 목록을 가져오는 API 호출
    axios.get('http://localhost:7777/boards')
        .then(response => {
          // API 호출에 성공하면 데이터를 저장
          this.boards = response.data.content;
        })
        .catch(error => {
          console.error('API 호출에 실패했습니다:', error);
        });
  }
};
</script>
