<script>
export default {
  props: {
    horizontal: {
      type: Boolean,
      default: false
    },
    pushOtherPanes: {
      type: Boolean,
      default: true
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
      const eventNames = {
        start: hasTouch ? 'touchstart' : 'mousedown',
        move: hasTouch ? 'touchmove' : 'mousemove',
        end: hasTouch ? 'touchend' : 'mouseup'
      }

      this.splitters.forEach(splitter => {
        this.$refs[splitter.id].addEventListener(eventNames.start, e => this.onMouseDown(e, splitter))
      })

      // Passive: false to prevent scrolling while touch dragging.
      document.addEventListener(eventNames.move, this.onMouseMove, { passive: false })
      document.addEventListener(eventNames.end, this.onMouseUp)
    },

    onMouseDown (e, splitter) {
      this.touch.mouseDown = true
      this.touch.activeSplitter = splitter

      let index = this.touch.activeSplitter.index

      // Store the sum of the widths taken by the 2 panes being resized.
      this.touch.sumOfWidths = this.panes[index].width + this.panes[index + 1].width
      // sumOfWidths is used for column layout, sumOfHeights for row layout.
      // Same value but more appropriate var name.
      this.touch.sumOfHeights = this.touch.sumOfWidths
    },

    onMouseMove (e) {
      if (this.touch.mouseDown) {
        // Prevent scrolling while touch dragging (only works with an active event, eg. passive: false).
        e.preventDefault()

        this.touch.dragging = true
        this.calculatePanesSize(this.getCurrentMouseDrag(e))
      }
    },

    onMouseUp () {
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

        while ((el = el.offsetParent)) {
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

        while ((el = el.offsetParent)) {
          left += el.offsetLeft
        }

        this.container.offsetLeft = left
      }

      return this.container.offsetLeft
    },

    // Returns the drag percentage of the splitter relative to the 2 panes it's inbetween.
    // if the sum of width of the 2 cells  is 60%, the dragPercentage range will be 0 to 100% of this 60%.
    getCurrentDragPercentage (drag) {
      let splitterIndex = this.touch.activeSplitter.index
      drag = drag[this.horizontal ? 'y': 'x']
      let doc = document.documentElement
      let scrollTop = this.horizontal ? (window.pageYOffset || doc.scrollTop) - (doc.clientTop || 0) : null

      // In the code bellow 'size' refers to 'width' for vertical and 'height' for horizontal layout.
      let containerSize = this.container.vnode[this.horizontal ? 'clientHeight' : 'clientWidth']
      let totalPrevPanesSize = 0
      this.panes.forEach((pane, i) => totalPrevPanesSize += i < splitterIndex ? pane.width : 0)
      let totalPrevPanesSizePx = totalPrevPanesSize * containerSize / 100

      let offset = this[`getContainerOffset${this.horizontal ? 'Top' : 'Left'}`]() + totalPrevPanesSizePx

      return ((drag - offset + scrollTop) * 100 / containerSize) * 100 / this.touch.sumOfWidths
    },

    calculatePanesSize (drag) {
      let splitterIndex = this.touch.activeSplitter.index
      let dragPercentage = this.getCurrentDragPercentage (drag)

      // if (this.pushOtherPanes
      //     && (splitterIndex < this.splitters.length - 1 && dragPercentage > 100
      //     || splitterIndex === this.splitters.length - 1 && dragPercentage < 0)) {
      //   this.doPushOtherPanes(splitterIndex, dragPercentage)
      // }
      // Prevent going beyond 0 to 100% width (don't change other panes widths).
      // else
      dragPercentage = Math.min(Math.max(dragPercentage, 0), 100)

      this.panes[splitterIndex].width = dragPercentage / (100 / this.touch.sumOfWidths)
      this.panes[splitterIndex + 1].width = (100 - dragPercentage) / (100 / this.touch.sumOfWidths)
    },

    doPushOtherPanes (splitterIndex, dragPercentage) {
      let paneToResize = null
      let increase = dragPercentage > 100
      // console.log(increase ? 'increasing width' : 'decreasing width', dragPercentage)

      this.panes.forEach((pane, i) => {
        // Don't change any dimension for the pane being resized.
        if (i !== splitterIndex) {
          // Do some pane resizing here.

          // if (increase) {
          //   this.panes[splitterIndex + 2].width = 100 - this.panes[splitterIndex].width
          // }
        }
      })
    }
  },

  created () {
    // Create the panes and splitters arrays.
    if (this.$slots.default) for (let i = 0, max = this.$slots.default.length; i < max; i++) {
      this.$set(this.panes, i, { width: this.defaultWidth })
      if (i) this.$set(this.splitters, i - 1, { id: `splitter-${i - 1}`, index: i - 1 })
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
            ref: `splitter-${i - 1}`
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
        `splitpanes--${ this.horizontal ? 'horizontal' : 'vertical' }`,
        this.touch.dragging ? 'splitpanes--dragging' : ''
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
  &--dragging * {user-select: none;}

  &__pane {
    width: 100%;
    height: 100%;
    overflow: hidden;
  }

  &--vertical > .splitpanes__splitter {min-width: 1px;cursor: col-resize;}
  &--horizontal > .splitpanes__splitter {min-height: 1px;cursor: row-resize;}
}
</style>
