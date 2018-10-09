import Vue from 'vue'
import Vuetify from 'vuetify'
import 'vuetify/dist/vuetify.min.css'
import '@fortawesome/fontawesome-free/css/all.css'

Vue.use(Vuetify, {
  iconfont: ['md', 'fa'],
  theme: {
    primary: '#42b983',
    lightgrey: '#eee'
  }
})
