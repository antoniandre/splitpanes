var V=Object.defineProperty,R=Object.defineProperties;var L=Object.getOwnPropertyDescriptors;var v=Object.getOwnPropertySymbols;var z=Object.prototype.hasOwnProperty,b=Object.prototype.propertyIsEnumerable;var g=(e,s,t)=>s in e?V(e,s,{enumerable:!0,configurable:!0,writable:!0,value:t}):e[s]=t,w=(e,s)=>{for(var t in s||(s={}))z.call(s,t)&&g(e,t,s[t]);if(v)for(var t of v(s))b.call(s,t)&&g(e,t,s[t]);return e},y=(e,s)=>R(e,L(s));var x=(e,s)=>{var t={};for(var n in e)z.call(e,n)&&s.indexOf(n)<0&&(t[n]=e[n]);if(e!=null&&v)for(var n of v(e))s.indexOf(n)<0&&b.call(e,n)&&(t[n]=e[n]);return t};import{V as u,W as M,r as A,R as N}from"./vendor.c1876d70.js";const D=function(){const s=document.createElement("link").relList;if(s&&s.supports&&s.supports("modulepreload"))return;for(const a of document.querySelectorAll('link[rel="modulepreload"]'))n(a);new MutationObserver(a=>{for(const i of a)if(i.type==="childList")for(const r of i.addedNodes)r.tagName==="LINK"&&r.rel==="modulepreload"&&n(r)}).observe(document,{childList:!0,subtree:!0});function t(a){const i={};return a.integrity&&(i.integrity=a.integrity),a.referrerpolicy&&(i.referrerPolicy=a.referrerpolicy),a.crossorigin==="use-credentials"?i.credentials="include":a.crossorigin==="anonymous"?i.credentials="omit":i.credentials="same-origin",i}function n(a){if(a.ep)return;a.ep=!0;const i=t(a);fetch(a.href,i)}};D();u.use(M);var H=new M({iconsLigature:"material-icons",colors:{primary:"#42b983",maintext:"#999",darktext:"#444",lightertext:"#ccc",lightgrey:"#eee"}});const I="modulepreload",C={},j="/splitpanes/",d=function(s,t){return!t||t.length===0?s():Promise.all(t.map(n=>{if(n=`${j}${n}`,n in C)return;C[n]=!0;const a=n.endsWith(".css"),i=a?'[rel="stylesheet"]':"";if(document.querySelector(`link[href="${n}"]${i}`))return;const r=document.createElement("link");if(r.rel=a?"stylesheet":I,a||(r.as="script",r.crossOrigin=""),r.href=n,document.head.appendChild(r),a)return new Promise((l,o)=>{r.addEventListener("load",l),r.addEventListener("error",o)})})).then(()=>s())};function m(e,s,t,n,a,i,r,l){var o=typeof e=="function"?e.options:e;s&&(o.render=s,o.staticRenderFns=t,o._compiled=!0),n&&(o.functional=!0),i&&(o._scopeId="data-v-"+i);var p;if(r?(p=function(c){c=c||this.$vnode&&this.$vnode.ssrContext||this.parent&&this.parent.$vnode&&this.parent.$vnode.ssrContext,!c&&typeof __VUE_SSR_CONTEXT__!="undefined"&&(c=__VUE_SSR_CONTEXT__),a&&a.call(this,c),c&&c._registeredComponents&&c._registeredComponents.add(r)},o._ssrRegister=p):a&&(p=l?function(){a.call(this,(o.functional?this.parent:this).$root.$options.shadowRoot)}:a),p)if(o.functional){o._injectStyles=p;var _=o.render;o.render=function(T,f){return p.call(f),_(T,f)}}else{var h=o.beforeCreate;o.beforeCreate=h?[].concat(h,p):[p]}return{exports:e,options:o}}const O={name:"splitpanes",props:{horizontal:{type:Boolean},pushOtherPanes:{type:Boolean,default:!0},dblClickSplitter:{type:Boolean,default:!0},rtl:{type:Boolean,default:!1},firstSplitter:{type:Boolean}},provide(){return{requestUpdate:this.requestUpdate,onPaneAdd:this.onPaneAdd,onPaneRemove:this.onPaneRemove,onPaneClick:this.onPaneClick}},data:()=>({container:null,ready:!1,panes:[],touch:{mouseDown:!1,dragging:!1,activeSplitter:null},splitterTaps:{splitter:null,timeoutId:null}}),computed:{panesCount(){return this.panes.length},indexedPanes(){return this.panes.reduce((e,s)=>(e[s.id]=s)&&e,{})}},methods:{updatePaneComponents(){this.panes.forEach(e=>{e.update&&e.update({[this.horizontal?"height":"width"]:`${this.indexedPanes[e.id].size}%`})})},bindEvents(){document.addEventListener("mousemove",this.onMouseMove,{passive:!1}),document.addEventListener("mouseup",this.onMouseUp),"ontouchstart"in window&&(document.addEventListener("touchmove",this.onMouseMove,{passive:!1}),document.addEventListener("touchend",this.onMouseUp))},unbindEvents(){document.removeEventListener("mousemove",this.onMouseMove,{passive:!1}),document.removeEventListener("mouseup",this.onMouseUp),"ontouchstart"in window&&(document.removeEventListener("touchmove",this.onMouseMove,{passive:!1}),document.removeEventListener("touchend",this.onMouseUp))},onMouseDown(e,s){this.bindEvents(),this.touch.mouseDown=!0,this.touch.activeSplitter=s},onMouseMove(e){this.touch.mouseDown&&(e.preventDefault(),this.touch.dragging=!0,this.calculatePanesSize(this.getCurrentMouseDrag(e)),this.$emit("resize",this.panes.map(s=>({min:s.min,max:s.max,size:s.size}))))},onMouseUp(){this.touch.dragging&&this.$emit("resized",this.panes.map(e=>({min:e.min,max:e.max,size:e.size}))),this.touch.mouseDown=!1,setTimeout(()=>{this.touch.dragging=!1,this.unbindEvents()},100)},onSplitterClick(e,s){"ontouchstart"in window&&(e.preventDefault(),this.dblClickSplitter&&(this.splitterTaps.splitter===s?(clearTimeout(this.splitterTaps.timeoutId),this.splitterTaps.timeoutId=null,this.onSplitterDblClick(e,s),this.splitterTaps.splitter=null):(this.splitterTaps.splitter=s,this.splitterTaps.timeoutId=setTimeout(()=>{this.splitterTaps.splitter=null},500)))),this.touch.dragging||this.$emit("splitter-click",this.panes[s])},onSplitterDblClick(e,s){let t=0;this.panes=this.panes.map((n,a)=>(n.size=a===s?n.max:n.min,a!==s&&(t+=n.min),n)),this.panes[s].size-=t,this.$emit("pane-maximize",this.panes[s])},onPaneClick(e,s){this.$emit("pane-click",this.indexedPanes[s])},getCurrentMouseDrag(e){const s=this.container.getBoundingClientRect(),{clientX:t,clientY:n}="ontouchstart"in window&&e.touches?e.touches[0]:e;return{x:t-s.left,y:n-s.top}},getCurrentDragPercentage(e){e=e[this.horizontal?"y":"x"];const s=this.container[this.horizontal?"clientHeight":"clientWidth"];return this.rtl&&!this.horizontal&&(e=s-e),e*100/s},calculatePanesSize(e){const s=this.touch.activeSplitter;let t={prevPanesSize:this.sumPrevPanesSize(s),nextPanesSize:this.sumNextPanesSize(s),prevReachedMinPanes:0,nextReachedMinPanes:0};const n=0+(this.pushOtherPanes?0:t.prevPanesSize),a=100-(this.pushOtherPanes?0:t.nextPanesSize),i=Math.max(Math.min(this.getCurrentDragPercentage(e),a),n);let r=[s,s+1],l=this.panes[r[0]]||null,o=this.panes[r[1]]||null;const p=l.max<100&&i>=l.max+t.prevPanesSize,_=o.max<100&&i<=100-(o.max+this.sumNextPanesSize(s+1));if(p||_){p?(l.size=l.max,o.size=Math.max(100-l.max-t.prevPanesSize-t.nextPanesSize,0)):(l.size=Math.max(100-o.max-t.prevPanesSize-this.sumNextPanesSize(s+1),0),o.size=o.max);return}if(this.pushOtherPanes){const h=this.doPushOtherPanes(t,i);if(!h)return;({sums:t,panesToResize:r}=h),l=this.panes[r[0]]||null,o=this.panes[r[1]]||null}l!==null&&(l.size=Math.min(Math.max(i-t.prevPanesSize-t.prevReachedMinPanes,l.min),l.max)),o!==null&&(o.size=Math.min(Math.max(100-i-t.nextPanesSize-t.nextReachedMinPanes,o.min),o.max))},doPushOtherPanes(e,s){const t=this.touch.activeSplitter,n=[t,t+1];return s<e.prevPanesSize+this.panes[n[0]].min&&(n[0]=this.findPrevExpandedPane(t).index,e.prevReachedMinPanes=0,n[0]<t&&this.panes.forEach((a,i)=>{i>n[0]&&i<=t&&(a.size=a.min,e.prevReachedMinPanes+=a.min)}),e.prevPanesSize=this.sumPrevPanesSize(n[0]),n[0]===void 0)?(e.prevReachedMinPanes=0,this.panes[0].size=this.panes[0].min,this.panes.forEach((a,i)=>{i>0&&i<=t&&(a.size=a.min,e.prevReachedMinPanes+=a.min)}),this.panes[n[1]].size=100-e.prevReachedMinPanes-this.panes[0].min-e.prevPanesSize-e.nextPanesSize,null):s>100-e.nextPanesSize-this.panes[n[1]].min&&(n[1]=this.findNextExpandedPane(t).index,e.nextReachedMinPanes=0,n[1]>t+1&&this.panes.forEach((a,i)=>{i>t&&i<n[1]&&(a.size=a.min,e.nextReachedMinPanes+=a.min)}),e.nextPanesSize=this.sumNextPanesSize(n[1]-1),n[1]===void 0)?(e.nextReachedMinPanes=0,this.panes[this.panesCount-1].size=this.panes[this.panesCount-1].min,this.panes.forEach((a,i)=>{i<this.panesCount-1&&i>=t+1&&(a.size=a.min,e.nextReachedMinPanes+=a.min)}),this.panes[n[0]].size=100-e.prevPanesSize-e.nextReachedMinPanes-this.panes[this.panesCount-1].min-e.nextPanesSize,null):{sums:e,panesToResize:n}},sumPrevPanesSize(e){return this.panes.reduce((s,t,n)=>s+(n<e?t.size:0),0)},sumNextPanesSize(e){return this.panes.reduce((s,t,n)=>s+(n>e+1?t.size:0),0)},findPrevExpandedPane(e){return[...this.panes].reverse().find(t=>t.index<e&&t.size>t.min)||{}},findNextExpandedPane(e){return this.panes.find(t=>t.index>e+1&&t.size>t.min)||{}},checkSplitpanesNodes(){Array.from(this.container.children).forEach(s=>{const t=s.classList.contains("splitpanes__pane"),n=s.classList.contains("splitpanes__splitter");if(!t&&!n){s.parentNode.removeChild(s),console.warn("Splitpanes: Only <pane> elements are allowed at the root of <splitpanes>. One of your DOM nodes was removed.");return}})},addSplitter(e,s,t=!1){const n=e-1,a=document.createElement("div");a.classList.add("splitpanes__splitter"),t||(a.onmousedown=i=>this.onMouseDown(i,n),typeof window!="undefined"&&"ontouchstart"in window&&(a.ontouchstart=i=>this.onMouseDown(i,n)),a.onclick=i=>this.onSplitterClick(i,n+1)),this.dblClickSplitter&&(a.ondblclick=i=>this.onSplitterDblClick(i,n+1)),s.parentNode.insertBefore(a,s)},removeSplitter(e){e.onmousedown=void 0,e.onclick=void 0,e.ondblclick=void 0,e.parentNode.removeChild(e)},redoSplitters(){const e=Array.from(this.container.children);e.forEach(t=>{t.className.includes("splitpanes__splitter")&&this.removeSplitter(t)});let s=0;e.forEach(t=>{t.className.includes("splitpanes__pane")&&(!s&&this.firstSplitter?this.addSplitter(s,t,!0):s&&this.addSplitter(s,t),s++)})},requestUpdate(t){var n=t,{target:e}=n,s=x(n,["target"]);const a=this.indexedPanes[e._uid];Object.entries(s).forEach(([i,r])=>a[i]=r)},onPaneAdd(e){let s=-1;Array.from(e.$el.parentNode.children).some(a=>(a.className.includes("splitpanes__pane")&&s++,a===e.$el));const t=parseFloat(e.minSize),n=parseFloat(e.maxSize);this.panes.splice(s,0,{id:e._uid,index:s,min:isNaN(t)?0:t,max:isNaN(n)?100:n,size:e.size===null?null:parseFloat(e.size),givenSize:e.size,update:e.update}),this.panes.forEach((a,i)=>a.index=i),this.ready&&this.$nextTick(()=>{this.redoSplitters(),this.resetPaneSizes({addedPane:this.panes[s]}),this.$emit("pane-add",{index:s,panes:this.panes.map(a=>({min:a.min,max:a.max,size:a.size}))})})},onPaneRemove(e){const s=this.panes.findIndex(n=>n.id===e._uid),t=this.panes.splice(s,1)[0];this.panes.forEach((n,a)=>n.index=a),this.$nextTick(()=>{this.redoSplitters(),this.resetPaneSizes({removedPane:y(w({},t),{index:s})}),this.$emit("pane-remove",{removed:t,panes:this.panes.map(n=>({min:n.min,max:n.max,size:n.size}))})})},resetPaneSizes(e={}){!e.addedPane&&!e.removedPane?this.initialPanesSizing():this.panes.some(s=>s.givenSize!==null||s.min||s.max<100)?this.equalizeAfterAddOrRemove(e):this.equalize(),this.ready&&this.$emit("resized",this.panes.map(s=>({min:s.min,max:s.max,size:s.size})))},equalize(){const e=100/this.panesCount;let s=0,t=[],n=[];this.panes.forEach(a=>{a.size=Math.max(Math.min(e,a.max),a.min),s-=a.size,a.size>=a.max&&t.push(a.id),a.size<=a.min&&n.push(a.id)}),s>.1&&this.readjustSizes(s,t,n)},initialPanesSizing(){100/this.panesCount;let e=100,s=[],t=[],n=0;this.panes.forEach(i=>{e-=i.size,i.size!==null&&n++,i.size>=i.max&&s.push(i.id),i.size<=i.min&&t.push(i.id)});let a=100;e>.1&&(this.panes.forEach(i=>{i.size===null&&(i.size=Math.max(Math.min(e/(this.panesCount-n),i.max),i.min)),a-=i.size}),a>.1&&this.readjustSizes(e,s,t))},equalizeAfterAddOrRemove({addedPane:e,removedPane:s}={}){let t=100/this.panesCount,n=0,a=[],i=[];e&&e.givenSize!==null&&(t=(100-e.givenSize)/(this.panesCount-1)),this.panes.forEach(r=>{n-=r.size,r.size>=r.max&&a.push(r.id),r.size<=r.min&&i.push(r.id)}),!(Math.abs(n)<.1)&&(this.panes.forEach(r=>{e&&e.givenSize!==null&&e.id===r.id||(r.size=Math.max(Math.min(t,r.max),r.min)),n-=r.size,r.size>=r.max&&a.push(r.id),r.size<=r.min&&i.push(r.id)}),n>.1&&this.readjustSizes(n,a,i))},readjustSizes(e,s,t){let n;e>0?n=e/(this.panesCount-s.length):n=e/(this.panesCount-t.length),this.panes.forEach((a,i)=>{if(e>0&&!s.includes(a.id)){const r=Math.max(Math.min(a.size+n,a.max),a.min);e-=r-a.size,a.size=r}else if(!t.includes(a.id)){const r=Math.max(Math.min(a.size+n,a.max),a.min);e-=r-a.size,a.size=r}a.update({[this.horizontal?"height":"width"]:`${this.indexedPanes[a.id].size}%`})}),Math.abs(e)>.1&&this.$nextTick(()=>{this.ready&&console.warn("Splitpanes: Could not resize panes correctly due to their constraints.")})}},watch:{panes:{deep:!0,immediate:!1,handler(){this.updatePaneComponents()}},horizontal(){this.updatePaneComponents()},firstSplitter(){this.redoSplitters()},dblClickSplitter(e){[...this.container.querySelectorAll(".splitpanes__splitter")].forEach((t,n)=>{t.ondblclick=e?a=>this.onSplitterDblClick(a,n):void 0})}},beforeDestroy(){this.ready=!1},mounted(){this.container=this.$refs.container,this.checkSplitpanesNodes(),this.redoSplitters(),this.resetPaneSizes(),this.$emit("ready"),this.ready=!0},render(e){return e("div",{ref:"container",class:["splitpanes",`splitpanes--${this.horizontal?"horizontal":"vertical"}`,{"splitpanes--dragging":this.touch.dragging}]},this.$slots.default)}};let F,U;const S={};var q=m(O,F,U,!1,B,null,null,null);function B(e){for(let s in S)this[s]=S[s]}var W=function(){return q.exports}(),Y=function(){var e=this,s=e.$createElement,t=e._self._c||s;return t("div",{staticClass:"splitpanes__pane",style:e.style,on:{click:function(n){return e.onPaneClick(n,e._uid)}}},[e._t("default")],2)},G=[];const J={name:"pane",inject:["requestUpdate","onPaneAdd","onPaneRemove","onPaneClick"],props:{size:{type:[Number,String],default:null},minSize:{type:[Number,String],default:0},maxSize:{type:[Number,String],default:100}},data:()=>({style:{}}),mounted(){this.onPaneAdd(this)},beforeDestroy(){this.onPaneRemove(this)},methods:{update(e){this.style=e}},computed:{sizeNumber(){return this.size||this.size===0?parseFloat(this.size):null},minSizeNumber(){return parseFloat(this.minSize)},maxSizeNumber(){return parseFloat(this.maxSize)}},watch:{sizeNumber(e){this.requestUpdate({target:this,size:e})},minSizeNumber(e){this.requestUpdate({target:this,min:e})},maxSizeNumber(e){this.requestUpdate({target:this,max:e})}}},k={};var X=m(J,Y,G,!1,K,null,null,null);function K(e){for(let s in k)this[s]=k[s]}var Z=function(){return X.exports}(),Q=function(){var e=this,s=e.$createElement,t=e._self._c||s;return t(e.tag,{tag:"component",class:"highlight highlight--"+e.type},[e.noIcon?e._e():t("w-icon",[e._v("material-icons "+e._s(e.icon))]),e._t("default")],2)},ee=[];const te={props:{tag:{type:String,default:"p"},type:{type:String,default:"info"},noIcon:{type:Boolean,default:!1}},computed:{icon(){switch(this.type){case"success":return"check";case"error":return"close";case"warning":return"priority_high";case"tips":return"wb_incandescent";case"info":default:return"priority_high"}}}},P={};var se=m(te,Q,ee,!1,ne,null,null,null);function ne(e){for(let s in P)this[s]=P[s]}var ae=function(){return se.exports}();var ie=function(){var e=this,s=e.$createElement,t=e._self._c||s;return t("div",{staticClass:"page-container"},[t("header",{staticClass:"text-center"},[t("svg",{staticClass:"mb5",attrs:{xmlns:"http://www.w3.org/2000/svg",viewBox:"0 0 1000 1000","xml:space":"preserve",width:"4em"}},[t("path",{attrs:{d:"M469 500v490h57V10h-57v490z",fill:"#42b983"}}),t("path",{attrs:{d:"m109 417-83 83 80 80 81 81 20-20 20-20-46-46-46-46h219v-58H135l48-47 49-49c0-2-9-11-20-22l-20-20-83 84z",fill:"#35495e"}}),t("path",{attrs:{d:"m789 354-21 20 11 11 46 48 35 37-109 1H641v58h219l-46 46-46 46 21 20 20 20 82-83 83-83-13-11-82-81-70-70-20 21z",fill:"#35495e"}})]),t("h1",{staticClass:"mb3 title1"},[e._v("Splitpanes")]),t("p",{staticClass:"grey"},[e._v("A Vue.js reliable, simple and touch-ready panes splitter / resizer.")])]),t("h2",{staticClass:"mt12 mb2 title2"},[e._v("Features")]),t("ul",{staticClass:"checklist"},[t("li",[t("w-icon",{staticClass:"mr2",attrs:{color:"primary",size:"20"}},[e._v("material-icons check")]),e._v("Light weight & no dependencies other than Vue JS")],1),t("li",[t("w-icon",{staticClass:"mr2",attrs:{color:"primary",size:"20"}},[e._v("material-icons check")]),e._v("Only worry about your panes, the splitters are automatic")],1),t("li",[t("w-icon",{staticClass:"mr2",attrs:{color:"primary",size:"20"}},[e._v("material-icons check")]),e._v("Nesting supported")],1),t("li",[t("w-icon",{staticClass:"mr2",attrs:{color:"primary",size:"20"}},[e._v("material-icons check")]),e._v("Fully responsive")],1),t("li",[t("w-icon",{staticClass:"mr2",attrs:{color:"primary",size:"20"}},[e._v("material-icons check")]),e._v("Support for touch devices")],1),t("li",[t("w-icon",{staticClass:"mr2",attrs:{color:"primary",size:"20"}},[e._v("material-icons check")]),e._v("Push other panes or not")],1),t("li",[t("w-icon",{staticClass:"mr2",attrs:{color:"primary",size:"20"}},[e._v("material-icons check")]),e._v("Double click a splitter to maximize pane")],1),t("li",[t("w-icon",{staticClass:"mr2",attrs:{color:"primary",size:"20"}},[e._v("material-icons check")]),e._v("Programmatically set pane width or height")],1),t("li",[t("w-icon",{staticClass:"mr2",attrs:{color:"primary",size:"20"}},[e._v("material-icons check")]),e._v("Programmatically add and remove panes")],1),t("li",[t("w-icon",{staticClass:"mr2",attrs:{color:"primary",size:"20"}},[e._v("material-icons check")]),t("strong",[e._v("Supports Vue 2 & Vue 3")])],1)]),t("h2",{staticClass:"mt12 mb4 title2"},[e._v("Github project \xA0&\xA0 important notes")]),t("w-flex",{attrs:{"align-center":"",shrink:""}},[t("w-icon",{staticClass:"ml1 mr5 lightgrey",attrs:{size:"46"}},[e._v("fab fa-github")]),t("a",{attrs:{href:"https://github.com/antoniandre/vueper-slides",target:"_blank"}},[e._v("//github.com/antoniandre/vueper-slides "),t("w-icon",{attrs:{color:"primary"}},[e._v("material-icons open_in_new")])],1)],1),t("w-flex",{staticClass:"my8",attrs:{"align-center":""}},[t("w-icon",{staticClass:"mr4",attrs:{size:"50",color:"pink-light3"}},[e._v("material-icons favorite")]),t("w-alert",{staticClass:"ma0",staticStyle:{width:"100%","max-width":"600px"},attrs:{"border-left":"",color:"pink"}},[e._v("If you like Splitpanes, you can"),t("a",{staticClass:"pink mx2",staticStyle:{"text-decoration":"underline"},attrs:{href:"https://www.paypal.me/antoniandre1",target:"_blank"}},[t("strong",[e._v("Support the project")])]),e._v("or"),t("a",{staticClass:"pink ml2",staticStyle:{"text-decoration":"underline"},attrs:{href:"https://github.com/sponsors/antoniandre",target:"_blank"}},[t("strong",[e._v("Sponsor the author")])]),e._v("!"),t("div",[e._v("Thank you so much to all the supporters! "),t("span",{staticClass:"title1 ml1"},[e._v("\u{1F64F}")])])])],1),t("w-flex",{staticClass:"mt4 mb8",attrs:{"align-center":""}},[t("svg",{staticClass:"mr4 blue-light1",staticStyle:{width:"50px",stroke:"#497ca2","stroke-width":"5px"},attrs:{viewBox:"0 0 725 477"}},[t("path",{attrs:{fill:"#497ca2",d:"M449 0c-78 5-152 39-217 82-19 13-37 26-54 40-39 1-77 15-110 34-34 21-53 60-61 99-11 52-8 108 6 159 7 23 16 46 33 63 4-4 13-4 13-11-1-5-7-8-9-14-27-48-32-108-11-159 13-32 36-63 68-77 19-9 42-7 58 6 6 7 18 4 24-2 6-4 11-10 19-10-24 25-39 60-38 95 1 15 3 31 8 45 16 36 41 69 76 89 5 2 10 6 16 7 5-2 14-5 14-12-4-9-14-12-21-18-27-23-56-48-67-82-9-29-1-60 8-88 7-15 21-32 39-29 15 1 28 13 43 8 11-5 13-17 16-27 5-17 3-38-10-51-16-18-40-23-62-25l-11-2c23-19 53-26 81-31 21-3 43-5 64-2 18 3 28 21 42 31-33 47-57 102-56 159a170 170 0 0086 149c6-1 13-7 10-14-5-11-17-16-25-25-33-30-52-75-50-121 1-29 11-58 24-84 12-25 25-52 47-71 9-8 22-13 33-7 20 8 42 14 63 13-35 27-55 70-64 113-9 44-7 91 12 133 15 37 45 68 81 85 32 16 67 24 101 27 18 1 36 2 53-4 4-1 6-7 2-9-13-6-28-4-42-6-45-5-92-16-127-45-34-28-54-71-60-114-5-47 7-97 34-137 11-15 26-31 45-34 14-1 25 12 31 23 6 12 16 24 29 28 20-10 40-26 43-50 2-17-6-34-14-49-15-25-40-43-69-48-20-5-41-2-61-6-22-21-54-24-83-24zm6 21c22 0 48 5 62 25 4 7 8 16 8 24-1 10-10 22-21 19-9-7-18-14-30-16-14-4-31-1-43 8-6 6-17 8-24 2-9-6-17-15-28-17-27-7-54 1-81 6a364 364 0 01157-51zm117 29c33 0 66 25 72 58 3 12 3 28-8 35-3 2-6 4-8 1-8-12-12-27-23-37-3-7-12-8-19-9-13-2-26 0-39-4 7-7 6-17 4-25l-3-16 24-3zm-372 92l46 2c18 2 33 16 34 34 1 7 1 17-6 21-6 0-12-4-18-6-21-8-46-14-67-3-6 2-11 9-17 5-10-4-18-14-30-12-30 1-56 21-77 42-16 17-30 37-43 56 0-39 17-80 49-104 26-22 61-30 94-34l35-1z"}})]),t("w-alert",{staticClass:"ma0",staticStyle:{width:"100%","max-width":"600px"},attrs:{"border-left":"",color:"pale-blue"}},[t("strong",[e._v("Check out my UI framework for Vue (2 & 3)!"),t("a",{staticClass:"title2 ml4",staticStyle:{width:"50px",color:"#1471b8","text-decoration":"underline"},attrs:{href:"https://antoniandre.github.io/wave-ui",target:"_blank"}},[t("strong",[e._v("Wave UI")])])])])],1),t("div",{staticClass:"title4 mt12 pt12 mb2"},[e._v("# Demo -"),t("a",{staticClass:"ml1 d-inline-flex align-center",attrs:{href:"https://codepen.io/antoniandre/pen/XybPKP",target:"_blank"}},[e._v("try it yourself on Codepen"),t("w-icon",{staticClass:"ml1",attrs:{color:"primary"}},[e._v("material-icons open_in_new")])],1)]),t("splitpanes",{staticClass:"default-theme example example1",staticStyle:{height:"400px"}},[t("pane",{attrs:{"min-size":"20"}},[t("span",[e._v("1"),t("br"),t("em",{staticClass:"specs"},[e._v("I have a min width of 20%")])])]),t("pane",[t("splitpanes",{staticClass:"default-theme example",attrs:{horizontal:""}},[t("pane",[t("span",[e._v("2")])]),t("pane",[t("span",[e._v("3")])]),t("pane",[t("span",[e._v("4")])])],1)],1),t("pane",[t("span",[e._v("5")])])],1),t("w-flex",{staticClass:"pb6",attrs:{wrap:""}},[t("ssh-pre",{staticClass:"flex mb0 mr2",attrs:{language:"html-vue",label:"HTML Vue Template"}},[e._v(`<splitpanes style="height: 400px">
  <pane min-size="20">1</pane>
  <pane>
    <splitpanes horizontal>
      <pane>2</pane>
      <pane>3</pane>
      <pane>4</pane>
    </splitpanes>
  </pane>
  <pane>5</pane>
</splitpanes>`)]),t("ssh-pre",{staticClass:"flex mb0",attrs:{language:"css",label:"CSS"}},[e._v(`.splitpanes__pane {
  display: flex;
  justify-content: center;
  align-items: center;
  font-family: Helvetica, Arial, sans-serif;
  color: rgba(255, 255, 255, 0.6);
  font-size: 5em;
}
`)])],1),e._m(0),e._m(1),t("h3",[e._v("Via NPM")]),t("ssh-pre",{attrs:{language:"shell"}},[e._v(`npm i splitpanes # For Vue 2.x.
`)]),t("ssh-pre",{attrs:{language:"shell"}},[e._v(`npm i splitpanes@next # For Vue 3.
`)]),t("p",{staticClass:"mt2"},[t("w-icon",{staticClass:"mr1"},[e._v("material-icons chevron_right")]),e._v("View and edit a working"),t("a",{staticClass:"ml2",attrs:{href:"https://codepen.io/antoniandre/pen/LYNKGWV",target:"_blank"}},[e._v("Vue 3 example on Codepen")]),e._v(".")],1),t("div",{staticClass:"mt6"},[e._v("Then import the component and CSS:")]),t("ssh-pre",{attrs:{language:"js",label:"Javascript"}},[e._v(`// In your Vue component.
import { Splitpanes, Pane } from 'splitpanes'
import 'splitpanes/dist/splitpanes.css'

export default {
  components: { Splitpanes, Pane },
  ...
}
`)]),e._m(2),e._m(3),t("ssh-pre",{attrs:{language:"html",label:"HTML"}},[e._v(`<head>
  ...
  <script src="https://unpkg.com/vue"><\/script>
  <script src="https://unpkg.com/splitpanes"><\/script>
  <link href="https://unpkg.com/splitpanes/dist/splitpanes.css" rel="stylesheet">
</head>
`)]),e._m(4),t("p",[e._v(`Once included in your project, use as follows.
`)]),t("ssh-pre",{attrs:{language:"html-vue",label:"HTML Vue Template"}},[e._v(`<splitpanes class="default-theme">
  <pane v-for="i in 3" :key="i">
    <div>`+e._s("{{ i }}")+`</div>
  </pane>
</splitpanes>
`)]),t("highlight-message",{attrs:{type:"success"}},[t("strong",[e._v("No splitter tags!"),t("br")]),t("span",[e._v("The splitters will be added automatically between the "),t("span",{staticClass:"code"},[e._v("<pane>")]),e._v(" tags.")])]),t("highlight-message",{attrs:{type:"tips"}},[e._v(`By default the layout is vertical, if you need you can set the attribute
`),t("span",{staticClass:"code"},[e._v("horizontal")]),e._v(" on the "),t("span",{staticClass:"code"},[e._v("<splitpanes>")]),e._v(` tag to change the layout to rows.
`)]),t("highlight-message",{attrs:{type:"tips"}},[e._v("The CSS is external so you can easily override or choose not to include it at all."),t("br"),e._v(`
If you want to use it, you can also optionally use the CSS class `),t("span",{staticClass:"code"},[e._v("default-theme")]),e._v(`
at the root of your splitpanes to apply the default theme like on this page.`),t("br"),e._v(`
If you want to go with your own style, you can check the `),t("a",{attrs:{href:"#do-your-own-style"}},[e._v("Do Your Own Style example")]),e._v(`.
`)]),e._m(5),e._m(6),e._m(7),e._m(8),t("p",[e._v("You can also double click a splitter to maximize the next pane! (First pane splitter will be an option soon)")]),e._m(9),t("splitpanes",{staticClass:"default-theme example",staticStyle:{height:"400px"},attrs:{horizontal:""}},[t("pane",{attrs:{"min-size":"20","max-size":"70"}},[t("span",[e._v("1"),t("br"),t("em",{staticClass:"specs"},[e._v("I have a min height of 20% & max height of 70%")])])]),t("pane",[t("span",[e._v("2")])]),t("pane",{attrs:{"max-size":"70"}},[t("span",[e._v("3"),t("br"),t("em",{staticClass:"specs"},[e._v("I have a max height of 70%")])])])],1),t("ssh-pre",{attrs:{language:"html-vue",label:"HTML"}},[e._v(`<splitpanes class="default-theme" horizontal style="height: 400px">
  <pane min-size="20" max-size="70">
    <span>1</span>
  </pane>
  <pane>
    <span>2</span>
  </pane>
  <pane max-size="70">
    <span>3</span>
  </pane>
</splitpanes>
`)]),e._m(10),e._m(11),t("splitpanes",{staticClass:"default-theme example",staticStyle:{height:"400px"},attrs:{horizontal:""}},[t("pane",{attrs:{size:"65"}},[t("span",[e._v("1")])]),t("pane",{attrs:{size:"10"}},[t("span",[e._v("2")])]),t("pane",{attrs:{size:"25"}},[t("span",[e._v("3")])])],1),t("ssh-pre",{attrs:{language:"html-vue",label:"HTML"}},[e._v(`<splitpanes class="default-theme" horizontal style="height: 400px">
  <pane size="65">
    <span>1</span>
  </pane>
  <pane size="10">
    <span>2</span>
  </pane>
  <pane size="25">
    <span>3</span>
  </pane>
</splitpanes>
`)]),e._m(12),t("p",[t("a",{attrs:{href:"https://codepen.io/antoniandre/pen/PypgKY",target:"_blank"}},[e._v("Try it yourself on Codepen"),t("w-icon",{staticClass:"ml1",attrs:{color:"primary"}},[e._v("material-icons open_in_new")])],1)]),t("splitpanes",{staticClass:"default-theme example",staticStyle:{height:"400px"},attrs:{horizontal:"","push-other-panes":!1}},[t("pane",[t("span",[e._v("1")])]),t("pane",[t("splitpanes",{attrs:{"push-other-panes":!1}},[t("pane",[t("span",[e._v("2")])]),t("pane",[t("span",[e._v("3")])]),t("pane",[t("span",[e._v("4")])])],1)],1),t("pane",[t("span",[e._v("5")])])],1),t("ssh-pre",{attrs:{language:"html-vue",label:"HTML"}},[e._v(`<splitpanes class="default-theme" horizontal :push-other-panes="false" style="height: 400px">
  <pane>
    <span>1</span>
  </pane>
  <pane>
    <splitpanes :push-other-panes="false">
      <pane>
        <span>2</span>
      </pane>
      <pane>
        <span>3</span>
      </pane>
      <pane>
        <span>4</span>
      </pane>
    </splitpanes>
  </pane>
  <pane>
    <span>5</span>
  </pane>
</splitpanes>
`)]),e._m(13),t("splitpanes",{staticClass:"default-theme example",staticStyle:{height:"400px"}},e._l(8,function(n){return t("pane",{key:n,attrs:{"min-size":5}},[t("span",[e._v(e._s(n))])])}),1),t("ssh-pre",{attrs:{language:"html-vue",label:"HTML"}},[e._v(`<splitpanes class="default-theme" style="height: 400px">
  <pane v-for="i in 8" :key="i" min-size="5">
    <span>`+e._s("{{ i }}")+`</span>
  </pane>
</splitpanes>
`)]),e._m(14),t("p",[e._v("This example shows the reactivity when you add a new element dynamically in splitpanes."),t("w-button",{staticClass:"ml2",on:{click:function(n){e.panesNumber++}}},[t("w-icon",{staticClass:"mr1"},[e._v("material-icons add")]),e._v("Add pane")],1),t("w-button",{staticClass:"ml2",on:{click:function(n){e.panesNumber--}}},[t("w-icon",{staticClass:"mr1"},[e._v("material-icons remove")]),e._v("Remove pane")],1)],1),t("splitpanes",{staticClass:"default-theme example",staticStyle:{height:"400px"}},e._l(e.panesNumberAbs,function(n){return t("pane",{key:n},[t("span",[e._v(e._s(n))])])}),1),t("ssh-pre",{attrs:{language:"html-vue",label:"HTML"}},[e._v(`<button @click="panesNumber++">Add pane</button>
<button @click="panesNumber--">Remove pane</button>

<splitpanes class="default-theme" style="height: 400px">
  <pane v-for="i in panesNumber" :key="i">
    <span>`+e._s("{{ i }}")+`</span>
  </pane>
</splitpanes>
`)]),t("ssh-pre",{attrs:{language:"js",label:"Javascript"}},[e._v(`// In your Vue component.
data: () => ({
  panesNumber: 3
})
`)]),e._m(15),t("p",[e._v("When changing direction, all the panes current width or height will flip to adapt to the new layout.")]),e._m(16),t("w-button",{staticClass:"mr2 mb2",on:{click:function(n){e.horizontal=!e.horizontal}}},[t("w-icon",{staticClass:"ml-n1 mr1"},[e._v("material-icons "+e._s(e.horizontal?"view_column":"view_stream"))]),e._v("Switch to "+e._s(e.horizontal?"Vertical":"Horizontal"))],1),t("w-button",{staticClass:"mr2 mb2",on:{click:function(n){e.firstSplitter=!e.firstSplitter}}},[t("w-icon",{staticClass:"ml-n1 mr1"},[e._v("material-icons "+e._s(e.firstSplitter?"close":"add"))]),e._v(e._s(e.firstSplitter?"Hide":"Show")+" First Splitter")],1),t("splitpanes",{staticClass:"default-theme example",staticStyle:{height:"400px"},attrs:{horizontal:e.horizontal,"first-splitter":e.firstSplitter}},e._l(3,function(n){return t("pane",{key:n},[t("span",[e._v(e._s(n))])])}),1),t("ssh-pre",{attrs:{language:"html-vue",label:"HTML"}},[e._v('<button @click="horizontal = !horizontal">Switch to '+e._s("{{ horizontal ? 'Vertical' : 'Horizontal' }}")+`</button>
<button @click="firstSplitter = !firstSplitter">`+e._s("{{ firstSplitter ? 'Hide' : 'Show' }}")+` First Splitter</button>

<splitpanes class="default-theme" :horizontal="horizontal" :first-splitter="firstSplitter" style="height: 400px">
  <pane v-for="i in 3" :key="i">
    <span>`+e._s("{{ i }}")+`%</span>
  </pane>
</splitpanes>
`)]),t("ssh-pre",{attrs:{language:"js",label:"Javascript"}},[e._v(`data: () => ({
  horizontal: false
  firstSplitter: false
})
`)]),e._m(17),t("p",{staticClass:"mb6"},[e._v("This example shows the programmatic way of resizing panes. And how it works both ways.")]),t("w-slider",{staticClass:"mt12 mb10",attrs:{"track-color":"grey-light2",label:"First pane size","thumb-label":"always","thumb-size":"25",min:0,max:100},model:{value:e.paneSize,callback:function(n){e.paneSize=n},expression:"paneSize"}}),t("splitpanes",{staticClass:"default-theme example",staticStyle:{height:"400px"},on:{resize:function(n){e.paneSize=n[0].size}}},[t("pane",{attrs:{size:e.paneSize}},[t("span",[e._v(e._s(e.paneSize)+"%")])]),t("pane",{attrs:{size:100-e.paneSize}},[t("span",[e._v(e._s(100-e.paneSize)+"%")])])],1),t("ssh-pre",{attrs:{language:"html-vue",label:"HTML"}},[e._v(`<w-slider v-model="paneSize" label="First pane size" :min="0" :max="100">
<splitpanes class="default-theme" @resize="paneSize = $event[0].size" style="height: 400px">
  <pane :size="paneSize">
    <span>`+e._s("{{ paneSize }}")+`%</span>
  </pane>
  <pane :size="100 - paneSize">
    <span>`+e._s("{{ 100 - paneSize }}")+`%</span>
  </pane>
</splitpanes>
`)]),t("ssh-pre",{attrs:{language:"js",label:"Javascript"}},[e._v(`// In your Vue component.
data: () => ({
  paneSize: 50
})
`)]),e._m(18),t("p",[e._v("This example shows the reactivity when you modify anything in your component inside splitpanes."),t("br"),t("w-button",{staticClass:"mt2 mr2",on:{click:e.generateRandomNumber}},[t("w-icon",{staticClass:"mr1",attrs:{size:"20"}},[e._v("material-icons sync")]),e._v("Generate 3 random numbers")],1),t("w-button",{staticClass:"mt2",on:{click:function(n){return e.incrementNumber(3)}}},[t("w-icon",{staticClass:"mr1",attrs:{size:"20"}},[e._v("material-icons add")]),e._v("Increment pane #3")],1)],1),t("splitpanes",{staticClass:"default-theme example",staticStyle:{height:"400px"},attrs:{horizontal:""}},[t("pane",[t("splitpanes",e._l(3,function(n){return t("pane",{key:n,staticClass:"w-flex column text-center"},[t("span",[e._v(e._s(n)),t("br")]),t("em",[e._v("Number is: "+e._s(e.randomNums[n])),t("br")]),n===2?t("em",[e._v("Number on the left is: "+e._s(e.randomNums[1])),t("br"),e._v(`
Number on the right is: `+e._s(e.randomNums[3])),t("br")]):e._e(),n!==2?t("w-button",{staticClass:"align-center",staticStyle:{"min-width":"0"},on:{click:function(a){e.randomNums[n]=e.randomNums[n]+1}}},[t("w-icon",{attrs:{size:"20"}},[e._v("material-icons add")]),e._v("1")],1):e._e()],1)}),1)],1),t("pane",{staticClass:"w-flex column text-center"},[t("span",[e._v("4"),t("br")]),t("em",[e._v("- Nested splitpanes -"),t("br"),e._v(`
[`+e._s(e.randomNums[1])+", "+e._s(e.randomNums[2])+", "+e._s(e.randomNums[3])+`]
`)])])],1),t("ssh-pre",{attrs:{language:"html-vue",label:"HTML"}},[e._v(`<button @click="generateRandomNumber">Generate 3 random numbers</button>
<button @click="incrementNumber(3)">Increment pane #3</button>

<splitpanes horizontal class="default-theme" style="height: 400px">
  <pane>
    <splitpanes>
      <pane v-for="i in 3" :key="i">
        <span>`+e._s("{{ i }}")+`</span><br>
        <em>Number is: `+e._s("{{ randomNums[i] }}")+`</em><br>
        <em v-if="i === 2">
          Number on the left is: `+e._s("{{ randomNums[1] }}")+`<br>
          Number on the right is: `+e._s("{{ randomNums[3] }}")+`<br>
        </em>
        <button(v-if="i !== 2" @click="randomNums[i] = randomNums[i] + 1">+1</button>
      </pane>
    </splitpanes>
  </pane>
  <pane>
    <span>4</span><br>
    <em>
      - Nested splitpanes -<br>
      [`+e._s("{{ randomNums[1] }}")+", "+e._s("{{ randomNums[2] }}")+", "+e._s("{{ randomNums[1] }}")+`]
    </em>
  </pane>
</splitpanes>
`)]),t("ssh-pre",{attrs:{language:"js",label:"Javascript"}},[e._v(`// In your Vue component.
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
`)]),e._m(19),t("w-button",{staticClass:"mb2",on:{click:function(n){e.hidePane2=!e.hidePane2}}},[t("w-icon",{staticClass:"mr2"},[e._v("material-icons "+e._s(e.hidePane2?"visibility":"visibility_off"))]),e._v(e._s(e.hidePane2?"Show":"Hide")+" Pane 2")],1),t("splitpanes",{staticClass:"default-theme example",staticStyle:{height:"400px"}},[t("pane",[t("span",[e._v("1")])]),e.hidePane2?e._e():t("pane",{staticClass:"green-light5"},[t("span",[e._v("2")])]),t("pane",[t("span",[e._v("3")])])],1),t("ssh-pre",{attrs:{language:"html-vue",label:"HTML"}},[e._v('<button @click="hidePane2 = !hidePane2">'+e._s("{{ hidePane2 ? 'Show' : 'Hide' }}")+` Pane 2</button>
<splitpanes class="default-theme" style="height: 400px">
  <pane>
    <span>1</span>
  </pane>
  <pane v-if="!hidePane2">
    <span>2</span>
  </pane>
  <pane>
    <span>3</span>
  </pane>
</splitpanes>
`)]),e._m(20),e._m(21),t("w-button",{staticClass:"example-vue-router my1 mr1",attrs:{route:"example-home-view"}},[e._v("Home view")]),t("w-button",{staticClass:"example-vue-router my1",attrs:{route:"example-another-view"}},[e._v("Another view")]),t("splitpanes",{staticClass:"default-theme example-vue-router mt2",staticStyle:{height:"400px"}},[t("pane",{staticClass:"w-flex column fill-height",attrs:{"min-size":"20"}},[t("div",{staticClass:"flex pa2"},[t("p",{staticClass:"title1"},[e._v("Navigation")]),t("ul",[t("li",[t("router-link",{attrs:{to:"example-home-view"}},[e._v("Home view")])],1),t("li",[t("router-link",{attrs:{to:"example-another-view"}},[e._v("Another view")])],1)])]),t("em",{staticClass:"ma-auto grey"},[e._v("I have a min width of 20%")])]),t("pane",{staticClass:"w-flex column fill-height"},[t("em",{staticClass:"d-flex justify-center grey code pa2"},[e._v("router-view")]),t("router-view",{staticClass:"flex"})],1),t("pane",{staticClass:"w-flex align-center justify-center"},[t("span",{staticClass:"ma-auto"},[e._v("3"),t("br")])])],1),t("ssh-pre",{attrs:{language:"html-vue",label:"HTML"}},[e._v(`<button to="home-view">Home view</button>
<button to="another-view">Another view</button>

<splitpanes horizontal class="default-theme" style="height: 400px">
  <pane min-size="20">
    <p>Navigation</p>
    <ul>
      <li><router-link to="home-view">Home view</li>
      <li><router-link to="another-view">Another view</li>
    </ul>
  </pane>
  <pane>
    <em>router-view</em>
    <router-view />
  </pane>
  <pane>
    <span>3</span>
  </pane>
</splitpanes>
`)]),t("ssh-pre",{attrs:{language:"js",label:"router.js"}},[e._v(`// Vue Router routes.
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
`)]),t("ssh-pre",{attrs:{language:"html-vue",label:"home-view.vue"}},[e._v(`<template>
  <div class="green">
    <div>This is home</div>
  </div>
</template>
`)]),e._m(22),t("p",[e._v("Here is the list of events that are emitted from splitpanes:")]),e._m(23),t("p",{staticClass:"mt4"},[e._v("Try resizing panes and check the logs bellow.")]),t("splitpanes",{staticClass:"default-theme example",staticStyle:{height:"400px"},on:{resize:function(n){return e.log("resize",n)},resized:function(n){return e.log("resized",n)},"pane-maximize":function(n){return e.log("pane-maximize",n)},"pane-click":function(n){return e.log("pane-click",n)},ready:function(n){return e.log("ready",n)},"splitter-click":function(n){return e.log("splitter-click",n)}}},e._l(3,function(n){return t("pane",{key:n,attrs:{"min-size":10}},[t("span",[e._v(e._s(n))])])}),1),t("pre",{staticClass:"ssh-pre logs-box",attrs:{"data-label":"Logs"}},[e._m(24),e._l(e.logs,function(n,a){return t("div",{key:a},[t("strong",[e._v(e._s(n.name)+":\xA0")]),t("span",[e._v(e._s(n.params))])])})],2),t("ssh-pre",{attrs:{language:"html-vue",label:"HTML"}},[e._v(`<splitpanes
  class="default-theme"
  @resize="log('resize', $event)"
  @resized="log('resized', $event)"
  @pane-maximize="log('pane-maximize', $event)"
  @pane-click="log('pane-click', $event)"
  @ready="log('ready', $event)"
  @splitter-click="log('splitter-click', $event)"
  style="height: 400px">
  <pane v-for="i in 3" :key="i" min-size="10">
    <span>`+e._s("{{ i }}")+`</span>
  </pane>
</splitpanes>
`)]),e._m(25),t("p",[t("a",{attrs:{href:"https://codepen.io/antoniandre/pen/XxRZmB",target:"_blank"}},[e._v("Try it yourself on Codepen"),t("w-icon",{staticClass:"ml1",attrs:{color:"primary"}},[e._v("material-icons open_in_new")])],1)]),t("splitpanes",{staticClass:"touch-example",staticStyle:{height:"400px"},attrs:{horizontal:""}},[t("pane",[t("splitpanes",{staticClass:"touch-example"},[t("pane",[t("span",[e._v("1")])]),t("pane",[t("span",[e._v("2")])]),t("pane",[t("span",[e._v("3")])])],1)],1),t("pane",[t("div",{staticClass:"text"},[t("p",[e._v(`In this example the splitters are thin lines but the reactive touch zone is spread to 30 pixels all around!
`),t("em",[e._v("Hover a splitter to see the enlarged fat-finger-proof reactive zone.")])])])])],1),t("ssh-pre",{attrs:{language:"html-vue",label:"HTML"}},[e._v(`<splitpanes horizontal style="height: 400px">
  <pane>
    <splitpanes>
      <pane>
        <span>1</span>
      </pane>
      <pane>
        <span>2</span>
      </pane>
      <pane>
        <span>3</span>
      </pane>
    </splitpanes>
  </pane>
  <pane>
    <p>In this example the splitters are thin lines but the reactive touch zone is spread to 30 pixels all around!</p>
  </pane>
</splitpanes>
`)]),t("ssh-pre",{attrs:{language:"css",label:"CSS"}},[e._v(`.splitpanes {background-color: #f8f8f8;}

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
.splitpanes--vertical > .splitpanes__splitter:before {left: -30px;right: -30px;height: 100%;}
.splitpanes--horizontal > .splitpanes__splitter:before {top: -30px;bottom: -30px;width: 100%;}
`)]),e._m(26),t("p",[e._v("If you don't want to use the default style, here is how to do your own.")]),t("p",[t("a",{attrs:{href:"https://codepen.io/antoniandre/pen/mzGZXR",target:"_blank"}},[e._v("Try it yourself on Codepen"),t("w-icon",{staticClass:"ml1",attrs:{color:"primary"}},[e._v("material-icons open_in_new")])],1)]),t("splitpanes",{staticClass:"example-own-style",staticStyle:{height:"400px"},attrs:{horizontal:""}},[t("pane",[t("splitpanes",[t("pane",[t("span",[e._v("1")])]),t("pane",[t("span",[e._v("2")])]),t("pane",[t("span",[e._v("3")])])],1)],1),t("pane",[t("span",[e._v("4")])])],1),t("ssh-pre",{attrs:{language:"html-vue",label:"HTML"}},[e._v(`<splitpanes horizontal style="height: 400px">
  <pane>
    <splitpanes vertical>
      <pane>
        <span>1</span>
      </pane>
      <pane>
        <span>2</span>
      </pane>
      <pane>
        <span>3</span>
      </pane>
    </splitpanes>
  </pane>
  <pane>
    <span>4</span>
  </pane>
</splitpanes>
`)]),t("ssh-pre",{attrs:{language:"css",label:"CSS"}},[e._v(`.splitpanes {
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
`)]),e._m(27),t("p",[e._v("Here is the list of all the props.")]),e._m(28),e._m(29),e._m(30),e._m(31),e._m(32),e._m(33),e._m(34),t("div",{staticClass:"mt4"},[t("strong",[e._v("Version 2.0.0")]),e._v(" Fix reactivity issues."),t("highlight-message",{attrs:{type:"success"}},[t("ul",[t("li",[t("strong",[e._v("Children now must be wrapped into a "),t("span",{staticClass:"code"},[e._v("`pane`")]),e._v(" component.")])]),t("li",[e._v("The attribute "),t("span",{staticClass:"code"},[e._v("`splitpanes-size`")]),e._v(" is now replaced with "),t("span",{staticClass:"code"},[e._v("`size`")]),e._v(" on the "),t("span",{staticClass:"code"},[e._v("`pane`")]),e._v(" component.")]),t("li",[e._v("you can still add CSS classes on the "),t("span",{staticClass:"code"},[e._v("`pane`")]),e._v(" component tag.")])])])],1),e._m(35),e._m(36),e._m(37),e._m(38),e._m(39),t("div",[t("strong",[e._v("Version 1.9.0")]),e._v(" Emit event on resize & watch slots optional"),t("highlight-message",{attrs:{type:"success"}},[t("strong",[e._v("The "),t("span",{staticClass:"code"},[e._v("`resize`")]),e._v(" event - previously firing after resize end - is now firing on resize."),t("br"),e._v(`
A new `),t("span",{staticClass:"code"},[e._v("`resized`")]),e._v(` event is emitted on resize end. Check out the
`),t("a",{attrs:{href:"#emitted-events"}},[e._v("Listening to emitted events")]),e._v(" example.")])]),t("highlight-message",{attrs:{type:"success"}},[t("strong",[e._v("By default and for performance, the reactivity is now limited to slot deletion and slot creation."),t("br"),e._v(`
With the option `),t("span",{staticClass:"code"},[e._v("`watchSlots`")]),e._v(" you can also track any change on the slots."),t("br")])])],1),e._m(40),e._m(41),e._m(42),e._m(43),e._m(44),e._m(45),e._m(46),e._m(47),e._m(48)],1)},re=[function(){var e=this,s=e.$createElement,t=e._self._c||s;return t("h2",{staticClass:"mt12 mb2"},[t("a",{attrs:{href:"#installation"}},[e._v("Installation")]),t("a",{attrs:{name:"installation"}})])},function(){var e=this,s=e.$createElement,t=e._self._c||s;return t("p",[e._v("You have two options: "),t("em",[e._v("NPM")]),e._v(" "),t("strong",{staticClass:"mx1"},[e._v("or")]),e._v(" "),t("span",{staticClass:"code"},[e._v("<script>")]),e._v(" tag.")])},function(){var e=this,s=e.$createElement,t=e._self._c||s;return t("h3",{staticClass:"mt12"},[e._v("Via "),t("span",{staticClass:"code"},[e._v("<script>")]),e._v(" tag")])},function(){var e=this,s=e.$createElement,t=e._self._c||s;return t("p",[e._v("Include the Splitpanes script in your document "),t("span",{staticClass:"code"},[e._v("<head>")]),e._v(" as follows:")])},function(){var e=this,s=e.$createElement,t=e._self._c||s;return t("h2",{staticClass:"mt12 mb2"},[t("a",{attrs:{href:"#how-to-use"}},[e._v("How to use")]),t("a",{attrs:{name:"how-to-use"}})])},function(){var e=this,s=e.$createElement,t=e._self._c||s;return t("h2",{staticClass:"mt12 mb2"},[t("a",{attrs:{href:"#more-examples"}},[e._v("More examples")]),t("a",{attrs:{name:"more-examples"}})])},function(){var e=this,s=e.$createElement,t=e._self._c||s;return t("h3",{staticClass:"mt8 mb2"},[t("a",{attrs:{href:"#vue-3"}},[e._v("Vue 3")]),t("a",{attrs:{name:"vue-3"}})])},function(){var e=this,s=e.$createElement,t=e._self._c||s;return t("p",[e._v("View and edit a working"),t("a",{attrs:{href:"https://codepen.io/antoniandre/pen/LYNKGWV",target:"_blank"}},[e._v(" Vue 3 example on Codepen")])])},function(){var e=this,s=e.$createElement,t=e._self._c||s;return t("h3",{staticClass:"mt10 mb2"},[t("a",{attrs:{href:"#horizontal-layout"}},[e._v("Horizontal layout, push other panes, min & max use")]),t("a",{attrs:{name:"horizontal-layout"}})])},function(){var e=this,s=e.$createElement,t=e._self._c||s;return t("p",[e._v("If you want to disable the 'double click splitter to maximize' behavior, you can add this attribute: "),t("span",{staticClass:"code"},[e._v(':dbl-click-splitter="false"')]),e._v(".")])},function(){var e=this,s=e.$createElement,t=e._self._c||s;return t("h3",{staticClass:"mt12 pt8 mb2"},[t("a",{attrs:{href:"#default-pane-width"}},[e._v("Default pane width or height")]),t("a",{attrs:{name:"default-pane-width"}})])},function(){var e=this,s=e.$createElement,t=e._self._c||s;return t("p",[e._v("Provide dimension of your panes when they first load (will be used for the width or height respectively for the vertical or horizontal layout)."),t("br"),t("strong",[e._v("If you provide a default width or height, make sure you provide it for all the panes and the total equals 100%."),t("br"),e._v(`
If a pane is missing a default width or height, then all the panes will have the same width or height.`),t("br")]),e._v("Note that setting a default value is different than setting a min or max value.")])},function(){var e=this,s=e.$createElement,t=e._self._c||s;return t("h3",{staticClass:"mt12 pt8 mb2"},[t("a",{attrs:{href:"#nested-splitpanes"}},[e._v("Mix layout with nested splitpanes & prevent pushing other panes")]),t("a",{attrs:{name:"nested-splitpanes"}})])},function(){var e=this,s=e.$createElement,t=e._self._c||s;return t("h3",{staticClass:"mt12 pt8 mb2"},[t("a",{attrs:{href:"#lots-of-splitters"}},[e._v("Lots of splitters & push other panes - all panes have a min width of 5%")]),t("a",{attrs:{name:"lots-of-splitters"}})])},function(){var e=this,s=e.$createElement,t=e._self._c||s;return t("h3",{staticClass:"mt12 pt8 mb2"},[t("a",{attrs:{href:"#adding-splitters-on-the-fly"}},[e._v("Adding splitters on the fly")]),t("a",{attrs:{name:"adding-splitters-on-the-fly"}})])},function(){var e=this,s=e.$createElement,t=e._self._c||s;return t("h3",{staticClass:"mt12 pt8 mb2"},[t("a",{attrs:{href:"#change-direction"}},[e._v("Change direction & first splitter")]),t("a",{attrs:{name:"change-direction"}})])},function(){var e=this,s=e.$createElement,t=e._self._c||s;return t("p",[e._v("Showing the first splitter is an option which allows user to double click the splitter to maximize the next pane."),t("br"),e._v(`
The first splitter does not allow to resize the next pane.
`)])},function(){var e=this,s=e.$createElement,t=e._self._c||s;return t("h3",{staticClass:"mt12 pt8 mb2"},[t("a",{attrs:{href:"#programmatic-resizing"}},[e._v("Programmatic resizing")]),t("a",{attrs:{name:"programmatic-resizing"}})])},function(){var e=this,s=e.$createElement,t=e._self._c||s;return t("h3",{staticClass:"mt12 pt8 mb2"},[t("a",{attrs:{href:"#in-depth-reactivity"}},[e._v("In-depth reactivity")]),t("a",{attrs:{name:"in-depth-reactivity"}})])},function(){var e=this,s=e.$createElement,t=e._self._c||s;return t("h3",{staticClass:"mt12 pt8 mb2"},[t("a",{attrs:{href:"#toggle-a-pane-with-v-if"}},[e._v("Toggle a pane with "),t("span",{staticClass:"code"},[e._v("v-if")])]),t("a",{attrs:{name:"toggle-a-pane-with-v-if"}})])},function(){var e=this,s=e.$createElement,t=e._self._c||s;return t("h3",{staticClass:"mt12 pt8 mb2"},[t("a",{attrs:{href:"#vue-router"}},[e._v("Vue Router inside splitpanes")]),t("a",{attrs:{name:"vue-router"}})])},function(){var e=this,s=e.$createElement,t=e._self._c||s;return t("p",{staticClass:"mb1"},[e._v("This is another reactivity example of a rather common case: Vue Router inside splitpanes."),t("br"),e._v(`
The navigation is in the left pane, but you can also access from outside of splitpanes, through those buttons:`)])},function(){var e=this,s=e.$createElement,t=e._self._c||s;return t("h3",{staticClass:"mt12 pt8 mb2"},[t("a",{attrs:{href:"#emitted-events"}},[e._v("Listening to emitted events")]),t("a",{attrs:{name:"emitted-events"}})])},function(){var e=this,s=e.$createElement,t=e._self._c||s;return t("ul",[t("li",[t("code",{staticClass:"mr2"},[e._v("ready")]),e._v(" has no parameter and fires when splitpanes is ready")]),t("li",[t("code",{staticClass:"mr2"},[e._v("resize")]),e._v(" returns an array of all the panes objects with their dimensions, and fires while resizing (on mousemove/touchmove)")]),t("li",[t("code",{staticClass:"mr2"},[e._v("resized")]),e._v(" returns an array of all the panes objects with their dimensions, and fires once when the resizing stops after user drag (on mouseup/touchend)."),t("br"),e._v(`
This event is also fired after the internal resizing of panes that occurs after adding or removing a pane.`)]),t("li",[t("code",{staticClass:"mr2"},[e._v("pane-click")]),e._v(" returns the clicked pane object with its dimensions.")]),t("li",[t("code",{staticClass:"mr2"},[e._v("pane-maximize")]),e._v(" returns the maximized pane object with its dimensions.")]),t("li",[t("code",{staticClass:"mr2"},[e._v("pane-add")]),e._v(" returns an object containing the index of the added pane and the new array of panes after resize.")]),t("li",[t("code",{staticClass:"mr2"},[e._v("pane-remove")]),e._v(" returns an object containing the removed pane and an array of all the remaining panes objects with their dimensions after resize.")]),t("li",[t("code",{staticClass:"mr2"},[e._v("splitter-click")]),e._v(" returns the next pane object (with its dimensions) directly after the clicked splitter."),t("br"),e._v(`
This event is only emitted if dragging did not occur between mousedown and mouseup.`)])])},function(){var e=this,s=e.$createElement,t=e._self._c||s;return t("div",{staticClass:"grey"},[e._v("//\xA0"),t("strong",[e._v("Event name:\xA0")]),t("span",[e._v("Event params \xA0 (Last event on top)")])])},function(){var e=this,s=e.$createElement,t=e._self._c||s;return t("h3",{staticClass:"mt12 pt8 mb2"},[t("a",{attrs:{href:"#increased-touch-zone"}},[e._v("Increased reactive touch zone for touch devices")]),t("a",{attrs:{name:"increased-touch-zone"}})])},function(){var e=this,s=e.$createElement,t=e._self._c||s;return t("h3",{staticClass:"mt12 pt8 mb2"},[t("a",{attrs:{href:"#do-your-own-style"}},[e._v("Do your own style")]),t("a",{attrs:{name:"do-your-own-style"}})])},function(){var e=this,s=e.$createElement,t=e._self._c||s;return t("h2",{staticClass:"mt12 pt12 mb2"},[t("a",{attrs:{href:"#api"}},[e._v("API")]),t("a",{attrs:{name:"api"}})])},function(){var e=this,s=e.$createElement,t=e._self._c||s;return t("ul",[t("li",[t("code",[e._v("horizontal")]),t("span",{staticClass:"code ml2"},[e._v("Default: false")]),t("p",[e._v("The orientation of the panes splitting."),t("br"),e._v(`
Vertical by default, meaning the splitters are vertical, but you can resize horizontally`)])]),t("li",[t("code",[e._v("push-other-panes")]),t("span",{staticClass:"code ml2"},[e._v("Default: true")]),t("p",[e._v("Whether it should push the next splitter when dragging a splitter until it reached another one.")])]),t("li",[t("code",[e._v("dbl-click-splitter")]),t("span",{staticClass:"code ml2"},[e._v("Default: true")]),t("p",[e._v("Double click on splitter to maximize the next pane.")])]),t("li",[t("code",[e._v("rtl")]),t("span",{staticClass:"code ml2"},[e._v("Default: false")]),t("p",[e._v("Supports Right to left direction.")])]),t("li",[t("code",[e._v("first-splitter")]),t("span",{staticClass:"code ml2"},[e._v("Default: false")]),t("p",[e._v("Displays the first splitter when set to true. This allows maximizing the first pane on splitter double click.")])])])},function(){var e=this,s=e.$createElement,t=e._self._c||s;return t("h2",{staticClass:"mt12 pt12 mb2"},[t("a",{attrs:{href:"#release-notes"}},[e._v("Release Notes")]),t("a",{attrs:{name:"release-notes"}})])},function(){var e=this,s=e.$createElement,t=e._self._c||s;return t("div",[t("strong",[e._v("Version 2.3.5")]),e._v(" Prevent splitter double taps on touch devices if "),t("span",{staticClass:"code"},[e._v("`dblClickSplitter`")]),e._v(" is set to false.")])},function(){var e=this,s=e.$createElement,t=e._self._c||s;return t("div",[t("strong",[e._v("Version 2.3.4")]),e._v(" Fix removing pane DOM nodes in IE11")])},function(){var e=this,s=e.$createElement,t=e._self._c||s;return t("div",[t("strong",[e._v("Version 2.3.1")]),e._v(" Fix firing "),t("span",{staticClass:"code"},[e._v("`pane-click`")]),e._v(" event on pane click")])},function(){var e=this,s=e.$createElement,t=e._self._c||s;return t("div",[t("strong",[e._v("Version 2.3.0")]),e._v(" Support rtl direction")])},function(){var e=this,s=e.$createElement,t=e._self._c||s;return t("div",[t("strong",[e._v("Version 2.2.0")]),t("ul",[t("li",[e._v("Added the "),t("span",{staticClass:"code"},[e._v("`firstSplitter`")]),e._v(" option, disabled by default. ref: "),t("a",{attrs:{href:"#change-direction"}},[e._v("Change direction & first splitter")])]),t("li",[e._v("Adapt panes width and height after direction change. ref: "),t("a",{attrs:{href:"#change-direction"}},[e._v("Change direction & first splitter")])]),t("li",[e._v("Emit a "),t("span",{staticClass:"code"},[e._v("`resized`")]),e._v(" event after pane was added/removed")]),t("li",[e._v("Emit a "),t("span",{staticClass:"code"},[e._v("`pane-add`")]),e._v(" event after pane was added")]),t("li",[e._v("Emit a "),t("span",{staticClass:"code"},[e._v("`pane-remove`")]),e._v(" event after pane was removed")]),t("li",[e._v("Support "),t("span",{staticClass:"code"},[e._v("`v-if`")]),e._v(" on a Pane and allow inserting a Pane at any position between others. ref: "),t("a",{attrs:{href:"#toggle-a-pane-with-v-if"}},[e._v("Toggle a pane with v-if")])])])])},function(){var e=this,s=e.$createElement,t=e._self._c||s;return t("div",[t("strong",[e._v("Version 1.14.0")]),e._v(" Programmatically set pane size")])},function(){var e=this,s=e.$createElement,t=e._self._c||s;return t("div",[t("strong",[e._v("Version 1.13.0")]),e._v(" Emit event on splitter click")])},function(){var e=this,s=e.$createElement,t=e._self._c||s;return t("div",[t("strong",[e._v("Version 1.12.0")]),e._v(" double click splitter to maximize is now an option")])},function(){var e=this,s=e.$createElement,t=e._self._c||s;return t("div",[t("strong",[e._v("Version 1.11.0")]),e._v(" Persist panes size after slots changed")])},function(){var e=this,s=e.$createElement,t=e._self._c||s;return t("div",[t("strong",[e._v("Version 1.10.0")]),e._v(" Add maximum size feature on panes")])},function(){var e=this,s=e.$createElement,t=e._self._c||s;return t("div",[t("strong",[e._v("Version 1.8.0")]),e._v(" Watch slots")])},function(){var e=this,s=e.$createElement,t=e._self._c||s;return t("div",[t("strong",[e._v("Version 1.7.0")]),e._v(" Double click splitter to maximize next pane")])},function(){var e=this,s=e.$createElement,t=e._self._c||s;return t("div",[t("strong",[e._v("Version 1.6.0")]),e._v(" Emit events")])},function(){var e=this,s=e.$createElement,t=e._self._c||s;return t("div",[t("strong",[e._v("Version 1.5.0")]),e._v(" Add default size feature on panes")])},function(){var e=this,s=e.$createElement,t=e._self._c||s;return t("div",[t("strong",[e._v("Version 1.4.0")]),e._v(" Add minimum size feature on panes")])},function(){var e=this,s=e.$createElement,t=e._self._c||s;return t("div",[t("strong",[e._v("Version 1.3.0")]),e._v(" Splitpanes slots are now reactive (add/remove on the fly)")])},function(){var e=this,s=e.$createElement,t=e._self._c||s;return t("div",[t("strong",[e._v("Version 1.2.0")]),e._v(" Add a `default-theme` CSS class to load default theme")])},function(){var e=this,s=e.$createElement,t=e._self._c||s;return t("div",[t("strong",[e._v("Version 1.1.0")]),e._v(" Allow pushing other panes while dragging splitter")])},function(){var e=this,s=e.$createElement,t=e._self._c||s;return t("div",[t("strong",[e._v("Version 1.0.0")]),e._v(" First public release")])}];const oe={name:"app",components:{Splitpanes:W,Pane:Z,SshPre:A,HighlightMessage:ae},data:()=>({panesNumber:3,logs:[],randomNums:{1:0,2:0,3:0},paneSize:50,hidePane2:!1,horizontal:!1,firstSplitter:!1}),methods:{log(e,s){this.logs.unshift({name:e,params:JSON.stringify(s)})},generateRandomNumber(){this.randomNums=Object.assign(this.randomNums,{1:Math.round(Math.random()*100),2:Math.round(Math.random()*100),3:Math.round(Math.random()*100)})},incrementNumber(e){this.randomNums[e]++}},computed:{panesNumberAbs(){return this.panesNumber<0&&(this.panesNumber=0),this.panesNumber}}},$={};var le=m(oe,ie,re,!1,pe,null,null,null);function pe(e){for(let s in $)this[s]=$[s]}var ce=function(){return le.exports}();u.use(N);var he=new N({base:"/splitpanes/",mode:"history",routes:[{path:"/",component:ce,children:[{path:"/example-home-view",component:()=>d(()=>import("./example-home-view.1543813a.js"),["assets/example-home-view.1543813a.js","assets/vendor.c1876d70.js"])},{path:"/example-another-view",component:()=>d(()=>import("./example-another-view.935125a0.js"),["assets/example-another-view.935125a0.js","assets/vendor.c1876d70.js"])}]},{path:"/test",component:()=>d(()=>import("./isolated-test-view.b25eaa00.js"),["assets/isolated-test-view.b25eaa00.js","assets/vendor.c1876d70.js"])}]});var me=function(){var e=this,s=e.$createElement,t=e._self._c||s;return t("w-app",{directives:[{name:"scroll",rawName:"v-scroll",value:e.onScroll,expression:"onScroll"}],attrs:{block:""}},[t("router-view"),t("w-transition-twist",[t("w-button",{directives:[{name:"show",rawName:"v-show",value:!e.goTopHidden,expression:"!goTopHidden"}],staticClass:"go-top",attrs:{"bg-color":"primary",icon:"material-icons keyboard_arrow_up",fixed:"",bottom:"",right:"",round:""},on:{click:e.scrollToTop}})],1),t("footer",{staticClass:"py2",attrs:{color:"white"}},[t("w-flex",{staticClass:"page-container",attrs:{wrap:"","justify-center":""}},[t("div",{staticClass:"xs12 sm6 text-center smu-text-left copyright"},[e._v("Copyright \xA9 "+e._s(new Date().getFullYear())+" Antoni Andr\xE9, all rights reserved.")]),t("div",{staticClass:"xs12 sm6 text-center smu-text-right made-with"},[t("div",{staticClass:"mb1"},[e._v("This documentation is made with "),t("w-icon",[e._v("fab fa-vuejs")]),e._v(", "),t("w-icon",[e._v("fab fa-html5")]),e._v(", "),t("w-icon",[e._v("fab fa-css3")]),e._v(", "),t("w-icon",[e._v("fab fa-sass")]),e._v(" & "),t("w-icon",{staticClass:"heart"},[e._v("material-icons favorite")])],1),e._v("View this project on "),t("a",{attrs:{href:"https://github.com/antoniandre/splitpanes",target:"_blank"}},[t("w-icon",[e._v("fab fa-github")]),e._v(" Github")],1),e._v(".")])])],1)],1)},ve=[];const ue={data:()=>({offsetTop:0,goTopHidden:!0}),methods:{onScroll(){this.offsetTop=window.pageYOffset||document.documentElement.scrollTop,this.goTopHidden=this.offsetTop<200},scrollToTop(){document.documentElement.scrollTo({top:0,behavior:"smooth"})}},directives:{scroll:{inserted:(e,s)=>{const t=n=>{s.value(n,e)&&window.removeEventListener("scroll",t)};window.addEventListener("scroll",t)}}}},E={};var _e=m(ue,me,ve,!1,de,null,null,null);function de(e){for(let s in E)this[s]=E[s]}var fe=function(){return _e.exports}();u.config.productionTip=!1;new u({router:he,WaveUI:H,render:e=>e(fe)}).$mount("#app");export{Z as P,W as S,m as n};
