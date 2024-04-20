<template>
    <div class="comment-form">
      <textarea v-model="newCommentText" placeholder="댓글을 입력하세요" class="comment-input"></textarea>
      <button @click="addComment" class="comment-btn">댓글 작성</button>
    </div>
</template>
  
<script>
  import axios from 'axios';
  import { mapGetters } from 'vuex';
  
  export default {
    data() {
      return {
        newCommentText: '',
        author: '',
      };
    },
    computed: {
    // userNickname getter를 가져옴
      ...mapGetters(['userNickname'])
    },
    methods: {
      addComment() {
        const boardId = this.$route.params.id;
        axios.post(`http://localhost:7777/boards/${boardId}/comments`, { text: this.newCommentText, author: this.userNickname})
          .then(response => {
            this.newCommentText = ''; // Clear the input field after successful submission
            this.$emit('comment-added'); // Emit event to notify parent component (BoardView) that a new comment has been added
            console.log(response);
          })
          .catch(error => {
            console.error('Error adding comment:', error);
          });
      }
    }
  };
  </script>
  
  <style scoped>
  .comment-input {
    width: calc(100% - 20px);
    padding: 10px;
    margin-bottom: 10px;
  }
  
  .comment-btn {
    width: 100%;
    padding: 10px;
    background-color: #007bff;
    color: #fff;
    border: none;
    cursor: pointer;
  }
  
  .comment-btn:hover {
    background-color: #0056b3;
  }
  </style>