<template>
    <div class="container">
      <h2>게시물 목록</h2>
      <table class="table">
        <thead>
          <tr>
            <th>ID</th>
            <th>제목</th>
            <th>작성자</th>
            <th>작성일</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="board in displayedBoards" :key="board.id">
            <td>{{ board.id }}</td>
            <td><router-link :to="'/board/' + board.id">{{ board.title }}</router-link></td>
            <td>{{ board.author }}</td>
            <td>{{ board.created_date }}</td>
          </tr>
        </tbody>
      </table>
      <div class="pagination">
        <button v-if="currentPage > 1" @click="prevPage" class="pagination-btn">이전</button>
        <button v-for="page in totalPages" :key="page" @click="setPage(page)" :class="{ 'pagination-btn': true, 'active': currentPage === page }">{{ page }}</button>
        <button v-if="currentPage < totalPages" @click="nextPage" class="pagination-btn">다음</button>
      </div>
      <div style="text-align:right">
        <button @click="goToPostForm" class="add-btn">게시물 작성하기</button>
      </div>
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
      totalPages() {
        return Math.ceil(this.boards.length / this.perPage);
      },
      displayedBoards() {
        const startIndex = (this.currentPage - 1) * this.perPage;
        const endIndex = this.currentPage * this.perPage;
        return this.boards.slice(startIndex, endIndex);
      }
    },
    created() {
      this.fetchBoards();
    },
    methods: {
      fetchBoards() {
        axios.get('http://localhost:7777/boards')
          .then(response => {
            this.boards = response.data;
          })
          .catch(error => {
            console.error('Error fetching boards:', error);
          });
      },
      goToPostForm() {
        this.$router.push('/post/new');
      },
      setPage(page) {
        this.currentPage = page;
      },
      nextPage() {
        if (this.currentPage < this.totalPages) {
          this.currentPage++;
        }
      },
      prevPage() {
        if (this.currentPage > 1) {
          this.currentPage--;
        }
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