<script setup>
/**
 * Vocabulary in use in this component:
 * - `pane` is each resizable division where you can put content in.
 *   There's a specific Pane component to handle its layout and behavior.
 * - `splitter` is each draggable resizer that are automatically added between panes.
 * - `paneA` is one of the 2 panes that is being resized while dragging the splitter:
 *   the one on the left if horizontal and LTR, on the right if horizontal and RTL or on top if vertical
 *   layout.
 * - `paneB` is one of the 2 panes that is being resized while dragging the splitter:
 *   the one on the right if horizontal and LTR, on the left if horizontal and RTL or at the bottom if
 *   vertical layout.
 * - `size` the size of the pane can be width or height respectively for horizontal or vertical layout.
 */

import { h, ref, computed, onMounted, onBeforeUnmount, nextTick, provide, useSlots, watch } from 'vue'

const emit = defineEmits([
  'ready',
  'resize',
  'resized',
  'pane-click',
  'pane-maximize',
  'pane-add',
  'pane-remove',
  'splitter-click'
])

const props = defineProps({
  horizontal: { type: Boolean },
  pushOtherPanes: { type: Boolean, default: true },
  dblClickSplitter: { type: Boolean, default: true },
  rtl: { type: Boolean, default: false }, // Right to left direction.
  firstSplitter: { type: Boolean }
})

const slots = useSlots()
const panes = ref([])
const panesCount = computed(() => panes.value.length)
// Indexed panes by id (Vue's internal component uid) of Pane components for fast lookup.
// Every time a pane is destroyed this index is recomputed.
const indexedPanes = computed(() => {
  return panes.value.reduce((obj, pane) => (obj[~~pane.id] = pane) && obj, {})
})

const containerEl = ref(null)
const ready = ref(false)
const touch = ref({
  mouseDown: false,
  dragging: false,
  draggingT0: null,
  towardA: null, // Dragging is toward pane A (see vocabulary @ L.2).
  // The splitter being interacted with (drag, click, dblclick). An index starting from 0.
  activeSplitter: null,
  // The pane directly before the active splitter.
  // Note that it does not make sense to call leftPane for instance, because the layout can be vertical
  // and the text direction could be RTL.
  paneA: null,
  paneB: null,
  dragAmount: { x: 0, y: 0 }, // In pixels.
  dragPercentage: 0
})

const splitterTaps = ref({ // Used to detect double click on touch devices.
  splitter: null,
  timeoutId: null
})

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
  bindEvents()
  touch.value.mouseDown = true
  touch.value.activeSplitter = splitterIndex
  touch.value.draggingT0 = event[props.horizontal ? 'y' : 'x']
  touch.value.paneA = panes.value[splitterIndex]
  touch.value.paneB = panes.value[splitterIndex + 1]
}

const onMouseMove = event => {
  if (touch.value.mouseDown) {
    // Prevent scrolling while touch dragging (only works with an active event, eg. passive: false).
    event.preventDefault()
    touch.value.dragging = true
    touch.value.towardA = touch.value.draggingT0 - event[props.horizontal ? 'y' : 'x'] > 0
    getCurrentMouseDrag(event)
    getCurrentDragPercentage()
    // on every tick of dragging, call the resize function with paneA and paneB that are directly
    // around the splitter being dragged.
    // In case we are already pushing a further pane, the computation will happen multiple times
    // until it finds the correct paneA or paneB being resized. But this is still better than starting the
    // mousemove with the correct far paneA or paneB and having to detect after each end of pushing panes
    // which pane to resize then if not the current far paneA or far paneB (happens when pushing other pane
    // and changing the dragging direction in the same drag).
    resizeTwoPanes(panes.value[touch.value.activeSplitter], panes.value[touch.value.activeSplitter + 1])
    emit('resize', panes.value.map(pane => ({ min: pane.min, max: pane.max, size: pane.size })))
  }
}

const onMouseUp = () => {
  if (touch.value.dragging) {
    emit('resized', panes.value.map(pane => ({ min: pane.min, max: pane.max, size: pane.size })))
  }

  // Keep dragging flag until click event is finished (click happens immediately after mouseup)
  // in order to prevent emitting `splitter-click` event if splitter was dragged.
  setTimeout(() => {
    touch.value.dragging = false
    touch.value.mouseDown = false
    touch.value.activeSplitter = undefined
    touch.value.draggingT0 = undefined
    touch.value.towardA = undefined
    touch.value.paneA = undefined
    touch.value.paneB = undefined
    unbindEvents()
  }, 100)
}

