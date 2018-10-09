<template lang="pug">
  v-app.white
    v-container
      div.text-xs-center
        img(alt="Vue logo" src="./assets/logo.png" height="40")
        h1.mb-3.headline Vue Split Panes
        p.subheading A Vue JS reliable and simple panes splitter / resizer.

      h2.mt-5.mb-2.title Features
      ul
        li Nesting supported!
        li Light weight & no dependencies other than Vue JS.
        li Simple yet efficient.

      p.mt-5.subheading # Demo 1
      split-panes(vertical style="height:400px")
        span 1
        split-panes(horizontal)
          span 2
          span 3
          span 4
        span 5

      p.mt-5.subheading # Demo 2
      split-panes(horizontal style="height:400px")
        split-panes(vertical)
          span 1
          span 2
          span 3
        span 4
</template>

<script>
import SplitPanes from './components/split-panes.vue'

export default {
  name: 'app',
  components: { SplitPanes }
}
</script>

<style lang="scss">
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  margin-top: 60px;
}

.split-panes {
  background-color: #f2f2f2;

  &__pane {
    box-shadow: 0 0 3px rgba(0, 0, 0, .2) inset;
    justify-content: center;
    align-items: center;
    display: flex;
  }

  &__splitter {
    background-color: #fff;
  }

  &--vertical > .split-panes__splitter {width: 10px;}
  &--horizontal > .split-panes__splitter {height: 10px;}

  span {
    font-family: Helvetica, Arial, sans-serif;
    color: #fff;
    font-size: 5em;
    opacity: 0.6;
  }
}
</style>
