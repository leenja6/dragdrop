<template>
   <component :is="pages"></component>
</template>
<script>
import { ref } from 'vue'
import TheDocument from '../src/pages/TheDocument.vue'
export default {
  setup(){
    const pages = ref('TheDocument')

    return{ pages }
  },
  components: { TheDocument },
}
</script>
