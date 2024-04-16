<template>
  <div id="app">
    <!-- KakaoMap 컴포넌트 사용 -->
    <KakaoMap />
  </div>
</template>

<script>
import KakaoMap from './components/KakaoMap.vue';

export default {
  name: 'App',
  components: {
    KakaoMap,
  },
};
</script>

