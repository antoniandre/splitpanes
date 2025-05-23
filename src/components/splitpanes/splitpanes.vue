<script setup>
import { h, ref, computed, onMounted, onBeforeUnmount, nextTick, provide, useSlots, watch } from 'vue'

const emit = defineEmits([
  'ready',
  'resize',
  'resized',
  'pane-click',
  'pane-maximize',
  'pane-add',
  'pane-remove',
  'splitter-click',
  'splitter-dblclick'
])

const props = defineProps({
  horizontal: { type: Boolean, default: false },
  pushOtherPanes: { type: Boolean, default: true },
  maximizePanes: { type: Boolean, default: true }, // Maximize pane on splitter double click/tap.
  rtl: { type: Boolean, default: false }, // Right to left direction.
  firstSplitter: { type: Boolean, default: false }
})

const slots = useSlots()
const panes = ref([])
// Indexed panes by id (Vue's internal component uid) of Pane components for fast lookup.
// Every time a pane is destroyed this index is recomputed.
const indexedPanes = computed(() => panes.value.reduce((obj, pane) => (obj[~~pane.id] = pane) && obj, {}))
const panesCount = computed(() => panes.value.length)

const containerEl = ref(null)
const ready = ref(false)
const touch = ref({
  mouseDown: false,
  dragging: false,
  activeSplitter: null,
  cursorOffset: 0 // Cursor offset within the splitter.
})
const splitterTaps = ref({ // Used to detect double click on touch devices.
  splitter: null,
  timeoutId: null
})

const splitpanesClasses = computed(() => ({
  [`splitpanes splitpanes--${props.horizontal ? 'horizontal' : 'vertical'}`]: true,
  'splitpanes--dragging': touch.value.dragging
}))

// Methods.
// --------------------------------------------------------
const bindEvents = () => {
  document.addEventListener('mousemove', onMouseMove, { passive: false })
  document.addEventListener('mouseup', onMouseUp)

  // Passive: false to prevent scrolling while touch dragging.
  if ('ontouchstart' in window) {
    document.addEventListener('touchmove', onMouseMove, { passive: false })
    document.addEventListener('touchend', onMouseUp)
  }
}

const unbindEvents = () => {
  document.removeEventListener('mousemove', onMouseMove, { passive: false })
  document.removeEventListener('mouseup', onMouseUp)

  if ('ontouchstart' in window) {
    document.removeEventListener('touchmove', onMouseMove, { passive: false })
    document.removeEventListener('touchend', onMouseUp)
  }
}

const onMouseDown = (event, splitterIndex) => {
  // Store the cursor offset within the splitter to keep the cursor in the same position while dragging.
  const splitterEl = event.target.closest('.splitpanes__splitter')
  if (splitterEl) {
    const { left, top } = splitterEl.getBoundingClientRect()
    const { clientX, clientY } = ('ontouchstart' in window && event.touches) ? event.touches[0] : event
    touch.value.cursorOffset = props.horizontal ? (clientY - top) : (clientX - left)
  }

  bindEvents()
  touch.value.mouseDown = true
  touch.value.activeSplitter = splitterIndex
}

const onMouseMove = event => {
  if (touch.value.mouseDown) {
    // Prevent scrolling while touch dragging (only works with an active event, eg. passive: false).
    event.preventDefault()
    touch.value.dragging = true
    requestAnimationFrame(() => {
      calculatePanesSize(getCurrentMouseDrag(event))
      emitEvent('resize', { event }, true)
    })
  }
}

const onMouseUp = event => {
  if (touch.value.dragging) {
    window.getSelection().removeAllRanges()
    emitEvent('resized', { event }, true)
  }
  touch.value.mouseDown = false
  touch.value.activeSplitter = null
  // Keep dragging flag until click event is finished (click happens immediately after mouseup)
  // in order to prevent emitting `splitter-click` event if splitter was dragged.
  setTimeout(() => {
    touch.value.dragging = false
    unbindEvents()
  }, 100)
}

