<template lang="pug">
//- This is an isolated test view. Just for testing purpose.
div
  v-btn.ml-2(color="primary" small @click="panesNumber++")
    v-icon.mr-1 add
    | Add pane
  v-btn.ml-2(color="primary" small @click="panesNumber--")
    v-icon.mr-1 remove
    | Remove pane

  splitpanes.default-theme.example(
    @pane-removed="log('pane-removed', $event)"
    @pane-added="log('pane-added', $event)"
    @resized="log('resized', $event)"
    style="height: 400px")
    pane(v-for="i in panesNumberAbs" :key="i" size="22")
      span {{ i }}
    pane(fixed size="34")
      span a
</template>

<script>
import { Splitpanes, Pane } from '@/components/splitpanes/index'

const now = new Date()
export default {
  components: { Splitpanes, Pane },
  data: () => ({
    horizontal: true,
    hidePane2: false,
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
