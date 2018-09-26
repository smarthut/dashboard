import Vue from 'vue'
import Router from 'vue-router'
import Home from './components/Home'
import Devices from './components/Device/Devices'
import Device from './components/Device/Device'

Vue.use(Router)

export default new Router({
  routes: [
    { path: '/', name: 'home', component: Home },
    { path: '/devices', name: 'Devices', component: Devices },
    { path: '/devices/:deviceName', name: 'Device', component: Device, props: true }
  ]
})
