<script>
export default {
  props: {
    watchSlots: {
      type: Boolean,
      default: false
    },
    horizontal: {
      type: Boolean,
      default: false
    },
    pushOtherPanes: {
      type: Boolean,
      default: true
    },
    dblClickSplitter: {
      type: Boolean,
      default: true
    }
  },
  data: () => ({
    container: { vnode: null, offsetLeft: null, offsetTop: null },
    slotsCount: 0,
    vnodes: [],
    panes: [],
    splitters: [],
    touch: { mouseDown: false, dragging: false, activeSplitter: null },
    // Detect double click on touch devices.
    splitterTaps: { splitter: null, timeoutId: null },
    slotsCopy: ''
  }),

  methods: {
    bindEvents () {
      if ('ontouchstart' in window) {
        document.addEventListener('touchmove', this.onMouseMove, { passive: false })
        document.addEventListener('touchend', this.onMouseUp)
      }

      // Passive: false to prevent scrolling while touch dragging.
      document.addEventListener('mousemove', this.onMouseMove, { passive: false })
      document.addEventListener('mouseup', this.onMouseUp)
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
        this.$emit('resize', this.panes.map(pane => ({ min: pane.min, max: pane.max, width: pane.width })))
      }
    },

    onMouseUp () {
      if (this.touch.dragging) {
        this.$emit('resized', this.panes.map(pane => ({ min: pane.min, max: pane.max, width: pane.width })))
      }

      this.touch.mouseDown = false
      // Keep dragging flag until click event is finished (click happens immediately after mouseup)
      // in order to prevent emitting `splitter-click` event if splitter was dragged.
      setTimeout(() => (this.touch.dragging = false), 100)
    },

    // If touch device, detect double tap manually (2 taps separated by less than 500ms).
    onSplitterClick (e, splitterIndex) {
      if ('ontouchstart' in window) {
        e.preventDefault()
        // eslint-disable-next-line
        let { timeoutId, splitter } = this.splitterTaps

        if (splitter !== splitterIndex) {
          splitter = splitterIndex
          timeoutId = setTimeout(() => (splitter = null), 500)
        } else this.onSplitterDblClick(e, splitterIndex)
      }

      if (!this.touch.dragging) this.$emit('splitter-click', this.panes[splitterIndex])
    },

    // On splitter dbl click or dbl tap maximize this pane.
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

    // Get the cursor position relative to the splitpane container.
    getCurrentMouseDrag (e) {
      const rect = this.container.vnode.getBoundingClientRect()
      const { clientX, clientY } = 'ontouchstart' in window && e.touches ? e.touches[0] : e
      return { x: clientX - rect.left, y: clientY - rect.top }
    },

    // Returns the drag percentage of the splitter relative to the 2 panes it's inbetween.
    // if the sum of width of the 2 cells  is 60%, the dragPercentage range will be 0 to 100% of this 60%.
    getCurrentDragPercentage (drag) {
      const splitterIndex = this.touch.activeSplitter
      drag = drag[this.horizontal ? 'y' : 'x']

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
      let paneBefore = this.panes[panesToResize[0]] || null
      let paneAfter = this.panes[panesToResize[1]] || null

      const paneBeforeMaxReached = paneBefore.max < 100 && (dragPercentage >= (paneBefore.max + sums.prevPanesSize))
      const paneAfterMaxReached = paneAfter.max < 100 && (dragPercentage <= 100 - (paneAfter.max + this.sumNextPanesSize(splitterIndex + 1)))
      // Prevent dragging beyond pane max.
      if (paneBeforeMaxReached || paneAfterMaxReached) {
        if (paneBeforeMaxReached) {
          paneBefore.width = paneBefore.max
          paneAfter.width = Math.max(100 - paneBefore.max - sums.prevPanesSize - sums.nextPanesSize, 0)
        } else {
          paneBefore.width = Math.max(100 - paneAfter.max - sums.prevPanesSize - this.sumNextPanesSize(splitterIndex + 1), 0)
          paneAfter.width = paneAfter.max
        }

        return
      }

      // When pushOtherPanes = true, find the closest expanded pane on each side of the splitter.
      if (this.pushOtherPanes) {
        let vars = this.doPushOtherPanes(sums, dragPercentage)

        if (!vars) return // Prevent other calculation.
        else {
          ({ sums, panesToResize } = vars)
          paneBefore = this.panes[panesToResize[0]] || null
          paneAfter = this.panes[panesToResize[1]] || null
        }
      }

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

  beforeDestroy () {
    document.removeEventListener('touchmove', this.onMouseMove, { passive: false })
    document.removeEventListener('mousemove', this.onMouseMove, { passive: false })
    document.removeEventListener('touchend', this.onMouseUp)
    document.removeEventListener('mouseup', this.onMouseUp)
  },

  computed: {
    defaultWidth () {
      return 100 / this.vnodes.length
    }
  },

  beforeUpdate () {
    // Not the first time but all the others, save the current width before re-render and
    // reapply on rendering.
    if (this.panes.length) {
      this.$slots.default.forEach(vnode => {
        // Discard empty text nodes.
        if (!vnode.tag && !(vnode.text || '').trim()) return

        let { elm: { parentNode: { id, className, style: { width, height } = {} } = {} } = {} } = vnode

        if (className === 'splitpanes__pane' && (id = id.replace('pane_', '')) && this.panes[id] &&
          (width || height)) {
          // Before saving computed css width or height into `savedWidth` check if `splitpanes-size` has changed.
          // If so save this value instead (means size has changed programmatically).
          const {
            elm: { attributes: { 'splitpanes-size': { value: paneSizeInDOM } = {} } = {} } = {}
          } = vnode

          if (paneSizeInDOM !== undefined) this.panes[id].savedWidth = parseFloat(paneSizeInDOM)
          else this.panes[id].savedWidth = parseFloat(width || height)
        }
      })
    }
  },

  render (createEl) {
    const splitPanesChildren = []

    if (!this.$slots.default) splitPanesChildren.push(createEl('div', 'Splitpanes needs some content here.'))
    else {
      // Since we are adding splitter nodes in DOM, we need to keep track if slots have changed
      // to avoid an infinite loop.
      let slotsHaveChanged = false

      if (this.watchSlots) {
        const discardProps = ['$options', '$parent', '$root', '$el',
          '$refs', '$slots', '$scopedSlots', '$vnode', '_data', '__vue__',
          '_self', '_vnode', '_watcher', '_watchers', '_computedWatchers', '_renderProxy', 'vnodes',
          'container', 'Ctor', 'context', 'parent', 'componentInstance', 'componentOptions',
          'fnContext', 'fnOptions']

        const slotsExport = JSON.stringify(this.$slots.default, (name, val) => {
          // Discard the properties listed in array to prevent circular reference.
          return discardProps.indexOf(name) > -1 ? undefined : val
        })

        slotsHaveChanged = this.slotsCopy !== slotsExport

        if (slotsHaveChanged) this.slotsCopy = slotsExport
      }

      // Create the panes and splitters arrays each time the slots are updated.
      if (this.slotsCount !== this.$slots.default.length || slotsHaveChanged) {
        this.vnodes = this.$slots.default.filter(vnode => vnode.tag || (vnode.text || '').trim())
        this.vnodes.forEach((vnode, i) => {
          const { data: { attrs = {} } = {} } = vnode

          // Extract min, max & default size from the panes HTML attributes.
          const {
            'splitpanes-min': min = 0,
            'splitpanes-max': max = 100,
            'splitpanes-size': Default = this.defaultWidth
          } = attrs

          const savedWidth = this.panes[i] && this.panes[i].savedWidth !== undefined ? this.panes[i].savedWidth : null

          this.$set(this.panes, i, {
            // ! \\ Reapply saved width (if any) after slots have changed.
            width: savedWidth !== null ? savedWidth : parseFloat(Default),
            index: i,
            min: parseFloat(min),
            max: parseFloat(max)
          })

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
              ...('ontouchstart' in window ? { touchstart: e => this.onMouseDown(e, i - 1) } : {}),
              mousedown: e => this.onMouseDown(e, i - 1),
              click: e => this.onSplitterClick(e, i),
              ...(this.dblClickSplitter ? { dblclick: e => this.onSplitterDblClick(e, i) } : {})
            }
          }
          splitPanesChildren.push(createEl('div', splitterAttributes))
        }

        // Pane.
        let paneAttributes = {
          attrs: {
            id: `pane_${i}`
          },
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
    transition: width 0.2s ease-out, height 0.2s ease-out;

    .splitpanes--dragging & {transition: none;}
  }

  // Disable default zoom behavior on touch device when double tapping splitter.
  &__splitter {touch-action: none;}
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
