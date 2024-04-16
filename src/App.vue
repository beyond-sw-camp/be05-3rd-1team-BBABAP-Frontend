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
  }
}
</script>

<style>

</style>