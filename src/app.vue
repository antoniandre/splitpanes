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
        .mb1.
          This documentation is made with #[w-icon mdi mdi-vuejs],
          #[w-icon mdi mdi-language-html5],
          #[w-icon mdi mdi-language-css3],
          #[w-icon mdi mdi-sass] &amp;
          #[w-icon.heart mdi mdi-heart]
        | View this project on #[a(href="https://github.com/antoniandre/splitpanes" target="_blank") #[w-icon mdi mdi-github] Github].
</template>
