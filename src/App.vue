<template>
  <div id="app">
    <KakaoMap />
    <ChargingStation />
  </div>
</template>

<script>
import KakaoMap from "./components/KakaoMap";

export default {
  name: "App",
  components: {
    KakaoMap,
  }
};
</script>
