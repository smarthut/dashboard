import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '@/components/Home'
import Devices from '@/components/Device/Devices'
import Device from '@/components/Device/Device'

Vue.use(VueRouter)

export default new VueRouter({
  routes: [
    { path: '/', name: 'Home', component: Home },
    { path: '/devices', name: 'Devices', component: Devices },
    { path: '/device/:deviceName', name: 'Device', component: Device, props: true }
  ]
})
