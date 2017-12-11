// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import axios from 'axios'
import VueAxios from 'vue-axios'
import VueMoment from 'vue-moment'

import App from './App'
import router from './router'

// axios.defaults.baseURL = 'https://smarthut.cc'
axios.defaults.headers.post['Content-Type'] = 'application/json'

Vue.config.productionTip = false

Vue.use(VueAxios, axios)
Vue.use(VueMoment)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: { App }
})
