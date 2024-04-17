<template>
  <div class="post-details">
    <h2 class="post-title">{{ board.title }}</h2>
    <p class="post-content">{{ board.content }}</p>
    <router-link to="/boardlist" class="back-link">뒤로 가기</router-link>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      board: {}
    };
  },
  created() {
    this.fetchPost();
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