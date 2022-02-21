import Vue from 'vue'
import WaveUI from 'wave-ui'
import 'wave-ui/dist/wave-ui.css'

Vue.use(WaveUI)

export default new WaveUI({
  iconsLigature: 'material-icons',
  colors: {
    primary: '#42b983',
    maintext: '#999',
    darktext: '#444',
    lightertext: '#ccc',
    lightgrey: '#eee'
  }
})
