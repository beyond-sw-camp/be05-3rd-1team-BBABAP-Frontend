<template>
  <div>
    <h1>충전소 게시판</h1>
    <ul>
      <li v-for="board in boards" :key="board.id">
        {{ board.title }}
        {{ board.nickname}}
      </li>
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