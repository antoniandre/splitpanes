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
      touch: { mouseDown: false, dragging: false, activeSplitter: null },
      slotsCopy: ''
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
      if (this.touch.dragging) {
        this.$emit('resize', this.panes.map(pane => ({ min: pane.min, max: pane.max, width: pane.width })))
      }

      this.touch.mouseDown = false
      this.touch.dragging = false
    },

    // On splitter dbl click maximize this pane.
    onSplitterDblClick (e, splitterIndex) {
      let totalMinWidths = 0
      this.panes = this.panes.map((pane, i) => {
        pane.width = i === splitterIndex ? pane.max : pane.min
        if (i !== splitterIndex) totalMinWidths += pane.min

        return pane
      })
      this.panes[splitterIndex].width -= totalMinWidths
      this.$emit('pane-maximize', this.panes[splitterIndex])
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
      const splitterIndex = this.touch.activeSplitter
      const doc = document.documentElement
      const scrollTop = this.horizontal ? (window.pageYOffset || doc.scrollTop) - (doc.clientTop || 0) : null
      const offset = this[`getContainerOffset${this.horizontal ? 'Top' : 'Left'}`]()
      drag = drag[this.horizontal ? 'y' : 'x'] - offset + scrollTop

      // In the code bellow 'size' refers to 'width' for vertical and 'height' for horizontal layout.
      const containerSize = this.container.vnode[this.horizontal ? 'clientHeight' : 'clientWidth']
      let sumPrevPanesSize = 0
      this.panes.forEach((pane, i) => (sumPrevPanesSize += i < splitterIndex ? pane.width : 0))

      return drag * 100 / containerSize
    },

    calculatePanesSize (drag) {
      const splitterIndex = this.touch.activeSplitter
      let sums = {
        prevPanesSize: this.sumPrevPanesSize(splitterIndex),
        nextPanesSize: this.sumNextPanesSize(splitterIndex),
        prevReachedMinPanes: 0,
        nextReachedMinPanes: 0
      }

      const minDrag = 0 + (this.pushOtherPanes ? 0 : sums.prevPanesSize)
      const maxDrag = 100 - (this.pushOtherPanes ? 0 : sums.nextPanesSize)
      const dragPercentage = Math.max(Math.min(this.getCurrentDragPercentage(drag), maxDrag), minDrag)

      // If not pushing other panes, panes to resize are right before and right after splitter.
      let panesToResize = [splitterIndex, splitterIndex + 1]

      // When pushOtherPanes = true, find the closest expanded pane on each side of the splitter.
      if (this.pushOtherPanes) {
        let vars = this.doPushOtherPanes(sums, dragPercentage)

        if (!vars) return // Prevent other calculation.
        else ({ sums, panesToResize } = vars)
      }

      let paneBefore = this.panes[panesToResize[0]] || null
      let paneAfter = this.panes[panesToResize[1]] || null

      if (paneBefore !== null) {
        paneBefore.width = Math.min(Math.max(dragPercentage - sums.prevPanesSize - sums.prevReachedMinPanes, paneBefore.min), paneBefore.max)
      }

      if (paneAfter !== null) {
        paneAfter.width = Math.min(Math.max(100 - dragPercentage - sums.nextPanesSize - sums.nextReachedMinPanes, paneAfter.min), paneAfter.max)
      }
    },

    doPushOtherPanes (sums, dragPercentage) {
      const splitterIndex = this.touch.activeSplitter
      let panesToResize = [splitterIndex, splitterIndex + 1]

      // Pushing Down.
      // Going smaller than the current pane min width: take the previous expanded pane.
      if (dragPercentage < sums.prevPanesSize + this.panes[panesToResize[0]].min) {
        panesToResize[0] = this.findPrevExpandedPane(splitterIndex).index

        sums.prevReachedMinPanes = 0
        // If pushing a n-2 or less pane, from splitter, then make sure all in between is at min size.
        if (panesToResize[0] < splitterIndex) {
          this.panes.forEach((pane, i) => {
            if (i > panesToResize[0] && i <= splitterIndex) {
              pane.width = pane.min
              sums.prevReachedMinPanes += pane.min
            }
          })
        }

        sums.prevPanesSize = this.sumPrevPanesSize(panesToResize[0])

        // If nothing else to push down, cancel dragging.
        if (panesToResize[0] === undefined) {
          sums.prevReachedMinPanes = 0
          this.panes[0].width = this.panes[0].min
          this.panes.forEach((pane, i) => {
            if (i > 0 && i <= splitterIndex) {
              pane.width = pane.min
              sums.prevReachedMinPanes += pane.min
            }
          })
          this.panes[panesToResize[1]].width = 100 - sums.prevReachedMinPanes - this.panes[0].min - sums.prevPanesSize - sums.nextPanesSize
          return null
        }
      }

      // Pushing Up.
      // Pushing up beyond min width is reached: take the next expanded pane.
      if (dragPercentage > 100 - sums.nextPanesSize - this.panes[panesToResize[1]].min) {
        panesToResize[1] = this.findNextExpandedPane(splitterIndex).index

        sums.nextReachedMinPanes = 0
        // If pushing a n+2 or more pane, from splitter, then make sure all in between is at min size.
        if (panesToResize[1] > splitterIndex + 1) {
          this.panes.forEach((pane, i) => {
            if (i > splitterIndex && i < panesToResize[1]) {
              pane.width = pane.min
              sums.nextReachedMinPanes += pane.min
            }
          })
        }

        sums.nextPanesSize = this.sumNextPanesSize(panesToResize[1] - 1)

        // If nothing else to push up, cancel dragging.
        if (panesToResize[1] === undefined) {
          sums.nextReachedMinPanes = 0
          this.panes[this.panes.length - 1].width = this.panes[this.panes.length - 1].min
          this.panes.forEach((pane, i) => {
            if (i < this.panes.length - 1 && i >= splitterIndex + 1) {
              pane.width = pane.min
              sums.nextReachedMinPanes += pane.min
            }
          })

          this.panes[panesToResize[0]].width = 100 - sums.prevPanesSize - sums.nextReachedMinPanes - this.panes[this.panes.length - 1].min - sums.nextPanesSize
          return null
        }
      }

      return { sums, panesToResize }
    },

    sumPrevPanesSize (splitterIndex) {
      return this.panes.reduce((total, pane, i) => total + (i < splitterIndex ? pane.width : 0), 0)
    },

    sumNextPanesSize (splitterIndex) {
      return this.panes.reduce((total, pane, i) => total + (i > splitterIndex + 1 ? pane.width : 0), 0)
    },

    // Return the previous pane from siblings which has a size (width for vert or height for horz) of more than 0.
    findPrevExpandedPane (splitterIndex) {
      let pane = {}
      let arr = [...this.panes]
      arr.reverse().some(p => {
        if (p.index < splitterIndex && p.width > p.min) pane = p
        return p.index < splitterIndex && p.width > p.min
      })
      return pane
    },

    // Return the next pane from siblings which has a size (width for vert or height for horz) of more than 0.
    findNextExpandedPane (splitterIndex) {
      let pane = {}
      this.panes.some(p => {
        if (p.index > splitterIndex + 1 && p.width > p.min) pane = p
        return p.index > splitterIndex + 1 && p.width > p.min
      })
      return pane
    }
  },

  mounted () {
    this.container.vnode = this.$refs.container
    this.bindEvents()
    this.$emit('ready')
  },

  computed: {
    defaultWidth () {
      return 100 / this.vnodes.length
    }
  },

  render (createEl) {
    const splitPanesChildren = []

    if (!this.$slots.default) splitPanesChildren.push(createEl('div', 'Splitpanes needs some content here.'))
    else {
      const clearedProps = {
        context: null,
        elm: null,
        Ctor: null,
        componentInstance: {},
        componentOptions: {},
        parent: null,
        data: {},
      }
      const deeperClearedProps = {
        $vnode: {},
        $options: {},
        $parent: {},
        $root: {},
        $refs: {},
        $slots: {},
        $scopedSlots: {},
        _self: {},
        _vnode: {},
        _watcher: {},
        _watchers: {},
        _computedWatcher: {},
        _data: {}
      }
      // const slotsExport = JSON.stringify(this.$slots.default.map(item => ({...item, context: null})))
      const slotsExport = this.$slots.default.map(item => ({
        ...item,
        ...clearedProps,
        children: item.children && item.children.map(c => ({ ...c, ...clearedProps })) || [],
        child: item.child && {
          // ...item.child,
          ...clearedProps,
          // ...deeperClearedProps,
          children: {},//item.child.children && item.child.children.map(c => ({ ...c, ...clearedProps })) || [],
          child: {}//item.child.child && { ...item.child.child, ...clearedProps, ...deeperClearedProps } || {}
        } || {}
      }))
      debugger
      const slotsHaveChanged = this.slotsCopy !== slotsExport
      console.log('rendering', JSON.stringify(slotsExport))

      if (slotsHaveChanged) this.slotsCopy = slotsExport

      // Create the panes and splitters arrays each time the slots are updated.
      if (this.slotsCount !== this.$slots.default.length || slotsHaveChanged) {
        this.vnodes = this.$slots.default.filter(vnode => vnode.tag || (vnode.text || '').trim())
        this.vnodes.forEach((vnode, i) => {
          const { data: { attrs = {} } = {} } = vnode
          const { 'splitpanes-min': min = 0, 'splitpanes-max': max = 100, 'splitpanes-default': Default = this.defaultWidth } = attrs

          this.$set(this.panes, i, { width: parseInt(Default), index: i, min: parseFloat(min), max: parseFloat(max) })
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
            on: {
              ['ontouchstart' in window ? 'touchstart' : 'mousedown']: e => this.onMouseDown(e, i - 1),
              dblclick: e => this.onSplitterDblClick(e, i)
            }
          }
          splitPanesChildren.push(createEl('div', splitterAttributes))
        }

        // Pane.
        let paneAttributes = {
          id: i,
          class: 'splitpanes__pane',
          style: {
            ...(this.horizontal ? { height: `${this.panes[i].width}%` } : null),
            ...(!this.horizontal ? { width: `${this.panes[i].width}%` } : null)
          },
          on: {
            click: e => this.$emit('pane-click', this.panes[i])
          }
        }
        splitPanesChildren.push(createEl('div', paneAttributes, [vnode]))
      })
    }

    // Wrapper.
    let wrapperAttributes = {
      class: [
        'splitpanes',
        `splitpanes--${this.horizontal ? 'horizontal' : 'vertical'}`,
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
