<template lang="pug">
  v-app.white
    v-container
      div.text-xs-center
        img(alt="Vue logo" src="./assets/logo.png" height="40")
        h1.mb-3.headline Vue Split Panes
        p.subheading A Vue JS reliable and simple panes splitter / resizer.

      v-layout(row)
        v-flex
          h2.mt-5.mb-2.title Features
          ul
            li
              v-icon.mr-2(color="primary" size="20") check
              | Nesting supported
            li
              v-icon.mr-2(color="primary" size="20") check
              | Light weight & no dependencies other than Vue JS
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
      splitpanes(style="height:400px")
        span 1
        splitpanes(horizontal)
          span 2
          span 3
          span 4
        span 5
      ssh-pre(language="html-vue" label="HTML Vue Template" v-pre).
        &lt;splitpanes style="height: 400px"&gt;
          &lt;span&gt;1&lt;/span&gt;
          &lt;splitpanes horizontal style="height: 400px"&gt;
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
        .splitpanes--vertical > .splitpanes__splitter {width: 10px;}
        .splitpanes--horizontal > .splitpanes__splitter {height: 10px;}

        .splitpanes span {
          font-family: Helvetica, Arial, sans-serif;
          color: #fff;
          font-size: 5em;
          opacity: 0.6;
        }

      p.mt-5.subheading # Demo 2
      splitpanes(horizontal style="height:400px")
        splitpanes(vertical)
          span 1
          span 2
          span 3
        span 4

      h2.mt-5.headline
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

      h2.mt-5
        a.headline(href="#how-to-use") How to use
        a(name="how-to-use")

      p.
        Once included in your project, use as follows.#[br]
        The splitters will be added automatically between all the direct children.

      highlight-message(type="tips").
        By default the layout is 'column' (vertical), if you need you can set the attribute
        #[span.code horizontal] on the #[span.code &lt;splitpanes&gt;] tag to change the layout to rows.

      ssh-pre(language="html-vue" label="HTML Vue Template" v-pre).
        &lt;splitpanes&gt;
          &lt;div v-for="i in 3" :key="i"&gt;{{ i.toString() }}&lt;/splitpanes&gt;
        &lt;/splitpanes&gt;
</template>

<script>
import Splitpanes from '@/components/splitpanes'
import highlightMessage from '@/components/highlight-message'
import { simpleSyntaxHighlighter } from 'simple-syntax-highlighter'
import 'simple-syntax-highlighter/dist/simple-syntax-highlighter.min.css'

export default {
  name: 'app',
  components: { Splitpanes, sshPre: simpleSyntaxHighlighter, highlightMessage }
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
  font-family: monospace,monospace;
}

.splitpanes {
  background-color: #f2f2f2;

  &__pane {
    box-shadow: 0 0 3px rgba(0, 0, 0, .2) inset;
    justify-content: center;
    align-items: center;
    display: flex;
  }

  &__splitter {
    background-color: #fff;
  }

  &--vertical > .splitpanes__splitter {width: 10px;}
  &--horizontal > .splitpanes__splitter {height: 10px;}

  span {
    font-family: Helvetica, Arial, sans-serif;
    color: #fff;
    font-size: 5em;
    opacity: 0.6;
  }
}
</style>