// If touch device, detect double tap manually (2 taps separated by less than 500ms).
const onSplitterClick = (event, splitterIndex) => {
  if ('ontouchstart' in window) {
    event.preventDefault()

    // Detect splitter double taps.
    if (splitterTaps.value.splitter === splitterIndex) {
      clearTimeout(splitterTaps.value.timeoutId)
      splitterTaps.value.timeoutId = null
      onSplitterDblClick(event, splitterIndex)
      splitterTaps.value.splitter = null // Reset for the next tap check.
    }
    else {
      splitterTaps.value.splitter = splitterIndex
      // Store the fist tap and wait for the second one.
      splitterTaps.value.timeoutId = setTimeout(() => (splitterTaps.value.splitter = null), 500)
    }
  }

  if (!touch.value.dragging) {
    emitEvent('splitter-click', { event, index: splitterIndex }, true)
  }
}

// On splitter dbl click or dbl tap maximize this pane.
const onSplitterDblClick = (event, splitterIndex) => {
  emitEvent('splitter-dblclick', { event, index: splitterIndex }, true)

  if (props.maximizePanes) {
    let totalMinSizes = 0
    panes.value = panes.value.map((pane, i) => {
      pane.size = i === splitterIndex ? pane.max : pane.min
      if (i !== splitterIndex) totalMinSizes += pane.min

      return pane
    })
    panes.value[splitterIndex].size -= totalMinSizes
    emitEvent('pane-maximize', { event, index: splitterIndex, pane: panes.value[splitterIndex] })
    emitEvent('resized', { event, index: splitterIndex }, true)
  }
}

const onPaneClick = (event, paneId) => {
  emitEvent('pane-click', {
    event,
    index: indexedPanes.value[paneId].index,
    pane: indexedPanes.value[paneId]
  })
}

// Get the cursor position relative to the splitpanes container.
const getCurrentMouseDrag = event => {
  const rect = containerEl.value.getBoundingClientRect()
  const { clientX, clientY } = ('ontouchstart' in window && event.touches) ? event.touches[0] : event

  return {
    x: (clientX - (props.horizontal ? 0 : touch.value.cursorOffset)) - rect.left,
    y: (clientY - (props.horizontal ? touch.value.cursorOffset : 0)) - rect.top
  }
}

// Returns the drag percentage of the splitter relative to the container (ranging from 0 to 100%).
const getCurrentDragPercentage = drag => {
  drag = drag[props.horizontal ? 'y' : 'x']
  // In the code below 'size' refers to 'width' for vertical and 'height' for horizontal layout.
  const containerSize = containerEl.value[props.horizontal ? 'clientHeight' : 'clientWidth']
  if (props.rtl && !props.horizontal) drag = containerSize - drag

  return drag * 100 / containerSize
}

const calculatePanesSize = drag => {
  const splitterIndex = touch.value.activeSplitter
  let sums = {
    prevPanesSize: sumPrevPanesSize(splitterIndex),
    nextPanesSize: sumNextPanesSize(splitterIndex),
    prevReachedMinPanes: 0,
    nextReachedMinPanes: 0
  }

  const minDrag = 0 + (props.pushOtherPanes ? 0 : sums.prevPanesSize)
  const maxDrag = 100 - (props.pushOtherPanes ? 0 : sums.nextPanesSize)
  const dragPercentage = Math.max(Math.min(getCurrentDragPercentage(drag), maxDrag), minDrag)

  // If not pushing other panes, panes to resize are right before and right after splitter.
  let panesToResize = [splitterIndex, splitterIndex + 1]
  let paneBefore = panes.value[panesToResize[0]] || null
  let paneAfter = panes.value[panesToResize[1]] || null

  const paneBeforeMaxReached = paneBefore.max < 100 && (dragPercentage >= (paneBefore.max + sums.prevPanesSize))
  const paneAfterMaxReached = paneAfter.max < 100 && (dragPercentage <= 100 - (paneAfter.max + sumNextPanesSize(splitterIndex + 1)))
  // Prevent dragging beyond pane max.
  if (paneBeforeMaxReached || paneAfterMaxReached) {
    if (paneBeforeMaxReached) {
      paneBefore.size = paneBefore.max
      paneAfter.size = Math.max(100 - paneBefore.max - sums.prevPanesSize - sums.nextPanesSize, 0)
    }
    else {
      paneBefore.size = Math.max(100 - paneAfter.max - sums.prevPanesSize - sumNextPanesSize(splitterIndex + 1), 0)
      paneAfter.size = paneAfter.max
    }
    return
  }

  // When pushOtherPanes = true, find the closest expanded pane on each side of the splitter.
  if (props.pushOtherPanes) {
    const vars = doPushOtherPanes(sums, dragPercentage)
    if (!vars) return // Prevent other calculation.

    ({ sums, panesToResize } = vars)
    paneBefore = panes.value[panesToResize[0]] || null
    paneAfter = panes.value[panesToResize[1]] || null
  }

  if (paneBefore !== null) {
    paneBefore.size = Math.min(Math.max(dragPercentage - sums.prevPanesSize - sums.prevReachedMinPanes, paneBefore.min), paneBefore.max)
  }
  if (paneAfter !== null) {
    paneAfter.size = Math.min(Math.max(100 - dragPercentage - sums.nextPanesSize - sums.nextReachedMinPanes, paneAfter.min), paneAfter.max)
  }
}

