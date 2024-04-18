<template>
  <div class="post-details">
    <h2 class="post-title">{{ board.title }}</h2>
    <p>작성 시간: {{ formatCreatedAt(board.created_at) }}</p>
    <p class="post-content" v-html="board.content"></p>
    <button v-if="shouldShowButton" @click="deletePost">삭제하기</button>
    <button v-if="shouldShowButton" @click="goToUpdateForm">수정하기</button>
    
    <!-- 댓글 목록 컴포넌트 -->
    <CommentList :comments="comments" />

    <!-- 댓글 작성 폼 컴포넌트 -->
    <CommentForm @comment-added="handleCommentAdded" />

    <router-link to="/boardlist" class="back-link">뒤로 가기</router-link>
  </div>
</template>

<script>
import axios from 'axios';
import CommentForm from '../components/CommentForm.vue';
import CommentList from '../components/CommentList.vue';
import { mapGetters } from 'vuex';

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
  computed: {
    ...mapGetters(['userNickname']),
    shouldShowButton() {
      return this.board.author === this.userNickname;
    }
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
    },
    deletePost() {
      const boardId = this.$route.params.id;
      axios.delete(`http://localhost:7777/boards/${boardId}`)
        .then(response => {
          console.log(response);
          this.$router.push('/boardlist');
        })
        .catch(error => {
          console.error('Error deleting post:', error);
        });
    },
    goToUpdateForm() {
      const boardId = this.$route.params.id;
      this.$router.push(`/update/${boardId}`);
    },
    handleCommentAdded() {
      // 댓글이 추가되었을 때 실행할 작업을 여기에 작성
      // 댓글 목록을 다시 불러오거나, 다른 필요한 작업을 수행할 수 있음
      this.fetchComments(); // 댓글 목록을 다시 불러옴
    },
    formatCreatedAt(created_at) {
      const date = new Date(created_at);
      return `${date.getFullYear()}-${('0' + (date.getMonth() + 1)).slice(-2)}-${('0' + date.getDate()).slice(-2)} ${('0' + date.getHours()).slice(-2)}:${('0' + date.getMinutes()).slice(-2)}`;
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