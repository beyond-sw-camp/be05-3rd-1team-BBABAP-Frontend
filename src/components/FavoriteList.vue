<template>
    <div>
      <h1>즐겨찾기 목록</h1>
      <ul class="favorite-list">
        <li v-for="(favorite, index) in favorites" :key="index" class="favorite-item">
          <!-- 즐겨찾기 목록을 표시하는 코드 -->
          <div>
            <h3>{{ favorite.place_name }}</h3>
            <p>{{ favorite.address_name }}</p>
            <p>{{ favorite.phone }}</p>
            <button @click="removeFavorite(index)">제거</button>
          </div>
        </li>
      </ul>
    </div>
  </template>
  
  <script>
  export default {
    name: 'FavoriteList',
    data() {
      return {
        favorites: [] // 즐겨찾기 목록을 저장할 배열
      };
    },
    mounted() {
      // 서버로부터 즐겨찾기 목록을 가져오는 메서드 호출
      this.getFavorites();
    },
    methods: {
      // 서버로부터 즐겨찾기 목록을 가져오는 메서드
      async getFavorites() {
        try {
          const response = await fetch('http://localhost:3000/favorites');
          const data = await response.json();
          this.favorites = data;
        } catch (error) {
          console.error('Error fetching favorites:', error);
        }
      },
      async removeFavorite(index) {
        try {
          const favorite = this.favorites[index];
          const response = await fetch(`http://localhost:3000/favorites/${favorite.id}`, {
            method: 'DELETE'
          });
          if (response.ok) {
            this.favorites.splice(index, 1);
          } else {
            console.error('Failed to remove favorite');
          }
        } catch (error) {
          console.error('Error removing favorite:', error);
        }
      }
    }
  };
  </script>
  
  <style scoped>
  .favorite-list {
    list-style-type: none;
    padding: 0;
  }
  
  .favorite-item {
    border: 1px solid #ddd;
    border-radius: 5px;
    margin-bottom: 10px;
    padding: 10px;
  }
  
  .favorite-item div {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  
  .favorite-item h3 {
    margin: 0;
  }
  
  .favorite-item button {
    background-color: #dc3545;
    color: #fff;
    border: none;
    border-radius: 5px;
    padding: 5px 10px;
    cursor: pointer;
  }
  
  .favorite-item button:hover {
    background-color: #c82333;
  }
  </style>
  