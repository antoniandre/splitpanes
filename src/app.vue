<template lang="pug">
w-app(block v-scroll="onScroll")
  router-view

  w-transition-twist
    w-button.go-top(
      v-show="!goTopHidden"
      icon="material-icons keyboard_arrow_up"
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
          This documentation is made with #[w-icon fab fa-vuejs],
          #[w-icon fab fa-html5],
          #[w-icon fab fa-css3],
          #[w-icon fab fa-sass] &amp;
          #[w-icon.heart material-icons favorite]
        | View this project on #[a(href="https://github.com/antoniandre/splitpanes" target="_blank") #[w-icon fab fa-github] Github].
</template>


<script setup lang="ts">
import '@/scss/index.scss'
import {ref, DirectiveBinding} from 'vue'
import type {Ref} from 'vue'
const offsetTop: Ref<number> = 0
const goTopHidden: Ref<boolean> = true
const onScroll = () => {
  offsetTop.value = window.scrollY || document.documentElement.scrollTop
  goTopHidden.value = offsetTop.value < 200
}
const scrollToTop = () => {
  document.documentElement.scrollTo({ top: 0, behavior: 'smooth' })
}
const scrollDirective = {
  mounted(el: HTMLElement, binding: DirectiveBinding<(evt: Event, el: HTMLElement) => boolean>) {
    const f = (evt: Event) => {
      if (binding.value(evt, el)) {
        window.removeEventListener('scroll', f);
      }
    };

    window.addEventListener('scroll', f);
  },
};

</script>