const doPushOtherPanes = (sums, dragPercentage) => {
  const splitterIndex = touch.value.activeSplitter
  const panesToResize = [splitterIndex, splitterIndex + 1]
  // Pushing Down.
  // Going smaller than the current pane min size: take the previous expanded pane.
  if (dragPercentage < sums.prevPanesSize + panes.value[panesToResize[0]].min) {
    panesToResize[0] = findPrevExpandedPane(splitterIndex).index

    sums.prevReachedMinPanes = 0
    // If pushing a n-2 or less pane, from splitter, then make sure all in between is at min size.
    if (panesToResize[0] < splitterIndex) {
      panes.value.forEach((pane, i) => {
        if (i > panesToResize[0] && i <= splitterIndex) {
          pane.size = pane.min
          sums.prevReachedMinPanes += pane.min
        }
      })
    }
    sums.prevPanesSize = sumPrevPanesSize(panesToResize[0])
    // If nothing else to push down, cancel dragging.
    if (panesToResize[0] === undefined) {
      sums.prevReachedMinPanes = 0
      panes.value[0].size = panes.value[0].min
      panes.value.forEach((pane, i) => {
        if (i > 0 && i <= splitterIndex) {
          pane.size = pane.min
          sums.prevReachedMinPanes += pane.min
        }
      })
      panes.value[panesToResize[1]].size = 100 - sums.prevReachedMinPanes - panes.value[0].min - sums.prevPanesSize - sums.nextPanesSize
      return null
    }
  }
  // Pushing Up.
  // Pushing up beyond min size is reached: take the next expanded pane.
  if (dragPercentage > 100 - sums.nextPanesSize - panes.value[panesToResize[1]].min) {
    panesToResize[1] = findNextExpandedPane(splitterIndex).index
    sums.nextReachedMinPanes = 0
    // If pushing a n+2 or more pane, from splitter, then make sure all in between is at min size.
    if (panesToResize[1] > splitterIndex + 1) {
      panes.value.forEach((pane, i) => {
        if (i > splitterIndex && i < panesToResize[1]) {
          pane.size = pane.min
          sums.nextReachedMinPanes += pane.min
        }
      })
    }

    sums.nextPanesSize = sumNextPanesSize(panesToResize[1] - 1)
    // If nothing else to push up, cancel dragging.
    if (panesToResize[1] === undefined) {
      sums.nextReachedMinPanes = 0
      panes.value.forEach((pane, i) => {
        // If pushing a n+2 or more pane, from splitter, then make sure all in between is at min size.
        if (i < panesCount.value - 1 && i >= splitterIndex + 1) {
          pane.size = pane.min
          sums.nextReachedMinPanes += pane.min
        }
      })
      panes.value[panesToResize[0]].size = 100 - sums.prevPanesSize - sumNextPanesSize(panesToResize[0] - 1)
      return null
    }
  }

  return { sums, panesToResize }
}

const sumPrevPanesSize = splitterIndex => {
  return panes.value.reduce((total, pane, i) => total + (i < splitterIndex ? pane.size : 0), 0)
}

const sumNextPanesSize = splitterIndex => {
  return panes.value.reduce((total, pane, i) => total + (i > splitterIndex + 1 ? pane.size : 0), 0)
}

// Return the previous pane from siblings which has a size (width for vert or height for horz) of more than 0.
const findPrevExpandedPane = splitterIndex => {
  const pane = [...panes.value].reverse().find(p => (p.index < splitterIndex && p.size > p.min))
  return pane || {}
}

