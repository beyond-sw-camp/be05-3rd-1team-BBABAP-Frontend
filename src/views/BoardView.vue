<template>
  <div class="post-details">
    <h2 class="post-title">{{ board.title }}</h2>
    <p class="post-content" v-html="board.content"></p>
    
    <!-- 댓글 목록 컴포넌트 -->
    <CommentList :comments="comments" />

    <!-- 댓글 작성 폼 컴포넌트 -->
    <CommentForm @comment-added="fetchComments" />

    <router-link to="/boardlist" class="back-link">뒤로 가기</router-link>
  </div>
</template>

<script>
import axios from 'axios';
import CommentForm from '../components/CommentForm.vue';
import CommentList from '../components/CommentList.vue';

export default {
  components: {
    CommentForm,
    CommentList
  },
  data() {
    return {
      board: {},
      comments: []
    };
  },
  created() {
    this.fetchPost();
    this.fetchComments();
  },
  methods: {
    fetchPost() {
      const boardId = this.$route.params.id;
      axios.get(`http://localhost:7777/boards/${boardId}`)
        .then(response => {
          this.board = response.data;
        })
        .catch(error => {
          console.error('Error fetching post:', error);
        });
    },
    fetchComments() {
      const boardId = this.$route.params.id;
      axios.get(`http://localhost:7777/boards/${boardId}/comments`)
        .then(response => {
          this.comments = response.data;
        })
        .catch(error => {
          console.error('Error fetching comments:', error);
        });
    }
  }
};
</script>

<style scoped>
.post-details {
  max-width: 600px;
  margin: 0 auto;
  padding: 20px;
}

.post-title {
  font-size: 24px;
  font-weight: bold;
  margin-bottom: 10px;
}

.post-content {
  font-size: 16px;
  line-height: 1.5;
  margin-bottom: 20px;
}

.back-link {
  display: inline-block;
  color: #007bff;
  text-decoration: none;
  margin-top: 10px;
}

.back-link:hover {
  text-decoration: underline;
}
</style>