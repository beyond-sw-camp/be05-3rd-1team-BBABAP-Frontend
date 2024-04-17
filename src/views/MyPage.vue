<template>
    <div class="my-page">
      <h2>마이페이지</h2>
      <div class="tab-menu">
        <router-link to="/mypage/userinfo">내 정보 변경</router-link>
        <router-link to="/mypage/myposts">나의 게시글</router-link>
        <router-link to="/mypage/favoritestations">충전소 즐겨찾기</router-link>
        <router-link to="/mypage/chargecredits">요금 충전</router-link>
        <router-link to="/mypage/mycoupons">내 쿠폰</router-link>
        <router-link to="/mypage/inquiries">문의사항</router-link>
      </div>
      <!-- 탭 내용을 표시할 공간 -->
      <router-view></router-view>
    </div>
  </template>
  
  <script>
  export default {
    name: 'MyPage',
  };
  </script>
  
  <style scoped>
  .my-page {
    padding: 20px;
  }
  
  .tab-menu {
    display: flex;
    justify-content: space-around;
    margin-bottom: 20px;
  }
  
  .tab-menu a {
    text-decoration: none;
    color: #333;
    padding: 10px;
    border-bottom: 2px solid transparent;
  }
  
  .tab-menu a.router-link-exact-active {
    border-bottom-color: #007bff;
  }
  </style>
  