// Return the next pane from siblings which has a size (width for vert or height for horz) of more than 0.
const findNextExpandedPane = splitterIndex => {
  const pane = panes.value.find(p => (p.index > splitterIndex + 1 && p.size > p.min))
  return pane || {}
}

const checkSplitpanesNodes = () => {
  const children = Array.from(containerEl.value?.children || [])
  for (const child of children) {
    const isPane = child.classList.contains('splitpanes__pane')
    const isSplitter = child.classList.contains('splitpanes__splitter')

    // Node is not a Pane or a splitter: remove it.
    if (!isPane && !isSplitter) {
      child.remove()
      console.warn('Splitpanes: Only <pane> elements are allowed at the root of <splitpanes>. One of your DOM nodes was removed.')
    }
  }
}

const addSplitter = (paneIndex, nextPaneNode, isVeryFirst = false) => {
  const splitterIndex = paneIndex - 1
  const elm = document.createElement('div')
  elm.classList.add('splitpanes__splitter')

  if (!isVeryFirst) {
    elm.onmousedown = event => onMouseDown(event, splitterIndex)

    if (typeof window !== 'undefined' && 'ontouchstart' in window) {
      elm.ontouchstart = event => onMouseDown(event, splitterIndex)
    }
    elm.onclick = event => onSplitterClick(event, splitterIndex + 1)
  }

  elm.ondblclick = event => onSplitterDblClick(event, splitterIndex + 1)

  nextPaneNode.parentNode.insertBefore(elm, nextPaneNode)
}

const removeSplitter = node => {
  node.onmousedown = undefined
  node.onclick = undefined
  node.ondblclick = undefined
  node.remove()
}

const redoSplitters = () => {
  const children = Array.from(containerEl.value?.children || [])
  for (const el of children) {
    if (el.className.includes('splitpanes__splitter')) removeSplitter(el)
  }
  let paneIndex = 0
  for (const el of children) {
    if (el.className.includes('splitpanes__pane')) {
      if (!paneIndex && props.firstSplitter) addSplitter(paneIndex, el, true)
      else if (paneIndex) addSplitter(paneIndex, el)
      paneIndex++
    }
  }
}

// Called by Pane component on programmatic resize.
const requestUpdate = ({ uid, ...args }) => {
  const pane = indexedPanes.value[uid]
  for (const [key, value] of Object.entries(args)) pane[key] = value
}

const onPaneAdd = pane => {
  // 1. Add pane to array at the same index it was inserted in the <splitpanes> tag.
  let index = -1
  Array.from(containerEl.value?.children || []).some(el => {
    if (el.className.includes('splitpanes__pane')) index++
    return el.isSameNode(pane.el)
  })

  panes.value.splice(index, 0, { ...pane, index })
  // Redo indexes after insertion for other shifted panes.
  panes.value.forEach((p, i) => (p.index = i))

  if (ready.value) {
    nextTick(() => {
      // 2. Add the splitter.
      redoSplitters()

      // 3. Resize the panes (before pane-add so it will contain correct width).
      resetPaneSizes({ addedPane: panes.value[index] })

      // 4. Fire `pane-add` event.
      emitEvent('pane-add', { pane: panes.value[index] })
    })
  }
}

const onPaneRemove = uid => {
  // 1. Remove the pane from array and redo indexes.
  const index = panes.value.findIndex(p => p.id === uid)
  panes.value[index].el = null // Prevent memory leaks.
  const removed = panes.value.splice(index, 1)[0]
  panes.value.forEach((p, i) => (p.index = i)) // Redo indexes after removal.

  nextTick(() => {
    // 2. Remove the splitter.
    redoSplitters()

    // 3. Fire `pane-remove` event.
    emitEvent('pane-remove', { pane: removed })

    // 4. Resize the panes.
    resetPaneSizes({ removedPane: { ...removed, index } })
  })
}

const resetPaneSizes = (changedPanes = {}) => {
  if (!changedPanes.addedPane && !changedPanes.removedPane) initialPanesSizing()
  else if (panes.value.some(pane => pane.givenSize !== null || pane.min || pane.max < 100)) equalizeAfterAddOrRemove(changedPanes)
  else equalize()
  if (ready.value) emitEvent('resized')
}

