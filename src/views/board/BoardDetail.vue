<template>
    <div class="board-detail">
      <div class="common-buttons">
        <button type="button" class="w3-button w3-round w3-blue-gray" v-on:click="fnUpdate">수정</button>&nbsp;
        <button type="button" class="w3-button w3-round w3-red" v-on:click="fnDelete">삭제</button>&nbsp;
        <button type="button" class="w3-button w3-round w3-gray" v-on:click="fnList">목록</button>
      </div>
      <div class="board-contents">
        <h3>{{ title }}</h3>
        <div>
          <strong class="w3-large">{{ author }}</strong>
          <br>
          <span>{{ created_at }}</span>
        </div>
      </div>
      <div class="board-contents">
        <span>{{ contents }}</span>
      </div>
      <div class="common-buttons">
        <button type="button" class="w3-button w3-round w3-blue-gray" v-on:click="fnUpdate">수정</button>&nbsp;
        <button type="button" class="w3-button w3-round w3-red" v-on:click="fnDelete">삭제</button>&nbsp;
        <button type="button" class="w3-button w3-round w3-gray" v-on:click="fnList">목록</button>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        idx: this.$route.query.idx,
        title: '',
        author: '',
        contents: '',
        created_at: ''
      }
    },
    mounted() {
      this.fnGetView()
    },
    methods: {
      fnGetView() {
        // JSON 파일에서 데이터 가져오기
        const boards = require('../../../fake-server/db.json').boards;
        const board = boards.find(board => board.id === parseInt(this.idx));
        if (board) {
          this.title = board.title;
          this.author = board.author;
          this.contents = board.contents;
          this.created_at = board.created_at;
        } else {
          alert('해당 게시글을 찾을 수 없습니다.');
          this.fnList();
        }
      },
      fnList() {
        this.$router.push({ path: './list' });
      },
      fnUpdate() {
        // 수정 페이지로 이동하는 로직을 추가해야 합니다.
      },
      fnDelete() {
        if (!confirm("삭제하시겠습니까?")) return;
        // 삭제 로직을 추가해야 합니다.
      }
    }
  }
  </script>
  <style scoped>
  </style>