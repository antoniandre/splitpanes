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
      touch: { mouseDown: false, dragging: false, activeSplitter: null, sumOfWidths: 0 }
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
      let doc = document.documentElement
      let scrollTop = this.horizontal ? (window.pageYOffset || doc.scrollTop) - (doc.clientTop || 0) : null
      let offset = this[`getContainerOffset${this.horizontal ? 'Top' : 'Left'}`]()
      drag = drag[this.horizontal ? 'y': 'x'] - offset + scrollTop

      // In the code bellow 'size' refers to 'width' for vertical and 'height' for horizontal layout.
      let containerSize = this.container.vnode[this.horizontal ? 'clientHeight' : 'clientWidth']
      let totalPrevPanesSize = 0
      this.panes.forEach((pane, i) => totalPrevPanesSize += i < splitterIndex ? pane.width : 0)
      let totalPrevPanesSizePx = totalPrevPanesSize * containerSize / 100

      return drag * 100 / containerSize
    },

    calculatePanesSize (drag) {
      const splitterIndex = this.touch.activeSplitter.index
      const totalPrevPanesSize = this.totalPrevPanesSize(splitterIndex)
      const totalNextPanesSize = this.totalNextPanesSize(splitterIndex)
      const minDrag = 0 + (this.pushOtherPanes ? 0 : totalPrevPanesSize)
      const maxDrag = 100 - (this.pushOtherPanes ? 0 : totalNextPanesSize)
      const dragPercentage = Math.max(Math.min(this.getCurrentDragPercentage(drag), maxDrag), minDrag)

      // When feature pushOtherPanes is true.
      const pushingPrevPanes = !this.pushOtherPanes || dragPercentage < totalPrevPanesSize
      const pushingNextPanes = !this.pushOtherPanes || dragPercentage > 100 - totalNextPanesSize
      const nextExpandedPane = pushingNextPanes ? this.findNextExpandedPane(splitterIndex) : null
      const prevExpandedPane = pushingPrevPanes ? this.findPrevExpandedPane(splitterIndex) : null

      // console.log({
      //   dragPercentage,
      //   pushingPrevPanes,
      //   pushingNextPanes,
      //   nextExpandedPane,
      //   // minDrag,
      //   // maxDrag,
      //   totalPrevPanesSize,
      //   totalNextPanesSize,
      //   secondPaneWidth: (100 - dragPercentage - totalPrevPanesSize - totalNextPanesSize),
      //   thirdPaneWidth: totalNextPanesSize
      // })
      // console.log(this.panes.map(pane => pane.width))

      this.panes.forEach((pane, i) => {
        if (pushingPrevPanes) {
          if (pane.id === prevExpandedPane.id) {
            pane.width = dragPercentage
            // console.log('pushed pane 1', this.panes.map(pane => pane.width))
          }
        }
        else if (pushingNextPanes) {
          if (pushingNextPanes && pane.id === nextExpandedPane.id) {
            pane.width = 100 - dragPercentage
            // console.log('pushed pane 3', this.panes.map(pane => pane.width))
          }
        }

        // The pane right before active splitter.
        if (i === splitterIndex) {
          pane.width = Math.min(Math.max(dragPercentage - totalPrevPanesSize, 0), 100)
        }

        // The pane right after active splitter.
        if (i === splitterIndex + 1) {
          pane.width = Math.min(Math.max((100 - dragPercentage - totalNextPanesSize), 0), 100)
        }
      })
    },

    totalPrevPanesSize (splitterIndex) {
      return this.panes.reduce((total, pane, i) => total + (i < splitterIndex ? pane.width : 0), 0)
    },

    totalNextPanesSize (splitterIndex) {
      return this.panes.reduce((total, pane, i) => total + (i > splitterIndex + 1 ? pane.width : 0), 0)
    },

    // Return the next pane from siblings which has a size (width for vert or height for horz) of more than 0.
    findNextExpandedPane (splitterIndex) {
      let pane = null
      this.panes.some((p, i) => {
        if (i > splitterIndex + 1 && p.width) pane = p
        return i > splitterIndex + 1 && p.width
      })
      return pane
    },

    // Return the previous pane from siblings which has a size (width for vert or height for horz) of more than 0.
    findPrevExpandedPane (splitterIndex) {
      let pane = null
      this.panes.some((p, i) => {
        if (i < splitterIndex && p.width) pane = p
        return i < splitterIndex && p.width
      })
      return pane
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
