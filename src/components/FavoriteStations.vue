<template>
    <div>
      <h1>즐겨찾기 주유소 목록</h1>
      <ul class="favorite-stations-list">
        <li v-for="(station, index) in favoriteStations" :key="index" class="favorite-station-item">
          <!-- 즐겨찾기 주유소 목록을 표시하는 코드 -->
          <div>
            <h3>{{ station.place_name }}</h3>
            <p>{{ station.address_name }}</p>
            <p>{{ station.phone }}</p>
            <button @click="removeFavoriteStation(index)">제거</button>
          </div>
        </li>
      </ul>
    </div>
  </template>
  
  <script>
  export default {
    name: 'FavoriteStations',
    data() {
      return {
        favoriteStations: [] // 즐겨찾기 주유소 목록을 저장할 배열
      };
    },
    mounted() {
      // 서버로부터 즐겨찾기 주유소 목록을 가져오는 메서드 호출
      this.getFavoriteStations();
    },
    methods: {
      // 서버로부터 즐겨찾기 주유소 목록을 가져오는 메서드
      async getFavoriteStations() {
        try {
          const response = await fetch('http://localhost:3000/favorites');
          const data = await response.json();
          this.favoriteStations = data;
        } catch (error) {
          console.error('Error fetching favorite stations:', error);
        }
      },
      async removeFavoriteStation(index) {
        try {
          const station = this.favoriteStations[index];
          const response = await fetch(`http://localhost:3000/favorites/${station.id}`, {
            method: 'DELETE'
          });
          if (response.ok) {
            this.favoriteStations.splice(index, 1);
          } else {
            console.error('Failed to remove favorite station');
          }
        } catch (error) {
          console.error('Error removing favorite station:', error);
        }
      }
    }
  };
  </script>
  
  <style scoped>
  .favorite-stations-list {
    list-style-type: none;
    padding: 0;
  }
  
  .favorite-station-item {
    border: 1px solid #ddd;
    border-radius: 5px;
    margin-bottom: 10px;
    padding: 10px;
  }
  
  .favorite-station-item div {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  
  .favorite-station-item h3 {
    margin: 0;
  }
  
  .favorite-station-item button {
    background-color: #dc3545;
    color: #fff;
    border: none;
    border-radius: 5px;
    padding: 5px 10px;
    cursor: pointer;
  }
  
  .favorite-station-item button:hover {
    background-color: #c82333;
  }
  </style>
  