// If touch device, detect double tap manually (2 taps separated by less than 500ms).
const onSplitterClick = (event, splitterIndex) => {
  if ('ontouchstart' in window) {
    event.preventDefault()

    // Detect splitter double taps if the option is on.
    if (props.dblClickSplitter) {
      if (splitterTaps.value.splitter === splitterIndex) {
        clearTimeout(splitterTaps.value.timeoutId)
        splitterTaps.value.timeoutId = null
        onSplitterDblClick(splitterIndex)
        splitterTaps.value.splitter = null // Reset for the next tap check.
      }
      else {
        splitterTaps.value.splitter = splitterIndex
        splitterTaps.value.timeoutId = setTimeout(() => {
          splitterTaps.value.splitter = null
        }, 500)
      }
    }
  }

  if (!touch.value.dragging) emit('splitter-click', panes.value[splitterIndex])
}

// On splitter double click or double tap maximize this pane.
const onSplitterDblClick = splitterIndex => {
  const paneB = panes.value[splitterIndex]
  const totalOtherMinSizes = panes.value.reduce((total, pane, i) => {
    if (i !== splitterIndex) {
      pane.size = pane.min
      total += pane.min
    }

    return total
  }, 0)
  paneB.size = Math.min(100 - totalOtherMinSizes, paneB.max)
  // @todo: in case the max size of the pane to expand minus all other min sizes is smaller than 100%,
  // apply the leftover size to the next pane in a loop until all the remaining space is distributed.
  emit('pane-maximize', panes.value[splitterIndex])
  emit('resized', panes.value.map(pane => ({ min: pane.min, max: pane.max, size: pane.size })))
}

const onPaneClick = paneId => {
  emit('pane-click', indexedPanes.value[paneId])
}

// Get the cursor position relative to the splitpanes container.
const getCurrentMouseDrag = event => {
  const rect = containerEl.value.getBoundingClientRect()
  const { clientX, clientY } = ('ontouchstart' in window && event.touches) ? event.touches[0] : event

  const dragAmount = { x: clientX - rect.left, y: clientY - rect.top }
  touch.value[touch.value.dragging ? 'dragAmount' : 'dragAmount0'] = dragAmount
}

// Returns the drag percentage of the splitter relative to the container (ranging from 0 to 100%).
const getCurrentDragPercentage = drag => {
  drag = touch.value.dragAmount[props.horizontal ? 'y' : 'x']
  // In the code below 'size' refers to 'width' for vertical and 'height' for horizontal layout.
  const containerSize = containerEl.value[props.horizontal ? 'clientHeight' : 'clientWidth']
  if (props.rtl && !props.horizontal) drag = containerSize - drag
  touch.value.dragPercentage = Math.max(Math.min(drag * 100 / containerSize, 100), 0)
}

