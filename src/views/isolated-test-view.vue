<template lang="pug">
//- This is an isolated test view. Just for testing purpose.
div
  w-button(@click="hidePane2 = !hidePane2") toggle pane 2
  splitpanes.default-theme(style="height: 400px")
    pane(size="85") 1
    pane(size="5" v-if="!hidePane2") 2
    pane(size="10") 3
</template>

<script setup>
import { ref } from 'vue'
import { Splitpanes, Pane } from '@/components/splitpanes/index'

const components = { Splitpanes, Pane }
const horizontal = true
const hidePane2 = ref(false)
const panesNumber = 3

// const togglePane2 = () => {
//   hidePane2 = !hidePane2
// }
</script>

<style lang="scss">
</style>
