<template>   
  <div>
    <HeaderLayout />
    <router-view />
    <FooterLayout />
    <KakaoMap />
    <FavoriteList :favorites="favorites" />
  </div>
</template>

<script>
import HeaderLayout from '@/commonLayout/HeaderLayout.vue'
import FooterLayout from '@/commonLayout/FooterLayout.vue'
import FavoriteList from '@/components/FavoriteList.vue' // FavoriteList 컴포넌트 import 추가

export default {
  components: {
    HeaderLayout,
    FooterLayout,
    FavoriteList, // FavoriteList 컴포넌트 추가
  },
  data() {
    return {
      favorites: [], // 즐겨찾기 목록을 저장할 배열
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
  },
}
</script>

<style>

</style>