const panesState = (paneA, paneB) => {
  const { dragPercentage, activeSplitter, towardA } = touch.value
  if (activeSplitter === undefined) return {}
  // All sizes before splitter, not including the paneA.
  const sumOfPrevPanes = panes.value.slice(0, paneA.index).reduce((total, pane, i) => total + pane.size, 0)
  // All sizes before splitter, not including the paneB.
  const sumOfNextPanes = panes.value.slice(paneB.index + 1).reduce((total, pane, i) => total + pane.size, 0)
  const sumOfInBetweenPanes = panes.value.slice(paneA.index + 1, paneB.index).reduce((total, pane, i) => total + pane.size, 0)
  const paneAIsMaxed = paneA.size >= paneA.max
  const paneAIsMined = paneA.size <= paneA.min
  const paneBIsMaxed = paneB.size >= paneB.max
  const paneBIsMined = paneB.size <= paneB.min
  // const isPushingPreviousPanesCondA = towardA && !sumOfInBetweenPanes && paneAIsMined
  const isPushingPreviousPanesCondA = towardA && !sumOfInBetweenPanes && dragPercentage <= sumOfPrevPanes + paneA.min
  const isPushingPreviousPanesCondB = towardA && !!sumOfInBetweenPanes && (dragPercentage <= sumOfPrevPanes + paneA.size + sumOfInBetweenPanes)
  // const isPushingNextPanesCondA = !towardA && !sumOfInBetweenPanes && paneBIsMined
  const isPushingNextPanesCondA = !towardA && !sumOfInBetweenPanes && dragPercentage > 100 - (sumOfInBetweenPanes + paneA.min + sumOfNextPanes)
  const isPushingNextPanesCondB = !towardA && !!sumOfInBetweenPanes && (dragPercentage > 100 - (sumOfInBetweenPanes + paneB.size + sumOfNextPanes))

  return {
    dragPercentage,
    activeSplitter,
    paneA,
    paneB,
    sumOfPrevPanes,
    sumOfNextPanes,
    sumOfInBetweenPanes,
    prevReachedMinPanes: 0,
    nextReachedMinPanes: 0,
    bothPanes: 100 - (sumOfPrevPanes + sumOfInBetweenPanes + sumOfNextPanes),
    paneAIsMaxed,
    paneAIsMined,
    paneBIsMaxed,
    paneBIsMined,
    isPushingPreviousPanes: isPushingPreviousPanesCondA || isPushingPreviousPanesCondB,
    isPushingNextPanes: isPushingNextPanesCondA || isPushingNextPanesCondB,
    // E.g. When dragging left and the only constraint is the paneB max.
    isPullingNextPanes: paneBIsMaxed && (100 - dragPercentage >= paneB.max + sumOfNextPanes),
    isPullingPreviousPanes: paneAIsMaxed && (dragPercentage >= paneA.max + sumOfPrevPanes)
  }
}

const resizeTwoPanes = (paneA, paneB) => {
  const state = panesState(paneA, paneB)
  const { sumOfPrevPanes, sumOfNextPanes, sumOfInBetweenPanes, dragPercentage, bothPanes } = state

  console.log({
    pushPrev: state.isPushingPreviousPanes,
    pushNext: state.isPushingNextPanes,
    pullNext: state.isPullingNextPanes,
    pullPrev: state.isPullingPreviousPanes
  })
  // console.log(paneA.el, paneB.el)
  // If dragging goes below the paneA minimum.
  if (state.isPushingPreviousPanes) {
    paneB.size = Math.min(100 - dragPercentage - sumOfNextPanes, paneB.max)
    paneA.size = Math.max(bothPanes - paneB.size, paneA.min)
    // If the paneA reached its min, readjust the paneB size.
    if (paneA.size === paneA.min) paneB.size = bothPanes - paneA.min

    // When pushOtherPanes = true, push the closest pushable pane before the paneA.
    if (props.pushOtherPanes && paneA.size === paneA.min) {
      paneA = findPrevExpandedPane(paneA.index)
      if (!paneA) return // There may not be any prev pane to shrink.

      touch.value.paneA = paneA // Will save up some calculation from the next call from the onMouseMove.
      resizeTwoPanes(paneA, paneB)
    }
  }
  // If dragging goes beyond the paneA maximum.
  else if (state.isPushingNextPanes) {
    // First calculate the paneB size, which can have a min and block the dragging.
    paneB.size = Math.max(100 - dragPercentage - sumOfNextPanes - sumOfInBetweenPanes, paneB.min)
    // Then the beforePane size is computed from 100% - all the other panes sizes - the paneB size.
    paneA.size = Math.min(bothPanes - paneB.size, paneA.max)

    // When pushOtherPanes = true, push the closest pushable pane after the paneB.
    if (props.pushOtherPanes && paneB.size === paneB.min) {
      paneB = findNextExpandedPane(paneB.index)
      if (!paneB) return // There may not be any next pane to shrink.

      touch.value.paneB = paneB // Will save up some calculation from the next call from the onMouseMove.
      resizeTwoPanes(paneA, paneB)
    }
  }
  if (state.isPullingNextPanes) {
    console.log('Pulling next panes!')
    // if (props.pushOtherPanes) pullOtherPanes()
  }
  else if (state.isPullingPreviousPanes) {
    console.log('Pulling previous panes!')
    // if (props.pushOtherPanes) pullOtherPanes()
    // paneA.size = paneA.max
    // paneB.size = 100 - (sumOfPrevPanes + sumOfNextPanes) - paneB.max
    // 100 - dragPercentage >= paneB.max + sumOfNextPanes
  }
  else if (!state.isPushingPreviousPanes && !state.isPushingNextPanes) {
    paneA.size = Math.min(Math.max(dragPercentage - sumOfPrevPanes, paneA.min), paneA.max)
    paneB.size = Math.max(Math.min(100 - (sumOfPrevPanes + paneA.size) - sumOfInBetweenPanes - sumOfNextPanes, paneB.max), paneB.min)
  }
}

