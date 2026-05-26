<template lang="pug">
div
  h2.mt12.pt12.mb2(id="release-notes")
    a(href="#release-notes") Release Notes

  .mt6
    strong.title2 Version 4.0.0
    ul.mt1
      li Emit #[code splitter-dblclick] on splitter dblclick event. (#120, #181, #182, #183)
      li Renamed #[code dblClickSplitter] to #[code maximizePanes], and still on by default on splitter double click.
      li.
        Refactored all the emitted events to always return a single object containing as much information
        as possible. E.g. event, index, pane, prevPane, nextPane, panes.

  .mt4
    strong Version 3.2.0
    ul.mt1
      li Account for cursor position when dragging a splitter. (#204)
      li Components fully rewritten with Composition API. Faster and more efficient resizing.
  .mt6
    | #[strong.title2.mr2 Version 3.0.0] For Vue 3 projects.
    highlight-message(type="warning").
      Installing the latest splitpanes on a Vue 2 project will break it.#[br]
      For Vue 2, you need to install splitpanes from the #[span.code legacy] tag: #[code npm i splitpanes@legacy].#[br]
  div #[strong Version 2.3.5] Prevent splitter double taps on touch devices if #[span.code `dblClickSplitter`] is set to false.
  div #[strong Version 2.3.4] Fix removing pane DOM nodes in IE11
  div #[strong Version 2.3.1] Fix firing #[span.code `pane-click`] event on pane click
  div #[strong Version 2.3.0] Support rtl direction
  div #[strong Version 2.2.0]
    ul
      li Added the #[span.code `firstSplitter`] option, disabled by default. ref: #[a(href="#change-direction") Change direction &amp; first splitter]
      li Adapt panes width and height after direction change. ref: #[a(href="#change-direction") Change direction &amp; first splitter]
      li Emit a #[span.code `resized`] event after pane was added/removed
      li Emit a #[span.code `pane-add`] event after pane was added
      li Emit a #[span.code `pane-remove`] event after pane was removed
      li Support #[span.code `v-if`] on a Pane and allow inserting a Pane at any position between others. ref: #[a(href="#toggle-a-pane-with-v-if") Toggle a pane with v-if]

  .mt6
    | #[strong.title2.mr2 Version 2.0.0] Fix reactivity issues.
    highlight-message(type="success")
      ul.mt1
        li
          strong.
            Children must now be wrapped into a #[span.code `pane`] component.
        li The attribute #[span.code `splitpanes-size`] is now replaced with #[span.code `size`] on the #[span.code `pane`] component.
        li you can still add CSS classes on the #[span.code `pane`] component tag.

  div #[strong Version 1.14.0] Programmatically set pane size
  div #[strong Version 1.13.0] Emit event on splitter click
  div #[strong Version 1.12.0] double click splitter to maximize is now an option
  div #[strong Version 1.11.0] Persist panes size after slots changed
  div #[strong Version 1.10.0] Add maximum size feature on panes
  div
    | #[strong Version 1.9.0] Emit event on resize &amp; watch slots optional
    highlight-message.text-bold(type="success")
      ul.mt0
        li.
          The #[span.code `resize`] event - previously firing after resize end - is now firing on resize.#[br]
          A new #[span.code `resized`] event is emitted on resize end. Check out the
          #[a(href="#emitted-events") Listening to emitted events] example.
        li.
          By default and for performance, the reactivity is now limited to slot deletion and slot creation.#[br]
          With the option #[span.code `watchSlots`] you can also track any change on the slots.#[br]
  div #[strong Version 1.8.0] Watch slots
  div #[strong Version 1.7.0] Double click splitter to maximize next pane
  div #[strong Version 1.6.0] Emit events
  div #[strong Version 1.5.0] Add default size feature on panes
  div #[strong Version 1.4.0] Add minimum size feature on panes
  div #[strong Version 1.3.0] Splitpanes slots are now reactive (add/remove on the fly)
  div #[strong Version 1.2.0] Add a `default-theme` CSS class to load default theme
  div #[strong Version 1.1.0] Allow pushing other panes while dragging splitter
  div #[strong Version 1.0.0] First public release
</template>

<script setup>
import HighlightMessage from '@/components/highlight-message.vue'
</script>
