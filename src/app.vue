<template lang="pug">
router-view
//- v-app.white(v-scroll="onScroll")
  v-container
    router-view

  v-fab-transition
    v-btn(color="primary" fixed bottom right fab v-show="!goTopHidden" small href="#top")
      v-icon(color="white" size="26") keyboard_arrow_up
</template>

<script>
export default {
  data: () => ({
    offsetTop: 0,
    goTopHidden: true
  }),
  methods: {
    onScroll () {
      this.offsetTop = window.pageYOffset || document.documentElement.scrollTop
      this.goTopHidden = this.offsetTop < 200
    }
  }
}
</script>

<style lang="scss">
// General document rules.
//------------------------
* {margin: 0;padding: 0;}

html {font-size: 14px;}

#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  margin-top: 60px;
  background-color: #fff !important;
}
</style>
