<script>
export default {
  name: 'splitpanes',
  props: {
    horizontal: { type: Boolean, default: false },
    pushOtherPanes: { type: Boolean, default: true },
    dblClickSplitter: { type: Boolean, default: true }
  },
  data: () => ({
    container: null,
    panes: [],
    touch: {
      mouseDown: false,
      dragging: false,
      activeSplitter: null
    },
    splitterTaps: { // Used to detect double click on touch devices.
      splitter: null,
      timeoutId: null
    }
  }),

  watch: {
    panes: { // Every time a pane is updated, update the panes accordingly.
      deep: true,
      immediate: false,
      handler () { this.updatePanesStyle() }
    },
    direction () {
      this.updatePanesStyle()
    },
    dblClickSplitter (enable) {
      const splitters = [...this.container.querySelectorAll('.splitpanes__splitter')]
      splitters.forEach((splitter, i) => {
        splitter.ondblclick = enable ? event => this.onSplitterDblClick(event, i) : undefined
      })
    }
  },

  methods: {
    updatePanesStyle () {
      // Using `this.$children` here rather than `this.$slots.default` because the latter is sometimes not initialized yet (eg. when this method is called
      // whereas the component is not mounted yet).
      const children = this.$children
      this.panes.forEach(pane => {
        children[pane.index].update({
          [this.horizontal ? 'height' : 'width']: `${pane.size}%`
        })
      })
    },
    bindEvents () {
      document.addEventListener('mousemove', this.onMouseMove, { passive: false })
      document.addEventListener('mouseup', this.onMouseUp)

      // Passive: false to prevent scrolling while touch dragging.
      if ('ontouchstart' in window) {
        document.addEventListener('touchmove', this.onMouseMove, { passive: false })
        document.addEventListener('touchend', this.onMouseUp)
      }
    },
    unbindEvents () {
      document.removeEventListener('mousemove', this.onMouseMove)
      document.removeEventListener('mouseup', this.onMouseUp)

      if ('ontouchstart' in window) {
        document.removeEventListener('touchmove', this.onMouseMove)
        document.removeEventListener('touchend', this.onMouseUp)
      }
    },
    onMouseDown (event, splitterIndex) {
      this.bindEvents()
      this.touch.mouseDown = true
      this.touch.activeSplitter = splitterIndex
    },
    onMouseMove (event) {
      if (this.touch.mouseDown) {
        // Prevent scrolling while touch dragging (only works with an active event, eg. passive: false).
        event.preventDefault()
        this.touch.dragging = true
        this.calculatePanesSize(this.getCurrentMouseDrag(event))
        this.$emit('resize', this.panes.map(pane => ({ min: pane.min, max: pane.max, size: pane.size })))
      }
    },
    onMouseUp () {
      if (this.touch.dragging) {
        this.$emit('resized', this.panes.map(pane => ({ min: pane.min, max: pane.max, size: pane.size })))
      }
      this.touch.mouseDown = false
      // Keep dragging flag until click event is finished (click happens immediately after mouseup)
      // in order to prevent emitting `splitter-click` event if splitter was dragged.
      setTimeout(() => {
        this.touch.dragging = false
        this.unbindEvents()
      }, 100)
    },
    // If touch device, detect double tap manually (2 taps separated by less than 500ms).
    onSplitterClick (event, splitterIndex) {
      if ('ontouchstart' in window) {
        event.preventDefault()

        if (this.splitterTaps.splitter === splitterIndex) {
          clearTimeout(this.spltterTaps.timeoutId)
          this.splitterTaps.timeoutId = null
          this.onSplitterDblClick(event, splitterIndex)
        } else {
          this.splitterTaps.splitter = splitterIndex
          this.splitterTaps.timeoutId = setTimeout(() => {
            this.splitterTaps.splitter = null
          }, 500)
        }
      }

      if (!this.touch.dragging) this.$emit('splitter-click', this.panes[splitterIndex])
    },
    // On splitter dbl click or dbl tap maximize this pane.
    onSplitterDblClick (event, splitterIndex) {
      let totalMinSizes = 0
      this.panes = this.panes.map((pane, i) => {
        pane.size = i === splitterIndex ? pane.max : pane.min
        if (i !== splitterIndex) totalMinSizes += pane.min

        return pane
      })
      this.panes[splitterIndex].size -= totalMinSizes
      this.$emit('pane-maximize', this.panes[splitterIndex])
    },
    onPaneClick (event, paneIndex) {
      this.$emit('pane-click', this.panes[paneIndex])
    },
    // Get the cursor position relative to the splitpane container.
    getCurrentMouseDrag (event) {
      const rect = this.container.getBoundingClientRect()
      const { clientX, clientY } = ('ontouchstart' in window && event.touches) ? event.touches[0] : event
      return {
        x: clientX - rect.left,
        y: clientY - rect.top
      }
    },
    // Returns the drag percentage of the splitter relative to the 2 panes it's inbetween.
    // if the sum of size of the 2 cells is 60%, the dragPercentage range will be 0 to 100% of this 60%.
    getCurrentDragPercentage (drag) {
      drag = drag[this.horizontal ? 'y' : 'x']
      // In the code bellow 'size' refers to 'width' for vertical and 'height' for horizontal layout.
      const containerSize = this.container[this.horizontal ? 'clientHeight' : 'clientWidth']
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
          paneBefore.size = paneBefore.max
          paneAfter.size = Math.max(100 - paneBefore.max - sums.prevPanesSize - sums.nextPanesSize, 0)
        } else {
          paneBefore.size = Math.max(100 - paneAfter.max - sums.prevPanesSize - this.sumNextPanesSize(splitterIndex + 1), 0)
          paneAfter.size = paneAfter.max
        }
        return
      }

      // When pushOtherPanes = true, find the closest expanded pane on each side of the splitter.
      if (this.pushOtherPanes) {
        const vars = this.doPushOtherPanes(sums, dragPercentage)
        if (!vars) {
          return // Prevent other calculation.
        }
        ({ sums, panesToResize } = vars)
        paneBefore = this.panes[panesToResize[0]] || null
        paneAfter = this.panes[panesToResize[1]] || null
      }

      if (paneBefore !== null) {
        paneBefore.size = Math.min(Math.max(dragPercentage - sums.prevPanesSize - sums.prevReachedMinPanes, paneBefore.min), paneBefore.max)
      }
      if (paneAfter !== null) {
        paneAfter.size = Math.min(Math.max(100 - dragPercentage - sums.nextPanesSize - sums.nextReachedMinPanes, paneAfter.min), paneAfter.max)
      }
    },
    doPushOtherPanes (sums, dragPercentage) {
      const splitterIndex = this.touch.activeSplitter
      const panesToResize = [splitterIndex, splitterIndex + 1]
      // Pushing Down.
      // Going smaller than the current pane min size: take the previous expanded pane.
      if (dragPercentage < sums.prevPanesSize + this.panes[panesToResize[0]].min) {
        panesToResize[0] = this.findPrevExpandedPane(splitterIndex).index

        sums.prevReachedMinPanes = 0
        // If pushing a n-2 or less pane, from splitter, then make sure all in between is at min size.
        if (panesToResize[0] < splitterIndex) {
          this.panes.forEach((pane, i) => {
            if (i > panesToResize[0] && i <= splitterIndex) {
              pane.size = pane.min
              sums.prevReachedMinPanes += pane.min
            }
          })
        }
        sums.prevPanesSize = this.sumPrevPanesSize(panesToResize[0])
        // If nothing else to push down, cancel dragging.
        if (panesToResize[0] === undefined) {
          sums.prevReachedMinPanes = 0
          this.panes[0].size = this.panes[0].min
          this.panes.forEach((pane, i) => {
            if (i > 0 && i <= splitterIndex) {
              pane.size = pane.min
              sums.prevReachedMinPanes += pane.min
            }
          })
          this.panes[panesToResize[1]].size = 100 - sums.prevReachedMinPanes - this.panes[0].min - sums.prevPanesSize - sums.nextPanesSize
          return null
        }
      }
      // Pushing Up.
      // Pushing up beyond min size is reached: take the next expanded pane.
      if (dragPercentage > 100 - sums.nextPanesSize - this.panes[panesToResize[1]].min) {
        panesToResize[1] = this.findNextExpandedPane(splitterIndex).index
        sums.nextReachedMinPanes = 0
        // If pushing a n+2 or more pane, from splitter, then make sure all in between is at min size.
        if (panesToResize[1] > splitterIndex + 1) {
          this.panes.forEach((pane, i) => {
            if (i > splitterIndex && i < panesToResize[1]) {
              pane.size = pane.min
              sums.nextReachedMinPanes += pane.min
            }
          })
        }
        sums.nextPanesSize = this.sumNextPanesSize(panesToResize[1] - 1)
        // If nothing else to push up, cancel dragging.
        if (panesToResize[1] === undefined) {
          sums.nextReachedMinPanes = 0
          this.panes[this.panes.length - 1].size = this.panes[this.panes.length - 1].min
          this.panes.forEach((pane, i) => {
            if (i < this.panes.length - 1 && i >= splitterIndex + 1) {
              pane.size = pane.min
              sums.nextReachedMinPanes += pane.min
            }
          })
          this.panes[panesToResize[0]].size = 100 - sums.prevPanesSize - sums.nextReachedMinPanes - this.panes[this.panes.length - 1].min - sums.nextPanesSize
          return null
        }
      }
      return { sums, panesToResize }
    },
    sumPrevPanesSize (splitterIndex) {
      return this.panes.reduce((total, pane, i) => total + (i < splitterIndex ? pane.size : 0), 0)
    },
    sumNextPanesSize (splitterIndex) {
      return this.panes.reduce((total, pane, i) => total + (i > splitterIndex + 1 ? pane.size : 0), 0)
    },
    // Return the previous pane from siblings which has a size (width for vert or height for horz) of more than 0.
    findPrevExpandedPane (splitterIndex) {
      const pane = [...this.panes].reverse().find((p) => (p.index < splitterIndex && p.size > p.min))
      return pane || {}
    },
    // Return the next pane from siblings which has a size (width for vert or height for horz) of more than 0.
    findNextExpandedPane (splitterIndex) {
      const pane = this.panes.find((p) => (p.index > splitterIndex + 1 && p.size > p.min))
      return pane || {}
    },
    // Called when the component is mounted and updated: update the panes and splitter as needed.
    update () {
      let lastIsPane = false
      let nbPanes = 0
      let setPanesSizesToDefault = false;
      // Loop through children: some panes and splitters may have been reused by Vue.js recycling mechanism.
      [...this.container.children].forEach((child) => {
        if (child.classList.contains('splitpanes__pane')) { // Pane
          const paneIndex = nbPanes

          if (lastIsPane) { // The previous child is a pane: we need to create a new splitter in between.
            const splitterIndex = paneIndex - 1
            const elm = document.createElement('div')
            elm.classList.add('splitpanes__splitter')
            elm.setAttribute('data-splitpanes-index', splitterIndex)
            elm.onmousedown = (event) => this.onMouseDown(event, splitterIndex)
            if (typeof window !== 'undefined' && 'ontouchstart' in window) {
              elm.ontouchstart = (event) => this.onMouseDown(event, splitterIndex)
            }
            elm.onclick = (event) => this.onSplitterClick(event, splitterIndex + 1)
            if (this.dblClickSplitter) {
              elm.ondblclick = (event) => this.onSplitterDblClick(event, splitterIndex + 1)
            }

            child.parentNode.insertBefore(elm, child)
          }

          lastIsPane = true
          nbPanes++
          if (child.getAttribute('data-splitpanes-index') === paneIndex.toString()) {
            // The pane has been recycled and is at the correct position: nothing to change.
            return
          }

          // Otherwise, update the pane information.
          child.setAttribute('id', `pane_${paneIndex}`)
          child.setAttribute('data-splitpanes-index', paneIndex)
          child.onclick = (event) => this.onPaneClick(event, paneIndex)

          // Get pane size.
          const vm = this.$children[paneIndex]
          let size = 0
          if (!setPanesSizesToDefault) {
            if (typeof vm.size === 'undefined') {
              // No 'size' prop set, the size will be set to "100 / nbPanes" after this loop since we don't know yet how many panes there are.
              setPanesSizesToDefault = true
            } else {
              // The size is given in prop.
              size = Number.parseFloat(vm.size)
            }
          }

          // Update `this.panes` with the new pane information.
          this.$set(this.panes, paneIndex, {
            'index': paneIndex,
            'min': (typeof vm.minSize === 'undefined') ? 0 : Number.parseFloat(vm.minSize),
            'max': (typeof vm.maxSize === 'undefined') ? 100 : Number.parseFloat(vm.maxSize),
            size
          })
        } else { // Splitter
          if (!lastIsPane) {
            // The previous child is already a splitter, so we need to remove this one.
            child.onmousedown = undefined
            child.onclick = undefined
            child.ondblclick = undefined
            child.remove()
            return
          }

          lastIsPane = false
          const splitterIndex = nbPanes - 1
          if (child.hasAttribute('data-splitpanes-index')) {
            if (child.getAttribute('data-splitpanes-index') === splitterIndex.toString()) {
              // The splitter is at the correct position: nothing to change.
              return
            }
            // Otherwise, we'll need to update its information, so let's start by erasing the old ones.
            child.onmousedown = undefined
            child.onclick = undefined
            child.ondblclick = undefined
          }
          // Update the splitter information.
          child.setAttribute('data-splitpanes-index', splitterIndex)
          child.onmousedown = (event) => this.onMouseDown(event, splitterIndex)
          child.onclick = (event) => this.onSplitterClick(event, splitterIndex)
          if (this.dblClickSplitter) {
            child.ondblclick = (event) => this.onSplitterDblClick(event, splitterIndex)
          }
        }
      });

      // Remove the trailing splitter if any.
      [...this.container.children].reverse().some((child) => {
        if (child.classList.contains('splitpanes__pane')) {
          return true
        }
        if (child.classList.contains('splitpanes__splitter')) {
          child.onmousedown = undefined
          child.onclick = undefined
          child.ondblclick = undefined
          child.remove()
          return true
        }
        return false
      })

      if (this.panes.length > nbPanes) {
        // There are less panes than before, so we need to remove the unused ones from `this.panes`.
        this.panes.splice(nbPanes, this.panes.length - nbPanes + 1)
      }

      if (setPanesSizesToDefault) {
        // If some panes have no `size` prop set, then we compute and set their default size.
        const size = 100 / this.panes.length
        this.panes.forEach((pane) => {
          pane.size = size
        })
      }
    },
    // Called by pane component on programmatic resize.
    requestUpdate ({ target, ...args }) {
      const index = target.$el.getAttribute('data-splitpanes-index')
      const pane = this.panes[index]
      Object.entries(args).forEach(([key, value]) => {
        pane[key] = value
      })
    }
  },

  updated () {
    this.update()
  },

  mounted () {
    this.container = this.$refs.container
    this.update()
    this.$emit('ready')
  },

  render (h) {
    return h(
      'div',
      {
        ref: 'container',
        class: [
          'splitpanes',
          `splitpanes--${this.horizontal ? 'horizontal' : 'vertical'}`,
          {
            'splitpanes--dragging': this.touch.dragging
          }
        ]
      },
      this.$slots.default
    )
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
