<template lang="pug">
component(:class="`highlight highlight--${type}`" :is="tag")
  w-icon(v-if="!noIcon") {{ icon }}
  slot
</template>

<script>
export default {
  props: {
    tag: { type: String, default: 'p' },
    type: { type: String, default: 'info' },
    noIcon: { type: Boolean, default: false }
  },
  computed: {
    icon () {
      switch (this.type) {
        case 'success': return 'wi-check'
        case 'error': return 'wi-cross'
        case 'warning': return 'wi-warning-circle'
        case 'tips': return 'mdi mdi-white-balance-sunny'
        case 'info':
        default: return 'wi-check'
      }
    }
  }
}
</script>

<style lang="scss">
.highlight {
  position: relative;
  margin-top: 5px;
  padding: 8px 15px;
  border-left: 3px solid;

  &--info {
    background-color: rgba(#09f, 0.08) !important;
    border-color: #09f !important;
  }

  &--success {
    background-color: rgba(#6c0, 0.1) !important;
    border-color: #6c0 !important;
  }

  &--tips {
    background-color: rgba(#ff0, 0.15) !important;
    border-color: #fd0 !important;
  }

  &--warning {
    background-color: rgba(#fa0, 0.1) !important;
    border-color: #fa0 !important;
  }

  &--error {
    background-color: rgba(#f33, 0.08) !important;
    border-color: #f33 !important;
  }

  > .w-icon {
    position: absolute;
    left: -11px;
    color: #fff !important;
    border-radius: 1em;
    width: 20px;
    height: 20px;
    font-size: 18px;
    line-height: 20px;
    text-align: center;
    text-indent: 1px;
    top: 0.5em;
  }

  &--info > .w-icon {background: #09f !important;transform: rotate(180deg);}
  &--success > .w-icon {background-color: #6c0 !important;}
  &--error > .w-icon {background-color: #f33 !important;}
  &--tips > .w-icon {background-color: #fd0 !important;transform: rotate(180deg);}
  &--warning > .w-icon {background-color: #fa0 !important;}
  &--info > .w-icon, &.warning > .w-icon {font-size: 16px;}
}
</style>