const equalize = () => {
  const equalSpace = 100 / panesCount.value
  let leftToAllocate = 0
  const ungrowable = []
  const unshrinkable = []

  for (const pane of panes.value) {
    pane.size = Math.max(Math.min(equalSpace, pane.max), pane.min)

    leftToAllocate -= pane.size
    if (pane.size >= pane.max) ungrowable.push(pane.id)
    if (pane.size <= pane.min) unshrinkable.push(pane.id)
  }

  if (leftToAllocate > 0.1) readjustSizes(leftToAllocate, ungrowable, unshrinkable)
}

const initialPanesSizing = () => {
  let leftToAllocate = 100
  const ungrowable = []
  const unshrinkable = []
  let definedSizes = 0

  // Check if pre-allocated space is 100%.
  for (const pane of panes.value) {
    leftToAllocate -= pane.size
    if (pane.givenSize !== null) definedSizes++
    if (pane.size >= pane.max) ungrowable.push(pane.id)
    if (pane.size <= pane.min) unshrinkable.push(pane.id)
  }

  // Set pane sizes if not set.
  let leftToAllocate2 = 100
  if (leftToAllocate > 0.1) {
    for (const pane of panes.value) {
      if (pane.givenSize === null) {
        pane.size = Math.max(Math.min(leftToAllocate / (panesCount.value - definedSizes), pane.max), pane.min)
      }
      leftToAllocate2 -= pane.size
    }

    if (leftToAllocate2 > 0.1) readjustSizes(leftToAllocate2, ungrowable, unshrinkable)
  }
}

const equalizeAfterAddOrRemove = ({ addedPane, removedPane } = {}) => {
  let equalSpace = 100 / panesCount.value
  let leftToAllocate = 0
  const ungrowable = []
  const unshrinkable = []

  if ((addedPane?.givenSize ?? null) !== null) {
    equalSpace = (100 - addedPane.givenSize) / (panesCount.value - 1)
  }

  // Check if pre-allocated space is 100%.
  for (const pane of panes.value) {
    leftToAllocate -= pane.size
    if (pane.size >= pane.max) ungrowable.push(pane.id)
    if (pane.size <= pane.min) unshrinkable.push(pane.id)
  }

  if (Math.abs(leftToAllocate) < 0.1) return // Ok.

  for (const pane of panes.value) {
    const addedPaneHasGivenSize = addedPane?.givenSize !== null && addedPane?.id === pane.id
    if (!addedPaneHasGivenSize) pane.size = Math.max(Math.min(equalSpace, pane.max), pane.min)

    leftToAllocate -= pane.size
    if (pane.size >= pane.max) ungrowable.push(pane.id)
    if (pane.size <= pane.min) unshrinkable.push(pane.id)
  }

  if (leftToAllocate > 0.1) readjustSizes(leftToAllocate, ungrowable, unshrinkable)
}

/* const recalculatePaneSizes = ({ addedPane, removedPane } = {}) => {
  let leftToAllocate = 100
  let equalSpaceToAllocate = leftToAllocate / panesCount.value
  let ungrowable = []
  let unshrinkable = []

  // When adding a pane with no size, apply min-size if defined otherwise divide another pane
  // (next or prev) in 2.
  // if (addedPane && addedPane.size === null) {
  //   if (addedPane.min) addedPane.size = addedPane.min
  //   else {
  //     const paneToDivide = panes.value[addedPane.index + 1] || panes.value[addedPane.index - 1]
  //     if (paneToDivide) {
  //       // @todo: Dividing that pane in 2 could be incorrect if becoming lower than its min size.
  //       addedPane.size = paneToDivide.size / 2
  //       paneToDivide.size /= 2
  //     }
  //   }
  // }

  panes.value.forEach((pane, i) => {
    // Added pane - reduce the size of the next pane.
    if (addedPane && addedPane.index + 1 === i) {
      pane.size = Math.max(Math.min(100 - sumPrevPanesSize(i) - sumNextPanesSize(i + 1), pane.max), pane.min)
      // @todo: if could not allocate correctly, try to allocate in the next pane straight away,
      // then still do the second loop if not correct.
    }

    // Removed pane - increase the size of the next pane.
    else if (removedPane && removedPane.index === i) {
      pane.size = Math.max(Math.min(100 - sumPrevPanesSize(i) - sumNextPanesSize(i + 1), pane.max), pane.min)
      // @todo: if could not allocate correctly, try to allocate in the next pane straight away,
      // then still do the second loop if not correct.
    }

    // Initial load and on demand recalculation.
    else if (!addedPane && !removedPane && pane.size === null) {
      pane.size = Math.max(Math.min(equalSpaceToAllocate, pane.max), pane.min)
    }

    leftToAllocate -= pane.size

    if (pane.size >= pane.max) ungrowable.push(pane.id)
    if (pane.size <= pane.min) unshrinkable.push(pane.id)
  })

  // Do one more loop to adjust sizes if still wrong.
  // > 0.1: Prevent maths rounding issues due to bytes.
  if (Math.abs(leftToAllocate) > 0.1) readjustSizes(leftToAllocate, ungrowable, unshrinkable)
} */

