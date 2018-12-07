import Vue from 'vue'
import JsonEditor from '../src/index.js'
import App from './App.vue'
import VueClipboard from 'vue-clipboard2'
import Toasted from 'vue-toasted'

Vue.use(VueClipboard);
Vue.use(JsonEditor)
Vue.use(Toasted, {
	duration: 2000
})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  render: h => (h)(App)
})