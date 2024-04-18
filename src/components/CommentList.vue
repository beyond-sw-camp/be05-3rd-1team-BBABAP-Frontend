<template>
  <div class="comment-list">
    <h3 class="comment-heading">댓글</h3>
    <ul class="comment-items">
      <li v-for="comment in comments" :key="comment.id" class="comment-item">
        <p class="comment-text">{{ comment.text }}</p>
        <p class="comment-author">작성자: {{ comment.author }}</p>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  props: {
    comments: {
      type: Array,
      required: true
    }
  }
};
</script>

<style scoped>
.comment-list {
  margin-top: 20px;
}

.comment-heading {
  font-size: 24px;
  font-weight: bold;
  margin-bottom: 10px;
}

.comment-items {
  list-style-type: none;
  padding: 0;
}

.comment-item {
  background-color: #f9f9f9;
  padding: 10px;
  margin-bottom: 10px;
}

.comment-text {
  font-size: 16px;
  margin-bottom: 5px;
}

.comment-author {
  font-style: italic;
  color: #777;
}
</style>