const pullOtherPanes = state => {
  console.log('pullOtherPanes')
  // const state = unref(panesState)

  const sumOfAllPanes = panes.value.reduce((sum, pane) => sum + pane.size, 0)
  console.log('👛', sumOfAllPanes)

  if (sumOfAllPanes > 100) {
    return
  }

  if (state.isPullingPreviousPanes) {
    const paneFarBeforeIndex = panes.value.slice(0, state.activeSplitter).reverse().find(pane => pane.size < pane.max)?.index
    const paneFarBefore = panes.value[paneFarBeforeIndex]
    if (paneFarBefore) {
      // The sum of all the panes before the paneA.
      const sumOfPanesBefore = panes.value.slice(0, state.activeSplitter + 1).reduce((sum, pane) => sum + pane.size, 0)

      paneFarBefore.size = Math.max(Math.min(state.dragPercentage - sumOfPanesBefore + paneFarBefore.size, paneFarBefore.max), state.paneA.size)
      state.paneB.size = Math.max(100 - state.dragPercentage - state.sumOfNextPanes, state.paneB.min)
    }
  }
  else if (state.isPullingNextPanes) {
    const paneFarAfterIndex = panes.value.slice(state.activeSplitter + 1).find(pane => pane.size < pane.max)?.index
    const paneFarAfter = panes.value[paneFarAfterIndex]
    if (paneFarAfter) {
      // The sum of all the panes after the paneB.
      const sumOfPanesAfter = panes.value.slice(state.activeSplitter + 3).reduce((sum, pane) => sum + pane.size, 0)

      paneFarAfter.size = Math.min(100 - state.dragPercentage - state.paneB.max - sumOfPanesAfter, paneFarAfter.max)
      state.paneA.size = Math.max(state.dragPercentage - state.sumOfPrevPanes, state.paneA.min)
    }
  }
}

// Return the previous pane that has a size of more than 0 starting from the given pane - 1.
const findPrevExpandedPane = paneIndex => {
  // Array of all the panes from the given pane not included, in reverse order.
  const panesBefore = panes.value.slice(0, paneIndex).reverse()
  const pane = panesBefore.find(pane => pane.size > pane.min)
  // Since there is an array slice, return the original pane object with panes.value[pane?.index] so it
  // can be modified directly.
  return panes.value[pane?.index] || null
}

// Return the next pane that has a size of more than 0 starting from the given pane + 1.
const findNextExpandedPane = paneIndex => {
  // Reduce the array of next panes to the pane after the given pane for more efficiency.
  const pane = panes.value.slice(paneIndex + 1).find(pane => pane.size > pane.min)
  // Since there is an array slice, return the original pane object with panes.value[pane?.index] so it
  // can be modified directly.
  return panes.value[pane?.index] || null
}

const checkSplitpanesNodes = () => {
  const children = Array.from(containerEl.value?.children || [])
  children.forEach(child => {
    const isPane = child.classList.contains('splitpanes__pane')
    const isSplitter = child.classList.contains('splitpanes__splitter')

    // Node is not a Pane or a splitter: remove it.
    if (!isPane && !isSplitter) {
      child.remove()
      console.warn('Splitpanes: Only <pane> elements are allowed at the root of <splitpanes>. One of your DOM nodes was removed.')
    }
  })
}

const addSplitter = (paneIndex, nextPaneNode, isVeryFirst = false) => {
  const splitterIndex = paneIndex - 1
  const el = document.createElement('div')
  el.classList.add('splitpanes__splitter')

  if (!isVeryFirst) {
    el.onmousedown = event => onMouseDown(event, splitterIndex)

    if (typeof window !== 'undefined' && 'ontouchstart' in window) {
      el.ontouchstart = event => onMouseDown(event, splitterIndex)
    }
    el.onclick = event => onSplitterClick(event, splitterIndex + 1)
  }

  if (props.dblClickSplitter) {
    el.ondblclick = () => onSplitterDblClick(splitterIndex + 1)
  }

  nextPaneNode.parentNode.insertBefore(el, nextPaneNode)
}