// Second loop to adjust sizes now that we know more about the panes constraints.
const readjustSizes = (leftToAllocate, ungrowable, unshrinkable) => {
  let equalSpaceToAllocate
  if (leftToAllocate > 0) equalSpaceToAllocate = leftToAllocate / (panesCount.value - ungrowable.length)
  else equalSpaceToAllocate = leftToAllocate / (panesCount.value - unshrinkable.length)

  panes.value.forEach((pane, i) => {
    if (leftToAllocate > 0 && !ungrowable.includes(pane.id)) {
      // Need to diff the size before and after to get the exact allocated space.
      const newPaneSize = Math.max(Math.min(pane.size + equalSpaceToAllocate, pane.max), pane.min)
      const allocated = newPaneSize - pane.size
      leftToAllocate -= allocated
      pane.size = newPaneSize
    }
    else if (!unshrinkable.includes(pane.id)) {
      // Need to diff the size before and after to get the exact allocated space.
      const newPaneSize = Math.max(Math.min(pane.size + equalSpaceToAllocate, pane.max), pane.min)
      const allocated = newPaneSize - pane.size
      leftToAllocate -= allocated
      pane.size = newPaneSize
    }
  })

  if (Math.abs(leftToAllocate) > 0.1) { // > 0.1: Prevent maths rounding issues due to bytes.
    // Don't emit on hot reload when Vue destroys panes.
    nextTick(() => {
      if (ready.value) {
        console.warn('Splitpanes: Could not resize panes correctly due to their constraints.')
      }
    })
  }
}

/* const distributeEmptySpace = () => {
  let growablePanes = []
  let collapsedPanesCount.value = 0
  let growableAmount = 0 // Total of how much the current panes can grow to fill blank space.
  let spaceToDistribute = 100 - panes.value.reduce((sum, pane) => (sum += pane.size) && sum, 0)
  // Do a first loop to determine if we can distribute the new blank space between all the
  // expandedPanes, without expanding the collapsed ones.
  panes.value.forEach(pane => {
    if (pane.size < pane.max) growablePanes.push(pane)

    if (!pane.size) collapsedPanesCount.value++
    else growableAmount += pane.max - pane.size
  })

  // If the blank space to distribute is too great for the expanded panes, also expand collapsed ones.
  let expandCollapsedPanes = growableAmount < spaceToDistribute

  // New space to distribute equally.
  let growablePanesCount.value = (growablePanes.length - (expandCollapsedPanes ? 0 : collapsedPanesCount.value))
  let equalSpaceToDistribute = spaceToDistribute / growablePanesCount.value
  // if (growablePanesCount.value === 1) equalSpace = 100 / panesCount.value
  let spaceLeftToDistribute = spaceToDistribute

  // Now add the equalSpaceToDistribute to each pane size accordingly.
  growablePanes.forEach(pane => {
    if (pane.size < pane.max && (pane.size || (!pane.size && expandCollapsedPanes))) {
      const newSize = Math.min(pane.size + equalSpaceToDistribute, pane.max)
      let allocatedSpace = (newSize - pane.size)
      spaceLeftToDistribute -= allocatedSpace
      pane.size = newSize
      // If the equalSpaceToDistribute is not fully added to the current pane, distribute the remainder
      // to the next panes.
      // Also fix decimal issue due to bites - E.g. calculating 8.33 and getting 8.3299999999999
      if (equalSpaceToDistribute - allocatedSpace > 0.1) equalSpaceToDistribute = spaceLeftToDistribute / (--growablePanesCount.value)
    }
  })

  /* Disabled otherwise will show up on hot reload.
  // if there is still space to allocate show warning message.
  if (panesCount.value && ~~spaceLeftToDistribute) {
    // eslint-disable-next-line no-console
    console.warn('Splitpanes: Could not distribute all the empty space between panes due to their constraints.')
  } *\/

  emitEvent('resized', { index: touch.value.activeSplitter }, true)
} */

