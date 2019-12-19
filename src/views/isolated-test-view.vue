<template lang="pug">
//- This is an isolated test view. Just for testing purpose.
div
  v-btn(small color="primary" @click="hidePane2 = !hidePane2") {{ hidePane2 ? 'Show' : 'Hide' }} Pane 2
  splitpanes.default-theme.example(style="height: 400px")
    pane
      span 1
    pane(v-if="!hidePane2")
      span 2
    pane
      span 3
</template>

<script>
import { Splitpanes, Pane } from '@/components/splitpanes/index'

const now = new Date()
export default {
  components: { Splitpanes, Pane },
  data: () => ({
    horizontal: true,
    hidePane2: false
  }),

  methods: {
  }
}
</script>

<style lang="scss">
</style>
