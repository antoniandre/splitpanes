<template lang="pug">
//- This is an isolated test view. Just for testing purpose.
div
  splitpanes.default-theme.example(
    vertical
    style="height: 400px")
    pane(v-for="i in 3" :key="i" :min-size="10")
      span {{ i }}
</template>

<script>
import { Splitpanes, Pane } from '@/components/splitpanes/index'

const now = new Date()
export default {
  components: { Splitpanes, Pane },
  data: () => ({
  }),

  methods: {
  }
}
</script>

<style lang="scss">
</style>
