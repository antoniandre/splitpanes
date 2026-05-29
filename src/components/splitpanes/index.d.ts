import type { DefineComponent } from 'vue'

// ---- Core types ----

export interface PaneData {
  min: number
  max: number
  size: number
}

export interface Pane {
  id: number
  el: HTMLElement | null
  min: number
  max: number
  givenSize: number | null
  size: number
  index: number
}

// ---- Event payloads ----

export interface SplitpanesReadyPayload {
  panes: PaneData[]
}

export interface SplitpanesResizePayload {
  event: MouseEvent | TouchEvent
  index: number
  prevPane: Pane | undefined
  nextPane: Pane | undefined
  panes: PaneData[]
}

// resized fires both during splitter drag-end AND after pane add/remove —
// in the latter cases event/index/prevPane/nextPane are absent.
export interface SplitpanesResizedPayload {
  event?: MouseEvent | TouchEvent
  index?: number
  prevPane?: Pane
  nextPane?: Pane
  panes: PaneData[]
}

export interface SplitpanesPaneClickPayload {
  event: MouseEvent | TouchEvent
  index: number
  pane: Pane
  panes: PaneData[]
}

export interface SplitpanesPaneMaximizePayload {
  event: MouseEvent | TouchEvent
  index: number
  pane: Pane
  panes: PaneData[]
}

export interface SplitpanesPaneAddPayload {
  pane: Pane
  panes: PaneData[]
}

export interface SplitpanesPaneRemovePayload {
  pane: Pane
  panes: PaneData[]
}

export interface SplitpanesSplitterClickPayload {
  event: MouseEvent | TouchEvent
  index: number
  prevPane: Pane | undefined
  nextPane: Pane | undefined
  panes: PaneData[]
}

export interface SplitpanesDirectionChangedPayload {
  horizontal: boolean
  panes: PaneData[]
}

// ---- Component props ----

export interface SplitpanesProps {
  horizontal?: boolean
  pushOtherPanes?: boolean
  maximizePanes?: boolean
  rtl?: boolean
  firstSplitter?: boolean
  keyboardStep?: number
}

export interface PaneProps {
  size?: number | string
  minSize?: number | string
  maxSize?: number | string
}

// ---- Components ----

export declare const Splitpanes: DefineComponent<
  SplitpanesProps,
  {},
  {},
  {},
  {},
  {},
  {},
  {
    ready: (payload: SplitpanesReadyPayload) => void
    resize: (payload: SplitpanesResizePayload) => void
    resized: (payload: SplitpanesResizedPayload) => void
    'pane-click': (payload: SplitpanesPaneClickPayload) => void
    'pane-maximize': (payload: SplitpanesPaneMaximizePayload) => void
    'pane-add': (payload: SplitpanesPaneAddPayload) => void
    'pane-remove': (payload: SplitpanesPaneRemovePayload) => void
    'splitter-click': (payload: SplitpanesSplitterClickPayload) => void
    'splitter-dblclick': (payload: SplitpanesSplitterClickPayload) => void
    'direction-changed': (payload: SplitpanesDirectionChangedPayload) => void
  }
>

export declare const Pane: DefineComponent<PaneProps>
