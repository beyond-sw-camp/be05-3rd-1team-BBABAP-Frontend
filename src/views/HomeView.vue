<template>
  <div class="home">
    <FinalMap msg=""/>
  </div>
</template>

<script>
// @ is an alias to /src
import FinalMap from '@/components/FinalMap.vue'

export default {
  name: 'HomeView',
  components: {
    FinalMap
  }
}
</script>
