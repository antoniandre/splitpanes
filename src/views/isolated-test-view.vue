<template lang="pug">
//- This is an isolated test view. Just for testing purpose.
div.mx12
  //- w-button.mr2(@click="toggleHorizontal") Horizontal
  //- w-button(@click="hidePane2 = !hidePane2") toggle pane 2
  //- splitpanes.default-theme(:horizontal="horizontal" style="height: 400px")
    pane(size="85") 1
    pane(size="5" v-if="!hidePane2") 2
    pane(size="10") 3

  splitpanes.default-theme.example(style="height: 400px")
    pane(v-for="i in 8" :key="i" :min-size="5" :max-size="50")
      span {{ i }}
</template>

<script setup>
// import { ref } from 'vue'
import { Splitpanes, Pane } from '@/components/splitpanes/index'

// const horizontal = ref(true)
// const hidePane2 = ref(false)
// const panesNumber = 3

// const togglePane2 = () => {
//   hidePane2.value = !hidePane2.value
// }

// const toggleHorizontal = () => {
//   horizontal.value = !horizontal.value
// }
</script>

<style lang="scss">
</style>
