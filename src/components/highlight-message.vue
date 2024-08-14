<script setup>
import { computed } from 'vue'

const props = defineProps({
  tag: { type: String, default: 'p' },
  type: { type: String, default: 'info' },
  noIcon: { type: Boolean, default: false }
})

const icon = computed(() => {
  switch (props.type) {
    case 'success': return 'wi-check'
    case 'error': return 'wi-cross'
    case 'warning': return 'mdi mdi-exclamation-thick'
    case 'tips': return 'mdi mdi-lightbulb-on'
    case 'info': return 'mdi mdi-information-symbol'
    default: return 'wi-check'
  }
})
</script>

<template lang="pug">
component(:class="`highlight highlight--${type}`" :is="tag")
  w-icon(v-if="!noIcon") {{ icon }}
  slot
</template>

<style lang="scss">
.highlight {
  position: relative;
  margin-top: 5px;
  padding: 8px 15px;
  border-left: 3px solid;

  &--info {
    background-color: rgba(#09f, 0.08);
    border-color: #09f;
  }

  &--success {
    background-color: rgba(#6c0, 0.1);
    border-color: #6c0;
  }

  &--tips {
    background-color: rgba(#ff0, 0.15);
    border-color: #fd0;
  }

  &--warning {
    background-color: rgba(#fa0, 0.1);
    border-color: #fa0;
  }

  &--error {
    background-color: rgba(#f33, 0.08);
    border-color: #f33;
  }

  > .w-icon {
    position: absolute;
    left: -11px;
    color: #fff;
    border-radius: 1em;
    width: 20px;
    height: 20px;
    font-size: 18px;
    line-height: 20px;
    text-align: center;
    top: 0.5rem;
  }

  &--info > .w-icon {background: #09f;font-size: 25px;}
  &--success > .w-icon {background-color: #6c0;}
  &--error > .w-icon {background-color: #f33;}
  &--tips > .w-icon {background-color: #fd0;}
  &--warning > .w-icon {background-color: #fa0;font-size: 15px;}
}
</style>
