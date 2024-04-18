<template>   
  <div>
    <HeaderLayout />
    <router-view />
    <FooterLayout />
    <KakaoMap />
  </div>
</template>

<script>
import HeaderLayout from '@/commonLayout/HeaderLayout.vue'
import FooterLayout from '@/commonLayout/FooterLayout.vue'

export default {
  components: {
    HeaderLayout,
    FooterLayout,
  },
}
</script>

<style>
/* 필요한 스타일이 있다면 추가하세요. */
</style>
