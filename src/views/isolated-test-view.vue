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
    pane(v-for="i in panesNumber" :key="i")
      span {{ i }}
    pane
      span a

  v-divider.my-12

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
    hidePane2: false,
    panesNumber: 3
  }),

  methods: {
    log (name, params) {
      console.log(name, params)
    }
  }
}
</script>

<style lang="scss">
</style>
