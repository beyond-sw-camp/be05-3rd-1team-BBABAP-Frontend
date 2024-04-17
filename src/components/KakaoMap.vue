<template>
  <div>
    <div class="map_wrap">
      <div id="map" style="width: 100%; height: 500px; position: relative; overflow: hidden;"></div>

      <div id="menu_wrap" class="bg_white">
        <div class="option">
          <div>
            <form @submit.prevent="searchPlaces">
              키워드 : <input type="text" v-model="keyword" size="15" placeholder="전기차">
              <button type="submit">검색하기</button>
            </form>
          </div>
        </div>
        <hr>
        <ul id="placesList">
          <li v-for="(place, index) in places" :key="index" class="item">
            <span :class="'markerbg marker_' + (index + 1)"></span>
            <div class="info">
              <h5>{{ place.place_name }}</h5>
              <span>{{ place.road_address_name }}</span>
              <span class="jibun gray">{{ place.address_name }}</span>
              <span class="tel">{{ place.phone }}</span>
              <!-- 기존의 코드에 추가 -->
<span>
  <button @click="toggleFavorite(place)">즐겨찾기 {{ isFavorite(place) ? '제거' : '추가' }}</button>
</span>

            </div>
          </li>
        </ul>
        <div id="pagination"></div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "KakaoMap",
  data() {
    return {
      keyword: "",
      places: [],
      markers: []
    };
  },
  mounted() {
    if (window.kakao && window.kakao.maps) {
      this.initMap();
    } else {
      const script = document.createElement("script");
      script.onload = () => window.kakao.maps.load(this.initMap);
      script.src =
        "//dapi.kakao.com/v2/maps/sdk.js?autoload=false&appkey=915cffed372954b7b44804ed422b9cf0&libraries=services";
      document.head.appendChild(script);
    }
  },
  methods: {
    initMap() {
      const container = document.getElementById("map");
      const options = {
        center: new window.kakao.maps.LatLng(37.566826, 126.9786567),
        level: 3
      };

      this.map = new window.kakao.maps.Map(container, options);

      // 전기차 충전소 마커를 표시합니다
      this.displayElectricChargingStation();
    },
    displayElectricChargingStation() {
      const ps = new window.kakao.maps.services.Places();
      ps.categorySearch('OL7', this.placesSearchCB);
    },
    searchPlaces() {
      if (!this.keyword.trim()) {
        alert("키워드를 입력해주세요!");
        return;
      }

      // 검색을 place_name으로 변경
      const ps = new window.kakao.maps.services.Places();
      // ps.keywordSearch(this.keyword, this.placesSearchCB);
      ps.keywordSearch(this.keyword, this.placesSearchCB, { useMapBounds: true });
    },
    placesSearchCB(data, status, pagination) {
      if (status === window.kakao.maps.services.Status.OK) {
        this.places = data;
        this.displayPlaces();
        this.displayPagination(pagination);
      } else if (status === window.kakao.maps.services.Status.ZERO_RESULT) {
        alert("검색 결과가 존재하지 않습니다.");
      } else if (status === window.kakao.maps.services.Status.ERROR) {
        alert("검색 결과 중 오류가 발생했습니다.");
      }
    },
    displayPlaces() {
      // 기존 마커 제거
      this.removeMarkers();

      const bounds = new window.kakao.maps.LatLngBounds();

      // 검색 결과에 따라 마커 추가
      this.places.forEach((place, index) => {
        const position = new window.kakao.maps.LatLng(place.y, place.x);
        const markerImage = new window.kakao.maps.MarkerImage(
          "https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/marker_number_blue.png",
          new window.kakao.maps.Size(36, 37),
          {
            spriteSize: new window.kakao.maps.Size(36, 691),
            spriteOrigin: new window.kakao.maps.Point(0, (index * 46) + 10),
            offset: new window.kakao.maps.Point(13, 37)
          }
        );
        const marker = new window.kakao.maps.Marker({
          position,
          image: markerImage
        });

        marker.setMap(this.map);
        this.markers.push(marker);

        bounds.extend(position);
      });

      this.map.setBounds(bounds);
    },
    displayPagination(pagination) {
      const paginationEl = document.getElementById("pagination");
      paginationEl.innerHTML = "";

      for (let i = 1; i <= pagination.last; i++) {
        const el = document.createElement("a");
        el.href = "#";
        el.textContent = i;

        if (i === pagination.current) {
          el.className = "on";
        } else {
          el.onclick = () => {
            pagination.gotoPage(i);
          };
        }

        paginationEl.appendChild(el);
      }
    },
    removeMarkers() {
      this.markers.forEach(marker => marker.setMap(null));
      this.markers = [];
    },
    // 즐겨찾기 메서드를 컴포넌트의 메서드로 옮겼습니다.
    toggleFavorite(place) {
      if (this.isFavorite(place)) {
        this.removeFavorite(place);
      } else {
        this.addFavorite(place);
      }
    },
    isFavorite(place) {
      // this.favorites를 사용하도록 수정합니다.
      return this.$root.favorites.some(favorite => favorite.place_name === place.place_name);
    },
    async addFavorite(place) {
      try {
        const response = await fetch('http://localhost:3000/favorites', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(place)
        });
        if (response.ok) {
          const data = await response.json();
          this.$root.favorites.push(data);
        } else {
          console.error('Failed to add favorite');
        }
      } catch (error) {
        console.error('Error adding favorite:', error);
      }
    },
    async removeFavorite(place) {
      try {
        const index = this.$root.favorites.findIndex(favorite => favorite.place_name === place.place_name);
        const response = await fetch(`http://localhost:3000/favorites/${this.$root.favorites[index].id}`, {
          method: 'DELETE'
        });
        if (response.ok) {
          this.$root.favorites.splice(index, 1);
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
/* 여기에 스타일을 추가합니다 */
#menu_wrap {
  background-color: rgba(255, 255, 255, 0.9);
  padding: 15px;
  border-radius: 10px;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);
}
.option {
  margin-bottom: 15px;
  text-align: center;
}
.option input[type="text"] {
  width: 70%;
  height: 30px;
  border: 1px solid #ccc;
  border-radius: 5px;
  padding: 5px;
}
.option button[type="submit"] {
  width: 25%;
  height: 36px;
  border: none;
  border-radius: 5px;
  background-color: #007bff;
  color: white;
  cursor: pointer;
}
.option button[type="submit"]:hover {
  background-color: #0056b3;
}
#placesList {
  padding: 0;
  list-style: none;
}
#placesList .item {
  border-bottom: 1px solid #ddd;
  padding: 10px 0;
}
#placesList .item:last-child {
  border-bottom: none;
}
#placesList .item h5 {
  margin-bottom: 5px;
}
#placesList .item .info {
  color: #666;
}
#placesList .item .tel {
  color: #009900;
}
</style>
