import Vue from 'vue'
import Router from 'vue-router'
// import Home from './views/Home.vue'
// import About from './views/About.vue'
import Home from './components/Home'
import Devices from './components/Device/Devices'
import Device from './components/Device/Device'

Vue.use(Router)

export default new Router({
  routes: [
    { path: '/', name: 'home', component: Home },
    { path: '/devices', name: 'Devices', component: Devices },
    { path: '/device/:deviceName', name: 'Device', component: Device, props: true }
  ]
})
