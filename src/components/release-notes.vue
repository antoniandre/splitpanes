<template lang="pug">
.release-notes
  h2.mt12.pt12.mb6(id="release-notes")
    a(href="#release-notes") Release Notes

  ul.history.ml2
    li.patch
      strong.version 4.1.1
      ul
        li Fixed crash (Cannot read properties of null/undefined) when dragging a splitter quickly to its limit. (#240, #243)
        li Fixed pane min-size not enforced when the opposite pane reaches its max. (#160, #201)
        li Fixed last pane with #[code min-size] causing a visible size jump when pushed to its limit. (#215)
        li Fixed resize cursor disappearing over pane area during drag. (#245)
        li Fixed pane with explicit #[code size="0"] being overridden by auto-equalization when other panes are added. (#246)
        li Fixed text selection occurring on the first drag frame in Firefox. (#168)
        li Fixed initialization transition flash when panes first mount. (#242)
        li Fixed incorrect panel order when multiple panes are added in the same tick. (#202)
        li Fixed transition while maximizing panes in nested splitpanes.

    li.minor
      strong.version 4.1.0
      ul
        li Added keyboard accessibility: splitters are now focusable and can be resized with arrow keys.
        li New #[code keyboard-step] prop (default #[code 5]) to control the % step per key press. Set to #[code 0] to disable.
        li Respects all existing constraints: #[code min], #[code max], #[code push-other-panes], and #[code rtl].
        li Fires the same #[code resize] and #[code resized] events as mouse dragging.
        li Splitters get #[code role="separator"] and #[code aria-orientation] ARIA attributes automatically.
        li Default theme shows a #[code focus-visible] ring for keyboard-only users.

    li.patch
      strong.version 4.0.5
      ul
        li Added TypeScript definitions. (#247)
        li Fixed #237.
        li Fixed null pointer error when dragging a splitter to its min/max limit, along with other added safeguards. (#255)
        li Fix fallthrough attributes (e.g. #[code id], #[code class]) not being applied to the root element. (#252)

    li.major
      strong.version 4.0.0
      ul
        li Emit #[code splitter-dblclick] on splitter dblclick event. (#120, #181, #182, #183)
        li Renamed #[code dblClickSplitter] to #[code maximizePanes], still on by default on splitter double click.
        li.
          Refactored all emitted events to always return a single object containing as much
          information as possible. E.g. event, index, pane, prevPane, nextPane, panes.

    li.minor
      strong.version 3.2.0
      ul
        li Account for cursor position when dragging a splitter. (#204)
        li Components fully rewritten with Composition API. Faster and more efficient resizing.

    li.major
      strong.version 3.0.0
      p For Vue 3 projects.
      highlight-message(type="warning").
        Installing the latest splitpanes on a Vue 2 project will break it.#[br]
        For Vue 2, install splitpanes from the #[code legacy] tag: #[code npm i splitpanes@legacy].

    li.patch.mb-5.view-more
      .w-flex.align-center
        .w-divider.primary--bg.px3
        w-button(round outline @click="seeOldReleaseNotes = !seeOldReleaseNotes")
          strong {{ seeOldReleaseNotes ? 'Hide' : 'View' }} older release notes
          w-icon.ml2(:rotate90a="!seeOldReleaseNotes") wi-arrow-down
        .w-divider.primary--bg.grow

w-transition-expand(y)
  ul.history.history--more.ml11.mt12(v-if="seeOldReleaseNotes")
    li.patch
      strong.version 2.3.5
      p Prevent splitter double taps on touch devices if #[code dblClickSplitter] is set to false.

    li.patch
      strong.version 2.3.4
      p Fix removing pane DOM nodes in IE11.

    li.patch
      strong.version 2.3.1
      p Fix firing #[code pane-click] event on pane click.

    li.minor
      strong.version 2.3.0
      p Support RTL direction.

    li.minor
      strong.version 2.2.0
      ul
        li Added the #[code firstSplitter] option, disabled by default. ref: #[a(href="#change-direction") Change direction &amp; first splitter]
        li Adapt panes width and height after direction change.
        li Emit a #[code resized] event after pane was added/removed.
        li Emit a #[code pane-add] event after pane was added.
        li Emit a #[code pane-remove] event after pane was removed.
        li Support #[code v-if] on a Pane and allow inserting a Pane at any position. ref: #[a(href="#toggle-a-pane-with-v-if") Toggle a pane with v-if]

    li.major
      strong.version 2.0.0
      p Fix reactivity issues.
      highlight-message(type="success")
        ul.mt1
          li
            strong Children must now be wrapped into a #[code pane] component.
          li The attribute #[code splitpanes-size] is now replaced with #[code size] on the #[code pane] component.
          li You can still add CSS classes on the #[code pane] component tag.

    li.minor #[strong.version 1.14.0] Programmatically set pane size.
    li.minor #[strong.version 1.13.0] Emit event on splitter click.
    li.minor #[strong.version 1.12.0] Double click splitter to maximize is now an option.
    li.minor #[strong.version 1.11.0] Persist panes size after slots changed.
    li.minor #[strong.version 1.10.0] Add maximum size feature on panes.
    li.minor
      strong.version 1.9.0
      p Emit event on resize &amp; watch slots optional.
      highlight-message(type="success")
        ul.mt0
          li.
            The #[code resize] event — previously firing after resize end — now fires on resize.#[br]
            A new #[code resized] event is emitted on resize end. Check out the
            #[a(href="#emitted-events") Listening to emitted events] example.
          li.
            By default and for performance, reactivity is now limited to slot deletion and creation.#[br]
            With the option #[code watchSlots] you can also track any change on the slots.
    li.minor #[strong.version 1.8.0] Watch slots.
    li.minor #[strong.version 1.7.0] Double click splitter to maximize next pane.
    li.minor #[strong.version 1.6.0] Emit events.
    li.minor #[strong.version 1.5.0] Add default size feature on panes.
    li.minor #[strong.version 1.4.0] Add minimum size feature on panes.
    li.minor #[strong.version 1.3.0] Splitpanes slots are now reactive (add/remove on the fly).
    li.minor #[strong.version 1.2.0] Add a #[code default-theme] CSS class to load default theme.
    li.minor #[strong.version 1.1.0] Allow pushing other panes while dragging splitter.
    li.major #[strong.version 1.0.0] First public release.
</template>

<script setup>
import { ref } from 'vue'
import HighlightMessage from '@/components/highlight-message.vue'

const seeOldReleaseNotes = ref(false)
</script>

<style lang="scss">
.release-notes {
  .history {
    > li {padding-left: 24px;}
    > li + li {margin-top: 28px;}

    li {
      position: relative;
      list-style-type: none;
    }
    h2 {margin-top: 0;}
    .view-more > div {bottom: 2px;position: relative;}

    // Bullet.
    > li:before {
      content: '';
      position: absolute;
      top: 11px;
      left: 0;
      background-color: var(--w-base-bg-color);
      border-radius: 99em;
      border: 1px solid currentColor;
      width: 1em;
      aspect-ratio: 1;
      transform: translate(-50%, -50%);
      z-index: 1;
    }

    &.history--more > li:first-child:before {display: none;}

    // Left border.
    > li:after {
      content: '';
      position: absolute;
      top: 11px;
      bottom: -39px; // 11px top + 28px margin between each li.
      left: -0.5px;
      border-left: 1px solid var(--w-base-color);
      opacity: 0.25;
    }

    > li:last-child:after {display: none;}
    > li.dashed:after {border-left-style: dashed;}
    > li.patch:before {
      font-size: 7px;
      border-style: dashed;
      width: 1.1rem;
      animation: rn-spin 10s linear infinite;
    }
    > li.minor:before {
      font-size: 11px;
      width: 1.1rem;
      animation: rn-pulse 3s ease-in-out infinite;
    }
    > li.major:before {
      font-size: 14px;
      box-shadow: 0 0 0 0 var(--w-primary-color);
      border-color: var(--w-primary-color);
      animation: rn-pulse-sonar 3s infinite cubic-bezier(0.25, 0.46, 0.45, 0.94);
    }

    .version {
      font: bold 1.2rem monospace;
      display: block;
    }

    > li.patch:before,
    > li.patch .version {color: color-mix(in srgb, var(--w-base-color) 40%, transparent);}
    > li.minor:before,
    > li.minor .version {color: color-mix(in srgb, var(--w-base-color) 60%, transparent);}
    > li.major:before,
    > li.major .version {
      color: var(--w-primary-color);
      font-size: 1.4rem;
    }

    ul {margin-left: -2px;}

    li li {
      padding-left: 20px;
      margin-top: 2px;
    }

    // Bullet.
    li li:before {
      content: '\e002';
      font-family: "wave-ui" !important;
      font-style: normal !important;
      font-weight: normal !important;
      font-variant: normal !important;
      text-transform: none !important;
      line-height: 1;
      -webkit-font-smoothing: antialiased;
      position: absolute;
      top: 3px;
      left: 0;
      width: 1em;
      aspect-ratio: 1;
    }

    li li li:before {content: '\e007';}

    p {
      margin: 0.2em 0 0;
      line-height: 1.2;
    }

    code {padding: 0 4px;}
  }

  @keyframes rn-spin {
    from {transform: translate(-50%, -50%) rotate(0deg);}
    to {transform: translate(-50%, -50%) rotate(360deg);}
  }
  @keyframes rn-pulse {
    0% {transform: translate(-50%, -50%) scale(1);}
    50% {transform: translate(-50%, -50%) scale(1.1);}
    100% {transform: translate(-50%, -50%) scale(1);}
  }
  @keyframes rn-pulse-sonar {
    0% {
      box-shadow: 0 0 0 0 var(--w-primary-color);
      transform: translate(-50%, -50%) scale(1);
      border-color: var(--w-primary-color);
      opacity: 0.5;
    }
    50% {
      box-shadow: 0 0 0 15px rgba(9, 204, 204, 0);
      transform: translate(-50%, -50%) scale(1.05);
      border-color: var(--w-primary-color);
    }
    100% {
      box-shadow: 0 0 0 0 rgba(9, 204, 204, 0);
      transform: translate(-50%, -50%) scale(1);
      border-color: var(--w-primary-color);
    }
  }
}
</style>
