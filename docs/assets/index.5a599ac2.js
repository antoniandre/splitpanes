var U=Object.defineProperty,W=Object.defineProperties;var Y=Object.getOwnPropertyDescriptors;var N=Object.getOwnPropertySymbols;var L=Object.prototype.hasOwnProperty,R=Object.prototype.propertyIsEnumerable;var E=(t,a,o)=>a in t?U(t,a,{enumerable:!0,configurable:!0,writable:!0,value:o}):t[a]=o,A=(t,a)=>{for(var o in a||(a={}))L.call(a,o)&&E(t,o,a[o]);if(N)for(var o of N(a))R.call(a,o)&&E(t,o,a[o]);return t},D=(t,a)=>W(t,Y(a));var H=(t,a)=>{var o={};for(var l in t)L.call(t,l)&&a.indexOf(l)<0&&(o[l]=t[l]);if(t!=null&&N)for(var l of N(t))a.indexOf(l)<0&&R.call(t,l)&&(o[l]=t[l]);return o};import{h as J,o as z,c as y,r as O,n as G,a as v,b as P,w as s,d as n,t as u,e as M,f as K,g as X,i as e,j as i,F as S,k,l as x,s as Z,m as Q,p as ee,q as te,u as j,v as ne,x as se,W as ie}from"./vendor.ff6ec80c.js";const ae=function(){const a=document.createElement("link").relList;if(a&&a.supports&&a.supports("modulepreload"))return;for(const r of document.querySelectorAll('link[rel="modulepreload"]'))l(r);new MutationObserver(r=>{for(const p of r)if(p.type==="childList")for(const d of p.addedNodes)d.tagName==="LINK"&&d.rel==="modulepreload"&&l(d)}).observe(document,{childList:!0,subtree:!0});function o(r){const p={};return r.integrity&&(p.integrity=r.integrity),r.referrerpolicy&&(p.referrerPolicy=r.referrerpolicy),r.crossorigin==="use-credentials"?p.credentials="include":r.crossorigin==="anonymous"?p.credentials="omit":p.credentials="same-origin",p}function l(r){if(r.ep)return;r.ep=!0;const p=o(r);fetch(r.href,p)}};ae();const oe="modulepreload",I={},le="/splitpanes/",T=function(a,o){return!o||o.length===0?a():Promise.all(o.map(l=>{if(l=`${le}${l}`,l in I)return;I[l]=!0;const r=l.endsWith(".css"),p=r?'[rel="stylesheet"]':"";if(document.querySelector(`link[href="${l}"]${p}`))return;const d=document.createElement("link");if(d.rel=r?"stylesheet":oe,r||(d.as="script",d.crossOrigin=""),d.href=l,document.head.appendChild(d),r)return new Promise((_,g)=>{d.addEventListener("load",_),d.addEventListener("error",g)})})).then(()=>a())};const re={name:"splitpanes",emits:["ready","resize","resized","pane-click","pane-maximize","pane-add","pane-remove","splitter-click"],props:{horizontal:{type:Boolean},pushOtherPanes:{type:Boolean,default:!0},dblClickSplitter:{type:Boolean,default:!0},rtl:{type:Boolean,default:!1},firstSplitter:{type:Boolean}},provide(){return{requestUpdate:this.requestUpdate,onPaneAdd:this.onPaneAdd,onPaneRemove:this.onPaneRemove,onPaneClick:this.onPaneClick}},data:()=>({container:null,ready:!1,panes:[],touch:{mouseDown:!1,dragging:!1,activeSplitter:null},splitterTaps:{splitter:null,timeoutId:null}}),computed:{panesCount(){return this.panes.length},indexedPanes(){return this.panes.reduce((t,a)=>(t[a.id]=a)&&t,{})}},methods:{updatePaneComponents(){this.panes.forEach(t=>{t.update&&t.update({[this.horizontal?"height":"width"]:`${this.indexedPanes[t.id].size}%`})})},bindEvents(){document.addEventListener("mousemove",this.onMouseMove,{passive:!1}),document.addEventListener("mouseup",this.onMouseUp),"ontouchstart"in window&&(document.addEventListener("touchmove",this.onMouseMove,{passive:!1}),document.addEventListener("touchend",this.onMouseUp))},unbindEvents(){document.removeEventListener("mousemove",this.onMouseMove,{passive:!1}),document.removeEventListener("mouseup",this.onMouseUp),"ontouchstart"in window&&(document.removeEventListener("touchmove",this.onMouseMove,{passive:!1}),document.removeEventListener("touchend",this.onMouseUp))},onMouseDown(t,a){this.bindEvents(),this.touch.mouseDown=!0,this.touch.activeSplitter=a},onMouseMove(t){this.touch.mouseDown&&(t.preventDefault(),this.touch.dragging=!0,this.calculatePanesSize(this.getCurrentMouseDrag(t)),this.$emit("resize",this.panes.map(a=>({min:a.min,max:a.max,size:a.size}))))},onMouseUp(){this.touch.dragging&&this.$emit("resized",this.panes.map(t=>({min:t.min,max:t.max,size:t.size}))),this.touch.mouseDown=!1,setTimeout(()=>{this.touch.dragging=!1,this.unbindEvents()},100)},onSplitterClick(t,a){"ontouchstart"in window&&(t.preventDefault(),this.dblClickSplitter&&(this.splitterTaps.splitter===a?(clearTimeout(this.splitterTaps.timeoutId),this.splitterTaps.timeoutId=null,this.onSplitterDblClick(t,a),this.splitterTaps.splitter=null):(this.splitterTaps.splitter=a,this.splitterTaps.timeoutId=setTimeout(()=>{this.splitterTaps.splitter=null},500)))),this.touch.dragging||this.$emit("splitter-click",this.panes[a])},onSplitterDblClick(t,a){let o=0;this.panes=this.panes.map((l,r)=>(l.size=r===a?l.max:l.min,r!==a&&(o+=l.min),l)),this.panes[a].size-=o,this.$emit("pane-maximize",this.panes[a]),this.$emit("resized",this.panes.map(l=>({min:l.min,max:l.max,size:l.size})))},onPaneClick(t,a){this.$emit("pane-click",this.indexedPanes[a])},getCurrentMouseDrag(t){const a=this.container.getBoundingClientRect(),{clientX:o,clientY:l}="ontouchstart"in window&&t.touches?t.touches[0]:t;return{x:o-a.left,y:l-a.top}},getCurrentDragPercentage(t){t=t[this.horizontal?"y":"x"];const a=this.container[this.horizontal?"clientHeight":"clientWidth"];return this.rtl&&!this.horizontal&&(t=a-t),t*100/a},calculatePanesSize(t){const a=this.touch.activeSplitter;let o={prevPanesSize:this.sumPrevPanesSize(a),nextPanesSize:this.sumNextPanesSize(a),prevReachedMinPanes:0,nextReachedMinPanes:0};const l=0+(this.pushOtherPanes?0:o.prevPanesSize),r=100-(this.pushOtherPanes?0:o.nextPanesSize),p=Math.max(Math.min(this.getCurrentDragPercentage(t),r),l);let d=[a,a+1],_=this.panes[d[0]]||null,g=this.panes[d[1]]||null;const h=_.max<100&&p>=_.max+o.prevPanesSize,f=g.max<100&&p<=100-(g.max+this.sumNextPanesSize(a+1));if(h||f){h?(_.size=_.max,g.size=Math.max(100-_.max-o.prevPanesSize-o.nextPanesSize,0)):(_.size=Math.max(100-g.max-o.prevPanesSize-this.sumNextPanesSize(a+1),0),g.size=g.max);return}if(this.pushOtherPanes){const m=this.doPushOtherPanes(o,p);if(!m)return;({sums:o,panesToResize:d}=m),_=this.panes[d[0]]||null,g=this.panes[d[1]]||null}_!==null&&(_.size=Math.min(Math.max(p-o.prevPanesSize-o.prevReachedMinPanes,_.min),_.max)),g!==null&&(g.size=Math.min(Math.max(100-p-o.nextPanesSize-o.nextReachedMinPanes,g.min),g.max))},doPushOtherPanes(t,a){const o=this.touch.activeSplitter,l=[o,o+1];return a<t.prevPanesSize+this.panes[l[0]].min&&(l[0]=this.findPrevExpandedPane(o).index,t.prevReachedMinPanes=0,l[0]<o&&this.panes.forEach((r,p)=>{p>l[0]&&p<=o&&(r.size=r.min,t.prevReachedMinPanes+=r.min)}),t.prevPanesSize=this.sumPrevPanesSize(l[0]),l[0]===void 0)?(t.prevReachedMinPanes=0,this.panes[0].size=this.panes[0].min,this.panes.forEach((r,p)=>{p>0&&p<=o&&(r.size=r.min,t.prevReachedMinPanes+=r.min)}),this.panes[l[1]].size=100-t.prevReachedMinPanes-this.panes[0].min-t.prevPanesSize-t.nextPanesSize,null):a>100-t.nextPanesSize-this.panes[l[1]].min&&(l[1]=this.findNextExpandedPane(o).index,t.nextReachedMinPanes=0,l[1]>o+1&&this.panes.forEach((r,p)=>{p>o&&p<l[1]&&(r.size=r.min,t.nextReachedMinPanes+=r.min)}),t.nextPanesSize=this.sumNextPanesSize(l[1]-1),l[1]===void 0)?(t.nextReachedMinPanes=0,this.panes[this.panesCount-1].size=this.panes[this.panesCount-1].min,this.panes.forEach((r,p)=>{p<this.panesCount-1&&p>=o+1&&(r.size=r.min,t.nextReachedMinPanes+=r.min)}),this.panes[l[0]].size=100-t.prevPanesSize-t.nextReachedMinPanes-this.panes[this.panesCount-1].min-t.nextPanesSize,null):{sums:t,panesToResize:l}},sumPrevPanesSize(t){return this.panes.reduce((a,o,l)=>a+(l<t?o.size:0),0)},sumNextPanesSize(t){return this.panes.reduce((a,o,l)=>a+(l>t+1?o.size:0),0)},findPrevExpandedPane(t){return[...this.panes].reverse().find(o=>o.index<t&&o.size>o.min)||{}},findNextExpandedPane(t){return this.panes.find(o=>o.index>t+1&&o.size>o.min)||{}},checkSplitpanesNodes(){Array.from(this.container.children).forEach(a=>{const o=a.classList.contains("splitpanes__pane"),l=a.classList.contains("splitpanes__splitter");if(!o&&!l){a.parentNode.removeChild(a),console.warn("Splitpanes: Only <pane> elements are allowed at the root of <splitpanes>. One of your DOM nodes was removed.");return}})},addSplitter(t,a,o=!1){const l=t-1,r=document.createElement("div");r.classList.add("splitpanes__splitter"),o||(r.onmousedown=p=>this.onMouseDown(p,l),typeof window!="undefined"&&"ontouchstart"in window&&(r.ontouchstart=p=>this.onMouseDown(p,l)),r.onclick=p=>this.onSplitterClick(p,l+1)),this.dblClickSplitter&&(r.ondblclick=p=>this.onSplitterDblClick(p,l+1)),a.parentNode.insertBefore(r,a)},removeSplitter(t){t.onmousedown=void 0,t.onclick=void 0,t.ondblclick=void 0,t.parentNode.removeChild(t)},redoSplitters(){const t=Array.from(this.container.children);t.forEach(o=>{o.className.includes("splitpanes__splitter")&&this.removeSplitter(o)});let a=0;t.forEach(o=>{o.className.includes("splitpanes__pane")&&(!a&&this.firstSplitter?this.addSplitter(a,o,!0):a&&this.addSplitter(a,o),a++)})},requestUpdate(o){var l=o,{target:t}=l,a=H(l,["target"]);const r=this.indexedPanes[t._.uid];Object.entries(a).forEach(([p,d])=>r[p]=d)},onPaneAdd(t){let a=-1;Array.from(t.$el.parentNode.children).some(r=>(r.className.includes("splitpanes__pane")&&a++,r===t.$el));const o=parseFloat(t.minSize),l=parseFloat(t.maxSize);this.panes.splice(a,0,{id:t._.uid,index:a,min:isNaN(o)?0:o,max:isNaN(l)?100:l,size:t.size===null?null:parseFloat(t.size),givenSize:t.size,update:t.update}),this.panes.forEach((r,p)=>r.index=p),this.ready&&this.$nextTick(()=>{this.redoSplitters(),this.resetPaneSizes({addedPane:this.panes[a]}),this.$emit("pane-add",{index:a,panes:this.panes.map(r=>({min:r.min,max:r.max,size:r.size}))})})},onPaneRemove(t){const a=this.panes.findIndex(l=>l.id===t._.uid),o=this.panes.splice(a,1)[0];this.panes.forEach((l,r)=>l.index=r),this.$nextTick(()=>{this.redoSplitters(),this.resetPaneSizes({removedPane:D(A({},o),{index:a})}),this.$emit("pane-remove",{removed:o,panes:this.panes.map(l=>({min:l.min,max:l.max,size:l.size}))})})},resetPaneSizes(t={}){!t.addedPane&&!t.removedPane?this.initialPanesSizing():this.panes.some(a=>a.givenSize!==null||a.min||a.max<100)?this.equalizeAfterAddOrRemove(t):this.equalize(),this.ready&&this.$emit("resized",this.panes.map(a=>({min:a.min,max:a.max,size:a.size})))},equalize(){const t=100/this.panesCount;let a=0,o=[],l=[];this.panes.forEach(r=>{r.size=Math.max(Math.min(t,r.max),r.min),a-=r.size,r.size>=r.max&&o.push(r.id),r.size<=r.min&&l.push(r.id)}),a>.1&&this.readjustSizes(a,o,l)},initialPanesSizing(){100/this.panesCount;let t=100,a=[],o=[],l=0;this.panes.forEach(p=>{t-=p.size,p.size!==null&&l++,p.size>=p.max&&a.push(p.id),p.size<=p.min&&o.push(p.id)});let r=100;t>.1&&(this.panes.forEach(p=>{p.size===null&&(p.size=Math.max(Math.min(t/(this.panesCount-l),p.max),p.min)),r-=p.size}),r>.1&&this.readjustSizes(t,a,o))},equalizeAfterAddOrRemove({addedPane:t,removedPane:a}={}){let o=100/this.panesCount,l=0,r=[],p=[];t&&t.givenSize!==null&&(o=(100-t.givenSize)/(this.panesCount-1)),this.panes.forEach(d=>{l-=d.size,d.size>=d.max&&r.push(d.id),d.size<=d.min&&p.push(d.id)}),!(Math.abs(l)<.1)&&(this.panes.forEach(d=>{t&&t.givenSize!==null&&t.id===d.id||(d.size=Math.max(Math.min(o,d.max),d.min)),l-=d.size,d.size>=d.max&&r.push(d.id),d.size<=d.min&&p.push(d.id)}),l>.1&&this.readjustSizes(l,r,p))},readjustSizes(t,a,o){let l;t>0?l=t/(this.panesCount-a.length):l=t/(this.panesCount-o.length),this.panes.forEach((r,p)=>{if(t>0&&!a.includes(r.id)){const d=Math.max(Math.min(r.size+l,r.max),r.min);t-=d-r.size,r.size=d}else if(!o.includes(r.id)){const d=Math.max(Math.min(r.size+l,r.max),r.min);t-=d-r.size,r.size=d}r.update({[this.horizontal?"height":"width"]:`${this.indexedPanes[r.id].size}%`})}),Math.abs(t)>.1&&this.$nextTick(()=>{this.ready&&console.warn("Splitpanes: Could not resize panes correctly due to their constraints.")})}},watch:{panes:{deep:!0,immediate:!1,handler(){this.updatePaneComponents()}},horizontal(){this.updatePaneComponents()},firstSplitter(){this.redoSplitters()},dblClickSplitter(t){[...this.container.querySelectorAll(".splitpanes__splitter")].forEach((o,l)=>{o.ondblclick=t?r=>this.onSplitterDblClick(r,l):void 0})}},beforeUnmount(){this.ready=!1},mounted(){this.container=this.$refs.container,this.checkSplitpanesNodes(),this.redoSplitters(),this.resetPaneSizes(),this.$emit("ready"),this.ready=!0},render(){return J("div",{ref:"container",class:["splitpanes",`splitpanes--${this.horizontal?"horizontal":"vertical"}`,{"splitpanes--dragging":this.touch.dragging}]},this.$slots.default())}};var C=(t,a)=>{const o=t.__vccOpts||t;for(const[l,r]of a)o[l]=r;return o};const pe={name:"pane",inject:["requestUpdate","onPaneAdd","onPaneRemove","onPaneClick"],props:{size:{type:[Number,String],default:null},minSize:{type:[Number,String],default:0},maxSize:{type:[Number,String],default:100}},data:()=>({style:{}}),mounted(){this.onPaneAdd(this)},beforeUnmount(){this.onPaneRemove(this)},methods:{update(t){this.style=t}},computed:{sizeNumber(){return this.size||this.size===0?parseFloat(this.size):null},minSizeNumber(){return parseFloat(this.minSize)},maxSizeNumber(){return parseFloat(this.maxSize)}},watch:{sizeNumber(t){this.requestUpdate({target:this,size:t})},minSizeNumber(t){this.requestUpdate({target:this,min:t})},maxSizeNumber(t){this.requestUpdate({target:this,max:t})}}};function de(t,a,o,l,r,p){return z(),y("div",{class:"splitpanes__pane",onClick:a[0]||(a[0]=d=>p.onPaneClick(d,t._.uid)),style:G(t.style)},[O(t.$slots,"default")],4)}var he=C(pe,[["render",de]]);function ce(t,a,o,l,r,p){const d=v("w-icon");return z(),P(X(o.tag),{class:K(`highlight highlight--${o.type}`)},{default:s(()=>[o.noIcon?M("",!0):(z(),P(d,{key:0},{default:s(()=>[n("material-icons "+u(p.icon),1)]),_:1})),O(t.$slots,"default")]),_:3},8,["class"])}const ue={props:{tag:{type:String,default:"p"},type:{type:String,default:"info"},noIcon:{type:Boolean,default:!1}},computed:{icon(){switch(this.type){case"success":return"check";case"error":return"close";case"warning":return"priority_high";case"tips":return"wb_incandescent";case"info":default:return"priority_high"}}}};var me=C(ue,[["render",ce]]);const _e={class:"page-container"},fe=x('<header class="text-center"><svg class="mb5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1000 1000" xml:space="preserve" width="4em"><path d="M469 500v490h57V10h-57v490z" fill="#42b983"></path><path d="m109 417-83 83 80 80 81 81 20-20 20-20-46-46-46-46h219v-58H135l48-47 49-49c0-2-9-11-20-22l-20-20-83 84z" fill="#35495e"></path><path d="m789 354-21 20 11 11 46 48 35 37-109 1H641v58h219l-46 46-46 46 21 20 20 20 82-83 83-83-13-11-82-81-70-70-20 21z" fill="#35495e"></path></svg><h1 class="mb3 title1">Splitpanes</h1><p class="grey">A Vue.js reliable, simple and touch-ready panes splitter / resizer.</p></header><h2 class="mt12 mb2 title2">Features</h2>',2),ge={class:"checklist"},ve=n("material-icons check"),ze=n("Light weight & no dependencies other than Vue JS"),be=n("material-icons check"),ye=n("Only worry about your panes, the splitters are automatic"),we=n("material-icons check"),xe=n("Nesting supported"),Se=n("material-icons check"),ke=n("Fully responsive"),Pe=n("material-icons check"),Ne=n("Support for touch devices"),Me=n("material-icons check"),Ce=n("Push other panes or not"),Te=n("material-icons check"),Ve=n("Double click a splitter to maximize pane"),$e=n("material-icons check"),Ee=n("Programmatically set pane width or height"),Le=n("material-icons check"),Re=n("Programmatically add and remove panes"),Ae=n("material-icons check"),De=e("strong",null,"Supports Vue 2 & Vue 3",-1),He=e("h2",{class:"mt12 mb4 title2"},"Github project \xA0&\xA0 important notes",-1),je=n("fab fa-github"),Ie={href:"https://github.com/antoniandre/vueper-slides",target:"_blank"},Oe=n("//github.com/antoniandre/vueper-slides "),Fe=n("material-icons open_in_new"),qe=n("material-icons report"),Be=e("a",{class:"orange",href:"https://blog.vuejs.org/posts/vue-3-as-the-new-default.html",target:"_blank",style:{"text-decoration":"underline"}},"Vue 3 is the new default",-1),Ue=n(", and so is Splitpanes 3, for Vue 3. "),We=e("span",{class:"title2 ml1"},"\u{1F64C}",-1),Ye=e("br",null,null,-1),Je=n(`
For Vue 2 projects, you should use `),Ge=e("code",null,[n("npm i splitpanes@"),e("strong",null,"legacy")],-1),Ke=n("."),Xe=n("material-icons favorite"),Ze=n("If you like Splitpanes, you can"),Qe=e("a",{class:"pink mx2",href:"https://www.paypal.me/antoniandre1",target:"_blank",style:{"text-decoration":"underline"}},[e("strong",null,"Support the project")],-1),et=n("or"),tt=e("a",{class:"pink ml2",href:"https://github.com/sponsors/antoniandre",target:"_blank",style:{"text-decoration":"underline"}},[e("strong",null,"Sponsor the author")],-1),nt=n("!"),st=e("div",null,[n("Thank you so much to all the supporters! "),e("span",{class:"title2 ml1"},"\u{1F64F}")],-1),it=e("svg",{class:"mr4 blue-light1",viewBox:"0 0 725 477",style:{width:"50px",stroke:"#497ca2","stroke-width":"5px"}},[e("path",{fill:"#497ca2",d:"M449 0c-78 5-152 39-217 82-19 13-37 26-54 40-39 1-77 15-110 34-34 21-53 60-61 99-11 52-8 108 6 159 7 23 16 46 33 63 4-4 13-4 13-11-1-5-7-8-9-14-27-48-32-108-11-159 13-32 36-63 68-77 19-9 42-7 58 6 6 7 18 4 24-2 6-4 11-10 19-10-24 25-39 60-38 95 1 15 3 31 8 45 16 36 41 69 76 89 5 2 10 6 16 7 5-2 14-5 14-12-4-9-14-12-21-18-27-23-56-48-67-82-9-29-1-60 8-88 7-15 21-32 39-29 15 1 28 13 43 8 11-5 13-17 16-27 5-17 3-38-10-51-16-18-40-23-62-25l-11-2c23-19 53-26 81-31 21-3 43-5 64-2 18 3 28 21 42 31-33 47-57 102-56 159a170 170 0 0086 149c6-1 13-7 10-14-5-11-17-16-25-25-33-30-52-75-50-121 1-29 11-58 24-84 12-25 25-52 47-71 9-8 22-13 33-7 20 8 42 14 63 13-35 27-55 70-64 113-9 44-7 91 12 133 15 37 45 68 81 85 32 16 67 24 101 27 18 1 36 2 53-4 4-1 6-7 2-9-13-6-28-4-42-6-45-5-92-16-127-45-34-28-54-71-60-114-5-47 7-97 34-137 11-15 26-31 45-34 14-1 25 12 31 23 6 12 16 24 29 28 20-10 40-26 43-50 2-17-6-34-14-49-15-25-40-43-69-48-20-5-41-2-61-6-22-21-54-24-83-24zm6 21c22 0 48 5 62 25 4 7 8 16 8 24-1 10-10 22-21 19-9-7-18-14-30-16-14-4-31-1-43 8-6 6-17 8-24 2-9-6-17-15-28-17-27-7-54 1-81 6a364 364 0 01157-51zm117 29c33 0 66 25 72 58 3 12 3 28-8 35-3 2-6 4-8 1-8-12-12-27-23-37-3-7-12-8-19-9-13-2-26 0-39-4 7-7 6-17 4-25l-3-16 24-3zm-372 92l46 2c18 2 33 16 34 34 1 7 1 17-6 21-6 0-12-4-18-6-21-8-46-14-67-3-6 2-11 9-17 5-10-4-18-14-30-12-30 1-56 21-77 42-16 17-30 37-43 56 0-39 17-80 49-104 26-22 61-30 94-34l35-1z"})],-1),at=e("strong",null,[n("Check out my UI framework for Vue (2 & 3)!"),e("a",{class:"title2 ml4",href:"https://antoniandre.github.io/wave-ui",target:"_blank",style:{width:"50px",color:"#1471b8","text-decoration":"underline"}},[e("strong",null,"Wave UI")])],-1),ot={class:"title4 mt12 pt12 mb2"},lt=n("# Demo -"),rt={class:"ml1 d-inline-flex align-center",href:"https://codepen.io/antoniandre/pen/XybPKP",target:"_blank"},pt=n("try it yourself on Codepen"),dt=n("material-icons open_in_new"),ht=e("span",null,[n("1"),e("br"),e("em",{class:"specs"},"I have a min width of 20%")],-1),ct=e("span",null,"2",-1),ut=e("span",null,"3",-1),mt=e("span",null,"4",-1),_t=e("span",null,"5",-1),ft=n(`<splitpanes style="height: 400px">
  <pane min-size="20">1</pane>
  <pane>
    <splitpanes horizontal>
      <pane>2</pane>
      <pane>3</pane>
      <pane>4</pane>
    </splitpanes>
  </pane>
  <pane>5</pane>
</splitpanes>`),gt=n(`.splitpanes__pane {
  display: flex;
  justify-content: center;
  align-items: center;
  font-family: Helvetica, Arial, sans-serif;
  color: rgba(255, 255, 255, 0.6);
  font-size: 5em;
}
`),vt=x('<h2 class="mt12 mb2"><a href="#installation">Installation</a><a name="installation"></a></h2><p>You have two options: <em>NPM</em> <strong class="mx1">or</strong> <span class="code">&lt;script&gt;</span> tag.</p><h3 class="mt12">Via NPM</h3>',3),zt=n("npm i splitpanes # For Vue 3"),bt=e("span",{class:"mx2"},"or",-1),yt=n(`npm i splitpanes@legacy # For Vue 2
`),wt={class:"mt2"},xt=n("material-icons chevron_right"),St=n("View and edit a working"),kt=e("a",{class:"ml2",href:"https://codepen.io/antoniandre/pen/LYNKGWV",target:"_blank"},"Vue 3 example",-1),Pt=n(", or"),Nt=e("a",{class:"mx2",href:"https://codepen.io/antoniandre/pen/XybPKP",target:"_blank"},"Vue 2 example",-1),Mt=n("on Codepen."),Ct=e("div",{class:"mt6"},"Then import the component and CSS:",-1),Tt=n(`// In your Vue component.
import { Splitpanes, Pane } from 'splitpanes'
import 'splitpanes/dist/splitpanes.css'

export default {
  components: { Splitpanes, Pane },
  ...
}
`),Vt=e("h3",{class:"mt12"},[n("Via "),e("span",{class:"code"},"<script>"),n(" tag")],-1),$t=e("p",null,[n("Include the Splitpanes script in your document "),e("span",{class:"code"},"<head>"),n(" as follows:")],-1),Et=n(`<head>
  ...
  <script src="https://unpkg.com/vue"><\/script>
  <script src="https://unpkg.com/splitpanes"><\/script>
  <link href="https://unpkg.com/splitpanes/dist/splitpanes.css" rel="stylesheet">
</head>
`),Lt=e("h2",{class:"mt12 mb2"},[e("a",{href:"#how-to-use"},"How to use"),e("a",{name:"how-to-use"})],-1),Rt=e("p",null,`Once included in your project, use as follows.
`,-1),At=n(`<splitpanes class="default-theme">
  <pane v-for="i in 3" :key="i">
    <div>`+u("{{ i }}")+`</div>
  </pane>
</splitpanes>
`),Dt=e("strong",null,[n("No splitter tags!"),e("br")],-1),Ht=e("span",null,[n("The splitters will be added automatically between the "),e("span",{class:"code"},"<pane>"),n(" tags.")],-1),jt=n(`By default the layout is vertical, if you need you can set the attribute
`),It=e("span",{class:"code"},"horizontal",-1),Ot=n(" on the "),Ft=e("span",{class:"code"},"<splitpanes>",-1),qt=n(` tag to change the layout to rows.
`),Bt=n("The CSS is external so you can easily override or choose not to include it at all."),Ut=e("br",null,null,-1),Wt=n(`
If you want to use it, you can also optionally use the CSS class `),Yt=e("span",{class:"code"},"default-theme",-1),Jt=n(`
at the root of your splitpanes to apply the default theme like on this page.`),Gt=e("br",null,null,-1),Kt=n(`
If you want to go with your own style, you can check the `),Xt=e("a",{href:"#do-your-own-style"},"Do Your Own Style example",-1),Zt=n(`.
`),Qt=x('<h2 class="mt12 mb2"><a href="#more-examples">More examples</a><a name="more-examples"></a></h2><h3 class="mt10 mb2"><a href="#horizontal-layout">Horizontal layout, push other panes, min &amp; max use</a><a name="horizontal-layout"></a></h3><p>You can also double click a splitter to maximize the next pane! (First pane splitter will be an option soon)</p><p>If you want to disable the &#39;double click splitter to maximize&#39; behavior, you can add this attribute: <span class="code">:dbl-click-splitter=&quot;false&quot;</span>.</p>',4),en=e("span",null,[n("1"),e("br"),e("em",{class:"specs"},"I have a min height of 20% & max height of 70%")],-1),tn=e("span",null,"2",-1),nn=e("span",null,[n("3"),e("br"),e("em",{class:"specs"},"I have a max height of 70%")],-1),sn=n(`<splitpanes class="default-theme" horizontal style="height: 400px">
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
`),an=e("h3",{class:"mt12 pt8 mb2"},[e("a",{href:"#default-pane-width"},"Default pane width or height"),e("a",{name:"default-pane-width"})],-1),on=e("p",null,[n("Provide dimension of your panes when they first load (will be used for the width or height respectively for the vertical or horizontal layout)."),e("br"),e("strong",null,[n("If you provide a default width or height, make sure you provide it for all the panes and the total equals 100%."),e("br"),n(`
If a pane is missing a default width or height, then all the panes will have the same width or height.`),e("br")]),n("Note that setting a default value is different than setting a min or max value.")],-1),ln=e("span",null,"1",-1),rn=e("span",null,"2",-1),pn=e("span",null,"3",-1),dn=n(`<splitpanes class="default-theme" horizontal style="height: 400px">
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
`),hn=e("h3",{class:"mt12 pt8 mb2"},[e("a",{href:"#nested-splitpanes"},"Mix layout with nested splitpanes & prevent pushing other panes"),e("a",{name:"nested-splitpanes"})],-1),cn={href:"https://codepen.io/antoniandre/pen/PypgKY",target:"_blank"},un=n("Try it yourself on Codepen"),mn=n("material-icons open_in_new"),_n=e("span",null,"1",-1),fn=e("span",null,"2",-1),gn=e("span",null,"3",-1),vn=e("span",null,"4",-1),zn=e("span",null,"5",-1),bn=n(`<splitpanes class="default-theme" horizontal :push-other-panes="false" style="height: 400px">
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
`),yn=e("h3",{class:"mt12 pt8 mb2"},[e("a",{href:"#lots-of-splitters"},"Lots of splitters & push other panes - all panes have a min width of 5%"),e("a",{name:"lots-of-splitters"})],-1),wn=n(`<splitpanes class="default-theme" style="height: 400px">
  <pane v-for="i in 8" :key="i" min-size="5">
    <span>`+u("{{ i }}")+`</span>
  </pane>
</splitpanes>
`),xn=e("h3",{class:"mt12 pt8 mb2"},[e("a",{href:"#adding-splitters-on-the-fly"},"Adding splitters on the fly"),e("a",{name:"adding-splitters-on-the-fly"})],-1),Sn=n("This example shows the reactivity when you add a new element dynamically in splitpanes."),kn=n("material-icons add"),Pn=n("Add pane"),Nn=n("material-icons remove"),Mn=n("Remove pane"),Cn=n(`<button @click="panesNumber++">Add pane</button>
<button @click="panesNumber--">Remove pane</button>

<splitpanes class="default-theme" style="height: 400px">
  <pane v-for="i in panesNumber" :key="i">
    <span>`+u("{{ i }}")+`</span>
  </pane>
</splitpanes>
`),Tn=n(`// In your Vue component.
data: () => ({
  panesNumber: 3
})
`),Vn=e("h3",{class:"mt12 pt8 mb2"},[e("a",{href:"#change-direction"},"Change direction & first splitter"),e("a",{name:"change-direction"})],-1),$n=e("p",null,"When changing direction, all the panes current width or height will flip to adapt to the new layout.",-1),En=e("p",null,[n("Showing the first splitter is an option which allows user to double click the splitter to maximize the next pane."),e("br"),n(`
The first splitter does not allow to resize the next pane.
`)],-1),Ln=n('<button @click="horizontal = !horizontal">Switch to '+u("{{ horizontal ? 'Vertical' : 'Horizontal' }}")+`</button>
<button @click="firstSplitter = !firstSplitter">`+u("{{ firstSplitter ? 'Hide' : 'Show' }}")+` First Splitter</button>

<splitpanes class="default-theme" :horizontal="horizontal" :first-splitter="firstSplitter" style="height: 400px">
  <pane v-for="i in 3" :key="i">
    <span>`+u("{{ i }}")+`%</span>
  </pane>
</splitpanes>
`),Rn=n(`data: () => ({
  horizontal: false
  firstSplitter: false
})
`),An=e("h3",{class:"mt12 pt8 mb2"},[e("a",{href:"#programmatic-resizing"},"Programmatic resizing"),e("a",{name:"programmatic-resizing"})],-1),Dn=e("p",{class:"mb6"},"This example shows the programmatic way of resizing panes. And how it works both ways.",-1),Hn=n(`<w-slider v-model="paneSize" label="First pane size" :min="0" :max="100">
<splitpanes class="default-theme" @resize="paneSize = $event[0].size" style="height: 400px">
  <pane :size="paneSize">
    <span>`+u("{{ paneSize }}")+`%</span>
  </pane>
  <pane :size="100 - paneSize">
    <span>`+u("{{ 100 - paneSize }}")+`%</span>
  </pane>
</splitpanes>
`),jn=n(`// In your Vue component.
data: () => ({
  paneSize: 50
})
`),In=e("h3",{class:"mt12 pt8 mb2"},[e("a",{href:"#in-depth-reactivity"},"In-depth reactivity"),e("a",{name:"in-depth-reactivity"})],-1),On=n("This example shows the reactivity when you modify anything in your component inside splitpanes."),Fn=e("br",null,null,-1),qn=n("material-icons sync"),Bn=n("Generate 3 random numbers"),Un=n("material-icons add"),Wn=n("Increment pane #3"),Yn=e("br",null,null,-1),Jn=e("br",null,null,-1),Gn={key:0},Kn=e("br",null,null,-1),Xn=e("br",null,null,-1),Zn=n("material-icons add"),Qn=n("1"),es=e("span",null,[n("4"),e("br")],-1),ts=n("- Nested splitpanes -"),ns=e("br",null,null,-1),ss=n(`<button @click="generateRandomNumber">Generate 3 random numbers</button>
<button @click="incrementNumber(3)">Increment pane #3</button>

<splitpanes horizontal class="default-theme" style="height: 400px">
  <pane>
    <splitpanes>
      <pane v-for="i in 3" :key="i">
        <span>`+u("{{ i }}")+`</span><br>
        <em>Number is: `+u("{{ randomNums[i] }}")+`</em><br>
        <em v-if="i === 2">
          Number on the left is: `+u("{{ randomNums[1] }}")+`<br>
          Number on the right is: `+u("{{ randomNums[3] }}")+`<br>
        </em>
        <button(v-if="i !== 2" @click="randomNums[i] = randomNums[i] + 1">+1</button>
      </pane>
    </splitpanes>
  </pane>
  <pane>
    <span>4</span><br>
    <em>
      - Nested splitpanes -<br>
      [`+u("{{ randomNums[1] }}")+", "+u("{{ randomNums[2] }}")+", "+u("{{ randomNums[1] }}")+`]
    </em>
  </pane>
</splitpanes>
`),is=n(`// In your Vue component.
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
`),as=e("h3",{class:"mt12 pt8 mb2"},[e("a",{href:"#toggle-a-pane-with-v-if"},[n("Toggle a pane with "),e("span",{class:"code"},"v-if")]),e("a",{name:"toggle-a-pane-with-v-if"})],-1),os=e("span",null,"1",-1),ls=e("span",null,"2",-1),rs=e("span",null,"3",-1),ps=n('<button @click="hidePane2 = !hidePane2">'+u("{{ hidePane2 ? 'Show' : 'Hide' }}")+` Pane 2</button>
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
`),ds=e("h3",{class:"mt12 pt8 mb2"},[e("a",{href:"#vue-router"},"Vue Router inside splitpanes"),e("a",{name:"vue-router"})],-1),hs=e("p",{class:"mb1"},[n("This is another reactivity example of a rather common case: Vue Router inside splitpanes."),e("br"),n(`
The navigation is in the left pane, but you can also access from outside of splitpanes, through those buttons:`)],-1),cs=n("Home view"),us=n("Another view"),ms={class:"flex pa2"},_s=e("p",{class:"title1"},"Navigation",-1),fs=n("Home view"),gs=n("Another view"),vs=e("em",{class:"ma-auto grey"},"I have a min width of 20%",-1),zs=e("em",{class:"d-flex justify-center grey code pa2"},"router-view",-1),bs=e("span",{class:"ma-auto"},[n("3"),e("br")],-1),ys=n(`<button to="home-view">Home view</button>
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
`),ws=n(`// Vue Router routes.
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
`),xs=n(`<template>
  <div class="green">
    <div>This is home</div>
  </div>
</template>
`),Ss=x(`<h3 class="mt12 pt8 mb2"><a href="#emitted-events">Listening to emitted events</a><a name="emitted-events"></a></h3><p>Here is the list of events that are emitted from splitpanes:</p><ul><li><code class="mr2">ready</code> has no parameter and fires when splitpanes is ready</li><li><code class="mr2">resize</code> returns an array of all the panes objects with their dimensions, and fires while resizing (on mousemove/touchmove)</li><li><code class="mr2">resized</code> returns an array of all the panes objects with their dimensions, and fires once when the resizing stops after user drag (on mouseup/touchend).<br>
This event is also fired after the internal resizing of panes that occurs after adding or removing a pane.</li><li><code class="mr2">pane-click</code> returns the clicked pane object with its dimensions.</li><li><code class="mr2">pane-maximize</code> returns the maximized pane object with its dimensions.</li><li><code class="mr2">pane-add</code> returns an object containing the index of the added pane and the new array of panes after resize.</li><li><code class="mr2">pane-remove</code> returns an object containing the removed pane and an array of all the remaining panes objects with their dimensions after resize.</li><li><code class="mr2">splitter-click</code> returns the next pane object (with its dimensions) directly after the clicked splitter.<br>
This event is only emitted if dragging did not occur between mousedown and mouseup.</li></ul><p class="mt4">Try resizing panes and check the logs bellow.</p>`,4),ks={class:"ssh-pre logs-box","data-label":"Logs"},Ps=e("div",{class:"grey"},[n("//\xA0"),e("strong",null,"Event name:\xA0"),e("span",null,"Event params \xA0 (Last event on top)")],-1),Ns=n(`<splitpanes
  class="default-theme"
  @resize="log('resize', $event)"
  @resized="log('resized', $event)"
  @pane-maximize="log('pane-maximize', $event)"
  @pane-click="log('pane-click', $event)"
  @ready="log('ready', $event)"
  @splitter-click="log('splitter-click', $event)"
  style="height: 400px">
  <pane v-for="i in 3" :key="i" min-size="10">
    <span>`+u("{{ i }}")+`</span>
  </pane>
</splitpanes>
`),Ms=e("h3",{class:"mt12 pt8 mb2"},[e("a",{href:"#increased-touch-zone"},"Increased reactive touch zone for touch devices"),e("a",{name:"increased-touch-zone"})],-1),Cs={href:"https://codepen.io/antoniandre/pen/XxRZmB",target:"_blank"},Ts=n("Try it yourself on Codepen"),Vs=n("material-icons open_in_new"),$s=e("span",null,"1",-1),Es=e("span",null,"2",-1),Ls=e("span",null,"3",-1),Rs=e("div",{class:"text"},[e("p",null,[n(`In this example the splitters are thin lines but the reactive touch zone is spread to 30 pixels all around!
`),e("em",null,"Hover a splitter to see the enlarged fat-finger-proof reactive zone.")])],-1),As=n(`<splitpanes horizontal style="height: 400px">
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
`),Ds=n(`.splitpanes {background-color: #f8f8f8;}

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
`),Hs=e("h3",{class:"mt12 pt8 mb2"},[e("a",{href:"#do-your-own-style"},"Do your own style"),e("a",{name:"do-your-own-style"})],-1),js=e("p",null,"If you don't want to use the default style, here is how to do your own.",-1),Is={href:"https://codepen.io/antoniandre/pen/mzGZXR",target:"_blank"},Os=n("Try it yourself on Codepen"),Fs=n("material-icons open_in_new"),qs=e("span",null,"1",-1),Bs=e("span",null,"2",-1),Us=e("span",null,"3",-1),Ws=e("span",null,"4",-1),Ys=n(`<splitpanes horizontal style="height: 400px">
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
`),Js=n(`.splitpanes {
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
`),Gs=x(`<h2 class="mt12 pt12 mb2"><a href="#api">API</a><a name="api"></a></h2><p>Here is the list of all the props.</p><ul><li><code>horizontal</code><span class="code ml2">Default: false</span><p>The orientation of the panes splitting.<br>
Vertical by default, meaning the splitters are vertical, but you can resize horizontally</p></li><li><code>push-other-panes</code><span class="code ml2">Default: true</span><p>Whether it should push the next splitter when dragging a splitter until it reached another one.</p></li><li><code>dbl-click-splitter</code><span class="code ml2">Default: true</span><p>Double click on splitter to maximize the next pane.</p></li><li><code>rtl</code><span class="code ml2">Default: false</span><p>Supports Right to left direction.</p></li><li><code>first-splitter</code><span class="code ml2">Default: false</span><p>Displays the first splitter when set to true. This allows maximizing the first pane on splitter double click.</p></li></ul><h2 class="mt12 pt12 mb2"><a href="#release-notes">Release Notes</a><a name="release-notes"></a></h2>`,4),Ks={class:"mt4"},Xs=e("strong",null,"Version 3.0",-1),Zs=n(" For Vue 3 projects."),Qs=n("Installing the latest splitpanes on a Vue 2 project will break it."),ei=e("br",null,null,-1),ti=n(`
For Vue 2, you need to install splitpanes from the `),ni=e("span",{class:"code"},"legacy",-1),si=n(" tag: "),ii=e("code",null,"npm i splitpanes@legacy",-1),ai=n("."),oi=e("br",null,null,-1),li=n(`
For Vue 3, you don't need the `),ri=e("code",null,"next",-1),pi=n(" tag anymore."),di=x('<div><strong>Version 2.3.5</strong> Prevent splitter double taps on touch devices if <span class="code">`dblClickSplitter`</span> is set to false.</div><div><strong>Version 2.3.4</strong> Fix removing pane DOM nodes in IE11</div><div><strong>Version 2.3.1</strong> Fix firing <span class="code">`pane-click`</span> event on pane click</div><div><strong>Version 2.3.0</strong> Support rtl direction</div><div><strong>Version 2.2.0</strong><ul><li>Added the <span class="code">`firstSplitter`</span> option, disabled by default. ref: <a href="#change-direction">Change direction &amp; first splitter</a></li><li>Adapt panes width and height after direction change. ref: <a href="#change-direction">Change direction &amp; first splitter</a></li><li>Emit a <span class="code">`resized`</span> event after pane was added/removed</li><li>Emit a <span class="code">`pane-add`</span> event after pane was added</li><li>Emit a <span class="code">`pane-remove`</span> event after pane was removed</li><li>Support <span class="code">`v-if`</span> on a Pane and allow inserting a Pane at any position between others. ref: <a href="#toggle-a-pane-with-v-if">Toggle a pane with v-if</a></li></ul></div>',5),hi={class:"mt4"},ci=e("strong",null,"Version 2.0.0",-1),ui=n(" Fix reactivity issues."),mi=e("ul",{class:"mt1"},[e("li",null,[e("strong",null,[n("Children must now be wrapped into a "),e("span",{class:"code"},"`pane`"),n(" component.")])]),e("li",null,[n("The attribute "),e("span",{class:"code"},"`splitpanes-size`"),n(" is now replaced with "),e("span",{class:"code"},"`size`"),n(" on the "),e("span",{class:"code"},"`pane`"),n(" component.")]),e("li",null,[n("you can still add CSS classes on the "),e("span",{class:"code"},"`pane`"),n(" component tag.")])],-1),_i=x("<div><strong>Version 1.14.0</strong> Programmatically set pane size</div><div><strong>Version 1.13.0</strong> Emit event on splitter click</div><div><strong>Version 1.12.0</strong> double click splitter to maximize is now an option</div><div><strong>Version 1.11.0</strong> Persist panes size after slots changed</div><div><strong>Version 1.10.0</strong> Add maximum size feature on panes</div>",5),fi=e("strong",null,"Version 1.9.0",-1),gi=n(" Emit event on resize & watch slots optional"),vi=e("strong",null,[n("The "),e("span",{class:"code"},"`resize`"),n(" event - previously firing after resize end - is now firing on resize."),e("br"),n(`
A new `),e("span",{class:"code"},"`resized`"),n(` event is emitted on resize end. Check out the
`),e("a",{href:"#emitted-events"},"Listening to emitted events"),n(" example.")],-1),zi=e("strong",null,[n("By default and for performance, the reactivity is now limited to slot deletion and slot creation."),e("br"),n(`
With the option `),e("span",{class:"code"},"`watchSlots`"),n(" you can also track any change on the slots."),e("br")],-1),bi=x("<div><strong>Version 1.8.0</strong> Watch slots</div><div><strong>Version 1.7.0</strong> Double click splitter to maximize next pane</div><div><strong>Version 1.6.0</strong> Emit events</div><div><strong>Version 1.5.0</strong> Add default size feature on panes</div><div><strong>Version 1.4.0</strong> Add minimum size feature on panes</div><div><strong>Version 1.3.0</strong> Splitpanes slots are now reactive (add/remove on the fly)</div><div><strong>Version 1.2.0</strong> Add a `default-theme` CSS class to load default theme</div><div><strong>Version 1.1.0</strong> Allow pushing other panes while dragging splitter</div><div><strong>Version 1.0.0</strong> First public release</div>",9);function yi(t,a,o,l,r,p){const d=v("w-icon"),_=v("w-flex"),g=v("w-alert"),h=v("pane"),f=v("splitpanes"),m=v("ssh-pre"),w=v("highlight-message"),b=v("w-button"),q=v("w-slider"),V=v("router-link"),B=v("router-view");return z(),y("div",_e,[fe,e("ul",ge,[e("li",null,[i(d,{class:"mr2",color:"primary",size:"20"},{default:s(()=>[ve]),_:1}),ze]),e("li",null,[i(d,{class:"mr2",color:"primary",size:"20"},{default:s(()=>[be]),_:1}),ye]),e("li",null,[i(d,{class:"mr2",color:"primary",size:"20"},{default:s(()=>[we]),_:1}),xe]),e("li",null,[i(d,{class:"mr2",color:"primary",size:"20"},{default:s(()=>[Se]),_:1}),ke]),e("li",null,[i(d,{class:"mr2",color:"primary",size:"20"},{default:s(()=>[Pe]),_:1}),Ne]),e("li",null,[i(d,{class:"mr2",color:"primary",size:"20"},{default:s(()=>[Me]),_:1}),Ce]),e("li",null,[i(d,{class:"mr2",color:"primary",size:"20"},{default:s(()=>[Te]),_:1}),Ve]),e("li",null,[i(d,{class:"mr2",color:"primary",size:"20"},{default:s(()=>[$e]),_:1}),Ee]),e("li",null,[i(d,{class:"mr2",color:"primary",size:"20"},{default:s(()=>[Le]),_:1}),Re]),e("li",null,[i(d,{class:"mr2",color:"primary",size:"20"},{default:s(()=>[Ae]),_:1}),De])]),He,i(_,{"align-center":"",shrink:""},{default:s(()=>[i(d,{class:"ml1 mr5 lightgrey",size:"46"},{default:s(()=>[je]),_:1}),e("a",Ie,[Oe,i(d,{color:"primary"},{default:s(()=>[Fe]),_:1})])]),_:1}),i(_,{class:"my8","align-center":""},{default:s(()=>[i(d,{class:"mr4",size:"50",color:"orange-light3"},{default:s(()=>[qe]),_:1}),i(g,{class:"ma0","border-left":"",color:"orange",style:{width:"100%","max-width":"600px"}},{default:s(()=>[Be,Ue,We,Ye,Je,Ge,Ke]),_:1})]),_:1}),i(_,{class:"my8","align-center":""},{default:s(()=>[i(d,{class:"mr4",size:"50",color:"pink-light3"},{default:s(()=>[Xe]),_:1}),i(g,{class:"ma0","border-left":"",color:"pink",style:{width:"100%","max-width":"600px"}},{default:s(()=>[Ze,Qe,et,tt,nt,st]),_:1})]),_:1}),i(_,{class:"mt4 mb8","align-center":""},{default:s(()=>[it,i(g,{class:"ma0","border-left":"",color:"pale-blue",style:{width:"100%","max-width":"600px"}},{default:s(()=>[at]),_:1})]),_:1}),e("div",ot,[lt,e("a",rt,[pt,i(d,{class:"ml1",color:"primary"},{default:s(()=>[dt]),_:1})])]),i(f,{class:"default-theme example example1",style:{height:"400px"}},{default:s(()=>[i(h,{"min-size":"20"},{default:s(()=>[ht]),_:1}),i(h,null,{default:s(()=>[i(f,{class:"default-theme example",horizontal:""},{default:s(()=>[i(h,null,{default:s(()=>[ct]),_:1}),i(h,null,{default:s(()=>[ut]),_:1}),i(h,null,{default:s(()=>[mt]),_:1})]),_:1})]),_:1}),i(h,null,{default:s(()=>[_t]),_:1})]),_:1}),i(_,{class:"pb6",wrap:""},{default:s(()=>[i(m,{class:"grow mb0 mr2",language:"html-vue",label:"HTML Vue Template"},{default:s(()=>[ft]),_:1}),i(m,{class:"grow mb0",language:"css",label:"CSS"},{default:s(()=>[gt]),_:1})]),_:1}),vt,i(_,{"align-center":"",wrap:""},{default:s(()=>[i(m,{class:"px4",language:"shell"},{default:s(()=>[zt]),_:1}),bt,i(m,{class:"px4",language:"shell"},{default:s(()=>[yt]),_:1})]),_:1}),e("p",wt,[i(d,{class:"mr1"},{default:s(()=>[xt]),_:1}),St,kt,Pt,Nt,Mt]),Ct,i(m,{language:"js",label:"Javascript"},{default:s(()=>[Tt]),_:1}),Vt,$t,i(m,{language:"html",label:"HTML"},{default:s(()=>[Et]),_:1}),Lt,Rt,i(m,{language:"html-vue",label:"HTML Vue Template"},{default:s(()=>[At]),_:1}),i(w,{type:"success"},{default:s(()=>[Dt,Ht]),_:1}),i(w,{type:"tips"},{default:s(()=>[jt,It,Ot,Ft,qt]),_:1}),i(w,{type:"tips"},{default:s(()=>[Bt,Ut,Wt,Yt,Jt,Gt,Kt,Xt,Zt]),_:1}),Qt,i(f,{class:"default-theme example",horizontal:"",style:{height:"400px"}},{default:s(()=>[i(h,{"min-size":"20","max-size":"70"},{default:s(()=>[en]),_:1}),i(h,null,{default:s(()=>[tn]),_:1}),i(h,{"max-size":"70"},{default:s(()=>[nn]),_:1})]),_:1}),i(m,{language:"html-vue",label:"HTML"},{default:s(()=>[sn]),_:1}),an,on,i(f,{class:"default-theme example",horizontal:"",style:{height:"400px"}},{default:s(()=>[i(h,{size:"65"},{default:s(()=>[ln]),_:1}),i(h,{size:"10"},{default:s(()=>[rn]),_:1}),i(h,{size:"25"},{default:s(()=>[pn]),_:1})]),_:1}),i(m,{language:"html-vue",label:"HTML"},{default:s(()=>[dn]),_:1}),hn,e("p",null,[e("a",cn,[un,i(d,{class:"ml1",color:"primary"},{default:s(()=>[mn]),_:1})])]),i(f,{class:"default-theme example",horizontal:"","push-other-panes":!1,style:{height:"400px"}},{default:s(()=>[i(h,null,{default:s(()=>[_n]),_:1}),i(h,null,{default:s(()=>[i(f,{"push-other-panes":!1},{default:s(()=>[i(h,null,{default:s(()=>[fn]),_:1}),i(h,null,{default:s(()=>[gn]),_:1}),i(h,null,{default:s(()=>[vn]),_:1})]),_:1})]),_:1}),i(h,null,{default:s(()=>[zn]),_:1})]),_:1}),i(m,{language:"html-vue",label:"HTML"},{default:s(()=>[bn]),_:1}),yn,i(f,{class:"default-theme example",style:{height:"400px"}},{default:s(()=>[(z(),y(S,null,k(8,c=>i(h,{key:c,"min-size":5},{default:s(()=>[e("span",null,u(c),1)]),_:2},1024)),64))]),_:1}),i(m,{language:"html-vue",label:"HTML"},{default:s(()=>[wn]),_:1}),xn,e("p",null,[Sn,i(b,{class:"ml2",onClick:a[0]||(a[0]=c=>t.panesNumber++)},{default:s(()=>[i(d,{class:"mr1"},{default:s(()=>[kn]),_:1}),Pn]),_:1}),i(b,{class:"ml2",onClick:a[1]||(a[1]=c=>t.panesNumber--)},{default:s(()=>[i(d,{class:"mr1"},{default:s(()=>[Nn]),_:1}),Mn]),_:1})]),i(f,{class:"default-theme example",style:{height:"400px"}},{default:s(()=>[(z(!0),y(S,null,k(p.panesNumberAbs,c=>(z(),P(h,{key:c},{default:s(()=>[e("span",null,u(c),1)]),_:2},1024))),128))]),_:1}),i(m,{language:"html-vue",label:"HTML"},{default:s(()=>[Cn]),_:1}),i(m,{language:"js",label:"Javascript"},{default:s(()=>[Tn]),_:1}),Vn,$n,En,i(b,{class:"mr2 mb2",onClick:a[2]||(a[2]=c=>t.horizontal=!t.horizontal)},{default:s(()=>[i(d,{class:"ml-n1 mr1"},{default:s(()=>[n("material-icons "+u(t.horizontal?"view_column":"view_stream"),1)]),_:1}),n("Switch to "+u(t.horizontal?"Vertical":"Horizontal"),1)]),_:1}),i(b,{class:"mr2 mb2",onClick:a[3]||(a[3]=c=>t.firstSplitter=!t.firstSplitter)},{default:s(()=>[i(d,{class:"ml-n1 mr1"},{default:s(()=>[n("material-icons "+u(t.firstSplitter?"close":"add"),1)]),_:1}),n(u(t.firstSplitter?"Hide":"Show")+" First Splitter",1)]),_:1}),i(f,{class:"default-theme example",horizontal:t.horizontal,"first-splitter":t.firstSplitter,style:{height:"400px"}},{default:s(()=>[(z(),y(S,null,k(3,c=>i(h,{key:c},{default:s(()=>[e("span",null,u(c),1)]),_:2},1024)),64))]),_:1},8,["horizontal","first-splitter"]),i(m,{language:"html-vue",label:"HTML"},{default:s(()=>[Ln]),_:1}),i(m,{language:"js",label:"Javascript"},{default:s(()=>[Rn]),_:1}),An,Dn,i(q,{class:"mt12 mb10",modelValue:t.paneSize,"onUpdate:modelValue":a[4]||(a[4]=c=>t.paneSize=c),"track-color":"grey-light2",label:"First pane size","thumb-label":"always","thumb-size":"25",min:0,max:100},null,8,["modelValue"]),i(f,{class:"default-theme example",onResize:a[5]||(a[5]=c=>t.paneSize=c[0].size),style:{height:"400px"}},{default:s(()=>[i(h,{size:t.paneSize},{default:s(()=>[e("span",null,u(~~(t.paneSize*100)/100)+"%",1)]),_:1},8,["size"]),i(h,{size:100-t.paneSize},{default:s(()=>[e("span",null,u(~~((100-t.paneSize)*100)/100)+"%",1)]),_:1},8,["size"])]),_:1}),i(m,{language:"html-vue",label:"HTML"},{default:s(()=>[Hn]),_:1}),i(m,{language:"js",label:"Javascript"},{default:s(()=>[jn]),_:1}),In,e("p",null,[On,Fn,i(b,{class:"mt2 mr2",onClick:p.generateRandomNumber},{default:s(()=>[i(d,{class:"mr1",size:"20"},{default:s(()=>[qn]),_:1}),Bn]),_:1},8,["onClick"]),i(b,{class:"mt2",onClick:a[6]||(a[6]=c=>p.incrementNumber(3))},{default:s(()=>[i(d,{class:"mr1",size:"20"},{default:s(()=>[Un]),_:1}),Wn]),_:1})]),i(f,{class:"default-theme example",style:{height:"400px"},horizontal:""},{default:s(()=>[i(h,null,{default:s(()=>[i(f,null,{default:s(()=>[(z(),y(S,null,k(3,c=>i(h,{class:"w-flex column text-center",key:c},{default:s(()=>[e("span",null,[n(u(c),1),Yn]),e("em",null,[n("Number is: "+u(t.randomNums[c]),1),Jn]),c===2?(z(),y("em",Gn,[n("Number on the left is: "+u(t.randomNums[1]),1),Kn,n(`
Number on the right is: `+u(t.randomNums[3]),1),Xn])):M("",!0),c!==2?(z(),P(b,{key:1,class:"align-center",onClick:$=>t.randomNums[c]=t.randomNums[c]+1,style:{"min-width":"0"}},{default:s(()=>[i(d,{size:"20"},{default:s(()=>[Zn]),_:1}),Qn]),_:2},1032,["onClick"])):M("",!0)]),_:2},1024)),64))]),_:1})]),_:1}),i(h,{class:"w-flex column text-center"},{default:s(()=>[es,e("em",null,[ts,ns,n(`
[`+u(t.randomNums[1])+", "+u(t.randomNums[2])+", "+u(t.randomNums[3])+`]
`,1)])]),_:1})]),_:1}),i(m,{language:"html-vue",label:"HTML"},{default:s(()=>[ss]),_:1}),i(m,{language:"js",label:"Javascript"},{default:s(()=>[is]),_:1}),as,i(b,{class:"mb2",onClick:a[7]||(a[7]=c=>t.hidePane2=!t.hidePane2)},{default:s(()=>[i(d,{class:"mr2"},{default:s(()=>[n("material-icons "+u(t.hidePane2?"visibility":"visibility_off"),1)]),_:1}),n(u(t.hidePane2?"Show":"Hide")+" Pane 2",1)]),_:1}),i(f,{class:"default-theme example",style:{height:"400px"}},{default:s(()=>[i(h,null,{default:s(()=>[os]),_:1}),t.hidePane2?M("",!0):(z(),P(h,{key:0,class:"green-light5"},{default:s(()=>[ls]),_:1})),i(h,null,{default:s(()=>[rs]),_:1})]),_:1}),i(m,{language:"html-vue",label:"HTML"},{default:s(()=>[ps]),_:1}),ds,hs,i(b,{class:"example-vue-router my1 mr1",route:"example-home-view"},{default:s(()=>[cs]),_:1}),i(b,{class:"example-vue-router my1",route:"example-another-view"},{default:s(()=>[us]),_:1}),i(f,{class:"default-theme example-vue-router mt2",style:{height:"400px"}},{default:s(()=>[i(h,{class:"w-flex column fill-height","min-size":"20"},{default:s(()=>[e("div",ms,[_s,e("ul",null,[e("li",null,[i(V,{to:"example-home-view"},{default:s(()=>[fs]),_:1})]),e("li",null,[i(V,{to:"example-another-view"},{default:s(()=>[gs]),_:1})])])]),vs]),_:1}),i(h,{class:"w-flex column fill-height"},{default:s(()=>[zs,i(B,{class:"flex"})]),_:1}),i(h,{class:"w-flex align-center justify-center"},{default:s(()=>[bs]),_:1})]),_:1}),i(m,{language:"html-vue",label:"HTML"},{default:s(()=>[ys]),_:1}),i(m,{language:"js",label:"router.js"},{default:s(()=>[ws]),_:1}),i(m,{language:"html-vue",label:"home-view.vue"},{default:s(()=>[xs]),_:1}),Ss,i(f,{class:"default-theme example",onResize:a[8]||(a[8]=c=>p.log("resize",c)),onResized:a[9]||(a[9]=c=>p.log("resized",c)),onPaneMaximize:a[10]||(a[10]=c=>p.log("pane-maximize",c)),onPaneClick:a[11]||(a[11]=c=>p.log("pane-click",c)),onReady:a[12]||(a[12]=c=>p.log("ready",c)),onSplitterClick:a[13]||(a[13]=c=>p.log("splitter-click",c)),style:{height:"400px"}},{default:s(()=>[(z(),y(S,null,k(3,c=>i(h,{key:c,"min-size":10},{default:s(()=>[e("span",null,u(c),1)]),_:2},1024)),64))]),_:1}),e("pre",ks,[Ps,(z(!0),y(S,null,k(t.logs,(c,$)=>(z(),y("div",{key:$},[e("strong",null,u(c.name)+":\xA0",1),e("span",null,u(c.params),1)]))),128))]),i(m,{language:"html-vue",label:"HTML"},{default:s(()=>[Ns]),_:1}),Ms,e("p",null,[e("a",Cs,[Ts,i(d,{class:"ml1",color:"primary"},{default:s(()=>[Vs]),_:1})])]),i(f,{class:"touch-example",horizontal:"",style:{height:"400px"}},{default:s(()=>[i(h,null,{default:s(()=>[i(f,{class:"touch-example"},{default:s(()=>[i(h,null,{default:s(()=>[$s]),_:1}),i(h,null,{default:s(()=>[Es]),_:1}),i(h,null,{default:s(()=>[Ls]),_:1})]),_:1})]),_:1}),i(h,null,{default:s(()=>[Rs]),_:1})]),_:1}),i(m,{language:"html-vue",label:"HTML"},{default:s(()=>[As]),_:1}),i(m,{language:"css",label:"CSS"},{default:s(()=>[Ds]),_:1}),Hs,js,e("p",null,[e("a",Is,[Os,i(d,{class:"ml1",color:"primary"},{default:s(()=>[Fs]),_:1})])]),i(f,{class:"example-own-style",horizontal:"",style:{height:"400px"}},{default:s(()=>[i(h,null,{default:s(()=>[i(f,null,{default:s(()=>[i(h,null,{default:s(()=>[qs]),_:1}),i(h,null,{default:s(()=>[Bs]),_:1}),i(h,null,{default:s(()=>[Us]),_:1})]),_:1})]),_:1}),i(h,null,{default:s(()=>[Ws]),_:1})]),_:1}),i(m,{language:"html-vue",label:"HTML"},{default:s(()=>[Ys]),_:1}),i(m,{language:"css",label:"CSS"},{default:s(()=>[Js]),_:1}),Gs,e("div",Ks,[Xs,Zs,i(w,{type:"warning"},{default:s(()=>[Qs,ei,ti,ni,si,ii,ai,oi,li,ri,pi]),_:1})]),di,e("div",hi,[ci,ui,i(w,{type:"success"},{default:s(()=>[mi]),_:1})]),_i,e("div",null,[fi,gi,i(w,{type:"success"},{default:s(()=>[vi]),_:1}),i(w,{type:"success"},{default:s(()=>[zi]),_:1})]),bi])}const wi={name:"app",components:{Splitpanes:re,Pane:he,SshPre:Z,HighlightMessage:me},data:()=>({panesNumber:3,logs:[],randomNums:{1:0,2:0,3:0},paneSize:50,hidePane2:!1,horizontal:!1,firstSplitter:!1}),methods:{log(t,a){this.logs.unshift({name:t,params:JSON.stringify(a)})},generateRandomNumber(){this.randomNums=Object.assign(this.randomNums,{1:Math.round(Math.random()*100),2:Math.round(Math.random()*100),3:Math.round(Math.random()*100)})},incrementNumber(t){this.randomNums[t]++}},computed:{panesNumberAbs(){return this.panesNumber<0&&(this.panesNumber=0),this.panesNumber}}};var xi=C(wi,[["render",yi]]),Si=Q({history:ee("/splitpanes/"),routes:[{path:"/",component:xi,children:[{path:"/example-home-view",component:()=>T(()=>import("./example-home-view.7fe4f2ac.js"),["assets/example-home-view.7fe4f2ac.js","assets/vendor.ff6ec80c.js"])},{path:"/example-another-view",component:()=>T(()=>import("./example-another-view.f1f334e6.js"),["assets/example-another-view.f1f334e6.js","assets/vendor.ff6ec80c.js"])}]},{path:"/test",component:()=>T(()=>import("./isolated-test-view.1c5b7a2a.js"),["assets/isolated-test-view.1c5b7a2a.js","assets/vendor.ff6ec80c.js"])}]});const ki={class:"py2",color:"white"},Pi={class:"xs12 sm6 text-center smu-text-left copyright"},Ni={class:"xs12 sm6 text-center smu-text-right made-with"},Mi={class:"mb1"},Ci=n("This documentation is made with "),Ti=n("fab fa-vuejs"),Vi=n(", "),$i=n("fab fa-html5"),Ei=n(", "),Li=n("fab fa-css3"),Ri=n(", "),Ai=n("fab fa-sass"),Di=n(" & "),Hi=n("material-icons favorite"),ji=n("View this project on "),Ii={href:"https://github.com/antoniandre/splitpanes",target:"_blank"},Oi=n("fab fa-github"),Fi=n(" Github"),qi=n(".");function Bi(t,a,o,l,r,p){const d=v("router-view"),_=v("w-button"),g=v("w-transition-twist"),h=v("w-icon"),f=v("w-flex"),m=v("w-app"),w=te("scroll");return j((z(),P(m,{block:""},{default:s(()=>[i(d),i(g,null,{default:s(()=>[j(i(_,{class:"go-top","bg-color":"primary",icon:"material-icons keyboard_arrow_up",fixed:"",bottom:"",right:"",round:"",onClick:p.scrollToTop},null,8,["onClick"]),[[ne,!t.goTopHidden]])]),_:1}),e("footer",ki,[i(f,{class:"page-container",wrap:"","justify-center":""},{default:s(()=>[e("div",Pi,"Copyright \xA9 "+u(new Date().getFullYear())+" Antoni Andr\xE9, all rights reserved.",1),e("div",Ni,[e("div",Mi,[Ci,i(h,null,{default:s(()=>[Ti]),_:1}),Vi,i(h,null,{default:s(()=>[$i]),_:1}),Ei,i(h,null,{default:s(()=>[Li]),_:1}),Ri,i(h,null,{default:s(()=>[Ai]),_:1}),Di,i(h,{class:"heart"},{default:s(()=>[Hi]),_:1})]),ji,e("a",Ii,[i(h,null,{default:s(()=>[Oi]),_:1}),Fi]),qi])]),_:1})])]),_:1})),[[w,p.onScroll]])}const Ui={data:()=>({offsetTop:0,goTopHidden:!0}),methods:{onScroll(){this.offsetTop=window.pageYOffset||document.documentElement.scrollTop,this.goTopHidden=this.offsetTop<200},scrollToTop(){document.documentElement.scrollTo({top:0,behavior:"smooth"})}},directives:{scroll:{inserted:(t,a)=>{const o=l=>{a.value(l,t)&&window.removeEventListener("scroll",o)};window.addEventListener("scroll",o)}}}};var Wi=C(Ui,[["render",Bi]]);const F=se(Wi).use(Si);new ie(F,{iconsLigature:"material-icons",colors:{primary:"#42b983",maintext:"#999",darktext:"#444",lightertext:"#ccc",lightgrey:"#eee"}});F.mount("#app");export{he as P,C as _,re as a};