const emitEvent = (name, data = undefined, injectPrevAndNextPanes = false) => {
  const index = data?.index ?? touch.value.activeSplitter ?? null
  emit(name, {
    ...data,
    ...(index !== null && { index }),
    ...(injectPrevAndNextPanes && index !== null && {
      prevPane: panes.value[index - (props.firstSplitter ? 1 : 0)],
      nextPane: panes.value[index + (props.firstSplitter ? 0 : 1)]
    }),
    panes: panes.value.map(pane => ({ min: pane.min, max: pane.max, size: pane.size }))
  })
}

// Watchers.
// --------------------------------------------------------
watch(() => props.firstSplitter, () => redoSplitters())

onMounted(() => {
  checkSplitpanesNodes()
  redoSplitters()
  resetPaneSizes()
  emitEvent('ready')
  ready.value = true
})

// Prevent emitting console warnings on hot reloading.
onBeforeUnmount(() => (ready.value = false))

const render = () => {
  return h(
    'div',
    { ref: containerEl, class: splitpanesClasses.value },
    slots.default?.()
  )
}

provide('panes', panes)
provide('indexedPanes', indexedPanes)
provide('horizontal', computed(() => props.horizontal))
provide('requestUpdate', requestUpdate)
provide('onPaneAdd', onPaneAdd)
provide('onPaneRemove', onPaneRemove)
provide('onPaneClick', onPaneClick)
</script>

<template>
  <component :is="render"></component>
</template>

<style lang="scss">
.splitpanes {
  display: flex;
  width: 100%;
  height: 100%;

  &--vertical {flex-direction: row;}
  &--horizontal {flex-direction: column;}
  // Disable any selection and pointer events in all the document when a splitpanes dragging is detected.
  &--dragging .splitpanes__pane, *:has(&--dragging) {
    user-select: none;
    pointer-events: none;
  }

  &__pane {
    width: 100%;
    height: 100%;
    overflow: hidden;

    .splitpanes--vertical & {transition: width 0.2s ease-out;will-change: width;}
    .splitpanes--horizontal & {transition: height 0.2s ease-out;will-change: height;}
    .splitpanes--dragging & {transition: none;}
  }

  // Disable default zoom behavior on touch device when double tapping splitter.
  &__splitter {touch-action: none;}
  &--vertical > .splitpanes__splitter {min-width: 1px;cursor: col-resize;}
  &--horizontal > .splitpanes__splitter {min-height: 1px;cursor: row-resize;}
}

.default-theme {
  &.splitpanes .splitpanes__pane {background-color: #f2f2f2;}

  &.splitpanes .splitpanes__splitter {
    background-color: #fff;
    box-sizing: border-box;
    position: relative;
    flex-shrink: 0;

    &:before, &:after {
      content: "";
      position: absolute;
      top: 50%;
      left: 50%;
      background-color: rgba(0, 0, 0, .15);
      transition: background-color 0.3s;
    }
    &:hover:before, &:hover:after {background-color: rgba(0, 0, 0, .25);}
    &:first-child {cursor: auto;}
  }

  &.splitpanes .splitpanes .splitpanes__splitter {z-index: 1;}
  &.splitpanes--vertical > .splitpanes__splitter,
  .splitpanes--vertical > .splitpanes__splitter {
    width: 7px;
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
    height: 7px;
    border-top: 1px solid #eee;
    margin-top: -1px;

    &:before, &:after {
      transform: translateX(-50%);
      width: 30px;
      height: 1px;
    }
    &:before {margin-top: -2px;}
    &:after {margin-top: 1px;}
  }
}
</style>
