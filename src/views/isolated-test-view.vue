<template lang="pug">
splitpanes.default-theme(horizontal style="height: 500px")
  pane.w-flex.align-center.justify-center(v-for="pane in panes" :size="pane.size")
    | {{ pane.content }}

w-button.ma3(@click="panes.reverse()") Reverse panes order
</template>

<script setup>
import { reactive } from 'vue'
import { Splitpanes, Pane } from '@/components/splitpanes/index'

const panes = reactive([
  { content: 'Pane 1 content.', size: 30 },
  { content: 'Pane 2 content.', size: 15 },
  { content: 'Pane 3 content.', size: 25 }
])
</script>

<style lang="scss">
</style>
