<template>
  <div class="home">
    <KakaoMap msg=""/>
  </div>
</template>

<script>
// @ is an alias to /src
import KakaoMap from '@/components/KakaoMap.vue'

export default {
  name: 'HomeView',
  components: {
    KakaoMap
  }
}
</script>
