<template lang="pug">
  v-app.white
    v-container
      div.text-xs-center
        img(alt="Vue logo" src="./assets/logo.png" height="40")
        h1.mb-3.headline Vue Split Panes
        p.subheading A Vue JS reliable, simple and touch-ready panes splitter / resizer.

      v-layout(row)
        v-flex
          h2.mt-5.mb-2.title Features
          ul
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
              | Adding panes on the fly automatically adds splitters
            li
              v-icon.mr-2(color="primary" size="20") check
              | Simple yet efficient
            li
              v-icon.mr-2(color="primary" size="20") check
              | More features to come!

        div
          div.mt-5.mb-3.title Github project
          v-layout.mb-5(align-center shrink)
            v-icon.pr-4.lightgrey--text(x-large) fab fa-github
            a(href="https://github.com/antoniandre/splitpanes" target="_blank") //github.com/antoniandre/splitpanes #[v-icon(small color="primary") open_in_new]

      p.mt-5.subheading # Demo 1
      splitpanes.default-theme.example(style="height:400px")
        span(splitpanes-min="20") 1
        splitpanes.default-theme.example(horizontal)
          span 2
          span 3
          span 4
        span 5

      ssh-pre(language="html-vue" label="HTML Vue Template" v-pre).
        &lt;splitpanes style="height: 400px"&gt;
          &lt;span&gt;1&lt;/span&gt;
          &lt;splitpanes horizontal&gt;
            &lt;span&gt;2&lt;/span&gt;
            &lt;span&gt;3&lt;/span&gt;
            &lt;span&gt;4&lt;/span&gt;
          &lt;/splitpanes&gt;
          &lt;span&gt;5&lt;/span&gt;
        &lt;/splitpanes&gt;
      ssh-pre(language="css" label="CSS" v-pre).
        .splitpanes {background-color: #f2f2f2;}

        .splitpanes__pane {
          box-shadow: 0 0 3px rgba(0, 0, 0, .2) inset;
          justify-content: center;
          align-items: center;
          display: flex;
        }

        .splitpanes__splitter {background-color: #fff;}
        .splitpanes--vertical &gt; .splitpanes__splitter {width: 10px;}
        .splitpanes--horizontal &gt; .splitpanes__splitter {height: 10px;}

        .splitpanes span {
          font-family: Helvetica, Arial, sans-serif;
          color: #fff;
          font-size: 5em;
          opacity: 0.6;
        }

      h2.mt-5.mb-2.headline
        a(href="#installation") Installation
        a(name="installation")

      p You have two options: #[em NPM] #[strong.mx-2 or] #[span.code &lt;script&gt;] tag.
      h3 Via NPM
      ssh-pre(language="shell" label="Shell") npm install splitpanes --save-dev
      p Then import the 2 components and use it:
      ssh-pre(language="js" label="Javascript").
        // In your VueJS component.
        import { Splitpanes } from 'splitpanes'
        import 'splitpanes/dist/splitpanes.min.css'

        export default {
          components: { Splitpanes },
          ...
        }

      h3 Via #[span.code &lt;script&gt;] tag
      p Include the Splitpanes script in your document #[span.code &lt;head&gt;] as follows:
      ssh-pre(language="html" label="HTML").
        &lt;head&gt;
          ...
          &lt;script src="https://unpkg.com/vue/dist/vue.min.js"&gt;&lt;/script&gt;
          &lt;script src="https://unpkg.com/splitpanes/dist/splitpanes.umd.min.js"&gt;&lt;/script&gt;
          &lt;link href="https://unpkg.com/splitpanes/dist/splitpanes.css" rel="stylesheet"&gt;
        &lt;/head&gt;

      h2.mt-5.mb-2
        a.headline(href="#how-to-use") How to use
        a(name="how-to-use")

      p.
        Once included in your project, use as follows.#[br]
        The splitters will be added automatically between all the direct children.

      highlight-message(type="tips").
        By default the layout is 'column' (vertical), if you need you can set the attribute
        #[span.code horizontal] on the #[span.code &lt;splitpanes&gt;] tag to change the layout to rows.

      highlight-message(type="tips").
        The CSS is external  so you can easily override or choose not to include it at all.#[br]
        If you want to use it, you can also optionally use the CSS class #[span.code default-theme]
        at the root of your splitpanes to apply the default theme like on this page.

      ssh-pre(language="html-vue" label="HTML Vue Template" v-pre).
        &lt;splitpanes class="default-theme"&gt;
          &lt;div v-for="i in 3" :key="i"&gt;{{ i }}&lt;/div&gt;
        &lt;/splitpanes&gt;

      h2.mt-5.mb-2
        a.headline(href="#more-examples") More examples
        a(name="more-examples")

      //- Example.
      p.mt-5.subheading # Horizontal layout &amp; push other panes
      splitpanes.default-theme.example(horizontal style="height:400px")
        span 1
        span 2
        span 3

      ssh-pre(language="html-vue" label="HTML").
        &lt;splitpanes class="default-theme" horizontal style="height:400px"&gt;
          &lt;span&gt;1&lt;/span&gt;
          &lt;span&gt;2&lt;/span&gt;
          &lt;span&gt;3&lt;/span&gt;
        &lt;/splitpanes&gt;

      //- Example.
      p.mt-5.subheading # Mix layout with nested splitpanes &amp; prevent pushing other panes
      p
        | try it yourself:
        a(href="https://codepen.io/antoniandre/pen/PypgKY" target="_blank" class="ml-2") //codepen.io/antoniandre/pen/PypgKY #[v-icon(small color="primary") open_in_new]
      splitpanes.default-theme.example(horizontal :push-other-panes="false" style="height:400px")
        span 1
        splitpanes(:push-other-panes="false")
          span 2
          span 3
          span 4
        span 5

      ssh-pre(language="html-vue" label="HTML").
        &lt;splitpanes class="default-theme" horizontal :push-other-panes="false" style="height:400px"&gt;
          &lt;span&gt;1&lt;/span&gt;
          &lt;splitpanes :push-other-panes="false"&gt;
            &lt;span&gt;2&lt;/span&gt;
            &lt;span&gt;3&lt;/span&gt;
            &lt;span&gt;4&lt;/span&gt;
          &lt;/splitpanes&gt;
          &lt;span&gt;5&lt;/span&gt;
        &lt;/splitpanes&gt;

      //- Example.
      p.mt-5.subheading # Lots of splitters &amp; push other panes
      splitpanes.default-theme.example(style="height:400px")
        span(v-for="i in 8" :key="i") {{ i }}

      ssh-pre(language="html-vue" label="HTML" v-pre).
        &lt;splitpanes class="default-theme" style="height:400px"&gt;
          &lt;span v-for="i in 8" :key="i"&gt;{{ i }}&lt;/span&gt;
        &lt;/splitpanes&gt;

      //- Example.
      p.mt-5.subheading # Adding splitters on the fly
      p
        | This example shows the reactivity when you add a new element dynamically in splitpanes.
        v-btn(color="primary" small @click="panesNumber++")
          v-icon add
          | Add pane

      splitpanes.default-theme.example(style="height:400px")
        span(v-for="i in panesNumber" :key="i") {{ i }}

      ssh-pre(language="html-vue" label="HTML" v-pre).
        &lt;button @click="panesNumber++"&gt;Add pane&lt;/button&gt;

        &lt;splitpanes class="default-theme" style="height:400px"&gt;
          &lt;span v-for="i in panesNumber" :key="i"&gt;{{ i }}&lt;/span&gt;
        &lt;/splitpanes&gt;

      ssh-pre(language="js" label="Javascript" v-pre).
        // In your Vue component.
        data: () =&gt; ({
          panesNumber: 3
        })

      //- Example.
      p.mt-5.subheading # Increased reactive touch zone for touch devices
      p
        | try it yourself:
        a(href="https://codepen.io/antoniandre/pen/XxRZmB" target="_blank" class="ml-2") //codepen.io/antoniandre/pen/XxRZmB #[v-icon(small color="primary") open_in_new]

      splitpanes.touch-example(horizontal style="height:400px")
        splitpanes.touch-example
          span 1
          span 2
          span 3
        div.text
          p.
            In this example the splitters are thin lines but the reactive touch zone is spread to 30 pixels all around!
            #[em Hover a splitter to see the Fat-fingers reactive zone. ]

      ssh-pre(language="html-vue" label="HTML").
        &lt;splitpanes class="default-theme touch-example" horizontal style="height:400px"&gt;
          &lt;splitpanes :push-other-panes="false"&gt;
            &lt;span&gt;1&lt;/span&gt;
            &lt;span&gt;2&lt;/span&gt;
            &lt;span&gt;3&lt;/span&gt;
          &lt;/splitpanes&gt;
          &lt;p&gt;In this example the splitters are thin lines but the reactive touch zone is spread to 30 pixels all around!&lt;/p&gt;
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
</template>

<script>
import Splitpanes from '@/components/splitpanes'
import highlightMessage from '@/components/highlight-message'
import { simpleSyntaxHighlighter } from 'simple-syntax-highlighter'
import 'simple-syntax-highlighter/dist/simple-syntax-highlighter.min.css'

export default {
  name: 'app',
  components: { Splitpanes, sshPre: simpleSyntaxHighlighter, highlightMessage },
  data: () => ({
    panesNumber: 3
  })
}
</script>

<style lang="scss">
* {margin: 0;padding: 0;}

#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  margin-top: 60px;
}

a {
  text-decoration: none;
}

ul {
  list-style-type: none;
  padding: 0;
}

.code {
  font-family: monospace;
}

.splitpanes.example {
  .splitpanes__pane {
    box-shadow: 0 0 3px rgba(0, 0, 0, .2) inset;
    justify-content: center;
    align-items: center;
    display: flex;
  }
}

.splitpanes span {
  font-family: Helvetica, Arial, sans-serif;
  color: #fff;
  font-size: 5em;
  opacity: 0.7;
}

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
}
.touch-example.splitpanes--vertical > .splitpanes__splitter:before {left: -30px;right: -30px;height: 100%;}
.touch-example.splitpanes--horizontal > .splitpanes__splitter:before {top: -30px;bottom: -30px;width: 100%;}

.splitpanes.touch-example {
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
}
</style>
