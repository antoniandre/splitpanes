<template lang="pug">
.page-container
  header.text-center
    svg.mb5(xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1000 1000" xml:space="preserve" width="4em")
      path(d="M469 500v490h57V10h-57v490z" fill="#42b983")
      path(d="m109 417-83 83 80 80 81 81 20-20 20-20-46-46-46-46h219v-58H135l48-47 49-49c0-2-9-11-20-22l-20-20-83 84z" fill="#35495e")
      path(d="m789 354-21 20 11 11 46 48 35 37-109 1H641v58h219l-46 46-46 46 21 20 20 20 82-83 83-83-13-11-82-81-70-70-20 21z" fill="#35495e")
    h1.mb3.title1 Splitpanes

    p.grey A Vue.js reliable, simple and touch-ready panes splitter / resizer.

  h2.mt12.mb2.title2 Features
  ul.checklist
    li
      w-icon.mr2(color="primary" size="20") material-icons check
      | Light weight &amp; no dependencies other than Vue JS
    li
      w-icon.mr2(color="primary" size="20") material-icons check
      | Only worry about your panes, the splitters are automatic
    li
      w-icon.mr2(color="primary" size="20") material-icons check
      | Nesting supported
    li
      w-icon.mr2(color="primary" size="20") material-icons check
      | Fully responsive
    li
      w-icon.mr2(color="primary" size="20") material-icons check
      | Support for touch devices
    li
      w-icon.mr2(color="primary" size="20") material-icons check
      | Push other panes or not
    li
      w-icon.mr2(color="primary" size="20") material-icons check
      | Double click a splitter to maximize pane
    li
      w-icon.mr2(color="primary" size="20") material-icons check
      | Programmatically set pane width or height
    li
      w-icon.mr2(color="primary" size="20") material-icons check
      | Programmatically add and remove panes
    li
      w-icon.mr2(color="primary" size="20") material-icons check
      strong Supports Vue 2 &amp; Vue 3

  h2.mt12.mb4.title2 Github project &nbsp;&amp;&nbsp; important notes
  w-flex(align-center shrink)
    w-icon.ml1.mr5.lightgrey(size="46") fab fa-github
    a(href="https://github.com/antoniandre/splitpanes" target="_blank") //github.com/antoniandre/splitpanes #[w-icon(color="primary") material-icons open_in_new]

  w-flex.my8(align-center)
    w-icon.mr4(size="50" color="orange-light3") material-icons report
    w-alert.ma0(border-left color="orange" style="width: 100%;max-width: 600px")
      a.orange(
        href="https://blog.vuejs.org/posts/vue-3-as-the-new-default.html"
        target="_blank"
        style="text-decoration: underline") Vue 3 is the new default
      | , and so is Splitpanes 3, for Vue 3. #[span.title2.ml1 🙌]#[br]
      | For Vue 2 projects, you should use #[code npm i splitpanes@#[strong legacy]].


  w-flex.my8(align-center)
    w-icon.mr4(size="50" color="pink-light3") material-icons favorite
    w-alert.ma0(border-left color="pink" style="width: 100%;max-width: 600px")
      | If you like Splitpanes, you can
      a.pink.mx2(
        href="https://www.paypal.me/antoniandre1"
        target="_blank"
        style="text-decoration: underline") #[strong Support the project]
      | or
      a.pink.ml2(
        href="https://github.com/sponsors/antoniandre"
        target="_blank"
        style="text-decoration: underline") #[strong Sponsor the author]
      | !
      div Thank you so much to all the backers! #[span.title2.ml1 🙏]

  w-flex.mt4.mb8(align-center)
    svg.mr4.blue-light1(viewBox="0 0 725 477" style="width: 50px;stroke: #497ca2;stroke-width: 5px")
      path(fill="#497ca2" d="M449 0c-78 5-152 39-217 82-19 13-37 26-54 40-39 1-77 15-110 34-34 21-53 60-61 99-11 52-8 108 6 159 7 23 16 46 33 63 4-4 13-4 13-11-1-5-7-8-9-14-27-48-32-108-11-159 13-32 36-63 68-77 19-9 42-7 58 6 6 7 18 4 24-2 6-4 11-10 19-10-24 25-39 60-38 95 1 15 3 31 8 45 16 36 41 69 76 89 5 2 10 6 16 7 5-2 14-5 14-12-4-9-14-12-21-18-27-23-56-48-67-82-9-29-1-60 8-88 7-15 21-32 39-29 15 1 28 13 43 8 11-5 13-17 16-27 5-17 3-38-10-51-16-18-40-23-62-25l-11-2c23-19 53-26 81-31 21-3 43-5 64-2 18 3 28 21 42 31-33 47-57 102-56 159a170 170 0 0086 149c6-1 13-7 10-14-5-11-17-16-25-25-33-30-52-75-50-121 1-29 11-58 24-84 12-25 25-52 47-71 9-8 22-13 33-7 20 8 42 14 63 13-35 27-55 70-64 113-9 44-7 91 12 133 15 37 45 68 81 85 32 16 67 24 101 27 18 1 36 2 53-4 4-1 6-7 2-9-13-6-28-4-42-6-45-5-92-16-127-45-34-28-54-71-60-114-5-47 7-97 34-137 11-15 26-31 45-34 14-1 25 12 31 23 6 12 16 24 29 28 20-10 40-26 43-50 2-17-6-34-14-49-15-25-40-43-69-48-20-5-41-2-61-6-22-21-54-24-83-24zm6 21c22 0 48 5 62 25 4 7 8 16 8 24-1 10-10 22-21 19-9-7-18-14-30-16-14-4-31-1-43 8-6 6-17 8-24 2-9-6-17-15-28-17-27-7-54 1-81 6a364 364 0 01157-51zm117 29c33 0 66 25 72 58 3 12 3 28-8 35-3 2-6 4-8 1-8-12-12-27-23-37-3-7-12-8-19-9-13-2-26 0-39-4 7-7 6-17 4-25l-3-16 24-3zm-372 92l46 2c18 2 33 16 34 34 1 7 1 17-6 21-6 0-12-4-18-6-21-8-46-14-67-3-6 2-11 9-17 5-10-4-18-14-30-12-30 1-56 21-77 42-16 17-30 37-43 56 0-39 17-80 49-104 26-22 61-30 94-34l35-1z")
    w-alert.ma0(border-left color="pale-blue" style="width: 100%;max-width: 600px")
      strong
        | Check out my UI framework for Vue (2 &amp; 3)!
        a.title2.ml4(
          href="https://antoniandre.github.io/wave-ui"
          target="_blank"
          style="width: 50px;color: #1471b8;text-decoration: underline")
            strong Wave UI

  .title4.mt12.pt12.mb2
    | # Demo -
    a.ml1.d-inline-flex.align-center(href="https://codepen.io/antoniandre/pen/XybPKP" target="_blank")
      | try it yourself on Codepen
      w-icon.ml1(color="primary") material-icons open_in_new

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

  w-flex.pb6(wrap)
    ssh-pre.grow.mb0.mr2(language="html-vue" label="HTML Vue Template").
      &lt;splitpanes style="height: 400px"&gt;
        &lt;pane min-size="20"&gt;1&lt;/pane&gt;
        &lt;pane&gt;
          &lt;splitpanes horizontal&gt;
            &lt;pane&gt;2&lt;/pane&gt;
            &lt;pane&gt;3&lt;/pane&gt;
            &lt;pane&gt;4&lt;/pane&gt;
          &lt;/splitpanes&gt;
        &lt;/pane&gt;
        &lt;pane&gt;5&lt;/pane&gt;
      &lt;/splitpanes&gt;
    ssh-pre.grow.mb0(language="css" label="CSS").
      .splitpanes__pane {
        display: flex;
        justify-content: center;
        align-items: center;
        font-family: Helvetica, Arial, sans-serif;
        color: rgba(255, 255, 255, 0.6);
        font-size: 5em;
      }

  h2.mt12.mb2
    a(href="#installation") Installation
    a(name="installation")

  p You have two options: #[em NPM] #[strong.mx1 or] #[span.code &lt;script&gt;] tag.
  h3.mt12 Via NPM

  w-flex(align-center wrap)
    ssh-pre.px4(language="shell").
      npm i splitpanes # For Vue 3
    span.mx2 or
    ssh-pre.px4(language="shell").
      npm i splitpanes@legacy # For Vue 2

  p.mt2
    w-icon.mr1 material-icons chevron_right
    | View and edit a working
    a.ml2(href="https://codepen.io/antoniandre/pen/LYNKGWV" target="_blank") Vue 3 example
    | , or
    a.mx2(href="https://codepen.io/antoniandre/pen/XybPKP" target="_blank") Vue 2 example
    | on Codepen.

  .mt6 Then import the component and CSS:
  ssh-pre(language="js" label="Javascript").
    // In your Vue component.
    import { Splitpanes, Pane } from 'splitpanes'
    import 'splitpanes/dist/splitpanes.css'

    export default {
      components: { Splitpanes, Pane },
      ...
    }

  h3.mt12 Via #[span.code &lt;script&gt;] tag
  p Include the Splitpanes script in your document #[span.code &lt;head&gt;] as follows:
  ssh-pre(language="html" label="HTML").
    &lt;head&gt;
      ...
      &lt;script src="https://unpkg.com/vue"&gt;&lt;/script&gt;
      &lt;script src="https://unpkg.com/splitpanes"&gt;&lt;/script&gt;
      &lt;link href="https://unpkg.com/splitpanes/dist/splitpanes.css" rel="stylesheet"&gt;
    &lt;/head&gt;

  h2.mt12.mb2
    a(href="#how-to-use") How to use
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
    strong No splitter tags!#[br]
    span The splitters will be added automatically between the #[span.code &lt;pane&gt;] tags.

  highlight-message(type="tips").
    By default the layout is vertical, if you need you can set the attribute
    #[span.code horizontal] on the #[span.code &lt;splitpanes&gt;] tag to change the layout to rows.

  highlight-message(type="tips").
    The CSS is external so you can easily override or choose not to include it at all.#[br]
    If you want to use it, you can also optionally use the CSS class #[span.code default-theme]
    at the root of your splitpanes to apply the default theme like on this page.#[br]
    If you want to go with your own style, you can check the #[a(href="#do-your-own-style") Do Your Own Style example].

  //- Examples.
  //-------------------------------------------------------//
  h2.mt12.mb2
    a(href="#more-examples") More examples
    a(name="more-examples")

  //- Example.
  h3.mt10.mb2
    a(href="#horizontal-layout") Horizontal layout, push other panes, min &amp; max use
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
  h3.mt12.pt8.mb2
    a(href="#default-pane-width") Default pane width or height
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
  h3.mt12.pt8.mb2
    a(href="#nested-splitpanes") Mix layout with nested splitpanes &amp; prevent pushing other panes
    a(name="nested-splitpanes")
  p
    a(href="https://codepen.io/antoniandre/pen/PypgKY" target="_blank")
      | Try it yourself on Codepen
      w-icon.ml1(color="primary") material-icons open_in_new
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
  h3.mt12.pt8.mb2
    a(href="#lots-of-splitters") Lots of splitters &amp; push other panes - all panes have a min width of 5%
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
  h3.mt12.pt8.mb2
    a(href="#adding-splitters-on-the-fly") Adding splitters on the fly
    a(name="adding-splitters-on-the-fly")
  p
    | This example shows the reactivity when you add a new element dynamically in splitpanes.
    w-button.ml2(@click="panesNumber++")
      w-icon.mr1 material-icons add
      | Add pane
    w-button.ml2(@click="panesNumber--")
      w-icon.mr1 material-icons remove
      | Remove pane

  splitpanes.default-theme.example(style="height: 400px")
    pane(v-for="i in panesNumberAbs" :key="i")
      span {{ i }}

  ssh-pre(language="html-vue" label="HTML").
    &lt;button @click="panesNumber++"&gt;Add pane&lt;/button&gt;
    &lt;button @click="panesNumber--"&gt;Remove pane&lt;/button&gt;

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
  h3.mt12.pt8.mb2
    a(href="#change-direction") Change direction &amp; first splitter
    a(name="change-direction")
  p When changing direction, all the panes current width or height will flip to adapt to the new layout.
  p.
    Showing the first splitter is an option which allows user to double click the splitter to maximize the next pane.#[br]
    The first splitter does not allow to resize the next pane.

  w-button.mr2.mb2(@click="horizontal = !horizontal")
    w-icon.ml-n1.mr1 material-icons {{ horizontal ? 'view_column' : 'view_stream' }}
    | Switch to {{ horizontal ? 'Vertical' : 'Horizontal' }}
  w-button.mr2.mb2(@click="firstSplitter = !firstSplitter")
    w-icon.ml-n1.mr1 material-icons {{ firstSplitter ? 'close' : 'add' }}
    | {{ firstSplitter ? 'Hide' : 'Show' }} First Splitter
  splitpanes.default-theme.example(
    :horizontal="horizontal"
    :first-splitter="firstSplitter"
    style="height: 400px")
    pane(v-for="i in 3" :key="i")
      span {{ i }}

  ssh-pre(language="html-vue" label="HTML").
    &lt;button @click="horizontal = !horizontal"&gt;Switch to {{ "\{\{ horizontal ? 'Vertical' : 'Horizontal' \}\}" }}&lt;/button&gt;
    &lt;button @click="firstSplitter = !firstSplitter"&gt;{{ "\{\{ firstSplitter ? 'Hide' : 'Show' \}\}" }} First Splitter&lt;/button&gt;

    &lt;splitpanes class="default-theme" :horizontal="horizontal" :first-splitter="firstSplitter" style="height: 400px"&gt;
      &lt;pane v-for="i in 3" :key="i"&gt;
        &lt;span&gt;{{ '\{\{ i \}\}' }}%&lt;/span&gt;
      &lt;/pane&gt;
    &lt;/splitpanes&gt;

  ssh-pre(language="js" label="Javascript").
    data: () => ({
      horizontal: false
      firstSplitter: false
    })

  //- Example.
  h3.mt12.pt8.mb2
    a(href="#programmatic-resizing") Programmatic resizing
    a(name="programmatic-resizing")
  p.mb6 This example shows the programmatic way of resizing panes. And how it works both ways.
  w-slider.mt12.mb10(
    v-model="paneSize"
    track-color="grey-light2"
    label="First pane size"
    thumb-label="always"
    thumb-size="25"
    :min="0"
    :max="100")
  splitpanes.default-theme.example(@resize="paneSize = $event[0].size" style="height: 400px")
    pane(:size="paneSize")
      span {{ ~~(paneSize * 100) / 100 }}%
    pane(:size="100 - paneSize")
      span {{ ~~((100 - paneSize) * 100) / 100 }}%

  ssh-pre(language="html-vue" label="HTML").
    &lt;w-slider v-model="paneSize" label="First pane size" :min="0" :max="100"&gt;
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
    })

  //- Example.
  h3.mt12.pt8.mb2
    a(href="#in-depth-reactivity") In-depth reactivity
    a(name="in-depth-reactivity")
  p
    | This example shows the reactivity when you modify anything in your component inside splitpanes.#[br]
    w-button.mt2.mr2(@click="generateRandomNumber")
      w-icon.mr1(size="20") material-icons sync
      | Generate 3 random numbers
    w-button.mt2(@click="incrementNumber(3)")
      w-icon.mr1(size="20") material-icons add
      | Increment pane #3
  splitpanes.default-theme.example(style="height: 400px" horizontal)
    pane
      splitpanes
        pane.w-flex.column.text-center(v-for="i in 3" :key="i")
          span {{ i }}#[br]
          em Number is: {{ randomNums[i] }}#[br]
          em(v-if="i === 2").
            Number on the left is: {{ randomNums[1] }}#[br]
            Number on the right is: {{ randomNums[3] }}#[br]
          w-button.align-center(v-if="i !== 2" @click="randomNums[i] = randomNums[i] + 1" style="min-width: 0")
            w-icon(size="20") material-icons add
            | 1
    pane.w-flex.column.text-center
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
  h3.mt12.pt8.mb2
    a(href="#toggle-a-pane-with-v-if") Toggle a pane with #[span.code v-if]
    a(name="toggle-a-pane-with-v-if")

  w-button.mb2(@click="hidePane2 = !hidePane2")
    w-icon.mr2 material-icons {{ hidePane2 ? 'visibility' : 'visibility_off'}}
    | {{ hidePane2 ? 'Show' : 'Hide' }} Pane 2
  splitpanes.default-theme.example(style="height: 400px")
    pane
      span 1
    pane.green-light5(v-if="!hidePane2")
      span 2
    pane
      span 3

  ssh-pre(language="html-vue" label="HTML").
    &lt;button @click="hidePane2 = !hidePane2"&gt;{{ "\{\{ hidePane2 ? 'Show' : 'Hide' \}\}" }} Pane 2&lt;/button&gt;
    &lt;splitpanes class="default-theme" style="height: 400px"&gt;
      &lt;pane&gt;
        &lt;span&gt;1&lt;/span&gt;
      &lt;/pane&gt;
      &lt;pane v-if="!hidePane2"&gt;
        &lt;span&gt;2&lt;/span&gt;
      &lt;/pane&gt;
      &lt;pane&gt;
        &lt;span&gt;3&lt;/span&gt;
      &lt;/pane&gt;
    &lt;/splitpanes&gt;

  //- Example.
  h3.mt12.pt8.mb2
    a(href="#vue-router") Vue Router inside splitpanes
    a(name="vue-router")
  p.mb1.
    This is another reactivity example of a rather common case: Vue Router inside splitpanes.#[br]
    The navigation is in the left pane, but you can also access from outside of splitpanes, through those buttons:
  w-button.example-vue-router.my1.mr1(route="example-home-view") Home view
  w-button.example-vue-router.my1(route="example-another-view") Another view

  splitpanes.default-theme.example-vue-router.mt2(style="height: 400px")
    pane.w-flex.column.fill-height(min-size="20")
      .flex.pa2
        p.title1 Navigation
        ul
          li
            router-link(to="example-home-view") Home view
          li
            router-link(to="example-another-view") Another view
      em.ma-auto.grey I have a min width of 20%
    pane.w-flex.column.fill-height
      em.d-flex.justify-center.grey.code.pa2 router-view
      router-view.flex
    pane.w-flex.align-center.justify-center
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
  h3.mt12.pt8.mb2
    a(href="#emitted-events") Listening to emitted events
    a(name="emitted-events")
  p Here is the list of events that are emitted from splitpanes:
  ul
    li #[code.mr2 ready] has no parameter and fires when splitpanes is ready
    li #[code.mr2 resize] returns an array of all the panes objects with their dimensions, and fires while resizing (on mousemove/touchmove)
    li.
      #[code.mr2 resized] returns an array of all the panes objects with their dimensions, and fires once when the resizing stops after user drag (on mouseup/touchend).#[br]
      This event is also fired after the internal resizing of panes that occurs after adding or removing a pane.
    li #[code.mr2 pane-click] returns the clicked pane object with its dimensions.
    li #[code.mr2 pane-maximize] returns the maximized pane object with its dimensions.
    li #[code.mr2 pane-add] returns an object containing the index of the added pane and the new array of panes after resize.
    li #[code.mr2 pane-remove] returns an object containing the removed pane and an array of all the remaining panes objects with their dimensions after resize.
    li.
      #[code.mr2 splitter-click] returns the next pane object (with its dimensions) directly after the clicked splitter.#[br]
      This event is only emitted if dragging did not occur between mousedown and mouseup.
    li.
      #[code.mr2 splitter-dbl-click] returns the next pane object (with its dimensions) directly after the double clicked splitter.#[br]
      This event is only emitted if dragging did not occur between mousedown and mouseup.
  p.mt4 Try resizing panes and check the logs bellow.

  splitpanes.default-theme.example(
    @resize="log('resize', $event)"
    @resized="log('resized', $event)"
    @pane-maximize="log('pane-maximize', $event)"
    @pane-click="log('pane-click', $event)"
    @ready="log('ready', $event)"
    @splitter-click="log('splitter-click', $event)"
    @splitter-dbl-click="log('splitter-dbl-click', $event)"
    style="height: 400px")
    pane(v-for="i in 3" :key="i" :min-size="10")
      span {{ i }}

  pre.ssh-pre.logs-box(data-label="Logs")
    div.grey
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
      @splitter-dbl-click="log('splitter-dbl-click', $event)"
      style="height: 400px"&gt;
      &lt;pane v-for="i in 3" :key="i" min-size="10"&gt;
        &lt;span&gt;{{ '\{\{ i \}\}' }}&lt;/span&gt;
      &lt;/pane&gt;
    &lt;/splitpanes&gt;

  //- Example.
  h3.mt12.pt8.mb2
    a(href="#increased-touch-zone") Increased reactive touch zone for touch devices
    a(name="increased-touch-zone")
  p
    a(href="https://codepen.io/antoniandre/pen/XxRZmB" target="_blank")
      | Try it yourself on Codepen
      w-icon.ml1(color="primary") material-icons open_in_new

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
          #[em Hover a splitter to see the enlarged fat-finger-proof reactive zone.]

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


  //- Example
  h3.mt12.pt8.mb2
    a(href="#mouse-snapping") Mouse snapping
    a(name="mouse-snapping")

  p
    | This example shows the effect of disabling splitters snapping to the mouse
    | when the interacte zone is wider than a few pixels.

  splitpanes.touch-example(
    horizontal
    style="height: 400px"
    :snap-to-mouse="snapToMouse")
    pane
      splitpanes.touch-example(:snap-to-mouse="snapToMouse")
        pane
          span 1
        pane
          span 2
        pane
          span 3
    pane
      div.text
        p
          span(v-if="snapToMouse").
            By default, the splitter always gets put under the cursor.
          span(v-else).
            When #[span.code :snap-to-mouse="false"], the splitter keeps its distance relative to the cursor.
          br
          w-button.mr2.mb2(@click="snapToMouse = !snapToMouse")
            w-icon.ml-n1.mr1 material-icons {{ snapToMouse ? 'disable' : 'enable' }}
            | {{ snapToMouse ? 'Disable' : 'Enable' }} mouse snapping

  ssh-pre(language="html-vue" label="HTML").
    &lt;splitpanes horizontal style="height: 400px" :snap-to-mouse="false"&gt;
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
        &lt;p&gt;When :snap-to-mouse="false", the splitter keeps its distance relative to the cursor.&lt;/p&gt;
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
  h3.mt12.pt8.mb2
    a(href="#do-your-own-style") Do your own style
    a(name="do-your-own-style")
  p If you don't want to use the default style, here is how to do your own.
  p
    a(href="https://codepen.io/antoniandre/pen/mzGZXR" target="_blank")
      | Try it yourself on Codepen
      w-icon.ml1(color="primary") material-icons open_in_new

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

  h2.mt12.pt12.mb2
    a(href="#api") API
    a(name="api")

  p Here is the list of all the props.
  ul
    li
      code horizontal
      span.code.ml2 Default: false
      p.
        The orientation of the panes splitting.#[br]
        Vertical by default, meaning the splitters are vertical, but you can resize horizontally
    li
      code push-other-panes
      span.code.ml2 Default: true
      p Whether it should push the next splitter when dragging a splitter until it reached another one.
    li
      code dbl-click-splitter
      span.code.ml2 Default: true
      p Double click on splitter to maximize the next pane.
    li
      code rtl
      span.code.ml2 Default: false
      p Supports Right to left direction.
    li
      code first-splitter
      span.code.ml2 Default: false
      p Displays the first splitter when set to true. This allows maximizing the first pane on splitter double click.
    li
      code snap-to-mouse
      span.code.ml2 Default: true
      p.
        Always snap the splitter right under the mouse, even if the drag was started a few pixels of the center.
        This makes more sense with custom themes and/or thicker splitter handles.

  h2.mt12.pt12.mb2
    a(href="#release-notes") Release Notes
    a(name="release-notes")

  div.mt4
    | #[strong Version 3.0] For Vue 3 projects.
    highlight-message(type="warning").
      Installing the latest splitpanes on a Vue 2 project will break it.#[br]
      For Vue 2, you need to install splitpanes from the #[span.code legacy] tag: #[code npm i splitpanes@legacy].#[br]
      For Vue 3, you don't need the #[code next] tag anymore.
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

  div.mt4
    | #[strong Version 2.0.0] Fix reactivity issues.
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
    highlight-message(type="success")
      strong.
        The #[span.code `resize`] event - previously firing after resize end - is now firing on resize.#[br]
        A new #[span.code `resized`] event is emitted on resize end. Check out the
        #[a(href="#emitted-events") Listening to emitted events] example.
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
import { Splitpanes, Pane } from '@/components/splitpanes/index.js'
import HighlightMessage from '@/components/highlight-message.vue'
import SshPre from 'simple-syntax-highlighter'
import 'simple-syntax-highlighter/dist/sshpre.css'

export default {
  name: 'app',
  components: { Splitpanes, Pane, SshPre, HighlightMessage },
  data: () => ({
    panesNumber: 3,
    logs: [],
    randomNums: { 1: 0, 2: 0, 3: 0 },
    paneSize: 50,
    hidePane2: false,
    horizontal: false,
    firstSplitter: false,
    snapToMouse: true,
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
  },

  computed: {
    panesNumberAbs () {
      // eslint-disable-next-line vue/no-side-effects-in-computed-properties
      if (this.panesNumber < 0) this.panesNumber = 0
      return this.panesNumber
    }
  }
}
</script>

<style lang="scss">
$primary-color: #42b983;
$secondary-color: #78cfa8;

a {
  text-decoration: none;
  transition: 0.3s;

  .w-application h3 & {color: #333;font-size: 1.5em;}
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
  &.w-button--active {background-color: darken($primary-color, 10) !important;}
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