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
              | Don't bother with verbose children syntax, it's automatic
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

      h2.mt-5.mb-2.subheading
        | # Demo - try it yourself:
        a.ml-2.d-inline-flex.align-center(href="https://codepen.io/antoniandre/pen/XybPKP" target="_blank") //codepen.io/antoniandre/pen/XybPKP
          v-icon(small color="primary") open_in_new

      splitpanes.default-theme.example.example1(style="height:400px")
        span(splitpanes-min="20") 1#[br]#[em.specs I have a min width of 20%]
        splitpanes.default-theme.example(horizontal)
          span 2
          span 3
          span 4
        span 5

      ssh-pre(language="html-vue" label="HTML Vue Template" v-pre).
        &lt;splitpanes style="height: 400px"&gt;
          &lt;span splitpanes-min="20"&gt;1&lt;/span&gt;
          &lt;splitpanes horizontal&gt;
            &lt;span&gt;2&lt;/span&gt;
            &lt;span&gt;3&lt;/span&gt;
            &lt;span&gt;4&lt;/span&gt;
          &lt;/splitpanes&gt;
          &lt;span&gt;5&lt;/span&gt;
        &lt;/splitpanes&gt;
      ssh-pre(language="css" label="CSS" v-pre).
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

      h2.mt-5.mb-2.headline
        a(href="#installation") Installation
        a(name="installation")

      p You have two options: #[em NPM] #[strong.mx-2 or] #[span.code &lt;script&gt;] tag.
      h3 Via NPM
      ssh-pre(language="shell" label="Shell") npm install splitpanes --save-dev
      p Then import the component and CSS:
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
          &lt;script src="https://unpkg.com/vue"&gt;&lt;/script&gt;
          &lt;script src="https://unpkg.com/splitpanes"&gt;&lt;/script&gt;
          &lt;link href="https://unpkg.com/splitpanes/dist/splitpanes.css" rel="stylesheet"&gt;
        &lt;/head&gt;

      h2.mt-5.mb-2
        a.headline(href="#how-to-use") How to use
        a(name="how-to-use")

      p.
        Once included in your project, use as follows.

      ssh-pre(language="html-vue" label="HTML Vue Template" v-pre).
        &lt;splitpanes class="default-theme"&gt;
          &lt;div v-for="i in 3" :key="i"&gt;{{ i }}&lt;/div&gt;
        &lt;/splitpanes&gt;

      highlight-message(type="success")
        strong.
          Have you noticed? No splitter tags and just use your own tags as you want,
          splitpanes will do the rest!#[br]
        span.
          All the direct children of the #[span.code &lt;splitpanes&gt;] tag will be
          wrapped into panes &amp; the splitters will be added automatically between them.

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
      h2.mt-5.mb-2.headline
        a(href="#more-examples") More examples
        a(name="more-examples")

      //- Example.
      h3.mb-2.subheading
        a(href="#horizontal-layout") # Horizontal layout &amp; push other panes
        a(name="horizontal-layout")
      splitpanes.default-theme.example(horizontal style="height:400px")
        span(splitpanes-min="25") 1#[br]#[em.specs I have a min height of 25%]
        span 2
        span 3

      ssh-pre(language="html-vue" label="HTML").
        &lt;splitpanes class="default-theme" horizontal style="height:400px"&gt;
          &lt;span&gt;1&lt;/span&gt;
          &lt;span&gt;2&lt;/span&gt;
          &lt;span&gt;3&lt;/span&gt;
        &lt;/splitpanes&gt;

      //- Example.
      h3.mt-5.mb-2.subheading
        a(href="#nested-splitpanes") # Mix layout with nested splitpanes &amp; prevent pushing other panes
        a(name="nested-splitpanes")
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
      h3.mt-5.mb-2.subheading
        a(href="#lots-of-splitters") # Lots of splitters &amp; push other panes - all panes have a min width of 5%
        a(name="lots-of-splitters")
      splitpanes.default-theme.example(style="height:400px")
        span(v-for="i in 8" :key="i" splitpanes-min="5") {{ i }}

      ssh-pre(language="html-vue" label="HTML" v-pre).
        &lt;splitpanes class="default-theme" style="height:400px"&gt;
          &lt;span v-for="i in 8" :key="i" splitpanes-min="5"&gt;{{ i }}&lt;/span&gt;
        &lt;/splitpanes&gt;

      //- Example.
      h3.mt-5.mb-2.subheading
        a(href="#adding-splitters-on-the-fly") # Adding splitters on the fly
        a(name="adding-splitters-on-the-fly")
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
      h3.mt-5.mb-2.subheading
        a(href="#increased-touch-zone") # Increased reactive touch zone for touch devices
        a(name="increased-touch-zone")
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

      //- Example.
      h3.mt-5.mb-2.subheading
        a(href="#do-your-own-style") # Do your own style
        a(name="do-your-own-style")
      p If you don't want to use the default style, here is how to do your own.
      p
        | try it yourself:
        a(href="https://codepen.io/antoniandre/pen/mzGZXR" target="_blank" class="ml-2") //codepen.io/antoniandre/pen/mzGZXR #[v-icon(small color="primary") open_in_new]

      splitpanes.example-own-style(horizontal style="height: 400px")
        splitpanes(vertical)
          span 1
          span 2
          span 3
        span 4

      ssh-pre(language="html-vue" label="HTML").
        &lt;splitpanes horizontal style="height:400px"&gt;
          &lt;splitpanes vertical&gt;
            &lt;span&gt;1&lt;/span&gt;
            &lt;span&gt;2&lt;/span&gt;
            &lt;span&gt;3&lt;/span&gt;
          &lt;/splitpanes&gt;
          &lt;span&gt;4&lt;/span&gt;
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
          background: linear-gradient(90deg, #6cf, #16e);
        }

        .splitpanes--horizontal > .splitpanes__splitter {
          min-height: 6px;
          background: linear-gradient(0deg, #6cf, #16e);
        }

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
$primary-color: #42b983;
$secondary-color: #78cfa8;

// General document rules.
//------------------------
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
  transition: 0.3s;

  h3 & {color: #333;font-size: 1.5em;}
  &:hover {color: $secondary-color;}
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
    position: relative;
  }
}

.splitpanes span {
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
    background: linear-gradient(90deg, #6cf, #16e);
  }

  &.splitpanes--horizontal > .splitpanes__splitter {
    min-height: 6px;
    background: linear-gradient(#6cf, #16e);
  }
}
</style>
