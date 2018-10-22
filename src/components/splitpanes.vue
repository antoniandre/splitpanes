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
      slotsCount: 0,
      vnodes: [],
      panes: [],
      splitters: [],
      touch: { mouseDown: false, dragging: false, activeSplitter: null }
    }
  },

  methods: {
    bindEvents () {
      const hasTouch = 'ontouchstart' in window

      // Passive: false to prevent scrolling while touch dragging.
      document.addEventListener(hasTouch ? 'touchmove' : 'mousemove', this.onMouseMove, { passive: false })
      document.addEventListener(hasTouch ? 'touchend' : 'mouseup', this.onMouseUp)
    },

    onMouseDown (e, splitterIndex) {
      this.touch.mouseDown = true
      this.touch.activeSplitter = splitterIndex
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
      let splitterIndex = this.touch.activeSplitter
      let doc = document.documentElement
      let scrollTop = this.horizontal ? (window.pageYOffset || doc.scrollTop) - (doc.clientTop || 0) : null
      let offset = this[`getContainerOffset${this.horizontal ? 'Top' : 'Left'}`]()
      drag = drag[this.horizontal ? 'y': 'x'] - offset + scrollTop

      // In the code bellow 'size' refers to 'width' for vertical and 'height' for horizontal layout.
      let containerSize = this.container.vnode[this.horizontal ? 'clientHeight' : 'clientWidth']
      let totalPrevPanesSize = 0
      this.panes.forEach((pane, i) => totalPrevPanesSize += i < splitterIndex ? pane.width : 0)

      return drag * 100 / containerSize
    },

    calculatePanesSize (drag) {
      const splitterIndex = this.touch.activeSplitter

      let totalPrevPanesSize = this.totalPrevPanesSize(splitterIndex)
      let totalNextPanesSize = this.totalNextPanesSize(splitterIndex)

      const minDrag = 0 + (this.pushOtherPanes ? 0 : totalPrevPanesSize)
      const maxDrag = 100 - (this.pushOtherPanes ? 0 : totalNextPanesSize)
      const dragPercentage = Math.max(Math.min(this.getCurrentDragPercentage(drag), maxDrag), minDrag)

      // If not pushing other panes, panes to resize are right before and right after splitter.
      let panesToResize = [splitterIndex, splitterIndex + 1]

      // When pushOtherPanes = true, find the closest expanded pane on each side of the splitter.
      if (this.pushOtherPanes) {
        if (dragPercentage < totalPrevPanesSize) {
          panesToResize[0] = this.findPrevExpandedPane(splitterIndex).index
          totalPrevPanesSize = this.totalPrevPanesSize(panesToResize[0])
        }
        if (dragPercentage > 100 - totalNextPanesSize) {
          panesToResize[1] = this.findNextExpandedPane(splitterIndex).index
          totalNextPanesSize = this.totalNextPanesSize(panesToResize[1] - 1)
        }
      }
      // console.log(this.panes.map(pane => pane.width), dragPercentage)

      if (panesToResize[0] !== undefined) this.panes[panesToResize[0]].width = Math.max(dragPercentage - totalPrevPanesSize, 0)
      if (panesToResize[1] !== undefined) this.panes[panesToResize[1]].width = Math.max(100 - dragPercentage - totalNextPanesSize, 0)
    },

    totalPrevPanesSize (splitterIndex) {
      return this.panes.reduce((total, pane, i) => total + (i < splitterIndex ? pane.width : 0), 0)
    },

    totalNextPanesSize (splitterIndex) {
      return this.panes.reduce((total, pane, i) => total + (i > splitterIndex + 1 ? pane.width : 0), 0)
    },

    // Return the previous pane from siblings which has a size (width for vert or height for horz) of more than 0.
    findPrevExpandedPane (splitterIndex) {
      let pane = null
      let arr = [...this.panes]
      arr.reverse().some(p => {
        if (p.index < splitterIndex && p.width) pane = p
        return p.index < splitterIndex && p.width
      })
      return pane
    },

    // Return the next pane from siblings which has a size (width for vert or height for horz) of more than 0.
    findNextExpandedPane (splitterIndex) {
      let pane = null
      this.panes.some(p => {
        if (p.index > splitterIndex + 1 && p.width) pane = p
        return p.index > splitterIndex + 1 && p.width
      })
      return pane
    }
  },

  mounted () {
    this.container.vnode = this.$refs.container
    this.bindEvents()
  },

  computed: {
    defaultWidth () {
      return 100 / this.vnodes.length
    }
  },

  render (createEl) {
    const splitPanesChildren = []

    if (!this.$slots.default) splitPanesChildren.push(createEl('div', 'Splitpanes needs some contents here.'))
    else {
      // Create the panes and splitters arrays.
      if (this.slotsCount !== this.$slots.default.length) {
        this.vnodes = this.$slots.default.filter(vnode => vnode.tag || (vnode.text || '').trim())
        this.vnodes.forEach((vnode, i) => {
          this.$set(this.panes, i, { width: this.defaultWidth, index: i })
          if (i) this.$set(this.splitters, i - 1, { id: `splitter-${i - 1}`, index: i - 1 })
        })

        this.slotsCount = this.$slots.default.length
      }

      this.vnodes.forEach((vnode, i) => {
        // Splitter.
        if (i) {
          let splitterAttributes = {
            id: i - 1,
            class: 'splitpanes__splitter',
            ref: `splitter-${i - 1}`,
            on: {}
          }
          splitterAttributes.on['ontouchstart' in window ? 'touchstart' : 'mousedown'] = e => this.onMouseDown(e, i - 1)
          splitPanesChildren.push(createEl('div', splitterAttributes))
        }

        // Pane.
        let paneAttributes = {
          id: i,
          class: 'splitpanes__pane',
          style: {
            ...(this.horizontal ? { height: `${this.panes[i].width}%` } : null),
            ...(!this.horizontal ? { width: `${this.panes[i].width}%` } : null)
          }
        }
        splitPanesChildren.push(createEl('div', paneAttributes, [vnode]))
      })
    }

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


.splitpanes.default-theme {
  .splitpanes__pane {
    background-color: #f2f2f2;
  }

  .splitpanes__splitter {
    background-color: #fff;
    box-sizing: border-box;
    position: relative;

    &:before, &:after {
      content: "";
      position: absolute;
      top: 50%;
      left: 50%;
      background-color: rgba(0, 0, 0, .15);
      transition: background-color 0.3s;
    }
    &:hover:before, &:hover:after {background-color: rgba(0, 0, 0, .25);}
  }
}

.default-theme {
  &.splitpanes .splitpanes .splitpanes__splitter {
    z-index: 1;
  }

  &.splitpanes--vertical > .splitpanes__splitter,
  .splitpanes--vertical > .splitpanes__splitter {
    width: 9px;
    border-left: 1px solid #eee;
    margin-left: -1px;

    &:before, &:after {
      transform: translateY(-50%);
      width: 1px;
      height: 30px;
    }
    &:before {margin-left: -2px;}
    &:after {margin-left: 1px;}
  }

  &.splitpanes--horizontal > .splitpanes__splitter,
  .splitpanes--horizontal > .splitpanes__splitter {
    height: 9px;
    border-top: 1px solid #eee;
    margin-top: -1px;

    &:before,
    &:after {
      transform: translateX(-50%);
      width: 30px;
      height: 1px;
    }
    &:before {margin-top: -2px;}
    &:after {margin-top: 1px;}
  }
}
</style>
