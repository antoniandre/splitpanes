<template lang="pug">
//- This is an isolated test view. Just for testing purpose.
div
  v-btn.ml-2(color="primary" small @click="hidePane2 = !hidePane2")
    | Hide pane 2
  v-btn.ml-2(color="primary" small @click="hidePane4 = !hidePane4")
    | Hide pane 4

  splitpanes.default-theme.example(
    @pane-removed="log('pane-removed', $event)"
    @pane-added="log('pane-added', $event)"
    @resized="log('resized', $event)"
    style="height: 400px")
    pane(size="85")
      span 1
    pane(v-if="!hidePane2" size="15")
      span 2
    //- pane()
    //-   span 3
    //- pane(v-if="!hidePane4")
    //-   span 4
</template>

<script>
import { Splitpanes, Pane } from '@/components/splitpanes/index'

const now = new Date()
export default {
  components: { Splitpanes, Pane },
  data: () => ({
    horizontal: true,
    hidePane2: false,
    hidePane4: false,
    panesNumber: 3
  }),

  methods: {
    log (name, params) {
      console.log(name, params)
    }
  },

  computed: {
    panesNumberAbs () {
      if (this.panesNumber < 0) this.panesNumber = 0
      return this.panesNumber
    }
  }
}
</script>

<style lang="scss">
</style>
