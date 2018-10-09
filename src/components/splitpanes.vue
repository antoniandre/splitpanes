<script>
export default {
  props: {
    horizontal: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      container: { vnode: null, offsetLeft: null, offsetTop: null },
      panesCount: (this.$slots.default || []).length,
      panes: [],
      splitters: [],
      touch: { mouseDown: false, dragging: false, activeSplitter: null, sumOfWidths: 0, sumOfHeights: 0 }
    }
  },

  methods: {
    bindEvents () {
      const hasTouch = 'ontouchstart' in window

      this.splitters.forEach((splitter, i) => {
        this.$refs[splitter.id].addEventListener(
          hasTouch ? 'touchstart' : 'mousedown',
          (event) => this.onMouseDown(event, splitter)
        )
      })

      document.addEventListener(hasTouch ? 'touchmove' : 'mousemove', this.onMouseMove)
      document.addEventListener(hasTouch ? 'touchend' : 'mouseup', this.onMouseUp)
    },

    onMouseDown (e, splitter) {
      this.touch.mouseDown = true
      this.touch.activeSplitter = splitter

      let index = this.touch.activeSplitter.index
      this.touch.sumOfWidths = this.panes[index - 1].width + this.panes[index].width
      this.touch.sumOfHeights = this.touch.sumOfWidths

      // console.log('mouse down', e, splitter)
    },

    onMouseMove (e) {
      if (this.touch.mouseDown) {
        this.touch.dragging = true

        let drag = this.getCurrentMouseDrag(e)
        let index = this.touch.activeSplitter.index
        let dragPercentage = 0

        if (this.horizontal) {
          let aboveCellsHeightsSum = 0
          this.panes.forEach((cell, i) => {
            if (i < index - 1) aboveCellsHeightsSum += cell.width
          })
          let aboveCellsHeightsSumPercent = aboveCellsHeightsSum * this.container.vnode.clientHeight / 100

          let offsetTop = this.getContainerOffsetTop() + aboveCellsHeightsSumPercent
          let doc = document.documentElement
          let scrollTop = (window.pageYOffset || doc.scrollTop) - (doc.clientTop || 0)

          dragPercentage = ((drag.y - offsetTop + scrollTop) * 100 / this.container.vnode.clientHeight) * 100 / this.touch.sumOfHeights

          this.panes[index - 1].width = dragPercentage / (100 / this.touch.sumOfHeights)
          this.panes[index].width = (100 - dragPercentage) / (100 / this.touch.sumOfHeights)
        }
        else {
          let leftHandCellsWidthSum = 0
          this.panes.forEach((cell, i) => {
            if (i < index - 1) leftHandCellsWidthSum += cell.width
          })
          let leftHandCellsWidthSumPercent = leftHandCellsWidthSum * this.container.vnode.clientWidth / 100

          let offsetLeft = this.getContainerOffsetLeft() + leftHandCellsWidthSumPercent
          dragPercentage = ((drag.x - offsetLeft) * 100 / this.container.vnode.clientWidth) * 100 / this.touch.sumOfWidths

          this.panes[index - 1].width = dragPercentage / (100 / this.touch.sumOfWidths)
          this.panes[index].width = (100 - dragPercentage) / (100 / this.touch.sumOfWidths)
        }
      }
    },

    onMouseUp (e) {
      if (this.touch.mouseDown) {
        // console.log('mouse Up', e)
      }

      this.touch.mouseDown = false
      this.touch.dragging = false
    },

    getCurrentMouseDrag: (e) => ({
      x: 'ontouchstart' in window ? e.touches[0].clientX : e.clientX,
      y: 'ontouchstart' in window ? e.touches[0].clientY : e.clientY
    }),

    // Recursively sum all the offsetTop values from current element up the tree until body.
    // By doing so a padding or margin on a parent won't cause a wrong calculation.
    getContainerOffsetTop (force = false) {
      if (this.container.offsetTop === null || force) {
        let el = this.container.vnode
        let top = el.offsetTop

        while (el = el.offsetParent) {
          top += el.offsetTop
        }

        this.container.offsetTop = top
      }

      return this.container.offsetTop
    },


    // Recursively sum all the offsetTop values from current element up the tree until body.
    getContainerOffsetLeft (force = false) {
      if (this.container.offsetLeft === null || force) {
        let el = this.container.vnode
        let left = el.offsetLeft

        while (el = el.offsetParent) {
          left += el.offsetLeft
        }

        this.container.offsetLeft = left
      }

      return this.container.offsetLeft
    },
  },

  created () {
    for (let i of (this.$slots.default || []).keys()) {
      this.$set(this.panes, i, { width: this.defaultWidth })
      if (i) this.$set(this.splitters, i, { id: `splitter-${i}`, index: i })
    }
  },

  mounted () {
    this.container.vnode = this.$refs.container
    this.bindEvents()
  },

  computed: {
    defaultWidth () {
      return 100 / this.panesCount
    }
  },

  render (createEl) {
    const splitPanesChildren = []

    if (!this.$slots.default) splitPanesChildren.push(createEl('div', 'Splitpanes needs some contents here.'))
    else this.$slots.default.forEach((vnode, i) => {
      if (vnode.tag || vnode.text) {
        // Splitter.
        if (i) {
          let splitterAttributes = {
            class: 'splitpanes__splitter',
            ref: `splitter-${i}`
          }
          splitPanesChildren.push(createEl('div', splitterAttributes))
        }

        // Pane.
        let paneAttributes = {
          class: 'splitpanes__pane',
          style: {
            ...(this.horizontal ? { height: `${this.panes[i].width}%` } : null),
            ...(!this.horizontal ? { width: `${this.panes[i].width}%` } : null)
          }
        }
        splitPanesChildren.push(createEl('div', paneAttributes, [vnode]))
      }
    })

    // Wrapper.
    let wrapperAttributes = {
      class: [
        'splitpanes',
        `splitpanes--${ this.horizontal ? 'horizontal' : 'vertical' }`
      ],
      ref: 'container'
    }

    return createEl('div', wrapperAttributes, splitPanesChildren)
  }
}
</script>

<style lang="scss">
.splitpanes {
  display: flex;
  width: 100%;
  height: 100%;

  &--vertical {flex-direction: row;}
  &--horizontal {flex-direction: column;}

  &__pane {
    width: 100%;
    height: 100%;
    overflow: hidden;
  }

  &--vertical > .splitpanes__splitter {min-width: 1px;cursor: ew-resize;}
  &--horizontal > .splitpanes__splitter {min-height: 1px;cursor: ns-resize;}
}
</style>
