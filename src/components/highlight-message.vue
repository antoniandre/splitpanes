<template lang="pug">
component(:class="`highlight highlight--${type}`" :is="tag")
  v-icon(v-if="!noIcon") {{ icon }}
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
        case 'success': return 'check'
        case 'error': return 'close'
        case 'warning': return 'priority_high'
        case 'tips': return 'wb_incandescent'
        case 'info':
        default: return 'priority_high'
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

  > .v-icon {
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

  &--info > .v-icon {background: #09f !important;transform: rotate(180deg);}
  &--success > .v-icon {background-color: #6c0 !important;}
  &--error > .v-icon {background-color: #f33 !important;}
  &--tips > .v-icon {background-color: #fd0 !important;transform: rotate(180deg);}
  &--warning > .v-icon {background-color: #fa0 !important;}
  &--info > .v-icon, &.warning > .v-icon {font-size: 16px;}
}
</style>