const removeSplitter = node => {
  node.onmousedown = undefined
  node.onclick = undefined
  node.ondblclick = undefined
  node.remove()
}

const redoSplitters = () => {
  const children = Array.from(containerEl.value?.children || [])
  children.forEach(el => {
    if (el.className.includes('splitpanes__splitter')) removeSplitter(el)
  })
  let paneIndex = 0
  children.forEach(el => {
    if (el.className.includes('splitpanes__pane')) {
      if (!paneIndex && props.firstSplitter) addSplitter(paneIndex, el, true)
      else if (paneIndex) addSplitter(paneIndex, el)
      paneIndex++
    }
  })
}

// Called by Pane component on programmatic resize.
const requestUpdate = ({ uid, ...args }) => {
  // console.log('👞', 'requestUpdate')
  const pane = indexedPanes.value[uid]
  Object.entries(args).forEach(([key, value]) => (pane[key] = value))
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

      // 3. Resize the panes.
      resetPaneSizes({ addedPane: panes.value[index] })

      // 4. Fire `pane-add` event.
      emit('pane-add', { index, panes: panes.value.map(pane => ({ min: pane.min, max: pane.max, size: pane.size })) })
    })
  }
}

const onPaneRemove = uid => {
  // 1. Remove the pane from array and redo indexes.
  const index = panes.value.findIndex(p => p.id === uid)
  const removed = panes.value.splice(index, 1)[0]
  panes.value.forEach((p, i) => (p.index = i))

  nextTick(() => {
    // 2. Remove the splitter.
    redoSplitters()

    // 3. Resize the panes.
    resetPaneSizes({ removedPane: { ...removed, index } })

    // 4. Fire `pane-remove` event.
    emit('pane-remove', { removed, panes: panes.value.map(pane => ({ min: pane.min, max: pane.max, size: pane.size })) })
  })
}

const resetPaneSizes = (changedPanes = {}) => {
  if (!changedPanes.addedPane && !changedPanes.removedPane) initialPanesSizing()
  else if (panes.value.some(pane => pane.givenSize !== null || pane.min || pane.max < 100)) equalizeAfterAddOrRemove(changedPanes)
  else equalize()
  if (ready.value) emit('resized', panes.value.map(pane => ({ min: pane.min, max: pane.max, size: pane.size })))
}

const equalize = () => {
  const equalSpace = 100 / panesCount.value
  let leftToAllocate = 0
  const ungrowable = []
  const unshrinkable = []

  panes.value.forEach(pane => {
    pane.size = Math.max(Math.min(equalSpace, pane.max), pane.min)

    leftToAllocate -= pane.size
    if (pane.size >= pane.max) ungrowable.push(pane.id)
    if (pane.size <= pane.min) unshrinkable.push(pane.id)
  })

  if (leftToAllocate > 0.1) readjustSizes(leftToAllocate, ungrowable, unshrinkable)
}

const initialPanesSizing = () => {
  let leftToAllocate = 100
  const ungrowable = []
  const unshrinkable = []
  let definedSizes = 0

  // Check if pre-allocated space is 100%.
  panes.value.forEach(pane => {
    leftToAllocate -= pane.size
    if (pane.givenSize !== null) definedSizes++
    if (pane.size >= pane.max) ungrowable.push(pane.id)
    if (pane.size <= pane.min) unshrinkable.push(pane.id)
  })

  // Set pane sizes if not set.
  let leftToAllocate2 = 100
  if (leftToAllocate > 0.1) {
    panes.value.forEach(pane => {
      if (pane.givenSize === null) {
        pane.size = Math.max(Math.min(leftToAllocate / (panesCount.value - definedSizes), pane.max), pane.min)
      }
      leftToAllocate2 -= pane.size
    })

    if (leftToAllocate2 > 0.1) readjustSizes(leftToAllocate2, ungrowable, unshrinkable)
  }
}

