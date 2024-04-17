<template>
  <div>
    <h1>BBABAP</h1>
    <table>
      <tr><!--주소 검색창-->
        <td>주소검색</td>
        <td><input type="text" v-model="address" @keydown.enter="searchAddress" /></td>
        <td><button type="button" @click="searchAddress">검색</button></td>
      </tr>
      <tr><!--내 위치로 이동하는 버튼-->
        <td colspan="3"><button type="button" @click="findMyLocation">내 위치로</button></td>
      </tr>
    </table>
    <!--카카오 맵을 표시할 영역-->
    <div ref="map" style="width:100%;height:700px;"></div>
    <!-- 검색 결과를 표시할 팝업 리스트 -->
    <div id="searchResults">
      <ul v-if="searchResult.length > 0">
        <li v-for="result in searchResult" :key="result.place_name">
          <a href="#" @click="moveToLocation(result.y, result.x)">{{ result.place_name }}</a>
        </li>
      </ul>
      <p v-else>검색 결과가 없습니다. 주소를 다시 확인해주세요.</p>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      map: null,
      marker: null,
      infowindow: null,
      currentCircle: null,
      address: '',
      searchResult: [],
      markers: []
    };
  },
  mounted() {
    kakao.maps.load(() => {
      this.initMap();
      this.findMyLocation();
    });
  },
  methods: {
    initMap() {
      // 지도 초기 세팅
      this.map = new kakao.maps.Map(this.$refs.map, {
        center: new kakao.maps.LatLng(33.450701, 126.570667),
        level: 3
      });
      this.marker = new kakao.maps.Marker();
      this.infowindow = new kakao.maps.InfoWindow({ removable: true });
    },
    displayCircle(lat, lon) {
      // 반경 표시
      if (this.currentCircle !== null) {
        this.currentCircle.setMap(null);
      }
      this.currentCircle = new kakao.maps.Circle({
        center: new kakao.maps.LatLng(lat, lon),
        radius: 1000,
        strokeWeight: 5,
        strokeColor: '#75B8FA',
        strokeOpacity: 1,
        strokeStyle: 'dashed',
        fillColor: '#CFE7FF',
        fillOpacity: 0.7
      });
      this.currentCircle.setMap(this.map);
    },
    displayMarker(locPosition, message) {
      // 마커 표시
      this.marker.setMap(this.map);
      this.marker.setPosition(locPosition);

      // 인포윈도우 설정
      this.infowindow.setContent(message);
      this.infowindow.open(this.map, this.marker);

      // 지도 중심 위치 설정
      this.map.setCenter(locPosition);

      // 마커 클릭 이벤트 등록
      kakao.maps.event.addListener(this.marker, 'click', () => {
        // 마커 클릭 시 주소 정보 가져오기
        const geocoder = new kakao.maps.services.Geocoder();
        geocoder.coord2Address(locPosition.getLng(), locPosition.getLat(), (result, status) => {
          if (status === kakao.maps.services.Status.OK) {
            let detailAddr = result[0].road_address ?
              `<div style="padding: 5px; border-bottom: 1px solid #eee; margin-bottom: 5px;">도로명주소 : ${result[0].road_address.address_name}</div>` :
              '';
            detailAddr += `<div style="padding: 5px;">지번 주소 : ${result[0].address.address_name}</div>` +
              `<button id="addFavorite" style="margin-top: 5px;">즐겨찾기 추가</button>`;

            // 인포윈도우에 상세 주소 정보 표시
            this.infowindow.setContent(`<div style="margin:10px; font-size:12px; min-width:200px; line-height:1.5;">${detailAddr}</div>`);

            // 즐겨찾기 버튼 클릭 이벤트 리스너
        const addFavoriteButtons = document.querySelectorAll('.addFavorite');
        addFavoriteButtons.forEach(button => {
          button.addEventListener('click', () => {
            alert("즐겨찾기 버튼 클릭");
          });
        });
        }
        });
      });
    },
    findMyLocation() {
      // 현재 위치 찾기
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          position => {
            const lat = position.coords.latitude;
            const lon = position.coords.longitude;
            const locPosition = new kakao.maps.LatLng(lat, lon);
            const message = '<div class="infoWindow">현재 나의 위치</div>';
            this.displayMarker(locPosition, message);
            this.displayCircle(lat, lon);
          },
          error => {
            console.error(error);
          },
          {
            enableHighAccuracy: true,
            maximumAge: 0,
            timeout: Infinity
          }
        );
      } else {
        alert('geolocation을 사용할 수 없습니다.');
      }
    },
    searchAddress() {
      const addr = this.address;
      alert("검색한 주소 : "+ addr);
      // kakao maps Places 객체 생성
      const places = new kakao.maps.services.Places();
      // 주소 검색 요청
      places.keywordSearch(addr, (result, status) => {
        if (status === kakao.maps.services.Status.OK) {
          if (result.length > 1) { // 검색 결과가 여러 개인 경우
            // 검색 결과 리스트 설정
            this.searchResult = result;
          } else if (result.length === 1) { // 검색 결과가 하나인 경우
            const coords = new kakao.maps.LatLng(result[0].y, result[0].x);
            this.displayMarker(coords, result[0].address_name);
            this.displayCircle(result[0].y, result[0].x);
            // 지번 주소 출력
            const geocoder = new kakao.maps.services.Geocoder();
            geocoder.coord2Address(result[0].x, result[0].y, (result, status) => {
              if (status === kakao.maps.services.Status.OK) {
                const address = result[0].address.address_name;
                alert("선택한 위치의 지번 주소: " + address);
                // 주소를 시/도 까지만 잘라내기
                const slicedAddr = address.split(' ').slice(0, 2).join(' ');
                // AJAX 통신으로 잘라낸 지번 주소 데이터 전달
                this.fetchChargerData(slicedAddr);
              }
            });
          } else {
            alert("검색 결과가 없습니다. 주소를 다시 확인해주세요.");
          }
        } else {
          alert("검색 결과가 없습니다. 주소를 다시 확인해주세요.");
        }
      });
    },
    moveToLocation(lat, lon) {
      // 위치 이동
      const locPosition = new kakao.maps.LatLng(lat, lon);
      const message = '<div class="infoWindow">검색 결과 위치</div>';
      this.displayMarker(locPosition, message);
      this.displayCircle(lat, lon);

      // 좌표를 주소로 변환하여 API 호출
      const geocoder = new kakao.maps.services.Geocoder();
      geocoder.coord2Address(lon, lat, (result, status) => {
        if (status === kakao.maps.services.Status.OK) {
          const address = result[0].address.address_name;
          const slicedAddr = address.split(' ').slice(0, 1).join(' ');
          this.fetchChargerData(slicedAddr);
        }
      });
    },
    fetchChargerData(address) {
      // 주소를 이용하여 충전소 데이터 가져오기
      axios.get(`http://localhost:7777/bbabap/getchargeraddress/${address}`)
        .then(response => {
          const data = response.data;
          console.log('Charger Info:', data);
          // 가져온 데이터로 마커 표시
          this.displayMarkersWithAddresses(data.data);
        })
        .catch(error => {
          console.error('Error fetching charger data:', error);
        });
    },
    displayMarkersWithAddresses(dataArray) {
    // 배열에 있는 각 데이터에 대해 반복하며 마커를 표시
    dataArray.forEach(charger => {
      // 주소를 이용하여 지도에 마커를 생성하고 표시
      const geocoder = new kakao.maps.services.Geocoder();
      geocoder.addressSearch(charger.주소, (result, status) => {
        if (status === kakao.maps.services.Status.OK) {
          const coords = new kakao.maps.LatLng(result[0].y, result[0].x);
          // 마커 생성
          const marker = new kakao.maps.Marker({
            position: coords
          });
          // 마커를 지도에 표시
          marker.setMap(this.map);
          // 마커 클릭 시 정보창에 주소 정보와 즐겨찾기 버튼을 함께 출력
          kakao.maps.event.addListener(marker, 'click', () => {
            // 마커의 좌표 정보를 사용하여 주소 정보를 요청.
            geocoder.coord2Address(marker.getPosition().getLng(), marker.getPosition().getLat(), (result, status) => {
              if (status === kakao.maps.services.Status.OK) {
                let detailAddr = result[0].road_address ?
                  `<div style="padding: 5px; border-bottom: 1px solid #eee; margin-bottom: 5px;">도로명주소 : ${result[0].road_address.address_name}</div>` :
                  '';
                detailAddr += `<div style="padding: 5px;">지번 주소 : ${result[0].address.address_name}</div><button class="addFavorite" style="margin-top: 5px;">즐겨찾기 추가</button>`;
                // 인포윈도우에 상세 주소 정보를 표시합니다
                this.infowindow.setContent(`<div style="margin:10px; font-size:12px; min-width:200px; line-height:1.5;">${charger.충전소명}</div><div style="margin:10px; font-size:12px; min-width:200px; line-height:1.5;">${detailAddr}</div>`);
                this.infowindow.open(this.map, marker);
                // 즐겨찾기 버튼 클릭 이벤트 리스너
                const addFavoriteButtons = document.querySelectorAll('.addFavorite');
                addFavoriteButtons.forEach(button => {
                  button.addEventListener('click', () => {
                    alert("즐겨찾기 버튼 클릭");
                  });
                });
              }
            });
          });
          // 마커를 클릭했을 때 정보창을 열기 위한 내용 설정
          const message = `<div class="infoWindow">${charger.충전소명}</div>`;
          this.infowindow.setContent(message);
          this.infowindow.open(this.map, marker);//지도에 정보창 표시
        }
      });
    });
  },
    findMyLocbtn() {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          position => {
            const lat = position.coords.latitude;
            const lon = position.coords.longitude;
            const locPosition = new kakao.maps.LatLng(lat, lon);
            const message = '<div class="infoWindow">현재 위치</div>';
            this.displayMarker(locPosition, message);
            this.displayCircle(lat, lon);
          },
          error => {
            console.error(error);
          },
          {
            enableHighAccuracy: true,
            maximumAge: 0,
            timeout: Infinity
          }
        );
      } else {
        alert('geolocation을 사용할 수 없어요..');
      }
    },
    removeMarkersbtn() {
      // 이전에 생성된 모든 마커를 지도에서 제거합니다.
      this.markers.forEach(marker => {
        // 클릭 이벤트 리스너를 함께 제거합니다.
        kakao.maps.event.removeListener(marker, 'click');
        marker.setMap(null);
      });
      // 배열을 비워줍니다.
      this.markers = [];
    },
    handleKeyDown(event) {
    if (event.key === "Enter") {
      this.searchAddress();
    }
  }
  }
};
</script>

<style scoped>
  .infoWindow {
    padding: 5px;
    border: 1px solid #CCCCCC;
    border-radius: 5px;
    width: auto;
    min-width: 150px;
    max-width: 400px;
    word-wrap: break-word;
    overflow: hidden;
  }
</style>
