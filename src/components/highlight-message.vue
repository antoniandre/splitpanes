<template lang="pug">
  component(:class="'highlight ' + type" :is="tag")
    v-icon {{ icon }}
    slot
</template>

<script>
export default {
  props: {
    tag: {
      type: String,
      default: 'p'
    },
    type: {
      type: String,
      default: 'info'
    }
  },
  computed: {
    icon () {
      let icon

      switch (this.type) {
        case 'success':
          icon = 'check'
        break
        case 'error':
          icon = 'close'
        break
        case 'warning':
          icon = 'error_outline'
        break
        case 'tips':
        icon = 'wb_incandescent'
        break
        case 'info':
        default:
          icon = 'error_outline'
        break
      }

      return icon
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

  &.info {
    background-color: rgba(#09f, 0.08) !important;
    border-color: #09f !important;
  }

  &.success {
    background-color: rgba(#6c0, 0.1) !important;
    border-color: #6c0 !important;
  }

  &.tips {
    background-color: rgba(#ff0, 0.15) !important;
    border-color: #fd0 !important;
  }

  &.warning {
    background-color: rgba(#fa0, 0.1) !important;
    border-color: #fa0 !important;
  }

  &.error {
    background-color: rgba(#f33, 0.08) !important;
    border-color: #f33 !important;
  }

  .v-icon {
    position: absolute;
    left: -9px;
    color: #fff !important;
    border-radius: 1em;
    width: 16px;
    height: 16px;
    font-size: 21px;
    line-height: 16px;
    text-align: center;
    text-indent: -2px;
  }

  &.info .v-icon {
    background: #09f !important;
    transform: rotate(180deg);
    font-size: 23px;
    top: 0.4em;
  }

  &.success .v-icon {
    background-color: #6c0 !important;
    font-size: 15px;
    top: 0.7em;
  }

  &.error .v-icon {
    background-color: #f33 !important;
    font-size: 15px;
    top: 0.7em;
  }

  &.tips .v-icon {
    background-color: #fd0 !important;
    font-size: 14px;
    top: 0.7em;
    transform: rotate(180deg);
  }

  &.warning .v-icon {
    background-color: #fa0 !important;
    top: 0.4em;
  }
}
</style>
