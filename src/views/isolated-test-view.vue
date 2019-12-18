<template lang="pug">
//- This is an isolated test view. Just for testing purpose.
div
  //- v-btn(small color="primary" @click="horizontal = !horizontal") {{ horizontal ? 'Horizontal' : 'Vertical' }}
  //- splitpanes.default-theme.example(:horizontal="horizontal" style="height: 400px")
    pane(v-for="i in 3" :key="i" :min-size="10")
      span {{ i }}

  v-divider.my-12
  v-btn(small color="primary" @click="hidePane2 = !hidePane2") {{ hidePane2 ? 'Show' : 'hide' }} Pane 2
  splitpanes.default-theme.example(style="height: 400px")
    pane
      span 1
    pane(v-if="hidePane2")
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