const equalizeAfterAddOrRemove = ({ addedPane, removedPane } = {}) => {
  let equalSpace = 100 / panesCount.value
  let leftToAllocate = 0
  const ungrowable = []
  const unshrinkable = []

  if (addedPane?.givenSize !== null) {
    equalSpace = (100 - addedPane.givenSize) / (panesCount.value - 1).value
  }

  // Check if pre-allocated space is 100%.
  panes.value.forEach(pane => {
    leftToAllocate -= pane.size
    if (pane.size >= pane.max) ungrowable.push(pane.id)
    if (pane.size <= pane.min) unshrinkable.push(pane.id)
  })

  if (Math.abs(leftToAllocate) < 0.1) return // Ok.

  panes.value.forEach(pane => {
    const addedPaneHasGivenSize = addedPane?.givenSize !== null && addedPane?.id === pane.id
    if (!addedPaneHasGivenSize) pane.size = Math.max(Math.min(equalSpace, pane.max), pane.min)

    leftToAllocate -= pane.size
    if (pane.size >= pane.max) ungrowable.push(pane.id)
    if (pane.size <= pane.min) unshrinkable.push(pane.id)
  })

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
      pane.size = Math.max(Math.min(sumOfPrevPanes(sumOfNextPanes(i + 1), pane.max), pane.min)
      // @todo: if could not allocate correctly, try to allocate in the next pane straight away,
      // then still do the second loop if not correct.
    }

    // Removed pane - increase the size of the next pane.
    else if (removedPane && removedPane.index === i) {
      pane.size = Math.max(Math.min(sumOfPrevPanes(sumOfNextPanes(i + 1), pane.max), pane.min)
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
}, */

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
  if (panesCount.value && ~~spaceLeftToDistribute) {.value
    // eslint-disable-next-line no-console
    console.warn('Splitpanes: Could not distribute all the empty space between panes due to their constraints.')
  } *\/

  emit('resized', panes.value.map(pane => ({ min: pane.min, max: pane.max, size: pane.size })))
} */

// Watchers.
// --------------------------------------------------------
watch(() => props.firstSplitter, () => redoSplitters())
watch(() => props.dblClickSplitter, enable => {
  const splitters = [...containerEl.value.querySelectorAll('.splitpanes__splitter')]
  splitters.forEach((splitter, i) => {
    splitter.ondblclick = enable ? () => onSplitterDblClick(i) : undefined
  })
})

// Prevent emitting console warnings on hot reloading.
onBeforeUnmount(() => (ready.value = false))

onMounted(() => {
  checkSplitpanesNodes()
  redoSplitters()
  resetPaneSizes()
  emit('ready')
  ready.value = true
})

const render = () => {
  return h(
    'div',
    {
      ref: containerEl,
      class: [
        'splitpanes',
        `splitpanes--${props.horizontal ? 'horizontal' : 'vertical'}`,
        { 'splitpanes--dragging': touch.value.dragging }
      ]
    },
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
  <pre>{{ touch.dragPercentage }}</pre>
  <component :is="render" v-bind="$attrs"></component>
  <pre>{{ panes.map(pane => ({ size: pane.size, min: pane.min, max: pane.max })) }}</pre>
</template>

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

    .splitpanes--vertical & {transition: width 0.2s ease-out;}
    .splitpanes--horizontal & {transition: height 0.2s ease-out;}
    .splitpanes--dragging & {transition: none;}
  }

  // Disable default zoom behavior on touch device when double tapping splitter.
  &__splitter {touch-action: none;}

  &--vertical > .splitpanes__splitter {min-width: 1px;cursor: col-resize;}
  &--horizontal > .splitpanes__splitter {min-height: 1px;cursor: row-resize;}
}

// Default theme.
// --------------------------------------------------------
.splitpanes.default-theme {
  .splitpanes__pane {background-color: #f2f2f2;}

  .splitpanes__splitter {
    background-color: #fff;
    box-sizing: border-box;
    position: relative;
    flex-shrink: 0;

    &:before,
    &:after {
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
}

.default-theme {
  .splitpanes--dragging {
    user-select: none;
    pointer-events: none;
  }

  &.splitpanes .splitpanes .splitpanes__splitter {z-index: 1;}

  &.splitpanes--vertical > .splitpanes__splitter,
  .splitpanes--vertical > .splitpanes__splitter {
    width: 7px;
    border-left: 1px solid #eee;
    margin-left: -1px;

    &:before,
    &:after {
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
