<template>
  <div class="container">
    <h2>나의 게시글</h2>
    <table class="table">
      <!-- 테이블 헤더 -->
      <thead>
      <tr>
        <th>ID</th>
        <th>제목</th>
        <th>작성자</th>
        <th>작성일</th>
      </tr>
      </thead>
      <!-- 테이블 바디 -->
      <tbody>
      <tr v-for="board in displayedBoards" :key="board.id">
        <td>{{ board.id }}</td>
        <td><router-link :to="'/board/' + board.id">{{ board.title }}</router-link></td>
        <td>{{ board.author }}</td>
        <td>{{ board.created_date }}</td>
      </tr>
      </tbody>
    </table>
    <!-- 페이지네이션 -->
    <div class="pagination">
      <button v-if="currentPage > 1" @click="prevPage" class="pagination-btn">이전</button>
      <button v-for="page in totalPages" :key="page" @click="setPage(page)" :class="{ 'pagination-btn': true, 'active': currentPage === page }">{{ page }}</button>
      <button v-if="currentPage < totalPages" @click="nextPage" class="pagination-btn">다음</button>
    </div>
    <br>

  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      boards: [],
      currentPage: 1,
      perPage: 10
    };
  },
  computed: {
    // 표시되는 게시물 목록
    displayedBoards() {
      const startIndex = (this.currentPage - 1) * this.perPage;
      const endIndex = this.currentPage * this.perPage;
      return this.boards.slice(startIndex, endIndex);
    },
    // 전체 페이지 수
    totalPages() {
      return Math.ceil(this.boards.length / this.perPage);
    }
  },
  mounted() {
    // 컴포넌트가 마운트되면 사용자의 게시물을 가져옵니다.
    this.fetchUserBoards();
  },
  methods: {
    // 사용자의 게시물을 가져오는 메서드
    fetchUserBoards() {
      // 사용자의 정보를 가져오는 API 호출
      axios.get('http://localhost:3000/users')
          .then(response => {
            // 사용자의 ID를 통해 해당 사용자가 작성한 게시물을 가져오는 API 호출
            axios.get(`http://localhost:7777/boards?nickname=${response.data.nickname}`)
                .then(response => {
                  // 가져온 게시물을 저장합니다.
                  this.boards = response.data;
                })
                .catch(error => {
                  console.error('Error fetching user boards:', error);
                });
          })
          .catch(error => {
            console.error('Error fetching user info:', error);
          });
    },
    // 페이지를 설정하는 메서드
    setPage(page) {
      this.currentPage = page;
    },
    // 이전 페이지로 이동하는 메서드
    prevPage() {
      if (this.currentPage > 1) {
        this.currentPage--;
      }
    },
    // 다음 페이지로 이동하는 메서드
    nextPage() {
      if (this.currentPage < this.totalPages) {
        this.currentPage++;
      }
    },
    // 새로운 게시물 작성 페이지로 이동하는 메서드
    goToPostForm() {
      this.$router.push('/post/new');
    }
  }
};
</script>

<style>
.container {
  margin: 20px auto;
  width: 80%;
}

.table {
  width: 100%;
  border-collapse: collapse;
}

.table th, .table td {
  border: 1px solid #ddd;
  padding: 8px;
  text-align: left;
}

.table th {
  background-color: #f2f2f2;
}

.pagination {
  margin-top: 20px;
  text-align: center;
}

.pagination-btn {
  background-color: #4CAF50;
  color: white;
  padding: 8px 16px;
  border: none;
  cursor: pointer;
}

.pagination-btn:hover {
  background-color: #45a049;
}

.active {
  background-color: #45a049;
}

.add-btn {
  background-color: #008CBA;
  color: white;
  padding: 10px 20px;
  border: none;
  cursor: pointer;
  margin-top: 20px;
}

.add-btn:hover {
  background-color: #00698C;
}
</style>
