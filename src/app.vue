<script setup>
import { ref } from 'vue'
import '@/scss/index.scss'

const offsetTop = ref(0)
const goTopHidden = ref(true)

const onScroll = () => {
  offsetTop.value = window.scrollY || document.documentElement.scrollTop
  goTopHidden.value = offsetTop.value < 200
}

const scrollToTop = () => {
  document.documentElement.scrollTo({ top: 0, behavior: 'smooth' })
}

// Directives.
const vScroll = {
  mounted: (el, binding) => {
    const f = evt => {
      if (binding.value(evt, el)) window.removeEventListener('scroll', f)
    }
    window.addEventListener('scroll', f)
  }
}
</script>

<template lang="pug">
div(v-scroll="onScroll")
  router-view

  w-transition-twist
    w-button.go-top(
      v-show="!goTopHidden"
      icon="wi-chevron-up"
      fixed
      bottom
      right
      round
      @click="scrollToTop")

  footer.py2(color="white")
    w-flex.page-container(wrap justify-center)
      .xs12.sm6.text-center.smu-text-left.copyright.
        Copyright © {{ (new Date()).getFullYear() }} Antoni André, all rights reserved.
      .xs12.sm6.text-center.smu-text-right.made-with
        .mb1
          | This documentation is made with
          w-tooltip(top caption)
            template(#activator="{ on }")
              w-icon.ml1(v-on="on") mdi mdi-vuejs
            | Vue.js
          w-tooltip(top caption)
            template(#activator="{ on }")
              w-icon.ml1(v-on="on" size="1.5em") wi-wave
            | Wave UI
          w-tooltip(top caption)
            template(#activator="{ on }")
              w-icon.ml1(v-on="on") mdi mdi-language-html5
            | HTML 5
          w-tooltip(top caption)
            template(#activator="{ on }")
              w-icon.ml1(v-on="on") mdi mdi-language-css3
            | CSS 3
          w-tooltip(top caption)
            template(#activator="{ on }")
              w-icon.ml1(v-on="on") mdi mdi-sass
            | SASS
          span.ml1 &amp;
          w-tooltip(top caption)
            template(#activator="{ on }")
              w-icon.ml1(v-on="on").heart mdi mdi-heart
            | Love
        | View this project on #[a(href="https://github.com/antoniandre/splitpanes" target="_blank") #[w-icon mdi mdi-github] Github].
</template>
