# Splitpanes v4.1.1 — Bug Fix Report

> Released in **v4.1.1**. All changes are in `src/components/splitpanes/splitpanes.vue` unless noted otherwise.

## Summary

| Issue | Title | Released in |
|-------|-------|-------------|
| [#240](https://github.com/antoniandre/splitpanes/issues/240) / [#243](https://github.com/antoniandre/splitpanes/issues/243) | Crash: Cannot read properties of null/undefined on rapid drag | v4.1.1 |
| [#160](https://github.com/antoniandre/splitpanes/issues/160) / [#201](https://github.com/antoniandre/splitpanes/issues/201) | Pane min-size not enforced when opposite pane reaches its max | v4.1.1 |
| [#215](https://github.com/antoniandre/splitpanes/issues/215) | Last pane with minSize causes visible size jump during push | v4.1.1 |
| [#245](https://github.com/antoniandre/splitpanes/issues/245) | Resize cursor disappears over pane area during drag | v4.1.1 |
| [#246](https://github.com/antoniandre/splitpanes/issues/246) | Pane with `size="0"` renders at equal share instead of 0% | v4.1.1 |
| [#168](https://github.com/antoniandre/splitpanes/issues/168) | Text selection occurs on drag start (Firefox) | v4.1.1 |
| [#242](https://github.com/antoniandre/splitpanes/issues/242) | Initialization transition flash when panes first mount | v4.1.1 |
| [#202](https://github.com/antoniandre/splitpanes/issues/202) | Incorrect/reversed panel order when adding multiple panes at once | v4.1.1 |

---

## #240 / #243 — Crash: Cannot read properties of null/undefined on rapid drag

> Released in **v4.1.1**

**Root cause:** `doPushOtherPanes` has two sequential branches — "pushing down" and "pushing up". When both limits are hit in the same call:
1. The pushing-down branch sets `panesToResize[0] = findPrevExpandedPane().index` → `undefined` (no expandable pane left).
2. The pushing-up branch's own fallback then executes `panes.value[panesToResize[0]].size = ...` with `panesToResize[0]` already `undefined` → crash.

A secondary issue: the `undefined` check for the pushing-down branch ran *after* `sumPrevPanesSize(panesToResize[0])`, so the guard was too late.

A defensive bounds check was also added at the top of `calculatePanesSizeFromDragPercentage` for the case where a `requestAnimationFrame` fires after a pane was removed mid-drag.

**Changes:**
```js
// calculatePanesSizeFromDragPercentage — guard stale rAF after pane removal
if (splitterIndex === null || splitterIndex >= panes.value.length - 1) return

// doPushOtherPanes — move undefined check BEFORE sumPrevPanesSize (pushing-down branch)
if (panesToResize[0] === undefined) { ...return null }
sums.prevPanesSize = sumPrevPanesSize(panesToResize[0])

// doPushOtherPanes — guard panesToResize[0] in the pushing-up fallback block
if (panesToResize[0] !== undefined) {
  panes.value[panesToResize[0]].size = 100 - sums.prevPanesSize - sumNextPanesSize(panesToResize[0] - 1)
}
```

---

## #160 / #201 — Pane min-size not enforced when opposite pane reaches its max

> Released in **v4.1.1**

**Root cause:** In `calculatePanesSizeFromDragPercentage`, when `paneBeforeMaxReached` or `paneAfterMaxReached` is true the function sets the counterpart pane's size using only `Math.max(..., 0)` — it never clamps to the counterpart's `min`. This allows the opposite pane to be dragged below its minimum.

**Changes:**
```js
// Before (line ~240):
paneAfter.size = Math.max(100 - paneBefore.max - sums.prevPanesSize - sums.nextPanesSize, 0)
paneBefore.size = Math.max(100 - paneAfter.max - sums.prevPanesSize - sumNextPanesSize(splitterIndex + 1), 0)

// After:
paneAfter.size = Math.min(Math.max(100 - paneBefore.max - sums.prevPanesSize - sums.nextPanesSize, paneAfter.min), paneAfter.max)
paneBefore.size = Math.min(Math.max(100 - paneAfter.max - sums.prevPanesSize - sumNextPanesSize(splitterIndex + 1), paneBefore.min), paneBefore.max)
```

---

## #215 — Last pane with minSize causes visible size jump during push

> Released in **v4.1.1**

**Root cause:** In `doPushOtherPanes`, the "pushing up" fallback (when `findNextExpandedPane` returns `{}`) enforces min-sizes via a `forEach` that explicitly excluded the last pane with `i < panesCount.value - 1`. `sumNextPanesSize` then picked up the last pane's unclamped size, producing a wrong residual size for the pane adjacent to the splitter — visible as a jump.

**Changes:**
```js
// Before:
if (i < panesCount.value - 1 && i >= splitterIndex + 1) {

// After — include the last pane:
if (i >= splitterIndex + 1) {
```

---

## #245 — Resize cursor disappears over pane area during drag

> Released in **v4.1.1**

**Root cause (regression v4.0.3 → v4.0.4):** The CSS rule `&--dragging .splitpanes__pane, *:has(&--dragging) { pointer-events: none }` added in v4.0.4 causes the browser to ignore the `cursor: col-resize` / `row-resize` on `.splitpanes__splitter` when the mouse moves over a pane. Adding cursor to the container alone doesn't help when the mouse leaves the splitpanes element.

**Changes:**
```js
// onMouseDown — set cursor globally at drag start:
document.documentElement.style.cursor = props.horizontal ? 'row-resize' : 'col-resize'

// onMouseUp setTimeout callback — restore after drag ends:
document.documentElement.style.cursor = ''
```

---

## #246 — Pane with `size="0"` renders at its equal share instead of 0%

> Released in **v4.1.1**

**Root cause:** In `equalizeAfterAddOrRemove`, the guard that prevents overwriting a pane's size during re-equalization only protected the *newly added* pane — not pre-existing panes that also have an explicit `givenSize`. When any other pane is added, all panes with explicit sizes (including one with `size="0"`) were overwritten to `equalSpace`. Additionally, `equalSpace` was computed over all panes including those with a fixed size, producing the wrong distribution.

**Changes in `equalizeAfterAddOrRemove`:**
```js
// Before — only protected addedPane, equalSpace divided total count:
const addedPaneHasGivenSize = addedPane != null && addedPane.givenSize !== null && addedPane.id === pane.id
if (!addedPaneHasGivenSize) pane.size = Math.max(Math.min(equalSpace, pane.max), pane.min)

// After — protect all panes with a givenSize, equalSpace only over free panes:
const totalGivenSize = panes.value.reduce((sum, p) => sum + (p.givenSize !== null ? p.givenSize : 0), 0)
const freeCount = panes.value.filter(p => p.givenSize === null).length
let equalSpace = freeCount > 0 ? (100 - totalGivenSize) / freeCount : 0
// ...
if (pane.givenSize === null) pane.size = Math.max(Math.min(equalSpace, pane.max), pane.min)
```

---

## #168 — Text selection occurs on drag start (Firefox)

> Released in **v4.1.1**

**Root cause:** `window.getSelection()?.removeAllRanges()` was only called in `onMouseUp`. On the very first `mousemove` frame, before the `dragging` flag was set to `true`, the browser could create a text selection inside a pane.

**Changes in `onMouseMove`:**
```js
// Before:
touch.value.dragging = true

// After — clear selection on the first drag frame only:
if (!touch.value.dragging) {
  window.getSelection()?.removeAllRanges()
  touch.value.dragging = true
}
```

---

## #242 — Initialization transition flash when panes first mount

> Released in **v4.1.1**

**Root cause:** The SCSS applied `transition: width 0.2s ease-out` to all panes unconditionally. On mount, panes start at 0% and animate to their calculated size, causing a visible flash.

**Changes:**
```js
// splitpanesClasses computed — add ready flag:
'splitpanes--ready': ready.value

// SCSS — gate transitions on .splitpanes--ready:
// Before:
.splitpanes--vertical & { transition: width 0.2s ease-out; }
.splitpanes--horizontal & { transition: height 0.2s ease-out; }

// After:
.splitpanes--ready.splitpanes--vertical & { transition: width 0.2s ease-out; }
.splitpanes--ready.splitpanes--horizontal & { transition: height 0.2s ease-out; }
```

---

## #202 — Incorrect/reversed panel order when adding multiple panes at once

> Released in **v4.1.1**

**Root cause:** `onPaneAdd` queued a `nextTick` callback for every individual pane addition. When N panes mounted in the same tick (e.g. `v-for` or simultaneous `v-if` toggles), N callbacks were queued and each re-ran `redoSplitters` + `resetPaneSizes`, overwriting the state set by the previous callback and producing wrong or reversed order.

**Changes in `onPaneAdd`:**
```js
// Added a pendingPaneAdd flag to coalesce multiple simultaneous additions:
let pendingPaneAdd = false
const onPaneAdd = pane => {
  // ...existing index + splice logic...
  if (ready.value && !pendingPaneAdd) {
    pendingPaneAdd = true
    nextTick(() => {
      redoSplitters()
      resetPaneSizes({ addedPane: panes.value[index] })
      emitEvent('pane-add', { pane: panes.value[index] })
      pendingPaneAdd = false
    })
  }
}
```
