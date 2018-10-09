<template lang="pug">
  v-app.white
    v-content
      img(alt="Vue logo" src="./assets/logo.png" height="40")
      h1.headline Vue Split Panes

      p.subheading A Vue JS reliable and simple panes splitter / resizer.

      p.subheading # Demo 1
      split-panes.demo(vertical style="height:400px")
        span 1
        split-panes(horizontal)
          span 2
          span 3
          span 4
        span 5

      p.subheading # Demo 2
      split-panes.demo(horizontal style="height:400px")
        span 1
        split-panes(vertical)
          span 2
          span 3
          span 4
        span 5
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
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}

.demo {
  margin: 3em;
}

.split-panes {
  background-color: #f2f2f2;

  &__pane {
    box-shadow: 0 0 3px rgba(0, 0, 0, .2) inset;
  }

  &__splitter {
    background-color: #fff;
  }

  &--vertical > .split-panes__splitter {width: 10px;}
  &--horizontal > .split-panes__splitter {height: 10px;}
}
</style>
