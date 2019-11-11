<template lang="pug">
  v-app.white
    v-container
      div.text-center
        img(alt="Vue logo" src="./assets/logo.png" height="40")
        h1.mb-3.headline Vue Split Panes
        p.mb-12.subtitle-1 A Vue JS reliable, simple and touch-ready panes splitter / resizer.
        highlight-message(type="success" no-icon).subtitle-1.pa-8 #[strong Version 2 is out], Check the #[a(href="#release-notes") Release Notes]!

      v-layout
        v-flex
          h2.mt-12.mb-2.title Features
          ul.checklist
            li
              v-icon.mr-2(color="primary" size="20") check
              | Nesting supported
            li
              v-icon.mr-2(color="primary" size="20") check
              | Light weight &amp; no dependencies other than Vue JS
            li
              v-icon.mr-2(color="primary" size="20") check
              | Responsive
            li
              v-icon.mr-2(color="primary" size="20") check
              | Support for touch devices
            li
              v-icon.mr-2(color="primary" size="20") check
              | Push other panes or not
            li
              v-icon.mr-2(color="primary" size="20") check
              | Double click a splitter to maximize pane
            li
              v-icon.mr-2(color="primary" size="20") check
              | Programmatically set pane width or height
            li
              v-icon.mr-2(color="primary" size="20") check
              | Adding panes on the fly automatically adds splitters
            li
              v-icon.mr-2(color="primary" size="20") check
              | Simple yet efficient
            li
              v-icon.mr-2(color="primary" size="20") check
              | More features to come, like pane labels.

        div
          div.mt-12.mb-3.title Github project
          v-layout.mb-12(align-center shrink)
            v-icon.pr-8.lightgrey--text(x-large) fab fa-github
            a(href="https://github.com/antoniandre/splitpanes" target="_blank") //github.com/antoniandre/splitpanes #[v-icon(small color="primary") open_in_new]

      h2.mt-12.mb-2.subtitle-1
        | # Demo - try it yourself:
        a.ml-2.d-inline-flex.align-center(href="https://codepen.io/antoniandre/pen/XybPKP" target="_blank") //codepen.io/antoniandre/pen/XybPKP
          v-icon(small color="primary") open_in_new

      splitpanes.default-theme.example.example1(style="height: 400px")
        pane(min-size="20")
          span 1#[br]#[em.specs I have a min width of 20%]
        pane
          splitpanes.default-theme.example(horizontal)
            pane
              span 2
            pane
              span 3
            pane
              span 4
        pane
          span 5

      ssh-pre(language="html-vue" label="HTML Vue Template").
        &lt;splitpanes style="height: 400px"&gt;
          &lt;pane min-size="20"&gt;
            &lt;span&gt;1&lt;/span&gt;
          &lt;/pane&gt;
          &lt;pane&gt;
            &lt;splitpanes horizontal&gt;
              &lt;pane&gt;
                &lt;span&gt;2&lt;/span&gt;
              &lt;/pane&gt;
              &lt;pane&gt;
                &lt;span&gt;3&lt;/span&gt;
              &lt;/pane&gt;
              &lt;pane&gt;
                &lt;span&gt;4&lt;/span&gt;
              &lt;pane&gt;
            &lt;/splitpanes&gt;
          &lt;/pane&gt;
          &lt;pane&gt;
            &lt;span&gt;5&lt;/span&gt;
          &lt;/pane&gt;
        &lt;/splitpanes&gt;
      ssh-pre(language="css" label="CSS").
        .splitpanes__pane {
          justify-content: center;
          align-items: center;
          display: flex;
        }

        .splitpanes__pane span {
          font-family: Helvetica, Arial, sans-serif;
          color: #fff;
          font-size: 5em;
          opacity: 0.6;
        }

      h2.mt-12.mb-2.headline
        a(href="#installation") Installation
        a(name="installation")

      p You have two options: #[em NPM] #[strong.mx-2 or] #[span.code &lt;script&gt;] tag.
      h3 Via NPM
      ssh-pre(language="shell" label="Shell") npm i --S splitpanes
      p Then import the component and CSS:
      ssh-pre(language="js" label="Javascript").
        // In your VueJS component.
        import { Splitpanes, Pane } from 'splitpanes'
        import 'splitpanes/dist/splitpanes.css'

        export default {
          components: { Splitpanes, Pane },
          ...
        }

      h3 Via #[span.code &lt;script&gt;] tag
      p Include the Splitpanes script in your document #[span.code &lt;head&gt;] as follows:
      ssh-pre(language="html" label="HTML").
        &lt;head&gt;
          ...
          &lt;script src="https://unpkg.com/vue"&gt;&lt;/script&gt;
          &lt;script src="https://unpkg.com/splitpanes"&gt;&lt;/script&gt;
          &lt;link href="https://unpkg.com/splitpanes/dist/splitpanes.css" rel="stylesheet"&gt;
        &lt;/head&gt;

      h2.mt-12.mb-2
        a.headline(href="#how-to-use") How to use
        a(name="how-to-use")

      p.
        Once included in your project, use as follows.

      ssh-pre(language="html-vue" label="HTML Vue Template").
        &lt;splitpanes class="default-theme"&gt;
          &lt;pane v-for="i in 3" :key="i"&gt;
            &lt;div&gt;{{ '\{\{ i \}\}' }}&lt;/div&gt;
          &lt;/pane&gt;
        &lt;/splitpanes&gt;

      highlight-message(type="success")
        strong.
          Have you noticed? No splitter tags!#[br]
        span.
          The splitters will be added automatically between the #[span.code &lt;pane&gt;] tags.

      highlight-message(type="tips").
        By default the layout is 'column' (vertical), if you need you can set the attribute
        #[span.code horizontal] on the #[span.code &lt;splitpanes&gt;] tag to change the layout to rows.

      highlight-message(type="tips").
        The CSS is external so you can easily override or choose not to include it at all.#[br]
        If you want to use it, you can also optionally use the CSS class #[span.code default-theme]
        at the root of your splitpanes to apply the default theme like on this page.#[br]
        If you want to go with your own style, you can check the #[a(href="#do-your-own-style") Do Your Own Style example].

      //- Examples.
      //-------------------------------------------------------//
      h2.mt-12.mb-2.headline
        a(href="#more-examples") More examples
        a(name="more-examples")

      //- Example.
      h3.mb-2.subtitle-1
        a(href="#horizontal-layout") # Horizontal layout, push other panes, min &amp; max use
        a(name="horizontal-layout")
      p You can also double click a splitter to maximize the next pane! (First pane splitter will be an option soon)
      p If you want to disable the 'double click splitter to maximize' behavior, you can add this attribute: #[span.code :dbl-click-splitter="false"].
      splitpanes.default-theme.example(horizontal style="height: 400px")
        pane(min-size="20", max-size="70")
          span 1#[br]#[em.specs I have a min height of 20% &amp; max height of 70%]
        pane
          span 2
        pane(max-size="70")
          span 3#[br]#[em.specs I have a max height of 70%]

      ssh-pre(language="html-vue" label="HTML").
        &lt;splitpanes class="default-theme" horizontal style="height: 400px"&gt;
          &lt;pane min-size="20" max-size="70"&gt;
            &lt;span&gt;1&lt;/span&gt;
          &lt;/pane&gt;
          &lt;pane&gt;
            &lt;span&gt;2&lt;/span&gt;
          &lt;/pane&gt;
          &lt;pane max-size="70"&gt;
            &lt;span&gt;3&lt;/span&gt;
          &lt;/pane&gt;
        &lt;/splitpanes&gt;

      //- Example.
      h3.mt-12.pt-8.mb-2.subtitle-1
        a(href="#default-pane-width") # Default pane width or height
        a(name="default-pane-width")
      p
        | Provide dimension of your panes when they first load (will be used for the width or height respectively for the vertical or horizontal layout).#[br]
        strong.
          If you provide a default width or height, make sure you provide it for all the panes and the total equals 100%.#[br]
          If a pane is missing a default width or height, then all the panes will have the same width or height.#[br]
        | Note that setting a default value is different than setting a min or max value.

      splitpanes.default-theme.example(horizontal style="height: 400px")
        pane(size="65")
          span 1
        pane(size="10")
          span 2
        pane(size="25")
          span 3

      ssh-pre(language="html-vue" label="HTML").
        &lt;splitpanes class="default-theme" horizontal style="height: 400px"&gt;
          &lt;pane size="65"&gt;
            &lt;span&gt;1&lt;/span&gt;
          &lt;/pane&gt;
          &lt;pane size="10"&gt;
            &lt;span&gt;2&lt;/span&gt;
          &lt;/pane&gt;
          &lt;pane size="25"&gt;
            &lt;span&gt;3&lt;/span&gt;
          &lt;/pane&gt;
        &lt;/splitpanes&gt;

      //- Example.
      h3.mt-12.pt-8.mb-2.subtitle-1
        a(href="#nested-splitpanes") # Mix layout with nested splitpanes &amp; prevent pushing other panes
        a(name="nested-splitpanes")
      p
        | try it yourself:
        a(href="https://codepen.io/antoniandre/pen/PypgKY" target="_blank" class="ml-2") //codepen.io/antoniandre/pen/PypgKY #[v-icon(small color="primary") open_in_new]
      splitpanes.default-theme.example(horizontal :push-other-panes="false" style="height: 400px")
        pane
          span 1
        pane
          splitpanes(:push-other-panes="false")
            pane
              span 2
            pane
              span 3
            pane
              span 4
        pane
          span 5

      ssh-pre(language="html-vue" label="HTML").
        &lt;splitpanes class="default-theme" horizontal :push-other-panes="false" style="height: 400px"&gt;
          &lt;pane&gt;
            &lt;span&gt;1&lt;/span&gt;
          &lt;/pane&gt;
          &lt;pane&gt;
            &lt;splitpanes :push-other-panes="false"&gt;
              &lt;pane&gt;
                &lt;span&gt;2&lt;/span&gt;
              &lt;/pane&gt;
              &lt;pane&gt;
                &lt;span&gt;3&lt;/span&gt;
              &lt;/pane&gt;
              &lt;pane&gt;
                &lt;span&gt;4&lt;/span&gt;
              &lt;/pane&gt;
            &lt;/splitpanes&gt;
          &lt;/pane&gt;
          &lt;pane&gt;
            &lt;span&gt;5&lt;/span&gt;
          &lt;/pane&gt;
        &lt;/splitpanes&gt;

      //- Example.
      h3.mt-12.pt-8.mb-2.subtitle-1
        a(href="#lots-of-splitters") # Lots of splitters &amp; push other panes - all panes have a min width of 5%
        a(name="lots-of-splitters")
      splitpanes.default-theme.example(style="height: 400px")
        pane(v-for="i in 8" :key="i" :min-size="5")
          span {{ i }}

      ssh-pre(language="html-vue" label="HTML").
        &lt;splitpanes class="default-theme" style="height: 400px"&gt;
          &lt;pane v-for="i in 8" :key="i" min-size="5"&gt;
            &lt;span&gt;{{ '\{\{ i \}\}' }}&lt;/span&gt;
          &lt;/pane&gt;
        &lt;/splitpanes&gt;

      //- Example.
      h3.mt-12.pt-8.mb-2.subtitle-1
        a(href="#adding-splitters-on-the-fly") # Adding splitters on the fly
        a(name="adding-splitters-on-the-fly")
      p
        | This example shows the reactivity when you add a new element dynamically in splitpanes.
        v-btn.ml-2(color="primary" small @click="panesNumber++")
          v-icon.mr-1 add
          | Add pane

      splitpanes.default-theme.example(style="height: 400px")
        pane(v-for="i in panesNumber" :key="i")
          span {{ i }}

      ssh-pre(language="html-vue" label="HTML").
        &lt;button @click="panesNumber++"&gt;Add pane&lt;/button&gt;

        &lt;splitpanes class="default-theme" style="height: 400px"&gt;
          &lt;pane v-for="i in panesNumber" :key="i"&gt;
            &lt;span&gt;{{ '\{\{ i \}\}' }}&lt;/span&gt;
          &lt;/pane&gt;
        &lt;/splitpanes&gt;

      ssh-pre(language="js" label="Javascript").
        // In your Vue component.
        data: () =&gt; ({
          panesNumber: 3
        })

      //- Example.
      h3.mt-12.pt-8.mb-2.subtitle-1
        a(href="#programmatic-resizing") # Programmatic resizing
        a(name="programmatic-resizing")
      p.mb-6 This example shows the programmatic way of resizing panes. And how it works both ways.
      v-slider(v-model="paneSize" label="First pane size" thumb-label="always" thumb-size="25" :min="0" :max="100")
      splitpanes.default-theme.example(@resize="paneSize = $event[0].size" style="height: 400px")
        pane(:size="paneSize")
          span {{ paneSize }}%
        pane(:size="100 - paneSize")
          span {{ 100 - paneSize }}%

      ssh-pre(language="html-vue" label="HTML").
        &lt;v-slider v-model="paneSize" label="First pane size" :min="0" :max="100"&gt;
        &lt;splitpanes class="default-theme" @resize="paneSize = $event[0].size" style="height: 400px"&gt;
          &lt;pane :size="paneSize"&gt;
            &lt;span&gt;{{ '\{\{ paneSize \}\}' }}%&lt;/span&gt;
          &lt;/pane&gt;
          &lt;pane :size="100 - paneSize"&gt;
            &lt;span&gt;{{ '\{\{ 100 - paneSize \}\}' }}%&lt;/span&gt;
          &lt;/pane&gt;
        &lt;/splitpanes&gt;

      ssh-pre(language="js" label="Javascript").
        // In your Vue component.
        data: () => ({
          paneSize: 50
        }),
        }

      //- Example.
      h3.mt-12.pt-8.mb-2.subtitle-1
        a(href="#in-depth-reactivity") # In-depth reactivity
        a(name="in-depth-reactivity")
      p
        | This example shows the reactivity when you modify anything in your component inside splitpanes.#[br]
        v-btn.mt-2.mr-2(color="primary" small @click="generateRandomNumber")
          v-icon.mr-1(size="20") sync
          | Generate 3 random numbers
        v-btn.mt-2(color="primary" small @click="incrementNumber(3)")
          v-icon.mr-1(size="20") add
          | Increment pane #3
      splitpanes.default-theme.example(style="height: 400px" horizontal)
        pane
          splitpanes
            pane.layout.column.text-center(v-for="i in 3" :key="i")
              span {{ i }}#[br]
              em Number is: {{ randomNums[i] }}#[br]
              em(v-if="i === 2").
                Number on the left is: {{ randomNums[1] }}#[br]
                Number on the right is: {{ randomNums[3] }}#[br]
              v-btn.align-center(v-if="i !== 2" small color="primary" @click="randomNums[i] = randomNums[i] + 1" style="min-width: 0")
                v-icon(size="20") add
                | 1
        pane.layout.column.text-center
          span 4#[br]
          em.
            - Nested splitpanes -#[br]
            [{{ randomNums[1] }}, {{ randomNums[2] }}, {{ randomNums[3] }}]

      ssh-pre(language="html-vue" label="HTML").
        &lt;button @click="generateRandomNumber"&gt;Generate 3 random numbers&lt;/button&gt;
        &lt;button @click="incrementNumber(3)"&gt;Increment pane #3&lt;/button&gt;

        &lt;splitpanes horizontal class="default-theme" style="height: 400px"&gt;
          &lt;pane&gt;
            &lt;splitpanes&gt;
              &lt;pane v-for="i in 3" :key="i"&gt;
                &lt;span&gt;{{ '\{\{ i \}\}' }}&lt;/span&gt;&lt;br&gt;
                &lt;em&gt;Number is: {{ '\{\{ randomNums[i] \}\}' }}&lt;/em&gt;&lt;br&gt;
                &lt;em v-if="i === 2"&gt;
                  Number on the left is: {{ '\{\{ randomNums[1] \}\}' }}&lt;br&gt;
                  Number on the right is: {{ '\{\{ randomNums[3] \}\}' }}&lt;br&gt;
                &lt;/em&gt;
                &lt;button(v-if="i !== 2" @click="randomNums[i] = randomNums[i] + 1"&gt;+1&lt;/button&gt;
              &lt;/pane&gt;
            &lt;/splitpanes&gt;
          &lt;/pane&gt;
          &lt;pane&gt;
            &lt;span&gt;4&lt;/span&gt;&lt;br&gt;
            &lt;em&gt;
              - Nested splitpanes -&lt;br&gt;
              [{{ '\{\{ randomNums[1] \}\}' }}, {{ '\{\{ randomNums[2] \}\}' }}, {{ '\{\{ randomNums[1] \}\}' }}]
            &lt;/em&gt;
          &lt;/pane&gt;
        &lt;/splitpanes&gt;

      ssh-pre(language="js" label="Javascript").
        // In your Vue component.
        data: () => ({
          randomNums: { 1: 0, 2: 0, 3: 0 }
        }),
        methods: {
          generateRandomNumber () {
            this.randomNums = Object.assign(this.randomNums, {
              1: Math.round(Math.random() * 100),
              2: Math.round(Math.random() * 100),
              3: Math.round(Math.random() * 100)
            })
          },
          incrementNumber (i) {
            this.randomNums[i]++
          }
        }

      //- Example.
      h3.mt-12.pt-8.mb-2.subtitle-1
        a(href="#vue-router") # Vue Router inside splitpanes
        a(name="vue-router")
      p.mb-1.
        This is another reactivity example of a rather common case: Vue Router inside splitpanes.#[br]
        The navigation is in the left pane, but you can also access from outside of splitpanes, through those buttons:
      v-btn.example-vue-router.my-1.mr-1(color="primary" small to="example-home-view") Home view
      v-btn.example-vue-router.my-1(color="primary" small to="example-another-view") Another view

      splitpanes.default-theme.example-vue-router.mt-2(style="height: 400px")
        pane.layout.column.fill-height(min-size="20")
          .flex.pa-2
            p.headline Navigation
            ul
              li
                router-link(to="example-home-view") Home view
              li
                router-link(to="example-another-view") Another view
          em.ma-auto.grey--text I have a min width of 20%
        pane.layout.column.fill-height
          em.d-flex.justify-center.grey--text.code.pa-2 router-view
          router-view.flex
        pane.layout.align-center.justify-center
          span.ma-auto 3#[br]

      ssh-pre(language="html-vue" label="HTML").
        &lt;button to="home-view"&gt;Home view&lt;/button&gt;
        &lt;button to="another-view"&gt;Another view&lt;/button&gt;

        &lt;splitpanes horizontal class="default-theme" style="height: 400px"&gt;
          &lt;pane min-size="20"&gt;
            &lt;p&gt;Navigation&lt;/p&gt;
            &lt;ul&gt;
              &lt;li&gt;&lt;router-link to="home-view"&gt;Home view&lt;/li&gt;
              &lt;li&gt;&lt;router-link to="another-view"&gt;Another view&lt;/li&gt;
            &lt;/ul&gt;
          &lt;/pane&gt;
          &lt;pane&gt;
            &lt;em&gt;router-view&lt;/em&gt;
            &lt;router-view /&gt;
          &lt;/pane&gt;
          &lt;pane&gt;
            &lt;span&gt;3&lt;/span&gt;
          &lt;/pane&gt;
        &lt;/splitpanes&gt;

      ssh-pre(language="js" label="router.js").
        // Vue Router routes.
        routes: [
          {
            path: '/home-view',
            component: () => import(/* webpackChunkName: "home-view" */ './components/home-view.vue')
          },
          {
            path: '/another-view',
            component: () => import(/* webpackChunkName: "another-view" */ './components/another-view.vue')
          }
        ]

      ssh-pre(language="html-vue" label="home-view.vue").
        &lt;template&gt;
          &lt;div class="green"&gt;
            &lt;div&gt;This is home&lt;/div&gt;
          &lt;/div&gt;
        &lt;/template&gt;

      //- Example.
      h3.mt-12.pt-8.mb-2.subtitle-1
        a(href="#emitted-events") # Listening to emitted events
        a(name="emitted-events")
      p.
        Four events are currently emitted from splitpanes: #[span.code ready], #[span.code resize], #[span.code pane-click] &amp; #[span.code pane-maximize].
      ul
        li #[span.code ready] has no parameter and fires when splitpanes is ready
        li #[span.code resize] returns an array of all the panes objects with their dimensions, and fires while resizing (on mousemove/touchmove)
        li #[span.code resized] returns an array of all the panes objects with their dimensions, and fires once when the resizing stops (on mouseup/touchend)
        li #[span.code pane-click] returns the clicked pane object with its dimensions.
        li #[span.code pane-maximize] returns the maximized pane object with its dimensions.
        li.
          #[span.code splitter-click] returns the next pane object (with its dimensions) directly after the clicked splitter.#[br]
          This event is only emitted if dragging did not occur between mousedown and mouseup.
      p Try resizing panes and check the logs bellow.

      splitpanes.default-theme.example(
        @resize="log('resize', $event)"
        @resized="log('resized', $event)"
        @pane-maximize="log('pane-maximize', $event)"
        @pane-click="log('pane-click', $event)"
        @ready="log('ready', $event)"
        @splitter-click="log('splitter-click', $event)"
        style="height: 400px")
        pane(v-for="i in 3" :key="i" :min-size="10")
          span {{ i }}

      pre.ssh-pre.logs-box(data-label="Logs")
        div.grey--text
          | //&nbsp;
          strong Event name:&nbsp;
          span Event params &nbsp; (Last event on top)
        div(v-for="(event, i) in logs" :key="i")
          strong {{ event.name }}:&nbsp;
          span {{ event.params }}

      ssh-pre(language="html-vue" label="HTML").
        &lt;splitpanes
          class="default-theme"
          @resize="log('resize', $event)"
          @resized="log('resized', $event)"
          @pane-maximize="log('pane-maximize', $event)"
          @pane-click="log('pane-click', $event)"
          @ready="log('ready', $event)"
          @splitter-click="log('splitter-click', $event)"
          style="height: 400px"&gt;
          &lt;pane v-for="i in 3" :key="i" min-size="10"&gt;
            &lt;span&gt;{{ '\{\{ i \}\}' }}&lt;/span&gt;
          &lt;/pane&gt;
        &lt;/splitpanes&gt;

      //- Example.
      h3.mt-12.pt-8.mb-2.subtitle-1
        a(href="#increased-touch-zone") # Increased reactive touch zone for touch devices
        a(name="increased-touch-zone")
      p
        | try it yourself:
        a(href="https://codepen.io/antoniandre/pen/XxRZmB" target="_blank" class="ml-2") //codepen.io/antoniandre/pen/XxRZmB #[v-icon(small color="primary") open_in_new]

      splitpanes.touch-example(horizontal style="height: 400px")
        pane
          splitpanes.touch-example
            pane
              span 1
            pane
              span 2
            pane
              span 3
        pane
          div.text
            p.
              In this example the splitters are thin lines but the reactive touch zone is spread to 30 pixels all around!
              #[em Hover a splitter to see the Fat-fingers reactive zone. ]

      ssh-pre(language="html-vue" label="HTML").
        &lt;splitpanes horizontal style="height: 400px"&gt;
          &lt;pane&gt;
            &lt;splitpanes&gt;
              &lt;pane&gt;
                &lt;span&gt;1&lt;/span&gt;
              &lt;/pane&gt;
              &lt;pane&gt;
                &lt;span&gt;2&lt;/span&gt;
              &lt;/pane&gt;
              &lt;pane&gt;
                &lt;span&gt;3&lt;/span&gt;
              &lt;/pane&gt;
            &lt;/splitpanes&gt;
          &lt;/pane&gt;
          &lt;pane&gt;
            &lt;p&gt;In this example the splitters are thin lines but the reactive touch zone is spread to 30 pixels all around!&lt;/p&gt;
          &lt;/pane&gt;
        &lt;/splitpanes&gt;

      ssh-pre(language="css" label="CSS").
        .splitpanes {background-color: #f8f8f8;}

        .splitpanes__splitter {background-color: #ccc;position: relative;}
        .splitpanes__splitter:before {
          content: '';
          position: absolute;
          left: 0;
          top: 0;
          transition: opacity 0.4s;
          background-color: rgba(255, 0, 0, 0.3);
          opacity: 0;
          z-index: 1;
        }
        .splitpanes__splitter:hover:before {opacity: 1;}
        .splitpanes--vertical &gt; .splitpanes__splitter:before {left: -30px;right: -30px;height: 100%;}
        .splitpanes--horizontal &gt; .splitpanes__splitter:before {top: -30px;bottom: -30px;width: 100%;}

      //- Example.
      h3.mt-12.pt-8.mb-2.subtitle-1
        a(href="#do-your-own-style") # Do your own style
        a(name="do-your-own-style")
      p If you don't want to use the default style, here is how to do your own.
      p
        | try it yourself:
        a(href="https://codepen.io/antoniandre/pen/mzGZXR" target="_blank" class="ml-2") //codepen.io/antoniandre/pen/mzGZXR #[v-icon(small color="primary") open_in_new]

      splitpanes.example-own-style(horizontal style="height: 400px")
        pane
          splitpanes
            pane
              span 1
            pane
              span 2
            pane
              span 3
        pane
          span 4

      ssh-pre(language="html-vue" label="HTML").
        &lt;splitpanes horizontal style="height: 400px"&gt;
          &lt;pane&gt;
            &lt;splitpanes vertical&gt;
              &lt;pane&gt;
                &lt;span&gt;1&lt;/span&gt;
              &lt;/pane&gt;
              &lt;pane&gt;
                &lt;span&gt;2&lt;/span&gt;
              &lt;/pane&gt;
              &lt;pane&gt;
                &lt;span&gt;3&lt;/span&gt;
              &lt;/pane&gt;
            &lt;/splitpanes&gt;
          &lt;/pane&gt;
          &lt;pane&gt;
            &lt;span&gt;4&lt;/span&gt;
          &lt;/pane&gt;
        &lt;/splitpanes&gt;

      ssh-pre(language="css" label="CSS").
        .splitpanes {
          background: linear-gradient(-45deg, #EE7752, #E73C7E, #23A6D5, #23D5AB);
        }

        .splitpanes__pane {
          box-shadow: 0 0 5px rgba(0, 0, 0, .2) inset;
          justify-content: center;
          align-items: center;
          display: flex;
        }

        .splitpanes--vertical > .splitpanes__splitter {
          min-width: 6px;
          background: linear-gradient(90deg, #ccc, #111);
        }

        .splitpanes--horizontal > .splitpanes__splitter {
          min-height: 6px;
          background: linear-gradient(0deg, #ccc, #111);
        }

      h2.headline.mt-12.pt-12.mb-2
        a(href="#release-notes") Release Notes
        a(name="release-notes")

      div
        | #[strong Version 2.0.0] Fix reactivity issues.
        highlight-message(type="success")
          ul
            li
              strong.
                Children now must be wrapped into a #[span.code `pane`] component.
            li you can still add CSS classes on the #[span.code `pane`] component tag.
        | #[strong Version 1.14.0] Programmatically set pane size
        highlight-message(type="success")
          strong.
            The attribute #[span.code `splitpanes-size`] is now replaced with
            #[span.code `splitpanes-size`]. You can use it to set a default pane width or height,
            or to programmatically change a pane width or height.
      div #[strong Version 1.13.0] Emit event on splitter click
      div #[strong Version 1.12.0] double click splitter to maximize is now an option
      div #[strong Version 1.11.0] Persist panes size after slots changed
      div #[strong Version 1.10.0] Add maximum size feature on panes
      div
        | #[strong Version 1.9.0] Emit event on resize &amp; watch slots optional
        highlight-message(type="success")
          strong.
            The #[span.code `resize`] event - previously firing after resize end - is now firing on resize.#[br]
            A new #[span.code `resized`] event is emitted on resize end. Check out the
            #[a(href="#emitted-events") # Listening to emitted events] example.
        highlight-message(type="success")
          strong.
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

<script>
import { Splitpanes, Pane } from '@/components/splitpanes/index'
import HighlightMessage from '@/components/highlight-message'
import SshPre from 'simple-syntax-highlighter'
import 'simple-syntax-highlighter/dist/sshpre.css'

export default {
  name: 'app',
  components: { Splitpanes, Pane, SshPre, HighlightMessage },
  data: () => ({
    panesNumber: 3,
    logs: [],
    randomNums: { 1: 0, 2: 0, 3: 0 },
    paneSize: 50
  }),
  methods: {
    log (eventName, eventParams) {
      this.logs.unshift({ name: eventName, params: JSON.stringify(eventParams) })
    },
    generateRandomNumber () {
      this.randomNums = Object.assign(this.randomNums, {
        1: Math.round(Math.random() * 100),
        2: Math.round(Math.random() * 100),
        3: Math.round(Math.random() * 100)
      })
    },
    incrementNumber (i) {
      this.randomNums[i]++
    }
  }
}
</script>

<style lang="scss">
$primary-color: #42b983;
$secondary-color: #78cfa8;

// General document rules.
//------------------------
* {margin: 0;padding: 0;}

html {font-size: 14px;}

#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  margin-top: 60px;
  background-color: #fff !important;
}

a {
  text-decoration: none;
  transition: 0.3s;

  .v-application h3 & {color: #333;font-size: 1.5em;}
  &:hover {color: $secondary-color;}
}

ul.checklist {
  list-style-type: none;
  padding: 0;
}

.code {font-family: monospace;}

.splitpanes.example {
  .splitpanes__pane {
    box-shadow: 0 0 3px rgba(0, 0, 0, .2) inset;
    justify-content: center;
    align-items: center;
    display: flex;
    position: relative;
  }
}

.splitpanes__pane > span {
  font-family: Helvetica, Arial, sans-serif;
  color: #fff;
  font-size: 5em;
  opacity: 0.7;
}

em.specs {
  font-size: 0.2em;
  line-height: 1;
  position: absolute;
  color: #999;
  bottom: 0.5em;
  left: 0;
  right: 0;
  text-align: center;
}

.logs-box {
  height: 300px;
  overflow: auto;
}

// Vue Router example.
//---------------
.example-vue-router {
  &.v-btn--active {background-color: darken($primary-color, 10) !important;}
  .router-link-active {color: darken($primary-color, 10);}
}

// Touch example.
//---------------
.splitpanes.touch-example {
  background-color: #f8f8f8;

  .splitpanes__pane {
    justify-content: center;
    align-items: center;
    display: flex;
  }

  .splitpanes__splitter {background-color: #ccc;position: relative;}
  .splitpanes__splitter:before {
    content: '';
    position: absolute;
    left: 0;
    top: 0;
    transition: opacity 0.4s;
    background-color: rgba(255, 0, 0, 0.3);
    opacity: 0;
    z-index: 1;
  }
  .splitpanes__splitter:hover:before {opacity: 1;}

  &.splitpanes--vertical > .splitpanes__splitter:before {left: -30px;right: -30px;height: 100%;}
  &.splitpanes--horizontal > .splitpanes__splitter:before {top: -30px;bottom: -30px;width: 100%;}

  .text {
    color: #999;
    opacity: 1;
    font-size: 15px;
    height: 100%;
    text-align: center;
    display: flex;
    align-items: center;

    em {
      display: block;
      margin-top: 0.5em;
      color: #bbb;
      font-size: 13px;
      text-align: center;
    }
  }

  span {opacity: 1;}
}

// Own style example.
//---------------
.example-own-style.splitpanes {
  background: linear-gradient(-45deg, #EE7752, #E73C7E, #23A6D5, #23D5AB);

  .splitpanes__pane {
    box-shadow: 0 0 5px rgba(0, 0, 0, .2) inset;
    justify-content: center;
    align-items: center;
    display: flex;
  }

  .splitpanes--vertical > .splitpanes__splitter {
    min-width: 6px;
    background: linear-gradient(90deg, #ccc, #111);
  }

  &.splitpanes--horizontal > .splitpanes__splitter {
    min-height: 6px;
    background: linear-gradient(#ccc, #111);
  }
}
</style>
