export default {
  name: 'pane',
  props: {
    size: { type: [Number, String], default: undefined },
    minSize: { type: [Number, String], default: 0 },
    maxSize: { type: [Number, String], default: 100 }
  },

  data: () => ({
    style: {}
  }),

  computed: {
    sizeNumber () {
      return parseFloat(this.size)
    },
    minSizeNumber () {
      return parseFloat(this.minSize)
    },
    maxSizeNumber () {
      return parseFloat(this.maxSize)
    }
  },

  watch: {
    sizeNumber (size) {
      this.$parent.requestUpdate({ target: this, size })
    },
    minSizeNumber (min) {
      this.$parent.requestUpdate({ target: this, min })
    },
    maxSizeNumber (max) {
      this.$parent.requestUpdate({ target: this, max })
    }
  },

  methods: {
    update (style) {
      this.style = style
    }
  },

  render (h) {
    return h(
      'div',
      { class: ['splitpanes__pane'], style: this.style },
      this.$slots.default
    )
  }
}
